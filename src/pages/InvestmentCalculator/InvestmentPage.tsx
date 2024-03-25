import { Grid, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import MainContainer from "../../components/MainContainer";
import { NumberCell } from "../../components/NumberCell";
import { MyOutlinedInput } from "../../components/OutlinedInput";
import { RTypography } from "../../components/RTypography";
import { TitleCell } from "../../components/TitleCell";
import { numberToCurrency } from "../../utils/transformers";
import { changeValue } from "../utils";

export const InvestmentPage = () => {
  const [initialCapital, setInitialCapital] = useState("10000");
  const [monthlyInvestment, setMonthlyInvestment] = useState("100");
  const [interest, setInterest] = useState("5");
  const [term, setTerm] = useState("5");

  const investmentCalculations = useMemo(() => {
    const monthlyInterest = (1 + Number(interest) / 100) ** (1 / 12) - 1;
    const months = Number(term) * 12;
    const nmonthlyInvestment = Number(monthlyInvestment);
    const ninitialCapital = Number(initialCapital);

    let currentValue = Number(initialCapital);
    for (let i = 0; i < months; i++) {
      currentValue = currentValue * (1 + monthlyInterest) + nmonthlyInvestment;
    }

    const interestGained =
      currentValue - ninitialCapital - nmonthlyInvestment * months;
    return {
      finalCapital: currentValue,
      interestGained,
    };
  }, [initialCapital, interest, monthlyInvestment, term]);

  return (
    <MainContainer>
      <h1>Calculadora de inversiones</h1>
      <Grid container spacing={5} alignItems={"flex-start"}>
        <Grid container item xs={12} lg={6} alignItems={"center"} spacing={2}>
          <Grid item xs={12} container alignItems={"center"} spacing={3}>
            <Grid item xs={5}>
              <TitleCell title="Capital inicial" />
            </Grid>
            <Grid item xs={7}>
              <MyOutlinedInput
                value={initialCapital}
                onChange={(e) => changeValue(e, setInitialCapital, 0)}
                endAdornment="€"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container alignItems={"center"} spacing={3}>
            <Grid item xs={5}>
              <TitleCell title="Inversión mensual" secondary />
            </Grid>
            <Grid item xs={7}>
              <MyOutlinedInput
                value={monthlyInvestment}
                onChange={(e) => changeValue(e, setMonthlyInvestment, 0)}
                endAdornment="€"
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
          <Grid item xs={12} container alignItems={"center"} spacing={3}>
            <Grid item xs={5}>
              <TitleCell title="Tipo de interés anual" secondary />
            </Grid>
            <Grid item xs={7}>
              <MyOutlinedInput
                value={interest}
                onChange={(e) => changeValue(e, setInterest)}
                endAdornment={"%"}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container item xs={12} lg={6} alignItems={"center"} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Resultados</Typography>
          </Grid>
          <Grid container item xs={12} alignItems={"center"} spacing={3}>
            <Grid item xs={12} lg={6}>
              <RTypography>Valor final en {term} años</RTypography>
            </Grid>
            <Grid item xs={12} lg={6} justifyContent={"flex-end"} container>
              <NumberCell
                color="darkgreen"
                value={`${numberToCurrency(
                  investmentCalculations.finalCapital
                )}€`}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems={"center"} spacing={3}>
            <Grid item xs={12} lg={6}>
              <RTypography>Ganancias de la inversión</RTypography>
            </Grid>
            <Grid item xs={12} lg={6} justifyContent={"flex-end"} container>
              <NumberCell
                value={`${numberToCurrency(
                  investmentCalculations.interestGained
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
