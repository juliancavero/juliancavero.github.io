import {
  Grid,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DisabledGrid from "../../components/DisabledGrid";
import MainContainer from "../../components/MainContainer";
import { NumberCell } from "../../components/NumberCell";
import { MyOutlinedInput } from "../../components/OutlinedInput";
import { RTypography } from "../../components/RTypography";
import { TitleCell } from "../../components/TitleCell";
//import { getEuribor } from "../../fetch/getEuribor";
import { numberToCurrency } from "../../utils/transformers";
import { changeValue } from "../utils";

type MortgageType = "fixed" | "variable";

export const MortgagePage = () => {
  const [totalPrice, setTotalPrice] = useState("100000");
  const [financingPercentage, setFinancingPercentage] = useState("80");
  const [term, setTerm] = useState("30");
  const [interest, setInterest] = useState("3");
  const [type, setType] = useState<MortgageType>("fixed");
  const [euribor, setEuribor] = useState("0");
  const [differential, setDifferential] = useState("1");

  const navigate = useNavigate();

  /* const fetchEuribor = async () => {
    const response = await getEuribor();
    setEuribor(String(response));
  }; */

  const typeChange = (
    _: React.MouseEvent<HTMLElement>,
    value: MortgageType
  ) => {
    setType(value);
  };

  useEffect(() => {
    navigate("/check-sanitas");
  }, []);

  const mortgageCalculations = useMemo(() => {
    const ntotalPrice = Number(totalPrice);
    const nfinancingPercentage = Number(financingPercentage);
    const nterm = Number(term);
    const ninterest = Number(interest) / 1200;
    const neuribor = Number(euribor) / 100;
    const ndifferential = Number(differential) / 100;

    const financedPrice = ntotalPrice * (nfinancingPercentage / 100);
    const monthlyInterest =
      type === "fixed" ? ninterest : neuribor + ndifferential;
    const months = nterm * 12;
    const monthlyPayment =
      monthlyInterest > 0
        ? (financedPrice * monthlyInterest * (1 + monthlyInterest) ** months) /
          ((1 + monthlyInterest) ** months - 1)
        : financedPrice / months;
    const finalPrice = monthlyPayment * months + (ntotalPrice - financedPrice);
    const mortgageCost = finalPrice - ntotalPrice;
    return {
      monthlyPayment,
      finalPrice,
      mortgageCost,
    };
  }, [
    differential,
    euribor,
    financingPercentage,
    interest,
    term,
    totalPrice,
    type,
  ]);

  return (
    <MainContainer>
      <h1>Calculadora de hipotecas</h1>
      <Grid container spacing={5} alignItems={"flex-start"}>
        <Grid container item xs={12} lg={6} alignItems={"center"} spacing={2}>
          <Grid item xs={12} container alignItems={"center"} spacing={3}>
            <Grid item xs={5}>
              <TitleCell title="Precio del inmueble" />
            </Grid>
            <Grid item xs={7}>
              <MyOutlinedInput
                value={totalPrice}
                onChange={(e) => changeValue(e, setTotalPrice, 0)}
                endAdornment="€"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={3} alignItems={"center"}>
            <Grid item xs={5}>
              <TitleCell title="Porcentaje de financiación" secondary />
            </Grid>
            <Grid item xs={4}>
              <Slider
                value={Number(financingPercentage)}
                onChange={(_, value) =>
                  setFinancingPercentage(value as unknown as string)
                }
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
                onChange={(e) => changeValue(e, setFinancingPercentage, 0)}
                endAdornment={"%"}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container alignItems={"center"} spacing={3}>
            <Grid item xs={5}>
              <TitleCell title="Plazo" />
            </Grid>
            <Grid item xs={7}>
              <MyOutlinedInput
                value={term}
                onChange={(e) => changeValue(e, setTerm, 1)}
                endAdornment={"años"}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={3}>
            <DisabledGrid item xs={5} disabled={type === "variable"}>
              <TitleCell title="Tipo de interés anual" secondary />
            </DisabledGrid>
            <Grid item xs={7}>
              <MyOutlinedInput
                disabled={type === "variable"}
                value={interest}
                onChange={(e) => changeValue(e, setInterest)}
                endAdornment={"%"}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              fullWidth
              value={type}
              exclusive
              onChange={typeChange}
            >
              <ToggleButton value={"fixed"}>fijo</ToggleButton>
              <ToggleButton value={"variable"}>variable</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {type === "variable" && (
            <Grid item xs={12} container spacing={2} alignItems={"center"}>
              <Grid item xs={5}>
                <RTypography>Euribor</RTypography>
              </Grid>
              <Grid item xs={7}>
                <MyOutlinedInput
                  value={euribor}
                  onChange={(e) => changeValue(e, setEuribor)}
                  endAdornment={"%"}
                />
              </Grid>
              <Grid item xs={5}>
                <RTypography>Diferencial</RTypography>
              </Grid>
              <Grid item xs={7}>
                <MyOutlinedInput
                  value={differential}
                  onChange={(e) => changeValue(e, setDifferential)}
                  endAdornment={"%"}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid container item xs={12} lg={6} alignItems={"center"} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Resultados</Typography>
          </Grid>
          <Grid container item xs={12} alignItems={"center"}>
            <Grid item xs={12} lg={6}>
              <RTypography>Cuota mensual</RTypography>
            </Grid>
            <Grid item xs={12} lg={6} justifyContent={"flex-end"} container>
              <NumberCell
                value={`${numberToCurrency(
                  mortgageCalculations.monthlyPayment
                )}€`}
                color="darkgreen"
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems={"center"}>
            <Grid item xs={12} lg={6}>
              <RTypography>Coste total del inmueble</RTypography>
            </Grid>
            <Grid item xs={12} lg={6} justifyContent={"flex-end"} container>
              <NumberCell
                value={`${numberToCurrency(mortgageCalculations.finalPrice)}€`}
                color="green"
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems={"center"}>
            <Grid item xs={12} lg={6}>
              <RTypography>Coste de la hipoteca</RTypography>
            </Grid>
            <Grid item xs={12} lg={6} justifyContent={"flex-end"} container>
              <NumberCell
                value={`${numberToCurrency(
                  mortgageCalculations.mortgageCost
                )}€`}
                color="green"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainContainer>
  );
};
