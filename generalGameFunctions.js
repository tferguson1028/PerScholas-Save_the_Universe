const ships = {
  default: [
    "assets/sprites/player_ship/bases/Main Ship - Base - Full health.png",
    "assets/sprites/player_ship/bases/Main Ship - Base - Slight damage.png",
    "assets/sprites/player_ship/bases/Main Ship - Base - Damaged.png",
    "assets/sprites/player_ship/bases/Main Ship - Base - Very damaged.png"
  ],
  nairan: [
    "assets/sprites/enemy_ship_type1/bases/Nairan - Battlecruiser - Base.png",
    "assets/sprites/enemy_ship_type1/bases/Nairan - Bomber - Base.png",
    "assets/sprites/enemy_ship_type1/bases/Nairan - Dreadnought - Base.png",
    "assets/sprites/enemy_ship_type1/bases/Nairan - Fighter - Base.png",
    "assets/sprites/enemy_ship_type1/bases/Nairan - Frigate - Base.png",
    "assets/sprites/enemy_ship_type1/bases/Nairan - Scout - Base.png",
    "assets/sprites/enemy_ship_type1/bases/Nairan - Support Ship - Base.png",
    "assets/sprites/enemy_ship_type1/bases/Nairan - Torpedo Ship - Base.png"
  ]
};


//# Functionality Functions
function doAlienStep()
{
  if(currentTurnActor === currentAlien)
    setTimeout(step, Math.floor(Math.random()*(4000-1200)+1200), currentAlien, undefined, currentPlayer);
}

/**
 * Checks if the battle is finished based on player and enemy ship health hull, 
 * if so, call the necessary functions for the next step of the game. 
 * Returns boolean variable if battle is finished or not. 
 * @returns boolean
 */
function battleFinishedSequence()
{
  if(typeof currentPlayer !== "undefined" && currentPlayer.hullPercentage() <= 0)
  {
    shipDefeatedSequence(currentPlayer, 0);
    currentPlayer = undefined;
    gameOverSequence();
    return true;
  }
  
  if(typeof currentAlien !== "undefined" && currentAlien.hullPercentage() <= 0)
  {
    shipDefeatedSequence(currentAlien, 1);
    currentAlien = undefined;
    return true;
  }
  
  alternateTurn();
  return false;
}

/**
 * Swaps currentTurnActor and currentTurnReceiver, which are used for game state checks.
 * Also prints console message to inform the player of the game state.
 */
function alternateTurn()
{
  let temp = currentTurnActor;
  currentTurnActor = currentTurnReceiver;
  currentTurnReceiver = temp;
  
  if(currentTurnActor === currentPlayer)
    document.querySelectorAll("#userInteraction").forEach((btn) => btn.disabled = true);
  
  printConsoleMessage(`It's ${stringAsName(currentTurnActor.name)}'s turn to attack!`);
}

/**
 * Stores the current alien then heals the player by a certain amount
 */
function retreatSequence()
{
  if(typeof currentAlien === "undefined")
    printConsoleMessage(`${stringAsName(currentPlayer.name)} flees from the battle to recuperate their hull integrity. The alien fleet continues to grow.`);
  
  shipStats[1].style.display = "none";
  shipSections[1].style.display = "none";
  retreatedAlien = currentAlien;
  currentAlien = undefined;
  setInBattle(false);
}

/**
 * Ends the game with victory message.
 */
function gameCompleteSequence()
{
  printConsoleMessage("The battle is finished. All hostile vessels have been eliminated.");
  gameFinished = true;
}

/**
 * Ends the game with a loss message.
 */
function gameOverSequence()
{
  printConsoleMessage("Your ship was destroyed. You float for eternity in the endless abyss of space.");
  gameFinished = true;
}

function abandonSequence()
{
  shipDefeatedSequence(currentPlayer, 0);
  printConsoleMessage("You abandon your mission, leaving the aliens to take over your home planet. Good job Hero...");
  gameFinished = true;
}

/**
 * Messages to user that game is over and to reload to play again.
 */
function gameOver()
{
  printConsoleMessage("The game has concluded. Please reload the page to play again.");
}

/**
 * 
 * @param {Ship} shipObject 
 * @param {int} section 
 */
function shipDefeatedSequence(shipObject, section)
{
  printConsoleMessage(`${stringAsName(shipObject.name)} has been defeated!`);
  shipSections[section].querySelector(".shipHealth").style.transition =  "none"; // We are doing this so that it disappears with the view in a good looking way
  shipSections[section].querySelector(".shipImage").src = "assets/sprites/x_plosion/x_plosion.gif";
  
  setTimeout(() => {
    shipStats[section].style.transform = "scale(0, 1)";
    shipSections[section].style.transform = "scale(0)";
  }, 500);
  
  setTimeout(() => {
    shipStats[section].style.display = "none";
    shipSections[section].style.display = "none";
    shipStats[section].style.transform = "scale(1)";
    shipSections[section].style.transform = "scale(1)";
    setInBattle(false);
  }, 1000);
}

