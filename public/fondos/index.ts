import { TipoFutbolin } from "futbol-in-core/enum";

export const fondosFutbolinesSinDeg: Record<TipoFutbolin, any> = {
  [TipoFutbolin.DESCONOCIDO]: require("./desconocido_deg.jpg"),
  [TipoFutbolin.INFINITY]: require("./infinity.jpg"),
  [TipoFutbolin.TECNO]: require("./desconocido_deg.jpg"),
  [TipoFutbolin.MADERA]: require("./madera.jpg"),
  [TipoFutbolin.PRESAS_EVO]: require("./presas_evo.jpg"),
  [TipoFutbolin.PRESAS]: require("./presas_evo.jpg"),
  [TipoFutbolin.TSUNAMI]: require("./tsunami.jpg"),
  [TipoFutbolin.REM]: require("./desconocido_deg.jpg"),
  [TipoFutbolin.CUALQUIERA]: require("./desconocido_deg.jpg"),
};

