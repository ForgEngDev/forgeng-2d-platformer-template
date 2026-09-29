import type { Render2dCameraDescriptor, Render2dFeatureDescriptor, Render2dLayerDescriptor, Render2dMaterialDescriptor, Render2dRenderTargetDescriptor, Render2dSamplerDescriptor } from './Render2dDescriptors';
export declare function normalizeRender2dLayer(value: unknown, path: string): Render2dLayerDescriptor;
export declare function normalizeRender2dCamera(value: unknown, path: string): Render2dCameraDescriptor;
export declare function normalizeRender2dSampler(value: unknown, path: string): Render2dSamplerDescriptor;
export declare function normalizeRender2dMaterial(value: unknown, path: string): Render2dMaterialDescriptor;
export declare function normalizeRender2dTarget(value: unknown, path: string): Render2dRenderTargetDescriptor;
export declare function normalizeRender2dFeature(value: unknown, path: string): Render2dFeatureDescriptor;
