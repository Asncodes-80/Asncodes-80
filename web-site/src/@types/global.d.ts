import { TFunction } from "i18next";
import { Route } from "react-router-dom";

import * as Locales from "./locales";
import * as Store from "./store";

declare global {
  /** As main props of every screen */
  type ScreenModule = {
    t: TFunction;
  };

  type RouteProps = {
    path: string;
    view: JSX.Element;
  };

  type LocaleFileRepository = {
    locale: LocaleCodes;
    file: any;
  };

  type RegionalLocales = Locales.RegionalLocales;
  type LocaleCodes = Locales.LocaleCodes;

  type StoreParameters = Store.StoreParameters;

  /** Application supported locales */
  type Locales = Locales.Locales;

  type Theme = "dark" | "light";

  /** Application direction */
  type Direction = "rtl" | "ltr";

  /** Language interface to switch between locales list */
  type Language = {
    /** Locale key */
    key: Locales;

    /** Locale label name */
    label: string;

    /** Is locale available to this version? */
    isAvailable: boolean;

    /** Style Condition of locale */
    condition: string;
  };

  type RouteElement = Parameters<typeof Route>[0]["element"];

  /** Semantic Http Errors. It used by ErrorHandler Hoc. */
  type HttpErrors = 403 | 404 | 500;

  /** Tailwindcss flex display direction support */
  type FlexDisplayDirection = "row" | "col" | "row-reverse" | "col-reverse";
}
