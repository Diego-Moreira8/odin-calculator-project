// Aux
let currentNumber = 0,
  previousNumber = 0,
  firstOperation = true,
  lastOperator = "";

// Buttons
const display = document.querySelector(".display"),
  currentOperator = document.querySelector(".current-operator"),
  numberButtons = document.querySelectorAll(".number"),
  pointButton = document.querySelector(".point"),
  clearButton = document.querySelector(".clear"),
  sumButton = document.querySelector(".sum"),
  subtractButton = document.querySelector(".subtract"),
  multiplyButton = document.querySelector(".multiply"),
  divideButton = document.querySelector(".divide"),
  equalsButton = document.querySelector(".equals");

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
  if (currentNumber === 0) {
    display.innerText = "";
  }
  display.innerText += e.target.innerText;
  currentNumber = Number(display.innerText);
}

function insertPoint(e) {
  populateDisplay(e);
  e.target.disabled = true;
}

function clearDisplay() {
  display.innerText = "0";
  currentNumber = 0;
  previousNumber = 0;
  firstOperation = true;
}

function sum() {
  display.innerText = previousNumber + currentNumber;
  previousNumber += currentNumber;
  currentNumber = 0;
  currentOperator.innerText = "+";
  firstOperation = false;
  lastOperator = "sum";
  pointButton.removeAttribute("disabled");
}

function subtract() {
  if (firstOperation) {
    previousNumber = currentNumber;
  } else {
    previousNumber -= currentNumber;
    display.innerText = previousNumber;
  }
  currentNumber = 0;
  currentOperator.innerText = "-";
  firstOperation = false;
  lastOperator = "subtract";
  pointButton.removeAttribute("disabled");
}

function multiply() {
  if (firstOperation) {
    previousNumber = currentNumber;
  } else {
    previousNumber *= currentNumber;
    display.innerText = previousNumber;
  }
  currentNumber = 0;
  currentOperator.innerText = "x";
  firstOperation = false;
  lastOperator = "multiply";
  pointButton.removeAttribute("disabled");
}

function divide() {
  if (firstOperation) {
    previousNumber = currentNumber;
  } else {
    previousNumber /= currentNumber;
    display.innerText = previousNumber;
  }
  currentNumber = 0;
  currentOperator.innerText = "÷";
  firstOperation = false;
  lastOperator = "divide";
  pointButton.removeAttribute("disabled");
}

function equals() {
  let result = 0;
  switch (lastOperator) {
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
  currentNumber = result;
  previousNumber = 0;
  firstOperation = true;
  lastOperator = "equals";
  display.innerText = result;
}
// tenta arrumar esse ponto ae
