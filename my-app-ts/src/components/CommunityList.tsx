import React from "react";

const CommunityList = () => {
  const communities = ["糖尿病", "がん患者", "リウマチ", "その他"];
  
  return (
    <div>
      <h2>Community</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {communities.map((community, index) => (
          <li
            key={index}
            style={{
              padding: "10px",
              borderBottom: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {community}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityList;

export {};