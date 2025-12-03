/*******************************
 * FROG FEASTER 3000 - MAIN GAME
 * Modes:
 *   1. Classic Feast (original game)
 *   2. Nightmare Spotlight Mode
 *   3. Horsefly Revenge Mode
 *******************************/

"use strict";

/*******************************
 * GLOBAL VARIABLES
 * (Codes that need to be accessed by multiple functions)
 *******************************/

let frogGif;
let scaryGif;
let gameState = "title";
let typedText = ""; // track what player types
let Font;
let horseFlyIMG;
let frogStrikes = 0;
let mySound; // plays background music
let tongueGif;
let illusionflyGif;
let pepescreamGif;
let pepebonkGif;
let croakSound; // plays when milestone hit
let fliesEaten = 0; // tracks flies eaten for milestones
let confettiGif; // shown when milestone hit
let showConfetti = false; // whether to show confetti
let confettiTimer = 0; // timer for confetti display
let rageLevel = 0; //increases when user hits horsefly
let mlemSound; // plays eating sound effect when frog eats a fly
let hurtSound; // plays when frog eats horsefly
let nightmareScore = 0;
let nightmareTimerLeft = 30; // seconds
let spotlightX = 0;
let spotlightY = 0;
let spotlightRadius = 100; // radius of spotlight
let horseflyRage = 0; // how much the frog shakes in horsefly feast
let nightmareFrog = {
  x: 300,
  y: 300,
  size: 60,
};

// Horsefly bouncing around the title game screen
let titleFlyX = 300;
let titleFlyY = 200;
let titleFlySpeedX = 1.2;
let titleFlySpeedY = 1.5;
let titleFlySize = 120;

// Declare a variable to hold the video element
let video;
let videoX = 0;
let videoY = 0;

// Boolean to track whether the video should be rendered onto the canvas
let hide = false;

/*******************************
 * TITLE MENU SCREEN
 * (Handles the title screen and its interactions)
 *******************************/

// Classic Feast
let classicModeName = "Classic Feast";
let classicDescriptionLine1 = "The original Frog Feaster";
let classicDescriptionLine2 = "Eat flies and avoid horseflies";
let classicDescriptionLine3 = "Move with mouse, click to shoot tongue";

// Nightmare Spotlight
let nightmareModeName = "Nightmare";
let nightmareDescriptionLine1 =
  "It is nightime..You are the beam of light in the dark";
let nightmareDescriptionLine2 =
  "Move with mouse, click to shoot tongue and eat flies";
let nightmareDescriptionLine3 =
  "Sleeping horseflies.. When they wake up, you’re the snack";

// Horsefly Feast
let horseflyModeName = "Horsefly Feast";
let horseflyDescriptionLine1 = "You play as the horsefly";
let horseflyDescriptionLine2 = "Avoid the frog’s giant tongue!";
let horseflyDescriptionLine3 = "Move with mouse to eat the flies";

// Buttons on the left side of the title screen
let menuButtonX = 60;
let menuButtonY_Classic = 200;
let menuButtonY_Nightmare = 280;
let menuButtonY_Horsefly = 360;
let menuButtonWidth = 260;
let menuButtonHeight = 60;

// Which mode the mouse is currently hovering on
let menuHoverMode = ""; // "classic", "nightmare", or "horsefly"

/*******************************
 * TITLE SCREEN DRAWING
 *******************************/

