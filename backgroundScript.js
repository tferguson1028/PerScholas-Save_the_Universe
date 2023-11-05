// Solution for problem kinda found here https://stackoverflow.com/a/26269529
// Wanted to run this function every couple of seconds, but settled on running when the user clicks.

// This script will update the background size to the size of the page. 

const background = document.querySelector("#background");
const body = document.querySelector("body");
const spaceDust = document.querySelector("#layer1");
const stars = document.querySelector("#layer2");

let frame = 0;
const frameCount = 60;
const fps = 1000/frameCount;
setInterval(() => {moveSpaceDust(); twinkleStars(); frame = (frame+1)%frameCount;}, fps);

document.addEventListener("click", updateBackground);
updateBackground(); //Doing it on first load too.

function updateBackground()
{
  //Wait a a bit before updating to allow page to load before getting page height
  setTimeout(() => { background.style.height = `${Math.floor(body.clientHeight)}px`; }, 100);
}

let fogPos = 0;
let fogSpeed = 0.05;
function moveSpaceDust()
{
  fogPos = (fogPos+fogSpeed)%frameCount;
  let frameRatio = (fogPos*2)/frameCount
  let sinXHelper = Math.PI*(frameRatio);
  spaceDust.style.transform = `translate(${(Math.sin(sinXHelper)*100)-100}px, ${Math.sin(sinXHelper*100)}px`;
}

function twinkleStars()
{
  stars.style.transform = `translate(${Math.sin((frame*2)/frameCount*Math.PI)/10}px, ${Math.cos((frame*2)/frameCount*Math.PI)/10}px)`;
}

