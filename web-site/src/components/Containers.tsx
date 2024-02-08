import React from "react";
import Headline from "./Headline";
import Footer from "./Footer";

export const Container: React.FC<
  {
    children: React.ReactNode | React.ReactNode[];
  } & ScreenModule
> = ({ children = <></>, t }): JSX.Element => {
  return (
    <div className="flex flex-col max-w-[1366px] mx-auto m-[51px]">
      <Headline t={t} />
      {React.Children.toArray(children)}
      <Footer t={t} />
    </div>
  );
};
