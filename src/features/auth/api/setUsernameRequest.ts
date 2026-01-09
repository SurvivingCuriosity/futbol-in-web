import { API_URL } from "@/src/config";
import { ApiResponse } from "futbol-in-core/types";

export async function setUsernameRequest(username: string, token: string|null) {
  const res = await fetch(`${API_URL}/auth/set-username`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  });

  return (await res.json()) as ApiResponse<{ token: string }>;
}
