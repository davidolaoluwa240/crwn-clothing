// Modules
import React from "react";
import { createRoot } from "react-dom/client";

// Components
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";
import App from "./App";

// Store
import { store, persistor } from "./store/store";

// Utils
import { stripePromise } from "./utils/stripe/stripe.utils";

// Style
import "./index.scss";

// Mount React To DOM
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
