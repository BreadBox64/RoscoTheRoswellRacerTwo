import { ImageSource, ImageWrapping, Loader } from "excalibur"
import swordPath from '../res/img/sword.png'
import bgPath from '../res/img/bg.png';
import forwardMarkerPath from '../res/img/forwardMarker.png'
import { FactoryProps, TiledResource, TilesetResource } from "@excaliburjs/plugin-tiled";
import { PhysicsBlock } from "./physicsBlock";
import { Car } from "./car";

// It is convenient to put your resources in one place
export const Resources = {
	TiledTileset: new TilesetResource('../res/map/tileset.tsx', 0),
	TiledMap: new TiledResource('../res/map/bunker.tmx', {
		useExcaliburWiring: true,
		entityClassNameFactories: {
			'physics-block': (props: FactoryProps) => {
				return new PhysicsBlock(props)
			},
			'car': (props: FactoryProps) => {
				return new Car(props)
			}
		}
	}),
	Sword: new ImageSource(swordPath),
	Dozer: new ImageSource('../res/img/dozer.png'),
	ForwardMarker: new ImageSource(forwardMarkerPath),
  	BG: new ImageSource(bgPath)
} as const; // the 'as const' is a neat typescript trick to get strong typing on your resources. 
// So when you type Resources.Sword -> ImageSource

// We build a loader and add all of our resources to the boot loader
// You can build your own loader by extending DefaultLoader
export const loader = new Loader();
for (const res of Object.values(Resources)) {
	loader.addResource(res);
}
