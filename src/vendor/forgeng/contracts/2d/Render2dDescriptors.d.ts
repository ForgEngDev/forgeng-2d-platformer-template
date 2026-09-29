import type { Transform2dValue } from '../gameplay/OfficialSpatialComponents';
import type { Render2dAssetId, Render2dColor, Render2dEntityId, Render2dExtensions, Render2dId, Render2dInsets, Render2dOrdering, Render2dParentReference, Render2dRange, Render2dRect, Render2dSize, Render2dVec2 } from './Render2dCommon';
export type Render2dBlendMode = 'opaque' | 'alpha' | 'premultiplied-alpha' | 'add' | 'multiply' | 'screen';
export type Render2dTextureFormat = 'rgba8unorm' | 'rgba8unorm-srgb' | 'bgra8unorm' | 'bgra8unorm-srgb' | 'rgba16float';
export type Render2dSamplingFilter = 'nearest' | 'linear';
export type Render2dAddressMode = 'clamp-to-edge' | 'repeat' | 'mirror-repeat';
export interface Render2dLayerDescriptor {
    readonly id: Render2dId;
    readonly order?: Render2dOrdering;
    readonly visible?: boolean;
    readonly opacity?: number;
    readonly extensions?: Render2dExtensions;
}
export interface Render2dCameraDescriptor {
    readonly id: Render2dId;
    readonly order?: number;
    readonly viewport?: Render2dRect;
    readonly virtualSize: Render2dSize;
    readonly scaleMode?: 'stretch' | 'fit' | 'fill' | 'integer-fit' | 'none';
    readonly pixelSnap?: 'off' | 'camera' | 'camera-and-items';
    readonly space?: 'world' | 'screen';
    readonly safeArea?: boolean;
    readonly sampling?: 'asset' | 'nearest' | 'linear';
    readonly position?: Render2dVec2;
    readonly rotation?: number;
    readonly zoom?: number;
    readonly clearColor?: Render2dColor | null;
    readonly layers?: readonly Render2dId[];
    readonly target?: Render2dId;
    readonly extensions?: Render2dExtensions;
}
export interface Render2dSamplerDescriptor {
    readonly id: Render2dId;
    readonly minFilter?: Render2dSamplingFilter;
    readonly magFilter?: Render2dSamplingFilter;
    readonly mipmapFilter?: Render2dSamplingFilter;
    readonly addressU?: Render2dAddressMode;
    readonly addressV?: Render2dAddressMode;
    readonly maxAnisotropy?: number;
    readonly extensions?: Render2dExtensions;
}
export interface Render2dShaderBindingDescriptor {
    readonly name: string;
    readonly kind: 'uniform' | 'texture' | 'sampler' | 'storage-read';
    readonly valueType?: 'f32' | 'vec2f' | 'vec3f' | 'vec4f' | 'mat3x2f' | 'mat4x4f';
    readonly group?: 0;
    readonly binding?: 0 | 1 | 2 | 3 | 4;
    readonly visibility?: 'vertex' | 'fragment' | 'vertex-fragment';
}
export interface Render2dShaderAbiDescriptor {
    readonly version: 1;
    readonly vertexEntry: string;
    readonly fragmentEntry: string;
    readonly bindings?: readonly Render2dShaderBindingDescriptor[];
    readonly attributes?: readonly ('position' | 'uv' | 'color' | 'instance-transform')[];
}
export interface Render2dMaterialDescriptor {
    readonly id: Render2dId;
    readonly kind: 'builtin' | 'custom';
    readonly builtin?: 'sprite' | 'sprite-lit' | 'bitmap-text' | 'msdf-text' | 'particle';
    readonly shaderAsset?: Render2dAssetId;
    readonly shaderAbi?: Render2dShaderAbiDescriptor;
    readonly schema?: Render2dCustomMaterialSchemaV1;
    readonly sampler?: Render2dId;
    readonly blendMode?: Render2dBlendMode;
    readonly depthMode?: 'disabled' | 'read' | 'read-write';
    /** Allows compatibility reordering only inside an equal painter-order group. */
    readonly reorderSafe?: boolean;
    readonly parameters?: Readonly<Record<string, number | Render2dVec2 | Render2dColor>>;
    readonly extensions?: Render2dExtensions;
}
export interface Render2dMaterialUniformFieldV1 {
    readonly name: string;
    readonly type: 'f32' | 'vec2f' | 'vec4f';
    readonly required?: boolean;
    readonly default?: number | Render2dVec2 | Render2dColor;
}
export interface Render2dMaterialTextureFieldV1 {
    readonly name: string;
    readonly source: 'sprite' | 'normal';
    readonly sampleType: 'float';
    readonly required?: boolean;
}
export interface Render2dCustomMaterialSchemaV1 {
    readonly apiVersion: 1;
    readonly uniforms: readonly Render2dMaterialUniformFieldV1[];
    readonly textures: readonly Render2dMaterialTextureFieldV1[];
}
export interface Render2dRenderableDescriptorBase {
    readonly id: Render2dId;
    readonly entity: Render2dEntityId;
    readonly layer: Render2dId;
    readonly transform?: Transform2dValue;
    readonly parent?: Render2dParentReference;
    readonly order?: Render2dOrdering;
    readonly visible?: boolean;
    readonly opacity?: number;
    readonly tint?: Render2dColor;
    readonly mask?: Render2dId;
    readonly target?: Render2dId;
    readonly extensions?: Render2dExtensions;
}
export interface Render2dSpriteDescriptor extends Render2dRenderableDescriptorBase {
    /** Exactly one of texture or sourceTarget is required. */
    readonly texture?: Render2dAssetId;
    /** Samples a completed offscreen target. The target graph must remain acyclic. */
    readonly sourceTarget?: Render2dId;
    /** Standard tangent-space normal map used only by the sprite-lit material. */
    readonly normalTexture?: Render2dAssetId;
    readonly material: Render2dId;
    readonly region?: Render2dRect;
    readonly size?: Render2dSize;
    readonly anchor?: Render2dVec2;
    readonly flipX?: boolean;
    readonly flipY?: boolean;
    readonly nineSlice?: Render2dInsets;
}
export interface Render2dTilemapDescriptor extends Render2dRenderableDescriptorBase {
    readonly tilemap: Render2dAssetId;
    readonly material: Render2dId;
    readonly tileSize: Render2dSize;
    readonly chunkSize?: Render2dSize;
    readonly layerIndices?: readonly number[];
    /** Texture assets ordered exactly like the decoded Tiled tileset catalog. */
    readonly tilesetTextures?: readonly Render2dAssetId[];
    /** Texture assets ordered like depth-first visible Tiled image layers. */
    readonly imageLayerTextures?: readonly Render2dAssetId[];
    readonly streaming?: Render2dTilemapStreamingDescriptor;
}
export interface Render2dTilemapStreamingDescriptor {
    /** Number of chunk rings retained outside the current camera rectangle. */
    readonly preloadMarginChunks?: number;
    /** Cache is trimmed to this value after crossing the high-water mark. */
    readonly lowWaterChunks?: number;
    /** Hard retained-chunk trigger. Must be greater than or equal to lowWaterChunks. */
    readonly highWaterChunks?: number;
    /** Bounds work performed by one cooperative streaming slice. */
    readonly chunksPerSlice?: number;
}
export interface Render2dTextDescriptor extends Render2dRenderableDescriptorBase {
    readonly text: string;
    readonly font: Render2dAssetId;
    /** Ordered, scene-owned fallback chain. No process-global font registry is consulted. */
    readonly fallbackFonts?: readonly Render2dAssetId[];
    readonly material: Render2dId;
    readonly fontSize: number;
    readonly lineHeight?: number;
    readonly maxWidth?: number;
    readonly maxHeight?: number;
    readonly wrap?: 'none' | 'word' | 'character';
    readonly align?: 'start' | 'center' | 'end' | 'justify';
    readonly verticalAlign?: 'top' | 'middle' | 'bottom';
    readonly direction?: 'ltr' | 'rtl' | 'auto';
    readonly shaping?: 'none' | 'basic' | 'advanced-provider';
    readonly letterSpacing?: number;
    readonly wordSpacing?: number;
    readonly tabSize?: number;
    readonly missingGlyph?: 'replace' | 'skip' | 'error';
    readonly replacementCodePoint?: number;
}
export interface Render2dAnimationKeyframeDescriptor {
    readonly time: number;
    readonly value: number | Render2dVec2 | Render2dColor;
    readonly easing?: 'linear' | 'step' | 'ease-in' | 'ease-out' | 'ease-in-out';
}
export interface Render2dAnimationTrackDescriptor {
    readonly target: Render2dId;
    readonly property: 'position' | 'rotation' | 'scale' | 'opacity' | 'tint' | 'frame';
    readonly keyframes: readonly Render2dAnimationKeyframeDescriptor[];
}
export interface Render2dAnimationEventDescriptor {
    readonly time: number;
    readonly name: string;
}
export interface Render2dAnimationDescriptor {
    readonly id: Render2dId;
    /** Optional normalized Animation2dProduct asset and clip used for atlas-frame presentation. */
    readonly asset?: Render2dAssetId;
    readonly clip?: string;
    readonly target?: Render2dId;
    readonly duration: number;
    readonly fixedStepHz?: number;
    readonly loop?: 'none' | 'repeat' | 'ping-pong';
    readonly playbackRate?: number;
    readonly autoplay?: boolean;
    readonly tracks: readonly Render2dAnimationTrackDescriptor[];
    readonly events?: readonly Render2dAnimationEventDescriptor[];
    readonly extensions?: Render2dExtensions;
}
export interface Render2dParticleCurveKeyDescriptor {
    readonly t: number;
    readonly value: number;
}
export interface Render2dParticleCurveDescriptor {
    readonly keys: readonly Render2dParticleCurveKeyDescriptor[];
}
export interface Render2dParticleDescriptor extends Render2dRenderableDescriptorBase {
    readonly texture?: Render2dAssetId;
    readonly material: Render2dId;
    readonly capacity: number;
    readonly emissionRate: number;
    readonly lifetime: Render2dRange;
    readonly speed?: Render2dRange;
    readonly angle?: Render2dRange;
    readonly gravity?: Render2dVec2;
    readonly size?: Render2dRange;
    readonly fixedStepHz?: number;
    readonly seed?: number;
    readonly autoplay?: boolean;
    readonly duration?: number;
    readonly loop?: boolean;
    readonly offscreen?: 'continue' | 'pause-when-hidden';
    readonly maxBurst?: number;
    readonly rotation?: Render2dRange;
    readonly angularVelocity?: Render2dRange;
    readonly sizeCurve?: Render2dParticleCurveDescriptor;
    readonly opacityCurve?: Render2dParticleCurveDescriptor;
    readonly colorStart?: Render2dColor;
    readonly colorEnd?: Render2dColor;
}
export interface Render2dLightDescriptor {
    readonly id: Render2dId;
    readonly entity: Render2dEntityId;
    readonly kind: 'ambient' | 'directional' | 'point';
    readonly transform?: Transform2dValue;
    readonly parent?: Render2dParentReference;
    readonly color: Render2dColor;
    readonly intensity: number;
    readonly enabled?: boolean;
    readonly radius?: number;
    readonly direction?: number;
    readonly layers?: readonly Render2dId[];
    readonly shadow?: Readonly<{
        readonly enabled?: boolean;
        readonly mode?: 'hard';
        readonly maxCasters?: number;
    }>;
    readonly extensions?: Render2dExtensions;
}
export interface Render2dMaskDescriptor {
    readonly id: Render2dId;
    readonly entity: Render2dEntityId;
    readonly kind: 'scissor' | 'sprite' | 'path';
    readonly transform?: Transform2dValue;
    readonly parent?: Render2dParentReference;
    readonly rect?: Render2dRect;
    readonly texture?: Render2dAssetId;
    readonly region?: Render2dRect;
    /** Convex local-space polygon, clockwise or counter-clockwise. */
    readonly points?: readonly Render2dVec2[];
    readonly inverted?: boolean;
    readonly extensions?: Render2dExtensions;
}
export interface Render2dShadowCasterDescriptor {
    readonly id: Render2dId;
    readonly entity: Render2dEntityId;
    readonly kind: 'rect' | 'polygon';
    readonly transform?: Transform2dValue;
    readonly rect?: Render2dRect;
    readonly points?: readonly Render2dVec2[];
    readonly layers?: readonly Render2dId[];
    readonly enabled?: boolean;
    readonly extensions?: Render2dExtensions;
}
export interface Render2dRenderTargetDescriptor {
    readonly id: Render2dId;
    readonly size?: Render2dSize;
    readonly scale?: number;
    readonly format?: Render2dTextureFormat;
    readonly sampleCount?: 1 | 2 | 4 | 8;
    readonly clearColor?: Render2dColor;
    readonly persistent?: boolean;
    readonly extensions?: Render2dExtensions;
}
export interface Render2dFeatureDescriptor {
    readonly id: Render2dId;
    readonly capability: Render2dId;
    readonly required?: boolean;
    readonly order?: Render2dOrdering;
    readonly options?: Readonly<Record<string, import('./Render2dCommon').Render2dJsonValue>>;
    readonly extensions?: Render2dExtensions;
}
export interface Render2dColorAdjustEffectOptions {
    readonly brightness?: number;
    readonly contrast?: number;
    readonly saturation?: number;
}
export interface Render2dEffectDescriptor {
    readonly id: Render2dId;
    readonly kind: 'color-adjust';
    readonly input: Render2dId;
    readonly output: Render2dId | 'surface';
    readonly enabled?: boolean;
    readonly required?: boolean;
    readonly order?: number;
    readonly options?: Render2dColorAdjustEffectOptions;
    readonly extensions?: Render2dExtensions;
}
export interface Render2dDefinition {
    readonly contractVersion: 1;
    readonly id: Render2dId;
    readonly version?: number;
    readonly coordinateSystem?: 'x-right-y-down-clockwise-radians';
    readonly colorSpace?: 'srgb-straight-alpha';
    readonly layers: readonly Render2dLayerDescriptor[];
    readonly cameras?: readonly Render2dCameraDescriptor[];
    readonly samplers?: readonly Render2dSamplerDescriptor[];
    readonly materials?: readonly Render2dMaterialDescriptor[];
    readonly sprites?: readonly Render2dSpriteDescriptor[];
    readonly tilemaps?: readonly Render2dTilemapDescriptor[];
    readonly texts?: readonly Render2dTextDescriptor[];
    readonly animations?: readonly Render2dAnimationDescriptor[];
    readonly particles?: readonly Render2dParticleDescriptor[];
    readonly lights?: readonly Render2dLightDescriptor[];
    readonly masks?: readonly Render2dMaskDescriptor[];
    readonly shadowCasters?: readonly Render2dShadowCasterDescriptor[];
    readonly renderTargets?: readonly Render2dRenderTargetDescriptor[];
    readonly effects?: readonly Render2dEffectDescriptor[];
    readonly features?: readonly Render2dFeatureDescriptor[];
    readonly extensions?: Render2dExtensions;
}
export interface NormalizedRender2dDefinition extends Required<Omit<Render2dDefinition, 'extensions'>> {
    readonly extensions?: Render2dExtensions;
}
