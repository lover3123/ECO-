import { useState, useRef } from 'react';
import { 
  Upload, Camera, X, CheckCircle, AlertCircle, Loader2, ImageIcon, 
  DollarSign, Tag, Package, MapPin, Eye, Heart, MessageCircle, 
  TrendingUp, Edit, Trash2, ArrowLeft, RotateCcw, Play, Pause 
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface SellPageProps {
  onProductAdded: (productData: any) => void;
  onBack: () => void;
  userListings?: any[];
  onEditProduct?: (productId: string) => void;
  onDeleteProduct?: (productId: string) => void;
  onUpdateProduct?: (productId: string, updates: any) => void;
}

interface FormData {
  title: string;
  category: string;
  condition: string;
  description: string;
  price: string;
  quantity: string;
  location: string;
  images: string[];
}

interface FormErrors {
  title?: string;
  category?: string;
  condition?: string;
  price?: string;
  quantity?: string;
  images?: string;
}

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
  quantity?: number;
  location?: string;
}

export function SellPage({ 
  onProductAdded, 
  onBack, 
  userListings = [], 
  onEditProduct,
  onDeleteProduct,
  onUpdateProduct 
}: SellPageProps) {
  const [activeTab, setActiveTab] = useState('sell');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    condition: '',
    description: '',
    price: '',
    quantity: '1',
    location: '',
    images: []
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Default listings for demo
  const [listings, setListings] = useState<Listing[]>(userListings.length > 0 ? userListings : [
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      price: 45,
      category: 'clothing',
      condition: 'Very Good',
      image: 'https://images.unsplash.com/photo-1723459330762-c774b77c4661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHByb2R1Y3RzJTIwZWNvJTIwZnJpZW5kbHl8ZW58MXx8fHwxNzU3MTM1Mzk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'active',
      views: 45,
      likes: 8,
      messages: 3,
      datePosted: '2024-01-15',
      quantity: 1,
      location: 'Downtown'
    },
    {
      id: '2',
      title: 'Sustainable Home Decor Set',
      price: 65,
      category: 'home',
      condition: 'Like New',
      image: 'https://images.unsplash.com/photo-1589365354848-78104c17f92d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHByb2R1Y3RzJTIwZWNvJTIwZnJpZW5kbHl8ZW58MXx8fHwxNzU3MTM1Mzk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'sold',
      views: 120,
      likes: 15,
      messages: 8,
      datePosted: '2024-01-10',
      quantity: 3,
      location: 'City Center'
    }
  ]);

  const categories = [
    { value: 'clothing', label: 'Clothing & Accessories', icon: '👕' },
    { value: 'electronics', label: 'Electronics', icon: '📱' },
    { value: 'home', label: 'Home & Garden', icon: '🏠' },
    { value: 'books', label: 'Books & Media', icon: '📚' },
    { value: 'toys', label: 'Toys & Games', icon: '🧸' },
    { value: 'other', label: 'Other', icon: '📦' }
  ];

  const conditions = [
    { value: 'new', label: 'New', desc: 'Brand new, never used' },
    { value: 'gently-used', label: 'Gently Used', desc: 'Used but in excellent condition' }
  ];

  const locations = [
    'Downtown', 'City Center', 'North Side', 'South Side', 'East District', 'West District'
  ];

  const generateRealisticImageUrl = async (index: number): Promise<string> => {
    const category = categories.find(cat => cat.value === formData.category);
    const baseImages = [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1527385352018-3c26dd6c3916?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'
    ];
    
    return baseImages[index % baseImages.length];
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Product title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.condition) {
      newErrors.condition = 'Please select item condition';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        newErrors.price = 'Please enter a valid price';
      }
    }

    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else {
      const qty = parseInt(formData.quantity);
      if (isNaN(qty) || qty < 1) {
        newErrors.quantity = 'Quantity must be at least 1';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsLoadingImages(true);
    const maxImages = 5 - formData.images.length;
    const filesToProcess = Array.from(files).slice(0, maxImages);
    
    try {
      const imagePromises = filesToProcess.map(async (file, index) => {
        for (let progress = 0; progress <= 100; progress += 25) {
          setUploadProgress(progress);
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        return await generateRealisticImageUrl(formData.images.length + index);
      });

      const newImageUrls = await Promise.all(imagePromises);
      setFormData(prev => ({ 
        ...prev, 
        images: [...prev.images, ...newImageUrls] 
      }));
      
      toast.success(`Added ${newImageUrls.length} photo${newImageUrls.length > 1 ? 's' : ''}!`);
    } catch (error) {
      toast.error('Failed to upload images. Please try again.');
    } finally {
      setIsLoadingImages(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const saveDraft = async () => {
    if (!formData.title.trim()) {
      toast.error('Please add a title before saving draft');
      return;
    }

    setIsDraftSaved(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Draft saved successfully!');
    setIsDraftSaved(false);
  };

  const handlePreview = () => {
    if (!validateForm()) {
      toast.error('Please fix the errors before previewing');
      return;
    }
    setShowPreview(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      let finalImages = formData.images;
      if (finalImages.length === 0) {
        const defaultImage = await generateRealisticImageUrl(0);
        finalImages = [defaultImage];
      }

      const productData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        condition: formData.condition,
        quantity: parseInt(formData.quantity),
        location: formData.location || 'Not specified',
        image: finalImages[0],
        images: finalImages
      };

      setShowSuccess(true);
      
      setTimeout(() => {
        onProductAdded(productData);
        // Reset form
        setFormData({
          title: '',
          category: '',
          condition: '',
          description: '',
          price: '',
          quantity: '1',
          location: '',
          images: []
        });
        setErrors({});
        setShowSuccess(false);
        setActiveTab('listings'); // Switch to listings tab
      }, 2500);

    } catch (error) {
      toast.error('Failed to list item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      condition: '',
      description: '',
      price: '',
      quantity: '1',
      location: '',
      images: []
    });
    setErrors({});
    setShowPreview(false);
  };

  const handleDeleteListing = (listingId: string) => {
    setListings(prev => prev.filter(listing => listing.id !== listingId));
    if (onDeleteProduct) {
      onDeleteProduct(listingId);
    }
    toast.success('Listing deleted successfully');
  };

  const handleRelistItem = (listing: Listing) => {
    setFormData({
      title: listing.title,
      category: listing.category,
      condition: listing.condition,
      description: `Re-listing: ${listing.title}`,
      price: listing.price.toString(),
      quantity: (listing.quantity || 1).toString(),
      location: listing.location || '',
      images: [listing.image]
    });
    setActiveTab('sell');
    toast.info('Item details loaded for re-listing');
  };

  const activeListings = listings.filter(l => l.status === 'active');
  const soldListings = listings.filter(l => l.status === 'sold');
  const draftListings = listings.filter(l => l.status === 'draft');

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="p-2 hover:bg-accent"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🌱</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl">Sell Products</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  List items & manage listings
                </p>
              </div>
            </div>
          </div>
          
          {activeTab === 'sell' && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={saveDraft}
              disabled={isDraftSaved || !formData.title.trim()}
            >
              {isDraftSaved ? (
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              ) : (
                <Pause className="w-3 h-3 mr-1" />
              )}
              {isDraftSaved ? 'Saving...' : 'Save Draft'}
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="sell" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Sell New Item</span>
              <span className="sm:hidden">Sell</span>
            </TabsTrigger>
            <TabsTrigger value="listings" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">My Listings</span>
              <span className="sm:hidden">Listings</span>
              <Badge variant="secondary" className="ml-1 text-xs">
                {activeListings.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Sell Tab */}
          <TabsContent value="sell" className="mt-0">
            <Card>
              <CardHeader className="space-y-4 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      List Your Item
                    </CardTitle>
                    <CardDescription>
                      Fill out the details to list your item for sale
                    </CardDescription>
                  </div>
                </div>

                {/* Progress Indicator */}
                {(isSubmitting || showSuccess) && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {showSuccess ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      )}
                      <span className="text-sm">
                        {showSuccess ? 'Item listed successfully!' : 'Processing your listing...'}
                      </span>
                    </div>
                    {!showSuccess && <Progress value={isSubmitting ? 85 : 0} className="h-2" />}
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                {showSuccess && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      🎉 Your item has been listed successfully! Check the "My Listings" tab to manage it.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Image Upload Section */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Product Photos {formData.images.length > 0 && `(${formData.images.length}/5)`}
                    </Label>

                    {/* Image Grid */}
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-full h-16 sm:h-20 md:h-24 object-cover rounded-lg border-2 border-border"
                          />
                          <Badge 
                            className="absolute top-1 left-1 bg-black/70 text-white text-xs px-1"
                            variant="secondary"
                          >
                            {index === 0 ? 'Main' : index + 1}
                          </Badge>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute -top-1 -right-1 w-5 h-5 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                      
                      {/* Add Photo Button */}
                      {formData.images.length < 5 && (
                        <label className="relative w-full h-16 sm:h-20 md:h-24 border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-accent/50 transition-colors group">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={isLoadingImages}
                          />
                          {isLoadingImages ? (
                            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                          ) : (
                            <>
                              <Upload className="w-4 h-4 text-muted-foreground group-hover:text-primary mb-1" />
                              <span className="text-xs text-muted-foreground group-hover:text-primary">Add</span>
                            </>
                          )}
                          {uploadProgress > 0 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-primary/20 rounded-b-lg">
                              <div 
                                className="h-1 bg-primary rounded-b-lg transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          )}
                        </label>
                      )}
                    </div>

                    {errors.images && (
                      <div className="flex items-center gap-2 text-sm text-destructive">
                        <AlertCircle className="w-3 h-3" />
                        {errors.images}
                      </div>
                    )}
                  </div>

                  {/* Product Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Product Title *
                    </Label>
                    <Input
                      id="title"
                      placeholder="What are you selling?"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className={errors.title ? 'border-destructive' : ''}
                      maxLength={100}
                    />
                    <div className="flex justify-between text-xs">
                      {errors.title && (
                        <span className="text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.title}
                        </span>
                      )}
                      <span className="text-muted-foreground ml-auto">
                        {formData.title.length}/100
                      </span>
                    </div>
                  </div>

                  {/* Category & Condition */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Category *
                      </Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              <div className="flex items-center gap-2">
                                <span>{category.icon}</span>
                                <span>{category.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <span className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.category}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Condition *</Label>
                      <RadioGroup 
                        value={formData.condition}
                        onValueChange={(value) => setFormData({ ...formData, condition: value })}
                        className="flex gap-4"
                      >
                        {conditions.map((condition) => (
                          <div key={condition.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={condition.value} id={condition.value} />
                            <Label htmlFor={condition.value} className="text-sm cursor-pointer">
                              {condition.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                      {errors.condition && (
                        <span className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.condition}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your item in detail - condition, size, brand, features, etc."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      maxLength={500}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Detailed descriptions help items sell faster</span>
                      <span>{formData.description.length}/500</span>
                    </div>
                  </div>

                  {/* Price & Quantity & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Price (₹) *
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
                        <Input
                          id="price"
                          type="number"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className={`pl-8 ${errors.price ? 'border-destructive' : ''}`}
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                      </div>
                      {errors.price && (
                        <span className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.price}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Stock Quantity *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="1"
                        min="1"
                        className={errors.quantity ? 'border-destructive' : ''}
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      />
                      {errors.quantity && (
                        <span className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.quantity}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location
                      </Label>
                      <Select 
                        value={formData.location} 
                        onValueChange={(value) => setFormData({ ...formData, location: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={handlePreview}
                      disabled={isSubmitting || showSuccess}
                      className="sm:w-auto w-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Listing
                    </Button>
                    
                    <Button 
                      type="submit" 
                      className="sm:flex-1 w-full"
                      disabled={isSubmitting || showSuccess}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Listing Item...
                        </>
                      ) : showSuccess ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Listed Successfully!
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Submit Listing
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={resetForm}
                      disabled={isSubmitting || showSuccess}
                      className="sm:w-auto w-full"
                    >
                      Clear Form
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Listings Tab */}
          <TabsContent value="listings" className="mt-0 space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active</p>
                      <p className="text-lg">{activeListings.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Eye className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Views</p>
                      <p className="text-lg">{listings.reduce((sum, l) => sum + l.views, 0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Likes</p>
                      <p className="text-lg">{listings.reduce((sum, l) => sum + l.likes, 0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Messages</p>
                      <p className="text-lg">{listings.reduce((sum, l) => sum + l.messages, 0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Listings */}
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="active">Active ({activeListings.length})</TabsTrigger>
                <TabsTrigger value="sold">Sold ({soldListings.length})</TabsTrigger>
                <TabsTrigger value="drafts">Drafts ({draftListings.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="mt-6">
                <ListingGrid 
                  listings={activeListings} 
                  onEdit={onEditProduct} 
                  onDelete={handleDeleteListing}
                  onRelist={handleRelistItem}
                />
              </TabsContent>

              <TabsContent value="sold" className="mt-6">
                <ListingGrid 
                  listings={soldListings} 
                  onEdit={onEditProduct} 
                  onDelete={handleDeleteListing}
                  onRelist={handleRelistItem}
                />
              </TabsContent>

              <TabsContent value="drafts" className="mt-6">
                <ListingGrid 
                  listings={draftListings} 
                  onEdit={onEditProduct} 
                  onDelete={handleDeleteListing}
                  onRelist={handleRelistItem}
                />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>

        {/* Preview Dialog */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Preview Your Listing</DialogTitle>
              <DialogDescription>
                This is how your item will appear to buyers
              </DialogDescription>
            </DialogHeader>
            
            <Card className="border-0">
              <div className="relative">
                {formData.images.length > 0 ? (
                  <img
                    src={formData.images[0]}
                    alt={formData.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                  {formData.condition || 'New'}
                </Badge>
              </div>
              
              <CardContent className="p-4 space-y-2">
                <h3 className="font-medium">{formData.title || 'Product Title'}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl text-primary">
                    ₹{formData.price || '0.00'}
                  </span>
                  {formData.quantity && parseInt(formData.quantity) > 1 && (
                    <Badge variant="outline">
                      Qty: {formData.quantity}
                    </Badge>
                  )}
                </div>
                {formData.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {formData.description}
                  </p>
                )}
                {formData.location && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {formData.location}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Edit Listing
              </Button>
              <Button onClick={() => {
                setShowPreview(false);
                handleSubmit(new Event('submit') as any);
              }}>
                Confirm & List
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function ListingGrid({ 
  listings, 
  onEdit, 
  onDelete,
  onRelist 
}: { 
  listings: Listing[]; 
  onEdit?: (id: string) => void; 
  onDelete: (id: string) => void;
  onRelist: (listing: Listing) => void;
}) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <Package className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="mb-2">No listings found</h3>
        <p className="text-muted-foreground">Your listings will appear here</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {listings.map((listing) => (
        <Card key={listing.id} className="overflow-hidden">
          <div className="relative">
            <ImageWithFallback
              src={listing.image}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
            <Badge 
              className={`absolute top-2 right-2 ${
                listing.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : listing.status === 'sold'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {listing.status}
            </Badge>
          </div>
          
          <CardContent className="p-4">
            <h3 className="font-medium line-clamp-1 mb-2">{listing.title}</h3>
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg text-primary">₹{listing.price}</span>
              <Badge variant="outline" className="text-xs">
                {listing.condition}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <div className="flex items-center gap-3">
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
            
            {listing.location && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <MapPin className="w-3 h-3" />
                {listing.location}
              </div>
            )}
            
            <p className="text-xs text-muted-foreground">
              Posted {new Date(listing.datePosted).toLocaleDateString()}
            </p>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <div className="flex gap-2 w-full">
              {onEdit && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(listing.id)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
              )}
              
              {listing.status === 'sold' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRelist(listing)}
                  className="flex-1"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Sell Again
                </Button>
              )}
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
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
                      className="bg-destructive hover:bg-destructive/90"
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