const items = document.querySelectorAll(".field__item");
const info = document.querySelector(".info");
const span = document.querySelector("span");
const btn = document.querySelector(".play-again");

let currentPlayer = "X";
let active = true;
let currentItems = ["", "", "", "", "", "", "", "", ""];

const winningRules = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const verifyWinner = () => {
  let won = false;
  for (let i = 0; i <= 7; i++) {
    const [fieldA, fieldB, fieldC] = winningRules[i];
    const valueOne = currentItems[fieldA];
    const valueTwo = currentItems[fieldB];
    const valueThree = currentItems[fieldC];

    if (valueOne !== "" && valueOne === valueTwo && valueOne === valueThree) {
      won = true;
      break;
    }
  }
  if (won) {
    active = false;
    winMessage();
  } else if (isFull()) {
    active = false;
    drawMessage();
  }
};

const isFull = () => {
  return currentItems.find((element) => element === "") === undefined;
};

const winMessage = () => {
  info.textContent = `Winner is ${currentPlayer}`;
  info.style.display = "block";
};
const drawMessage = () => {
  info.textContent = "DRAW!";
  info.style.display = "block";
};

span.textContent = "X";
items.forEach((item) => {
  item.addEventListener("click", (e) => {
    const { field_number } = e.target.dataset;

    if (active && currentItems[field_number] === "") {
      currentItems[field_number] = currentPlayer;
      e.target.classList.add(`field__item--symbol-${currentPlayer}`);
      verifyWinner();
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      span.textContent = currentPlayer;
      if (active === false) {
        span.textContent = " ---";
      }
    }
  });
});

const reset = () => {
  currentItems = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  active = true;
  items.forEach((item) => {
    item.classList.remove("field__item--symbol-X", "field__item--symbol-O");
  });
  info.style.display = "none";
  span.textContent = "X";
};

btn.addEventListener("click", reset);
