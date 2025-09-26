/**
 * Self Portrait
 * Yelena Arakelian
 *
 * A self portrait of Yelena
 *
 */

"use strict";
let mouthX = 500;
let mouthY = 550;

/**
 * Create a blue canvas */
function setup() {
  createCanvas(1000, 850);
  background("#becbf8ff");
}

/**
 * Draws land, a sun, a dog,
 */
function draw() {
  //Draw the land
  noStroke();
  fill("#87ab69");
  rect(0, 650, 1000, 200);

  //Draw the sun
  fill("#fad504ff");
  circle(100, 100, 130);

  //Draw the cloud
  fill("808080");
  ellipse(190, 100, 170, 80);
  fill("808080");
  ellipse(250, 80, 120, 90);
  fill("808080");
  ellipse(280, 120, 170, 90);
  drawHuman();
  drawEye();
}

function drawEye() {
  //Draw the left eye
  noStroke();
  fill("#ffffff");
  ellipse(420, 450, 80, 80);

  //Draw the left
  noStroke();
  fill("#000000ff");
  ellipse(420, 450, 40, 40);

  //Left eyebags
  noStroke();
  fill("#f1d3afff");
  ellipse(425, 474, 100, 40);

  //Right eye
  noStroke();
  fill("#ffffff");
  ellipse(580, 450, 80, 80);

  //Right pupil
  noStroke();
  fill("#000000ff");
  ellipse(580, 450, 40, 40);

  //Draw bangs
  noStroke();
  fill("#880affff");
  ellipse(500, 320, 240, 130);

  //Right eyebags
  noStroke();
  fill("#f1d3afff");
  ellipse(575, 474, 100, 40);

  //Draw right eyebrows
  noStroke();
  fill("#2e2622ff");
  ellipse(580, 390, 80, 20);

  //Draw left eyebrows
  noStroke();
  fill("#2e2622ff");
  ellipse(425, 390, 80, 20);
}

function drawHuman() {
  //Draw the hair
  noStroke();
  fill("#2e2622ff");
  ellipse(440, 460, 305, 420);
  noStroke();
  fill("#2e2622ff");
  ellipse(560, 460, 305, 420);

  //Draw the underneath of the hair
  noStroke();
  fill("#880affff");
  rect(399, 550, 200, 100);

  //Draw a neck
  noStroke();
  fill("#f1d3afff");
  square(440, 550, 120);

  //Draw a torso
  noStroke();
  fill("#f5dec3ff");
  rect(310, 650, 380, 320, 20);

  //Draw a tank top
  noStroke();
  fill("#000000ff");
  square(400, 715, 200);

  //Draw the left straps
  stroke("#000000ff");
  strokeWeight(4);
  line(403, 715, 438, 650);

  //Draw the right straps
  stroke("#000000ff");
  strokeWeight(4);
  line(597, 715, 562, 650);

  //Draw a head
  noStroke();
  fill("#f5dec3ff");
  ellipse(500, 430, 305, 330);

  //Distance between mouse and mouth
  let d = dist(mouseX, mouseY, mouthX, mouthY);
  let mouthSize = map(d, 0, 400, 400, 50, true);

  //Draw a mouth
  fill("#f7806bff");
  ellipse(mouthX, mouthY, mouthSize, 40);
}
