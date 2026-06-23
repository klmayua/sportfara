export const FLAGS = {
  INTELLIGENCE_FEED: true,
  BETTOR_DASHBOARD: true,
  CREATOR_DASHBOARD: true,
  AUTH: true,
  SUBSCRIPTIONS: true,
  MATCH_CENTER: false,
  BETTING_MODELS: false,
  COMMUNITY_FORUMS: false,
  LIVE_ROOMS: false,
  SCOUTING_DATABASE: false,
  SCOUTING_MARKETPLACE: false,
  ENTERPRISE_API: false,
  AI_COPILOT: false,
} as const;

export type FeatureFlag = keyof typeof FLAGS;

export function isEnabled(flag: FeatureFlag): boolean {
  return FLAGS[flag];
}
