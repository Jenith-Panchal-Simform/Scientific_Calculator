// document.querySelector("#button-grid").addEventListener("click", handleButtonClick);

// const input = document.querySelector(".calculator__input");

// function handleButtonClick(e) {

//   if(input.value == "0")
//   {
//     input.value="";
//   }
//   if (!e.target.dataset.value && !e.target.dataset.action) return;

//   const val = e.target.dataset.value ?? e.target.dataset.action ;

//   if (val === "delete") {
//     if (input.value.length > 1) {
//       let result = input.value.slice(0, -1); 
//       input.value = result;
//     } else {
//       input.value = "0";
//     }
//   }

//   else if (val === "clear") {
//     input.value = "0";
//   }

//   else if(val == "pi")
//   {
//     input.value+=3.14;
//   }

//   else if(val=="x2")
//   {
//     input.value+='^'+2;
//   }
  
//   else if(val == "1/x")
//   {
//     input.value=1+"/"+input.value;
//   }

//   else if(val == "abs")
//   {
//     input.value="|"+input.value+"|"
//   }
//   else if(val=="sqrt")
//   {
//     input.value='sqrt'+input.value;
//   }
//   else if(val=="fact")
//   {
//     input.value+="!"
//   }
//   else if (val=="calculate")
//   {
//     //function call
//     //res shown to input.val
//   }
//   else {
//     if (input.value === "0") {
//       input.value = val;  // replace 0
//     } else {
//       input.value += val;
//     }
//   }
// }
import calculation from "./calculation.js"; 
class Calculator {
  constructor(inputSelector, gridSelector) {
    this.input = document.querySelector(inputSelector);
    this.grid = document.querySelector(gridSelector);

    this.grid.addEventListener("click", this.handleClick.bind(this));

    this.actions = {
      delete: () => this.delete(),
      clear: () => this.clear(),
      pi: () => this.append(Math.PI.toFixed(6)),
      x2: () => this.append("^2"),
      "1/x": () => this.inverse(),
      // abs: () => this.wrap("|"),
      // sqrt: () => this.append("sqrt"),
      // fact: () => this.append("!"),
      calculate: () => this.calculate()
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
      this.input.value.length > 1
        ? this.input.value.slice(0, -1)
        : "0";
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
   
  }

}

const c=new Calculator(".calculator__input", "#button-grid");
console.log(c);

