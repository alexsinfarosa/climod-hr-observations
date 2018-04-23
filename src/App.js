import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import Typography from "material-ui/Typography";
import { withStyles, Modal } from "material-ui";
import withRoot from "./withRoot";

// components
import TopTab from "./components/TopTab";
import USMap from "./components/USMap";
import PrintView from "./components/PrintView";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    // margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
    maxWidth: 2000,
    margin: "0 auto"
  },
  main: {
    width: "100%",
    display: "flex",
    marginTop: theme.spacing.unit * 4,
    flexDirection: "column"
  },
  row: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    const {
      isMapVisible,
      toggleMap,
      isPrintViewVisible
    } = this.props.rootStore.paramsStore;
    return (
      <Fragment>
        {!isPrintViewVisible ? (
          <div className={classes.root}>
            {/* Top Header */}
            <div className={classes.row}>
              <Typography
                style={{ color: "#2D3047", fontWeight: 700 }}
                variant="display1"
              >
                Hourly Observations
              </Typography>
              <Typography variant="display1">
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
        ) : (
          <div className={classes.root}>
            <PrintView />
          </div>
        )}
      </Fragment>
    );
  }
}

export default withRoot(withStyles(styles)(inject("rootStore")(observer(App))));
