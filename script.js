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
