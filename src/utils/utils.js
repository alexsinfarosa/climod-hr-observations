import plane from "../assets/plane.png";
import planeGrey from "../assets/planeGrey.png";
import iconStation from "../assets/station.png";
import stationGrey from "../assets/stationGrey.png";

// import moment from "moment-timezone";
import { isBefore, startOfDay, addHours, setHours } from "date-fns";

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
export const fahrenheitToCelcius = (t, missing) =>
  t === missing ? t : ((t - 32) * 5 / 9).toFixed(1);

// Convert Celcius to Fahrenheit
export const celciusToFahrenheit = (t, missing) =>
  t === missing ? t : (t * (9 / 5) + 32).toFixed(1);

// Returns average of all the values in array
export const average = data => {
  // handling the case for T and W
  if (data.length === 0) return 0;

  //  calculating average
  let results = data.map(e => parseFloat(e));
  return Math.round(results.reduce((acc, val) => acc + val, 0) / data.length);
};

export const dailyToHourlyDates = (sdate, edate, tzo) => {
  let startDay = startOfDay(sdate);
  const endDay = setHours(edate, 23);

  let results = [];
  results.push(startDay);
  while (isBefore(startDay, endDay)) {
    startDay = addHours(startDay, 1);
    results.push(startDay);
  }
  // console.log(results);
  return results;
};

export const heatIndex = (t, rh, missing, tUnit) => {
  if (tUnit === "˚C") t = Math.round(t * (9 / 5) + 32, 0);
  return t !== missing && rh !== missing && t > 80
    ? Math.round(
        -42.379 +
          2.04901523 * t +
          10.1433127 * rh -
          0.22475541 * t * rh -
          0.00683783 * t ** 2 -
          0.05481717 * rh ** 2 +
          0.00122874 * t ** 2 * rh +
          0.00085282 * t * rh ** 2 -
          0.00000199 * t ** 2 * rh ** 2,
        0
      )
    : missing;
};

export const windChill = (t, wspd, missing, tUnit) => {
  if (tUnit === "˚C") t = Math.round(t * (9 / 5) + 32, 0);
  return t !== missing && wspd !== missing && t <= 50 && wspd >= 3
    ? Math.round(
        35.74 + 0.6215 * t - 35.75 * wspd ** 0.16 + 0.4275 * t * wspd ** 0.16,
        0
      )
    : missing;
};
