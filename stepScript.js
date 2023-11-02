function validActor(actor) { return (actor instanceof Ship); }

function step(currentActor, action, currentReceiver = undefined)
{
  /* Return null if the currentActor is not a ship
     Return null if the currentReceiver is not a ship or is not undefined
  */
  if(!(validActor(player) && (validActor(currentReceiver) || typeof currentReceiver === 'undefined')))
  {
    console.error("");
    return false;
  }

  switch(action)
  {
    case "attack": currentActor.doAttack(); return true;
    case "defend": currentActor.doDefend(); return true;
    default: return false;
  }
  
}
