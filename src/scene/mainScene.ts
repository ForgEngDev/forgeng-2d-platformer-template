import type {
  Forge2dGame,
  Forge2dSceneDefinition,
  Forge2dSceneFacade,
} from "forgeng/presets/2d";
import type { UiShellLike } from "@forgeng/ui-dom";
import { Controller, PlayerControls } from "./controller";
import { createRenderDefinition } from "./render";
import { PLATFORMS } from "./ground";
import { Hero } from "./hero";
import { Hud } from "./hud";
import {
  HERO_ENTITY,
  SCENE_ID,
} from "./ids";

/**
 * Main 2D scene that combines the hero, colliders, input, and HUD.
 * Forge2d uses a scene definition instead of a Scene class.
 */
export class MainScene {
  private readonly hero = new Hero();
  private readonly controller = new Controller();
  private readonly hud = new Hud();
  private lastFrame = performance.now();
  private raf = 0;
  private game: Forge2dGame | null = null;
  private scene: Forge2dSceneFacade | null = null;
  private jumpSource: "space" | "mouse-left" | "touch" | null = null;

  public definition(): Forge2dSceneDefinition {
    return {
      id: SCENE_ID,
      render: createRenderDefinition(this.hero),
      colliders: [
        {
          id: "hero-body",
          entityId: HERO_ENTITY,
          shape: { kind: "aabb", size: [18, 24] },
        },
        ...PLATFORMS.map((platform) => ({
          id: platform.body,
          entityId: platform.entity,
          shape: { kind: "aabb" as const, size: platform.size },
        })),
      ],
      setup: (scene) => this.setup(scene),
      fixedUpdate: (scene) => this.fixedUpdate(scene),
    };
  }

  public bindGame(game: Forge2dGame): void {
    this.game = game;

    const ui = game.ui as UiShellLike | null;
    if (ui) {
      this.hud.setup(ui, {
        getCanvasSize: () => ({
          width: game.canvas.width,
          height: game.canvas.height,
        }),
        getSceneId: () => SCENE_ID,
        getHeroPosition: () => this.hero.getPosition(),
        getHeroVelocity: () => this.hero.getVelocity(),
        getGrounded: () => this.hero.isGrounded(),
      });
    }

    this.controller.setup({
      onJump: (source) => {
        this.jumpSource = source;
      },
      onReset: () => {
        this.resetHero();
        this.hud.notify("E — hero reset");
      },
      onMove: (key, label) => this.hud.notify(`${key} — move ${label}`),
    });

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - this.lastFrame) / 1000);
      this.lastFrame = now;
      this.hud.update(dt);
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  public destroy(): void {
    cancelAnimationFrame(this.raf);
    this.controller.destroy();
    this.hud.destroy();
    this.scene = null;
    this.game = null;
  }

  private setup(scene: Forge2dSceneFacade): void {
    this.scene = scene;
    scene.hud.set(
      "hud/status",
      Object.freeze({ moving: false, position: this.hero.getPosition() }),
    );
  }

  private fixedUpdate(scene: Forge2dSceneFacade): void {
    if (!this.game) return;

    const move = this.game.actions.value(PlayerControls.move) as readonly [number, number];
    if (this.jumpSource && this.hero.jump()) {
      this.hud.notify(jumpLabel(this.jumpSource));
    }
    this.jumpSource = null;

    const position = this.hero.step(move[0], PLATFORMS);
    scene.setTransform(HERO_ENTITY, {
      position,
      rotation: 0,
      scale: [1, 1],
    });

    if (position[1] > 150) {
      this.resetHero();
      this.hud.notify("Hero fell — reset to checkpoint");
    }

    scene.hud.set(
      "hud/status",
      Object.freeze({
        moving: Math.abs(move[0]) > 0.01,
        grounded: this.hero.isGrounded(),
        position: this.hero.getPosition(),
      }),
    );
  }

  private resetHero(): void {
    const position = this.hero.resetPosition();
    this.scene?.setTransform(HERO_ENTITY, {
      position,
      rotation: 0,
      scale: [1, 1],
    });
    this.jumpSource = null;
  }
}

function jumpLabel(source: "space" | "mouse-left" | "touch"): string {
  if (source === "space") return "Space — jump";
  if (source === "touch") return "Touch — jump";
  return "Left click — jump";
}
