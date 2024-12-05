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
  const [posts, setPosts] = useState<Post[]>([]);
  const [replyContent, setReplyContent] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

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

  const handleReply = (postId: string) => {
    setReplyingTo(postId);
  };

  const submitReply = async (postId: string) => {
    if (!replyContent.trim()) {
      alert("返信内容を入力してください！");
      return;
    }

    const reply = {
      user_id: "currentUserId", // 現在のユーザーIDを取得する必要があります
      content: replyContent,
      reply_to_id: postId, // 元の投稿のIDを設定
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reply),
      });

      if (response.ok) {
        console.log("返信が成功しました！");
        setReplyContent(""); // 返信後に入力内容をリセット
        setReplyingTo(null); // 返信モードを解除
        // ここで投稿を再取得して更新することを検討
      } else {
        const errorText = await response.text();
        console.error("返信に失敗しました。", errorText);
        alert(`エラー: ${errorText}`);
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
      alert("エラーが発生しました。再試行してください。");
    }
  };

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
          <button
            style={{
              padding: "5px 10px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "5px",
            }}
            onClick={() => handleReply(post.id)}
          >
            返信
          </button>
          {replyingTo === post.id && (
            <div style={{ marginTop: "10px" }}>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="返信を入力..."
                style={{ width: "100%", height: "50px" }}
              />
              <button
                style={{
                  padding: "5px 10px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
                onClick={() => submitReply(post.id)}
              >
                返信を送信
              </button>
            </div>
          )}
          {posts
            .filter((reply) => reply.reply_to_id === post.id)
            .map((reply) => (
              <div
                key={reply.id}
                style={{
                  marginLeft: "20px",
                  padding: "5px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "5px",
                  marginTop: "5px",
                }}
              >
                <p style={{ fontSize: "14px", color: "#666" }}>
                  返信者ID: {reply.user_id}
                </p>
                <p style={{ fontSize: "14px" }}>{reply.content}</p>
                <p style={{ fontSize: "12px", color: "#999" }}>
                  返信日時: {new Date(reply.created_at).toLocaleString()}
                </p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default PostList;
