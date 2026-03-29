Array.prototype.isEmpty = function () {
    return this.length === 0;
  };
  
  const precedence = new Map([
    ["^", 3],
    ["*", 2],
    ["/", 2],
    ["%", 2],
    ["+", 1],
    ["-", 1],
    ["(", 0],
  ]);
  
  function calculation(input) {
    const inputArr = input.split("");   
    const operator = [];                
    const operand = [];                 
  
    try {
      for (let i = 0; i < inputArr.length; i++) {
        let char = inputArr[i];
  
        if (char === " ") continue;
  
        // number / decimal
        if (!isNaN(char) || char === ".") {
          let num = char;
  
          while (
            i + 1 < inputArr.length &&
            (!isNaN(inputArr[i + 1]) || inputArr[i + 1] === ".")
          ) {
            num += inputArr[i + 1];
            i++;
          }
  
          operand.push(Number(num));
        } else {
          handleCalculator(char);
        }
      }
  
      while (!operator.isEmpty()) {
        const op = operator.pop();
  
        if (op === "(") {
          throw new Error("Mismatched brackets");
        }
  
        applyBinary(op);
      }
  
      if (operand.length !== 1) {
        throw new Error("Invalid expression");
      }
  
      return operand[0];   
    } catch (err) {
      throw new Error(err.message);  
    }
  

  
    function handleCalculator(char) {
      switch (char) {
        case "+":
        case "-":
        case "/":
        case "*":
        case "%":
        case "^":
          handleOperations(char);
          break;
  
        case "(":
          operator.push(char);
          break;
  
        case ")":
          handleCloseBracket();
          break;
  
        case "!":
          handleFactorial();
          break;
  
        default:
          throw new Error("Invalid character: " + char);
      }
    }
  
    function handleFactorial() {
      let val = operand.pop();
  
      if (val < 0) {
        throw new Error("Factorial of negative not allowed");
      }
  
      operand.push(factorial(val));
    }
  
    function handleOperations(char) {
      while (
        operator.length &&
        operator[operator.length - 1] !== "(" &&
        precedence.get(operator[operator.length - 1]) >= precedence.get(char)
      ) {
        let op = operator.pop();
        applyBinary(op);
      }
  
      operator.push(char);
    }
  
    function handleCloseBracket() {
      if (!operator.includes("(")) {
        throw new Error("Mismatched brackets");
      }
  
      while (operator.length && operator[operator.length - 1] !== "(") {
        let op = operator.pop();
        applyBinary(op);
      }
  
      operator.pop();
    }
  
    function applyBinary(op) {
      if (operand.length < 2) {
        throw new Error("Invalid expression");
      }
  
      let val2 = operand.pop();
      let val1 = operand.pop();
  
      operand.push(evaluate(op, val1, val2));
    }
  
    function evaluate(operator, operand1, operand2) {
      switch (operator) {
        case "+": return operand1 + operand2;
        case "-": return operand1 - operand2;
        case "*": return operand1 * operand2;
        case "/": return operand1 / operand2;
        case "%": return operand1 % operand2;
        case "^": return operand1 ** operand2;
        default: throw new Error("Unknown operator");
      }
    }
  
    function factorial(n) {
      if (n < 0) throw new Error("Invalid factorial");
      let res = 1;
      for (let i = 2; i <= n; i++) res *= i;
      return res;
    }
  }
  
  export default calculation;