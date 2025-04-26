
import React from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin } from "lucide-react";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  imageUrl: string;
  isFeatured?: boolean;
  isWishlisted?: boolean;
  onWishlistToggle?: () => void;
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  imageUrl,
  isFeatured = false,
  isWishlisted = false,
  onWishlistToggle
}: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Link to={`/property/${id}`}>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover"
          />
          {isFeatured && (
            <Badge 
              className="absolute top-2 left-2 bg-accent text-primary font-medium"
            >
              Featured
            </Badge>
          )}
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (onWishlistToggle) onWishlistToggle();
          }}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
          <Heart
            className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}`}
          />
        </button>
      </div>
      
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg">
          <Link to={`/property/${id}`} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-3">
        <p className="text-xl font-bold text-primary">
          ₹{price.toLocaleString('en-IN')}
        </p>
        
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          {bedrooms !== undefined && (
            <div>
              <span className="font-semibold">{bedrooms}</span> Beds
            </div>
          )}
          {bathrooms !== undefined && (
            <div>
              <span className="font-semibold">{bathrooms}</span> Baths
            </div>
          )}
          <div>
            <span className="font-semibold">{area}</span> sq.ft
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button variant="secondary" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
