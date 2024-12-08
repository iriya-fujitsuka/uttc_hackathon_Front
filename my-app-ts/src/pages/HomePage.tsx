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
  const navigate = useNavigate();
  const { setUserId, setUserName } = useUser();

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

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ padding: "10px 20px", backgroundColor: "#f7f7f7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>ようこそ、{userName} さん！</h1>
        <button onClick={handleLogout} style={{ backgroundColor: "black", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>ログアウト</button>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ flex: 1, backgroundColor: "#f7f7f7", padding: "20px" }}>
          <CommunityList onSelect={setSelectedCommunityId} />
        </div>

        <div style={{ flex: 3, padding: "20px" }}>
          <PostForm />
          <PostList selectedCommunityId={selectedCommunityId} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
