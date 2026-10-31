import Icon from "./Icon";

export default function ProjectVisual({
  variant,
  t,
}: { variant: "medlife" | "lamda" | "map" | "sandogh" } & ScreenModule) {
  if (variant === "medlife")
    return (
      <div
        className="project-visual medlife-visual"
        aria-hidden="true"
        dir="ltr"
      >
        <div className="visual-topline mono">
          <span>MEDLIFE / CONNECTED CARE</span>
          <span className="green">● SYSTEM LINKED</span>
        </div>
        <svg className="care-wave" viewBox="0 0 620 160" fill="none">
          <defs>
            <pattern
              id="care-grid"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <path d="M28 0H0v28" stroke="currentColor" opacity=".09" />
            </pattern>
          </defs>
          <path fill="url(#care-grid)" d="M0 0h620v160H0z" />
          <path
            d="M0 90h115l14-18 20 34 23-69 26 100 25-64 15 17h100l15-18 19 34 24-69 25 100 25-64 16 17h158"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <circle
            cx="310"
            cy="90"
            r="42"
            fill="#282a36"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M290 90h12l6-15 8 30 6-15h9"
            stroke="currentColor"
            strokeWidth="2.5"
          />
        </svg>
        <div className="care-nodes mono">
          <span>
            <i />
            {t("project.hardware")}
          </span>
          <span>
            <i />
            {t("project.security")}
          </span>
          <span>
            <i />
            {t("project.care")}
          </span>
        </div>
        <span className="visual-corner tl" />
        <span className="visual-corner br" />
      </div>
    );
  if (variant === "sandogh")
    return (
      <div
        className="project-visual sandogh-visual"
        aria-hidden="true"
        dir="ltr"
      >
        <div className="visual-topline mono">
          <span>SANDOGH / GOLD INTELLIGENCE</span>
          <span className="yellow">● IN DEVELOPMENT</span>
        </div>
        <svg className="sandogh-signal" viewBox="0 0 600 210" fill="none">
          <path
            d="M0 45h600M0 85h600M0 125h600M0 165h600M60 0v210M140 0v210M220 0v210M300 0v210M380 0v210M460 0v210M540 0v210"
            stroke="currentColor"
            opacity=".07"
          />
          <ellipse
            cx="300"
            cy="111"
            rx="174"
            ry="62"
            stroke="currentColor"
            opacity=".25"
            strokeDasharray="3 7"
          />
          <path
            d="m98 144 54-28 43 12 46-49 53 15 44-37 60 24 48-13 54 27"
            stroke="currentColor"
            opacity=".35"
            strokeWidth="2"
          />
          <path
            d="m241 130 23-60h72l23 60-59 31-59-31Z"
            fill="#302f31"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="m264 70 36 24 36-24M241 130h118M300 94v67"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="m264 70-23 60h118l-23-60"
            fill="currentColor"
            opacity=".08"
          />
          <circle cx="152" cy="116" r="5" fill="currentColor" />
          <circle cx="398" cy="81" r="5" fill="#bd93f9" />
          <circle cx="500" cy="95" r="5" fill="#50fa7b" />
          <path
            d="M152 116v46h54M398 81V37h-34M500 95v67h-54"
            stroke="currentColor"
            opacity=".4"
          />
        </svg>
        <div className="sandogh-context mono">
          <span>{t("project.market")}</span>
          <span>{t("project.probability")}</span>
          <span>{t("project.portfolio")}</span>
        </div>
        <span className="visual-corner tl" />
        <span className="visual-corner br" />
      </div>
    );
  if (variant === "map")
    return (
      <div className="project-visual map-visual" aria-hidden="true" dir="ltr">
        <div className="visual-topline mono">
          <span>LOCAL / VECTOR / RASTER</span>
          <Icon name="globe" size={16} />
        </div>
        <svg viewBox="0 0 600 180" fill="none">
          <path
            d="m-20 180 170-200m-40 220L280-10m0 200L450-10M-10 40l640 80M-10 110l640 80M70-10l550 80"
            stroke="currentColor"
            opacity=".3"
            strokeWidth="18"
          />
          <path
            d="m-20 180 170-200m-40 220L280-10m0 200L450-10M-10 40l640 80M-10 110l640 80M70-10l550 80"
            stroke="#282a36"
            strokeWidth="12"
          />
          <path
            d="m205 150 55-67 130 16 44-53"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="5 6"
          />
          <circle
            cx="260"
            cy="83"
            r="10"
            fill="#282a36"
            stroke="currentColor"
            strokeWidth="3"
          />
          <circle cx="434" cy="46" r="7" fill="currentColor" />
        </svg>
        <span className="map-coordinate mono">35.6892° N / 51.3890° E</span>
      </div>
    );
  return (
    <div className="project-visual lamda-visual" aria-hidden="true" dir="ltr">
      <div className="visual-topline mono">
        <span>λ RED / THINK IN SYSTEMS</span>
        <span>RUST_</span>
      </div>
      <div className="diagram">
        <div className="diagram-node first">
          <span className="mono">01</span>
          <Icon name="code" size={26} />
          <strong>{t("project.requirement")}</strong>
        </div>
        <span className="diagram-connector" />
        <div className="diagram-node second">
          <span className="mono">02</span>
          <Icon name="grid" size={26} />
          <strong>{t("project.model")}</strong>
        </div>
        <span className="diagram-connector" />
        <div className="diagram-node third">
          <span className="mono">03</span>
          <Icon name="check" size={26} />
          <strong>{t("project.clarity")}</strong>
        </div>
      </div>
      <div className="visual-bottomline mono">
        <span>INPUT → STRUCTURE → OUTPUT</span>
        <span>λ</span>
      </div>
    </div>
  );
}
