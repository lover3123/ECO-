import { useState } from 'react';
import { Auth } from './components/Auth';
import { MobileNavigation } from './components/MobileNavigation';
import { DesktopNavigation } from './components/DesktopNavigation';
import { ProductFeed } from './components/ProductFeed';
import { AddProduct } from './components/AddProduct';
import { MyListings } from './components/MyListings';
import { SellPage } from './components/SellPage';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { PreviousPurchases } from './components/PreviousPurchases';
import { UserDashboard } from './components/UserDashboard';
import { BuyAgain } from './components/BuyAgain';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { FastDelivery } from './components/FastDelivery';
import { LocationSettings } from './components/LocationSettings';
import { Settings } from './components/Settings';
import { MobileHeader } from './components/MobileHeader';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import { useIsMobile } from './hooks/use-mobile';
import { useAppData } from './hooks/useAppData';

interface User {
  name: string;
  email: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState('feed');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Enhanced data management
  const appData = useAppData();

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentScreen('feed');
    toast.success(`Welcome back, ${userData.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('feed');
    appData.clearCart();
    toast.success('Successfully logged out');
  };

  const handleScreenChange = (screen: string) => {
    setCurrentScreen(screen);
    setSelectedProductId(null);
  };

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentScreen('product-detail');
    
    // Increment view count for analytics
    appData.incrementViews(productId);
  };

  const handleAddToCart = (productId: string) => {
    const product = appData.products.find(p => p.id === productId);
    if (product) {
      appData.addToCart(product);
      toast.success('Item added to cart!', {
        description: `${product.title} is now in your cart`
      });
    }
  };

  const handleProductAdded = (productData: any) => {
    appData.addProduct({
      ...productData,
      seller: user?.name || 'Anonymous',
      sellerEmail: user?.email || '',
      location: 'Your Location' // In a real app, this would come from user profile
    });
    setCurrentScreen('my-listings');
    toast.success('Your item has been listed successfully!', {
      description: 'It will appear in the marketplace shortly'
    });
  };

  const handleEditProduct = (productId: string) => {
    // In a real app, this would populate the edit form with product data
    setCurrentScreen('add-product');
    toast.info('Edit mode - product data would be pre-populated here');
  };

  const handleCheckout = () => {
    if (appData.cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    const order = appData.createOrder(appData.cartItems, appData.cartTotal);
    setCurrentScreen('purchases');
    toast.success('Order placed successfully!', {
      description: `Order #${order.id.slice(-6)} - Check your email for confirmation.`
    });
  };

  const handleMessage = (sellerId: string) => {
    toast.info(`Message feature would open chat with ${sellerId}`);
  };

  const handleBackToFeed = () => {
    setCurrentScreen('feed');
    setSelectedProductId(null);
  };

  const handleLocationClick = () => {
    setCurrentScreen('location-settings');
  };

  const handleFastDeliveryClick = () => {
    setCurrentScreen('fast-delivery');
  };

  const getMobileHeaderTitle = (screen: string) => {
    switch (screen) {
      case 'add-product':
        return 'Sell Products';
      case 'my-listings':
        return 'My Listings';
      case 'product-detail':
        return 'Product Details';
      case 'cart':
        return 'Shopping Cart';
      case 'purchases':
        return 'Order History';
      case 'buy-again':
        return 'Buy Again';
      case 'dashboard':
        return 'My Profile';
      case 'fast-delivery':
        return 'Fast Delivery';
      case 'location-settings':
        return 'Location Settings';
      case 'settings':
        return 'Settings';
      case 'about':
        return 'About EcoFinds';
      case 'contact':
        return 'Contact Us';
      default:
        return '';
    }
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
            products={appData.products}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            onToggleLike={appData.toggleLike}
            onLocationClick={handleLocationClick}
            onFastDeliveryClick={handleFastDeliveryClick}
          />
        );
      
      case 'add-product':
        return (
          <SellPage 
            onProductAdded={handleProductAdded}
            onBack={handleBackToFeed}
            userListings={appData.userListings}
            onEditProduct={handleEditProduct}
            onDeleteProduct={appData.deleteProduct}
            onUpdateProduct={appData.updateProduct}
          />
        );
      
      case 'my-listings':
        return (
          <MyListings 
            listings={appData.userListings}
            onEditProduct={handleEditProduct}
            onDeleteProduct={appData.deleteProduct}
            onUpdateProduct={appData.updateProduct}
          />
        );
      
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
            products={appData.products}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            onToggleLike={appData.toggleLike}
            onLocationClick={handleLocationClick}
            onFastDeliveryClick={handleFastDeliveryClick}
          />
        );
      
      case 'cart':
        return (
          <Cart
            cartItems={appData.cartItems}
            onCheckout={handleCheckout}
            onProductClick={handleProductClick}
            onUpdateQuantity={appData.updateCartItemQuantity}
            onRemoveItem={appData.removeFromCart}
          />
        );
      
      case 'purchases':
        return (
          <PreviousPurchases 
            orders={appData.orders}
            onProductClick={handleProductClick}
            onUpdateOrderStatus={appData.updateOrderStatus}
          />
        );
      
      case 'buy-again':
        return (
          <BuyAgain
            orders={appData.orders}
            products={appData.products}
            onBack={handleBackToFeed}
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
          />
        );
      
      case 'dashboard':
        return (
          <UserDashboard
            user={user}
            onLogout={handleLogout}
            onEditProfile={() => toast.info('Profile editing is available in the dashboard')}
            onScreenChange={handleScreenChange}
          />
        );
      
      case 'about':
        return <About />;
      
      case 'contact':
        return <Contact />;
      
      case 'fast-delivery':
        return (
          <FastDelivery
            products={appData.products}
            onBack={handleBackToFeed}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
          />
        );
      
      case 'location-settings':
        return <LocationSettings onBack={handleBackToFeed} />;
      
      case 'settings':
        return (
          <Settings 
            user={user}
            onBack={handleBackToFeed}
            onUpdateProfile={(userData) => {
              setUser(prev => prev ? { ...prev, ...userData } : null);
              toast.success('Profile updated successfully!');
            }}
          />
        );
      
      default:
        return (
          <ProductFeed
            products={appData.products}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            onToggleLike={appData.toggleLike}
            onLocationClick={handleLocationClick}
            onFastDeliveryClick={handleFastDeliveryClick}
          />
        );
    }
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      {/* Desktop Layout */}
      {!isMobile && (
        <>
          <DesktopNavigation
            currentScreen={currentScreen}
            onScreenChange={handleScreenChange}
            cartItems={appData.cartItemCount}
            user={user}
            onLogout={handleLogout}
          />
          <main className="flex-1 overflow-auto">
            <div className="w-full max-w-7xl mx-auto px-4 py-4 h-full">
              {renderScreen()}
            </div>
          </main>
        </>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <>
          {/* Mobile Header - only show for non-feed screens (some screens have integrated headers) */}
          {currentScreen !== 'feed' && 
           currentScreen !== 'fast-delivery' && 
           currentScreen !== 'location-settings' && 
           currentScreen !== 'add-product' && (
            <MobileHeader 
              title={getMobileHeaderTitle(currentScreen)}
              showBack={true}
              onBack={handleBackToFeed}
            />
          )}
          
          {/* Mobile Main Content - Full height flex layout */}
          <main className={`flex-1 overflow-auto w-full ${
            currentScreen === 'feed' || currentScreen === 'add-product' ? '' : 'pt-16'
          } pb-16 safe-area-pb`}>
            <div className={`min-h-full w-full ${
              currentScreen === 'feed' || currentScreen === 'add-product' ? '' : 'px-4 py-1'
            }`}>
              {renderScreen()}
            </div>
          </main>
          
          <MobileNavigation
            currentScreen={currentScreen}
            onScreenChange={handleScreenChange}
            cartItems={appData.cartItemCount}
            user={user}
            onLogout={handleLogout}
          />
        </>
      )}
      
      <Toaster position="top-center" />
    </div>
  );
}