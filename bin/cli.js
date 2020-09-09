#!/usr/bin/env node

"use strict";

const parseArgv = require("../lib/parse-argv.js");
const runPace = require("../lib/run-pace.js");

const flags = [
  {short: "l", long: "length"},
  {short: "p", long: "pace"},
  {short: "t", long: "time"},
  {short: "i", long: "imperial"},
];


try {
  const options = parseArgv(process.argv, flags);
  let result;

  if (options.time && options.pace) {
    result = runPace.calculateLength(options);
  } else if (options.time && options.length) {
    result = runPace.calculatePace(options);
  } else if (options.pace && options.length) {
    result = runPace.calculateTime(options);
  } else {
    throw new Error("Two of \"time\", \"length\" and \"pace\" must be provided");
  }

  process.stdout.write(`${result}\n`);
} catch (e) {
  process.stderr.write(`${e.message}\n`);
  process.stdout.write("\nParameters: \n"
  + "   -l, --length,    <value><unit> (10km, 10mi, 10000m, hm, ma)\n"
  + "   -p, --pace,      <value>/<unit> (4:30/km, 4m30s/mi)\n"
  + "   -t, --time,      <value> (11:23, 11min23sec, 11m23s)\n"
  + "   -i, --imperial,  force imperial output\n",
  );
}
