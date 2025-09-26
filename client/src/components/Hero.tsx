import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Sparkles, Users, Calendar } from "lucide-react";

interface HeroProps {
  user?: { username: string } | null;
}

export default function Hero({ user }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-background via-background to-muted/20 py-20 px-4 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-primary/15 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-40 right-1/4 w-20 h-20 bg-primary/25 rounded-full animate-bounce delay-1000"></div>
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