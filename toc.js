#!/usr/bin/env node

"use strict";

const fs = require("fs");

const readme = fs.readFileSync("./README.md").toString().split("\n");

let start;
let end;
const outline = [];

readme.forEach((row, i) => {
  if (/toc start/.test(row)) {
    start = i + 1;
  } else if (/toc end/.test(row)) {
    end = i;
  } else if (end && /^#/.test(row)) {
    const tocRow = row.replace(/^(#+ )(.*)/, (_, hashes, header) => {
      const friendlyHeader = header
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^-a-z0-9]/g, "");
      const indent = hashes.slice(1).replace(/#/g, "  ");
      return `${indent}- [${header}](#${friendlyHeader})`;
    });
    outline.push(tocRow);
  }
});

readme.splice(start, end - start, ...outline);

fs.writeFileSync("./README.md", readme.join("\n"));
