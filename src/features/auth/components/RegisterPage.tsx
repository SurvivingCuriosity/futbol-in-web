"use client";

import { GoogleSignInButton } from "@/src/features/auth/components/SignInGoogleButton";
import { useAuth } from "@/src/features/auth/context/AuthContext";
import { FormField, FormLabel } from "@/src/shared/components/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserStatus } from "futbol-in-core/enum";
import { RegisterBody } from "futbol-in-core/schemas";
import { Button, PasswordInput, TextInput } from "futbol-in-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { registerRequest } from "../api/registerRequest";
import {
  RegisterLocalBody,
  registerLocalSchema,
} from "../schemas/registerLocalSchema";
import { mapTokenToUser } from "../utils/mapTokenToUser";
import { Separador } from "./LoginPage";

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterLocalBody>({
    resolver: zodResolver(registerLocalSchema),
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: RegisterBody) => {
    try {
      const json = await registerRequest(data);

      if (!json.success || !json.data?.token) {
        setError(json.message);
        toast.error(json.message);
        return;
      }

      const { user } = mapTokenToUser(json.data.token);
      login(json.data.token, user);

      if (user.status === UserStatus.MUST_CONFIRM_EMAIL) {
        router.replace(`/app/confirmar-email`);
      }
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
        className="bg-neutral-950/90 p-2 pt-0 md:p-8 max-w-xl mx-auto rounded-lg flex flex-col items-center"
      >
        <h1 className="text-3xl font-bold mr-auto mb-4 text-accent">
          Registro
        </h1>
        <FormField>
          <FormLabel htmlFor="register-email">Email</FormLabel>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextInput
                id="register-email"
                aria-label="Email"
                placeholder="Email"
                onChangeText={field.onChange}
                autoCapitalize="none"
                autoComplete="email"
                inputMode="email"
                value={field.value}
                errorText={errors.email?.message}
              />
            )}
          />
        </FormField>

        <FormField>
          <FormLabel htmlFor="register-username">Nombre de usuario</FormLabel>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <TextInput
                id="register-username"
                aria-label="Username"
                placeholder="johny99"
                onChangeText={field.onChange}
                autoCapitalize="none"
                value={field.value}
                errorText={errors.username?.message}
              />
            )}
          />
        </FormField>

        <div className="md:grid grid-cols-2 gap-2 w-full">
          <FormField>
            <FormLabel htmlFor="register-pass">Contraseña</FormLabel>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <PasswordInput
                  id="register-pass"
                  aria-label="Contraseña"
                  placeholder="Contraseña"
                  onChangeText={field.onChange}
                  value={field.value}
                  autoComplete="new-password"
                  errorText={errors.password?.message}
                />
              )}
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="register-confirm-pass">
              Confirmar contraseña
            </FormLabel>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <PasswordInput
                  id="register-confirm-pass"
                  aria-label="Confirmar contraseña"
                  placeholder="Confirmar contraseña"
                  onChangeText={field.onChange}
                  value={field.value}
                  autoComplete="new-password"
                  errorText={errors.confirmPassword?.message}
                />
              )}
            />
          </FormField>
        </div>

        <Button
          label="Registrarme"
          onClick={handleSubmit(onSubmit)}
          loading={isSubmitting}
        />

        <Link href="/app/login" className="underline my-5">
          Ya tengo una cuenta
        </Link>

        <Separador />

        <GoogleSignInButton context="signup" />
      </form>
    </>
  );
}
