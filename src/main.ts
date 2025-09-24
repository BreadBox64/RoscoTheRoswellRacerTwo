import { Color, DisplayMode, Engine, FadeInOut, Resource, PointerScope, ImageSource, Resolution} from "excalibur"
import { loader, Resources } from "./resources"
import { MyLevel } from "./level"
import { Title } from "./title";

const startButton = document.getElementById('start-button');
const uiOverlay = document.getElementById('ui-overlay');

// Goal is to keep main.ts small and just enough to configure the engine
uiOverlay.hidden = true
console.log("Launch engine")
const game = new Engine({
  width: 800, // Logical width and height in game pixels
  height: 600,
  displayMode: DisplayMode.FitScreenAndFill, // Display mode tells excalibur how to fill the window
  pixelArt: true, // pixelArt will turn on the correct settings to render pixel art without jaggies or shimmering artifacts
  canvasElementId: 'game-canvas',
  pointerScope: PointerScope.Canvas
  // physics: {
  //   solver: SolverStrategy.Realistic,
  //   substep: 5 // Sub step the physics simulation for more robust simulations
  // },
  // fixedUpdateTimestep: 16 // Turn on fixed update timestep when consistent physic simulation is important
});
console.log("Engine launched")

// uiOverlay.style.width = `${game.screen.width}`
// uiOverlay.style.height = `${game.screen.height}`

game.add('Title', new Title())
game.add('LevelOne', new MyLevel())
console.log("Added scenes")

startButton.addEventListener('click', () => {
  game.goToScene('LevelOne');
})
console.log("Waiting for user to start game")
game.start('', {
  loader
}).then(() => {
  console.log('Game started')
  game.goToScene('Title')
}).catch(err => {
  console.log("Game failed to start:", err)
})