const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const shotgun = document.getElementById("shotgun");
const info = document.getElementById("info");
const gameStatus = document.getElementById("game-status");
const playerScoreInfo = document.getElementById("player-score");
const computerScoreInfo = document.getElementById("computer-score");

const roundsToWin = 5;

let humanWins = 0;
let computerWins = 0;

let weapons = ["rock", "paper", "shotgun"];

let playerInput = null;
let inputPromptMessage = { promptText: "Choose: rock, paper, shotgun!", default: "Shockypaperotgun" };

function setInfoTexts() {
  rock.weaponName = "rock";
  paper.weaponName = "paper";
  shotgun.weaponName = "shotgun";
}

function activateStartGameButton() {
  gameStatus.textContent = "START GAME";
  gameStatus.classList.add("selectable");
  gameStatus.id = "game-status";
  gameStatus.addEventListener("click", initialiseGame);
}

function deactivateStartGameButton() {
  gameStatus.textContent = "";
  gameStatus.classList.remove("selectable");
  gameStatus.id = "";
  gameStatus.removeEventListener("click", initialiseGame);
}

function activateWeaponInput() {
  rock.addEventListener("click", runRound);
  paper.addEventListener("click", runRound);
  shotgun.addEventListener("click", runRound);
  rock.classList.add("selectable");
  paper.classList.add("selectable");
  shotgun.classList.add("selectable");
}

function deactivateWeaponInput() {
  rock.removeEventListener("click", runRound);
  paper.removeEventListener("click", runRound);
  shotgun.removeEventListener("click", runRound);
  rock.classList.remove("selectable");
  paper.classList.remove("selectable");
  shotgun.classList.remove("selectable");
}

function getRangedRandomInt(min, max) {
  let range = max - min;
  return min + Math.round(Math.random() * range);
}

function initialiseGame() {
  roundCount = 0;
  humanWins = 0;
  computerWins = 0;
  info.textContent = "Choose rock, paper, or shotgun!";
  updateScores();
  deactivateStartGameButton();
  activateWeaponInput();
}

function runRound(e) {

  let playerChoice = e.currentTarget.weaponName;
  let computerChoice = weapons[getRangedRandomInt(0, weapons.length - 1)];

  switch (playerChoice) {
    case "rock":
      if (computerChoice === "shotgun") {
        setInfo("Your opponent fires a buckshot from their shotgun and it rebounds off your rock - you win the round!");
        humanWins++;
      } else if (computerChoice === "paper") {
        setInfo("You got wrapped up in paper and suffocated to death. Oof.");
        computerWins++;
      } else {
        setInfo("The rocks rub up against each other and nothing much happens. Guess it's a draw..."); 
      }
      break;
    case "paper":
      if (computerChoice === "rock") {
        setInfo("You win to the max! There's no way the rock can defend the fluid curves of a piece of paper.");
        humanWins++;
      } else if (computerChoice === "shotgun") {
        setInfo("Your opponent fires a shell and your paper shield is shredded into nothing. Oof.");
        computerWins++;
      } else {
        setInfo("The paper rubs up against another piece of paper and they sort of crinkle up, but not enough to determine a victor. It's a draw...");
      }
      break;
    case "shotgun":
      if (computerChoice === "rock") {
        setInfo("You fire a buckshot from your shotgun and it rebounds off your opponent's rock. It blasts back into your face - you lose!");
        computerWins++;
      } else if (computerChoice === "paper") {
        setInfo("You fire a shot which tears through your opponent's paper shield. You win!");
        humanWins++;
      } else {
        setInfo("You fire upon each other and both die simultaneously like in a vintage multiplayer game of Halo. Guess it's a draw..."); 
      }
      break;
    default:
      setInfo(`I have no idea what a ${playerChoice} is. Pick something legit next time.`);
      break;
  }

  updateScores();
  checkScores();
}

function updateScores() {
  playerScoreInfo.textContent = `PLAYER: ${humanWins}`;
  computerScoreInfo.textContent = `SKYNET: ${computerWins}`;
}

function checkScores() {
  if (humanWins >= roundsToWin) {
    endGame("Player wins!");
  } else if (computerWins >= roundsToWin) {
    endGame("Skynet wins!");
  }
}

function endGame(endText) {
  deactivateWeaponInput();
  activateStartGameButton();
  setInfo(endText);
}

function setInfo(text) {
  info.textContent = text;
}

setInfoTexts();
activateStartGameButton();