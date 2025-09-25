import { Actor, Color, DefaultLoader, Engine, ExcaliburGraphicsContext, PointerComponent, Scene, SceneActivationContext, TransformComponent, vec } from "excalibur"
import { Car } from "./Car"
import { Resources } from "./Resources"

export class MainGameScene extends Scene {
	override onInitialize(engine: Engine): void {
		// Scene.onInitialize is where we recommend you perform the composition for your game
		Resources.TiledMap.addToScene(this)
		this.tileMaps.forEach(map => {
			map.removeComponent(PointerComponent);
		})

		const offset = this.tileMaps[0].pos.negate().add(vec(8, -8))
		Resources.TiledMap.getEntitiesByClassName('physics-block').forEach(block => {
			block = block as Actor
			block.get(TransformComponent).pos.add(offset, block.get(TransformComponent).pos)
		})
		//console.log(Resources.TiledMap.getEntitiesByClassName())
		const playerCar = (Resources.TiledMap.getEntitiesByName('player-car')[0]) as Car
		playerCar.pos.add(offset, playerCar.pos)

		this.camera.strategy.elasticToActor(playerCar, 0.5, 0.9)
		this.camera.zoom = 2
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