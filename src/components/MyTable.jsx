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
            {data.map(n => {
              return (
                <TableRow key={n.date}>
                  <TableCell style={{ textAlign: "center" }}>
                    {n.date}
                  </TableCell>
                  {icaoElems.map(d => (
                    <TableCell style={{ textAlign: "center" }} key={d.el}>
                      {n[d.el]}
                    </TableCell>
                  ))}
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
