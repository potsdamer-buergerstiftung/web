export function trackUmami(eventName: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const umami = (
    window as Window & {
      umami?: {
        track: (name: string, payload?: Record<string, unknown>) => void;
      };
    }
  ).umami;

  umami?.track(eventName, data);
}
