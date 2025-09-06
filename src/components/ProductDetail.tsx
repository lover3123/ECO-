import { useState } from 'react';
import { ArrowLeft, Heart, Share, MessageCircle, ShoppingCart, Star, Shield, Truck, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
  onAddToCart: (productId: string) => void;
  onMessage: (sellerId: string) => void;
}

export function ProductDetail({ productId, onBack, onAddToCart, onMessage }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Mock product data - in a real app, this would be fetched based on productId
  const product = {
    id: productId,
    title: 'Vintage Denim Jacket',
    description: 'Beautiful vintage denim jacket in excellent condition. This classic piece features authentic distressing and has been well-maintained. Perfect for layering and adding a vintage touch to any outfit. Originally from a premium brand, this jacket has stood the test of time and is ready for many more years of wear.',
    price: 45,
    originalPrice: 120,
    category: 'Clothing & Accessories',
    condition: 'Very Good',
    brand: 'Vintage Brand',
    size: 'Medium',
    color: 'Blue',
    material: 'Denim',
    images: [
      'https://images.unsplash.com/photo-1723459330762-c774b77c4661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNvbmRoYW5kJTIwdmludGFnZSUyMGNsb3RoZXN8ZW58MXx8fHwxNzU3MTM1NDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1723459330762-c774b77c4661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNvbmRoYW5kJTIwdmludGFnZSUyMGNsb3RoZXN8ZW58MXx8fHwxNzU3MTM1NDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    seller: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612990c?w=150',
      rating: 4.8,
      totalSales: 47,
      joinedDate: '2023-03-15',
      responseTime: '~2 hours'
    },
    tags: ['sustainable', 'vintage', 'denim', 'classic'],
    views: 234,
    likes: 18,
    postedDate: '2024-01-15',
    location: 'Portland, OR'
  };

  const savings = product.originalPrice - product.price;
  const savingsPercentage = Math.round((savings / product.originalPrice) * 100);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 -ml-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to listings
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative">
            <ImageWithFallback
              src={product.images[currentImageIndex]}
              alt={product.title}
              className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-white/90 hover:bg-white"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-white/90 hover:bg-white"
              >
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-2xl mb-2">{product.title}</h1>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">{product.condition}</Badge>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {product.views} views
              </div>
            </div>
            
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl text-primary">${product.price}</span>
              {product.originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                  <Badge className="bg-green-100 text-green-800">
                    Save {savingsPercentage}%
                  </Badge>
                </div>
              )}
            </div>

            <div className="flex gap-3 mb-6">
              <Button
                className="flex-1"
                onClick={() => onAddToCart(product.id)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={() => onMessage(product.seller.name)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </div>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Brand:</span>
                  <span className="ml-2">{product.brand}</span>
                </div>
                <div>
                  <span className="text-gray-600">Size:</span>
                  <span className="ml-2">{product.size}</span>
                </div>
                <div>
                  <span className="text-gray-600">Color:</span>
                  <span className="ml-2">{product.color}</span>
                </div>
                <div>
                  <span className="text-gray-600">Material:</span>
                  <span className="ml-2">{product.material}</span>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-gray-600 mb-2">Description:</p>
                <p className="text-sm leading-relaxed">{product.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Seller Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Seller Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={product.seller.avatar} />
                  <AvatarFallback>{product.seller.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{product.seller.name}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{product.seller.rating}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {product.seller.totalSales} sales • Joined {new Date(product.seller.joinedDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    Responds in {product.seller.responseTime}
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View Seller Profile
              </Button>
            </CardContent>
          </Card>

          {/* Trust & Safety */}
          <Card>
            <CardContent className="p-6">
              {/* Enhanced Features Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Secure Payment */}
                <div className="group relative">
                  <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <Shield className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-gray-900">Secure Payment</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">Protected transactions with buyer guarantee</p>
                    </div>
                  </div>
                </div>

                {/* Fast Shipping */}
                <div className="group relative">
                  <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <Truck className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-gray-900">Fast Shipping</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">Quick delivery in 2-3 business days</p>
                    </div>
                  </div>
                </div>

                {/* Easy Returns */}
                <div className="group relative">
                  <div className="flex flex-col items-center text-center space-y-3 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100 hover:from-purple-100 hover:to-violet-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <RotateCcw className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-gray-900">Easy Returns</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">Hassle-free 7-day return policy</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Verified Seller</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Quality Checked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Eco-Friendly</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}