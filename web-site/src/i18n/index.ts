/**
 * App Internationalization configuration
 *
 * To config i18-next [read](https://react.i18next.com/latest/typescript).
 *
 * NOTE: This module must to `./src/main.tsx` to apply all changes in entire of
 * application.
 *
 * To change locale you should `import i18next from "i18next"` and use method
 * `i18next.changeLanguage(""))`
 *
 * @example
 * import { useTranslation } from "react-i18next"
 *
 * const ViewComponent: React.Fc = () => {
 *  const { t } = useTranslation();
 *
 *  return <React.Fragment>
 *     <Typography>{t("greeting.first")}</Typography>
 *  </React.Fragment>
 * }
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { store } from "../redux/store";

import { resources } from "../config/resources";

/** Add translation file here */
let translationsResource: {
  [key: LocaleCodes | string]: { translation: any };
} = {};

resources.i18n.files.map(
  (key: LocaleFileRepository) =>
    (translationsResource = {
      ...translationsResource,
      [key.locale]: { translation: key.file },
    })
);

i18n.use(initReactI18next).init({
  lng: store.getState().preferences.locale,
  interpolation: { escapeValue: false },
  supportedLngs: resources.i18n.supportedLocales,
  resources: translationsResource,
  fallbackLng: resources.i18n.supportedLocales[0],
});
