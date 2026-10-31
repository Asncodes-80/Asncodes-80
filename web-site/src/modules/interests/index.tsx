import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import {
  interests,
  mediaStatuses,
  type Interest,
  type MediaKind,
  type MediaStatus,
} from "../../data/interests";
import { asset, localize } from "../../data/resume";
import Icon, { type IconName } from "../../components/Icon";
import { useDialogMotion } from "../../motion/useDialogMotion";

const statusIcons: Record<MediaStatus, IconName> = {
  completed: "check",
  "in-progress": "play",
  planned: "clock",
};
const statusSuffix: Record<MediaStatus, string> = {
  completed: "Completed",
  "in-progress": "InProgress",
  planned: "Planned",
};
const kindIcons: Record<MediaKind, IconName> = {
  game: "game",
  film: "film",
  book: "book",
};
const sections: {
  kind: MediaKind;
  title: string;
  label: string;
  description: string;
  shelf: string;
}[] = [
  {
    kind: "game",
    title: "games",
    label: "gamesLabel",
    description: "gamesDescription",
    shelf: "shelfGames",
  },
  {
    kind: "film",
    title: "films",
    label: "filmsLabel",
    description: "filmsDescription",
    shelf: "shelfFilms",
  },
  {
    kind: "book",
    title: "books",
    label: "booksLabel",
    description: "booksDescription",
    shelf: "shelfBooks",
  },
];
const rank: Record<MediaStatus, number> = {
  "in-progress": 0,
  completed: 1,
  planned: 2,
};
const displayTitle = (item: Interest, locale: string) =>
  item.localizedTitle ? localize(item.localizedTitle, locale) : item.title;

function StatusBadge({ item, t }: { item: Interest; t: TFunction }) {
  return (
    <span className={`status-badge status-${item.status}`}>
      <Icon name={statusIcons[item.status]} size={11} />
      {t(`interests.${item.kind}${statusSuffix[item.status]}`)}
    </span>
  );
}

function Artwork({ item }: { item: Interest }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className="artwork-fallback">
      <Icon name={kindIcons[item.kind]} size={52} />
      <span>{item.title}</span>
    </div>
  ) : (
    <img
      src={asset(item.artwork)}
      alt={item.artworkAlt}
      loading="lazy"
      decoding="async"
      width="600"
      height="900"
      style={item.artworkFit ? { objectFit: item.artworkFit } : undefined}
      onError={() => setFailed(true)}
    />
  );
}

