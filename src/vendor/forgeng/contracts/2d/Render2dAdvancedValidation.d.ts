import type { NormalizedRender2dDefinition, Render2dEffectDescriptor, Render2dFeatureDescriptor, Render2dShadowCasterDescriptor } from './Render2dDescriptors';
export declare function normalizeRender2dShadowCaster(value: unknown, path: string): Render2dShadowCasterDescriptor;
export declare function normalizeRender2dEffect(value: unknown, path: string): Render2dEffectDescriptor;
export declare function normalizeRender2dAdvancedFeatureOptions(feature: Render2dFeatureDescriptor, path: string): Render2dFeatureDescriptor;
export declare function assertRender2dAdvancedGraph(definition: NormalizedRender2dDefinition): void;
export declare const RENDER_2D_ADVANCED_FEATURES: readonly ("forgeng.render2d:effects-v1" | "forgeng.render2d:lighting-v1" | "forgeng.render2d:path-masks-v1")[];
