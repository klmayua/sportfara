export interface Bookmaker {
  id: string;
  name: string;
  color: string;
  countries: string[];
}

export const BOOKMAKERS: Bookmaker[] = [
  { id: "bet9ja", name: "Bet9ja", color: "#00A651", countries: ["NG"] },
  { id: "betika", name: "Betika", color: "#E31837", countries: ["KE", "UG", "TZ"] },
  { id: "sportpesa", name: "SportPesa", color: "#008B00", countries: ["KE", "TZ"] },
  { id: "hollywoodbets", name: "Hollywoodbets", color: "#6B21A8", countries: ["ZA"] },
  { id: "betway", name: "Betway", color: "#00875A", countries: ["ZA", "NG", "KE"] },
  { id: "supabets", name: "Supabets", color: "#FF6B00", countries: ["ZA"] },
  { id: "1xbet", name: "1xBet", color: "#1E3A5F", countries: ["NG", "KE", "CI", "SN"] },
  { id: "22bet", name: "22Bet", color: "#E84E1B", countries: ["NG", "KE"] },
  { id: "betclic", name: "Betclic", color: "#FF5F00", countries: ["FR", "MA", "CI"] },
  { id: "unibet", name: "Unibet", color: "#147B45", countries: ["MA"] },
  { id: "paripesa", name: "PariPesa", color: "#FF4B12", countries: ["CI", "SN"] },
];

export function getBookmakerById(id: string): Bookmaker | undefined {
  return BOOKMAKERS.find((b) => b.id === id);
}
