
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, SlidersHorizontal, Heart } from "lucide-react";

// Sample wishlist data
const wishlistProperties = [
  {
    id: "1",
    title: "Modern 3BHK Apartment with Garden View",
    location: "Whitefield, Bengaluru",
    price: 4500000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop",
    isWishlisted: true,
    addedOn: "2025-04-20"
  },
  {
    id: "2",
    title: "Luxury Villa with Swimming Pool",
    location: "Electronic City, Bengaluru",
    price: 9800000,
    bedrooms: 4,
    bathrooms: 4.5,
    area: 3200,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop",
    isWishlisted: true,
    addedOn: "2025-04-15"
  },
  {
    id: "3",
    title: "Commercial Space for Office Setup",
    location: "MG Road, Bengaluru",
    price: 7500000,
    area: 1800,
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&auto=format&fit=crop",
    isWishlisted: true,
    addedOn: "2025-04-22"
  },
  {
    id: "4",
    title: "Cozy 2BHK for Small Family",
    location: "HSR Layout, Bengaluru",
    price: 3200000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop",
    isWishlisted: true,
    addedOn: "2025-04-10"
  }
];

const Wishlist = () => {
  const [properties, setProperties] = useState(wishlistProperties);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Function to handle removing from wishlist
  const handleRemoveFromWishlist = (id: string) => {
    setProperties(properties.filter(property => property.id !== id));
  };
  
  // Filter properties based on search query
  const filteredProperties = properties.filter(property => 
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary flex items-center">
                <Heart className="mr-2 h-7 w-7 fill-primary text-primary" /> My Wishlist
              </h1>
              <p className="text-gray-600 mt-1">Properties you've saved for later</p>
            </div>
            
            <div className="w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search your wishlist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 w-full md:w-[300px]"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-1 top-1.5"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="priceRange">Price Range</Label>
                  <select id="priceRange" className="w-full mt-1 rounded-md border-gray-300">
                    <option>Any Price</option>
                    <option>Under ₹30 Lac</option>
                    <option>₹30 Lac - ₹50 Lac</option>
                    <option>₹50 Lac - ₹1 Cr</option>
                    <option>Above ₹1 Cr</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="propertyType">Property Type</Label>
                  <select id="propertyType" className="w-full mt-1 rounded-md border-gray-300">
                    <option>All Types</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Plot</option>
                    <option>Commercial</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <select id="bedrooms" className="w-full mt-1 rounded-md border-gray-300">
                    <option>Any</option>
                    <option>1 BHK</option>
                    <option>2 BHK</option>
                    <option>3 BHK</option>
                    <option>4+ BHK</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="sortBy">Sort By</Label>
                  <select id="sortBy" className="w-full mt-1 rounded-md border-gray-300">
                    <option>Recently Added</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Area: Low to High</option>
                    <option>Area: High to Low</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline">Reset</Button>
                <Button>Apply Filters</Button>
              </div>
            </div>
          )}
          
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All ({properties.length})</TabsTrigger>
              <TabsTrigger value="residential">Residential</TabsTrigger>
              <TabsTrigger value="commercial">Commercial</TabsTrigger>
              <TabsTrigger value="plots">Plots</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  {...property}
                  onWishlistToggle={() => handleRemoveFromWishlist(property.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Heart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-4">Save properties you like to keep track of them here</p>
              <Button asChild>
                <a href="/properties">Browse Properties</a>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
