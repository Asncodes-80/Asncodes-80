import { useLayoutEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icon from "./Icon";
import { profile } from "../data/resume";

export default function Headline({ t }: ScreenModule) {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const nav = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState({
    x: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  });
  useLayoutEffect(() => {
    const element = nav.current;
    if (!element) return;
    const update = () => {
      const selected = element.querySelector<HTMLElement>(
        '[aria-current="page"]',
      );
      if (!selected) {
        setIndicator((current) =>
          current.visible ? { ...current, visible: false } : current,
        );
        return;
      }
      const parent = element.getBoundingClientRect();
      const target = selected.getBoundingClientRect();
      const next = {
        x: target.left - parent.left,
        top: target.top - parent.top,
        width: target.width,
        height: target.height,
        visible: true,
      };
      setIndicator((current) =>
        Object.keys(next).every(
          (key) =>
            current[key as keyof typeof next] ===
            next[key as keyof typeof next],
        )
          ? current
          : next,
      );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element
      .querySelectorAll(".nav-link")
      .forEach((link) => observer.observe(link));
    return () => observer.disconnect();
  }, [pathname, i18n.language]);
  const changeLanguage = () => {
    const next = i18n.language.startsWith("fa") ? "en" : "fa";
    try {
      localStorage.setItem("locale", next);
    } catch {
      /* Works without browser storage. */
    }
    void i18n.changeLanguage(next);
  };
  return (
    <>
      <a className="skip-link" href="#main-content">
        {t("nav.skip")}
      </a>
      <div className="edition-bar mono">
        <span>{t("meta.edition")}</span>
        <span className="edition-motto">{t("meta.portfolio")}</span>
        <span>
          <i className="status-dot" />
          {t("meta.location")}
        </span>
      </div>
      <header className="site-header">
        <Link className="brand" to="/" aria-label={t("nav.home")}>
          <span className="brand-mark" aria-hidden="true">
            a<span>_</span>
          </span>
          <span className="brand-wordmark" dir="ltr">
            ALIREZA
            <span>
              CODES<span className="green">®</span>
            </span>
          </span>
        </Link>
        <nav
          className="main-nav"
          ref={nav}
          aria-label={
            i18n.language.startsWith("fa") ? "ناوبری اصلی" : "Main navigation"
          }
        >
          <span
            className="nav-indicator"
            aria-hidden="true"
            style={{
              transform: `translateX(${indicator.x}px)`,
              top: indicator.top,
              width: indicator.width,
              height: indicator.height,
              opacity: indicator.visible ? 1 : 0,
            }}
          />
          {[
            { to: "/", label: "about", number: "01" },
            { to: "/gallery", label: "work", number: "02" },
            { to: "/interests", label: "interests", number: "03" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "is-active" : ""}`
              }
            >
              <span className="nav-number mono">{item.number}</span>
              {t(`nav.${item.label}`)}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="language-button"
            onClick={changeLanguage}
            aria-label={t("nav.language")}
          >
            <Icon name="globe" size={17} />
            <span>{i18n.language.startsWith("fa") ? "EN" : "فا"}</span>
          </button>
          <a
            className="resume-button mono"
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
          >
            {t("nav.resume")}
            <Icon name="download" size={16} />
          </a>
        </div>
      </header>
    </>
  );
}
