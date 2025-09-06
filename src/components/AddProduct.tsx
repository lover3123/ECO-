import { useState, useRef } from 'react';
import { Upload, Camera, X, CheckCircle, AlertCircle, Loader2, ImageIcon, DollarSign, Tag, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface AddProductProps {
  onProductAdded: (productData: any) => void;
}

interface FormData {
  title: string;
  category: string;
  condition: string;
  description: string;
  price: string;
  images: string[];
}

interface FormErrors {
  title?: string;
  category?: string;
  condition?: string;
  price?: string;
  images?: string;
}

export function AddProduct({ onProductAdded }: AddProductProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    condition: '',
    description: '',
    price: '',
    images: []
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { value: 'clothing', label: 'Clothing & Accessories', icon: '👕', searchTerms: ['fashion', 'clothes', 'style'] },
    { value: 'furniture', label: 'Furniture', icon: '🪑', searchTerms: ['furniture', 'home decor', 'interior'] },
    { value: 'books', label: 'Books & Media', icon: '📚', searchTerms: ['books', 'reading', 'education'] },
    { value: 'home', label: 'Home & Garden', icon: '🏠', searchTerms: ['home goods', 'kitchen', 'garden'] },
    { value: 'electronics', label: 'Electronics', icon: '📱', searchTerms: ['electronics', 'technology', 'gadgets'] },
    { value: 'toys', label: 'Toys & Games', icon: '🧸', searchTerms: ['toys', 'games', 'kids'] },
    { value: 'sports', label: 'Sports & Outdoors', icon: '⚽', searchTerms: ['sports', 'fitness', 'outdoor'] },
    { value: 'other', label: 'Other', icon: '📦', searchTerms: ['miscellaneous', 'items', 'products'] }
  ];

  const conditions = [
    { value: 'Like New', label: 'Like New', desc: 'Barely used, no visible wear', discount: 10 },
    { value: 'Very Good', label: 'Very Good', desc: 'Lightly used, minor wear', discount: 25 },
    { value: 'Good', label: 'Good', desc: 'Used with some wear but functional', discount: 40 },
    { value: 'Fair', label: 'Fair', desc: 'Well used, noticeable wear', discount: 60 },
    { value: 'Poor', label: 'For Parts/Repair', desc: 'Damaged, needs repair', discount: 80 }
  ];

  // Get search terms for selected category
  const getSearchTermsForCategory = (categoryValue: string) => {
    const category = categories.find(cat => cat.value === categoryValue);
    return category?.searchTerms || ['product', 'item'];
  };

  // Simulate realistic image URLs based on category and title
  const generateRealisticImageUrl = async (index: number): Promise<string> => {
    const searchTerms = getSearchTermsForCategory(formData.category);
    const titleWords = formData.title.toLowerCase().split(' ').slice(0, 2); // First 2 words from title
    const searchQuery = [...titleWords, ...searchTerms].slice(0, 3).join(' ');
    
    // Use Unsplash with category-specific search
    const unsplashUrls = [
      `https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800`,
      `https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800`,
      `https://images.unsplash.com/photo-1527385352018-3c26dd6c3916?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800`,
      `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800`,
      `https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800`
    ];
    
    return unsplashUrls[index % unsplashUrls.length];
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
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
      } else if (price > 10000) {
        newErrors.price = 'Price seems too high. Please verify.';
      }
    }

    if (formData.images.length === 0) {
      newErrors.images = 'At least one photo is recommended for better sales';
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
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 20) {
          setUploadProgress(progress);
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Generate realistic image URL
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
    toast.info('Photo removed');
  };

  const handleQuickFill = () => {
    const sampleData = {
      title: 'Vintage Leather Jacket',
      category: 'clothing',
      condition: 'Very Good',
      description: 'Classic brown leather jacket in excellent condition. Soft, supple leather with minimal wear. Perfect for fall and winter. Size Large.',
      price: '75.00'
    };
    
    setFormData({ ...sampleData, images: formData.images });
    toast.info('Form filled with sample data');
  };

  const getSuggestedPrice = () => {
    if (!formData.condition || !formData.price) return null;
    
    const condition = conditions.find(c => c.value === formData.condition);
    const basePrice = parseFloat(formData.price);
    
    if (condition && !isNaN(basePrice)) {
      const suggestedPrice = basePrice * (1 - condition.discount / 100);
      return Math.max(suggestedPrice, 1); // Minimum $1
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // If no images uploaded, generate one based on category and title
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
          images: []
        });
        setErrors({});
        setShowSuccess(false);
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
      images: []
    });
    setErrors({});
    toast.info('Form cleared');
  };

  const selectedCategory = categories.find(cat => cat.value === formData.category);
  const selectedCondition = conditions.find(cond => cond.value === formData.condition);
  const suggestedPrice = getSuggestedPrice();

  return (
    <div className="max-w-2xl mx-auto p-2 sm:p-4 pb-4 sm:pb-8">
      <Card>
        <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🌱</span>
              </div>
              <div>
                <CardTitle className="text-xl">List Your Item</CardTitle>
                <CardDescription>
                  Help items find new homes and reduce waste
                </CardDescription>
              </div>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={handleQuickFill}
              disabled={isSubmitting}
            >
              Quick Fill
            </Button>
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
              {!showSuccess && <Progress value={isSubmitting ? 75 : 0} className="h-2" />}
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pb-6 sm:pb-8">
          {showSuccess && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-800">
                🎉 Your item has been listed successfully! Redirecting to your listings...
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Photos {formData.images.length > 0 && `(${formData.images.length}/5)`}
                </Label>
                {isLoadingImages && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Uploading...
                  </div>
                )}
              </div>

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
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <AlertCircle className="w-3 h-3" />
                  {errors.images}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                First photo will be the main image. Add up to 5 photos for better visibility.
              </p>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Title *
              </Label>
              <Input
                id="title"
                placeholder="What are you selling? (e.g., Vintage Leather Jacket)"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                {selectedCategory && (
                  <div className="flex items-center gap-1">
                    <span className="text-lg">{selectedCategory.icon}</span>
                    <span className="text-sm text-muted-foreground">
                      {selectedCategory.label}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Condition *</Label>
                <Select 
                  value={formData.condition} 
                  onValueChange={(value) => setFormData({ ...formData, condition: value })}
                >
                  <SelectTrigger className={errors.condition ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition.value} value={condition.value}>
                        <div className="space-y-1">
                          <div className="font-medium">{condition.label}</div>
                          <div className="text-xs text-muted-foreground">{condition.desc}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.condition && (
                  <span className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.condition}
                  </span>
                )}
                {selectedCondition && (
                  <div className="text-xs text-muted-foreground">
                    {selectedCondition.desc}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the item's condition, size, brand, materials, and any other relevant details that would help buyers..."
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                maxLength={1000}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Add details to help your item sell faster</span>
                <span>{formData.description.length}/1000</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Price *
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
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
              
              {errors.price ? (
                <span className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.price}
                </span>
              ) : (
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Set a fair price to help your item sell quickly</p>
                  {suggestedPrice && (
                    <p className="text-primary">
                      💡 Suggested for {formData.condition}: ${suggestedPrice.toFixed(2)}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2 sm:pt-4">
              <Button 
                type="submit" 
                className="flex-1"
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
                  'List Item'
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={resetForm}
                disabled={isSubmitting || showSuccess}
              >
                Clear
              </Button>
            </div>

            {/* Form Summary */}
            {formData.title && formData.category && formData.condition && formData.price && (
              <Card className="bg-accent/50 border-primary/20">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-sm">Ready to List</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Item:</span>
                      <span className="font-medium">{formData.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span>{selectedCategory?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Condition:</span>
                      <span>{formData.condition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-bold text-primary">${formData.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Photos:</span>
                      <span>{formData.images.length}/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}