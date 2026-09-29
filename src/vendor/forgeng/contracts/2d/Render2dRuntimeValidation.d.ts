import type { Render2dCapabilityNegotiation, Render2dCapabilityRequest, Render2dCapabilitySupport, Render2dCompositionSnapshot, Render2dExtractionSnapshot, Render2dInspectionSnapshot, Render2dMetricsSnapshot, Render2dQualityRequest, Render2dQualitySnapshot } from './Render2dRuntime';
export declare function validateRender2dCapabilityRequest(value: unknown): Render2dCapabilityRequest;
export declare function validateRender2dCapabilitySupport(value: unknown): Render2dCapabilitySupport;
export declare function negotiateRender2dCapabilities(requestValue: unknown, supportValue: unknown): Render2dCapabilityNegotiation;
export declare function snapshotRender2dQuality(value: Render2dQualityRequest, path?: string): Render2dQualitySnapshot;
export declare function snapshotRender2dComposition(value: Render2dCompositionSnapshot): Render2dCompositionSnapshot;
export declare function snapshotRender2dExtraction(value: Render2dExtractionSnapshot): Render2dExtractionSnapshot;
export declare function snapshotRender2dMetrics(value: Render2dMetricsSnapshot): Render2dMetricsSnapshot;
export declare function snapshotRender2dInspection(value: Render2dInspectionSnapshot): Render2dInspectionSnapshot;
