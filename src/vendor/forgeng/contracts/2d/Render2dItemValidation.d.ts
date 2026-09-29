import type { Render2dLightDescriptor, Render2dMaskDescriptor, Render2dSpriteDescriptor, Render2dTextDescriptor, Render2dTilemapDescriptor } from './Render2dDescriptors';
export declare function normalizeRender2dSprite(value: unknown, path: string): Render2dSpriteDescriptor;
export declare function normalizeRender2dTilemap(value: unknown, path: string): Render2dTilemapDescriptor;
export declare function normalizeRender2dText(value: unknown, path: string): Render2dTextDescriptor;
export declare function normalizeRender2dLight(value: unknown, path: string): Render2dLightDescriptor;
export declare function normalizeRender2dMask(value: unknown, path: string): Render2dMaskDescriptor;
