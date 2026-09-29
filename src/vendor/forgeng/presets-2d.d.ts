/** Minimal Forge2d preset types used by this template without the full contracts graph. */
export interface Forge2dGameLoop {
  readonly running: boolean;
  start(): void;
  stop(): void;
}

export interface Forge2dHudApi {
  set(path: string, value: unknown): void;
}

export interface Forge2dCollider {
  readonly id: string;
  readonly entityId: string;
  state(): {
    readonly id: string;
    readonly entityId: string;
    readonly bounds: readonly [number, number, number, number];
  };
  overlaps(includeSensors?: boolean): readonly unknown[];
}

export interface Forge2dCameraController {
  follow(
    entityId: string,
    options?: { bounds?: readonly [number, number, number, number] | null },
  ): unknown;
}

export interface Forge2dSpriteAnimationController {
  play(animationId: string, mode?: "continue" | "restart"): unknown;
  state(): { current: { animationId: string } | null };
}

export interface Forge2dSceneFacade {
  readonly id: string;
  readonly hud: Forge2dHudApi;
  setTransform(
    entityId: string,
    value: { position: readonly [number, number]; rotation: number; scale: readonly [number, number] },
  ): void;
  camera(cameraId: string): Forge2dCameraController;
  collider(colliderId: string): Forge2dCollider | null;
  spriteAnimation(spriteId: string): Forge2dSpriteAnimationController;
}

export interface Forge2dSceneDefinition {
  readonly id: string;
  readonly render: unknown;
  readonly colliders?: readonly {
    id: string;
    entityId: string;
    shape: { kind: "aabb"; size: readonly [number, number] };
  }[];
  readonly setup?: (scene: Forge2dSceneFacade) => void | Promise<void>;
  readonly fixedUpdate?: (scene: Forge2dSceneFacade, tick: number) => void;
}

export interface Forge2dGame {
  canvas: HTMLCanvasElement;
  loop: Forge2dGameLoop;
  twoD: {
    spriteAnimation(spriteId: string): Forge2dSpriteAnimationController;
    setTransform(
      entityId: string,
      value: { position: readonly [number, number]; rotation: number; scale: readonly [number, number] },
    ): void;
  };
  actions: {
    enableMap(id: string): { dispose(): void };
    value(action: unknown): readonly [number, number];
  };
  ui: unknown;
  destroy(): Promise<void>;
}

export interface Forge2dCreateOptions {
  canvas?: { target?: string | HTMLCanvasElement; layout?: "fixed" | "container" | "viewport" };
  size?: { width?: number; height?: number; autoResize?: boolean };
  boot?: { scene?: string; autoStart?: boolean };
  providers?: {
    ui?: "default" | "disabled" | unknown;
    assets?: "default" | "disabled";
    storage?: "default" | "memory" | "disabled";
  };
  actions?: { maps?: readonly unknown[] };
  inspection?: { profile?: string };
  scenes: readonly Forge2dSceneDefinition[];
  render?: { backgroundColor?: string };
}

declare const Forge2d: {
  create(options: Forge2dCreateOptions): Promise<Forge2dGame>;
};

export default Forge2d;
export declare function create(options: Forge2dCreateOptions): Promise<Forge2dGame>;
