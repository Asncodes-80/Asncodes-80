import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  asset,
  education,
  experiences,
  localize,
  profile,
  skillGroups,
} from "../../data/resume";
import Icon from "../../components/Icon";
import ProjectVisual from "../../components/ProjectVisual";
import AfterHoursArt from "../../components/AfterHoursArt";
import MotionDetails from "../../components/MotionDetails";
import MedlifeMiniPage from "../../components/MedlifeMiniPage";

export default function HomeScreen({ t }: ScreenModule) {
  const { i18n } = useTranslation();
  const locale = i18n.language;
  const [medlifeOpen, setMedlifeOpen] = useState(false);
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span className="tiny-cross" aria-hidden="true">
              +
            </span>
            {t("hero.eyebrow")}
          </div>
          <h1 className="hero-title" id="hero-title">
            <span>{t("hero.line1")}</span>
            <span>{t("hero.line2")}</span>
            <span className="purple">{t("hero.line3")}</span>
            <span className="hero-asterisk" aria-hidden="true">
              ✳
            </span>
          </h1>
          <div className="hero-intro">
            <strong>{t("hero.intro")}</strong>
            <p>{t("hero.description")}</p>
          </div>
          <div className="hero-actions">
            <Link className="button button-green" to="/gallery">
              {t("hero.work")}
              <Icon name="arrow-up" size={18} />
            </Link>
            <a className="button button-plain" href="#contact">
              {t("hero.contact")}
              <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
        <figure className="portrait-figure">
          <div className="portrait-label mono">
            <span>{t("hero.portrait")}</span>
            <span aria-hidden="true">[ ASN—01 ]</span>
          </div>
          <div className="portrait-image-wrap">
            <img
              className="portrait-image"
              src={asset("avatar/profile.jpg")}
              alt={localize(profile.name, locale)}
              loading="eager"
              width="896"
              height="932"
            />
            <div className="portrait-halftone" />
            <div className="portrait-grid" />
            <span className="portrait-cross cross-top" aria-hidden="true">
              +
            </span>
            <span className="portrait-cross cross-bottom" aria-hidden="true">
              +
            </span>
            <div className="hello-sticker">
              {t("hero.sticker")}
              <span aria-hidden="true">↗</span>
            </div>
            <div className="portrait-index mono" aria-hidden="true">
              01—001
              <br />
              35°41′ N<br />
              51°23′ E
            </div>
          </div>
          <figcaption>
            <div>
              <strong>{t("hero.caption")}</strong>
              <span>{t("hero.captionSub")}</span>
            </div>
            <span className="portrait-barcode" aria-hidden="true" />
          </figcaption>
        </figure>
        <div className="hero-bottom mono">
          <span>
            <span className="pink">✦</span> WEB / MOBILE / CONNECTED SYSTEMS
          </span>
          <a href="#about">
            {t("hero.scroll")}
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <div className="statement-ribbon mono" aria-hidden="true">
        {["first", "second", "third", "fourth"].map((key) => (
          <span key={key}>
            {t(`ribbon.${key}`)}
            <b>✳</b>
          </span>
        ))}
      </div>

      <section
        className="section about-section"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="about-heading">
          <span className="eyebrow">{t("about.eyebrow")}</span>
          <h2 id="about-title">{t("about.title")}</h2>
          <div className="about-coordinates mono">
            <span>{t("about.location")}</span>
            <span>{t("about.born")}</span>
          </div>
        </div>
        <div className="about-copy">
          <p className="about-lead">{t("about.intro")}</p>
          <p className="muted">{t("about.body")}</p>
          <div className="principles">
            {["first", "second", "third"].map((key, index) => (
              <div className="principle" key={key}>
                <span className="mono purple">0{index + 1}</span>
                <div>
                  <h3>{t(`about.${key}`)}</h3>
                  <p>{t(`about.${key}Body`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section work-section"
        aria-labelledby="selected-title"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t("section.selected")}</span>
            <h2 id="selected-title">{t("section.workTitle")}</h2>
          </div>
          <Link to="/gallery" className="inline-link">
            {t("section.allWork")}
            <Icon name="arrow-up" size={17} />
          </Link>
        </div>
        <div className="selected-grid">
          <button
            type="button"
            className="selected-project selected-project-button"
            onClick={() => setMedlifeOpen(true)}
            aria-haspopup="dialog"
          >
            <ProjectVisual variant="medlife" t={t} />
            <div className="project-card-copy">
              <span className="eyebrow">{t("project.medlifeLabel")}</span>
              <div className="project-title-row">
                <h3>{t("project.medlifeTitle")}</h3>
                <span className="project-arrow">
                  <Icon name="arrow-up" size={24} />
                </span>
              </div>
              <p>{t("project.medlifeDescription")}</p>
              <div className="tags">
                <span>IoMT</span>
                <span>Security</span>
                <span>Applied AI</span>
              </div>
            </div>
          </button>
          <Link className="selected-project" to="/gallery#lamda">
            <ProjectVisual variant="lamda" t={t} />
            <div className="project-card-copy">
              <span className="eyebrow">{t("project.lamdaLabel")}</span>
              <div className="project-title-row">
                <h3 dir="ltr">Lamda RED</h3>
                <span className="project-arrow">
                  <Icon name="arrow-up" size={24} />
                </span>
              </div>
              <p>{t("project.lamdaDescription")}</p>
              <div className="tags">
                <span>Rust</span>
                <span>Developer Tools</span>
                <span>Open Source</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section
        className="section journey-section"
        aria-labelledby="journey-title"
      >
        <div className="section-side-heading">
          <span className="eyebrow">{t("section.experience")}</span>
          <h2 id="journey-title">{t("section.experienceTitle")}</h2>
          <p className="muted">{t("section.experienceDescription")}</p>
          <span className="journey-symbol" aria-hidden="true">
            ↳
          </span>
        </div>
        <div className="experience-list">
          {experiences.map((experience, index) => (
            <MotionDetails
              className="experience-item"
              key={experience.id}
              defaultOpen={index === 0}
            >
              <summary>
                <span className="experience-number mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="experience-summary">
                  <span className="experience-period mono">
                    {localize(experience.period, locale)}
                  </span>
                  <h3>{localize(experience.company, locale)}</h3>
                  <span className="experience-role">
                    {localize(experience.role, locale)}
                  </span>
                </div>
                <Icon name="plus" size={22} className="expand-icon" />
              </summary>
              <div className="experience-body">
                <span className="eyebrow">
                  {localize(experience.type, locale)}
                </span>
                <ul>
                  {experience.details.map((detail, i) => (
                    <li key={i}>{localize(detail, locale)}</li>
                  ))}
                </ul>
                <div className="tags">
                  {experience.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </MotionDetails>
          ))}
        </div>
      </section>

      <section
        className="section education-section"
        aria-labelledby="education-title"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t("section.education")}</span>
            <h2 id="education-title">{t("section.educationTitle")}</h2>
          </div>
          <Icon name="plus" size={38} className="purple" />
        </div>
        <div className="education-grid">
          {education.map((item, index) => (
            <article className="education-item" key={item.gpa}>
              <div className="education-top mono">
                <span>0{index + 1}</span>
                <span>
                  {t("section.gpa")} <b dir="ltr">{item.gpa}</b>
                </span>
              </div>
              <h3>{localize(item.degree, locale)}</h3>
              <p className="education-institution">
                {localize(item.institution, locale)}
              </p>
              <span className="education-period mono">
                {localize(item.period, locale)}
              </span>
              {item.details.length > 0 && (
                <ul>
                  {item.details.map((detail, i) => (
                    <li key={i}>{localize(detail, locale)}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      <section
        className="section skills-section"
        aria-labelledby="skills-title"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t("section.skills")}</span>
            <h2 id="skills-title">{t("section.skillsTitle")}</h2>
          </div>
          <p className="muted section-description">
            {t("section.skillsDescription")}
          </p>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <div className="skill-group" key={group.name.en}>
              <div className="skill-heading">
                <span className="mono purple">0{index + 1} /</span>
                <h3>{localize(group.name, locale)}</h3>
              </div>
              <div className="skill-items" dir="ltr">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="language-row">
          <div>
            <span className="eyebrow">{t("section.favorites")}</span>
            <p dir="ltr">
              Rust <span className="purple">&</span> Swift{" "}
              <span aria-hidden="true">↗</span>
            </p>
          </div>
          <div>
            <span className="eyebrow">{t("section.languageTitle")}</span>
            <p>
              {t("section.persian")}
              <span className="language-separator">/</span>
              {t("section.english")}
            </p>
          </div>
        </div>
      </section>

      <section className="after-hours-teaser" aria-labelledby="after-title">
        <div className="after-hours-copy">
          <span className="eyebrow">{t("after.eyebrow")}</span>
          <h2 id="after-title">{t("after.title")}</h2>
          <p>{t("after.description")}</p>
          <Link to="/interests" className="button button-dark">
            {t("after.link")}
            <Icon name="arrow-up" size={18} />
          </Link>
        </div>
        <AfterHoursArt t={t} />
      </section>
      <MedlifeMiniPage
        open={medlifeOpen}
        onClose={() => setMedlifeOpen(false)}
      />
    </>
  );
}
