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
  // Mock products data - simulates real-time data
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
      image: 'https://images.unsplash.com/photo-1723459330762-c774b77c4661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNvbmRoYW5kJTIwdmludGFnZSUyMGNsb3RoZXN8ZW58MXx8fHwxNzU3MTM1NDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      images: ['https://images.unsplash.com/photo-1723459330762-c774b77c4661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNvbmRoYW5kJTIwdmludGFnZSUyMGNsb3RoZXN8ZW58MXx8fHwxNzU3MTM1NDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
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
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNvbmRoYW5kJTIwZnVybml0dXJlfGVufDF8fHx8MTc1NzEzNTQwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNvbmRoYW5kJTIwZnVybml0dXJlfGVufDF8fHx8MTc1NzEzNTQwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
      likes: 8,
      isLiked: true,
      dateAdded: '2024-01-12',
      views: 32,
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
      image: 'https://images.unsplash.com/photo-1636918183359-73bc875ff29e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGJvb2tzfGVufDF8fHx8MTc1NzEzNTQwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      images: ['https://images.unsplash.com/photo-1636918183359-73bc875ff29e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGJvb2tzfGVufDF8fHx8MTc1NzEzNTQwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
      likes: 15,
      isLiked: false,
      dateAdded: '2024-01-10',
      views: 67,
      location: 'Austin, TX'
    }
  ]);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
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