import { useState } from 'react';
import { Search, Filter, Heart, ShoppingCart } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  seller: string;
  sellerEmail: string;
  image: string;
  images: string[];
  likes: number;
  isLiked: boolean;
  dateAdded: string;
  views: number;
  location: string;
}

interface ProductFeedProps {
  products: Product[];
  onProductClick: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  onToggleLike: (productId: string) => void;
  onLocationClick?: () => void;
  onFastDeliveryClick?: () => void;
}

export function ProductFeed({ 
  products, 
  onProductClick, 
  onAddToCart, 
  onToggleLike, 
  onLocationClick, 
  onFastDeliveryClick 
}: ProductFeedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Categories for filtering

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'books', label: 'Books' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'electronics', label: 'Electronics' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Mobile Header with Logo and Search - Fixed Position */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        {/* Logo Section */}
        <div className="px-4 py-3 border-b border-gray-50">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white">🌱</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">EcoFinds</h1>
                <p className="text-xs text-gray-600">Sustainable Shopping</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="px-4 py-3">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 ${showFilters ? 'bg-primary text-primary-foreground' : ''}`}
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="px-4 pb-4 border-t border-gray-100 bg-white/95 backdrop-blur-sm">
            <div className="pt-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Search and Filters */}
      <div className="hidden md:block mb-6 p-4">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search for sustainable products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
        
        {/* Desktop Filters */}
        {showFilters && (
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex gap-4 flex-wrap">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Container - Properly scrollable */}
      <div className="min-h-screen">
        {/* Content with proper spacing for mobile header */}
        <div className={`p-4 ${showFilters ? 'pt-48' : 'pt-40'} md:pt-4 pb-8`}>
          {/* Location & Delivery Section */}
          <div className="mb-6 space-y-4">
            {/* Location & Delivery Options */}
            <div className="flex items-center justify-between bg-gradient-to-r from-primary/5 to-green-50 p-4 rounded-xl border border-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary text-lg">📍</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Delivery to</p>
                  <p className="text-sm text-gray-600">Select your address</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onLocationClick && onLocationClick()}
                className="border-primary/20 hover:bg-primary/5"
              >
                Change
              </Button>
            </div>

            {/* Fast Delivery Banner */}
            <div 
              className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-200 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onFastDeliveryClick && onFastDeliveryClick()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 text-lg">⚡</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Fast Delivery Available</p>
                    <p className="text-sm text-orange-600">Items near you • Same day delivery</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Tap to explore</p>
                  <span className="text-orange-600">→</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                <div onClick={() => onProductClick(product.id)} className="relative">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Badge variant="secondary" className="bg-white/90 text-xs">
                      {product.condition}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 left-2 w-8 h-8 p-0 bg-white/90 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLike(product.id);
                    }}
                  >
                    <Heart className={`w-4 h-4 ${product.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </Button>
                </div>
                
                <CardContent className="p-4" onClick={() => onProductClick(product.id)}>
                  <h3 className="font-medium mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg text-primary">${product.price}</span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Heart className="w-3 h-3" />
                      {product.likes}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">by {product.seller}</p>
                </CardContent>
                
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product.id);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* No Results State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3>No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}