class Ship
{
  hull;
  firepower;
  accuracy;
  constructor(hull, firepower, accuracy)
  {
    this.hull = this.forceUsableNumber(hull);
    this.firepower = this.forceUsableNumber(firepower);
    this.accuracy = this.forceUsableNumber(accuracy);
  }
  
  
  doAttack(receiver)
  {
    if(!(receiver instanceof Ship))
      return;
    
    
    receiver.receiveDamage(this.firepower);
  }
  
  receiveDamage(damage) { this.hull -= this.forceUsableNumber(damage); }
  
  // I just want to make sure I'm using 2 decimal numbers everywhere.
  forceUsableNumber(value) { return Number(Number(value).toFixed(2)); }
}

class PlayerShip extends Ship
{
  constructor()
  {
    super(20, 5, .70);
  }
}

class EnemyShip extends Ship
{
  constructor()
  {
    super(
      Number((Math.random()*3+3).toFixed(2)),
      Number((Math.random()*2+2).toFixed(2)),
      Number((Math.random()*.2+.6).toFixed(2))
    );
  }
}

// testEnemyCreationValues();

function testEnemyCreationValues()
{
  let minVals = [10, 10, 10];
  let maxVals = [0, 0, 0];

  for(let i = 0; i < 1000; i++)
  {
    let e = new EnemyShip();
    minVals[0] = e.hull < minVals[0] ? e.hull : minVals[0];
    minVals[1] = e.firepower < minVals[1] ? e.firepower : minVals[1];
    minVals[2] = e.accuracy < minVals[2] ? e.accuracy : minVals[2];

    maxVals[0] = e.hull > maxVals[0] ? e.hull : maxVals[0];
    maxVals[1] = e.firepower > maxVals[1] ? e.firepower : maxVals[1];
    maxVals[2] = e.accuracy > maxVals[2] ? e.accuracy : maxVals[2];
  }

  console.log("Testing Enemy Creation values. Expected output should be around these values");
  console.log("[ 3, 2, 0.6 ]");
  console.log("[ 6, 4, 0.8 ]\n");
  console.log(minVals); // Expected Output
  console.log(maxVals);
}
