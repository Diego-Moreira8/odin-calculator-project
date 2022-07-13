const display = document.querySelector(".display");
let currentNumber = 0,
  previousNumber = 0;
let reset = true;
let firstOperation = true;
const numberButtons = document.querySelectorAll(".number");
const clearButton = document.querySelector(".clear");
const operatorsButtons = document.querySelectorAll(".operator");

numberButtons.forEach((button) =>
  button.addEventListener("click", populateDisplay)
);

clearButton.addEventListener("click", clearDisplay);

operatorsButtons.forEach((button) => button.addEventListener("click", operate));

function populateDisplay(e) {
  if (reset) {
    display.innerText = "";
    reset = false;
  }
  display.innerText += e.target.innerText;
  currentNumber = parseInt(display.innerText);
}

function clearDisplay() {
  display.innerText = "";
  currentNumber = 0;
  previousNumber = 0;
  firstOperation = true;
}

function operate(e) {
  let result = 0;
  switch (e.target.classList[1]) {
    case "sum":
      result = previousNumber + currentNumber;
      break;
    case "subtract":
      if (firstOperation) {
        result = currentNumber;
        firstOperation = false;
      } else {
        result = previousNumber - currentNumber;
      }
      break;
    case "multiply":
      if (firstOperation) {
        previousNumber = 1;
        firstOperation = false;
      }
      result = previousNumber * currentNumber;
      break;
    case "divide":
      if (firstOperation) {
        result = currentNumber;
        firstOperation = false;
      } else {
        result = previousNumber / currentNumber;
      }
      break;
  }
  display.innerText = result;
  previousNumber = result;
  reset = true;
}

// const sum = (x, y) => x + y;
// const subtract = (x, y) => x - y;
// const multiply = (x, y) => x * y;
// const divide = (x, y) => x / y;
