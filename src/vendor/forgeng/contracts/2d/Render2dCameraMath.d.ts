import type { Render2dCameraDescriptor } from './Render2dDescriptors';
import type { Render2dColor, Render2dId, Render2dInsets, Render2dRect } from './Render2dCommon';
export type Render2dMatrix3x2 = readonly [number, number, number, number, number, number];
export interface Render2dCameraSurface {
    readonly revision: number;
    readonly logicalSize: readonly [number, number];
    readonly physicalSize: readonly [number, number];
    readonly pixelRatio: number;
    readonly maximumPixelRatio: number;
    readonly safeArea: Render2dInsets;
    readonly visible: boolean;
}
export interface Render2dCameraSurfaceInput {
    readonly revision?: number;
    readonly logicalSize?: readonly [number, number];
    readonly physicalSize?: readonly [number, number];
    readonly pixelRatio?: number;
    readonly maximumPixelRatio?: number;
    readonly safeArea?: Render2dInsets;
    readonly visible?: boolean;
}
export interface ResolvedRender2dCamera {
    readonly id: Render2dId;
    readonly order: number;
    readonly space: 'world' | 'screen';
    readonly scaleMode: 'stretch' | 'fit' | 'fill' | 'integer-fit' | 'none';
    readonly pixelSnap: 'off' | 'camera' | 'camera-and-items';
    readonly sampling: 'asset' | 'nearest' | 'linear';
    readonly logicalViewport: Render2dRect;
    readonly physicalViewport: Render2dRect;
    readonly logicalContentRect: Render2dRect;
    readonly physicalContentRect: Render2dRect;
    readonly letterbox: Render2dInsets;
    readonly crop: Render2dInsets;
    readonly virtualSize: readonly [number, number];
    readonly scale: readonly [number, number];
    readonly position: readonly [number, number];
    readonly effectivePosition: readonly [number, number];
    readonly rotation: number;
    readonly zoom: number;
    readonly layers: readonly Render2dId[];
    readonly targetId: Render2dId | 'surface';
    readonly clearColor: Render2dColor | null;
    readonly physicalRatio: readonly [number, number];
    readonly worldToLogical: Render2dMatrix3x2;
    readonly logicalToWorld: Render2dMatrix3x2;
}
export declare function normalizeRender2dCameraSurface(value?: Render2dCameraSurfaceInput): Render2dCameraSurface;
export declare function transformRender2dPoint(matrix: Render2dMatrix3x2, point: readonly [number, number]): readonly [number, number];
export declare function resolveRender2dCamera(descriptor: Render2dCameraDescriptor, surface: Render2dCameraSurface): ResolvedRender2dCamera;
export declare function render2dWorldToLogical(camera: ResolvedRender2dCamera, point: readonly [number, number]): readonly [number, number];
export declare function render2dLogicalToWorld(camera: ResolvedRender2dCamera, point: readonly [number, number]): readonly [number, number];
export declare function render2dWorldToPhysical(camera: ResolvedRender2dCamera, point: readonly [number, number]): readonly [number, number];
export declare function render2dPhysicalToWorld(camera: ResolvedRender2dCamera, point: readonly [number, number]): readonly [number, number];
/** Pixel-snaps only final screen-space translation; size, zoom, and rotation remain untouched. */
export declare function snapRender2dItemBounds(camera: ResolvedRender2dCamera, bounds: Render2dRect): Render2dRect;
