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
  const [isCommunityListVisible, setIsCommunityListVisible] = useState<boolean>(false);
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

  const toggleCommunityList = () => {
    setIsCommunityListVisible(!isCommunityListVisible);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-left">
          <img src="/images/logo light.jpg" alt="Logo" className="logo" />
          <h1 className="welcome-text">ようこそ、{userName} さん！</h1>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          ログアウト
        </button>
        <button className="toggle-button" onClick={toggleCommunityList}>
          {isCommunityListVisible ? "コミュニティを隠す" : "コミュニティを表示"}
        </button>
      </div>

      <div className="content">
        <div className={`community-list ${isCommunityListVisible ? "visible" : ""}`}>
          <CommunityList onSelect={setSelectedCommunityId} />
        </div>

        <div className="main-content">
          <PostForm />
          <PostList selectedCommunityId={selectedCommunityId} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
