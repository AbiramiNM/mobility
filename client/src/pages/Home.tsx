import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<{ username: string } | null>(null);

  // Mock user state - in real app this would come from auth context
  useEffect(() => {
    // Simulate checking for authenticated user
    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        user={user} 
        onThemeToggle={toggleTheme}
        isDark={theme === "dark"}
      />
      <main className="flex-1">
        <Hero user={user} />
      </main>
      <Footer />
    </div>
  );
}