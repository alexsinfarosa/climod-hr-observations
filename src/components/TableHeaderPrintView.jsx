import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui";
import withRoot from "../withRoot";
import Typography from "material-ui/Typography";
import { format } from "date-fns";

const styles = theme => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
  },
  key: {
    color: "#2E3145",
    fontWeight: 700
  },
  column: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

class TableHeaderPrintView extends Component {
  render() {
    const { classes } = this.props;
    const { station, sDate, eDate } = this.props.rootStore.paramsStore;

    return (
      <div className={classes.root}>
        <div style={{ width: 200 }}>
          <div className={classes.column}>
            <Typography variant="body1">
              <span className={classes.key}>Latitude:</span>
            </Typography>
            <Typography variant="body1">{station.lat}˚</Typography>
          </div>

          <div className={classes.column}>
            <Typography variant="body1">
              <span className={classes.key}>Longitude:</span>
            </Typography>
            <Typography variant="body1">{station.lon}˚</Typography>
          </div>

          <div className={classes.column}>
            <Typography variant="body1">
              <span className={classes.key}>Elevation:</span>
            </Typography>
            <Typography variant="body1">{station.elev} ft</Typography>
          </div>
        </div>

        <div>
          <Typography variant="body1">
            <span className={classes.key}>Station:</span> {station.name}
          </Typography>

          <Typography variant="body1">
            <span className={classes.key}>State:</span> {station.state}
          </Typography>

          <Typography variant="body1">
            <span className={classes.key}>ID:</span> {station.id}
          </Typography>
        </div>

        <div style={{ width: 200 }}>
          <div className={classes.column}>
            <Typography variant="body1">
              <span className={classes.key}>CLIMOD:</span>
            </Typography>
            <Typography variant="body1">Hourly Observations</Typography>
          </div>

          <div className={classes.column}>
            <Typography variant="body1">
              <span className={classes.key}>Start Date:</span>
            </Typography>
            <Typography variant="body1">
              {format(sDate, "MMMM Do, YYYY")}
            </Typography>
          </div>

          <div className={classes.column}>
            <Typography variant="body1">
              <span className={classes.key}>End Date:</span>
            </Typography>
            <Typography variant="body1">
              {format(eDate, "MMMM Do, YYYY")}
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(TableHeaderPrintView)))
);
