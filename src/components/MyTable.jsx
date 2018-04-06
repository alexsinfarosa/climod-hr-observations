import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui";
import withRoot from "../withRoot";

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
// import Paper from "material-ui/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class MyTable extends Component {
  render() {
    const { classes } = this.props;
    const { data } = this.props.rootStore.paramsStore;

    return (
      <div className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell numeric>Temperature</TableCell>
              <TableCell numeric>Relative Humidity</TableCell>
              <TableCell numeric>Dew Point</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.date}>
                  <TableCell>{n.date}</TableCell>
                  <TableCell numeric>{n.temperature}</TableCell>
                  <TableCell numeric>{n.relativeHumidity}</TableCell>
                  <TableCell numeric>{n.dewpoint}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(MyTable)))
);
