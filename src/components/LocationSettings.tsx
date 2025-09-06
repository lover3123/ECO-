import { useState } from 'react';
import { ArrowLeft, MapPin, Home, Building, Plus, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface LocationSettingsProps {
  onBack: () => void;
}

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  title: string;
  address: string;
  city: string;
  zipCode: string;
  isDefault: boolean;
}

export function LocationSettings({ onBack }: LocationSettingsProps) {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'home',
      title: 'Home',
      address: '123 Green Street',
      city: 'Eco District, CA',
      zipCode: '90210',
      isDefault: true
    },
    {
      id: '2',
      type: 'work',
      title: 'Office',
      address: '456 Sustainable Ave',
      city: 'Eco District, CA',
      zipCode: '90211',
      isDefault: false
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'home' as 'home' | 'work' | 'other',
    title: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const handleSetDefault = (addressId: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  const handleAddAddress = () => {
    if (newAddress.title && newAddress.address && newAddress.city && newAddress.zipCode) {
      const address: Address = {
        id: Date.now().toString(),
        ...newAddress,
        isDefault: addresses.length === 0
      };
      setAddresses(prev => [...prev, address]);
      setNewAddress({
        type: 'home',
        title: '',
        address: '',
        city: '',
        zipCode: ''
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteAddress = (addressId: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'work':
        return <Building className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const getAddressColor = (type: string) => {
    switch (type) {
      case 'home':
        return 'text-blue-600 bg-blue-50';
      case 'work':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 pt-4 md:pt-0">
      {/* Header */}
      <div className="flex items-center gap-4 sticky top-0 md:static bg-white/95 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-4 md:py-0 z-40 md:z-auto border-b border-gray-100 md:border-b-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Delivery Addresses</h1>
          <p className="text-sm text-gray-600">Manage your delivery locations</p>
        </div>
      </div>

      {/* Current Location */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="w-5 h-5 text-primary" />
            Current Delivery Area
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            We'll show you items available in your area and calculate delivery times accordingly.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Fast delivery available
            </Badge>
            <Badge variant="secondary">
              5km radius
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Saved Addresses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Saved Addresses</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Address
          </Button>
        </div>

        <div className="space-y-3">
          {addresses.map((address) => (
            <Card 
              key={address.id} 
              className={`cursor-pointer transition-all ${
                address.isDefault 
                  ? 'border-primary bg-primary/5 shadow-sm' 
                  : 'hover:shadow-md border-gray-200'
              }`}
              onClick={() => handleSetDefault(address.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getAddressColor(address.type)}`}>
                      {getAddressIcon(address.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{address.title}</h3>
                        {address.isDefault && (
                          <Badge className="bg-primary text-white text-xs">
                            <Check className="w-3 h-3 mr-1" />
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{address.address}</p>
                      <p className="text-sm text-gray-600">{address.city} {address.zipCode}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAddress(address.id);
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Address Form */}
      {showAddForm && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg">Add New Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {(['home', 'work', 'other'] as const).map((type) => (
                <Button
                  key={type}
                  variant={newAddress.type === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNewAddress(prev => ({ ...prev, type }))}
                  className="capitalize"
                >
                  {getAddressIcon(type)}
                  <span className="ml-2">{type}</span>
                </Button>
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="title">Address Name</Label>
                <Input
                  id="title"
                  placeholder="e.g., Home, Office, Mom's House"
                  value={newAddress.title}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  placeholder="Enter street address"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">City, State</Label>
                  <Input
                    id="city"
                    placeholder="City, State"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    placeholder="ZIP Code"
                    value={newAddress.zipCode}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex gap-3">
              <Button onClick={handleAddAddress} className="flex-1">
                Save Address
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delivery Information */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-900 mb-2">Delivery Information</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Free delivery on orders over $50</li>
            <li>• Same-day delivery available for nearby items</li>
            <li>• Standard delivery: 2-5 business days</li>
            <li>• We'll notify you with tracking information</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}