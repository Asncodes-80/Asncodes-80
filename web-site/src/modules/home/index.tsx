import React from "react";

import { Container } from "../../components/Containers";
import Profile from "./components/profile";
import Context from "./components/context";

const HomeScreen: React.FC<ScreenModule> = ({ t }) => {
  return (
    <Container t={t}>
      <div className="flex flex-row main-col-mobile mt-10">
        <Profile t={t} />
        <Context t={t} />
      </div>
    </Container>
  );
};

export default HomeScreen;
