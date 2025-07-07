import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import type { Article } from "@shared/schema";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["/api/articles/search", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      const response = await fetch(`/api/articles/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error("Search failed");
      return response.json() as Article[];
    },
    enabled: searchQuery.trim().length > 0,
  });

  const handleArticleClick = (slug: string) => {
    setLocation(`/article/${slug}`);
    onClose();
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="max-w-2xl w-full mx-4 bg-white rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-time-dark">Search Articles</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for articles, topics, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 py-3"
              autoFocus
            />
          </div>

          {searchQuery.trim() && (
            <div className="border-t pt-4">
              {isLoading ? (
                <div className="text-center py-4 text-time-gray">Searching...</div>
              ) : searchResults && searchResults.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {searchResults.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => handleArticleClick(article.slug)}
                      className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-time-dark line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-xs text-time-gray mt-1">
                            {article.category} • {article.author} • {article.readTime} min read
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-time-gray">
                  No articles found for "{searchQuery}"
                </div>
              )}
            </div>
          )}

          {!searchQuery.trim() && (
            <div className="text-sm text-time-gray">
              Popular searches: Climate change, AI healthcare, Infrastructure bill, Digital currency
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
