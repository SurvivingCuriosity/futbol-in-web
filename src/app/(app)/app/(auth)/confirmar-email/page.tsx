import ConfirmarEmailPage from "@/src/features/auth/components/ConfirmarEmailPage";
import { Suspense } from "react";

export default function ConfirmarEmailRoute() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <ConfirmarEmailPage />
    </Suspense>
  );
}
