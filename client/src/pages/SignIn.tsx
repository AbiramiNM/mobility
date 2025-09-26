import { useState } from "react";
import { useLocation } from "wouter";
import AuthForm from "@/components/AuthForm";

interface SignInData {
  email: string;
  password: string;
}

export default function SignIn() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSignIn = async (data: SignInData) => {
    console.log('Sign in attempt:', { email: data.email });
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful sign in
      const mockUser = { username: data.email.split('@')[0] };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      
      console.log('Sign in successful');
      setLocation('/');
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error('Sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      type="signin"
      onSubmit={handleSignIn}
      isLoading={isLoading}
      error={error}
    />
  );
}