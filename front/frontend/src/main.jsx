import { createRoot } from "react-dom/client";
import App from "./App";
import Context from "./pages/context/Context";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <Context>
    <App />
  </Context>
);
