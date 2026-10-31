import { text, type LocalizedText } from "./resume";

interface ProjectImage {
  file: string;
  width: number;
  height: number;
  caption: LocalizedText;
}

export const medlifeChapters: {
  id: string;
  label: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  protocol: string;
  images: ProjectImage[];
}[] = [
  {
    id: "handshake",
    label: text("Handshake", "تبادل کلید"),
    title: text(
      "Trust starts with a handshake.",
      "اعتماد، از تبادل کلید شروع می‌شود.",
    ),
    description: text(
      "The IoMT device and mobile app exchange cryptographic keys to establish an ECDH handshake. This is the starting point for an encrypted channel between the embedded hardware and the phone.",
      "دستگاه IoMT و اپلیکیشن موبایل کلیدهای رمزنگاری را مبادله می‌کنند تا هندشیک ECDH برقرار شود. این مرحله، نقطهٔ شروع یک کانال رمزنگاری‌شده بین سخت‌افزار امبدد و موبایل است.",
    ),
    protocol: "IoMT ↔ ECDH ↔ MOBILE",
    images: [
      {
        file: "mobile-14.jpeg",
        width: 1280,
        height: 1130,
        caption: text(
          "Cryptographic key exchange between the IoMT device and the mobile app.",
          "تبادل کلیدهای رمزنگاری بین دستگاه IoMT و اپلیکیشن موبایل.",
        ),
      },
    ],
  },
  {
    id: "treatment",
    label: text("Treatment loop", "چرخهٔ درمان"),
    title: text(
      "A secure link. A continuous loop.",
      "ارتباط امن؛ آغاز چرخهٔ درمان.",
    ),
    description: text(
      "Once the keys have been exchanged, the treatment loop begins. These two views show the mobile app and connected IoMT device moving from a secure connection into the monitoring workflow.",
      "پس از تبادل کلید، چرخهٔ درمان (Treatment Loop) آغاز می‌شود. این دو تصویر نشان می‌دهند که اپلیکیشن و دستگاه متصل چگونه از برقراری ارتباط امن وارد فرایند پایش می‌شوند.",
    ),
    protocol: "KEYS EXCHANGED → TREATMENT LOOP",
    images: [
      {
        file: "mobile-16.jpeg",
        width: 1280,
        height: 891,
        caption: text(
          "Starting the treatment loop after key exchange.",
          "شروع چرخهٔ درمان پس از تبادل کلید.",
        ),
      },
      {
        file: "mobile-15.jpeg",
        width: 1279,
        height: 810,
        caption: text(
          "The connected device and mobile app during the treatment loop.",
          "دستگاه متصل و اپلیکیشن موبایل در جریان چرخهٔ درمان.",
        ),
      },
    ],
  },
  {
    id: "vitals",
    label: text("Live vitals", "علائم حیاتی"),
    title: text(
      "Encrypted data. Human-readable vitals.",
      "دادهٔ رمزنگاری‌شده، علائم قابل‌فهم.",
    ),
    description: text(
      "Heart rate, blood oxygen, and body temperature are received in real time. After decryption, the measurements become readable values and charts in the mobile app, making the secure data stream understandable to the user.",
      "ضربان قلب، اکسیژن خون و دمای بدن به‌صورت بلادرنگ دریافت می‌شوند. پس از رمزگشایی، اندازه‌گیری‌ها به اعداد و نمودارهای قابل‌خواندن در اپلیکیشن تبدیل می‌شوند تا جریان امن داده برای کاربر قابل‌فهم باشد.",
    ),
    protocol: "DECRYPT → HEART RATE / SpO₂ / TEMPERATURE",
    images: [
      {
        file: "mobile-18.jpeg",
        width: 1280,
        height: 1223,
        caption: text(
          "Real-time vital signs displayed after decryption.",
          "نمایش بلادرنگ علائم حیاتی پس از رمزگشایی داده‌ها.",
        ),
      },
    ],
  },
  {
    id: "embedded",
    label: text("Embedded C", "سخت‌افزار"),
    title: text(
      "Small hardware. Serious cryptography.",
      "سخت‌افزار کوچک، رمزنگاری جدی.",
    ),
    description: text(
      "The cryptographic workflow runs on the RP2040, implemented in embedded C. It supports vital-sign monitoring with limited resources, without relying on a high-level operating system or the overhead of a heavyweight language runtime.",
      "فرایند رمزنگاری روی RP2040 و با زبان C به‌صورت امبدد پیاده‌سازی شده است. این طراحی، پایش علائم حیاتی را با منابع محدود ممکن می‌کند؛ بدون وابستگی به سیستم‌عامل‌های سطح بالا یا سربار محیط اجرای زبان‌های سنگین.",
    ),
    protocol: "RP2040 / EMBEDDED C / LOW RESOURCE",
    images: [
      {
        file: "mobile-22.jpeg",
        width: 1272,
        height: 717,
        caption: text(
          "The RP2040-based IoMT hardware running the embedded cryptographic workflow.",
          "سخت‌افزار IoMT مبتنی بر RP2040 برای اجرای فرایند رمزنگاری امبدد.",
        ),
      },
    ],
  },
  {
    id: "generative",
    label: text("Generative AI", "هوش مصنوعی"),
    title: text(
      "From measurements to a conversation.",
      "از اندازه‌گیری، تا گفت‌وگو.",
    ),
    description: text(
      "These mobile views show generative AI responses informed by the user's vital signs. The measurements become context for a natural-language response inside the same connected healthcare experience.",
      "این نماهای موبایل، پاسخ‌های تولیدشده توسط هوش مصنوعی مولد را با توجه به علائم حیاتی کاربر نشان می‌دهند. داده‌های پایش‌شده، زمینهٔ یک پاسخ به زبان طبیعی را در همان تجربهٔ یکپارچهٔ سلامت دیجیتال فراهم می‌کنند.",
    ),
    protocol: "VITAL SIGNS → CONTEXT → GENERATED RESPONSE",
    images: [
      {
        file: "mobile-9.jpeg",
        width: 1259,
        height: 1280,
        caption: text(
          "A generative AI response using the user's vital signs as context.",
          "پاسخ هوش مصنوعی مولد با توجه به علائم حیاتی کاربر.",
        ),
      },
      {
        file: "mobile-8.jpeg",
        width: 1280,
        height: 1255,
        caption: text(
          "Another view of the AI conversation in the mobile app.",
          "نمای دیگری از گفت‌وگو با هوش مصنوعی در اپلیکیشن موبایل.",
        ),
      },
    ],
  },
];
