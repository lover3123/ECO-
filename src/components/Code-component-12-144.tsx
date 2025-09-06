import { useState } from 'react';
import { Home, Plus, ShoppingCart, User, Package, History, Menu, X, Info, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface MobileNavigationProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
  cartItems: number;
  user: { name: string; email: string };
  onLogout: () => void;
}

export function MobileNavigation({ currentScreen, onScreenChange, cartItems, user, onLogout }: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainNavItems = [
    { id: 'feed', icon: Home, label: 'Home' },
    { id: 'add-product', icon: Plus, label: 'Sell' },
    { id: 'cart', icon: ShoppingCart, label: 'Cart', badge: cartItems },
    { id: 'dashboard', icon: User, label: 'Profile' },
  ];

  const additionalItems = [
    { id: 'my-listings', icon: Package, label: 'My List' },
    { id: 'purchases', icon: History, label: 'Orders' },
    { id: 'about', icon: Info, label: 'About' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  const handleMenuItemClick = (screenId: string) => {
    onScreenChange(screenId);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Collapsible Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Collapsible Menu - Slides up from bottom */}
      {isMenuOpen && (
        <div className="fixed bottom-20 left-0 right-0 z-50 bg-white rounded-t-xl shadow-2xl border-t border-gray-200 max-h-80 overflow-y-auto">
          <div className="py-2">
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
              <h3 className="font-medium text-gray-900">Menu</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="py-2">
              {additionalItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => handleMenuItemClick(item.id)}
                    className={`w-full justify-start px-4 py-3 h-auto rounded-none ${
                      currentScreen === item.id ? 'bg-primary/10 text-primary' : 'text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="text-base">{item.label}</span>
                  </Button>
                );
              })}
            </div>
            
            <div className="border-t border-gray-100 pt-2">
              <div className="px-4 py-2">
                <p className="text-sm text-gray-500 mb-2">Signed in as {user?.name}</p>
              </div>
              <Button
                variant="ghost"
                onClick={() => {
                  onLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full justify-start px-4 py-3 h-auto rounded-none text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <User className="w-5 h-5 mr-3" />
                <span className="text-base">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 safe-area-pb">
        <div className="grid grid-cols-5 gap-0">
          {/* Main Navigation Items */}
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => onScreenChange(item.id)}
                className={`relative flex-col h-16 text-xs px-1 rounded-none border-0 ${
                  currentScreen === item.id ? 'text-primary bg-primary/5' : 'text-gray-600'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <Badge className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 min-w-5 h-5">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}

          {/* Menu Button */}
          <Button
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative flex-col h-16 text-xs px-1 rounded-none border-0 ${
              isMenuOpen ? 'text-primary bg-primary/5' : 'text-gray-600'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6 mb-1" /> : <Menu className="w-6 h-6 mb-1" />}
            <span className="text-xs">More</span>
          </Button>
        </div>
      </div>
    </>
  );
}