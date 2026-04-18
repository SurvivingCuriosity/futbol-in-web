import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "@/src/features/auth/context/AuthContext";

const COOKIE_NAME = "auth_token";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return NextResponse.json({ user: null, token: null });

  try {
    const payload = jwtDecode<JwtPayload>(token);

    if (payload.exp * 1000 < Date.now()) {
      cookieStore.delete(COOKIE_NAME);
      return NextResponse.json({ user: null, token: null });
    }

    return NextResponse.json({
      token,
      user: {
        id: payload.id,
        email: payload.email,
        name: payload.name,
        role: payload.role,
        status: payload.status,
        provider: payload.provider,
        imagen: payload.imagen,
      },
    });
  } catch {
    return NextResponse.json({ user: null, token: null });
  }
}
