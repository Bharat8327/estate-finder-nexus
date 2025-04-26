
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ArrowRight, Home, MapPin, Building } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";

// Sample data for featured properties
const featuredProperties = [
  {
    id: "1",
    title: "Modern Apartment with Garden View",
    location: "Koramangala, Bangalore",
    price: 7500000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&auto=format&fit=crop",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Luxury Villa with Private Pool",
    location: "Baner, Pune",
    price: 15000000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    imageUrl: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=600&auto=format&fit=crop",
    isFeatured: true,
  },
  {
    id: "3",
    title: "Commercial Space in Business Park",
    location: "Whitefield, Bangalore",
    price: 9000000,
    area: 1800,
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&auto=format&fit=crop",
    isFeatured: false,
  },
  {
    id: "4",
    title: "Budget Friendly 2BHK Near Metro",
    location: "Andheri, Mumbai",
    price: 4500000,
    bedrooms: 2,
    bathrooms: 2,
    area: 950,
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&auto=format&fit=crop",
    isFeatured: false,
  }
];

const Index = () => {
  const [wishlistedProperties, setWishlistedProperties] = useState<string[]>([]);
  
  const toggleWishlist = (id: string) => {
    setWishlistedProperties((prev) =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent opacity-90"></div>
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect Property in India
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Connecting verified buyers and sellers across India for seamless property transactions
            </p>
            
            {/* Search Box */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Select defaultValue="buy">
                    <SelectTrigger>
                      <SelectValue placeholder="I want to..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="sell">Sell</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-[3] relative">
                  <Input
                    type="text"
                    placeholder="Search by location, property type..."
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <Button className="flex-1">
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <Button variant="outline" size="sm" className="bg-white">
                  Apartment
                </Button>
                <Button variant="outline" size="sm" className="bg-white">
                  Villa
                </Button>
                <Button variant="outline" size="sm" className="bg-white">
                  Plot
                </Button>
                <Button variant="outline" size="sm" className="bg-white">
                  Commercial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Property Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Browse by Property Type
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/properties?type=apartment" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow group">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Apartments</h3>
              <p className="text-gray-600 mb-4">Modern living spaces in prime locations</p>
              <span className="text-primary font-medium inline-flex items-center">
                Explore <ArrowRight className="h-4 w-4 ml-2" />
              </span>
            </Link>
            
            <Link to="/properties?type=house" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow group">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Houses & Villas</h3>
              <p className="text-gray-600 mb-4">Spacious homes for families to grow</p>
              <span className="text-primary font-medium inline-flex items-center">
                Explore <ArrowRight className="h-4 w-4 ml-2" />
              </span>
            </Link>
            
            <Link to="/properties?type=plot" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow group">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Plots & Land</h3>
              <p className="text-gray-600 mb-4">Build your dream home from scratch</p>
              <span className="text-primary font-medium inline-flex items-center">
                Explore <ArrowRight className="h-4 w-4 ml-2" />
              </span>
            </Link>
            
            <Link to="/properties?type=commercial" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow group">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Commercial</h3>
              <p className="text-gray-600 mb-4">Office spaces and retail properties</p>
              <span className="text-primary font-medium inline-flex items-center">
                Explore <ArrowRight className="h-4 w-4 ml-2" />
              </span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              Featured Properties
            </h2>
            <Link to="/properties" className="text-primary hover:underline inline-flex items-center">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                isWishlisted={wishlistedProperties.includes(property.id)}
                onWishlistToggle={() => toggleWishlist(property.id)}
              />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link to="/properties">Browse All Properties</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose EstateNexus
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Properties</h3>
              <p className="text-gray-600">
                All properties listed on our platform are verified by our team to ensure authenticity.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Transactions</h3>
              <p className="text-gray-600">
                Our platform ensures secure and transparent transactions between buyers and sellers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Direct Communication</h3>
              <p className="text-gray-600">
                Connect directly with property owners and agents through our integrated chat system.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Sell Your Property?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            List your property for free and reach thousands of potential buyers looking for their next home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="default" className="bg-white text-primary hover:bg-gray-100">
              <Link to="/sell">List Your Property</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Link to="/pricing">View Pricing Plans</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
