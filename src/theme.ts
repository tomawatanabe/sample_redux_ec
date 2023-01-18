import { blueGrey, blue, deepOrange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const FLEXIBLE_MIN_WIDTH = 1025;
export const FLEXIBLE_MAX_WIDTH = 1366;

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: deepOrange,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minWidth: `${FLEXIBLE_MIN_WIDTH}px`,
          color: "#333333",
          backgroundColor: blueGrey[50],
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
