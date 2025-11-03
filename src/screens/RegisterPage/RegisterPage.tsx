"use client";

import { JwtPayload, useAuth } from "@/src/client/context/AuthContext";
import { FormField, FormLabel } from "@/src/shared/components/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginBody,
  RegisterBody,
  registerSchema,
} from "futbol-in-core/schemas";
import { Button, PasswordInput, TextInput } from "futbol-in-ui";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Separador } from "../LoginPage/LoginPage";
import toast from "react-hot-toast";
import { GoogleSignInButton } from "@/src/shared/components/SignInGoogleButton";

export default function RegisterPage() {
  const { login } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterBody>({
    resolver: zodResolver(registerSchema),
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginBody) => {
    try {
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await r.json();
      if (!json.success || !json.data.token) {
        setError(json.message);
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
              name="password"
              render={({ field }) => (
                <PasswordInput
                  id="register-confirm-pass"
                  aria-label="Confirmar contraseña"
                  placeholder="Confirmar contraseña"
                  onChangeText={field.onChange}
                  value={field.value}
                  autoComplete="new-password"
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

        {/* <GoogleSignInButton /> */}
        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginTop: 10,
              fontFamily: "Poppins-Regular",
            }}
          >
            {error}
          </p>
        )}
      </form>
    </>
  );
}
