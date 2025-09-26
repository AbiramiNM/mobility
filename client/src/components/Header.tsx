import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Plane, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

interface HeaderProps {
  user?: { username: string } | null;
  onThemeToggle?: () => void;
  isDark?: boolean;
}

export default function Header({ user, onThemeToggle, isDark }: HeaderProps) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isAuthPage = location === "/signin" || location === "/signup";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover-elevate rounded-md px-2 py-1" data-testid="link-home">
          <Plane className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold text-foreground">WanderWise</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {!isAuthPage && (
            <>
              <Link href="/explore" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-explore">
                Explore
              </Link>
              <Link href="/my-trips" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-trips">
                My Trips
              </Link>
              <Link href="/planner" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-planner">
                AI Planner
              </Link>
            </>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeToggle}
            data-testid="button-theme-toggle"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Welcome, <span className="font-medium text-foreground">{user.username}</span>
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => console.log('Sign out triggered')}
                data-testid="button-signout"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/signin">
                <Button variant="ghost" size="sm" data-testid="button-signin">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" data-testid="button-signup">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-testid="button-menu-toggle"
        >
          {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-card">
          <nav className="container px-4 py-4 space-y-4">
            {!isAuthPage && (
              <>
                <Link href="/explore" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                  Explore
                </Link>
                <Link href="/my-trips" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                  My Trips
                </Link>
                <Link href="/planner" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                  AI Planner
                </Link>
                <div className="border-t pt-4"></div>
              </>
            )}
            
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={onThemeToggle}
                className="flex items-center gap-2"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
            
            {user ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Welcome, <span className="font-medium text-foreground">{user.username}</span>
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => console.log('Sign out triggered')}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/signin" className="flex-1">
                  <Button variant="ghost" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button size="sm" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}