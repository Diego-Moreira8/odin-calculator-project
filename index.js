let leftNumber = null;
let currentOperator = null;
let rightNumber = null;
let result = null;

let currentNumber = 0;
let isFloat = false;
let displayingResult = false;

const numbersBtns = document.querySelectorAll(".number");
const switchSignBtn = document.querySelector(".switch-sign");
const pointBtn = document.querySelector(".point");
const clearBtn = document.querySelector(".clear");
const clearEntryBtn = document.querySelector(".clear-entry");
const backspaceBtn = document.querySelector(".backspace");
const operationsBtns = document.querySelectorAll(".operation");

window.onload = updateDisplay;
window.onkeydown = handleKeyDown;
numbersBtns.forEach((b) =>
  b.addEventListener("click", (e) => handleNumberInput(e.target.textContent))
);
switchSignBtn.addEventListener("click", handleSwitchSign);
pointBtn.addEventListener("click", handleInsertPoint);
clearBtn.addEventListener("click", handleClear);
clearEntryBtn.addEventListener("click", handleClearEntry);
backspaceBtn.addEventListener("click", handleBackspace);
operationsBtns.forEach((btn) =>
  btn.addEventListener("click", (e) =>
    handleOperationButton(e.target.getAttribute("data-operator"))
  )
);

function updateDisplay() {
  const leftNumberDisplay = document.querySelector(".left-number");
  const currOperatorDisplay = document.querySelector(".current-operator");
  const rightNumberDisplay = document.querySelector(".right-number");
  const equalsSignDisplay = document.querySelector(".result");
  const currNumberDisplay = document.querySelector(".current-number");

  leftNumberDisplay.textContent = leftNumber !== null ? `${leftNumber}` : "";
  rightNumberDisplay.textContent = rightNumber !== null ? `${rightNumber}` : "";

  switch (currentOperator) {
    case "divide":
      currOperatorDisplay.textContent = "/";
      break;
    case "equals":
      // to-do
      break;
    case "multiply":
      currOperatorDisplay.textContent = "*";
      break;
    case "one-over":
      // to-do
      break;
    case "percentage":
      // to-do
      break;
    case "square-root":
      // to-do
      break;
    case "subtract":
      currOperatorDisplay.textContent = "-";
      break;
    case "sum":
      currOperatorDisplay.textContent = "+";
      break;
    default:
      currOperatorDisplay.textContent = "";
  }

  if (displayingResult) equalsSignDisplay.classList.add("active");
  else equalsSignDisplay.classList.remove("active");

  if (result) {
    currNumberDisplay.textContent = `${result}`;
  } else {
    // If is float and has no digits before the floating point...
    if (isFloat && `${currentNumber}`.indexOf(".") === -1) {
      currNumberDisplay.textContent = `${currentNumber}.0`;
    } else {
      currNumberDisplay.textContent = currentNumber;
    }
  }
}

function handleKeyDown(e) {
  console.log(e.key);

  switch (e.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      handleNumberInput(e.key);
      break;
    case ".":
      handleInsertPoint();
      break;
    case "Backspace":
      handleBackspace();
      break;
    case "Escape":
      handleClear();
      break;
    case "+":
      handleOperationButton("sum");
      break;
    case "-":
      handleOperationButton("subtract");
      break;
    case "/":
      handleOperationButton("divide");
      break;
    case "*":
      handleOperationButton("multiply");
      break;
    case "Enter":
      handleOperationButton("equals");
      break;
  }
}

function handleNumberInput(value) {
  if (
    (isFloat && `${currentNumber}`.length === 9) ||
    (!isFloat && `${currentNumber}`.length === 8)
  ) {
    return;
  }

  if (displayingResult) {
    handleClear();
  }

  if (isFloat) {
    let pointIndex = `${currentNumber}`.indexOf(".");
    currentNumber =
      pointIndex === -1
        ? parseFloat(`${currentNumber}.${value}`)
        : parseFloat(`${currentNumber}${value}`);
  } else {
    currentNumber = parseInt(`${currentNumber}${value}`);
  }

  switchSignBtn.disabled = currentNumber === 0;

  updateDisplay();
}

function handleSwitchSign() {
  currentNumber *= -1;
  updateDisplay();
}

function handleInsertPoint() {
  if (isFloat) return;
  pointBtn.disabled = true;
  isFloat = true;
  updateDisplay();
}

function cancelFloat() {
  isFloat = false;
  pointBtn.disabled = false;
}

function handleClear() {
  currentNumber = 0;
  switchSignBtn.disabled = currentNumber === 0;
  leftNumber = null;
  currentOperator = null;
  rightNumber = null;
  result = null;
  displayingResult = false;
  cancelFloat();
  updateDisplay();
}

function handleClearEntry() {
  currentNumber = 0;
  switchSignBtn.disabled = currentNumber === 0;
  cancelFloat();
  updateDisplay();
}

function handleBackspace() {
  let currNumString = `${currentNumber}`;

  if (isFloat) {
    // Has only one number after the floating point?
    if (currNumString.indexOf(".") === currNumString.length - 2) {
      currentNumber =
        currNumString.length <= 1 ? 0 : parseInt(currNumString.slice(0, -2));
      cancelFloat();
    } else {
      currentNumber =
        currNumString.length <= 1 ? 0 : parseFloat(currNumString.slice(0, -1));
    }
  } else {
    currentNumber =
      currNumString.length <= 1 ? 0 : parseInt(currNumString.slice(0, -1));
  }

  switchSignBtn.disabled = currentNumber === 0;

  updateDisplay();
}

function handleOperationButton(operator) {
  console.log(operator);

  if (currentOperator === "divide" && currentNumber === 0) {
    alert("Não é possível dividir por 0!");
    return;
  }

  if (operator === "equals") {
    if (leftNumber === null) return;

    if (displayingResult) {
      leftNumber = result;
      operate();
      updateDisplay();
    }

    rightNumber = currentNumber;
    operate(); // The last clicked operator isn't changed
    displayingResult = true;
    updateDisplay();
  } else {
    if (displayingResult) {
      displayingResult = false;
      leftNumber = result;
      currentOperator = operator;
      rightNumber = null;
      result = null;
      currentNumber = 0;
    } else if (leftNumber === null) {
      leftNumber = currentNumber;
      currentOperator = operator;
      currentNumber = 0;
      isFloat = false;
    } else if (rightNumber === null) {
      rightNumber = currentNumber;
      operate();
      leftNumber = result;
      currentOperator = operator;
      rightNumber = null;
      result = null;
      currentNumber = 0;
      isFloat = false;
    } else {
      rightNumber = currentNumber;
      operate();
    }
    updateDisplay();
  }
}

function operate() {
  switch (currentOperator) {
    case "divide":
      result = leftNumber / rightNumber;
      break;
    case "equals":
      // to-do
      break;
    case "multiply":
      result = leftNumber * rightNumber;
      break;
    case "one-over":
      // to-do
      break;
    case "percentage":
      // to-do
      break;
    case "square-root":
      // to-do
      break;
    case "subtract":
      result = leftNumber - rightNumber;
      break;
    case "sum":
      result = leftNumber + rightNumber;
      break;
  }
}
