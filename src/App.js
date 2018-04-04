import React, { Component } from "react";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui";

// components
import RegionForm from "./RegionForm";

const styles = {
  root: { width: "100%", maxWidth: 1200, margin: "0 auto" },
  main: { display: "flex", marginTop: "2rem" },
  left: { flex: 1 },
  right: { flex: 2 }
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

        <main className={classes.main}>
          <section className={classes.left}>
            <RegionForm />
          </section>
          <section className={classes.right}>
            {" "}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
            molestiae voluptates repellendus, quaerat at deserunt sunt corrupti
            placeat tempore optio pariatur deleniti atque! Quod, reiciendis
            impedit ea similique reprehenderit sed!
          </section>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);
