import { AuthProvider, Posicion, UserRole, UserStatus } from "futbol-in-core/enum";
import { UserDTO } from "futbol-in-core/types";

export function createUserDTO(overrides:Partial<UserDTO> = {}): UserDTO {
  return {
    id: "1",
    email: "test@test.com",
    name: "Test",
    role: [UserRole.USER],
    status: UserStatus.DONE,
    imagen: "",
    ciudad: "X",
    nombre: "Test",
    posicion: Posicion.DELANTERO,
    provider: AuthProvider.CREDENTIALS,
    createdAt: new Date(),
    ...overrides
  };
}
