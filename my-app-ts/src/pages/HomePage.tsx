import React from "react";
import CommunityList from "../components/CommunityList";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

const HomePage = () => {
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
};

export default HomePage;

export {};