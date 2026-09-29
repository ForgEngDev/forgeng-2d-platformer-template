import type { Render2dFeatureDescriptor, Render2dRenderTargetDescriptor, Render2dTextureFormat } from './Render2dDescriptors';
import type { Render2dJsonValue, Render2dSize } from './Render2dCommon';
export declare const RENDER_2D_LIGHTING_FEATURE: 'forgeng.render2d:lighting-v1';
export declare const RENDER_2D_EFFECTS_FEATURE: 'forgeng.render2d:effects-v1';
export declare const RENDER_2D_PATH_MASKS_FEATURE: 'forgeng.render2d:path-masks-v1';
export interface Render2dLightingFeatureOptions {
    readonly maxLightsPerCamera?: number;
    readonly shadows?: 'off' | 'hard';
    readonly maxShadowSegmentsPerCamera?: number;
}
export interface Render2dLightingFeatureDescriptor extends Render2dFeatureDescriptor {
    readonly capability: typeof RENDER_2D_LIGHTING_FEATURE;
    readonly options?: Readonly<Record<string, Render2dJsonValue>> & Render2dLightingFeatureOptions;
}
export interface Render2dEffectsFeatureDescriptor extends Render2dFeatureDescriptor {
    readonly capability: typeof RENDER_2D_EFFECTS_FEATURE;
}
export interface Render2dPathMasksFeatureDescriptor extends Render2dFeatureDescriptor {
    readonly capability: typeof RENDER_2D_PATH_MASKS_FEATURE;
}
export interface Render2dPingPongOptions {
    readonly id: string;
    readonly size?: Render2dSize;
    readonly scale?: number;
    readonly format?: Render2dTextureFormat;
}
export interface Render2dPingPongPair {
    readonly targets: readonly [Render2dRenderTargetDescriptor, Render2dRenderTargetDescriptor];
    read(frame: number): string;
    write(frame: number): string;
}
/** Creates two persistent targets whose frame-parity roles never alias. */
export declare function createRender2dPingPongPair(options: Render2dPingPongOptions): Render2dPingPongPair;
