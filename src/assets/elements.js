export const elements = {
  pcpn: {
    el: "pcpn",
    label: "Hourly Precipitation",
    units: [
      { label: "inches", val: "inch" },
      { label: "millimeters", val: "mm" }
    ],
    defUnit: "inches",
    isSelected: true,
    newa: { vX: 5, units: "inch" },
    icao: { vX: 5, units: "inch" },
    cu_log: { vX: 5, units: "inch" },
    culog: { vX: 5, units: "inch" },
    njwx: { vX: 5, units: "inch" },
    miwx: { vX: 5, units: "inch" },
    oardc: { vX: 5, units: "inch" },
    nysm: { vX: 5, units: "inch" }
  },
  temp: {
    el: "temp",
    label: "Temperature",
    units: [{ label: "˚F", val: "degF" }, { label: "˚C", val: "degC" }],
    defUnit: "˚F",
    isSelected: true,
    newa: { vX: 23, units: "degF" },
    icao: { vX: 23, units: "degF" },
    cu_log: { vX: 126, units: "degF" },
    culog: { vX: 126, units: "degF" },
    njwx: { vX: 23, units: "degF" },
    miwx: { vX: 126, units: "degF" },
    oardc: { vX: 23, units: "degF" },
    nysm: { vX: 23, units: "degF" }
  },
  rhum: {
    el: "rhum",
    label: "Relative Humidity",
    units: [{ label: "percent", val: "percent" }],
    defUnit: "percent",
    isSelected: true,
    newa: { vX: 24, units: "percent" },
    icao: { vX: 24, units: "percent" },
    cu_log: { vX: 24, units: "percent" },
    culog: { vX: 24, units: "percent" },
    njwx: { vX: 24, units: "percent" },
    miwx: { vX: 143, units: "percent" },
    oardc: { vX: 24, units: "percent" },
    nysm: { vX: 24, units: "percent" }
  },
  lwet: {
    el: "lwet",
    label: "Leaf Wetness",
    units: [{ label: "minute/hour", val: "min/hr" }],
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
    units: [
      { label: "miles/hour", val: "miles/hour" },
      { label: "knots", val: "knot" },
      { label: "meter/sec", val: "m/sec" }
    ],
    defUnit: "miles/hour",
    isSelected: true,
    newa: { vX: 128, units: "miles/hour" },
    icao: { vX: 28, units: "miles/hour" },
    cu_log: { vX: 128, units: "miles/hour" },
    culog: { vX: 128, units: "miles/hour" },
    njwx: { vX: 28, units: "miles/hour" },
    oardc: { vX: 28, units: "miles/hour" },
    nysm: { vX: 28, units: "miles/hour" }
  },
  wdir: {
    el: "wdir",
    label: "Wind Direction",
    units: [
      { label: "degrees", val: "degrees" },
      { label: "compass", val: "compass" } // implement
    ],
    defUnit: "degrees",
    isSelected: true,
    newa: { vX: 130, units: "degrees" },
    icao: { vX: 27, units: "degrees" },
    cu_log: { vX: 130, units: "degrees" },
    culog: { vX: 130, units: "degrees" },
    njwx: { vX: 27, units: "degrees" },
    oardc: { vX: 27, units: "degrees" },
    nysm: { vX: 27, units: "degrees" }
  },
  srad: {
    el: "srad",
    label: "Solar Radiation",
    units: [{ label: "langleys", val: "langleys" }],
    defUnit: "langleys",
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
    units: [{ label: "˚F", val: "degF" }, { label: "˚C", val: "degC" }],
    defUnit: "˚F",
    isSelected: true,
    icao: { vX: 22, units: "degF" }
  },
  st4i: {
    el: "st4i",
    label: "Soil Temperature",
    units: [{ label: "˚F", val: "degF" }, { label: "˚C", val: "degC" }],
    defUnit: "˚F",
    isSelected: false,
    newa: { vX: 120, units: "degF" }
  },
  sm4i: {
    el: "sm4i",
    label: "Soil Tension",
    units: [{ label: "kPa", val: "kPa" }],
    defUnit: "kPa",
    isSelected: false,
    newa: 65
  },
  tsky: {
    el: "tsky",
    label: "Total Sky Cover",
    units: [
      { label: "fraction", val: "fraction" },
      { label: "percent", val: "percent" } // implement
    ],
    defUnit: "fraction",
    isSelected: true,
    icao: { vX: 33 }
  }
};
