export const fetchPosts = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/posts`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}; 