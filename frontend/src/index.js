import React from "react";
import ReactDOM from "react-dom/client";
import CustomThemeProvider from "./MuiTheme";
import { Provider } from "react-redux";
import App from "./App";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CustomThemeProvider>
        <App />
      </CustomThemeProvider>
    </PersistGate>
  </Provider>
);
