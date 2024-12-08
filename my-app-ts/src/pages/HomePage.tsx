import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { fireAuth } from "../firebase";
import { useNavigate } from "react-router-dom";
import CommunityList from "../components/CommunityList";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { useUser } from "../context/UserContext";

const HomePage = () => {
  const { userId, userName } = useUser();
  const [user, setUser] = useState<any>(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState<number | null>(null);
  const [communities, setCommunities] = useState<{ id: number; name: string }[]>([]);
  const navigate = useNavigate();
  const { setUserId, setUserName } = useUser();
  const [communityName, setCommunityName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireAuth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users?email=${currentUser.email}`);
        if (!response.ok) {
          throw new Error("ユーザー情報の取得に失敗しました。");
        }
        const userData = await response.json();
        setUserId(userData.id);
        setUserName(userData.name);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate, user]);

  useEffect(() => {
    if (userId) {
      console.log("User ID from context:", userId);
    }
  }, [userId, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(fireAuth);
      localStorage.removeItem("userId");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleCommunitySelect = (communityId: number | null) => {
    setSelectedCommunityId(communityId);
    if (communityId === null) {
      setCommunityName(null);
    } else {
      const selectedCommunity = communities.find((c) => c.id === communityId);
      setCommunityName(selectedCommunity ? selectedCommunity.name : null);
    }
  };

  return (
    <div className="container" style={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#f0f8ff", color: "#333" }}>
      <div style={{ padding: "20px", backgroundColor: "#ffebcd", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/images/logo light.jpg" alt="Logo" style={{ height: "60px", marginRight: "15px" }} />
          <h1 style={{ margin: 0, fontSize: "24px", color: "#000" }}>ようこそ、{userName} さん！</h1>
        </div>
        <button onClick={handleLogout} style={{ padding: "10px 20px", backgroundColor: "#ff69b4", color: "white", border: "none", borderRadius: "20px", cursor: "pointer", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", transition: "transform 0.2s" }}>ログアウト</button>
      </div>

      <div style={{ display: "flex", flex: 1, padding: "20px", gap: "20px" }}>
        <div style={{ flex: 1, backgroundColor: "#fffaf0", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <CommunityList onSelect={handleCommunitySelect} onCommunitiesLoaded={setCommunities} />
        </div>

        <div style={{ flex: 3, padding: "20px", backgroundColor: "#fffaf0", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <PostForm />
          <PostList selectedCommunityId={selectedCommunityId} communityName={communityName} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
