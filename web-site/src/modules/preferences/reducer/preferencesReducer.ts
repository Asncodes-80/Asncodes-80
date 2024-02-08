import { createSlice, Slice } from "@reduxjs/toolkit";

import { resources } from "../../../config/resources";
import { Preferences } from "../interface/preferences";

const initialState: Preferences = {
  /** Default value of locale is "en" */
  locale: localStorage.getItem("locale") ?? resources.i18n.supportedLocales[0],

  /** Default value of direction is "ltr" */
  direction: resources.style.defaultDirection,
};

export const preferencesSlice: Slice<Preferences> = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    changeLocale: (
      state: Preferences,
      action: { payload: string; type: string }
    ) => {
      state.locale = action.payload;
      localStorage.setItem("locale", state.locale);
    },
  },
});

export const { changeLocale } = preferencesSlice.actions;
export default preferencesSlice.reducer;
