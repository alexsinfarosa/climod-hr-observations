import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui";
import withRoot from "../withRoot";
import Typography from "material-ui/Typography";

const styles = theme => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

class TableHeader extends Component {
  render() {
    const { classes } = this.props;
    const { station } = this.props.rootStore.paramsStore;
    console.log(station);
    return (
      <div className={classes.root}>
        <Typography variant="caption" gutterBottom align="center">
          {`Elev: ${station.elev} ft`}
        </Typography>

        <Typography variant="display1" gutterBottom align="center">
          {station.name},{" "}
          <small style={{ color: "#757575", letterSpacing: 1 }}>
            ({station.id})
          </small>
        </Typography>

        <Typography variant="caption" gutterBottom align="center">
          {`Lat: ${station.lat}˚ - Lon: ${station.lon}˚`}
        </Typography>
      </div>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(TableHeader)))
);
