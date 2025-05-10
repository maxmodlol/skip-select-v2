import { createContext, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { makeTheme } from "./index";

export const ColorModeContext = createContext({ toggle: () => {} });

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      toggle: () => setMode((m) => (m === "light" ? "dark" : "light")),
    }),
    [],
  );

  const theme = useMemo(() => makeTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
