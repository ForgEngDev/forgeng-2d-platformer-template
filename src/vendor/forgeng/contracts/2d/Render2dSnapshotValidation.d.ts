import { type Render2dEditorExportSnapshotV1, type Render2dInspectionLimits, type Render2dInspectionOptions, type Render2dInspectionProfile, type Render2dInspectionSnapshotV2 } from './Render2dSnapshots';
export interface NormalizedRender2dInspectionOptions {
    readonly profile: Render2dInspectionProfile;
    readonly limits: Render2dInspectionLimits;
}
export declare function normalizeRender2dInspectionOptions(value?: Render2dInspectionOptions): NormalizedRender2dInspectionOptions;
export declare function snapshotRender2dInspectionV2(value: Render2dInspectionSnapshotV2): Render2dInspectionSnapshotV2;
export declare function snapshotRender2dEditorExportV1(value: Render2dEditorExportSnapshotV1): Render2dEditorExportSnapshotV1;
