import { FullUser } from "@/src/shared/hooks/useGetFullUser";
import { GoBackWrapper } from "@/src/shared/components/GoBackWrapper";
import { MainInfo } from "../MiPerfilPage/components/MainInfo";
import { MisFutbolines } from "../MiPerfilPage/components/MisFutbolines";

export const PerfilPublicoPage = ({ user }: { user: FullUser }) => {
  if (!user) return <p>Ups...</p>;

  return (
    <GoBackWrapper>
      <div className="p-3 flex flex-col gap-2 h-full max-w-5xl mx-auto w-full">
        <MainInfo user={user.user} imagen={user.imagen || ""} />
        <MisFutbolines futbolines={user.futbolines} />
      </div>
    </GoBackWrapper>
  );
};
