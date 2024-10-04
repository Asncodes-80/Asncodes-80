import React from "react";

const Profile: React.FC<ScreenModule> = ({ t }): JSX.Element => {
  return (
    <div className="mx-[30px] w-[100%] main-profile">
      <img
        src="/Asncodes-80/avatar/profile.jpg"
        className="w-[323px] rounded-full mb-[30px] main-col-avatar"
      />
      <p className="text-medium main-profile-sub-avatar">
        {t("main.subAvatar")}
      </p>
      <div className="mt-[20px] main-profile-sub-avatar">
        <h5 className="text-large text-primary-foreground mb-[20px]">
          {t("main.skills.label")}
        </h5>
        <ul className="list-disc">
          {React.Children.toArray(
            [...new Array(4)].map((_, index: number) => (
              <li className="text-medium mb-1">
                {t(`main.skills.item${index + 1}`)}
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="mt-[20px] main-profile-sub-avatar">
        <h5 className="text-large text-primary-foreground mb-[20px]">
          {t("main.languages.label")}
        </h5>
        <ul className="list-disc">
          {React.Children.toArray(
            [...new Array(5)].map((_, index: number) => (
              <li className="text-medium mb-1">
                {t(`main.languages.item${index + 1}`)}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
