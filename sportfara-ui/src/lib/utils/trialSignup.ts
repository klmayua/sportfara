import type { ActiveMode } from "@/lib/stores/modeStore";
import type { ActiveSport } from "@/lib/stores/sportStore";

export interface TrialSignupData {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  selectedMode: ActiveMode;
  sourceSport: ActiveSport;
  utmSource?: string;
}

export async function submitTrialSignup(data: TrialSignupData): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/trial/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json() as { ok: boolean; error?: string };
    if (json.ok) {
      // Persist trial state locally so CounterBar can read it
      const trialStart = new Date().toISOString();
      const trialEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      localStorage.setItem("sf_trial", JSON.stringify({
        ...data, trial_start: trialStart, trial_end: trialEnd,
      }));
    }
    return json;
  } catch {
    // Offline fallback — store locally only
    const trialStart = new Date().toISOString();
    const trialEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    localStorage.setItem("sf_trial", JSON.stringify({
      ...data, trial_start: trialStart, trial_end: trialEnd,
    }));
    return { ok: true };
  }
}

export function getTrialState(): { isOnTrial: boolean; dayNumber: number; daysRemaining: number } {
  if (typeof window === "undefined") return { isOnTrial: false, dayNumber: 0, daysRemaining: 0 };
  const raw = localStorage.getItem("sf_trial");
  if (!raw) return { isOnTrial: false, dayNumber: 0, daysRemaining: 0 };
  try {
    const { trial_start } = JSON.parse(raw) as { trial_start: string };
    const msElapsed = Date.now() - new Date(trial_start).getTime();
    const dayNumber = Math.floor(msElapsed / (1000 * 60 * 60 * 24)) + 1;
    const daysRemaining = Math.max(0, 8 - dayNumber);
    const isOnTrial = daysRemaining > 0;
    return { isOnTrial, dayNumber, daysRemaining };
  } catch {
    return { isOnTrial: false, dayNumber: 0, daysRemaining: 0 };
  }
}
