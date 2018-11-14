import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Material ui picker
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

// Mobx
import { Provider } from "mobx-react";
import RootStore from "./stores/RootStore";
const fetcher = url => window.fetch(url).then(response => response.json());
const rootStore = new RootStore(fetcher);

ReactDOM.render(
  <Provider rootStore={rootStore}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <App />
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById("root")
);
