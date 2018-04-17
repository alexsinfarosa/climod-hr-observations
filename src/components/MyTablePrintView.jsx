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
    const { data, selectedElems, isLoading } = this.props.rootStore.paramsStore;
    return (
      <div className={classes.root}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 680
            }}
          >
            loading...
          </div>
        ) : (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>Date</TableCell>
                {selectedElems.map(d => (
                  <TableCell style={{ textAlign: "center" }} key={d.el}>
                    <div>{d.label}</div>
                    <div style={{ fontSize: "0.7rem", marginTop: 5 }}>
                      ({d.defUnit})
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody style={{ overflow: "auto" }}>
              {data.map((hour, i) => (
                <TableRow hover key={hour.date} style={{ height: 10 }}>
                  <TableCell style={{ textAlign: "center" }}>
                    {hour.date}
                  </TableCell>
                  {selectedElems.map(d => (
                    <TableCell style={{ textAlign: "center" }} key={d.el}>
                      {hour[d.el]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(MyTable)))
);
