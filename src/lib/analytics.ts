// Google Analytics 4 event tracking
// Tracks user engagement across all prayer features

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function track(event: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, params);
  }
}

// Prayer hours
export function trackHourStarted(hourId: string) {
  track("hour_started", { hour_id: hourId });
}

export function trackHourCompleted(hourId: string, paterCount: number) {
  track("hour_completed", { hour_id: hourId, pater_count: paterCount });
}

export function trackAllHoursCompleted(streak: number) {
  track("all_hours_completed", { streak_days: streak });
}

// Franciscan Crown Rosary
export function trackCrownStarted() {
  track("crown_started");
}

export function trackCrownDecadeCompleted(decade: number) {
  track("crown_decade_completed", { decade_number: decade });
}

export function trackCrownCompleted() {
  track("crown_completed");
}

// Stations of the Cross
export function trackStationsStarted() {
  track("stations_started");
}

export function trackStationViewed(station: number) {
  track("station_viewed", { station_number: station });
}

export function trackStationsCompleted() {
  track("stations_completed");
}

// Prayers
export function trackPrayerExpanded(prayerId: string) {
  track("prayer_expanded", { prayer_id: prayerId });
}

export function trackPrayerFavorited(prayerId: string, isFavorite: boolean) {
  track("prayer_favorited", { prayer_id: prayerId, is_favorite: isFavorite });
}

// Navigation
export function trackViewChanged(view: string) {
  track("view_changed", { view_name: view });
}

// Examination of Conscience
export function trackExaminationStarted() {
  track("examination_started");
}

export function trackExaminationCompleted() {
  track("examination_completed");
}

// Intentions
export function trackIntentionAdded() {
  track("intention_added");
}

// Language
export function trackLanguageChanged(locale: string) {
  track("language_changed", { locale });
}

// Auth
export function trackSignIn(method: "google" | "email") {
  track("sign_in", { method });
}

export function trackSignUp(method: "google" | "email") {
  track("sign_up", { method });
}

export function trackAuthFailure(stage: string, code: string) {
  track("auth_failure", { stage, code });
}

export function trackSyncFailed(source: "auto" | "manual", code: string) {
  track("sync_failed", { source, code });
}

export function trackSyncCompleted(source: "auto" | "manual") {
  track("sync_completed", { source });
}

// Sharing
export function trackShareCard() {
  track("share_card");
}

// Notifications
export function trackNotificationsEnabled() {
  track("notifications_enabled");
}

export function trackNotificationsDisabled() {
  track("notifications_disabled");
}

// Theme
export function trackThemeToggled(theme: string) {
  track("theme_toggled", { theme });
}

// Onboarding
export function trackOnboardingCompleted() {
  track("onboarding_completed");
}

export function trackOnboardingStepViewed(step: number) {
  track("onboarding_step_viewed", { step_number: step });
}

export function trackOnboardingSkipped(stepWhenSkipped: number) {
  track("onboarding_skipped", { step_when_skipped: stepWhenSkipped });
}

// Achievement
export function trackAchievementEarned(achievementId: string) {
  track("achievement_earned", { achievement_id: achievementId });
}

// External links
export function trackExternalLink(destination: string) {
  track("external_link_clicked", { destination });
}
