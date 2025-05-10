import { createTheme } from "@mui/material/styles";
import { brand } from "./palette";

export const makeTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: { mode, ...brand },
    shape: { borderRadius: 8 },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            transition: "transform .12s",
            "&:hover": { transform: "scale(1.03)" },
          },
        },
      },
    },
  });
