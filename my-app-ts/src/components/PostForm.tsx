import React, { useState } from "react";

const PostForm = () => {
  const [postContent, setPostContent] = useState("");

  const handleSubmit = async () => {
    // 投稿内容が空でないことを確認
    if (!postContent.trim()) {
      alert("投稿内容を入力してください！");
      return;
    }

    // ローカルストレージからユーザーIDを取得
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("ログインしていません。ログイン後に投稿してください。");
      return;
    }

    // 投稿データを準備
    const post = {
      user_id: userId, // ログイン中のユーザーID
      content: postContent, // 投稿内容
    };

    try {
      // fetch を使用してバックエンドにPOSTリクエストを送信
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        console.log("投稿が成功しました！");
        setPostContent(""); // 投稿後に入力内容をリセット
        window.location.reload(); // ページをリロード
      } else {
        const errorText = await response.text();
        console.error("投稿に失敗しました。", errorText);
        alert(`エラー: ${errorText}`);
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
      alert("エラーが発生しました。再試行してください。");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        marginBottom: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "5px",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <textarea
        placeholder="今の気持ちは？"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        投稿する
      </button>
    </div>
  );
};

export default PostForm;
