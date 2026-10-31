import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fa from "./locales/fa.json";

let language = "en";
try {
  language = localStorage.getItem("locale") === "fa" ? "fa" : "en";
} catch {
  /* Use English when storage is unavailable. */
}
void i18n.use(initReactI18next).init({
  lng: language,
  supportedLngs: ["en", "fa"],
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  resources: { en: { translation: en }, fa: { translation: fa } },
});
export default i18n;
