import React from "react";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import amber from "material-ui/colors/amber";
import deepOrange from "material-ui/colors/deepOrange";
// import Reboot from "material-ui/Reboot";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      fifty: amber[50],
      one100: amber[100],
      light: amber[300],
      main: amber[500],
      dark: amber[700]
    },
    secondary: {
      fifty: deepOrange[50],
      one100: deepOrange[100],
      light: deepOrange[300],
      main: deepOrange[500],
      dark: deepOrange[700]
    }
  }
});

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
        {/*<Reboot />*/}
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
