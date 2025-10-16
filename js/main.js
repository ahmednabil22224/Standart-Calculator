const operators = "+-*/%";
let input = document.getElementById("input");
let bttns = document.getElementById("bttns");

// =======================Buttons Listeners==========================
bttns.addEventListener("click", function (e) {
  if (!e.target.closest("button")) return;

  const bttnValue = e.target.value;

  if (
    input.value === "Can't divid by zero" ||
    input.value === "Result is undefined"
  ) {
    input.value = "";
  }
  // ---------------------Add, Min, Divid, Multiply and Modulus Operators Buttons--------------------------
  if (bttnValue === "+") operatorBttn(bttnValue);
  if (bttnValue === "-") operatorBttn(bttnValue);
  if (bttnValue === "*") operatorBttn(bttnValue);
  if (bttnValue === "/") operatorBttn(bttnValue);
  if (bttnValue === "%") operatorBttn(bttnValue);

  // -------------------------------Remove Button X-------------------------------------
  if (bttnValue === "X") removeBttn();

  // ---------------------------------Clear Button--------------------------------------
  if (bttnValue === "AC") clearBttn();

  // ------------------------------Dot Button-----------------------------------------
  if (bttnValue === ".") dotBttn(bttnValue);

  // ----------------------Zero Button && Double Zero Button------------------------
  if (bttnValue === "0") zeroBttns(bttnValue);
  if (bttnValue === "00") zeroBttns(bttnValue);

  // --------------------------Num Buttons 1 to 9---------------------------------
  for (let i = 1; i <= 9; i++) {
    if (bttnValue === i.toString()) numBttns(bttnValue);
  }

  // ------------------------------equal Button------------------------------------------
  if (bttnValue === "=") handleResult();
});
// =================== Keyboard Listener ============================
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key.trim() !== "" && (!isNaN(key) || "+-*/%.".includes(key)))
    input.value += key;
  if (key === "Enter") handleResult();
  if (key === "Backspace") removeBttn();
});
// =================================================================

// -----------------Operators * / - + % Buttons Function-----------------
function operatorBttn(operator) {
  if (input.value === "") return;
  else if (
    operators.includes(input.value.at(-1)) ||
    input.value.at(-1) === "."
  ) {
    input.value = input.value.slice(0, -1) + operator;
  } else input.value += operator;
}

// ---------------------Operators Remove Button Function-----------------
function removeBttn() {
  if (input.value === "Wrong Expression") {
    input.value = "";
  }
  input.value = input.value.slice(0, -1);
}

// ---------------------Operators Clear Button Function-----------------
function clearBttn() {
  input.value = "";
}

// ---------------------Operators Dot Button Function-----------------
function dotBttn(bttn) {
  if (
    input.value === "" ||
    operators.includes(input.value.at(-1)) ||
    input.value === "Wrong Expression"
  )
    input.value += "0.";
  const lastNumber = input.value.split(/[-+*/%]/).pop();
  if (lastNumber.includes(bttn)) return;
  input.value += bttn;
}

// ---------------------Operators Zeros Buttons Function-----------------
function zeroBttns(bttn) {
  if (
    input.value === "" ||
    input.value === "0" ||
    input.value === "Wrong Expression"
  )
    input.value = "0";
  else if (bttn === "00" && operators.includes(input.value.at(-1)))
    input.value += 0;
  else if (input.value.at(-1) === "0" && operators.includes(input.value.at(-2)))
    return;
  else input.value += bttn;
}

// ----------------Operators Nums 1 -> 9 Buttons Function-----------------
function numBttns(bttn) {
  if (
    input.value === "" ||
    input.value === "0" ||
    input.value === "Wrong Expression"
  )
    input.value = bttn;
  else if (
    input.value.at(-1) === "0" &&
    operators.includes(input.value.at(-2))
  ) {
    input.value = input.value.slice(0, -1);
    input.value += bttn;
  } else input.value += bttn;
}

// ---------------------Operators Result Button Function-----------------
function handleResult() {
  try {
    if (input.value === "" || operators.includes(input.value.at(-1))) return;
    else if (eval(input.value) === Infinity) {
      input.value = "Can't divid by zero";
    } else if (Number.isNaN(eval(input.value))) {
      input.value = "Result is undefined";
    } else input.value = eval(input.value);
  } catch {
    input.value = "Wrong Expression";
  }
}


