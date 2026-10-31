import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { asset, localize } from "../data/resume";
import { medlifeChapters } from "../data/medlife";
import { useDialogMotion } from "../motion/useDialogMotion";
import Icon from "./Icon";

export default function MedlifeMiniPage({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, i18n } = useTranslation();
  const dialog = useRef<HTMLDialogElement>(null);
  const chapterNavigation = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);
  const close = useDialogMotion(dialog, open);
  const current = medlifeChapters[chapter];
  const locale = i18n.language;
  const selectChapter = (index: number) => {
    setChapter(index);
    dialog.current?.scrollTo({ top: 0, behavior: "instant" });
  };

  useEffect(() => {
    if (!open) return;
    setChapter(0);
    if (dialog.current) dialog.current.scrollTop = 0;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    const navigation = chapterNavigation.current;
    const selected = navigation?.querySelector(".selected");
    if (!navigation || !selected) return;
    const parent = navigation.getBoundingClientRect();
    const target = selected.getBoundingClientRect();
    if (target.left < parent.left)
      navigation.scrollBy({
        left: target.left - parent.left,
        behavior: "instant",
      });
    else if (target.right > parent.right)
      navigation.scrollBy({
        left: target.right - parent.right,
        behavior: "instant",
      });
  }, [chapter, open]);

  return (
    <dialog
      className="project-mini-page"
      ref={dialog}
      aria-labelledby="medlife-mini-title"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      {open && (
        <div className="mini-page-content">
          <header className="mini-page-header">
            <span className="mono">
              PROJECT / 001 <b className="green">● MEDLIFE</b>
            </span>
            <button
              type="button"
              className="mini-page-close"
              onClick={close}
              aria-label={t("medlife.close")}
            >
              <span>{t("medlife.close")}</span>
              <Icon name="close" size={18} />
            </button>
          </header>
          <div className="mini-page-intro">
            <span className="eyebrow">{t("medlife.eyebrow")}</span>
            <h2 id="medlife-mini-title">
              MedLife<span className="green">.</span>
            </h2>
            <p>{t("medlife.intro")}</p>
            <div className="tags">
              <span>IoMT</span>
              <span>ECDH</span>
              <span>RP2040</span>
              <span>Embedded C</span>
              <span>Generative AI</span>
            </div>
          </div>
          <div
            className="mini-page-chapters"
            ref={chapterNavigation}
            role="group"
            aria-label={t("medlife.chapters")}
          >
            {medlifeChapters.map((item, index) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={chapter === index}
                aria-controls="medlife-chapter"
                className={chapter === index ? "selected" : ""}
                onClick={() => selectChapter(index)}
              >
                <span className="mono">0{index + 1}</span>
                {localize(item.label, locale)}
              </button>
            ))}
          </div>
          <section
            className="mini-page-chapter"
            id="medlife-chapter"
            aria-labelledby="medlife-chapter-title"
            key={current.id}
          >
            <div className="mini-chapter-heading">
              <span className="mini-chapter-number mono" aria-hidden="true">
                0{chapter + 1}
              </span>
              <div>
                <span className="eyebrow green" dir="ltr">
                  {current.protocol}
                </span>
                <h3 id="medlife-chapter-title">
                  {localize(current.title, locale)}
                </h3>
                <p>{localize(current.description, locale)}</p>
              </div>
            </div>
            <div
              className={`mini-page-images ${current.images.length > 1 ? "paired" : "single"}`}
            >
              {current.images.map((image, index) => (
                <figure key={image.file}>
                  <a
                    href={asset(`images/projects/medlife/${image.file}`)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${t("medlife.fullSize")}: ${localize(image.caption, locale)}`}
                  >
                    <img
                      src={asset(`images/projects/medlife/${image.file}`)}
                      alt={localize(image.caption, locale)}
                      width={image.width}
                      height={image.height}
                    />
                    <span className="mini-image-expand">
                      <Icon name="arrow-up" size={16} />
                      {t("medlife.fullSize")}
                    </span>
                  </a>
                  <figcaption>
                    <span className="mono green">
                      FIG. 0{chapter + 1}
                      {current.images.length > 1 ? ` / ${index + 1}` : ""}
                    </span>
                    {localize(image.caption, locale)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
          <footer className="mini-page-footer">
            <span className="mono">
              {String(chapter + 1).padStart(2, "0")} / 05
            </span>
            <div>
              <button
                type="button"
                className="button button-plain"
                disabled={chapter === 0}
                onClick={() => selectChapter(chapter - 1)}
              >
                {t("medlife.previous")}
              </button>
              <button
                type="button"
                className="button button-green"
                onClick={() =>
                  chapter < medlifeChapters.length - 1
                    ? selectChapter(chapter + 1)
                    : close()
                }
              >
                {t(
                  chapter < medlifeChapters.length - 1
                    ? "medlife.next"
                    : "medlife.done",
                )}
                <Icon
                  className={
                    chapter < medlifeChapters.length - 1
                      ? "mini-next-arrow"
                      : undefined
                  }
                  name={
                    chapter < medlifeChapters.length - 1 ? "arrow" : "check"
                  }
                  size={17}
                />
              </button>
            </div>
          </footer>
        </div>
      )}
    </dialog>
  );
}
