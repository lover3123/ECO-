import { useState } from 'react';
import { User, Edit, Settings, Heart, Package, TrendingUp, DollarSign, Calendar, Award, Leaf, ShoppingCart, RotateCcw, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';

interface UserDashboardProps {
  user: { name: string; email: string };
  onLogout: () => void;
  onEditProfile: () => void;
  onScreenChange?: (screen: string) => void;
}

export function UserDashboard({ user, onLogout, onEditProfile, onScreenChange }: UserDashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    bio: 'Passionate about sustainable living and finding new homes for pre-loved items.',
    location: 'Portland, OR',
    joinedDate: '2023-03-15'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    marketingEmails: false,
    pushNotifications: true,
    weeklyDigest: true
  });

  const stats = {
    totalSales: 47,
    totalPurchases: 23,
    totalEarnings: 1240,
    itemsSaved: 15,
    co2Saved: 125, // kg of CO2 saved through sustainable shopping
    rating: 4.8,
    responseTime: '~2 hours'
  };

  const ecoImpact = {
    itemsRehomed: stats.totalSales,
    wasteReduced: stats.totalSales * 2.3, // kg
    co2Saved: stats.co2Saved,
    treesEquivalent: Math.round(stats.co2Saved / 22) // 1 tree absorbs ~22kg CO2/year
  };

  const recentActivity = [
    { type: 'sale', item: 'Vintage Denim Jacket', amount: 45, date: '2024-01-20' },
    { type: 'purchase', item: 'Eco Kitchen Set', amount: 35, date: '2024-01-18' },
    { type: 'sale', item: 'Organic Cotton Tee', amount: 15, date: '2024-01-15' },
    { type: 'favorite', item: 'Sustainable Living Book', date: '2024-01-12' }
  ];

  const achievements = [
    { id: 1, title: 'Eco Warrior', description: 'Saved 100kg of CO2', icon: '🌱', earned: true },
    { id: 2, title: 'Super Seller', description: 'Made 50+ sales', icon: '⭐', earned: false },
    { id: 3, title: 'Community Helper', description: 'Helped 25+ buyers', icon: '🤝', earned: true },
    { id: 4, title: 'Sustainable Shopper', description: 'Made 25+ purchases', icon: '♻️', earned: false }
  ];

  const saveProfile = () => {
    // In a real app, this would save to a server
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612990c?w=150" />
                <AvatarFallback className="text-lg">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {!isEditing ? (
                <>
                  <CardTitle>{profileData.name}</CardTitle>
                  <CardDescription>{profileData.email}</CardDescription>
                  {profileData.bio && (
                    <p className="text-sm text-gray-600 mt-2">{profileData.bio}</p>
                  )}
                  <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Joined {new Date(profileData.joinedDate).toLocaleDateString()}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="mt-4"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit Profile
                  </Button>
                </>
              ) : (
                <div className="space-y-4 text-left">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={3}
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveProfile} size="sm">Save</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)} size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardHeader>
          </Card>

          {/* Quick Actions Menu */}
          <Card className="mt-6">
            <CardContent className="p-0">
              <div className="space-y-0">
                <Button
                  variant="ghost"
                  onClick={() => onScreenChange?.('purchases')}
                  className="w-full h-14 px-4 py-3 justify-between rounded-none border-0 text-left hover:bg-accent/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Orders</div>
                      <div className="text-sm text-muted-foreground">View your order history</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Button>

                <div className="border-t border-border/50" />

                <Button
                  variant="ghost"
                  onClick={() => onScreenChange?.('buy-again')}
                  className="w-full h-14 px-4 py-3 justify-between rounded-none border-0 text-left hover:bg-accent/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/80 rounded-full flex items-center justify-center">
                      <RotateCcw className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Buy Again</div>
                      <div className="text-sm text-muted-foreground">Repurchase favorite items</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Button>

                <div className="border-t border-border/50" />

                <Button
                  variant="ghost"
                  onClick={() => onScreenChange?.('settings')}
                  className="w-full h-14 px-4 py-3 justify-between rounded-none rounded-b-lg border-0 text-left hover:bg-accent/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <Settings className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Account Settings</div>
                      <div className="text-sm text-muted-foreground">Manage your preferences</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Eco Impact Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-600" />
                Your Eco Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl text-green-600">{ecoImpact.itemsRehomed}</div>
                  <div className="text-xs text-gray-600">Items Rehomed</div>
                </div>
                <div>
                  <div className="text-2xl text-green-600">{ecoImpact.wasteReduced.toFixed(1)}kg</div>
                  <div className="text-xs text-gray-600">Waste Reduced</div>
                </div>
                <div>
                  <div className="text-2xl text-green-600">{ecoImpact.co2Saved}kg</div>
                  <div className="text-xs text-gray-600">CO₂ Saved</div>
                </div>
                <div>
                  <div className="text-2xl text-green-600">{ecoImpact.treesEquivalent}</div>
                  <div className="text-xs text-gray-600">Trees Worth</div>
                </div>
              </div>
              <div className="text-center">
                <Badge className="bg-green-100 text-green-800">
                  🌍 Eco Champion
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="achievements">Badges</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-2xl">{stats.totalSales}</div>
                    <div className="text-sm text-gray-600">Items Sold</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-2xl">{stats.totalPurchases}</div>
                    <div className="text-sm text-gray-600">Items Bought</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-2xl">${stats.totalEarnings}</div>
                    <div className="text-sm text-gray-600">Total Earned</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Heart className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-2xl">{stats.itemsSaved}</div>
                    <div className="text-sm text-gray-600">Saved Items</div>
                  </CardContent>
                </Card>
              </div>

              {/* Seller Rating */}
              <Card>
                <CardHeader>
                  <CardTitle>Seller Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span>Rating</span>
                        <span className="text-lg">{stats.rating}/5</span>
                      </div>
                      <Progress value={stats.rating * 20} className="mb-4" />
                      <div className="text-sm text-gray-600">
                        Response time: {stats.responseTime}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Recent feedback:</div>
                      <div className="space-y-2">
                        <div className="text-sm">"Great seller, item exactly as described!"</div>
                        <div className="text-sm">"Fast shipping and excellent communication."</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest buying and selling activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'sale' ? 'bg-green-100' :
                          activity.type === 'purchase' ? 'bg-blue-100' : 'bg-red-100'
                        }`}>
                          {activity.type === 'sale' ? <TrendingUp className="w-4 h-4 text-green-600" /> :
                           activity.type === 'purchase' ? <Package className="w-4 h-4 text-blue-600" /> :
                           <Heart className="w-4 h-4 text-red-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{activity.item}</span>
                            {activity.amount && (
                              <span className="text-green-600">${activity.amount}</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {activity.type === 'sale' ? 'Sold' :
                             activity.type === 'purchase' ? 'Purchased' : 'Favorited'} on {new Date(activity.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Achievement Badges</CardTitle>
                  <CardDescription>Unlock badges by being an active and sustainable community member</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className={`p-4 rounded-lg border-2 ${
                        achievement.earned ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`text-2xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                            {achievement.icon}
                          </div>
                          <div>
                            <div className={`font-medium ${achievement.earned ? 'text-green-800' : 'text-gray-600'}`}>
                              {achievement.title}
                            </div>
                            <div className="text-sm text-gray-600">{achievement.description}</div>
                          </div>
                          {achievement.earned && (
                            <Badge className="ml-auto bg-green-100 text-green-800">
                              Earned!
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div>Email notifications</div>
                      <div className="text-sm text-gray-600">Get notified about new messages and sales</div>
                    </div>
                    <Switch
                      checked={preferences.emailNotifications}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, emailNotifications: checked })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div>Marketing emails</div>
                      <div className="text-sm text-gray-600">Receive promotions and product updates</div>
                    </div>
                    <Switch
                      checked={preferences.marketingEmails}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, marketingEmails: checked })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div>Push notifications</div>
                      <div className="text-sm text-gray-600">Get instant alerts on your device</div>
                    </div>
                    <Switch
                      checked={preferences.pushNotifications}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, pushNotifications: checked })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div>Weekly digest</div>
                      <div className="text-sm text-gray-600">Weekly summary of your activity</div>
                    </div>
                    <Switch
                      checked={preferences.weeklyDigest}
                      onCheckedChange={(checked) =>
                        setPreferences({ ...preferences, weeklyDigest: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Download my data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Privacy settings
                  </Button>
                  <Button variant="outline" onClick={onLogout} className="w-full justify-start">
                    Logout
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}