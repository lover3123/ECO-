import { useState } from 'react';
import { Package, Star, MessageCircle, RotateCcw, Truck, CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Utility functions for status styling
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'processing': return <RefreshCw className="w-4 h-4 text-yellow-500" />;
    case 'shipped': return <Truck className="w-4 h-4 text-blue-500" />;
    case 'delivered': return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'cancelled': return <Package className="w-4 h-4 text-red-500" />;
    default: return <Package className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'processing': return 'bg-yellow-100 text-yellow-800';
    case 'shipped': return 'bg-blue-100 text-blue-800';
    case 'delivered': return 'bg-green-100 text-green-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

interface Purchase {
  id: string;
  title: string;
  price: number;
  seller: string;
  image: string;
  orderDate: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  estimatedDelivery?: string;
  rating?: number;
  review?: string;
  canReturn: boolean;
  canReview: boolean;
}

interface Order {
  id: string;
  items: Array<{
    id: string;
    title: string;
    price: number;
    condition: string;
    seller: string;
    image: string;
    quantity: number;
  }>;
  total: number;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
}

interface PreviousPurchasesProps {
  orders: Order[];
  onProductClick: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export function PreviousPurchases({ orders, onProductClick, onUpdateOrderStatus }: PreviousPurchasesProps) {
  // Convert orders to purchases format - flatten order items into individual purchases
  const [userReviews, setUserReviews] = useState<{[key: string]: {rating: number, review: string}}>({});
  
  const purchases: Purchase[] = orders.flatMap(order => 
    order.items.map(item => ({
      id: `${order.id}_${item.id}`,
      title: item.title,
      price: item.price,
      seller: item.seller,
      image: item.image,
      orderDate: order.orderDate,
      status: order.status === 'pending' ? 'processing' : order.status,
      trackingNumber: order.trackingNumber,
      estimatedDelivery: order.status === 'shipped' ? 
        new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() : // 3 days from now
        undefined,
      rating: userReviews[`${order.id}_${item.id}`]?.rating,
      review: userReviews[`${order.id}_${item.id}`]?.review,
      canReturn: order.status === 'delivered',
      canReview: order.status === 'delivered' && !userReviews[`${order.id}_${item.id}`]
    }))
  );

  const [reviewDialog, setReviewDialog] = useState<{ open: boolean; purchase?: Purchase }>({ open: false });
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

  const submitReview = () => {
    if (reviewDialog.purchase) {
      setUserReviews(prev => ({
        ...prev,
        [reviewDialog.purchase!.id]: {
          rating: reviewData.rating,
          review: reviewData.comment
        }
      }));
      setReviewDialog({ open: false });
      setReviewData({ rating: 5, comment: '' });
    }
  };

  const filterPurchases = (status?: string) => {
    if (!status) return purchases;
    return purchases.filter(p => p.status === status);
  };

  const allPurchases = filterPurchases();
  const activePurchases = filterPurchases('processing').concat(filterPurchases('shipped'));
  const completedPurchases = filterPurchases('delivered');

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl mb-2">Order History</h1>
        <p className="text-gray-600">Track your orders and manage your purchases</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Orders ({allPurchases.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activePurchases.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedPurchases.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <PurchaseList purchases={allPurchases} onReview={(purchase) => setReviewDialog({ open: true, purchase })} />
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <PurchaseList purchases={activePurchases} onReview={(purchase) => setReviewDialog({ open: true, purchase })} />
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <PurchaseList purchases={completedPurchases} onReview={(purchase) => setReviewDialog({ open: true, purchase })} />
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={reviewDialog.open} onOpenChange={(open) => setReviewDialog({ open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate & Review</DialogTitle>
            <DialogDescription>
              Share your experience with this item
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm">Rating</label>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewData({ ...reviewData, rating: star })}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= reviewData.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="review-comment" className="text-sm">Review (optional)</label>
              <Textarea
                id="review-comment"
                placeholder="Tell others about your experience..."
                value={reviewData.comment}
                onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setReviewDialog({ open: false })}>
                Cancel
              </Button>
              <Button onClick={submitReview}>
                Submit Review
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PurchaseList({ 
  purchases, 
  onReview 
}: { 
  purchases: Purchase[]; 
  onReview: (purchase: Purchase) => void; 
}) {
  if (purchases.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <h3>No orders found</h3>
        <p className="text-gray-600">Your orders will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {purchases.map((purchase) => (
        <Card key={purchase.id}>
          <CardContent className="p-4 md:p-6">
            {/* Mobile-First Responsive Layout */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Product Image */}
              <div className="w-full sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <ImageWithFallback
                  src={purchase.image}
                  alt={purchase.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
              
              {/* Content Section */}
              <div className="flex-1 min-w-0 space-y-3">
                {/* Header with Title, Price & Status */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
                      {purchase.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <span className="font-medium">by</span> {purchase.seller}
                      </span>
                      <span className="hidden sm:inline text-gray-400">•</span>
                      <span>
                        {new Date(purchase.orderDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                    <div className="text-xl font-bold text-primary">
                      ${purchase.price}
                    </div>
                    <Badge className={`${getStatusColor(purchase.status)} font-medium`} variant="outline">
                      <span className="flex items-center gap-1.5">
                        {getStatusIcon(purchase.status)}
                        <span className="capitalize">{purchase.status}</span>
                      </span>
                    </Badge>
                  </div>
                </div>

                {/* Tracking & Delivery Info */}
                <div className="space-y-2">
                  {purchase.trackingNumber && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-600">
                        <span className="font-medium">Tracking:</span> {purchase.trackingNumber}
                      </span>
                    </div>
                  )}

                  {purchase.estimatedDelivery && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-600">
                        <span className="font-medium">Expected:</span> {' '}
                        {new Date(purchase.estimatedDelivery).toLocaleDateString('en-US', { 
                          weekday: 'short',
                          month: 'short', 
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </div>

                {/* Rating & Review */}
                {purchase.rating && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= purchase.rating!
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Your Review
                      </span>
                    </div>
                    {purchase.review && (
                      <p className="text-sm text-gray-600 italic leading-relaxed">
                        "{purchase.review}"
                      </p>
                    )}
                  </div>
                )}

                {/* Action Buttons - Responsive Grid */}
                <div className="grid grid-cols-2 sm:flex gap-2 pt-2">
                  {purchase.status === 'shipped' && (
                    <Button variant="default" size="sm" className="col-span-2 sm:col-span-1">
                      <Truck className="w-3 h-3 mr-1.5" />
                      Track Package
                    </Button>
                  )}
                  
                  {purchase.canReview && (
                    <Button variant="outline" size="sm" onClick={() => onReview(purchase)}>
                      <Star className="w-3 h-3 mr-1.5" />
                      Review
                    </Button>
                  )}
                  
                  {purchase.canReturn && (
                    <Button variant="outline" size="sm">
                      <RotateCcw className="w-3 h-3 mr-1.5" />
                      Return
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-3 h-3 mr-1.5" />
                    <span className="hidden sm:inline">Contact</span>
                    <span className="sm:hidden">Message</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}