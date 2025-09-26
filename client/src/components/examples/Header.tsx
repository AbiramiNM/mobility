import Header from '../Header'
import { useState } from 'react'

export default function HeaderExample() {
  const [isDark, setIsDark] = useState(false)
  
  // Mock user - can be null for signed-out state
  const mockUser = { username: "sarah_wanderer" }
  
  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={mockUser}
        onThemeToggle={() => setIsDark(!isDark)}
        isDark={isDark}
      />
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">Header component preview. Try toggling the menu and theme.</p>
      </div>
    </div>
  )
}