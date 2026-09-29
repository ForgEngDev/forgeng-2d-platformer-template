import type { UiDisposable, UiShellLike } from "@forgeng/ui-dom";
import { ACTIVE_CONTROLS } from "./controller";

/** Metrics exposed by the 2D game and scene. */
export interface MetricsSource {
  getCanvasSize(): { width: number; height: number };
  getSceneId(): string;
  getHeroPosition(): readonly [number, number];
  getHeroVelocity(): readonly [number, number];
  getGrounded(): boolean;
}

function readAdvancedFromUrl(): boolean {
  try {
    return new URLSearchParams(window.location.search).has("advanced");
  } catch {
    return false;
  }
}

/**
 * Beginner-friendly engine GUI: Controls and status are always visible;
 * advanced Metrics appear only after using the toggle or ?advanced=1.
 */
export class Hud {
  private readonly disposers: UiDisposable[] = [];
  private ui: UiShellLike | null = null;
  private source: MetricsSource | null = null;
  private styleEl: HTMLStyleElement | null = null;

  private advanced = false;
  private fps = 0;
  private frameMs = 0;
  private timeSeconds = 0;
  private frames = 0;
  private fpsTimer = 0;

  public setup(ui: UiShellLike, source: MetricsSource): void {
    this.destroy();
    this.ui = ui;
    this.source = source;
    this.advanced = readAdvancedFromUrl();

    this.hideDefaultEngineChrome(ui);
    this.applyAdvancedMode(this.advanced);

    this.disposers.push(
      ui.settings.register({
        id: "template.controls",
        title: "Controls",
        fields: [
          {
            id: "status",
            label: "Status",
            read: () => `Ready · ${this.fps} FPS`,
            kind: "status",
          },
          ...ACTIVE_CONTROLS.map((control) => ({
            id: `ctrl-${control.id}`,
            label: control.label,
            kind: "status" as const,
            read: () => control.help,
          })),
          {
            id: "advanced",
            label: "Advanced metrics",
            kind: "boolean",
            read: () => this.advanced,
            write: (value: string | number | boolean | null) => {
              this.setAdvanced(value === true);
            },
          },
          {
            id: "advanced-hint",
            label: "Tip",
            kind: "status",
            read: () =>
              this.advanced
                ? "Metrics are enabled (?advanced=1)"
                : "Enable above or open ?advanced=1",
          },
        ],
      }),
    );
    this.disposers.push(
      ui.contributions.register({
        id: "template.controls.panel",
        title: "Controls",
        slot: "side-panel",
        order: 10,
        settingsSchemaId: "template.controls",
      }),
    );

    this.disposers.push(
      ui.settings.register({
        id: "template.metrics",
        title: "Metrics",
        fields: [
          { id: "fps", label: "FPS", kind: "status", read: () => String(this.fps) },
          {
            id: "frame-ms",
            label: "Frame time",
            kind: "status",
            read: () => `${this.frameMs.toFixed(1)} ms`,
          },
          {
            id: "time",
            label: "Scene time",
            kind: "status",
            read: () => `${this.timeSeconds.toFixed(1)} s`,
          },
          {
            id: "scene",
            label: "Scene",
            kind: "status",
            read: () => this.source?.getSceneId() ?? "—",
          },
          {
            id: "hero-pos",
            label: "Hero XY",
            kind: "status",
            read: () => {
              const p = this.source?.getHeroPosition();
              return p ? `${p[0].toFixed(0)}, ${p[1].toFixed(0)}` : "—";
            },
          },
          {
            id: "grounded",
            label: "Hero state",
            kind: "status",
            read: () => (this.source?.getGrounded() ? "grounded" : "airborne"),
          },
          {
            id: "velocity",
            label: "Hero velocity",
            kind: "status",
            read: () => {
              const velocity = this.source?.getHeroVelocity();
              return velocity
                ? `${velocity[0].toFixed(0)}, ${velocity[1].toFixed(0)}`
                : "—";
            },
          },
          {
            id: "resolution",
            label: "Resolution",
            kind: "status",
            read: () => {
              const size = this.source?.getCanvasSize();
              return size ? `${size.width}×${size.height}` : "—";
            },
          },
          {
            id: "virtual",
            label: "Virtual size",
            kind: "status",
            read: () => "320×180",
          },
        ],
      }),
    );
    this.disposers.push(
      ui.contributions.register({
        id: "template.metrics.panel",
        title: "Metrics",
        slot: "side-panel",
        order: 20,
        settingsSchemaId: "template.metrics",
      }),
    );
  }

