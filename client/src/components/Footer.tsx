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
              <span className="text-xl font-semibold text-foreground">VoyageVibe</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-powered travel planning that helps you create perfect adventures tailored to your style and budget.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Product</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">AI Trip Planner</p>
              <p className="text-sm text-muted-foreground">Explore Destinations</p>
              <p className="text-sm text-muted-foreground">My Trips</p>
              <p className="text-sm text-muted-foreground">Features</p>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">About Us</p>
              <p className="text-sm text-muted-foreground">Travel Blog</p>
              <p className="text-sm text-muted-foreground">Careers</p>
              <p className="text-sm text-muted-foreground">Contact</p>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Support</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Help Center</p>
              <p className="text-sm text-muted-foreground">Privacy Policy</p>
              <p className="text-sm text-muted-foreground">Terms of Service</p>
              <p className="text-sm text-muted-foreground">Customer Support</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 VoyageVibe. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for travelers
          </p>
        </div>
      </div>
    </footer>
  );
}