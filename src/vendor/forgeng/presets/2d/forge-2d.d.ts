import type { AudioProviderDescriptor, AudioVector3 } from 'forgeng/contracts/audio';
import type { GameplayAnimationSample, GameplayEntityHandle, GameplayCheckpointSnapshot, GameplayInputCommandSnapshot, GameplayInteractionAttempt, GameplayInteractionEvent, GameplayInteractionFocusHandler, GameplayInteractionFocusResult, GameplayInteractionHandler, GameplayInteractionResult, GameplayJsonValue, GameplayTweenDefinition, GameplayTweenEasing, GameplayTweenSample, GameplayWorldSnapshot, Transform2dValue } from 'forgeng/contracts/gameplay';
import type { PhysicsBodyDefinition, PhysicsBodyHandle, PhysicsBodySnapshot, PhysicsProviderCapability, PhysicsSceneScope, PhysicsTransform, PhysicsVector3 } from 'forgeng/contracts/physics';
import type { NormalizedRender2dDefinition, Render2dAnimationCommandRequest, Render2dAnimationEventSnapshot, Render2dAnimationStateSnapshot, Render2dDefinition, Render2dFailureInspectionSnapshot, Render2dInspectionOptions, Render2dInspectionSnapshotV2, Render2dInspectorV2, Render2dParticleCommandRequest, Render2dParticleEmitterSnapshot, Render2dTextUpdateRequest, Render2dTextContentSnapshot, Render2dTilePatch, Render2dTilemapPatchRequest, Render2dTilemapPatchSnapshot } from 'forgeng/contracts/2d';
import type { ForgePluginV2Descriptor } from 'forgeng/contracts/plugin-v2';
import type { NetworkJsonObject } from 'forgeng/contracts/network';
import type { StorageProvider, StorageProviderDescriptor } from 'forgeng/contracts/storage';
import type { UiShell, UiShellProviderDescriptor } from 'forgeng/contracts/ui';
export type Forge2dPointerPhase = 'move' | 'down' | 'up' | 'cancel';
export interface Forge2dPointerInput {
    readonly sequence: number;
    readonly tick: number;
    readonly phase: Forge2dPointerPhase;
    readonly cameraId: string;
    readonly contactId?: string;
    readonly position: readonly [number, number] | null;
    readonly delta?: readonly [number, number];
    readonly button?: number | null;
    readonly modifiers?: Partial<Readonly<{
        alt: boolean;
        control: boolean;
        meta: boolean;
        shift: boolean;
    }>>;
}
export type Forge2dHitRegion = Readonly<{
    kind: 'rectangle';
    bounds: readonly [number, number, number, number];
}> | Readonly<{
    kind: 'circle';
    center: readonly [number, number];
    radius: number;
}>;
export type Forge2dInteractionTarget = string | Readonly<{
    entityId: string;
}>;
export interface Forge2dInteractionTargetOptions {
    readonly priority?: number;
    readonly hitRegion?: Forge2dHitRegion;
    readonly handler: GameplayInteractionHandler;
    readonly focusHandler?: GameplayInteractionFocusHandler;
}
export interface Forge2dDragEvent {
    readonly interaction: GameplayInteractionEvent;
    readonly worldPosition: readonly [number, number] | null;
    readonly dropTarget: GameplayEntityHandle | null;
}
export interface Forge2dDragTargetOptions {
    readonly priority?: number;
    readonly hitRegion?: Forge2dHitRegion;
    readonly focusHandler?: GameplayInteractionFocusHandler;
    readonly onStart?: (event: Forge2dDragEvent) => void;
    readonly onMove?: (event: Forge2dDragEvent) => void;
    readonly onDrop?: (event: Forge2dDragEvent) => void;
    readonly onCancel?: (event: Forge2dDragEvent) => void;
}
export interface Forge2dInteractionRegistration {
    readonly disposed: boolean;
    dispose(): void;
}
export interface Forge2dPointerResult {
    readonly attempt: GameplayInteractionAttempt;
    readonly logicalPosition: readonly [number, number] | null;
    readonly worldPosition: readonly [number, number] | null;
    readonly focus: GameplayInteractionFocusResult;
    readonly dispatch: GameplayInteractionResult;
}
export interface Forge2dInteractionInspection {
    readonly snapshotVersion: 1;
    readonly targetCount: number;
    readonly activeDragContacts: number;
    readonly captureCount: number;
    readonly focusCount: number;
    readonly destroyed: boolean;
}
export interface Forge2dInteractionApi {
    register(entity: GameplayEntityHandle, target: Forge2dInteractionTarget, options: Forge2dInteractionTargetOptions): Forge2dInteractionRegistration;
    draggable(entity: GameplayEntityHandle, target: Forge2dInteractionTarget, options?: Forge2dDragTargetOptions): Forge2dInteractionRegistration;
    pointer(input: Forge2dPointerInput): Forge2dPointerResult;
    focus(entityId: string, contactId?: string): GameplayInteractionFocusResult;
    clearFocus(contactId?: string): GameplayInteractionFocusResult;
    inspect(): Forge2dInteractionInspection;
}
export interface Forge2dUiLayoutItem {
    readonly entityId: string;
    readonly weight?: number;
}
export interface Forge2dUiLayoutOptions {
    readonly id: string;
    readonly bounds: readonly [number, number, number, number];
    readonly direction: 'row' | 'column';
    readonly gap?: number;
    readonly padding?: number;
    readonly items: readonly Forge2dUiLayoutItem[];
}
export interface Forge2dUiLayoutSnapshot {
    readonly snapshotVersion: 1;
    readonly id: string;
    readonly direction: 'row' | 'column';
    readonly bounds: readonly [number, number, number, number];
    readonly items: readonly Readonly<{
        entityId: string;
        slot: readonly [number, number, number, number];
    }>[];
}
export interface Forge2dTextController {
    readonly id: string;
    state(): Render2dTextContentSnapshot;
    set(text: string): Render2dTextContentSnapshot;
}
export interface Forge2dTilemapController {
    readonly id: string;
    state(): Render2dTilemapPatchSnapshot;
    patch(patches: readonly Render2dTilePatch[]): Render2dTilemapPatchSnapshot;
}
export interface Forge2dGameUiInspection {
    readonly snapshotVersion: 1;
    readonly layouts: number;
    readonly focusOrder: readonly string[];
    readonly focusedEntityId: string | null;
    readonly destroyed: boolean;
}
export interface Forge2dGameUiApi {
    layout(options: Forge2dUiLayoutOptions): Forge2dUiLayoutSnapshot;
    text(textId: string): Forge2dTextController;
    tilemap(tilemapId: string): Forge2dTilemapController;
    setFocusOrder(entityIds: readonly string[]): Forge2dGameUiInspection;
    focus(entityId: string): Forge2dGameUiInspection;
    moveFocus(direction: 'next' | 'previous'): Forge2dGameUiInspection;
    clearFocus(): Forge2dGameUiInspection;
    inspect(): Forge2dGameUiInspection;
}
export interface Forge2dParticleController {
    readonly id: string;
    state(): Render2dParticleEmitterSnapshot;
    play(): Render2dParticleEmitterSnapshot;
    pause(): Render2dParticleEmitterSnapshot;
    stop(): Render2dParticleEmitterSnapshot;
    burst(count: number): Render2dParticleEmitterSnapshot;
    setTimeScale(value: number): Render2dParticleEmitterSnapshot;
}
export interface Forge2dEffectsInspection {
    readonly snapshotVersion: 1;
    readonly emitters: number;
    readonly activeParticles: number;
    readonly capacity: number;
    readonly pooledParticles: number;
}
export interface Forge2dEffectsApi {
    particle(emitterId: string): Forge2dParticleController;
    inspect(): Forge2dEffectsInspection;
}
export type Forge2dNetworkPresentationSource = 'authority' | 'prediction' | 'remote';
export interface Forge2dNetworkProjection {
    readonly position?: readonly [number, number];
    readonly rotation?: number;
    readonly scale?: readonly [number, number];
    readonly presentation?: Readonly<{
        visible?: boolean;
        opacity?: number;
        tint?: readonly [number, number, number, number];
        clip?: string | null;
    }>;
}
export interface Forge2dNetworkBindingOptions<TState extends NetworkJsonObject> {
    readonly id: string;
    readonly entityId: string;
    readonly project: (state: TState) => Forge2dNetworkProjection;
}
export interface Forge2dNetworkAuthoritySample<TState extends NetworkJsonObject> {
    readonly serverTick: number;
    readonly state: TState;
}
export interface Forge2dNetworkPredictionSample<TState extends NetworkJsonObject> {
    readonly tick: number;
    readonly state: TState;
}
export interface Forge2dNetworkRemoteSample<TState extends NetworkJsonObject> {
    readonly state: TState | null;
    readonly renderServerTimeMs: number;
    readonly mode: string;
    readonly fromSequence?: number | null;
    readonly toSequence?: number | null;
}
export interface Forge2dNetworkBindingSnapshot {
    readonly snapshotVersion: 1;
    readonly id: string;
    readonly entityId: string;
    readonly revision: number;
    readonly applied: boolean;
    readonly lastSource: Forge2dNetworkPresentationSource | null;
    readonly lastTick: number | null;
    readonly lastRemoteTimeMs: number | null;
    readonly disposed: boolean;
}
export interface Forge2dNetworkBinding<TState extends NetworkJsonObject> {
    readonly id: string;
    readonly entityId: string;
    readonly disposed: boolean;
    applyAuthority(sample: Forge2dNetworkAuthoritySample<TState>): Forge2dNetworkBindingSnapshot;
    applyPrediction(sample: Forge2dNetworkPredictionSample<TState>): Forge2dNetworkBindingSnapshot;
    applyRemote(sample: Forge2dNetworkRemoteSample<TState>): Forge2dNetworkBindingSnapshot;
    inspect(): Forge2dNetworkBindingSnapshot;
    dispose(): void;
}
export interface Forge2dNetworkPresentationInspection {
    readonly snapshotVersion: 1;
    readonly bindings: number;
    readonly appliedSamples: number;
    readonly ignoredSamples: number;
    readonly destroyed: boolean;
}
export interface Forge2dNetworkPresentationApi {
    bind<TState extends NetworkJsonObject>(options: Forge2dNetworkBindingOptions<TState>): Forge2dNetworkBinding<TState>;
    inspect(): Forge2dNetworkPresentationInspection;
}
export type Forge2dTimelineClock = 'simulation';
export interface Forge2dSemanticAnimationOptions {
    /** Maps shared semantic state names to public sprite animation IDs. */
    readonly clips: Readonly<Record<string, string>>;
    readonly transitionTicks?: number;
    readonly unmapped?: 'ignore' | 'stop';
}
export interface Forge2dSemanticAnimationBinding {
    readonly spriteId: string;
    readonly entity: GameplayEntityHandle;
    readonly disposed: boolean;
    sample(): GameplayAnimationSample | null;
    dispose(): void;
}
export interface Forge2dTimelineTweenOptions {
    readonly id: string;
    readonly clock: Forge2dTimelineClock;
    readonly tween: GameplayTweenDefinition;
    readonly apply: (sample: GameplayTweenSample) => void;
}
export interface Forge2dTimelineTween {
    readonly id: string;
    readonly clock: Forge2dTimelineClock;
    readonly disposed: boolean;
    sample(): GameplayTweenSample;
    dispose(): void;
}
export interface Forge2dTimelineInspection {
    readonly snapshotVersion: 1;
    readonly tick: number;
    readonly semanticBindings: number;
    readonly tweens: number;
    readonly destroyed: boolean;
}
export interface Forge2dTimelineApi {
    bindSprite(entity: GameplayEntityHandle, sprite: string | Readonly<{
        id: string;
    }>, options: Forge2dSemanticAnimationOptions): Forge2dSemanticAnimationBinding;
    tween(options: Forge2dTimelineTweenOptions): Forge2dTimelineTween;
    inspect(): Forge2dTimelineInspection;
}
export type Forge2dPixelSnap = 'off' | 'camera' | 'camera-and-items';
export interface Forge2dCameraFollowOptions {
    readonly offset?: readonly [number, number];
    readonly bounds?: readonly [number, number, number, number] | null;
}
export interface Forge2dCameraSnapshot {
    readonly snapshotVersion: 1;
    readonly id: string;
    readonly position: readonly [number, number];
    readonly transientOffset: readonly [number, number];
    readonly effectivePosition: readonly [number, number];
    readonly rotation: number;
    readonly zoom: number;
    readonly space: 'world' | 'screen';
    readonly layers: readonly string[];
    readonly scale: readonly [number, number];
    readonly logicalViewport: readonly [number, number, number, number];
    readonly physicalViewport: readonly [number, number, number, number];
    readonly logicalContentRect: readonly [number, number, number, number];
    readonly pixelSnap: Forge2dPixelSnap;
    readonly followingEntityId: string | null;
    readonly followOffset: readonly [number, number];
    readonly bounds: readonly [number, number, number, number] | null;
}
export interface Forge2dCameraMotionOptions {
    readonly id: string;
    readonly durationTicks: number;
    readonly easing?: GameplayTweenEasing;
}
export interface Forge2dCameraShakeOptions extends Forge2dCameraMotionOptions {
    readonly amplitude: readonly [number, number];
    readonly seed?: number;
}
export interface Forge2dCameraFadeOptions extends Forge2dCameraMotionOptions {
    readonly from: number;
    readonly to: number;
}
export interface Forge2dCameraController {
    readonly id: string;
    state(): Forge2dCameraSnapshot;
    setPosition(position: readonly [number, number]): Forge2dCameraSnapshot;
    setZoom(zoom: number): Forge2dCameraSnapshot;
    setRotation(rotation: number): Forge2dCameraSnapshot;
    setLayers(layerIds: readonly string[]): Forge2dCameraSnapshot;
    setPixelSnap(pixelSnap: Forge2dPixelSnap): Forge2dCameraSnapshot;
    follow(entityId: string, options?: Forge2dCameraFollowOptions): Forge2dCameraSnapshot;
    unfollow(): Forge2dCameraSnapshot;
    panTo(position: readonly [number, number], options: Forge2dCameraMotionOptions): Forge2dTimelineTween;
    zoomTo(zoom: number, options: Forge2dCameraMotionOptions): Forge2dTimelineTween;
    shake(options: Forge2dCameraShakeOptions): Forge2dTimelineTween;
    fade(entityId: string, options: Forge2dCameraFadeOptions): Forge2dTimelineTween;
    worldToLogical(point: readonly [number, number]): readonly [number, number];
    logicalToWorld(point: readonly [number, number]): readonly [number, number];
}
export interface Forge2dCollisionFilter {
    readonly group: number;
    readonly mask: number;
}
export type Forge2dColliderResponseRole = 'solid' | 'trigger' | 'query-only';
export interface Forge2dArcadeMaterial {
    readonly friction?: number;
    readonly restitution?: number;
}
export interface Forge2dArcadeOneWayPlatform {
    readonly enabled?: boolean;
    readonly normal?: readonly [number, number];
}
export interface Forge2dArcadeBallTuning {
    readonly rollingResistance?: number;
    readonly angularDrag?: number;
    readonly spinCurve?: number;
    readonly maxAngularVelocity?: number;
}
export interface Forge2dArcadeImpulseOptions {
    readonly contactOffset?: readonly [number, number];
    readonly spin?: number;
    readonly maxSpeed?: number;
}
export interface Forge2dArcadeKickOptions {
    readonly direction: readonly [number, number];
    readonly power: number;
    readonly spin?: number;
    readonly maxSpeed?: number;
}
export interface Forge2dArcadeDribbleOptions {
    readonly target: readonly [number, number];
    readonly strength?: number;
    readonly maxSpeed?: number;
    readonly spin?: number;
}
export interface Forge2dAabbShape {
    readonly kind: 'aabb';
    readonly size: readonly [number, number];
    readonly offset?: readonly [number, number];
}
export interface Forge2dCircleShape {
    readonly kind: 'circle';
    readonly radius: number;
    readonly offset?: readonly [number, number];
}
export type Forge2dCollisionShape = Forge2dAabbShape | Forge2dCircleShape;
export interface Forge2dColliderDefinition {
    readonly id: string;
    readonly entityId: string;
    readonly shape: Forge2dCollisionShape;
    readonly sensor?: boolean;
    readonly filter?: Partial<Forge2dCollisionFilter>;
    readonly responseRole?: Forge2dColliderResponseRole;
    readonly arcadeMaterial?: Forge2dArcadeMaterial;
    readonly arcadeOneWay?: Forge2dArcadeOneWayPlatform;
}
export interface Forge2dCollisionQuery {
    readonly shape: Forge2dCollisionShape;
    readonly position: readonly [number, number];
    readonly filter?: Partial<Forge2dCollisionFilter>;
    readonly includeSensors?: boolean;
}
export type Forge2dArcadeQueryMode = 'closest' | 'all';
export type Forge2dArcadeParticipantType = 'body' | 'collider';
export interface Forge2dArcadeQueryOptions {
    readonly filter?: Partial<Forge2dCollisionFilter>;
    readonly responseRoles?: readonly Forge2dColliderResponseRole[];
    readonly participantTypes?: readonly Forge2dArcadeParticipantType[];
    readonly maxResults?: number;
}
export interface Forge2dArcadeCastOptions extends Forge2dArcadeQueryOptions {
    readonly mode?: Forge2dArcadeQueryMode;
}
export interface Forge2dArcadePointQuery extends Forge2dArcadeQueryOptions {
    readonly point: readonly [number, number];
}
export interface Forge2dArcadeRaycastQuery extends Forge2dArcadeCastOptions {
    readonly origin: readonly [number, number];
    readonly direction: readonly [number, number];
    readonly maxDistance?: number;
}
export interface Forge2dArcadeShapeCastQuery extends Forge2dArcadeCastOptions {
    readonly shape: Forge2dCollisionShape;
    readonly origin: readonly [number, number];
    readonly translation: readonly [number, number];
}
export interface Forge2dArcadeQueryHit {
    readonly snapshotVersion: 1;
    readonly fraction: number;
    readonly distance: number;
    readonly point: readonly [number, number];
    readonly normal: readonly [number, number];
    readonly colliderId: string;
    readonly colliderGeneration: number;
    readonly bodyId: string | null;
    readonly bodyGeneration: number | null;
    readonly entityId: string;
    readonly participantType: Forge2dArcadeParticipantType;
    readonly sensor: boolean;
    readonly responseRole: Forge2dColliderResponseRole;
}
export interface Forge2dColliderSnapshot {
    readonly snapshotVersion: 1;
    readonly id: string;
    readonly entityId: string;
    readonly generation: number;
    readonly shape: Forge2dCollisionShape;
    readonly sensor: boolean;
    readonly filter: Forge2dCollisionFilter;
    readonly responseRole: Forge2dColliderResponseRole;
    readonly bounds: readonly [number, number, number, number];
    readonly arcadeMaterial?: Required<Forge2dArcadeMaterial>;
    readonly arcadeOneWay?: Required<Forge2dArcadeOneWayPlatform>;
}
export interface Forge2dCollider {
    readonly id: string;
    readonly entityId: string;
    state(): Forge2dColliderSnapshot;
    overlaps(includeSensors?: boolean): readonly Forge2dColliderSnapshot[];
    destroy(): void;
}
export type Forge2dArcadeMotion = 'static' | 'dynamic' | 'kinematic';
export type Forge2dArcadeCcdMode = 'discrete' | 'swept';
export interface Forge2dArcadeConfig {
    readonly gravity?: readonly [number, number];
    readonly positionIterations?: number;
    readonly velocityIterations?: number;
    readonly groundNormalThreshold?: number;
    readonly restitutionVelocityCutoff?: number;
    /** @deprecated Arcade2D uses the host fixedDeltaSeconds. If supplied, this must match the host fixed step. */
    readonly fixedStepHz?: number;
}
export interface Forge2dArcadeConstraints {
    readonly lockX?: boolean;
    readonly lockY?: boolean;
    readonly maxVelocity?: readonly [number, number];
}
export interface Forge2dArcadeBodyDefinition {
    readonly id: string;
    readonly entityId: string;
    readonly motion: Forge2dArcadeMotion;
    readonly shape: Forge2dCollisionShape;
    readonly sensor?: boolean;
    readonly filter?: Partial<Forge2dCollisionFilter>;
    readonly velocity?: readonly [number, number];
    readonly acceleration?: readonly [number, number];
    readonly gravityScale?: number;
    readonly constraints?: Forge2dArcadeConstraints;
    readonly ccdMode?: Forge2dArcadeCcdMode;
    readonly maxCcdImpacts?: number;
    readonly linearDrag?: number;
    readonly material?: Forge2dArcadeMaterial;
    readonly angularVelocity?: number;
    readonly ballTuning?: Forge2dArcadeBallTuning;
    readonly oneWay?: Forge2dArcadeOneWayPlatform;
    readonly dropThrough?: boolean;
}
export interface Forge2dArcadeBlockedState {
    readonly left: boolean;
    readonly right: boolean;
    readonly up: boolean;
    readonly down: boolean;
}
export interface Forge2dArcadeBodySnapshot {
    readonly snapshotVersion: 1;
    readonly id: string;
    readonly entityId: string;
    readonly generation: number;
    readonly motion: Forge2dArcadeMotion;
    readonly sensor: boolean;
    readonly enabled: boolean;
    readonly colliderId: string;
    readonly colliderGeneration: number;
    readonly shape: Forge2dCollisionShape;
    readonly filter: Required<Forge2dCollisionFilter>;
    readonly velocity: readonly [number, number];
    readonly acceleration: readonly [number, number];
    readonly gravityScale: number;
    readonly constraints: Required<Forge2dArcadeConstraints>;
    readonly ccdMode: Forge2dArcadeCcdMode;
    readonly maxCcdImpacts: number;
    readonly linearDrag: number;
    readonly angularVelocity: number;
    readonly ballTuning: Required<Forge2dArcadeBallTuning>;
    readonly material: Required<Forge2dArcadeMaterial>;
    readonly oneWay: Required<Forge2dArcadeOneWayPlatform> | null;
    readonly dropThrough: boolean;
    readonly blocked: Forge2dArcadeBlockedState;
    readonly contacts: readonly string[];
}
export interface Forge2dArcadeBody {
    readonly id: string;
    readonly entityId: string;
    state(): Forge2dArcadeBodySnapshot;
    setVelocity(velocity: readonly [number, number]): Forge2dArcadeBodySnapshot;
    setAcceleration(acceleration: readonly [number, number]): Forge2dArcadeBodySnapshot;
    setGravityScale(gravityScale: number): Forge2dArcadeBodySnapshot;
    setTransform(transform: Transform2dValue): Forge2dArcadeBodySnapshot;
    teleport(position: readonly [number, number]): Forge2dArcadeBodySnapshot;
    setLinearDrag(linearDrag: number): Forge2dArcadeBodySnapshot;
    setMaterial(material: Forge2dArcadeMaterial): Forge2dArcadeBodySnapshot;
    setCcdMode(ccdMode: Forge2dArcadeCcdMode, maxImpacts?: number): Forge2dArcadeBodySnapshot;
    setOneWay(oneWay: Forge2dArcadeOneWayPlatform | null): Forge2dArcadeBodySnapshot;
    setAngularVelocity(angularVelocity: number): Forge2dArcadeBodySnapshot;
    setBallTuning(tuning: Forge2dArcadeBallTuning): Forge2dArcadeBodySnapshot;
    applyImpulse(impulse: readonly [number, number], options?: Forge2dArcadeImpulseOptions): Forge2dArcadeBodySnapshot;
    kick(options: Forge2dArcadeKickOptions): Forge2dArcadeBodySnapshot;
    dribble(options: Forge2dArcadeDribbleOptions): Forge2dArcadeBodySnapshot;
    setEnabled(enabled: boolean): Forge2dArcadeBodySnapshot;
    setDropThrough(enabled: boolean): Forge2dArcadeBodySnapshot;
    destroy(): void;
}
export type Forge2dArcadeContactPhase = 'enter' | 'stay' | 'exit';
export type Forge2dArcadeContactKind = 'collision' | 'trigger';
export interface Forge2dArcadeBodyContactParticipant {
    readonly kind: 'body';
    readonly bodyId: string;
}
export interface Forge2dArcadeColliderContactParticipant {
    readonly kind: 'collider';
    readonly colliderId: string;
}
export type Forge2dArcadeContactParticipant = Forge2dArcadeBodyContactParticipant | Forge2dArcadeColliderContactParticipant;
export interface Forge2dArcadeContactEvent {
    readonly snapshotVersion: 1;
    readonly sequence: number;
    readonly tick: number;
    readonly phase: Forge2dArcadeContactPhase;
    readonly kind: Forge2dArcadeContactKind;
    readonly first: Forge2dArcadeContactParticipant;
    readonly second: Forge2dArcadeContactParticipant;
    /** @deprecated Use `first` and `second`; null when the participant is not a body. */
    readonly firstBodyId: string | null;
    /** @deprecated Use `first` and `second`; null when the participant is not a body. */
    readonly secondBodyId: string | null;
    readonly normal: readonly [number, number];
}
export interface Forge2dArcadeInspection {
    readonly snapshotVersion: 1;
    readonly tick: number;
    readonly fixedDeltaSeconds: number;
    readonly deprecatedFixedStepHz: number | null;
    readonly bodies: number;
    readonly activeContacts: number;
    readonly queuedEvents: number;
    readonly destroyed: boolean;
    readonly broadphaseCellSize: number;
    readonly broadphaseStaticProxies: number;
    readonly broadphaseMovingProxies: number;
    readonly broadphaseExternalProxies: number;
    readonly broadphaseOccupiedCells: number;
    readonly broadphaseCandidatePairs: number;
    readonly broadphaseRejectedByFilter: number;
    readonly broadphaseRejectedByBounds: number;
    readonly broadphaseOversizedProxies: number;
    readonly broadphaseRebuilds: number;
    readonly narrowphasePairs: number;
    readonly ccdSweptBodies: number;
    readonly ccdCandidatePairs: number;
    readonly ccdImpacts: number;
    readonly ccdBudgetExhaustions: number;
    readonly solverPositionIterations: number;
    readonly solverVelocityIterations: number;
    readonly solverContacts: number;
    readonly queryCount: number;
    readonly queryResultsTruncated: number;
    readonly teleportCount: number;
    readonly debugSnapshots: number;
}
export interface Forge2dArcadeDebugColliderSnapshot {
    readonly colliderId: string;
    readonly colliderGeneration: number;
    readonly bodyId: string | null;
    readonly bodyGeneration: number | null;
    readonly entityId: string;
    readonly participantType: Forge2dArcadeParticipantType;
    readonly shape: Forge2dCollisionShape;
    readonly bounds: readonly [number, number, number, number];
    readonly sweptBounds: readonly [number, number, number, number];
    readonly sensor: boolean;
    readonly responseRole: Forge2dColliderResponseRole;
}
export interface Forge2dArcadeDebugContactSnapshot {
    readonly key: string;
    readonly first: Forge2dArcadeContactParticipant;
    readonly second: Forge2dArcadeContactParticipant;
    readonly kind: Forge2dArcadeContactKind;
    readonly normal: readonly [number, number];
    readonly contactPoints: readonly (readonly [number, number])[];
}
export interface Forge2dArcadeDebugCellSnapshot {
    readonly key: string;
    readonly x: number;
    readonly y: number;
    readonly colliderIds: readonly string[];
}
export interface Forge2dArcadeDebugSnapshot {
    readonly snapshotVersion: 1;
    readonly tick: number;
    readonly fixedDeltaSeconds: number;
    readonly cellSize: number;
    readonly colliders: readonly Forge2dArcadeDebugColliderSnapshot[];
    readonly contacts: readonly Forge2dArcadeDebugContactSnapshot[];
    readonly broadphaseCells: readonly Forge2dArcadeDebugCellSnapshot[];
}
export interface Forge2dArcadeApi {
    createBody(definition: Forge2dArcadeBodyDefinition): Forge2dArcadeBody;
    body(bodyId: string): Forge2dArcadeBody | null;
    pointQuery(query: Forge2dArcadePointQuery): readonly Forge2dArcadeQueryHit[];
    raycast(query: Forge2dArcadeRaycastQuery): readonly Forge2dArcadeQueryHit[];
    shapeCast(query: Forge2dArcadeShapeCastQuery): readonly Forge2dArcadeQueryHit[];
    debugSnapshot(): Forge2dArcadeDebugSnapshot;
    drainEvents(): readonly Forge2dArcadeContactEvent[];
    inspect(): Forge2dArcadeInspection;
}
export type Forge2dPhysicsSceneStatus = 'unavailable' | 'loading' | 'active' | 'failed';
export interface Forge2dPhysicsSceneFailure extends Error {
    readonly code: string;
    readonly operation: string;
    readonly currentState: string;
    readonly requestedState: string;
    readonly remediation: string;
    readonly details: Readonly<Record<string, unknown>>;
    readonly cause?: unknown;
}
export interface Forge2dPhysicsCapabilityResult {
    readonly ok: boolean;
    readonly status: Forge2dPhysicsSceneStatus;
    readonly capability: PhysicsProviderCapability | null;
    readonly scope: PhysicsSceneScope | null;
    readonly error: Error | null;
}
export interface Forge2dPhysicsSceneApi {
    readonly status: Forge2dPhysicsSceneStatus;
    readonly capabilities: readonly PhysicsProviderCapability[];
    readonly lastError: Forge2dPhysicsSceneFailure | null;
    getScopeResult(capabilityId?: string): Forge2dPhysicsCapabilityResult;
    createBody(definition: PhysicsBodyDefinition): PhysicsBodyHandle;
    removeBody(handle: PhysicsBodyHandle): boolean;
    setBodyTransform(handle: PhysicsBodyHandle, transform: PhysicsTransform): boolean;
    applyBodyImpulse(handle: PhysicsBodyHandle, impulse: PhysicsVector3, worldPoint?: PhysicsVector3): boolean;
    readBodySnapshot(handle: PhysicsBodyHandle): Promise<PhysicsBodySnapshot | null>;
}
export type Forge2dAudioProviderSelection = 'default' | 'disabled' | AudioProviderDescriptor;
export interface Forge2dAudioCueDefinition {
    readonly id: string;
    readonly url: string;
    readonly volume?: number;
    readonly loop?: boolean;
    readonly startOffsetSeconds?: number;
    readonly enforceCooldown?: boolean;
    readonly metadata?: Readonly<Record<string, unknown>>;
}
export interface Forge2dAudioOptions {
    readonly cues?: readonly Forge2dAudioCueDefinition[];
    readonly masterVolume?: number;
}
export interface Forge2dAudioPlayOptions {
    readonly volume?: number;
    readonly loop?: boolean;
    readonly startOffsetSeconds?: number;
    readonly enforceCooldown?: boolean;
    readonly position?: AudioVector3;
    readonly metadata?: Readonly<Record<string, unknown>>;
}
export interface Forge2dAudioVoice {
    readonly cueId: string;
    readonly ended: Promise<void>;
    readonly stopped: boolean;
    setGain(value: number, rampMs?: number): void;
    setPosition(position: AudioVector3): void;
    stop(fadeOutMs?: number): void;
}
export interface Forge2dAudioSnapshot {
    readonly snapshotVersion: 1;
    readonly available: boolean;
    readonly cueIds: readonly string[];
    readonly loadedCues: number;
    readonly activeVoices: number;
}
export interface Forge2dAudioApi {
    readonly available: boolean;
    readonly cueIds: readonly string[];
    load(cueId: string): Promise<void>;
    play(cueId: string, options?: Forge2dAudioPlayOptions): Promise<Forge2dAudioVoice | null>;
    resume(): Promise<void>;
    suspend(): Promise<void>;
    setMasterVolume(volume: number): void;
    stopAll(fadeOutMs?: number): void;
    inspect(): Forge2dAudioSnapshot;
}
export interface Forge2dHudSnapshot {
    readonly snapshotVersion: 1;
    readonly sceneId: string;
    readonly sceneGeneration: number;
    readonly revision: number;
    readonly values: Readonly<Record<string, GameplayJsonValue>>;
}
export interface Forge2dHudSubscription {
    dispose(): void;
}
export interface Forge2dHudApi {
    snapshot(): Forge2dHudSnapshot | null;
    value(channel: string): GameplayJsonValue | null;
    set(channel: string, value: GameplayJsonValue): Forge2dHudSnapshot;
    clear(channel?: string): Forge2dHudSnapshot;
    subscribe(listener: (snapshot: Forge2dHudSnapshot | null) => void): Forge2dHudSubscription;
}
export interface Forge2dSaveSnapshot {
    readonly snapshotVersion: 1;
    readonly available: boolean;
    readonly slots: readonly string[];
}
export interface Forge2dSavesApi {
    readonly available: boolean;
    save(slot: string, checkpointId?: string): Promise<GameplayCheckpointSnapshot>;
    load(slot: string): Promise<GameplayCheckpointSnapshot>;
    replay(slot: string, commands: readonly GameplayInputCommandSnapshot[], deltaSeconds?: number): Promise<GameplayWorldSnapshot>;
    remove(slot: string): Promise<boolean>;
    list(): Promise<readonly string[]>;
    inspect(): Forge2dSaveSnapshot;
}
export interface Forge2dDevtoolsAnimationSnapshot {
    readonly snapshotVersion: 1;
    readonly id: string;
    readonly runtimeId: string;
    readonly spriteId: string | null;
    readonly revision: number;
    readonly status: Render2dAnimationStateSnapshot['status'];
    readonly active: boolean;
    readonly time: number;
    readonly speed: number;
    readonly direction: 1 | -1;
    readonly iteration: number;
    readonly frame: number | null;
    readonly transition: Readonly<{
        readonly toId: string;
        readonly toRuntimeId: string;
        readonly startedTick: number;
        readonly durationTicks: number;
        readonly progress: number;
    }> | null;
}
export interface Forge2dDevtoolsSnapshot {
    readonly snapshotVersion: 1;
    readonly activeScene: Readonly<{
        readonly id: string;
        readonly sceneGeneration: number;
        readonly domainGeneration: number;
    }> | null;
    readonly render: Readonly<{
        readonly frame: number;
        readonly visibleItems: number;
        readonly culledItems: number;
        readonly draws: number;
        readonly batches: number;
        readonly pipelineChanges: number;
        readonly bindGroupChanges: number;
    }>;
    readonly resources: Readonly<{
        readonly trackedCpuBytes: number;
        readonly trackedGpuBytes: number;
        readonly retainedBuffers: number;
        readonly leasedBuffers: number;
        readonly handles: number;
        readonly pendingRetirements: number;
    }>;
    readonly animations: readonly Forge2dDevtoolsAnimationSnapshot[];
    readonly colliders: readonly Forge2dColliderSnapshot[];
    readonly staleWork: Readonly<{
        readonly rejections: number;
        readonly failures: readonly Render2dFailureInspectionSnapshot[];
    }>;
    readonly startup: import('forgeng/contracts/render-composition').StartupTraceSnapshotV1 | null;
    readonly totals: Readonly<{
        readonly animations: number;
        readonly colliders: number;
    }>;
    readonly truncated: Readonly<{
        readonly animations: boolean;
        readonly colliders: boolean;
    }>;
    readonly destroyed: boolean;
}
export interface Forge2dDevtoolsApi {
    inspect(): Forge2dDevtoolsSnapshot;
}
export interface Forge2dTiledCollisionOptions {
    readonly entityId: string;
    readonly idPrefix: string;
    readonly layerPaths?: readonly string[];
    readonly includeInvisible?: boolean;
    readonly sensor?: boolean;
    readonly filter?: Partial<Forge2dCollisionFilter>;
    readonly responseRole?: Forge2dColliderResponseRole;
    readonly mergeAdjacent?: boolean;
    readonly maxColliders?: number;
    readonly arcadeMaterial?: Forge2dArcadeMaterial;
    readonly arcadeOneWay?: Forge2dArcadeOneWayPlatform;
}
export interface Forge2dTiledCollisionObject {
    readonly id: number;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly rotation: number;
    readonly visible: boolean;
    readonly shape: 'rectangle' | 'ellipse' | 'point' | 'polygon' | 'polyline' | 'text' | 'tile';
    readonly points: readonly Readonly<{
        readonly x: number;
        readonly y: number;
    }>[];
}
export interface Forge2dTiledTileLayer {
    readonly type: 'tilelayer';
    readonly id: number;
    readonly path: string;
    readonly visible: boolean;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly width: number;
    readonly height: number;
    readonly x: number;
    readonly y: number;
    readonly gids: readonly number[];
    readonly chunks: readonly Readonly<{
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
        readonly gids: readonly number[];
    }>[];
}
export interface Forge2dTiledGroupLayer {
    readonly type: 'group';
    readonly id: number;
    readonly path: string;
    readonly visible: boolean;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly layers: readonly Forge2dTiledLayer[];
}
export interface Forge2dTiledIgnoredLayer {
    readonly type: 'objectgroup' | 'imagelayer';
    readonly id: number;
    readonly path: string;
    readonly visible: boolean;
    readonly offsetX: number;
    readonly offsetY: number;
}
export type Forge2dTiledLayer = Forge2dTiledTileLayer | Forge2dTiledGroupLayer | Forge2dTiledIgnoredLayer;
export interface Forge2dTiledCollisionProduct {
    readonly normalizationVersion: 1;
    readonly kind: 'tilemap/tiled-json';
    readonly orientation: 'orthogonal' | 'isometric' | 'staggered' | 'hexagonal';
    readonly tileWidth: number;
    readonly tileHeight: number;
    readonly layers: readonly Forge2dTiledLayer[];
    readonly tilesets: readonly Readonly<{
        readonly firstGid: number;
        readonly tileWidth: number;
        readonly tileHeight: number;
        readonly tiles: readonly Readonly<{
            readonly id: number;
            readonly collisionObjects: readonly Forge2dTiledCollisionObject[];
        }>[];
    }>[];
}
import type { Transform2dValue as GameplayTransform2dValue } from 'forgeng/contracts/gameplay';
import type { RenderCompositionSnapshot } from 'forgeng/contracts/render-composition';
export interface Forge2dSceneDefinition {
    readonly id: string;
    readonly render: Render2dDefinition;
    readonly colliders?: readonly Forge2dColliderDefinition[];
    readonly arcade?: Forge2dArcadeConfig;
    readonly arcadeBodies?: readonly Forge2dArcadeBodyDefinition[];
    readonly setup?: (scene: Forge2dSceneFacade) => void | Promise<void>;
    readonly fixedUpdate?: (scene: Forge2dSceneFacade, tick: number) => void;
}
export interface Forge2dSpriteDeclaration {
    readonly id: string;
    readonly texture: string;
    readonly entity?: string;
    readonly size?: readonly [number, number];
    readonly position?: readonly [number, number];
    readonly transform?: GameplayTransform2dValue;
    readonly anchor?: readonly [number, number];
    readonly order?: number;
    readonly visible?: boolean;
    readonly opacity?: number;
    readonly tint?: readonly [number, number, number, number];
}
export interface Forge2dCameraDeclaration {
    readonly id?: string;
    readonly virtualSize?: readonly [number, number];
    readonly scaleMode?: 'stretch' | 'fit' | 'fill' | 'integer-fit' | 'none';
    readonly pixelSnap?: 'off' | 'camera' | 'camera-and-items';
    readonly sampling?: 'asset' | 'nearest' | 'linear';
    readonly clearColor?: readonly [number, number, number, number] | null;
    readonly follow?: string | Readonly<{
        readonly entity: string;
        readonly offset?: readonly [number, number];
        readonly bounds?: readonly [number, number, number, number];
    }>;
}
export interface Forge2dConciseSceneDefinition {
    readonly id: string;
    readonly sprites: readonly [Forge2dSpriteDeclaration, ...Forge2dSpriteDeclaration[]];
    readonly camera?: Forge2dCameraDeclaration;
    readonly colliders?: readonly Forge2dColliderDefinition[];
    readonly arcade?: Forge2dArcadeConfig;
    readonly arcadeBodies?: readonly Forge2dArcadeBodyDefinition[];
    readonly setup?: (scene: Forge2dSceneFacade) => void | Promise<void>;
    readonly fixedUpdate?: (scene: Forge2dSceneFacade, tick: number) => void;
}
export interface Forge2dPresentationState {
    readonly visible?: boolean;
    readonly opacity?: number;
    readonly tint?: readonly [number, number, number, number];
    readonly clip?: string | null;
}
export type Forge2dAnimationPlayMode = 'continue' | 'restart';
export interface Forge2dAnimationEventSnapshot extends Render2dAnimationEventSnapshot {
    readonly spriteId?: string;
}
export interface Forge2dSpriteAnimationSnapshot {
    readonly snapshotVersion: 1;
    readonly spriteId: string;
    readonly animationIds: readonly string[];
    readonly current: Render2dAnimationStateSnapshot | null;
}
export interface Forge2dSpriteAnimationController {
    readonly spriteId: string;
    readonly animationIds: readonly string[];
    state(): Forge2dSpriteAnimationSnapshot;
    play(animationId: string, mode?: Forge2dAnimationPlayMode): Forge2dSpriteAnimationSnapshot;
    pause(): Forge2dSpriteAnimationSnapshot;
    stop(): Forge2dSpriteAnimationSnapshot;
    restart(): Forge2dSpriteAnimationSnapshot;
    seek(time: number): Forge2dSpriteAnimationSnapshot;
    setSpeed(speed: number): Forge2dSpriteAnimationSnapshot;
    setDirection(direction: 1 | -1): Forge2dSpriteAnimationSnapshot;
    transition(animationId: string, transitionTicks: number): Forge2dSpriteAnimationSnapshot;
}
export interface Forge2dSpawnSpriteOptions {
    readonly id: string;
    readonly template: string;
    readonly entityId?: string;
    readonly transform?: GameplayTransform2dValue;
    readonly presentation?: Forge2dPresentationState;
    readonly parentEntityId?: string | null;
}
export interface Forge2dSpawnedSpriteSnapshot {
    readonly snapshotVersion: 1;
    readonly id: string;
    readonly template: string;
    readonly entityId: string;
    readonly spriteGeneration: number;
    readonly sceneGeneration: number;
    readonly transform: GameplayTransform2dValue;
    readonly presentation: Required<Forge2dPresentationState>;
    readonly animationIds: readonly string[];
}
export interface Forge2dSpawnedSprite {
    readonly id: string;
    readonly entityId: string;
    state(): Forge2dSpawnedSpriteSnapshot;
    animation(): Forge2dSpriteAnimationController;
    setTransform(value: GameplayTransform2dValue): Forge2dSpawnedSpriteSnapshot;
    setPresentation(value: Forge2dPresentationState): Forge2dSpawnedSpriteSnapshot;
    destroy(): void;
}
export interface Forge2dSceneFacade {
    readonly id: string;
    readonly physics: Forge2dPhysicsSceneApi;
    readonly audio: Forge2dAudioApi;
    readonly hud: Forge2dHudApi;
    readonly interactions: Forge2dInteractionApi;
    readonly timeline: Forge2dTimelineApi;
    readonly arcade: Forge2dArcadeApi;
    readonly gameUi: Forge2dGameUiApi;
    readonly effects: Forge2dEffectsApi;
    readonly networkPresentation: Forge2dNetworkPresentationApi;
    setTransform(entityId: string, value: GameplayTransform2dValue): void;
    setPresentation(entityId: string, value: Forge2dPresentationState): void;
    pick(cameraId: string, point: readonly [number, number]): string | null;
    pickAll(cameraId: string, point: readonly [number, number]): readonly string[];
    camera(cameraId: string): Forge2dCameraController;
    updateText(request: Render2dTextUpdateRequest): void;
    patchTilemap(request: Render2dTilemapPatchRequest): void;
    commandAnimation(request: Render2dAnimationCommandRequest): Render2dAnimationStateSnapshot;
    animationState(animationId: string): Render2dAnimationStateSnapshot;
    drainAnimationEvents(): readonly Forge2dAnimationEventSnapshot[];
    spriteAnimation(spriteId: string): Forge2dSpriteAnimationController;
    spawnSprite(options: Forge2dSpawnSpriteOptions): Forge2dSpawnedSprite;
    findSprite(spriteId: string): Forge2dSpawnedSprite | null;
    createCollider(definition: Forge2dColliderDefinition): Forge2dCollider;
    collider(colliderId: string): Forge2dCollider | null;
    queryColliders(query: Forge2dCollisionQuery): readonly Forge2dColliderSnapshot[];
    commandParticles(request: Render2dParticleCommandRequest): Render2dParticleEmitterSnapshot;
}
export interface Forge2dFacadeSnapshot {
    readonly snapshotVersion: 1;
    readonly activeSceneId: string | null;
    readonly definitionIds: readonly string[];
    readonly definitionCount: number;
    readonly activeAttachments: number;
    readonly retainedEntities: number;
    readonly retainedBuffers: number;
    readonly activeScene: Readonly<{
        entities: number;
        visibleItems: number;
        culledItems: number;
        colliders: number;
        collisionQueries: number;
        retainedBuffers: number;
        leasedBuffers: number;
    }> | null;
    readonly composition: RenderCompositionSnapshot;
}
export type Forge2dInspectionApi = Render2dInspectorV2;
export interface Forge2dFacade extends Forge2dSceneFacade {
    readonly inspection: Forge2dInspectionApi;
    readonly devtools: Forge2dDevtoolsApi;
    activeScene(): string | null;
    inspect(): Forge2dFacadeSnapshot;
    inspectDetailed(): Render2dInspectionSnapshotV2;
}
import type { InputActionsRuntime as InputActionsApi } from 'forgeng/contracts/actions';
import type { AssetDecoderDescriptor, AssetManifestInput, AssetRealizerDescriptor, AssetRuntimeClient, AssetSourceProviderDescriptor } from 'forgeng/contracts/assets';
import type { GameDefinition, GameplayGameApi } from 'forgeng/contracts/gameplay';
import type { InputProviderDescriptor } from 'forgeng/contracts/input';
import type { PhysicsProvider, PhysicsProviderDescriptor } from 'forgeng/contracts/physics';
import type { GraphicsBackendDescriptor, RenderCompositionDescriptor, RenderDomainDescriptor, StartupTraceLaneV1, StartupTraceSnapshotV1 } from 'forgeng/contracts/render-composition';
import type { InputActionsConfiguration } from 'forgeng/contracts/actions';
import { ForgeNeutralGame } from 'forgeng/neutral';
import type { ForgeLoggingController, ForgeLoggingOptions } from 'forgeng';
import { builtinSpriteMaterial2d, camera2d, defineLayer2d, defineRender2d, sprite2d } from 'forgeng/2d';
export declare const version: string;
export type { StartupTraceAttributeV1, StartupTraceCompletionV1, StartupTraceLaneV1, StartupTraceSnapshotV1, StartupTraceSpanSnapshotV1, } from 'forgeng/contracts/render-composition';
export { actionMap, binding, controls, defineActionMap, defineControlScheme, interaction, processor, } from 'forgeng/contracts/actions';
export { builtinSpriteMaterial2d, camera2d, defineLayer2d, defineRender2d, sprite2d, };
export type { NetworkJsonObject, NetworkJsonValue } from 'forgeng/contracts/network';
export declare function createTiledCollisionDefinitions(product: Forge2dTiledCollisionProduct, options: Forge2dTiledCollisionOptions): readonly Forge2dColliderDefinition[];
/**
 * Compiles stable defaults into the ordinary render contract. The result is not a
 * second runtime: advanced consumers can inspect or extend the returned definition.
 */