  public update(dt: number): void {
    this.timeSeconds += dt;
    this.frames += 1;
    this.fpsTimer += dt;

    if (this.fpsTimer >= 0.5) {
      this.fps = Math.round(this.frames / this.fpsTimer);
      this.frameMs = this.fps > 0 ? 1000 / this.fps : 0;
      this.frames = 0;
      this.fpsTimer = 0;
      this.ui?.settings.refresh("template.controls");
      if (this.advanced) {
        this.ui?.settings.refresh("template.metrics");
      }
    }
  }

  private notifyTimer: ReturnType<typeof setTimeout> | null = null;
  private toastEl: HTMLElement | null = null;

  public notify(message: string, durationMs = 6000): void {
    if (typeof document === "undefined") return;

    if (this.notifyTimer) {
      clearTimeout(this.notifyTimer);
      this.notifyTimer = null;
    }

    const toast = this.ensureToast();
    toast.innerHTML = `<strong>Controls</strong><span>${escapeHtml(message)}</span>`;
    toast.hidden = false;

    this.notifyTimer = setTimeout(() => {
      toast.hidden = true;
      this.notifyTimer = null;
    }, durationMs);
  }

  public destroy(): void {
    if (this.notifyTimer) {
      clearTimeout(this.notifyTimer);
      this.notifyTimer = null;
    }
    this.toastEl?.remove();
    this.toastEl = null;

    for (const d of this.disposers.splice(0).reverse()) {
      void d.dispose();
    }
    this.styleEl?.remove();
    this.styleEl = null;
    if (typeof document !== "undefined") {
      delete document.body.dataset.templateAdvanced;
    }
    this.ui = null;
    this.source = null;
  }

  private ensureToast(): HTMLElement {
    if (this.toastEl) return this.toastEl;

    const toast = document.createElement("div");
    toast.className = "template-toast";
    toast.hidden = true;
    document.body.appendChild(toast);
    this.toastEl = toast;
    return toast;
  }

  private setAdvanced(enabled: boolean): void {
    this.advanced = enabled;
    this.applyAdvancedMode(enabled);
    this.syncAdvancedUrl(enabled);
    this.ui?.settings.refresh("template.controls");
    if (enabled) this.ui?.settings.refresh("template.metrics");
  }

  private applyAdvancedMode(enabled: boolean): void {
    if (typeof document === "undefined") return;
    document.body.dataset.templateAdvanced = enabled ? "1" : "0";
  }

  private syncAdvancedUrl(enabled: boolean): void {
    try {
      const url = new URL(window.location.href);
      if (enabled) url.searchParams.set("advanced", "1");
      else url.searchParams.delete("advanced");
      window.history.replaceState({}, "", url);
    } catch {
      // ignore
    }
  }

  private hideDefaultEngineChrome(ui: UiShellLike): void {
    ui.preferences.update({
      layout: {
        sidePanelWidth: 340,
        sidePanelCollapsed: false,
        hiddenSlots: ["top-bar", "bottom-status"],
      },
    });

    if (typeof document === "undefined") return;

    this.styleEl = document.createElement("style");
    this.styleEl.id = "template-ui-focus";
    this.styleEl.textContent = `
      .forgeng-ui-surface[data-surface-id$=".chrome"],
      .forgeng-ui-surface[data-surface-id$=".menu"] {
        display: none !important;
      }
      .forgeng-ui-card[data-contribution-id="forgeng.renderer.webgpu.debug"],
      .forgeng-ui-card[data-contribution-id="forgeng.audio.webaudio.panel"],
      .forgeng-ui-card[data-contribution-id="forgeng.assets.health.panel"] {
        display: none !important;
      }
      body[data-template-advanced="0"] .forgeng-ui-card[data-contribution-id="template.metrics.panel"] {
        display: none !important;
      }
      .forgeng-ui-shell {
        --fg-side-width: 340px;
      }
      .forgeng-ui-slot[data-slot="side-panel"] {
        top: 12px;
        bottom: 12px;
      }
      .forgeng-ui-slot[data-slot="top-bar"] {
        display: none !important;
      }
      @media (max-width: 600px) {
        .forgeng-ui-shell {
          --fg-side-width: min(260px, calc(100vw - 24px));
        }
        .forgeng-ui-slot[data-slot="side-panel"] {
          top: 12px;
          bottom: auto;
          max-height: min(300px, 34vh);
          overscroll-behavior: contain;
        }
      }
    `;
    document.head.appendChild(this.styleEl);
  }
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
