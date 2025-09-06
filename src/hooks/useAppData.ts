import { useState, useCallback } from 'react';

export interface Product {
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

export interface CartItem {
  id: string;
  title: string;
  price: number;
  condition: string;
  seller: string;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
}

export function useAppData() {
  // Mock products data - simulates real-time data with improved images and variety
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      title: 'Organic Cotton T-Shirt',
      description: 'Gently used organic cotton t-shirt in excellent condition. Perfect for sustainable fashion lovers.',
      price: 15,
      category: 'clothing',
      condition: 'Like New',
      seller: 'EcoSeller123',
      sellerEmail: 'ecoseller@example.com',
      image: 'https://images.unsplash.com/photo-1643286131725-5e0ad3b3ca02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9uJTIwdC1zaGlydCUyMHNlY29uZGhhbmR8ZW58MXx8fHwxNzU3MTUxMjU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      images: ['https://images.unsplash.com/photo-1643286131725-5e0ad3b3ca02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9uJTIwdC1zaGlydCUyMHNlY29uZGhhbmR8ZW58MXx8fHwxNzU3MTUxMjU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
      likes: 12,
      isLiked: false,
      dateAdded: '2024-01-15',
      views: 45,
      location: 'San Francisco, CA'
    },
    {
      id: '2',
      title: 'Vintage Wooden Chair',
      description: 'Beautiful mid-century wooden chair, well-maintained and perfect for any home office.',
      price: 85,
      category: 'furniture',
      condition: 'Very Good',
      seller: 'VintageHome',
      sellerEmail: 'vintage@example.com',
      image: 'https://images.unsplash.com/photo-1548763671-8777c887b95a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwd29vZGVuJTIwZnVybml0dXJlJTIwY2hhaXJ8ZW58MXx8fHwxNzU3MTUxMjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      images: ['https://images.unsplash.com/photo-1548763671-8777c887b95a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwd29vZGVuJTIwZnVybml0dXJlJTIwY2hhaXJ8ZW58MXx8fHwxNzU3MTUxMjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
      likes: 28,
      isLiked: true,
      dateAdded: '2024-01-12',
      views: 152,
      location: 'Portland, OR'
    },
    {
      id: '3',
      title: 'Sustainable Living Book Set',
      description: 'Collection of 5 books about sustainable living, organic gardening, and zero-waste lifestyle.',
      price: 25,
      category: 'books',
      condition: 'Very Good',
      seller: 'BookLover42',
      sellerEmail: 'booklover@example.com',
      image: 'https://images.unsplash.com/photo-1536411396596-afed9fa3c1b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGJvb2tzJTIwZW52aXJvbm1lbnR8ZW58MXx8fHwxNzU3MTUxMjYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      images: ['https://images.unsplash.com/photo-1536411396596-afed9fa3c1b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGJvb2tzJTIwZW52aXJvbm1lbnR8ZW58MXx8fHwxNzU3MTUxMjYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
      likes: 15,
      isLiked: false,
      dateAdded: '2024-01-10',
      views: 67,
      location: 'Austin, TX'
    },
    {
      id: '4',
      title: 'Eco-Friendly Glass Containers Set',
      description: 'Set of 8 borosilicate glass containers with bamboo lids. Perfect for zero-waste kitchen storage.',
      price: 35,
      category: 'home',
      condition: 'Like New',
      seller: 'ZeroWasteHome',
      sellerEmail: 'zerowaste@example.com',
      image: 'https://images.unsplash.com/photo-1647661648943-7c480dc91dbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGdsYXNzJTIwY29udGFpbmVyc3xlbnwxfHx8fDE3NTcxNTEyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      images: ['https://images.unsplash.com/photo-1647661648943-7c480dc91dbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGdsYXNzJTIwY29udGFpbmVyc3xlbnwxfHx8fDE3NTcxNTEyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
      likes: 22,
      isLiked: false,
      dateAdded: '2024-01-08',
      views: 89,
      location: 'Seattle, WA'
    },
    {
      id: '5',
      title: 'Vintage Film Camera',
      description: 'Classic 35mm film camera in working condition. Includes original leather case and manual.',
      price: 120,
      category: 'electronics',
      condition: 'Good',
      seller: 'RetroTech',
      sellerEmail: 'retrotech@example.com',
      image: 'https://images.unsplash.com/photo-1647054894739-e77b1fd21343?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FtZXJhJTIwc2Vjb25kaGFuZHxlbnwxfHx8fDE3NTcxNTEyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      images: ['https://images.unsplash.com/photo-1647054894739-e77b1fd21343?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FtZXJhJTIwc2Vjb25kaGFuZHxlbnwxfHx8fDE3NTcxNTEyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
      likes: 34,
      isLiked: true,
      dateAdded: '2024-01-07',
      views: 203,
      location: 'Los Angeles, CA'
    },
    {
      id: '6',
      title: 'Bamboo Kitchen Set',
      description: 'Handcrafted bamboo cutting board and utensil set. Antimicrobial and eco-friendly.',
      price: 45,
      category: 'home',
      condition: 'Very Good',
      seller: 'SustainableKitchen',
      sellerEmail: 'sustainable@example.com',
      image: 'https://images.unsplash.com/photo-1660002561318-6ef0a0ae1f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBjdXR0aW5nJTIwYm9hcmQlMjBraXRjaGVufGVufDF8fHx8MTc1NzA1ODMwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      images: ['https://images.unsplash.com/photo-1660002561318-6ef0a0ae1f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBjdXR0aW5nJTIwYm9hcmQlMjBraXRjaGVufGVufDF8fHx8MTc1NzA1ODMwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
      likes: 18,
      isLiked: false,
      dateAdded: '2024-01-06',
      views: 74,
      location: 'Denver, CO'
    },
    {
      id: '7',
      title: 'Vintage Denim Jacket',
      description: 'Classic 90s denim jacket with unique distressing. Size Medium, fits true to size.',
      price: 40,
      category: 'clothing',
      condition: 'Good',
      seller: 'VintageVibes',
      sellerEmail: 'vintage@example.com',
      image: 'https://images.unsplash.com/photo-1579980939549-733d6bef18a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNvbmRoYW5kJTIwZGVuaW0lMjBqYWNrZXQlMjB2aW50YWdlfGVufDF8fHx8MTc1NzE1MTI4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      images: ['https://images.unsplash.com/photo-1579980939549-733d6bef18a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNvbmRoYW5kJTIwZGVuaW0lMjBqYWNrZXQlMjB2aW50YWdlfGVufDF8fHx8MTc1NzE1MTI4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
      likes: 26,
      isLiked: false,
      dateAdded: '2024-01-05',
      views: 98,
      location: 'Brooklyn, NY'
    },
    {
      id: '8',
      title: 'Indoor Plant Collection',
      description: 'Set of 3 low-maintenance houseplants including pots. Perfect for beginners!',
      price: 30,
      category: 'home',
      condition: 'Like New',
      seller: 'PlantParent',
      sellerEmail: 'plants@example.com',
      image: 'https://images.unsplash.com/photo-1563419837758-e48ef1b731dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBwbGFudHMlMjBpbmRvb3J8ZW58MXx8fHwxNzU3MTUxMjgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      images: ['https://images.unsplash.com/photo-1563419837758-e48ef1b731dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBwbGFudHMlMjBpbmRvb3J8ZW58MXx8fHwxNzU3MTUxMjgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
      likes: 41,
      isLiked: true,
      dateAdded: '2024-01-04',
      views: 167,
      location: 'San Francisco, CA'
    },
    {
      id: '9',
      title: 'Vintage Turntable',
      description: 'Restored 1970s turntable in excellent working condition. Includes new needle and dust cover.',
      price: 180,
      category: 'electronics',
      condition: 'Very Good',
      seller: 'VinylCollector',
      sellerEmail: 'vinyl@example.com',
      image: 'https://images.unsplash.com/photo-1716072912080-0550a8945c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZWxlY3Ryb25pY3MlMjB0dXJudGFibGV8ZW58MXx8fHwxNzU3MTUxMjg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      images: ['https://images.unsplash.com/photo-1716072912080-0550a8945c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZWxlY3Ryb25pY3MlMjB0dXJudGFibGV8ZW58MXx8fHwxNzU3MTUxMjg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
      likes: 52,
      isLiked: false,
      dateAdded: '2024-01-03',
      views: 289,
      location: 'Portland, OR'
    },
    {
      id: '10',
      title: 'Handmade Ceramic Mug Set',
      description: 'Beautiful set of 4 handcrafted ceramic mugs. Each mug is unique with earthy glazes.',
      price: 28,
      category: 'home',
      condition: 'Like New',
      seller: 'ArtisanCrafts',
      sellerEmail: 'artisan@example.com',
      image: 'https://images.unsplash.com/photo-1661004286870-53a33a2ad3df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNlcmFtaWMlMjBtdWd8ZW58MXx8fHwxNzU3MDUyMTQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      images: ['https://images.unsplash.com/photo-1661004286870-53a33a2ad3df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNlcmFtaWMlMjBtdWd8ZW58MXx8fHwxNzU3MDUyMTQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
      likes: 19,
      isLiked: false,
      dateAdded: '2024-01-02',
      views: 56,
      location: 'Austin, TX'
    }
  ]);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'order_001',
      items: [
        {
          id: '1',
          title: 'Organic Cotton T-Shirt',
          price: 15,
          condition: 'Like New',
          seller: 'EcoSeller123',
          image: 'https://images.unsplash.com/photo-1516762689617-e1cfddf819d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9uJTIwdC1zaGlydCUyMHNlY29uZGhhbmR8ZW58MXx8fHwxNzU3MDU4NzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          quantity: 1
        },
        {
          id: '6',
          title: 'Bamboo Kitchen Set',
          price: 45,
          condition: 'Very Good',
          seller: 'SustainableKitchen',
          image: 'https://images.unsplash.com/photo-1660002561318-6ef0a0ae1f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBjdXR0aW5nJTIwYm9hcmQlMjBraXRjaGVufGVufDF8fHx8MTc1NzA1ODMwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          quantity: 1
        }
      ],
      total: 60,
      orderDate: '2024-01-15T10:30:00Z',
      status: 'delivered',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'order_002',
      items: [
        {
          id: '7',
          title: 'Vintage Denim Jacket',
          price: 40,
          condition: 'Good',
          seller: 'VintageStyle',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZGVuaW0lMjBqYWNrZXQlMjBzZWNvbmRoYW5kfGVufDF8fHx8MTc1NzA1ODc2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          quantity: 1
        }
      ],
      total: 40,
      orderDate: '2024-01-10T14:20:00Z',
      status: 'delivered',
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'order_003',
      items: [
        {
          id: '2',
          title: 'Vintage Wooden Desk',
          price: 85,
          condition: 'Good',
          seller: 'FurnitureRevive',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBkZXNrJTIwdmludGFnZXxlbnwxfHx8fDE3NTcwNTI4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          quantity: 1
        },
        {
          id: '5',
          title: 'Vintage Film Camera',
          price: 120,
          condition: 'Good',
          seller: 'RetroTech',
          image: 'https://images.unsplash.com/photo-1647054894739-e77b1fd21343?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FtZXJhJTIwc2Vjb25kaGFuZHxlbnwxfHx8fDE3NTcxNTEyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          quantity: 1
        }
      ],
      total: 205,
      orderDate: '2024-01-05T09:15:00Z',
      status: 'delivered',
      trackingNumber: 'TRK555444333'
    }
  ]);
  const [userListings, setUserListings] = useState<Product[]>([]);

  // Product operations
  const addProduct = useCallback((productData: Omit<Product, 'id' | 'dateAdded' | 'views' | 'likes' | 'isLiked'>) => {
    const newProduct: Product = {
      ...productData,
      id: Math.random().toString(36).substr(2, 9),
      dateAdded: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
      isLiked: false
    };
    
    setProducts(prev => [newProduct, ...prev]);
    setUserListings(prev => [newProduct, ...prev]);
    return newProduct;
  }, []);

  const updateProduct = useCallback((productId: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updates } : p));
    setUserListings(prev => prev.map(p => p.id === productId ? { ...p, ...updates } : p));
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setUserListings(prev => prev.filter(p => p.id !== productId));
  }, []);

  const toggleLike = useCallback((productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  }, []);

  const incrementViews = useCallback((productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, views: p.views + 1 } : p
    ));
  }, []);

  // Cart operations
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        title: product.title,
        price: product.price,
        condition: product.condition,
        seller: product.seller,
        image: product.image,
        quantity
      }];
    });
  }, []);

  const updateCartItemQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
    } else {
      setCartItems(prev => prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Order operations
  const createOrder = useCallback((items: CartItem[], total: number) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items,
      total,
      orderDate: new Date().toISOString(),
      status: 'pending',
      trackingNumber: `TRK${Math.random().toString(36).substr(2, 8).toUpperCase()}`
    };
    
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  }, [clearCart]);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  }, []);

  // Computed values
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    // Data
    products,
    cartItems,
    orders,
    userListings,
    
    // Computed
    cartTotal,
    cartItemCount,
    
    // Product operations
    addProduct,
    updateProduct,
    deleteProduct,
    toggleLike,
    incrementViews,
    
    // Cart operations
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    
    // Order operations
    createOrder,
    updateOrderStatus
  };
}