import React from "react";
import CommunityList from "../components/CommunityList";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // ログインページにリダイレクト
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* 上部: ヘッダー */}
      <div style={{ padding: "10px 20px", backgroundColor: "#f7f7f7", display: "flex", justifyContent: "flex-end" }}>
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