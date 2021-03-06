import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 750
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
                  <TableCell
                    style={{ textAlign: "center", whiteSpace: "nowrap" }}
                    key={d.el}
                  >
                    <div>{d.label}</div>
                    <div style={{ fontSize: "0.7rem", marginTop: 5 }}>
                      ({d.defaultUnit})
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody style={{ overflow: "auto" }}>
              {data.map((hour, i) => (
                <TableRow
                  hover
                  key={hour.date}
                  style={{ height: 10, whiteSpace: "nowrap" }}
                >
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
