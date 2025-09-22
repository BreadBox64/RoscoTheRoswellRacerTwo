import { Color, DisplayMode, Engine, FadeInOut, PointerScope} from "excalibur";
import { loader } from "./resources";
import { MyLevel } from "./level";
import { Title } from "./title";

const startButton = document.getElementById('start-button');

// Goal is to keep main.ts small and just enough to configure the engine

const game = new Engine({
  width: 1920, // Logical width and height in game pixels
  height: 1080,
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

game.add('Title', new Title())
game.add('LevelOne', new MyLevel())
game.goToScene('Title')

startButton.addEventListener('click', () => {
  game.start()
  game.goToScene('LevelOne');
})