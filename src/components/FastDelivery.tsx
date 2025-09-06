import { useState, useEffect } from 'react';
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
  products?: any[]; // Products from main app data
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

export function FastDelivery({ onBack, onProductClick, onAddToCart, products = [] }: FastDeliveryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [showFilters, setShowFilters] = useState(false);

  // Handle scroll effects for mobile header
  useEffect(() => {
    let ticking = false;
    
    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const headers = document.querySelectorAll('.scroll-minimize');
          
          headers.forEach(header => {
            if (scrollY > 30) {
              header.classList.add('scrolled');
            } else {
              header.classList.remove('scrolled');
            }
          });
          
          ticking = false;
        });
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Convert main app products to fast delivery format with additional properties
  const fastProducts: FastDeliveryProduct[] = products.length > 0 ? products.slice(0, 8).map((product, index) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    seller: product.seller,
    image: product.image,
    distance: [`0.${index + 3} km`, `0.${index + 5} km`, `${index + 1}.${index + 2} km`][index % 3] || `${index + 1}.0 km`,
    deliveryTime: [`${(index + 1) * 15} min`, `${index + 1} hour`, `${index + 2} hours`][index % 3] || `${index + 1} hour`,
    rating: Math.max(4.0, Math.min(5.0, product.rating || (4.3 + (index * 0.1)))),
    fastDelivery: true
  })) : [
    // Fallback hardcoded products if no products passed
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
    <div className="max-w-4xl mx-auto p-4 space-y-6 pt-4 md:pt-0">
      {/* Header */}
      <div className="flex items-center gap-4 sticky top-0 md:static bg-white/95 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-4 md:py-0 z-40 md:z-auto border-b border-gray-100 md:border-b-0 transition-all duration-300 ease-in-out scroll-minimize">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="minimize-text">Back</span>
        </Button>
        <div className="transition-all duration-300">
          <h1 className="text-xl font-bold text-gray-900 transition-all duration-300">Fast Delivery</h1>
          <p className="text-sm text-gray-600 transition-all duration-300 minimize-description">Items available for same-day delivery near you</p>
        </div>
        


      </div>

      {/* Location Info */}
      <div 
        className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-200 cursor-pointer hover:from-orange-100 hover:to-yellow-100 transition-colors"
        onClick={() => {
          // Location selection functionality - would integrate with existing location settings
          alert('Location selection - would open location settings or picker');
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <MapPin className="w-6 h-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <h2 className="font-medium text-gray-900">Delivering to your area</h2>
            <p className="text-sm text-gray-600">123 Green Street, Eco District</p>
          </div>
          <div className="text-xs text-orange-600 font-medium">
            Change
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