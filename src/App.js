import React, { Component } from "react";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui";

// components
import RegionForm from "./RegionForm";

const styles = {
  root: { width: "100%", maxWidth: 1200, margin: "0 auto" }
};

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="display3" gutterBottom align="right">
          <a
            style={{ color: "inherit", textDecoration: "none" }}
            href="http://climod.nrcc.cornell.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CLIMOD
          </a>
        </Typography>

        <Typography variant="display1" gutterBottom>
          Hourly Observations
        </Typography>

        <RegionForm />
      </div>
    );
  }
}

export default withStyles(styles)(App);
