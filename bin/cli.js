#!/usr/bin/env node

"use strict";

const parseArgv = require("../lib/parse-argv.js");
const runPace = require("../lib/run-pace.js");

const flags = [
  {short: "l", long: "length"},
  {short: "p", long: "pace"},
  {short: "t", long: "time"},
  {short: "i", long: "imperial"},
  {short: "m", long: "metric"},
];


function cli(argv, nodeProcess) {
  try {
    const options = parseArgv(argv, flags);
    let result;

    if (options.imperial && options.metric) {
      throw new Error("Conflicting parameters: \"metric\" and \"imperial\" cannot be provided at the same time");
    }

    if (options.time && options.length && options.pace) {
      throw new Error("Too many arguments. Only two of \"time\", \"length\" and \"pace\" may be provided at any time");
    } else if (options.time && options.pace) {
      result = runPace.calculateLength(options);
    } else if (options.time && options.length) {
      result = runPace.calculatePace(options);
    } else if (options.pace && options.length) {
      result = runPace.calculateTime(options);
    } else {
      throw new Error("Two of \"time\", \"length\" and \"pace\" must be provided");
    }

    nodeProcess.stdout.write(`${result}\n`);
  } catch (e) {
    nodeProcess.stderr.write(`${e.message}\n`);
    nodeProcess.stdout.write("\nParameters: \n"
  + "   -l, --length,    <value><unit> (10km, 10mi, 10000m, hm, ma)\n"
  + "   -p, --pace,      <value>/<unit> (4:30/km, 4m30s/mi)\n"
  + "   -t, --time,      <value> (11:23, 11min23sec, 11m23s)\n"
  + "   -i, --imperial,  force imperial output\n"
  + "   -m, --metric,    force metric output\n",
    );
  }
}

// Expose to tests
module.exports = cli;

// Execute, if run as script
if (require.main === module) {
  cli(process.argv, process);
}
