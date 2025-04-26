
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, Filter, MapPin, ChevronDown, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";

// Sample properties data
const propertiesData = [
  {
    id: "1",
    title: "Modern Apartment with Garden View",
    location: "Koramangala, Bangalore",
    price: 7500000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&auto=format&fit=crop",
    propertyType: "Apartment",
    furnished: "Fully Furnished",
    parking: true,
    distance: 0.8,
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
    propertyType: "Villa",
    furnished: "Fully Furnished",
    parking: true,
    distance: 1.5,
  },
  {
    id: "3",
    title: "Commercial Space in Business Park",
    location: "Whitefield, Bangalore",
    price: 9000000,
    area: 1800,
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&auto=format&fit=crop",
    propertyType: "Commercial",
    furnished: "Semi Furnished",
    parking: true,
    distance: 2.2,
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
    propertyType: "Apartment",
    furnished: "Semi Furnished",
    parking: false,
    distance: 0.5,
  },
  {
    id: "5",
    title: "Spacious 3BHK in Gated Community",
    location: "Electronic City, Bangalore",
    price: 5800000,
    bedrooms: 3,
    bathrooms: 3,
    area: 1450,
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&auto=format&fit=crop",
    propertyType: "Apartment",
    furnished: "Unfurnished",
    parking: true,
    distance: 1.8,
  },
  {
    id: "6",
    title: "Penthouse with City View",
    location: "Powai, Mumbai",
    price: 18000000,
    bedrooms: 4,
    bathrooms: 4,
    area: 2800,
    imageUrl: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=600&auto=format&fit=crop",
    propertyType: "Penthouse",
    furnished: "Fully Furnished",
    parking: true,
    distance: 3.0,
  },
  {
    id: "7",
    title: "Office Space in Prime Location",
    location: "MG Road, Bangalore",
    price: 12000000,
    area: 1600,
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&auto=format&fit=crop",
    propertyType: "Commercial",
    furnished: "Semi Furnished",
    parking: true,
    distance: 1.2,
  },
  {
    id: "8",
    title: "1BHK Affordable Apartment",
    location: "BTM Layout, Bangalore",
    price: 3200000,
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&auto=format&fit=crop",
    propertyType: "Apartment",
    furnished: "Semi Furnished",
    parking: false,
    distance: 0.7,
  },
];

const Properties = () => {
  const [properties, setProperties] = useState(propertiesData);
  const [wishlistedProperties, setWishlistedProperties] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState<string | null>(null);
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("default");
  
  const toggleWishlist = (id: string) => {
    setWishlistedProperties((prev) =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  
  const handleReset = () => {
    setSearchQuery("");
    setPriceRange([0, 20000000]);
    setSelectedPropertyTypes([]);
    setSelectedBedrooms(null);
    setSelectedDistance(null);
    setSortBy("default");
  };
  
  // Apply filters and sorting
  const filteredProperties = properties.filter(property => {
    // Search query filter
    const matchesSearch = !searchQuery || 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Price range filter
    const matchesPrice = 
      property.price >= priceRange[0] && property.price <= priceRange[1];
    
    // Property type filter
    const matchesPropertyType = 
      selectedPropertyTypes.length === 0 || 
      selectedPropertyTypes.includes(property.propertyType);
    
    // Bedrooms filter
    const matchesBedrooms = !selectedBedrooms || 
      (property.bedrooms && property.bedrooms.toString() === selectedBedrooms);
    
    // Distance filter
    const matchesDistance = !selectedDistance ||
      property.distance <= selectedDistance;
    
    return matchesSearch && matchesPrice && matchesPropertyType && matchesBedrooms && matchesDistance;
  }).sort((a, b) => {
    // Apply sorting
    if (sortBy === "price_low_to_high") {
      return a.price - b.price;
    } else if (sortBy === "price_high_to_low") {
      return b.price - a.price;
    } else if (sortBy === "nearest") {
      return (a.distance || 0) - (b.distance || 0);
    }
    return 0;
  });
  
  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakh`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 bg-gray-50 pt-6 pb-12">
        <div className="container mx-auto px-4">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-5">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search by location, property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="h-4 w-4 mr-2" /> 
                  Filters
                </Button>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price_low_to_high">Price: Low to High</SelectItem>
                    <SelectItem value="price_high_to_low">Price: High to Low</SelectItem>
                    <SelectItem value="nearest">Nearest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {showFilters && (
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <div className="space-y-4">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={20000000}
                        step={100000}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Property Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <div className="space-y-2">
                      {["Apartment", "Villa", "Penthouse", "Commercial", "Plot"].map((type) => (
                        <div key={type} className="flex items-center">
                          <Checkbox
                            id={`property-type-${type}`}
                            checked={selectedPropertyTypes.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedPropertyTypes([...selectedPropertyTypes, type]);
                              } else {
                                setSelectedPropertyTypes(
                                  selectedPropertyTypes.filter((t) => t !== type)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor={`property-type-${type}`}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bedrooms Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms
                    </label>
                    <RadioGroup value={selectedBedrooms || ""} onValueChange={setSelectedBedrooms}>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="1" id="r1" />
                        <Label htmlFor="r1">1 BHK</Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="2" id="r2" />
                        <Label htmlFor="r2">2 BHK</Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="3" id="r3" />
                        <Label htmlFor="r3">3 BHK</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4" id="r4" />
                        <Label htmlFor="r4">4+ BHK</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {/* Distance Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Distance from Center
                    </label>
                    <Select 
                      value={selectedDistance?.toString() || ""} 
                      onValueChange={(val) => setSelectedDistance(val ? Number(val) : null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select distance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any distance</SelectItem>
                        <SelectItem value="1">Within 1 km</SelectItem>
                        <SelectItem value="2">Within 2 km</SelectItem>
                        <SelectItem value="5">Within 5 km</SelectItem>
                        <SelectItem value="10">Within 10 km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button variant="outline" onClick={handleReset} className="mr-2">
                    <XCircle className="h-4 w-4 mr-2" /> Reset
                  </Button>
                  <Button onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {filteredProperties.length} Properties Found
            </h1>
            
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Using your current location</span>
            </div>
          </div>
          
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  area={property.area}
                  imageUrl={property.imageUrl}
                  isWishlisted={wishlistedProperties.includes(property.id)}
                  onWishlistToggle={() => toggleWishlist(property.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white p-8 rounded-lg shadow-sm inline-block">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h2>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria to see more results.
                </p>
                <Button onClick={handleReset}>Reset Filters</Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Properties;
