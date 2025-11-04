export const incidenciaKeys = {
  root: ["incidencias"] as const,
  allAdmin: () => [...incidenciaKeys.root, "all"] as const,
  spot: (spotId: string) => [...incidenciaKeys.root, "spot", spotId] as const,
};
