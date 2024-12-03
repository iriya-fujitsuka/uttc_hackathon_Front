import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(fireAuth, email, password);
      const user = userCredential.user;
      console.log("User logged in:", user);

      // ログイン成功後、ユーザー情報を保存してホームページへリダイレクト
      localStorage.setItem("userId", user.uid); // 必要ならUIDを保存
      navigate("/home"); // リダイレクト
    } catch (err: any) {
      console.error("Error during login:", err.message);
      setError("メールアドレスまたはパスワードが正しくありません。");
    }
  };

  return (
    <div className="login-container">
      {/* 左側ロゴ */}
      <div className="logo-container">
        <img src="/images/logo light.jpg" alt="Heart Bridge Logo" className="logo" />
      </div>

      {/* 右側フォーム */}
      <div className="form-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>病気を知る・つながる</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          <p className="link-container">
            <a href="/register">アカウントをお持ちでない方はこちら →</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
