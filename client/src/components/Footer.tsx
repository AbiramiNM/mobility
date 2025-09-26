import { Link } from "wouter";
import { Plane, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Plane className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold text-foreground">WanderWise</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-powered travel planning that helps you create perfect adventures tailored to your style and budget.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Product</h3>
            <nav className="space-y-2">
              <Link href="/planner" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                AI Trip Planner
              </Link>
              <Link href="/explore" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Explore Destinations
              </Link>
              <Link href="/my-trips" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                My Trips
              </Link>
              <Link href="/features" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <nav className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link href="/blog" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Travel Blog
              </Link>
              <Link href="/careers" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Careers
              </Link>
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Support</h3>
            <nav className="space-y-2">
              <Link href="/help" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </Link>
              <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/support" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Customer Support
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 WanderWise. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for travelers
          </p>
        </div>
      </div>
    </footer>
  );
}