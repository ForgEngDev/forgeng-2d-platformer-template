export interface PlatformSurface {
  readonly position: readonly [number, number];
  readonly size: readonly [number, number];
}

/** Deterministic fixed-step movement that is independent from rendering. */
export class PlatformerMotion {
  private position: readonly [number, number];
  private velocityY = 0;
  private grounded = true;
  private readonly speed = 2;
  private readonly gravity = 0.55;
  private readonly jumpVelocity = -9;
  private readonly start: readonly [number, number];

  public constructor(start: readonly [number, number]) {
    this.start = start;
    this.position = start;
  }

  public getPosition(): readonly [number, number] {
    return this.position;
  }

  public setPosition(position: readonly [number, number]): void {
    this.position = position;
  }

  public getVelocity(): readonly [number, number] {
    return [0, this.velocityY];
  }

  public isGrounded(): boolean {
    return this.grounded;
  }

  public jump(): boolean {
    if (!this.grounded) return false;
    this.velocityY = this.jumpVelocity;
    this.grounded = false;
    return true;
  }

  /** Advance one fixed step and resolve downward landings against platform AABBs. */
  public step(horizontal: number, platforms: readonly PlatformSurface[]): readonly [number, number] {
    const x = clamp(this.position[0] + horizontal * this.speed, -170, 170);
    const previousY = this.position[1];
    this.velocityY = Math.min(this.velocityY + this.gravity, 12);
    let y = previousY + this.velocityY;
    this.grounded = false;

    if (this.velocityY >= 0) {
      const previousBottom = previousY + 12;
      const nextBottom = y + 12;
      let landingTop = Number.POSITIVE_INFINITY;

      for (const platform of platforms) {
        const halfWidth = platform.size[0] / 2;
        const top = platform.position[1] - platform.size[1] / 2;
        const overlapsX = x + 9 > platform.position[0] - halfWidth
          && x - 9 < platform.position[0] + halfWidth;
        const crossesTop = previousBottom <= top && nextBottom >= top;
        if (overlapsX && crossesTop) landingTop = Math.min(landingTop, top);
      }

      if (Number.isFinite(landingTop)) {
        y = landingTop - 12;
        this.velocityY = 0;
        this.grounded = true;
      }
    }

    this.position = [x, y];
    return this.position;
  }

  public reset(): readonly [number, number] {
    this.position = this.start;
    this.velocityY = 0;
    this.grounded = true;
    return this.position;
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
