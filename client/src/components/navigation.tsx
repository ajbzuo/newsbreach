import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchOverlay from "./search-overlay";

export default function Navigation() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const categories = [
    { name: "Politics", path: "/category/politics" },
    { name: "World", path: "/category/world" },
    { name: "Business", path: "/category/business" },
    { name: "Technology", path: "/category/technology" },
    { name: "Health", path: "/category/health" },
    { name: "Climate", path: "/category/climate" },
  ];

  const handleNavClick = (path: string) => {
    setLocation(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => handleNavClick("/")}
                className="text-2xl font-bold text-time-red hover:opacity-90 transition-opacity"
              >
                TimeScope
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => handleNavClick("/")}
                className="text-time-dark hover:text-time-red transition-colors font-medium"
              >
                Home
              </button>
              {categories.map((category) => (
                <button 
                  key={category.name}
                  onClick={() => handleNavClick(category.path)}
                  className="text-time-gray hover:text-time-red transition-colors"
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search and Subscribe */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="text-time-gray hover:text-time-red transition-colors"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                className="bg-time-red text-white hover:bg-red-700 transition-colors"
                size="sm"
              >
                Subscribe
              </Button>
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-time-gray hover:text-time-red"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-3">
                <button 
                  className="text-time-dark hover:text-time-red transition-colors font-medium text-left"
                  onClick={() => handleNavClick("/")}
                >
                  Home
                </button>
                {categories.map((category) => (
                  <button 
                    key={category.name}
                    className="text-time-gray hover:text-time-red transition-colors text-left"
                    onClick={() => handleNavClick(category.path)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
