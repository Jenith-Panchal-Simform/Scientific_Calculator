document.querySelector("#button-grid").addEventListener("click", handleButtonClick);

const input = document.querySelector(".calculator__input");

function handleButtonClick(e) {

  if (!e.target.dataset.value && !e.target.dataset.action) return;

  const val = e.target.dataset.value ?? e.target.dataset.action;

  if (val === "delete") {
    if (input.value.length > 1) {
      let result = input.value.slice(0, -1); 
      input.value = result;
    } else {
      input.value = "0";
    }
  }

  else if (val === "clear") {
    input.value = "0";
  }

  else {
    if (input.value === "0") {
      input.value = val;  // replace 0
    } else {
      input.value += val;
    }
  }
}