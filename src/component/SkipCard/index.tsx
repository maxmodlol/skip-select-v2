import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import type { SkipCardProps } from "./types";

const SkipCard: React.FC<SkipCardProps> = ({ skip, selected, onSelect }) => {
  const theme = useTheme();
  const restricted = skip.roadRestriction;

  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        bgcolor: theme.palette.mode === "dark" ? "#1A1A1A" : "#FFFDFC",
        borderRadius: 2,
        border: selected
          ? `2px solid ${theme.palette.secondary.main}`
          : `1px solid ${theme.palette.divider}`,
        transition: "transform .12s ease-out, border .12s",
        "&:hover": { transform: "scale(1.03)" },
      }}
    >
      {/* Warning ribbon */}
      {restricted && (
        <Chip
          icon={<WarningAmberIcon fontSize="small" />}
          label="PRIVATE LAND ONLY"
          size="small"
          color="warning"
          sx={{
            position: "absolute",
            top: 10,
            left: -40,
            transform: "rotate(-45deg)",
            px: 2,
            fontWeight: 500,
            zIndex: 2,
          }}
        />
      )}

      {/* Yard badge */}
      <Chip
        label={`${skip.yards} yd³`}
        size="small"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          bgcolor: "primary.main",
          color: "#fff",
          fontWeight: 600,
          zIndex: 2,
        }}
      />

      <CardActionArea onClick={() => onSelect(skip)}>
        {/* Image */}
        <Box
          component="img"
          src={skip.image}
          alt=""
          sx={{
            width: "100%",
            height: { xs: 180, md: 220 },
            objectFit: "cover",
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
          }}
        />

        <CardContent sx={{ px: 2, py: 1.5 }}>
          {/* Yard & price */}
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{
              fontSize: { xs: "0.95rem", md: "1rem" },
              display: "flex",
              justifyContent: "space-between",
              fontVariantNumeric: "tabular-nums",
              mb: 0.5,
            }}
          >
            {skip.yards}&nbsp;yd&nbsp;skip
            <span style={{ color: theme.palette.primary.main }}>
              £{skip.price.toLocaleString()}
            </span>
          </Typography>

          <Typography
            variant="caption"
            sx={{ fontSize: { xs: "0.7rem", md: "0.8rem" } }}
            color="text.secondary"
          >
            {skip.days}&nbsp;day hire period
          </Typography>

          {/* Selected banner */}
          {selected && (
            <Box
              sx={{
                mt: 1,
                py: 0.5,
                textAlign: "center",
                bgcolor: "secondary.main",
                color: theme.palette.getContrastText(
                  theme.palette.secondary.main,
                ),
                borderRadius: 1.5,
                fontWeight: 600,
                fontSize: { xs: "0.65rem", md: "0.75rem" },
              }}
            >
              Selected
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SkipCard;
