const selectionButtons = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column]");
const computerScore = document.querySelector("[data-computer-score]");
const yourScore = document.querySelector("[data-your-score]");
const chances = document.getElementById("chances");
const modal = document.getElementById("myModal");
const winnerDclr = document.getElementById("winning");
const resetBtn = document.getElementById("reset");
let count = 10;

const SELECTION = [
  {
    name: "rock",
    emoji: "✊",
    beats: "scissors",
  },
  {
    name: "paper",
    emoji: "🤚",
    beats: "rock",
  },
  {
    name: "scissors",
    emoji: "✌️",
    beats: "paper",
  },
];

selectionButtons.forEach(buttons => {
  buttons.addEventListener("click", e => {
    const selectionName = buttons.dataset.selection;
    const selection = SELECTION.find(
      selection => selection.name === selectionName
    );
    count--;
    makeSelection(selection);
  });
});

function makeSelection(selection) {
  const computerSelection = randomSelection();
  const youwinner = isWinner(selection, computerSelection);
  const computerwinner = isWinner(computerSelection, selection);
  addSelectionResult(computerSelection, computerwinner);
  addSelectionResult(selection, youwinner);
  if (youwinner) increamentScore(yourScore);
  if (computerwinner) increamentScore(computerScore);
  if (count === 0) {
    declareWinner();
  }
}

function declareWinner() {
  let score1 = parseInt(computerScore.innerText);
  let score2 = parseInt(yourScore.innerText);
  if (score1 > score2) {
    winnerDclr.innerHTML = "<h3>Computer Wins!</h3>";
  } else if (score1 < score2) {
    winnerDclr.innerHTML = "<h3>You Win!</h3>";
  } else if (score1 == score2) {
    winnerDclr.innerHTML = "<h3>Draw!</h3>";
  }
  modal.style.display = "block";
}

function addSelectionResult(selection, winner) {
  const div = document.createElement("div");
  div.innerText = selection.emoji;
  div.classList.add("result-selection");
  if (winner) {
    div.classList.add("winner");
  }
  finalColumn.after(div);
}

function increamentScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name;
}

function randomSelection() {
  const randomNumber = Math.floor(Math.random() * SELECTION.length);
  return SELECTION[randomNumber];
}

resetBtn.addEventListener("click", () => {
  modal.style.display = "none";
  count = 10;
  computerScore.innerText = "0";
  yourScore.innerText = "0";
  const resultEle = document.querySelectorAll(".result-selection");
  resultEle.forEach(ele => {
    ele.remove();
  });
});
