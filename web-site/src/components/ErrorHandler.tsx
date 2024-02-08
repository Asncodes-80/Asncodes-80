import { TFunction } from "i18next";
import * as React from "react";

/**
 * # Http client Error message handler
 *
 * @param {number} code - Status code error
 * @returns {JSX.Element}
 */
export const HttpError = ({
  code = 500,
  t,
}: {
  code?: HttpErrors;
  t: TFunction;
}): JSX.Element => {
  switch (code) {
    case 403:
      return <span>{t("errorHandler.403")}</span>;
    case 404:
      return <span>{t("errorHandler.404")}</span>;
    case 500:
    default:
      return <span>{t("errorHandler.500")}</span>;
  }
};

/** Catch children throws and render another component instead. */
export default class ErrorHandler extends React.Component<{
  children: React.ReactNode;
  t: TFunction;
}> {
  constructor(props: {
    children: React.ReactNode | React.ReactNode[] | undefined;
    t: TFunction;
  }) {
    super(props);
    this.state = { err: undefined };
  }

  static getDerivedStateFromError(err: Error) {
    return { err };
  }

  render() {
    const s: any = this.state;
    let children = this.props.children;
    let t = this.props.t;

    if (children === undefined) return <HttpError code={404} t={t} />;

    if (s.err !== undefined) {
      if (s.err.code === 404) return <HttpError code={404} t={t} />;
      if (s.err.code === 500) return <HttpError t={t} />;
      return <HttpError t={t} />;
    }

    if (!Array.isArray(children)) children = [children];

    children = React.Children.toArray(children);

    return <>{children}</>;
  }
}
