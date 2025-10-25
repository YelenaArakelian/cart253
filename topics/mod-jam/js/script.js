/**
 * Frogfrogfrog
 * Yelena Arakelian
 *
 * A game of catching flies with your frog-tongue
 *
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * - Dodge the horseflies
 *
 * Made with p5
 * https://p5js.org/
 */

"use strict";

let frogGif;
let gameState = "title";
let typedText = ""; // track what player types
let Font;
let horseFlyIMG;
let frogStrikes = 0;

// Declare a variable to hold the video element
let video;

// Boolean to track whether the video should be rendered onto the canvas
let hide = false;

const MAX_STRIKES = 3;

const friendFrogs = {
  left: {
    body: {
      x: 50,
      y: 350,
      width: 60,
      height: 50,
    },
    eyes: {
      leftBall: { x: 30, y: 330, size: 30 },
      rightBall: { x: 70, y: 330, size: 30 },
      leftPupil: { x: 30, y: 330, size: 15 },
      rightPupil: {
        x: 70,
        y: 330,
        size: 15,
      },
    },
  },
  right: {
    body: {
      x: 570,
      y: 380,
      width: 80,
      height: 60,
    },
    eyes: {
      leftBall: { x: 540, y: 350, size: 20 },
      rightBall: { x: 598, y: 350, size: 20 },
      leftPupil: { x: 540, y: 350, size: 20 },
      rightPupil: { x: 598, y: 350, size: 20 },
    },
  },
};

const horseFly = {
  x: 0,
  y: 100,
  size: 90,
  speed: 4, //how fast its going
  show: true, //make it visible
};

// Our frog
const frog = {
  // The frog's body has a position and size
  body: {
    x: 320,
    y: 520,
    size: 150,
  },

  // The frog's tongue has a position, size, speed, and state
  tongue: {
    x: undefined,
    y: 480,
    size: 20,
    speed: 20,
    // Determines how the tongue moves each frame
    state: "idle", // State can be: idle, outbound, inbound
  },
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
  x: 0,
  y: 200, // Will be random
  size: 10,
  speed: 3,
};

function preload() {
  frogGif = loadImage("assets/images/frog.gif");
  Font = loadFont("assets/fonts/TrashHand.TTF");
  horseFlyIMG = loadImage("assets/images/besthorseslfyever.png");

  // Create a <video></video> element for playback and remove it from the DOM
  video = createVideo("assets/videos/DistractionFlashbang.webm");
  video.hide();

  // Attach an event listener for when the playback ends setting hide to true
  video.elt.addEventListener("ended", () => (hide = true));
}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
  createCanvas(640, 480);
  textFont(Font);
  textAlign(CENTER);
  resetFly(); //give the fly its first random
  userStartAudio();

  // Every 8 seconds, ensure the video is visible and start playback
  // if the game is in the "play" state and the video is currently paused
  setInterval(() => {
    hide = false;
    if (video.elt.paused && gameState === "play") {
      video.play();
    }
  }, 8000);
}

function drawBackground() {
  // Sky already being background("#09f8e4ff"); //

  // Draw the sun
  noStroke();
  fill("#fff700ff");
  ellipse(50, 50, 50, 50);

  // Draw the land
  noStroke();
  fill("#528c2cff");
  rect(0, 230, 640, 110);

  // Draw the trees
  fill("#744519ff");
  rect(100, 160, 40, 100);
  rect(500, 230, 50, 100);

  // Draw the leafs
  fill("#168a25ff");
  ellipse(120, 170, 100);
  ellipse(526, 180, 160);

  // Draw the lake
  fill("#0f7bf5ff");
  rect(0, 330, 640, 150);
}
function drawFriendFrog() {
  //Body of the friends
  fill("#00ff00");
  noStroke();
  ellipse(
    friendFrogs.left.body.x,
    friendFrogs.left.body.y,
    friendFrogs.left.body.width,
    friendFrogs.left.body.height
  ); //Friend 1 on the left

  ellipse(
    friendFrogs.right.body.x,
    friendFrogs.right.body.y,
    friendFrogs.right.body.width,
    friendFrogs.right.body.height
  ); //Friend 2 on the right

  //White eyes
  fill("#ffffff");
  circle(
    friendFrogs.left.eyes.leftBall.x,
    friendFrogs.left.eyes.leftBall.y,
    friendFrogs.left.eyes.leftBall.size
  ); //Left friend's eyes
  circle(70, 330, 30);

  circle(540, 350, 40); //Right friend's eyes
  circle(598, 350, 40);

  //Pupils
  fill("#000000ff");
  //Left friend's pupils
  ellipse(
    friendFrogs.left.eyes.leftPupil.x,
    friendFrogs.left.eyes.leftPupil.y,
    friendFrogs.left.eyes.leftPupil.size
  );

  ellipse(
    friendFrogs.left.eyes.rightPupil.x,
    friendFrogs.left.eyes.rightPupil.y,
    friendFrogs.left.eyes.rightPupil.size
  );

  //Right friend's pupils
  ellipse(
    friendFrogs.right.eyes.leftPupil.x,
    friendFrogs.right.eyes.leftPupil.y,
    friendFrogs.right.eyes.leftPupil.size
  );
  ellipse(
    friendFrogs.right.eyes.rightPupil.x,
    friendFrogs.right.eyes.rightPupil.y,
    friendFrogs.right.eyes.rightPupil.size
  );
}

