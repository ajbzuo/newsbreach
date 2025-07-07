import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Navigation from "@/components/navigation";
import ArticleCard from "@/components/article-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Article } from "@shared/schema";

export default function CategoryPage() {
  const { category } = useParams();

  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ["/api/articles/category", category],
    queryFn: async () => {
      const response = await fetch(`/api/articles/category/${category}`);
      if (!response.ok) throw new Error("Failed to fetch articles");
      return response.json() as Article[];
    },
    enabled: !!category,
  });

  const categoryDisplayName = category 
    ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    : "";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-8 w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-40 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-time-dark mb-4">Category Not Found</h1>
            <p className="text-time-gray mb-6">
              The category you're looking for doesn't exist or has no articles.
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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="text-time-red font-medium hover:underline mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="border-b border-gray-200 pb-4">
            <h1 className="text-4xl font-bold text-time-dark mb-2">
              {categoryDisplayName}
            </h1>
            <p className="text-time-gray">
              {articles.length} {articles.length === 1 ? 'article' : 'articles'} in this category
            </p>
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-time-dark mb-2">No Articles Found</h2>
            <p className="text-time-gray">
              There are currently no articles in the {categoryDisplayName} category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="grid" />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}