export declare function scene2d(definition: Forge2dConciseSceneDefinition): Forge2dSceneDefinition;
export interface Forge2dGameLoop {
    readonly running: boolean;
    start(): void;
    stop(): void;
}
export type Forge2dGame = ForgeNeutralGame & Readonly<{
    canvas: HTMLCanvasElement;
    loop: Forge2dGameLoop;
    twoD: Forge2dFacade;
    actions: InputActionsApi;
    gameplay: GameplayGameApi | null;
    assets: AssetRuntimeClient | null;
    ui: UiShell | null;
    storage: StorageProvider | null;
    physics: PhysicsProvider | null;
    audio: Forge2dAudioApi;
    hud: Forge2dHudApi;
    saves: Forge2dSavesApi;
    logs: ForgeLoggingController;
    inspect2d(): Forge2dFacadeSnapshot;
    inspect2dDetailed(): Render2dInspectionSnapshotV2;
    inspect2dDevtools(): Forge2dDevtoolsSnapshot;
    inspect2dStartup(): StartupTraceSnapshotV1 | null;
    restartScene(): Promise<void>;
    stepAsync(input: Parameters<ForgeNeutralGame['step']>[0]): Promise<void>;
}>;
export interface Forge2dCanvasOptions {
    readonly target?: string | HTMLCanvasElement;
    readonly id?: string;
    readonly layout?: Forge2dCanvasLayoutMode;
}
export type Forge2dCanvasLayoutMode = 'fixed' | 'container' | 'viewport';
export interface Forge2dSizeOptions {
    readonly width?: number;
    readonly height?: number;
    readonly pixelRatio?: number;
    readonly maxPixelRatio?: number;
    readonly autoResize?: boolean;
}
export interface Forge2dBootOptions {
    readonly scene?: string;
    readonly autoStart?: boolean;
}
export interface Forge2dProviderSelections {
    /** A renderer-provider v1 selection is intentionally invalid for a composed 2D game. */
    readonly renderer?: never;
    readonly ui?: 'default' | 'disabled' | UiShellProviderDescriptor;
    readonly input?: 'default' | InputProviderDescriptor;
    readonly storage?: 'default' | 'memory' | 'disabled' | StorageProviderDescriptor;
    readonly assets?: 'default' | 'disabled' | AssetSourceProviderDescriptor;
    /** Explicit opt-in only; 2D never imports a default physics implementation. */
    readonly physics?: 'disabled' | PhysicsProviderDescriptor;
    readonly audio?: Forge2dAudioProviderSelection;
}
export interface Forge2dAssetsOptions {
    readonly manifests?: readonly AssetManifestInput[];
    readonly preload?: readonly string[];
    readonly decoders?: readonly AssetDecoderDescriptor[];
    readonly realizers?: readonly AssetRealizerDescriptor[];
}
export interface Forge2dPresentationOptions {
    readonly id?: string;
    readonly backend?: GraphicsBackendDescriptor;
    readonly backendOptions?: Forge2dWebGpuBackendOptions;
    readonly includeDefaultDomain?: boolean;
    readonly domain?: Forge2dDomainOptions;
    readonly domains?: readonly RenderDomainDescriptor[];
    readonly optionalDomainFailurePolicy?: RenderCompositionDescriptor['optionalDomainFailurePolicy'];
}
export interface Forge2dWebGpuBackendOptions {
    readonly gpu?: GPU;
    readonly format?: GPUTextureFormat;
    readonly alphaMode?: GPUCanvasAlphaMode;
    readonly powerPreference?: GPUPowerPreference;
    readonly maximumPixelRatio?: number;
}
export interface Forge2dDomainOptions {
    readonly id?: string;
    readonly required?: boolean;
    readonly before?: readonly string[];
    readonly after?: readonly string[];
    readonly enabledByDefault?: boolean;
    readonly sceneIds?: readonly string[];
    readonly surfacePhase?: 'background' | 'world' | 'overlay';
    readonly surfaceLoad?: 'clear' | 'load';
    readonly surfaceAlpha?: 'opaque' | 'premultiplied';
    readonly clearColor?: readonly [number, number, number, number];
    readonly maximumPixelRatio?: number;
    readonly customShaderSources?: Readonly<Record<string, string>>;
    readonly customMaterialFallback?: 'reject' | 'builtin-sprite';
    readonly textCacheRuns?: number;
    readonly inspection?: Render2dInspectionOptions;
    readonly advancedFeatureSupport?: Readonly<{
        readonly lighting?: boolean;
        readonly hardShadows?: boolean;
        readonly pathMasks?: boolean;
        readonly effects?: readonly 'color-adjust'[];
    }>;
    readonly failAt?: Forge2dFailurePoint | readonly Forge2dFailurePoint[];
}
export type Forge2dFailurePoint = 'create' | 'probe' | 'attach' | 'shader-module' | 'bind-group-layout' | 'pipeline-layout' | 'pipeline' | 'sampler' | 'fallback-texture' | 'camera-buffer' | 'instance-buffer' | 'prepare' | 'extract' | 'encode' | 'submit-result' | 'loss' | 'recover' | 'detach' | 'destroy';
export interface Forge2dPresetCreateOptions {
    readonly canvas?: string | HTMLCanvasElement | Forge2dCanvasOptions;
    readonly size?: Forge2dSizeOptions;
    readonly boot?: string | Forge2dBootOptions;
    readonly scene?: Forge2dSceneDefinition;
    readonly scenes?: readonly Forge2dSceneDefinition[];
    readonly presentation?: Forge2dPresentationOptions;
    readonly providers?: Forge2dProviderSelections;
    readonly assets?: Forge2dAssetsOptions;
    readonly audio?: Forge2dAudioOptions;
    readonly actions?: InputActionsConfiguration;
    readonly gameplay?: GameDefinition;
    readonly plugins?: readonly ForgePluginV2Descriptor[];
    readonly inspection?: Render2dInspectionOptions & Readonly<{
        ui?: boolean;
        startup?: boolean;
        startupLane?: StartupTraceLaneV1;
    }>;
    readonly logging?: ForgeLoggingOptions;
    readonly fixedDeltaSeconds?: number;
    readonly maximumFixedSteps?: number;
}
export declare function create(options: Forge2dPresetCreateOptions): Promise<Forge2dGame>;
export declare const Forge2d: Readonly<{
    version: string;
    create: typeof create;
    scene2d: typeof scene2d;
    defineRender2d: typeof defineRender2d;
    defineLayer2d: typeof defineLayer2d;
    camera2d: typeof camera2d;
    sprite2d: typeof sprite2d;
    builtinSpriteMaterial2d: typeof builtinSpriteMaterial2d;
}>;
export default Forge2d;