function draw() {
  // Title screen
  if (gameState === "title") {
    drawTitleScreen();
  } else if (gameState === "play") {
    background("#09f8e4ff");
    drawBackground();
    drawFriendFrog();
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    checkHorseFlyCollision();
    moveFriendFrogEye();
    moveHorseFly();
    drawhorseFly();
    // Render each images frame by frame of the video based on the value of hide
    if (!hide) {
      image(video, 0, 0, width, height);
    }

    // Game over screen
  } else if (gameState === "gameover") {
    background("#360101ff");
    fill("#ff0000");
    textSize(100);
    text("GAME OVER", width / 2, height / 2);
    textSize(30);
    text(`You got ${frogStrikes} strikes`, width / 2, height / 2 + 80);
    textSize(18);
    text(
      "Click anywhere to return to the title screen, you loser!!!!",
      width / 2,
      height / 2 + 130
    );
  }
}

function drawhorseFly() {
  if (horseFly.show) {
    push(); // Adding actual image
    image(
      horseFlyIMG,
      horseFly.x - horseFly.size / 2,
      horseFly.y - horseFly.size / 2,
      horseFly.size,
      horseFly.size
    );
    pop();
    push();
    fill(255, 0, 0);
    textSize(24);
    textAlign(LEFT);
    text(`STRIKES: ${frogStrikes} / ${MAX_STRIKES}`, 10, 20); // Show strikes at top left
    pop();
  }
}

function checkHorseFlyCollision() {
  const d = dist(frog.tongue.x, frog.tongue.y, horseFly.x, horseFly.y);

  if (d < frog.tongue.size / 2 + horseFly.size / 2 && horseFly.show) {
    frogStrikes++;
    horseFly.show = false;
    horseFly.x = 0;
    horseFly.y = random(100, 400);

    if (frogStrikes >= MAX_STRIKES) {
      gameState = "gameover";
    } else {
      horseFly.show = true;
    }
  }
}

function moveHorseFly() {
  horseFly.x += horseFly.speed; // Make it move faster

  if (horseFly.x > width) {
    horseFly.x = 0;
    horseFly.y = random(100, 400);
  }
}

function drawTitleScreen() {
  //Title screen background color
  background("#1d740aff");

  //Make frog gif appear above text
  image(frogGif, width / 2 - 75, 330, 150, 150);

  //Center all text shown
  textAlign(CENTER);

  //Title text
  fill("#2fff00ff");
  textSize(90);
  text("Frog Feaster 3000", width - 320, height / 2 - 120);

  //Rules text
  fill("#ff1b1bff");
  textSize(45);
  text("EAT THE FLIES, DODGE THEM HORSEFLIES!", width / 2, height / 2 - 30);

  //Instruction text
  fill("#2fff00ff");
  textSize(40);
  text("Type 'frog' to begin", width / 2, height / 2 + 40);

  //Illustrating what user typed so far
  textSize(30);
  text(typedText, width / 2, height / 2 + 90);
}

// Tracks keys pressed by user
function keyTyped() {
  // Add letters to typedText
  typedText += key;

  // Limit input to 10 characters to avoid overflow
  if (typedText.length > 10) {
    typedText = typedText.substring(typedText.length - 10);
  }

  // Check if they typed "frog"
  if (typedText.toLowerCase().includes("frog")) {
    gameState = "play"; // Start the game
    typedText = ""; // Reset input
  }
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
  // Move the fly
  fly.x += fly.speed;
  // Handle the fly going off the canvas
  if (fly.x > width) {
    resetFly();
  }
}

