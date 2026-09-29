import { binding, controls, defineActionMap } from "forgeng/contracts/actions";

/** Single source of truth for active controls, HUD display, and input wiring. */
export const ACTIVE_CONTROLS = [
  { id: "ad", label: "Keyboard · A / D", help: "Move left / right" },
  { id: "arrows", label: "Keyboard · ← / →", help: "Move left / right" },
  { id: "space", label: "Keyboard · Space", help: "Jump" },
  { id: "e", label: "Keyboard · E", help: "Reset the hero" },
  { id: "lmb", label: "Mouse · Left click", help: "Jump" },
  { id: "touch", label: "Touch · Tap", help: "Jump" },
] as const;

export type ControlId = (typeof ACTIVE_CONTROLS)[number]["id"];

/** Semantic Input Actions map for the ForgeNG 2D workflow. */
export const PlayerControls = defineActionMap({
  id: "template.2d:player-controls",
  actions: {
    move: {
      kind: "vector2",
      bindings: [
        binding.vector2({
          id: "wasd",
          up: controls.key("KeyW"),
          down: controls.key("KeyS"),
          left: controls.key("KeyA"),
          right: controls.key("KeyD"),
        }),
        binding.vector2({
          id: "arrows",
          up: controls.key("ArrowUp"),
          down: controls.key("ArrowDown"),
          left: controls.key("ArrowLeft"),
          right: controls.key("ArrowRight"),
        }),
      ],
    },
  },
});

export interface ControllerHandlers {
  onJump?: (source: "space" | "mouse-left" | "touch") => void;
  onReset?: () => void;
  onMove?: (key: string, label: string) => void;
}

/**
 * Jump and reset input alongside the Input Actions movement vector.
 */
export class Controller {
  private readonly keys = new Set<string>();
  private onKeyDown: ((event: KeyboardEvent) => void) | null = null;
  private onKeyUp: ((event: KeyboardEvent) => void) | null = null;
  private onPointer: ((event: PointerEvent) => void) | null = null;
  private canvas: HTMLElement | null = null;
  private handlers: ControllerHandlers = {};
  private moveNotified = new Set<string>();

  public setup(handlers: ControllerHandlers = {}, canvasSelector = "#game"): void {
    this.destroy();
    this.handlers = handlers;

    this.onKeyDown = (event: KeyboardEvent) => {
      const code = event.code;

      if (MOVEMENT_LABELS[code]) {
        event.preventDefault();
        const firstPress = !this.keys.has(code) && !event.repeat;
        this.keys.add(code);
        if (firstPress && !this.moveNotified.has(code)) {
          this.moveNotified.add(code);
          const info = MOVEMENT_LABELS[code]!;
          this.handlers.onMove?.(info.key, info.label);
        }
        return;
      }

      if (event.repeat) return;

      if (code === "Space") {
        event.preventDefault();
        this.handlers.onJump?.("space");
        return;
      }

      if (code === "KeyE") {
        event.preventDefault();
        this.handlers.onReset?.();
      }
    };

    this.onKeyUp = (event: KeyboardEvent) => {
      this.keys.delete(event.code);
      this.moveNotified.delete(event.code);
    };

    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);

    this.canvas = document.querySelector(canvasSelector);
    if (this.canvas) {
      this.onPointer = (event: PointerEvent) => {
        if (event.button === 0) {
          const source = event.pointerType === "touch" ? "touch" : "mouse-left";
          this.handlers.onJump?.(source);
        }
      };
      this.canvas.addEventListener("pointerdown", this.onPointer);
    }
  }

  public destroy(): void {
    if (this.onKeyDown) window.removeEventListener("keydown", this.onKeyDown);
    if (this.onKeyUp) window.removeEventListener("keyup", this.onKeyUp);
    if (this.canvas && this.onPointer) {
      this.canvas.removeEventListener("pointerdown", this.onPointer);
    }
    this.onKeyDown = null;
    this.onKeyUp = null;
    this.onPointer = null;
    this.canvas = null;
    this.keys.clear();
    this.moveNotified.clear();
    this.handlers = {};
  }
}

const MOVEMENT_LABELS: Record<string, { key: string; label: string }> = {
  KeyA: { key: "A", label: "left" },
  KeyD: { key: "D", label: "right" },
  ArrowLeft: { key: "←", label: "left" },
  ArrowRight: { key: "→", label: "right" },
};
