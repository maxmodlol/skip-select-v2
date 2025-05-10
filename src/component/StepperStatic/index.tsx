// src/component/StepperStatic/index.tsx
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ModeToggle from "../ModeToggle";
import LocationOnIcon from "@mui/icons-material/RoomOutlined";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweepOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShippingOutlined";
import ShieldIcon from "@mui/icons-material/ShieldOutlined";
import EventIcon from "@mui/icons-material/EventOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCardOutlined";

const steps = [
  { label: "Postcode", icon: LocationOnIcon },
  { label: "Waste Type", icon: DeleteSweepIcon },
  { label: "Select Skip", icon: LocalShippingIcon },
  { label: "Permit Check", icon: ShieldIcon },
  { label: "Choose Date", icon: EventIcon },
  { label: "Payment", icon: CreditCardIcon },
];

/* Styled connector (pill) */
const PillConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 22 },
  [`& .${stepConnectorClasses.line}`]: {
    height: 4,
    border: 0,
    borderRadius: 2,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[300],
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line},
    &.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    backgroundColor: theme.palette.primary.main,
  },
}));

/* Custom icon wrapper */
const StepIconRoot = styled("div")<{
  ownerState: { active?: boolean; completed?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: ownerState.completed
    ? theme.palette.primary.main
    : ownerState.active
      ? theme.palette.primary.light
      : theme.palette.action.disabledBackground,
  zIndex: 1,
  color: theme.palette.getContrastText(theme.palette.primary.main),
  width: 36,
  height: 36,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  boxShadow:
    ownerState.active || ownerState.completed
      ? `0 0 0 3px ${theme.palette.primary.main}22`
      : "none",
}));

function StepIconComponent(props: any) {
  const { active, completed, className, icon } = props;
  const Icon = steps[Number(icon) - 1].icon;
  return (
    <StepIconRoot ownerState={{ completed, active }} className={className}>
      <Icon fontSize="small" />
    </StepIconRoot>
  );
}

export default function StepperStatic() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const active = 2;

  return (
    <Box
      sx={{
        pt: 1,
        mb: 6,
        pb: 3,
        px: { xs: 2, md: 4 },
        bgcolor: "background.default",
        borderRadius: 3,
        boxShadow: "0 2px 8px rgb(0 0 0 / 0.25)",
      }}
    >
      {/* ==== Top row: progress indicator + theme toggle ==== */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        {/* Desktop / Tablet: full Stepper */}
        {!isSm && (
          <Stepper
            alternativeLabel
            connector={<PillConnector />}
            activeStep={active}
            sx={{ flex: 1 }}
          >
            {steps.map(({ label }, i) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={StepIconComponent}
                  onClick={() => {
                    if (i < active) window.history.back();
                  }}
                  sx={{
                    cursor: i <= active ? "pointer" : "not-allowed",
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

        {/* Mobile: icon + dot bar */}
        {isSm && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            {steps.map(({ icon: Icon }, i) => (
              <Box
                key={i}
                onClick={() => {
                  if (i < active) window.history.back();
                }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: i <= active ? "pointer" : "not-allowed",
                }}
              >
                <Icon
                  fontSize="small"
                  sx={{
                    color:
                      i === active
                        ? "primary.main"
                        : i < active
                          ? "action.active"
                          : "text.disabled",
                  }}
                />
                <Box
                  sx={{
                    mt: 0.5,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor:
                      i <= active ? "primary.main" : theme.palette.grey[400],
                  }}
                />
              </Box>
            ))}
          </Box>
        )}

        {/* Theme toggle (always visible) */}
        <ModeToggle />
      </Box>

      {/* ==== Section title ==== */}
      <Typography
        variant={isSm ? "h5" : "h4"}
        fontWeight={700}
        mt={isSm ? 0 : 2}
        textAlign="center"
        letterSpacing={-0.5}
      >
        Choose Your Skip Size
      </Typography>
      <Typography
        variant={isSm ? "body2" : "subtitle1"}
        color="text.secondary"
        textAlign="center"
        sx={{ mt: 0.5 }}
      >
        Select the skip size that best suits your needs
      </Typography>
    </Box>
  );
}
