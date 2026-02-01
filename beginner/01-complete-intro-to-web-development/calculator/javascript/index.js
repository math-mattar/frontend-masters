let runningTotal = 0;
let buffer = 0;
let previousOperator;

const screen = document.querySelector(".calc-screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }

  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    return;
  }

  const initBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = initBuffer;
  } else {
    flushOperation(initBuffer);
  }

  previousOperator = value;

  buffer = "0";
}

function flushOperation(initBuffer) {
  if (previousOperator === "+") {
    runningTotal += initBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= initBuffer;
  } else if (previousOperator === "x") {
    runningTotal *= initBuffer;
  } else {
    runningTotal /= initBuffer;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";

      runningTotal = 0;
      break;

    case "=":
      if (previousOperator === null) {
        return;
      }

      flushOperation(parseInt(buffer));

      previousOperator = null;

      buffer = +runningTotal;

      runningTotal = 0;
      break;

    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;

    case "+":
    case "-":
    case "x":
    case "÷":
      handleMath(value);

      break;
  }
}

function rerender() {
  screen.innerText = buffer;
}

function init() {
  document.querySelector(".calc-buttons").addEventListener("click", (e) => {
    buttonClick(e.target.innerText);
  });
}

init();
