import { jwtDecode } from "jwt-decode";
import type { AuthUser, JwtPayload } from "@/src/features/auth/context/AuthContext";

export function mapTokenToUser(token: string) {
  const payload = jwtDecode<JwtPayload>(token);

  return {
    token,
    user: {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      status: payload.status,
      provider: payload.provider,
      imagen: payload.imagen,
    } as AuthUser,
  };
}
