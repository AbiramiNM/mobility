import Footer from '../Footer'

export default function FooterExample() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-background p-8">
        <p className="text-muted-foreground text-center">Main content area</p>
      </div>
      <Footer />
    </div>
  )
}