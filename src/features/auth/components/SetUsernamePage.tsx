"use client";

import { JwtPayload, useAuth } from "@/src/features/auth/context/AuthContext";
import { FormField, FormLabel } from "@/src/shared/components/FormField";
import { Button, TextInput } from "futbol-in-ui";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SetUsernamePage() {
  const router = useRouter();
  const { token:authToken, login, logout } = useAuth();

  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/set-username`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ username }),
      });

      const json = await res.json();
      if (!json.success) {
        setError(json.message);
        setLoading(false);
        return;
      }

      toast.success("Nombre establecido. Te damos la bienvenida!");
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

      router.replace("/app/home");
    } catch {
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-950/80 backdrop-blur-xs border border-neutral-800 p-4 md:p-8 max-w-xl mx-auto rounded-2xl flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold text-primary text-center">
        Crea tu nickname
      </h1>

      <p className="text-center text-neutral-400">
        Debes crear un nombre de usuario único para acceder a tu cuenta
      </p>

      {error && <p className="text-red-400 text-center">{error}</p>}

      <FormField>
        <FormLabel htmlFor="set-username">Username</FormLabel>
        <TextInput
          id="set-username"
          placeholder="johny123"
          value={username}
          onChangeText={setUsername}
        />
      </FormField>

      <Button
        label={loading ? "Creando..." : "Confirmar"}
        onClick={onSubmit}
        loading={loading}
      />

      <button
        onClick={logout}
        className="block mx-auto mt-4 text-xs text-neutral-500 hover:text-red-400"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
