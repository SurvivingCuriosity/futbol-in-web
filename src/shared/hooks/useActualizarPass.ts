import { useAuth } from "@/src/client/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface CambiarPasswordBody {
  currentPassword: string;
  nuevaPassword: string;
  confirmNuevaPassword: string;
}

export function useCambiarPassword() {
  const { token } = useAuth();

  const mutation = useMutation({
    mutationFn: async (payload: CambiarPasswordBody) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/cambiar-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.message || "Error al cambiar contraseña");

      return data;
    },
    onSuccess: () => {
      console.log("onSuccess");
      toast.success("Contraseña cambiada correctamente");
    },
    onError: (err) => {
      console.log("onError");
      toast.error(err instanceof Error ? err.message : "Error inesperado");
    },
  });

  return mutation;
}
