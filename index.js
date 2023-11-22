let currentNumber = 0;

const numbersBtns = document.querySelectorAll(".number");
const switchSignBtn = document.querySelector(".switch-sign");

window.onload = updateDisplay;
window.onkeydown = handleNumberInput;
numbersBtns.forEach((b) => b.addEventListener("click", handleNumberInput));
switchSignBtn.addEventListener("click", handleSwitchSign);

function updateDisplay() {
  const display = document.querySelector(".display");
  display.textContent = currentNumber;
}

function handleNumberInput(e) {
  if (currentNumber.toString().length === 8) return;

  let num;

  if (e.type === "click") {
    num = parseInt(e.target.textContent);
  } else if (e.type === "keydown") {
    num = parseInt(e.key);
  }

  if (!num) return;

  currentNumber = parseInt(currentNumber.toString() + num.toString());
  updateDisplay();
}

function handleSwitchSign() {
  currentNumber *= -1;
  updateDisplay();
}
