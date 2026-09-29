var Ue = Object.defineProperty;
var qe = (r, e, t) => e in r ? Ue(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var M = (r, e, t) => qe(r, typeof e != "symbol" ? e + "" : e, t);
const Nt = 1, zt = "1.0.0", Lt = 1, Ot = 1;
class Fe extends TypeError {
  constructor(t, i, n) {
    super(`${t} at ${i}: ${n}`);
    M(this, "code");
    M(this, "path");
    this.code = t, this.path = i, this.name = "Render2dContractError";
  }
}
const l = Object.freeze({
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
}), te = (r) => Object.freeze([r[0], r[1], r[2], r[3]]), j = (r) => Object.freeze([r[0], r[1]]);
function Vt(r = {}) {
  const e = r.logicalSize ?? [1, 1], t = r.pixelRatio ?? 1, i = r.maximumPixelRatio ?? 4, n = r.physicalSize ?? [
    e[0] * t,
    e[1] * t
  ], s = r.safeArea ?? [0, 0, 0, 0], a = r.revision ?? 0, u = [...e, ...n, t, i, ...s];
  if (!Number.isSafeInteger(a) || a < 0 || u.some((m) => !Number.isFinite(m)) || e.some((m) => m <= 0) || n.some((m) => m <= 0) || t <= 0 || i <= 0 || s.some((m) => m < 0))
    throw new TypeError("Render2D surface values must be finite, positive, and have a non-negative safe revision.");
  if (Math.abs(n[0] - e[0] * t) > 1 || Math.abs(n[1] - e[1] * t) > 1)
    throw new TypeError("Render2D CSS/logical/physical canvas sizes disagree with pixelRatio.");
  if (s[0] + s[2] >= e[0] || s[1] + s[3] >= e[1])
    throw new TypeError("Render2D safe-area insets must leave a positive logical surface.");
  const f = Math.min(t, i);
  return Object.freeze({
    revision: a,
    logicalSize: j(e),
    physicalSize: j([
      Math.max(1, Math.round(e[0] * f)),
      Math.max(1, Math.round(e[1] * f))
    ]),
    pixelRatio: f,
    maximumPixelRatio: i,
    safeArea: Object.freeze([s[0], s[1], s[2], s[3]]),
    visible: r.visible ?? !0
  });
}
function Ne(r) {
  const [e, t, i, n, s, a] = r, u = e * n - t * i;
  if (!Number.isFinite(u) || Math.abs(u) <= Number.EPSILON)
    throw new TypeError("Render2D camera matrix is singular.");
  const f = 1 / u, m = n * f, c = -t * f, p = -i * f, b = e * f;
  return Object.freeze([m, c, p, b, -(m * s + p * a), -(c * s + b * a)]);
}
function ae(r, e) {
  return j([
    r[0] * e[0] + r[2] * e[1] + r[4],
    r[1] * e[0] + r[3] * e[1] + r[5]
  ]);
}
function ze(r, e, t, i) {
  const n = r.rotation ?? 0, s = Math.cos(-n), a = Math.sin(-n), u = s * t[0], f = a * t[1], m = -a * t[0], c = s * t[1], p = (r.space ?? "world") === "screen" ? e[0] : e[0] + e[2] * 0.5, b = (r.space ?? "world") === "screen" ? e[1] : e[1] + e[3] * 0.5;
  return Object.freeze([
    u,
    f,
    m,
    c,
    p - u * i[0] - m * i[1],
    b - f * i[0] - c * i[1]
  ]);
}
function Ge(r, e, t, i, n) {
  if ((r.pixelSnap ?? "off") === "off") return j(n);
  const s = ze(r, e, t, n), a = ae(s, [0, 0]), u = j([
    Math.round(a[0] * i[0]) / i[0],
    Math.round(a[1] * i[1]) / i[1]
  ]), f = Ne(Object.freeze([s[0], s[1], s[2], s[3], 0, 0])), m = [u[0] - a[0], u[1] - a[1]], c = ae(f, m);
  return j([n[0] - c[0], n[1] - c[1]]);
}
function _e(r, e) {
  const t = Math.round(r[0] * e[0]), i = Math.round(r[1] * e[1]), n = Math.round((r[0] + r[2]) * e[0]), s = Math.round((r[1] + r[3]) * e[1]);
  return te([t, i, Math.max(1, n - t), Math.max(1, s - i)]);
}
function ht(r, e) {
  const t = r.safeArea === !1 ? [0, 0, 0, 0] : e.safeArea, i = Math.max(Number.EPSILON, e.logicalSize[0] - t[0] - t[2]), n = Math.max(Number.EPSILON, e.logicalSize[1] - t[1] - t[3]), s = r.viewport ?? [0, 0, 1, 1], a = te([
    t[0] + s[0] * i,
    t[1] + s[1] * n,
    Math.max(Number.EPSILON, s[2] * i),
    Math.max(Number.EPSILON, s[3] * n)
  ]), u = a[2] / r.virtualSize[0], f = a[3] / r.virtualSize[1], m = r.scaleMode ?? "fit";
  let c = u, p = f;
  if (m !== "stretch") {
    let D = m === "fill" ? Math.max(u, f) : m === "none" ? 1 : Math.min(u, f);
    m === "integer-fit" && D >= 1 && (D = Math.max(1, Math.floor(D))), c = D, p = D;
  }
  const b = r.zoom ?? 1;
  c *= b, p *= b;
  const A = j([c, p]), R = r.virtualSize[0] * c, C = r.virtualSize[1] * p, N = te([
    a[0] + (a[2] - R) * 0.5,
    a[1] + (a[3] - C) * 0.5,
    R,
    C
  ]), T = j([
    e.physicalSize[0] / e.logicalSize[0],
    e.physicalSize[1] / e.logicalSize[1]
  ]), K = _e(a, T), re = _e(N, T), Q = j([r.position?.[0] ?? 0, r.position?.[1] ?? 0]), ye = Ge(r, N, A, T, Q), d = ze(r, N, A, ye), v = Object.freeze([
    Math.max(0, N[0] - a[0]),
    Math.max(0, N[1] - a[1]),
    Math.max(0, a[0] + a[2] - N[0] - N[2]),
    Math.max(0, a[1] + a[3] - N[1] - N[3])
  ]), _ = Object.freeze([
    Math.max(0, a[0] - N[0]),
    Math.max(0, a[1] - N[1]),
    Math.max(0, N[0] + N[2] - a[0] - a[2]),
    Math.max(0, N[1] + N[3] - a[1] - a[3])
  ]);
  return Object.freeze({
    id: r.id,
    order: r.order ?? 0,
    space: r.space ?? "world",
    scaleMode: m,
    pixelSnap: r.pixelSnap ?? "off",
    sampling: r.sampling ?? "asset",
    logicalViewport: a,
    physicalViewport: K,
    logicalContentRect: N,
    physicalContentRect: re,
    letterbox: v,
    crop: _,
    virtualSize: j(r.virtualSize),
    scale: A,
    position: Q,
    effectivePosition: ye,
    rotation: r.rotation ?? 0,
    zoom: b,
    layers: Object.freeze([...r.layers ?? []]),
    targetId: r.target ?? "surface",
    clearColor: r.clearColor ?? null,
    physicalRatio: T,
    worldToLogical: d,
    logicalToWorld: Ne(d)
  });
}
function Le(r, e) {
  return ae(r.worldToLogical, e);
}
function Oe(r, e) {
  return ae(r.logicalToWorld, e);
}
function kt(r, e) {
  const t = Le(r, e);
  return j([t[0] * r.physicalRatio[0], t[1] * r.physicalRatio[1]]);
}
function Ct(r, e) {
  return Oe(r, [
    e[0] / r.physicalRatio[0],
    e[1] / r.physicalRatio[1]
  ]);
}
function Tt(r, e) {
  if (r.pixelSnap !== "camera-and-items") return te(e);
  const t = Le(r, [e[0], e[1]]), i = [
    Math.round(t[0] * r.physicalRatio[0]) / r.physicalRatio[0],
    Math.round(t[1] * r.physicalRatio[1]) / r.physicalRatio[1]
  ], n = Oe(r, i);
  return te([
    e[0] + n[0] - e[0],
    e[1] + n[1] - e[1],
    e[2],
    e[3]
  ]);
}
const He = /^[a-z][a-z0-9.-]*:[a-z0-9][a-z0-9._/-]*$/, ce = /^[A-Za-z_][A-Za-z0-9_]*$/, be = ["rgba8unorm", "rgba8unorm-srgb", "bgra8unorm", "bgra8unorm-srgb", "rgba16float"], de = [1, 2, 4, 8], me = ["id", "entity", "layer", "transform", "parent", "order", "visible", "opacity", "tint", "mask", "target", "extensions"];
function o(r, e, t) {
  throw new Fe(r, e, t);
}
function $(r, e, t) {
  (typeof r != "object" || r === null || Array.isArray(r)) && o("R2D_VALUE_INVALID", e, "expected an object.");
  const i = r;
  if (t)
    for (const n of Object.keys(i)) t.includes(n) || o("R2D_UNKNOWN_KEY", `${e}.${n}`, `unknown key "${n}".`);
  return i;
}
function U(r, e, t = l.idLength) {
  return (typeof r != "string" || r.length === 0 || r.length > t) && o("R2D_VALUE_INVALID", e, `expected a non-empty string of at most ${t} characters.`), r;
}
function y(r, e) {
  const t = U(r, e);
  return He.test(t) || o("R2D_ID_INVALID", e, "expected a normalized namespaced ID."), t;
}
function E(r, e, t, i) {
  return (typeof r != "number" || !Number.isFinite(r)) && o("R2D_VALUE_INVALID", e, "expected a finite number."), t !== void 0 && r < t && o("R2D_VALUE_INVALID", e, `expected a value >= ${t}.`), i !== void 0 && r > i && o("R2D_VALUE_INVALID", e, `expected a value <= ${i}.`), r;
}
function g(r, e, t = 0, i = Number.MAX_SAFE_INTEGER) {
  const n = E(r, e, t, i);
  return Number.isSafeInteger(n) || o("R2D_VALUE_INVALID", e, "expected a safe integer."), n;
}
function S(r, e) {
  return typeof r != "boolean" && o("R2D_VALUE_INVALID", e, "expected a boolean."), r;
}
function x(r, e, t) {
  return (typeof r != "string" || !t.includes(r)) && o("R2D_VALUE_INVALID", e, `expected one of ${t.join(", ")}.`), r;
}
function q(r, e, t, i, n) {
  return (!Array.isArray(r) || r.length !== t) && o("R2D_VALUE_INVALID", e, `expected a ${t}-number tuple.`), Object.freeze(r.map((s, a) => E(s, `${e}[${a}]`, i, n)));
}
function G(r, e) {
  return q(r, e, 2);
}
function le(r, e) {
  return q(r, e, 2, Number.EPSILON);
}
function X(r, e) {
  const t = q(r, e, 4);
  return (t[2] < 0 || t[3] < 0) && o("R2D_VALUE_INVALID", e, "rectangle width and height must be non-negative."), t;
}
function F(r, e) {
  return q(r, e, 4, 0, 1);
}
function Y(r, e, t) {
  const i = q(r, e, 2, t);
  return i[0] > i[1] && o("R2D_VALUE_INVALID", e, "range minimum must not exceed maximum."), i;
}
function xe(r, e, t, i) {
  if (t.nodes += 1, t.nodes > l.extensionJsonNodes && o("R2D_LIMIT_EXCEEDED", e, `extension JSON exceeds ${l.extensionJsonNodes} values.`), i > l.extensionJsonDepth && o("R2D_LIMIT_EXCEEDED", e, `extension JSON exceeds depth ${l.extensionJsonDepth}.`), r === null || typeof r == "boolean") return r;
  if (typeof r == "string")
    return r.length > l.extensionJsonStringLength && o("R2D_LIMIT_EXCEEDED", e, `extension string exceeds ${l.extensionJsonStringLength} characters.`), r;
  if (typeof r == "number") return E(r, e);
  (typeof r != "object" || r === null) && o("R2D_VALUE_INVALID", e, "expected a JSON value.");
  const n = r;
  t.active.has(n) && o("R2D_GRAPH_CYCLE", e, "extension JSON contains a reference cycle."), t.active.add(n);
  try {
    if (Array.isArray(r))
      return r.length > l.extensionJsonNodes && o("R2D_LIMIT_EXCEEDED", e, `extension array exceeds ${l.extensionJsonNodes} values.`), Object.freeze(r.map((f, m) => xe(f, `${e}[${m}]`, t, i + 1)));
    const s = $(r, e), a = Object.keys(s).sort();
    a.length > l.extensionJsonNodes && o("R2D_LIMIT_EXCEEDED", e, `extension object exceeds ${l.extensionJsonNodes} keys.`);
    const u = {};
    for (const f of a)
      f.length > l.extensionJsonKeyLength && o("R2D_LIMIT_EXCEEDED", e, `extension key exceeds ${l.extensionJsonKeyLength} characters.`), u[f] = xe(s[f], `${e}.${f}`, t, i + 1);
    return Object.freeze(u);
  } finally {
    t.active.delete(n);
  }
}
function B(r, e) {
  return xe(r, e, { active: /* @__PURE__ */ new WeakSet(), nodes: 0 }, 0);
}
function Be(r, e) {
  const t = $(r, e), i = Object.keys(t).sort();
  i.length > l.extensionCount && o("R2D_LIMIT_EXCEEDED", e, `maximum is ${l.extensionCount}.`);
  const n = {};
  for (const s of i) {
    y(s, `${e}.${s}`);
    const a = $(t[s], `${e}.${s}`, ["version", "value"]);
    n[s] = Object.freeze({ version: g(a.version, `${e}.${s}.version`, 1), value: B(a.value, `${e}.${s}.value`) });
  }
  return Object.freeze(n);
}
function h(r, e) {
  return r.extensions === void 0 ? {} : { extensions: Be(r.extensions, `${e}.extensions`) };
}
function ue(r, e) {
  const t = $(r, e, ["position", "rotation", "scale"]);
  return Object.freeze({ position: G(t.position, `${e}.position`), rotation: E(t.rotation, `${e}.rotation`), scale: G(t.scale, `${e}.scale`) });
}
function fe(r, e, t) {
  const i = $(r, e, ["kind", "id"]);
  return Object.freeze({ kind: x(i.kind, `${e}.kind`, t), id: y(i.id, `${e}.id`) });
}
function Re(r, e) {
  const t = $(r, e, ["before", "after", "zIndex"]), i = (n, s) => (Array.isArray(n) || o("R2D_VALUE_INVALID", s, "expected an array."), Object.freeze(n.map((a, u) => fe(a, `${s}[${u}]`, ["item", "layer"]))));
  return Object.freeze({ ...t.before === void 0 ? {} : { before: i(t.before, `${e}.before`) }, ...t.after === void 0 ? {} : { after: i(t.after, `${e}.after`) }, ...t.zIndex === void 0 ? {} : { zIndex: g(t.zIndex, `${e}.zIndex`, -2147483648, 2147483647) } });
}
function L(r, e, t, i) {
  return Array.isArray(r) || o("R2D_VALUE_INVALID", e, "expected an array."), r.length > t && o("R2D_LIMIT_EXCEEDED", e, `maximum is ${t}.`), Object.freeze(r.map((n, s) => i(n, `${e}[${s}]`)));
}
function k(r, e) {
  return L(r, e, l.inspectionItems, (t, i) => y(t, i));
}
function pe(r, e) {
  return {
    id: y(r.id, `${e}.id`),
    entity: y(r.entity, `${e}.entity`),
    layer: y(r.layer, `${e}.layer`),
    ...r.transform === void 0 ? {} : { transform: ue(r.transform, `${e}.transform`) },
    ...r.parent === void 0 ? {} : { parent: fe(r.parent, `${e}.parent`, ["entity"]) },
    ...r.order === void 0 ? {} : { order: Re(r.order, `${e}.order`) },
    visible: r.visible === void 0 ? !0 : S(r.visible, `${e}.visible`),
    opacity: r.opacity === void 0 ? 1 : E(r.opacity, `${e}.opacity`, 0, 1),
    tint: r.tint === void 0 ? Object.freeze([1, 1, 1, 1]) : F(r.tint, `${e}.tint`),
    ...r.mask === void 0 ? {} : { mask: y(r.mask, `${e}.mask`) },
    ...r.target === void 0 ? {} : { target: y(r.target, `${e}.target`) },
    ...h(r, e)
  };
}
function Ye(r, e) {
  const t = $(r, e, [...me, "texture", "sourceTarget", "normalTexture", "material", "region", "size", "anchor", "flipX", "flipY", "nineSlice"]);
  return t.texture === void 0 == (t.sourceTarget === void 0) && o("R2D_VALUE_INVALID", e, "sprite requires exactly one of texture or sourceTarget."), Object.freeze({ ...pe(t, e), ...t.texture === void 0 ? {} : { texture: y(t.texture, `${e}.texture`) }, ...t.sourceTarget === void 0 ? {} : { sourceTarget: y(t.sourceTarget, `${e}.sourceTarget`) }, ...t.normalTexture === void 0 ? {} : { normalTexture: y(t.normalTexture, `${e}.normalTexture`) }, material: y(t.material, `${e}.material`), ...t.region === void 0 ? {} : { region: X(t.region, `${e}.region`) }, ...t.size === void 0 ? {} : { size: le(t.size, `${e}.size`) }, anchor: t.anchor === void 0 ? Object.freeze([0.5, 0.5]) : q(t.anchor, `${e}.anchor`, 2, 0, 1), flipX: t.flipX === void 0 ? !1 : S(t.flipX, `${e}.flipX`), flipY: t.flipY === void 0 ? !1 : S(t.flipY, `${e}.flipY`), ...t.nineSlice === void 0 ? {} : { nineSlice: q(t.nineSlice, `${e}.nineSlice`, 4, 0) } });
}
function We(r, e) {
  const t = $(r, e, [...me, "tilemap", "material", "tileSize", "chunkSize", "layerIndices", "tilesetTextures", "imageLayerTextures", "streaming"]), i = t.streaming === void 0 ? void 0 : $(t.streaming, `${e}.streaming`, ["preloadMarginChunks", "lowWaterChunks", "highWaterChunks", "chunksPerSlice"]), n = i?.lowWaterChunks === void 0 ? 128 : g(i.lowWaterChunks, `${e}.streaming.lowWaterChunks`, 1, l.tilemapRetainedChunks), s = i?.highWaterChunks === void 0 ? 192 : g(i.highWaterChunks, `${e}.streaming.highWaterChunks`, 1, l.tilemapRetainedChunks);
  return s < n && o("R2D_VALUE_INVALID", `${e}.streaming.highWaterChunks`, "highWaterChunks must be greater than or equal to lowWaterChunks."), Object.freeze({
    ...pe(t, e),
    tilemap: y(t.tilemap, `${e}.tilemap`),
    material: y(t.material, `${e}.material`),
    tileSize: le(t.tileSize, `${e}.tileSize`),
    chunkSize: t.chunkSize === void 0 ? Object.freeze([32, 32]) : q(t.chunkSize, `${e}.chunkSize`, 2, 1, l.tilemapChunkDimension),
    layerIndices: t.layerIndices === void 0 ? Object.freeze([]) : L(t.layerIndices, `${e}.layerIndices`, 256, (a, u) => g(a, u)),
    tilesetTextures: t.tilesetTextures === void 0 ? Object.freeze([]) : k(t.tilesetTextures, `${e}.tilesetTextures`),
    imageLayerTextures: t.imageLayerTextures === void 0 ? Object.freeze([]) : k(t.imageLayerTextures, `${e}.imageLayerTextures`),
    streaming: Object.freeze({
      preloadMarginChunks: i?.preloadMarginChunks === void 0 ? 1 : g(i.preloadMarginChunks, `${e}.streaming.preloadMarginChunks`, 0, 16),
      lowWaterChunks: n,
      highWaterChunks: s,
      chunksPerSlice: i?.chunksPerSlice === void 0 ? 32 : g(i.chunksPerSlice, `${e}.streaming.chunksPerSlice`, 1, 1024)
    })
  });
}
function Je(r, e) {
  const t = $(r, e, [...me, "text", "font", "fallbackFonts", "material", "fontSize", "lineHeight", "maxWidth", "maxHeight", "wrap", "align", "verticalAlign", "direction", "shaping", "letterSpacing", "wordSpacing", "tabSize", "missingGlyph", "replacementCodePoint"]);
  (typeof t.text != "string" || t.text.length > l.textLength) && o("R2D_VALUE_INVALID", `${e}.text`, `expected a string of at most ${l.textLength} characters.`);
  const i = t.text;
  i.length > 0 && [...i].length > l.textGlyphs && o("R2D_LIMIT_EXCEEDED", `${e}.text`, `text exceeds ${l.textGlyphs} Unicode scalars.`);
  const n = t.fallbackFonts === void 0 ? Object.freeze([]) : k(t.fallbackFonts, `${e}.fallbackFonts`);
  n.length > l.textFallbackFonts && o("R2D_LIMIT_EXCEEDED", `${e}.fallbackFonts`, `fallback chain exceeds ${l.textFallbackFonts} fonts.`);
  const s = y(t.font, `${e}.font`);
  return (n.includes(s) || new Set(n).size !== n.length) && o("R2D_VALUE_INVALID", `${e}.fallbackFonts`, "fallback font IDs must be unique and must not repeat the primary font."), Object.freeze({
    ...pe(t, e),
    text: i,
    font: s,
    fallbackFonts: n,
    material: y(t.material, `${e}.material`),
    fontSize: E(t.fontSize, `${e}.fontSize`, Number.EPSILON),
    lineHeight: t.lineHeight === void 0 ? 1.2 : E(t.lineHeight, `${e}.lineHeight`, Number.EPSILON),
    ...t.maxWidth === void 0 ? {} : { maxWidth: E(t.maxWidth, `${e}.maxWidth`, Number.EPSILON) },
    ...t.maxHeight === void 0 ? {} : { maxHeight: E(t.maxHeight, `${e}.maxHeight`, Number.EPSILON) },
    wrap: t.wrap === void 0 ? t.maxWidth === void 0 ? "none" : "word" : x(t.wrap, `${e}.wrap`, ["none", "word", "character"]),
    align: t.align === void 0 ? "start" : x(t.align, `${e}.align`, ["start", "center", "end", "justify"]),
    verticalAlign: t.verticalAlign === void 0 ? "top" : x(t.verticalAlign, `${e}.verticalAlign`, ["top", "middle", "bottom"]),
    direction: t.direction === void 0 ? "auto" : x(t.direction, `${e}.direction`, ["ltr", "rtl", "auto"]),
    shaping: t.shaping === void 0 ? "basic" : x(t.shaping, `${e}.shaping`, ["none", "basic", "advanced-provider"]),
    letterSpacing: t.letterSpacing === void 0 ? 0 : E(t.letterSpacing, `${e}.letterSpacing`),
    wordSpacing: t.wordSpacing === void 0 ? 0 : E(t.wordSpacing, `${e}.wordSpacing`),
    tabSize: t.tabSize === void 0 ? 4 : g(t.tabSize, `${e}.tabSize`, 1, 32),
    missingGlyph: t.missingGlyph === void 0 ? "replace" : x(t.missingGlyph, `${e}.missingGlyph`, ["replace", "skip", "error"]),
    replacementCodePoint: t.replacementCodePoint === void 0 ? 65533 : g(t.replacementCodePoint, `${e}.replacementCodePoint`, 0, 1114111)
  });
}
function Xe(r, e) {
  const t = $(r, e, ["id", "entity", "kind", "transform", "parent", "color", "intensity", "enabled", "radius", "direction", "layers", "shadow", "extensions"]), i = x(t.kind, `${e}.kind`, ["ambient", "directional", "point"]);
  i === "point" && t.radius === void 0 && o("R2D_VALUE_INVALID", `${e}.radius`, "point lights require radius.");
  const n = t.shadow === void 0 ? void 0 : $(t.shadow, `${e}.shadow`, ["enabled", "mode", "maxCasters"]);
  return n && i !== "point" && o("R2D_VALUE_INVALID", `${e}.shadow`, "hard shadows are supported only for point lights."), Object.freeze({ id: y(t.id, `${e}.id`), entity: y(t.entity, `${e}.entity`), kind: i, ...t.transform === void 0 ? {} : { transform: ue(t.transform, `${e}.transform`) }, ...t.parent === void 0 ? {} : { parent: fe(t.parent, `${e}.parent`, ["entity"]) }, color: F(t.color, `${e}.color`), intensity: E(t.intensity, `${e}.intensity`, 0), enabled: t.enabled === void 0 ? !0 : S(t.enabled, `${e}.enabled`), ...t.radius === void 0 ? {} : { radius: E(t.radius, `${e}.radius`, Number.EPSILON) }, ...t.direction === void 0 ? {} : { direction: E(t.direction, `${e}.direction`) }, layers: t.layers === void 0 ? Object.freeze([]) : k(t.layers, `${e}.layers`), ...n === void 0 ? {} : { shadow: Object.freeze({ enabled: n.enabled === void 0 ? !0 : S(n.enabled, `${e}.shadow.enabled`), mode: n.mode === void 0 ? "hard" : x(n.mode, `${e}.shadow.mode`, ["hard"]), maxCasters: n.maxCasters === void 0 ? 128 : g(n.maxCasters, `${e}.shadow.maxCasters`, 0, l.shadowCasters) }) }, ...h(t, e) });
}
function Ke(r, e) {
  const t = $(r, e, ["id", "entity", "kind", "transform", "parent", "rect", "texture", "region", "points", "inverted", "extensions"]), i = x(t.kind, `${e}.kind`, ["scissor", "sprite", "path"]);
  i === "scissor" && t.rect === void 0 && o("R2D_VALUE_INVALID", `${e}.rect`, "scissor masks require a rectangle."), i === "sprite" && t.texture === void 0 && o("R2D_VALUE_INVALID", `${e}.texture`, "sprite masks require a texture.");
  const n = t.points === void 0 ? void 0 : L(t.points, `${e}.points`, l.pathMaskPoints, (s, a) => G(s, a));
  return i === "path" && (!n || n.length < 3) && o("R2D_VALUE_INVALID", `${e}.points`, "path masks require at least three points."), Object.freeze({ id: y(t.id, `${e}.id`), entity: y(t.entity, `${e}.entity`), kind: i, ...t.transform === void 0 ? {} : { transform: ue(t.transform, `${e}.transform`) }, ...t.parent === void 0 ? {} : { parent: fe(t.parent, `${e}.parent`, ["entity"]) }, ...t.rect === void 0 ? {} : { rect: X(t.rect, `${e}.rect`) }, ...t.texture === void 0 ? {} : { texture: y(t.texture, `${e}.texture`) }, ...t.region === void 0 ? {} : { region: X(t.region, `${e}.region`) }, ...n === void 0 ? {} : { points: n }, inverted: t.inverted === void 0 ? !1 : S(t.inverted, `${e}.inverted`), ...h(t, e) });
}
function Qe(r, e) {
  const t = $(r, e, ["time", "value", "easing"]), i = t.value, n = typeof i == "number" ? E(i, `${e}.value`) : Array.isArray(i) && i.length === 2 ? G(i, `${e}.value`) : F(i, `${e}.value`);
  return Object.freeze({ time: E(t.time, `${e}.time`, 0), value: n, easing: t.easing === void 0 ? "linear" : x(t.easing, `${e}.easing`, ["linear", "step", "ease-in", "ease-out", "ease-in-out"]) });
}
function Ze(r, e) {
  const t = $(r, e, ["id", "asset", "clip", "target", "duration", "fixedStepHz", "loop", "playbackRate", "autoplay", "tracks", "events", "extensions"]), i = E(t.duration, `${e}.duration`, Number.EPSILON), n = L(t.tracks, `${e}.tracks`, l.animationTracks, (f, m) => {
    const c = $(f, m, ["target", "property", "keyframes"]), p = x(c.property, `${m}.property`, ["position", "rotation", "scale", "opacity", "tint", "frame"]), b = L(c.keyframes, `${m}.keyframes`, l.animationKeyframes, Qe);
    let A = -1;
    return b.length === 0 && o("R2D_VALUE_INVALID", `${m}.keyframes`, "animation track requires at least one keyframe."), b.forEach((R, C) => {
      (R.time < A || R.time > i) && o("R2D_VALUE_INVALID", `${m}.keyframes[${C}].time`, "keyframes must be ordered within duration."), A = R.time;
    }), b.forEach((R, C) => {
      const N = typeof R.value == "number", T = Array.isArray(R.value) ? R.value.length : 0;
      (p === "position" || p === "scale" ? T !== 2 : p === "tint" ? T !== 4 : !N) && o("R2D_VALUE_INVALID", `${m}.keyframes[${C}].value`, `value does not match ${p} track.`);
    }), Object.freeze({ target: y(c.target, `${m}.target`), property: p, keyframes: b });
  }), s = t.events === void 0 ? Object.freeze([]) : L(t.events, `${e}.events`, l.animationEvents, (f, m) => {
    const c = $(f, m, ["time", "name"]);
    return Object.freeze({ time: E(c.time, `${m}.time`, 0, i), name: U(c.name, `${m}.name`) });
  });
  for (let f = 1; f < s.length; f++) s[f].time < s[f - 1].time && o("R2D_VALUE_INVALID", `${e}.events[${f}].time`, "events must be ordered by time.");
  const a = t.asset === void 0 ? void 0 : y(t.asset, `${e}.asset`), u = t.clip === void 0 ? void 0 : U(t.clip, `${e}.clip`);
  return (a === void 0 != (u === void 0) || a !== void 0 && t.target === void 0) && o("R2D_VALUE_INVALID", e, "asset, clip, and target must be supplied together for Animation2dProduct presentation."), Object.freeze({
    id: y(t.id, `${e}.id`),
    ...a === void 0 ? {} : { asset: a, clip: u, target: y(t.target, `${e}.target`) },
    duration: i,
    fixedStepHz: t.fixedStepHz === void 0 ? 60 : g(t.fixedStepHz, `${e}.fixedStepHz`, 1, 1e3),
    loop: t.loop === void 0 ? "none" : x(t.loop, `${e}.loop`, ["none", "repeat", "ping-pong"]),
    playbackRate: t.playbackRate === void 0 ? 1 : E(t.playbackRate, `${e}.playbackRate`, Number.EPSILON, 64),
    autoplay: t.autoplay === void 0 ? !1 : S(t.autoplay, `${e}.autoplay`),
    tracks: n,
    events: s,
    ...h(t, e)
  });
}
function De(r, e) {
  const t = $(r, e, ["keys"]), i = L(t.keys, `${e}.keys`, l.particleCurveKeys, (n, s) => {
    const a = $(n, s, ["t", "value"]);
    return Object.freeze({ t: E(a.t, `${s}.t`, 0, 1), value: E(a.value, `${s}.value`, 0) });
  });
  i.length === 0 && o("R2D_VALUE_INVALID", `${e}.keys`, "particle curve requires at least one key.");
  for (let n = 1; n < i.length; n++) i[n].t <= i[n - 1].t && o("R2D_VALUE_INVALID", `${e}.keys[${n}].t`, "particle curve keys must be strictly ordered.");
  return Object.freeze({ keys: i });
}
function et(r, e) {
  const t = $(r, e, [...me, "texture", "material", "capacity", "emissionRate", "lifetime", "speed", "angle", "gravity", "size", "fixedStepHz", "seed", "autoplay", "duration", "loop", "offscreen", "maxBurst", "rotation", "angularVelocity", "sizeCurve", "opacityCurve", "colorStart", "colorEnd"]);
  return Object.freeze({
    ...pe(t, e),
    ...t.texture === void 0 ? {} : { texture: y(t.texture, `${e}.texture`) },
    material: y(t.material, `${e}.material`),
    capacity: g(t.capacity, `${e}.capacity`, 1, l.particleCapacity),
    emissionRate: E(t.emissionRate, `${e}.emissionRate`, 0),
    lifetime: Y(t.lifetime, `${e}.lifetime`, Number.EPSILON),
    speed: t.speed === void 0 ? Object.freeze([0, 0]) : Y(t.speed, `${e}.speed`, 0),
    angle: t.angle === void 0 ? Object.freeze([0, 0]) : Y(t.angle, `${e}.angle`),
    gravity: t.gravity === void 0 ? Object.freeze([0, 0]) : G(t.gravity, `${e}.gravity`),
    size: t.size === void 0 ? Object.freeze([1, 1]) : Y(t.size, `${e}.size`, 0),
    fixedStepHz: t.fixedStepHz === void 0 ? 60 : g(t.fixedStepHz, `${e}.fixedStepHz`, 1, 1e3),
    seed: t.seed === void 0 ? 1 : g(t.seed, `${e}.seed`, 1, 4294967295),
    autoplay: t.autoplay === void 0 ? !0 : S(t.autoplay, `${e}.autoplay`),
    ...t.duration === void 0 ? {} : { duration: E(t.duration, `${e}.duration`, Number.EPSILON) },
    loop: t.loop === void 0 ? !0 : S(t.loop, `${e}.loop`),
    offscreen: t.offscreen === void 0 ? "continue" : x(t.offscreen, `${e}.offscreen`, ["continue", "pause-when-hidden"]),
    maxBurst: t.maxBurst === void 0 ? Math.min(1024, g(t.capacity, `${e}.capacity`, 1, l.particleCapacity)) : g(t.maxBurst, `${e}.maxBurst`, 0, l.particleBurst),
    rotation: t.rotation === void 0 ? Object.freeze([0, 0]) : Y(t.rotation, `${e}.rotation`),
    angularVelocity: t.angularVelocity === void 0 ? Object.freeze([0, 0]) : Y(t.angularVelocity, `${e}.angularVelocity`),
    ...t.sizeCurve === void 0 ? {} : { sizeCurve: De(t.sizeCurve, `${e}.sizeCurve`) },
    ...t.opacityCurve === void 0 ? {} : { opacityCurve: De(t.opacityCurve, `${e}.opacityCurve`) },
    colorStart: t.colorStart === void 0 ? Object.freeze([1, 1, 1, 1]) : F(t.colorStart, `${e}.colorStart`),
    colorEnd: t.colorEnd === void 0 ? Object.freeze([1, 1, 1, 0]) : F(t.colorEnd, `${e}.colorEnd`)
  });
}
const J = "forgeng.render2d:lighting-v1", Ie = "forgeng.render2d:effects-v1", ve = "forgeng.render2d:path-masks-v1";
function jt(r) {
  if (!r.id || r.size === void 0 == (r.scale === void 0)) throw new TypeError("Render2D ping-pong pair requires an id and exactly one of size or scale.");
  const e = `${r.id}:a`, t = `${r.id}:b`, i = (n) => Object.freeze({ id: n, ...r.size ? { size: Object.freeze([...r.size]) } : { scale: r.scale }, format: r.format ?? "rgba8unorm", sampleCount: 1, persistent: !0 });
  return Object.freeze({
    targets: Object.freeze([i(e), i(t)]),
    read: (n) => (Ae(n), n % 2 === 0 ? e : t),
    write: (n) => (Ae(n), n % 2 === 0 ? t : e)
  });
}
function Ae(r) {
  if (!Number.isSafeInteger(r) || r < 0) throw new TypeError("Render2D ping-pong frame must be a non-negative safe integer.");
}
function tt(r, e) {
  const t = $(r, e, ["id", "entity", "kind", "transform", "rect", "points", "layers", "enabled", "extensions"]), i = x(t.kind, `${e}.kind`, ["rect", "polygon"]), n = t.points === void 0 ? void 0 : L(t.points, `${e}.points`, l.pathMaskPoints, (s, a) => G(s, a));
  return i === "rect" && t.rect === void 0 && o("R2D_VALUE_INVALID", `${e}.rect`, "rect shadow casters require a rectangle."), i === "polygon" && (!n || n.length < 3) && o("R2D_VALUE_INVALID", `${e}.points`, "polygon shadow casters require at least three points."), Object.freeze({
    id: y(t.id, `${e}.id`),
    entity: y(t.entity, `${e}.entity`),
    kind: i,
    ...t.transform === void 0 ? {} : { transform: ue(t.transform, `${e}.transform`) },
    ...t.rect === void 0 ? {} : { rect: X(t.rect, `${e}.rect`) },
    ...n === void 0 ? {} : { points: n },
    layers: t.layers === void 0 ? Object.freeze([]) : k(t.layers, `${e}.layers`),
    enabled: t.enabled === void 0 ? !0 : S(t.enabled, `${e}.enabled`),
    ...h(t, e)
  });
}
function rt(r, e) {
  const t = $(r, e, ["id", "kind", "input", "output", "enabled", "required", "order", "options", "extensions"]), i = t.options === void 0 ? {} : $(t.options, `${e}.options`, ["brightness", "contrast", "saturation"]);
  return Object.freeze({
    id: y(t.id, `${e}.id`),
    kind: x(t.kind, `${e}.kind`, ["color-adjust"]),
    input: y(t.input, `${e}.input`),
    output: t.output === "surface" ? "surface" : y(t.output, `${e}.output`),
    enabled: t.enabled === void 0 ? !0 : S(t.enabled, `${e}.enabled`),
    required: t.required === void 0 ? !1 : S(t.required, `${e}.required`),
    order: t.order === void 0 ? 0 : g(t.order, `${e}.order`, -2147483648, 2147483647),
    options: Object.freeze({ brightness: i.brightness === void 0 ? 0 : E(i.brightness, `${e}.options.brightness`, -1, 1), contrast: i.contrast === void 0 ? 1 : E(i.contrast, `${e}.options.contrast`, 0, 4), saturation: i.saturation === void 0 ? 1 : E(i.saturation, `${e}.options.saturation`, 0, 4) }),
    ...h(t, e)
  });
}
function it(r, e) {
  if (r.capability !== J) return r;
  const t = $(r.options ?? {}, `${e}.options`, ["maxLightsPerCamera", "shadows", "maxShadowSegmentsPerCamera"]);
  return Object.freeze({ ...r, options: Object.freeze({
    maxLightsPerCamera: t.maxLightsPerCamera === void 0 ? 32 : g(t.maxLightsPerCamera, `${e}.options.maxLightsPerCamera`, 1, l.visibleLightsPerCamera),
    shadows: t.shadows === void 0 ? "off" : x(t.shadows, `${e}.options.shadows`, ["off", "hard"]),
    maxShadowSegmentsPerCamera: t.maxShadowSegmentsPerCamera === void 0 ? 2048 : g(t.maxShadowSegmentsPerCamera, `${e}.options.maxShadowSegmentsPerCamera`, 0, l.shadowSegmentsPerCamera)
  }) });
}
function nt(r) {
  const e = new Map(r.renderTargets.map((c) => [c.id, c])), t = new Set(r.features.map((c) => c.capability)), i = new Map(r.materials.map((c) => [c.id, c])), n = new Map(r.renderTargets.map((c) => [c.id, /* @__PURE__ */ new Set()])), s = /* @__PURE__ */ new Set(), a = (c, p, b) => {
    e.has(c) || o("R2D_REFERENCE_MISSING", b, `missing input target "${c}".`), p !== "surface" && !e.has(p) && o("R2D_REFERENCE_MISSING", b, `missing output target "${p}".`), c === p && o("R2D_GRAPH_CYCLE", b, "render-target feedback requires an explicit ping-pong pair."), s.add(c), p !== "surface" && n.get(c).add(p);
  };
  r.sprites.forEach((c, p) => {
    const b = i.get(c.material);
    if (b?.builtin === "sprite-lit" && !c.normalTexture && o("R2D_VALUE_INVALID", `$.sprites[${p}].normalTexture`, "sprite-lit materials require a normal texture."), c.normalTexture && b?.builtin !== "sprite-lit" && o("R2D_VALUE_INVALID", `$.sprites[${p}].normalTexture`, "normal textures require the sprite-lit material."), b?.builtin === "sprite-lit" && !t.has(J) && o("R2D_CAPABILITY_UNSUPPORTED", `$.sprites[${p}].material`, `sprite-lit requires ${J}.`), !c.sourceTarget) return;
    const A = c.target ? [c.target] : r.cameras.filter((R) => (R.layers ?? []).length === 0 || (R.layers ?? []).includes(c.layer)).map((R) => R.target ?? "surface");
    for (const R of A) a(c.sourceTarget, R, `$.sprites[${p}].sourceTarget`);
  }), r.effects.forEach((c, p) => a(c.input, c.output, `$.effects[${p}]`)), r.effects.length > 0 && !t.has(Ie) && o("R2D_CAPABILITY_UNSUPPORTED", "$.effects", `effects require ${Ie}.`), r.masks.some((c) => c.kind === "path") && !t.has(ve) && o("R2D_CAPABILITY_UNSUPPORTED", "$.masks", `path masks require ${ve}.`), r.lights.some((c) => c.shadow?.enabled) && !t.has(J) && o("R2D_CAPABILITY_UNSUPPORTED", "$.lights", `hard shadows require ${J}.`);
  for (const c of s) (e.get(c)?.sampleCount ?? 1) !== 1 && o("R2D_VALUE_INVALID", "$.renderTargets", `sampled target "${c}" must use sampleCount 1.`);
  const u = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), m = (c) => {
    u.has(c) && o("R2D_GRAPH_CYCLE", "$.renderTargets", `render-target cycle includes "${c}"; use createRender2dPingPongPair for temporal feedback.`), !f.has(c) && (u.add(c), n.get(c).forEach(m), u.delete(c), f.add(c));
  };
  for (const c of n.keys()) m(c);
}
const Pt = Object.freeze([J, Ie, ve]);
function Ve(r, e) {
  if (r === "f32") return typeof e == "number" && Number.isFinite(e);
  if (!Array.isArray(e)) return !1;
  const t = r === "vec2f" ? 2 : 4;
  return e.length === t && e.every((i) => typeof i == "number" && Number.isFinite(i));
}
function st(r, e = "$") {
  const t = $(r, e, ["apiVersion", "uniforms", "textures"]);
  t.apiVersion !== 1 && o("R2D_VERSION_UNSUPPORTED", `${e}.apiVersion`, "expected 1.");
  const i = /* @__PURE__ */ new Set();
  let n = 0;
  const s = L(t.uniforms ?? [], `${e}.uniforms`, 12, (f, m) => {
    const c = $(f, m, ["name", "type", "required", "default"]), p = U(c.name, `${m}.name`, 64);
    ce.test(p) || o("R2D_VALUE_INVALID", `${m}.name`, "expected an identifier."), i.has(p) && o("R2D_ID_DUPLICATE", `${m}.name`, `duplicate field "${p}".`), i.add(p);
    const b = x(c.type, `${m}.type`, ["f32", "vec2f", "vec4f"]);
    return n += b === "f32" ? 1 : b === "vec2f" ? 2 : 4, n > 12 && o("R2D_LIMIT_EXCEEDED", `${e}.uniforms`, "custom uniforms exceed the 48-byte material region."), c.default !== void 0 && !Ve(b, c.default) && o("R2D_VALUE_INVALID", `${m}.default`, `default does not match ${b}.`), Object.freeze({ name: p, type: b, required: c.required === void 0 ? !1 : S(c.required, `${m}.required`), ...c.default === void 0 ? {} : { default: Object.freeze(Array.isArray(c.default) ? [...c.default] : c.default) } });
  }), a = /* @__PURE__ */ new Set(), u = L(t.textures ?? [], `${e}.textures`, 2, (f, m) => {
    const c = $(f, m, ["name", "source", "sampleType", "required"]), p = U(c.name, `${m}.name`, 64);
    ce.test(p) || o("R2D_VALUE_INVALID", `${m}.name`, "expected an identifier."), i.has(p) && o("R2D_ID_DUPLICATE", `${m}.name`, `duplicate field "${p}".`), i.add(p);
    const b = x(c.source, `${m}.source`, ["sprite", "normal"]);
    return a.has(b) && o("R2D_ID_DUPLICATE", `${m}.source`, `duplicate texture source "${b}".`), a.add(b), Object.freeze({ name: p, source: b, sampleType: x(c.sampleType, `${m}.sampleType`, ["float"]), required: c.required === void 0 ? b === "sprite" : S(c.required, `${m}.required`) });
  });
  return u.some((f) => f.source === "sprite" && f.required) || o("R2D_VALUE_INVALID", `${e}.textures`, "a required sprite texture binding is mandatory."), Object.freeze({ apiVersion: 1, uniforms: s, textures: u });
}
function ot(r, e, t = "$.parameters") {
  const i = new Map(r.uniforms.map((s) => [s.name, s]));
  for (const s of Object.keys(e)) {
    const a = i.get(s);
    a || o("R2D_UNKNOWN_KEY", `${t}.${s}`, "parameter is not declared by the material schema."), Ve(a.type, e[s]) || o("R2D_VALUE_INVALID", `${t}.${s}`, `value does not match ${a.type}.`);
  }
  const n = { ...e };
  for (const s of r.uniforms)
    n[s.name] === void 0 && s.default !== void 0 && (n[s.name] = s.default), n[s.name] === void 0 && s.required && o("R2D_VALUE_INVALID", `${t}.${s.name}`, "required parameter is missing.");
  return Object.freeze(n);
}
function at(r, e) {
  const t = $(r, e, ["id", "order", "visible", "opacity", "extensions"]);
  return Object.freeze({ id: y(t.id, `${e}.id`), ...t.order === void 0 ? {} : { order: Re(t.order, `${e}.order`) }, visible: t.visible === void 0 ? !0 : S(t.visible, `${e}.visible`), opacity: t.opacity === void 0 ? 1 : E(t.opacity, `${e}.opacity`, 0, 1), ...h(t, e) });
}
function ct(r, e) {
  const t = $(r, e, ["id", "order", "viewport", "virtualSize", "scaleMode", "pixelSnap", "space", "safeArea", "sampling", "position", "rotation", "zoom", "clearColor", "layers", "target", "extensions"]), i = t.viewport === void 0 ? Object.freeze([0, 0, 1, 1]) : X(t.viewport, `${e}.viewport`);
  return (i[0] < 0 || i[1] < 0 || i[2] <= 0 || i[3] <= 0 || i[0] + i[2] > 1 || i[1] + i[3] > 1) && o("R2D_VALUE_INVALID", `${e}.viewport`, "camera viewport must be a positive normalized rectangle inside 0..1."), Object.freeze({
    id: y(t.id, `${e}.id`),
    order: t.order === void 0 ? 0 : g(t.order, `${e}.order`, -2147483648, 2147483647),
    viewport: i,
    virtualSize: le(t.virtualSize, `${e}.virtualSize`),
    scaleMode: t.scaleMode === void 0 ? "fit" : x(t.scaleMode, `${e}.scaleMode`, ["stretch", "fit", "fill", "integer-fit", "none"]),
    pixelSnap: t.pixelSnap === void 0 ? "off" : x(t.pixelSnap, `${e}.pixelSnap`, ["off", "camera", "camera-and-items"]),
    space: t.space === void 0 ? "world" : x(t.space, `${e}.space`, ["world", "screen"]),
    safeArea: t.safeArea === void 0 ? !0 : S(t.safeArea, `${e}.safeArea`),
    sampling: t.sampling === void 0 ? "asset" : x(t.sampling, `${e}.sampling`, ["asset", "nearest", "linear"]),
    position: t.position === void 0 ? Object.freeze([0, 0]) : G(t.position, `${e}.position`),
    rotation: t.rotation === void 0 ? 0 : E(t.rotation, `${e}.rotation`),
    zoom: t.zoom === void 0 ? 1 : E(t.zoom, `${e}.zoom`, Number.EPSILON),
    clearColor: t.clearColor === void 0 || t.clearColor === null ? null : F(t.clearColor, `${e}.clearColor`),
    layers: t.layers === void 0 ? Object.freeze([]) : k(t.layers, `${e}.layers`),
    ...t.target === void 0 ? {} : { target: y(t.target, `${e}.target`) },
    ...h(t, e)
  });
}
function dt(r, e) {
  const t = $(r, e, ["id", "minFilter", "magFilter", "mipmapFilter", "addressU", "addressV", "maxAnisotropy", "extensions"]);
  return Object.freeze({ id: y(t.id, `${e}.id`), minFilter: t.minFilter === void 0 ? "linear" : x(t.minFilter, `${e}.minFilter`, ["nearest", "linear"]), magFilter: t.magFilter === void 0 ? "linear" : x(t.magFilter, `${e}.magFilter`, ["nearest", "linear"]), mipmapFilter: t.mipmapFilter === void 0 ? "linear" : x(t.mipmapFilter, `${e}.mipmapFilter`, ["nearest", "linear"]), addressU: t.addressU === void 0 ? "clamp-to-edge" : x(t.addressU, `${e}.addressU`, ["clamp-to-edge", "repeat", "mirror-repeat"]), addressV: t.addressV === void 0 ? "clamp-to-edge" : x(t.addressV, `${e}.addressV`, ["clamp-to-edge", "repeat", "mirror-repeat"]), maxAnisotropy: t.maxAnisotropy === void 0 ? 1 : g(t.maxAnisotropy, `${e}.maxAnisotropy`, 1, 16), ...h(t, e) });
}
function mt(r, e) {
  const t = $(r, e, ["id", "kind", "builtin", "shaderAsset", "shaderAbi", "schema", "sampler", "blendMode", "depthMode", "reorderSafe", "parameters", "extensions"]), i = x(t.kind, `${e}.kind`, ["builtin", "custom"]);
  i === "builtin" && t.shaderAsset !== void 0 && o("R2D_VALUE_INVALID", `${e}.shaderAsset`, "builtin materials cannot define a shader asset."), i === "custom" && t.shaderAsset === void 0 && o("R2D_VALUE_INVALID", `${e}.shaderAsset`, "custom materials require a shader asset.");
  const n = t.shaderAbi === void 0 ? void 0 : (() => {
    const c = $(t.shaderAbi, `${e}.shaderAbi`, ["version", "vertexEntry", "fragmentEntry", "bindings", "attributes"]);
    c.version !== 1 && o("R2D_VERSION_UNSUPPORTED", `${e}.shaderAbi.version`, "expected 1.");
    const p = c.bindings === void 0 ? [] : L(c.bindings, `${e}.shaderAbi.bindings`, 32, (b, A) => {
      const R = $(b, A, ["name", "kind", "valueType", "group", "binding", "visibility"]), C = U(R.name, `${A}.name`, 64);
      return ce.test(C) || o("R2D_VALUE_INVALID", `${A}.name`, "expected an identifier."), Object.freeze({ name: C, kind: x(R.kind, `${A}.kind`, ["uniform", "texture", "sampler", "storage-read"]), ...R.valueType === void 0 ? {} : { valueType: x(R.valueType, `${A}.valueType`, ["f32", "vec2f", "vec3f", "vec4f", "mat3x2f", "mat4x4f"]) }, ...R.group === void 0 ? {} : { group: g(R.group, `${A}.group`, 0, 0) }, ...R.binding === void 0 ? {} : { binding: g(R.binding, `${A}.binding`, 0, 4) }, ...R.visibility === void 0 ? {} : { visibility: x(R.visibility, `${A}.visibility`, ["vertex", "fragment", "vertex-fragment"]) } });
    });
    return Object.freeze({ version: 1, vertexEntry: U(c.vertexEntry, `${e}.shaderAbi.vertexEntry`, 64), fragmentEntry: U(c.fragmentEntry, `${e}.shaderAbi.fragmentEntry`, 64), bindings: p, attributes: c.attributes === void 0 ? Object.freeze([]) : L(c.attributes, `${e}.shaderAbi.attributes`, 8, (b, A) => x(b, A, ["position", "uv", "color", "instance-transform"])) });
  })(), s = {};
  if (t.parameters !== void 0) for (const [c, p] of Object.entries($(t.parameters, `${e}.parameters`)).sort(([b], [A]) => b.localeCompare(A)))
    ce.test(c) || o("R2D_VALUE_INVALID", `${e}.parameters.${c}`, "expected an identifier key."), s[c] = typeof p == "number" ? E(p, `${e}.parameters.${c}`) : Array.isArray(p) && p.length === 2 ? G(p, `${e}.parameters.${c}`) : F(p, `${e}.parameters.${c}`);
  const a = t.schema === void 0 ? void 0 : st(t.schema, `${e}.schema`), u = a === void 0 ? Object.freeze(s) : ot(a, s, `${e}.parameters`), f = t.blendMode === void 0 ? "alpha" : x(t.blendMode, `${e}.blendMode`, ["opaque", "alpha", "premultiplied-alpha", "add", "multiply", "screen"]), m = t.reorderSafe === void 0 ? !1 : S(t.reorderSafe, `${e}.reorderSafe`);
  return m && f !== "opaque" && o("R2D_VALUE_INVALID", `${e}.reorderSafe`, "only opaque materials may opt into reorder-safe grouping."), Object.freeze({ id: y(t.id, `${e}.id`), kind: i, ...t.builtin === void 0 ? {} : { builtin: x(t.builtin, `${e}.builtin`, ["sprite", "sprite-lit", "bitmap-text", "msdf-text", "particle"]) }, ...t.shaderAsset === void 0 ? {} : { shaderAsset: y(t.shaderAsset, `${e}.shaderAsset`) }, ...n === void 0 ? {} : { shaderAbi: n }, ...a === void 0 ? {} : { schema: a }, ...t.sampler === void 0 ? {} : { sampler: y(t.sampler, `${e}.sampler`) }, blendMode: f, depthMode: t.depthMode === void 0 ? "disabled" : x(t.depthMode, `${e}.depthMode`, ["disabled", "read", "read-write"]), reorderSafe: m, parameters: u, ...h(t, e) });
}
function lt(r, e) {
  const t = $(r, e, ["id", "size", "scale", "format", "sampleCount", "clearColor", "persistent", "extensions"]);
  t.size === void 0 && t.scale === void 0 && o("R2D_VALUE_INVALID", e, "render target requires size or scale."), t.size !== void 0 && t.scale !== void 0 && o("R2D_VALUE_INVALID", e, "render target size and scale are mutually exclusive.");
  const i = t.sampleCount === void 0 ? 1 : g(t.sampleCount, `${e}.sampleCount`, 1, 8);
  return de.includes(i) || o("R2D_VALUE_INVALID", `${e}.sampleCount`, "expected 1, 2, 4, or 8."), Object.freeze({ id: y(t.id, `${e}.id`), ...t.size === void 0 ? {} : { size: le(t.size, `${e}.size`) }, ...t.scale === void 0 ? {} : { scale: E(t.scale, `${e}.scale`, Number.EPSILON, 4) }, format: t.format === void 0 ? "rgba8unorm-srgb" : x(t.format, `${e}.format`, be), sampleCount: i, clearColor: t.clearColor === void 0 ? Object.freeze([0, 0, 0, 0]) : F(t.clearColor, `${e}.clearColor`), persistent: t.persistent === void 0 ? !1 : S(t.persistent, `${e}.persistent`), ...h(t, e) });
}
function ut(r, e) {
  const t = $(r, e, ["id", "capability", "required", "order", "options", "extensions"]), i = {};
  if (t.options !== void 0) for (const [n, s] of Object.entries($(t.options, `${e}.options`)).sort(([a], [u]) => a.localeCompare(u))) i[n] = B(s, `${e}.options.${n}`);
  return it(Object.freeze({ id: y(t.id, `${e}.id`), capability: y(t.capability, `${e}.capability`), required: t.required === void 0 ? !1 : S(t.required, `${e}.required`), ...t.order === void 0 ? {} : { order: Re(t.order, `${e}.order`) }, options: Object.freeze(i), ...h(t, e) }), e);
}
function ft(r) {
  const e = [r.layers, r.cameras, r.samplers, r.materials, r.sprites, r.tilemaps, r.texts, r.animations, r.particles, r.lights, r.masks, r.shadowCasters, r.renderTargets, r.effects, r.features], t = ["layers", "cameras", "samplers", "materials", "sprites", "tilemaps", "texts", "animations", "particles", "lights", "masks", "shadowCasters", "renderTargets", "effects", "features"], i = /* @__PURE__ */ new Map();
  e.forEach((d, v) => d.forEach((_, D) => {
    const P = i.get(_.id);
    P && o("R2D_ID_DUPLICATE", `$.${t[v]}[${D}].id`, `duplicate "${_.id}" first declared at ${P}.`), i.set(_.id, `$.${t[v]}[${D}].id`);
  }));
  const n = new Set(r.layers.map((d) => d.id)), s = new Set(r.materials.map((d) => d.id)), a = new Set(r.samplers.map((d) => d.id)), u = new Set(r.masks.map((d) => d.id)), f = new Set(r.renderTargets.map((d) => d.id)), m = [...r.sprites, ...r.tilemaps, ...r.texts, ...r.particles], c = new Set([...m, ...r.features].map((d) => d.id)), p = /* @__PURE__ */ new Map(), b = (d, v, _) => {
    v !== void 0 && !d.has(v) && o("R2D_REFERENCE_MISSING", _, `missing reference "${v}".`);
  };
  r.materials.forEach((d, v) => b(a, d.sampler, `$.materials[${v}].sampler`)), r.cameras.forEach((d, v) => {
    d.layers?.forEach((_, D) => b(n, _, `$.cameras[${v}].layers[${D}]`)), b(f, d.target, `$.cameras[${v}].target`);
  }), m.forEach((d, v) => {
    const _ = v < r.sprites.length ? "sprites" : v < r.sprites.length + r.tilemaps.length ? "tilemaps" : v < r.sprites.length + r.tilemaps.length + r.texts.length ? "texts" : "particles", D = _ === "sprites" ? 0 : _ === "tilemaps" ? r.sprites.length : _ === "texts" ? r.sprites.length + r.tilemaps.length : r.sprites.length + r.tilemaps.length + r.texts.length, P = `$.${_}[${v - D}]`;
    b(n, d.layer, `${P}.layer`), b(s, d.material, `${P}.material`), b(u, d.mask, `${P}.mask`), b(f, d.target, `${P}.target`);
    const ie = d.parent?.id, ge = p.get(d.entity);
    p.has(d.entity) && ge !== ie && o("R2D_VALUE_INVALID", `${P}.parent`, `entity "${d.entity}" has conflicting parents.`), p.set(d.entity, ie);
  }), [...r.lights, ...r.masks].forEach((d) => {
    p.has(d.entity) || p.set(d.entity, d.parent?.id);
  });
  for (const [d, v] of p) v !== void 0 && !p.has(v) && o("R2D_REFERENCE_MISSING", "$.parent", `entity "${d}" references missing parent "${v}".`);
  const A = (d, v, _) => {
    if (v.has(d) && o("R2D_GRAPH_CYCLE", "$.parent", `parent cycle includes "${d}".`), _.has(d)) return;
    v.add(d);
    const D = p.get(d);
    D !== void 0 && A(D, v, _), v.delete(d), _.add(d);
  }, R = /* @__PURE__ */ new Set();
  for (const d of p.keys()) A(d, /* @__PURE__ */ new Set(), R);
  const C = /* @__PURE__ */ new Set([...n, ...c]), N = new Map([...C].map((d) => [d, /* @__PURE__ */ new Set()])), T = (d, v) => {
    for (const _ of ["before", "after"]) d.order?.[_]?.forEach((D, P) => {
      b(D.kind === "layer" ? n : c, D.id, `${v}.order.${_}[${P}].id`);
      const ie = _ === "before" ? d.id : D.id, ge = _ === "before" ? D.id : d.id;
      N.get(ie).add(ge);
    });
  };
  r.layers.forEach((d, v) => T(d, `$.layers[${v}]`)), m.forEach((d, v) => T(d, `$.items[${v}]`)), r.features.forEach((d, v) => T(d, `$.features[${v}]`));
  const K = /* @__PURE__ */ new Set(), re = /* @__PURE__ */ new Set(), Q = (d) => {
    K.has(d) && o("R2D_GRAPH_CYCLE", "$.order", `ordering cycle includes "${d}".`), !re.has(d) && (K.add(d), N.get(d).forEach(Q), K.delete(d), re.add(d));
  };
  C.forEach(Q), r.animations.forEach((d, v) => d.tracks.forEach((_, D) => b(c, _.target, `$.animations[${v}].tracks[${D}].target`))), r.animations.forEach((d, v) => b(c, d.target, `$.animations[${v}].target`)), r.lights.forEach((d, v) => d.layers?.forEach((_, D) => b(n, _, `$.lights[${v}].layers[${D}]`))), r.shadowCasters.forEach((d, v) => d.layers?.forEach((_, D) => b(n, _, `$.shadowCasters[${v}].layers[${D}]`))), r.particles.reduce((d, v) => d + v.capacity, 0) > l.particleSceneCapacity && o("R2D_LIMIT_EXCEEDED", "$.particles", `total particle capacity exceeds ${l.particleSceneCapacity}.`), nt(r);
}
function he(r) {
  const e = $(r, "$", ["contractVersion", "id", "version", "coordinateSystem", "colorSpace", "layers", "cameras", "samplers", "materials", "sprites", "tilemaps", "texts", "animations", "particles", "lights", "masks", "shadowCasters", "renderTargets", "effects", "features", "extensions"]);
  e.contractVersion !== 1 && o("R2D_VERSION_UNSUPPORTED", "$.contractVersion", "expected 1.");
  const t = (n, s, a) => L(e[n] ?? [], `$.${n}`, s, a), i = Object.freeze({
    contractVersion: 1,
    id: y(e.id, "$.id"),
    version: e.version === void 0 ? 1 : g(e.version, "$.version", 1),
    coordinateSystem: e.coordinateSystem === void 0 ? "x-right-y-down-clockwise-radians" : x(e.coordinateSystem, "$.coordinateSystem", ["x-right-y-down-clockwise-radians"]),
    colorSpace: e.colorSpace === void 0 ? "srgb-straight-alpha" : x(e.colorSpace, "$.colorSpace", ["srgb-straight-alpha"]),
    layers: t("layers", l.layers, at),
    cameras: t("cameras", l.cameras, ct),
    samplers: t("samplers", l.samplers, dt),
    materials: t("materials", l.materials, mt),
    sprites: t("sprites", l.sprites, Ye),
    tilemaps: t("tilemaps", l.tilemaps, We),
    texts: t("texts", l.texts, Je),
    animations: t("animations", l.animations, Ze),
    particles: t("particles", l.particles, et),
    lights: t("lights", l.lights, Xe),
    masks: t("masks", l.masks, Ke),
    shadowCasters: t("shadowCasters", l.shadowCasters, tt),
    renderTargets: t("renderTargets", l.renderTargets, lt),
    effects: t("effects", l.effects, rt),
    features: t("features", l.features, ut),
    ...h(e, "$")
  });
  return ft(i), i;
}
function Mt(r) {
  return he(r);
}
function ke(r, e, t) {
  const i = $(r, e, ["textureFormats", "maxTextureDimension2d", "maxTextureArrayLayers", "sampleCounts", "timestampQueries", "storageBuffers", "textureArrays", "masks", "lighting", "effects", "extensions"]), n = i.textureFormats === void 0 ? [] : L(i.textureFormats, `${e}.textureFormats`, be.length, (u, f) => x(u, f, be)), s = i.sampleCounts === void 0 ? [] : L(i.sampleCounts, `${e}.sampleCounts`, de.length, (u, f) => {
    const m = g(u, f, 1, 8);
    return de.includes(m) || o("R2D_VALUE_INVALID", f, "expected 1, 2, 4, or 8."), m;
  }), a = {
    ...t || i.textureFormats !== void 0 ? { textureFormats: n } : {},
    ...t || i.maxTextureDimension2d !== void 0 ? { maxTextureDimension2d: g(i.maxTextureDimension2d ?? 0, `${e}.maxTextureDimension2d`, 0, l.textureDimension2d) } : {},
    ...t || i.maxTextureArrayLayers !== void 0 ? { maxTextureArrayLayers: g(i.maxTextureArrayLayers ?? 0, `${e}.maxTextureArrayLayers`, 0, l.textureArrayLayers) } : {},
    ...t || i.sampleCounts !== void 0 ? { sampleCounts: s } : {},
    ...Object.fromEntries(["timestampQueries", "storageBuffers", "textureArrays", "masks", "lighting"].filter((u) => t || i[u] !== void 0).map((u) => [u, i[u] === void 0 ? !1 : S(i[u], `${e}.${u}`)])),
    ...t || i.effects !== void 0 ? { effects: i.effects === void 0 ? Object.freeze([]) : k(i.effects, `${e}.effects`) } : {},
    ...h(i, e)
  };
  return Object.freeze(a);
}
function pt(r) {
  return ke(r, "$", !1);
}
function yt(r) {
  return ke(r, "$", !0);
}
function wt(r, e) {
  const t = pt(r), i = yt(e), n = [], s = (a, u, f, m) => n.push(Object.freeze({ code: a, path: u, requested: f, available: m }));
  t.textureFormats?.forEach((a, u) => {
    i.textureFormats.includes(a) || s("R2D_FORMAT_UNSUPPORTED", `$.textureFormats[${u}]`, a, i.textureFormats);
  }), t.sampleCounts?.forEach((a, u) => {
    i.sampleCounts.includes(a) || s("R2D_SAMPLE_COUNT_UNSUPPORTED", `$.sampleCounts[${u}]`, a, i.sampleCounts);
  }), (t.maxTextureDimension2d ?? 0) > i.maxTextureDimension2d && s("R2D_LIMIT_EXCEEDED", "$.maxTextureDimension2d", t.maxTextureDimension2d, i.maxTextureDimension2d), (t.maxTextureArrayLayers ?? 0) > i.maxTextureArrayLayers && s("R2D_LIMIT_EXCEEDED", "$.maxTextureArrayLayers", t.maxTextureArrayLayers, i.maxTextureArrayLayers);
  for (const a of ["timestampQueries", "storageBuffers", "textureArrays", "masks", "lighting"]) t[a] === !0 && !i[a] && s("R2D_CAPABILITY_MISSING", `$.${a}`, !0, !1);
  return t.effects?.forEach((a, u) => {
    i.effects.includes(a) || s("R2D_CAPABILITY_MISSING", `$.effects[${u}]`, a, i.effects);
  }), Object.freeze({ compatible: n.length === 0, requested: t, effective: i, rejections: Object.freeze(n) });
}
function $e(r, e = "$") {
  const t = $(r, e, ["snapshotVersion", "resolutionScale", "sampleCount", "textureFilter", "lighting", "masks", "effects"]);
  t.snapshotVersion !== void 0 && t.snapshotVersion !== 1 && o("R2D_VERSION_UNSUPPORTED", `${e}.snapshotVersion`, "expected 1.");
  const i = t.sampleCount === void 0 ? 1 : g(t.sampleCount, `${e}.sampleCount`, 1, 8);
  return de.includes(i) || o("R2D_VALUE_INVALID", `${e}.sampleCount`, "expected 1, 2, 4, or 8."), Object.freeze({ snapshotVersion: 1, resolutionScale: t.resolutionScale === void 0 ? 1 : E(t.resolutionScale, `${e}.resolutionScale`, 0.25, 2), sampleCount: i, textureFilter: t.textureFilter === void 0 ? "linear" : x(t.textureFilter, `${e}.textureFilter`, ["nearest", "linear"]), lighting: t.lighting === void 0 ? !1 : S(t.lighting, `${e}.lighting`), masks: t.masks === void 0 ? !0 : S(t.masks, `${e}.masks`), effects: t.effects === void 0 ? Object.freeze([]) : k(t.effects, `${e}.effects`) });
}
function Ut(r) {
  const e = $(r, "$", ["snapshotVersion", "revision", "definitionId", "generation", "phase", "requested", "effective", "committed", "rejections"]);
  e.snapshotVersion !== 1 && o("R2D_VERSION_UNSUPPORTED", "$.snapshotVersion", "expected 1.");
  const t = L(e.rejections, "$.rejections", l.features, (i, n) => {
    const s = $(i, n, ["code", "path", "requested", "available"]);
    return Object.freeze({ code: x(s.code, `${n}.code`, ["R2D_CAPABILITY_MISSING", "R2D_LIMIT_EXCEEDED", "R2D_FORMAT_UNSUPPORTED", "R2D_SAMPLE_COUNT_UNSUPPORTED"]), path: U(s.path, `${n}.path`, 512), requested: B(s.requested, `${n}.requested`), available: B(s.available, `${n}.available`) });
  });
  return Object.freeze({ snapshotVersion: 1, revision: g(e.revision, "$.revision"), definitionId: y(e.definitionId, "$.definitionId"), generation: g(e.generation, "$.generation", 1), phase: x(e.phase, "$.phase", ["created", "probing", "initializing", "ready", "attaching", "attached", "extracting", "contributing", "lost", "recovering", "failed", "detaching", "destroying", "destroyed"]), requested: $e(e.requested, "$.requested"), effective: $e(e.effective, "$.effective"), committed: e.committed === null ? null : $e(e.committed, "$.committed"), rejections: t });
}
function gt(r, e) {
  const t = $(r, e, ["id", "kind", "entity", "layer", "order", "bounds", "opacity", "tint", "assetIds", "transform", "materialId", "targetId", "maskId"]), i = t.transform === void 0 ? void 0 : q(t.transform, `${e}.transform`, 6);
  return Object.freeze({ id: y(t.id, `${e}.id`), kind: x(t.kind, `${e}.kind`, ["sprite", "tilemap", "text", "particle", "light", "mask"]), entity: y(t.entity, `${e}.entity`), layer: y(t.layer, `${e}.layer`), order: g(t.order, `${e}.order`, -2147483648, 2147483647), bounds: X(t.bounds, `${e}.bounds`), opacity: E(t.opacity, `${e}.opacity`, 0, 1), tint: F(t.tint, `${e}.tint`), assetIds: k(t.assetIds, `${e}.assetIds`), ...i === void 0 ? {} : { transform: i }, ...t.materialId === void 0 ? {} : { materialId: y(t.materialId, `${e}.materialId`) }, ...t.targetId === void 0 ? {} : { targetId: y(t.targetId, `${e}.targetId`) }, ...t.maskId === void 0 ? {} : { maskId: t.maskId === null ? null : y(t.maskId, `${e}.maskId`) } });
}
function qt(r) {
  const e = $(r, "$", ["snapshotVersion", "sceneId", "sceneGeneration", "frame", "simulationTick", "alpha", "cameraIds", "items"]);
  return e.snapshotVersion !== 1 && o("R2D_VERSION_UNSUPPORTED", "$.snapshotVersion", "expected 1."), Object.freeze({ snapshotVersion: 1, sceneId: y(e.sceneId, "$.sceneId"), sceneGeneration: g(e.sceneGeneration, "$.sceneGeneration", 1), frame: g(e.frame, "$.frame"), simulationTick: g(e.simulationTick, "$.simulationTick"), alpha: E(e.alpha, "$.alpha", 0, 1), cameraIds: k(e.cameraIds, "$.cameraIds"), items: L(e.items, "$.items", l.inspectionItems, gt) });
}
function $t(r) {
  const e = $(r, "$", ["snapshotVersion", "frame", "visibleItems", "culledItems", "drawItems", "logicalBatches", "textureBindings", "triangles", "extractionMicros", "contributionMicros", "counters"]);
  e.snapshotVersion !== 1 && o("R2D_VERSION_UNSUPPORTED", "$.snapshotVersion", "expected 1.");
  const t = $(e.counters, "$.counters"), i = Object.keys(t).sort();
  i.length > l.metricsCounters && o("R2D_LIMIT_EXCEEDED", "$.counters", `maximum is ${l.metricsCounters}.`);
  const n = {};
  i.forEach((a) => {
    n[a] = E(t[a], `$.counters.${a}`, 0);
  });
  const s = (a, u) => a === null ? null : E(a, u, 0);
  return Object.freeze({ snapshotVersion: 1, frame: g(e.frame, "$.frame"), visibleItems: g(e.visibleItems, "$.visibleItems"), culledItems: g(e.culledItems, "$.culledItems"), drawItems: g(e.drawItems, "$.drawItems"), logicalBatches: g(e.logicalBatches, "$.logicalBatches"), textureBindings: g(e.textureBindings, "$.textureBindings"), triangles: g(e.triangles, "$.triangles"), extractionMicros: s(e.extractionMicros, "$.extractionMicros"), contributionMicros: s(e.contributionMicros, "$.contributionMicros"), counters: Object.freeze(n) });
}
function Ft(r) {
  const e = $(r, "$", ["snapshotVersion", "phase", "generation", "definitionId", "sceneId", "activeCameraIds", "activeLayerIds", "retainedAssetIds", "lastReason", "metrics"]);
  e.snapshotVersion !== 1 && o("R2D_VERSION_UNSUPPORTED", "$.snapshotVersion", "expected 1.");
  const t = (i, n) => i === null ? null : y(i, n);
  return Object.freeze({ snapshotVersion: 1, phase: x(e.phase, "$.phase", ["created", "probing", "initializing", "ready", "attaching", "attached", "extracting", "contributing", "lost", "recovering", "failed", "detaching", "destroying", "destroyed"]), generation: g(e.generation, "$.generation", 1), definitionId: t(e.definitionId, "$.definitionId"), sceneId: t(e.sceneId, "$.sceneId"), activeCameraIds: k(e.activeCameraIds, "$.activeCameraIds"), activeLayerIds: k(e.activeLayerIds, "$.activeLayerIds"), retainedAssetIds: k(e.retainedAssetIds, "$.retainedAssetIds"), lastReason: x(e.lastReason, "$.lastReason", ["R2D_OK", "R2D_OPTIONAL_DISABLED", "R2D_CAPABILITY_MISSING", "R2D_LIMIT_EXCEEDED", "R2D_FORMAT_UNSUPPORTED", "R2D_SAMPLE_COUNT_UNSUPPORTED", "R2D_SHADER_ABI_UNSUPPORTED", "R2D_ASSET_UNAVAILABLE", "R2D_STALE_GENERATION", "R2D_SURFACE_UNAVAILABLE", "R2D_DEVICE_LOST"]), metrics: $t(e.metrics) });
}
const I = { type: "string", pattern: "^[a-z][a-z0-9.-]*:[a-z0-9][a-z0-9._/-]*$", maxLength: 160 }, w = { type: "number" }, z = { type: "array", prefixItems: [w, w], minItems: 2, maxItems: 2 }, H = { type: "array", prefixItems: [0, 1, 2, 3].map(() => ({ type: "number", minimum: 0, maximum: 1 })), minItems: 4, maxItems: 4 }, W = { type: "array", prefixItems: [w, w, { type: "number", minimum: 0 }, { type: "number", minimum: 0 }], minItems: 4, maxItems: 4 }, V = {
  type: "object",
  maxProperties: 32,
  propertyNames: I,
  additionalProperties: {
    type: "object",
    additionalProperties: !1,
    required: ["version", "value"],
    properties: { version: { type: "integer", minimum: 1 }, value: {} }
  }
}, oe = {
  type: "object",
  additionalProperties: !1,
  properties: {
    before: { type: "array", items: { $ref: "#/$defs/orderRef" } },
    after: { type: "array", items: { $ref: "#/$defs/orderRef" } },
    zIndex: { type: "integer", minimum: -2147483648, maximum: 2147483647 }
  }
}, ne = {
  id: I,
  entity: I,
  layer: I,
  transform: { $ref: "#/$defs/transform" },
  parent: { $ref: "#/$defs/parentRef" },
  order: oe,
  visible: { type: "boolean" },
  opacity: { type: "number", minimum: 0, maximum: 1 },
  tint: H,
  mask: I,
  target: I,
  extensions: V
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
    extensions: V
  },
  $defs: {
    id: I,
    vec2: z,
    color: H,
    rect: W,
    extensions: V,
    order: oe,
    transform: {
      type: "object",
      additionalProperties: !1,
      required: ["position", "rotation", "scale"],
      properties: { position: z, rotation: w, scale: z }
    },
    parentRef: { type: "object", additionalProperties: !1, required: ["kind", "id"], properties: { kind: { const: "entity" }, id: I } },
    orderRef: { type: "object", additionalProperties: !1, required: ["kind", "id"], properties: { kind: { enum: ["item", "layer"] }, id: I } },
    layer: {
      type: "object",
      additionalProperties: !1,
      required: ["id"],
      properties: { id: I, order: oe, visible: { type: "boolean" }, opacity: { type: "number", minimum: 0, maximum: 1 }, extensions: V }
    },
    camera: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "virtualSize"],
      properties: { id: I, order: { type: "integer" }, viewport: W, virtualSize: z, scaleMode: { enum: ["stretch", "fit", "fill", "integer-fit", "none"] }, pixelSnap: { enum: ["off", "camera", "camera-and-items"] }, space: { enum: ["world", "screen"] }, safeArea: { type: "boolean" }, sampling: { enum: ["asset", "nearest", "linear"] }, position: z, rotation: w, zoom: { type: "number", exclusiveMinimum: 0 }, clearColor: { anyOf: [H, { type: "null" }] }, layers: { type: "array", items: I }, target: I, extensions: V }
    },
    sampler: {
      type: "object",
      additionalProperties: !1,
      required: ["id"],
      properties: { id: I, minFilter: { enum: ["nearest", "linear"] }, magFilter: { enum: ["nearest", "linear"] }, mipmapFilter: { enum: ["nearest", "linear"] }, addressU: { enum: ["clamp-to-edge", "repeat", "mirror-repeat"] }, addressV: { enum: ["clamp-to-edge", "repeat", "mirror-repeat"] }, maxAnisotropy: { type: "integer", minimum: 1, maximum: 16 }, extensions: V }
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
      properties: { id: I, kind: { enum: ["builtin", "custom"] }, builtin: { enum: ["sprite", "sprite-lit", "bitmap-text", "msdf-text", "particle"] }, shaderAsset: I, shaderAbi: { $ref: "#/$defs/shaderAbi" }, schema: { $ref: "#/$defs/materialSchema" }, sampler: I, blendMode: { enum: ["opaque", "alpha", "premultiplied-alpha", "add", "multiply", "screen"] }, depthMode: { enum: ["disabled", "read", "read-write"] }, reorderSafe: { type: "boolean" }, parameters: { type: "object" }, extensions: V }
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
      properties: { ...ne, texture: I, sourceTarget: I, normalTexture: I, material: I, region: W, size: z, anchor: z, flipX: { type: "boolean" }, flipY: { type: "boolean" }, nineSlice: { type: "array", minItems: 4, maxItems: 4, items: { type: "number", minimum: 0 } } }
    },
    tilemap: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "entity", "layer", "tilemap", "material", "tileSize"],
      properties: {
        ...ne,
        tilemap: I,
        material: I,
        tileSize: z,
        chunkSize: z,
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
      properties: { ...ne, text: { type: "string", maxLength: 65536 }, font: I, fallbackFonts: { type: "array", maxItems: 16, uniqueItems: !0, items: I }, material: I, fontSize: { type: "number", exclusiveMinimum: 0 }, lineHeight: { type: "number", exclusiveMinimum: 0 }, maxWidth: { type: "number", exclusiveMinimum: 0 }, maxHeight: { type: "number", exclusiveMinimum: 0 }, wrap: { enum: ["none", "word", "character"] }, align: { enum: ["start", "center", "end", "justify"] }, verticalAlign: { enum: ["top", "middle", "bottom"] }, direction: { enum: ["ltr", "rtl", "auto"] }, shaping: { enum: ["none", "basic", "advanced-provider"] }, letterSpacing: w, wordSpacing: w, tabSize: { type: "integer", minimum: 1, maximum: 32 }, missingGlyph: { enum: ["replace", "skip", "error"] }, replacementCodePoint: { type: "integer", minimum: 0, maximum: 1114111 } }
    },
    animation: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "duration", "tracks"],
      properties: { id: I, asset: I, clip: { type: "string", minLength: 1, maxLength: 160 }, target: I, duration: { type: "number", exclusiveMinimum: 0 }, fixedStepHz: { type: "integer", minimum: 1, maximum: 1e3 }, loop: { enum: ["none", "repeat", "ping-pong"] }, playbackRate: { type: "number", exclusiveMinimum: 0, maximum: 64 }, autoplay: { type: "boolean" }, tracks: { type: "array", maxItems: 256, items: { type: "object", additionalProperties: !1, required: ["target", "property", "keyframes"], properties: { target: I, property: { enum: ["position", "rotation", "scale", "opacity", "tint", "frame"] }, keyframes: { type: "array", minItems: 1, maxItems: 16384, items: { type: "object", additionalProperties: !1, required: ["time", "value"], properties: { time: { type: "number", minimum: 0 }, value: {}, easing: { enum: ["linear", "step", "ease-in", "ease-out", "ease-in-out"] } } } } } } }, events: { type: "array", maxItems: 4096, items: { type: "object", additionalProperties: !1, required: ["time", "name"], properties: { time: { type: "number", minimum: 0 }, name: { type: "string", minLength: 1, maxLength: 160 } } } }, extensions: V }
    },
    particle: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "entity", "layer", "material", "capacity", "emissionRate", "lifetime"],
      properties: { ...ne, texture: I, material: I, capacity: { type: "integer", minimum: 1, maximum: 1e6 }, emissionRate: { type: "number", minimum: 0 }, lifetime: z, speed: z, angle: z, gravity: z, size: z, fixedStepHz: { type: "integer", minimum: 1, maximum: 1e3 }, seed: { type: "integer", minimum: 1, maximum: 4294967295 }, autoplay: { type: "boolean" }, duration: { type: "number", exclusiveMinimum: 0 }, loop: { type: "boolean" }, offscreen: { enum: ["continue", "pause-when-hidden"] }, maxBurst: { type: "integer", minimum: 0, maximum: 65536 }, rotation: z, angularVelocity: z, sizeCurve: { $ref: "#/$defs/particleCurve" }, opacityCurve: { $ref: "#/$defs/particleCurve" }, colorStart: H, colorEnd: H }
    },
    particleCurve: { type: "object", additionalProperties: !1, required: ["keys"], properties: { keys: { type: "array", minItems: 1, maxItems: 64, items: { type: "object", additionalProperties: !1, required: ["t", "value"], properties: { t: { type: "number", minimum: 0, maximum: 1 }, value: { type: "number", minimum: 0 } } } } } },
    light: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "entity", "kind", "color", "intensity"],
      properties: { id: I, entity: I, kind: { enum: ["ambient", "directional", "point"] }, transform: { $ref: "#/$defs/transform" }, parent: { $ref: "#/$defs/parentRef" }, color: H, intensity: { type: "number", minimum: 0 }, enabled: { type: "boolean" }, radius: { type: "number", exclusiveMinimum: 0 }, direction: w, layers: { type: "array", items: I }, shadow: { type: "object", additionalProperties: !1, properties: { enabled: { type: "boolean" }, mode: { const: "hard" }, maxCasters: { type: "integer", minimum: 0, maximum: 4096 } } }, extensions: V }
    },
    mask: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "entity", "kind"],
      properties: { id: I, entity: I, kind: { enum: ["scissor", "sprite", "path"] }, transform: { $ref: "#/$defs/transform" }, parent: { $ref: "#/$defs/parentRef" }, rect: W, texture: I, region: W, points: { type: "array", minItems: 3, maxItems: 256, items: z }, inverted: { type: "boolean" }, extensions: V }
    },
    shadowCaster: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "entity", "kind"],
      properties: { id: I, entity: I, kind: { enum: ["rect", "polygon"] }, transform: { $ref: "#/$defs/transform" }, rect: W, points: { type: "array", minItems: 3, maxItems: 256, items: z }, layers: { type: "array", items: I }, enabled: { type: "boolean" }, extensions: V }
    },
    target: {
      type: "object",
      additionalProperties: !1,
      required: ["id"],
      properties: { id: I, size: z, scale: { type: "number", exclusiveMinimum: 0, maximum: 4 }, format: { enum: ["rgba8unorm", "rgba8unorm-srgb", "bgra8unorm", "bgra8unorm-srgb", "rgba16float"] }, sampleCount: { enum: [1, 2, 4, 8] }, clearColor: H, persistent: { type: "boolean" }, extensions: V }
    },
    feature: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "capability"],
      properties: { id: I, capability: I, required: { type: "boolean" }, order: oe, options: { type: "object" }, extensions: V }
    },
    effect: {
      type: "object",
      additionalProperties: !1,
      required: ["id", "kind", "input", "output"],
      properties: { id: I, kind: { const: "color-adjust" }, input: I, output: { anyOf: [I, { const: "surface" }] }, enabled: { type: "boolean" }, required: { type: "boolean" }, order: { type: "integer" }, options: { type: "object", additionalProperties: !1, properties: { brightness: { type: "number", minimum: -1, maximum: 1 }, contrast: { type: "number", minimum: 0, maximum: 4 }, saturation: { type: "number", minimum: 0, maximum: 4 } } }, extensions: V }
    }
  }
});
function Ce(r, e) {
  const t = $(r, e, ["layerId", "x", "y", "gid"]);
  return Object.freeze({
    layerId: g(t.layerId, `${e}.layerId`, 1, 2147483647),
    x: g(t.x, `${e}.x`, -2147483647, 2147483647),
    y: g(t.y, `${e}.y`, -2147483647, 2147483647),
    gid: g(t.gid, `${e}.gid`, 0, 4294967295)
  });
}
function Te(r, e) {
  const t = /* @__PURE__ */ new Map();
  for (let i = 0; i < r.length; i += 1) {
    const n = r[i], s = `${n.layerId}:${n.x}:${n.y}`;
    if (t.has(s)) throw new TypeError(`R2D_VALUE_INVALID at ${e}[${i}]: duplicate tile coordinate ${s}.`);
    t.set(s, n);
  }
  return Object.freeze([...t.values()].sort((i, n) => i.layerId - n.layerId || i.y - n.y || i.x - n.x));
}
function Ht(r) {
  const e = $(r, "$", ["patchVersion", "tilemapId", "expectedRevision", "patches"]);
  if (e.patchVersion !== 1) throw new TypeError("R2D_VERSION_UNSUPPORTED at $.patchVersion: expected 1.");
  const t = L(e.patches, "$.patches", l.tilemapPatches, Ce);
  return Object.freeze({
    patchVersion: 1,
    tilemapId: y(e.tilemapId, "$.tilemapId"),
    expectedRevision: g(e.expectedRevision, "$.expectedRevision", 0),
    patches: Te(t, "$.patches")
  });
}
function Bt(r) {
  const e = $(r, "$", ["snapshotVersion", "tilemapId", "revision", "patches"]);
  if (e.snapshotVersion !== 1) throw new TypeError("R2D_VERSION_UNSUPPORTED at $.snapshotVersion: expected 1.");
  const t = L(e.patches, "$.patches", l.tilemapPatches, Ce);
  return Object.freeze({
    snapshotVersion: 1,
    tilemapId: y(e.tilemapId, "$.tilemapId"),
    revision: g(e.revision, "$.revision", 0),
    patches: Te(t, "$.patches")
  });
}
function je(r, e) {
  (typeof r != "string" || r.length > l.textLength) && o("R2D_VALUE_INVALID", e, `expected a string of at most ${l.textLength} characters.`);
  const t = r;
  return [...t].length > l.textGlyphs && o("R2D_LIMIT_EXCEEDED", e, "too many Unicode scalars."), t;
}
function Yt(r) {
  const e = $(r, "$", ["updateVersion", "textId", "expectedRevision", "text"]);
  if (e.updateVersion !== 1) throw new TypeError("R2D_VERSION_UNSUPPORTED at $.updateVersion: expected 1.");
  return Object.freeze({
    updateVersion: 1,
    textId: y(e.textId, "$.textId"),
    expectedRevision: g(e.expectedRevision, "$.expectedRevision", 0),
    text: je(e.text, "$.text")
  });
}
function Wt(r) {
  const e = $(r, "$", ["snapshotVersion", "textId", "revision", "text"]);
  if (e.snapshotVersion !== 1) throw new TypeError("R2D_VERSION_UNSUPPORTED at $.snapshotVersion: expected 1.");
  return Object.freeze({
    snapshotVersion: 1,
    textId: y(e.textId, "$.textId"),
    revision: g(e.revision, "$.revision", 0),
    text: je(e.text, "$.text")
  });
}
function Jt(r) {
  const e = $(r, "$", ["commandVersion", "animationId", "expectedRevision", "command", "time", "speed", "direction", "toAnimationId", "transitionTicks"]);
  e.commandVersion !== 1 && o("R2D_VERSION_UNSUPPORTED", "$.commandVersion", "expected 1.");
  const t = x(e.command, "$.command", ["play", "pause", "stop", "seek", "set-speed", "set-direction", "transition"]);
  t === "seek" && e.time === void 0 && o("R2D_VALUE_INVALID", "$.time", "seek requires time."), t === "set-speed" && e.speed === void 0 && o("R2D_VALUE_INVALID", "$.speed", "set-speed requires speed."), t === "set-direction" && e.direction === void 0 && o("R2D_VALUE_INVALID", "$.direction", "set-direction requires direction."), t === "transition" && (e.toAnimationId === void 0 || e.transitionTicks === void 0) && o("R2D_VALUE_INVALID", "$.transition", "transition requires toAnimationId and transitionTicks.");
  const i = e.direction === void 0 ? void 0 : g(e.direction, "$.direction", -1, 1);
  return i !== void 0 && i !== -1 && i !== 1 && o("R2D_VALUE_INVALID", "$.direction", "direction must be -1 or 1."), Object.freeze({
    commandVersion: 1,
    animationId: y(e.animationId, "$.animationId"),
    expectedRevision: g(e.expectedRevision, "$.expectedRevision"),
    command: t,
    ...e.time === void 0 ? {} : { time: E(e.time, "$.time", 0) },
    ...e.speed === void 0 ? {} : { speed: E(e.speed, "$.speed", Number.EPSILON, 64) },
    ...i === void 0 ? {} : { direction: i },
    ...e.toAnimationId === void 0 ? {} : { toAnimationId: y(e.toAnimationId, "$.toAnimationId") },
    ...e.transitionTicks === void 0 ? {} : { transitionTicks: g(e.transitionTicks, "$.transitionTicks", 0, l.animationAdvanceTicks) }
  });
}
function Xt(r) {
  const e = $(r, "$", ["commandVersion", "emitterId", "expectedRevision", "command", "count", "timeScale"]);
  e.commandVersion !== 1 && o("R2D_VERSION_UNSUPPORTED", "$.commandVersion", "expected 1.");
  const t = x(e.command, "$.command", ["play", "pause", "stop", "burst", "set-time-scale"]);
  return t === "burst" && e.count === void 0 && o("R2D_VALUE_INVALID", "$.count", "burst requires count."), t === "set-time-scale" && e.timeScale === void 0 && o("R2D_VALUE_INVALID", "$.timeScale", "set-time-scale requires timeScale."), Object.freeze({
    commandVersion: 1,
    emitterId: y(e.emitterId, "$.emitterId"),
    expectedRevision: g(e.expectedRevision, "$.expectedRevision"),
    command: t,
    ...e.count === void 0 ? {} : { count: g(e.count, "$.count", 0, l.particleBurst) },
    ...e.timeScale === void 0 ? {} : { timeScale: E(e.timeScale, "$.timeScale", 0, 16) }
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
function Qt(r) {
  return he({
    contractVersion: 1,
    id: "forgeng.render2d:material-validation",
    layers: [{ id: "forgeng.render2d:material-validation-layer" }],
    materials: [{
      id: r.id,
      kind: "custom",
      shaderAsset: r.shaderAsset,
      shaderAbi: {
        version: Z.version,
        vertexEntry: Z.vertexEntry,
        fragmentEntry: Z.fragmentEntry,
        bindings: Z.bindings,
        attributes: Z.attributes
      },
      schema: r.schema,
      parameters: r.parameters ?? {},
      ...r.sampler === void 0 ? {} : { sampler: r.sampler },
      blendMode: r.blendMode ?? "premultiplied-alpha",
      depthMode: r.depthMode ?? "disabled",
      reorderSafe: r.reorderSafe ?? !1
    }]
  }).materials[0];
}
const Zt = 1, er = 1, tr = "1.0.0", Pe = Object.freeze({
  off: Object.freeze({ history: 0, cameras: 0, layers: 0, targets: 0, features: 0, assets: 0, failures: 0, selections: 0, overheadBudgetMicros: 0 }),
  "production-lite": Object.freeze({ history: 1, cameras: 8, layers: 32, targets: 8, features: 16, assets: 32, failures: 8, selections: 0, overheadBudgetMicros: 250 }),
  diagnostic: Object.freeze({ history: 16, cameras: 32, layers: 128, targets: 32, features: 64, assets: 256, failures: 32, selections: 128, overheadBudgetMicros: 1e3 }),
  lab: Object.freeze({ history: 64, cameras: 64, layers: 256, targets: 128, features: 128, assets: 1024, failures: 64, selections: 512, overheadBudgetMicros: 4e3 })
});
function rr(r = {}) {
  const e = $(r, "$", ["profile", "maximumHistory", "maximumSelections"]), t = e.profile === void 0 ? "production-lite" : x(e.profile, "$.profile", ["off", "production-lite", "diagnostic", "lab"]), i = Pe[t], n = e.maximumHistory === void 0 ? i.history : g(e.maximumHistory, "$.maximumHistory", 0, i.history), s = e.maximumSelections === void 0 ? i.selections : g(e.maximumSelections, "$.maximumSelections", 0, Math.min(i.selections, l.inspectionItems));
  return Object.freeze({ profile: t, limits: Object.freeze({ ...i, history: n, selections: s }) });
}
function bt(r) {
  const e = $(r, "$", ["snapshotVersion", "apiVersion", "schemaVersion", "profile", "composition", "engine", "scene", "domain", "resourceOwners", "selection", "overhead", "destroyed"]);
  e.snapshotVersion !== 2 && o("R2D_VERSION_UNSUPPORTED", "$.snapshotVersion", "expected 2."), e.apiVersion !== 1 && o("R2D_VERSION_UNSUPPORTED", "$.apiVersion", "expected 1."), e.schemaVersion !== "1.0.0" && o("R2D_VERSION_UNSUPPORTED", "$.schemaVersion", "expected 1.0.0.");
  const t = x(e.profile, "$.profile", ["off", "production-lite", "diagnostic", "lab"]), i = B(e, "$"), n = Pe[t];
  return ((i.domain?.cameras.length ?? 0) > n.cameras || (i.domain?.layers.length ?? 0) > n.layers || (i.domain?.targets.length ?? 0) > n.targets || (i.domain?.features.length ?? 0) > n.features || (i.domain?.assets.length ?? 0) > n.assets || (i.domain?.failures.length ?? 0) > n.failures) && o("R2D_LIMIT_EXCEEDED", "$.domain", `snapshot exceeds the ${t} inspection profile.`), i;
}
function ir(r) {
  const e = $(r, "$", ["exportVersion", "schemaVersion", "minimumReaderVersion", "migrations", "definition", "inspection"]);
  return (e.exportVersion !== 1 || e.minimumReaderVersion !== 1 || e.schemaVersion !== "1.0.0") && o("R2D_VERSION_UNSUPPORTED", "$", "expected editor export 1 / schema 1.0.0."), B(e.definition, "$.definition"), bt(e.inspection), B(e, "$");
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
function O(r, e, t, i, n, s) {
  throw new xt({ code: r, operation: e, path: t, message: i, id: n, cause: s });
}
function Me(r) {
  if (typeof r != "object" || r === null || Array.isArray(r)) return !1;
  const e = Object.getPrototypeOf(r);
  return e === Object.prototype || e === null;
}
function Se(r, e) {
  Me(r) || O("GAMEPLAY_INVALID_DEFINITION", "validate", e, `${e} must be a plain object.`);
}
function vt(r, e, t) {
  for (const i of Object.keys(r))
    e.includes(i) || O("GAMEPLAY_UNKNOWN_FIELD", "validate", `${t}.${i}`, `${t}.${i} is not supported.`);
}
function Et(r, e) {
  (typeof r != "string" || r.length > 160 || !It.test(r)) && O("GAMEPLAY_INVALID_ID", "validate", e, `${e} must be a normalized namespaced gameplay id.`);
}
function Rt(r, e) {
  const t = r ?? 1;
  return (!Number.isSafeInteger(t) || t <= 0) && O("GAMEPLAY_INVALID_VERSION", "validate", e, `${e} must be a positive safe integer.`), t;
}
function Ee(r, e, t = /* @__PURE__ */ new WeakSet()) {
  if (r === null || typeof r == "string" || typeof r == "boolean") return r;
  if (typeof r == "number")
    return Number.isFinite(r) || O("GAMEPLAY_INVALID_JSON", "normalize", e, `${e} contains a non-finite number.`), r;
  typeof r != "object" && O("GAMEPLAY_INVALID_JSON", "normalize", e, `${e} must contain JSON values only.`), t.has(r) && O("GAMEPLAY_INVALID_JSON", "normalize", e, `${e} contains a reference cycle.`), t.add(r);
  let i;
  if (Array.isArray(r))
    i = Object.freeze(r.map((n, s) => Ee(n, `${e}[${s}]`, t)));
  else {
    Me(r) || O("GAMEPLAY_INVALID_JSON", "normalize", e, `${e} must contain plain JSON objects.`);
    const n = {};
    for (const s of Object.keys(r).sort())
      s || O("GAMEPLAY_INVALID_JSON", "normalize", e, `${e} contains an empty key.`), n[s] = Ee(r[s], `${e}.${s}`, t);
    i = Object.freeze(n);
  }
  return t.delete(r), i;
}
function _t(r, e, t) {
  const i = Ee(r, e);
  return t && !t(i) && O("GAMEPLAY_INVALID_COMPONENT_VALUE", "component", e, `${e} does not satisfy its definition validator.`), i;
}
function Dt(r, e, t) {
  e.kind === "number" ? (typeof r != "number" || !Number.isFinite(r) || e.integer && !Number.isInteger(r) || e.minimum !== void 0 && r < e.minimum || e.maximum !== void 0 && r > e.maximum) && O("GAMEPLAY_INVALID_COMPONENT_VALUE", "component", t, `${t} violates the number component schema.`) : e.kind === "boolean" ? typeof r != "boolean" && O("GAMEPLAY_INVALID_COMPONENT_VALUE", "component", t, `${t} must be boolean.`) : e.kind === "string" ? (typeof r != "string" || e.minimumLength !== void 0 && r.length < e.minimumLength || e.maximumLength !== void 0 && r.length > e.maximumLength || e.pattern !== void 0 && !new RegExp(e.pattern).test(r)) && O("GAMEPLAY_INVALID_COMPONENT_VALUE", "component", t, `${t} violates the string component schema.`) : (!Number.isSafeInteger(e.schemaVersion) || e.schemaVersion <= 0) && O("GAMEPLAY_INVALID_VERSION", "component", `${t}.schemaVersion`, "JSON component schemaVersion must be positive.");
}
const At = ["id", "version", "schema", "default", "serializable", "validate", "initialize", "serialize", "deserialize", "migrations"];
function se(r) {
  Se(r, "component"), vt(r, At, "component"), Et(r.id, "component.id");
  const e = Rt(r.version, "component.version");
  Se(r.schema, "component.schema"), ["number", "boolean", "string", "json"].includes(r.schema.kind) || O("GAMEPLAY_INVALID_DEFINITION", "component", "component.schema.kind", "Unsupported component schema kind.", r.id);
  const t = Object.freeze({ ...r.schema }), i = (u, f = `component(${r.id})`) => {
    const m = _t(u, f, r.validate);
    return Dt(m, t, f), m;
  }, n = i(r.default, "component.default"), s = Object.freeze({ ...r.migrations ?? {} });
  for (const u of Object.keys(s)) {
    const f = Number(u);
    (!Number.isSafeInteger(f) || f <= 0 || f >= e || typeof s[f] != "function") && O("GAMEPLAY_INVALID_VERSION", "component", `component.migrations.${u}`, "Component migrations must map an earlier positive version to a function.", r.id);
  }
  const a = ((u = n) => Object.freeze({
    kind: "component-initializer",
    component: a,
    value: i(u)
  }));
  return Object.defineProperties(a, {
    kind: { value: "component", enumerable: !0 },
    id: { value: r.id, enumerable: !0 },
    version: { value: e, enumerable: !0 },
    schema: { value: t, enumerable: !0 },
    default: { value: n, enumerable: !0 },
    serializable: { value: r.serializable !== !1, enumerable: !0 },
    validateValue: { value: i },
    initialize: { value: r.initialize },
    serialize: { value: r.serialize },
    deserialize: { value: r.deserialize },
    migrations: { value: s, enumerable: !0 },
    reference: { value: Object.freeze({ kind: "component", id: r.id }), enumerable: !0 }
  }), Object.freeze(a);
}
const we = Object.freeze({
  number(r) {
    const { minimum: e, maximum: t, integer: i, ...n } = r;
    return se({ ...n, schema: { kind: "number", minimum: e, maximum: t, integer: i } });
  },
  boolean(r) {
    return se({ ...r, schema: { kind: "boolean" } });
  },
  string(r) {
    const { minimumLength: e, maximumLength: t, pattern: i, ...n } = r;
    return se({ ...n, schema: { kind: "string", minimumLength: e, maximumLength: t, pattern: i } });
  },
  json(r) {
    const { schemaVersion: e, ...t } = r;
    return se({ ...t, schema: { kind: "json", schemaVersion: e ?? 1 } });
  }
});
function ee(r, e) {
  return Array.isArray(r) && r.length === e && r.every((t) => typeof t == "number" && Number.isFinite(t));
}
const nr = we.json({
  id: "forgeng.spatial:transform-2d",
  version: 1,
  default: { position: [0, 0], rotation: 0, scale: [1, 1] },
  validate: (r) => typeof r == "object" && r !== null && ee(r.position, 2) && typeof r.rotation == "number" && Number.isFinite(r.rotation) && ee(r.scale, 2)
});
we.json({
  id: "forgeng.spatial:transform-3d",
  version: 1,
  default: { position: [0, 0, 0], rotation: [0, 0, 0, 1], scale: [1, 1, 1] },
  validate: (r) => typeof r == "object" && r !== null && ee(r.position, 3) && ee(r.rotation, 4) && ee(r.scale, 3)
});
export {
  Pt as RENDER_2D_ADVANCED_FEATURES,
  Nt as RENDER_2D_CONTRACT_VERSION,
  Kt as RENDER_2D_CUSTOM_MATERIAL_API_VERSION,
  Gt as RENDER_2D_DEFINITION_JSON_SCHEMA,
  er as RENDER_2D_EDITOR_EXPORT_VERSION,
  Ie as RENDER_2D_EFFECTS_FEATURE,
  Zt as RENDER_2D_INSPECTION_API_VERSION,
  Pe as RENDER_2D_INSPECTION_PROFILE_LIMITS,
  tr as RENDER_2D_INSPECTION_SCHEMA_VERSION,
  J as RENDER_2D_LIGHTING_FEATURE,
  l as RENDER_2D_LIMITS,
  ve as RENDER_2D_PATH_MASKS_FEATURE,
  zt as RENDER_2D_SCHEMA_VERSION,
  Lt as RENDER_2D_SHADER_ABI_VERSION,
  Ot as RENDER_2D_SNAPSHOT_VERSION,
  Z as RENDER_2D_SPRITE_SHADER_ABI_V1,
  Fe as Render2dContractError,
  nr as Transform2d,
  nt as assertRender2dAdvancedGraph,
  jt as createRender2dPingPongPair,
  Qt as defineCustomSpriteMaterial2dV1,
  Mt as defineRender2d,
  wt as negotiateRender2dCapabilities,
  it as normalizeRender2dAdvancedFeatureOptions,
  Ze as normalizeRender2dAnimation,
  Vt as normalizeRender2dCameraSurface,
  st as normalizeRender2dCustomMaterialSchemaV1,
  rt as normalizeRender2dEffect,
  rr as normalizeRender2dInspectionOptions,
  et as normalizeRender2dParticle,
  tt as normalizeRender2dShadowCaster,
  Oe as render2dLogicalToWorld,
  Ct as render2dPhysicalToWorld,
  Le as render2dWorldToLogical,
  kt as render2dWorldToPhysical,
  ht as resolveRender2dCamera,
  Tt as snapRender2dItemBounds,
  Ut as snapshotRender2dComposition,
  ir as snapshotRender2dEditorExportV1,
  qt as snapshotRender2dExtraction,
  Ft as snapshotRender2dInspection,
  bt as snapshotRender2dInspectionV2,
  $t as snapshotRender2dMetrics,
  $e as snapshotRender2dQuality,
  Wt as snapshotRender2dTextContent,
  Bt as snapshotRender2dTilemapPatches,
  ae as transformRender2dPoint,
  Jt as validateRender2dAnimationCommand,
  pt as validateRender2dCapabilityRequest,
  yt as validateRender2dCapabilitySupport,
  he as validateRender2dDefinition,
  ot as validateRender2dMaterialParametersV1,
  Xt as validateRender2dParticleCommand,
  Yt as validateRender2dTextUpdateRequest,
  Ht as validateRender2dTilemapPatchRequest
};
//# sourceMappingURL=render-2d-contract.esm.js.map
