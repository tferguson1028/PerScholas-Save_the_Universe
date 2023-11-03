//# SETUP
let currentPlayer = undefined;
let currentAlien = undefined;
let currentTurnActor;
let currentTurnReceiver;

let gameFinished = false;
const numAliens = Math.floor(Math.random()*(20-5)+5);
let alienCount = 0;

const actions = {
  attk: "attack",
  dfnd: "defend",
  heal: "heal",
  chrg: "charge"
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
    
    printConsoleMessage(`${stringAsName(currentPlayer.name)} readies a ship to go on a journey!`);
    printConsoleMessage(`There are ${numAliens} hostile, alien vessels blocking your path. Do you embark?`);
    
    attachShip(currentPlayer, 0, 0, 0);
    attachShipStats(currentPlayer, 0);
    updateHullVisuals(currentPlayer, 0);
    
    event.target.textContent = "embark";
  }else if(typeof currentAlien === 'undefined')
  {
    if(alienCount >= numAliens)
    {
      gameCompleteSequence();
      return;
    }
    
    currentAlien = new EnemyShip();
    currentTurnReceiver = currentAlien;
    
    attachShip(currentAlien, 1, 1);
    attachShipStats(currentAlien, 1);
    printConsoleMessage(`The ${toOrdinal(++alienCount)} enemy vessel has appeared to block your path! What will you do?`);
    updateHullVisuals(currentAlien, 1);
    setInBattle(true);
    event.target.textContent = "onwards"
  }else
  {
    console.log(typeof currentAlien);
    console.log(currentAlien);
    printConsoleMessage("You cannot continue until the fight is finished!");
  }  
});

actionButtons["inputFlee"].addEventListener("click", function(event)
{
  event.cancelable = false;
  event.preventDefault();  
  
  if(typeof currentPlayer === "undefined")
  {
    printConsoleMessage(`You have no ship to flee with.`);
    return;
  }
    
  
  if(typeof currentAlien !== "undefined")
  {
    printConsoleMessage(`${stringAsName(currentPlayer.name)} cannot flee while under attack!`);
  }else
  {
    printConsoleMessage(`${stringAsName(currentPlayer.name)} flees from the front-lines, living to see another day.`);
    gameOverSequence();
  }
});

actionButtons["inputAttk"].addEventListener("click", () => {
  if(step(currentPlayer, actions.attk, currentAlien) === true)
    doAlienStep();
});
actionButtons["inputDfnd"].addEventListener("click", () => {
  step(currentPlayer, actions.dfnd);
  doAlienStep();
});
actionButtons["inputHeal"].addEventListener("click", () => {
  step(currentPlayer, actions.heal);
  doAlienStep();  
});
actionButtons["inputChrg"].addEventListener("click", () => {
  step(currentPlayer, actions.chrg);
  doAlienStep();  
});
