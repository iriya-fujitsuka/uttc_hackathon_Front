import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "../firebase"; // Firebase設定ファイルをインポート
import { registerUser } from "../service/user_service";

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
    <div style={{ display: "flex", height: "100vh" }}>
      {/* 左側ロゴ */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <img src="/images/logo light.jpg" alt="Heart Bridge Logo" style={{ maxWidth: "400px", marginBottom: "20px" }} />
      </div>

      {/* 右側フォーム */}
      <div style={{ flex: 2, backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form onSubmit={handleRegister} style={{ maxWidth: "400px", width: "100%" }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>病気を知る・つながる</h2>
          {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "black",
              color: "white",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Register
          </button>
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            <a href="/" style={{ textDecoration: "none", color: "black" }}>アカウントを持っている方はこちら →</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
