let currentNumber = 0;
let isFloat = false;

const numbersBtns = document.querySelectorAll(".number");
const switchSignBtn = document.querySelector(".switch-sign");
const pointBtn = document.querySelector(".point");

window.onload = updateDisplay;
window.onkeydown = (e) => {
  if (!isNaN(parseInt(e.key))) handleNumberInput(e);
  if (e.key === ".") handleInsertPoint();
};
numbersBtns.forEach((b) => b.addEventListener("click", handleNumberInput));
switchSignBtn.addEventListener("click", handleSwitchSign);
pointBtn.addEventListener("click", handleInsertPoint);

function updateDisplay() {
  const display = document.querySelector(".display");
  display.textContent = currentNumber;

  // If is float and has no digits before the floating point...
  if (isFloat && `${currentNumber}`.indexOf(".") === -1) {
    display.textContent = `${currentNumber}.0`;
  }
}

function handleNumberInput(e) {
  if (
    (isFloat && `${currentNumber}`.length === 9) ||
    (!isFloat && `${currentNumber}`.length === 8)
  ) {
    return;
  }

  let num;

  if (e.type === "click") {
    num = e.target.textContent;
  } else if (e.type === "keydown") {
    num = e.key;
  }

  if (!num) return;

  if (isFloat) {
    let pointIndex = `${currentNumber}`.indexOf(".");
    currentNumber =
      pointIndex === -1
        ? parseFloat(`${currentNumber}.${num}`)
        : parseFloat(`${currentNumber}${num}`);
  } else {
    currentNumber = parseInt(`${currentNumber}${num}`);
  }

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
