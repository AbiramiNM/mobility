import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/components/ThemeProvider";
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
    alert("Itinerary selected!");
  }

  function updateActivity(itinId: string, dayIdx: number, actIdx: number, patch: Partial<ActivityItem>) {
    setItins((prev) =>
      prev.map((it) => {
        if (it.id !== itinId) return it;
        const days = it.days.map((d, di) => {
          if (di !== dayIdx) return d;
          const activities = d.activities.map((a, ai) => (ai === actIdx ? { ...a, ...patch } : a));
          return { ...d, activities };
        });
        return verifyBudget({ ...it, days });
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
              {itins.map((it) => {
                const isEditing = editingId === it.id;
                return (
                  <Card key={it.id} className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{it.title}</span>
                        <span className={it.isValidBudget ? "text-green-600" : "text-red-600"}>
                          {it.isValidBudget ? "✅ Plan is good to go!" : "⚠️ Budget exceeded, please adjust."}
                        </span>
                      </CardTitle>
                      <CardDescription>
                        {it.destination} • {it.persons} {it.persons === 1 ? "person" : "people"} • Start {it.startDate} • Budget ${it.budget}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm text-muted-foreground">Estimated total: ${it.totalCost}</div>
                      <ScrollArea className="h-80 pr-3">
                        <div className="space-y-4">
                          {it.days.map((d, di) => (
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
                                        <div className="col-span-1 text-right">${a.cost}</div>
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
                        <Button variant="ghost" onClick={() => setEditingId(isEditing ? null : it.id)}>
                          {isEditing ? "Done" : "Edit"}
                        </Button>
                        <Button onClick={() => handleSelect(it.id)}>Select</Button>
                      </div>
                    </CardContent>
                  </Card>
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


