import React, { useState } from "react";
import "./index.css";

function ScientificCalculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue("0.");
      setWaitingForSecondOperand(false);
    } else if (!displayValue.includes(".")) {
      setDisplayValue(`${displayValue}.`);
    }
  };

  const clearAll = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const clearDisplay = () => {
    setDisplayValue("0");
  };

  const toggleSign = () => {
    setDisplayValue(
      displayValue.charAt(0) === "-"
        ? displayValue.slice(1)
        : `-${displayValue}`
    );
  };

  const inputPercent = () => {
    const value = parseFloat(displayValue);
    setDisplayValue(`${value / 100}`);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculateResult();
      setDisplayValue(`${result}`);
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculateResult = () => {
    const inputValue = parseFloat(displayValue);

    switch (operator) {
      case "+":
        return firstOperand + inputValue;
      case "-":
        return firstOperand - inputValue;
      case "*":
        return firstOperand * inputValue;
      case "/":
        return firstOperand / inputValue;
      case "^":
        return Math.pow(firstOperand, inputValue);
      case "√":
        return Math.sqrt(inputValue);
      default:
        return inputValue;
    }
  };

  const handleKeyDown = (event) => {
    const { key } = event;

    if (/\d/.test(key)) {
      event.preventDefault();
      inputDigit(parseInt(key, 10));
    } else if (key === ".") {
      event.preventDefault();
      inputDecimal();
    } else if (key === "Backspace") {
      event.preventDefault();
      clearDisplay();
    } else if (key === "Escape") {
      event.preventDefault();
      clearAll();
    } else if (key === "+") {
      event.preventDefault();
      performOperation("+");
    } else if (key === "-") {
      event.preventDefault();
      performOperation("-");
    } else if (key === "*") {
      event.preventDefault();
      performOperation("*");
    } else if (key === "/") {
      event.preventDefault();
      performOperation("/");
    } else if (key === "Enter" || key === "=") {
      event.preventDefault();
      performOperation("=");
    }
  };

  return (
    <div
      className="scientific-calculator"
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <div className="calculator-display">{displayValue}</div>
      <div className="calculator-buttons">
        <button className="key" onClick={clearAll}>
          AC
        </button>
        <button className="key" onClick={toggleSign}>
          +/-
        </button>
        <button className="key" onClick={inputPercent}>
          %
        </button>
        <button className="key operator" onClick={() => performOperation("^")}>
          x<sup>y</sup>
        </button>
        <button className="key operator" onClick={() => performOperation("√")}>
          √
        </button>
        <button className="key" onClick={() => inputDigit(7)}>
          7
        </button>
        <button className="key" onClick={() => inputDigit(8)}>
          8
        </button>
        <button className="key" onClick={() => inputDigit(9)}>
          9
        </button>
        <button className="key operator" onClick={() => performOperation("/")}>
          ÷
        </button>
        <button className="key" onClick={() => inputDigit(4)}>
          4
        </button>
        <button className="key" onClick={() => inputDigit(5)}>
          5
        </button>
        <button className="key" onClick={() => inputDigit(6)}>
          6
        </button>
        <button className="key operator" onClick={() => performOperation("*")}>
          ×
        </button>
        <button className="key" onClick={() => inputDigit(1)}>
          1
        </button>
        <button className="key" onClick={() => inputDigit(2)}>
          2
        </button>
        <button className="key" onClick={() => inputDigit(3)}>
          3
        </button>
        <button className="key operator" onClick={() => performOperation("-")}>
          -
        </button>
        <button className="key" onClick={() => inputDigit(0)}>
          0
        </button>
        <button className="key" onClick={inputDecimal}>
          .
        </button>
        <button className="key operator" onClick={() => performOperation("=")}>
          =
        </button>
        <button className="key operator" onClick={() => performOperation("+")}>
          +
        </button>
      </div>
    </div>
  );
}

export default ScientificCalculator;
