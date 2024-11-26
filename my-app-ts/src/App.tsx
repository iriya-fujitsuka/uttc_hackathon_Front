import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage"; // Registerページをインポート

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />       {/* デフォルト: ログインページ */}
        <Route path="/home" element={<HomePage />} />    {/* ホームページ */}
        <Route path="/register" element={<RegisterPage />} /> {/* 登録ページ */}
      </Routes>
    </Router>
  );
}

export default App;