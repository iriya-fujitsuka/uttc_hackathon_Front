import React, { useState } from "react";

const PostForm = () => {
  const [postContent, setPostContent] = useState("");

  const handleSubmit = () => {
    console.log("投稿内容:", postContent);
    setPostContent(""); // 投稿後にリセット
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

export {};