import { combineReducers } from "redux";
import authReducer from "../../features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { logger } from "redux-logger";
const rootConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  auth: authReducer,
});
export const store = configureStore({
  reducer: persistReducer(rootConfig, rootReducer),
  middleware: (getDefault) => [
    ...getDefault({ serializableCheck: false }),
    logger,
  ],
});

export const persistor = persistStore(store);
