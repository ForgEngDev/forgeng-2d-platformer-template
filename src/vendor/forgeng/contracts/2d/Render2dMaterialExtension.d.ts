import type { Render2dBlendMode, Render2dCustomMaterialSchemaV1, Render2dMaterialDescriptor } from './Render2dDescriptors';
import type { Render2dColor, Render2dVec2 } from './Render2dCommon';
export declare const RENDER_2D_CUSTOM_MATERIAL_API_VERSION: 1;
export declare const RENDER_2D_SPRITE_SHADER_ABI_V1: Readonly<{
    version: 1;
    vertexEntry: "vs_sprite";
    fragmentEntry: "fs_sprite";
    uniformBytes: 64;
    customUniformBytes: 48;
    bindings: readonly (Readonly<{
        name: "camera";
        kind: 'uniform';
        group: 0;
        binding: 0;
        visibility: 'vertex';
    }> | Readonly<{
        name: "instances";
        kind: 'storage-read';
        group: 0;
        binding: 1;
        visibility: 'vertex';
    }> | Readonly<{
        name: "spriteTexture";
        kind: 'texture';
        group: 0;
        binding: 2;
        visibility: 'fragment';
    }> | Readonly<{
        name: "spriteSampler";
        kind: 'sampler';
        group: 0;
        binding: 3;
        visibility: 'fragment';
    }> | Readonly<{
        name: "material";
        kind: 'uniform';
        valueType: 'vec4f';
        group: 0;
        binding: 4;
        visibility: 'vertex-fragment';
    }>)[];
    attributes: readonly ["position", "uv", "color", "instance-transform"];
}>;
export interface DefineCustomSpriteMaterial2dV1Options {
    readonly id: string;
    readonly shaderAsset: string;
    readonly schema: Render2dCustomMaterialSchemaV1;
    readonly parameters?: Readonly<Record<string, number | Render2dVec2 | Render2dColor>>;
    readonly sampler?: string;
    readonly blendMode?: Render2dBlendMode;
    readonly depthMode?: Render2dMaterialDescriptor['depthMode'];
    readonly reorderSafe?: boolean;
}
export declare function defineCustomSpriteMaterial2dV1(options: DefineCustomSpriteMaterial2dV1Options): Render2dMaterialDescriptor;
