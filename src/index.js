import "./css/public.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./views/Main";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/server" element={<App />} />
      <Route path="/" element={<Main />} />
    </Routes>
  </BrowserRouter>
);
