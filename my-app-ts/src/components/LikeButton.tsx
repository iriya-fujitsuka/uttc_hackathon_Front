import React, { useState, useEffect } from "react";

type LikeButtonProps = {
  postId: string;
  initialCount: number;
  userId: string | null;
};

const LikeButton: React.FC<LikeButtonProps> = ({ postId, initialCount, userId }) => {
  const [likeCount, setLikeCount] = useState(initialCount);
 
  useEffect(() => {
    setLikeCount(initialCount);
  }, [initialCount]);

  const toggleLike = async () => {
    console.log("toggleLikeのあと", userId, postId);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/toggle-like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, post_id: postId }),
      });

      if (response.ok) {
        console.log("いいねがトグルされました！");
        const countsResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/like-counts?postID=${postId}`);
        const counts = await countsResponse.json();
        console.log("counts", counts);
        setLikeCount(counts.like_count || 0);
      } else {
        const errorText = await response.text();
        console.error("いいねのトグルに失敗しました。", errorText);
        alert(`エラー: ${errorText}`);
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
      alert("エラーが発生しました。再試行してください。");
    }
  };

  return (
    <div>
      <button
        style={{
          padding: "5px 10px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginRight: "5px",
        }}
        onClick={toggleLike}
      >
        いいね
      </button>
      <span>{likeCount} いいね</span>
    </div>
  );
};

export default LikeButton; 