import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import withRoot from "../withRoot";

const styles = theme => ({
  root: {
    display: "flex"
  }
});
class CheckBoxes extends Component {
  render() {
    return <div>check</div>;
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(CheckBoxes)))
);
