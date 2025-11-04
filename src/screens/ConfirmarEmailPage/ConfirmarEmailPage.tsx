"use client";

import { JwtPayload, useAuth } from "@/src/client/context/AuthContext";
import { API_URL } from "@/src/config";
import { FormField, FormLabel } from "@/src/shared/components/FormField";
import { AppLogo } from "@/src/shared/components/NavLayout/AppLogo";
import { Button, TextInput } from "futbol-in-ui";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const RESEND_COOLDOWN = 90; // segundos

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ConfirmarEmailPage() {
  const router = useRouter();
  const { user, login, logout } = useAuth();
  const validEmail = user?.email;

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Recuperar cooldown guardado ---
  useEffect(() => {
    const lastResend = localStorage.getItem("lastResend");
    if (lastResend) {
      const diff = Math.floor((Date.now() - Number(lastResend)) / 1000);
      if (diff < RESEND_COOLDOWN) startCooldown(RESEND_COOLDOWN - diff);
    }
  }, []);

  useEffect(() => {
    if (cooldown <= 0 && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [cooldown]);

  const startCooldown = (seconds: number) => {
    setCooldown(seconds);
    timerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1 && timerRef.current) clearInterval(timerRef.current);
        return Math.max(0, prev - 1);
      });
    }, 1000);
  };

  // --- Confirmar código ---
  const onVerify = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: validEmail, code }),
      });

      const json = await res.json();
      if (!json.success || !json.data?.token) {
        setError(json.message || "Código inválido");
        setLoading(false);
        return;
      }

      toast.success("Email verificado correctamente");
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

  // --- Reenviar código ---
  const onResend = async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/auth/resend-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: validEmail }),
      });
      const json = await res.json();

      if (!json.success) {
        setError(json.message || "No pudimos reenviar el código");
      } else {
        localStorage.setItem("lastResend", Date.now().toString());
        startCooldown(RESEND_COOLDOWN);
        toast.success("Código reenviado a tu correo");
      }
    } catch {
      setError("Error de red");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="bg-neutral-950/80 backdrop-blur-xs border border-neutral-800 p-4 md:p-8 max-w-xl mx-auto rounded-2xl flex flex-col items-center gap-4">

      <h1 className="text-3xl font-bold text-primary text-center">
        Verifica tu correo
      </h1>

      <p className="text-center text-neutral-400">
        Hemos enviado un código a{" "}
        <span className="text-primary">{validEmail}</span>
      </p>

      {error && <p className="text-red-400 text-center">{error}</p>}

      <FormField>
        <FormLabel>Código de verificación</FormLabel>
        <TextInput placeholder="123456" value={code} onChangeText={setCode} />
      </FormField>

      <Button
        label={loading ? "Verificando..." : "Confirmar"}
        onClick={onVerify}
        loading={loading}
        disabled={!code || code.length < 6}
      />

      <button
        onClick={onResend}
        disabled={resending || cooldown > 0}
        className="block w-full text-center text-sm mt-3 text-neutral-400 hover:text-primary transition"
      >
        {resending
          ? "Reenviando..."
          : cooldown > 0
          ? `Reenviar en ${cooldown}s`
          : "Reenviar código"}
      </button>

      <button
        onClick={logout}
        className="block mx-auto mt-4 text-xs text-neutral-500 hover:text-red-400"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
