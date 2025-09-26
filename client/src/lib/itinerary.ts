export type Interest =
  | "Adventure"
  | "Culture"
  | "Relaxation"
  | "Food"
  | "Nature"
  | "Nightlife";

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  cost: number; // per activity cost in the itinerary currency
}

export interface DayPlan {
  day: number;
  activities: ActivityItem[];
}

export interface ItineraryInput {
  persons: number;
  destination: string;
  startDate: string; // ISO date
  days: number; // number of days
  budget: number; // total budget cap in rupees
  interests: Interest[];
}

export interface Itinerary {
  id: string;
  title: string;
  destination: string;
  persons: number;
  startDate: string;
  days: number;
  budget: number; // in rupees
  totalCost: number; // in rupees
  dayPlans: DayPlan[];
  isValidBudget: boolean;
  isPaid: boolean;
}

const STORAGE_KEY = "ww_itineraries";
const SELECTED_KEY = "ww_selected_itinerary";

export function getStoredItineraries(): Itinerary[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Itinerary[];
  } catch {
    return [];
  }
}

export function storeItineraries(itins: Itinerary[]): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(itins));
}

export function setSelectedItinerary(id: string): void {
  sessionStorage.setItem(SELECTED_KEY, id);
}

export function getSelectedItineraryId(): string | null {
  return sessionStorage.getItem(SELECTED_KEY);
}

export function computeTotalCost(itin: Itinerary): number {
  return itin.dayPlans.reduce((sum, d) => {
    return sum + d.activities.reduce((a, act) => a + Math.max(0, act.cost || 0), 0);
  }, 0);
}

export function verifyBudget(itin: Itinerary): Itinerary {
  const total = computeTotalCost(itin);
  return {
    ...itin,
    totalCost: total,
    isValidBudget: total < itin.budget,
  };
}

function randomId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function pickSampleActivities(interests: Interest[]): { title: string; description: string }[] {
  const catalog: Record<Interest, { title: string; description: string }[]> = {
    Adventure: [
      { title: "Zipline Park", description: "High-adrenaline canopy ziplines." },
      { title: "Mountain Hike", description: "Guided trek to scenic viewpoints." },
      { title: "Kayaking", description: "Half-day paddle through calm waters." },
    ],
    Culture: [
      { title: "Old Town Tour", description: "Walking tour with local historian." },
      { title: "Museum Pass", description: "Access to top museums and exhibits." },
      { title: "Cultural Show", description: "Evening performance with folk music." },
    ],
    Relaxation: [
      { title: "Beach Day", description: "Relax on a quiet stretch of sand." },
      { title: "Spa Session", description: "Therapeutic massage and sauna." },
      { title: "Sunset Lounge", description: "Cocktails and chill at sunset." },
    ],
    Food: [
      { title: "Street Food Crawl", description: "Taste local favorites with a guide." },
      { title: "Cooking Class", description: "Learn to prepare regional dishes." },
      { title: "Farmers Market", description: "Fresh produce and artisanal snacks." },
    ],
    Nature: [
      { title: "Botanical Gardens", description: "Explore native flora and fauna." },
      { title: "Waterfall Visit", description: "Short hike to a scenic waterfall." },
      { title: "Birdwatching", description: "Early-morning nature walk." },
    ],
    Nightlife: [
      { title: "Rooftop Bar", description: "Views and vibes over the city." },
      { title: "Live Music", description: "Local bands and open mic night." },
      { title: "Club Night", description: "Dance the night away." },
    ],
  };

  const pool = interests.length
    ? interests.flatMap((i) => catalog[i])
    : Object.values(catalog).flat();
  // Shuffle
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 12);
}

export function mockGenerateItineraries(input: ItineraryInput): Itinerary[] {
  const numItins = Math.floor(Math.random() * 2) + 3; // 3 or 4
  const activitiesCatalog = pickSampleActivities(input.interests);

  const itineraries: Itinerary[] = [];
  for (let i = 0; i < numItins; i++) {
    const daysCount = input.days;
    const dayPlans: DayPlan[] = [];

    // Target total strictly below budget with safety margin (70% - 95%)
    const targetTotal = input.budget * (0.7 + Math.random() * 0.25);
    let remaining = targetTotal;

    for (let d = 1; d <= daysCount; d++) {
      const numActs = Math.floor(Math.random() * 2) + 2; // 2-3 per day
      const activities: ActivityItem[] = [];
      for (let a = 0; a < numActs; a++) {
        const pick = activitiesCatalog[(d * 3 + a + i) % activitiesCatalog.length];
        const maxForThis = Math.max(150, remaining / ((daysCount - d + 1) * (numActs - a || 1)));
        const base = Math.max(100, Math.min(maxForThis, targetTotal / (daysCount * numActs)));
        const cost = Math.max(50, Math.round(base * (0.6 + Math.random() * 0.8)));
        remaining = Math.max(0, remaining - cost);
        activities.push({
          id: randomId("act"),
          title: pick.title,
          description: pick.description,
          cost,
        });
      }
      dayPlans.push({ day: d, activities });
    }

    const itin: Itinerary = verifyBudget({
      id: randomId("itin"),
      title: `${input.destination} Escape #${i + 1}`,
      destination: input.destination,
      persons: input.persons,
      startDate: input.startDate,
      days: input.days,
      budget: input.budget,
      totalCost: 0,
      dayPlans,
      isValidBudget: false,
      isPaid: false,
    });

    // If the generator accidentally went above budget, reduce costs proportionally
    if (!itin.isValidBudget && itin.totalCost > 0) {
      const scale = (input.budget * 0.95) / itin.totalCost; // ensure strictly below
      const scaledDayPlans = itin.dayPlans.map((d) => ({
        ...d,
        activities: d.activities.map((a) => ({
          ...a,
          cost: Math.max(10, Math.floor(a.cost * Math.min(0.99, scale))),
        })),
      }));
      itineraries.push(verifyBudget({ ...itin, dayPlans: scaledDayPlans }));
    } else {
      itineraries.push(itin);
    }
  }

  return itineraries;
}


