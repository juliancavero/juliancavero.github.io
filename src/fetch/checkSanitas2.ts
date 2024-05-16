import axios from "axios";
import moment from "moment";

type Response = {
  estado: string;
  throwing: any;
  fieldsToTranslate: string[];
  result?: any[];
};

const URL =
  "https://api.sanitas.es/is-clientes-citas/api/v3/clientes/5219228/especialidades/316/prestaciones/sc14f3a48d192b69/doctores/L7JdEpLQN4LBsvRe6dBg/huecos";

export const checkSanitas2 = async (token: string) => {
  const response = await axios.get(URL, {
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      nifDoctor: "46313378A",
      fechaInicio: moment().format("YYYY-MM-DDThh:mm:ss.000"),
      "province.value": "Murcia",
    },
  });
  if (response.status !== 200) {
    throw new Error("Error en la petición");
  }
  const data: Response = await response.data;
  if (data && data.result && data.result.length > 0) {
    return "hay citas";
  }
  return "no hay citas";
};
