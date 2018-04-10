import { decorate, observable, computed, action, when, reaction } from "mobx";
import { states } from "../assets/states";
import axios from "axios";

// fetch
import { fetchCurrentStationHourlyData } from "../utils/fetchData";
// import cleanFetchedData from "../utils/cleanFetchedData";
// import currentModel from "../utils/currentModel";

// utils
import {
  idAdjustment,
  vXDef,
  dailyToHourlyDates,
  elements
} from "../utils/utils";

// date-fns
import { format } from "date-fns";

// const
const url = `${
  window.location.protocol
}//newa2.nrcc.cornell.edu/newaUtil/stateStationList/all`;

export default class ParamsStore {
  constructor() {
    when(() => this.stations.length === 0, () => this.loadStations());
    reaction(
      () => this.asJson,
      () =>
        this.stationID === "" || this.sDate === null
          ? null
          : this.setData(this.params)
    );
    reaction(() => this.asJson, () => console.log(this.asJson));
  }

  isLoading = false;
  isMapVisible = false;
  toggleMap = d => (this.isMapVisible = !this.isMapVisible);

  // states
  stateIDs = Object.keys(states);
  get states() {
    return this.stateIDs.map(id => states[id]);
  }
  // state
  postalCode = "";
  setPostalCode = e => {
    this.postalCode = e.target.value;
    this.isMapVisible = true;
  };
  get state() {
    return this.states.find(state => state.id === this.postalCode);
  }

  // stations
  stations = [];
  setStations = d => (this.stations = d);

  loadStations() {
    this.isLoading = true;
    return axios
      .get(url)
      .then(res => {
        // console.log(res.data.stations);
        this.setStations(res.data.stations);
        this.isLoading = false;
      })
      .catch(err => {
        console.log("Failed to load stations", err);
      });
  }
  // station
  stationID = "";
  setStationID = e => (this.stationID = e.target.value);
  get station() {
    return this.stations.find(station => station.id === this.stationID);
  }
  setStateStationFromMap = station => {
    this.postalCode = station.state;
    this.stationID = station.id;
  };

  // Dates
  sDate = new Date("2018-04-08");
  setStartDate = d => (this.sDate = d);
  eDate = new Date();
  setEndDate = d => (this.eDate = d);

  // asJson
  get asJson() {
    return {
      searchMethod: this.searchMethod,
      icaoElems: this.icaoElems.slice(),
      elems: this.elems,
      state: this.state,
      station: this.station,
      sDate: this.sDate,
      eDate: this.eDate
    };
  }

  // tab selection
  searchMethod = "icao";
  setSearchMethod = (v, e) => (this.searchMethod = e);

  allElements = elements;
  checkElem = e => {
    this.allElements[e.target.value].isSelected = !this.allElements[
      e.target.value
    ].isSelected;
  };
  setUnit = e => {
    this.allElements[e.target.name].defUnit = e.target.value;
  };

  get icaoCheckboxes() {
    return Object.keys(this.allElements)
      .filter(k => this.allElements[k].network.includes("icao"))
      .map(el => this.allElements[el]);
  }

  get icaoElems() {
    return Object.keys(this.allElements)
      .filter(k => this.allElements[k].network.includes("icao"))
      .filter(k => this.allElements[k].isSelected)
      .map(el => this.allElements[el]);
  }
  userElems = Object.values(vXDef.newa);

  get elems() {
    return this.searchMethod === "icao"
      ? this.icaoElems.map(e => e.val)
      : this.userElems.map(e => e.val);
  }

  // parameters to make the call
  get params() {
    const { station, sDate, eDate, elems } = this;
    if (station) {
      return {
        sid: `${idAdjustment(station)} ${station.network}`,
        sdate: format(sDate, "YYYY-MM-DD"),
        edate: format(eDate, "YYYY-MM-DD"),
        elems,
        meta: "tzo"
      };
    }
  }

  data = [];
  tzo;
  setData = async params => {
    this.isLoading = true;
    console.log(this.params);
    // fetching data
    await fetchCurrentStationHourlyData(params).then(res => {
      this.tzo = res.meta.tzo;

      // transform data
      const data = res.data.map(dayArr =>
        dayArr.map(el => (typeof el === "string" ? dailyToHourlyDates(el) : el))
      );
      // console.log(data);

      const keys = ["date", ...Object.keys(vXDef[this.station.network])];

      let results = [];
      data.forEach(day => {
        for (let h = 0; h < 24; h++) {
          let p = {};
          day.forEach((el, e) => {
            p[keys[e]] = el[h];
          });
          results.push(p);
        }
      });

      this.data = results;
      this.isLoading = false;
    });
  };
}

decorate(ParamsStore, {
  isLoading: observable,
  isMapVisible: observable,
  toggleMap: action,
  stateIDs: observable,
  states: computed,
  postalCode: observable,
  setPostalCode: action,
  state: computed,
  stations: observable,
  setStations: action,
  stationID: observable,
  setStationID: action,
  station: computed,
  setStateStationFromMap: action,
  sDate: observable,
  setStartDate: action,
  eDate: observable,
  setEndDate: action,
  asJson: computed,
  searchMethod: observable,
  allElements: observable,
  checkElem: action,
  setUnit: action,
  icaoCheckboxes: computed,
  icaoElems: computed,
  userElems: observable,
  setSearchMethod: action,
  elems: computed,
  params: computed,
  data: observable
});
