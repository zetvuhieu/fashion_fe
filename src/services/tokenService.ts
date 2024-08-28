import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    console.error("No refresh token found");
    return null;
  }

  try {
    const response = await axios.post(`${API_URL}/api/refresh-token`, {
      token: refreshToken,
    });
    const { accessToken } = response.data;

    // Lưu token mới vào localStorage
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};
