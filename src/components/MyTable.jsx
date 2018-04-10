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
    minWidth: 700,
    overflowX: "auto"
  },
  stripe: {
    background: theme.palette.primary.veryLight
  }
});

class MyTable extends Component {
  render() {
    const { classes } = this.props;
    const { data, icaoElems } = this.props.rootStore.paramsStore;

    return (
      <div className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Date</TableCell>
              {icaoElems.map(d => (
                <TableCell style={{ textAlign: "center" }} key={d.el}>
                  {d.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((hour, i) => (
              <TableRow
                hover
                key={hour.date}
                className={i % 2 === 0 ? classes.stripe : null}
              >
                <TableCell style={{ textAlign: "center" }}>
                  {hour.date}
                </TableCell>
                {icaoElems.map(d => (
                  <TableCell style={{ textAlign: "center" }} key={d.el}>
                    {hour[d.el]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(MyTable)))
);
