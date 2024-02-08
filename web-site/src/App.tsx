import React from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeScreen from "./modules/home";
import GalleryScreen from "./modules/gallery";
import ErrorHandler, { HttpError } from "./components/ErrorHandler";

function App() {
  const { t } = useTranslation();

  const routes: Readonly<RouteProps>[] = [
    { path: "/", view: <HomeScreen t={t} /> },
    { path: "/gallery", view: <GalleryScreen t={t} /> },
  ];

  const dynamicRoute: JSX.Element[] = routes.map((route: RouteProps) => (
    <Route
      path={route.path}
      element={<ErrorHandler t={t}>{route.view}</ErrorHandler>}
    />
  ));

  return (
    <BrowserRouter>
      <Routes>
        {React.Children.toArray(dynamicRoute)}
        <Route path="*" element={<HttpError code={404} t={t} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
