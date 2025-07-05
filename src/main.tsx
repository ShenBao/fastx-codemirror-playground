import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import '@ant-design/v5-patch-for-react-19';
import 'antd/dist/reset.css'
import "./index.css";

import { GlobalStyle } from "./styled.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle/>
    <App />
  </StrictMode>
);
