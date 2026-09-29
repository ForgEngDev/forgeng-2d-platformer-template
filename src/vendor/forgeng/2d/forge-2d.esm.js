var Ue = Object.defineProperty;
var qe = (n, e, t) => e in n ? Ue(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var M = (n, e, t) => qe(n, typeof e != "symbol" ? e + "" : e, t);
const Nt = 1, Ot = "1.0.0", Lt = 1, Vt = 1;
class Fe extends TypeError {
  constructor(t, r, i) {
    super(`${t} at ${r}: ${i}`);
    M(this, "code");
    M(this, "path");
    this.code = t, this.path = r, this.name = "Render2dContractError";
  }
}
const u = Object.freeze({
  idLength: 160,
  extensionCount: 32,
  extensionJsonDepth: 64,
  extensionJsonNodes: 65536,
  extensionJsonKeyLength: 256,
  extensionJsonStringLength: 1048576,
  layers: 256,
  cameras: 64,
  samplers: 256,
  materials: 1024,
  sprites: 1e5,
  tilemaps: 512,
  tilemapDependencies: 512,
  tilemapPatches: 65536,
  tilemapChunkDimension: 1024,
  tilemapRetainedChunks: 4096,
  texts: 1e4,
  animations: 1e4,
  particles: 1024,
  lights: 4096,
  masks: 4096,
  renderTargets: 128,
  features: 128,
  animationTracks: 256,
  animationKeyframes: 16384,
  animationEvents: 4096,
  animationEventQueue: 16384,
  animationAdvanceTicks: 1e4,
  textLength: 65536,
  textGlyphs: 65536,
  textFallbackFonts: 16,
  textCacheRuns: 2048,
  particleCapacity: 1e6,
  particleSceneCapacity: 1e6,
  particleBurst: 65536,
  particleCurveKeys: 64,
  particleAdvanceWork: 1e7,
  visibleLightsPerCamera: 64,
  shadowCasters: 4096,
  shadowSegmentsPerCamera: 8192,
  pathMaskPoints: 256,
  effects: 32,
  effectPasses: 64,
  textureDimension2d: 16384,
  textureArrayLayers: 2048,
  metricsCounters: 64,
  inspectionItems: 2048
}), te = (n) => Object.freeze([n[0], n[1], n[2], n[3]]), j = (n) => Object.freeze([n[0], n[1]]);
function ht(n = {}) {
  const e = n.logicalSize ?? [1, 1], t = n.pixelRatio ?? 1, r = n.maximumPixelRatio ?? 4, i = n.physicalSize ?? [
    e[0] * t,
    e[1] * t
  ], s = n.safeArea ?? [0, 0, 0, 0], o = n.revision ?? 0, l = [...e, ...i, t, r, ...s];
  if (!Number.isSafeInteger(o) || o < 0 || l.some((m) => !Number.isFinite(m)) || e.some((m) => m <= 0) || i.some((m) => m <= 0) || t <= 0 || r <= 0 || s.some((m) => m < 0))
    throw new TypeError("Render2D surface values must be finite, positive, and have a non-negative safe revision.");
  if (Math.abs(i[0] - e[0] * t) > 1 || Math.abs(i[1] - e[1] * t) > 1)
    throw new TypeError("Render2D CSS/logical/physical canvas sizes disagree with pixelRatio.");
  if (s[0] + s[2] >= e[0] || s[1] + s[3] >= e[1])
    throw new TypeError("Render2D safe-area insets must leave a positive logical surface.");
  const f = Math.min(t, r);
  return Object.freeze({
    revision: o,
    logicalSize: j(e),
    physicalSize: j([
      Math.max(1, Math.round(e[0] * f)),
      Math.max(1, Math.round(e[1] * f))
    ]),
    pixelRatio: f,
    maximumPixelRatio: r,
    safeArea: Object.freeze([s[0], s[1], s[2], s[3]]),
    visible: n.visible ?? !0
  });
}
function Ne(n) {
  const [e, t, r, i, s, o] = n, l = e * i - t * r;
  if (!Number.isFinite(l) || Math.abs(l) <= Number.EPSILON)
    throw new TypeError("Render2D camera matrix is singular.");
  const f = 1 / l, m = i * f, d = -t * f, p = -r * f, b = e * f;
  return Object.freeze([m, d, p, b, -(m * s + p * o), -(d * s + b * o)]);
}
function oe(n, e) {
  return j([
    n[0] * e[0] + n[2] * e[1] + n[4],
    n[1] * e[0] + n[3] * e[1] + n[5]
  ]);
}
function Oe(n, e, t, r) {
  const i = n.rotation ?? 0, s = Math.cos(-i), o = Math.sin(-i), l = s * t[0], f = o * t[1], m = -o * t[0], d = s * t[1], p = (n.space ?? "world") === "screen" ? e[0] : e[0] + e[2] * 0.5, b = (n.space ?? "world") === "screen" ? e[1] : e[1] + e[3] * 0.5;
  return Object.freeze([
    l,
    f,
    m,
    d,
    p - l * r[0] - m * r[1],
    b - f * r[0] - d * r[1]
  ]);
}
function Ge(n, e, t, r, i) {
  if ((n.pixelSnap ?? "off") === "off")
    return j(i);
  const s = Oe(n, e, t, i), o = oe(s, [0, 0]), l = j([
    Math.round(o[0] * r[0]) / r[0],
    Math.round(o[1] * r[1]) / r[1]
  ]), f = Ne(Object.freeze([s[0], s[1], s[2], s[3], 0, 0])), m = [l[0] - o[0], l[1] - o[1]], d = oe(f, m);
  return j([i[0] - d[0], i[1] - d[1]]);
}
function De(n, e) {
  const t = Math.round(n[0] * e[0]), r = Math.round(n[1] * e[1]), i = Math.round((n[0] + n[2]) * e[0]), s = Math.round((n[1] + n[3]) * e[1]);
  return te([t, r, Math.max(1, i - t), Math.max(1, s - r)]);
}
function vt(n, e) {
  const t = n.safeArea === !1 ? [0, 0, 0, 0] : e.safeArea, r = Math.max(Number.EPSILON, e.logicalSize[0] - t[0] - t[2]), i = Math.max(Number.EPSILON, e.logicalSize[1] - t[1] - t[3]), s = n.viewport ?? [0, 0, 1, 1], o = te([
    t[0] + s[0] * r,
    t[1] + s[1] * i,
    Math.max(Number.EPSILON, s[2] * r),
    Math.max(Number.EPSILON, s[3] * i)
  ]), l = o[2] / n.virtualSize[0], f = o[3] / n.virtualSize[1], m = n.scaleMode ?? "fit";
  let d = l, p = f;
  if (m !== "stretch") {
    let A = m === "fill" ? Math.max(l, f) : m === "none" ? 1 : Math.min(l, f);
    m === "integer-fit" && A >= 1 && (A = Math.max(1, Math.floor(A))), d = A, p = A;
  }
  const b = n.zoom ?? 1;
  d *= b, p *= b;
  const S = j([d, p]), R = n.virtualSize[0] * d, C = n.virtualSize[1] * p, N = te([
    o[0] + (o[2] - R) * 0.5,
    o[1] + (o[3] - C) * 0.5,
    R,
    C
  ]), T = j([
    e.physicalSize[0] / e.logicalSize[0],
    e.physicalSize[1] / e.logicalSize[1]
  ]), K = De(o, T), ne = De(N, T), Q = j([n.position?.[0] ?? 0, n.position?.[1] ?? 0]), ye = Ge(n, N, S, T, Q), c = Oe(n, N, S, ye), E = Object.freeze([
    Math.max(0, N[0] - o[0]),
    Math.max(0, N[1] - o[1]),
    Math.max(0, o[0] + o[2] - N[0] - N[2]),
    Math.max(0, o[1] + o[3] - N[1] - N[3])
  ]), D = Object.freeze([
    Math.max(0, o[0] - N[0]),
    Math.max(0, o[1] - N[1]),
    Math.max(0, N[0] + N[2] - o[0] - o[2]),
    Math.max(0, N[1] + N[3] - o[1] - o[3])
  ]);
  return Object.freeze({
    id: n.id,
    order: n.order ?? 0,
    space: n.space ?? "world",
    scaleMode: m,
    pixelSnap: n.pixelSnap ?? "off",
    sampling: n.sampling ?? "asset",
    logicalViewport: o,
    physicalViewport: K,
    logicalContentRect: N,
    physicalContentRect: ne,
    letterbox: E,
    crop: D,
    virtualSize: j(n.virtualSize),
    scale: S,
    position: Q,
    effectivePosition: ye,
    rotation: n.rotation ?? 0,
    zoom: b,
    layers: Object.freeze([...n.layers ?? []]),
    targetId: n.target ?? "surface",
    clearColor: n.clearColor ?? null,
    physicalRatio: T,
    worldToLogical: c,
    logicalToWorld: Ne(c)
  });
}
function Le(n, e) {
  return oe(n.worldToLogical, e);
}
function Ve(n, e) {
  return oe(n.logicalToWorld, e);
}
function kt(n, e) {
  const t = Le(n, e);
  return j([t[0] * n.physicalRatio[0], t[1] * n.physicalRatio[1]]);
}
function Ct(n, e) {
  return Ve(n, [
    e[0] / n.physicalRatio[0],
    e[1] / n.physicalRatio[1]
  ]);
}
function Tt(n, e) {
  if (n.pixelSnap !== "camera-and-items")
    return te(e);
  const t = Le(n, [e[0], e[1]]), r = [
    Math.round(t[0] * n.physicalRatio[0]) / n.physicalRatio[0],
    Math.round(t[1] * n.physicalRatio[1]) / n.physicalRatio[1]
  ], i = Ve(n, r);
  return te([
    e[0] + i[0] - e[0],
    e[1] + i[1] - e[1],
    e[2],
    e[3]
  ]);
}
const He = /^[a-z][a-z0-9.-]*:[a-z0-9][a-z0-9._/-]*$/, de = /^[A-Za-z_][A-Za-z0-9_]*$/, be = ["rgba8unorm", "rgba8unorm-srgb", "bgra8unorm", "bgra8unorm-srgb", "rgba16float"], ce = [1, 2, 4, 8], me = ["id", "entity", "layer", "transform", "parent", "order", "visible", "opacity", "tint", "mask", "target", "extensions"];
function a(n, e, t) {
  throw new Fe(n, e, t);
}
function $(n, e, t) {
  (typeof n != "object" || n === null || Array.isArray(n)) && a("R2D_VALUE_INVALID", e, "expected an object.");
  const r = n;
  if (t)
    for (const i of Object.keys(r))
      t.includes(i) || a("R2D_UNKNOWN_KEY", `${e}.${i}`, `unknown key "${i}".`);
  return r;
}
function U(n, e, t = u.idLength) {
  return (typeof n != "string" || n.length === 0 || n.length > t) && a("R2D_VALUE_INVALID", e, `expected a non-empty string of at most ${t} characters.`), n;
}
function y(n, e) {
  const t = U(n, e);
  return He.test(t) || a("R2D_ID_INVALID", e, "expected a normalized namespaced ID."), t;
}
function _(n, e, t, r) {
  return (typeof n != "number" || !Number.isFinite(n)) && a("R2D_VALUE_INVALID", e, "expected a finite number."), t !== void 0 && n < t && a("R2D_VALUE_INVALID", e, `expected a value >= ${t}.`), r !== void 0 && n > r && a("R2D_VALUE_INVALID", e, `expected a value <= ${r}.`), n;
}
function g(n, e, t = 0, r = Number.MAX_SAFE_INTEGER) {
  const i = _(n, e, t, r);
  return Number.isSafeInteger(i) || a("R2D_VALUE_INVALID", e, "expected a safe integer."), i;
}
function z(n, e) {
  return typeof n != "boolean" && a("R2D_VALUE_INVALID", e, "expected a boolean."), n;
}
function x(n, e, t) {
  return (typeof n != "string" || !t.includes(n)) && a("R2D_VALUE_INVALID", e, `expected one of ${t.join(", ")}.`), n;
}
function q(n, e, t, r, i) {
  return (!Array.isArray(n) || n.length !== t) && a("R2D_VALUE_INVALID", e, `expected a ${t}-number tuple.`), Object.freeze(n.map((s, o) => _(s, `${e}[${o}]`, r, i)));
}
function G(n, e) {
  return q(n, e, 2);
}
function ue(n, e) {
  return q(n, e, 2, Number.EPSILON);
}
function X(n, e) {
  const t = q(n, e, 4);
  return (t[2] < 0 || t[3] < 0) && a("R2D_VALUE_INVALID", e, "rectangle width and height must be non-negative."), t;
}
function F(n, e) {
  return q(n, e, 4, 0, 1);
}
function Y(n, e, t) {
  const r = q(n, e, 2, t);
  return r[0] > r[1] && a("R2D_VALUE_INVALID", e, "range minimum must not exceed maximum."), r;
}
function xe(n, e, t, r) {
  if (t.nodes += 1, t.nodes > u.extensionJsonNodes && a("R2D_LIMIT_EXCEEDED", e, `extension JSON exceeds ${u.extensionJsonNodes} values.`), r > u.extensionJsonDepth && a("R2D_LIMIT_EXCEEDED", e, `extension JSON exceeds depth ${u.extensionJsonDepth}.`), n === null || typeof n == "boolean")
    return n;
  if (typeof n == "string")
    return n.length > u.extensionJsonStringLength && a("R2D_LIMIT_EXCEEDED", e, `extension string exceeds ${u.extensionJsonStringLength} characters.`), n;
  if (typeof n == "number")
    return _(n, e);
  (typeof n != "object" || n === null) && a("R2D_VALUE_INVALID", e, "expected a JSON value.");
  const i = n;
  t.active.has(i) && a("R2D_GRAPH_CYCLE", e, "extension JSON contains a reference cycle."), t.active.add(i);
  try {
    if (Array.isArray(n))
      return n.length > u.extensionJsonNodes && a("R2D_LIMIT_EXCEEDED", e, `extension array exceeds ${u.extensionJsonNodes} values.`), Object.freeze(n.map((f, m) => xe(f, `${e}[${m}]`, t, r + 1)));
    const s = $(n, e), o = Object.keys(s).sort();
    o.length > u.extensionJsonNodes && a("R2D_LIMIT_EXCEEDED", e, `extension object exceeds ${u.extensionJsonNodes} keys.`);
    const l = {};
    for (const f of o)
      f.length > u.extensionJsonKeyLength && a("R2D_LIMIT_EXCEEDED", e, `extension key exceeds ${u.extensionJsonKeyLength} characters.`), l[f] = xe(s[f], `${e}.${f}`, t, r + 1);
    return Object.freeze(l);
  } finally {
    t.active.delete(i);
  }
}
function B(n, e) {
  return xe(n, e, { active: /* @__PURE__ */ new WeakSet(), nodes: 0 }, 0);
}
function Be(n, e) {
  const t = $(n, e), r = Object.keys(t).sort();
  r.length > u.extensionCount && a("R2D_LIMIT_EXCEEDED", e, `maximum is ${u.extensionCount}.`);
  const i = {};
  for (const s of r) {
    y(s, `${e}.${s}`);
    const o = $(t[s], `${e}.${s}`, ["version", "value"]);
    i[s] = Object.freeze({ version: g(o.version, `${e}.${s}.version`, 1), value: B(o.value, `${e}.${s}.value`) });
  }
  return Object.freeze(i);
}
function v(n, e) {
  return n.extensions === void 0 ? {} : { extensions: Be(n.extensions, `${e}.extensions`) };
}
function le(n, e) {
  const t = $(n, e, ["position", "rotation", "scale"]);
  return Object.freeze({ position: G(t.position, `${e}.position`), rotation: _(t.rotation, `${e}.rotation`), scale: G(t.scale, `${e}.scale`) });
}
function fe(n, e, t) {
  const r = $(n, e, ["kind", "id"]);
  return Object.freeze({ kind: x(r.kind, `${e}.kind`, t), id: y(r.id, `${e}.id`) });
}
function Re(n, e) {
  const t = $(n, e, ["before", "after", "zIndex"]), r = (i, s) => (Array.isArray(i) || a("R2D_VALUE_INVALID", s, "expected an array."), Object.freeze(i.map((o, l) => fe(o, `${s}[${l}]`, ["item", "layer"]))));
  return Object.freeze({ ...t.before === void 0 ? {} : { before: r(t.before, `${e}.before`) }, ...t.after === void 0 ? {} : { after: r(t.after, `${e}.after`) }, ...t.zIndex === void 0 ? {} : { zIndex: g(t.zIndex, `${e}.zIndex`, -2147483648, 2147483647) } });
}
function L(n, e, t, r) {
  return Array.isArray(n) || a("R2D_VALUE_INVALID", e, "expected an array."), n.length > t && a("R2D_LIMIT_EXCEEDED", e, `maximum is ${t}.`), Object.freeze(n.map((i, s) => r(i, `${e}[${s}]`)));
}
function k(n, e) {
  return L(n, e, u.inspectionItems, (t, r) => y(t, r));
}
function pe(n, e) {
  return {
    id: y(n.id, `${e}.id`),
    entity: y(n.entity, `${e}.entity`),
    layer: y(n.layer, `${e}.layer`),
    ...n.transform === void 0 ? {} : { transform: le(n.transform, `${e}.transform`) },
    ...n.parent === void 0 ? {} : { parent: fe(n.parent, `${e}.parent`, ["entity"]) },
    ...n.order === void 0 ? {} : { order: Re(n.order, `${e}.order`) },
    visible: n.visible === void 0 ? !0 : z(n.visible, `${e}.visible`),
    opacity: n.opacity === void 0 ? 1 : _(n.opacity, `${e}.opacity`, 0, 1),
    tint: n.tint === void 0 ? Object.freeze([1, 1, 1, 1]) : F(n.tint, `${e}.tint`),
    ...n.mask === void 0 ? {} : { mask: y(n.mask, `${e}.mask`) },
    ...n.target === void 0 ? {} : { target: y(n.target, `${e}.target`) },
    ...v(n, e)
  };
}
function Ye(n, e) {
  const t = $(n, e, [...me, "texture", "sourceTarget", "normalTexture", "material", "region", "size", "anchor", "flipX", "flipY", "nineSlice"]);
  return t.texture === void 0 == (t.sourceTarget === void 0) && a("R2D_VALUE_INVALID", e, "sprite requires exactly one of texture or sourceTarget."), Object.freeze({ ...pe(t, e), ...t.texture === void 0 ? {} : { texture: y(t.texture, `${e}.texture`) }, ...t.sourceTarget === void 0 ? {} : { sourceTarget: y(t.sourceTarget, `${e}.sourceTarget`) }, ...t.normalTexture === void 0 ? {} : { normalTexture: y(t.normalTexture, `${e}.normalTexture`) }, material: y(t.material, `${e}.material`), ...t.region === void 0 ? {} : { region: X(t.region, `${e}.region`) }, ...t.size === void 0 ? {} : { size: ue(t.size, `${e}.size`) }, anchor: t.anchor === void 0 ? Object.freeze([0.5, 0.5]) : q(t.anchor, `${e}.anchor`, 2, 0, 1), flipX: t.flipX === void 0 ? !1 : z(t.flipX, `${e}.flipX`), flipY: t.flipY === void 0 ? !1 : z(t.flipY, `${e}.flipY`), ...t.nineSlice === void 0 ? {} : { nineSlice: q(t.nineSlice, `${e}.nineSlice`, 4, 0) } });
}
function We(n, e) {
  const t = $(n, e, [...me, "tilemap", "material", "tileSize", "chunkSize", "layerIndices", "tilesetTextures", "imageLayerTextures", "streaming"]), r = t.streaming === void 0 ? void 0 : $(t.streaming, `${e}.streaming`, ["preloadMarginChunks", "lowWaterChunks", "highWaterChunks", "chunksPerSlice"]), i = r?.lowWaterChunks === void 0 ? 128 : g(r.lowWaterChunks, `${e}.streaming.lowWaterChunks`, 1, u.tilemapRetainedChunks), s = r?.highWaterChunks === void 0 ? 192 : g(r.highWaterChunks, `${e}.streaming.highWaterChunks`, 1, u.tilemapRetainedChunks);
  return s < i && a("R2D_VALUE_INVALID", `${e}.streaming.highWaterChunks`, "highWaterChunks must be greater than or equal to lowWaterChunks."), Object.freeze({
    ...pe(t, e),
    tilemap: y(t.tilemap, `${e}.tilemap`),
    material: y(t.material, `${e}.material`),
    tileSize: ue(t.tileSize, `${e}.tileSize`),
    chunkSize: t.chunkSize === void 0 ? Object.freeze([32, 32]) : q(t.chunkSize, `${e}.chunkSize`, 2, 1, u.tilemapChunkDimension),
    layerIndices: t.layerIndices === void 0 ? Object.freeze([]) : L(t.layerIndices, `${e}.layerIndices`, 256, (o, l) => g(o, l)),
    tilesetTextures: t.tilesetTextures === void 0 ? Object.freeze([]) : k(t.tilesetTextures, `${e}.tilesetTextures`),
    imageLayerTextures: t.imageLayerTextures === void 0 ? Object.freeze([]) : k(t.imageLayerTextures, `${e}.imageLayerTextures`),
    streaming: Object.freeze({
      preloadMarginChunks: r?.preloadMarginChunks === void 0 ? 1 : g(r.preloadMarginChunks, `${e}.streaming.preloadMarginChunks`, 0, 16),
      lowWaterChunks: i,
      highWaterChunks: s,
      chunksPerSlice: r?.chunksPerSlice === void 0 ? 32 : g(r.chunksPerSlice, `${e}.streaming.chunksPerSlice`, 1, 1024)
    })
  });
}
function Je(n, e) {
  const t = $(n, e, [...me, "text", "font", "fallbackFonts", "material", "fontSize", "lineHeight", "maxWidth", "maxHeight", "wrap", "align", "verticalAlign", "direction", "shaping", "letterSpacing", "wordSpacing", "tabSize", "missingGlyph", "replacementCodePoint"]);
  (typeof t.text != "string" || t.text.length > u.textLength) && a("R2D_VALUE_INVALID", `${e}.text`, `expected a string of at most ${u.textLength} characters.`);
  const r = t.text;
  r.length > 0 && [...r].length > u.textGlyphs && a("R2D_LIMIT_EXCEEDED", `${e}.text`, `text exceeds ${u.textGlyphs} Unicode scalars.`);
  const i = t.fallbackFonts === void 0 ? Object.freeze([]) : k(t.fallbackFonts, `${e}.fallbackFonts`);
  i.length > u.textFallbackFonts && a("R2D_LIMIT_EXCEEDED", `${e}.fallbackFonts`, `fallback chain exceeds ${u.textFallbackFonts} fonts.`);
  const s = y(t.font, `${e}.font`);
  return (i.includes(s) || new Set(i).size !== i.length) && a("R2D_VALUE_INVALID", `${e}.fallbackFonts`, "fallback font IDs must be unique and must not repeat the primary font."), Object.freeze({
    ...pe(t, e),
    text: r,
    font: s,
    fallbackFonts: i,
    material: y(t.material, `${e}.material`),
    fontSize: _(t.fontSize, `${e}.fontSize`, Number.EPSILON),
    lineHeight: t.lineHeight === void 0 ? 1.2 : _(t.lineHeight, `${e}.lineHeight`, Number.EPSILON),
    ...t.maxWidth === void 0 ? {} : { maxWidth: _(t.maxWidth, `${e}.maxWidth`, Number.EPSILON) },
    ...t.maxHeight === void 0 ? {} : { maxHeight: _(t.maxHeight, `${e}.maxHeight`, Number.EPSILON) },
    wrap: t.wrap === void 0 ? t.maxWidth === void 0 ? "none" : "word" : x(t.wrap, `${e}.wrap`, ["none", "word", "character"]),
    align: t.align === void 0 ? "start" : x(t.align, `${e}.align`, ["start", "center", "end", "justify"]),
    verticalAlign: t.verticalAlign === void 0 ? "top" : x(t.verticalAlign, `${e}.verticalAlign`, ["top", "middle", "bottom"]),
    direction: t.direction === void 0 ? "auto" : x(t.direction, `${e}.direction`, ["ltr", "rtl", "auto"]),
    shaping: t.shaping === void 0 ? "basic" : x(t.shaping, `${e}.shaping`, ["none", "basic", "advanced-provider"]),
    letterSpacing: t.letterSpacing === void 0 ? 0 : _(t.letterSpacing, `${e}.letterSpacing`),
    wordSpacing: t.wordSpacing === void 0 ? 0 : _(t.wordSpacing, `${e}.wordSpacing`),
    tabSize: t.tabSize === void 0 ? 4 : g(t.tabSize, `${e}.tabSize`, 1, 32),
    missingGlyph: t.missingGlyph === void 0 ? "replace" : x(t.missingGlyph, `${e}.missingGlyph`, ["replace", "skip", "error"]),
    replacementCodePoint: t.replacementCodePoint === void 0 ? 65533 : g(t.replacementCodePoint, `${e}.replacementCodePoint`, 0, 1114111)
  });
}
function Xe(n, e) {
  const t = $(n, e, ["id", "entity", "kind", "transform", "parent", "color", "intensity", "enabled", "radius", "direction", "layers", "shadow", "extensions"]), r = x(t.kind, `${e}.kind`, ["ambient", "directional", "point"]);
  r === "point" && t.radius === void 0 && a("R2D_VALUE_INVALID", `${e}.radius`, "point lights require radius.");
  const i = t.shadow === void 0 ? void 0 : $(t.shadow, `${e}.shadow`, ["enabled", "mode", "maxCasters"]);
  return i && r !== "point" && a("R2D_VALUE_INVALID", `${e}.shadow`, "hard shadows are supported only for point lights."), Object.freeze({ id: y(t.id, `${e}.id`), entity: y(t.entity, `${e}.entity`), kind: r, ...t.transform === void 0 ? {} : { transform: le(t.transform, `${e}.transform`) }, ...t.parent === void 0 ? {} : { parent: fe(t.parent, `${e}.parent`, ["entity"]) }, color: F(t.color, `${e}.color`), intensity: _(t.intensity, `${e}.intensity`, 0), enabled: t.enabled === void 0 ? !0 : z(t.enabled, `${e}.enabled`), ...t.radius === void 0 ? {} : { radius: _(t.radius, `${e}.radius`, Number.EPSILON) }, ...t.direction === void 0 ? {} : { direction: _(t.direction, `${e}.direction`) }, layers: t.layers === void 0 ? Object.freeze([]) : k(t.layers, `${e}.layers`), ...i === void 0 ? {} : { shadow: Object.freeze({ enabled: i.enabled === void 0 ? !0 : z(i.enabled, `${e}.shadow.enabled`), mode: i.mode === void 0 ? "hard" : x(i.mode, `${e}.shadow.mode`, ["hard"]), maxCasters: i.maxCasters === void 0 ? 128 : g(i.maxCasters, `${e}.shadow.maxCasters`, 0, u.shadowCasters) }) }, ...v(t, e) });
}
function Ke(n, e) {
  const t = $(n, e, ["id", "entity", "kind", "transform", "parent", "rect", "texture", "region", "points", "inverted", "extensions"]), r = x(t.kind, `${e}.kind`, ["scissor", "sprite", "path"]);
  r === "scissor" && t.rect === void 0 && a("R2D_VALUE_INVALID", `${e}.rect`, "scissor masks require a rectangle."), r === "sprite" && t.texture === void 0 && a("R2D_VALUE_INVALID", `${e}.texture`, "sprite masks require a texture.");
  const i = t.points === void 0 ? void 0 : L(t.points, `${e}.points`, u.pathMaskPoints, (s, o) => G(s, o));
  return r === "path" && (!i || i.length < 3) && a("R2D_VALUE_INVALID", `${e}.points`, "path masks require at least three points."), Object.freeze({ id: y(t.id, `${e}.id`), entity: y(t.entity, `${e}.entity`), kind: r, ...t.transform === void 0 ? {} : { transform: le(t.transform, `${e}.transform`) }, ...t.parent === void 0 ? {} : { parent: fe(t.parent, `${e}.parent`, ["entity"]) }, ...t.rect === void 0 ? {} : { rect: X(t.rect, `${e}.rect`) }, ...t.texture === void 0 ? {} : { texture: y(t.texture, `${e}.texture`) }, ...t.region === void 0 ? {} : { region: X(t.region, `${e}.region`) }, ...i === void 0 ? {} : { points: i }, inverted: t.inverted === void 0 ? !1 : z(t.inverted, `${e}.inverted`), ...v(t, e) });
}
function Qe(n, e) {
  const t = $(n, e, ["time", "value", "easing"]), r = t.value, i = typeof r == "number" ? _(r, `${e}.value`) : Array.isArray(r) && r.length === 2 ? G(r, `${e}.value`) : F(r, `${e}.value`);
  return Object.freeze({ time: _(t.time, `${e}.time`, 0), value: i, easing: t.easing === void 0 ? "linear" : x(t.easing, `${e}.easing`, ["linear", "step", "ease-in", "ease-out", "ease-in-out"]) });
}
function Ze(n, e) {
  const t = $(n, e, ["id", "asset", "clip", "target", "duration", "fixedStepHz", "loop", "playbackRate", "autoplay", "tracks", "events", "extensions"]), r = _(t.duration, `${e}.duration`, Number.EPSILON), i = L(t.tracks, `${e}.tracks`, u.animationTracks, (f, m) => {
    const d = $(f, m, ["target", "property", "keyframes"]), p = x(d.property, `${m}.property`, ["position", "rotation", "scale", "opacity", "tint", "frame"]), b = L(d.keyframes, `${m}.keyframes`, u.animationKeyframes, Qe);
    let S = -1;
    return b.length === 0 && a("R2D_VALUE_INVALID", `${m}.keyframes`, "animation track requires at least one keyframe."), b.forEach((R, C) => {
      (R.time < S || R.time > r) && a("R2D_VALUE_INVALID", `${m}.keyframes[${C}].time`, "keyframes must be ordered within duration."), S = R.time;
    }), b.forEach((R, C) => {
      const N = typeof R.value == "number", T = Array.isArray(R.value) ? R.value.length : 0;
      (p === "position" || p === "scale" ? T !== 2 : p === "tint" ? T !== 4 : !N) && a("R2D_VALUE_INVALID", `${m}.keyframes[${C}].value`, `value does not match ${p} track.`);
    }), Object.freeze({ target: y(d.target, `${m}.target`), property: p, keyframes: b });
  }), s = t.events === void 0 ? Object.freeze([]) : L(t.events, `${e}.events`, u.animationEvents, (f, m) => {
    const d = $(f, m, ["time", "name"]);
    return Object.freeze({ time: _(d.time, `${m}.time`, 0, r), name: U(d.name, `${m}.name`) });
  });
  for (let f = 1; f < s.length; f++)
    s[f].time < s[f - 1].time && a("R2D_VALUE_INVALID", `${e}.events[${f}].time`, "events must be ordered by time.");
  const o = t.asset === void 0 ? void 0 : y(t.asset, `${e}.asset`), l = t.clip === void 0 ? void 0 : U(t.clip, `${e}.clip`);
  return (o === void 0 != (l === void 0) || o !== void 0 && t.target === void 0) && a("R2D_VALUE_INVALID", e, "asset, clip, and target must be supplied together for Animation2dProduct presentation."), Object.freeze({
    id: y(t.id, `${e}.id`),
    ...o === void 0 ? {} : { asset: o, clip: l, target: y(t.target, `${e}.target`) },
    duration: r,
    fixedStepHz: t.fixedStepHz === void 0 ? 60 : g(t.fixedStepHz, `${e}.fixedStepHz`, 1, 1e3),
    loop: t.loop === void 0 ? "none" : x(t.loop, `${e}.loop`, ["none", "repeat", "ping-pong"]),
    playbackRate: t.playbackRate === void 0 ? 1 : _(t.playbackRate, `${e}.playbackRate`, Number.EPSILON, 64),
    autoplay: t.autoplay === void 0 ? !1 : z(t.autoplay, `${e}.autoplay`),
    tracks: i,
    events: s,
    ...v(t, e)
  });
}
function Ae(n, e) {
  const t = $(n, e, ["keys"]), r = L(t.keys, `${e}.keys`, u.particleCurveKeys, (i, s) => {
    const o = $(i, s, ["t", "value"]);
    return Object.freeze({ t: _(o.t, `${s}.t`, 0, 1), value: _(o.value, `${s}.value`, 0) });
  });
  r.length === 0 && a("R2D_VALUE_INVALID", `${e}.keys`, "particle curve requires at least one key.");
  for (let i = 1; i < r.length; i++)
    r[i].t <= r[i - 1].t && a("R2D_VALUE_INVALID", `${e}.keys[${i}].t`, "particle curve keys must be strictly ordered.");
  return Object.freeze({ keys: r });
}
function et(n, e) {
  const t = $(n, e, [...me, "texture", "material", "capacity", "emissionRate", "lifetime", "speed", "angle", "gravity", "size", "fixedStepHz", "seed", "autoplay", "duration", "loop", "offscreen", "maxBurst", "rotation", "angularVelocity", "sizeCurve", "opacityCurve", "colorStart", "colorEnd"]);
  return Object.freeze({
    ...pe(t, e),
    ...t.texture === void 0 ? {} : { texture: y(t.texture, `${e}.texture`) },
    material: y(t.material, `${e}.material`),
    capacity: g(t.capacity, `${e}.capacity`, 1, u.particleCapacity),
    emissionRate: _(t.emissionRate, `${e}.emissionRate`, 0),
    lifetime: Y(t.lifetime, `${e}.lifetime`, Number.EPSILON),
    speed: t.speed === void 0 ? Object.freeze([0, 0]) : Y(t.speed, `${e}.speed`, 0),
    angle: t.angle === void 0 ? Object.freeze([0, 0]) : Y(t.angle, `${e}.angle`),
    gravity: t.gravity === void 0 ? Object.freeze([0, 0]) : G(t.gravity, `${e}.gravity`),
    size: t.size === void 0 ? Object.freeze([1, 1]) : Y(t.size, `${e}.size`, 0),
    fixedStepHz: t.fixedStepHz === void 0 ? 60 : g(t.fixedStepHz, `${e}.fixedStepHz`, 1, 1e3),
    seed: t.seed === void 0 ? 1 : g(t.seed, `${e}.seed`, 1, 4294967295),
    autoplay: t.autoplay === void 0 ? !0 : z(t.autoplay, `${e}.autoplay`),
    ...t.duration === void 0 ? {} : { duration: _(t.duration, `${e}.duration`, Number.EPSILON) },
    loop: t.loop === void 0 ? !0 : z(t.loop, `${e}.loop`),
    offscreen: t.offscreen === void 0 ? "continue" : x(t.offscreen, `${e}.offscreen`, ["continue", "pause-when-hidden"]),
    maxBurst: t.maxBurst === void 0 ? Math.min(1024, g(t.capacity, `${e}.capacity`, 1, u.particleCapacity)) : g(t.maxBurst, `${e}.maxBurst`, 0, u.particleBurst),
    rotation: t.rotation === void 0 ? Object.freeze([0, 0]) : Y(t.rotation, `${e}.rotation`),
    angularVelocity: t.angularVelocity === void 0 ? Object.freeze([0, 0]) : Y(t.angularVelocity, `${e}.angularVelocity`),
    ...t.sizeCurve === void 0 ? {} : { sizeCurve: Ae(t.sizeCurve, `${e}.sizeCurve`) },
    ...t.opacityCurve === void 0 ? {} : { opacityCurve: Ae(t.opacityCurve, `${e}.opacityCurve`) },
    colorStart: t.colorStart === void 0 ? Object.freeze([1, 1, 1, 1]) : F(t.colorStart, `${e}.colorStart`),
    colorEnd: t.colorEnd === void 0 ? Object.freeze([1, 1, 1, 0]) : F(t.colorEnd, `${e}.colorEnd`)
  });
}
const J = "forgeng.render2d:lighting-v1", Ie = "forgeng.render2d:effects-v1", Ee = "forgeng.render2d:path-masks-v1";
function jt(n) {
  if (!n.id || n.size === void 0 == (n.scale === void 0))
    throw new TypeError("Render2D ping-pong pair requires an id and exactly one of size or scale.");
  const e = `${n.id}:a`, t = `${n.id}:b`, r = (i) => Object.freeze({ id: i, ...n.size ? { size: Object.freeze([...n.size]) } : { scale: n.scale }, format: n.format ?? "rgba8unorm", sampleCount: 1, persistent: !0 });
  return Object.freeze({
    targets: Object.freeze([r(e), r(t)]),
    read: (i) => (Se(i), i % 2 === 0 ? e : t),
    write: (i) => (Se(i), i % 2 === 0 ? t : e)
  });
}
function Se(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new TypeError("Render2D ping-pong frame must be a non-negative safe integer.");
}
function tt(n, e) {
  const t = $(n, e, ["id", "entity", "kind", "transform", "rect", "points", "layers", "enabled", "extensions"]), r = x(t.kind, `${e}.kind`, ["rect", "polygon"]), i = t.points === void 0 ? void 0 : L(t.points, `${e}.points`, u.pathMaskPoints, (s, o) => G(s, o));
  return r === "rect" && t.rect === void 0 && a("R2D_VALUE_INVALID", `${e}.rect`, "rect shadow casters require a rectangle."), r === "polygon" && (!i || i.length < 3) && a("R2D_VALUE_INVALID", `${e}.points`, "polygon shadow casters require at least three points."), Object.freeze({
    id: y(t.id, `${e}.id`),
    entity: y(t.entity, `${e}.entity`),
    kind: r,
    ...t.transform === void 0 ? {} : { transform: le(t.transform, `${e}.transform`) },
    ...t.rect === void 0 ? {} : { rect: X(t.rect, `${e}.rect`) },
    ...i === void 0 ? {} : { points: i },
    layers: t.layers === void 0 ? Object.freeze([]) : k(t.layers, `${e}.layers`),
    enabled: t.enabled === void 0 ? !0 : z(t.enabled, `${e}.enabled`),
    ...v(t, e)
  });
}
function nt(n, e) {
  const t = $(n, e, ["id", "kind", "input", "output", "enabled", "required", "order", "options", "extensions"]), r = t.options === void 0 ? {} : $(t.options, `${e}.options`, ["brightness", "contrast", "saturation"]);
  return Object.freeze({
    id: y(t.id, `${e}.id`),
    kind: x(t.kind, `${e}.kind`, ["color-adjust"]),
    input: y(t.input, `${e}.input`),
    output: t.output === "surface" ? "surface" : y(t.output, `${e}.output`),
    enabled: t.enabled === void 0 ? !0 : z(t.enabled, `${e}.enabled`),
    required: t.required === void 0 ? !1 : z(t.required, `${e}.required`),
    order: t.order === void 0 ? 0 : g(t.order, `${e}.order`, -2147483648, 2147483647),
    options: Object.freeze({ brightness: r.brightness === void 0 ? 0 : _(r.brightness, `${e}.options.brightness`, -1, 1), contrast: r.contrast === void 0 ? 1 : _(r.contrast, `${e}.options.contrast`, 0, 4), saturation: r.saturation === void 0 ? 1 : _(r.saturation, `${e}.options.saturation`, 0, 4) }),
    ...v(t, e)
  });
}
function rt(n, e) {
  if (n.capability !== J)
    return n;
  const t = $(n.options ?? {}, `${e}.options`, ["maxLightsPerCamera", "shadows", "maxShadowSegmentsPerCamera"]);
  return Object.freeze({ ...n, options: Object.freeze({
    maxLightsPerCamera: t.maxLightsPerCamera === void 0 ? 32 : g(t.maxLightsPerCamera, `${e}.options.maxLightsPerCamera`, 1, u.visibleLightsPerCamera),
    shadows: t.shadows === void 0 ? "off" : x(t.shadows, `${e}.options.shadows`, ["off", "hard"]),
    maxShadowSegmentsPerCamera: t.maxShadowSegmentsPerCamera === void 0 ? 2048 : g(t.maxShadowSegmentsPerCamera, `${e}.options.maxShadowSegmentsPerCamera`, 0, u.shadowSegmentsPerCamera)
  }) });
}
function it(n) {
  const e = new Map(n.renderTargets.map((d) => [d.id, d])), t = new Set(n.features.map((d) => d.capability)), r = new Map(n.materials.map((d) => [d.id, d])), i = new Map(n.renderTargets.map((d) => [d.id, /* @__PURE__ */ new Set()])), s = /* @__PURE__ */ new Set(), o = (d, p, b) => {
    e.has(d) || a("R2D_REFERENCE_MISSING", b, `missing input target "${d}".`), p !== "surface" && !e.has(p) && a("R2D_REFERENCE_MISSING", b, `missing output target "${p}".`), d === p && a("R2D_GRAPH_CYCLE", b, "render-target feedback requires an explicit ping-pong pair."), s.add(d), p !== "surface" && i.get(d).add(p);
  };
  n.sprites.forEach((d, p) => {
    const b = r.get(d.material);
    if (b?.builtin === "sprite-lit" && !d.normalTexture && a("R2D_VALUE_INVALID", `$.sprites[${p}].normalTexture`, "sprite-lit materials require a normal texture."), d.normalTexture && b?.builtin !== "sprite-lit" && a("R2D_VALUE_INVALID", `$.sprites[${p}].normalTexture`, "normal textures require the sprite-lit material."), b?.builtin === "sprite-lit" && !t.has(J) && a("R2D_CAPABILITY_UNSUPPORTED", `$.sprites[${p}].material`, `sprite-lit requires ${J}.`), !d.sourceTarget)
      return;
    const S = d.target ? [d.target] : n.cameras.filter((R) => (R.layers ?? []).length === 0 || (R.layers ?? []).includes(d.layer)).map((R) => R.target ?? "surface");
    for (const R of S)
      o(d.sourceTarget, R, `$.sprites[${p}].sourceTarget`);
  }), n.effects.forEach((d, p) => o(d.input, d.output, `$.effects[${p}]`)), n.effects.length > 0 && !t.has(Ie) && a("R2D_CAPABILITY_UNSUPPORTED", "$.effects", `effects require ${Ie}.`), n.masks.some((d) => d.kind === "path") && !t.has(Ee) && a("R2D_CAPABILITY_UNSUPPORTED", "$.masks", `path masks require ${Ee}.`), n.lights.some((d) => d.shadow?.enabled) && !t.has(J) && a("R2D_CAPABILITY_UNSUPPORTED", "$.lights", `hard shadows require ${J}.`);
  for (const d of s)
    (e.get(d)?.sampleCount ?? 1) !== 1 && a("R2D_VALUE_INVALID", "$.renderTargets", `sampled target "${d}" must use sampleCount 1.`);
  const l = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), m = (d) => {
    l.has(d) && a("R2D_GRAPH_CYCLE", "$.renderTargets", `render-target cycle includes "${d}"; use createRender2dPingPongPair for temporal feedback.`), !f.has(d) && (l.add(d), i.get(d).forEach(m), l.delete(d), f.add(d));
  };
  for (const d of i.keys())
    m(d);
}
const Pt = Object.freeze([J, Ie, Ee]);
function he(n, e) {
  if (n === "f32")
    return typeof e == "number" && Number.isFinite(e);
  if (!Array.isArray(e))
    return !1;
  const t = n === "vec2f" ? 2 : 4;
  return e.length === t && e.every((r) => typeof r == "number" && Number.isFinite(r));
}
function st(n, e = "$") {
  const t = $(n, e, ["apiVersion", "uniforms", "textures"]);
  t.apiVersion !== 1 && a("R2D_VERSION_UNSUPPORTED", `${e}.apiVersion`, "expected 1.");
  const r = /* @__PURE__ */ new Set();
  let i = 0;
  const s = L(t.uniforms ?? [], `${e}.uniforms`, 12, (f, m) => {
    const d = $(f, m, ["name", "type", "required", "default"]), p = U(d.name, `${m}.name`, 64);
    de.test(p) || a("R2D_VALUE_INVALID", `${m}.name`, "expected an identifier."), r.has(p) && a("R2D_ID_DUPLICATE", `${m}.name`, `duplicate field "${p}".`), r.add(p);
    const b = x(d.type, `${m}.type`, ["f32", "vec2f", "vec4f"]);
    return i += b === "f32" ? 1 : b === "vec2f" ? 2 : 4, i > 12 && a("R2D_LIMIT_EXCEEDED", `${e}.uniforms`, "custom uniforms exceed the 48-byte material region."), d.default !== void 0 && !he(b, d.default) && a("R2D_VALUE_INVALID", `${m}.default`, `default does not match ${b}.`), Object.freeze({ name: p, type: b, required: d.required === void 0 ? !1 : z(d.required, `${m}.required`), ...d.default === void 0 ? {} : { default: Object.freeze(Array.isArray(d.default) ? [...d.default] : d.default) } });
  }), o = /* @__PURE__ */ new Set(), l = L(t.textures ?? [], `${e}.textures`, 2, (f, m) => {
    const d = $(f, m, ["name", "source", "sampleType", "required"]), p = U(d.name, `${m}.name`, 64);
    de.test(p) || a("R2D_VALUE_INVALID", `${m}.name`, "expected an identifier."), r.has(p) && a("R2D_ID_DUPLICATE", `${m}.name`, `duplicate field "${p}".`), r.add(p);
    const b = x(d.source, `${m}.source`, ["sprite", "normal"]);
    return o.has(b) && a("R2D_ID_DUPLICATE", `${m}.source`, `duplicate texture source "${b}".`), o.add(b), Object.freeze({ name: p, source: b, sampleType: x(d.sampleType, `${m}.sampleType`, ["float"]), required: d.required === void 0 ? b === "sprite" : z(d.required, `${m}.required`) });
  });
  return l.some((f) => f.source === "sprite" && f.required) || a("R2D_VALUE_INVALID", `${e}.textures`, "a required sprite texture binding is mandatory."), Object.freeze({ apiVersion: 1, uniforms: s, textures: l });
}
function at(n, e, t = "$.parameters") {
  const r = new Map(n.uniforms.map((s) => [s.name, s]));
  for (const s of Object.keys(e)) {
    const o = r.get(s);
    o || a("R2D_UNKNOWN_KEY", `${t}.${s}`, "parameter is not declared by the material schema."), he(o.type, e[s]) || a("R2D_VALUE_INVALID", `${t}.${s}`, `value does not match ${o.type}.`);
  }
  const i = { ...e };
  for (const s of n.uniforms)
    i[s.name] === void 0 && s.default !== void 0 && (i[s.name] = s.default), i[s.name] === void 0 && s.required && a("R2D_VALUE_INVALID", `${t}.${s.name}`, "required parameter is missing.");
  return Object.freeze(i);
}
function ot(n, e) {
  const t = $(n, e, ["id", "order", "visible", "opacity", "extensions"]);
  return Object.freeze({ id: y(t.id, `${e}.id`), ...t.order === void 0 ? {} : { order: Re(t.order, `${e}.order`) }, visible: t.visible === void 0 ? !0 : z(t.visible, `${e}.visible`), opacity: t.opacity === void 0 ? 1 : _(t.opacity, `${e}.opacity`, 0, 1), ...v(t, e) });
}
function dt(n, e) {
  const t = $(n, e, ["id", "order", "viewport", "virtualSize", "scaleMode", "pixelSnap", "space", "safeArea", "sampling", "position", "rotation", "zoom", "clearColor", "layers", "target", "extensions"]), r = t.viewport === void 0 ? Object.freeze([0, 0, 1, 1]) : X(t.viewport, `${e}.viewport`);
  return (r[0] < 0 || r[1] < 0 || r[2] <= 0 || r[3] <= 0 || r[0] + r[2] > 1 || r[1] + r[3] > 1) && a("R2D_VALUE_INVALID", `${e}.viewport`, "camera viewport must be a positive normalized rectangle inside 0..1."), Object.freeze({
    id: y(t.id, `${e}.id`),
    order: t.order === void 0 ? 0 : g(t.order, `${e}.order`, -2147483648, 2147483647),
    viewport: r,
    virtualSize: ue(t.virtualSize, `${e}.virtualSize`),
    scaleMode: t.scaleMode === void 0 ? "fit" : x(t.scaleMode, `${e}.scaleMode`, ["stretch", "fit", "fill", "integer-fit", "none"]),
    pixelSnap: t.pixelSnap === void 0 ? "off" : x(t.pixelSnap, `${e}.pixelSnap`, ["off", "camera", "camera-and-items"]),
    space: t.space === void 0 ? "world" : x(t.space, `${e}.space`, ["world", "screen"]),
    safeArea: t.safeArea === void 0 ? !0 : z(t.safeArea, `${e}.safeArea`),
    sampling: t.sampling === void 0 ? "asset" : x(t.sampling, `${e}.sampling`, ["asset", "nearest", "linear"]),
    position: t.position === void 0 ? Object.freeze([0, 0]) : G(t.position, `${e}.position`),
    rotation: t.rotation === void 0 ? 0 : _(t.rotation, `${e}.rotation`),
    zoom: t.zoom === void 0 ? 1 : _(t.zoom, `${e}.zoom`, Number.EPSILON),
    clearColor: t.clearColor === void 0 || t.clearColor === null ? null : F(t.clearColor, `${e}.clearColor`),
    layers: t.layers === void 0 ? Object.freeze([]) : k(t.layers, `${e}.layers`),
    ...t.target === void 0 ? {} : { target: y(t.target, `${e}.target`) },
    ...v(t, e)
  });
}
function ct(n, e) {
  const t = $(n, e, ["id", "minFilter", "magFilter", "mipmapFilter", "addressU", "addressV", "maxAnisotropy", "extensions"]);
  return Object.freeze({ id: y(t.id, `${e}.id`), minFilter: t.minFilter === void 0 ? "linear" : x(t.minFilter, `${e}.minFilter`, ["nearest", "linear"]), magFilter: t.magFilter === void 0 ? "linear" : x(t.magFilter, `${e}.magFilter`, ["nearest", "linear"]), mipmapFilter: t.mipmapFilter === void 0 ? "linear" : x(t.mipmapFilter, `${e}.mipmapFilter`, ["nearest", "linear"]), addressU: t.addressU === void 0 ? "clamp-to-edge" : x(t.addressU, `${e}.addressU`, ["clamp-to-edge", "repeat", "mirror-repeat"]), addressV: t.addressV === void 0 ? "clamp-to-edge" : x(t.addressV, `${e}.addressV`, ["clamp-to-edge", "repeat", "mirror-repeat"]), maxAnisotropy: t.maxAnisotropy === void 0 ? 1 : g(t.maxAnisotropy, `${e}.maxAnisotropy`, 1, 16), ...v(t, e) });
}
function mt(n, e) {
  const t = $(n, e, ["id", "kind", "builtin", "shaderAsset", "shaderAbi", "schema", "sampler", "blendMode", "depthMode", "reorderSafe", "parameters", "extensions"]), r = x(t.kind, `${e}.kind`, ["builtin", "custom"]);
  r === "builtin" && t.shaderAsset !== void 0 && a("R2D_VALUE_INVALID", `${e}.shaderAsset`, "builtin materials cannot define a shader asset."), r === "custom" && t.shaderAsset === void 0 && a("R2D_VALUE_INVALID", `${e}.shaderAsset`, "custom materials require a shader asset.");
  const i = t.shaderAbi === void 0 ? void 0 : (() => {
    const d = $(t.shaderAbi, `${e}.shaderAbi`, ["version", "vertexEntry", "fragmentEntry", "bindings", "attributes"]);
    d.version !== 1 && a("R2D_VERSION_UNSUPPORTED", `${e}.shaderAbi.version`, "expected 1.");
    const p = d.bindings === void 0 ? [] : L(d.bindings, `${e}.shaderAbi.bindings`, 32, (b, S) => {
      const R = $(b, S, ["name", "kind", "valueType", "group", "binding", "visibility"]), C = U(R.name, `${S}.name`, 64);
      return de.test(C) || a("R2D_VALUE_INVALID", `${S}.name`, "expected an identifier."), Object.freeze({ name: C, kind: x(R.kind, `${S}.kind`, ["uniform", "texture", "sampler", "storage-read"]), ...R.valueType === void 0 ? {} : { valueType: x(R.valueType, `${S}.valueType`, ["f32", "vec2f", "vec3f", "vec4f", "mat3x2f", "mat4x4f"]) }, ...R.group === void 0 ? {} : { group: g(R.group, `${S}.group`, 0, 0) }, ...R.binding === void 0 ? {} : { binding: g(R.binding, `${S}.binding`, 0, 4) }, ...R.visibility === void 0 ? {} : { visibility: x(R.visibility, `${S}.visibility`, ["vertex", "fragment", "vertex-fragment"]) } });
    });
    return Object.freeze({ version: 1, vertexEntry: U(d.vertexEntry, `${e}.shaderAbi.vertexEntry`, 64), fragmentEntry: U(d.fragmentEntry, `${e}.shaderAbi.fragmentEntry`, 64), bindings: p, attributes: d.attributes === void 0 ? Object.freeze([]) : L(d.attributes, `${e}.shaderAbi.attributes`, 8, (b, S) => x(b, S, ["position", "uv", "color", "instance-transform"])) });
  })(), s = {};
  if (t.parameters !== void 0)
    for (const [d, p] of Object.entries($(t.parameters, `${e}.parameters`)).sort(([b], [S]) => b.localeCompare(S)))
      de.test(d) || a("R2D_VALUE_INVALID", `${e}.parameters.${d}`, "expected an identifier key."), s[d] = typeof p == "number" ? _(p, `${e}.parameters.${d}`) : Array.isArray(p) && p.length === 2 ? G(p, `${e}.parameters.${d}`) : F(p, `${e}.parameters.${d}`);
  const o = t.schema === void 0 ? void 0 : st(t.schema, `${e}.schema`), l = o === void 0 ? Object.freeze(s) : at(o, s, `${e}.parameters`), f = t.blendMode === void 0 ? "alpha" : x(t.blendMode, `${e}.blendMode`, ["opaque", "alpha", "premultiplied-alpha", "add", "multiply", "screen"]), m = t.reorderSafe === void 0 ? !1 : z(t.reorderSafe, `${e}.reorderSafe`);
  return m && f !== "opaque" && a("R2D_VALUE_INVALID", `${e}.reorderSafe`, "only opaque materials may opt into reorder-safe grouping."), Object.freeze({ id: y(t.id, `${e}.id`), kind: r, ...t.builtin === void 0 ? {} : { builtin: x(t.builtin, `${e}.builtin`, ["sprite", "sprite-lit", "bitmap-text", "msdf-text", "particle"]) }, ...t.shaderAsset === void 0 ? {} : { shaderAsset: y(t.shaderAsset, `${e}.shaderAsset`) }, ...i === void 0 ? {} : { shaderAbi: i }, ...o === void 0 ? {} : { schema: o }, ...t.sampler === void 0 ? {} : { sampler: y(t.sampler, `${e}.sampler`) }, blendMode: f, depthMode: t.depthMode === void 0 ? "disabled" : x(t.depthMode, `${e}.depthMode`, ["disabled", "read", "read-write"]), reorderSafe: m, parameters: l, ...v(t, e) });
}
function ut(n, e) {
  const t = $(n, e, ["id", "size", "scale", "format", "sampleCount", "clearColor", "persistent", "extensions"]);
  t.size === void 0 && t.scale === void 0 && a("R2D_VALUE_INVALID", e, "render target requires size or scale."), t.size !== void 0 && t.scale !== void 0 && a("R2D_VALUE_INVALID", e, "render target size and scale are mutually exclusive.");
  const r = t.sampleCount === void 0 ? 1 : g(t.sampleCount, `${e}.sampleCount`, 1, 8);
  return ce.includes(r) || a("R2D_VALUE_INVALID", `${e}.sampleCount`, "expected 1, 2, 4, or 8."), Object.freeze({ id: y(t.id, `${e}.id`), ...t.size === void 0 ? {} : { size: ue(t.size, `${e}.size`) }, ...t.scale === void 0 ? {} : { scale: _(t.scale, `${e}.scale`, Number.EPSILON, 4) }, format: t.format === void 0 ? "rgba8unorm-srgb" : x(t.format, `${e}.format`, be), sampleCount: r, clearColor: t.clearColor === void 0 ? Object.freeze([0, 0, 0, 0]) : F(t.clearColor, `${e}.clearColor`), persistent: t.persistent === void 0 ? !1 : z(t.persistent, `${e}.persistent`), ...v(t, e) });
}
function lt(n, e) {
  const t = $(n, e, ["id", "capability", "required", "order", "options", "extensions"]), r = {};
  if (t.options !== void 0)
    for (const [i, s] of Object.entries($(t.options, `${e}.options`)).sort(([o], [l]) => o.localeCompare(l)))
      r[i] = B(s, `${e}.options.${i}`);
  return rt(Object.freeze({ id: y(t.id, `${e}.id`), capability: y(t.capability, `${e}.capability`), required: t.required === void 0 ? !1 : z(t.required, `${e}.required`), ...t.order === void 0 ? {} : { order: Re(t.order, `${e}.order`) }, options: Object.freeze(r), ...v(t, e) }), e);
}
function ft(n) {
  const e = [n.layers, n.cameras, n.samplers, n.materials, n.sprites, n.tilemaps, n.texts, n.animations, n.particles, n.lights, n.masks, n.shadowCasters, n.renderTargets, n.effects, n.features], t = ["layers", "cameras", "samplers", "materials", "sprites", "tilemaps", "texts", "animations", "particles", "lights", "masks", "shadowCasters", "renderTargets", "effects", "features"], r = /* @__PURE__ */ new Map();
  e.forEach((c, E) => c.forEach((D, A) => {
    const P = r.get(D.id);
    P && a("R2D_ID_DUPLICATE", `$.${t[E]}[${A}].id`, `duplicate "${D.id}" first declared at ${P}.`), r.set(D.id, `$.${t[E]}[${A}].id`);
  }));
  const i = new Set(n.layers.map((c) => c.id)), s = new Set(n.materials.map((c) => c.id)), o = new Set(n.samplers.map((c) => c.id)), l = new Set(n.masks.map((c) => c.id)), f = new Set(n.renderTargets.map((c) => c.id)), m = [...n.sprites, ...n.tilemaps, ...n.texts, ...n.particles], d = new Set([...m, ...n.features].map((c) => c.id)), p = /* @__PURE__ */ new Map(), b = (c, E, D) => {
    E !== void 0 && !c.has(E) && a("R2D_REFERENCE_MISSING", D, `missing reference "${E}".`);
  };
  n.materials.forEach((c, E) => b(o, c.sampler, `$.materials[${E}].sampler`)), n.cameras.forEach((c, E) => {
    c.layers?.forEach((D, A) => b(i, D, `$.cameras[${E}].layers[${A}]`)), b(f, c.target, `$.cameras[${E}].target`);
  }), m.forEach((c, E) => {
    const D = E < n.sprites.length ? "sprites" : E < n.sprites.length + n.tilemaps.length ? "tilemaps" : E < n.sprites.length + n.tilemaps.length + n.texts.length ? "texts" : "particles", A = D === "sprites" ? 0 : D === "tilemaps" ? n.sprites.length : D === "texts" ? n.sprites.length + n.tilemaps.length : n.sprites.length + n.tilemaps.length + n.texts.length, P = `$.${D}[${E - A}]`;
    b(i, c.layer, `${P}.layer`), b(s, c.material, `${P}.material`), b(l, c.mask, `${P}.mask`), b(f, c.target, `${P}.target`);
    const re = c.parent?.id, ge = p.get(c.entity);
    p.has(c.entity) && ge !== re && a("R2D_VALUE_INVALID", `${P}.parent`, `entity "${c.entity}" has conflicting parents.`), p.set(c.entity, re);
  }), [...n.lights, ...n.masks].forEach((c) => {
    p.has(c.entity) || p.set(c.entity, c.parent?.id);
  });
  for (const [c, E] of p)
    E !== void 0 && !p.has(E) && a("R2D_REFERENCE_MISSING", "$.parent", `entity "${c}" references missing parent "${E}".`);
  const S = (c, E, D) => {
    if (E.has(c) && a("R2D_GRAPH_CYCLE", "$.parent", `parent cycle includes "${c}".`), D.has(c))
      return;
    E.add(c);
    const A = p.get(c);
    A !== void 0 && S(A, E, D), E.delete(c), D.add(c);
  }, R = /* @__PURE__ */ new Set();
  for (const c of p.keys())
    S(c, /* @__PURE__ */ new Set(), R);
  const C = /* @__PURE__ */ new Set([...i, ...d]), N = new Map([...C].map((c) => [c, /* @__PURE__ */ new Set()])), T = (c, E) => {
    for (const D of ["before", "after"])
      c.order?.[D]?.forEach((A, P) => {
        b(A.kind === "layer" ? i : d, A.id, `${E}.order.${D}[${P}].id`);
        const re = D === "before" ? c.id : A.id, ge = D === "before" ? A.id : c.id;
        N.get(re).add(ge);
      });
  };
  n.layers.forEach((c, E) => T(c, `$.layers[${E}]`)), m.forEach((c, E) => T(c, `$.items[${E}]`)), n.features.forEach((c, E) => T(c, `$.features[${E}]`));
  const K = /* @__PURE__ */ new Set(), ne = /* @__PURE__ */ new Set(), Q = (c) => {
    K.has(c) && a("R2D_GRAPH_CYCLE", "$.order", `ordering cycle includes "${c}".`), !ne.has(c) && (K.add(c), N.get(c).forEach(Q), K.delete(c), ne.add(c));
  };
  C.forEach(Q), n.animations.forEach((c, E) => c.tracks.forEach((D, A) => b(d, D.target, `$.animations[${E}].tracks[${A}].target`))), n.animations.forEach((c, E) => b(d, c.target, `$.animations[${E}].target`)), n.lights.forEach((c, E) => c.layers?.forEach((D, A) => b(i, D, `$.lights[${E}].layers[${A}]`))), n.shadowCasters.forEach((c, E) => c.layers?.forEach((D, A) => b(i, D, `$.shadowCasters[${E}].layers[${A}]`))), n.particles.reduce((c, E) => c + E.capacity, 0) > u.particleSceneCapacity && a("R2D_LIMIT_EXCEEDED", "$.particles", `total particle capacity exceeds ${u.particleSceneCapacity}.`), it(n);
}
function ve(n) {
  const e = $(n, "$", ["contractVersion", "id", "version", "coordinateSystem", "colorSpace", "layers", "cameras", "samplers", "materials", "sprites", "tilemaps", "texts", "animations", "particles", "lights", "masks", "shadowCasters", "renderTargets", "effects", "features", "extensions"]);
  e.contractVersion !== 1 && a("R2D_VERSION_UNSUPPORTED", "$.contractVersion", "expected 1.");
  const t = (i, s, o) => L(e[i] ?? [], `$.${i}`, s, o), r = Object.freeze({
    contractVersion: 1,
    id: y(e.id, "$.id"),
    version: e.version === void 0 ? 1 : g(e.version, "$.version", 1),
    coordinateSystem: e.coordinateSystem === void 0 ? "x-right-y-down-clockwise-radians" : x(e.coordinateSystem, "$.coordinateSystem", ["x-right-y-down-clockwise-radians"]),
    colorSpace: e.colorSpace === void 0 ? "srgb-straight-alpha" : x(e.colorSpace, "$.colorSpace", ["srgb-straight-alpha"]),
    layers: t("layers", u.layers, ot),
    cameras: t("cameras", u.cameras, dt),
    samplers: t("samplers", u.samplers, ct),
    materials: t("materials", u.materials, mt),
    sprites: t("sprites", u.sprites, Ye),
    tilemaps: t("tilemaps", u.tilemaps, We),
    texts: t("texts", u.texts, Je),
    animations: t("animations", u.animations, Ze),
    particles: t("particles", u.particles, et),
    lights: t("lights", u.lights, Xe),
    masks: t("masks", u.masks, Ke),
    shadowCasters: t("shadowCasters", u.shadowCasters, tt),
    renderTargets: t("renderTargets", u.renderTargets, ut),
    effects: t("effects", u.effects, nt),
    features: t("features", u.features, lt),
    ...v(e, "$")
  });
  return ft(r), r;
}
function Mt(n) {
  return ve(n);
}
function ke(n, e, t) {
  const r = $(n, e, ["textureFormats", "maxTextureDimension2d", "maxTextureArrayLayers", "sampleCounts", "timestampQueries", "storageBuffers", "textureArrays", "masks", "lighting", "effects", "extensions"]), i = r.textureFormats === void 0 ? [] : L(r.textureFormats, `${e}.textureFormats`, be.length, (l, f) => x(l, f, be)), s = r.sampleCounts === void 0 ? [] : L(r.sampleCounts, `${e}.sampleCounts`, ce.length, (l, f) => {
    const m = g(l, f, 1, 8);
    return ce.includes(m) || a("R2D_VALUE_INVALID", f, "expected 1, 2, 4, or 8."), m;
  }), o = {
    ...t || r.textureFormats !== void 0 ? { textureFormats: i } : {},
    ...t || r.maxTextureDimension2d !== void 0 ? { maxTextureDimension2d: g(r.maxTextureDimension2d ?? 0, `${e}.maxTextureDimension2d`, 0, u.textureDimension2d) } : {},
    ...t || r.maxTextureArrayLayers !== void 0 ? { maxTextureArrayLayers: g(r.maxTextureArrayLayers ?? 0, `${e}.maxTextureArrayLayers`, 0, u.textureArrayLayers) } : {},
    ...t || r.sampleCounts !== void 0 ? { sampleCounts: s } : {},
    ...Object.fromEntries(["timestampQueries", "storageBuffers", "textureArrays", "masks", "lighting"].filter((l) => t || r[l] !== void 0).map((l) => [l, r[l] === void 0 ? !1 : z(r[l], `${e}.${l}`)])),
    ...t || r.effects !== void 0 ? { effects: r.effects === void 0 ? Object.freeze([]) : k(r.effects, `${e}.effects`) } : {},
    ...v(r, e)
  };
  return Object.freeze(o);
}
function pt(n) {
  return ke(n, "$", !1);
}
function yt(n) {
  return ke(n, "$", !0);
}
function wt(n, e) {
  const t = pt(n), r = yt(e), i = [], s = (o, l, f, m) => i.push(Object.freeze({ code: o, path: l, requested: f, available: m }));
  t.textureFormats?.forEach((o, l) => {
    r.textureFormats.includes(o) || s("R2D_FORMAT_UNSUPPORTED", `$.textureFormats[${l}]`, o, r.textureFormats);
  }), t.sampleCounts?.forEach((o, l) => {
    r.sampleCounts.includes(o) || s("R2D_SAMPLE_COUNT_UNSUPPORTED", `$.sampleCounts[${l}]`, o, r.sampleCounts);
  }), (t.maxTextureDimension2d ?? 0) > r.maxTextureDimension2d && s("R2D_LIMIT_EXCEEDED", "$.maxTextureDimension2d", t.maxTextureDimension2d, r.maxTextureDimension2d), (t.maxTextureArrayLayers ?? 0) > r.maxTextureArrayLayers && s("R2D_LIMIT_EXCEEDED", "$.maxTextureArrayLayers", t.maxTextureArrayLayers, r.maxTextureArrayLayers);
  for (const o of ["timestampQueries", "storageBuffers", "textureArrays", "masks", "lighting"])
    t[o] === !0 && !r[o] && s("R2D_CAPABILITY_MISSING", `$.${o}`, !0, !1);
  return t.effects?.forEach((o, l) => {
    r.effects.includes(o) || s("R2D_CAPABILITY_MISSING", `$.effects[${l}]`, o, r.effects);
  }), Object.freeze({ compatible: i.length === 0, requested: t, effective: r, rejections: Object.freeze(i) });
}
function $e(n, e = "$") {
  const t = $(n, e, ["snapshotVersion", "resolutionScale", "sampleCount", "textureFilter", "lighting", "masks", "effects"]);
  t.snapshotVersion !== void 0 && t.snapshotVersion !== 1 && a("R2D_VERSION_UNSUPPORTED", `${e}.snapshotVersion`, "expected 1.");
  const r = t.sampleCount === void 0 ? 1 : g(t.sampleCount, `${e}.sampleCount`, 1, 8);
  return ce.includes(r) || a("R2D_VALUE_INVALID", `${e}.sampleCount`, "expected 1, 2, 4, or 8."), Object.freeze({ snapshotVersion: 1, resolutionScale: t.resolutionScale === void 0 ? 1 : _(t.resolutionScale, `${e}.resolutionScale`, 0.25, 2), sampleCount: r, textureFilter: t.textureFilter === void 0 ? "linear" : x(t.textureFilter, `${e}.textureFilter`, ["nearest", "linear"]), lighting: t.lighting === void 0 ? !1 : z(t.lighting, `${e}.lighting`), masks: t.masks === void 0 ? !0 : z(t.masks, `${e}.masks`), effects: t.effects === void 0 ? Object.freeze([]) : k(t.effects, `${e}.effects`) });
}
function Ut(n) {
  const e = $(n, "$", ["snapshotVersion", "revision", "definitionId", "generation", "phase", "requested", "effective", "committed", "rejections"]);
  e.snapshotVersion !== 1 && a("R2D_VERSION_UNSUPPORTED", "$.snapshotVersion", "expected 1.");
  const t = L(e.rejections, "$.rejections", u.features, (r, i) => {
    const s = $(r, i, ["code", "path", "requested", "available"]);
    return Object.freeze({ code: x(s.code, `${i}.code`, ["R2D_CAPABILITY_MISSING", "R2D_LIMIT_EXCEEDED", "R2D_FORMAT_UNSUPPORTED", "R2D_SAMPLE_COUNT_UNSUPPORTED"]), path: U(s.path, `${i}.path`, 512), requested: B(s.requested, `${i}.requested`), available: B(s.available, `${i}.available`) });
  });
  return Object.freeze({ snapshotVersion: 1, revision: g(e.revision, "$.revision"), definitionId: y(e.definitionId, "$.definitionId"), generation: g(e.generation, "$.generation", 1), phase: x(e.phase, "$.phase", ["created", "probing", "initializing", "ready", "attaching", "attached", "extracting", "contributing", "lost", "recovering", "failed", "detaching", "destroying", "destroyed"]), requested: $e(e.requested, "$.requested"), effective: $e(e.effective, "$.effective"), committed: e.committed === null ? null : $e(e.committed, "$.committed"), rejections: t });
}
function gt(n, e) {
  const t = $(n, e, ["id", "kind", "entity", "layer", "order", "bounds", "opacity", "tint", "assetIds", "transform", "materialId", "targetId", "maskId"]), r = t.transform === void 0 ? void 0 : q(t.transform, `${e}.transform`, 6);
  return Object.freeze({ id: y(t.id, `${e}.id`), kind: x(t.kind, `${e}.kind`, ["sprite", "tilemap", "text", "particle", "light", "mask"]), entity: y(t.entity, `${e}.entity`), layer: y(t.layer, `${e}.layer`), order: g(t.order, `${e}.order`, -2147483648, 2147483647), bounds: X(t.bounds, `${e}.bounds`), opacity: _(t.opacity, `${e}.opacity`, 0, 1), tint: F(t.tint, `${e}.tint`), assetIds: k(t.assetIds, `${e}.assetIds`), ...r === void 0 ? {} : { transform: r }, ...t.materialId === void 0 ? {} : { materialId: y(t.materialId, `${e}.materialId`) }, ...t.targetId === void 0 ? {} : { targetId: y(t.targetId, `${e}.targetId`) }, ...t.maskId === void 0 ? {} : { maskId: t.maskId === null ? null : y(t.maskId, `${e}.maskId`) } });
}
function qt(n) {
  const e = $(n, "$", ["snapshotVersion", "sceneId", "sceneGeneration", "frame", "simulationTick", "alpha", "cameraIds", "items"]);
  return e.snapshotVersion !== 1 && a("R2D_VERSION_UNSUPPORTED", "$.snapshotVersion", "expected 1."), Object.freeze({ snapshotVersion: 1, sceneId: y(e.sceneId, "$.sceneId"), sceneGeneration: g(e.sceneGeneration, "$.sceneGeneration", 1), frame: g(e.frame, "$.frame"), simulationTick: g(e.simulationTick, "$.simulationTick"), alpha: _(e.alpha, "$.alpha", 0, 1), cameraIds: k(e.cameraIds, "$.cameraIds"), items: L(e.items, "$.items", u.inspectionItems, gt) });
}
function $t(n) {
  const e = $(n, "$", ["snapshotVersion", "frame", "visibleItems", "culledItems", "drawItems", "logicalBatches", "textureBindings", "triangles", "extractionMicros", "contributionMicros", "counters"]);
  e.snapshotVersion !== 1 && a("R2D_VERSION_UNSUPPORTED", "$.snapshotVersion", "expected 1.");
  const t = $(e.counters, "$.counters"), r = Object.keys(t).sort();
  r.length > u.metricsCounters && a("R2D_LIMIT_EXCEEDED", "$.counters", `maximum is ${u.metricsCounters}.`);
  const i = {};
  r.forEach((o) => {
    i[o] = _(t[o], `$.counters.${o}`, 0);
  });
  const s = (o, l) => o === null ? null : _(o, l, 0);
  return Object.freeze({ snapshotVersion: 1, frame: g(e.frame, "$.frame"), visibleItems: g(e.visibleItems, "$.visibleItems"), culledItems: g(e.culledItems, "$.culledItems"), drawItems: g(e.drawItems, "$.drawItems"), logicalBatches: g(e.logicalBatches, "$.logicalBatches"), textureBindings: g(e.textureBindings, "$.textureBindings"), triangles: g(e.triangles, "$.triangles"), extractionMicros: s(e.extractionMicros, "$.extractionMicros"), contributionMicros: s(e.contributionMicros, "$.contributionMicros"), counters: Object.freeze(i) });
}
function Ft(n) {
  const e = $(n, "$", ["snapshotVersion", "phase", "generation", "definitionId", "sceneId", "activeCameraIds", "activeLayerIds", "retainedAssetIds", "lastReason", "metrics"]);
  e.snapshotVersion !== 1 && a("R2D_VERSION_UNSUPPORTED", "$.snapshotVersion", "expected 1.");
  const t = (r, i) => r === null ? null : y(r, i);
  return Object.freeze({ snapshotVersion: 1, phase: x(e.phase, "$.phase", ["created", "probing", "initializing", "ready", "attaching", "attached", "extracting", "contributing", "lost", "recovering", "failed", "detaching", "destroying", "destroyed"]), generation: g(e.generation, "$.generation", 1), definitionId: t(e.definitionId, "$.definitionId"), sceneId: t(e.sceneId, "$.sceneId"), activeCameraIds: k(e.activeCameraIds, "$.activeCameraIds"), activeLayerIds: k(e.activeLayerIds, "$.activeLayerIds"), retainedAssetIds: k(e.retainedAssetIds, "$.retainedAssetIds"), lastReason: x(e.lastReason, "$.lastReason", ["R2D_OK", "R2D_OPTIONAL_DISABLED", "R2D_CAPABILITY_MISSING", "R2D_LIMIT_EXCEEDED", "R2D_FORMAT_UNSUPPORTED", "R2D_SAMPLE_COUNT_UNSUPPORTED", "R2D_SHADER_ABI_UNSUPPORTED", "R2D_ASSET_UNAVAILABLE", "R2D_STALE_GENERATION", "R2D_SURFACE_UNAVAILABLE", "R2D_DEVICE_LOST"]), metrics: $t(e.metrics) });
}
const I = { type: "string", pattern: "^[a-z][a-z0-9.-]*:[a-z0-9][a-z0-9._/-]*$", maxLength: 160 }, w = { type: "number" }, O = { type: "array", prefixItems: [w, w], minItems: 2, maxItems: 2 }, H = { type: "array", prefixItems: [0, 1, 2, 3].map(() => ({ type: "number", minimum: 0, maximum: 1 })), minItems: 4, maxItems: 4 }, W = { type: "array", prefixItems: [w, w, { type: "number", minimum: 0 }, { type: "number", minimum: 0 }], minItems: 4, maxItems: 4 }, h = {
  type: "object",
  maxProperties: 32,
  propertyNames: I,
  additionalProperties: {
    type: "object",
    additionalProperties: !1,
    required: ["version", "value"],
    properties: { version: { type: "integer", minimum: 1 }, value: {} }
  }
}, ae = {
  type: "object",
  additionalProperties: !1,
  properties: {
    before: { type: "array", items: { $ref: "#/$defs/orderRef" } },
    after: { type: "array", items: { $ref: "#/$defs/orderRef" } },
    zIndex: { type: "integer", minimum: -2147483648, maximum: 2147483647 }
  }
}, ie = {
  id: I,
  entity: I,
  layer: I,
  transform: { $ref: "#/$defs/transform" },
  parent: { $ref: "#/$defs/parentRef" },
  order: ae,
  visible: { type: "boolean" },
  opacity: { type: "number", minimum: 0, maximum: 1 },
  tint: H,
  mask: I,
  target: I,
  extensions: h
}, Gt = Object.freeze({
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://forgeng.dev/schema/render-2d/definition-1.0.0.json",
  title: "ForgeNG Render2D Definition",
  type: "object",
  additionalProperties: !1,
  required: ["contractVersion", "id", "layers"],
  properties: {
    contractVersion: { const: 1 },
    id: I,
    version: { type: "integer", minimum: 1 },
    coordinateSystem: { const: "x-right-y-down-clockwise-radians" },
    colorSpace: { const: "srgb-straight-alpha" },
    layers: { type: "array", maxItems: 256, items: { $ref: "#/$defs/layer" } },
    cameras: { type: "array", maxItems: 64, items: { $ref: "#/$defs/camera" } },
    samplers: { type: "array", maxItems: 256, items: { $ref: "#/$defs/sampler" } },
    materials: { type: "array", maxItems: 1024, items: { $ref: "#/$defs/material" } },
    sprites: { type: "array", maxItems: 1e5, items: { $ref: "#/$defs/sprite" } },
    tilemaps: { type: "array", maxItems: 512, items: { $ref: "#/$defs/tilemap" } },
    texts: { type: "array", maxItems: 1e4, items: { $ref: "#/$defs/text" } },
    animations: { type: "array", maxItems: 1e4, items: { $ref: "#/$defs/animation" } },
    particles: { type: "array", maxItems: 1024, items: { $ref: "#/$defs/particle" } },
    lights: { type: "array", maxItems: 4096, items: { $ref: "#/$defs/light" } },
    masks: { type: "array", maxItems: 4096, items: { $ref: "#/$defs/mask" } },
    shadowCasters: { type: "array", maxItems: 4096, items: { $ref: "#/$defs/shadowCaster" } },
    renderTargets: { type: "array", maxItems: 128, items: { $ref: "#/$defs/target" } },
    effects: { type: "array", maxItems: 32, items: { $ref: "#/$defs/effect" } },
    features: { type: "array", maxItems: 128, items: { $ref: "#/$defs/feature" } },
    extensions: h
  },
  $defs: {
    id: I,
    vec2: O,
    color: H,
    rect: W,
    extensions: h,
    order: ae,
    transform: {
      type: "object",
      additionalProperties: !1,
      required: ["position", "rotation", "scale"],
      properties: { position: O, rotation: w, scale: O }
    },
    parentRef: { type: "object", additionalProperties: !1, required: ["kind", "id"], properties: { kind: { const: "entity" }, id: I } },
    orderRef: { type: "object", additionalProperties: !1, required: ["kind", "id"], properties: { kind: { enum: ["item", "layer"] }, id: I } },
    layer: {
      type: "object",
      additionalProperties: !1,
      required: ["id"],
      properties: { id: I, order: ae, visible: { type: "boolean" }, opacity: { type: "number", minimum: 0, maximum: 1 }, extensions: h }
    },
    camera: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "virtualSize"],
      properties: { id: I, order: { type: "integer" }, viewport: W, virtualSize: O, scaleMode: { enum: ["stretch", "fit", "fill", "integer-fit", "none"] }, pixelSnap: { enum: ["off", "camera", "camera-and-items"] }, space: { enum: ["world", "screen"] }, safeArea: { type: "boolean" }, sampling: { enum: ["asset", "nearest", "linear"] }, position: O, rotation: w, zoom: { type: "number", exclusiveMinimum: 0 }, clearColor: { anyOf: [H, { type: "null" }] }, layers: { type: "array", items: I }, target: I, extensions: h }
    },
    sampler: {
      type: "object",
      additionalProperties: !1,
      required: ["id"],
      properties: { id: I, minFilter: { enum: ["nearest", "linear"] }, magFilter: { enum: ["nearest", "linear"] }, mipmapFilter: { enum: ["nearest", "linear"] }, addressU: { enum: ["clamp-to-edge", "repeat", "mirror-repeat"] }, addressV: { enum: ["clamp-to-edge", "repeat", "mirror-repeat"] }, maxAnisotropy: { type: "integer", minimum: 1, maximum: 16 }, extensions: h }
    },
    shaderAbi: {
      type: "object",
      additionalProperties: !1,
      required: ["version", "vertexEntry", "fragmentEntry"],
      properties: { version: { const: 1 }, vertexEntry: { type: "string" }, fragmentEntry: { type: "string" }, bindings: { type: "array", maxItems: 32, items: { type: "object", additionalProperties: !1, required: ["name", "kind"], properties: { name: { type: "string" }, kind: { enum: ["uniform", "texture", "sampler", "storage-read"] }, valueType: { enum: ["f32", "vec2f", "vec3f", "vec4f", "mat3x2f", "mat4x4f"] }, group: { const: 0 }, binding: { type: "integer", minimum: 0, maximum: 4 }, visibility: { enum: ["vertex", "fragment", "vertex-fragment"] } } } }, attributes: { type: "array", items: { enum: ["position", "uv", "color", "instance-transform"] } } }
    },
    material: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "kind"],
      properties: { id: I, kind: { enum: ["builtin", "custom"] }, builtin: { enum: ["sprite", "sprite-lit", "bitmap-text", "msdf-text", "particle"] }, shaderAsset: I, shaderAbi: { $ref: "#/$defs/shaderAbi" }, schema: { $ref: "#/$defs/materialSchema" }, sampler: I, blendMode: { enum: ["opaque", "alpha", "premultiplied-alpha", "add", "multiply", "screen"] }, depthMode: { enum: ["disabled", "read", "read-write"] }, reorderSafe: { type: "boolean" }, parameters: { type: "object" }, extensions: h }
    },
    materialSchema: {
      type: "object",
      additionalProperties: !1,
      required: ["apiVersion", "uniforms", "textures"],
      properties: {
        apiVersion: { const: 1 },
        uniforms: { type: "array", maxItems: 12, items: { type: "object", additionalProperties: !1, required: ["name", "type"], properties: { name: { type: "string" }, type: { enum: ["f32", "vec2f", "vec4f"] }, required: { type: "boolean" }, default: {} } } },
        textures: { type: "array", minItems: 1, maxItems: 2, items: { type: "object", additionalProperties: !1, required: ["name", "source", "sampleType"], properties: { name: { type: "string" }, source: { enum: ["sprite", "normal"] }, sampleType: { const: "float" }, required: { type: "boolean" } } } }
      }
    },
    sprite: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "entity", "layer", "material"],
      oneOf: [{ required: ["texture"], not: { required: ["sourceTarget"] } }, { required: ["sourceTarget"], not: { required: ["texture"] } }],
      properties: { ...ie, texture: I, sourceTarget: I, normalTexture: I, material: I, region: W, size: O, anchor: O, flipX: { type: "boolean" }, flipY: { type: "boolean" }, nineSlice: { type: "array", minItems: 4, maxItems: 4, items: { type: "number", minimum: 0 } } }
    },
    tilemap: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "entity", "layer", "tilemap", "material", "tileSize"],
      properties: {
        ...ie,
        tilemap: I,
        material: I,
        tileSize: O,
        chunkSize: O,
        layerIndices: { type: "array", items: { type: "integer", minimum: 0 } },
        tilesetTextures: { type: "array", maxItems: 512, items: I },
        imageLayerTextures: { type: "array", maxItems: 512, items: I },
        streaming: { type: "object", additionalProperties: !1, properties: {
          preloadMarginChunks: { type: "integer", minimum: 0, maximum: 16 },
          lowWaterChunks: { type: "integer", minimum: 1, maximum: 4096 },
          highWaterChunks: { type: "integer", minimum: 1, maximum: 4096 },
          chunksPerSlice: { type: "integer", minimum: 1, maximum: 1024 }
        } }
      }
    },
    text: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "entity", "layer", "text", "font", "material", "fontSize"],
      properties: { ...ie, text: { type: "string", maxLength: 65536 }, font: I, fallbackFonts: { type: "array", maxItems: 16, uniqueItems: !0, items: I }, material: I, fontSize: { type: "number", exclusiveMinimum: 0 }, lineHeight: { type: "number", exclusiveMinimum: 0 }, maxWidth: { type: "number", exclusiveMinimum: 0 }, maxHeight: { type: "number", exclusiveMinimum: 0 }, wrap: { enum: ["none", "word", "character"] }, align: { enum: ["start", "center", "end", "justify"] }, verticalAlign: { enum: ["top", "middle", "bottom"] }, direction: { enum: ["ltr", "rtl", "auto"] }, shaping: { enum: ["none", "basic", "advanced-provider"] }, letterSpacing: w, wordSpacing: w, tabSize: { type: "integer", minimum: 1, maximum: 32 }, missingGlyph: { enum: ["replace", "skip", "error"] }, replacementCodePoint: { type: "integer", minimum: 0, maximum: 1114111 } }
    },
    animation: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "duration", "tracks"],
      properties: { id: I, asset: I, clip: { type: "string", minLength: 1, maxLength: 160 }, target: I, duration: { type: "number", exclusiveMinimum: 0 }, fixedStepHz: { type: "integer", minimum: 1, maximum: 1e3 }, loop: { enum: ["none", "repeat", "ping-pong"] }, playbackRate: { type: "number", exclusiveMinimum: 0, maximum: 64 }, autoplay: { type: "boolean" }, tracks: { type: "array", maxItems: 256, items: { type: "object", additionalProperties: !1, required: ["target", "property", "keyframes"], properties: { target: I, property: { enum: ["position", "rotation", "scale", "opacity", "tint", "frame"] }, keyframes: { type: "array", minItems: 1, maxItems: 16384, items: { type: "object", additionalProperties: !1, required: ["time", "value"], properties: { time: { type: "number", minimum: 0 }, value: {}, easing: { enum: ["linear", "step", "ease-in", "ease-out", "ease-in-out"] } } } } } } }, events: { type: "array", maxItems: 4096, items: { type: "object", additionalProperties: !1, required: ["time", "name"], properties: { time: { type: "number", minimum: 0 }, name: { type: "string", minLength: 1, maxLength: 160 } } } }, extensions: h }
    },
    particle: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "entity", "layer", "material", "capacity", "emissionRate", "lifetime"],
      properties: { ...ie, texture: I, material: I, capacity: { type: "integer", minimum: 1, maximum: 1e6 }, emissionRate: { type: "number", minimum: 0 }, lifetime: O, speed: O, angle: O, gravity: O, size: O, fixedStepHz: { type: "integer", minimum: 1, maximum: 1e3 }, seed: { type: "integer", minimum: 1, maximum: 4294967295 }, autoplay: { type: "boolean" }, duration: { type: "number", exclusiveMinimum: 0 }, loop: { type: "boolean" }, offscreen: { enum: ["continue", "pause-when-hidden"] }, maxBurst: { type: "integer", minimum: 0, maximum: 65536 }, rotation: O, angularVelocity: O, sizeCurve: { $ref: "#/$defs/particleCurve" }, opacityCurve: { $ref: "#/$defs/particleCurve" }, colorStart: H, colorEnd: H }
    },
    particleCurve: { type: "object", additionalProperties: !1, required: ["keys"], properties: { keys: { type: "array", minItems: 1, maxItems: 64, items: { type: "object", additionalProperties: !1, required: ["t", "value"], properties: { t: { type: "number", minimum: 0, maximum: 1 }, value: { type: "number", minimum: 0 } } } } } },
    light: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "entity", "kind", "color", "intensity"],
      properties: { id: I, entity: I, kind: { enum: ["ambient", "directional", "point"] }, transform: { $ref: "#/$defs/transform" }, parent: { $ref: "#/$defs/parentRef" }, color: H, intensity: { type: "number", minimum: 0 }, enabled: { type: "boolean" }, radius: { type: "number", exclusiveMinimum: 0 }, direction: w, layers: { type: "array", items: I }, shadow: { type: "object", additionalProperties: !1, properties: { enabled: { type: "boolean" }, mode: { const: "hard" }, maxCasters: { type: "integer", minimum: 0, maximum: 4096 } } }, extensions: h }
    },
    mask: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "entity", "kind"],
      properties: { id: I, entity: I, kind: { enum: ["scissor", "sprite", "path"] }, transform: { $ref: "#/$defs/transform" }, parent: { $ref: "#/$defs/parentRef" }, rect: W, texture: I, region: W, points: { type: "array", minItems: 3, maxItems: 256, items: O }, inverted: { type: "boolean" }, extensions: h }
    },
    shadowCaster: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "entity", "kind"],
      properties: { id: I, entity: I, kind: { enum: ["rect", "polygon"] }, transform: { $ref: "#/$defs/transform" }, rect: W, points: { type: "array", minItems: 3, maxItems: 256, items: O }, layers: { type: "array", items: I }, enabled: { type: "boolean" }, extensions: h }
    },
    target: {
      type: "object",
      additionalProperties: !1,
      required: ["id"],
      properties: { id: I, size: O, scale: { type: "number", exclusiveMinimum: 0, maximum: 4 }, format: { enum: ["rgba8unorm", "rgba8unorm-srgb", "bgra8unorm", "bgra8unorm-srgb", "rgba16float"] }, sampleCount: { enum: [1, 2, 4, 8] }, clearColor: H, persistent: { type: "boolean" }, extensions: h }
    },
    feature: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "capability"],
      properties: { id: I, capability: I, required: { type: "boolean" }, order: ae, options: { type: "object" }, extensions: h }
    },
    effect: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "kind", "input", "output"],
      properties: { id: I, kind: { const: "color-adjust" }, input: I, output: { anyOf: [I, { const: "surface" }] }, enabled: { type: "boolean" }, required: { type: "boolean" }, order: { type: "integer" }, options: { type: "object", additionalProperties: !1, properties: { brightness: { type: "number", minimum: -1, maximum: 1 }, contrast: { type: "number", minimum: 0, maximum: 4 }, saturation: { type: "number", minimum: 0, maximum: 4 } } }, extensions: h }
    }
  }
});
function Ce(n, e) {
  const t = $(n, e, ["layerId", "x", "y", "gid"]);
  return Object.freeze({
    layerId: g(t.layerId, `${e}.layerId`, 1, 2147483647),
    x: g(t.x, `${e}.x`, -2147483647, 2147483647),
    y: g(t.y, `${e}.y`, -2147483647, 2147483647),
    gid: g(t.gid, `${e}.gid`, 0, 4294967295)
  });
}
function Te(n, e) {
  const t = /* @__PURE__ */ new Map();
  for (let r = 0; r < n.length; r += 1) {
    const i = n[r], s = `${i.layerId}:${i.x}:${i.y}`;
    if (t.has(s))
      throw new TypeError(`R2D_VALUE_INVALID at ${e}[${r}]: duplicate tile coordinate ${s}.`);
    t.set(s, i);
  }
  return Object.freeze([...t.values()].sort((r, i) => r.layerId - i.layerId || r.y - i.y || r.x - i.x));
}
function Ht(n) {
  const e = $(n, "$", ["patchVersion", "tilemapId", "expectedRevision", "patches"]);
  if (e.patchVersion !== 1)
    throw new TypeError("R2D_VERSION_UNSUPPORTED at $.patchVersion: expected 1.");
  const t = L(e.patches, "$.patches", u.tilemapPatches, Ce);
  return Object.freeze({
    patchVersion: 1,
    tilemapId: y(e.tilemapId, "$.tilemapId"),
    expectedRevision: g(e.expectedRevision, "$.expectedRevision", 0),
    patches: Te(t, "$.patches")
  });
}
function Bt(n) {
  const e = $(n, "$", ["snapshotVersion", "tilemapId", "revision", "patches"]);
  if (e.snapshotVersion !== 1)
    throw new TypeError("R2D_VERSION_UNSUPPORTED at $.snapshotVersion: expected 1.");
  const t = L(e.patches, "$.patches", u.tilemapPatches, Ce);
  return Object.freeze({
    snapshotVersion: 1,
    tilemapId: y(e.tilemapId, "$.tilemapId"),
    revision: g(e.revision, "$.revision", 0),
    patches: Te(t, "$.patches")
  });
}
function je(n, e) {
  (typeof n != "string" || n.length > u.textLength) && a("R2D_VALUE_INVALID", e, `expected a string of at most ${u.textLength} characters.`);
  const t = n;
  return [...t].length > u.textGlyphs && a("R2D_LIMIT_EXCEEDED", e, "too many Unicode scalars."), t;
}
function Yt(n) {
  const e = $(n, "$", ["updateVersion", "textId", "expectedRevision", "text"]);
  if (e.updateVersion !== 1)
    throw new TypeError("R2D_VERSION_UNSUPPORTED at $.updateVersion: expected 1.");
  return Object.freeze({
    updateVersion: 1,
    textId: y(e.textId, "$.textId"),
    expectedRevision: g(e.expectedRevision, "$.expectedRevision", 0),
    text: je(e.text, "$.text")
  });
}
function Wt(n) {
  const e = $(n, "$", ["snapshotVersion", "textId", "revision", "text"]);
  if (e.snapshotVersion !== 1)
    throw new TypeError("R2D_VERSION_UNSUPPORTED at $.snapshotVersion: expected 1.");
  return Object.freeze({
    snapshotVersion: 1,
    textId: y(e.textId, "$.textId"),
    revision: g(e.revision, "$.revision", 0),
    text: je(e.text, "$.text")
  });
}
function Jt(n) {
  const e = $(n, "$", ["commandVersion", "animationId", "expectedRevision", "command", "time", "speed", "direction", "toAnimationId", "transitionTicks"]);
  e.commandVersion !== 1 && a("R2D_VERSION_UNSUPPORTED", "$.commandVersion", "expected 1.");
  const t = x(e.command, "$.command", ["play", "pause", "stop", "seek", "set-speed", "set-direction", "transition"]);
  t === "seek" && e.time === void 0 && a("R2D_VALUE_INVALID", "$.time", "seek requires time."), t === "set-speed" && e.speed === void 0 && a("R2D_VALUE_INVALID", "$.speed", "set-speed requires speed."), t === "set-direction" && e.direction === void 0 && a("R2D_VALUE_INVALID", "$.direction", "set-direction requires direction."), t === "transition" && (e.toAnimationId === void 0 || e.transitionTicks === void 0) && a("R2D_VALUE_INVALID", "$.transition", "transition requires toAnimationId and transitionTicks.");
  const r = e.direction === void 0 ? void 0 : g(e.direction, "$.direction", -1, 1);
  return r !== void 0 && r !== -1 && r !== 1 && a("R2D_VALUE_INVALID", "$.direction", "direction must be -1 or 1."), Object.freeze({
    commandVersion: 1,
    animationId: y(e.animationId, "$.animationId"),
    expectedRevision: g(e.expectedRevision, "$.expectedRevision"),
    command: t,
    ...e.time === void 0 ? {} : { time: _(e.time, "$.time", 0) },
    ...e.speed === void 0 ? {} : { speed: _(e.speed, "$.speed", Number.EPSILON, 64) },
    ...r === void 0 ? {} : { direction: r },
    ...e.toAnimationId === void 0 ? {} : { toAnimationId: y(e.toAnimationId, "$.toAnimationId") },
    ...e.transitionTicks === void 0 ? {} : { transitionTicks: g(e.transitionTicks, "$.transitionTicks", 0, u.animationAdvanceTicks) }
  });
}
function Xt(n) {
  const e = $(n, "$", ["commandVersion", "emitterId", "expectedRevision", "command", "count", "timeScale"]);
  e.commandVersion !== 1 && a("R2D_VERSION_UNSUPPORTED", "$.commandVersion", "expected 1.");
  const t = x(e.command, "$.command", ["play", "pause", "stop", "burst", "set-time-scale"]);
  return t === "burst" && e.count === void 0 && a("R2D_VALUE_INVALID", "$.count", "burst requires count."), t === "set-time-scale" && e.timeScale === void 0 && a("R2D_VALUE_INVALID", "$.timeScale", "set-time-scale requires timeScale."), Object.freeze({
    commandVersion: 1,
    emitterId: y(e.emitterId, "$.emitterId"),
    expectedRevision: g(e.expectedRevision, "$.expectedRevision"),
    command: t,
    ...e.count === void 0 ? {} : { count: g(e.count, "$.count", 0, u.particleBurst) },
    ...e.timeScale === void 0 ? {} : { timeScale: _(e.timeScale, "$.timeScale", 0, 16) }
  });
}
const Kt = 1, Z = Object.freeze({
  version: 1,
  vertexEntry: "vs_sprite",
  fragmentEntry: "fs_sprite",
  uniformBytes: 64,
  customUniformBytes: 48,
  bindings: Object.freeze([
    Object.freeze({ name: "camera", kind: "uniform", group: 0, binding: 0, visibility: "vertex" }),
    Object.freeze({ name: "instances", kind: "storage-read", group: 0, binding: 1, visibility: "vertex" }),
    Object.freeze({ name: "spriteTexture", kind: "texture", group: 0, binding: 2, visibility: "fragment" }),
    Object.freeze({ name: "spriteSampler", kind: "sampler", group: 0, binding: 3, visibility: "fragment" }),
    Object.freeze({ name: "material", kind: "uniform", valueType: "vec4f", group: 0, binding: 4, visibility: "vertex-fragment" })
  ]),
  attributes: Object.freeze(["position", "uv", "color", "instance-transform"])
});
function Qt(n) {
  return ve({
    contractVersion: 1,
    id: "forgeng.render2d:material-validation",
    layers: [{ id: "forgeng.render2d:material-validation-layer" }],
    materials: [{
      id: n.id,
      kind: "custom",
      shaderAsset: n.shaderAsset,
      shaderAbi: {
        version: Z.version,
        vertexEntry: Z.vertexEntry,
        fragmentEntry: Z.fragmentEntry,
        bindings: Z.bindings,
        attributes: Z.attributes
      },
      schema: n.schema,
      parameters: n.parameters ?? {},
      ...n.sampler === void 0 ? {} : { sampler: n.sampler },
      blendMode: n.blendMode ?? "premultiplied-alpha",
      depthMode: n.depthMode ?? "disabled",
      reorderSafe: n.reorderSafe ?? !1
    }]
  }).materials[0];
}
const Zt = 1, en = 1, tn = "1.0.0", Pe = Object.freeze({
  off: Object.freeze({ history: 0, cameras: 0, layers: 0, targets: 0, features: 0, assets: 0, failures: 0, selections: 0, overheadBudgetMicros: 0 }),
  "production-lite": Object.freeze({ history: 1, cameras: 8, layers: 32, targets: 8, features: 16, assets: 32, failures: 8, selections: 0, overheadBudgetMicros: 250 }),
  diagnostic: Object.freeze({ history: 16, cameras: 32, layers: 128, targets: 32, features: 64, assets: 256, failures: 32, selections: 128, overheadBudgetMicros: 1e3 }),
  lab: Object.freeze({ history: 64, cameras: 64, layers: 256, targets: 128, features: 128, assets: 1024, failures: 64, selections: 512, overheadBudgetMicros: 4e3 })
});
function nn(n = {}) {
  const e = $(n, "$", ["profile", "maximumHistory", "maximumSelections"]), t = e.profile === void 0 ? "production-lite" : x(e.profile, "$.profile", ["off", "production-lite", "diagnostic", "lab"]), r = Pe[t], i = e.maximumHistory === void 0 ? r.history : g(e.maximumHistory, "$.maximumHistory", 0, r.history), s = e.maximumSelections === void 0 ? r.selections : g(e.maximumSelections, "$.maximumSelections", 0, Math.min(r.selections, u.inspectionItems));
  return Object.freeze({ profile: t, limits: Object.freeze({ ...r, history: i, selections: s }) });
}
function bt(n) {
  const e = $(n, "$", ["snapshotVersion", "apiVersion", "schemaVersion", "profile", "composition", "engine", "scene", "domain", "resourceOwners", "selection", "overhead", "destroyed"]);
  e.snapshotVersion !== 2 && a("R2D_VERSION_UNSUPPORTED", "$.snapshotVersion", "expected 2."), e.apiVersion !== 1 && a("R2D_VERSION_UNSUPPORTED", "$.apiVersion", "expected 1."), e.schemaVersion !== "1.0.0" && a("R2D_VERSION_UNSUPPORTED", "$.schemaVersion", "expected 1.0.0.");
  const t = x(e.profile, "$.profile", ["off", "production-lite", "diagnostic", "lab"]), r = B(e, "$"), i = Pe[t];
  return ((r.domain?.cameras.length ?? 0) > i.cameras || (r.domain?.layers.length ?? 0) > i.layers || (r.domain?.targets.length ?? 0) > i.targets || (r.domain?.features.length ?? 0) > i.features || (r.domain?.assets.length ?? 0) > i.assets || (r.domain?.failures.length ?? 0) > i.failures) && a("R2D_LIMIT_EXCEEDED", "$.domain", `snapshot exceeds the ${t} inspection profile.`), r;
}
function rn(n) {
  const e = $(n, "$", ["exportVersion", "schemaVersion", "minimumReaderVersion", "migrations", "definition", "inspection"]);
  return (e.exportVersion !== 1 || e.minimumReaderVersion !== 1 || e.schemaVersion !== "1.0.0") && a("R2D_VERSION_UNSUPPORTED", "$", "expected editor export 1 / schema 1.0.0."), B(e.definition, "$.definition"), bt(e.inspection), B(e, "$");
}
class xt extends Error {
  constructor(t) {
    super(t.message);
    M(this, "code");
    M(this, "operation");
    M(this, "path");
    M(this, "id");
    M(this, "lifecyclePhase");
    M(this, "cause");
    this.name = "GameplayError", this.code = t.code, this.operation = t.operation, this.path = t.path ?? null, this.id = t.id ?? null, this.lifecyclePhase = t.lifecyclePhase ?? null, this.cause = t.cause;
  }
}
const It = /^[a-z0-9]+(?:[.-][a-z0-9]+)+:[a-z0-9]+(?:[._/-][a-z0-9]+)*$/;
function V(n, e, t, r, i, s) {
  throw new xt({ code: n, operation: e, path: t, message: r, id: i, cause: s });
}
function Me(n) {
  if (typeof n != "object" || n === null || Array.isArray(n))
    return !1;
  const e = Object.getPrototypeOf(n);
  return e === Object.prototype || e === null;
}
function ze(n, e) {
  Me(n) || V("GAMEPLAY_INVALID_DEFINITION", "validate", e, `${e} must be a plain object.`);
}
function Et(n, e, t) {
  for (const r of Object.keys(n))
    e.includes(r) || V("GAMEPLAY_UNKNOWN_FIELD", "validate", `${t}.${r}`, `${t}.${r} is not supported.`);
}
function _t(n, e) {
  (typeof n != "string" || n.length > 160 || !It.test(n)) && V("GAMEPLAY_INVALID_ID", "validate", e, `${e} must be a normalized namespaced gameplay id.`);
}
function Rt(n, e) {
  const t = n ?? 1;
  return (!Number.isSafeInteger(t) || t <= 0) && V("GAMEPLAY_INVALID_VERSION", "validate", e, `${e} must be a positive safe integer.`), t;
}
function _e(n, e, t = /* @__PURE__ */ new WeakSet()) {
  if (n === null || typeof n == "string" || typeof n == "boolean")
    return n;
  if (typeof n == "number")
    return Number.isFinite(n) || V("GAMEPLAY_INVALID_JSON", "normalize", e, `${e} contains a non-finite number.`), n;
  typeof n != "object" && V("GAMEPLAY_INVALID_JSON", "normalize", e, `${e} must contain JSON values only.`), t.has(n) && V("GAMEPLAY_INVALID_JSON", "normalize", e, `${e} contains a reference cycle.`), t.add(n);
  let r;
  if (Array.isArray(n))
    r = Object.freeze(n.map((i, s) => _e(i, `${e}[${s}]`, t)));
  else {
    Me(n) || V("GAMEPLAY_INVALID_JSON", "normalize", e, `${e} must contain plain JSON objects.`);
    const i = {};
    for (const s of Object.keys(n).sort())
      s || V("GAMEPLAY_INVALID_JSON", "normalize", e, `${e} contains an empty key.`), i[s] = _e(n[s], `${e}.${s}`, t);
    r = Object.freeze(i);
  }
  return t.delete(n), r;
}
function Dt(n, e, t) {
  const r = _e(n, e);
  return t && !t(r) && V("GAMEPLAY_INVALID_COMPONENT_VALUE", "component", e, `${e} does not satisfy its definition validator.`), r;
}
function At(n, e, t) {
  e.kind === "number" ? (typeof n != "number" || !Number.isFinite(n) || e.integer && !Number.isInteger(n) || e.minimum !== void 0 && n < e.minimum || e.maximum !== void 0 && n > e.maximum) && V("GAMEPLAY_INVALID_COMPONENT_VALUE", "component", t, `${t} violates the number component schema.`) : e.kind === "boolean" ? typeof n != "boolean" && V("GAMEPLAY_INVALID_COMPONENT_VALUE", "component", t, `${t} must be boolean.`) : e.kind === "string" ? (typeof n != "string" || e.minimumLength !== void 0 && n.length < e.minimumLength || e.maximumLength !== void 0 && n.length > e.maximumLength || e.pattern !== void 0 && !new RegExp(e.pattern).test(n)) && V("GAMEPLAY_INVALID_COMPONENT_VALUE", "component", t, `${t} violates the string component schema.`) : (!Number.isSafeInteger(e.schemaVersion) || e.schemaVersion <= 0) && V("GAMEPLAY_INVALID_VERSION", "component", `${t}.schemaVersion`, "JSON component schemaVersion must be positive.");
}
const St = ["id", "version", "schema", "default", "serializable", "validate", "initialize", "serialize", "deserialize", "migrations"];
function se(n) {
  ze(n, "component"), Et(n, St, "component"), _t(n.id, "component.id");
  const e = Rt(n.version, "component.version");
  ze(n.schema, "component.schema"), ["number", "boolean", "string", "json"].includes(n.schema.kind) || V("GAMEPLAY_INVALID_DEFINITION", "component", "component.schema.kind", "Unsupported component schema kind.", n.id);
  const t = Object.freeze({ ...n.schema }), r = (l, f = `component(${n.id})`) => {
    const m = Dt(l, f, n.validate);
    return At(m, t, f), m;
  }, i = r(n.default, "component.default"), s = Object.freeze({ ...n.migrations ?? {} });
  for (const l of Object.keys(s)) {
    const f = Number(l);
    (!Number.isSafeInteger(f) || f <= 0 || f >= e || typeof s[f] != "function") && V("GAMEPLAY_INVALID_VERSION", "component", `component.migrations.${l}`, "Component migrations must map an earlier positive version to a function.", n.id);
  }
  const o = ((l = i) => Object.freeze({
    kind: "component-initializer",
    component: o,
    value: r(l)
  }));
  return Object.defineProperties(o, {
    kind: { value: "component", enumerable: !0 },
    id: { value: n.id, enumerable: !0 },
    version: { value: e, enumerable: !0 },
    schema: { value: t, enumerable: !0 },
    default: { value: i, enumerable: !0 },
    serializable: { value: n.serializable !== !1, enumerable: !0 },
    validateValue: { value: r },
    initialize: { value: n.initialize },
    serialize: { value: n.serialize },
    deserialize: { value: n.deserialize },
    migrations: { value: s, enumerable: !0 },
    reference: { value: Object.freeze({ kind: "component", id: n.id }), enumerable: !0 }
  }), Object.freeze(o);
}
const we = Object.freeze({
  number(n) {
    const { minimum: e, maximum: t, integer: r, ...i } = n;
    return se({ ...i, schema: { kind: "number", minimum: e, maximum: t, integer: r } });
  },
  boolean(n) {
    return se({ ...n, schema: { kind: "boolean" } });
  },
  string(n) {
    const { minimumLength: e, maximumLength: t, pattern: r, ...i } = n;
    return se({ ...i, schema: { kind: "string", minimumLength: e, maximumLength: t, pattern: r } });
  },
  json(n) {
    const { schemaVersion: e, ...t } = n;
    return se({ ...t, schema: { kind: "json", schemaVersion: e ?? 1 } });
  }
});
function ee(n, e) {
  return Array.isArray(n) && n.length === e && n.every((t) => typeof t == "number" && Number.isFinite(t));
}
const sn = we.json({
  id: "forgeng.spatial:transform-2d",
  version: 1,
  default: { position: [0, 0], rotation: 0, scale: [1, 1] },
  validate: (n) => typeof n == "object" && n !== null && ee(n.position, 2) && typeof n.rotation == "number" && Number.isFinite(n.rotation) && ee(n.scale, 2)
});
we.json({
  id: "forgeng.spatial:transform-3d",
  version: 1,
  default: { position: [0, 0, 0], rotation: [0, 0, 0, 1], scale: [1, 1, 1] },
  validate: (n) => typeof n == "object" && n !== null && ee(n.position, 3) && ee(n.rotation, 4) && ee(n.scale, 3)
});
function an(n) {
  return Object.freeze({ ...n });
}
function on(n) {
  return Object.freeze({ ...n });
}
function dn(n) {
  return Object.freeze({ ...n });
}
function cn(n) {
  return Object.freeze({ ...n, kind: "builtin", builtin: "sprite" });
}
export {
  Pt as RENDER_2D_ADVANCED_FEATURES,
  Nt as RENDER_2D_CONTRACT_VERSION,
  Kt as RENDER_2D_CUSTOM_MATERIAL_API_VERSION,
  Gt as RENDER_2D_DEFINITION_JSON_SCHEMA,
  en as RENDER_2D_EDITOR_EXPORT_VERSION,
  Ie as RENDER_2D_EFFECTS_FEATURE,
  Zt as RENDER_2D_INSPECTION_API_VERSION,
  Pe as RENDER_2D_INSPECTION_PROFILE_LIMITS,
  tn as RENDER_2D_INSPECTION_SCHEMA_VERSION,
  J as RENDER_2D_LIGHTING_FEATURE,
  u as RENDER_2D_LIMITS,
  Ee as RENDER_2D_PATH_MASKS_FEATURE,
  Ot as RENDER_2D_SCHEMA_VERSION,
  Lt as RENDER_2D_SHADER_ABI_VERSION,
  Vt as RENDER_2D_SNAPSHOT_VERSION,
  Z as RENDER_2D_SPRITE_SHADER_ABI_V1,
  Fe as Render2dContractError,
  sn as Transform2d,
  it as assertRender2dAdvancedGraph,
  cn as builtinSpriteMaterial2d,
  on as camera2d,
  jt as createRender2dPingPongPair,
  Qt as defineCustomSpriteMaterial2dV1,
  an as defineLayer2d,
  Mt as defineRender2d,
  wt as negotiateRender2dCapabilities,
  rt as normalizeRender2dAdvancedFeatureOptions,
  Ze as normalizeRender2dAnimation,
  ht as normalizeRender2dCameraSurface,
  st as normalizeRender2dCustomMaterialSchemaV1,
  nt as normalizeRender2dEffect,
  nn as normalizeRender2dInspectionOptions,
  et as normalizeRender2dParticle,
  tt as normalizeRender2dShadowCaster,
  Ve as render2dLogicalToWorld,
  Ct as render2dPhysicalToWorld,
  Le as render2dWorldToLogical,
  kt as render2dWorldToPhysical,
  vt as resolveRender2dCamera,
  Tt as snapRender2dItemBounds,
  Ut as snapshotRender2dComposition,
  rn as snapshotRender2dEditorExportV1,
  qt as snapshotRender2dExtraction,
  Ft as snapshotRender2dInspection,
  bt as snapshotRender2dInspectionV2,
  $t as snapshotRender2dMetrics,
  $e as snapshotRender2dQuality,
  Wt as snapshotRender2dTextContent,
  Bt as snapshotRender2dTilemapPatches,
  dn as sprite2d,
  oe as transformRender2dPoint,
  Jt as validateRender2dAnimationCommand,
  pt as validateRender2dCapabilityRequest,
  yt as validateRender2dCapabilitySupport,
  ve as validateRender2dDefinition,
  at as validateRender2dMaterialParametersV1,
  Xt as validateRender2dParticleCommand,
  Yt as validateRender2dTextUpdateRequest,
  Ht as validateRender2dTilemapPatchRequest
};
//# sourceMappingURL=forge-2d.esm.js.map
