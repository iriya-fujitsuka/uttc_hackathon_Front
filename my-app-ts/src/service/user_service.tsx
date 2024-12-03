import { User } from "../types/user";
import { Userrequest } from "../types/user";

export async function registerUser(user: Userrequest) {
  const url = process.env.REACT_APP_BASE_URL + "/users";

   // ログで確認
  console.log("Sending user data:", user);
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("User registered successfully:", data);
    
    return data.id;
  } catch (error) {
    console.error("Error registering user:", error);
  }
}
