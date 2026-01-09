import { API_URL } from "@/src/config";
import type { RegisterBody } from "futbol-in-core/schemas";
import type { ApiResponse } from "futbol-in-core/types";

export async function registerRequest(body: RegisterBody) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return (await res.json()) as ApiResponse<{ token: string }>;
}
