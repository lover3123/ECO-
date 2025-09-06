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
  image: string;
  likes: number;
  isLiked: boolean;
}

interface ProductFeedProps {
  onProductClick: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

export function ProductFeed({ onProductClick, onAddToCart }: ProductFeedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const mockProducts: Product[] = [
    {
      id: '1',
      title: 'Organic Cotton T-Shirt',
      description: 'Gently used organic cotton t-shirt in excellent condition',
      price: 15,
      category: 'clothing',
      condition: 'Like New',
      seller: 'EcoSeller123',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop',
      likes: 12,
      isLiked: false
    },
    {
      id: '2',
      title: 'Vintage Wooden Chair',
      description: 'Beautiful mid-century wooden chair, restored to perfection',
      price: 85,
      category: 'furniture',
      condition: 'Good',
      seller: 'VintageFinds',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
      likes: 28,
      isLiked: true
    },
    {
      id: '3',
      title: 'Sustainable Living Book Set',
      description: 'Collection of 5 books about sustainable living and zero waste',
      price: 25,
      category: 'books',
      condition: 'Very Good',
      seller: 'BookLover42',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      likes: 15,
      isLiked: false
    },
    {
      id: '4',
      title: 'Reusable Glass Containers',
      description: 'Set of 8 glass containers with bamboo lids, perfect for zero waste kitchen',
      price: 35,
      category: 'home',
      condition: 'Like New',
      seller: 'ZeroWasteHome',
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
      likes: 22,
      isLiked: false
    },
    {
      id: '5',
      title: 'Vintage Denim Jacket',
      description: 'Classic denim jacket with authentic vintage wear and patina',
      price: 45,
      category: 'clothing',
      condition: 'Very Good',
      seller: 'VintageStyle',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
      likes: 31,
      isLiked: false
    },
    {
      id: '6',
      title: 'Indoor Plant Collection',
      description: 'Three healthy indoor plants perfect for air purification',
      price: 28,
      category: 'home',
      condition: 'Like New',
      seller: 'PlantParent',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
      likes: 19,
      isLiked: true
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'books', label: 'Books' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'electronics', label: 'Electronics' }
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
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

        {showFilters && (
          <div className="flex gap-4 p-4 bg-green-50 rounded-lg">
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
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  // Handle like toggle
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
  );
}