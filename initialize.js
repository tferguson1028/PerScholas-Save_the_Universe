//# SETUP
let currentPlayer = undefined;
let currentAlien = undefined;
let currentTurnActor;
let currentTurnReceiver;

let numAliens = 10;

let gameFinished = false;
let playerTurn = true;

const actions = {
  attk: "attack",
  dfnd: "defend",
  heal: "heal",
  chrg: "chrg"
};

const shipSections = document.querySelectorAll(".shipView");
const shipStats = document.querySelectorAll(".shipStats");
const consoleSection = document.querySelector("#console");
const actionButtons = document.querySelector("#userInteraction").children;
console.log(actionButtons);
console.log(actionButtons["inputStep"]); // Cool this works

//# MAIN
actionButtons["inputStep"].addEventListener("click", function(event)
{
  event.cancelable = false;
  event.preventDefault();  
  
  if(typeof currentPlayer === 'undefined')
  {
    currentPlayer = new PlayerShip();
    currentTurnActor = currentPlayer;
    
    printConsoleMessage(`${stringAsName(currentPlayer.name)} readies a ship to embark on a journey!`);
    
    attachShip(currentPlayer, 0, 0, 0);
    attachShipStats(currentPlayer, 0);
    event.target.textContent = "embark"
  }else if(typeof currentAlien === 'undefined')
  {
    currentAlien = new EnemyShip();
    currentTurnReceiver = currentAlien;
    
    attachShip(currentAlien, 1, 1);
    attachShipStats(currentAlien, 1);
    printConsoleMessage("An enemy vessel has appeared to block your path! What will you do?");
    setInBattle(true);
    
    event.target.textContent = "onwards"
  }else
  {
    printConsoleMessage("You cannot continue until the fight is finished!");
  }
});

actionButtons["inputFlee"].addEventListener("click", function(event)
{
  event.cancelable = false;
  event.preventDefault();  
  
  if(typeof currentAlien !== "undefined")
  {
    printConsoleMessage(`${stringAsName(currentPlayer.name)} cannot flee while under attack!`);
  }
});

actionButtons["inputAttk"].addEventListener("click", () => step(currentTurnActor, actions.attk, currentTurnReceiver));
actionButtons["inputDfnd"].addEventListener("click", () => step(currentTurnActor, actions.dfnd));
actionButtons["inputHeal"].addEventListener("click", () => step(currentTurnActor, actions.heal));
actionButtons["inputChrg"].addEventListener("click", () => step(currentTurnActor, actions.chrg));
