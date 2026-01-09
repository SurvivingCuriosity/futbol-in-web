"use client";

import { useAuth } from "@/src/features/auth/context/AuthContext";
import { FormField, FormLabel } from "@/src/shared/components/FormField";
import { Button, TextInput } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { setUsernameRequest } from "../api/setUsernameRequest";
import { mapTokenToUser } from "../utils/mapTokenToUser";

export default function SetUsernamePage() {
  const router = useRouter();
  const { token: authToken, login, logout } = useAuth();

  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      const json = await setUsernameRequest(username, authToken);

      if (!json.success || !json.data?.token) {
        setError(json.message);
        toast.error(json.message || "Error al iniciar sesión");
        return;
      }

      toast.success("Nombre establecido. Te damos la bienvenida!");

      const { user } = mapTokenToUser(json.data.token);
      login(json.data.token, user);

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
          errorText={error || ''}
        />
      </FormField>

      <Button
        label={loading ? "Creando..." : "Confirmar"}
        onClick={onSubmit}
        loading={loading}
      />

      <button
        aria-label="logout-button"
        onClick={logout}
        className="block mx-auto mt-4 text-xs text-neutral-500 hover:text-red-400"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
