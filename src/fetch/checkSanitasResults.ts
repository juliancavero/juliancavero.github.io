import axios from "axios";
import moment from "moment";

type Response = {
  automaticSearchEnabled: boolean;
  availableslots: {
    order: number;
    isSingleDoctor: boolean;
    centers: {
      id: string;
      name: string;
      address: string;
    }[];
  };
  commonSlotData: unknown;
  fieldsToTranslate: string[];
  openSearchEnabled: boolean;
};

const URL =
  "https://api.sanitas.es/is-clientes-citas/api/v3/clientes/5219228/specialties/316/reasons/130.1/slots";

export const checkSanitasResults = async (token: string) => {
  const response = await axios.get(URL, {
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      startDate: moment().format("YYYY-MM-DDThh:mm:ss.000"),
      modality: 0,
      isClosedSearch: true,
      provinceId: 30,
      doctorId: 42886,
      centerId: "14607-142371",
    },
  });
  if (response.status !== 200) {
    throw new Error("Error en la petición");
  }
  const data: Response = await response.data;
  if (data && data.availableslots) {
    return "hay citas";
  }
  return "no hay citas";
};
