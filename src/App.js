import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Typography from "material-ui/Typography";
import { withStyles, Modal } from "material-ui";
import withRoot from "./withRoot";

// components
import TopTab from "./components/TopTab";
import USMap from "./components/USMap";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    marginTop: theme.spacing.unit,
    padding: theme.spacing.unit
  },
  main: {
    width: "100%",
    display: "flex",
    marginTop: theme.spacing.unit * 4,
    flexDirection: "column"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    const { isMapVisible, toggleMap } = this.props.rootStore.paramsStore;
    return (
      <div className={classes.root}>
        {/* Top Header */}
        <div className={classes.row}>
          <Typography variant="display1">Hourly Observations</Typography>
          <Typography variant="display1" align="right">
            <a
              style={{ color: "inherit", textDecoration: "none" }}
              href="http://climod.nrcc.cornell.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CLIMOD
            </a>
          </Typography>
        </div>

        {/* Main content */}
        <main className={classes.main}>
          <TopTab />
        </main>

        {/* US map MODAL */}
        <Modal
          aria-labelledby="US map"
          aria-describedby="US map"
          disableAutoFocus={true}
          open={isMapVisible}
          onClose={toggleMap}
          style={{
            width: "100%",
            height: "50%",
            margin: "0 auto"
          }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <USMap />
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(inject("rootStore")(observer(App))));
