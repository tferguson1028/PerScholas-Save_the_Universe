class Ship
{
  constructor(name, hull, firepower, accuracy, heals = 0)
  {
    this.name = name;
    this.hull = this.forceUsableNumber(hull);
    this.hullMax = this.hull;
    this.firepower = this.forceUsableNumber(firepower);
    this.accuracy = this.forceUsableNumber(accuracy);
    this.healsLeft = heals;
    
    this.defending = false;
    this.charged = false;
    this.charge = 1;
  }
  
  //# Actions
  doAttack(receiver)
  {
    if(!(receiver instanceof Ship))
      return null;
    
    let retBool = false;
    if(this.takeShot())
    {
      retBool = true;
      if(this.charged) receiver.receiveDamage(this.firepower*(1+(this.charge/4)));
      else receiver.receiveDamage(this.firepower);        
    }
    
    this.charged = false;
    this.charge = 1;
    return retBool;
  }
  
  doRepairByPercent(repair) 
  {
    this.hull = this.forceUsableNumber(Math.min(this.hullMax, this.hull + this.hullMax*repair)); 
    return this.forceUsableNumber(this.hullMax*repair);
  }
  doRepair()
  {
    // Repair can do minimum of 20% and 100% of based on current hull health. Makes comebacks via retreat less likely.
    let repairRatioMin = this.hull/4;
    let repairRatioMax = this.hull/1;
    let repair = this.forceUsableNumber(Math.random()*((repairRatioMax) - (repairRatioMin)) + (repairRatioMin));
    if(this.charged)
      repair *= this.charge;
    
    this.charged = false;
    this.charge = 0;
    this.hull = Math.min(this.hullMax, this.hull + repair);
    return repair;
  }  
  
  doDefend() { this.defending = true; }
  doCharge() { this.charged = true; this.charge++; }
  
  receiveDamage(damage) 
  { 
    if(this.defending) this.hull -= this.forceUsableNumber(damage/2); 
    else this.hull -= this.forceUsableNumber(damage);
    
    this.defending = false;
  }
  
  //# Helper functions
  hullPercentage() { return Math.max(0, this.hull) / this.hullMax; }
  takeShot() { return Math.random() <= this.accuracy; }
  
  // I just want to make sure I'm using 2 decimal numbers everywhere.
  forceUsableNumber(value) { return Number(Number(value).toFixed(2)); }  
}

class PlayerShip extends Ship
{
  constructor()
  {
    super("the hero", 20, 5, .70, 3);
  }
}

class EnemyShip extends Ship
{
  static names = [
    "Topzed Volron",
    "Subcommander Dudflim",
    "Lurzop Blibaicoain",
    "Tadklet Kloplit",
    "Metazoik Gtor",
    "The High Narop of Narlejos",
    "Flimaik Va'jar",
    "Gloed Neeputh",
    "Blubetti Ka'flam",
    "Gorrot Klumlanzed",
    "Ka'illit Squtor",
    "The Klumala of Foxrax",
    "Abtin Klopalgala",
    "The Gobarg of Kucaris",
  ];

  constructor(difficulty = 0)
  {
    super(
      EnemyShip.names[Math.floor(Math.random()*EnemyShip.names.length)],
      Number(((Math.random()*3+3)*Math.max(1, 1+(difficulty/10))).toFixed(2)),
      Number(((Math.random()*2+2)*Math.max(1, 1+(difficulty/10))).toFixed(2)),
      Number(((Math.random()*.2+.6)*Math.max(1, 1+(difficulty/100))).toFixed(2))
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
    console.log(e);
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
  console.log(minVals);
  console.log(maxVals);
}