export default function InterestsScreen({ t }: ScreenModule) {
  const { i18n } = useTranslation();
  const [status, setStatus] = useState<MediaStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Interest | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const queryInput = useRef<HTMLInputElement>(null);
  const closeDialog = useDialogMotion(dialog, selected !== null);
  const visible = useMemo(
    () =>
      interests
        .filter((item) => {
          const matchesStatus = status === "all" || item.status === status;
          const haystack =
            `${item.title} ${item.localizedTitle?.fa ?? ""} ${item.creator ?? ""} ${item.genres.join(" ")}`.toLocaleLowerCase();
          return (
            matchesStatus && haystack.includes(query.trim().toLocaleLowerCase())
          );
        })
        .sort((a, b) => rank[a.status] - rank[b.status]),
    [query, status],
  );
  const featured = interests.find((item) => item.spotlight);
  useEffect(() => {
    if (!selected) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selected]);
  const reset = () => {
    setStatus("all");
    setQuery("");
  };
  return (
    <>
      <section className="page-hero interests-hero">
        <div>
          <span className="eyebrow">{t("interests.eyebrow")}</span>
          <h1 className="display-title">
            <span>{t("interests.line1")}</span>
            <span className="purple">{t("interests.line2")}</span>
          </h1>
          <p>{t("interests.description")}</p>
          <div className="shelf-shortcuts">
            {sections.map((section) => (
              <a href={`#${section.kind}-shelf`} key={section.kind}>
                <Icon name={kindIcons[section.kind]} size={15} />
                {t(`interests.${section.shelf}`)}
                <span className="mono">
                  {String(
                    interests.filter((item) => item.kind === section.kind)
                      .length,
                  ).padStart(2, "0")}
                </span>
              </a>
            ))}
          </div>
        </div>
        {featured?.spotlight && (
          <button
            type="button"
            className="featured-game-card"
            onClick={() => setSelected(featured)}
            aria-label={t("interests.openTitle", {
              title: featured.title,
            })}
            aria-describedby={featured.note ? "featured-game-note" : undefined}
          >
            <picture className="featured-game-artwork">
              <source
                media="(max-width: 600px)"
                srcSet={asset(featured.spotlight.wideArtwork)}
              />
              <img
                src={asset(featured.spotlight.artwork)}
                alt={featured.artworkAlt}
                width="1200"
                height="1200"
              />
            </picture>
            <div className="featured-game-overlay" />
            <span className="featured-game-label mono">
              <Icon name="clock" size={12} />
              {localize(featured.spotlight.label, i18n.language)}
            </span>
            <div className="featured-game-caption">
              {featured.note && (
                <span className="featured-game-note" id="featured-game-note">
                  {localize(featured.note, i18n.language)}
                </span>
              )}
              <strong dir="ltr">{featured.title}</strong>
              <span className="featured-game-arrow">
                <Icon name="arrow-up" size={23} />
              </span>
            </div>
          </button>
        )}
      </section>
      <div className="collection-toolbar">
        <div
          className="filter-tabs media-filters"
          role="group"
          aria-label={t("interests.collection")}
        >
          {(["all", ...mediaStatuses] as const).map((key) => (
            <button
              type="button"
              key={key}
              onClick={() => setStatus(key)}
              aria-pressed={status === key}
              className={status === key ? "selected" : ""}
            >
              {key !== "all" && <Icon name={statusIcons[key]} size={13} />}
              {t(`interests.${key}`)}
              <span className="mono">
                {key === "all"
                  ? interests.length
                  : interests.filter((item) => item.status === key).length}
              </span>
            </button>
          ))}
        </div>
        <label className="collection-search">
          <Icon name="search" size={16} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("interests.search")}
            aria-label={t("interests.searchLabel")}
            ref={queryInput}
          />
          {query && (
            <button
              type="button"
              aria-label={t("interests.clear")}
              onClick={() => {
                setQuery("");
                queryInput.current?.focus();
              }}
            >
              <Icon name="close" size={14} />
            </button>
          )}
        </label>
      </div>
      <div className="collection-result-count mono" aria-live="polite">
        {String(visible.length).padStart(2, "0")} / {interests.length}{" "}
        {t("interests.count")}
        <span>{t("interests.legend")}</span>
      </div>
      {visible.length === 0 ? (
        <div className="collection-empty">
          <Icon name="search" size={38} />
          <h2>{t("interests.noResults")}</h2>
          <p>{t("interests.noResultsDescription")}</p>
          <button className="button button-green" type="button" onClick={reset}>
            {t("interests.reset")}
            <Icon name="arrow" size={16} />
          </button>
        </div>
      ) : (
        sections.map((section) => {
          const entries = visible.filter((item) => item.kind === section.kind);
          return (
            <section
              key={section.kind}
              className={`media-section ${section.kind}-section`}
              id={`${section.kind}-shelf`}
              aria-labelledby={`${section.kind}-title`}
            >
              <div className="section-heading">
                <div>
                  <span className="eyebrow">
                    {t(`interests.${section.label}`)}
                  </span>
                  <h2 id={`${section.kind}-title`}>
                    {t(`interests.${section.title}`)}
                  </h2>
                  <p className="media-section-description">
                    {t(`interests.${section.description}`)}
                  </p>
                </div>
                <span className="media-section-icon">
                  <Icon name={kindIcons[section.kind]} size={32} />
                </span>
              </div>
              {entries.length > 0 ? (
                <div className="media-grid">
                  {entries.map((item) => (
                    <article
                      className={`media-card ${item.kind}-card`}
                      key={item.id}
                    >
                      <button
                        className="media-card-button"
                        type="button"
                        onClick={() => setSelected(item)}
                        aria-label={t("interests.openTitle", {
                          title: displayTitle(item, i18n.language),
                        })}
                      >
                        <div className="media-artwork">
                          <Artwork item={item} />
                          <div className="media-artwork-shade" />
                          <span className="media-open-icon">
                            <Icon name="plus" size={20} />
                          </span>
                          <span className="media-artwork-index mono">
                            {item.id.toUpperCase()}
                          </span>
                        </div>
                        <div className="media-card-copy">
                          <StatusBadge item={item} t={t} />
                          <h3
                            dir={
                              item.localizedTitle &&
                              i18n.language.startsWith("fa")
                                ? "rtl"
                                : "ltr"
                            }
                          >
                            {displayTitle(item, i18n.language)}
                          </h3>
                          {item.creator ? (
                            <p className="media-creator" dir="ltr">
                              {item.creator}
                            </p>
                          ) : (
                            <p className="media-genre" dir="ltr">
                              {item.genres.join(" / ")}
                            </p>
                          )}
                        </div>
                      </button>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="shelf-empty">
                  <span className="mono">—</span>
                  <p>{t("interests.noResults")}</p>
                </div>
              )}
            </section>
          );
        })
      )}
      <div className="collection-colophon mono">
        <span>
          <i className="status-dot" />
          {t("interests.aboutCollection")}
        </span>
        <span>{t("interests.imageCredit")}</span>
      </div>
      <dialog
        className="media-dialog"
        ref={dialog}
        onClose={() => setSelected(null)}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        aria-labelledby="interest-dialog-title"
      >
        {selected && (
          <div className="media-dialog-content">
            <button
              type="button"
              className="dialog-close"
              onClick={closeDialog}
              aria-label={t("interests.close")}
            >
              <Icon name="close" size={21} />
            </button>
            <div className="dialog-artwork">
              <Artwork item={selected} />
            </div>
            <div className="dialog-copy">
              <span className="eyebrow">
                {t(
                  `interests.${sections.find((section) => section.kind === selected.kind)?.shelf}`,
                )}
              </span>
              <StatusBadge item={selected} t={t} />
              <h2
                id="interest-dialog-title"
                dir={
                  selected.localizedTitle && i18n.language.startsWith("fa")
                    ? "rtl"
                    : "ltr"
                }
              >
                {displayTitle(selected, i18n.language)}
              </h2>
              {selected.creator && (
                <p className="dialog-creator" dir="ltr">
                  {selected.creator}
                </p>
              )}
              <div className="tags">
                {selected.genres.map((genre) => (
                  <span key={genre}>{genre}</span>
                ))}
              </div>
              {selected.note && (
                <p className="dialog-note">
                  {localize(selected.note, i18n.language)}
                </p>
              )}
              <div className="dialog-links">
                {selected.href && (
                  <a
                    className="button button-green"
                    href={selected.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("interests.details")}
                    <Icon name="arrow-up" size={16} />
                  </a>
                )}
                <a
                  href={selected.artworkSource}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-link"
                >
                  {t("interests.artwork")}
                  <Icon name="arrow-up" size={13} />
                </a>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
