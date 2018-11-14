import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/KeyboardBackspace";

// components
import MyTablePrintView from "./MyTablePrintView";
import TableHeaderPrintView from "./TableHeaderPrintView";

const styles = theme => ({
  root: {}
});

class PrintView extends Component {
  render() {
    const { togglePrintView } = this.props.rootStore.paramsStore;
    return (
      <div>
        <IconButton onClick={togglePrintView}>
          <BackIcon />
        </IconButton>
        <TableHeaderPrintView />
        <Divider />
        <MyTablePrintView />
      </div>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(PrintView)))
);
