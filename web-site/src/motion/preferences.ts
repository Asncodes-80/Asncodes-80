import { useSyncExternalStore } from "react";

const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
const subscribe = (notify: () => void) => {
  preference.addEventListener("change", notify);
  return () => preference.removeEventListener("change", notify);
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
