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
    label: "Hourly Precipitation",
    units: ["inches", "millimeters"],
    defUnit: "inches",
    isSelected: true,
    newa: 5,
    icao: 5,
    cu_log: 5,
    culog: 5,
    njwx: 5,
    miwx: 5,
    oardc: 5,
    nysm: 5
  },
  temp: {
    el: "temp",
    label: "Temperature",
    units: ["˚F", "˚C"],
    defUnit: "˚F",
    isSelected: true,
    newa: 23,
    icao: 23,
    cu_log: 126,
    culog: 126,
    njwx: 23,
    miwx: 126,
    oardc: 23,
    nysm: 23
  },
  rhum: {
    el: "rhum",
    label: "Relative Humidity",
    units: ["percent"],
    defUnit: "percent",
    isSelected: true,
    newa: 24,
    icao: 24,
    cu_log: 24,
    culog: 24,
    njwx: 24,
    miwx: 143,
    oardc: 24,
    nysm: 24
  },
  lwet: {
    el: "lwet",
    label: "Leaf Wetness",
    units: ["minute/hour"],
    defUnit: "minute/hour",
    isSelected: false,
    newa: 118,
    cu_log: 118,
    culog: 118,
    miwx: 118,
    oardc: 118
  },
  wspd: {
    el: "wspd",
    label: "Wind Speed",
    units: ["miles/hour", "knots", "meter/second"],
    defUnit: "miles/hour",
    isSelected: true,
    newa: 128,
    icao: 28,
    cu_log: 128,
    culog: 128,
    njwx: 28,
    oardc: 28,
    nysm: 28
  },
  wdir: {
    el: "wdir",
    label: "Wind Direction",
    units: ["degree", "compass"],
    defUnit: "degree",
    isSelected: true,
    newa: 130,
    icao: 27,
    cu_log: 130,
    culog: 130,
    njwx: 27,
    oardc: 27,
    nysm: 27
  },
  srad: {
    el: "srad",
    label: "Solar Radiation",
    units: ["˚F", "˚C"],
    defUnit: "˚F",
    isSelected: true,
    newa: 132,
    cu_log: 132,
    culog: 132,
    njwx: 149,
    miwx: 132,
    oardc: 132,
    nysm: 132
  },
  dwpt: {
    el: "dwpt",
    label: "Dewpoint",
    units: ["˚F", "˚C"],
    defUnit: "˚F",
    isSelected: true,
    icao: 22
  },
  st4i: {
    el: "st4i",
    label: "Soil Temperature",
    units: ["˚F", "˚C"],
    defUnit: "˚F",
    isSelected: false,
    newa: 120
  },
  sm4i: {
    el: "sm4i",
    label: "Soil Tension",
    units: ["kPa"],
    defUnit: "kPa",
    isSelected: false,
    newa: 65
  },
  tsky: {
    el: "tsky",
    label: "Total Sky Cover",
    units: ["fraction", "percent"],
    defUnit: "fraction",
    isSelected: true,
    icao: 33
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
