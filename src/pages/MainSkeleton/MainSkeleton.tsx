import { Box, Grid, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

export const MainSkeleton = () => {
  const navigate = useNavigate();

  const handleMortgageClick = () => {
    navigate("/mortgage");
  };

  const handleInvestClick = () => {
    navigate("/invest");
  };

  return (
    <Grid container>
      <Grid item xs={12} lg={2}>
        <StyledDrawer column fullHeight display={{ xs: "none", lg: "flex" }}>
          <h1>Utils</h1>
          <StyledDrawerItem onClick={handleMortgageClick}>
            Calculadora de hipotecas
          </StyledDrawerItem>
          <StyledDrawerItem onClick={handleInvestClick}>
            Calculadora de inversiones
          </StyledDrawerItem>
        </StyledDrawer>
        <StyledDrawer
          display={{ xs: "flex", lg: "none" }}
          alignItems={"center"}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", marginRight: 3 }}>
            Utils
          </Typography>
          <StyledDrawerItem onClick={handleMortgageClick}>
            Calculadora de hipotecas
          </StyledDrawerItem>
          <StyledDrawerItem onClick={handleInvestClick}>
            Calculadora de inversiones
          </StyledDrawerItem>
        </StyledDrawer>
      </Grid>
      <Grid item xs={12} lg={10}>
        <StyledMainContent>
          <Outlet />
        </StyledMainContent>
      </Grid>
    </Grid>
  );
};

const StyledDrawer = styled(Box)<{ fullHeight?: boolean; column?: boolean }>`
  background-color: #c3b2de;
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  padding: 1rem;
  gap: 0.5rem;
  height: ${({ fullHeight }) => (fullHeight ? "100vh" : "auto")};
`;

const StyledMainContent = styled(Box)`
  padding: 1rem;
`;

const StyledDrawerItem = styled(Box)`
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
  border: 1px solid #987bc5;
  &:hover {
    background-color: #dda0dd;
  }
`;
