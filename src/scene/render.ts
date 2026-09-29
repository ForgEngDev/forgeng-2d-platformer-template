import {
  builtinSpriteMaterial2d,
  defineLayer2d,
  defineRender2d,
} from "forgeng/2d";
import { createCamera } from "./camera";
import { createPlatformSprites } from "./ground";
import { Hero } from "./hero";
import { MATERIAL, WORLD } from "./ids";

/** Build the scene render definition: layer, camera, sprites, and animations. */
export function createRenderDefinition(hero: Hero) {
  const world = defineLayer2d({ id: WORLD });
  const material = builtinSpriteMaterial2d({ id: MATERIAL });

  return defineRender2d({
    contractVersion: 1,
    id: "template.2d:render",
    layers: [world],
    cameras: [createCamera()],
    materials: [material],
    sprites: [...createPlatformSprites(), hero.createSprite()],
    animations: [],
  });
}
