import { sprite2d } from "forgeng/2d";
import { FALLBACK_TEXTURE, MATERIAL, WORLD } from "./ids";

/** Shared platform data keeps rendering and collision bodies perfectly aligned. */
export const PLATFORMS = [
  {
    id: "ground",
    entity: "template.2d:ground-entity",
    body: "template.2d:ground-body",
    position: [0, 70] as const,
    size: [300, 20] as const,
    tint: [0.18, 0.24, 0.35, 1] as const,
  },
  {
    id: "platform-left",
    entity: "template.2d:platform-left-entity",
    body: "template.2d:platform-left-body",
    position: [-60, 20] as const,
    size: [72, 12] as const,
    tint: [0.22, 0.52, 0.82, 1] as const,
  },
  {
    id: "platform-middle",
    entity: "template.2d:platform-middle-entity",
    body: "template.2d:platform-middle-body",
    position: [18, -18] as const,
    size: [68, 12] as const,
    tint: [0.32, 0.62, 0.88, 1] as const,
  },
  {
    id: "platform-right",
    entity: "template.2d:platform-right-entity",
    body: "template.2d:platform-right-body",
    position: [105, 18] as const,
    size: [54, 12] as const,
    tint: [0.22, 0.52, 0.82, 1] as const,
  },
] as const;

export type PlatformDefinition = (typeof PLATFORMS)[number];

export function createPlatformSprites() {
  return PLATFORMS.map((platform) =>
    sprite2d({
      id: `template.2d:${platform.id}`,
      entity: platform.entity,
      layer: WORLD,
      texture: FALLBACK_TEXTURE,
      material: MATERIAL,
      size: platform.size,
      tint: platform.tint,
      transform: { position: platform.position, rotation: 0, scale: [1, 1] },
    }),
  );
}
