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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
      <section className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-white">Advanced</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                    performance
                  </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                    management
                  </span>
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
              <div className="relative w-full h-96 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-20 animate-pulse"></div>
                </div>
                <div className="absolute bottom-4 right-4 text-slate-400 text-sm">
                  AI-Powered Analytics
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features Preview */}
      <section className="py-12 px-6">
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
      <section id="features" className="py-20 px-6 bg-slate-800/30">
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
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-6">
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