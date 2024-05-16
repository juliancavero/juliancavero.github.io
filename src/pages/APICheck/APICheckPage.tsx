import { Box, Grid, Typography, styled } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { checkSanitas2 } from "../../fetch/checkSanitas2";
import { checkSanitasResults } from "../../fetch/checkSanitasResults";
import { getSanitasToken } from "../../fetch/getSanitasToken";
import { TokenContext, TokenContextType } from "../../utils/TokenContext";

type APICheckPageProps = {
  token: string;
  retryFn: () => void;
};

export const APICheckPage = ({ token, retryFn }: APICheckPageProps) => {
  const [isAvailable, setIsAvailable] = useState<null | boolean>(null);
  const [isAvailable2, setIsAvailable2] = useState<null | boolean>(null);

  const { data, isLoading, isError, isFetching } = useQuery("sanitas", {
    queryFn: () => checkSanitasResults(token),
    refetchInterval: 600000,
    staleTime: 600000,
    retry: false,
    refetchOnWindowFocus: false,
    onError: () => {
      retryFn();
    },
  });

  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
    isFetching: isFetching2,
  } = useQuery("sanitas2", {
    queryFn: () => checkSanitas2(token),
    refetchInterval: 600000,
    staleTime: 600000,
    retry: false,
    refetchOnWindowFocus: false,
    onError: () => {
      retryFn();
    },
  });

  useEffect(() => {
    if (data) {
      setIsAvailable(data === "hay citas");
    }
  }, [data]);

  useEffect(() => {
    if (data2) {
      setIsAvailable2(data2 === "hay citas");
    }
  }, [data2]);

  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={12}>
        <h1>Comprobación de cita en SANITAS</h1>
      </Grid>
      <Grid item xs={12} container spacing={3}>
        <Grid
          item
          xs={6}
          container
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant="h5">API VIEJA</Typography>
          <StyledBox
            sta={
              isLoading || isFetching
                ? "loading"
                : isError
                ? "error"
                : data === "hay citas"
                ? "available"
                : "notAvailable"
            }
          >
            {(isLoading || isFetching) && "Cargando..."}
            {isError && "Ha ocurrido un error."}
            {!isLoading && !isError && (
              <>
                {isAvailable
                  ? "¡Hay citas disponibles!"
                  : "No hay citas disponibles por ahora."}
              </>
            )}
          </StyledBox>
        </Grid>
        <Grid
          item
          xs={6}
          container
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant="h5">API NUEVA</Typography>
          <StyledBox
            sta={
              isLoading2 || isFetching2
                ? "loading"
                : isError2
                ? "error"
                : data2 === "hay citas"
                ? "available"
                : "notAvailable"
            }
          >
            {(isLoading2 || isFetching2) && "Cargando..."}
            {isError2 && "Ha ocurrido un error."}
            {!isLoading2 && !isError2 && (
              <>
                {isAvailable2
                  ? "¡Hay citas disponibles!"
                  : "No hay citas disponibles por ahora."}
              </>
            )}
          </StyledBox>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const APICheckWrapper = () => {
  const tokenCTX = useContext<TokenContextType | null>(TokenContext);

  const getNewToken = async () => {
    const newToken = await getSanitasToken();
    if (newToken) {
      tokenCTX?.setToken(newToken);
    }
  };
  const getNewTokenCB = useCallback(getNewToken, []);

  useEffect(() => {
    if (!tokenCTX?.token) {
      getNewTokenCB();
    }
  }, [getNewTokenCB, tokenCTX]);

  return (
    <>
      {tokenCTX?.token && (
        <APICheckPage token={tokenCTX.token} retryFn={getNewToken} />
      )}
    </>
  );
};

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "sta",
})<{ sta: "loading" | "available" | "notAvailable" | "error" }>`
  font-size: 20px;
  font-weight: bold;
  background-color: ${({ sta }) =>
    sta === "loading"
      ? "lightgrey"
      : sta === "available"
      ? "lightgreen"
      : sta === "notAvailable"
      ? "lightcoral"
      : sta === "error"
      ? "lightcoral"
      : "white"};
  padding: 5rem 2rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
