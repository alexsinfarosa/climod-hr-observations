import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import withRoot from "../withRoot";

import { FormGroup, FormControlLabel } from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui";
import blue from "material-ui/colors/blue";
import CheckBoxOutlineBlankIcon from "material-ui-icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "material-ui-icons/CheckBox";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    // border: "1px solid #eee",
    borderRadius: 10,
    background: theme.palette.primary.one100
  },
  row: {
    width: 260,
    display: "flex",
    flexDirection: "column"
  },
  rowEl: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 280,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit * 4,
    background: "white",
    borderRadius: 10,
    padding: 2
  },
  checked: {
    color: blue[500]
  },
  size: {
    width: 45,
    height: 45
  },
  sizeIcon: {
    fontSize: 13
  }
});

class CheckBoxes extends Component {
  render() {
    const { classes } = this.props;
    const {
      checkElem,
      icaoCheckboxes,
      setUnit
    } = this.props.rootStore.paramsStore;

    return (
      <FormGroup row className={classes.root}>
        {icaoCheckboxes.map(d => (
          <div key={d.el} className={classes.rowEl}>
            <FormControlLabel
              control={
                <Checkbox
                  className={classes.size}
                  icon={
                    <CheckBoxOutlineBlankIcon className={classes.sizeIcon} />
                  }
                  checkedIcon={<CheckBoxIcon className={classes.sizeIcon} />}
                  checked={d.isSelected}
                  onChange={checkElem}
                  value={d.el}
                />
              }
              label={d.label}
            />
            <Select
              disableUnderline={true}
              style={{ fontSize: 13 }}
              autoWidth={true}
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
