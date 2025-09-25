import { Actor, Color, DefaultLoader, Engine, Entity, ExcaliburGraphicsContext, GraphicsComponent, PointerComponent, Scene, SceneActivationContext, Sprite, TransformComponent, vec } from "excalibur"
import { Player } from "./player"
import { Car } from "./car"
import { Resources } from "./resources"

export class MainGameScene extends Scene {
	override onInitialize(engine: Engine): void {
		// Scene.onInitialize is where we recommend you perform the composition for your game
		Resources.TiledMap.addToScene(this)
		this.tileMaps[0].scale = vec(2, 2)
		this.tileMaps[0].removeComponent(PointerComponent);
		const offset = this.tileMaps[0].pos.negate().add(vec(8, -8))
		Resources.TiledMap.getEntitiesByClassName('physics-block').forEach(block => {
			console.log('a')
			block.get(TransformComponent).pos.add(offset, block.get(TransformComponent).pos)
		})

		const player = new Player();
		this.add(player); // Actors need to be added to a scene to be drawn
		
		const car = new Car();
		this.add(car);
		this.camera.strategy.elasticToActor(car, 0.5, 0.9)
		this.backgroundColor = Color.Viridian
	}

	override onPreLoad(loader: DefaultLoader): void {
		// Add any scene specific resources to load
	}

	onPostLoad(): void {
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