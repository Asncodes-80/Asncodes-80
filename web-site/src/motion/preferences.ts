import { useSyncExternalStore } from "react";

const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
const subscribe = (notify: () => void) => {
  if (preference.addEventListener) {
    preference.addEventListener("change", notify);
    return () => preference.removeEventListener("change", notify);
  }
  // Safari before 14 exposes the legacy MediaQueryList listener methods.
  preference.addListener(notify);
  return () => preference.removeListener(notify);
};

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => preference.matches,
    () => true,
  );
}

export const CONSOLE_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
export const CONSOLE_EXIT_EASE = "cubic-bezier(0.4, 0, 1, 1)";
