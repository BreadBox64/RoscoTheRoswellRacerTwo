import { Actor, Collider, CollisionContact, CollisionType, Engine, Keys, Side, toRadians, vec } from "excalibur"
import { Resources } from "./resources"
import { FactoryProps } from "@excaliburjs/plugin-tiled";

export class Car extends Actor {
	maxSpeed: number
	constructor(props?: FactoryProps) {
		console.log(props)
		super({
			name: props?.name ?? 'car',
			pos: props?.worldPos ?? vec(0, 0),
			width: 16,
			height: 16,
			// anchor: vec(0, 0), // Actors default center colliders and graphics with anchor (0.5, 0.5)
			collisionType: CollisionType.Active,
		});
		this.body.mass = 20
		this.body.bounciness = 0
		this.rotation = toRadians(props?.properties.get('orientation') ?? 0)
		this.maxSpeed = (props?.properties.get('max-speed') ?? 1000) / 1000
	}

	calculateAcceleration(engine: Engine, elapsedMs: number) {
		this.angularVelocity += (engine.input.keyboard.isHeld(Keys.D) ? 0.06 : 0) + (engine.input.keyboard.isHeld(Keys.A) ? -0.06 : 0)
		if(this.angularVelocity != 0) {
			this.angularVelocity -= Math.sign(this.angularVelocity) * 0.02
			if(Math.abs(this.angularVelocity) < 0.02) {
				this.angularVelocity = 0;
			} else if(this.angularVelocity > 1.5) {
				this.angularVelocity = 1.5
			} else if(this.angularVelocity < -1.5) {
				this.angularVelocity = -1.5
			}
			this.vel = this.vel.rotate(this.angularVelocity * (elapsedMs/1000))
		}
		
		const {tiledTile, exTile} = Resources.TiledMap.getTileByPoint('ground', this.pos) || {tiledTile: null, exTile: null}
		const maxDriveSpeed = (Number)(tiledTile?.properties.get('max drive speed') || 100) 
		
		let decceleration = 15 + 135 * (this.vel.magnitude / maxDriveSpeed) + 100*Math.abs(this.angularVelocity);
		let acceleration = 0

		
		if(engine.input.keyboard.isHeld(Keys.S)) {
			decceleration += 75
			acceleration -= 200
		} else if(engine.input.keyboard.isHeld(Keys.W)) {
			acceleration += (25 / this.maxSpeed) + (100000 / (this.vel.magnitude + 1000) * this.maxSpeed)
		}
		
		decceleration *= 0.5
		acceleration *= 0.5
		if((this.vel.magnitude - decceleration/1000) <= 0) {
			this.acc = vec(0, 0)
			this.vel = vec(0, 0)
		} else {
			this.acc = vec(-decceleration, 0).rotate(this.vel.toAngle())
		}
		this.acc.add(vec(acceleration, 0).rotate(this.rotation), this.acc)
	}

	override onInitialize() {
		this.graphics.add(Resources.Dozer.toSprite());

		this.on('pointerdown', evt => {
			/*Resources.TiledMap.getTileLayers()[0].tilemap.getTileByPoint(this.pos).addGraphic(new Rectangle({
				width: 8,
				height: 8,
				color: Color.Red
			}))*/
			const {tiledTile, exTile} = Resources.TiledMap.getTileByPoint('ground', this.pos) || {tiledTile: null, exTile: null}
			console.log(tiledTile)
			console.log(tiledTile.properties.get('max drive speed'))
			console.log('You clicked the actor @', evt.worldPos.toString());
		});
	}

	override onPreUpdate(engine: Engine, elapsedMs: number): void {
		// Put any update logic here runs every frame before Actor builtins
		this.calculateAcceleration(engine, elapsedMs)
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
