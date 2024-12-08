import React, { useState, useEffect } from "react";

const PostForm = () => {
  const [postContent, setPostContent] = useState("");
  const [selectedCommunityId, setSelectedCommunityId] = useState<number | null>(null);
  const [communities, setCommunities] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/communities`);
        if (!response.ok) {
          throw new Error("Failed to fetch communities");
        }
        const data = await response.json();
        setCommunities(data.map((community: any) => ({
          id: Number(community.id),
          name: community.name,
        })));
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchCommunities();
  }, []);

  const handleSubmit = async () => {
    // 投稿内容が空でないことを確認
    if (!postContent.trim()) {
      alert("投稿内容を入力してください！");
      return;
    }

    if (selectedCommunityId === null) {
      alert("コミュニティを選択してください！");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("ログインしていません。ログイン後に投稿してください。");
      return;
    }

    const post = {
      user_id: userId,
      content: postContent,
      community_id: selectedCommunityId,
    };

    console.log("Sending post data:", post);

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
        setTimeout(() => {
            window.location.reload(); // 3秒後にページをリロード
          }, 3000);
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
      <select
        value={selectedCommunityId !== null ? selectedCommunityId : ""}
        onChange={(e) => setSelectedCommunityId(Number(e.target.value))}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      >
        <option value="" disabled>
          コミュニティを選択してください
        </option>
        {communities.map((community) => (
          <option key={community.id} value={community.id}>
            {community.name}
          </option>
        ))}
      </select>
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
