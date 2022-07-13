const display = document.querySelector(".display");
let currentNumber = 0,
  previousNumber = 0;
let reset = true;
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
}

function operate(e) {
  let result = 0;
  switch (e.target.classList[1]) {
    case "sum":
      result = previousNumber + currentNumber;
      break;
    case "subtract":
      result = previousNumber - currentNumber;
      break;
    case "multiply":
      result = previousNumber * currentNumber;
      break;
    case "divide":
      result = previousNumber / currentNumber;
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
