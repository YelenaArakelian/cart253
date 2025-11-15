/**
 * Lines
 * Yelena Arakelian
 *
 * A series of lines across the canvas with a vapourwave aesthetic.
 */

"use strict";

const lines = 10;

/**
 * Creates the canvas
 */
function setup() {
  createCanvas(500, 500);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
  background("pink");
  // Make a gradient background
  for (let y = 0; y < height; y++) {
    let colour = map(y, 0, height, 0, 255);
    stroke(colour, 100, 200);
    line(0, y, width, y);
  }

  // Set up position and color variables
  let x = 0;
  let shade = 0;
  let spacing = 50;

  while (x <= width) {
    // Keep looping while x is inside the canvas
    stroke(shade);
    strokeWeight(map(x, 0, width, 1, 10));
    line(x, 0, x, height);

    // Update for the next line
    x += spacing;
    shade += 25;
  }

  // Same thing but horizontal lines
  let y = 0;
  let color = 0;
  // Keep looping while y is inside the canvas
  while (y <= height) {
    stroke(color);
    strokeWeight(map(y, 0, height, 1, 10));
    line(0, y, width, y);

    // Update for the next line
    y += spacing;
    color += 25;
  }
}
