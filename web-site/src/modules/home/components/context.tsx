import React from "react";

const Context: React.FC<ScreenModule> = ({ t }): JSX.Element => {
  return (
    <div className="mx-[91px] main-context">
      <h5 className="text-large text-primary mb-[40px]">
        {t("main.about.label")}
      </h5>
      <p>
        <span className="text-secondary">{t("main.about.note.title")}</span>
        {t("main.about.note.content")}
      </p>
      <p className="text-medium mt-[20px]">{t("main.about.firstParagraph")}</p>

      <ul className="mt-[47px] list-disc">
        {React.Children.toArray(
          [...new Array(6)].map((_, index: number) => (
            <li>{t(`main.about.experiences.item${index + 1}`)}</li>
          ))
        )}
      </ul>

      <h5 className="text-large text-primary mt-[20px]">
        {t("main.about.educations.label")}
      </h5>

      <ul className="mt-[40px] list-disc">
        {React.Children.toArray(
          [...new Array(3)].map((_, index: number) => (
            <li>{t(`main.about.educations.item${index + 1}`)}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Context;
