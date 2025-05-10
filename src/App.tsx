import { Container, CircularProgress, Alert, Grid, Box } from "@mui/material";
import { useState } from "react";
import { useSkipOptions } from "@/hooks/useSkipOptions";
import SkipCard from "@/component/SkipCard";
import StickyBar from "@/component/StickyBar";
import StepperStatic from "@/component/StepperStatic";
import type { SkipOption } from "./types/SkipOption";

export default function App() {
  const { data, isLoading, isError } = useSkipOptions();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedSkip = data?.find((s) => s.id === selectedId);

  const handleSelect = (skip: SkipOption) => {
    setSelectedId(skip.id);
  };

  return (
    <Container
      maxWidth="lg"
      disableGutters
      sx={{
        pb: { xs: 10, md: 12 },
        px: { xs: 2, sm: 4, md: 4 },
        bgcolor: (theme) =>
          theme.palette.mode === "light" ? theme.palette.grey[50] : "inherit",
      }}
    >
      {" "}
      <StepperStatic />
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 4,
          }}
        >
          <CircularProgress />
        </Box>
      )}{" "}
      {isError && <Alert severity="error">Could not load skips.</Alert>}
      {data && (
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {data.map((skip) => (
            <Grid key={skip.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <SkipCard
                skip={skip}
                selected={skip.id === selectedId}
                onSelect={handleSelect}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <StickyBar
        selected={
          selectedSkip && {
            label: `${selectedSkip.yards}‑yard skip`,
            price: selectedSkip.price,
            restricted: selectedSkip.roadRestriction,
            days: selectedSkip.days,
          }
        }
      />
    </Container>
  );
}
