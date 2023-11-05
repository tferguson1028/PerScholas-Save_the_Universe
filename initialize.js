//# SETUP
let currentPlayer;
let currentAlien;
let retreatedAlien;

let currentTurnActor;
let currentTurnReceiver;

let retreatsLeft = 3;

const numAliens = Math.floor(Math.random()*(30-12)+12);
let alienCount = 0;

let gameFinished = false;

const actions = {
  attk: "attack",
  dfnd: "defend",
  heal: "heal",
  chrg: "charge"
};

const debugVisualNode = document.querySelector("#debugVisualizer"); 

const shipSections = document.querySelectorAll(".shipView");
const shipStats = document.querySelectorAll(".shipStats");
const consoleSection = document.querySelector("#console");
const actionButtons = document.querySelector("#userInteraction").children;
console.log(actionButtons);
console.log(actionButtons["inputStep"]); // Cool this works

//# Event Listeners
actionButtons["inputStep"].addEventListener("click", function(event)
{
  event.cancelable = false;
  event.preventDefault();
  
  if(gameFinished)
  {
    gameOver();
    return;
  }
  
  if(typeof currentPlayer === 'undefined')
  {
    currentPlayer = new PlayerShip();
    currentTurnActor = currentPlayer;
    
    printConsoleMessage(`${stringAsName(currentPlayer.name)} readies a ship to go on a journey!`);
    printConsoleMessage(`There are ${numAliens} hostile, alien vessels blocking your path. Do you embark?`);
    
    attachShip(currentPlayer, 0, 0, 0);
    attachShipStats(currentPlayer, 0);
    updateHullVisuals(currentPlayer, 0);
    
    //Apparently currentTarget has better functionality
    event.currentTarget.innerHTML = "<img src=\"assets/icons/alien-fire_pixelated-colored.png\" class=\"guiIcon\"/><span>embark</span>";
  }else if(typeof currentAlien === 'undefined')
  {
    if(alienCount >= numAliens)
    {
      gameCompleteSequence();
      return;
    }
    
    if(typeof retreatedAlien === "undefined")
    {
      currentAlien = new EnemyShip(alienCount);
      attachShip(currentAlien, 1, 1);
    }else
    {
      currentAlien = retreatedAlien;
      currentAlien.doRepairByPercent(1);
      retreatedAlien = undefined;
      shipSections[1].style.visibility = "visible";
    }
    
    currentTurnReceiver = currentAlien;
    attachShipStats(currentAlien, 1);
    printConsoleMessage(`The ${toOrdinal(++alienCount)} enemy vessel has appeared to block your path! What will you do?`);
    updateHullVisuals(currentAlien, 1);
    setInBattle(true);
    event.currentTarget.innerHTML = "<img src=\"assets/icons/alien-fire_pixelated-colored.png\" class=\"guiIcon\"/><span>onwards</span>"
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
  
  if(gameFinished)
  {
    gameOver();
    return;
  }
  
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
    abandonSequence();
  }
});

actionButtons["inputAttk"].addEventListener("click", () => {
  if(gameFinished)
  {
    gameOver();
    return;
  }

  if(step(currentPlayer, actions.attk, currentAlien) === true)
    doAlienStep();
});

actionButtons["inputDfnd"].addEventListener("click", () => {
  if(gameFinished)
  {
    gameOver();
    return;
  }

  step(currentPlayer, actions.dfnd);
  doAlienStep();
});

actionButtons["inputHeal"].addEventListener("click", () => {
  if(gameFinished)
  {
    gameOver();
    return;
  }
  
  if(typeof currentAlien !== "undefined")
  {
    if(retreatsLeft >= 1)
    {
      printConsoleMessage(`${stringAsName(currentPlayer.name)} retreats back to base to recuperate their shields!`);
      // retreatSequence();
      retreatsLeft--;
      alienCount--;
    }else
    {
      printConsoleMessage(`${stringAsName(currentPlayer.name)} does not have enough fuel to flee again!`);
    }
  }else
  {
    printConsoleMessage(`${stringAsName(currentPlayer.name)} is not under attack, they do not need to flee.`);
  }
  
  step(currentPlayer, actions.heal);
  alternateTurn();
  // doAlienStep();
});

actionButtons["inputChrg"].addEventListener("click", () => {
  if(gameFinished)
  {
    gameOver();
    return;
  }

  step(currentPlayer, actions.chrg);
  doAlienStep();  
});

//This is debug visual helper. If button is pressed, toggle debug view.
document.querySelector("html").addEventListener('keydown', (event) =>
{
  // event.preventDefault(); // This broke browser hotkeys
  // event.stopPropagation();
  
  // Kinda got this idea from https://stackoverflow.com/a/54441305
  // IT WORKED
  if(event.key === '`' && debugVisualNode.rel === "stylesheet")
    debugVisualNode.rel = "";
  else if(event.key === '`')
    debugVisualNode.rel = "stylesheet";
});
