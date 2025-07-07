import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Production middleware for CDN optimization
  app.use((req, res, next) => {
    // Set security headers
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('X-Frame-Options', 'DENY');
    res.set('X-XSS-Protection', '1; mode=block');
    
    // Set CORS headers for CDN
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    next();
  });

  // Get all articles
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getAllArticles();
      
      // Set caching headers for Fastly CDN
      res.set('Cache-Control', 'max-age=300'); // 5 minutes browser cache
      res.set('Surrogate-Control', 'max-age=600, stale-while-revalidate=30'); // 10 minutes CDN cache
      res.set('Surrogate-Key', 'articles all-articles'); // For cache purging
      
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  // Get featured articles
  app.get("/api/articles/featured", async (req, res) => {
    try {
      const articles = await storage.getFeaturedArticles();
      
      // Cache featured articles longer since they change less frequently
      res.set('Cache-Control', 'max-age=600'); // 10 minutes browser cache
      res.set('Surrogate-Control', 'max-age=1800, stale-while-revalidate=60'); // 30 minutes CDN cache
      res.set('Surrogate-Key', 'articles featured-articles');
      
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured articles" });
    }
  });

  // Get article by slug
  app.get("/api/articles/slug/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const article = await storage.getArticleBySlug(slug);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      // Cache individual articles for longer since they rarely change
      res.set('Cache-Control', 'max-age=3600'); // 1 hour browser cache
      res.set('Surrogate-Control', 'max-age=7200, stale-while-revalidate=120'); // 2 hours CDN cache
      res.set('Surrogate-Key', `article-${slug} articles`);
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  // Get articles by category
  app.get("/api/articles/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const articles = await storage.getArticlesByCategory(category);
      
      // Cache category pages moderately since they update regularly
      res.set('Cache-Control', 'max-age=300'); // 5 minutes browser cache
      res.set('Surrogate-Control', 'max-age=900, stale-while-revalidate=45'); // 15 minutes CDN cache
      res.set('Surrogate-Key', `category-${category} articles`);
      
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles by category" });
    }
  });

  // Search articles
  app.get("/api/articles/search", async (req, res) => {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const articles = await storage.searchArticles(q);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to search articles" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
