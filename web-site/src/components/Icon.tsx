import type { CSSProperties } from "react";

export type IconName =
  | "arrow"
  | "arrow-up"
  | "download"
  | "plus"
  | "code"
  | "globe"
  | "game"
  | "film"
  | "book"
  | "mail"
  | "search"
  | "check"
  | "play"
  | "clock"
  | "close"
  | "star"
  | "grid";

const paths: Record<IconName, React.ReactNode> = {
  arrow: (
    <>
      <path d="M4 12h15M13 5l7 7-7 7" />
    </>
  ),
  "arrow-up": (
    <>
      <path d="M5 19 19 5M5 5h14v14" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
    </>
  ),
  plus: <path d="M12 4v16M4 12h16" />,
  code: (
    <>
      <path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18" />
    </>
  ),
  game: (
    <>
      <path d="M7 7h10c2 0 3 2 3.5 4l1 6c.5 3-2 4-4 2l-3-3h-5l-3 3c-2 2-4.5 1-4-2l1-6C4 9 5 7 7 7Z" />
      <path d="M6 11h5m-2.5-2.5v5M15 11h.01M18 13h.01M9 7l1-3h4l1 3" />
    </>
  ),
  film: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M7 3v18M17 3v18M3 8h4m-4 8h4M17 8h4m-4 8h4m-11-5 4 2-4 2v-4Z" />
    </>
  ),
  book: (
    <>
      <path d="M12 5v16M12 5C8 2 4 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-2-1-6-2-10 1Z" />
      <path d="M5 7h4M5 10h4M15 7h4M15 10h4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  search: (
    <>
      <circle cx="10" cy="10" r="6.5" />
      <path d="m15 15 6 6" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  play: <path d="m8 4 13 8-13 8V4Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  close: <path d="m5 5 14 14M5 19 19 5" />,
  star: <path d="m12 2 3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1 3-6Z" />,
  grid: (
    <>
      <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
    </>
  ),
};

export default function Icon({
  name,
  size = 20,
  className,
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {paths[name]}
    </svg>
  );
}
