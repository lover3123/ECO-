import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showLogo?: boolean;
}

export function MobileHeader({ title, showBack = false, onBack, showLogo = true }: MobileHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 md:hidden">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left side - Back button or logo */}
        <div className="flex items-center gap-3">
          {showBack && onBack ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          ) : null}
          
          {showLogo && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white">🌱</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900">EcoFinds</h1>
              </div>
            </div>
          )}
        </div>

        {/* Center - Title */}
        {title && (
          <div className="flex-1 text-center">
            <h2 className="font-medium text-gray-900 truncate">{title}</h2>
          </div>
        )}

        {/* Right side - placeholder for future buttons */}
        <div className="w-10"></div>
      </div>
    </header>
  );
}