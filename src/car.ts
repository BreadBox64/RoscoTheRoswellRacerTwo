import { Actor, Collider, CollisionContact, CollisionType, Engine, Keys, Side, vec } from "excalibur"
import { Resources } from "./resources"

export class Car extends Actor {
	constructor() {
		super({
			name: 'Car',
			pos: vec(300, 300),
			width: 100,
			height: 100,
			// anchor: vec(0, 0), // Actors default center colliders and graphics with anchor (0.5, 0.5)
			collisionType: CollisionType.Active,
		});
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
		
		let decceleration = 15 + (this.vel.magnitude / 1000) + 100*Math.abs(this.angularVelocity);
		let acceleration = 0
		
		if(engine.input.keyboard.isHeld(Keys.S)) {
			decceleration += 250
		} else if(engine.input.keyboard.isHeld(Keys.W)) {
			acceleration += 100
		}
		
		decceleration *= elapsedMs/10
		acceleration *= elapsedMs/10
		if((this.vel.magnitude - decceleration/1000) <= 0) {
			this.acc = vec(0, 0)
			this.vel = vec(0, 0)
		} else {
			this.acc = vec(-decceleration, 0).rotate(this.vel.toAngle())
		}
		this.acc.add(vec(acceleration, 0).rotate(this.rotation), this.acc)
		//console.log(this.vel.magnitude)
		this.vel.clampMagnitude(450)
	}

	override onInitialize() {
		this.graphics.add(Resources.ForwardMarker.toSprite());

		this.on('pointerdown', evt => {
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
