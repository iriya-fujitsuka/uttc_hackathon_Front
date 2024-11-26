import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";  // ログインページ
import HomePage from "./pages/HomePage";    // ホームページ

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />      {/* デフォルト: ログインページ */}
        <Route path="/home" element={<HomePage />} />  {/* ホームページ */}
      </Routes>
    </Router>
  );
}

export default App;