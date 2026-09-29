import type { Render2dAssetId, Render2dCapabilityId, Render2dColor, Render2dExtensions, Render2dGeneration, Render2dId, Render2dJsonValue, Render2dLifecyclePhase, Render2dReasonCode, Render2dRect, Render2dRevision } from './Render2dCommon';
import type { NormalizedRender2dDefinition, Render2dSpriteDescriptor, Render2dTextureFormat } from './Render2dDescriptors';
import type { Render2dMatrix3x2, ResolvedRender2dCamera } from './Render2dCameraMath';
export interface Render2dCapabilityRequest {
    readonly textureFormats?: readonly Render2dTextureFormat[];
    readonly maxTextureDimension2d?: number;
    readonly maxTextureArrayLayers?: number;
    readonly sampleCounts?: readonly (1 | 2 | 4 | 8)[];
    readonly timestampQueries?: boolean;
    readonly storageBuffers?: boolean;
    readonly textureArrays?: boolean;
    readonly masks?: boolean;
    readonly lighting?: boolean;
    readonly effects?: readonly Render2dCapabilityId[];
    readonly extensions?: Render2dExtensions;
}
export interface Render2dCapabilitySupport extends Required<Omit<Render2dCapabilityRequest, 'extensions'>> {
    readonly extensions?: Render2dExtensions;
}
export interface Render2dCapabilityRejection {
    readonly code: Extract<Render2dReasonCode, 'R2D_CAPABILITY_MISSING' | 'R2D_LIMIT_EXCEEDED' | 'R2D_FORMAT_UNSUPPORTED' | 'R2D_SAMPLE_COUNT_UNSUPPORTED'>;
    readonly path: string;
    readonly requested: Render2dJsonValue;
    readonly available: Render2dJsonValue;
}
export interface Render2dQualityRequest {
    readonly resolutionScale?: number;
    readonly sampleCount?: 1 | 2 | 4 | 8;
    readonly textureFilter?: 'nearest' | 'linear';
    readonly lighting?: boolean;
    readonly masks?: boolean;
    readonly effects?: readonly Render2dCapabilityId[];
}
export interface Render2dQualitySnapshot extends Required<Render2dQualityRequest> {
    readonly snapshotVersion: 1;
}
export interface Render2dCompositionSnapshot {
    readonly snapshotVersion: 1;
    readonly revision: Render2dRevision;
    readonly definitionId: Render2dId;
    readonly generation: Render2dGeneration;
    readonly phase: Render2dLifecyclePhase;
    readonly requested: Render2dQualitySnapshot;
    readonly effective: Render2dQualitySnapshot;
    readonly committed: Render2dQualitySnapshot | null;
    readonly rejections: readonly Render2dCapabilityRejection[];
}
export interface Render2dCapabilityNegotiation {
    readonly compatible: boolean;
    readonly requested: Render2dCapabilityRequest;
    readonly effective: Render2dCapabilitySupport;
    readonly rejections: readonly Render2dCapabilityRejection[];
}
export interface Render2dSceneAttachmentRequest {
    readonly attachmentVersion: 1;
    readonly sceneId: string;
    readonly sceneGeneration: Render2dGeneration;
    readonly definition: NormalizedRender2dDefinition;
    readonly quality?: Render2dQualityRequest;
}
export interface Render2dExtractionItem {
    readonly id: Render2dId;
    readonly kind: 'sprite' | 'tilemap' | 'text' | 'particle' | 'light' | 'mask';
    readonly entity: string;
    readonly layer: Render2dId;
    readonly order: number;
    readonly bounds: Render2dRect;
    readonly opacity: number;
    readonly tint: Render2dColor;
    readonly assetIds: readonly Render2dAssetId[];
    /** Optional interpolated local-to-world affine transform. */
    readonly transform?: Render2dMatrix3x2;
    readonly materialId?: Render2dId;
    readonly targetId?: Render2dId;
    readonly maskId?: Render2dId | null;
}
export interface Render2dExtractionSnapshot {
    readonly snapshotVersion: 1;
    readonly sceneId: string;
    readonly sceneGeneration: Render2dGeneration;
    readonly frame: number;
    readonly simulationTick: number;
    readonly alpha: number;
    readonly cameraIds: readonly Render2dId[];
    readonly items: readonly Render2dExtractionItem[];
}
export interface Render2dSceneAttachment {
    readonly sceneId: string;
    readonly sceneGeneration: Render2dGeneration;
    extract(frame: number, simulationTick: number, alpha: number): Render2dExtractionSnapshot;
    getSpriteDescriptor?(spriteId: Render2dId): Render2dSpriteDescriptor | undefined;
    getCameraSnapshot?(cameraId: Render2dId): ResolvedRender2dCamera | undefined;
    getTilemapPatches?(tilemapId: Render2dId): Render2dTilemapPatchSnapshot;
    getTextContent?(textId: Render2dId): Render2dTextContentSnapshot;
    commandAnimation?(request: Render2dAnimationCommandRequest): Render2dAnimationStateSnapshot;
    getAnimationState?(animationId: Render2dId): Render2dAnimationStateSnapshot;
    drainAnimationEvents?(): readonly Render2dAnimationEventSnapshot[];
    getAnimatedFrame?(targetId: Render2dId): number | null;
    commandParticleEmitter?(request: Render2dParticleCommandRequest): Render2dParticleEmitterSnapshot;
    getParticleSimulation?(): Render2dParticleSimulationSnapshot;
    snapshot(): Render2dCompositionSnapshot;
    destroy(): void | Promise<void>;
}
export type Render2dAnimationCommand = 'play' | 'pause' | 'stop' | 'seek' | 'set-speed' | 'set-direction' | 'transition';
export interface Render2dAnimationCommandRequest {
    readonly commandVersion: 1;
    readonly animationId: Render2dId;
    readonly expectedRevision: Render2dRevision;
    readonly command: Render2dAnimationCommand;
    readonly time?: number;
    readonly speed?: number;
    readonly direction?: 1 | -1;
    readonly toAnimationId?: Render2dId;
    readonly transitionTicks?: number;
}
export interface Render2dAnimationStateSnapshot {
    readonly snapshotVersion: 1;
    readonly animationId: Render2dId;
    readonly revision: Render2dRevision;
    readonly status: 'playing' | 'paused' | 'stopped';
    readonly active: boolean;
    readonly time: number;
    readonly speed: number;
    readonly direction: 1 | -1;
    readonly iteration: number;
    readonly frame: number | null;
    readonly transition: Readonly<{
        readonly toAnimationId: Render2dId;
        readonly startedTick: number;
        readonly durationTicks: number;
        readonly progress: number;
    }> | null;
}
export interface Render2dAnimationEventSnapshot {
    readonly snapshotVersion: 1;
    readonly sequence: number;
    readonly tick: number;
    readonly animationId: Render2dId;
    readonly name: string;
    readonly time: number;
    readonly direction: 1 | -1;
}
export type Render2dParticleCommand = 'play' | 'pause' | 'stop' | 'burst' | 'set-time-scale';
export interface Render2dParticleCommandRequest {
    readonly commandVersion: 1;
    readonly emitterId: Render2dId;
    readonly expectedRevision: Render2dRevision;
    readonly command: Render2dParticleCommand;
    readonly count?: number;
    readonly timeScale?: number;
}
export interface Render2dParticleEmitterSnapshot {
    readonly snapshotVersion: 1;
    readonly emitterId: Render2dId;
    readonly revision: Render2dRevision;
    readonly status: 'playing' | 'paused' | 'stopped';
    readonly timeScale: number;
    readonly elapsedTicks: number;
    readonly emissionAccumulator: number;
    readonly randomState: number;
    readonly activeParticles: number;
}
export interface Render2dParticleInstanceSnapshot {
    readonly id: number;
    readonly emitterId: Render2dId;
    readonly previousPosition: readonly [number, number];
    readonly position: readonly [number, number];
    readonly velocity: readonly [number, number];
    readonly age: number;
    readonly lifetime: number;
    readonly size: number;
    readonly baseSize: number;
    readonly rotation: number;
    readonly angularVelocity: number;
    readonly color: Render2dColor;
}
export interface Render2dParticleSimulationSnapshot {
    readonly snapshotVersion: 1;
    readonly simulationTick: number;
    readonly emitters: readonly Render2dParticleEmitterSnapshot[];
    readonly particles: readonly Render2dParticleInstanceSnapshot[];
}
export interface Render2dTextUpdateRequest {
    readonly updateVersion: 1;
    readonly textId: Render2dId;
    readonly expectedRevision: Render2dRevision;
    readonly text: string;
}
export interface Render2dTextContentSnapshot {
    readonly snapshotVersion: 1;
    readonly textId: Render2dId;
    readonly revision: Render2dRevision;
    readonly text: string;
}
export interface Render2dTilePatch {
    readonly layerId: number;
    readonly x: number;
    readonly y: number;
    /** Raw unsigned Tiled GID, including supported transform bits. Zero clears the tile. */
    readonly gid: number;
}
export interface Render2dTilemapPatchRequest {
    readonly patchVersion: 1;
    readonly tilemapId: Render2dId;
    readonly expectedRevision: Render2dRevision;
    readonly patches: readonly Render2dTilePatch[];
}
export interface Render2dTilemapPatchSnapshot {
    readonly snapshotVersion: 1;
    readonly tilemapId: Render2dId;
    readonly revision: Render2dRevision;
    /** Complete immutable override set, sorted by layer, y, then x. */
    readonly patches: readonly Render2dTilePatch[];
}
export interface Render2dAssetRealization<TValue = unknown> {
    readonly kind: 'render-2d-asset';
    readonly assetId: Render2dAssetId;
    readonly assetGeneration: Render2dGeneration;
    readonly domainGeneration: Render2dGeneration;
    readonly value: TValue;
}
export interface Render2dMetricsSnapshot {
    readonly snapshotVersion: 1;
    readonly frame: number;
    readonly visibleItems: number;
    readonly culledItems: number;
    readonly drawItems: number;
    readonly logicalBatches: number;
    readonly textureBindings: number;
    readonly triangles: number;
    readonly extractionMicros: number | null;
    readonly contributionMicros: number | null;
    readonly counters: Readonly<Record<string, number>>;
}
export interface Render2dInspectionSnapshot {
    readonly snapshotVersion: 1;
    readonly phase: Render2dLifecyclePhase;
    readonly generation: Render2dGeneration;
    readonly definitionId: Render2dId | null;
    readonly sceneId: string | null;
    readonly activeCameraIds: readonly Render2dId[];
    readonly activeLayerIds: readonly Render2dId[];
    readonly retainedAssetIds: readonly Render2dAssetId[];
    readonly lastReason: Render2dReasonCode;
    readonly metrics: Render2dMetricsSnapshot;
}
export interface Render2dInspector {
    inspect2d(): Render2dInspectionSnapshot;
}
