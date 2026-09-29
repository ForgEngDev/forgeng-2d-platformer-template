import { type Render2dColor, type Render2dContractErrorCode, type Render2dExtensions, type Render2dJsonValue, type Render2dOrdering, type Render2dRect, type Render2dSize, type Render2dVec2 } from './Render2dCommon';
import type { Render2dTextureFormat } from './Render2dDescriptors';
export declare const LOCAL: RegExp;
export declare const FORMATS: readonly Render2dTextureFormat[];
export declare const SAMPLE_COUNTS: readonly [1, 2, 4, 8];
export declare const BASE_KEYS: string[];
export declare function fail(code: Render2dContractErrorCode, path: string, message: string): never;
export declare function record(value: unknown, path: string, keys?: readonly string[]): Record<string, unknown>;
export declare function text(value: unknown, path: string, max?: number): string;
export declare function id(value: unknown, path: string): string;
export declare function finite(value: unknown, path: string, minimum?: number, maximum?: number): number;
export declare function integer(value: unknown, path: string, minimum?: number, maximum?: number): number;
export declare function bool(value: unknown, path: string): boolean;
export declare function enumeration<T extends string>(value: unknown, path: string, values: readonly T[]): T;
export declare function tuple(value: unknown, path: string, length: number, minimum?: number, maximum?: number): readonly number[];
export declare function vec2(value: unknown, path: string): Render2dVec2;
export declare function size(value: unknown, path: string): Render2dSize;
export declare function rect(value: unknown, path: string): Render2dRect;
export declare function color(value: unknown, path: string): Render2dColor;
export declare function range(value: unknown, path: string, minimum?: number): readonly [number, number];
export declare function json(value: unknown, path: string): Render2dJsonValue;
export declare function optionalExtensions(input: Record<string, unknown>, path: string): {
    readonly extensions?: Render2dExtensions;
};
export declare function transform(value: unknown, path: string): Readonly<{
    position: Render2dVec2;
    rotation: number;
    scale: Render2dVec2;
}>;
export declare function reference(value: unknown, path: string, kinds: readonly ('entity' | 'item' | 'layer')[]): Readonly<{
    kind: "entity" | "item" | "layer";
    id: string;
}>;
export declare function ordering(value: unknown, path: string): Render2dOrdering;
export declare function array<T>(value: unknown, path: string, limit: number, normalize: (item: unknown, itemPath: string) => T): readonly T[];
export declare function ids(value: unknown, path: string): readonly string[];
export declare function base(input: Record<string, unknown>, path: string): {
    extensions?: Render2dExtensions;
    id: string;
    entity: string;
    layer: string;
    transform?: Readonly<{
        position: Render2dVec2;
        rotation: number;
        scale: Render2dVec2;
    }> | undefined;
    parent?: {
        readonly kind: 'entity';
        readonly id: string;
    } | undefined;
    order?: Render2dOrdering | undefined;
    visible: boolean;
    opacity: number;
    tint: Render2dColor;
    mask?: string | undefined;
    target?: string | undefined;
};
