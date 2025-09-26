import AuthForm from '../AuthForm'
import { useState } from 'react'

export default function AuthFormExample() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  
  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data)
    setIsLoading(true)
    setError("")
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log('Authentication completed')
    }, 2000)
  }
  
  return (
    <div className="space-y-8">
      {/* Sign Up Form */}
      <div>
        <h3 className="text-lg font-medium mb-4">Sign Up Form</h3>
        <AuthForm 
          type="signup"
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </div>
      
      {/* Sign In Form */}
      <div>
        <h3 className="text-lg font-medium mb-4">Sign In Form</h3>
        <AuthForm 
          type="signin"
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  )
}