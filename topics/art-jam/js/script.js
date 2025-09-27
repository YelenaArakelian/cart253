/**
 * Self Portrait
 * Yelena Arakelian
 *
 * A self portrait of Yelena
 *
 */

let mouthX = 500;
let mouthY = 550;

function draw() {
  drawBackground();
  drawHuman();
  drawEye();
  drawMouth();
  drawCookieCursor();
}

/**
 * Create a blue canvas */
function setup() {
  createCanvas(1000, 850);

  noCursor();
}

function draw() {
  //Draw a background
  background("#becbf8ff");

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
  fill("808080");
  ellipse(890, 190, 170, 90);
  fill("808080");
  ellipse(790, 160, 140, 70);
  drawHuman();
  drawEye();

  //Draw cookie cursor
  fill("#502b0cff");
  ellipse(mouseX, mouseY, 40);

  fill(100, 50, 0); // chocolate chips
  ellipse(mouseX - 5, mouseY - 5, 5);
  ellipse(mouseX + 7, mouseY - 3, 5);
  ellipse(mouseX - 2, mouseY + 6, 5);
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
  fill("#f1afb4ff");
  ellipse(420, 479, 80, 30);

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
  fill("#f1afb4ff");
  ellipse(580, 479, 80, 30);

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
  ellipse(440, 460, 310, 460);
  noStroke();
  fill("#2e2622ff");
  ellipse(560, 460, 305, 460);

  //Draw the underneath of the hair
  noStroke();
  fill("#880affff");
  rect(375, 520, 250, 150);

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
  let mouthSize = map(d, 0, 400, 600, 30, true);

  //Draw a mouth
  noStroke();
  fill("#5e2424ff");
  ellipse(500, 550, 30, 60);
  fill("#f7806bff");
  ellipse(mouthX, mouthY, mouthSize, 40);
}
