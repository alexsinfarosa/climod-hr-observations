import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import withRoot from "../withRoot";

import { FormLabel, FormGroup, FormControlLabel } from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui";
import blue from "material-ui/colors/blue";
import CheckBoxOutlineBlankIcon from "material-ui-icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "material-ui-icons/CheckBox";
import Radio from "material-ui/Radio";
import deepOrange from "material-ui/colors/deepOrange";
import Collapse from "material-ui/transitions/Collapse";
import Switch from "material-ui/Switch";

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
  },
  rowElRadio: {
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
    padding: 0,
    paddingLeft: 8,
    border: `1px solid ${deepOrange[500]}`
  }
});

class CheckBoxes extends Component {
  state = {
    checked: true
  };

  handleChange = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const { classes } = this.props;
    const {
      checkElem,
      elemsListCheckbox,
      setUnit,
      radioButton,
      setRadioButton,
      deselectAllFields,
      areAllFieldsFalse
    } = this.props.rootStore.paramsStore;
    const { checked } = this.state;

    return (
      <Collapse in={checked} collapsedHeight="98px">
        <FormGroup row className={classes.root}>
          <div className={classes.rowEl}>
            <FormControlLabel
              control={
                <Checkbox
                  className={classes.size}
                  icon={
                    <CheckBoxOutlineBlankIcon className={classes.sizeIcon} />
                  }
                  checkedIcon={<CheckBoxIcon className={classes.sizeIcon} />}
                  checked={areAllFieldsFalse}
                  onChange={deselectAllFields}
                  value="deselectAllVariables"
                />
              }
              label="Deselect All Variables"
            />
          </div>
          <div className={classes.rowEl}>
            <FormLabel
              style={{ fontSize: 13, color: "black", paddingLeft: 10 }}
              component="legend"
            >
              {checked ? "Collapse" : "Expand"}
            </FormLabel>
            <Switch
              checked={checked}
              onChange={this.handleChange}
              aria-label="collapse"
            />
          </div>

          <div className={classes.rowEl}>
            <FormLabel
              style={{ fontSize: 13, color: "black", paddingLeft: 10 }}
              component="legend"
            >
              Missing Values Output
            </FormLabel>
            <FormControlLabel
              control={
                <Radio
                  checked={radioButton === "-" ? true : false}
                  onChange={setRadioButton}
                  value="-"
                  name="Dash"
                  aria-label="Dash"
                  label="-"
                />
              }
              label="-"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={radioButton === "-99" ? true : false}
                  onChange={setRadioButton}
                  value="-99"
                  name="-99"
                  aria-label="-99"
                />
              }
              label="-99"
            />
          </div>

          {elemsListCheckbox.map(d => {
            return (
              <div key={d.el} className={classes.rowEl}>
                <FormControlLabel
                  control={
                    <Checkbox
                      className={classes.size}
                      icon={
                        <CheckBoxOutlineBlankIcon
                          className={classes.sizeIcon}
                        />
                      }
                      checkedIcon={
                        <CheckBoxIcon className={classes.sizeIcon} />
                      }
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
                  value={d.defaultUnit}
                  onChange={setUnit}
                  inputProps={{
                    name: d.el,
                    id: d.el
                  }}
                >
                  {Object.keys(d.units).map(label => {
                    return (
                      <MenuItem key={label} value={label}>
                        {label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            );
          })}
        </FormGroup>
      </Collapse>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(CheckBoxes)))
);
