import { ApiResponse } from "futbol-in-core/types";

export const getUserCount = async () => {
  const res = await fetch(`http://192.168.0.19:3000/user/count`, {
    next: { revalidate: 60 },
  });
  const { data } = (await res.json()) as ApiResponse<number>;
  return data || 0;
};
