import Icon from "./Icon";

export default function AfterHoursArt({ t }: ScreenModule) {
  return (
    <div className="after-hours-art" aria-hidden="true" dir="ltr">
      <div className="art-orbit" />
      <div className="art-poster poster-back">
        <span className="mono">02 / THE BIG SCREEN</span>
        <Icon name="film" size={72} />
        <strong>{t("after.pause")}</strong>
        <div className="poster-stripes" />
      </div>
      <div className="art-poster poster-front">
        <span className="mono">01 / PRESS START</span>
        <Icon name="game" size={88} />
        <strong>{t("after.play")}</strong>
        <div className="poster-stripes" />
      </div>
      <div className="repeat-stamp mono">
        {t("after.repeat")}
        <span>↺</span>
      </div>
    </div>
  );
}
