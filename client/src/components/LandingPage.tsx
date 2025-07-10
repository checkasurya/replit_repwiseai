import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Users, BarChart3, Brain, Award, Clock, CheckCircle } from "lucide-react";
import { Link } from "wouter";

interface LandingPageProps {
  onNavigateToLogin: () => void;
}

export default function LandingPage({ onNavigateToLogin }: LandingPageProps) {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Animated geometric network */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 0.3 }} />
            </linearGradient>
          </defs>
          
          {/* Geometric network lines */}
          <g stroke="url(#lineGradient)" strokeWidth="1" fill="none" opacity="0.7">
            <path d="M100,150 L300,80 L500,200 L700,120 L900,250">
              <animate attributeName="d" 
                values="M100,150 L300,80 L500,200 L700,120 L900,250;M120,180 L320,60 L480,220 L720,140 L880,270;M100,150 L300,80 L500,200 L700,120 L900,250" 
                dur="8s" repeatCount="indefinite" />
            </path>
            <path d="M200,300 L400,250 L600,350 L800,280 L1000,400">
              <animate attributeName="d" 
                values="M200,300 L400,250 L600,350 L800,280 L1000,400;M180,320 L420,230 L580,370 L820,300 L980,420;M200,300 L400,250 L600,350 L800,280 L1000,400" 
                dur="10s" repeatCount="indefinite" />
            </path>
            <path d="M50,450 L250,400 L450,500 L650,430 L850,550">
              <animate attributeName="d" 
                values="M50,450 L250,400 L450,500 L650,430 L850,550;M70,470 L270,380 L430,520 L670,450 L830,570;M50,450 L250,400 L450,500 L650,430 L850,550" 
                dur="12s" repeatCount="indefinite" />
            </path>
          </g>
          
          {/* Floating geometric shapes */}
          <g fill="url(#lineGradient)" opacity="0.4">
            <circle cx="150" cy="100" r="3">
              <animateTransform attributeName="transform" type="translate" 
                values="0,0; 20,-10; 0,0" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="350" cy="180" r="2">
              <animateTransform attributeName="transform" type="translate" 
                values="0,0; -15,25; 0,0" dur="8s" repeatCount="indefinite" />
            </circle>
            <circle cx="550" cy="120" r="2.5">
              <animateTransform attributeName="transform" type="translate" 
                values="0,0; 30,15; 0,0" dur="7s" repeatCount="indefinite" />
            </circle>
            <circle cx="750" cy="300" r="3">
              <animateTransform attributeName="transform" type="translate" 
                values="0,0; -25,-20; 0,0" dur="9s" repeatCount="indefinite" />
            </circle>
            <circle cx="950" cy="200" r="2">
              <animateTransform attributeName="transform" type="translate" 
                values="0,0; 15,30; 0,0" dur="10s" repeatCount="indefinite" />
            </circle>
          </g>
          
          {/* Connecting lines between nodes */}
          <g stroke="url(#lineGradient)" strokeWidth="0.5" fill="none" opacity="0.3">
            <line x1="150" y1="100" x2="350" y2="180">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="350" y1="180" x2="550" y2="120">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="5s" repeatCount="indefinite" />
            </line>
            <line x1="550" y1="120" x2="750" y2="300">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="6s" repeatCount="indefinite" />
            </line>
            <line x1="750" y1="300" x2="950" y2="200">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
            </line>
          </g>
        </svg>
      </div>
      {/* Header */}
      <header className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-sm border-b border-slate-700 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">RepWise</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={scrollToTop}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Home
              </button>
              <button 
                onClick={scrollToFeatures}
                className="text-slate-300 hover:text-white transition-colors"
              >
                Features
              </button>
              <Button 
                onClick={onNavigateToLogin}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Login
              </Button>
            </nav>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-6 z-10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-white">Enhancing Salesforce</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Effectiveness with </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">AI-Based Coaching </span>
                  <span className="text-white"> to advance your business</span>
                </h1>
                
                <p className="text-xl text-slate-300 leading-relaxed">
                  Streamline healthcare representative performance with intelligent, 
                  data-driven coaching. Smart automation meets powerful analytics for 
                  management excellence.
                </p>
              </div>

              <Button 
                onClick={scrollToFeatures}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg"
              >
                EXPLORE FEATURES
              </Button>
            </div>

            <div className="relative">
              {/* RepWise Dashboard Mockup */}
              <div className="relative w-full h-96 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl overflow-hidden border border-slate-600 shadow-2xl">
                {/* Header */}
                <div className="bg-slate-900 p-4 border-b border-slate-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">R</span>
                    </div>
                    <span className="text-white font-semibold">RepWise(AI)</span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-white text-lg font-semibold mb-2">Enhancing Sales Force Effectiveness with AI-Based Coaching/Training</h3>
                    <p className="text-cyan-400 text-sm">Improve your sales performance through AI-generated insights</p>
                  </div>

                  {/* Dashboard Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* AI Insights Card */}
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="h-4 w-4 text-cyan-400" />
                        <span className="text-cyan-400 text-sm font-medium">AI-Generated Insights</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-8 w-8 text-cyan-400" />
                        <div className="flex-1">
                          <div className="w-full bg-slate-600 rounded-full h-2 mb-1">
                            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full w-3/4"></div>
                          </div>
                          <span className="text-white text-xs">Performance Trend: +12%</span>
                        </div>
                      </div>
                    </div>

                    {/* User Performance */}
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="h-4 w-4 text-orange-400" />
                        <span className="text-orange-400 text-sm font-medium">Team Performance</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">★</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">4.2/5</div>
                          <div className="text-slate-400 text-xs">Avg Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Avatars */}
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* AI Powered Badge */}
                <div className="absolute bottom-4 right-4">
                  <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0">
                    AI-Powered Analytics
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Quick Features Preview */}
      <section className="relative py-12 px-6 z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "Smart Automation", desc: "AI-driven recommendations" },
              { icon: Target, title: "Precision Targeting", desc: "Focused coaching plans" },
              { icon: BarChart3, title: "Real-time Analytics", desc: "Live performance data" },
              { icon: TrendingUp, title: "ROI Optimization", desc: "Maximize team results" }
            ].map((feature, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Main Features Section */}
      <section id="features" className="relative py-20 px-6 bg-slate-800/30 z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Your challenges.</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Our solutions.
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We help healthcare teams work smarter by empowering them with proven data, 
              technology, and AI solutions across the entire performance lifecycle.
            </p>
          </div>

          {/* Feature Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              "Performance Analytics",
              "Goal Tracking", 
              "AI Recommendations",
              "Team Management"
            ].map((tab, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className={index === 0 
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" 
                  : "border-slate-600 text-slate-300 hover:text-white hover:border-slate-400"
                }
              >
                {tab}
              </Button>
            ))}
          </div>

          {/* Featured Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Smart Performance Tracking</h3>
                    <p className="text-slate-300">
                      AI-powered KPI monitoring with real-time insights into sales calls, 
                      appointments, and conversion rates for data-driven decisions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Intelligent Coaching</h3>
                    <p className="text-slate-300">
                      Machine learning recommendations for optimal training, mentoring, 
                      and development plans tailored to individual performance patterns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Goal Achievement</h3>
                    <p className="text-slate-300">
                      Automated goal setting and progress tracking with priority-based 
                      notifications and achievement recognition systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-2xl p-8 border border-slate-600">
              <div className="bg-slate-800 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">Performance Dashboard</h4>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">Live</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Sales Conversion</span>
                    <span className="text-white font-semibold">87%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full w-[87%]"></div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">142</div>
                  <div className="text-slate-400 text-sm">Active Reports</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">94%</div>
                  <div className="text-slate-400 text-sm">Team Performance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="relative bg-slate-900 border-t border-slate-700 py-12 px-6 z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">RepWise</span>
              </div>
              <p className="text-slate-400 text-sm">
                The relentless pursuit of performance excellence through intelligent automation.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <div className="space-y-2">
                <button onClick={scrollToFeatures} className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Features
                </button>
                <Link href="/dashboard" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Dashboard
                </Link>
                <button onClick={onNavigateToLogin} className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Demo
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <div className="text-slate-400 text-sm">Help Center</div>
                <div className="text-slate-400 text-sm">Training</div>
                <div className="text-slate-400 text-sm">Status Page</div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Demo Credentials</h4>
              <div className="space-y-2 text-sm">
                <div className="text-slate-300">Manager: manager@example.com</div>
                <div className="text-slate-300">Rep: rep1@example.com</div>
                <div className="text-slate-400">Password: password123</div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm">
              Copyright © RepWise 2025. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <div className="text-slate-400 text-sm hover:text-white cursor-pointer">Privacy Policy</div>
              <div className="text-slate-400 text-sm hover:text-white cursor-pointer">Terms of Service</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}