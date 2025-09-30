"use strict";

let mouthX = 500;
let mouthY = 550;
let skyShade = 1;
let bee = undefined;
let sandvichSound;
let buzzSound;

function preload() {
  // Make the audio start before running anything

  sandvichSound = loadSound("assets/sounds/heavy-tf2-eating-sandvich.mp3");
  buzzSound = loadSound("assets/sounds/bee-buzzing-around.mp3");
}

function setup() {
  createCanvas(1000, 850);
  noCursor();
  bee = createBee(10);
  userStartAudio();
}

function draw() {
  // Slowly go from blue to pink
  skyShade = constrain(skyShade + 1, 0, 1080);

  // Blue sky
  background(skyShade, 100, 500);

  // Draw the land
  noStroke();
  fill("#158410ff");
  rect(0, 650, 1000, 200);

  // Draw the sun
  fill("#fad504ff");
  circle(100, 100, 130);

  // Draw the clouds
  fill("#ffffff");
  ellipse(190, 100, 170, 80);
  ellipse(250, 80, 120, 90);
  ellipse(280, 120, 170, 90);
  ellipse(890, 190, 170, 90);
  ellipse(790, 160, 140, 70);

  let d = dist(mouseX, mouseY, mouthX, mouthY); //Make the audio play once cookie get close to the mouth
  if (d < 200 && !sandvichSound.isPlaying()) {
    sandvichSound.play();
  }

  //Make the buzz sound play in background
  if (!buzzSound.isPlaying()) {
    buzzSound.play();
  }

  drawHuman();
  drawEye();
  drawMouth();
  drawBee();
  drawCookieCursor();
}
// Draw the Cookie cursor
function drawCookieCursor() {
  fill("#a55e23ff");
  ellipse(mouseX, mouseY, 55);
  fill(100, 50, 0);
  ellipse(mouseX - 5, mouseY - 12, 6);
  ellipse(mouseX + 9, mouseY - 3, 10);
  ellipse(mouseX - 2, mouseY + 6, 11);
}

// Add a Buzzy Bee
function createBee(buzziness) {
  const fly = {
    x: random(0, width),
    y: random(0, height),
    size: 30,
    buzziness: buzziness,
  };
  return fly;
}

function drawBee() {
  // Buzzing the Bee
  bee.x += random(-bee.buzziness, bee.buzziness);
  bee.y += random(-bee.buzziness, bee.buzziness);

  fill("#fad506ff");
  ellipse(bee.x, bee.y, bee.size);
  fill("#000000ff");
  ellipse(bee.x, bee.y, bee.size / 2);
}

function drawMouth() {
  // Calculate the distance between the mouse cursor and the mouth
  let d = dist(mouseX, mouseY, mouthX, mouthY);

  /* Set the size of the mouth to be dependent on the distance between the mouse cursor and the mouth.
     When the cursor is farthest away from the mouth, the mouth size grows and vice versa*/
  let mouthSize = map(d, 30, 680, 1000, 30, true);
  noStroke();
  fill("#5e2424ff");
  ellipse(500, 550, 30, 60);
  fill("#f7806bff");
  ellipse(mouthX, mouthY, mouthSize, 40);
}

function drawEye() {
  // Draw left eye
  noStroke();
  fill("#ffffffff");
  ellipse(420, 450, 80, 80);
  fill("#000000ff");
  ellipse(420, 450, 40, 40);
  fill("#f1afb4ff");
  ellipse(420, 500, 80, 30);

  // Draw right eye
  fill("#ffffff");
  ellipse(580, 450, 80, 80);
  fill("#000000ff");
  ellipse(580, 450, 40, 40);
  fill("#f1afb4ff");
  ellipse(580, 500, 80, 30);

  // Draw the bangs
  fill("#880affff");
  ellipse(500, 320, 240, 130);

  // Draw eyebrows
  fill("#2e2622ff");
  ellipse(580, 390, 80, 20);
  ellipse(425, 390, 80, 20);
}

function drawHuman() {
  // Draw the hair
  noStroke();
  fill("#2e2622ff");
  ellipse(440, 460, 310, 460);
  ellipse(560, 460, 305, 460);

  // Draw the underneath
  fill("#880affff");
  rect(375, 520, 250, 150);

  // Draw a neck
  fill("#f1d3afff");
  square(440, 550, 120);

  // Draw body
  fill("#f5dec3ff");
  rect(310, 650, 380, 320, 20);

  // Draw shirt
  fill("#000000ff");
  square(400, 715, 200);

  // Draw straps
  stroke("#000000ff");
  strokeWeight(4);
  line(403, 715, 438, 650);
  line(597, 715, 562, 650);

  // Draw the face
  noStroke();
  fill("#f5dec3ff");
  ellipse(500, 430, 305, 330);
}