function drawTitleScreen() {
  // Title screen background color
  background("#1d740aff");

  // Fun gifs around the screen
  image(frogGif, width - 140, 50, 120, 120); // frog top right
  image(illusionflyGif, width - 140, 400, 190, 100); // big bottom right illusion fly
  image(tongueGif, 20, 80, 120, 120); // tongue frog top left

  // Make sure text has no outline
  noStroke();

  // Big title
  textAlign(CENTER, CENTER);
  fill("#2fff00ff");
  textSize(70);
  text("Frog Feaster 3000", width / 2, 70);

  // Subtitle
  fill("#5ef4ffff");
  textSize(34);
  text("Choose your feast mode", width / 2, 140);

  // Reset hover each frame
  menuHoverMode = "";

  // Draw the 3 buttons on the left
  drawMenuButton(
    menuButtonX,
    menuButtonY_Classic,
    menuButtonWidth,
    menuButtonHeight,
    classicModeName,
    "classic"
  );

  drawMenuButton(
    menuButtonX,
    menuButtonY_Nightmare,
    menuButtonWidth,
    menuButtonHeight,
    nightmareModeName,
    "nightmare"
  );

  drawMenuButton(
    menuButtonX,
    menuButtonY_Horsefly,
    menuButtonWidth,
    menuButtonHeight,
    horseflyModeName,
    "horsefly"
  );

  // Move the fly
  titleFlyX += titleFlySpeedX;
  titleFlyY += titleFlySpeedY;

  // Bounce left/right
  if (titleFlyX < titleFlySize / 2 || titleFlyX > width - titleFlySize / 2) {
    titleFlySpeedX *= -1;
  }

  // Bounce top/bottom
  if (titleFlyY < titleFlySize / 2 || titleFlyY > height - titleFlySize / 2) {
    titleFlySpeedY *= -1;
  }

  // Small shake so it looks angry
  let shakeX = random(-3, 3);
  let shakeY = random(-3, 3);

  // Draw it
  image(
    horseFlyIMG,
    titleFlyX - titleFlySize / 2 + shakeX,
    titleFlyY - titleFlySize / 2 + shakeY,
    titleFlySize,
    titleFlySize
  );

  // Small instruction box beside hovered button
  drawInstructionPopup();
}

/*******************************
 * BUTTON + SMALL POPUP
 *******************************/

function drawMenuButton(x, y, w, h, label, modeName) {
  // Check if mouse is on this button
  let isHover =
    mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

  if (isHover) {
    menuHoverMode = modeName; // set hover mode
    fill("#b9ffb9ff"); // hover color
  } else {
    fill("#e5e5e5");
  }

  // Button rectangle
  stroke(0);
  strokeWeight(3);
  rect(x, y, w, h, 10);

  // Button text
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(label, x + w / 2, y + h / 2);
}

// Little instruction box next to hovered button
function drawInstructionPopup() {
  // If mouse is not on any button, doesn't draw anything
  if (menuHoverMode === "") {
    return;
  }

  // Box slightly smaller than a button
  let popupWidth = menuButtonWidth - 40;
  let popupHeight = menuButtonHeight;

  // Position: to the right of the buttons
  let popupX = menuButtonX + menuButtonWidth + 20;
  let popupY;

  if (menuHoverMode === "classic") {
    popupY = menuButtonY_Classic;
  } else if (menuHoverMode === "nightmare") {
    popupY = menuButtonY_Nightmare;
  } else if (menuHoverMode === "horsefly") {
    popupY = menuButtonY_Horsefly;
  }

  // Background of the small box
  fill("#d5e4fdff");
  noStroke();
  rect(popupX, popupY, popupWidth, popupHeight, 10);

  // Border of the small box
  stroke("#61f787ff");
  strokeWeight(3);
  noFill();
  rect(popupX, popupY, popupWidth, popupHeight, 10);

  // Text inside the small box
  noStroke();
  textAlign(LEFT, TOP);

  let textX = popupX + 8;
  let textY = popupY + 6;

  // Title (INSTRUCTIONS)
  fill("#356f3bff");
  textSize(12);
  text("Instructions", textX, textY);
  textY += 14;

  // Description text inside the boxes
  fill("#183ad2ff");
  textSize(11);

  if (menuHoverMode === "classic") {
    text(classicDescriptionLine1, textX, textY);
    textY += 12;
    text(classicDescriptionLine2, textX, textY);
    textY += 12;
    text(classicDescriptionLine3, textX, textY);
  } else if (menuHoverMode === "nightmare") {
    text(nightmareDescriptionLine1, textX, textY);
    textY += 12;
    text(nightmareDescriptionLine2, textX, textY);
    textY += 12;
    text(nightmareDescriptionLine3, textX, textY);
  } else if (menuHoverMode === "horsefly") {
    text(horseflyDescriptionLine1, textX, textY);
    textY += 12;
    text(horseflyDescriptionLine2, textX, textY);
    textY += 12;
    text(horseflyDescriptionLine3, textX, textY);
  }
}

