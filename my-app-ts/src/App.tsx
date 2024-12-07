import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "./firebase";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage"; 
import { useEffect, useState } from "react";
import { UserProvider } from "./context/UserContext";

// 認証状態に基づくルート保護用コンポーネント
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireAuth, (user) => {
      setIsAuthenticated(!!user); // 認証済みならtrue
    });

    return () => unsubscribe();
  }, []);

  // 認証状態が確認されるまで読み込み中表示
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // 未認証の場合はログインページへリダイレクト
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// メインアプリ
function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        {/* デフォルトページを /login にリダイレクト */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 各ページのルート設定 */}
        <Route path="/login" element={<LoginPage />} />       {/* ログインページ */}
        <Route path="/register" element={<RegisterPage />} /> {/* 登録ページ */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
