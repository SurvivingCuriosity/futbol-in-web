import { API_URL } from "@/src/config";
import { ApiResponse } from "futbol-in-core/types";

export const getUserCount = async () => {
  const res = await fetch(`${API_URL}/user/count`, {
    next: { revalidate: 600 },
  });
  const { data } = (await res.json()) as ApiResponse<number>;
  return data || 0;
};
