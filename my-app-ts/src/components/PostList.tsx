import React, { useEffect, useState } from "react";
import { fetchPosts } from "../service/postService";

// `Post` 型をGoのモデルに基づいて定義
type Post = {
  id: string;           // Postの一意のID
  user_id: string;      // 投稿者のID
  community_id: string; // 投稿が属するコミュニティID
  content: string;      // 投稿の内容
  created_at: string;   // 作成日時
  reply_to_id?: string; // 返信先のPost ID（オプション）
};

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]); // 型をPost[]に設定

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    loadPosts(); // データ取得
  }, []);

  return (
    <div>
      <h2>最近の投稿</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ fontSize: "14px", color: "#666" }}>
            投稿者ID: {post.user_id}
          </p>
          {/* <p style={{ fontSize: "14px", color: "#666" }}>
            コミュニティID: {post.community_id}
          </p> */}
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>{post.content}</p>
          <p style={{ fontSize: "12px", color: "#999" }}>
            投稿日時: {new Date(post.created_at).toLocaleString()}
          </p>
          {post.reply_to_id && (
            <p style={{ fontSize: "12px", color: "#999" }}>
              返信元の投稿ID: {post.reply_to_id}
            </p>
          )}
          <button
            style={{
              padding: "5px 10px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            いいね
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
