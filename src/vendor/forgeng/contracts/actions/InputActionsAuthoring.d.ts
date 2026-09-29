import type { ActionBinding, ActionBindingOptions, ActionControlSchemeDefinition, ActionDefinitionInput, ActionInteraction, ActionJsonObject, ActionMapDefinition, ActionProcessor, DefineActionMapInput } from './InputActionsContract';
export declare const controls: Readonly<{
    key(code: string): string;
    pointerButton(index: number): string;
    pointerDelta(axis: 'x' | 'y'): string;
    pointerPosition(axis: 'x' | 'y'): string;
    wheel(axis: 'x' | 'y' | 'z'): string;
    gamepadButton(index: number): string;
    gamepadAxis(index: number): string;
    virtual(id: string): string;
}>;
export declare const binding: Readonly<{
    control(control: string, input?: ActionBindingOptions): ActionBinding;
    axis(negative: string, positive: string, input?: ActionBindingOptions): ActionBinding;
    vector2(input: Readonly<{
        up: string;
        down: string;
        left: string;
        right: string;
        normalize?: boolean;
    }> & ActionBindingOptions): ActionBinding;
}>;
export declare const processor: Readonly<{
    deadZone(minimum?: number, maximum?: number): ActionProcessor;
    scale(factor: number | readonly [number, number]): ActionProcessor;
    invert(x?: boolean, y?: boolean): ActionProcessor;
    clamp(minimum?: number, maximum?: number): ActionProcessor;
    normalize(): ActionProcessor;
    sensitivity(factor: number): ActionProcessor;
}>;
export declare const interaction: Readonly<{
    press(behavior?: 'press-only' | 'release-only' | 'press-and-release', threshold?: number): ActionInteraction;
    hold(durationMs?: number, threshold?: number): ActionInteraction;
    tap(maximumDurationMs?: number, threshold?: number): ActionInteraction;
    multiTap(tapCount?: number, maximumTapDurationMs?: number, maximumDelayMs?: number, threshold?: number): ActionInteraction;
}>;
export declare function defineActionMap<const T extends Readonly<Record<string, ActionDefinitionInput>>>(input: DefineActionMapInput<T>): ActionMapDefinition<T>;
export declare const actionMap: typeof defineActionMap;
export declare function defineControlScheme(input: Readonly<{
    id: string;
    groups: readonly string[];
    requiredDevices?: readonly string[];
    optionalDevices?: readonly string[];
    metadata?: ActionJsonObject;
}>): ActionControlSchemeDefinition;
