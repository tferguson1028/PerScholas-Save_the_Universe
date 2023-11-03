//# SETUP
let currentPlayer = undefined;
let currentAlien = undefined;
let numAliens = 10;

let gameFinished = false;
let playerTurn = true;

const shipSections = document.querySelectorAll(".shipView");
const shipStats = document.querySelectorAll(".shipStats");
const consoleSection = document.querySelector("#console");

const actionButtons = {
  attk: document.querySelector("#inputAttk"),
  dfnd: document.querySelector("#inputDfnd"),
  heal: document.querySelector("#inputHeal"),
  chrg: document.querySelector("#inputChrg"),
  step: document.querySelector("#inputStep")
};

const actions = {
  attk: "attack",
  dfnd: "defend",
  heal: "heal",
  chrg: "chrg"
}

//# MAIN
actionButtons.step.addEventListener("click", function(event)
{
  if(typeof currentPlayer === 'undefined')
  {
    currentPlayer = new PlayerShip();
    printConsoleMessage(`${stringAsName(currentPlayer.name)} readies a ship to embark on a journey!`);
    
    attachShip(currentPlayer, 0, 0, 0);
    attachShipStats(currentPlayer, 0);
    event.target.textContent = "embark"
  }else if(typeof currentAlien === 'undefined')
  {
    currentAlien = new EnemyShip();
    attachShip(currentAlien, 1, 1);
    attachShipStats(currentAlien, 1);
    printConsoleMessage("An enemy vessel has appeared to block your path! What will you do?");
    event.target.textContent = "onwards"
  }else
  {
    printConsoleMessage("You cannot continue until the fight is finished!");
  }
});

actionButtons.attk.addEventListener("click", () => step(currentPlayer, actions.attk, currentAlien));
actionButtons.dfnd.addEventListener("click", () => step(currentPlayer, actions.dfnd));
actionButtons.heal.addEventListener("click", () => step(currentPlayer, actions.heal));
actionButtons.chrg.addEventListener("click", () => step(currentPlayer, actions.chrg));


