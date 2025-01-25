import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Toaster />
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </StrictMode>
  </BrowserRouter>
);
