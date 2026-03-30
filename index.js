import calculation from "./calculation.js";
class Calculator {
  constructor(inputSelector, gridSelector) {
    this.input = document.querySelector(inputSelector);
    this.grid = document.querySelector(gridSelector);

    this.grid.addEventListener("click", this.handleClick.bind(this));
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.actions = {
      delete: () => this.delete(),
      clear: () => this.clear(),
      pi: () => this.append(Math.PI.toFixed(6)),
      x2: () => this.append("^2"),
      "1/x": () => this.inverse(),
      // abs: () => this.wrap("|"),
      // sqrt: () => this.append("sqrt"),
      // fact: () => this.append("!"),
      calculate: () => this.calculate(),
    };
  }

  handleClick(e) {
    const button = e.target.closest("button");
    if (!button) return;

    const val = button.dataset.value ?? button.dataset.action;
    if (!val) return;

    if (this.input.value === "0" && val !== "clear") {
      this.input.value = "";
    }

    if (this.actions[val]) {
      this.actions[val]();
    } else {
      this.append(val);
    }
  }

  append(val) {
    this.input.value += val;
  }

  delete() {
    this.input.value =
      this.input.value.length > 1 ? this.input.value.slice(0, -1) : "0";
  }

  clear() {
    this.input.value = "0";
  }

  inverse() {
    this.input.value = `1/(${this.input.value})`;
  }

  wrap(symbol) {
    this.input.value = `${symbol}${this.input.value}${symbol}`;
  }

  calculate() {
    try {
      this.input.value = calculation(this.input.value);
    } catch (err) {
      this.input.value = err.message;
    }
  }

  handleKeyDown(e) {
    let key = e.key;
    if (/^[0-9+\-/*%^()]+$/.test(key)) {
      if (this.input.value === "0") {
        this.input.value = "";
      }
      this.append(key);
    }
    if(e.key=="Backspace")
    {
      this.delete();
    }
    if(e.key=="c" || e.key=="C")
    {
      this.clear();
    }
    if(e.key=="Enter")
    {
      this.calculate();
    }
  }
}

const c = new Calculator(".calculator__input", "#button-grid");
console.log(c);
