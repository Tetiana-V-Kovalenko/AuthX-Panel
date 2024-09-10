import { API_URL } from "../constants/api";

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
