import { Component, type ReactNode } from "react";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";
import Icon from "./Icon";

export function HttpError({
  code = 500,
  t,
}: {
  code?: HttpErrors;
  t: TFunction;
}) {
  return (
    <section className="error-page">
      <span className="eyebrow">SIGNAL / {code}</span>
      <div className="error-number" aria-hidden="true">
        {code}
      </div>
      <h1>{t(`errorHandler.${code}`)}</h1>
      <p className="muted">{t("errorHandler.description")}</p>
      <Link to="/" className="button button-green">
        {t("errorHandler.home")}
        <Icon name="arrow" />
      </Link>
    </section>
  );
}

export default class ErrorHandler extends Component<
  { children: ReactNode; t: TFunction },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? (
      <HttpError t={this.props.t} />
    ) : (
      this.props.children
    );
  }
}
