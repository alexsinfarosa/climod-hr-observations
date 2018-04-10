import plane from "../assets/plane.png";
import planeGrey from "../assets/planeGrey.png";
import iconStation from "../assets/station.png";
import stationGrey from "../assets/stationGrey.png";

import moment from "moment-timezone";

// MAP ---------------------------------------------------------
export const matchIconsToStations = (station, state) => {
  const protocol = window.location.protocol;
  const { network } = station;
  const { postalCode } = state;

  const newa = iconStation;
  const newaGray = stationGrey;
  const airport = plane;
  const airportGray = planeGrey;
  const culog = `${protocol}//newa2.nrcc.cornell.edu/gifs/culog.png`;
  const culogGray = `${protocol}//newa2.nrcc.cornell.edu/gifs/culogGray.png`;

  if (
    network === "newa" ||
    network === "njwx" ||
    network === "miwx" ||
    network === "oardc" ||
    network === "nysm" ||
    ((network === "cu_log" || network === "culog") && station.state !== "NY")
  ) {
    return station.state === postalCode || postalCode === "ALL"
      ? newa
      : newaGray;
  }

  if (network === "cu_log" || network === "culog") {
    return station.state === postalCode || postalCode === "ALL"
      ? culog
      : culogGray;
  }

  if (network === "icao") {
    return station.state === postalCode || postalCode === "ALL"
      ? airport
      : airportGray;
  }
};

export const elements = {
  pcpn: {
    el: "pcpn",
    val: 5,
    label: "Hourly Precipitation",
    units: ["inches", "millimeters"],
    defUnit: "inches",
    isSelected: true,
    network: [
      "newa",
      "icao",
      "cu_log",
      "culog",
      "njwx",
      "miwx",
      "oardc",
      "nysm"
    ]
  },
  temp: {
    el: "temp",
    val: 23,
    label: "Temperature",
    units: ["˚F", "˚C"],
    defUnit: "˚F",
    isSelected: true,
    network: [
      "newa",
      "icao",
      "cu_log",
      "culog",
      "njwx",
      "miwx",
      "oardc",
      "nysm"
    ]
  },
  rhum: {
    el: "rhum",
    val: 24,
    label: "Relative Humidity",
    units: ["percent"],
    defUnit: "percent",
    isSelected: true,
    network: [
      "newa",
      "icao",
      "cu_log",
      "culog",
      "njwx",
      "miwx",
      "oardc",
      "nysm"
    ]
  },
  lwet: {
    el: "lwet",
    val: 118,
    label: "Leaf Wetness",
    units: ["minute/hour"],
    defUnit: "minute/hour",
    isSelected: false,
    network: ["newa", "cu_log", "culog", "miwx", "oardc"]
  },
  wspd: {
    el: "wspd",
    val: 128,
    label: "Wind Speed",
    units: ["miles/hour", "knots", "meter/second"],
    defUnit: "miles/hour",
    isSelected: true,
    network: ["newa", "icao", "cu_log", "culog", "njwx", "oardc", "nysm"]
  },
  wdir: {
    el: "wdir",
    val: 130,
    label: "Wind Direction",
    units: ["degree", "compass"],
    defUnit: "degree",
    isSelected: true,
    network: ["newa", "icao", "cu_log", "culog", "njwx", "oardc", "nysm"]
  },
  srad: {
    el: "srad",
    val: 132,
    label: "Solar Radiation",
    units: ["˚F", "˚C"],
    defUnit: "˚F",
    isSelected: true,
    network: ["newa", "cu_log", "culog", "njwx", "miwx", "oardc", "nysm"]
  },
  dwpt: {
    el: "dwpt",
    val: 22,
    label: "Dewpoint",
    units: ["˚F", "˚C"],
    defUnit: "˚F",
    isSelected: true,
    network: ["icao"]
  },
  st4i: {
    el: "st4i",
    val: 120,
    label: "Soil Temperature",
    units: ["˚F", "˚C"],
    defUnit: "˚F",
    isSelected: false,
    network: ["newa"]
  },
  sm4i: {
    el: "sm4i",
    val: 65,
    label: "Soil Tension",
    units: ["kPa"],
    defUnit: "kPa",
    isSelected: false,
    network: ["newa"]
  },
  tsky: {
    el: "tsky",
    val: 33,
    label: "Total Sky Cover",
    units: ["fraction", "percent"],
    defUnit: "fraction",
    isSelected: true,
    network: ["icao"]
  }
};

