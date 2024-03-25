import { Box } from "@mui/material";
import { BigRTypography } from "./RTypography";

type NumberCellType = {
  value: string;
  color?: "green" | "darkgreen";
};

export const NumberCell = ({ value, color }: NumberCellType) => {
  return (
    <Box
      sx={{
        borderRadius: "5px",
        padding: "0.5rem",
        boxShadow: "3px 4px 5px 0px rgba(0,0,0,0.75)",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-end",
        backgroundColor:
          color === "green"
            ? "#8fbc8f"
            : color === "darkgreen"
            ? "#acb79b"
            : "red",
      }}
    >
      <BigRTypography>{value}</BigRTypography>
    </Box>
  );
};
