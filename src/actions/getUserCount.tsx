import { ApiResponse } from "futbol-in-core/types";
import { API_URL } from "../config";

export const getUserCount = async () => {
  const res = await fetch(`${API_URL}/user/count`, {
    next: { revalidate: 60 },
  });
  const { data } = (await res.json()) as ApiResponse<number>;
  return data || 0;
};
