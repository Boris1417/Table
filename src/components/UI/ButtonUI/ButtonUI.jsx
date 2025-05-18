import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function ButtonUI({ children }) {
  return (
    <Stack
      spacing={2}
      direction="row"
      style={{ height: "56px", marginBottom: "-8px" }}
    >
      <Button variant="outlined" size="small">
        {children}
      </Button>
    </Stack>
  );
}
