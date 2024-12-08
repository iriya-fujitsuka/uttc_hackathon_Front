import React, { useEffect, useState } from "react";

type Community = {
  id: number;
  name: string;
  created_at: string;
};

type CommunityListProps = {
  onSelect: (communityId: number | null) => void;
};

const CommunityList: React.FC<CommunityListProps> = ({ onSelect }) => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [newCommunityName, setNewCommunityName] = useState("");

  useEffect(() => {
    fetchCommunities();
  }, []);

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

  const addCommunity = async () => {
    if (!newCommunityName.trim()) {
      alert("コミュニティ名を入力してください！");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/communities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCommunityName }),
      });

      if (response.ok) {
        setNewCommunityName("");
        fetchCommunities(); // コミュニティリストを更新
      } else {
        const errorText = await response.text();
        console.error("コミュニティの追加に失敗しました。", errorText);
        alert(`エラー: ${errorText}`);
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
      alert("エラーが発生しました。再試行してください。");
    }
  };

  const deleteCommunity = async (communityId: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/communities/${communityId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCommunities(); // コミュニティリストを更新
      } else {
        const errorText = await response.text();
        console.error("コミュニティの削除に失敗しました。", errorText);
        alert(`エラー: ${errorText}`);
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
      alert("エラーが発生しました。再試行してください。");
    }
  };

  return (
    <div>
      <h3>コミュニティ一覧</h3>
      <ul>
        <li onClick={() => onSelect(null)}>すべて</li>
        {communities.map((community) => (
          <li key={community.id}>
            <span onClick={() => onSelect(community.id)}>{community.name}</span>
            <button onClick={() => deleteCommunity(community.id)}>削除</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newCommunityName}
          onChange={(e) => setNewCommunityName(e.target.value)}
          placeholder="新しいコミュニティ名"
        />
        <button onClick={addCommunity}>追加</button>
      </div>
    </div>
  );
};

export default CommunityList;

export {};