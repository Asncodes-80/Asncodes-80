import { Divider } from "@nextui-org/react";
import React from "react";

import { Container } from "../../components/Containers";
import Content from "./components/Content";

const GalleryScreen: React.FC<ScreenModule> = ({ t }) => {
  const links: string[] = [
    "lamda_red",
    "protein-interaction-networks-graph",
    "explainable-software-systems-report",
    "bc-papers",
    "rtos-terminologies",
    "misconfigured-nosql-breakdown",
    "parallel-addition-mesh",
    "pegn-learn",
    "open-rsp",
    "easy-sparql",
  ];

  return (
    <Container t={t}>
      <div className="flex flex-col mt-10">
        {React.Children.toArray(
          links.map((link, index: number) => (
            <div className="m-5 p-4">
              <Content
                onClick={() =>
                  window.open(
                    `https://github.com/Asncodes-80/${link}`,
                    "_blank"
                  )
                }
                title={t(`gallery.items.item${index + 1}.title`)}
                content={t(`gallery.items.item${index + 1}.content`)}
              />
              <Divider />
            </div>
          ))
        )}
      </div>
    </Container>
  );
};

export default GalleryScreen;
