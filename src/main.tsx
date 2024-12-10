// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CustomizationProvider } from "./contexts/CustomizationContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <CustomizationProvider>
        <App />
      </CustomizationProvider>
    </AuthProvider>
  </BrowserRouter>
);
