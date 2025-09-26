import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/ThemeProvider";
import { Thermometer, Cloud } from "lucide-react";
import {
  getStoredItineraries,
  storeItineraries,
  getSelectedItineraryId,
  type Itinerary,
} from "@/lib/itinerary";

export default function Payment() {
  const { theme, toggleTheme } = useTheme();
  const [_, navigate] = useLocation();
  const [user] = useState<{ username: string } | null>(() => {
    const mockUser = localStorage.getItem("mockUser");
    return mockUser ? JSON.parse(mockUser) : null;
  });

  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [holderName, setHolderName] = useState("");

  useEffect(() => {
    const selectedId = getSelectedItineraryId();
    if (!selectedId) {
      navigate("/itineraries");
      return;
    }

    const itineraries = getStoredItineraries();
    const found = itineraries.find((it) => it.id === selectedId);
    if (!found) {
      navigate("/itineraries");
      return;
    }

    setSelectedItinerary(found);
  }, [navigate]);

  function handlePayment(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedItinerary || !cardNumber || !expiryDate || !cvv || !holderName) return;

    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Mark itinerary as paid
      const itineraries = getStoredItineraries();
      const updatedItineraries = itineraries.map((it) =>
        it.id === selectedItinerary.id ? { ...it, isPaid: true } : it
      );
      storeItineraries(updatedItineraries);
      
      setProcessing(false);
      alert("Payment successful! Your trip has been booked.");
      navigate("/my-trips");
    }, 2000);
  }

  if (!selectedItinerary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header user={user} onThemeToggle={toggleTheme} isDark={theme === "dark"} />
      <main className="flex-1">
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <CardDescription>Review your selected itinerary</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Destination Image */}
                    {selectedItinerary.images && selectedItinerary.images.length > 0 && (
                      <div className="relative h-32 overflow-hidden rounded-lg">
                        <motion.img
                          src={selectedItinerary.images[0]}
                          alt={selectedItinerary.destination}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-2 left-2 text-white">
                          <h3 className="font-bold text-lg">{selectedItinerary.destination}</h3>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-semibold text-lg">{selectedItinerary.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedItinerary.persons}{" "}
                        {selectedItinerary.persons === 1 ? "person" : "people"} • {selectedItinerary.days} days
                      </p>
                      
                      {/* Weather Info */}
                      {selectedItinerary.weather && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                          <Thermometer className="w-4 h-4" />
                          <span>{Math.round(selectedItinerary.weather.temperature)}°C</span>
                          <span>•</span>
                          <span className="capitalize">{selectedItinerary.weather.description}</span>
                        </div>
                      )}
                      
                      {/* Best Season */}
                      {selectedItinerary.bestSeason && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{selectedItinerary.bestSeason.icon}</span>
                          <span>Best season: {selectedItinerary.bestSeason.season}</span>
                        </div>
                      )}
                    </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Amount</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{selectedItinerary.totalCost.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Budget: ₹{selectedItinerary.budget.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-3 border-t pt-4">
                    <h4 className="font-medium">Day-wise Activities</h4>
                    {selectedItinerary.dayPlans.map((day, idx) => (
                      <div key={idx} className="text-sm">
                        <div className="font-medium">Day {day.day}</div>
                        <ul className="ml-4 space-y-1">
                          {day.activities.map((activity, actIdx) => (
                            <li key={actIdx} className="flex justify-between">
                              <span>{activity.title}</span>
                              <span>₹{activity.cost.toLocaleString()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              </motion.div>

              {/* Payment Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>Enter your payment information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handlePayment}>
                    <div className="space-y-2">
                      <Label htmlFor="holderName">Cardholder Name</Label>
                      <Input
                        id="holderName"
                        placeholder="John Doe"
                        value={holderName}
                        onChange={(e) => setHolderName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          maxLength={5}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>

                    <div className="pt-4 space-y-3">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button type="submit" className="w-full" disabled={processing}>
                          {processing ? "Processing Payment..." : `Pay ₹${selectedItinerary.totalCost.toLocaleString()}`}
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => navigate("/itineraries")}
                          disabled={processing}
                        >
                          Back to Itineraries
                        </Button>
                      </motion.div>
                    </div>
                  </form>
                </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
