export const elements = {
  temp: {
    el: "temp",
    label: "Temperature",
    units: { "deg F": "degF", "deg C": "degC" },
    prec: 0,
    defaultUnit: "deg F",
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
  dwpt: {
    el: "dwpt",
    label: "Dewpoint",
    units: { "deg F": "degF", "deg C": "degC" },
    prec: 0,
    defaultUnit: "deg F",
    isSelected: true,
    icao: { vX: 22 }
  },
  rhum: {
    el: "rhum",
    label: "Relative Humidity",
    units: { pct: "percent" },
    prec: 0,
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
  wdir: {
    el: "wdir",
    label: "Wind Direction",
    units: { deg: "degrees", compass: "degrees" },
    prec: 1,
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
  wspd: {
    el: "wspd",
    label: "Wind Speed",
    units: { mph: "miles/hour", knots: "knot", "m/sec": "m/sec" },
    prec: 1,
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
  seal: {
    el: "seal",
    label: "Sea-Level Pressure",
    units: { "inch Hg": "inch_Hg" },
    prec: 2,
    defaultUnit: "inch Hg",
    isSelected: false,
    icao: { vX: 19 }
  },
  stnp: {
    el: "stnp",
    label: "Station Pressure",
    units: { "inch Hg": "inch_Hg", mb: "mbar" },
    prec: 2,
    defaultUnit: "inch Hg",
    isSelected: false,
    icao: { vX: 18 }
  },
  hvis: {
    el: "hvis",
    label: "Visibility",
    units: { mi: "miles" },
    prec: 2,
    defaultUnit: "mi",
    isSelected: false,
    icao: { vX: 26 }
  },
  tsky: {
    el: "tsky",
    label: "Total Sky Cover",
    units: { fraction: "10", pct: "0.1" },
    prec: 1,
    defaultUnit: "fraction",
    isSelected: true,
    icao: { vX: 33 }
  },
  ceilh: {
    el: "ceilh",
    label: "Ceiling Height",
    units: { ft: "feet" },
    prec: 0,
    defaultUnit: "ft",
    isSelected: false,
    icao: { vX: 35 }
  },
  pcpn: {
    el: "pcpn",
    label: "Precipitation",
    units: { in: "inch", mm: "mm" },
    prec: 2,
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
  wchil: {
    el: "wchil",
    label: "Wind Chill",
    units: { "deg F": "degF", "deg C": "degC" },
    prec: 1,
    defaultUnit: "deg F",
    isSelected: false
  },
  hidx: {
    el: "hidx",
    label: "Heat Index",
    units: { "deg F": "degF", "deg C": "degC" },
    prec: 1,
    defaultUnit: "deg F",
    isSelected: false
  },
  lwet: {
    el: "lwet",
    label: "Leaf Wetness",
    units: { "min/hr": "minutes" },
    prec: 1,
    defaultUnit: "min/hr",
    isSelected: false,
    newa: { vX: 118 },
    cu_log: { vX: 118 },
    culog: { vX: 118 },
    miwx: { vX: 118 },
    oardc: { vX: 118 }
  },
  srad: {
    el: "srad",
    label: "Solar Radiation",
    units: { langley: "langley", "J/m2": "joule/m2" },
    prec: 1,
    defaultUnit: "langley",
    isSelected: true,
    newa: { vX: 132 },
    cu_log: { vX: 132 },
    culog: { vX: 132 },
    njwx: { vX: 149, units: "langley/hr" },
    miwx: { vX: 132 },
    oardc: { vX: 132 },
    nysm: { vX: 132 }
  },
  st4i: {
    // no icao
    el: "st4i",
    label: "Soil Temperature",
    units: { "deg F": "degF", "deg C": "degC" },
    prec: 1,
    defaultUnit: "deg F",
    isSelected: false,
    newa: { vX: 120 }
  },
  sm4i: {
    // no icao
    el: "sm4i",
    label: "Soil Tension",
    units: { kPa: "kPa" },
    prec: 1,
    defaultUnit: "kPa",
    isSelected: false,
    newa: { vX: 65 }
  }
};
