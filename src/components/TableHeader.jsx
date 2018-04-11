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
    alignItems: "center",
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 4
  }
});

class TableHeader extends Component {
  render() {
    const { classes } = this.props;
    const { station } = this.props.rootStore.paramsStore;

    return (
      <div className={classes.root}>
        <Typography variant="caption">
          <div>{`Elevation: ${station.elev} ft`}</div>
          <div>{`Network: ${station.network.toUpperCase()}`}</div>
        </Typography>

        <Typography variant="headline" style={{ color: "#2D3047" }}>
          {station.name}, {station.state} -{" "}
          <small
            style={{ fontSize: "1.2rem", letterSpacing: 1, color: "#2D3047" }}
          >
            ({station.id})
          </small>
        </Typography>

        <Typography variant="caption">
          <div> {`Latitude: ${station.lat}˚`}</div>
          <div> {`Longitude: ${station.lon}˚`}</div>
        </Typography>
      </div>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(TableHeader)))
);
