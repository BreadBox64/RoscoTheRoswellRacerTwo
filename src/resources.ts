import { ImageSource, ImageWrapping, Loader } from "excalibur"
import swordPath from '../res/img/sword.png'
import forwardMarkerPath from '../res/img/forwardMarker.png'
import { TiledResource } from "@excaliburjs/plugin-tiled";

// It is convenient to put your resources in one place
export const Resources = {
	TiledMap: new TiledResource('../res/map/main.tmx'),
	Sword: new ImageSource(swordPath),
	ForwardMarker: new ImageSource(forwardMarkerPath),
} as const; // the 'as const' is a neat typescript trick to get strong typing on your resources. 
// So when you type Resources.Sword -> ImageSource

// We build a loader and add all of our resources to the boot loader
// You can build your own loader by extending DefaultLoader
export const loader = new Loader();
for (const res of Object.values(Resources)) {
	loader.addResource(res);
}
