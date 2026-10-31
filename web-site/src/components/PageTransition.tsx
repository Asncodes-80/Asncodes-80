import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { useLocation, type Location } from "react-router-dom";
import {
  CONSOLE_EASE,
  CONSOLE_EXIT_EASE,
  useReducedMotion,
} from "../motion/preferences";

const pageOrder: Record<string, number> = {
  "/": 0,
  "/gallery": 1,
  "/work": 1,
  "/interests": 2,
  "/talk": 3,
};

export default function PageTransition({
  children,
}: {
  children: (location: Location) => ReactNode;
}) {
  const requested = useLocation();
  const reduced = useReducedMotion();
  const [displayed, setDisplayed] = useState(requested);
  const committed = useRef(requested);
  const stage = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const lastScroll = useRef<string>();

  useLayoutEffect(() => {
    const node = stage.current;
    if (!node) return;
    let cancelled = false;
    let animation: Animation | undefined;
    const idle = () => {
      node.dataset.phase = "idle";
      node.removeAttribute("inert");
      node.removeAttribute("aria-busy");
    };
    const enter = (direction: number) => {
      node.dataset.phase = "entering";
      animation = node.animate(
        [
          {
            opacity: 0,
            transform: `translateX(${direction * 32}px) scale(1.008)`,
            filter: "blur(2px)",
          },
          {
            opacity: 1,
            transform: "translateX(0) scale(1)",
            filter: "blur(0)",
          },
        ],
        { duration: 440, easing: CONSOLE_EASE },
      );
      void animation.finished.then(
        () => {
          if (!cancelled) idle();
        },
        () => {},
      );
    };
    if (requested.pathname === committed.current.pathname) {
      if (requested !== committed.current) {
        committed.current = requested;
        setDisplayed(requested);
      }
      if (
        !initialized.current &&
        !reduced &&
        typeof node.animate === "function"
      )
        enter(0);
    } else if (reduced || typeof node.animate !== "function") {
      committed.current = requested;
      setDisplayed(requested);
      idle();
    } else {
      const order =
        Math.sign(
          (pageOrder[requested.pathname] ?? 4) -
            (pageOrder[committed.current.pathname] ?? 4),
        ) || 1;
      const direction =
        order * (document.documentElement.dir === "rtl" ? -1 : 1);
      node.dataset.phase = "leaving";
      node.setAttribute("inert", "");
      node.setAttribute("aria-busy", "true");
      animation = node.animate(
        [
          {
            opacity: 1,
            transform: "translateX(0) scale(1)",
            filter: "blur(0)",
          },
          {
            opacity: 0,
            transform: `translateX(${-direction * 18}px) scale(0.992)`,
            filter: "blur(2px)",
          },
        ],
        { duration: 150, easing: CONSOLE_EXIT_EASE, fill: "forwards" },
      );
      void animation.finished.then(
        () => {
          if (cancelled) return;
          committed.current = requested;
          flushSync(() => setDisplayed(requested));
          animation?.cancel();
          node.removeAttribute("inert");
          enter(direction);
          if (document.activeElement === document.body)
            node.focus({ preventScroll: true });
        },
        () => {},
      );
    }
    initialized.current = true;
    return () => {
      cancelled = true;
      animation?.cancel();
      idle();
    };
  }, [requested, reduced]);

  useLayoutEffect(() => {
    const key = displayed.pathname + displayed.hash;
    if (lastScroll.current === key) return;
    const changedPage =
      !lastScroll.current?.startsWith(displayed.pathname + "#") &&
      lastScroll.current !== displayed.pathname;
    lastScroll.current = key;
    if (displayed.hash) {
      let id = displayed.hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        /* Keep malformed fragments navigable. */
      }
      document.getElementById(id)?.scrollIntoView({
        behavior: reduced || changedPage ? "instant" : "smooth",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [displayed.pathname, displayed.hash, reduced]);

  return (
    <div className="route-viewport">
      <div className="route-stage" ref={stage} tabIndex={-1}>
        <div key={displayed.pathname}>{children(displayed)}</div>
      </div>
    </div>
  );
}
