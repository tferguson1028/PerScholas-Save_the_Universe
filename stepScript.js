function validActor(actor) { return (actor instanceof Ship); }

function step(currentActor, action, currentReceiver = undefined)
{
  /* Return null if the currentActor is not a ship
     Return null if the currentReceiver is not a ship or is not undefined
  */
  if(!(validActor(currentActor)))
  {
    printConsoleMessage(`There is ship to ${action} with.`);
    return false;
  }
  
  if(!(validActor(currentReceiver) || typeof currentReceiver === 'undefined'))
  {
    printConsoleMessage("An unknown error has occurred! Please reload the browser window.");
  }
  
  switch(action)
  {
    case "attack":
      switch(currentActor.doAttack(currentReceiver))
      {
        case null: printConsoleMessage("Someone is a ghost ship! Please restart the browser window."); break;
        case true: printConsoleMessage(`${stringAsName(currentActor.name)} hits ${stringAsName(currentReceiver.name)} for ${stringAsName(currentActor.name)}`); break;  
        case false: printConsoleMessage(""); break;
        default: printConsoleMessage("An unknown error has occurred! Please reload the browser window.");
      } 
      return true;
    case "defend": currentActor.doDefend(); return true;
    default: return false;
  }
  
}
