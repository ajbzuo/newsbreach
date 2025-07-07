import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import ArticleCard from "@/components/article-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import type { Article } from "@shared/schema";

export default function Homepage() {
  const [, setLocation] = useLocation();
  
  const { data: allArticles = [], isLoading } = useQuery({
    queryKey: ["/api/articles"],
    queryFn: async () => {
      const response = await fetch("/api/articles");
      if (!response.ok) throw new Error("Failed to fetch articles");
      return response.json() as Article[];
    },
  });

  const { data: featuredArticles = [] } = useQuery({
    queryKey: ["/api/articles/featured"],
    queryFn: async () => {
      const response = await fetch("/api/articles/featured");
      if (!response.ok) throw new Error("Failed to fetch featured articles");
      return response.json() as Article[];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-80 bg-gray-200 rounded-lg"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-3">
                    <div className="h-32 bg-gray-200 rounded-lg"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const heroArticle = featuredArticles[0] || allArticles[0];
  const sidebarArticles = allArticles.slice(1, 4);
  const latestArticles = allArticles.slice(4, 12);
  const opinionArticles = allArticles.filter(article => 
    article.category === "Opinion" || article.category === "Analysis"
  ).slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breaking News Banner */}
        <div className="bg-time-red text-white px-4 py-2 rounded-lg mb-8">
          <div className="flex items-center">
            <span className="bg-white text-time-red px-2 py-1 rounded text-sm font-bold mr-3">
              BREAKING
            </span>
            <span className="text-sm font-medium">
              {heroArticle?.title || "Stay updated with the latest breaking news"}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {heroArticle && <ArticleCard article={heroArticle} variant="hero" />}
          
          {/* Sidebar Stories */}
          <aside className="space-y-6">
            {sidebarArticles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="sidebar" />
            ))}
          </aside>
        </section>

        {/* Latest News Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-time-dark">Latest News</h2>
            <Button variant="ghost" className="text-time-red font-medium hover:underline">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="grid" />
            ))}
          </div>
        </section>

        {/* Opinion Section */}
        {opinionArticles.length > 0 && (
          <section className="border-t border-gray-200 pt-12 mb-12">
            <h2 className="text-3xl font-bold text-time-dark mb-8">Opinion & Analysis</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {opinionArticles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="opinion" />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-time-dark text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-time-red mb-4">TimeScope</h3>
              <p className="text-gray-300 mb-4">
                Delivering trusted news and analysis from around the world.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0">
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0">
                  <i className="fab fa-facebook"></i>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0">
                  <i className="fab fa-instagram"></i>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-0">
                  <i className="fab fa-linkedin"></i>
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Sections</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Button variant="ghost" className="p-0 h-auto text-gray-300 hover:text-white" onClick={() => setLocation("/category/politics")}>Politics</Button></li>
                <li><Button variant="ghost" className="p-0 h-auto text-gray-300 hover:text-white" onClick={() => setLocation("/category/world")}>World</Button></li>
                <li><Button variant="ghost" className="p-0 h-auto text-gray-300 hover:text-white" onClick={() => setLocation("/category/business")}>Business</Button></li>
                <li><Button variant="ghost" className="p-0 h-auto text-gray-300 hover:text-white" onClick={() => setLocation("/category/technology")}>Technology</Button></li>
                <li><Button variant="ghost" className="p-0 h-auto text-gray-300 hover:text-white" onClick={() => setLocation("/category/health")}>Health</Button></li>
                <li><Button variant="ghost" className="p-0 h-auto text-gray-300 hover:text-white" onClick={() => setLocation("/category/climate")}>Climate</Button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Button variant="ghost" className="p-0 h-auto text-gray-300 hover:text-white">About Us</Button></li>
                <li><Button variant="ghost" className="p-0 h-auto text-gray-300 hover:text-white">Careers</Button></li>
                <li><Button variant="ghost" className="p-0 h-auto text-gray-300 hover:text-white">Contact</Button></li>
                <li><Button variant="ghost" className="p-0 h-auto text-gray-300 hover:text-white">Privacy Policy</Button></li>
                <li><Button variant="ghost" className="p-0 h-auto text-gray-300 hover:text-white">Terms of Service</Button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Subscribe</h4>
              <p className="text-gray-300 mb-4">Get the latest news delivered to your inbox.</p>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-gray-700 text-white border-gray-600 rounded-r-none focus:ring-time-red focus:border-time-red"
                />
                <Button className="bg-time-red px-4 rounded-l-none hover:bg-red-700">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 TimeScope News. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
