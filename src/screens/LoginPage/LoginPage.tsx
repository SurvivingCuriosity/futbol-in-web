"use client";

import { JwtPayload, useAuth } from "@/src/client/context/AuthContext";
import { API_URL } from "@/src/config";
import { FormField, FormLabel } from "@/src/shared/components/FormField";
import { GoogleSignInButton } from "@/src/shared/components/SignInGoogleButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserStatus } from "futbol-in-core/enum";
import { LoginBody, loginSchema } from "futbol-in-core/schemas";
import { Button, PasswordInput, TextInput } from "futbol-in-ui";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginBody>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginBody) => {
    try {
      const r = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await r.json();
      if (!json.success || !json.data.token) {
        toast.error(json.message);
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
        payload.status === UserStatus.MUST_CONFIRM_EMAIL
          ? "/app/confirmar-email"
          : "/app/home"
      );
    } catch (e) {
      toast.error("Ups... Algo salió mal" + String(e));
    }
  };

  return (
    <>
      <form
        autoComplete="on"
        autoCapitalize="none"
        spellCheck={false}
        className="bg-neutral-950/90 backdrop-blur-xs p-2 pt-0 md:p-8 max-w-xl mx-auto rounded-lg flex flex-col items-center"
      >
        <h1 className="text-3xl font-bold mr-auto mb-4 text-accent">
          Iniciar sesión
        </h1>
        <FormField>
          <FormLabel htmlFor="login-email">Email</FormLabel>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextInput
                id="login-email"
                aria-label="Email"
                placeholder="Email"
                onChangeText={field.onChange}
                autoCapitalize="none"
                autoComplete="username email"
                inputMode="email"
                value={field.value}
                errorText={errors.email?.message}
              />
            )}
          />
        </FormField>

        <FormField>
          <FormLabel htmlFor="login-pass">Contraseña</FormLabel>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <PasswordInput
                id="login-pass"
                aria-label="Contraseña"
                placeholder="Contraseña"
                onChangeText={field.onChange}
                value={field.value}
                errorText={errors.password?.message}
                autoComplete="current-password"
                inputMode="text"
              />
            )}
          />
        </FormField>


          <Button
            label="Entrar"
            onClick={handleSubmit(onSubmit)}
            loading={isSubmitting}
          />


        <Link href="/app/register" className="underline my-5">
          No tengo una cuenta
        </Link>

        <Separador />

        <GoogleSignInButton context="signin"/>
      </form>
    </>
  );
}

export const Separador = () => {
  return (
    <div className="flex items-center gap-1 w-full mb-5">
      <div className="w-1/3 h-0.5 bg-neutral-500"></div>
      <p className="w-1/3 text-center text-neutral-500 text-sm">
        O si prefieres
      </p>
      <div className="w-1/3 h-0.5 bg-neutral-500"></div>
    </div>
  );
};
