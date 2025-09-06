import { Home, Plus, ShoppingCart, User, Package, History } from 'lucide-react';
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
  const navItems = [
    { id: 'feed', icon: Home, label: 'Home' },
    { id: 'add-product', icon: Plus, label: 'Sell' },
    { id: 'cart', icon: ShoppingCart, label: 'Cart', badge: cartItems },
    { id: 'my-listings', icon: Package, label: 'My Items' },
    { id: 'purchases', icon: History, label: 'Orders' },
    { id: 'dashboard', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bg-white border-b border-green-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white">🌱</span>
            </div>
            <span className="text-xl text-primary">EcoFinds</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
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
                    <Badge className="ml-2 bg-red-500 text-white">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
            <Button variant="outline" size="sm" onClick={onLogout}>
              Logout
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-green-200">
          <div className="grid grid-cols-3 gap-1 p-2">
            {navItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentScreen === item.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onScreenChange(item.id)}
                  className="relative flex-col h-12 text-xs"
                >
                  <Icon className="w-4 h-4 mb-1" />
                  {item.label}
                  {item.badge && item.badge > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}