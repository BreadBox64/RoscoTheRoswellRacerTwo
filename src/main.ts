import { Color, DisplayMode, Engine, FadeInOut, PointerScope, SolverStrategy } from "excalibur"
import { loader } from "./Resources"
import { MainGameScene } from "./MainGameScene"
import { TitleScene } from "./TitleScene";

const startButton = document.getElementById('start-button');
const uiOverlay = document.getElementById('main-menu-overlay');

// Goal is to keep main.ts small and just enough to configure the engine
uiOverlay.hidden = true
console.log("Launch engine")
const game = new Engine({
	width: 800, // Logical width and height in game pixels
	height: 600,
	displayMode: DisplayMode.FitScreenAndFill, // Display mode tells excalibur how to fill the window
	pixelArt: true, // pixelArt will turn on the correct settings to render pixel art without jaggies or shimmering artifacts
	scenes: {
		start: TitleScene,
		main: MainGameScene
	},
	backgroundColor: Color.Black,
	antialiasing: false,
	canvasElementId: 'game-canvas',
	pointerScope: PointerScope.Canvas,
	physics: {
		solver: SolverStrategy.Realistic,
		realistic: {
			positionIterations: 4
		},
		colliders: {
			compositeStrategy: 'separate'
		}
		//substep: 5 // Sub step the physics simulation for more robust simulations
	},
});

startButton.addEventListener('click', () => {
	uiOverlay.style.opacity = '0';
	setTimeout(() => {
		game.goToScene('main', {
			destinationIn: new FadeInOut({
				duration: 1000,
				direction: 'in',
				color: Color.Black
			})
		});
	}, 1000)
})

game.start('start', {
	loader
})