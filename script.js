let humanWins = 0;
let computerWins = 0;

let keepGoing = true;
let roundCount = 0;

let weapons = ["rock", "paper", "shotgun"];

let playerInput = null;
let inputPromptMessage = { promptText: "Choose: rock, paper, shotgun!", default: "Shockypaperotgun" };

function getRangedRandomInt(min, max) {
  let range = max - min;
  return min + Math.round(Math.random() * range);
}

function initialiseGame() {
  roundCount = 0;
  humanWins = 0;
  computerWins = 0;
}

function initialiseRound() {
  playerInput = null;
  inputPromptMessage = { promptText: "Choose: rock, paper, shotgun!", default: "Shockypaperotgun" };
}

function validateInput(input) {
  input = input.toLowerCase();
  switch (input) {
    case "rock": 
    case "r": 
      return "rock"; 
    case "paper": 
    case "p": 
      return "paper";
    case "shotgun":
    case "s":
      return "shotgun";
    default:
      return null;
  }
}

function checkRestartInput(input) {
  input = input.toLowerCase();
  switch (input) {
    case "aw yeah man, that was absolutely incredible.":
    case "aw yeah man, that was absolutely incredible":
    case "aw yeah man":
    case "yes":
    case "y":
      // keepGoing remains true and the game restarts. 
      keepGoing = true;
      break;
    default:
      keepGoing = false;
  }
}

function runRound(playerChoice, computerChoice) {
  switch (playerChoice) {
    case "rock":
      if (computerChoice === "shotgun") {
        alert("Your opponent fires a buckshot from their shotgun and it rebounds off your rock - you win the round!");
        humanWins++;
      } else if (computerChoice === "paper") {
        alert("You got wrapped up in paper and suffocated to death. Oof.");
        computerWins++;
      } else {
        alert("The rocks rub up against each other and nothing much happens. Guess it's a draw..."); 
      }
      break;
    case "paper":
      if (computerChoice === "rock") {
        alert("You win to the max! There's no way the rock can defend the fluid curves of a piece of paper.");
        humanWins++;
      } else if (computerChoice === "shotgun") {
        alert("Your opponent fires a shell and your paper shield is shredded into nothing. Oof.");
        computerChoice++;
      } else {
        alert("The paper rubs up against another piece of paper and they sort of crinkle up, but not enough to determine a victor. It's a draw...");
      }
      break;
    case "shotgun":
      if (computerChoice === "rock") {
        alert("You fire a buckshot from your shotgun and it rebounds off your opponent's rock. It blasts back into your face - you lose!");
        computerWins++;
      } else if (computerChoice === "paper") {
        alert("You fire a shot which tears through your opponent's paper shield. You win!");
        humanWins++;
      } else {
        alert("You fire upon each other and both die simultaneously like in a vintage multiplayer game of Halo. Guess it's a draw..."); 
      }
      break;
    default:
      alert(`I have no idea what a ${playerChoice} is. Pick something legit next time.`);
      break;
  }
}

// Keep going until the user quits at the end. 
while(keepGoing) {

  initialiseGame(); 

  for (let round = 0; round < 5; round++) {
    initialiseRound();

    // Get input from player - will you choose rock, paper or shotgun? 
    while (playerInput == null) {
      playerInput = validateInput(prompt(inputPromptMessage.promptText, inputPromptMessage.default)); 
      if (playerInput == null) {
        inputPromptMessage.promptText = "No! I said choose a ROCK, PAPER, or SHOTGUN!!!";
      }
    }

    // Now have valid input, run the round. 
    runRound(playerInput, weapons[getRangedRandomInt(0, weapons.length - 1)]);
  }

  // We have escaped the while loop, so the human or computer must have won. 
  if (humanWins > computerWins) {
    checkRestartInput(prompt("Congrats! You won at the guessing game! Play again?", "Aw yeah man, that was absolutely incredible."));
  } else {
    checkRestartInput(prompt("Boo! The computer won. Skynet is real! Play again?", "Ummmmm yeah no thanks.")); 
  }
}