export const vXDef = {
  newa: {
    pcpn: 5,
    temp: 23,
    rhum: 24,
    lwet: 118,
    wspd: 128,
    wdir: 130,
    srad: 132,
    st4i: 120,
    sm4i: 65
  },
  icao: {
    pcpn: 5,
    temp: 23,
    rhum: 24,
    wspd: 28,
    wdir: 27,
    dwpt: 22,
    tsky: 33
  },
  cu_log: {
    pcpn: 5,
    temp: 126,
    rhum: 24,
    lwet: 118,
    wspd: 128,
    wdir: 130,
    srad: 132
  },
  culog: {
    pcpn: 5,
    temp: 126,
    rhum: 24,
    lwet: 118,
    wspd: 128,
    wdir: 130,
    srad: 132
  },
  njwx: {
    pcpn: 5,
    temp: 23,
    rhum: 24,
    wspd: 28,
    wdir: 27,
    srad: 149
  },
  miwx: {
    pcpn: 5,
    temp: 126,
    rhum: 143,
    lwet: 118,
    srad: 132
  },
  oardc: {
    pcpn: 5,
    temp: 23,
    rhum: 24,
    lwet: 118,
    wspd: 28,
    wdir: 27,
    srad: 132,
    st4i: 120
  },
  nysm: {
    pcpn: 5,
    temp: 23,
    rhum: 24,
    wspd: 28,
    wdir: 27,
    srad: 132,
    st4i: 120,
    sm2i: 104
  }
};

// Handling ID adjustment
export const idAdjustment = station => {
  // Michigan
  if (
    station.state === "MI" &&
    station.network === "miwx" &&
    station.id.slice(0, 3) === "ew_"
  ) {
    // example: ew_ITH
    return station.id.slice(3, 6);
  }

  // NY mesonet
  if (
    station.state === "NY" &&
    station.network === "nysm" &&
    station.id.slice(0, 5) === "nysm_"
  ) {
    // example: nysm_spra
    return station.id.slice(5, 9);
  }

  return station.id;
};

// Returns the average of two numbers.
export const avgTwoStringNumbers = (a, b) => {
  const aNum = parseFloat(a);
  const bNum = parseFloat(b);
  return ((aNum + bNum) / 2).toFixed(1);
};

const weightedMean = res => {
  // ex: [2,M,M,5] => [2,3,45]
  const arr = res.map(d => Number(d));
  const firstM = ((arr[0] + arr[0] + arr[3]) / 3).toPrecision(2);
  const secondM = ((arr[0] + arr[3] + arr[3]) / 3).toPrecision(2);
  return [firstM, secondM];
};

export const averageMissingValues = d => {
  // console.log(d);
  if (d.includes("M")) {
    if (d[0] === "M" && d[1] !== "M") d[0] = d[1];
    if (d[0] === "M" && d[1] === "M" && d[2] !== "M") {
      d[0] = d[2];
      d[1] = d[2];
    }

    const len = d.length - 1;
    if (d[len] === "M" && d[len - 1] !== "M") d[len] = d[len - 1];
    if (d[len] === "M" && d[len - 1] === "M" && d[len - 2] !== "M") {
      d[len] = d[len - 2];
      d[len - 1] = d[len - 2];
    }

    return d.map((t, i) => {
      if (d[i - 1] !== "M" && t === "M" && d[i + 1] !== "M") {
        return avgTwoStringNumbers(d[i - 1], d[i + 1]);
      }

      if (
        d[i - 1] !== "M" &&
        t === "M" &&
        d[i + 1] === "M" &&
        d[i + 2] !== "M"
      ) {
        const arr = [d[i - 1], d[i], d[i + 1], d[i + 2]];
        const rep = weightedMean(arr);
        t = rep[0];
        d[i + 1] = rep[1];
      }

      return t;
    });
  }
  return d;
};

export const flatten = arr => Array.prototype.concat(...arr);

export const unflatten = array => {
  let res = [];
  while (array.length > 0) res.push(array.splice(0, 24));
  return res;
};

// Convert Fahrenheit to Celcius
export const fahrenheitToCelcius = t => ((t - 32) * 5 / 9).toFixed(1);

// Returns average of all the values in array
export const average = data => {
  // handling the case for T and W
  if (data.length === 0) return 0;

  //  calculating average
  let results = data.map(e => parseFloat(e));
  return Math.round(results.reduce((acc, val) => acc + val, 0) / data.length);
};

// export const dailyToHourlyDates = arr => {
//   let results = [];
//   arr.forEach(day => {
//     for (let h = 0; h < 24; h++) {
//       let hour = h;
//       if (h >= 0 && h <= 9) hour = `0${h}`;
//       results.push(`${day} ${hour}:00`);
//     }
//   });
//   return results;
// };

export const dailyToHourlyDates = date => {
  let results = [];
  for (let h = 0; h < 24; h++) {
    let hour = h;
    if (h >= 0 && h <= 9) hour = `0${h}`;
    results.push(`${date} ${hour}:00`);
  }
  return results;
};

// convert time in local standard time to local time (based on time zone and dst)
export const formatTime = (day, hour, tzo) => {
  tzo = Math.abs(tzo);
  var timeZoneNames = {
    5: "America/New_York",
    6: "America/Chicago",
    7: "America/Denver",
    8: "America/Los_Angeles"
  };
  return moment
    .utc(day)
    .hour(hour)
    .add(tzo, "hours")
    .tz(timeZoneNames[tzo])
    .format("YYYY-MM-DD H");
};
