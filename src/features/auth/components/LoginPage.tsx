"use client";

import { loginRequest } from "@/src/features/auth/api/loginRequest";
import { GoogleSignInButton } from "@/src/features/auth/components/SignInGoogleButton";
import { useAuth } from "@/src/features/auth/context/AuthContext";
import { mapTokenToUser } from "@/src/features/auth/utils/mapTokenToUser";
import { FormField, FormLabel } from "@/src/shared/components/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserStatus } from "futbol-in-core/enum";
import { LoginBody, loginSchema } from "futbol-in-core/schemas";
import { Button, PasswordInput, TextInput } from "futbol-in-ui";
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
      const json = await loginRequest(data);

      if (!json.success || !json.data?.token) {
        toast.error(json.message || "Error al iniciar sesión");
        return;
      }

      const { user } = mapTokenToUser(json.data.token);
      login(json.data.token, user);

      router.replace(
        user.status === UserStatus.MUST_CONFIRM_EMAIL
          ? "/app/confirmar-email"
          : "/app/home"
      );
    } catch (e) {
      toast.error("Ups... Algo salió mal " + String(e));
    }
  };

  return (
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
              autoComplete="email"
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
            />
          )}
        />
      </FormField>

      <Button label="Entrar" onClick={handleSubmit(onSubmit)} loading={isSubmitting} />

      <Link href="/app/register" className="underline my-5">
        No tengo una cuenta
      </Link>

      <Separador />
      <GoogleSignInButton context="signin" />
    </form>
  );
}

export const Separador = () => (
  <div className="flex items-center gap-1 w-full mb-5">
    <div className="w-1/3 h-0.5 bg-neutral-500"></div>
    <p className="w-1/3 text-center text-neutral-500 text-sm">O si prefieres</p>
    <div className="w-1/3 h-0.5 bg-neutral-500"></div>
  </div>
);
