import { useState } from 'react';
import { Edit, Trash2, Eye, Heart, MessageCircle, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'sold': return 'bg-blue-100 text-blue-800';
    case 'draft': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

interface Listing {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  image: string;
  status: 'active' | 'sold' | 'draft';
  views: number;
  likes: number;
  messages: number;
  datePosted: string;
}

interface MyListingsProps {
  onEditProduct: (productId: string) => void;
}

export function MyListings({ onEditProduct }: MyListingsProps) {
  const [listings, setListings] = useState<Listing[]>([
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      price: 45,
      category: 'clothing',
      condition: 'Very Good',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
      status: 'active',
      views: 45,
      likes: 8,
      messages: 3,
      datePosted: '2024-01-15'
    },
    {
      id: '2',
      title: 'Sustainable Home Decor Set',
      price: 65,
      category: 'home',
      condition: 'Like New',
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
      status: 'sold',
      views: 120,
      likes: 15,
      messages: 8,
      datePosted: '2024-01-10'
    },
    {
      id: '3',
      title: 'Eco-Friendly Kitchen Tools',
      price: 25,
      category: 'home',
      condition: 'Good',
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
      status: 'draft',
      views: 0,
      likes: 0,
      messages: 0,
      datePosted: '2024-01-20'
    }
  ]);

  const deleteListing = (id: string) => {
    setListings(listings.filter(listing => listing.id !== id));
  };

  const activeListings = listings.filter(l => l.status === 'active');
  const soldListings = listings.filter(l => l.status === 'sold');
  const draftListings = listings.filter(l => l.status === 'draft');

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl mb-2">My Listings</h1>
        <p className="text-gray-600">Manage your posted items and track their performance</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-xl">{activeListings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-xl">{listings.reduce((sum, l) => sum + l.views, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Likes</p>
                <p className="text-xl">{listings.reduce((sum, l) => sum + l.likes, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Messages</p>
                <p className="text-xl">{listings.reduce((sum, l) => sum + l.messages, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Listings Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active ({activeListings.length})</TabsTrigger>
          <TabsTrigger value="sold">Sold ({soldListings.length})</TabsTrigger>
          <TabsTrigger value="drafts">Drafts ({draftListings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <ListingGrid listings={activeListings} onEdit={onEditProduct} onDelete={deleteListing} />
        </TabsContent>

        <TabsContent value="sold" className="mt-6">
          <ListingGrid listings={soldListings} onEdit={onEditProduct} onDelete={deleteListing} />
        </TabsContent>

        <TabsContent value="drafts" className="mt-6">
          <ListingGrid listings={draftListings} onEdit={onEditProduct} onDelete={deleteListing} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ListingGrid({ 
  listings, 
  onEdit, 
  onDelete 
}: { 
  listings: Listing[]; 
  onEdit: (id: string) => void; 
  onDelete: (id: string) => void; 
}) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <TrendingUp className="w-12 h-12 mx-auto" />
        </div>
        <h3>No listings found</h3>
        <p className="text-gray-600">Your listings will appear here</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <Card key={listing.id} className="overflow-hidden">
          <div className="relative">
            <ImageWithFallback
              src={listing.image}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
            <Badge className={`absolute top-2 right-2 ${getStatusColor(listing.status)}`}>
              {listing.status}
            </Badge>
          </div>
          
          <CardHeader className="pb-2">
            <CardTitle className="text-lg line-clamp-1">{listing.title}</CardTitle>
            <div className="flex items-center justify-between">
              <span className="text-xl text-primary">${listing.price}</span>
              <Badge variant="outline" className="text-xs">
                {listing.condition}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pb-2">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {listing.views}
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {listing.likes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {listing.messages}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Posted {new Date(listing.datePosted).toLocaleDateString()}
            </p>
          </CardContent>

          <CardFooter className="pt-2">
            <div className="flex gap-2 w-full">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(listing.id)}
                className="flex-1"
              >
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Listing</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{listing.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(listing.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}