
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Home,
  Plus,
  Edit,
  Trash,
  MoreVertical,
  MessageSquare,
  Heart,
  ChevronDown,
  Search,
  User,
  MapPin,
  Building,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample property data
const properties = [
  {
    id: "1",
    title: "3BHK Apartment in Whitefield",
    location: "Whitefield, Bangalore",
    price: 8500000,
    area: 1450,
    type: "Apartment",
    status: "active",
    views: 128,
    inquiries: 8,
    likes: 24,
    createdAt: "2025-04-10",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Commercial Shop Space",
    location: "MG Road, Bangalore",
    price: 12000000,
    area: 800,
    type: "Commercial",
    status: "active",
    views: 96,
    inquiries: 4,
    likes: 12,
    createdAt: "2025-04-08",
    imageUrl: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=600&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "2BHK Apartment with Balcony",
    location: "HSR Layout, Bangalore",
    price: 6500000,
    area: 1100,
    type: "Apartment",
    status: "pending",
    views: 67,
    inquiries: 2,
    likes: 15,
    createdAt: "2025-04-15",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&auto=format&fit=crop",
  },
];

// Sample messages data
const messages = [
  {
    id: "1",
    sender: "Rajesh Kumar",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    message: "Is the property still available? I'd like to schedule a visit this weekend.",
    propertyId: "1",
    propertyTitle: "3BHK Apartment in Whitefield",
    timestamp: "2025-04-24T14:22:00",
    unread: true,
  },
  {
    id: "2",
    sender: "Priya Sharma",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    message: "Can you provide more details about the amenities available in the apartment complex?",
    propertyId: "1",
    propertyTitle: "3BHK Apartment in Whitefield",
    timestamp: "2025-04-24T11:15:00",
    unread: true,
  },
  {
    id: "3",
    sender: "Amit Patel",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    message: "What is the best price you can offer for the commercial space? I'm seriously interested.",
    propertyId: "2",
    propertyTitle: "Commercial Shop Space",
    timestamp: "2025-04-23T16:40:00",
    unread: false,
  },
];

const SellerDashboard = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter properties based on active filter and search query
  const filteredProperties = properties.filter(property => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "active" && property.status === "active") ||
      (activeFilter === "pending" && property.status === "pending") ||
      (activeFilter === "inactive" && property.status === "inactive");
    
    const matchesSearch = 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
  
  const handleDeleteProperty = (id: string) => {
    // In real app, this would make an API call
    alert(`Delete property with ID: ${id}`);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary">Seller Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Manage your properties and interactions with buyers
              </p>
            </div>
            <Button className="mt-4 md:mt-0" size="sm">
              <Plus className="h-4 w-4 mr-2" /> Add New Property
            </Button>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{properties.length}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {properties.filter(p => p.status === "active").length} active listings
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {properties.reduce((sum, p) => sum + p.views, 0)}
                </div>
                <p className="text-xs text-green-500 mt-1">
                  +24% from last week
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Inquiries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {properties.reduce((sum, p) => sum + p.inquiries, 0)}
                </div>
                <p className="text-xs text-amber-500 mt-1">
                  {messages.filter(m => m.unread).length} unread messages
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Property Likes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {properties.reduce((sum, p) => sum + p.likes, 0)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  From interested buyers
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="properties" className="space-y-4">
            <TabsList>
              <TabsTrigger value="properties">My Properties</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="properties" className="space-y-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                  <div className="relative w-full md:w-64">
                    <Input
                      type="text"
                      placeholder="Search properties..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant={activeFilter === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter("all")}
                    >
                      All
                    </Button>
                    <Button
                      variant={activeFilter === "active" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter("active")}
                    >
                      Active
                    </Button>
                    <Button
                      variant={activeFilter === "pending" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter("pending")}
                    >
                      Pending
                    </Button>
                    <Button
                      variant={activeFilter === "inactive" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter("inactive")}
                    >
                      Inactive
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                      <div
                        key={property.id}
                        className="flex flex-col md:flex-row gap-4 p-4 border rounded-md hover:bg-gray-50"
                      >
                        <div className="w-full md:w-40 h-32 rounded-md overflow-hidden">
                          <img
                            src={property.imageUrl}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-lg font-semibold">
                              {property.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(property.status)}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Building className="h-4 w-4 mr-2" /> Promote
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="text-red-600"
                                    onClick={() => handleDeleteProperty(property.id)}
                                  >
                                    <Trash className="h-4 w-4 mr-2" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <MapPin className="h-4 w-4 mr-1" /> {property.location}
                          </div>
                          
                          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                            <div className="text-sm">
                              <span className="font-semibold">₹{property.price.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="text-sm">
                              <span className="font-semibold">{property.area}</span> sq.ft
                            </div>
                            <div className="text-sm">
                              <span className="font-semibold">{property.type}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500 items-center">
                            <div className="flex items-center">
                              <Search className="h-4 w-4 mr-1" />
                              {property.views} views
                            </div>
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {property.inquiries} inquiries
                            </div>
                            <div className="flex items-center">
                              <Heart className="h-4 w-4 mr-1" />
                              {property.likes} likes
                            </div>
                            <div>
                              Added on {new Date(property.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No properties found matching your filters.</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="messages" className="space-y-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Recent Messages</h3>
                
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`border ${message.unread ? 'border-primary/20 bg-primary/5' : 'border-gray-200'} rounded-md p-4`}
                    >
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src={message.avatar}
                            alt={message.sender}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">
                              {message.sender}
                              {message.unread && (
                                <span className="ml-2 inline-block w-2 h-2 bg-primary rounded-full"></span>
                              )}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            Re: {message.propertyTitle}
                          </div>
                          <p className="text-sm mt-2">{message.message}</p>
                          
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" variant="secondary">Reply</Button>
                            <Button size="sm" variant="outline">View Property</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Property Performance</h3>
                
                <div className="h-64 flex items-center justify-center border rounded-md">
                  <p className="text-gray-500">Analytics charts will be displayed here</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Subscription Promotion Banner */}
      <div className="bg-secondary py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white text-lg font-semibold">
                Upgrade to Premium Plan
              </h3>
              <p className="text-white/80">
                Get more visibility, promoted listings, and remove ads
              </p>
            </div>
            <Button variant="default" className="bg-white text-secondary hover:bg-gray-100">
              View Plans
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SellerDashboard;
