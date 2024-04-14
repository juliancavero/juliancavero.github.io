import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { checkSanitasResults } from "../../fetch/checkSanitasResults";

export const APICheckPage = () => {
  const [isAvailable, setIsAvailable] = useState<null | boolean>(null);

  const { data, isLoading, isError } = useQuery("sanitas", {
    queryFn: checkSanitasResults,
    refetchInterval: 60000,
  });

  useEffect(() => {
    if (data) {
      setIsAvailable(data === "hay citas");
    }
  }, [data]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>Comprobación de cita en SANITAS</h1>
        <Typography variant="h4">
          {!isLoading && !isError && (
            <>
              {isAvailable
                ? "¡Hay citas disponibles!"
                : "No hay citas disponibles por ahora."}
            </>
          )}
          {isLoading && "Cargando..."}
          {isError && "Ha ocurrido un error."}
        </Typography>
      </Grid>
    </Grid>
  );
};
