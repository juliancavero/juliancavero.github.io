import {
  Container,
  Grid,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { getEuribor } from "../../fetch/getEuribor";
import { MyOutlinedInput } from "./components/OutlinedInput";

type MortgageType = "fixed" | "variable";

export const MortgagePage = () => {
  const [totalPrice, setTotalPrice] = useState(100000);
  const [financingPercentage, setFinancingPercentage] = useState(80);
  const [term, setTerm] = useState(30);
  const [interest, setInterest] = useState(3);
  const [type, setType] = useState<MortgageType>("fixed");
  const [euribor, setEuribor] = useState(0);
  const [differential, setDifferential] = useState(1);
  const financedPrice = totalPrice * (financingPercentage / 100);

  const fetchEuribor = async () => {
    const response = await getEuribor();
    setEuribor(response);
  };

  useEffect(() => {
    fetchEuribor();
  }, []);

  const mortgageCalculations = useMemo(() => {
    const monthlyInterest =
      type === "fixed" ? interest / 1200 : (euribor + differential) / 1200;
    const months = term * 12;
    const monthlyPayment =
      monthlyInterest > 0
        ? (financedPrice * monthlyInterest * (1 + monthlyInterest) ** months) /
          ((1 + monthlyInterest) ** months - 1)
        : financedPrice / months;
    const finalPrice = monthlyPayment * months + (totalPrice - financedPrice);
    const mortgageCost = finalPrice - totalPrice;
    return {
      monthlyPayment,
      finalPrice,
      mortgageCost,
    };
  }, [differential, euribor, financedPrice, interest, term, totalPrice, type]);

  return (
    <StyledContainer>
      <h1>Calculadora de hipotecas</h1>
      <Grid container spacing={2} alignItems={"flex-start"}>
        <Grid container item xs={12} sm={6} alignItems={"center"} spacing={2}>
          <Grid item xs={12} container alignItems={"center"}>
            <Grid item xs={5}>
              <Typography variant="h5">Precio del inmueble</Typography>
            </Grid>
            <Grid item xs={7}>
              <MyOutlinedInput
                value={totalPrice}
                onChange={(e) => setTotalPrice(Number(e.target.value))}
                endAdornment={"€"}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={3} alignItems={"center"}>
            <Grid item xs={5}>
              <Typography variant="h5">Porcentaje de financiación</Typography>
            </Grid>
            <Grid item xs={4}>
              <Slider
                value={financingPercentage}
                onChange={(e, value) => setFinancingPercentage(value as number)}
                step={5}
                marks={[
                  { value: 0, label: "0%" },
                  { value: 100, label: "100%" },
                ]}
                valueLabelDisplay="on"
              />
            </Grid>
            <Grid item xs={3}>
              <MyOutlinedInput
                value={financingPercentage}
                onChange={(e) => setFinancingPercentage(Number(e.target.value))}
                endAdornment={"%"}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container alignItems={"center"}>
            <Grid item xs={5}>
              <Typography variant="h5">Plazo</Typography>
            </Grid>
            <Grid item xs={7}>
              <MyOutlinedInput
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                endAdornment={"años"}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container>
            <DisabledGrid item xs={5} disabled={type === "variable"}>
              <Typography variant="h5">Tipo de interés anual</Typography>
            </DisabledGrid>
            <Grid item xs={7}>
              <MyOutlinedInput
                disabled={type === "variable"}
                value={interest}
                onChange={(e) => setInterest(Number(e.target.value))}
                endAdornment={"%"}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              fullWidth
              value={type}
              exclusive
              onChange={(e, value) => setType(value)}
            >
              <ToggleButton value={"fixed"}>fijo</ToggleButton>
              <ToggleButton value={"variable"}>variable</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {type === "variable" && (
            <Grid item xs={12} container spacing={2} alignItems={"center"}>
              <Grid item xs={5}>
                <Typography variant="h5">Euribor</Typography>
              </Grid>
              <Grid item xs={7}>
                <MyOutlinedInput
                  value={euribor}
                  onChange={(e) => setEuribor(Number(e.target.value))}
                  endAdornment={"%"}
                />
              </Grid>
              <Grid item xs={5}>
                <Typography variant="h5">Diferencial</Typography>
              </Grid>
              <Grid item xs={7}>
                <MyOutlinedInput
                  value={differential}
                  onChange={(e) => setDifferential(Number(e.target.value))}
                  endAdornment={"%"}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid container item xs={12} sm={6} alignItems={"center"} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Resultados</Typography>
          </Grid>
          <Grid container item xs={12} alignItems={"center"}>
            <Grid item xs={6}>
              <Typography variant="h4">Cuota mensual</Typography>
            </Grid>
            <Grid item xs={6} justifyContent={"flex-end"} container>
              <Typography variant="h3">
                {numberToCurrency(mortgageCalculations.monthlyPayment)}€
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems={"center"}>
            <Grid item xs={6}>
              <Typography variant="h5">Coste total del inmueble</Typography>
            </Grid>
            <Grid item xs={6} justifyContent={"flex-end"} container>
              <Typography variant="h4">
                {numberToCurrency(mortgageCalculations.finalPrice)}€
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems={"center"}>
            <Grid item xs={6}>
              <Typography variant="h5">Coste de la hipoteca</Typography>
            </Grid>
            <Grid item xs={6} justifyContent={"flex-end"} container>
              <Typography variant="h4">
                {numberToCurrency(mortgageCalculations.mortgageCost)}€
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

const numberToCurrency = (number: number) => {
  return Number(number.toFixed(2)).toLocaleString("de-DE");
};

const StyledContainer = styled(Container)`
  input[type="number"] {
    text-align: right;
  }
`;

const DisabledGrid = styled(Grid)<{ disabled: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;
