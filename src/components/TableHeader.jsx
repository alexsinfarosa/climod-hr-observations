import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui";
import withRoot from "../withRoot";
import Typography from "material-ui/Typography";
import { CSVLink } from "react-csv";
import DownloadIcon from "material-ui-icons/FileDownload";
import PrintIcon from "material-ui-icons/Print";
import IconButton from "material-ui/IconButton";

const styles = theme => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 4
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
  }
});

class TableHeader extends Component {
  render() {
    const { classes } = this.props;
    const {
      station,
      CSVData,
      togglePrintView
    } = this.props.rootStore.paramsStore;

    return (
      <div className={classes.root}>
        <Typography variant="caption">
          <div>{`Network: ${station.network.toUpperCase()}`}</div>
          <div> {`Latitude: ${station.lat}˚`}</div>
          <div> {`Longitude: ${station.lon}˚`}</div>
          <div>{`Elevation: ${station.elev} ft`}</div>
        </Typography>

        <Typography
          variant="headline"
          style={{ color: "#2D3047" }}
          className={classes.center}
        >
          {station.name}, {station.state}
          <small
            style={{
              fontSize: "1rem",
              letterSpacing: 1,
              color: "#2D3047",
              marginLeft: 5
            }}
          >
            ({station.id})
          </small>
        </Typography>

        {/*<Typography variant="caption">
          <div> {`Latitude: ${station.lat}˚`}</div>
          <div> {`Longitude: ${station.lon}˚`}</div>
          </Typography>*/}

        <Typography variant="caption">
          <CSVLink
            className={classes.csvLink}
            data={CSVData.slice()}
            filename={"hourly-observations.csv"}
            target="_self"
          >
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </CSVLink>

          <IconButton onClick={togglePrintView}>
            <PrintIcon />
          </IconButton>
        </Typography>
      </div>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(TableHeader)))
);
