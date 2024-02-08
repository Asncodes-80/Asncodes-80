import { configureStore } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import preferencesReducer from "../modules/preferences/reducer/preferencesReducer";

export const store: ToolkitStore<StoreParameters> = configureStore({
  reducer: {
    preferences: preferencesReducer,
  },
  devTools: true,
});
