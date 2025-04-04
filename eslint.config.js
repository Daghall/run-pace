"use strict";

module.exports = [
  ...require("@bonniernews/eslint-config"),
  {
    ignores: [
      "node_modules/**",
      "www/**",
    ],
  },
];
