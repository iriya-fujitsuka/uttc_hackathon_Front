import React from "react";

const PostList = () => {
  const posts = [
    { id: 1, title: "投稿1", body: "これはテスト投稿です。" },
    { id: 2, title: "投稿2", body: "新しい投稿がここに表示されます。" },
  ];

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
          <h3>{post.title}</h3>
          <p>{post.body}</p>
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