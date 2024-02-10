import { Button } from "@nextui-org/react";
import React from "react";

import XIcon from "../assets/icons/x.svg";
import LinkedinIcon from "../assets/icons/linkedin.svg";
import EmailIcon from "../assets/icons/email.svg";
import GitHubIcon from "../assets/icons/github.svg";
import InstagramIcon from "../assets/icons/instagram.svg";
import StackOverFlow from "../assets/icons/stackoverflow.svg";

const Footer: React.FC<ScreenModule> = ({ t }): JSX.Element => {
  const icons: { icon: any; link: string }[] = [
    { icon: XIcon, link: "https://x.com/asn80soltani" },
    { icon: LinkedinIcon, link: "https://linkedin.com/in/alirezacodes" },
    { icon: EmailIcon, link: "mailto:a.soltani@iau-tnb.ac.ir" },
    { icon: GitHubIcon, link: "https://github.com/Asncodes-80" },
    { icon: InstagramIcon, link: "https://instagram.com/alireza.codes" },
    {
      icon: StackOverFlow,
      link: "https://stackoverflow.com/users/12158825/alireza-soltani-neshan",
    },
  ];

  return (
    <footer className="flex flex-col px-5 py-2 items-end mt-[100px]">
      <h5 className="text-secondary text-large mb-[20px]">
        {t("headline.username")}
      </h5>
      <div className="flex flex-row gap-2">
        {React.Children.toArray(
          icons.map((item) => (
            <Button isIconOnly onClick={() => window.open(item.link, "_blank")}>
              <img src={item.icon} />
            </Button>
          ))
        )}
      </div>
    </footer>
  );
};

export default Footer;
