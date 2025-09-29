# Self Portrait of Yelena Arakelian

Yelena Arakelian

[View this project online](URL_FOR_THE_RUNNING_PROJECT)

## Description

> - This project is a Self Portrait of Yelena Arakelian created in p5.js. It demonstrates Yelena really excited to eat cookie, as its her favorite snack, while a bee is annoying her with the buzzing sound, in addition of the sky changing color.

## Features

> - Audio Interaction: When the cookie cursor is near the mouth, a sound effect of Heavy from Team Fortress 2 plays of him eating his "sandvich", as how he calls it.
> - Mouth Animation: The mouth changes size based on how the cursor is.
> - Bee Animation: The bee moves around randomly across the canvas.
> - Sky Color Change: The sky gradually changes color overtime.
> - Cookie Cursor: The cursor is a cookie that follows the mouse.

## How Requirement Are Met

1. **Use variables to create change over time**

   - The "skyShade" variable gradually changes the sky's color.
   - The bee's 'x' and 'y' positions are refreshed every frame to create random movement.

2. **Use mouseX and mouseY to allow for some user interaction**

   - Using "dist(mouseX, mouseY, mouthX, mouthY)", the mouse distance makes the mouth change sizes based on the distance.
   - The cookie cursor follows the mouse.

3. **Use at least one p5 function never used before**

   - Used "constrain()" to keep skyShade value inside a specific range.
   - Used "userStartAudio()" to allow the audio to play when my project begins.

4. **Use at least one conditional to make the program respond to a changing variable**

   - The program detects if the distance between the cookie cursor and mouth is less than 200 pixels, and plays a sound effect if it is: "if (d < 200 && !sandvichSound.isPlaying()) {
     sandvichSound.play();
     }"

## Attribution

> - This project uses [p5.js](https://p5js.org).

> - Refrence used for constrain: https://p5js.org/reference/p5/constrain/

> - Refrence used for userStartAudio: https://p5js.org/reference/p5/userStartAudio/

> - The eating sound effect is "heavy tf2 eating sandvich" by HanbaobaoZaiNar from myinstant.com: https://www.myinstants.com/en/instant/heavy-tf2-eating-sandvich-16899/

> - The bee noise is "Buzzing Around" by Audiophiliac from myinstant.com: https://www.myinstants.com/en/instant/bee-buzzing-around-73337/

## License

> This project is licensed under a Creative Commons Attribution ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.en)) license with the exception of libraries and other components with their own licenses.
