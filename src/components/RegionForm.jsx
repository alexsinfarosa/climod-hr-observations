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
    flexDirection: "column"
    // background: "teal"
  },
  formControl: {
    width: "100%",
    margin: theme.spacing.unit,
    minWidth: 150
  }
});

class RegionForm extends Component {
  render() {
    const { classes } = this.props;
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
            // background: "pink"
          }}
        >
          <FormControl style={{ flex: 1, marginRight: "2rem" }}>
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

          <TextField
            // disabled={this.state.state.length === 0 ? false : true}
            style={{ flex: 1, marginLeft: "2rem" }}
            id="station"
            label="Station ID (e.g. ktol)"
            value={stationID}
            onChange={setStationID}
          />
        </div>

        {/*DATE PICKERS*/}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2rem"
            // background: "teal"
          }}
        >
          <DatePicker
            style={{ flex: 1, marginRight: "2rem" }}
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
            style={{ flex: 1, marginLeft: "2rem" }}
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
        </div>
      </form>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(RegionForm)))
);
