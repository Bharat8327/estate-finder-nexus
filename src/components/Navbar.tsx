
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Menu,
  X,
  Heart,
  MessageSquare,
  User,
  Home
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">EstateNexus</span>
          </Link>

          {/* Search Bar - Hide on mobile */}
          <div className="hidden md:flex relative flex-1 max-w-md mx-4">
            <Input
              type="text"
              placeholder="Search properties by location, type..."
              className="w-full pr-10"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/properties" className="text-gray-600 hover:text-primary">
              Properties
            </Link>
            <Link to="/wishlist" className="text-gray-600 hover:text-primary flex items-center">
              <Heart className="h-5 w-5 mr-1" />
              <span>Wishlist</span>
            </Link>
            <Link to="/messages" className="text-gray-600 hover:text-primary">
              <MessageSquare className="h-5 w-5" />
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="sm">
                Login / Register
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search - Only visible on mobile */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search properties..."
              className="w-full pr-10"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 py-3 space-y-3 animate-fade-in">
            <Link 
              to="/properties" 
              className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Properties
            </Link>
            <Link 
              to="/wishlist" 
              className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md flex items-center"
            >
              <Heart className="h-5 w-5 mr-2" />
              Wishlist
            </Link>
            <Link 
              to="/messages" 
              className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md flex items-center"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Messages
            </Link>
            <Link 
              to="/login" 
              className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md flex items-center"
            >
              <User className="h-5 w-5 mr-2" />
              Login / Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