function moveFriendFrogEye() {
  // The center of the eyeball
  const leftFrog = {
    leftEye: createVector(
      friendFrogs.left.eyes.leftBall.x,
      friendFrogs.left.eyes.leftBall.y
    ),
    rightEye: createVector(
      friendFrogs.left.eyes.rightBall.x,
      friendFrogs.left.eyes.rightBall.y
    ),
  };

  const rightFrog = {
    leftEye: createVector(
      friendFrogs.right.eyes.leftBall.x,
      friendFrogs.right.eyes.leftBall.y
    ),
    rightEye: createVector(
      friendFrogs.right.eyes.rightBall.x,
      friendFrogs.right.eyes.rightBall.y
    ),
  };

  // Where we want the eyes to look at
  const target = createVector(frog.body.x, frog.body.y);

  // Direction of the vector (from the eye to the frog)
  const leftFrogsLeftEyeDir = p5.Vector.sub(target, leftFrog.leftEye);
  const leftFrogsRightEyeDir = p5.Vector.sub(target, leftFrog.rightEye);

  const rightFrogsLeftEyeDir = p5.Vector.sub(target, rightFrog.leftEye);
  const rightFrogsRightEyeDir = p5.Vector.sub(target, rightFrog.rightEye);

  // Limits the pupil to only the inside of the eyeball
  leftFrogsLeftEyeDir.limit(
    friendFrogs.left.eyes.leftBall.size / 2 -
      friendFrogs.left.eyes.leftPupil.size / 2 -
      2
  );

  leftFrogsRightEyeDir.limit(
    friendFrogs.left.eyes.rightBall.size / 2 -
      friendFrogs.left.eyes.rightPupil.size / 2 -
      2
  );

  rightFrogsLeftEyeDir.limit(
    friendFrogs.right.eyes.leftBall.size / 2 -
      friendFrogs.right.eyes.leftPupil.size / 2 +
      8
  );

  rightFrogsRightEyeDir.limit(
    friendFrogs.right.eyes.rightBall.size / 2 -
      friendFrogs.right.eyes.rightPupil.size / 2 +
      8
  );

  // Update the postion of the pupil by adding the 2 vectors
  const leftFrogsLeftPupPos = p5.Vector.add(
    leftFrog.leftEye,
    leftFrogsLeftEyeDir
  );
  const leftFrogsRightPupPos = p5.Vector.add(
    leftFrog.rightEye,
    leftFrogsRightEyeDir
  );

  const rightFrogsLeftPupPos = p5.Vector.add(
    rightFrog.leftEye,
    rightFrogsLeftEyeDir
  );
  const rightFrogsRightPupPos = p5.Vector.add(
    rightFrog.rightEye,
    rightFrogsRightEyeDir
  );

  friendFrogs.left.eyes.leftPupil.x = leftFrogsLeftPupPos.x;
  friendFrogs.left.eyes.leftPupil.y = leftFrogsLeftPupPos.y;
  friendFrogs.left.eyes.rightPupil.x = leftFrogsRightPupPos.x;
  friendFrogs.left.eyes.rightPupil.y = leftFrogsRightPupPos.y;

  friendFrogs.right.eyes.leftPupil.x = rightFrogsLeftPupPos.x;
  friendFrogs.right.eyes.leftPupil.y = rightFrogsLeftPupPos.y;
  friendFrogs.right.eyes.rightPupil.x = rightFrogsRightPupPos.x;
  friendFrogs.right.eyes.rightPupil.y = rightFrogsRightPupPos.y;
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
  push();
  noStroke();
  fill("#000000");
  ellipse(fly.x, fly.y, fly.size);
  pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
  fly.x = 0;
  fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
  frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
  // Tongue matches the frog's x
  frog.tongue.x = frog.body.x;
  // If the tongue is idle, it doesn't do anything
  if (frog.tongue.state === "idle") {
    // Do nothing
  }
  // If the tongue is outbound, it moves up
  else if (frog.tongue.state === "outbound") {
    frog.tongue.y += -frog.tongue.speed;
    // The tongue bounces back if it hits the top
    if (frog.tongue.y <= 0) {
      frog.tongue.state = "inbound";
    }
  }
  // If the tongue is inbound, it moves down
  else if (frog.tongue.state === "inbound") {
    frog.tongue.y += frog.tongue.speed;
    // The tongue stops if it hits the bottom
    if (frog.tongue.y >= height) {
      frog.tongue.state = "idle";
    }
  }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
  // Draw the tongue tip
  push();
  fill("#ff0000");
  noStroke();
  ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
  pop();

  // Draw the rest of the tongue
  push();
  stroke("#ff0000");
  strokeWeight(frog.tongue.size);
  line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
  pop();

  // Draw the frog's body
  push();
  fill("#00ff00");
  noStroke();
  ellipse(frog.body.x, frog.body.y, frog.body.size);
  //Frog's eyes
  fill("#ffffff");
  ellipse(frog.body.x - 50, frog.body.y - 80, 60); //Left eye
  ellipse(frog.body.x + 50, frog.body.y - 80, 60); //Right eye
  //Pupils
  fill("#000000");
  ellipse(frog.body.x - 50, frog.body.y - 80, 40); //Left eye
  ellipse(frog.body.x + 50, frog.body.y - 80, 40); //Right eye
  pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
  // Get distance from tongue to fly
  const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
  // Check if it's an overlap
  const eaten = d < frog.tongue.size / 2 + fly.size / 2;
  if (eaten) {
    // Reset the fly
    resetFly();
    // Bring back the tongue
    frog.tongue.state = "inbound";
  }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
  if (frog.tongue.state === "idle") {
    frog.tongue.state = "outbound";
  }
}
