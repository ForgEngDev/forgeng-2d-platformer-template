import type { Render2dAssetId, Render2dId } from './Render2dCommon';
export interface Render2dShapingGlyphMetricV1 {
    readonly codePoint: number;
    readonly glyphId: number;
    readonly advance: number;
}
export interface Render2dShapingFontV1 {
    readonly id: Render2dAssetId;
    readonly unitsPerEm: number;
    readonly glyphs: readonly Render2dShapingGlyphMetricV1[];
}
/** One normalized paragraph. Newline and layout policy remain renderer-owned. */
export interface Render2dTextShapingRequestV1 {
    readonly shapingVersion: 1;
    readonly textId: Render2dId;
    readonly text: string;
    readonly direction: 'ltr';
    readonly fonts: readonly Render2dShapingFontV1[];
    readonly missingGlyph: 'replace' | 'skip' | 'error';
    readonly replacementCodePoint: number;
}
export interface Render2dShapedGlyphV1 {
    readonly cluster: number;
    readonly codePoint: number;
    readonly fontId: Render2dAssetId;
    readonly glyphId: number;
    readonly advance: number;
    readonly offsetX: number;
    readonly offsetY: number;
}
export interface Render2dTextShapingResultV1 {
    readonly shapingVersion: 1;
    readonly direction: 'ltr';
    readonly glyphs: readonly Render2dShapedGlyphV1[];
}
export interface Render2dTextShapingProviderV1 {
    readonly apiVersion: 1;
    readonly id: string;
    readonly capabilities: Readonly<{
        scripts: readonly string[];
        bidirectional: boolean;
        ligatures: boolean;
        combiningMarks: boolean;
    }>;
    shape(request: Render2dTextShapingRequestV1): Render2dTextShapingResultV1;
    destroy?(): void;
}
