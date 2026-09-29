var V = Object.defineProperty;
var h = (e, t, n) => t in e ? V(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var O = (e, t, n) => h(e, typeof t != "symbol" ? t + "" : t, n);
const U = "1.0.0";
class F extends Error {
  constructor(n, i, o = null, r = null, c) {
    super(i);
    O(this, "code");
    O(this, "path");
    O(this, "id");
    O(this, "name", "InputActionsError");
    O(this, "cause");
    this.code = n, this.path = o, this.id = r, this.cause = c?.cause;
  }
}
function s(e, t, n, i) {
  throw new F(e, i ?? `Input Actions ${e} at "${t}".`, t, n ?? null);
}
function I(e, t) {
  (typeof e != "object" || e === null || Array.isArray(e)) && s("ACTIONS_INVALID_DEFINITION", t);
}
function d(e, t, n) {
  const i = Object.keys(e).find((o) => !t.includes(o));
  i && s("ACTIONS_INVALID_DEFINITION", `${n}.${i}`, void 0, `${n} does not allow "${i}".`);
}
function m(e, t) {
  return (typeof e != "number" || !Number.isFinite(e)) && s("ACTIONS_INVALID_DEFINITION", t), e;
}
function u(e, t) {
  const n = m(e, t);
  return n <= 0 && s("ACTIONS_INVALID_DEFINITION", t), n;
}
function b(e, t) {
  const n = m(e, t);
  return (n < 0 || n > 1) && s("ACTIONS_INVALID_DEFINITION", t), n;
}
function f(e, t) {
  switch (I(e, t), e.kind) {
    case "dead-zone": {
      d(e, ["kind", "minimum", "maximum"], t);
      const n = b(e.minimum, `${t}.minimum`), i = b(e.maximum, `${t}.maximum`);
      return n >= i && s("ACTIONS_INVALID_DEFINITION", t), Object.freeze({ kind: "dead-zone", minimum: n, maximum: i });
    }
    case "scale": {
      d(e, ["kind", "factor"], t);
      const n = Array.isArray(e.factor) ? Object.freeze([m(e.factor[0], `${t}.factor[0]`), m(e.factor[1], `${t}.factor[1]`)]) : m(e.factor, `${t}.factor`);
      return Object.freeze({ kind: "scale", factor: n });
    }
    case "invert":
      return d(e, ["kind", "x", "y"], t), (typeof e.x != "boolean" || typeof e.y != "boolean") && s("ACTIONS_INVALID_DEFINITION", t), Object.freeze({ kind: "invert", x: e.x, y: e.y });
    case "clamp": {
      d(e, ["kind", "minimum", "maximum"], t);
      const n = m(e.minimum, `${t}.minimum`), i = m(e.maximum, `${t}.maximum`);
      return n > i && s("ACTIONS_INVALID_DEFINITION", t), Object.freeze({ kind: "clamp", minimum: n, maximum: i });
    }
    case "normalize":
      return d(e, ["kind"], t), Object.freeze({ kind: "normalize" });
    case "sensitivity":
      return d(e, ["kind", "factor"], t), Object.freeze({ kind: "sensitivity", factor: u(e.factor, `${t}.factor`) });
    default:
      return s("ACTIONS_INVALID_DEFINITION", `${t}.kind`);
  }
}
function $(e, t) {
  switch (I(e, t), e.kind) {
    case "press":
      return d(e, ["kind", "behavior", "threshold"], t), ["press-only", "release-only", "press-and-release"].includes(e.behavior) || s("ACTIONS_INVALID_DEFINITION", `${t}.behavior`), Object.freeze({ kind: "press", behavior: e.behavior, threshold: b(e.threshold, `${t}.threshold`) });
    case "hold":
      return d(e, ["kind", "durationMs", "threshold"], t), Object.freeze({ kind: "hold", durationMs: u(e.durationMs, `${t}.durationMs`), threshold: b(e.threshold, `${t}.threshold`) });
    case "tap":
      return d(e, ["kind", "maximumDurationMs", "threshold"], t), Object.freeze({ kind: "tap", maximumDurationMs: u(e.maximumDurationMs, `${t}.maximumDurationMs`), threshold: b(e.threshold, `${t}.threshold`) });
    case "multi-tap":
      return d(e, ["kind", "tapCount", "maximumTapDurationMs", "maximumDelayMs", "threshold"], t), (!Number.isSafeInteger(e.tapCount) || e.tapCount < 2 || e.tapCount > 8) && s("ACTIONS_INVALID_DEFINITION", `${t}.tapCount`), Object.freeze({
        kind: "multi-tap",
        tapCount: e.tapCount,
        maximumTapDurationMs: u(e.maximumTapDurationMs, `${t}.maximumTapDurationMs`),
        maximumDelayMs: u(e.maximumDelayMs, `${t}.maximumDelayMs`),
        threshold: b(e.threshold, `${t}.threshold`)
      });
    default:
      return s("ACTIONS_INVALID_DEFINITION", `${t}.kind`);
  }
}
const M = /^[a-z0-9]+(?:[._/-][a-z0-9]+)*:[a-z0-9]+(?:[._/-][a-z0-9]+)*$/, P = /^[a-z0-9]+(?:[._/-][a-z0-9]+)*$/, K = /^<(Keyboard|Pointer|Wheel|Gamepad|Touch|Virtual)>\/[A-Za-z0-9._/-]+$/;
function _(e, t) {
  (typeof e != "string" || e.length > 160 || !M.test(e)) && s("ACTIONS_INVALID_ID", t, typeof e == "string" ? e : void 0);
}
function T(e, t) {
  (typeof e != "string" || e.length > 128 || !P.test(e)) && s("ACTIONS_INVALID_ID", t, typeof e == "string" ? e : void 0);
}
function a(e, t = "control") {
  (typeof e != "string" || e.length > 192 || !K.test(e)) && s("ACTIONS_INVALID_CONTROL_PATH", t, typeof e == "string" ? e : void 0);
}
function y(e, t, n = 0) {
  if (n > 16 && s("ACTIONS_INVALID_DEFINITION", t), e === null || typeof e == "string" || typeof e == "boolean") return e;
  if (typeof e == "number") return m(e, t);
  if (Array.isArray(e)) return Object.freeze(e.map((r, c) => y(r, `${t}[${c}]`, n + 1)));
  I(e, t);
  const i = {}, o = Object.keys(e).sort();
  o.length > 128 && s("ACTIONS_INVALID_DEFINITION", t);
  for (const r of o) i[r] = y(e[r], `${t}.${r}`, n + 1);
  return Object.freeze(i);
}
function j(e, t) {
  (!Array.isArray(e) || e.length > 32) && s("ACTIONS_INVALID_DEFINITION", t);
  const n = e.map((i, o) => (T(i, `${t}[${o}]`), i));
  return new Set(n).size !== n.length && s("ACTIONS_DUPLICATE_ID", t), Object.freeze(n);
}
function p(e, t = "binding") {
  I(e, t);
  const n = ["id", "kind", "groups", "processors", "interactions"];
  T(e.id, `${t}.id`);
  const i = j(e.groups, `${t}.groups`);
  (!Array.isArray(e.processors) || !Array.isArray(e.interactions)) && s("ACTIONS_INVALID_DEFINITION", t);
  const o = Object.freeze(e.processors.map((c, N) => f(c, `${t}.processors[${N}]`))), r = Object.freeze(e.interactions.map((c, N) => $(c, `${t}.interactions[${N}]`)));
  return e.kind === "control" ? (d(e, [...n, "control"], t), a(e.control, `${t}.control`), Object.freeze({ id: e.id, kind: "control", control: e.control, groups: i, processors: o, interactions: r })) : e.kind === "axis-composite" ? (d(e, [...n, "negative", "positive"], t), a(e.negative, `${t}.negative`), a(e.positive, `${t}.positive`), Object.freeze({ id: e.id, kind: "axis-composite", negative: e.negative, positive: e.positive, groups: i, processors: o, interactions: r })) : e.kind === "vector2-composite" ? (d(e, [...n, "up", "down", "left", "right", "normalize"], t), a(e.up, `${t}.up`), a(e.down, `${t}.down`), a(e.left, `${t}.left`), a(e.right, `${t}.right`), typeof e.normalize != "boolean" && s("ACTIONS_INVALID_DEFINITION", `${t}.normalize`), Object.freeze({
    id: e.id,
    kind: "vector2-composite",
    up: e.up,
    down: e.down,
    left: e.left,
    right: e.right,
    normalize: e.normalize,
    groups: i,
    processors: o,
    interactions: r
  })) : s("ACTIONS_INVALID_DEFINITION", `${t}.kind`);
}
function B(e, t) {
  return t === "button" ? typeof e == "boolean" : t === "axis" ? typeof e == "number" && Number.isFinite(e) : Array.isArray(e) && e.length === 2 && e.every((n) => typeof n == "number" && Number.isFinite(n));
}
function l(e, t = "map") {
  I(e, t), d(e, ["kind", "id", "actions", "enabledByDefault", "priority", "consume", "metadata", ...Object.keys(e.actions ?? {})], t), e.kind !== "action-map" && s("ACTIONS_INVALID_DEFINITION", `${t}.kind`), _(e.id, `${t}.id`), I(e.actions, `${t}.actions`), (typeof e.enabledByDefault != "boolean" || typeof e.consume != "boolean") && s("ACTIONS_INVALID_DEFINITION", t);
  const n = m(e.priority, `${t}.priority`), i = {};
  for (const r of Object.keys(e.actions).sort()) {
    T(r, `${t}.actions.${r}`);
    const c = e.actions[r];
    I(c, `${t}.actions.${r}`), (c.kind !== "action" || c.id !== `${e.id}.${r}` || c.mapId !== e.id || c.name !== r || !["button", "axis", "vector2"].includes(c.valueKind) || !B(c.default, c.valueKind)) && s("ACTIONS_INVALID_DEFINITION", `${t}.actions.${r}`);
    const N = Object.freeze(c.bindings.map((A, D) => p(A, `${t}.actions.${r}.bindings[${D}]`)));
    new Set(N.map((A) => A.id)).size !== N.length && s("ACTIONS_DUPLICATE_ID", `${t}.actions.${r}.bindings`, c.id);
    const E = Object.freeze(c.processors.map((A, D) => f(A, `${t}.actions.${r}.processors[${D}]`))), L = Object.freeze(c.interactions.map((A, D) => $(A, `${t}.actions.${r}.interactions[${D}]`))), w = Array.isArray(c.default) ? Object.freeze([...c.default]) : c.default;
    i[r] = Object.freeze({
      kind: "action",
      id: c.id,
      mapId: e.id,
      name: r,
      valueKind: c.valueKind,
      default: w,
      bindings: N,
      processors: E,
      interactions: L,
      ...c.metadata === void 0 ? {} : { metadata: y(c.metadata, `${t}.actions.${r}.metadata`) }
    });
  }
  const o = Object.freeze(i);
  return Object.freeze({
    kind: "action-map",
    id: e.id,
    actions: o,
    enabledByDefault: e.enabledByDefault,
    priority: n,
    consume: e.consume,
    ...e.metadata === void 0 ? {} : { metadata: y(e.metadata, `${t}.metadata`) },
    ...o
  });
}
function x(e, t = "scheme") {
  I(e, t), d(e, ["id", "groups", "requiredDevices", "optionalDevices", "metadata"], t), _(e.id, `${t}.id`);
  const n = (i, o) => ((!Array.isArray(i) || i.length > 16 || i.some((r) => typeof r != "string" || !/^<(Keyboard|Pointer|Wheel|Gamepad|Touch|Virtual)>$/.test(r))) && s("ACTIONS_INVALID_DEFINITION", o), Object.freeze([...new Set(i)]));
  return Object.freeze({
    id: e.id,
    groups: j(e.groups, `${t}.groups`),
    requiredDevices: n(e.requiredDevices, `${t}.requiredDevices`),
    optionalDevices: n(e.optionalDevices, `${t}.optionalDevices`),
    ...e.metadata === void 0 ? {} : { metadata: y(e.metadata, `${t}.metadata`) }
  });
}
function G(e) {
  I(e, "actions"), d(e, ["maps", "schemes", "defaultScheme", "autoSwitchScheme"], "actions"), e.maps !== void 0 && !Array.isArray(e.maps) && s("ACTIONS_INVALID_DEFINITION", "actions.maps"), e.schemes !== void 0 && !Array.isArray(e.schemes) && s("ACTIONS_INVALID_DEFINITION", "actions.schemes");
  const t = Object.freeze((e.maps ?? []).map((o, r) => l(o, `actions.maps[${r}]`))), n = Object.freeze((e.schemes ?? []).map((o, r) => x(o, `actions.schemes[${r}]`)));
  new Set(t.map((o) => o.id)).size !== t.length && s("ACTIONS_DUPLICATE_ID", "actions.maps"), new Set(n.map((o) => o.id)).size !== n.length && s("ACTIONS_DUPLICATE_ID", "actions.schemes");
  const i = e.defaultScheme;
  return i !== void 0 && typeof i != "string" && s("ACTIONS_INVALID_DEFINITION", "actions.defaultScheme"), i !== void 0 && !n.some((o) => o.id === i) && s("ACTIONS_INVALID_DEFINITION", "actions.defaultScheme", i), e.autoSwitchScheme !== void 0 && typeof e.autoSwitchScheme != "boolean" && s("ACTIONS_INVALID_DEFINITION", "actions.autoSwitchScheme"), Object.freeze({ maps: t, schemes: n, ...i === void 0 ? {} : { defaultScheme: i }, autoSwitchScheme: e.autoSwitchScheme ?? !0 });
}
function g(e, t) {
  const n = t.join("-").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${e}-${n || "binding"}`.slice(0, 128);
}
function k(e, t) {
  return {
    id: e?.id ?? t,
    groups: e?.groups ?? [],
    processors: e?.processors ?? [],
    interactions: e?.interactions ?? []
  };
}
function z(e, t) {
  if (typeof e != "object" || e === null || Array.isArray(e)) throw new TypeError(`${t} must be an object.`);
}
function C(e, t, n) {
  const i = Object.keys(e).find((o) => !t.includes(o));
  if (i) throw new TypeError(`${n} does not allow "${i}".`);
}
function S(e, t) {
  if (!Number.isSafeInteger(e) || e < 0 || e > 255) throw new TypeError(`${t} must be an integer from 0 to 255.`);
  return e;
}
const W = Object.freeze({
  key(e) {
    return `<Keyboard>/${e}`;
  },
  pointerButton(e) {
    return `<Pointer>/button/${S(e, "pointerButton.index")}`;
  },
  pointerDelta(e) {
    return `<Pointer>/delta/${e}`;
  },
  pointerPosition(e) {
    return `<Pointer>/position/${e}`;
  },
  wheel(e) {
    return `<Wheel>/${e}`;
  },
  gamepadButton(e) {
    return `<Gamepad>/button/${S(e, "gamepadButton.index")}`;
  },
  gamepadAxis(e) {
    return `<Gamepad>/axis/${S(e, "gamepadAxis.index")}`;
  },
  virtual(e) {
    return T(e, "virtual.id"), `<Virtual>/${e}`;
  }
}), H = Object.freeze({
  control(e, t) {
    return a(e), p({
      kind: "control",
      control: e,
      ...k(t, g("control", [e]))
    }, "binding");
  },
  axis(e, t, n) {
    return a(e, "binding.negative"), a(t, "binding.positive"), p({
      kind: "axis-composite",
      negative: e,
      positive: t,
      ...k(n, g("axis", [e, t]))
    }, "binding");
  },
  vector2(e) {
    return p({
      kind: "vector2-composite",
      up: e.up,
      down: e.down,
      left: e.left,
      right: e.right,
      normalize: e.normalize ?? !0,
      ...k(e, g("vector2", [e.up, e.down, e.left, e.right]))
    }, "binding");
  }
}), Z = Object.freeze({
  deadZone(e = 0.125, t = 1) {
    return f({ kind: "dead-zone", minimum: e, maximum: t }, "processor");
  },
  scale(e) {
    return f({ kind: "scale", factor: e }, "processor");
  },
  invert(e = !0, t = !1) {
    return f({ kind: "invert", x: e, y: t }, "processor");
  },
  clamp(e = -1, t = 1) {
    return f({ kind: "clamp", minimum: e, maximum: t }, "processor");
  },
  normalize() {
    return f({ kind: "normalize" }, "processor");
  },
  sensitivity(e) {
    return f({ kind: "sensitivity", factor: e }, "processor");
  }
}), J = Object.freeze({
  press(e = "press-only", t = 0.5) {
    return $({ kind: "press", behavior: e, threshold: t }, "interaction");
  },
  hold(e = 400, t = 0.5) {
    return $({ kind: "hold", durationMs: e, threshold: t }, "interaction");
  },
  tap(e = 250, t = 0.5) {
    return $({ kind: "tap", maximumDurationMs: e, threshold: t }, "interaction");
  },
  multiTap(e = 2, t = 250, n = 350, i = 0.5) {
    return $({ kind: "multi-tap", tapCount: e, maximumTapDurationMs: t, maximumDelayMs: n, threshold: i }, "interaction");
  }
});
function q(e) {
  z(e, "actionMap"), C(e, ["id", "actions", "enabledByDefault", "priority", "consume", "metadata"], "actionMap"), _(e.id, "actionMap.id"), z(e.actions, "actionMap.actions");
  const t = {};
  for (const i of Object.keys(e.actions).sort()) {
    T(i, `actionMap.actions.${i}`);
    const o = e.actions[i];
    if (z(o, `actionMap.actions.${i}`), C(o, ["kind", "default", "bindings", "processors", "interactions", "metadata"], `actionMap.actions.${i}`), !o || !["button", "axis", "vector2"].includes(o.kind)) throw new TypeError(`Unsupported action kind at actionMap.actions.${i}.kind.`);
    const r = o.kind === "button" ? !1 : o.kind === "axis" ? 0 : Object.freeze([0, 0]), c = o.default ?? r;
    t[i] = Object.freeze({
      kind: "action",
      id: `${e.id}.${i}`,
      mapId: e.id,
      name: i,
      valueKind: o.kind,
      default: c,
      bindings: Object.freeze([...o.bindings ?? []]),
      processors: Object.freeze([...o.processors ?? []]),
      interactions: Object.freeze([...o.interactions ?? []]),
      ...o.metadata === void 0 ? {} : { metadata: o.metadata }
    });
  }
  const n = {
    kind: "action-map",
    id: e.id,
    actions: Object.freeze(t),
    enabledByDefault: e.enabledByDefault ?? !0,
    priority: e.priority ?? 0,
    consume: e.consume ?? !1,
    ...e.metadata === void 0 ? {} : { metadata: e.metadata },
    ...t
  };
  return l(n);
}
const Q = q;
function X(e) {
  return _(e.id, "controlScheme.id"), x({
    id: e.id,
    groups: e.groups,
    requiredDevices: e.requiredDevices ?? [],
    optionalDevices: e.optionalDevices ?? [],
    ...e.metadata === void 0 ? {} : { metadata: e.metadata }
  });
}
export {
  U as INPUT_ACTIONS_CONTRACT_VERSION,
  F as InputActionsError,
  Q as actionMap,
  a as assertActionControlPath,
  T as assertActionLocalId,
  _ as assertActionNamespacedId,
  H as binding,
  W as controls,
  q as defineActionMap,
  X as defineControlScheme,
  J as interaction,
  Z as processor,
  p as snapshotActionBinding,
  x as snapshotActionControlScheme,
  $ as snapshotActionInteraction,
  l as snapshotActionMap,
  f as snapshotActionProcessor,
  G as validateInputActionsConfiguration
};
//# sourceMappingURL=input-actions-contract.esm.js.map
