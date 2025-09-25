import { Actor, Collider, CollisionContact, CollisionType, Engine, Side } from "excalibur"
import { Resources } from "./Resources"
import { FactoryProps } from "@excaliburjs/plugin-tiled";

export class PhysicsBlock extends Actor {
	gid: number;

	constructor(props: FactoryProps) {
		super({
			name: 'Physics Block',
			pos: props.worldPos,
			width: 8,
			height: 8,
			//collider: Shape.Box(1, 1),
			// anchor: vec(0, 0), // Actors default center colliders and graphics with anchor (0.5, 0.5)
			collisionType: CollisionType.Active,
		});
		
		this.gid = props.object['gid'] - 1
		this.body.mass = props.properties.get('mass') ?? 1
	}

	override onInitialize() {
		this.graphics.add(Resources.TiledTileset.data.getSpriteForGid(this.gid));
	}

	override onPreUpdate(engine: Engine, elapsedMs: number): void {
		// Put any update logic here runs every frame before Actor builtins
	}

	override onPostUpdate(engine: Engine, elapsedMs: number): void {
		// Put any update logic here runs every frame after Actor builtins
	}

	override onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
		// Called before a collision is resolved, if you want to opt out of this specific collision call contact.cancel()
	}

	override onPostCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
		// Called every time a collision is resolved and overlap is solved
	}

	override onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
		// Called when a pair of objects are in contact
	}

	override onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact): void {
		// Called when a pair of objects separates
	}
}
