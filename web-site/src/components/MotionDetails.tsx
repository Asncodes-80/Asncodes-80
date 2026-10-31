import {
  Children,
  useEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { CONSOLE_EASE, useReducedMotion } from "../motion/preferences";

export default function MotionDetails({
  children,
  className,
  defaultOpen = false,
}: {
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}) {
  const details = useRef<HTMLDetailsElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const active = useRef<Animation>();
  const expanded = useRef(defaultOpen);
  const reduced = useReducedMotion();
  const [summary, ...content] = Children.toArray(children);
  useEffect(() => () => active.current?.cancel(), []);
  useEffect(() => {
    if (reduced) {
      active.current?.cancel();
      if (details.current) details.current.open = expanded.current;
    }
  }, [reduced]);
  const toggle = (event: MouseEvent<HTMLDetailsElement>) => {
    const node = details.current;
    const body = panel.current;
    if (
      !node ||
      !body ||
      !(event.target instanceof Element) ||
      event.target.closest("summary") !== node.querySelector("summary")
    )
      return;
    event.preventDefault();
    const height = body.getBoundingClientRect().height;
    const opacity = getComputedStyle(body).opacity;
    active.current?.cancel();
    expanded.current = !expanded.current;
    const target = expanded.current;
    if (reduced || !body.animate) {
      node.open = target;
      return;
    }
    if (target) node.open = true;
    const animation = body.animate(
      [
        { height: `${height}px`, opacity: height ? opacity : 0 },
        {
          height: `${target ? body.scrollHeight : 0}px`,
          opacity: target ? 1 : 0,
        },
      ],
      { duration: target ? 320 : 230, easing: CONSOLE_EASE, fill: "both" },
    );
    active.current = animation;
    void animation.finished.then(
      () => {
        node.open = target;
        animation.cancel();
      },
      () => {},
    );
  };
  return (
    <details
      ref={details}
      className={className}
      open={defaultOpen}
      onClick={toggle}
    >
      {summary}
      <div className="accordion-panel" ref={panel}>
        {content}
      </div>
    </details>
  );
}
