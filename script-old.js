// Helpers
let currentNumber = 0,
  previousNumber = 0,
  firstOperation = true,
  lastOperator = "",
  digitAmount = 0;

// Buttons
const display = document.querySelector(".digits"),
  historyDisplay = document.querySelector(".history"),
  numberButtons = document.querySelectorAll(".number"),
  pointButton = document.querySelector(".point"),
  clearButton = document.querySelector(".clear"),
  sumButton = document.querySelector(".sum"),
  subtractButton = document.querySelector(".subtract"),
  multiplyButton = document.querySelector(".multiply"),
  divideButton = document.querySelector(".divide"),
  equalsButton = document.querySelector(".equals");

display.innerText = 0; // Initialize display

// Event Listeners:
numberButtons.forEach((button) =>
  button.addEventListener("click", populateDisplay)
);
pointButton.addEventListener("click", insertPoint);
clearButton.addEventListener("click", clearDisplay);
sumButton.addEventListener("click", sum);
subtractButton.addEventListener("click", subtract);
multiplyButton.addEventListener("click", multiply);
divideButton.addEventListener("click", divide);
equalsButton.addEventListener("click", equals);

function populateDisplay(e) {
  if (digitAmount < 8) {
    if (currentNumber === 0 && lastOperator !== "equals") {
      display.innerText = "";
    } else if (lastOperator === "equals") {
      display.innerText = "";
      historyDisplay.innerText = "";
      lastOperator = "";
      pointButton.removeAttribute("disabled");
    }
    display.innerText += e.target.innerText;
    currentNumber = Number(display.innerText);
    digitAmount++;
  }
}

function insertPoint(e) {
  populateDisplay(e);
  e.target.disabled = true;
}

function clearDisplay() {
  historyDisplay.innerText = "";
  display.innerText = "0";
  resetHelpers();
  firstOperation = true;
  pointButton.removeAttribute("disabled");
}

function sum() {
  historyDisplay.innerText += ` ${currentNumber} +`;
  lastOperator = "sum";
  operate();
  currentNumber = 0;
  firstOperation = false;
  digitAmount = 0;
  pointButton.removeAttribute("disabled");
}

function subtract() {
  historyDisplay.innerText += ` ${currentNumber} -`;
  if (!firstOperation) {
    operate();
  } else {
    previousNumber = currentNumber;
  }
  currentNumber = 0;
  firstOperation = false;
  lastOperator = "subtract";
  digitAmount = 0;
  pointButton.removeAttribute("disabled");
}

function multiply() {
  historyDisplay.innerText += ` ${currentNumber} ×`;
  if (!firstOperation) {
    operate();
  } else {
    previousNumber = currentNumber;
  }
  currentNumber = 0;
  firstOperation = false;
  lastOperator = "multiply";
  digitAmount = 0;
  pointButton.removeAttribute("disabled");
}

function divide() {
  historyDisplay.innerText += ` ${currentNumber} ÷`;
  if (!firstOperation) {
    operate();
  } else {
    previousNumber = currentNumber;
  }
  currentNumber = 0;
  firstOperation = false;
  lastOperator = "divide";
  digitAmount = 0;
  pointButton.removeAttribute("disabled");
}

function equals() {
  historyDisplay.innerText += ` ${currentNumber} =`;
  operate();
  currentNumber = Number(display.innerText);
  previousNumber = 0;
  firstOperation = true;
  digitAmount = 0;
  lastOperator = "equals";
}

function operate() {
  switch (lastOperator) {
    case "sum":
      display.innerText = previousNumber + currentNumber;
      previousNumber += currentNumber;
      break;
    case "subtract":
      display.innerText = previousNumber - currentNumber;
      previousNumber -= currentNumber;
      break;
    case "multiply":
      display.innerText = previousNumber * currentNumber;
      previousNumber *= currentNumber;
      break;
    case "divide":
      display.innerText = previousNumber / currentNumber;
      previousNumber /= currentNumber;
      break;
  }
}

function resetHelpers() {
  currentNumber = 0;
  previousNumber = 0;
  lastOperator = "";
  digitAmount = 0;
}
