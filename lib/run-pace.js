"use strict";

const parse = require("./parse.js");

module.exports = {
  calculatePace,
  calculateTime,
  calculateLength,
  paceToSpeed,
};

function calculatePace({time, length, imperial = false, metric = false, speed = false}) {
  if (!time || !length) throw new Error("Missing parameters: {time, length} must be specified");
  imperial = (imperial || length.endsWith("mi") && !metric);
  const lengthFactor = imperial ? 1609.3 : 1000;
  const lengthLabel = imperial ? "mi" : "km";

  const timeInSeconds = parse.time(time);
  const meters = parse.length(length, imperial);
  const secondsPerLength = timeInSeconds / (meters / lengthFactor);

  const paceString = `${formatTime(secondsPerLength)}/${lengthLabel}`;
  return speed ? paceToSpeed({pace: paceString}) : paceString;
}

function calculateTime({pace, length, imperial = false, metric = false}) {
  if (!pace || !length) throw new Error("Missing parameters: {pace, length} must be specified");
  imperial = (imperial && !metric);
  const paceFactor = parse.pace(pace, imperial);
  const meters = parse.length(length, imperial);

  return formatTime(paceFactor * meters);
}

function calculateLength({time, pace, imperial = false, metric = false}) {
  if (!time || !pace) throw new Error("Missing parameters: {time, pace} must be specified");
  imperial = (imperial || pace.endsWith("mi")) && !metric;
  const lengthFactor = imperial ? 1609.3 : 1000;

  const paceFactor = parse.pace(pace); // secs / (km || mi)
  const timeInSeconds = parse.time(time);

  return formatLength(timeInSeconds / paceFactor / lengthFactor, imperial);
}

function zeroPad(number) {
  return `0${number}`.slice(-2);
}

function paceToSpeed({pace, imperial = false, metric = false} = {}) {
  if (!pace) throw new Error("Missing parameter: \"pace\" must be specified");
  const imperialPace = pace.endsWith("mi");
  imperial = (imperial || imperialPace) && !metric;
  const lengthFactor = imperialPace ? 1609.3 : 1000;
  const paceFactor = parse.pace(pace, imperialPace); // seconds/(km || mi)
  // const speed = lengthFactor / paceFactor * .36 / lengthFactor; // (km || mi)/h
  const speed = 1 / paceFactor * 3.6; // km/h
  return formatSpeed(speed, imperial, lengthFactor);
}

function formatSpeed(speed, imperial, lengthFactor) {
  if (imperial) {
    const milesPerHour = speed / 1.6093;
    // const milesPerHour = speed * 10000 / 16093;
    const speedString = milesPerHour.toFixed(1).replace(/.0$/, "");
    return `${speedString} mph`;
  }
  const speedString = speed.toFixed(1).replace(/.0$/, "");
  return `${speedString} km/h`;
  // if (imperial) {
  //   const milesPerHour = speed * lengthFactor / 1609.3;
  //   const milesPerHourString = milesPerHour.toFixed(2).replace(/.00*$/, "");
  //   return `${milesPerHourString} mph`;
  // }
  // const speedPerHour = speed * lengthFactor / 1000;
  // const speedString = speedPerHour.toFixed(2).replace(/.00*$/, "");
  // return `${speedString} ${imperial ? "mph" : "km/h"}`;
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
