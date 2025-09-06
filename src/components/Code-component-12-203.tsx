import { useState } from 'react';
import { ArrowLeft, Clock, MapPin, Star, Truck, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FastDeliveryProps {
  onBack: () => void;
  onProductClick: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

interface FastDeliveryProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  seller: string;
  image: string;
  distance: string;
  deliveryTime: string;
  rating: number;
  fastDelivery: boolean;
}

export function FastDelivery({ onBack, onProductClick, onAddToCart }: FastDeliveryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [showFilters, setShowFilters] = useState(false);

  const fastProducts: FastDeliveryProduct[] = [
    {
      id: 'f1',
      title: 'iPhone 12 Pro - Excellent Condition',
      description: 'Barely used iPhone 12 Pro with all accessories',
      price: 650,
      seller: 'TechSeller',
      image: 'https://images.unsplash.com/photo-1601536108157-e6420b5c6f2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNvbmRoYW5kJTIwaXBob25lfGVufDF8fHx8MTc1NzEzNTQwMnww&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '0.5 km',
      deliveryTime: '30 min',
      rating: 4.9,
      fastDelivery: true
    },
    {
      id: 'f2',
      title: 'Designer Laptop Bag',
      description: 'Premium leather laptop bag, used twice',
      price: 120,
      seller: 'FashionHub',
      image: 'https://images.unsplash.com/photo-1569996059372-cc4fbc5e5c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNvbmRoYW5kJTIwYmFnfGVufDF8fHx8MTc1NzEzNTQwMnww&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '0.8 km',
      deliveryTime: '45 min',
      rating: 4.7,
      fastDelivery: true
    },
    {
      id: 'f3',
      title: 'Vintage Camera Collection',
      description: 'Beautiful vintage film camera in working condition',
      price: 280,
      seller: 'VintageCollector',
      image: 'https://images.unsplash.com/photo-1493900464415-9c8009d86de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNvbmRoYW5kJTIwdmludGFnZSUyMGNhbWVyYXxlbnwxfHx8fDE3NTcxMzU0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '1.2 km',
      deliveryTime: '1 hour',
      rating: 4.8,
      fastDelivery: true
    },
    {
      id: 'f4',
      title: 'Gaming Headset - Like New',
      description: 'Professional gaming headset with noise cancellation',
      price: 85,
      seller: 'GameMaster',
      image: 'https://images.unsplash.com/photo-1599577180000-5b529c66c5cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNvbmRoYW5kJTIwZ2FtaW5nJTIwaGVhZHNldHxlbnwxfHx8fDE3NTcxMzU0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '1.5 km',
      deliveryTime: '1.5 hours',
      rating: 4.6,
      fastDelivery: true
    },
    {
      id: 'f5',
      title: 'Eco-Friendly Water Bottle',
      description: 'Stainless steel water bottle, perfect for outdoor activities',
      price: 25,
      seller: 'EcoLiving',
      image: 'https://images.unsplash.com/photo-1586030932493-ea924b2c56f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNvbmRoYW5kJTIwd2F0ZXIlMjBib3R0bGV8ZW58MXx8fHwxNzU3MTM1NDAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '2.0 km',
      deliveryTime: '2 hours',
      rating: 4.5,
      fastDelivery: true
    },
    {
      id: 'f6',
      title: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with excellent sound quality',
      price: 60,
      seller: 'AudioTech',
      image: 'https://images.unsplash.com/photo-1571042286242-ad1aef5a1e4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNvbmRoYW5kJTIwc3BlYWtlcnxlbnwxfHx8fDE3NTcxMzU0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      distance: '2.3 km',
      deliveryTime: '2.5 hours',
      rating: 4.4,
      fastDelivery: true
    }
  ];

  const filteredProducts = fastProducts.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'delivery-time':
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 sticky top-0 md:static bg-white/95 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-4 md:py-0 z-40 md:z-auto border-b border-gray-100 md:border-b-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Fast Delivery</h1>
          <p className="text-sm text-gray-600">Items available for same-day delivery near you</p>
        </div>
      </div>

      {/* Location Info */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <MapPin className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h2 className="font-medium text-gray-900">Delivering to your area</h2>
            <p className="text-sm text-gray-600">123 Green Street, Eco District</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Input
              placeholder="Search fast delivery items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Sort
          </Button>
        </div>

        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex gap-4 items-center">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Nearest First</SelectItem>
                  <SelectItem value="delivery-time">Fastest Delivery</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <Card 
            key={product.id} 
            className="group cursor-pointer hover:shadow-lg transition-shadow border-0 shadow-sm hover:shadow-xl"
            onClick={() => onProductClick(product.id)}
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
                <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
                  <Truck className="w-3 h-3 mr-1" />
                  Fast
                </Badge>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                  {product.distance}
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-medium text-gray-900 line-clamp-2">{product.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">${product.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{product.deliveryTime}</span>
                  </div>
                  <span>by {product.seller}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0">
              <Button 
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product.id);
                }}
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-medium text-gray-900 mb-2">No fast delivery items found</h3>
          <p className="text-gray-600">Try adjusting your search or check back later for new items.</p>
        </div>
      )}
    </div>
  );
}