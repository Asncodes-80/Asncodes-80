import React from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

interface HeadlineButton {
  label: string;
  link?: string;
}

const Headline: React.FC<ScreenModule> = ({ t }): JSX.Element => {
  const navigate = useNavigate();

  const headlineButtons: HeadlineButton[] = [
    { label: "headline.menu.about", link: "/" },
    { label: "headline.menu.gallery", link: "/gallery" },
    {
      label: "headline.menu.cv",
    },
  ];

  return (
    <div className="flex flex-row sticky top-0 px-5 py-2 justify-between bg-background opacity-80">
      <span className="text-large text-primary-foreground text-center self-center header-name">
        {t("headline.name")}
      </span>

      <div className="space-x-2 items-center self-center">
        {React.Children.toArray(
          headlineButtons.map((button: HeadlineButton) => (
            <Button
              className="text-primary-foreground text-large"
              variant="light"
              onClick={() =>
                button.link
                  ? navigate(button.link)
                  : window.open(
                      "https://docs.google.com/document/d/1EZqyinTAUFmlGWBeVNox6_8ugCL0NmMTUkO4Kkq2x2M/edit?usp=sharing",
                      "_blank"
                    )
              }
            >
              {t(button.label)}
            </Button>
          ))
        )}
      </div>
    </div>
  );
};

export default Headline;
