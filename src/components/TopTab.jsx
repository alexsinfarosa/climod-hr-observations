import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";

import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import MapIcon from "@material-ui/icons/Place";
import UserIcon from "@material-ui/icons/Person";
import ViewList from "@material-ui/icons/ViewList";

// components
import CheckBoxes from "./CheckBoxes";
import Form from "./Form";
import TableHeader from "./TableHeader";
import MyTable from "./MyTable";

// icao stations
import { icaoStations } from "../assets/icaoStationList";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 3,
    // border: "1px solid #eee",
    // borderRadius: 20,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  stationID: {
    color: "#2E3145",
    fontWeight: 700,
    cursor: "pointer",
    "&:hover": { color: theme.palette.secondary.main }
  }
});

class TopTab extends Component {
  render() {
    const { classes } = this.props;
    const {
      station,
      postalCode,
      searchMethod,
      setSearchMethod,
      setStationIDFromList
    } = this.props.rootStore.paramsStore;

    const stationList = icaoStations.filter(stn => stn.state === postalCode);

    return (
      <div className={classes.root}>
        <Tabs
          value={searchMethod}
          onChange={setSearchMethod}
          fullWidth
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab value="map" icon={<MapIcon />} label="MAP" />
          <Tab value="user" icon={<UserIcon />} label="USER" />
          <Tab value="stationList" icon={<ViewList />} label="Station List" />
        </Tabs>
        {searchMethod === "map" && (
          <div>
            <Form value="map" />
            {postalCode && (
              <Fragment>
                <CheckBoxes />
                {station && <TableHeader />}
                <MyTable />
              </Fragment>
            )}
          </div>
        )}
        {searchMethod === "user" && (
          <Fragment>
            <Form value="user" />
            {station && (
              <Fragment>
                <CheckBoxes />
                {station && <TableHeader />}
                <MyTable />
              </Fragment>
            )}
          </Fragment>
        )}

        {searchMethod === "stationList" && (
          <Fragment>
            <Form value="stationList" />
            <div
              style={{
                display: "flex",
                height: 900,
                flexDirection: "column",
                alignItems: "center",
                flexWrap: "wrap",
                marginTop: 32
              }}
            >
              {stationList.map(stn => (
                <li
                  style={{
                    listStyleType: "none",
                    color: "#757575",
                    marginBottom: 5,
                    fontSize: "0.8rem"
                  }}
                  key={stn.id}
                >
                  <span
                    className={classes.stationID}
                    onClick={() => setStationIDFromList(stn.id)}
                  >
                    {" "}
                    {stn.id}
                  </span>
                  - {stn.name}
                </li>
              ))}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(TopTab)))
);
