import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useTheme } from "@/components/ThemeProvider";
import { mockGenerateItineraries, storeItineraries, type Interest } from "@/lib/itinerary";
import { useLocation } from "wouter";

const ALL_INTERESTS: Interest[] = [
  "Adventure",
  "Culture",
  "Relaxation",
  "Food",
  "Nature",
  "Nightlife",
];

export default function Planner() {
  const { theme, toggleTheme } = useTheme();
  const [_, navigate] = useLocation();
  const [user, setUser] = useState<{ username: string } | null>(() => {
    const mockUser = localStorage.getItem("mockUser");
    return mockUser ? JSON.parse(mockUser) : null;
  });

  const [persons, setPersons] = useState<number>(2);
  const [destination, setDestination] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [days, setDays] = useState<number>(3);
  const [budget, setBudget] = useState<number>(50000);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [submitting, setSubmitting] = useState(false);

  function toggleInterest(val: Interest, checked: boolean) {
    setInterests((prev) => {
      if (checked) return Array.from(new Set([...prev, val]));
      return prev.filter((i) => i !== val);
    });
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!destination || !startDate || persons <= 0 || budget <= 0 || days <= 0) return;
    setSubmitting(true);
    setTimeout(() => {
      const itins = mockGenerateItineraries({
        persons,
        destination,
        startDate: startDate.toISOString().slice(0, 10),
        days,
        budget,
        interests,
      });
      storeItineraries(itins);
      setSubmitting(false);
      navigate("/itineraries");
    }, 400);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header user={user} onThemeToggle={toggleTheme} isDark={theme === "dark"} />
      <main className="flex-1">
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle>AI Trip Planner</CardTitle>
                <CardDescription>Provide your preferences and budget to generate itineraries.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleGenerate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="persons">Number of persons</Label>
                      <Input
                        id="persons"
                        type="number"
                        min={1}
                        value={persons}
                        onChange={(e) => setPersons(parseInt(e.target.value || "0", 10))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination</Label>
                      <Input
                        id="destination"
                        placeholder="e.g., Bali, Paris, Tokyo"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Start date</Label>
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        className="rounded-md border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="days">Number of days</Label>
                      <Input
                        id="days"
                        type="number"
                        min={1}
                        max={14}
                        value={days}
                        onChange={(e) => setDays(parseInt(e.target.value || "0", 10))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget (₹)</Label>
                      <Input
                        id="budget"
                        type="number"
                        min={1000}
                        value={budget}
                        onChange={(e) => setBudget(parseInt(e.target.value || "0", 10))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Interests</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {ALL_INTERESTS.map((i) => (
                        <label key={i} className="flex items-center gap-2 text-sm">
                          <Checkbox
                            checked={interests.includes(i)}
                            onCheckedChange={(c) => toggleInterest(i, Boolean(c))}
                          />
                          <span>{i}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="w-full" disabled={submitting || !startDate}>
                      {submitting ? "Generating..." : "Generate Itinerary"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


