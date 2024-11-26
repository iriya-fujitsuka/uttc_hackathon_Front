import React, { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // 登録処理をここに記述
    console.log("Registered with", email, password);
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

export {};