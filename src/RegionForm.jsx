import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl, FormHelperText } from "material-ui/Form";
import Select from "material-ui/Select";

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
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class RegionForm extends Component {
  state = {
    region: "",
    state: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
      </form>
    );
  }
}

export default withStyles(styles)(RegionForm);
