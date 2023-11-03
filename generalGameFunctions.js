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
  setTimeout(step, 1800, currentAlien, undefined, currentPlayer);
}

function battleFinishedSequence()
{
  if(typeof currentPlayer !== "undefined" && currentPlayer.hullPercentage() <= 0)
  {
    shipDefeatedSequence(0);
    currentPlayer = undefined;
    gameOverSequence();
    return true;
  }
  
  if(typeof currentAlien !== "undefined" && currentAlien.hullPercentage() <= 0)
  {
    shipDefeatedSequence(1);
    currentAlien = undefined;
    setInBattle(false);
    return true;
  }
  
  alternateTurn();
  return false;
}

function alternateTurn()
{
  let temp = currentTurnActor;
  currentTurnActor = currentTurnReceiver;
  currentTurnReceiver = temp;
  
  if(currentTurnActor === currentPlayer)
    document.querySelectorAll("#userInteraction").forEach((btn) => btn.disabled = true);
  
  printConsoleMessage(`It's ${stringAsName(currentTurnActor.name)}'s turn to attack!`);
}

function gameCompleteSequence()
{
  //TODO
  printConsoleMessage("The battle is finished. All hostile vessels have been eliminated.");
}

function retreatSequence()
{
  printConsoleMessage("You flee the battle.");
}

function gameOverSequence()
{
  //TODO  
  printConsoleMessage("Your ship was destroyed. You float for eternity in the endless abyss of space.");
}

function shipDefeatedSequence(section)
{
  shipStats[section].style.visibility = "collapse";
  shipSections[section].style.visibility = "collapse";
}

function gameNextBattleSequence(defeatedActor)
{
  //TODO
  
}

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
function attachShip(shipObject, section, shipType = -1, shipVersion = -1, name = shipObject.name)
{
  let selectedShipSection = shipSections[section];
  selectedShipSection.style.visibility = "visible";
  let nameDiv = selectedShipSection.querySelector(".shipTitle");
  let imageDiv = selectedShipSection.querySelector(".shipImage");
  let shipImage = getShip(shipType, shipVersion); 
  
  nameDiv.textContent = stringAsName(name);
  imageDiv.src = shipImage;
}

function attachShipStats(shipObject, section)
{
  let selectedStatBar = shipStats[section];
  selectedStatBar.style.visibility = "visible";
  selectedStatBar.querySelector(".stat-hull").querySelector("p").textContent = Number(shipObject.hull).toFixed(2);
  selectedStatBar.querySelector(".stat-firepower").querySelector("p").textContent = Number(shipObject.firepower).toFixed(2);
  selectedStatBar.querySelector(".stat-accuracy").querySelector("p").textContent = Number(shipObject.accuracy).toFixed(2);
}

function updateHullVisuals(shipObject, section)
{
  shipHealth = shipSections[section].querySelector(".shipHealth");
  shipHealth.style.width = `${shipObject.hullPercentage()*100}%`;
}

function updateBattleHud()
{
  if(typeof currentPlayer !== "undefined") updateHullVisuals(currentPlayer, 0);
  if(typeof currentAlien !== "undefined") updateHullVisuals(currentAlien, 1);
}


//# Delegated Functions
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

function stringAsName(name)
{
  let retName = "";
  let nameArr = String(name).split("");  
  let upperNextChar = true;
  for(let i = 0; i < nameArr.length; i++)
  {      
    if(nameArr[i] === " " || nameArr[i] === "'")
      upperNextChar = true;
    else if(upperNextChar == true)
    {
      nameArr[i] = String(nameArr[i]).toUpperCase();
      upperNextChar = false;
    }
    retName += nameArr[i];
  }
  return retName;
}

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

function getShip(type = -1, ver = -1)
{
  let shipImage = "";
  if(type === -1)
    type = Math.floor(Math.random()*Object.keys(ships).length);
  
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
  }
  
  if(ver === -1)
    ver = Math.floor(Math.random()*ships[type].length);
  return ships[type][ver];
}
