"use client";

import { JwtPayload, useAuth } from "@/src/client/context/AuthContext";
import { API_URL } from "@/src/config";
import {
  Context,
  GoogleCredentialResponse,
  GoogleLogin,
} from "@react-oauth/google";
import { UserStatus } from "futbol-in-core/enum";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const GoogleSignInButton = ({ context }: { context?: Context }) => {
  const { login } = useAuth();
  const router = useRouter();

  const handleSuccess = async (response: GoogleCredentialResponse) => {
    if (!response.credential) {
      toast.error("No se recibió el token de Google");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/auth/google`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: response.credential }),
        }
      );

      const json = await res.json();
      if (!json.success || !json.data.token) {
        toast.error(json.message || "Error al iniciar sesión con Google");
        return;
      }

      const token = json.data.token as string;
      const payload = jwtDecode<JwtPayload>(token);

      login(token, {
        id: payload.id,
        email: payload.email,
        name: payload.name,
        role: payload.role,
        status: payload.status,
        provider: payload.provider,
        imagen: payload.imagen,
      });

      router.replace(
        payload.status === UserStatus.MUST_CREATE_USERNAME
          ? "/app/set-username"
          : "/app/home"
      );
    } catch (error) {
      toast.error("Error al autenticar con Google");
      console.error(error);
    }
  };

  const handleError = () => toast.error("Error en el login con Google");

  return (
    <div className="flex justify-center w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        shape="circle"
        theme="filled_black"
        locale="es"
        ux_mode="popup"
        useOneTap
        text={context === "signup" ? "signup_with" : "signin_with"}
        context={context}
      />
    </div>
  );
};
