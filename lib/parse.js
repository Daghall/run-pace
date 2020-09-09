"use strict";

module.exports = {
  time,
  length,
  pace,
};

function time(str) {
  if (typeof str !== "string") return NaN;

  if (str.includes(":")) {
    return timeToSecs(str);
  }

  const parts = splitNumbersAndUnits(str);

  if (!parts || parts.length % 2 !== 0) return NaN;

  let secs = 0;
  while (parts.length) {
    const number = parts.shift();
    const unit = parts.shift();

    secs += number * timeToSecFactor(unit);
  }

  return secs;
}

function length(str) {
  if (typeof str !== "string") return NaN;

  const parts = splitNumbersAndUnits(str);
  if (parts.length === 1) {
    parts.unshift(1);
  }
  const [number, unit] = parts;

  return Math.round(parseFloat(number, 10) * lengthToMetersFactor(unit));
}

function pace(str) {
  if (typeof str !== "string") return NaN;

  if (str.includes("/")) {
    const [number, unit] = str.split("/");

    if (!["km", "mi"].includes(unit)) return NaN;
    return time(number) / lengthToMetersFactor(unit);
  }

  return time(str) / 1000;
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
      return secs;

    default:
      return NaN;
  }
}

function timeToSecFactor(unit) {
  switch (unit.toLowerCase()) {
    case "days":
    case "day":
    case "d":
      return 24 * 60 * 60;

    case "hours":
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
      return NaN;
  }
}
