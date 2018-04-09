import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";

import { withStyles } from "material-ui";
import withRoot from "../withRoot";

import Tabs, { Tab } from "material-ui/Tabs";
import MapIcon from "material-ui-icons/Place";
import UserIcon from "material-ui-icons/Person";
import Typography from "material-ui/Typography";

// components
import MapCheckBoxes from "./MapCheckBoxes";
import UserCheckBoxes from "./UserCheckBoxes";
import Form from "./Form";
// import MyTable from "./MyTable";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 3,
    border: "1px solid #eee",
    borderRadius: 20,
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
      setSearchMethod
    } = this.props.rootStore.paramsStore;
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
        </Tabs>
        {searchMethod === "map" && (
          <div>
            <MapCheckBoxes />
            <Form value="map" />
            {postalCode && (
              <Fragment>
                <Typography variant="headline" gutterBottom align="center">
                  {station ? `${station.name}, ${station.id}` : ""}
                </Typography>
                {/*<MyTable />*/}
              </Fragment>
            )}
          </div>
        )}
        {searchMethod === "user" && (
          <Fragment>
            <UserCheckBoxes />
            <Form value="user" />
            {postalCode && (
              <Fragment>
                <Typography variant="headline" gutterBottom align="center">
                  {station ? `${station.name}, ${station.id}` : ""}
                </Typography>
                {/*<MyTable />*/}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(TopTab)))
);
