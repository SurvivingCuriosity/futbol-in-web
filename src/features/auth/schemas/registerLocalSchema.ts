import { registerSchema } from "futbol-in-core/schemas";
import { z } from "zod";

export const registerLocalSchema = registerSchema.extend({
  confirmPassword: z.string('Debes repetir tu contraseña').min(1, "Debes confirmar la contraseña")
})
.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  }
);

export type RegisterLocalBody = z.infer<typeof registerLocalSchema>;