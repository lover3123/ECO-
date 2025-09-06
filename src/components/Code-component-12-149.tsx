import { Home, Plus, ShoppingCart, User, Package, History, Info, Mail, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';

interface DesktopNavigationProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
  cartItems: number;
  user: { name: string; email: string };
  onLogout: () => void;
}

export function DesktopNavigation({ currentScreen, onScreenChange, cartItems, user, onLogout }: DesktopNavigationProps) {
  const mainNavItems = [
    { id: 'feed', icon: Home, label: 'Home' },
    { id: 'add-product', icon: Plus, label: 'Sell Item' },
    { id: 'my-listings', icon: Package, label: 'My Listings' },
    { id: 'purchases', icon: History, label: 'Order History' },
    { id: 'cart', icon: ShoppingCart, label: 'Cart', badge: cartItems },
  ];

  const additionalItems = [
    { id: 'about', icon: Info, label: 'About' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => onScreenChange('feed')}
          >
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🌱</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">EcoFinds</h1>
              <p className="text-xs text-gray-500">Sustainable Shopping</p>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="flex items-center gap-1">
            {mainNavItems.map((item) => {
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
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {/* Additional Items */}
            <div className="flex items-center gap-1">
              {additionalItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentScreen === item.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onScreenChange(item.id)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
            </div>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user?.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onScreenChange('dashboard')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}