/**
 * Sets CSS display params pertaining to the player's battle state
 * @param {boolean} bool 
 */
function setInBattle(bool)
{
  if(bool)
  {
    document.querySelectorAll(".battleMode").forEach((el) => el.style.display = "inline-block");
    document.querySelectorAll(".passiveMode").forEach((el) => el.style.display = "none");
  }else
  {
    document.querySelectorAll(".battleMode").forEach((el) => el.style.display = "none");
    document.querySelectorAll(".passiveMode").forEach((el) => el.style.display = "inline-block");
  }
}


//# Visual Functions
/**
 * Sets HTML and CSS display params for displaying the ship sprite based on function parameters
 * @param {Ship} shipObject 
 * @param {int} section 
 * @param {int} shipType 
 * @param {int} shipVersion 
 * @param {String} name 
 */
function attachShip(shipObject, section, shipType = -1, shipVersion = -1, name = shipObject.name)
{
  let selectedShipSection = shipSections[section];
  let nameDiv = selectedShipSection.querySelector(".shipTitle");
  let imageDiv = selectedShipSection.querySelector(".shipImage");
  let shipImage = getShip(shipType, shipVersion); 
  
  nameDiv.textContent = stringAsName(name);
  imageDiv.src = shipImage;
  selectedShipSection.style.display = "flex";
  selectedShipSection.style.transform = "scale(1)";
  selectedShipSection.style.backgroundSize = `${Math.floor(Math.random()*(200-120)+120)}%`;
  selectedShipSection.querySelector(".shipHealth").style.transition =  "0.2s ease-out";
}

/**
 * Sets HTML and CSS display params for showing ship internal variables based on function parameters
 * @param {Ship} shipObject 
 * @param {int} section 
 */
function attachShipStats(shipObject, section)
{
  let selectedStatBar = shipStats[section];
  selectedStatBar.style.display = "flex";
  selectedStatBar.style.transform = "scale(1)";
  selectedStatBar.querySelector(".stat-hull").querySelector("p").textContent = Number(shipObject.hull).toFixed(2);
  selectedStatBar.querySelector(".stat-firepower").querySelector("p").textContent = Number(shipObject.firepower).toFixed(2);
  selectedStatBar.querySelector(".stat-accuracy").querySelector("p").textContent = Number(shipObject.accuracy).toFixed(2);
}

/**
 * Updates the visuals for 
 * @param {Ship} shipObject 
 * @param {int} section 
 */
function updateHullVisuals(shipObject, section)
{
  let shipHealth = shipSections[section].querySelector(".shipHealth");
  shipHealth.style.width = `${shipObject.hullPercentage()*100}%`;
}

/**
 * Updates HTML ship display elements based on current game variable "currentPlayer" and "currentAlien" state 
 */
function updateBattleHud()
{
  if(typeof currentPlayer !== "undefined") updateHullVisuals(currentPlayer, 0);
  if(typeof currentAlien !== "undefined") updateHullVisuals(currentAlien, 1);
}


//# Delegated Functions
/**
 * Prints message to console and to the HTML console for user view
 * @param {String} message 
 */
function printConsoleMessage(message)
{
  let newMessage = document.createElement("p");
  newMessage.textContent = String(message);
  
  console.log(message);
  consoleSection.appendChild(newMessage);
  consoleSection.scrollTop = consoleSection.scrollHeight;
  
  // Visual edit for consistency
  consoleSection.querySelector("header").style.borderBottom = "1px solid white";
}

/**
 * Returns a string in PascalCase
 * @param {String} name 
 * @returns String
 */
function stringAsName(name)
{
  let retName = "";
  let nameArr = String(name).split("");  
  let upperNextChar = true;
  for(let i = 0; i < nameArr.length; i++)
  {      
    if(nameArr[i] === " " || nameArr[i] === "'")
      upperNextChar = true;
    else if(upperNextChar)
    {
      nameArr[i] = String(nameArr[i]).toUpperCase();
      upperNextChar = false;
    }
    retName += nameArr[i];
  }
  return retName;
}

/**
 * Returns number with ordinal phrasing (st, nd, rd, th)
 * @param {int} number 
 * @returns String
 */
function toOrdinal(number)
{
  switch(Math.floor(Number(number)))
  {
    case 1: return "1st";
    case 2: return "2nd";
    case 3: return "3rd";
    default: return `${Math.floor(Number(number))}th`;
  }
}

/**
 * Returns a ship from the shipsArray. If params are undefined, will get random.
 * @param {int | String} type 
 * @param {int} ver 
 * @returns String
 */
function getShip(type = -1, ver = -1)
{
  switch(type)
  {
    case 0:
    case "base":
    case "default":
      type = "default";
      break;
      
    case 1:
    case "nairan":
      type = "nairan"
        break;
      
    case -1:  
    default:
      type = Math.floor(Math.random()*Object.keys(ships).length);
  }
  
  if(ver === -1)
    ver = Math.floor(Math.random()*ships[type].length);
  return ships[type][ver];
}
