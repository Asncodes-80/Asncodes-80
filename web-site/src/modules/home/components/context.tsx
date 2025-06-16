import React from "react";

const Context: React.FC<ScreenModule> = ({ t }): JSX.Element => {
  const calculateAge = (birthDate: Date): Number => {
    const now = new Date();

    let age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && now.getDate() < birthDate.getDate())
    )
      age -= 1;

    return age;
  };

  const myAge: string = calculateAge(new Date(2001, 8, 1)).toString();

  return (
    <div className="mx-[91px] main-context">
      <h5 className="text-large text-primary mb-[20px] mt-[20px]">
        {t("main.about.label").toUpperCase()}
      </h5>
      {/* <p>
        <span className="text-secondary">{t("main.about.note.title")}</span>
        {t("main.about.note.content")}
      </p> */}
      <p className="text-medium mt-[20px]">
        {t("main.about.firstParagraph").replace(/\{age}/gi, myAge)}
      </p>

      <h5 className="text-large text-primary mt-[20px] mb-[20px]">
        {t("main.about.experiences.label").toUpperCase()}
      </h5>

      <ul className="list-disc">
        {React.Children.toArray(
          [...new Array(6)].map((_, index: number) => (
            <li>{t(`main.about.experiences.item${index + 1}`)}</li>
          ))
        )}
      </ul>

      <h5 className="text-large text-primary mt-[20px] mb-[20px]">
        {t("main.about.educations.label").toUpperCase()}
      </h5>

      <ul className="list-disc">
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
