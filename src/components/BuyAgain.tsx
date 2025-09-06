import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Clock, Star, RotateCcw, Search, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Order {
  id: string;
  items: Array<{
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    seller: string;
    rating?: number;
    availability: 'available' | 'unavailable' | 'similar';
  }>;
  orderDate: string;
  status: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  seller: string;
  rating?: number;
}

interface BuyAgainProps {
  orders: Order[];
  products: Product[];
  onBack: () => void;
  onAddToCart: (productId: string) => void;
  onProductClick: (productId: string) => void;
}

export function BuyAgain({ orders, products, onBack, onAddToCart, onProductClick }: BuyAgainProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');

  // Extract all items from orders and prepare them for repurchase
  const allPurchasedItems = orders.flatMap(order => 
    order.items.map(item => {
      const currentProduct = products.find(p => p.id === item.id);
      const availability = currentProduct ? 'available' : 
                          Math.random() > 0.7 ? 'similar' : 'unavailable';
      
      return {
        ...item,
        orderDate: order.orderDate,
        orderId: order.id,
        lastPurchased: new Date(order.orderDate).toLocaleDateString(),
        availability,
        rating: currentProduct ? 4.5 : undefined,
        imageUrl: item.image
      };
    })
  );

  // Filter and sort items
  const filteredItems = allPurchasedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.seller.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'available' && item.availability === 'available') ||
                         (filterBy === 'unavailable' && item.availability === 'unavailable');
    
    return matchesSearch && matchesFilter;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case 'unavailable':
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
      case 'similar':
        return <Badge className="bg-blue-100 text-blue-800">Similar Available</Badge>;
      default:
        return null;
    }
  };

  const getActionButton = (item: any) => {
    switch (item.availability) {
      case 'available':
        return (
          <Button 
            onClick={() => onAddToCart(item.id)}
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        );
      case 'unavailable':
        return (
          <Button 
            variant="outline" 
            disabled
            className="w-full"
          >
            Out of Stock
          </Button>
        );
      case 'similar':
        return (
          <Button 
            variant="outline"
            onClick={() => onProductClick(item.id)}
            className="w-full"
          >
            View Similar
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
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
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <RotateCcw className="w-6 h-6 text-primary" />
            Buy Again
          </h1>
          <p className="text-gray-600">Repurchase items from your order history</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search your past purchases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-36">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{allPurchasedItems.length}</div>
            <div className="text-sm text-gray-600">Total Items Purchased</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {allPurchasedItems.filter(item => item.availability === 'available').length}
            </div>
            <div className="text-sm text-gray-600">Available to Reorder</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-500">
              ${allPurchasedItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </CardContent>
        </Card>
      </div>

      {/* Items Grid */}
      {sortedItems.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <RotateCcw className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? 'Try adjusting your search terms' : 'You haven\'t made any purchases yet'}
            </p>
            <Button onClick={onBack} variant="outline">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedItems.map((item) => (
            <Card key={`${item.orderId}-${item.id}`} className="group hover:shadow-lg transition-shadow h-fit">
              <CardContent className="p-3 md:p-4">
                <div className="relative mb-2 md:mb-3">
                  <ImageWithFallback
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-32 sm:h-36 md:h-48 object-cover rounded-lg cursor-pointer"
                    onClick={() => onProductClick(item.id)}
                  />
                  <div className="absolute top-2 right-2">
                    {getAvailabilityBadge(item.availability)}
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <h3 
                    className="font-medium text-gray-900 line-clamp-2 cursor-pointer hover:text-primary text-sm md:text-base"
                    onClick={() => onProductClick(item.id)}
                  >
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-base md:text-lg font-bold text-primary">${item.price}</span>
                    {item.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs md:text-sm text-gray-600">{item.rating}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-xs md:text-sm text-gray-600">
                    <div className="truncate">Sold by {item.seller}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">Last purchased: {item.lastPurchased}</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-3 pt-0 md:p-4 md:pt-0">
                {getActionButton(item)}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}