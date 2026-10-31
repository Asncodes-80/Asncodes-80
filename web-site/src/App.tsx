import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomeScreen from "./modules/home";
import GalleryScreen from "./modules/gallery";
import InterestsScreen from "./modules/interests";
import TalkScreen from "./modules/talk";
import ErrorHandler, { HttpError } from "./components/ErrorHandler";
import { Container } from "./components/Containers";
import PageTransition from "./components/PageTransition";

function PageEffects() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  useLayoutEffect(() => {
    const section =
      pathname === "/gallery" || pathname === "/work"
        ? "work"
        : pathname === "/interests"
          ? "interests"
          : pathname === "/talk"
            ? "talk"
            : "about";
    document.title = `${t(`nav.${section}`)} — Alireza Soltani Neshan`;
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language.startsWith("fa")
      ? "rtl"
      : "ltr";
  }, [pathname, i18n.language, t]);
  return null;
}

export default function App() {
  const { t } = useTranslation();
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PageEffects />
      <Container t={t}>
        <PageTransition>
          {(location) => (
            <ErrorHandler t={t} key={location.pathname}>
              <Routes location={location}>
                <Route path="/" element={<HomeScreen t={t} />} />
                <Route path="/gallery" element={<GalleryScreen t={t} />} />
                <Route path="/work" element={<GalleryScreen t={t} />} />
                <Route path="/interests" element={<InterestsScreen t={t} />} />
                <Route path="/talk" element={<TalkScreen t={t} />} />
                <Route path="*" element={<HttpError code={404} t={t} />} />
              </Routes>
            </ErrorHandler>
          )}
        </PageTransition>
      </Container>
    </BrowserRouter>
  );
}
