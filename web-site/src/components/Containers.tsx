import { useRef, type ReactNode } from "react";
import Headline from "./Headline";
import Footer from "./Footer";
import { useRevealMotion } from "../motion/useRevealMotion";

export function Container({
  children,
  t,
}: { children: ReactNode } & ScreenModule) {
  const shell = useRef<HTMLDivElement>(null);
  useRevealMotion(shell);
  return (
    <div className="site-shell" ref={shell}>
      <Headline t={t} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer t={t} />
    </div>
  );
}
