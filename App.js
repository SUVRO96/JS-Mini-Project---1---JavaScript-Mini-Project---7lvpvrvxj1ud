const selectionButtons = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column]");
const computerScore = document.querySelector("[data-computer-score]");
const yourScore = document.querySelector("[data-your-score]");

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
