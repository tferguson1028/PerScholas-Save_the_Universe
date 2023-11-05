// Solution for problem kinda found here https://stackoverflow.com/a/26269529
// Wanted to run this function every couple of seconds, but settled on running when the user clicks.

// This script will update the background size to the size of the page. 

const background = document.querySelector("#background");
const body = document.querySelector("body");
const spaceDust = document.querySelector("#layer1");
const stars = document.querySelector("#layer2");

const shipImages = document.querySelectorAll(".shipImage");

let frame = 0;
const frameCount = 60;
const fps = 1000/frameCount;
setInterval(() => 
{
  moveSpaceDust(); 
  twinkleStars(); 
  animateShip();
  frame = (frame+1)%frameCount;}, fps
);

//Sometimes the click event isn't enough.
setInterval(updateBackground, 2000);
document.addEventListener("click", updateBackground);
updateBackground(); //Update background on first load too make sure it's properly sized.

function updateBackground()
{
  //Wait a a bit before updating to allow page to load before getting page height
  setTimeout(() => { background.style.height = `${Math.floor(body.clientHeight)}px`; }, 100);
}

let fogFrame = 0;
let fogSpeed = 0.05;
function moveSpaceDust()
{
  fogFrame = (fogFrame+fogSpeed)%frameCount;
  let frameRatio = (fogFrame*2)/frameCount
  let sinXHelper = Math.PI*(frameRatio);
  spaceDust.style.transform = `translate(${(Math.sin(sinXHelper)*100)-100}px, ${Math.sin(sinXHelper*100)}px`;
}

function twinkleStars()
{
  stars.style.transform = `translate(${Math.sin((frame*2)/frameCount*Math.PI)/10}px, ${Math.cos((frame*2)/frameCount*Math.PI)/10}px)`;
}

let shipFrame = 0;
let shipSpeed = 0.5;
function animateShip()
{
  shipFrame = (shipFrame+shipSpeed)%frameCount;
  let frameRatio = (shipFrame*2)/frameCount
  let sinXHelper = Math.PI*(frameRatio);
  
  // These are some complicated math formulas for intensity and speed of animation.
  // They make the ships look floaty.
  shipImages[0].style.transform = 
    `skew(${(Math.sin(sinXHelper))}deg, ${Math.sin(sinXHelper*0.5)}deg) ` + 
    `translate(${(Math.sin(sinXHelper*2)*0.5)}px, ${Math.sin(-sinXHelper*4)*0}px)`;
    
  shipImages[1].style.transform = 
    `skew(${(Math.sin(sinXHelper*4)*0.4)}deg, ${Math.sin(sinXHelper)*0.5}deg) ` +
    `translate(${(Math.sin(sinXHelper)*1.5)}px, ${Math.sin(sinXHelper)*0.4}px)`;
}
