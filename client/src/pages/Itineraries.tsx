import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/components/ThemeProvider";
import { Cloud, Sun, Thermometer } from "lucide-react";
import {
  getStoredItineraries,
  storeItineraries,
  verifyBudget,
  setSelectedItinerary,
  type Itinerary,
  type ActivityItem,
} from "@/lib/itinerary";

export default function Itineraries() {
  const { theme, toggleTheme } = useTheme();
  const [_, navigate] = useLocation();
  const [user] = useState<{ username: string } | null>(() => {
    const mockUser = localStorage.getItem("mockUser");
    return mockUser ? JSON.parse(mockUser) : null;
  });

  const [itins, setItins] = useState<Itinerary[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setItins(getStoredItineraries());
  }, []);

  useEffect(() => {
    storeItineraries(itins);
  }, [itins]);

  function handleSelect(id: string) {
    setSelectedItinerary(id);
    navigate("/payment");
  }

  function updateActivity(itinId: string, dayIdx: number, actIdx: number, patch: Partial<ActivityItem>) {
    setItins((prev) =>
      prev.map((it) => {
        if (it.id !== itinId) return it;
        const dayPlans = it.dayPlans.map((d, di) => {
          if (di !== dayIdx) return d;
          const activities = d.activities.map((a, ai) => (ai === actIdx ? { ...a, ...patch } : a));
          return { ...d, activities };
        });
        return verifyBudget({ ...it, dayPlans });
      })
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header user={user} onThemeToggle={toggleTheme} isDark={theme === "dark"} />
      <main className="flex-1">
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-6xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Generated Itineraries</h2>
                <p className="text-sm text-muted-foreground">Edit and verify that plans stay under budget.</p>
              </div>
              <Button onClick={() => history.back()} variant="outline">Back</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {itins.map((it, index) => {
                const isEditing = editingId === it.id;
                return (
                  <motion.div
                    key={it.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="h-full"
                  >
                    <Card className="flex flex-col h-full overflow-hidden">
                      {/* Destination Image */}
                      {it.images && it.images.length > 0 && (
                        <div className="relative h-48 overflow-hidden">
                          <motion.img
                            src={it.images[0]}
                            alt={it.destination}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-xl font-bold">{it.destination}</h3>
                            {it.weather && (
                              <div className="flex items-center gap-2 text-sm">
                                <Thermometer className="w-4 h-4" />
                                <span>{Math.round(it.weather.temperature)}°C</span>
                                <span>•</span>
                                <span className="capitalize">{it.weather.description}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{it.title}</span>
                          <span className={it.isValidBudget ? "text-green-600" : "text-red-600"}>
                            {it.isValidBudget ? "✅ Plan is good to go!" : "⚠️ Budget exceeded, please adjust."}
                          </span>
                        </CardTitle>
                        <CardDescription>
                          {it.persons} {it.persons === 1 ? "person" : "people"} • {it.days} days • Start {it.startDate} • Budget ₹{it.budget.toLocaleString()}
                        </CardDescription>
                        
                        {/* Weather and Season Info */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {it.weather && (
                            <div className="flex items-center gap-1">
                              <Cloud className="w-4 h-4" />
                              <span>{Math.round(it.weather.temperature)}°C</span>
                            </div>
                          )}
                          {it.bestSeason && (
                            <div className="flex items-center gap-1">
                              <span>{it.bestSeason.icon}</span>
                              <span>Best: {it.bestSeason.season}</span>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm text-muted-foreground">Estimated total: ₹{it.totalCost.toLocaleString()}</div>
                      <ScrollArea className="h-80 pr-3">
                        <div className="space-y-4">
                          {it.dayPlans.map((d, di) => (
                            <div key={di} className="border rounded-md p-3">
                              <div className="font-medium mb-2">Day {d.day}</div>
                              <div className="space-y-3">
                                {d.activities.map((a, ai) => (
                                  <div key={a.id} className="grid grid-cols-5 gap-2 items-center">
                                    {isEditing ? (
                                      <>
                                        <Input
                                          className="col-span-2"
                                          value={a.title}
                                          onChange={(e) => updateActivity(it.id, di, ai, { title: e.target.value })}
                                        />
                                        <Input
                                          className="col-span-2"
                                          value={a.description}
                                          onChange={(e) => updateActivity(it.id, di, ai, { description: e.target.value })}
                                        />
                                        <Input
                                          type="number"
                                          className="col-span-1"
                                          value={a.cost}
                                          onChange={(e) => updateActivity(it.id, di, ai, { cost: parseInt(e.target.value || "0", 10) })}
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <div className="col-span-2 font-medium">{a.title}</div>
                                        <div className="col-span-2 text-sm text-muted-foreground">{a.description}</div>
                                        <div className="col-span-1 text-right">₹{a.cost.toLocaleString()}</div>
                                      </>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>

                      <div className="flex gap-2 justify-end">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button variant="ghost" onClick={() => setEditingId(isEditing ? null : it.id)}>
                            {isEditing ? "Done" : "Edit"}
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button onClick={() => handleSelect(it.id)}>Select</Button>
                        </motion.div>
                      </div>
                    </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


