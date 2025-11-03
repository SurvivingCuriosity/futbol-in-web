import { ApiResponse } from "futbol-in-core/types";

export const getUserCount = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/count`, {
    next: { revalidate: 60 },
  });
  const { data } = (await res.json()) as ApiResponse<number>;
  return data || 0;
};
