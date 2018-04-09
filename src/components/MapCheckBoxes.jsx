import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import withRoot from "../withRoot";

import { FormGroup, FormControlLabel } from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  row: {
    width: 260,
    display: "flex",
    flexDirection: "column"
  },
  rowEl: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
class CheckBoxes extends Component {
  render() {
    const { classes } = this.props;
    const { checkElem, icaoElems, setUnit } = this.props.rootStore.paramsStore;

    return (
      <FormGroup row className={classes.root}>
        {icaoElems.map(d => (
          <div key={d.el} className={classes.rowEl}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={d.isSelected}
                  onChange={checkElem}
                  value={d.el}
                  color="primary"
                />
              }
              label={d.label}
            />
            <Select
              autoWidth={true}
              // style={{ marginBottom: 12 }}
              value={d.defUnit}
              onChange={setUnit}
              inputProps={{
                name: d.el,
                id: d.el
              }}
            >
              {d.units.map(u => (
                <MenuItem key={u} value={u}>
                  {u}
                </MenuItem>
              ))}
            </Select>
          </div>
        ))}
      </FormGroup>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(CheckBoxes)))
);
