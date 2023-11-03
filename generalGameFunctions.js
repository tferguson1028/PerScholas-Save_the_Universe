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
  
  //  "assets/sprites/player_ship/bases/Main Ship - Base - Slight damage.png",
  // "assets/sprites/enemy_ship_type1/bases/Nairan - Battlecruiser - Base.png",
  // "assets/sprites/enemy_ship_type1/bases/Nairan - Bomber - Base.png",
  // "assets/sprites/enemy_ship_type1/bases/Nairan - Dreadnought - Base.png",
  // "assets/sprites/enemy_ship_type1/bases/Nairan - Scout - Base.png"
};

function attachShip(ship, section, shipType = -1, shipVersion = -1, name = ship.name)
{
  let nameDiv = shipSections[section].querySelector(".shipTitle");
  let imageDiv = shipSections[section].querySelector(".shipImage");
  let shipImage = getShip(shipType, shipVersion); 
  
  nameDiv.textContent = stringAsName(name);
  imageDiv.src = shipImage;
}

function attachShipStats(ship, section, name = ship.name)
{
  
}

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
