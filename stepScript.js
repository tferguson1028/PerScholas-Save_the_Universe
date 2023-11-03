function validActor(actor) { return (actor instanceof Ship); }

function step(currentActor, action, currentReceiver = undefined)
{
  /* Return null if the currentActor is not a ship
     Return null if the currentReceiver is not a ship or is not undefined
  */
  if(!(validActor(currentActor)))
  {
    printConsoleMessage(`There is no ship to ${action} with.`);
    return false;
  }
  
  if(!(validActor(currentReceiver) || typeof currentReceiver === 'undefined'))
  {
    printConsoleMessage("An unknown error has occurred! Please reload the browser window.");
  }
  
  if(currentActor instanceof EnemyShip)
    action = actions[Math.floor(Math.random()*actions.length)];
  
  let actorName = stringAsName(currentActor.name);
  let receiverName = stringAsName(currentReceiver.name);
  switch(action)
  {
    case "attack":
      switch(currentActor.doAttack(currentReceiver))
      {
        case null: printConsoleMessage("Someone is a ghost ship! Please restart the browser window."); break;
        case true: printConsoleMessage(`${actorName} hits ${receiverName} for ${currentActor.firepower} damage!`); break;
        case false: printConsoleMessage(`${actorName} misses`); break;
        default: printConsoleMessage("An unknown error has occurred! Please reload the browser window.");
      } 
      break;
    case "defend": currentActor.doDefend(); break;
    case "heal": break; 
    case "charge": break;
  }
  
  updateHullVisuals(currentActor, 0);
  updateHullVisuals(currentReceiver, 0);

  if(checkBattleFinished())
  {
    
  }else{
    alternateTurn();
  }
}
