import { Actor, Color, DefaultLoader, Engine, Entity, ExcaliburGraphicsContext, GraphicsComponent, Scene, SceneActivationContext, Sprite, vec } from "excalibur"
import { Player } from "./player"
import { Car } from "./car"
import { Resources } from "./resources"

export class MyLevel extends Scene {
	override onInitialize(engine: Engine): void {
		// Scene.onInitialize is where we recommend you perform the composition for your game
		const size = Math.max(engine.screen.drawWidth, engine.screen.drawHeight)
		const backgroundImage = new Actor({
			x: size/2,
			y: size/2,
		});
		backgroundImage.graphics.add(new Sprite({
			image: Resources.Dirt,
			destSize: {
				width: size,
        height: size,
			}
		}))
		this.add(backgroundImage)

		const player = new Player();
		this.add(player); // Actors need to be added to a scene to be drawn
		
		const car = new Car();
		this.add(car);
		this.camera.strategy.elasticToActor(car, 0.5, 0.5)
		this.backgroundColor = Color.Viridian
	}

	override onPreLoad(loader: DefaultLoader): void {
		// Add any scene specific resources to load
	}

	override onActivate(context: SceneActivationContext<unknown>): void {
		// Called when Excalibur transitions to this scene
		// Only 1 scene is active at a time
	}

	override onDeactivate(context: SceneActivationContext): void {
		// Called when Excalibur transitions away from this scene
		// Only 1 scene is active at a time
	}

	override onPreUpdate(engine: Engine, elapsedMs: number): void {
		// Called before anything updates in the scene
	}

	override onPostUpdate(engine: Engine, elapsedMs: number): void {
		// Called after everything updates in the scene
	}

	override onPreDraw(ctx: ExcaliburGraphicsContext, elapsedMs: number): void {
		// Called before Excalibur draws to the screen
	}

	override onPostDraw(ctx: ExcaliburGraphicsContext, elapsedMs: number): void {
		// Called after Excalibur draws to the screen
	}
}