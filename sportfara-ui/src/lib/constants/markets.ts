export interface League {
  id: string;
  name: string;
  nameFr: string;
  country: string;
  flag: string;
  tier: 1 | 2 | 3;
}

export const LEAGUES: League[] = [
  { id: "npfl", name: "Nigeria Premier League", nameFr: "Championnat Premier du Nigeria", country: "Nigeria", flag: "🇳🇬", tier: 1 },
  { id: "fkfpl", name: "FKF Premier League", nameFr: "Premier League du Kenya", country: "Kenya", flag: "🇰🇪", tier: 1 },
  { id: "dstv", name: "DStv Premiership", nameFr: "Premiership DStv", country: "South Africa", flag: "🇿🇦", tier: 1 },
  { id: "botola", name: "Botola Pro", nameFr: "Botola Pro (Maroc)", country: "Morocco", flag: "🇲🇦", tier: 1 },
  { id: "ligue1ci", name: "Ligue 1 Côte d'Ivoire", nameFr: "Ligue 1 Côte d'Ivoire", country: "Côte d'Ivoire", flag: "🇨🇮", tier: 1 },
  { id: "gpl", name: "Ghana Premier League", nameFr: "Premier League du Ghana", country: "Ghana", flag: "🇬🇭", tier: 1 },
  { id: "etpl", name: "Ethiopian Premier League", nameFr: "Premier League d'Éthiopie", country: "Ethiopia", flag: "🇪🇹", tier: 2 },
  { id: "tnl", name: "Tanzanian Premier League", nameFr: "Premier League de Tanzanie", country: "Tanzania", flag: "🇹🇿", tier: 2 },
];

export const MARKETS = [
  { id: "1x2", name: "1X2", nameFr: "1X2" },
  { id: "over15", name: "Over 1.5 Goals", nameFr: "Plus de 1.5 buts" },
  { id: "over25", name: "Over 2.5 Goals", nameFr: "Plus de 2.5 buts" },
  { id: "btts", name: "Both Teams to Score", nameFr: "Les deux équipes marquent" },
  { id: "dc", name: "Double Chance", nameFr: "Double chance" },
  { id: "ht", name: "Half Time Result", nameFr: "Résultat mi-temps" },
] as const;
