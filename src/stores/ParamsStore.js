import { decorate, observable, computed, action, when, reaction } from "mobx";
import { states } from "../assets/states";
import axios from "axios";

// fetch
import { fetchCurrentStationHourlyData } from "../utils/fetchData";

// icao stations
import { icaoStations } from "../assets/icaoStationList";

// utils
import {
  idAdjustment,
  dailyToHourlyDates,
  heatIndex,
  windChill,
  fahrenheitToCelcius
} from "../utils/utils";
import { elements } from "../assets/elements";

// date-fns
import { format, getHours, isWithinInterval, subDays } from "date-fns";

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
          ? (this.data = [])
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
  stationID = "kto";
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
  sDate = new Date("2018-03-12");
  setStartDate = d => (this.sDate = d);
  eDate = new Date("2018-03-13");
  setEndDate = d => (this.eDate = d);

  // asJson
  get asJson() {
    return {
      // allElements: toJS(this.allElements),
      // searchMethod: this.searchMethod,
      // elemsListCheckbox: this.elemsListCheckbox.slice(),
      // elems: this.elems,
      isUnitBeingChanged: this.isUnitBeingChanged,
      state: this.state,
      station: this.station,
      sDate: this.sDate,
      eDate: this.eDate
    };
  }

  // tab selection
  searchMethod = "user";
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
  isUnitBeingChanged = false;
  setUnit = e => {
    // console.log(e.target.name, e.target.value);
    this.isUnitBeingChanged = true;
    this.allElements[e.target.name]["defaultUnit"] = e.target.value;
    this.isUnitBeingChanged = false;
  };

  get selectedElems() {
    return this.elemsListCheckbox.filter(el => el.isSelected);
  }

  get elemsListCheckboxCallOnly() {
    return this.searchMethod === "user"
      ? this.station
        ? Object.values(this.allElements).filter(
            el => this.station.network in el
          )
        : []
      : Object.values(this.allElements).filter(el => "icao" in el);
  }

  get elemsListCheckbox() {
    const selectedKeys = this.elemsListCheckboxCallOnly.map(e => e.el);
    let results = this.elemsListCheckboxCallOnly;

    if (selectedKeys.includes("temp") && selectedKeys.includes("rhum")) {
      results = [...results, this.allElements["hidx"]];
    }

    if (selectedKeys.includes("temp") && selectedKeys.includes("wspd")) {
      results = [...results, this.allElements["wchil"]];
    }

    // console.log(results);
    return results;
  }

  get elems() {
    let results;
    if (this.station) {
      results =
        this.searchMethod === "map"
          ? this.elemsListCheckboxCallOnly.map(el => {
              const vX = el["icao"];
              const defaultUnit = el["defaultUnit"];
              const units = { units: el["units"][defaultUnit] };
              const prec = { prec: el["prec"] };
              return { ...vX, ...units, ...prec };
            })
          : this.elemsListCheckboxCallOnly.map(el => {
              const vX = { ...el[this.station.network] };
              const defaultUnit = el["defaultUnit"];
              const units = { units: el["units"][defaultUnit] };
              const prec = { prec: el["prec"] };
              return { ...vX, ...units, ...prec };
            });
    }
    return results;
  }

  // parameters to make the call
  get params() {
    const { station, sDate, eDate, elems } = this;
    if (station) {
      return {
        sid: `${idAdjustment(station)} ${station.network}`,
        sdate: format(subDays(new Date(sDate), 1), "YYYY-MM-DD"),
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
      const selectedKeys = this.elemsListCheckboxCallOnly.map(e => e.el);
      const keys = ["date", ...selectedKeys];

      // shift all data by one hour forward
      const dataModified = res.data.map((date, i) => {
        if (i <= res.data.length - 2) {
          return date.map((el, j) => {
            if (typeof el !== "string") {
              res.data[i + 1][j].unshift(el[23]);
              res.data[i][j].pop();
              return res.data[i][j];
            } else {
              return el;
            }
          });
        } else {
          return date.map((el, j) => {
            if (typeof el !== "string") {
              res.data[i][j].pop();
              return res.data[i][j];
            } else {
              return el;
            }
          });
        }
      });

      // data
      let data = new Map();
      dataModified.slice(1).forEach(day => {
        let p = {};
        day.forEach((el, i) => {
          p[keys[i]] = el;
        });
        data.set(day[0], p);
      });

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

        // implement heat index (there is no call for this)
        p["hidx"] =
          this.allElements["hidx"]["defaultUnit"] === "˚C"
            ? fahrenheitToCelcius(
                heatIndex(
                  p.temp,
                  p.rhum,
                  this.radioButton,
                  this.allElements["temp"]["defaultUnit"]
                ),
                this.radioButton
              )
            : heatIndex(
                p.temp,
                p.rhum,
                this.radioButton,
                this.allElements["temp"]["defaultUnit"]
              );

        // implement wind chill (there is no call for this)
        p["wchil"] =
          this.allElements["wchil"]["defaultUnit"] === "˚C"
            ? fahrenheitToCelcius(
                windChill(
                  p.temp,
                  p.wspd,
                  this.radioButton,
                  this.allElements["temp"]["defaultUnit"]
                ),
                this.radioButton
              )
            : windChill(
                p.temp,
                p.wspd,
                this.radioButton,
                this.allElements["temp"]["defaultUnit"]
              );

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
  isUnitBeingChanged: observable,
  setUnit: action,
  elemsListCheckbox: computed,
  elemsListCheckboxCallOnly: computed,
  selectedElems: computed,
  setSearchMethod: action,
  elems: computed,
  params: computed,
  hourlyLocalDates: computed,
  data: observable,
  CSVData: computed
});
