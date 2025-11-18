import { UsuarioEnRanking } from "futbol-in-core/types";
import TablaRankingUsuarios from "./TablaRankingUsuarios";
import TablaRankingUsuariosMovil from "./TablaRankingUsuariosMovil";
import TarjetaUsuarioTopRanking from "./TarjetaUsuarioTopRanking";

export const RankingPage = ({ usuarios }: { usuarios: UsuarioEnRanking[] }) => {
  return (
    <div className="w-full p-3 pt-0 max-w-4xl mx-auto">
      <h1 className="text-3xl font-black text-primary sticky top-0 bg-neutral-950 z-10 p-3">Ranking</h1>
      <ul className="w-full mt-2 flex flex-col md:grid grid-cols-3 gap-2 mb-1">
        {usuarios.slice(0, 3).map((user) => (
          <div
            key={user.id}
          >
            <TarjetaUsuarioTopRanking usuario={user} />
          </div>
        ))}
      </ul>
      <span className="hidden md:block">
        <TablaRankingUsuarios users={usuarios.slice(3, usuarios.length)} />
      </span>

      <span className="block md:hidden">
        <TablaRankingUsuariosMovil users={usuarios.slice(3, usuarios.length)} />
      </span>
    </div>
  );
};
