import ChipPosicion from "@/src/shared/components/ChipPosicion";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserDTO } from "futbol-in-core/types";
import Image from "next/image";

export const MainInfo = ({
  user,
  imagen,
}: {
  user: UserDTO;
  imagen?: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {imagen && (
          <Image
            src={imagen || "/default_user.svg"}
            className="size-22 rounded-full md:size-32"
            alt="Imagen de usuario"
            width={100}
            height={100}
          />
        )}
        <div className="space-y-1">

        <p className="text-xl md:text-4xl font-bold text-primary">{user.name}</p>
        <p className="text-sm md:text-lg text-neutral-500">{user.nombre}</p>
        {user.posicion && <ChipPosicion posicion={user.posicion} />}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-neutral-500">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <p className="text-sm md:text-lg text-neutral-500">{user.ciudad?.split(",")[1]}</p>
        </div>
        <p className="text-sm md:text-lg">Miembro desde {new Date(user?.createdAt as unknown as string).toLocaleDateString()}</p>
      </div>
    </div>
  );
};
