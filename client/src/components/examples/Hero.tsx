import Hero from '../Hero'

export default function HeroExample() {
  // Test with different user states
  const mockUser = { username: "sarah_wanderer" }
  
  return (
    <div className="space-y-8">
      {/* Signed out state */}
      <div>
        <h3 className="text-lg font-medium mb-4">Hero - Signed Out State</h3>
        <Hero user={null} />
      </div>
      
      {/* Signed in state */}
      <div>
        <h3 className="text-lg font-medium mb-4">Hero - Signed In State</h3>
        <Hero user={mockUser} />
      </div>
    </div>
  )
}