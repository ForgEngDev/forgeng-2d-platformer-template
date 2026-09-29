import type { Render2dCustomMaterialSchemaV1 } from './Render2dDescriptors';
import type { Render2dColor, Render2dVec2 } from './Render2dCommon';
type ParameterValue = number | Render2dVec2 | Render2dColor;
export declare function normalizeRender2dCustomMaterialSchemaV1(value: unknown, path?: string): Render2dCustomMaterialSchemaV1;
export declare function validateRender2dMaterialParametersV1(schema: Render2dCustomMaterialSchemaV1, parameters: Readonly<Record<string, ParameterValue>>, path?: string): Readonly<Record<string, ParameterValue>>;
export {};
