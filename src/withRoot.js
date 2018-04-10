import React from "react";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import blue from "material-ui/colors/blue";
import teal from "material-ui/colors/teal";
// import Reboot from "material-ui/Reboot";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      veryLight: blue[50],
      light: blue[300],
      main: blue[500],
      dark: blue[700]
    },
    secondary: {
      veryLight: teal[50],
      light: teal[300],
      main: teal[500],
      dark: teal[700]
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
