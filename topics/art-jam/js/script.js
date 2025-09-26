/**
 * Self Portrait
 * Yelena Arakelian
 *
 * A self portrait of Yelena
 *
 */

"use strict";

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
  fill("#a841c7ff");
  square(400, 715, 200);

  //Draw the left straps
  stroke("#a841c7ff");
  strokeWeight(4);
  line(403, 715, 438, 650);

  //Draw the right straps
  stroke("#a841c7ff");
  strokeWeight(4);
  line(597, 715, 562, 650);

  //Draw a head
  noStroke();
  fill("#f5dec3ff");
  ellipse(500, 430, 305, 330);

  //Draw bangs
  noStroke();
  fill("#880affff");
  ellipse(500, 350, 290, 170);
}
