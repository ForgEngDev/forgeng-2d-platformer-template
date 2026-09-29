import { sprite2d } from "forgeng/2d";
import { FALLBACK_TEXTURE, HERO, HERO_ENTITY, MATERIAL, WORLD } from "./ids";
import type { PlatformDefinition } from "./ground";
import { PlatformerMotion } from "./motion";

export const HERO_START: readonly [number, number] = [-115, 48];

/** Orange platformer hero driven by the template's fixed-step motion model. */
export class Hero {
  private readonly motion = new PlatformerMotion(HERO_START);

  public createSprite() {
    return sprite2d({
      id: HERO,
      entity: HERO_ENTITY,
      layer: WORLD,
      texture: FALLBACK_TEXTURE,
      material: MATERIAL,
      size: [18, 24],
      tint: [0.9, 0.45, 0.2, 1],
      transform: { position: this.motion.getPosition(), rotation: 0, scale: [1, 1] },
    });
  }

  public getPosition(): readonly [number, number] {
    return this.motion.getPosition();
  }

  public setPosition(position: readonly [number, number]): void {
    this.motion.setPosition(position);
  }

  public getVelocity(): readonly [number, number] {
    return this.motion.getVelocity();
  }

  public isGrounded(): boolean {
    return this.motion.isGrounded();
  }

  public jump(): boolean {
    return this.motion.jump();
  }

  public step(horizontal: number, platforms: readonly PlatformDefinition[]): readonly [number, number] {
    return this.motion.step(horizontal, platforms);
  }

  public resetPosition(): readonly [number, number] {
    return this.motion.reset();
  }
}
