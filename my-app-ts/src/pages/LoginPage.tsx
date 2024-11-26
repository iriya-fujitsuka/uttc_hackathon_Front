import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "../firebase";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    try {
      // Firebaseでのログイン
      const userCredential = await signInWithEmailAndPassword(fireAuth, email, password);
      const user = userCredential.user;

      // バックエンドにメールアドレスを送信
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });

      if (response.ok) {
        console.log("Login successful!");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
