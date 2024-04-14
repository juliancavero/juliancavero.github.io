import { Box, Grid, styled } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { checkSanitasResults } from "../../fetch/checkSanitasResults";
import { getSanitasToken } from "../../fetch/getSanitasToken";
import { TokenContext, TokenContextType } from "../../utils/TokenContext";

type APICheckPageProps = {
  token: string;
  retryFn: () => void;
};

export const APICheckPage = ({ token, retryFn }: APICheckPageProps) => {
  const [isAvailable, setIsAvailable] = useState<null | boolean>(null);

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

  useEffect(() => {
    if (data) {
      setIsAvailable(data === "hay citas");
    }
  }, [data]);

  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={12}>
        <h1>Comprobación de cita en SANITAS</h1>
      </Grid>
      <Grid item xs={6}>
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
