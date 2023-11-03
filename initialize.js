//# SETUP
let currentPlayer = undefined;
let currentAlien = undefined;
let numAliens = 10;

let gameFinished = false;
let playerTurn = true;

const shipSections = document.querySelectorAll(".shipView");
const consoleSection = document.querySelector("#console");

const actionButtons = {
  attack: document.querySelector("#inputAttk"),
  defend: document.querySelector("#inputDfnd"),
  heal:   document.querySelector("#inputHeal"),
  flee:   document.querySelector("#inputFlee"),
  embark: document.querySelector("#inputStep")
};


//# MAIN

actionButtons.embark.addEventListener("click", function(event)
{
  if(typeof currentPlayer === 'undefined')
  {
    currentPlayer = new PlayerShip();
    printConsoleMessage(`${stringAsName(currentPlayer.name)} readies a ship to embark on a journey!`);
    
    attachShip(currentPlayer, 0, 0);
    event.target.textContent = "embark"
  }else if(typeof currentAlien === 'undefined')
  {
    currentAlien = new EnemyShip();
    attachShip(currentAlien, 1);
    printConsoleMessage("An enemy vessel has appeared to block your path! What will you do?");
    event.target.textContent = "onwards"
  }else
  {
    printConsoleMessage("You cannot continue until the fight is finished!");
  }
});

actionButtons.attack.addEventListener("click", () => step(currentPlayer, "attack", currentAlien));
actionButtons.defend.addEventListener("click", () => step(currentPlayer, "defend"));


