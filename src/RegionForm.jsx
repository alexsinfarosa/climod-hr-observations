import React, { Component, Fragment } from "react";
import { withStyles } from "material-ui/styles";
import { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";
import Radio, { RadioGroup } from "material-ui/Radio";
import { FormLabel, FormControl, FormControlLabel } from "material-ui/Form";
import { IconButton, Icon, InputAdornment } from "material-ui";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui-pickers/DatePicker";

// data
import { stateSelection } from "./assets/stateSelection";

// REGIONS
const regions = Object.keys(stateSelection);
const regionList = regions.map(region => (
  <MenuItem key={region} value={region}>
    {region}
  </MenuItem>
));

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
    // background: "teal"
  },
  radio: {
    display: "flex",
    flexDirection: "row",
    margin: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 130
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 130
  }
});

class RegionForm extends Component {
  state = {
    region: "",
    state: "",
    searchMethod: "stations",
    stations: "",
    startDate: new Date(),
    endDate: new Date()
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTextChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleStartDateChange = date => {
    this.setState({ startDate: date });
  };

  handleEndDateChange = date => {
    this.setState({ endDate: date });
  };

  render() {
    const { classes } = this.props;

    // STATE LIST
    const states = stateSelection[this.state.region]
      ? stateSelection[this.state.region]
      : [];
    const stateList = states.map(state => (
      <MenuItem key={state} value={state}>
        {state}
      </MenuItem>
    ));

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl component="fieldset" className={classes.radio}>
          <FormLabel component="legend">Search Method</FormLabel>
          <RadioGroup
            aria-label="searchMethod"
            name="searchMethod"
            // className={classes.group}
            value={this.state.searchMethod}
            onChange={this.handleChange}
          >
            <FormControlLabel
              value="stations"
              control={<Radio />}
              label="Stations by state"
            />
            <FormControlLabel
              value="user"
              control={<Radio />}
              label="User defined list"
            />
          </RadioGroup>
        </FormControl>

        {this.state.searchMethod === "stations" ? (
          <Fragment>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="region">Region</InputLabel>
              <Select
                value={this.state.region}
                onChange={this.handleChange}
                inputProps={{
                  name: "region",
                  id: "region"
                }}
              >
                {regionList}
              </Select>
            </FormControl>

            <FormControl
              className={classes.formControl}
              disabled={stateSelection[this.state.region] ? false : true}
            >
              <InputLabel htmlFor="state">State</InputLabel>
              <Select
                value={this.state.state}
                onChange={this.handleChange}
                inputProps={{
                  name: "state",
                  id: "state"
                }}
              >
                {stateList}
              </Select>
            </FormControl>
          </Fragment>
        ) : (
          <TextField
            id="stations"
            label="Station List (e.g. KTOL,KITH)"
            className={classes.textField}
            value={this.state.stations}
            onChange={this.handleTextChange("stations")}
            margin="normal"
          />
        )}

        {/*DATE PICKERS*/}
        <div
          className={classes.formControl}
          style={{ display: "flex", marginTop: "2rem" }}
        >
          <DatePicker
            style={{ marginRight: "4rem" }}
            label="Start Date"
            value={this.state.startDate}
            onChange={this.handleStartDateChange}
            format="MMMM Do, YYYY"
            disableFuture
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton style={{ marginRight: -8 }}>
                    <Icon>date_range</Icon>
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <DatePicker
            label="End Date"
            value={this.state.endDate}
            onChange={this.handleEndDateChange}
            format="MMMM Do, YYYY"
            disableFuture
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton style={{ marginRight: -8 }}>
                    <Icon>date_range</Icon>
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(RegionForm);
