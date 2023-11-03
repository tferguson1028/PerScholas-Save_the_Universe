function validActor(actor) { return (actor instanceof Ship); }

function step(currentActor, action, currentReceiver = undefined)
{
  if(typeof currentActor === "undefined")
    return;  
    
  if(!(validActor(currentActor)))
  {
    printConsoleMessage(`There is no ship to ${action} with.`);
    return;
  }
  
  if(!(validActor(currentReceiver) || typeof currentReceiver === 'undefined'))
  {
    printConsoleMessage("An unknown error has occurred! Please reload the browser window.");
    return;
  }
  
  if(currentActor !== currentTurnActor)
  {
    printConsoleMessage(`Wait your turn ${stringAsName(currentActor.name)}!`);
    return;
  }
  
  if(currentActor instanceof EnemyShip)
  {
    actionArr = Object.entries(actions); 
    action = actionArr[Math.floor(Math.random()*actionArr.length)][1];
  }  
  
  let actorName = stringAsName(currentActor.name);
  let receiverName = "";
  if(!typeof currentReceiver === "undefined")
    receiverName = stringAsName(currentReceiver.name);
  
  updateBattleHud();
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
      
    case "defend": 
      currentActor.doDefend(); 
      printConsoleMessage(`${actorName} activates their shields.`);
      break;
      
    case "heal":
      currentActor.doRepair(); 
      printConsoleMessage(`${actorName} repairs some damage.`);
      break;
      
    case "charge":
      currentActor.doCharge(); 
      printConsoleMessage(`${actorName} charges a powerful attack.`);
      break;
    
    default:
      printConsoleMessage(`Some happened with ${actorName}'s ship, They could not act!`);
  }

  updateBattleHud();
  battleFinishedSequence();
  return true;
}
