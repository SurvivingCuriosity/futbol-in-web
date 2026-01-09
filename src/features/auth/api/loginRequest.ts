import { API_URL } from "@/src/config";
import type { LoginBody } from "futbol-in-core/schemas";
import type { ApiResponse } from "futbol-in-core/types";

export async function loginRequest(body: LoginBody) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return (await res.json()) as ApiResponse<{ token: string }>;
}
