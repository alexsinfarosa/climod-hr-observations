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
  flatten
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
  sDate = null;
  setStartDate = d => (this.sDate = d);
  eDate = new Date();
  setEndDate = d => (this.eDate = d);

  // asJson
  get asJson() {
    return {
      state: this.state,
      station: this.station,
      sDate: this.sDate,
      eDate: this.eDate
    };
  }

  // parameters to make the call
  get params() {
    const { station, sDate, eDate } = this;
    if (station) {
      return {
        sid: `${idAdjustment(station)} ${station.network}`,
        sdate: format(sDate, "YYYY-MM-DD"),
        edate: format(eDate, "YYYY-MM-DD"),
        elems: Object.values(vXDef[this.station.network]),
        meta: "tzo"
      };
    }
  }

  data = [];
  tzo;
  setData = async params => {
    this.isLoading = true;

    // fetching data
    await fetchCurrentStationHourlyData(params).then(res => {
      this.tzo = res.meta.tzo;

      // transform data
      console.log(res.data);
      const dates = res.data.map(arr => arr[0]);
      const hrDates = dailyToHourlyDates(dates);

      const temperature = flatten(res.data.map(arr => arr[1]));
      const relativeHumidity = flatten(res.data.map(arr => arr[2]));
      const dewpoint = flatten(res.data.map(arr => arr[2]));

      this.data = hrDates.map((hr, i) => {
        return {
          date: hr,
          temperature: temperature[i],
          relativeHumidity: relativeHumidity[i],
          dewpoint: dewpoint[i]
        };
      });
    });

    this.isLoading = false;
    console.log(this.data.slice());
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
  params: computed,
  data: observable
});
