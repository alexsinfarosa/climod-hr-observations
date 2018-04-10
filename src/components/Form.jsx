import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import withRoot from "../withRoot";

import {
  TextField,
  IconButton,
  Icon,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from "material-ui";
import DatePicker from "material-ui-pickers/DatePicker";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 6
  },
  formControl: {
    width: "100%",
    margin: theme.spacing.unit,
    minWidth: 150
  }
});

class Form extends Component {
  render() {
    const { classes, value } = this.props;
    const {
      postalCode,
      setPostalCode,
      states,
      stationID,
      setStationID,
      sDate,
      setStartDate,
      eDate,
      setEndDate
    } = this.props.rootStore.paramsStore;

    return (
      <form className={classes.root} autoComplete="off">
        {value === "icao" && (
          <FormControl style={{ minWidth: 150 }}>
            <InputLabel htmlFor="postalCode">Select State</InputLabel>
            <Select
              // disabled={this.state.station.length === 0 ? false : true}
              value={postalCode}
              onChange={setPostalCode}
              inputProps={{
                name: "postalCode",
                id: "postalCode"
              }}
            >
              {states.map(state => (
                <MenuItem key={state.id} value={state.id}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {value === "user" && (
          <TextField
            // disabled={this.state.state.length === 0 ? false : true}
            style={{ minWidth: 150 }}
            id="station"
            label="Station ID (e.g. ktol)"
            value={stationID}
            onChange={setStationID}
          />
        )}

        {/*DATE PICKERS*/}
        <DatePicker
          style={{ minWidth: 200, width: 200 }}
          label="Start Date"
          value={sDate}
          onChange={setStartDate}
          format="MMMM Do, YYYY"
          disableFuture
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Icon>date_range</Icon>
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <DatePicker
          style={{ minWidth: 200, width: 200 }}
          label="End Date"
          value={eDate}
          onChange={setEndDate}
          format="MMMM Do, YYYY"
          disableFuture
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Icon>date_range</Icon>
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </form>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(Form)))
);
