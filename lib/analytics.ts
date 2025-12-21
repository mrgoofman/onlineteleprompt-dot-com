export const GA_MEASUREMENT_ID = "G-0LT892KJ4Z";

export function trackEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (window.location.hostname === "localhost") return;

  window.gtag?.("event", action, params);
}
