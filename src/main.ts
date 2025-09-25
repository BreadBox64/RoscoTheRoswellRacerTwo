import { DisplayMode, Engine, PointerScope } from "excalibur"
import { loader } from "./resources"
import { MyLevel } from "./level"
import { Title } from "./title";

const uiOverlay = document.getElementById('main-menu-overlay');

// Goal is to keep main.ts small and just enough to configure the engine
uiOverlay.hidden = true
console.log("Launch engine")
export const game = new Engine({
  fixedUpdateTimestep: 10,
  width: 800, // Logical width and height in game pixels
  height: 600,
  displayMode: DisplayMode.FitScreenAndFill, // Display mode tells excalibur how to fill the window
  pixelArt: true, // pixelArt will turn on the correct settings to render pixel art without jaggies or shimmering artifacts
  canvasElementId: 'game-canvas',
  pointerScope: PointerScope.Canvas
});
console.log("Engine launched")

game.add('Title', new Title())
game.add('LevelOne', new MyLevel())
console.log("Added scenes")

console.log("Waiting for user to start game")
game.start('', {
  loader
}).then(() => {
  console.log('Game started')
  game.goToScene('Title')
}).catch(err => {
  console.log("Game failed to start:", err)
})