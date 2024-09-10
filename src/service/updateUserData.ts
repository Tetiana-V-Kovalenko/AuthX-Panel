import { API_URL } from "../constants/api";

export const updateUserData = async ({
  email,
  password,
  new_email,
  new_password,
}: {
  email: string;
  password: string;
  new_email: string;
  new_password: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, new_email, new_password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
