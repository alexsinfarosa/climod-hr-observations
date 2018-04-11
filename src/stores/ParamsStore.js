import { decorate, observable, computed, action, when, reaction } from "mobx";
import { states } from "../assets/states";
import axios from "axios";

// fetch
import { fetchCurrentStationHourlyData } from "../utils/fetchData";

// icao stations
import { icaoStations } from "../assets/icaoStationList";

// utils
import { idAdjustment, dailyToHourlyDates, elements } from "../utils/utils";

// date-fns
import { format } from "date-fns";

// const
const url = `${
  window.location.protocol
}//newa2.nrcc.cornell.edu/newaUtil/stateStationList/all`;

export default class ParamsStore {
  constructor() {
    when(
      () => this.data.length === 0 && this.searchMethod === "map",
      () => this.setIcaoStations()
    );

    reaction(
      () => this.asJson,
      () =>
        this.station === undefined || this.sDate === null
          ? null
          : this.setData(this.params)
    );
    reaction(() => this.asJson, () => console.log(this.asJson));
    reaction(() => this.searchMethod === "map", () => this.setIcaoStations());
    reaction(() => this.searchMethod === "user", () => this.loadStations());
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
  setIcaoStations = () => (this.stations = icaoStations);

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
    const { stationID, stations } = this;
    let station;
    const stnIDUpper = stationID.toUpperCase();
    const stnIDLower = stationID.toLowerCase();

    // icao stations only
    station = icaoStations.find(stn => stn.id === stnIDUpper);
    if (!station) station = icaoStations.find(stn => stn.id === stnIDLower);

    // acis stations
    if (!station) station = stations.find(stn => stn.id === stnIDUpper);
    if (!station) station = stations.find(stn => stn.id === stnIDLower);

    return station;
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
      elemsListCheckbox: this.elemsListCheckbox.slice(),
      elems: this.elems,
      state: this.state,
      station: this.station,
      sDate: this.sDate,
      eDate: this.eDate
    };
  }

  // tab selection
  searchMethod = "map";
  setSearchMethod = (v, e) => {
    this.searchMethod = e;
    this.stationID = "";
    this.postalCode = "";
    this.data = [];
  };

  allElements = elements;
  checkElem = e => {
    if (this.elems.length > 1) {
      this.allElements[e.target.value].isSelected = !this.allElements[
        e.target.value
      ].isSelected;
    } else {
      this.allElements[e.target.value].isSelected = true;
    }
  };
  setUnit = e => {
    this.allElements[e.target.name].defUnit = e.target.value;
  };

  get elemsListCheckbox() {
    return this.searchMethod === "user"
      ? this.station
        ? Object.values(this.allElements).filter(
            el => this.station.network in el
          )
        : []
      : Object.values(this.allElements).filter(el => "icao" in el);
  }

  get selectedElems() {
    return this.elemsListCheckbox.filter(el => el.isSelected);
  }

  userElems = [];
  get elems() {
    return this.searchMethod === "map"
      ? this.elemsListCheckbox.map(el => el["icao"])
      : this.elemsListCheckbox.map(el => el[this.station.network]);
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

    // fetching data
    await fetchCurrentStationHourlyData(params).then(res => {
      this.tzo = res.meta.tzo;

      // transform data
      const data = res.data.map(dayArr =>
        dayArr.map(el => (typeof el === "string" ? dailyToHourlyDates(el) : el))
      );

      const selectedKeys = this.selectedElems.map(e => e.el);
      const keys = ["date", ...selectedKeys];

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
  setIcaoStations: action,
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
  elemsListCheckbox: computed,
  selectedElems: computed,
  userElems: observable,
  setSearchMethod: action,
  elems: computed,
  params: computed,
  data: observable
});
