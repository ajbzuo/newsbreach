import { useState } from "react";
import { Link } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchOverlay from "./search-overlay";

export default function Navigation() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { name: "Politics", path: "/category/politics" },
    { name: "World", path: "/category/world" },
    { name: "Business", path: "/category/business" },
    { name: "Technology", path: "/category/technology" },
    { name: "Health", path: "/category/health" },
    { name: "Climate", path: "/category/climate" },
  ];

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <a className="text-2xl font-bold text-time-red hover:opacity-90 transition-opacity">
                  TimeScope
                </a>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/">
                <a className="text-time-dark hover:text-time-red transition-colors font-medium">
                  Home
                </a>
              </Link>
              {categories.map((category) => (
                <Link key={category.name} href={category.path}>
                  <a className="text-time-gray hover:text-time-red transition-colors">
                    {category.name}
                  </a>
                </Link>
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
                <Link href="/">
                  <a 
                    className="text-time-dark hover:text-time-red transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </a>
                </Link>
                {categories.map((category) => (
                  <Link key={category.name} href={category.path}>
                    <a 
                      className="text-time-gray hover:text-time-red transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </a>
                  </Link>
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
