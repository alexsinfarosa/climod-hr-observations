import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Typography from "material-ui/Typography";
import { withStyles, Modal } from "material-ui";
import withRoot from "./withRoot";

// components
import RegionForm from "./components/RegionForm";
import USMap from "./components/USMap";
import CheckBoxes from "./components/CheckBoxes";

const styles = {
  root: { width: "100%", maxWidth: 1200, margin: "0 auto", padding: "1rem" },
  main: {
    width: "100%",
    display: "flex",
    marginTop: "2rem",
    flexDirection: "column"
  },
  left: { flex: 1, marginRight: "1rem" },
  right: { flex: 2 }
};

class App extends Component {
  render() {
    const { classes } = this.props;
    const {
      isMapVisible,
      toggleMap,
      station
    } = this.props.rootStore.paramsStore;
    return (
      <div className={classes.root}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography variant="display2" gutterBottom>
            Hourly Observations
          </Typography>

          <Typography variant="display2" gutterBottom align="right">
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

        <main className={classes.main}>
          <section>
            <RegionForm />
          </section>
          <section style={{ marginTop: "2rem" }}>
            <CheckBoxes />
          </section>
          <section style={{ marginTop: "2rem" }}>
            <Typography variant="headline" gutterBottom align="center">
              {station ? `${station.name}, ${station.id}` : ""}
            </Typography>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
            molestiae voluptates repellendus, quaerat at deserunt sunt corrupti
            placeat tempore optio pariatur deleniti atque! Quod, reiciendis
            impedit ea similique reprehenderit sed!
          </section>
        </main>

        {/* US map */}
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
