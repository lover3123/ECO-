import { useState } from 'react';
import { Home, Plus, ShoppingCart, User, Package, History, Menu, X, Info, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface NavigationProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
  cartItems: number;
  user: { name: string; email: string };
  onLogout: () => void;
}

export function Navigation({ currentScreen, onScreenChange, cartItems, user, onLogout }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'feed', icon: Home, label: 'Home' },
    { id: 'add-product', icon: Plus, label: 'Sell' },
    { id: 'cart', icon: ShoppingCart, label: 'Cart', badge: cartItems },
    { id: 'my-listings', icon: Package, label: 'My List' },
    { id: 'purchases', icon: History, label: 'Orders' },
    { id: 'dashboard', icon: User, label: 'Profile' },
  ];

  const additionalItems = [
    { id: 'about', icon: Info, label: 'About' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  const allMenuItems = [...navItems, ...additionalItems];

  const handleMenuItemClick = (screenId: string) => {
    onScreenChange(screenId);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:block bg-white shadow-sm border-b border-green-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white">🌱</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EcoFinds</h1>
                <p className="text-sm text-gray-500">Sustainable Shopping</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentScreen === item.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onScreenChange(item.id)}
                    className="relative"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {item.badge && item.badge > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Welcome, {user?.name}
              </span>
              <Button variant="outline" size="sm" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-green-200">
        {/* Collapsible Menu - Slides up from bottom */}
        {isMenuOpen && (
          <div className="bg-white border-t border-green-200 max-h-96 overflow-y-auto">
            <div className="py-2">
              <div className="px-4 py-2 flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Menu</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {allMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => handleMenuItemClick(item.id)}
                    className={`w-full justify-start px-4 py-3 h-auto ${
                      currentScreen === item.id ? 'bg-primary/10 text-primary' : 'text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    <span>{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <Badge className="ml-auto bg-red-500 text-white">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-start px-4 py-3 h-auto text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <User className="w-4 h-4 mr-3" />
                  <span>Logout ({user?.name})</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation Bar */}
        <div className="grid grid-cols-5 gap-0 p-2">
          {/* Main Navigation Items */}
          {navItems.slice(0, 3).map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentScreen === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onScreenChange(item.id)}
                className="relative flex-col h-14 text-xs px-1"
              >
                <Icon className="w-5 h-5 mb-1" />
                {item.label}
                {item.badge && item.badge > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 min-w-5 h-5">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}

          {/* Profile Button */}
          <Button
            variant={currentScreen === 'dashboard' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onScreenChange('dashboard')}
            className="relative flex-col h-14 text-xs px-1"
          >
            <User className="w-5 h-5 mb-1" />
            Profile
          </Button>

          {/* Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative flex-col h-14 text-xs px-1"
          >
            {isMenuOpen ? <X className="w-5 h-5 mb-1" /> : <Menu className="w-5 h-5 mb-1" />}
            Menu
          </Button>
        </div>
      </div>
    </>
  );
}