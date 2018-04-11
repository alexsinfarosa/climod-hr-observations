import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";

import { withStyles } from "material-ui";
import withRoot from "../withRoot";

import Tabs, { Tab } from "material-ui/Tabs";
import MapIcon from "material-ui-icons/Place";
import UserIcon from "material-ui-icons/Person";
import ViewList from "material-ui-icons/ViewList";

// components
import CheckBoxes from "./CheckBoxes";
import Form from "./Form";
import TableHeader from "./TableHeader";
import MyTable from "./MyTable";
// import { lifecycle } from "recompose";

// icao stations
import { icaoStations } from "../assets/icaoStationList";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 3,
    // border: "1px solid #eee",
    // borderRadius: 20,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
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
      data,
      isLoading
    } = this.props.rootStore.paramsStore;

    const stationList = icaoStations.filter(stn => stn.state === postalCode);

    return (
      <div className={classes.root}>
        <Tabs
          value={searchMethod}
          onChange={setSearchMethod}
          fullWidth
          centered
          indicatorColor="secondary"
          textColor="secondary"
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
                flexWrap: "wrap"
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
                  {stn.name}
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
