// StickyBar/index.tsx
import {
  Box,
  Button,
  Chip,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import type { SelectedInfo } from "./types";

export default function StickyBar({ selected }: { selected?: SelectedInfo }) {
  if (!selected) return null;

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // <600 px
  const ctaText = isXs ? "Skip" : "Continue";

  /* marquee styles (only phones) */
  const marqueeStyles = isXs
    ? {
        display: "inline-block",
        whiteSpace: "nowrap",
        animation: "scroll 12s linear infinite",
        "@keyframes scroll": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(-100%)" },
        },
      }
    : {};

  const handleBack = () => window.history.back();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { xs: 12, sm: 16 },
        left: "50%",
        transform: "translateX(-50%)",
        bgcolor: "background.paper",
        borderRadius: 12,
        boxShadow: "0 6px 16px rgb(0 0 0 / .25)",
        px: 2,
        py: 1,
        width: { xs: "calc(100% - 24px)", sm: 640 },
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        zIndex: 1400,
      }}
    >
      {/* back */}
      <IconButton size="small" onClick={handleBack}>
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>

      {/* headline wrapper (clipped) */}
      <Box sx={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <Box sx={marqueeStyles}>
          <Typography component="span" fontWeight={600}>
            {selected.label}
          </Typography>
          <Typography component="span">
            &nbsp;·&nbsp;{selected.days} days&nbsp;·&nbsp;
          </Typography>
          <Typography
            component="span"
            fontWeight={700}
            color="primary.main"
            sx={{ fontVariantNumeric: "tabular-nums" }}
          >
            £{selected.price.toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* warning chip – always visible */}
      {selected.restricted && !isXs && (
        <Chip
          icon={<WarningAmberIcon fontSize="small" />}
          label="PRIVATE LAND ONLY"
          size="small"
          color="warning"
          sx={{ flexShrink: 0, fontWeight: 700 }}
        />
      )}

      {/* continue */}
      <Button
        variant="contained"
        color="primary"
        endIcon={<ChevronRightRoundedIcon />}
        sx={{
          minWidth: { xs: 100, sm: 120 },
          fontWeight: 600,
          borderRadius: 6,
          px: { xs: 1, sm: 2.5 },
        }}
      >
        {ctaText}
      </Button>
    </Box>
  );
}
