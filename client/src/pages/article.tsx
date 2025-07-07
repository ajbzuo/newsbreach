import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Heart, Share2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Article } from "@shared/schema";

export default function ArticlePage() {
  const { slug } = useParams();
  const { toast } = useToast();

  const { data: article, isLoading, error } = useQuery({
    queryKey: ["/api/articles/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/articles/slug/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Article not found");
        }
        throw new Error("Failed to fetch article");
      }
      return response.json() as Article;
    },
    enabled: !!slug,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Article link has been copied to your clipboard.",
      });
    }
  };

  const handleLike = () => {
    toast({
      title: "Thanks for your feedback!",
      description: "Your like has been recorded.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-time-dark mb-4">Article Not Found</h1>
            <p className="text-time-gray mb-6">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/">
              <Button className="bg-time-red text-white hover:bg-red-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="mb-4">
            <span className="text-time-red text-sm font-semibold uppercase tracking-wide">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-time-dark mb-6 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center text-time-gray mb-6 space-x-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-time-red rounded-full flex items-center justify-center text-white font-semibold mr-3">
                {article.author.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-time-dark">{article.author}</p>
                <p className="text-sm">{article.authorTitle}</p>
              </div>
            </div>
            <div className="text-sm">
              <span>{formatDate(article.publishedAt)}</span>
              <span className="mx-2">•</span>
              <span>{article.readTime} min read</span>
            </div>
          </div>
          
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-time-gray leading-relaxed mb-6">
            {article.excerpt}
          </p>
          
          {/* Paywall Integration Point */}
          <div 
            className="article-content"
            data-zephr-paywall="true"
            data-article-id={article.id}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Paywall Placeholder */}
          <div className="bg-gray-50 p-6 rounded-lg my-8 border-l-4 border-time-red">
            <h3 className="text-lg font-semibold text-time-dark mb-2">Continue Reading</h3>
            <p className="text-time-gray mb-4">
              Subscribe to TimeScope News to read the full article and access our complete archive of in-depth reporting.
            </p>
            <Button className="bg-time-red text-white hover:bg-red-700">
              Subscribe Now
            </Button>
          </div>
        </div>

        <footer className="border-t border-gray-200 pt-8 mt-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleLike}
                className="flex items-center space-x-2 text-time-gray hover:text-time-red transition-colors"
              >
                <Heart className="h-4 w-4" />
                <span>Like</span>
              </Button>
              <Button
                variant="ghost"
                onClick={handleShare}
                className="flex items-center space-x-2 text-time-gray hover:text-time-red transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
            <Link href="/">
              <Button
                variant="ghost"
                className="text-time-red font-medium hover:underline"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
