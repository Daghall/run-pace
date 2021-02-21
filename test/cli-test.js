"use strict";

const chai = require("chai");
const chaiSpies = require("chai-spies");
const expect = chai.expect;
const proxyquire = require("proxyquire");
const mockRunPace = {};
const cli = proxyquire("../bin/cli.js", {
  "../lib/run-pace.js": mockRunPace,
});

const baseArgs = ["/path/to/node", "/path/to/script.js"];
let fakeProcess;
chai.use(chaiSpies);

const params = [
  ["--length", "10km"],
  ["--time", "45m"],
  ["--pace", "4:30/km"],
];

describe("cli test", () => {
  beforeEach(() => {
    mockRunPace.calculateLength = chai.spy();
    mockRunPace.calculatePace = chai.spy();
    mockRunPace.calculateTime = chai.spy();
    fakeProcess = {
      stdout: {
        write: chai.spy(),
      },
      stderr: {
        write: chai.spy(),
      },
    };
  });

  it("no parameters", () => {
    cli(baseArgs, fakeProcess);
    expect(mockRunPace.calculateLength).to.not.have.been.called;
    expect(mockRunPace.calculatePace).to.not.have.been.called;
    expect(mockRunPace.calculateTime).to.not.have.been.called;
    expect(fakeProcess.stdout.write).to.have.been.called.once;
    expect(fakeProcess.stderr.write).to.have.been.called.once.with("Two of \"time\", \"length\" and \"pace\" must be provided\n");
  });

  params.forEach((param) => {
    it(`one parameter: "${param.join(" ")}"`, () => {
      cli(baseArgs.concat(param), fakeProcess);
      expect(mockRunPace.calculateLength).to.not.have.been.called;
      expect(mockRunPace.calculatePace).to.not.have.been.called;
      expect(mockRunPace.calculateTime).to.not.have.been.called;
      expect(fakeProcess.stdout.write).to.have.been.called.once;
      expect(fakeProcess.stderr.write).to.have.been.called.once.with("Two of \"time\", \"length\" and \"pace\" must be provided\n");
    });
  });

  params.forEach((_, index) => {
    const callParams = cloneArray(params);
    const skippedParam = removeElement(callParams, index);
    const calledMethod = getMethodName(skippedParam);
    const paramsString = callParams.map((p) => p.join(" ")).join(" ");

    it(`two parameters: "${paramsString}" calls "${calledMethod}"`, () => {
      cli(baseArgs.concat(...callParams), fakeProcess);

      const calledArgs = {};
      callParams.forEach(([key, value]) => {
        calledArgs[key.slice(2)] = value;
        expect(mockRunPace[getMethodName(key)]).to.not.have.been.called;
      });
      expect(mockRunPace[calledMethod]).to.have.been.called.once.with(calledArgs);
    });
  });

  it("three parameters", () => {
    cli(baseArgs.concat(...params), fakeProcess);
    expect(mockRunPace.calculateLength).to.not.have.been.called;
    expect(mockRunPace.calculatePace).to.not.have.been.called;
    expect(mockRunPace.calculateTime).to.not.have.been.called;
    expect(fakeProcess.stdout.write).to.have.been.called.once;
    expect(fakeProcess.stderr.write).to.have.been.called.once.with("Too many arguments. Only two of \"time\", \"length\" and \"pace\" may be provided at any time\n");
  });

  ["metric", "imperial"].forEach((flag) => {
    const callParams = params.slice(1);
    const calledArgs = callParams.reduce((acc, [key, value]) => {
      acc[key.slice(2)] = value;
      return acc;
    }, {});

    calledArgs[flag] = true;

    it(`${flag} flag`, () => {
      cli(baseArgs.concat(...callParams, `--${flag}`), fakeProcess);
      expect(mockRunPace.calculateLength).to.have.been.called.once.with(calledArgs);
      expect(mockRunPace.calculatePace).to.not.have.been.called;
      expect(mockRunPace.calculateTime).to.not.have.been.called;
      expect(fakeProcess.stdout.write).to.have.been.called.once;
      expect(fakeProcess.stderr.write).to.not.have.been.called;
    });
  });

  it("both \"metric\" and \"imperial\" flag", () => {
    cli(baseArgs.concat(...params.slice(1), "-m", "-i"), fakeProcess);
    expect(mockRunPace.calculateLength).to.not.have.been.called;
    expect(mockRunPace.calculatePace).to.not.have.been.called;
    expect(mockRunPace.calculateTime).to.not.have.been.called;
    expect(fakeProcess.stdout.write).to.have.been.called.once;
    expect(fakeProcess.stderr.write).to.have.been.called.once.with("Conflicting parameters: \"metric\" and \"imperial\" cannot be provided at the same time\n");
  });
});

function cloneArray(arr) {
  return arr.slice();
}

function removeElement(arr, index) {
  const [[removedElement]] = arr.splice(index, 1);
  return removedElement;
}

function getMethodName(flag) {
  return `calculate${flag[2].toUpperCase()}${flag.slice(3)}`;
}
