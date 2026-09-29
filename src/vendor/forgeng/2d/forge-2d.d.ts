/** Public, renderer-independent ForgeNG 2D authoring surface. */
export * from 'forgeng/contracts/2d';
import type { Render2dCameraDescriptor, Render2dLayerDescriptor, Render2dMaterialDescriptor, Render2dSpriteDescriptor } from 'forgeng/contracts/2d';
export type DefineLayer2dOptions = Render2dLayerDescriptor;
export type Camera2dOptions = Render2dCameraDescriptor;
export type Sprite2dOptions = Render2dSpriteDescriptor;
export type BuiltinSpriteMaterial2dOptions = Omit<Render2dMaterialDescriptor, 'kind' | 'builtin'>;
export declare function defineLayer2d(options: DefineLayer2dOptions): Render2dLayerDescriptor;
export declare function camera2d(options: Camera2dOptions): Render2dCameraDescriptor;
export declare function sprite2d(options: Sprite2dOptions): Render2dSpriteDescriptor;
export declare function builtinSpriteMaterial2d(options: BuiltinSpriteMaterial2dOptions): Render2dMaterialDescriptor;
