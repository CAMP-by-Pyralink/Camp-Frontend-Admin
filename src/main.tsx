// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CustomizationProvider } from "./contexts/CustomizationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CustomizationProvider>
      <App />
    </CustomizationProvider>
  </BrowserRouter>
);
