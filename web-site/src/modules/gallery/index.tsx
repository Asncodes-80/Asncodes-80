import { useState } from "react";
import { useTranslation } from "react-i18next";
import { localize, projects, type ProjectCategory } from "../../data/resume";
import Icon from "../../components/Icon";
import ProjectVisual from "../../components/ProjectVisual";
import MedlifeMiniPage from "../../components/MedlifeMiniPage";

export default function GalleryScreen({ t }: ScreenModule) {
  const { i18n } = useTranslation();
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const [medlifeOpen, setMedlifeOpen] = useState(false);
  const visible = projects.filter(
    (project) => category === "all" || project.category === category,
  );
  return (
    <>
      <section className="page-hero work-page-hero">
        <div>
          <span className="eyebrow">{t("work.eyebrow")}</span>
          <h1 className="display-title">
            <span>{t("work.line1")}</span>
            <span className="purple">{t("work.line2")}</span>
          </h1>
          <p>{t("work.description")}</p>
        </div>
        <div className="work-emblem" aria-hidden="true" dir="ltr">
          <span className="mono">IDEA → ITERATE → BUILD</span>
          <div>
            ↳<b>_</b>
          </div>
          <span className="mono">A WORK IN CONSTANT PROGRESS</span>
        </div>
      </section>
      <section
        className="medlife-case"
        id="medlife"
        aria-labelledby="medlife-title"
      >
        <div className="case-intro">
          <span className="eyebrow">{t("work.caseLabel")}</span>
          <span className="case-number mono">PROJECT / 001</span>
          <h2 id="medlife-title">
            <span className="green">MedLife.</span>
            <br />
            {t("work.medlifeTitle")}
          </h2>
          <p>{t("work.medlifeIntro")}</p>
          <div className="tags">
            <span>IoMT</span>
            <span>mHealth</span>
            <span>Cryptography</span>
            <span>Applied AI</span>
          </div>
          <button
            className="button button-green case-open-button"
            type="button"
            onClick={() => setMedlifeOpen(true)}
            aria-haspopup="dialog"
          >
            {t("medlife.open")}
            <Icon name="arrow-up" size={18} />
          </button>
        </div>
        <div className="case-system">
          <button
            className="case-visual-button"
            type="button"
            onClick={() => setMedlifeOpen(true)}
            aria-label={t("medlife.open")}
            aria-haspopup="dialog"
          >
            <ProjectVisual variant="medlife" t={t} />
            <span className="case-visual-open">
              <Icon name="plus" size={20} />
            </span>
          </button>
          <p className="concept-caption mono">{t("project.concept")}</p>
          <div className="system-layers">
            {[0, 1, 2, 3].map((index) => (
              <div key={index}>
                <span className="mono green">0{index + 1}</span>
                <div>
                  <h3>{t(`work.layers.${index}`)}</h3>
                  <p>{t(`work.layerDescriptions.${index}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="section archive-section"
        aria-labelledby="archive-title"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t("work.archive")}</span>
            <h2 id="archive-title">{t("work.archiveTitle")}</h2>
          </div>
          <span className="count-label mono" aria-live="polite">
            {String(visible.length).padStart(2, "0")} {t("work.count")}
          </span>
        </div>
        <div
          className="filter-tabs"
          role="group"
          aria-label={t("work.archive")}
        >
          {(["all", "tools", "research"] as const).map((key) => (
            <button
              type="button"
              key={key}
              onClick={() => setCategory(key)}
              aria-pressed={category === key}
              className={category === key ? "selected" : ""}
            >
              {t(`work.${key}`)}
              <span className="mono">
                {key === "all"
                  ? projects.length
                  : projects.filter((p) => p.category === key).length}
              </span>
            </button>
          ))}
        </div>
        <div className="archive-grid">
          {visible.map((project, index) => (
            <article
              className={`archive-project ${project.featured ? "featured" : ""} ${project.id === "sandogh" ? "sandogh-project" : ""}`}
              key={project.id}
              id={project.id}
            >
              {project.featured && (
                <ProjectVisual variant={project.visual ?? "map"} t={t} />
              )}
              <div className="archive-project-copy">
                <div className="archive-project-meta mono">
                  <span>
                    {project.category === "tools"
                      ? t("work.tools")
                      : t("work.research")}
                  </span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 dir="ltr">{project.title}</h3>
                <p>{localize(project.description, i18n.language)}</p>
                {project.details?.map((paragraph, index) => (
                  <p key={index}>{localize(paragraph, i18n.language)}</p>
                ))}
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                {project.href ? (
                  <a
                    className="inline-link"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("work.visit")}
                    <Icon name="arrow-up" size={16} />
                  </a>
                ) : project.repo ? (
                  <a
                    className="inline-link"
                    href={`https://github.com/Asncodes-80/${project.repo}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("work.source")}
                    <Icon name="arrow-up" size={16} />
                  </a>
                ) : (
                  <span className="project-note mono">
                    {t("work.sourceUnavailable")}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <MedlifeMiniPage
        open={medlifeOpen}
        onClose={() => setMedlifeOpen(false)}
      />
    </>
  );
}
