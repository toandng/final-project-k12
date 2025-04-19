import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

import LoadingProvider from "./contexts/loadingContext";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./components/store";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <LoadingProvider>
    <PersistGate loading={null} persistor={persistor}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </PersistGate>
  </LoadingProvider>
);
