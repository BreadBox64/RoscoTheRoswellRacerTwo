import { DefaultLoader, Engine, ExcaliburGraphicsContext, Scene, SceneActivationContext, Actor, vec, ImageSource } from "excalibur";
import { Resources } from "./resources";

const uiOverlay = document.getElementById('ui-overlay');
export class Title extends Scene {
    private backgroundImage: ImageSource

    constructor() {
       super();
       this.backgroundImage = Resources.BG 
    }

    override onPreLoad(loader: DefaultLoader): void {
    }

    override onInitialize(engine: Engine): void {
       const backgroundActor = new Actor({
        x: 0,
        y: 0,
        width: engine.screen.resolution.width,
        height: engine.screen.resolution.height,
        anchor: vec(0, 0),
        z: -99
       });

       const backgroundSprite = this.backgroundImage.toSprite();
        backgroundSprite.destSize.width = engine.screen.resolution.width;
        backgroundSprite.destSize.height = engine.screen.resolution.height;

        backgroundActor.graphics.use(backgroundSprite);

        this.add(backgroundActor)
    }

    override onActivate(context: SceneActivationContext<unknown>): void {
        uiOverlay.hidden = false// Called when Excalibur transitions to this scene
        // Only 1 scene is active at a time
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