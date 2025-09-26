import { useState } from "react";
import { useLocation } from "wouter";
import AuthForm from "@/components/AuthForm";

interface SignUpData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function SignUp() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSignUp = async (data: SignUpData) => {
    console.log('Sign up attempt:', { name: data.name, email: data.email });
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful sign up
      const mockUser = { username: data.name || data.email.split('@')[0] };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      
      console.log('Sign up successful');
      setLocation('/');
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error('Sign up error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      type="signup"
      onSubmit={handleSignUp}
      isLoading={isLoading}
      error={error}
    />
  );
}