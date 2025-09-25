import { ImageSource, ImageWrapping, Loader } from "excalibur"
import swordPath from '../res/img/sword.png'
import forwardMarkerPath from '../res/img/forwardMarker.png'
import { FactoryProps, TiledResource, TilesetResource } from "@excaliburjs/plugin-tiled";
import { PhysicsBlock } from "./physicsBlock";

// It is convenient to put your resources in one place
export const Resources = {
	TiledTileset: new TilesetResource('../res/map/tileset.tsx', 0),
	TiledMap: new TiledResource('../res/map/main.tmx', {
		useExcaliburWiring: true,
		entityClassNameFactories: {
			'physics-block': (props: FactoryProps) => {
				return new PhysicsBlock(props)
			}
		}
	}),
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
