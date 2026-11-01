import { useCallback, useLayoutEffect, useRef, type RefObject } from "react";
import {
  CONSOLE_EASE,
  CONSOLE_EXIT_EASE,
  useReducedMotion,
} from "./preferences";

export function useDialogMotion(
  dialog: RefObject<HTMLDialogElement>,
  open: boolean,
) {
  const reduced = useReducedMotion();
  const active = useRef<Animation>();
  const closing = useRef(false);

  useLayoutEffect(() => {
    const node = dialog.current;
    if (!node) return;
    const wasClosing = closing.current;
    closing.current = false;
    node.removeAttribute("data-closing");
    if (wasClosing && reduced) {
      node.close();
      return;
    }
    if (open) {
      if (!node.open) node.showModal();
      if (!reduced && node.animate) {
        active.current = node.animate(
          [
            {
              opacity: 0,
              transform: "translateY(24px) scale(0.96)",
            },
            {
              opacity: 1,
              transform: "translateY(0) scale(1)",
            },
          ],
          { duration: 300, easing: CONSOLE_EASE },
        );
      }
    } else if (node.open) node.close();
    return () => {
      active.current?.cancel();
      node.removeAttribute("data-closing");
    };
  }, [dialog, open, reduced]);

  return useCallback(() => {
    const node = dialog.current;
    if (!node?.open || closing.current) return;
    if (reduced || !node.animate) {
      node.close();
      return;
    }
    closing.current = true;
    const current = getComputedStyle(node);
    const from = {
      opacity: current.opacity,
      transform: current.transform,
    };
    active.current?.cancel();
    node.dataset.closing = "true";
    const animation = node.animate(
      [
        from,
        {
          opacity: 0,
          transform: "translateY(14px) scale(0.975)",
        },
      ],
      { duration: 170, easing: CONSOLE_EXIT_EASE, fill: "forwards" },
    );
    active.current = animation;
    void animation.finished.then(
      () => {
        node.close();
        animation.cancel();
        node.removeAttribute("data-closing");
        closing.current = false;
      },
      () => {},
    );
  }, [dialog, reduced]);
}
