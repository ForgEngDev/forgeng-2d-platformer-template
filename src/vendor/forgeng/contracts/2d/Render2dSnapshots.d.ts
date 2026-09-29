import type { Render2dLifecyclePhase, Render2dRect } from './Render2dCommon';
export declare const RENDER_2D_INSPECTION_API_VERSION: 1;
export declare const RENDER_2D_EDITOR_EXPORT_VERSION: 1;
export declare const RENDER_2D_INSPECTION_SCHEMA_VERSION: '1.0.0';
export type Render2dInspectionProfile = 'off' | 'production-lite' | 'diagnostic' | 'lab';
export type Render2dBatchSplitReason = 'initial' | 'pipeline' | 'texture' | 'sampler' | 'material' | 'target' | 'scissor' | 'mask' | 'geometry' | 'chunk' | 'text-run' | 'particle-run';
export interface Render2dInspectionLimits {
    readonly history: number;
    readonly cameras: number;
    readonly layers: number;
    readonly targets: number;
    readonly features: number;
    readonly assets: number;
    readonly failures: number;
    readonly selections: number;
    readonly overheadBudgetMicros: number;
}
export declare const RENDER_2D_INSPECTION_PROFILE_LIMITS: Readonly<Record<Render2dInspectionProfile, Render2dInspectionLimits>>;
export interface Render2dInspectionOptions {
    readonly profile?: Render2dInspectionProfile;
    readonly maximumHistory?: number;
    readonly maximumSelections?: number;
}
export interface Render2dTruncationSnapshot {
    readonly section: 'history' | 'cameras' | 'layers' | 'targets' | 'features' | 'assets' | 'failures' | 'selections';
    readonly total: number;
    readonly retained: number;
    readonly dropped: number;
    readonly overflowed: boolean;
}
export interface Render2dSamplingInspectionSnapshot {
    readonly mode: 'disabled' | 'every-frame';
    readonly observedFrames: number;
    readonly retainedFrames: number;
    readonly droppedFrames: number;
}
export interface Render2dCameraInspectionSnapshot {
    readonly id: string;
    readonly order: number;
    readonly space: 'world' | 'screen';
    readonly targetId: string;
    readonly logicalViewport: Render2dRect;
    readonly physicalViewport: Render2dRect;
    readonly pixelSnap: 'off' | 'camera' | 'camera-and-items';
    readonly visibleItems: number;
    readonly batches: number;
    readonly draws: number;
}
export interface Render2dLayerInspectionSnapshot {
    readonly id: string;
    readonly order: number;
    readonly visibleItems: number;
    readonly batches: number;
}
export interface Render2dTargetInspectionSnapshot {
    readonly id: string;
    readonly width: number;
    readonly height: number;
    readonly format: string;
    readonly sampleCount: number;
    readonly trackedBytes: number;
}
export interface Render2dFeatureInspectionSnapshot {
    readonly id: string;
    readonly enabled: boolean;
    readonly status: 'active' | 'fallback' | 'disabled' | 'unsupported';
    readonly resources: number;
}
export interface Render2dAssetInspectionSnapshot {
    readonly id: string;
    readonly state: 'retained' | 'fallback';
}
export interface Render2dFailureInspectionSnapshot {
    readonly code: string;
    readonly path: string;
    readonly count: number;
    readonly lastFrame: number;
}
export interface Render2dResourceOwnershipSnapshot {
    readonly owner: 'engine-scene' | 'render-domain';
    readonly sceneId: string | null;
    readonly domainId: string;
    readonly cpuBytes: number;
    readonly gpuBufferBytes: number;
    readonly gpuTextureBytes: number;
    readonly trackedBytes: number;
    readonly buffers: number;
    readonly textures: number;
    readonly pipelines: number;
    readonly leases: number;
    readonly handles: number;
    readonly pendingRetirements: number;
}
export interface Render2dTimingInspectionSnapshot {
    readonly extractionMicros: number | null;
    readonly planningMicros: number | null;
    readonly encodingMicros: number | null;
    readonly contributionMicros: number | null;
    readonly gpuMicros: number | null;
    readonly gpuTiming: 'available' | 'disabled' | 'unsupported';
}
export interface Render2dBatchInspectionSnapshot {
    readonly logicalBatches: number;
    readonly drawCalls: number;
    readonly pipelineChanges: number;
    readonly bindGroupChanges: number;
    readonly splitReasons: Readonly<Record<Render2dBatchSplitReason, number>>;
}
export interface Render2dWorkloadInspectionSnapshot {
    readonly items: Readonly<{
        visible: number;
        culled: number;
        submitted: number;
    }>;
    readonly uploads: Readonly<{
        operations: number;
        reuses: number;
        dirtyBytes: number;
    }>;
    readonly caches: Readonly<{
        textLayoutBuilds: number;
        textLayoutHits: number;
        textLayoutEvictions: number;
    }>;
    readonly pools: Readonly<{
        instanceCapacity: number;
        instanceGrowths: number;
        instanceWraps: number;
        tileChunkBuffers: number;
        glyphRunBuffers: number;
        particleRunBuffers: number;
    }>;
    readonly content: Readonly<{
        tiles: number;
        visibleTileChunks: number;
        retainedTileChunks: number;
        texts: number;
        glyphs: number;
        retainedGlyphRuns: number;
        particles: number;
        particleEmitters: number;
        retainedParticleRuns: number;
        visibleLights: number;
        shadowSegments: number;
        effectPasses: number;
    }>;
}
export interface Render2dDomainInspectionSnapshotV1 {
    readonly snapshotVersion: 1;
    readonly profile: Render2dInspectionProfile;
    readonly domainId: string;
    readonly phase: Render2dLifecyclePhase;
    readonly backendGeneration: number;
    readonly sceneId: string | null;
    readonly sceneGeneration: number;
    readonly frame: number;
    readonly capabilities: readonly string[];
    readonly cameras: readonly Render2dCameraInspectionSnapshot[];
    readonly layers: readonly Render2dLayerInspectionSnapshot[];
    readonly targets: readonly Render2dTargetInspectionSnapshot[];
    readonly features: readonly Render2dFeatureInspectionSnapshot[];
    readonly sampling: Render2dSamplingInspectionSnapshot;
    readonly batches: Render2dBatchInspectionSnapshot;
    readonly workload: Render2dWorkloadInspectionSnapshot;
    readonly assets: readonly Render2dAssetInspectionSnapshot[];
    readonly resources: Render2dResourceOwnershipSnapshot;
    readonly timings: Render2dTimingInspectionSnapshot;
    readonly failures: readonly Render2dFailureInspectionSnapshot[];
    readonly truncation: readonly Render2dTruncationSnapshot[];
    readonly destroyed: boolean;
}
export interface Render2dSelectionReferenceV1 {
    readonly referenceVersion: 1;
    readonly sceneId: string;
    readonly sceneGeneration: number;
    readonly kind: 'entity' | 'item';
    readonly id: string;
}
export interface Render2dSelectionSnapshotV1 {
    readonly snapshotVersion: 1;
    readonly reference: Render2dSelectionReferenceV1;
    readonly itemIds: readonly string[];
    readonly entityId: string;
    readonly kind: string;
    readonly layerId: string | null;
}
export interface Render2dInspectionOverheadSnapshot {
    readonly samples: number;
    readonly lastMicros: number;
    readonly totalMicros: number;
    readonly maximumMicros: number;
    readonly budgetMicros: number;
    readonly withinBudget: boolean;
}
export interface Render2dInspectionSnapshotV2 {
    readonly snapshotVersion: 2;
    readonly apiVersion: typeof RENDER_2D_INSPECTION_API_VERSION;
    readonly schemaVersion: typeof RENDER_2D_INSPECTION_SCHEMA_VERSION;
    readonly profile: Render2dInspectionProfile;
    readonly composition: Readonly<{
        id: string;
        state: string;
        frame: number;
        presentations: number;
    }>;
    readonly engine: Readonly<{
        definitions: number;
        attachments: number;
        entities: number;
        retainedBuffers: number;
    }>;
    readonly scene: Readonly<{
        id: string;
        sceneGeneration: number;
        domainGeneration: number;
    }> | null;
    readonly domain: Render2dDomainInspectionSnapshotV1 | null;
    readonly resourceOwners: readonly Render2dResourceOwnershipSnapshot[];
    readonly selection: Render2dSelectionSnapshotV1 | null;
    readonly overhead: Render2dInspectionOverheadSnapshot;
    readonly destroyed: boolean;
}
export interface Render2dEditorExportSnapshotV1 {
    readonly exportVersion: typeof RENDER_2D_EDITOR_EXPORT_VERSION;
    readonly schemaVersion: typeof RENDER_2D_INSPECTION_SCHEMA_VERSION;
    readonly minimumReaderVersion: 1;
    readonly migrations: readonly string[];
    readonly definition: unknown | null;
    readonly inspection: Render2dInspectionSnapshotV2;
}
export interface Render2dInspectorV2 {
    readonly profile: Render2dInspectionProfile;
    inspect(selection?: Render2dSelectionReferenceV1): Render2dInspectionSnapshotV2;
    resolve(selection: Render2dSelectionReferenceV1): Render2dSelectionSnapshotV1 | null;
    exportScene(selection?: Render2dSelectionReferenceV1): Render2dEditorExportSnapshotV1;
}
