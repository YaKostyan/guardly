const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
const consentKey = "guardly-analytics-consent";
let initialized = false;

function recordDebugEvent(name, params = {}) {
  window.__guardlyEvents = window.__guardlyEvents || [];
  window.__guardlyEvents.push({ name, params, timestamp: new Date().toISOString() });
}

export function hasAnalyticsConfig() {
  return Boolean(measurementId);
}

export function getAnalyticsConsent() {
  return window.localStorage.getItem(consentKey);
}

export function initAnalytics() {
  if (!measurementId || initialized) return false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
  initialized = true;
  return true;
}

export function setAnalyticsConsent(value) {
  window.localStorage.setItem(consentKey, value);
  if (value === "granted") {
    initAnalytics();
    trackPageView(window.location.hash.replace(/^#/, "") || "/");
  }
}

export function resetAnalyticsConsent() {
  window.localStorage.removeItem(consentKey);
}

export function bootstrapAnalytics() {
  if (getAnalyticsConsent() === "granted") initAnalytics();
}

export function trackEvent(name, params = {}) {
  const payload = {
    ...params,
    page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
  };
  recordDebugEvent(name, payload);
  if (initialized && window.gtag) window.gtag("event", name, payload);
}

export function trackPageView(route) {
  const payload = {
    page_title: document.title,
    page_location: window.location.href,
    page_path: route,
  };
  recordDebugEvent("page_view", payload);
  if (initialized && window.gtag) window.gtag("event", "page_view", payload);
}
