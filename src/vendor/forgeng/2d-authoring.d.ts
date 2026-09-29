/** Minimalni tipovi forgeng/2d authoring API-ja. */
export interface Layer2d {
  readonly id: string;
}

export interface Material2d {
  readonly id: string;
}

export interface Camera2dDesc {
  readonly id: string;
}

export interface Sprite2dDesc {
  readonly id: string;
}

export declare function defineLayer2d(options: { id: string }): Layer2d;

export declare function builtinSpriteMaterial2d(options: { id: string }): Material2d;

export declare function camera2d(options: {
  id: string;
  virtualSize: readonly [number, number];
  scaleMode?: string;
  pixelSnap?: string;
  sampling?: string;
  layers: readonly string[];
  clearColor?: readonly [number, number, number, number];
}): Camera2dDesc;

export declare function sprite2d(options: {
  id: string;
  entity: string;
  layer: string;
  texture: string;
  material: string;
  size: readonly [number, number];
  tint?: readonly [number, number, number, number];
  transform: {
    position: readonly [number, number];
    rotation: number;
    scale: readonly [number, number];
  };
}): Sprite2dDesc;

export declare function defineRender2d(options: {
  contractVersion: 1;
  id: string;
  layers: readonly Layer2d[];
  cameras: readonly Camera2dDesc[];
  materials: readonly Material2d[];
  sprites: readonly Sprite2dDesc[];
  animations?: readonly unknown[];
}): unknown;
