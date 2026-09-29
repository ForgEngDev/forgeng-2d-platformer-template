import { camera2d } from "forgeng/2d";
import { CAMERA, WORLD } from "./ids";

/** Fixed orthographic camera showing the complete beginner platformer level. */
export function createCamera() {
  return camera2d({
    id: CAMERA,
    virtualSize: [320, 180],
    scaleMode: "integer-fit",
    pixelSnap: "camera-and-items",
    sampling: "nearest",
    layers: [WORLD],
    clearColor: [0.03, 0.055, 0.11, 1],
  });
}
