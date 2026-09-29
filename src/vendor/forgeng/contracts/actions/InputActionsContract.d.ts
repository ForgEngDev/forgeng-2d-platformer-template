export declare const INPUT_ACTIONS_CONTRACT_VERSION: '1.0.0';
export type InputActionsContractVersion = typeof INPUT_ACTIONS_CONTRACT_VERSION;
export type ActionValueKind = 'button' | 'axis' | 'vector2';
export type ActionVector2 = readonly [number, number];
export type ActionValue = boolean | number | ActionVector2;
export type ActionValueForKind<TKind extends ActionValueKind> = TKind extends 'button' ? boolean : TKind extends 'axis' ? number : ActionVector2;
export type ActionJsonValue = null | boolean | number | string | readonly ActionJsonValue[] | {
    readonly [key: string]: ActionJsonValue;
};
export type ActionJsonObject = Readonly<Record<string, ActionJsonValue>>;
export type ActionProcessor = Readonly<{
    kind: 'dead-zone';
    minimum: number;
    maximum: number;
}> | Readonly<{
    kind: 'scale';
    factor: number | ActionVector2;
}> | Readonly<{
    kind: 'invert';
    x: boolean;
    y: boolean;
}> | Readonly<{
    kind: 'clamp';
    minimum: number;
    maximum: number;
}> | Readonly<{
    kind: 'normalize';
}> | Readonly<{
    kind: 'sensitivity';
    factor: number;
}>;
export type ActionInteraction = Readonly<{
    kind: 'press';
    behavior: 'press-only' | 'release-only' | 'press-and-release';
    threshold: number;
}> | Readonly<{
    kind: 'hold';
    durationMs: number;
    threshold: number;
}> | Readonly<{
    kind: 'tap';
    maximumDurationMs: number;
    threshold: number;
}> | Readonly<{
    kind: 'multi-tap';
    tapCount: number;
    maximumTapDurationMs: number;
    maximumDelayMs: number;
    threshold: number;
}>;
export interface ActionBindingBase {
    readonly id: string;
    readonly groups: readonly string[];
    readonly processors: readonly ActionProcessor[];
    readonly interactions: readonly ActionInteraction[];
}
export interface ControlActionBinding extends ActionBindingBase {
    readonly kind: 'control';
    readonly control: string;
}
export interface AxisCompositeActionBinding extends ActionBindingBase {
    readonly kind: 'axis-composite';
    readonly negative: string;
    readonly positive: string;
}
export interface Vector2CompositeActionBinding extends ActionBindingBase {
    readonly kind: 'vector2-composite';
    readonly up: string;
    readonly down: string;
    readonly left: string;
    readonly right: string;
    readonly normalize: boolean;
}
export type ActionBinding = ControlActionBinding | AxisCompositeActionBinding | Vector2CompositeActionBinding;
export interface ActionBindingOptions {
    readonly id?: string;
    readonly groups?: readonly string[];
    readonly processors?: readonly ActionProcessor[];
    readonly interactions?: readonly ActionInteraction[];
}
export interface ActionDefinitionInput<TKind extends ActionValueKind = ActionValueKind> {
    readonly kind: TKind;
    readonly default?: ActionValueForKind<TKind>;
    readonly bindings?: readonly ActionBinding[];
    readonly processors?: readonly ActionProcessor[];
    readonly interactions?: readonly ActionInteraction[];
    readonly metadata?: ActionJsonObject;
}
export interface ActionReference<T = ActionValue> {
    readonly kind: 'action';
    readonly id: string;
    readonly mapId: string;
    readonly name: string;
    readonly valueKind: ActionValueKind;
    readonly default: T;
    readonly bindings: readonly ActionBinding[];
    readonly processors: readonly ActionProcessor[];
    readonly interactions: readonly ActionInteraction[];
    readonly metadata?: ActionJsonObject;
}
export interface ActionMapDefinitionBase {
    readonly kind: 'action-map';
    readonly id: string;
    readonly actions: Readonly<Record<string, ActionReference>>;
    readonly enabledByDefault: boolean;
    readonly priority: number;
    readonly consume: boolean;
    readonly metadata?: ActionJsonObject;
}
export type ActionMapDefinition<TActions extends Readonly<Record<string, ActionDefinitionInput>> = never> = ActionMapDefinitionBase & ([TActions] extends [never] ? object : {
    readonly [K in keyof TActions]: ActionReference<ActionValueForKind<TActions[K]['kind']>>;
});
export interface DefineActionMapInput<TActions extends Readonly<Record<string, ActionDefinitionInput>> = Readonly<Record<string, ActionDefinitionInput>>> {
    readonly id: string;
    readonly actions: TActions;
    readonly enabledByDefault?: boolean;
    readonly priority?: number;
    readonly consume?: boolean;
    readonly metadata?: ActionJsonObject;
}
export interface ActionControlSchemeDefinition {
    readonly id: string;
    readonly groups: readonly string[];
    readonly requiredDevices: readonly string[];
    readonly optionalDevices: readonly string[];
    readonly metadata?: ActionJsonObject;
}
export interface InputActionsConfiguration {
    readonly maps?: readonly ActionMapDefinition[];
    readonly schemes?: readonly ActionControlSchemeDefinition[];
    readonly defaultScheme?: string;
    readonly autoSwitchScheme?: boolean;
}
export type ActionPhase = 'waiting' | 'started' | 'performed' | 'canceled';
export interface ActionStateSnapshot<T = ActionValue> {
    readonly id: string;
    readonly valueKind: ActionValueKind;
    readonly value: T;
    readonly phase: ActionPhase;
    readonly actuated: boolean;
    readonly changed: boolean;
    readonly started: boolean;
    readonly performed: boolean;
    readonly canceled: boolean;
    readonly controls: readonly string[];
}
export interface InputActionsSnapshot {
    readonly sequence: number;
    readonly timestampMs: number;
    readonly scheme: string | null;
    readonly values: Readonly<Record<string, ActionValue>>;
    readonly states: Readonly<Record<string, ActionStateSnapshot>>;
}
export interface InputActionCommandSnapshot {
    readonly version: 1;
    readonly tick: number;
    readonly sequence: number;
    readonly values: Readonly<Record<string, ActionValue>>;
    readonly performed: readonly string[];
    readonly canceled: readonly string[];
}
export interface ActionBindingOverride {
    readonly mapId: string;
    readonly actionName: string;
    readonly bindingId: string;
    readonly binding: ActionBinding | null;
}
export type ActionBindingConflictPolicy = 'reject' | 'keep' | 'replace';
export interface ActionBindingConflict {
    readonly mapId: string;
    readonly actionName: string;
    readonly bindingId: string;
    readonly controls: readonly string[];
}
export interface ActionRebindResult {
    readonly applied: boolean;
    readonly conflicts: readonly ActionBindingConflict[];
    readonly override: ActionBindingOverride | null;
}
export interface InputActionsMapScope {
    readonly id: string;
    readonly disposed: boolean;
    dispose(): void;
}
export interface InputActionsSubscription {
    unsubscribe(): void;
}
export interface InputActionsInspectSnapshot {
    readonly lifecycle: 'active' | 'destroyed';
    readonly sequence: number;
    readonly mapCount: number;
    readonly actionCount: number;
    readonly bindingCount: number;
    readonly overrideCount: number;
    readonly enabledMaps: readonly string[];
    readonly scheme: string | null;
}
export interface InputActionsRuntime {
    snapshot(): InputActionsSnapshot;
    value<T>(action: Pick<ActionReference<T>, 'id' | 'default'> | string, fallback?: T): T;
    state(action: Pick<ActionReference, 'id'> | string): ActionStateSnapshot | null;
    enableMap(mapId: string, options?: Readonly<{
        priority?: number;
        consume?: boolean;
    }>): InputActionsMapScope;
    disableMap(mapId: string): void;
    setControlScheme(id: string | null): void;
    getControlScheme(): string | null;
    setVirtualControl(path: string, value: number | ActionVector2 | boolean): void;
    clearVirtualControl(path: string): void;
    rebind(override: ActionBindingOverride, policy?: ActionBindingConflictPolicy): ActionRebindResult;
    clearRebind(mapId: string, actionName: string, bindingId: string): boolean;
    listOverrides(): readonly ActionBindingOverride[];
    captureCommand(tick: number): InputActionCommandSnapshot;
    applyCommand(command: InputActionCommandSnapshot | null): void;
    subscribe(action: Pick<ActionReference, 'id'> | string, phase: Exclude<ActionPhase, 'waiting'>, listener: (state: ActionStateSnapshot) => void): InputActionsSubscription;
    inspect(): InputActionsInspectSnapshot;
    destroy(): void | Promise<void>;
}
