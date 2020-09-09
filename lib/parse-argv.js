"use strict";

module.exports = function parseArgv(processArgv, flags) {
  if (!Array.isArray(processArgv)) throw new Error("Argv is malformed");
  if (!Array.isArray(flags)) throw new Error("Flags is malformed");

  flags.forEach((flag) => {
    if (typeof flag !== "object") throw new Error(`Argument is not an object: ${JSON.stringify(flag)}`);
    if (!flag.short) throw new Error(`Argument is missing "short" property: ${JSON.stringify(flag)}`);
    if (!flag.long) throw new Error(`Argument is missing "long" property: ${JSON.stringify(flag)}`);
  });

  const options = {};
  const argv = processArgv.slice(2);

  while (argv.length) {
    const arg = argv.shift();

    const format = /^--/.test(arg) ? "long" : "short";
    const switchType = format === "short" ? "-" : "--";

    const currentFlag = flags.find((flag) => {
      return arg.startsWith(switchType + flag[format]);
    });

    if (!currentFlag) {
      throw new Error(`Unregognized argument: ${arg}`);
    }

    const flagName = currentFlag.long;
    const flagLength = currentFlag[format].length + switchType.length;

    if (arg.length > flagLength) {
      const usesEqual = arg[flagLength] === "=";
      options[flagName] = arg.slice(flagLength + (usesEqual ? 1 : 0));
    } else {
      if (argv.length === 0 || argv[0].startsWith("-")) {
        options[flagName] = true;
      } else {
        options[flagName] = argv.shift();
      }
    }
  }

  return options;
};
