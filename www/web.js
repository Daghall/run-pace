/* global document */
const runPace = require("../lib/run-pace.js");

const calculate = document.getElementById("calculate");
const length = document.getElementById("length");
const time = document.getElementById("time");
const pace = document.getElementById("pace");
const speed = document.getElementById("speed");
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
  options.speed = speed.checked;

  try {
    let _result;

    if (options.time && options.length && options.pace) {
      throw new Error("Too many arguments. Only two of \"time\", \"length\" and \"pace\" may be provided at any time");
    } else if (options.time && options.pace) {
      if (options.speed) throw new Error("Speed is only valid when (only) pace is given or calculated");
      _result = `Length: ${runPace.calculateLength(options)}`;
    } else if (options.time && options.length) {
      const label = options.speed ? "Speed" : "Pace";
      _result = `${label}: ${runPace.calculatePace(options)}`;
    } else if (options.pace && options.length) {
      if (options.speed) throw new Error("Speed is only valid when (only) pace is given or calculated");
      _result = `Time: ${runPace.calculateTime(options)}`;
    } else if (options.pace && options.speed) {
      _result = `Speed: ${runPace.paceToSpeed(options)}`;
    } else {
      throw new Error("Two of \"time\", \"length\" and \"pace\" must be provided\n"
      + "Speed is only valid when pace is given or calculated");
    }

    result.textContent = _result;
    error.textContent = "";
  } catch ({message}) {
    result.textContent = "";
    error.innerHTML = message;
  }
}
