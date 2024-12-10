import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import App from "./pages/App";
import SeoPage from "./pages/SeoPage";
import NotFound from "./pages/NotFound";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const root = ReactDOM.createRoot(document.getElementById("container"));

root.render(
  <React.StrictMode>
    <Suspense fallback={<h1>Carregando...</h1>}>
      <Router>
        <Routes>
          <Route path={"/"} element={<SeoPage />} />
          <Route path={"/app"} element={<App />} />
          <Route path={"/termos-de-uso"} element={<TermsOfUse />} />
          <Route path={"/politica-de-privacidade"} element={<PrivacyPolicy />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
    <ToastContainer />
  </React.StrictMode>
);
