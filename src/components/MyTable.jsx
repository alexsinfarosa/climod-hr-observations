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
    overflowX: "auto",
    height: 680
  },
  table: {
    minWidth: 700,
    overflow: "auto"
  },
  head: {
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
    textAlign: "center"
  },
  stripe: {
    background: theme.palette.primary.fifty
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
                <TableCell className={classes.head}>Date</TableCell>
                {selectedElems.map(d => (
                  <TableCell className={classes.head} key={d.el}>
                    <div>{d.label}</div>
                    <div style={{ fontSize: "0.7rem", marginTop: 5 }}>
                      ({d.defaultUnit})
                    </div>
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
