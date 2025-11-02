# Planning

## Starting point

The initial idea:

> Frog eating flies while avoiding horseflies and distractions.

## Experience design

The experience:

> The player controls a frog at the bottom of the screen. By clicking, they launch its tongue to catch moving flies while avoiding a dangerous horsefly. Every five flies caught triggers a milestone with a croak sound, confetti animation, and increased difficulty.

## Breaking it down

Basic things to do:

- **What does the frog look like?**
  - Cartooned frog that grows slightly each time it eats a fly.
- **How does the user control the frog?**
  - Follows the mouse horizontally, left click launches tongue.
- **How does the fly move?**
  - Flies appear randomly and move across the screen; horsefly becomes faster each milestone.
- **What happens on milestones?**
  - Frog croaks, confetti plays, horsefly shakes in rage.
- **What happens if the frog is hit?**
  - When user hits horsefly after 3 strikes, the game ends.

# The program structure

## Elements

- **Frog**
  - Position, size (growth over time)
  - Tongue position, speed, and state
- **Fly**
  - Position, speed, respawn behavior
- **Horsefly**
  - Position, speed, rage level (increases every 5 flies)
- **Game State**

  - `title`, `play`, `gameover`
  - Counters for flies eaten and strikes
  - Confetti and sound triggers

  ### Flow

- **Setup**
  - Create canvas, load assets (images, sounds, video)
- **Every Frame (Draw)**
  - Draw background and elements
  - Move frog, tongue, flies, and horsefly
  - Check collisions and update score or strikes
  - Trigger milestone effects (croak, confetti, rage)
- **Events**
  - Mouse click → launch tongue if ready
  - Collision → update game state or reset elements
