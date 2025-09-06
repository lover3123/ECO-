import { useState } from 'react';
import { Auth } from './components/Auth';
import { Navigation } from './components/Navigation';
import { ProductFeed } from './components/ProductFeed';
import { AddProduct } from './components/AddProduct';
import { MyListings } from './components/MyListings';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { PreviousPurchases } from './components/PreviousPurchases';
import { UserDashboard } from './components/UserDashboard';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

interface User {
  name: string;
  email: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState('feed');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState(0);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentScreen('feed');
    toast.success(`Welcome back, ${userData.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('feed');
    setCartItems(0);
    toast.success('Successfully logged out');
  };

  const handleScreenChange = (screen: string) => {
    setCurrentScreen(screen);
    setSelectedProductId(null);
  };

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentScreen('product-detail');
  };

  const handleAddToCart = (productId: string) => {
    setCartItems(prev => prev + 1);
    toast.success('Item added to cart!');
  };

  const handleProductAdded = () => {
    setCurrentScreen('my-listings');
    toast.success('Your item has been listed successfully!');
  };

  const handleEditProduct = (productId: string) => {
    // In a real app, this would populate the edit form with product data
    setCurrentScreen('add-product');
    toast.info('Edit mode - product data would be pre-populated here');
  };

  const handleCheckout = () => {
    // Mock checkout process
    setCartItems(0);
    setCurrentScreen('purchases');
    toast.success('Order placed successfully! Check your email for confirmation.');
  };

  const handleMessage = (sellerId: string) => {
    toast.info(`Message feature would open chat with ${sellerId}`);
  };

  const handleBackToFeed = () => {
    setCurrentScreen('feed');
    setSelectedProductId(null);
  };

  // Show auth screen if user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Auth onLogin={handleLogin} />
        <Toaster position="top-center" />
      </div>
    );
  }

  // Render the appropriate screen based on currentScreen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'feed':
        return (
          <ProductFeed
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
          />
        );
      
      case 'add-product':
        return <AddProduct onProductAdded={handleProductAdded} />;
      
      case 'my-listings':
        return <MyListings onEditProduct={handleEditProduct} />;
      
      case 'product-detail':
        return selectedProductId ? (
          <ProductDetail
            productId={selectedProductId}
            onBack={handleBackToFeed}
            onAddToCart={handleAddToCart}
            onMessage={handleMessage}
          />
        ) : (
          <ProductFeed
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
          />
        );
      
      case 'cart':
        return (
          <Cart
            onCheckout={handleCheckout}
            onProductClick={handleProductClick}
          />
        );
      
      case 'purchases':
        return <PreviousPurchases />;
      
      case 'dashboard':
        return (
          <UserDashboard
            user={user}
            onLogout={handleLogout}
            onEditProfile={() => toast.info('Profile editing is available in the dashboard')}
          />
        );
      
      default:
        return (
          <ProductFeed
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentScreen={currentScreen}
        onScreenChange={handleScreenChange}
        cartItems={cartItems}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="pb-4">
        {renderScreen()}
      </main>
      
      <Toaster position="top-center" />
    </div>
  );
}