import plane from "../assets/plane.png";
import planeGrey from "../assets/planeGrey.png";
import iconStation from "../assets/station.png";
import stationGrey from "../assets/stationGrey.png";

import isBefore from "date-fns/isBefore";
import startOfDay from "date-fns/startOfDay";
import endOfDay from "date-fns/endOfDay";
import addHours from "date-fns/addHours";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import isEqual from "date-fns/isEqual";
import format from "date-fns/format";

// date-fns keeps changing the API...
export const formatDate = date => format(date, "YYYY-MM-dd");

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
  t === missing ? t : (((t - 32) * 5) / 9).toFixed(1);

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

export const dailyToHourlyDates = (sdate, edate) => {
  let startDay = startOfDay(sdate);
  let endDay = setHours(edate, 23);
  endDay = setMinutes(endDay, 0);
  endDay = setSeconds(endDay, 0);

  let results = [];
  results.push(startDay);

  while (isBefore(startDay, endDay)) {
    startDay = addHours(startDay, 1);
    if (isBefore(startDay, endDay) || isEqual(startDay, endDay)) {
      results.push(startDay);
    }
  }
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

export const compassUnit = degree => {
  let deg = Number(degree);
  if (deg === -1) return "VRB";
  if (deg === 0) return "CLM";
  if (deg >= 1 && deg <= 11) return "N";
  if (deg >= 12 && deg <= 33) return "NNE";
  if (deg >= 34 && deg <= 56) return "NE";
  if (deg >= 57 && deg <= 78) return "ENE";
  if (deg >= 79 && deg <= 101) return "E";
  if (deg >= 102 && deg <= 123) return "ESE";
  if (deg >= 124 && deg <= 146) return "SE";
  if (deg >= 147 && deg <= 168) return "SSE";
  if (deg >= 169 && deg <= 191) return "S";
  if (deg >= 192 && deg <= 213) return "SSW";
  if (deg >= 214 && deg <= 236) return "SW";
  if (deg >= 237 && deg <= 258) return "WSW";
  if (deg >= 259 && deg <= 281) return "W";
  if (deg >= 282 && deg <= 303) return "WNW";
  if (deg >= 304 && deg <= 326) return "NW";
  if (deg >= 327 && deg <= 348) return "NNW";
  if (deg >= 349 && deg <= 360) return "N";
};

export const ceilingHeightUnit = feet => {
  const m = feet * 100;
  if (m === 100000) return "Unl";
  return m;
};

export const dailyToHourlyDatesLST = (sdate, edate) => {
  let startDay = sdate;
  let endDay = edate;

  let results = [];
  results.push(startDay);

  while (isBefore(startDay, endDay)) {
    startDay = addHours(startDay, 1);
    if (isBefore(startDay, endDay) || isEqual(startDay, endDay)) {
      results.push(startDay);
    }
  }
  return results;
};

export const cleanFetchedData = (acisData, params) => {
  // console.log(acisData, params);
  // tzo
  const tzo = acisData.get("tzo");

  // current station
  const currentStn = acisData.get("currentStn");

  // dates has date of interest +5 days
  let dates = currentStn.map(arr => arr[0]);

  const currentStnValues = averageMissingValues(
    flatten(currentStn.map(arr => arr[1]))
  );

  let replaced = currentStnValues;
  // sister station
  const sisterStn = acisData.get("sisterStn");
  if (sisterStn) {
    // a station can have not data at all and return an error
    const sisterStnValues = flatten(sisterStn.map(arr => arr[1]));

    // replace current station values with sister station's
    replaced = replaced.map((t, i) => (t === "M" ? sisterStnValues[i] : t));
  }

  // if date of interest is in current year
  if (params.isThisYear) {
    const forecast = acisData.get("forecast");
    const forecastValues = flatten(forecast.map(arr => arr[1]));

    // replace missing values with forecast data
    replaced = replaced.map((t, i) =>
      t === "M" ? forecastValues[i].toString() : t
    );
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  // transforming data to local time
  // ////////////////////////////////////////////////////////////////////////////////////

  // dates go from yyyy-01-01 to dateOfInterest (yyyy-mm-dd)
  dates = dates.slice(1); // from Jan 1st

  // hourlyDates go from yyyy-01-01 00:00 to dateOfInterest (yyyy-mm-dd 23:00)
  const hourlyDates = dates
    .map(date => dailyToHourlyDates(date))
    .reduce((acc, results) => [...acc, ...results], []);

  // array of indeces where the hour must be shifted
  const arrOFIndeces = hourlyDates.map((hour, i) => {
    const tzoFromDate = parseInt(format(new Date(hour), "Z"), 10);
    return tzoFromDate !== tzo ? i : null;
  });

  // removing null values
  const indices = arrOFIndeces.filter(d => d);

  // generating the array of objects

  let hourlyData = [];
  let dailyData = [];

  // values go from yyyy-01-01 00:00 to dateOfInterest current hour
  const valuesHourly = [replaced[23], ...replaced.slice(24, -1)];

  // the valuesShifted array has the hour shifted
  const valuesHourlyShifted = valuesHourly.map((v, i) =>
    v in indices ? valuesHourly[i - 1] : v
  );

  let left = 0;
  let right = 0;
  // values go from yyyy-01-01 00:00 to dateOfInterest current hour
  const valuesDaily = [...replaced.slice(24)];

  // the valuesShifted array has the hour shifted
  const valuesDailysShifted = valuesDaily.map((v, i) =>
    v in indices ? valuesDaily[i - 1] : v
  );

  dates.forEach((date, i) => {
    const numOfHours = dailyToHourlyDatesLST(startOfDay(date), endOfDay(date))
      .length;

    right = left + numOfHours;

    let p = {};
    p["date"] = date;
    p["temps"] = valuesDailysShifted.slice(left, right);

    left += numOfHours;
    dailyData.push(p);
  });

  hourlyDates.forEach((hour, i) => {
    let p = {};
    p["date"] = new Date(hour);
    p["temp"] = valuesHourlyShifted[i];
    hourlyData.push(p);
  });

  // console.log(dailyData, hourlyData);
  return [dailyData, hourlyData];
};

export const shiftDataFromOneTo24 = data => {
  let results = [];
  let firstDayLastHourValues = data[0].slice(1).map(el => el.slice(-1)[0]);

  for (let i = 1; i < data.length; i++) {
    const date = data[i][0];
    let elems = data[i].slice(1);

    let row = [date];
    elems.forEach((el, i) => {
      const elCopy = [firstDayLastHourValues[i], ...el.slice(0, -1)];
      row.push(elCopy);
    });
    results.push(row);
  }
  return results;
};
