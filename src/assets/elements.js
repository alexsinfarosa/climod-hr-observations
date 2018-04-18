export const elements = {
  pcpn: {
    el: "pcpn",
    label: "Precipitation",
    units: { in: "inch", mm: "mm" },
    defaultUnit: "in",
    isSelected: true,
    newa: { vX: 5 },
    icao: { vX: 5 },
    cu_log: { vX: 5 },
    culog: { vX: 5 },
    njwx: { vX: 5 },
    miwx: { vX: 5 },
    oardc: { vX: 5 },
    nysm: { vX: 5 }
  },
  temp: {
    el: "temp",
    label: "Temperature",
    units: { "˚F": "degF", "˚C": "degC" },
    defaultUnit: "˚F",
    isSelected: true,
    newa: { vX: 23 },
    icao: { vX: 23 },
    cu_log: { vX: 126 },
    culog: { vX: 126 },
    njwx: { vX: 23 },
    miwx: { vX: 126 },
    oardc: { vX: 23 },
    nysm: { vX: 23 }
  },
  rhum: {
    el: "rhum",
    label: "Relative Humidity",
    units: { pct: "percent" },
    defaultUnit: "pct",
    isSelected: true,
    newa: { vX: 24 },
    icao: { vX: 24 },
    cu_log: { vX: 24 },
    culog: { vX: 24 },
    njwx: { vX: 24 },
    miwx: { vX: 143 },
    oardc: { vX: 24 },
    nysm: { vX: 24 }
  },
  lwet: {
    el: "lwet",
    label: "Leaf Wetness",
    units: { "min/hr": "min/hr" },
    defaultUnit: "min/hr",
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
    units: { mph: "miles/hour", knots: "knot", "m/sec": "m/sec" },
    defaultUnit: "mph",
    isSelected: true,
    newa: { vX: 128 },
    icao: { vX: 28 },
    cu_log: { vX: 128 },
    culog: { vX: 128 },
    njwx: { vX: 28 },
    oardc: { vX: 28 },
    nysm: { vX: 28 }
  },
  wdir: {
    el: "wdir",
    label: "Wind Direction",
    units: { deg: "degrees", compass: "compass" },
    defaultUnit: "deg",
    isSelected: true,
    newa: { vX: 130 },
    icao: { vX: 27 },
    cu_log: { vX: 130 },
    culog: { vX: 130 },
    njwx: { vX: 27 },
    oardc: { vX: 27 },
    nysm: { vX: 27 }
  },
  srad: {
    el: "srad",
    label: "Solar Radiation",
    units: { langleys: "langleys" },
    defaultUnit: "langleys",
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
    units: { "˚F": "degF", "˚C": "degC" },
    defaultUnit: "˚F",
    isSelected: true,
    icao: { vX: 22 }
  },
  st4i: {
    // no icao
    el: "st4i",
    label: "Soil Temperature",
    units: { "˚F": "degF", "˚C": "degC" },
    defaultUnit: "˚F",
    isSelected: false,
    newa: { vX: 120 }
  },
  sm4i: {
    // no icao
    el: "sm4i",
    label: "Soil Tension",
    units: { kPa: "kPa" },
    defaultUnit: "kPa",
    isSelected: false,
    newa: 65
  },
  tsky: {
    el: "tsky",
    label: "Total Sky Cover",
    units: { fraction: "fraction", pct: "percent" },
    defaultUnit: "fraction",
    isSelected: true,
    icao: { vX: 33 }
  },
  ceilh: {
    el: "ceilh",
    label: "Ceiling Height",
    units: { ft: "feet" },
    defaultUnit: "ft",
    isSelected: false,
    icao: { vX: 35 }
  },
  stnp: {
    el: "stnp",
    label: "Station Pressure",
    units: { Hg: "inch_Hg" },
    defaultUnit: "Hg",
    isSelected: false,
    icao: { vX: 18 }
  },
  seal: {
    el: "seal",
    label: "Sea Level",
    units: { Hg: "inch_Hg" },
    defaultUnit: "Hg",
    isSelected: false,
    icao: { vX: 19 }
  },
  hvis: {
    el: "hvis",
    label: "Horizontal Visibility",
    units: { mi: "miles" },
    defaultUnit: "mi",
    isSelected: false,
    icao: { vX: 26 }
  }
};
