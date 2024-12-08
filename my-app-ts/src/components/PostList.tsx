import React, { useEffect, useState } from "react";
import { fetchPosts } from "../service/postService";
import LikeButton from "./LikeButton";
import { useUser } from "../context/UserContext";

// `Post` 型をGoのモデルに基づいて定義
type Post = {
  id: string;
  user_id: string;
  community_id: number | null;
  content: string;
  created_at: string;
  reply_to_id?: string;
};

type PostListProps = {
  selectedCommunityId: number | null;
  communityName: string | null;
};

const PostList: React.FC<PostListProps> = ({ selectedCommunityId, communityName }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [replyContent, setReplyContent] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});
  const { userId } = useUser();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);

        // likeCountsDataの型を明示的に指定
        const likeCountsData: { [key: string]: number } = {};
        for (const post of postsData) {
          try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/like-counts?postID=${post.id}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch like count for post ID: ${post.id}`);
            }
            const countData = await response.json();
            console.log(`Response for post ID ${post.id}:`, countData);

            if (countData && typeof countData.like_count === 'number') {
              likeCountsData[post.id] = countData.like_count;
            } else {
              console.warn(`Invalid likeCount for post ID: ${post.id}`, countData);
              likeCountsData[post.id] = 0;
            }
          } catch (error) {
            console.error(`Error fetching like count for post ID: ${post.id}`, error);
            likeCountsData[post.id] = 0;
          }
        }
        console.log("likeCountsData", likeCountsData);
        setLikeCounts(likeCountsData);
      } catch (error) {
        console.error("Failed to load posts or like counts:", error);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = selectedCommunityId === null
    ? posts
    : posts.filter(post => post.community_id === selectedCommunityId);

  const sortedPosts = filteredPosts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const handleReply = (postId: string) => {
    setReplyingTo(postId);
  };

  const submitReply = async (postId: string, communityId: number | null) => {
    if (!replyContent.trim()) {
      alert("返信内容を入力してください！");
      return;
    }

    const reply = {
      user_id: userId,
      content: replyContent,
      reply_to_id: postId,
      community_id: communityId,
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
        window.location.reload(); // ページをリロード
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
      <h2>{communityName ? communityName : "最近の投稿"}</h2>
      {sortedPosts
        .filter((post) => !post.reply_to_id)
        .map((post) => (
          <div key={post.id} style={{ padding: "10px", marginBottom: "10px", backgroundColor: "#ffffff", borderRadius: "5px", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" }}>
            <p style={{ fontSize: "14px", color: "#666" }}>投稿者ID: {post.user_id}</p>
            <p style={{ fontSize: "16px", fontWeight: "bold" }}>{post.content}</p>
            <p style={{ fontSize: "12px", color: "#999" }}>投稿日時: {new Date(post.created_at).toLocaleString('ja-JP')}</p>
            <button style={{ padding: "5px 10px", backgroundColor: "black", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "5px" }} onClick={() => handleReply(post.id)}>返信</button>
            <LikeButton postId={post.id} initialCount={likeCounts[post.id] || 0} userId={userId} />
            {replyingTo === post.id && (
              <div style={{ marginTop: "10px" }}>
                <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} placeholder="返信を入力..." style={{ width: "100%", height: "50px" }} />
                <button style={{ padding: "5px 10px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "5px" }} onClick={() => submitReply(post.id, post.community_id)}>返信を送信</button>
              </div>
            )}
            {posts.filter((reply) => reply.reply_to_id === post.id).map((reply) => (
              <div key={reply.id} style={{ marginLeft: "20px", padding: "5px", backgroundColor: "#f9f9f9", borderRadius: "5px", marginTop: "5px" }}>
                <p style={{ fontSize: "14px", color: "#666" }}>返信者ID: {reply.user_id}</p>
                <p style={{ fontSize: "14px" }}>{reply.content}</p>
                <p style={{ fontSize: "12px", color: "#999" }}>返信日時: {new Date(reply.created_at).toLocaleString('ja-JP')}</p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default PostList;
