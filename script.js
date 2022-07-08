const display = document.querySelector(".display");
let currentNumber = 0;
const numberButtons = document.querySelectorAll(".number");

// Add numbers to the display
numberButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    display.innerText += e.target.innerText;
    currentNumber = parseInt(display.innerText);
  })
);

const sum = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

function operate(operator, x, y) {
  switch (operator) {
    case "sum":
      return sum(x, y);
    case "subtract":
      return subtract(x, y);
    case "multiply":
      return multiply(x, y);
    case "divide":
      return divide(x, y);
  }
}