/*******************************
 * CLASSIC FROG FEASTER MODE
 *******************************/

// Friend frogs structure

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

/*******************************
 * PRELOAD ASSETS
 *******************************/

function preload() {
  frogGif = loadImage("assets/images/frog.gif");
  Font = loadFont("assets/fonts/TrashHand.TTF");
  horseFlyIMG = loadImage("assets/images/besthorseslfyever.png");
  mySound = loadSound("assets/sounds/MeepcityBackgroundmusic.mp3"); // background music
  tongueGif = loadImage("assets/images/tongue.gif");
  illusionflyGif = loadImage("assets/images/illusionfly.gif");
  pepescreamGif = loadImage("assets/images/pepescream.gif");
  pepebonkGif = loadImage("assets/images/pepebonk.gif");
  croakSound = loadSound("assets/sounds/croaking.mp3"); // croak sound when milestone hit
  confettiGif = loadImage("assets/images/confetti.gif"); // shown when milestone hit
  mlemSound = loadSound("assets/sounds/mlem.mp3"); // eating sound effect when fly is eaten
  hurtSound = loadSound("assets/sounds/hurt.mp3"); // hurt sound effect when horsefly is eaten
  scaryGif = loadImage("assets/images/scary.gif");

  // Create a <video></video> element for playback and remove it from the DOM
  video = createVideo("assets/videos/DistractionFlashbang.webm");
  video.hide();

  // Attach an event listener for when the playback ends setting hide to true
  video.elt.addEventListener("ended", () => (hide = true));
}

/*******************************
 * SETUP FUNCTION
 *******************************/
function setup() {
  createCanvas(640, 480);
  textFont(Font);
  textAlign(CENTER);
  resetFly(); //give the fly its first random
  userStartAudio();
  mySound.loop(); // background music loops
  mySound.setVolume(0.1); // set volume of music

  // Every 16 seconds, ensure the video is visible and start playback
  // if the game is in the "play" state and the video is currently paused
  setInterval(() => {
    if (gameState === "play") {
      hide = false; // show video
      videoX = random(0, width - 480); // random x
      videoY = random(0, height - 280); // random y
      video.play(); // play video
    }
  }, 16000);
}

/*******************************
 * DRAW LOOP
 * (Switches between menu, modes and gameover screen)
 *******************************/

function draw() {
  // TITLE SCREEN
  if (gameState === "title") {
    drawTitleScreen();

    // CLASSIC MODE
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

    // Draw confetti if milestone hit
    drawConfetti();
    if (showConfetti) {
      confettiTimer--;
      if (confettiTimer <= 0) {
        showConfetti = false;
      }
    }

    // Render video if not hidden
    if (!hide) {
      image(video, videoX, videoY, 440, 280);
    }

    // NIGHTMARE SPOTLIGHT MODE
  } else if (gameState === "nightmareSpotlight") {
    updateNightmareSpotlightMode();
    drawNightmareSpotlightMode();

    // NIGHTMARE RESULT SCREEN
  } else if (gameState === "nightmareOver") {
    drawNightmareOverScreen();

    // GAME OVER SCREEN (CLASSIC MODE)
  } else if (gameState === "gameover") {
    background("#360101ff");

    image(pepescreamGif, width / 2 - 300, height / 2 - 30, 150, 150); // on the left
    image(pepebonkGif, width / 2 + 170, height / 2 - 30, 150, 150); // on the right

    fill("#ff0000");
    textSize(150);
    text("GAME OVER", width / 2, height / 2 - 90);
    textSize(50);
    text(`You got ${frogStrikes} strikes`, width / 2, height / 2 + 20);
    textSize(30);
    text(
      "Ctrl+R to restart your frog life, idiot!!",
      width / 2,
      height / 2 + 200
    );
  } else if (gameState === "horsefly") {
    // Horsefly Feast Mode
    updateHorseflyFeastMode();
    drawHorseflyFeastMode();
  } else if (gameState === "horseflyOver") {
    drawHorseflyFeastOverScreen();
  }
}
/*******************************
 * CLASSIC MODE (Original Game)
 *******************************/

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

