import {
  decorate,
  observable,
  computed,
  action,
  when,
  reaction,
  toJS
} from "mobx";
import { states } from "../assets/states";
import axios from "axios";

// fetch
import { fetchCurrentStationHourlyData } from "../utils/fetchData";

// icao stations
import { icaoStations } from "../assets/icaoStationList";

// utils
import { idAdjustment, dailyToHourlyDates } from "../utils/utils";
import { elements } from "../assets/elements";

// date-fns
import { format, getHours, isWithinInterval } from "date-fns";

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
    // reaction(() => this.asJson, () => console.log(this.asJson));
    reaction(() => this.searchMethod === "map", () => this.setIcaoStations());
    reaction(() => this.searchMethod === "user", () => this.loadStations());
    reaction(
      () => this.searchMethod === "stationList",
      () => this.loadStations()
    );
  }

  isLoading = false;
  isMapVisible = false;
  toggleMap = d => (this.isMapVisible = !this.isMapVisible);

  isPrintViewVisible = false;
  togglePrintView = d => (this.isPrintViewVisible = !this.isPrintViewVisible);

  radioButton = "-";
  setRadioButton = e => {
    this.radioButton = e.target.value;
    this.setData(this.params);
  };

  // states
  stateIDs = Object.keys(states);
  get states() {
    return this.stateIDs.map(id => states[id]);
  }
  // state
  postalCode = "";
  setPostalCode = e => {
    this.postalCode = e.target.value;
    if (this.searchMethod !== "stationList") this.isMapVisible = true;
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
  sDate = new Date("2018-03-09");
  setStartDate = d => (this.sDate = d);
  eDate = new Date("2018-03-13");
  setEndDate = d => (this.eDate = d);

  // asJson
  get asJson() {
    return {
      allElements: toJS(this.allElements),
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
    this.selectedElems.length > 1
      ? (this.allElements[e.target.value].isSelected = !this.allElements[
          e.target.value
        ].isSelected)
      : (this.allElements[e.target.value].isSelected = true);
  };
  setUnit = e =>
    (this.allElements[e.target.name]["defaultUnit"] = e.target.value);

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

  get elems() {
    let results;
    if (this.station) {
      results =
        this.searchMethod === "map"
          ? this.elemsListCheckbox.map(el => {
              console.log("icao");
              const vX = el["icao"];
              const defaultUnit = el["defaultUnit"];
              const units = { units: el["units"][defaultUnit] };
              return { ...vX, ...units };
            })
          : this.elemsListCheckbox.map(el => {
              console.log("other networks");
              const vX = el[this.station.network];
              console.log(vX);
              const defaultUnit = el["defaultUnit"];
              const units = { units: el["units"][defaultUnit] };
              return { ...vX, ...units };
            });
    }
    console.log(results);
    return results;
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

  get hourlyLocalDates() {
    const dates = dailyToHourlyDates(this.sDate, this.eDate, this.tzo);
    return dates
      .map(date => {
        if (
          isWithinInterval(new Date(date), {
            start: new Date(format(this.sDate, "YYYY-MM-DD 00:00")),
            end: new Date(format(this.eDate, "YYYY-MM-DD 23:00"))
          })
        ) {
          return date;
        }
        return null;
      })
      .filter(d => d);
  }

  data = [];
  tzo;
  setData = async params => {
    this.isLoading = true;

    await fetchCurrentStationHourlyData(params).then(res => {
      console.log(res.data);
      const selectedKeys = this.elemsListCheckbox.map(e => e.el);
      const keys = ["date", ...selectedKeys];
      console.log(keys);
      // data
      let data = new Map();
      res.data.forEach(day => {
        let p = {};
        day.forEach((el, i) => {
          p[keys[i]] = el;
        });
        data.set(day[0], p);
      });
      console.log(data);

      // convert dates from standard time to local time
      let results = [];
      this.hourlyLocalDates.forEach(date => {
        const timeZoneAbbreviation = date
          .toString()
          .split(" ")
          .slice(-1)[0];
        const time = getHours(date);
        const day = format(date, "YYYY-MM-DD");

        let p = {};
        keys.forEach(el => {
          console.log(el);
          el === "date"
            ? (p["date"] = `${format(
                date,
                "YYYY-MM-DD HH:00"
              )} ${timeZoneAbbreviation}`)
            : (p[el] =
                data.get(day)[el][time] === "M"
                  ? this.radioButton
                  : data.get(day)[el][time]);
        });
        // console.log(p);
        results.push(p);
      });

      this.data = results;
    });

    this.isLoading = false;
  };

  get CSVData() {
    return this.data.map(e => {
      const keys = Object.keys(e);
      let p = {};
      keys.forEach(key => {
        key === "date"
          ? (p["Date"] = e.date)
          : (p[`${elements[key].label} (${elements[key].defUnit})`] = e[key]);
      });
      return p;
    });
  }
}

decorate(ParamsStore, {
  isLoading: observable,
  isMapVisible: observable,
  toggleMap: action,
  isPrintViewVisible: observable,
  togglePrintView: action,
  radioButton: observable,
  setRadioButton: action,
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
  setSearchMethod: action,
  elems: computed,
  params: computed,
  hourlyLocalDates: computed,
  data: observable,
  CSVData: computed
});
