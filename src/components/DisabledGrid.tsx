import { Grid } from "@mui/material";
import styled from "styled-components";

const DisabledGrid = styled(Grid)<{ disabled: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

export default DisabledGrid;
