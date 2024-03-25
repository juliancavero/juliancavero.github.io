import { Box, Typography } from "@mui/material";

type TitleCellProps = {
  title: string;
  secondary?: boolean;
};

export const TitleCell = ({ title, secondary = false }: TitleCellProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: secondary ? "primary.light" : "primary.main",
        color: "white",
        padding: 1,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5">{title}</Typography>
    </Box>
  );
};
