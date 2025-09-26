import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/components/ThemeProvider";
import { getStoredItineraries, type Itinerary } from "@/lib/itinerary";

export default function MyTrips() {
  const { theme, toggleTheme } = useTheme();
  const [user] = useState<{ username: string } | null>(() => {
    const mockUser = localStorage.getItem("mockUser");
    return mockUser ? JSON.parse(mockUser) : null;
  });

  const [paidItineraries, setPaidItineraries] = useState<Itinerary[]>([]);

  useEffect(() => {
    const allItineraries = getStoredItineraries();
    const paid = allItineraries.filter((it) => it.isPaid);
    setPaidItineraries(paid);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header user={user} onThemeToggle={toggleTheme} isDark={theme === "dark"} />
      <main className="flex-1">
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold">My Trips</h2>
              <p className="text-muted-foreground">Your booked itineraries and order summaries</p>
            </div>

            {paidItineraries.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <h3 className="text-lg font-semibold mb-2">No booked trips yet</h3>
                  <p className="text-muted-foreground">
                    Once you complete payment for an itinerary, it will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {paidItineraries.map((trip) => (
                  <Card key={trip.id} className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{trip.title}</span>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                          Paid
                        </span>
                      </CardTitle>
                      <CardDescription>
                        {trip.destination} • {trip.persons} {trip.persons === 1 ? "person" : "people"} • {trip.days} days • Start {trip.startDate}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Total Paid</span>
                          <span className="text-xl font-bold text-green-600">
                            ₹{trip.totalCost.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Budget: ₹{trip.budget.toLocaleString()}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Order Summary</h4>
                        <ScrollArea className="h-64">
                          <div className="space-y-3">
                            {trip.dayPlans.map((day, dayIdx) => (
                              <div key={dayIdx} className="border rounded-md p-3">
                                <div className="font-medium mb-2">Day {day.day}</div>
                                <div className="space-y-2">
                                  {day.activities.map((activity, actIdx) => (
                                    <div key={actIdx} className="flex justify-between items-start text-sm">
                                      <div className="flex-1">
                                        <div className="font-medium">{activity.title}</div>
                                        <div className="text-muted-foreground text-xs">
                                          {activity.description}
                                        </div>
                                      </div>
                                      <div className="font-medium ml-2">
                                        ₹{activity.cost.toLocaleString()}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
