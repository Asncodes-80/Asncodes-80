import * as TranslationFiles from "../i18n/locales";

export const resources = {
  system: {
    baseRoute: "/Asncodes-80/",
  },
  /** Internationalization defaults */
  i18n: {
    /** All language about app locale*/
    supportedLocales: ["en", "fa"] as Locales[],
    /** Translation file with locale */
    files: [
      {
        locale: "en",
        file: TranslationFiles.enTranslation,
      },
      {
        locale: "fa",
        file: TranslationFiles.faTranslation,
      },
    ] as LocaleFileRepository[],
  },
  style: {
    defaultDirection: "ltr" as Direction,
    defaultTheme: "dark" as Theme,
    colorsScheme: {
      darkScheme: {
        primary: {
          DEFAULT: "#50fa7b",
          foreground: "#bd93f9",
        },
        secondary: {
          DEFAULT: "#ff79c6",
          foreground: "#f1fa8c",
        },
        background: {
          DEFAULT: "#282a36",
          foreground: "#f8f8f2",
        },
        foreground: "#f8f8f2",
        divider: "#474957",
        overlay: {
          DEFAULT: "#21222c",
          foreground: "#f8f8f2",
        },
        focus: {
          DEFAULT: "#50fa7b",
          foreground: "#21222c",
        },
        content1: {
          DEFAULT: "#2e303e",
          foreground: "#f8f8f2",
        },
        danger: {
          DEFAULT: "#ff5555",
          foreground: "#f8f8f2",
        },
      },
    },
    animation: {
      duration: 0.2,
    },
  },
};
