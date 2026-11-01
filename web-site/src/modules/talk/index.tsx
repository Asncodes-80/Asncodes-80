import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { asset, localize } from "../../data/resume";
import {
  featuredTalks,
  talkChannel,
  talkShelves,
  talks,
  type Talk,
} from "../../data/talks";
import Icon from "../../components/Icon";
import { useDialogMotion } from "../../motion/useDialogMotion";
import { useReducedMotion } from "../../motion/preferences";

function TalkShelf({
  shelf,
  onPlay,
}: {
  shelf: (typeof talkShelves)[number];
  onPlay: (talk: Talk) => void;
}) {
  const { t, i18n } = useTranslation();
  const rail = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [edges, setEdges] = useState({ previous: false, next: false });
  const rtl = i18n.language.startsWith("fa");

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () => {
      const bounds = element.getBoundingClientRect();
      const first = element.firstElementChild?.getBoundingClientRect();
      const last = element.lastElementChild?.getBoundingClientRect();
      if (!first || !last) return;
      const next = {
        previous: rtl
          ? first.right > bounds.right + 2
          : first.left < bounds.left - 2,
        next: rtl ? last.left < bounds.left - 2 : last.right > bounds.right + 2,
      };
      setEdges((current) =>
        current.previous === next.previous && current.next === next.next
          ? current
          : next,
      );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, [rtl]);

  const move = (direction: number) => {
    const element = rail.current;
    if (element)
      element.scrollBy({
        left: direction * (rtl ? -1 : 1) * element.clientWidth * 0.85,
        behavior: reduced ? "instant" : "smooth",
      });
  };

  return (
    <section
      className="talk-shelf"
      id={`talk-${shelf.id}`}
      aria-labelledby={`talk-${shelf.id}-title`}
    >
      <div className="talk-shelf-heading section-heading">
        <div>
          <h2 id={`talk-${shelf.id}-title`}>
            {localize(shelf.title, i18n.language)}
          </h2>
          <p>{localize(shelf.description, i18n.language)}</p>
        </div>
        <div className="talk-rail-controls">
          <span className="mono">03 {t("talk.episodes")}</span>
          {(edges.previous || edges.next) && (
            <>
              <button
                type="button"
                onClick={() => move(-1)}
                disabled={!edges.previous}
                aria-label={t("talk.previous")}
                className="talk-rail-previous"
              >
                <Icon name="arrow" size={17} />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                disabled={!edges.next}
                aria-label={t("talk.next")}
              >
                <Icon name="arrow" size={17} />
              </button>
            </>
          )}
        </div>
      </div>
      <div
        className="talk-rail"
        ref={rail}
        role="list"
        aria-label={localize(shelf.title, i18n.language)}
      >
        {shelf.talks.map((item) => (
          <article className="talk-card" key={item.id} role="listitem">
            <button
              type="button"
              onClick={() => onPlay(item)}
              aria-haspopup="dialog"
              aria-label={`${t("talk.play")}: ${localize(item.title, i18n.language)}`}
            >
              <div className="talk-card-image">
                <img
                  src={asset(item.thumbnail)}
                  alt={item.title.fa}
                  loading="lazy"
                  width="1280"
                  height="720"
                />
                <span className="talk-card-play">
                  <Icon name="play" size={23} />
                </span>
                <span className="talk-duration mono" dir="ltr">
                  {item.duration}
                </span>
              </div>
              <div className="talk-card-copy">
                <div className="talk-card-meta mono">
                  <span>{localize(item.topic, i18n.language)}</span>
                  <span dir="ltr">0{talks.indexOf(item) + 1}</span>
                </div>
                <h3>{localize(item.title, i18n.language)}</h3>
                <p>{localize(item.description, i18n.language)}</p>
              </div>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function TalkScreen({ t }: ScreenModule) {
  const { i18n } = useTranslation();
  const [feature, setFeature] = useState(0);
  const [playing, setPlaying] = useState<Talk | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useDialogMotion(dialog, playing !== null);
  const selected = featuredTalks[feature];
  const locale = i18n.language;

  useEffect(() => {
    if (!playing) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (dialog.current) dialog.current.scrollTop = 0;
    return () => {
      document.body.style.overflow = previous;
    };
  }, [playing]);

  return (
    <div className="talk-page">
      <div className="talk-titleband">
        <div className="talk-wordmark">
          <h1>
            TALK<span>.</span>
          </h1>
          <span className="mono">ALIREZA / ON AIR</span>
        </div>
        <p>{t("talk.intro")}</p>
        <a
          className="inline-link"
          href={talkChannel}
          target="_blank"
          rel="noreferrer"
        >
          {t("talk.channel")}
          <Icon name="arrow-up" size={16} />
        </a>
      </div>
      <section className="talk-hero" aria-labelledby="talk-featured-title">
        <div className="talk-hero-art" aria-hidden="true">
          {featuredTalks.map((item, index) => (
            <img
              key={item.id}
              src={asset(item.backdrop ?? item.thumbnail)}
              className={feature === index ? "is-active" : undefined}
              alt=""
              width="1672"
              height="941"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ))}
        </div>
        <div className="talk-hero-grid" aria-hidden="true" />
        <div className="talk-original mono">
          <span className="talk-original-mark">a_</span>
          {t("talk.originals")}
        </div>
        <span className="talk-audio mono">
          FA <i /> {t("talk.originalAudio")}
        </span>
        <div className="talk-feature-copy" key={selected.id}>
          <div className="talk-feature-meta mono">
            <span className="green">{t("talk.featured")}</span>
            <span>{selected.duration}</span>
            <span>{t("talk.language")}</span>
          </div>
          <h2 id="talk-featured-title">{localize(selected.title, locale)}</h2>
          <p>{localize(selected.description, locale)}</p>
          <div className="talk-feature-actions">
            <button
              type="button"
              className="button button-green"
              onClick={() => setPlaying(selected)}
              aria-haspopup="dialog"
            >
              <Icon name="play" size={18} />
              {t("talk.watch")}
            </button>
            <a className="button talk-browse-button" href="#talk-collection">
              <Icon name="grid" size={17} />
              {t("talk.browse")}
            </a>
          </div>
        </div>
        <div className="talk-feature-bottom">
          <div
            className="talk-feature-picker"
            role="group"
            aria-label={t("talk.chooseFeatured")}
          >
            {featuredTalks.map((item, index) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setFeature(index)}
                aria-pressed={index === feature}
                aria-label={localize(item.title, locale)}
                className={index === feature ? "selected" : ""}
              >
                <span className="mono">0{index + 1}</span>
                <span className="talk-picker-line" />
              </button>
            ))}
          </div>
          <button
            type="button"
            className="talk-feature-poster"
            onClick={() => setPlaying(selected)}
            aria-label={`${t("talk.play")}: ${localize(selected.title, locale)}`}
            aria-haspopup="dialog"
          >
            <img
              src={asset(selected.thumbnail)}
              alt={selected.title.fa}
              width="1280"
              height="720"
            />
            <span>
              <Icon name="play" size={20} />
            </span>
          </button>
        </div>
      </section>
      <div className="talk-collection-heading" id="talk-collection">
        <span className="eyebrow">{t("talk.collection")}</span>
        <span className="mono">06 / {t("talk.selectedTalks")}</span>
      </div>
      {talkShelves.map((shelf) => (
        <TalkShelf shelf={shelf} key={shelf.id} onPlay={setPlaying} />
      ))}
      <aside className="talk-channel-footer">
        <div>
          <span className="eyebrow">{t("talk.keepCurious")}</span>
          <h2>{t("talk.moreTitle")}</h2>
          <p>{t("talk.moreDescription")}</p>
        </div>
        <a
          className="button button-plain"
          href={talkChannel}
          target="_blank"
          rel="noreferrer"
        >
          {t("talk.allVideos")}
          <Icon name="arrow-up" size={18} />
        </a>
      </aside>
      <dialog
        ref={dialog}
        className="talk-player-dialog"
        aria-labelledby="talk-player-title"
        onClose={() => setPlaying(null)}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {playing && (
          <div className="talk-player-content">
            <header className="talk-player-header">
              <span className="mono">TALK / ALIREZACODES</span>
              <button
                type="button"
                className="mini-page-close"
                onClick={close}
                aria-label={t("talk.close")}
              >
                <span>{t("talk.close")}</span>
                <Icon name="close" size={18} />
              </button>
            </header>
            <div className="talk-video-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${playing.id}?autoplay=1&rel=0`}
                title={localize(playing.title, locale)}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="talk-player-copy">
              <span className="eyebrow purple">
                {localize(playing.topic, locale)} /{" "}
                <bdi>{playing.duration}</bdi>
              </span>
              <h2 id="talk-player-title">{localize(playing.title, locale)}</h2>
              {!locale.startsWith("fa") && (
                <p className="talk-original-title" lang="fa" dir="rtl">
                  {playing.title.fa}
                </p>
              )}
              <p>{localize(playing.description, locale)}</p>
              <a
                className="inline-link"
                href={playing.href}
                target="_blank"
                rel="noreferrer"
              >
                {t("talk.youtube")}
                <Icon name="arrow-up" size={16} />
              </a>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
