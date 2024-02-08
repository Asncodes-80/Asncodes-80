import { Button } from "@nextui-org/react";
import { Add } from "@mui/icons-material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import LanguageSelect from "./components/LanguageSelect";
import { newTab } from "../mainPane/reducers/section";

const PreferencesBar: React.FC<UIScreen> = ({ t }): JSX.Element => {
  const dispatch = useDispatch();

  const sceneProvider = useSelector((store: StoreParameters) => store.scene);

  const saveScene = () => {
    console.log(sceneProvider.sections);
  };

  return (
    <div className="flex flex-row-reverse gap-2">
      <Button
        className="light"
        color="primary"
        isLoading={false}
        onPress={() => saveScene()}
      >
        {t("preferences.saveScene")}
      </Button>
      <LanguageSelect t={t} />
      <Button
        variant="faded"
        className="w-2"
        onPress={() => dispatch(newTab("newTab"))}
      >
        <Add />
      </Button>
    </div>
  );
};

export default PreferencesBar;
