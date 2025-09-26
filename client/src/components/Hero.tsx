import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Sparkles, Users, Calendar } from "lucide-react";

interface HeroProps {
  user?: { username: string } | null;
}

export default function Hero({ user }: HeroProps) {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23667eea;stop-opacity:0.3" /><stop offset="50%" style="stop-color:%23764ba2;stop-opacity:0.2" /><stop offset="100%" style="stop-color:%23f093fb;stop-opacity:0.3" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23grad1)"/><circle cx="200" cy="150" r="80" fill="%23667eea" opacity="0.1"/><circle cx="1000" cy="200" r="120" fill="%23764ba2" opacity="0.1"/><circle cx="300" cy="600" r="100" fill="%23f093fb" opacity="0.1"/><circle cx="900" cy="650" r="90" fill="%23667eea" opacity="0.1"/><path d="M0,400 Q300,200 600,400 T1200,400" stroke="%23667eea" stroke-width="2" fill="none" opacity="0.1"/><path d="M0,600 Q400,400 800,600 T1200,600" stroke="%23764ba2" stroke-width="2" fill="none" opacity="0.1"/></svg>')`
          }}
        ></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse blur-sm"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-bounce delay-300 blur-sm"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-r from-pink-400 to-blue-500 rounded-full animate-pulse delay-700 blur-sm"></div>
        <div className="absolute bottom-40 right-1/4 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce delay-1000 blur-sm"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse delay-500 blur-sm"></div>
        <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-gradient-to-r from-pink-400 to-blue-500 rounded-full animate-bounce delay-1200 blur-sm"></div>
      </div>
      <div className="container mx-auto max-w-6xl text-center">
        {/* Main Hero Content */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Plan Your Perfect{" "}
            <span className="text-primary">Adventure</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Create personalized travel itineraries with AI-powered recommendations. 
            Discover hidden gems, manage budgets, and make memories that last a lifetime.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link href="/planner">
                <Button size="lg" className="text-lg px-8 py-6" data-testid="button-start-planning">
                  Start Planning
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/signup">
                  <Button size="lg" className="text-lg px-8 py-6" data-testid="button-get-started">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-lg px-8 py-6" 
                    data-testid="button-explore"
                  >
                    Explore Destinations
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">AI-Powered</h3>
            <p className="text-muted-foreground">Smart recommendations tailored to your preferences and travel style</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Local Insights</h3>
            <p className="text-muted-foreground">Discover hidden gems and authentic experiences from local experts</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Easy Planning</h3>
            <p className="text-muted-foreground">Organize your entire trip with intuitive tools and smart scheduling</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Collaborate</h3>
            <p className="text-muted-foreground">Plan together with friends and family in real-time</p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Trusted by thousands of travelers worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Mock company logos represented as text */}
            <div className="text-sm font-medium text-muted-foreground">TravelCorp</div>
            <div className="text-sm font-medium text-muted-foreground">Wanderlust Co</div>
            <div className="text-sm font-medium text-muted-foreground">Explorer Inc</div>
            <div className="text-sm font-medium text-muted-foreground">Journey Ltd</div>
          </div>
        </div>
      </div>
    </section>
  );
}