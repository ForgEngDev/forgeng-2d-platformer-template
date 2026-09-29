export type InputActionsErrorCode = 'ACTIONS_INVALID_DEFINITION' | 'ACTIONS_INVALID_ID' | 'ACTIONS_DUPLICATE_ID' | 'ACTIONS_INVALID_CONTROL_PATH' | 'ACTIONS_CONFLICT' | 'ACTIONS_UNKNOWN_MAP' | 'ACTIONS_UNKNOWN_ACTION' | 'ACTIONS_UNKNOWN_BINDING' | 'ACTIONS_RUNTIME_DESTROYED' | 'ACTIONS_INVALID_COMMAND' | 'ACTIONS_PERSISTENCE_FAILED';
export declare class InputActionsError extends Error {
    readonly code: InputActionsErrorCode;
    readonly path: string | null;
    readonly id: string | null;
    readonly name = "InputActionsError";
    readonly cause: unknown;
    constructor(code: InputActionsErrorCode, message: string, path?: string | null, id?: string | null, options?: {
        readonly cause?: unknown;
    });
}
export declare function failInputActions(code: InputActionsErrorCode, path: string, id?: string, detail?: string): never;
export declare function assertActionRecord(value: unknown, path: string): asserts value is Record<string, unknown>;
export declare function assertKnownActionKeys(value: Record<string, unknown>, keys: readonly string[], path: string): void;
export declare function finiteActionNumber(value: unknown, path: string): number;
export declare function positiveActionNumber(value: unknown, path: string): number;
export declare function actionThreshold(value: unknown, path: string): number;
