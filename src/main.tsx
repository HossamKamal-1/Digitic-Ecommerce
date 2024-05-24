import React from "react";
import ReactDOM from "react-dom/client";
import { persistor, store } from "@store";
import { Provider } from "react-redux";
import AppRouter from "@routes/AppRouter";
import { PersistGate } from "redux-persist/integration/react";

// import { Modal } from "@components/common/ui";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
