import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { profile } from "../data/resume";

export default function Footer({ t }: ScreenModule) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timeout.current), []);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopyState("idle"), 3500);
  };
  return (
    <footer className="site-footer" id="contact">
      <div className="contact-top">
        <span className="eyebrow">
          <i className="status-dot" />
          {t("footer.eyebrow")}
        </span>
        <span className="registration-mark" aria-hidden="true">
          ✳
        </span>
      </div>
      <div className="contact-grid">
        <div>
          <h2 className="contact-title">{t("footer.title")}</h2>
          <p className="muted">{t("footer.description")}</p>
        </div>
        <div className="contact-links">
          <a
            className="contact-email"
            href={`mailto:${profile.email}`}
            dir="ltr"
          >
            {profile.email}
            <Icon name="arrow-up" size={26} />
          </a>
          <div className="contact-utilities">
            <a href={`tel:${profile.phone.replace(/ /g, "")}`} dir="ltr">
              {profile.phone}
            </a>
            <button type="button" className="text-button" onClick={copyEmail}>
              <Icon
                name={copyState === "copied" ? "check" : "mail"}
                size={16}
              />
              {t("footer.copy")}
            </button>
          </div>
          <span className="copy-feedback mono" role="status">
            {copyState === "copied"
              ? t("footer.copied")
              : copyState === "error"
                ? t("footer.copyError")
                : ""}
          </span>
          <div className="social-links">
            {profile.socials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <Icon name="arrow-up" size={12} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom mono">
        <span dir="ltr">© {new Date().getFullYear()} ALIREZACODES</span>
        <span className="footer-motto">{t("footer.note")}</span>
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
            })
          }
        >
          {t("footer.top")}
          <Icon name="arrow-up" size={14} />
        </button>
      </div>
    </footer>
  );
}
