import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App";
import { store } from "./components/redux/store/store";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </CookiesProvider>
  </React.StrictMode>
);
