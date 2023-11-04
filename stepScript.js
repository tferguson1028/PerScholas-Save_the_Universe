/**
 * Checks is the argument is an instance of Ship class
 * @param {Ship} actor 
 * @returns boolean
 */
function validActor(actor) { return (actor instanceof Ship); }

/**
 * Automates a set of functions based on parameters.
 * @param {Ship} currentActor 
 * @param {String} action 
 * @param {Ship | undefined} currentReceiver 
 * @returns boolean
 */
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
    let actionArr = Object.entries(actions); 
    action = actionArr[Math.floor(Math.random()*actionArr.length)][1];
  }  
  
  let actorName = stringAsName(currentActor.name);
  let receiverName = "";
  if(typeof currentReceiver !== "undefined")
    receiverName = stringAsName(currentReceiver.name);
  
  updateBattleHud();
  switch(action)
  {
    case "attack":
      switch(currentActor.doAttack(currentReceiver))
      {
        case null: printConsoleMessage("Someone is a ghost ship! Please restart the browser window."); break;
        case true: printConsoleMessage(`${actorName} hits ${receiverName}! They have ${Math.max(0, currentReceiver.forceUsableNumber(currentReceiver.hull))} hull integrity left!`); break;
        case false: printConsoleMessage(`${actorName} misses ${receiverName}`); break;
        default: printConsoleMessage("An unknown error has occurred! Please reload the browser window.");
      } 
      break;
      
    case "defend":
      if(currentActor.defending)
      {
        printConsoleMessage(`${actorName} reinforces their hull using their shields!`);
        currentActor.doRepairByPercent(Math.random()*(0.2-0.1)+.1);
        currentActor.defending = false;
      }else
      {
        currentActor.doDefend();
        printConsoleMessage(`${actorName} activates their shields!`);
      }
      break;
      
    case "heal":
      currentActor.doRepair();
      if(currentActor === currentPlayer) retreatSequence(); 
      printConsoleMessage(`${actorName} repairs some damage!`);
      break;
      
    case "charge":
      if(currentActor.charged)
      {
        printConsoleMessage(`${actorName} charges their charge!`);
      }else
      {
        currentActor.doCharge(); 
        printConsoleMessage(`${actorName} charges their next action!`);
      }
      break;
    
    default:
      printConsoleMessage(`Some happened with ${actorName}'s ship, They could not act!`);
  }

  updateBattleHud();
  battleFinishedSequence();
  return true;
}
