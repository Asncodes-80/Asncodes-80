import { useEffect, type RefObject } from "react";
import { CONSOLE_EASE, useReducedMotion } from "./preferences";

const targets = [
  ".hero-copy",
  ".portrait-figure",
  ".page-hero > div:first-child",
  ".featured-game-card",
  ".work-emblem",
  ".section-heading",
  ".about-heading",
  ".about-copy",
  ".section-side-heading",
  ".selected-project",
  ".experience-item",
  ".education-item",
  ".skill-group",
  ".language-row",
  ".after-hours-copy",
  ".after-hours-art",
  ".case-intro",
  ".case-system",
  ".archive-project",
  ".media-card",
  ".talk-card",
  ".talk-channel-footer",
  ".collection-toolbar",
  ".collection-colophon",
  ".collection-empty",
  ".contact-top",
  ".contact-grid",
  ".footer-bottom",
  ".error-page",
].join(",");

/** Content stays visible if motion or observers are unavailable. */
export function useRevealMotion(root: RefObject<HTMLElement>) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !root.current || !("IntersectionObserver" in window)) return;
    const seen = new WeakSet<Element>();
    const animations = new Map<Element, Animation>();
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const finish = (element: Element) => {
      observer.unobserve(element);
      const animation = animations.get(element);
      animations.delete(element);
      animation?.cancel();
    };
    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          if (!entry.isIntersecting) {
            if (animations.has(element)) finish(element);
            continue;
          }
          if (animations.has(element)) continue;
          // The route already animates its contents. Avoid nested layers and
          // keep fast scrolling/focusing responsive instead of queuing reveals.
          const phase = element.closest<HTMLElement>(".route-stage")?.dataset
            .phase;
          if (
            !element.animate ||
            element.contains(document.activeElement) ||
            (phase && phase !== "idle") ||
            animations.size >= 8
          ) {
            observer.unobserve(element);
            continue;
          }
          // Opacity does not compete with card hover transforms or depend on
          // support for newer individual translate keyframes.
          const animation = element.animate(
            [{ opacity: 0.15 }, { opacity: 1 }],
            {
              duration: finePointer ? 320 : 240,
              delay: finePointer ? Math.min(order++, 3) * 20 : 0,
              easing: CONSOLE_EASE,
              fill: "backwards",
            },
          );
          animations.set(element, animation);
          void animation.finished.then(
            () => finish(element),
            () => animations.delete(element),
          );
        }
      },
      { rootMargin: "0px 0px -12px 0px", threshold: 0.04 },
    );
    const observe = (element: Element) => {
      if (seen.has(element)) return;
      seen.add(element);
      observer.observe(element);
    };
    const register = (node: Element) => {
      if (node.matches(targets)) observe(node);
      node.querySelectorAll(targets).forEach(observe);
    };
    const shell = root.current;
    register(shell);
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.removedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          observer.unobserve(node);
          node
            .querySelectorAll(targets)
            .forEach((element) => observer.unobserve(element));
          for (const element of animations.keys()) {
            if (node.contains(element)) finish(element);
          }
        });
        record.addedNodes.forEach((node) => {
          if (node instanceof Element && shell.contains(node)) register(node);
        });
      }
    });
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      for (const element of animations.keys()) {
        if (element.contains(event.target)) finish(element);
      }
    };
    mutations.observe(shell, { childList: true, subtree: true });
    shell.addEventListener("focusin", focus);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      shell.removeEventListener("focusin", focus);
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
  }, [reduced, root]);
}
