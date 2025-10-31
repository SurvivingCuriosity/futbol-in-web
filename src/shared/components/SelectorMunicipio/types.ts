export interface TownOption extends Town {
  province: string;
}

export interface Town {
  parent_code: string;
  code: string;
  label: string;
}

export interface Province {
  parent_code: string;
  code: string;
  label: string;
  towns: Town[];
}

export interface Region {
  parent_code: string;
  code: string;
  label: string;
  provinces: Province[];
}

export function mapToSections(data: Region[]) {
  return data.flatMap((r) =>
    r.provinces.map((p) => ({
      title: p.label,          // ⬅ encabezado de sección
      data: p.towns,           // ⬅ array de municipios
    })),
  );
}
