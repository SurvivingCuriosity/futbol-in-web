import ConfirmarEmailPage from "@/src/screens/ConfirmarEmailPage/ConfirmarEmailPage";
import { Suspense } from "react";

export default function ConfirmarEmailRoute() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <ConfirmarEmailPage />
    </Suspense>
  );
}
