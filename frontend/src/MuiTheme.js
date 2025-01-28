import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff3f6c",
    },
    textColor: {
      main: "#282c3f",
    },
    grey: {
      main: "#696e79",
    },
  },
  typography: {
    fontFamily: `"Lato", sans-serif`,
  },
});

const CustomThemeProvider = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default CustomThemeProvider;
