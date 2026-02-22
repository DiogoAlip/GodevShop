import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoDevApp } from "./GoDevApp";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoDevApp />
  </StrictMode>,
);
