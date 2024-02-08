import * as TranslationFiles from "../i18n/locales";

export const resources = {
  system: {
    baseRoute: "Asncodes-80",
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
          DEFAULT: "#51afef",
          foreground: "#A9A1E1",
        },
        secondary: {
          DEFAULT: "#ecbe7b",
          foreground: "#98BE65",
        },
        background: {
          DEFAULT: "#282c34",
          foreground: "#bbc2cf",
        },
        foreground: "#bbc2cf",
        divider: "#5b6268",
        overlay: {
          DEFAULT: "#1b1b1f",
          foreground: "#e4e2e6",
        },
        focus: {
          DEFAULT: "#51afef",
          foreground: "#00297b",
        },
        content1: {
          DEFAULT: "#45464f",
          foreground: "#e4e2e6",
        },
        danger: {
          DEFAULT: "#ffb4ab",
          foreground: "#690005",
        },
      },
    },
    animation: {
      duration: 0.2,
    },
  },
};
