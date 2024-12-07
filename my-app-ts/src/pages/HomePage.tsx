import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { fireAuth } from "../firebase";
import { useNavigate } from "react-router-dom";
import CommunityList from "../components/CommunityList";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { useUser } from "../context/UserContext";

const HomePage = () => {
  const { userId, userName } = useUser();
  const [user, setUser] = useState<any>(null); // ログイン中のユーザー情報を管理
  const navigate = useNavigate();

  useEffect(() => {
    // 認証状態を監視
    const unsubscribe = onAuthStateChanged(fireAuth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // 認証済み
        
        // ユーザーIDをローカルストレージに保存
        localStorage.setItem("userId", currentUser.uid);
      } else {
        navigate("/login"); // 未認証ならログインページへリダイレクト
      }
    });

    // クリーンアップ
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      console.log("User ID from context:", userId);
    }
  }, [userId, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(fireAuth); // Firebaseの認証状態を解除
      localStorage.removeItem("userId"); // ログアウト時に削除
      navigate("/login"); // ログインページへリダイレクト
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* 上部: ヘッダー */}
      <div
        style={{
          padding: "10px 20px",
          backgroundColor: "#f7f7f7",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>ようこそ、{userName} さん！</h1>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ログアウト
        </button>
      </div>

      {/* メインコンテンツ */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* 左側: コミュニティ一覧 */}
        <div style={{ flex: 1, backgroundColor: "#f7f7f7", padding: "20px" }}>
          <CommunityList />
        </div>

        {/* メインエリア */}
        <div style={{ flex: 3, padding: "20px" }}>
          {/* 投稿フォーム */}
          <PostForm />

          {/* 投稿リスト */}
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
