import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";

import { withStyles } from "material-ui";
import withRoot from "../withRoot";

import Tabs, { Tab } from "material-ui/Tabs";
import MapIcon from "material-ui-icons/Place";
import UserIcon from "material-ui-icons/Person";

// components
import CheckBoxes from "./CheckBoxes";
import Form from "./Form";
import TableHeader from "./TableHeader";
import MyTable from "./MyTable";

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
      data
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
            <CheckBoxes />
            <Form value="map" />
            {postalCode && (
              <Fragment>
                {station && <TableHeader />}
                {data.length !== 0 && <MyTable />}
              </Fragment>
            )}
          </div>
        )}
        {searchMethod === "user" && (
          <Fragment>
            <CheckBoxes />
            <Form value="user" />
            {station && (
              <Fragment>
                {station && <TableHeader />}
                {data.length !== 0 && <MyTable />}
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
