# Planning

## Starting point

The initial idea:

> Frog eating flies while avoiding horseflies and distractions.
> Later expanded into three variations with different mechanics and visual styles.

## Experience design

The experience:

> The player interacts with simple, readable mechanics that escalate with sound, visuals, and surprise elements.
> Each variation keeps the core loop (eat flies, avoid danger) while changing the character role, visibility, or threats.

## Breaking it down

Basic things to do:

**What does the frog look like?**

- Cartooned frog that grows slightly each time it eats a fly.
- In Variation 2, only visible when inside the spotlight.
- In Variation 3, the player becomes a horsefly eating flies, the frog becomes a giant red angry hazard that chases the player.

**How does the user control the frog?**

# Classic feast

- Follows the mouse horizontally
- left click launches tongue.

# Nightmare Spotlight

- Same controls as Classic, but visibility is limited to a moving spotlight/flashlight masking the screen.

# Horsefly Feast

- Player controls the horsefly, which becomes the mouse pointer.
- Horsefly eats flies on contact (no clicking).
- Must dodge the giant angry frog.

**How does the fly move?**

# Classic feast

- Simple drifting movement, random directions.

- Respawn after being eaten.

- Faster spawn rate in Horsefly Feast to match the horsefly’s new role.

**What happens on milestones?**

- Every 5 flies:
- Croak sound
- Confetti animation
- Difficulty increases

- Classic/Nightmare: horsefly speeds up and shakes more.

- Horsefly Feast: the angry frog jumps faster and shakes harder.

  **What causes damage or game over**

# Classic

- Eating a horsefly = +1 strike.
- 3 strikes = game over.

# Nightmare

- 30 seconds time on the game.

# Horsefly Feast

- One hit from the red angry frog = instant death.
- Score = number of flies eaten before dying.

# The program structure

## Elements

- **Frog**

  - Position, size (growth)
  - Tongue position and state
  - Eating and hurt animations

- **Fly**

  - Position, speed, respawn behavior
  - Collision detection with tongue or horsefly

- **Horsefly**

  - Position, speed, rage level (increases every 5 flies)
  - Horsefly Feast: player-controlled cursor character

- **Game State**

  - title, play, gameover
  - Fly counter
  - Strike counter (Classic & Nightmare)
  - Spotlight timer (Nightmare)
  - Confetti triggers and milestone

  ### Flow

- **Setup**

  - Create canvas, load assets (images, sounds, video)
  - Load images, sounds, and optional video/GIF assets
  - Initialize game mode and state variables

- **Every Frame (Draw)**

  - Draw background and elements
  - Move frog, tongue, flies, and horsefly
  - Handle collisions
  - Trigger milestone effects (croak, confetti, rage)
  - Update score or strikes
  - Trigger milestone visuals

- **Events**
  - Mouse click → launch tongue if ready
  - Collision → update game state or reset elements
  - Mouse move → move frog or horsefly
  - Reaching milestones → croak, confetti, shake effects
