/* global document */
const runPace = require("../lib/run-pace.js");

const calculate = document.getElementById("calculate");
const length = document.getElementById("length");
const time = document.getElementById("time");
const pace = document.getElementById("pace");
const result = document.getElementById("result");
const error = document.getElementById("error");

[length, time, pace].forEach((item) => {
  const name = item.id;
  const button = document.getElementById(`${name}-clear`);
  button.addEventListener("click", () => {
    item.value = "";
  });
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") {
    calculateStuff();
  }
});

calculate.addEventListener("click", calculateStuff);
function calculateStuff() {
  const options = {
    length: length.value,
    time: time.value,
    pace: pace.value,
  };

  const unit = Array.from(document.getElementsByName("unit")).filter((i) => i.checked).pop().id;
  options[unit] = true;

  try {
    let _result;

    if (options.time && options.length && options.pace) {
      throw new Error("Too many arguments. Only two of \"time\", \"length\" and \"pace\" may be provided at any time");
    } else if (options.time && options.pace) {
      _result = `Length: ${runPace.calculateLength(options)}`;
    } else if (options.time && options.length) {
      _result = `Pace: ${runPace.calculatePace(options)}`;
    } else if (options.pace && options.length) {
      _result = `Time: ${runPace.calculateTime(options)}`;
    } else {
      throw new Error("Two of \"time\", \"length\" and \"pace\" must be provided");
    }

    result.textContent = _result;
    error.textContent = "";
  } catch ({message}) {
    result.textContent = "";
    error.textContent = message;
  }
}
