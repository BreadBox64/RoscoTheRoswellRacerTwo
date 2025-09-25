import { DefaultLoader, Engine, ExcaliburGraphicsContext, Scene, SceneActivationContext, Actor, vec, ImageSource, } from "excalibur";
import { Resources } from "./resources";
import { game } from "./main";
import { electron } from "webpack";

const startButton = document.getElementById("start-button");
const optionsButton = document.getElementById("options-button")
const fullScreenButton = document.getElementById("fullscreen");
const uiOverlay = document.getElementById("main-menu-overlay");
const optionsOverlay = document.getElementById("options-menu-overlay");
const volumeSlider = document.getElementById("volume") as HTMLInputElement | null;
const volumeLabel = document.getElementById("volumeLabel");
const returnButton = document.getElementById("return")
export let isFullscreen = false;
export let volume = 0

export function enterFullscreen(element: HTMLElement): void {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if ((element as any).mozRequestFullScreen) { // Firefox
    (element as any).mozRequestFullScreen();
  } else if ((element as any).webkitRequestFullscreen) { // Chrome, Safari, Opera
    (element as any).webkitRequestFullscreen();
  } else if ((element as any).msRequestFullscreen) { // IE/Edge
    (element as any).msRequestFullscreen();
  }
}

export function exitFullscreen(): void {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).mozCancelFullScreen) { // Firefox
    (document as any).mozCancelFullScreen();
  } else if ((document as any).webkitExitFullscreen) { // Chrome, Safari, Opera
    (document as any).webkitExitFullscreen();
  } else if ((document as any).msExitFullscreen) { // IE/Edge
    (document as any).msExitFullscreen();
  }
}

export class Title extends Scene {
  override onPreLoad(loader: DefaultLoader): void {
    startButton.addEventListener("click", () => {
      game.goToScene("LevelOne");
    });
    fullScreenButton.addEventListener("click", () => {
      if (!isFullscreen) {
        enterFullscreen(document.documentElement)
        isFullscreen = true
      } else {
        exitFullscreen()
        isFullscreen = false
      }
    });
    optionsButton.addEventListener("click", () => {
        uiOverlay.hidden = true;
        optionsOverlay.hidden = false;
    })
    volumeSlider.addEventListener("input", () => {
        volumeLabel.textContent = 'Volume: ' + volumeSlider.value
        volume = parseInt(volumeSlider.value)
    })
    returnButton.addEventListener("click", () => {
        game.goToScene('Title')
    })
  }

  override onInitialize(engine: Engine): void {}

  override onActivate(context: SceneActivationContext<unknown>): void {
    uiOverlay.hidden = false; // Called when Excalibur transitions to this scene
  }

  override onDeactivate(context: SceneActivationContext): void {
    uiOverlay.hidden = true;
    optionsOverlay.hidden = true;
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
