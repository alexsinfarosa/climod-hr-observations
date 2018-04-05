import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import withRoot from "../withRoot";

import { FormGroup, FormControlLabel } from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";
import CheckBoxOutlineBlankIcon from "material-ui-icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "material-ui-icons/CheckBox";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  row: {
    width: 260,
    display: "flex",
    flexDirection: "column",
    border: "1px solid #DCDCDC",
    borderRadius: 5,
    padding: 10
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
    return (
      <FormGroup row className={classes.root}>
        <div className={classes.row}>
          <div className={classes.rowEl}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  // onChange={this.handleChange("checkedA")}
                  value="temperature"
                  color="primary"
                />
              }
              label="Temperature"
            />
            <Select
              autoWidth={true}
              style={{ marginBottom: 12 }}
              value={"F"}
              // onChange={this.handleChange}
              inputProps={{
                name: "temperature",
                id: "temperature"
              }}
            >
              <MenuItem value={"F˚"}>F˚</MenuItem>
              <MenuItem value={"C˚"}>C˚</MenuItem>
            </Select>
          </div>

          <div className={classes.rowEl}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  // onChange={this.handleChange("checkedB")}
                  value="dewpoint"
                  color="primary"
                />
              }
              label="Dewpoint"
            />
            <Select
              autoWidth={true}
              style={{ marginBottom: 12 }}
              value={"F"}
              // onChange={this.handleChange}
              inputProps={{
                name: "temperature",
                id: "temperature"
              }}
            >
              <MenuItem value={"F˚"}>F˚</MenuItem>
              <MenuItem value={"C˚"}>C˚</MenuItem>
            </Select>
          </div>

          <div className={classes.rowEl}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  // onChange={this.handleChange("checkedB")}
                  value="relativeHumidity"
                  color="primary"
                />
              }
              label="Relative Humidity"
            />
            <Select
              autoWidth={true}
              style={{ marginBottom: 12 }}
              value={"F"}
              // onChange={this.handleChange}
              inputProps={{
                name: "temperature",
                id: "temperature"
              }}
            >
              <MenuItem value={"F˚"}>F˚</MenuItem>
              <MenuItem value={"C˚"}>C˚</MenuItem>
            </Select>
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.rowEl}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  // onChange={this.handleChange("checkedB")}
                  value="WindDirection"
                  color="primary"
                />
              }
              label="Wind Direction"
            />
            <Select
              autoWidth={true}
              style={{ marginBottom: 12 }}
              value={"F"}
              // onChange={this.handleChange}
              inputProps={{
                name: "temperature",
                id: "temperature"
              }}
            >
              <MenuItem value={"F˚"}>F˚</MenuItem>
              <MenuItem value={"C˚"}>C˚</MenuItem>
            </Select>
          </div>

          <div className={classes.rowEl}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  // onChange={this.handleChange("checkedB")}
                  value="windSpeed"
                  color="primary"
                />
              }
              label="Wind Speed"
            />
            <Select
              autoWidth={true}
              style={{ marginBottom: 12 }}
              value={"F"}
              // onChange={this.handleChange}
              inputProps={{
                name: "temperature",
                id: "temperature"
              }}
            >
              <MenuItem value={"F˚"}>F˚</MenuItem>
              <MenuItem value={"C˚"}>C˚</MenuItem>
            </Select>
          </div>

          <div className={classes.rowEl}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  // onChange={this.handleChange("checkedB")}
                  value="windGusts"
                  color="primary"
                />
              }
              label="Wind Gusts"
            />
            <Select
              autoWidth={true}
              style={{ marginBottom: 12 }}
              value={"F"}
              // onChange={this.handleChange}
              inputProps={{
                name: "temperature",
                id: "temperature"
              }}
            >
              <MenuItem value={"F˚"}>F˚</MenuItem>
              <MenuItem value={"C˚"}>C˚</MenuItem>
            </Select>
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.rowEl}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  // onChange={this.handleChange("checkedB")}
                  value="totalSkyCover"
                  color="primary"
                />
              }
              label="Total Sky Cover"
            />
            <Select
              autoWidth={true}
              style={{ marginBottom: 12 }}
              value={"F"}
              // onChange={this.handleChange}
              inputProps={{
                name: "temperature",
                id: "temperature"
              }}
            >
              <MenuItem value={"F˚"}>F˚</MenuItem>
              <MenuItem value={"C˚"}>C˚</MenuItem>
            </Select>
          </div>

          <div className={classes.rowEl}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  // onChange={this.handleChange("checkedB")}
                  value="visibility"
                  color="primary"
                />
              }
              label="Visibility"
            />
            <Select
              autoWidth={true}
              style={{ marginBottom: 12 }}
              value={"F"}
              // onChange={this.handleChange}
              inputProps={{
                name: "temperature",
                id: "temperature"
              }}
            >
              <MenuItem value={"F˚"}>F˚</MenuItem>
              <MenuItem value={"C˚"}>C˚</MenuItem>
            </Select>
          </div>

          <div className={classes.rowEl}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  // onChange={this.handleChange("checkedB")}
                  value="weatherConditions"
                  color="primary"
                />
              }
              label="Weather Conditions"
            />
            <Select
              autoWidth={true}
              style={{ marginBottom: 12 }}
              value={"F"}
              // onChange={this.handleChange}
              inputProps={{
                name: "temperature",
                id: "temperature"
              }}
            >
              <MenuItem value={"F˚"}>F˚</MenuItem>
              <MenuItem value={"C˚"}>C˚</MenuItem>
            </Select>
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.rowEl}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  // onChange={this.handleChange("checkedB")}
                  value="hourlyPrecipitation"
                  color="primary"
                />
              }
              label="Hourly Precipitation"
            />
            <Select
              autoWidth={true}
              style={{ marginBottom: 12 }}
              value={"F"}
              // onChange={this.handleChange}
              inputProps={{
                name: "temperature",
                id: "temperature"
              }}
            >
              <MenuItem value={"F˚"}>F˚</MenuItem>
              <MenuItem value={"C˚"}>C˚</MenuItem>
            </Select>
          </div>

          <div className={classes.rowEl}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  // onChange={this.handleChange("checkedB")}
                  value="stationPressure"
                  color="primary"
                />
              }
              label="Station Pressure"
            />
            <Select
              autoWidth={true}
              style={{ marginBottom: 12 }}
              value={"F"}
              // onChange={this.handleChange}
              inputProps={{
                name: "temperature",
                id: "temperature"
              }}
            >
              <MenuItem value={"F˚"}>F˚</MenuItem>
              <MenuItem value={"C˚"}>C˚</MenuItem>
            </Select>
          </div>

          <div className={classes.rowEl}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  // onChange={this.handleChange("checkedB")}
                  value="ceilingHeight"
                  color="primary"
                />
              }
              label="Ceiling Height"
            />
            <Select
              autoWidth={true}
              style={{ marginBottom: 12 }}
              value={"F"}
              // onChange={this.handleChange}
              inputProps={{
                name: "temperature",
                id: "temperature"
              }}
            >
              <MenuItem value={"F˚"}>F˚</MenuItem>
              <MenuItem value={"C˚"}>C˚</MenuItem>
            </Select>
          </div>
        </div>
      </FormGroup>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(CheckBoxes)))
);
