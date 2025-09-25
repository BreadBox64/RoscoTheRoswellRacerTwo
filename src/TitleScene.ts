import { DefaultLoader, Engine, ExcaliburGraphicsContext, Scene, SceneActivationContext } from "excalibur";

const uiOverlay = document.getElementById('main-menu-overlay');
export class TitleScene extends Scene {

	override onPreLoad(loader: DefaultLoader): void {
	}

	override onInitialize(engine: Engine): void {
		
	}

	override onActivate(context: SceneActivationContext<unknown>): void {
		uiOverlay.hidden = false// Called when Excalibur transitions to this scene
	}

	override onDeactivate(context: SceneActivationContext): void {
		uiOverlay.hidden = true
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