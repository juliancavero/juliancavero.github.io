import { Box, Grid, Typography, styled } from "@mui/material";
import { Outlet } from "react-router-dom";

export const MainSkeleton = () => {
  return (
    <Grid container>
      <Grid item xs={12} lg={2}>
        <StyledDrawer
          column={true}
          fullHeight
          display={{ xs: "none", lg: "flex" }}
        >
          <h1>Quack</h1>
        </StyledDrawer>
        <StyledDrawer
          display={{ xs: "flex", lg: "none" }}
          alignItems={"center"}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", marginRight: 3 }}>
            Quack
          </Typography>
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

const StyledDrawer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "fullHeight" && prop !== "column",
})<{ fullHeight?: boolean; column?: boolean }>`
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
