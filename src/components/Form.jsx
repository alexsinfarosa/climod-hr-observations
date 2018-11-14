import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import { DatePicker } from "material-ui-pickers";

// date-fns
import isAfter from "date-fns/isAfter";

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
        {(value === "map" || value === "stationList") && (
          <FormControl style={{ minWidth: 200, width: 200 }}>
            <InputLabel htmlFor="postalCode">Select State</InputLabel>
            <Select
              disabled={isAfter(sDate, eDate)}
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
            disabled={isAfter(sDate, eDate)}
            style={{ minWidth: 220, width: 220 }}
            id="station"
            label="Station ID (e.g. ktol)"
            value={stationID}
            onChange={setStationID}
          />
        )}

        {/*START DATE*/}
        {(value === "map" || value === "user") && (
          <DatePicker
            keyboard
            label="Start Date"
            format="MM/dd/yyyy"
            // handle clearing outside => pass plain array if you are not controlling value outside
            mask={value =>
              value
                ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
                : []
            }
            value={sDate}
            onChange={setStartDate}
            disableOpenOnEnter
            animateYearScrolling={true}
            showTodayButton
            disableFuture
            // onInputChange={e => console.log("Keyboard Input:", e.target.value)}
          />
        )}

        {/*END DATE*/}
        {(value === "map" || value === "user") && (
          <DatePicker
            keyboard
            label="End Date"
            format="MM/dd/yyyy"
            minDate={sDate}
            // handle clearing outside => pass plain array if you are not controlling value outside
            mask={value =>
              value
                ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
                : []
            }
            value={eDate}
            onChange={setEndDate}
            disableOpenOnEnter
            animateYearScrolling={true}
            showTodayButton
            disableFuture
          />
        )}
      </form>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(Form)))
);
