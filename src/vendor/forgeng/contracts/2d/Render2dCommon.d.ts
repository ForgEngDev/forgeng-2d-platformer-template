export declare const RENDER_2D_CONTRACT_VERSION: 1;
export declare const RENDER_2D_SCHEMA_VERSION: '1.0.0';
export declare const RENDER_2D_SHADER_ABI_VERSION: 1;
export declare const RENDER_2D_SNAPSHOT_VERSION: 1;
export type Render2dJsonPrimitive = string | number | boolean | null;
export type Render2dJsonValue = Render2dJsonPrimitive | readonly Render2dJsonValue[] | Render2dJsonObject;
export interface Render2dJsonObject {
    readonly [key: string]: Render2dJsonValue;
}
export type Render2dId = string;
export type Render2dEntityId = string;
export type Render2dAssetId = string;
export type Render2dCapabilityId = string;
export type Render2dGeneration = number;
export type Render2dRevision = number;
export type Render2dLifecyclePhase = 'created' | 'probing' | 'initializing' | 'ready' | 'attaching' | 'attached' | 'extracting' | 'contributing' | 'lost' | 'recovering' | 'failed' | 'detaching' | 'destroying' | 'destroyed';
export type Render2dReasonCode = 'R2D_OK' | 'R2D_OPTIONAL_DISABLED' | 'R2D_CAPABILITY_MISSING' | 'R2D_LIMIT_EXCEEDED' | 'R2D_FORMAT_UNSUPPORTED' | 'R2D_SAMPLE_COUNT_UNSUPPORTED' | 'R2D_SHADER_ABI_UNSUPPORTED' | 'R2D_ASSET_UNAVAILABLE' | 'R2D_STALE_GENERATION' | 'R2D_SURFACE_UNAVAILABLE' | 'R2D_DEVICE_LOST';
export type Render2dContractErrorCode = 'R2D_VALUE_INVALID' | 'R2D_VERSION_UNSUPPORTED' | 'R2D_UNKNOWN_KEY' | 'R2D_ID_INVALID' | 'R2D_ID_DUPLICATE' | 'R2D_REFERENCE_MISSING' | 'R2D_GRAPH_CYCLE' | 'R2D_LIMIT_EXCEEDED' | 'R2D_CAPABILITY_UNSUPPORTED';
export declare class Render2dContractError extends TypeError {
    readonly code: Render2dContractErrorCode;
    readonly path: string;
    constructor(code: Render2dContractErrorCode, path: string, message: string);
}
export interface Render2dExtension {
    readonly version: number;
    readonly value: Render2dJsonValue;
}
export type Render2dExtensions = Readonly<Record<Render2dId, Render2dExtension>>;
export type Render2dVec2 = readonly [number, number];
export type Render2dSize = readonly [number, number];
export type Render2dRange = readonly [number, number];
export type Render2dRect = readonly [number, number, number, number];
export type Render2dInsets = readonly [number, number, number, number];
export type Render2dColor = readonly [number, number, number, number];
export interface Render2dParentReference {
    readonly kind: 'entity';
    readonly id: Render2dEntityId;
}
export interface Render2dItemReference {
    readonly kind: 'item';
    readonly id: Render2dId;
}
export interface Render2dLayerReference {
    readonly kind: 'layer';
    readonly id: Render2dId;
}
export interface Render2dOrdering {
    readonly before?: readonly (Render2dItemReference | Render2dLayerReference)[];
    readonly after?: readonly (Render2dItemReference | Render2dLayerReference)[];
    readonly zIndex?: number;
}
export declare const RENDER_2D_LIMITS: Readonly<{
    readonly idLength: 160;
    readonly extensionCount: 32;
    readonly extensionJsonDepth: 64;
    readonly extensionJsonNodes: 65536;
    readonly extensionJsonKeyLength: 256;
    readonly extensionJsonStringLength: 1048576;
    readonly layers: 256;
    readonly cameras: 64;
    readonly samplers: 256;
    readonly materials: 1024;
    readonly sprites: 100000;
    readonly tilemaps: 512;
    readonly tilemapDependencies: 512;
    readonly tilemapPatches: 65536;
    readonly tilemapChunkDimension: 1024;
    readonly tilemapRetainedChunks: 4096;
    readonly texts: 10000;
    readonly animations: 10000;
    readonly particles: 1024;
    readonly lights: 4096;
    readonly masks: 4096;
    readonly renderTargets: 128;
    readonly features: 128;
    readonly animationTracks: 256;
    readonly animationKeyframes: 16384;
    readonly animationEvents: 4096;
    readonly animationEventQueue: 16384;
    readonly animationAdvanceTicks: 10000;
    readonly textLength: 65536;
    readonly textGlyphs: 65536;
    readonly textFallbackFonts: 16;
    readonly textCacheRuns: 2048;
    readonly particleCapacity: 1000000;
    readonly particleSceneCapacity: 1000000;
    readonly particleBurst: 65536;
    readonly particleCurveKeys: 64;
    readonly particleAdvanceWork: 10000000;
    readonly visibleLightsPerCamera: 64;
    readonly shadowCasters: 4096;
    readonly shadowSegmentsPerCamera: 8192;
    readonly pathMaskPoints: 256;
    readonly effects: 32;
    readonly effectPasses: 64;
    readonly textureDimension2d: 16384;
    readonly textureArrayLayers: 2048;
    readonly metricsCounters: 64;
    readonly inspectionItems: 2048;
}>;
