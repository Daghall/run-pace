"use strict";

const parse = require("./parse.js");

module.exports = {
  calculatePace,
  calculateTime,
  calculateLength,
};

function calculatePace({time, length, imperial = false, metric = false}) {
  if (!time || !length) throw new Error("Missing parameters: {time, length} must be specified");
  imperial = (imperial || length.endsWith("mi") && !metric);
  const lengthFactor = imperial ? 1609.3 : 1000;
  const lengthLabel = imperial ? "mi" : "km";

  const timeInSeconds = parse.time(time);
  const meters = parse.length(length);
  const secondsPerLength = timeInSeconds / (meters / lengthFactor);

  return `${formatTime(secondsPerLength)}/${lengthLabel}`;
}

function calculateTime({pace, length}) {
  if (!pace || !length) throw new Error("Missing parameters: {pace, length} must be specified");
  const paceFactor = parse.pace(pace);
  const meters = parse.length(length);

  return formatTime(paceFactor * meters);
}

function calculateLength({time, pace, imperial = false, metric = false}) {
  if (!time || !pace) throw new Error("Missing parameters: {time, pace} must be specified");
  imperial = (imperial || pace.endsWith("mi")) && !metric;
  const lengthFactor = imperial ? 1609.3 : 1000;

  const paceFactor = parse.pace(pace);
  const timeInSeconds = parse.time(time);

  return formatLength(timeInSeconds / paceFactor / lengthFactor, imperial);
}

function zeroPad(number) {
  return `0${number}`.slice(-2);
}

const timesInSeconds = [
  24 * 60 * 60, // Day
  60 * 60, // Hour
  60, // Minute
  1, // Second
];

function formatTime(totalSeconds) {
  if (typeof totalSeconds !== "number") return "";

  const times = [];
  let seconds = Math.round(totalSeconds);

  timesInSeconds.forEach((timeInSeconds) => {
    if (times.length || seconds >= timeInSeconds) {
      const num = Math.floor(seconds / timeInSeconds);
      times.push(zeroPad(num));
    }
    seconds %= timeInSeconds;
  });

  if (times.length < 1) {
    times.push("00", "00");
  } else if (times.length < 2) {
    times.unshift("00");
  }

  return times.join(":").replace(/^0/, "");
}

function formatLength(length, imperial) {
  if (typeof length !== "number") return "";

  const lengthFormated = length.toFixed(2).replace(/(\.0)?0$/, "");
  const unit = imperial ? "mile" : "km";
  const pluralMiles = imperial && lengthFormated !== "1";
  return `${lengthFormated} ${unit}${pluralMiles ? "s" : ""}`;
}
