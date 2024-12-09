import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "../firebase"; // Firebase設定ファイルをインポート
import { registerUser } from "../service/user_service";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const [name, setName] = useState(""); // 名前用のステート
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(fireAuth, email, password);
      const id = await registerUser({ name, email });

      console.log("User registered:", userCredential.user);
      console.log("Name:", name);
      setSuccessMessage("登録が成功しました！");
      setError(null);
    } catch (err: any) {
      console.error("Error during registration:", err.message);
      setError(err.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="register-container">
      {/* 左側ロゴ */}
      <div className="logo-container">
        <img src="/images/logo light.jpg" alt="Heart Bridge Logo" className="logo" />
      </div>

      {/* 右側フォーム */}
      <div className="form-container">
        <form onSubmit={handleRegister} className="register-form">
          <h2 className="form-title">病気を知る・つながる</h2>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
          <p className="link-container">
            <a href="/" style={{ textDecoration: "none", color: "black" }}>アカウントを持っている方はこちら →</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
