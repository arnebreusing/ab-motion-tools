![ab_motion-tools_001-header](https://user-images.githubusercontent.com/48606207/63626945-934ddb00-c605-11e9-9627-a269eb9ec507.png)

# AB Motion Tools
A collection of Motion Graphics Scripts for Adobe After Effects

## Icons
You can find corresponding icons for all scripts in the icons subfolder as PNG (1x) or SVG (best for adjusting colors).

## Contained Scripts

### ab-changeLoop.jsx
Change the loops of any selected source in the project panel without touching other settings like alpha mode or framerate. Helpful for looping imported gifs in After Effects.

### ab-deselectChilds.jsx
Deselects all currently selected layers in your composition that already have a parent. Works very similar to selectAllUnParented.jsx but does not completely destroy your previous selection (e.g. via label selection).

### ab-keepStrokeWidth.jsx
Applies to all strokes* of selected shape layers the maintain stroke width expression and asks for a new stroke width.
\*only on first level

### ab-makeGrid.jsx
Automatically split up a layer into a grid. More infos: https://tmblr.co/ZJNKTy2kPplpZ

### ab-maskToLastSelected.jsx
Apply the Set Matte effect to all selected layers and set the last selected layer as mask.

### ab-parentToLastSelected.jsx
Easily select your layers in the viewport and link them with this script to the last selected layer. No need to pick whip or scroll long layer dropdown lists.

### ab-selectAllUnParented.jsx
This script helps you to select all layers in your current composition that have no parent. Useful for linking all layers to a new master null without loosing your parent child chain.
