"use strict";

module.exports = {
  time,
  length,
  pace,
};

function time(str) {
  if (typeof str !== "string") throw new Error("Time argument must be a string");

  if (str.includes(":")) {
    return timeToSecs(str);
  }

  const parts = splitNumbersAndUnits(str);

  if (!parts || parts.length % 2 !== 0) throw new Error(`Time is missing one or more units: ${str}`);

  let secs = 0;
  while (parts.length) {
    const number = parts.shift();
    const unit = parts.shift();

    secs += number * timeToSecFactor(unit);
  }

  if (isNaN(secs)) throw new Error(`Time format not recognized: ${str}`);

  return secs;
}

function length(str, imperial) {
  if (typeof str !== "string") throw new Error("Length argument must be a string");

  const parts = splitNumbersAndUnits(str);
  if (parts.length === 1) {
    if (/^[0-9.]+$/.test(parts[0])) {
      parts.push(imperial ? "mi" : "km");
    } else {
      parts.unshift(1);
    }
  } else if (parts.length > 2) {
    throw new Error(`Length format not recognized: ${str}`);
  }

  const [number, unit] = parts;

  return Math.round(parseFloat(number, 10) * lengthToMetersFactor(unit));
}

const supportedPaceUnits = ["km", "mi"];
function pace(str, imperial) {
  if (typeof str !== "string") throw new Error("Pace argument must be a string");

  if (str.includes("/")) {
    const [number, unit] = str.split("/");

    if (!supportedPaceUnits.includes(unit)) throw new Error(`Pace length unit only supports: ${supportedPaceUnits.join(", ")}`);
    return time(number) / lengthToMetersFactor(unit);
  }

  return time(str) / lengthToMetersFactor(imperial ? "mi" : "km");
}

function timeToSecs(number) {
  const parts = number.split(":");
  let secs = 0;

  switch (parts.length) {
    case 4:
      secs += parseInt(parts.shift(), 10) * 24 * 60 * 60;
      /* falls through */
    case 3:
      secs += parseInt(parts.shift(), 10) * 60 * 60;
      /* falls through */
    case 2:
      secs += parseInt(parts.shift(), 10) * 60;
      secs += parseInt(parts.shift(), 10);
  }

  if (isNaN(secs) || parts.length > 0) throw new Error(`Time format not recognized: ${number}`);
  return secs;
}

function timeToSecFactor(unit) {
  switch (unit.toLowerCase()) {
    case "days":
    case "day":
    case "d":
      return 24 * 60 * 60;

    case "hours":
    case "hour":
    case "hrs":
    case "h":
      return 60 * 60;

    case "mins":
    case "min":
    case "m":
      return 60;

    case "secs":
    case "sec":
    case "s":
      return 1;

    default:
      return NaN;
  }
}

function splitNumbersAndUnits(str) {
  return str.match(/([0-9.]+|[^0-9]+)/g);
}

function lengthToMetersFactor(unit) {
  switch (unit.toLowerCase()) {
    case "km":
    case "k":
      return 1000;
    case "m":
      return 1;
    case "mi":
      return 1609.3;
    case "hm":
      return 21097.5;
    case "ma":
      return 42195;

    default:
      throw new Error(`Unrecognized length unit: ${unit}`);
  }
}