function drawhorseFly() {
  if (horseFly.show) {
    push();

    // Calculate shaking offset based on rage level
    let shakeX = random(-rageLevel * 2, rageLevel * 2);
    let shakeY = random(-rageLevel * 2, rageLevel * 2);

    // Apply shaking offsets when drawing
    image(
      horseFlyIMG,
      horseFly.x - horseFly.size / 2 + shakeX,
      horseFly.y - horseFly.size / 2 + shakeY,
      horseFly.size,
      horseFly.size
    );

    pop();

    // Show strikes at top left
    push();
    fill(255, 0, 0);
    textSize(24);
    textAlign(LEFT);
    text(`STRIKES: ${frogStrikes} / ${MAX_STRIKES}`, 10, 20);
    pop();

    // Show number of flies eaten
    push();
    fill("#0400ffff");
    textSize(24);
    textAlign(RIGHT, TOP);
    text(`FLIES EATEN: ${fliesEaten}`, width - 10, 10);
    pop();
  }
}

function checkHorseFlyCollision() {
  const d = dist(frog.tongue.x, frog.tongue.y, horseFly.x, horseFly.y);

  if (d < frog.tongue.size / 2 + horseFly.size / 2 && horseFly.show) {
    frogStrikes++;

    // Play hurt sound effect when horsefly is eaten
    if (!hurtSound.isPlaying()) {
      hurtSound.play();
    }

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

/*******************************
 * INPUT + FROG / FLY LOGIC
 *******************************/

function keyPressed() {
  if (keyCode === BACKSPACE) {
    typedText = typedText.slice(0, -1);
    return false;
  }
}

function isPrintable(k) {
  return k.length === 1 && k.charCodeAt(0) >= 32 && k.charCodeAt(0) <= 126;
}

// Tracks keys pressed by user
function keyTyped() {
  if (isPrintable(key)) {
    typedText += key;
  }

  // Check if they typed "frog"
  if (typedText.toLowerCase() === "frog") {
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
 * Displays the tongue and the frog
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
  const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
  const eaten = d < frog.tongue.size / 2 + fly.size / 2;

  if (!eaten) {
    return; // nothing to do if we didn’t hit the fly
  }

  // pulls tongue back
  resetFly();
  frog.tongue.state = "inbound";

  // CLASSIC MODE behaviour
  if (gameState === "play") {
    fliesEaten++;
    frog.body.size += 20; // grows frog every fly eaten

    // Play eating sound effect when fly is eaten
    if (!mlemSound.isPlaying()) {
      mlemSound.play();
    }

    // Only trigger milestone effects every 5 flies
    if (fliesEaten % 5 === 0) {
      // Play croak sound
      if (!croakSound.isPlaying()) {
        croakSound.play();
      }

      // Increase the horseFly speed every milestone hit
      horseFly.speed += 1;

      // Increase rage intensity, capped at 10
      rageLevel = min(rageLevel + 1, 10);

      // Show confetti for a short time
      showConfetti = true;
      confettiTimer = 60; // frames (~1 second if 60fps)
    }
  }

  // NIGHTMARE MODE behaviour
  else if (gameState === "nightmareSpotlight") {
    nightmareScore++; // just count points

    // Same eating sound if you want
    if (!mlemSound.isPlaying()) {
      mlemSound.play();
    }
  }
}

function drawConfetti() {
  if (showConfetti) {
    push();
    image(confettiGif, width / 2 - 400, 400 - 150, 800, 300);
    pop();
  }
}

function mousePressed() {
  // 1) TITLE SCREEN BUTTONS
  if (gameState === "title") {
    // Classic button
    if (
      mouseX >= menuButtonX &&
      mouseX <= menuButtonX + menuButtonWidth &&
      mouseY >= menuButtonY_Classic &&
      mouseY <= menuButtonY_Classic + menuButtonHeight
    ) {
      gameState = "play"; // start classic mode
      return;
    }

    // Nightmare button
    if (
      mouseX >= menuButtonX &&
      mouseX <= menuButtonX + menuButtonWidth &&
      mouseY >= menuButtonY_Nightmare &&
      mouseY <= menuButtonY_Nightmare + menuButtonHeight
    ) {
      startNightmareSpotlightMode();
      return;
    }

    // Horsefly button
    if (
      mouseX >= menuButtonX &&
      mouseX <= menuButtonX + menuButtonWidth &&
      mouseY >= menuButtonY_Horsefly &&
      mouseY <= menuButtonY_Horsefly + menuButtonHeight
    ) {
      startHorseflyFeastMode();
      return;
    }
  }

  // NIGHTMARE OVER, click to go back to title
  if (gameState === "nightmareOver") {
    gameState = "title";
    return;
  }

  // HORSEFLY FEAST OVER, click to go back to title
  if (gameState === "horseflyOver") {
    gameState = "title";
    return;
  }

  // SHOOT TONGUE (classic + nightmare spotlight)
  if (gameState === "play" || gameState === "nightmareSpotlight") {
    if (frog.tongue.state === "idle") {
      frog.tongue.state = "outbound";
    }

    // Start background music only once
    if (!mySound.isPlaying()) {
      mySound.loop();
      mySound.setVolume(0.1);
    }
  }
}

/*******************************
 * NIGHTMARE SPOTLIGHT MODE
 * (Classic game but with darkness & flashlight)
 *******************************/
function startNightmareSpotlightMode() {
  gameState = "nightmareSpotlight";
  nightmareScore = 0;
  nightmareTimerLeft = 30; // 30 seconds for the mode

  spotlightX = width / 2;
  spotlightY = height / 2;
  spotlightRadius = 100;

  nightmareFrog.x = random(50, width - 50);
  nightmareFrog.y = random(50, height - 50);
}

function updateNightmareSpotlightMode() {
  moveFrog();
  moveTongue();
  checkTongueFlyOverlap();

  // countdown timer
  nightmareTimerLeft -= deltaTime / 1000; // convert ms to seconds
  if (nightmareTimerLeft <= 0) {
    nightmareTimerLeft = 0;
    gameState = "nightmareOver";
    return;
  }

  // where the light is situated:
  // when tongue is idle, around frog face
  // when tongue is out, around the tongue tip
  if (frog.tongue.state === "idle") {
    spotlightX = frog.body.x;
    spotlightY = frog.body.y - 60;
  } else {
    spotlightX = frog.tongue.x;
    spotlightY = frog.tongue.y;
  }
}

// Draws the nightmare spotlight mode screen
function drawNightmareSpotlightMode() {
  background("#09f8e4ff");
  drawBackground();
  drawFriendFrog();
  moveFriendFrogEye();
  moveFly();
  drawFly(); // base dark fly
  drawFrog(); // base frog

  // Dark overlay
  push();
  noStroke();
  fill(0, 0, 0, 230);
  rect(0, 0, width, height);
  pop();

  // Light beam + halo around tongue
  let beamCoreWidth = frog.tongue.size + 15; // main bright part
  let beamOuterWidth = frog.tongue.size + 35; // soft glow part

  // Find where the beam starts (at the top) and ends (at the bottom)
  let topY;
  if (spotlightY < frog.body.y) {
    topY = spotlightY;
  } else {
    topY = frog.body.y;
  }

  let bottomY = frog.body.y + frog.body.size / 2;

  push();
  noStroke();

  // outer soft beam
  fill(255, 255, 220, 35);
  rect(spotlightX - beamOuterWidth / 2, topY, beamOuterWidth, bottomY - topY);

  // inner brighter beam
  fill(255, 255, 220, 70);
  rect(
    spotlightX - beamCoreWidth / 2,
    topY,
    beamCoreWidth,
    bottomY - topY,
    beamCoreWidth / 2
  );

  // big outer halo
  fill(255, 255, 220, 40);
  ellipse(spotlightX, spotlightY, spotlightRadius * 2.2);

  // inner bright halo
  fill(255, 255, 220, 90);
  ellipse(spotlightX, spotlightY, spotlightRadius * 1.3);

  pop();

  // Make the fly brighter if it is inside the flashlight
  const inCircle =
    dist(fly.x, fly.y, spotlightX, spotlightY) < spotlightRadius * 1.2;

  const inBeam =
    fly.x >= spotlightX - beamOuterWidth / 2 &&
    fly.x <= spotlightX + beamOuterWidth / 2 &&
    fly.y >= topY &&
    fly.y <= bottomY;

  // fly touching light? if yes, there's a glow around it
  if (inCircle || inBeam) {
    push();
    noStroke();
    // little glow around the fly
    fill(255, 255, 180, 120);
    ellipse(fly.x, fly.y, fly.size * 3);

    // bright fly body glow
    fill("#ffffee");
    ellipse(fly.x, fly.y, fly.size * 1.6);
    pop();
  }
  // nicely lit fly
  drawFrog();

  // text
  fill(255);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(20);
  text("Nightmare Score: " + nightmareScore, 10, 10);
  text("Time Left: " + nightmareTimerLeft.toFixed(1) + "s", 10, 35);
}

function drawNightmareOverScreen() {
  background(0); // black screen

  image(scaryGif, width / 2 - 150, height / 2 - 220, 300, 200);

  fill(255);
  textAlign(CENTER, CENTER);

  textSize(40);
  text("Nightmare Over!", width / 2, height / 2 - 40);

  textSize(26);
  text("Final score: " + nightmareScore, width / 2, height / 2 + 5);

  textSize(18);
  text("Click anywhere to return to the title", width / 2, height / 2 + 50);
}

/*******************************
 * HORSEFLY FEAST MODE
 *******************************/
// Horsefly player that follows the mouse
let horseflyPlayer = {
  x: 0,
  y: 0,
  size: 80,
};

// Frog settings used in this mode
let horseflyFrog = {
  x: 0,
  y: 0,
  size: 140,
  groundY: 0,
  jumping: false,
  goingUp: true,
  jumpHeight: 120,
  jumpSpeed: 6,
  cooldown: 0,
  xSpeed: 2.5,
};

// Flies for the horsfly to eat
let horseflyFlies = [];
let horseflyFlyCount = 5;

// Score for Horsefly Feast mode
let horseflyScore = 0;

// This starts up the game once button is glocked
function startHorseflyFeastMode() {
  gameState = "horsefly";

  // Start horsefly in the middle
  horseflyPlayer.x = width / 2;
  horseflyPlayer.y = height / 2;

  // Frog on the ground
  horseflyFrog.x = width / 2;
  horseflyFrog.groundY = height - 70; // ground position of the frog
  horseflyFrog.y = horseflyFrog.groundY;
  horseflyFrog.jumping = false;
  horseflyFrog.goingUp = true;
  horseflyFrog.cooldown = 60; // frames before first jump
  horseflyFrog.xSpeed = 2.5; // horizontal speed

  // Reset score and rage for this mode
  horseflyScore = 0;
  horseflyRage = 0;

  // Resets the amount of flies on the amount noted and spawn some more flies
  horseflyFlies = [];
  while (horseflyFlies.length < horseflyFlyCount) {
    spawnHorseflyFly();
  }

  // Hide the system cursor so the horsefly becomes the cursor
  noCursor();
}

// Updated logic for Horsefly Feast Game Mode
function updateHorseflyFeastMode() {
  // Horsefly follows the mouse
  horseflyPlayer.x = mouseX;
  horseflyPlayer.y = mouseY;

  // Keep horsefly inside the canvas
  horseflyPlayer.x = constrain(
    horseflyPlayer.x,
    horseflyPlayer.size / 2,
    width - horseflyPlayer.size / 2
  );
  horseflyPlayer.y = constrain(
    horseflyPlayer.y,
    horseflyPlayer.size / 2,
    height - horseflyPlayer.size / 2
  );

  updateHorseflyFrog();
  checkHorseflyEatFlies();
}

function updateHorseflyFrog() {
  // Move frog left and right
  horseflyFrog.x = horseflyFrog.x + horseflyFrog.xSpeed;

  let halfSize = horseflyFrog.size / 2;

  // Bounce at edges of the canvas
  if (horseflyFrog.x > width - halfSize || horseflyFrog.x < halfSize) {
    horseflyFrog.xSpeed = -horseflyFrog.xSpeed;
  }

  // Jumping logic
  if (!horseflyFrog.jumping) {
    // Count down until next jump
    if (horseflyFrog.cooldown > 0) {
      horseflyFrog.cooldown = horseflyFrog.cooldown - 1;
    } else {
      // Start a jump
      horseflyFrog.jumping = true;
      horseflyFrog.goingUp = true;
    }
  } else {
    // Frog is in the air
    if (horseflyFrog.goingUp) {
      // Move up
      horseflyFrog.y = horseflyFrog.y - horseflyFrog.jumpSpeed;
      if (horseflyFrog.y <= horseflyFrog.groundY - horseflyFrog.jumpHeight) {
        horseflyFrog.goingUp = false; // reached peak
      }
    } else {
      // Move down
      horseflyFrog.y = horseflyFrog.y + horseflyFrog.jumpSpeed;
      if (horseflyFrog.y >= horseflyFrog.groundY) {
        // Landed back on the ground
        horseflyFrog.y = horseflyFrog.groundY;
        horseflyFrog.jumping = false;
        horseflyFrog.cooldown = 60; // wait some frames before jumping again
      }
    }
  }
}

// Create a single fly at a random position
function spawnHorseflyFly() {
  let flyObj = {
    x: random(40, width - 40),
    y: random(40, height - 160), // keep them above the very bottom
    size: 18,
  };
  horseflyFlies.push(flyObj);
}

// Check if the horsefly overlaps any flies
function checkHorseflyEatFlies() {
  for (let oneFly of horseflyFlies) {
    let distance = dist(horseflyPlayer.x, horseflyPlayer.y, oneFly.x, oneFly.y);

    if (distance < horseflyPlayer.size / 2 + oneFly.size / 2) {
      // Ate this fly
      horseflyScore = horseflyScore + 1;
      horseflyRage = horseflyRage + 1;

      // Rage visual effects
      if (horseflyRage > 10) {
        horseflyRage = 10;
      }

      // The flies spawn at random places
      oneFly.x = random(40, width - 40);
      oneFly.y = random(40, height - 160);
    }
  }
}

// Draw Horsefly Feast mode
function drawHorseflyFeastMode() {
  // Reuse the classic background as the other variations
  background("#09f8e4ff");
  drawBackground();

  // Draw flies
  noStroke();
  fill(0);
  for (let oneFly of horseflyFlies) {
    ellipse(oneFly.x, oneFly.y, oneFly.size);
  }

  // Draws the horsefly image
  imageMode(CENTER);
  image(
    horseFlyIMG,
    horseflyPlayer.x,
    horseflyPlayer.y,
    horseflyPlayer.size,
    horseflyPlayer.size
  );

  // score & basic instructions
  fill(0);
  textAlign(LEFT, TOP);
  textSize(18);
  text("Flies eaten: " + horseflyScore, 10, 10);
}

// Game over screen for Horsefly feast game mode
function drawHorseflyFeastOverScreen() {
  cursor();
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("Horsefly Mode Over", width / 2, height / 2);
}
