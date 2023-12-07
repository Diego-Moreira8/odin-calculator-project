const DEFAULTS = {
  LEFT_NUMBER: null,
  CURRENT_OPERATOR: null,
  RIGHT_NUMBER: null,
  RESULT: null,
  CURRENT_NUMBER: 0,
  IS_FLOAT: false,
};

let leftNumber = DEFAULTS.LEFT_NUMBER;
let currentOperator = DEFAULTS.CURRENT_OPERATOR;
let rightNumber = DEFAULTS.RIGHT_NUMBER;
let result = DEFAULTS.RESULT;

let currentNumber = DEFAULTS.CURRENT_NUMBER;
let isFloat = DEFAULTS.IS_FLOAT;

const numbersBtns = document.querySelectorAll(".number");
const switchSignBtn = document.querySelector(".switch-sign");
const pointBtn = document.querySelector(".point");
const clearBtn = document.querySelector(".clear");
const clearEntryBtn = document.querySelector(".clear-entry");
const backspaceBtn = document.querySelector(".backspace");
const operationsBtns = document.querySelectorAll(".operation");
const percentageBtn = document.querySelector("[data-operator='percentage']");

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

  const formatNumberDisplay = (number) => {
    const DIGITS_LIMIT = 10;

    if (number === null) {
      return "";
    } else if (`${number}`.length > DIGITS_LIMIT) {
      return `${number}`.slice(0, DIGITS_LIMIT) + "...";
    } else {
      return number;
    }
  };

  leftNumberDisplay.textContent = formatNumberDisplay(leftNumber);

  switch (currentOperator) {
    case "divide":
      currOperatorDisplay.textContent = "/";
      break;
    case "multiply":
      currOperatorDisplay.textContent = "*";
      break;
    case "square-root":
      currOperatorDisplay.textContent = "√";
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

  rightNumberDisplay.textContent = formatNumberDisplay(rightNumber);

  if (result === null) {
    equalsSignDisplay.classList.remove("active");
    currNumberDisplay.textContent =
      isFloat && !`${currentNumber}`.includes(".")
        ? `${currentNumber}.0`
        : currentNumber;
  } else {
    equalsSignDisplay.classList.add("active");
    currNumberDisplay.textContent = formatNumberDisplay(result);
  }
}

function handleKeyDown(e) {
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
    case ",":
    case ".":
      if (pointBtn.disabled) break;
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
    case "%":
      if (percentageBtn.disabled) break;
      handleOperationButton("percentage");
      break;
  }
}

function handleNumberInput(newNumber) {
  if (
    (isFloat && `${currentNumber}`.length === 9) ||
    (!isFloat && `${currentNumber}`.length === 8)
  ) {
    return;
  }

  if (result !== null) {
    handleClear();
  }

  if (isFloat) {
    currentNumber = `${currentNumber}`.includes(".")
      ? parseFloat(`${currentNumber}${newNumber}`)
      : parseFloat(`${currentNumber}.${newNumber}`);
  } else {
    currentNumber = parseInt(`${currentNumber}${newNumber}`);
  }

  toggleSwitchSignBtn();
  updateDisplay();
}

function handleSwitchSign() {
  currentNumber *= -1;
  updateDisplay();
}

function toggleSwitchSignBtn() {
  switchSignBtn.disabled = currentNumber === 0;
}

function togglePercentageBtn() {
  document.querySelector("[data-operator='percentage']").disabled =
    rightNumber !== DEFAULTS.RIGHT_NUMBER || result !== DEFAULTS.RESULT;
}

function toggleSqrtBtn() {
  percentageBtn.disabled =
    leftNumber !== DEFAULTS.LEFT_NUMBER || result !== DEFAULTS.RESULT;
}

function handleInsertPoint() {
  if (isFloat && !`${currentNumber}`.includes(".")) {
    cancelFloat();
  } else if (isFloat) {
    return;
  } else {
    pointBtn.disabled = true;
    isFloat = true;
  }

  updateDisplay();
}

function cancelFloat() {
  isFloat = DEFAULTS.IS_FLOAT;
  pointBtn.disabled = false;
}

function handleClear() {
  currentNumber = DEFAULTS.CURRENT_NUMBER;
  leftNumber = DEFAULTS.LEFT_NUMBER;
  currentOperator = DEFAULTS.CURRENT_OPERATOR;
  rightNumber = DEFAULTS.RIGHT_NUMBER;
  result = DEFAULTS.RESULT;
  toggleSqrtBtn();
  toggleSwitchSignBtn();
  togglePercentageBtn();
  cancelFloat();
  updateDisplay();
}

function handleClearEntry() {
  currentNumber = DEFAULTS.CURRENT_NUMBER;
  toggleSwitchSignBtn();
  cancelFloat();
  updateDisplay();
}

function handleBackspace() {
  let currNumString = `${currentNumber}`;

  if (isFloat) {
    // And has only one number after the point...
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

  toggleSwitchSignBtn();
  updateDisplay();
}

function handleOperationButton(operator) {
  if (currentOperator === "divide" && currentNumber === 0) {
    alert("Não é possível dividir por 0!");
    return;
  }

  if (operator === "one-over") {
    leftNumber = 1;
    currentOperator = "divide";
    if (result !== null) {
      currentNumber = result;
      result = DEFAULTS.RESULT;
    }
    handleOperationButton("equals");
    return;
  }

  if (operator === "percentage") {
    if (currentOperator === "sum" || currentOperator === "subtract") {
      currentNumber = leftNumber * (currentNumber / 100);
    } else if (currentOperator === "multiply" || currentOperator === "divide") {
      currentNumber = currentNumber / 100;
    }
    handleOperationButton("equals");
    return;
  }

  if (operator === "square-root") {
    currentOperator = "square-root";
    rightNumber = currentNumber;
    result = Math.sqrt(currentNumber);
    updateDisplay();
    toggleSqrtBtn();
    return;
  }

  if (operator === "equals") {
    if (leftNumber === DEFAULTS.LEFT_NUMBER) return;

    rightNumber = currentNumber;
    if (result !== DEFAULTS.RESULT) {
      leftNumber = result;
      result = DEFAULTS.RESULT;
    }
    operate();
  } else if (result !== DEFAULTS.RESULT) {
    leftNumber = result;
    currentOperator = operator;
    rightNumber = DEFAULTS.RIGHT_NUMBER;
    result = DEFAULTS.RESULT;
    handleClearEntry();
  } else if (leftNumber === DEFAULTS.LEFT_NUMBER) {
    leftNumber = currentNumber;
    currentOperator = operator;
    handleClearEntry();
  } else if (rightNumber === DEFAULTS.RIGHT_NUMBER) {
    rightNumber = currentNumber;
    operate();
    leftNumber = result;
    currentOperator = operator;
    rightNumber = DEFAULTS.RIGHT_NUMBER;
    result = DEFAULTS.RESULT;
    handleClearEntry();
  }

  updateDisplay();
  toggleSqrtBtn();
  togglePercentageBtn();
}

function operate() {
  switch (currentOperator) {
    case "divide":
      result = leftNumber / rightNumber;
      break;
    case "multiply":
      result = leftNumber * rightNumber;
      break;
    case "subtract":
      result = leftNumber - rightNumber;
      break;
    case "sum":
      result = leftNumber + rightNumber;
      break;
  }
}
