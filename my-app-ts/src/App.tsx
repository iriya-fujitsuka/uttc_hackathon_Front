import React from "react";
import CommunityList from "./components/CommunityList"; // コミュニティ一覧
import PostForm from "./components/PostForm";         // 投稿フォーム
import PostList from "./components/PostList";         // 投稿リスト

function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
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
  );
}

export default App;