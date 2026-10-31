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
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const element = entry.target as HTMLElement;
          if (!element.animate || element.contains(document.activeElement))
            continue;
          const siblings = element.parentElement?.children;
          const order = siblings ? Array.from(siblings).indexOf(element) : 0;
          const animation = element.animate(
            [
              { opacity: 0, translate: "0 14px" },
              { opacity: 1, translate: "0 0" },
            ],
            {
              duration: 400,
              delay: Math.min(Math.max(order, 0), 5) * 28,
              easing: CONSOLE_EASE,
              fill: "backwards",
            },
          );
          animations.add(animation);
          void animation.finished.then(
            () => animations.delete(animation),
            () => animations.delete(animation),
          );
        }
      },
      { rootMargin: "0px 0px -12px 0px", threshold: 0.04 },
    );
    const register = () => {
      root.current
        ?.querySelectorAll<HTMLElement>(targets)
        .forEach((element) => {
          if (seen.has(element)) return;
          seen.add(element);
          observer.observe(element);
        });
    };
    register();
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.removedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          observer.unobserve(node);
          node
            .querySelectorAll(targets)
            .forEach((element) => observer.unobserve(element));
        });
      }
      register();
    });
    mutations.observe(root.current, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [reduced, root]);
}
