import { text, type LocalizedText } from "./resume";

export interface Talk {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  topic: LocalizedText;
  duration: string;
  thumbnail: string;
  /** Original public video, verified against the owner's channel. */
  href: string;
}

const talk = (
  id: string,
  details: Omit<Talk, "id" | "thumbnail" | "href">,
): Talk => ({
  id,
  ...details,
  thumbnail: `images/talks/${id}.webp`,
  href: `https://www.youtube.com/watch?v=${id}`,
});

export const talkChannel = "https://www.youtube.com/@alirezacodes/videos";

/** Curated for the portfolio; titles retain the original Persian wording. */
export const talks: Talk[] = [
  talk("1f5jxd7YUxc", {
    title: text(
      "AI programming, with a human in the loop",
      "برنامه‌نویسی هوش مصنوعی به کمک انسان",
    ),
    description: text(
      "A conversation with Omidreza about AI coding assistants, the changing role of software engineers, and how we guide the tools that help us build.",
      "گفت‌وگویی با امیدرضا دربارهٔ دستیارهای کدنویسی، نقش در حال تغییر مهندسان نرم‌افزار و اینکه چطور ابزارهای هوش مصنوعی را در فرایند ساختن هدایت کنیم.",
    ),
    topic: text("AI × HUMAN", "هوش مصنوعی × انسان"),
    duration: "37:48",
  }),
  talk("lr9MBM5_h-U", {
    title: text(
      "The philosophy behind MCP: Blender meets Claude",
      "فلسفه پشتِ MCP: طراحی سه‌بعدی محصول با Blender به کمک Claude AI",
    ),
    description: text(
      "Connecting Blender to Claude through MCP: a practical look at how an AI assistant can work with a creative tool to build a 3D design.",
      "اتصال Blender به Claude با MCP؛ نگاهی عملی به اینکه یک دستیار هوش مصنوعی چطور می‌تواند با ابزار طراحی سه‌بعدی کار کند.",
    ),
    topic: text("MCP / CREATIVE TOOLS", "MCP / ابزارهای خلاقیت"),
    duration: "5:46",
  }),
  talk("8KDZKII9Tfc", {
    title: text(
      "How does Web 3.0 actually work?",
      "وب ۳.۰ واقعاً چطوری کار می‌کنه؟",
    ),
    description: text(
      "A look at how Web 3.0 works and the ideas behind a decentralized web.",
      "نگاهی به سازوکار وب ۳ و ایده‌های پشت وب غیرمتمرکز.",
    ),
    topic: text("WEB / DECENTRALIZATION", "وب / تمرکززدایی"),
    duration: "11:05",
  }),
  talk("Vwo52h4TlZE", {
    title: text(
      "How much can large software systems take?",
      "تحمل نرم‌افزار‌های بزرگ چقدره؟",
    ),
    description: text(
      "A research-led tour of techniques and architectural approaches for large software systems, adapted from a presentation I shared at university.",
      "مروری پژوهش‌محور بر تکنیک‌ها و رویکردهای معماری نرم‌افزارهای بزرگ؛ برگرفته از ارائه‌ای که در دانشگاه هم درباره‌اش صحبت کردم.",
    ),
    topic: text("SOFTWARE ARCHITECTURE", "معماری نرم‌افزار"),
    duration: "32:45",
  }),
  talk("FUUw7fcSyTI", {
    title: text(
      "Modeling systems with mathematics",
      "مروری بر مدلینگ سیستم‌ها با ریاضی",
    ),
    description: text(
      "An introduction to looking at systems through mathematics, statistics, and modeling.",
      "مقدمه‌ای بر نگاه‌کردن به سیستم‌ها از دریچهٔ ریاضی، آمار و مدل‌سازی.",
    ),
    topic: text("MATHEMATICS / SYSTEMS", "ریاضی / سیستم‌ها"),
    duration: "4:44",
  }),
  talk("JLMRpF3HAlA", {
    title: text(
      "Shared goals matter more than finding the best",
      "هم‌هدف پیدا کردن مهم‌تر از بهترین پیدا کردن است",
    ),
    description: text(
      "A perspective on building teams: why finding people who share a goal matters more than simply finding the best individuals.",
      "نگاهی به تیم‌سازی؛ چرا پیدا کردن آدم‌های هم‌هدف از صرفاً پیدا کردن بهترین افراد مهم‌تر است.",
    ),
    topic: text("PEOPLE / SHARED PURPOSE", "آدم‌ها / هدف مشترک"),
    duration: "8:53",
  }),
];

export const featuredTalks = [talks[0], talks[3], talks[1]];

export const talkShelves = [
  {
    id: "future",
    title: text("Building what comes next.", "ساختنِ چیزی که بعدش می‌آید."),
    description: text(
      "AI, creative tools, and the evolving web.",
      "هوش مصنوعی، ابزارهای خلاقیت و وبِ در حال تغییر.",
    ),
    talks: talks.slice(0, 3),
  },
  {
    id: "perspectives",
    title: text("The thinking behind the building.", "فکرِ پشتِ ساختن."),
    description: text(
      "Systems, mathematics, and the people we build with.",
      "سیستم‌ها، ریاضی و آدم‌هایی که با آن‌ها می‌سازیم.",
    ),
    talks: talks.slice(3),
  },
];
