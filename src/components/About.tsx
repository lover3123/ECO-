import { Leaf, Heart, Users, Recycle, Target, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export function About() {
  const stats = [
    { icon: Recycle, label: 'Items Rescued', value: '50,000+', color: 'text-green-600' },
    { icon: Users, label: 'Active Users', value: '25,000+', color: 'text-blue-600' },
    { icon: Leaf, label: 'CO₂ Saved', value: '1.2M kg', color: 'text-emerald-600' },
    { icon: Heart, label: 'Happy Transactions', value: '100,000+', color: 'text-red-600' }
  ];

  const values = [
    {
      icon: '🌍',
      title: 'Environmental Impact',
      description: 'Every item sold on EcoFinds helps reduce waste and carbon footprint by giving products a second life.'
    },
    {
      icon: '🤝',
      title: 'Community First',
      description: 'We build trust between buyers and sellers while fostering a community that cares about sustainability.'
    },
    {
      icon: '♻️',
      title: 'Circular Economy',
      description: 'We believe in extending product lifecycles and creating a sustainable marketplace for everyone.'
    },
    {
      icon: '💚',
      title: 'Conscious Consumption',
      description: 'Promoting mindful shopping habits that benefit both people and the planet.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-3xl">🌱</span>
        </div>
        <h1 className="text-4xl mb-4">About EcoFinds</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          EcoFinds is a sustainable second-hand marketplace that connects conscious consumers 
          with quality pre-loved items, helping reduce waste while making sustainable shopping accessible to everyone.
        </p>
      </div>

      {/* Mission */}
      <Card className="mb-12">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Target className="w-6 h-6 text-primary" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            To create a world where sustainable shopping is the norm, not the exception. 
            We empower individuals to make environmentally conscious choices by providing 
            a trusted platform for buying and selling quality second-hand goods.
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  stat.color === 'text-green-600' ? 'bg-green-100' :
                  stat.color === 'text-blue-600' ? 'bg-blue-100' :
                  stat.color === 'text-emerald-600' ? 'bg-emerald-100' : 'bg-red-100'
                }`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Values */}
      <div className="mb-12">
        <h2 className="text-3xl text-center mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{value.icon}</div>
                  <div>
                    <h3 className="text-lg mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-center text-2xl">How EcoFinds Works</CardTitle>
          <CardDescription className="text-center">
            Making sustainable shopping simple and rewarding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="text-lg mb-2">List Your Items</h4>
              <p className="text-gray-600">Upload photos and details of items you no longer need</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h4 className="text-lg mb-2">Discover & Buy</h4>
              <p className="text-gray-600">Browse quality pre-loved items from trusted sellers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h4 className="text-lg mb-2">Make Impact</h4>
              <p className="text-gray-600">Track your environmental contribution and earn badges</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sustainability Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Award className="w-6 h-6 text-primary" />
            Sustainability Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-700">
              Every transaction on EcoFinds contributes to a more sustainable future
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge className="bg-green-100 text-green-800">Waste Reduction</Badge>
              <Badge className="bg-blue-100 text-blue-800">Carbon Footprint</Badge>
              <Badge className="bg-purple-100 text-purple-800">Circular Economy</Badge>
              <Badge className="bg-orange-100 text-orange-800">Resource Conservation</Badge>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              By choosing second-hand, our community has prevented thousands of items from ending up in landfills 
              and significantly reduced the demand for new production.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}