import type { Input } from "../core/input";
import type { Explore } from "../rider/onfoot";
import type { ChaseCam } from "../rider/camera";
import type { Pause } from "../pause";

export interface MobilePrefs {
  mode: "fixed" | "floating";
  size: "compact" | "normal" | "large";
  sensitivity: "low" | "medium" | "high";
  autoSprint: boolean;
  visibility: "auto" | "always";
  vibrate: boolean;
}

const DEFAULT_PREFS: MobilePrefs = {
  mode: "fixed",
  size: "normal",
  sensitivity: "medium",
  autoSprint: true,
  visibility: "auto",
  vibrate: true,
};

const PREFS_KEY = "techyon_mobile_joystick_prefs";

export class MobileControls {
  private container: HTMLDivElement;
  private joystickBase: HTMLDivElement;
  private joystickKnob: HTMLDivElement;
  private mountBtn: HTMLButtonElement;
  private brakeBtn: HTMLButtonElement;
  private sprintBtn: HTMLButtonElement;
  private bellBtn: HTMLButtonElement;
  private camBtn: HTMLButtonElement;
  private moneyBtn: HTMLButtonElement;
  private pauseBtn: HTMLButtonElement;
  private fullscreenBtn: HTMLButtonElement;
  private settingsBtn: HTMLButtonElement;
  private settingsModal: HTMLDivElement;

  private activeTouchId: number | null = null;
  private lookTouchId: number | null = null;
  private baseX = 0;
  private baseY = 0;
  private lastLookX = 0;
  private lastLookY = 0;
  private lookMoved = 0;
  private lastTapTime = 0;
  private sprintLocked = false;
  private brakeHeld = false;

  private prefs: MobilePrefs;

  constructor(
    private input: Input,
    private explore: Explore,
    private chase: ChaseCam,
    private pause: Pause,
    private onRingBell: () => void,
    private onCheckMoney?: () => void,
    private onToggleCamera?: () => void,
    private onFirstTouch?: () => void,
  ) {
    this.prefs = this.loadPrefs();
    this.injectStyles();

    this.container = document.createElement("div");
    this.container.id = "techyon-mobile-controls";

    // 1. Joystick Elements (clean minimal design, no radar arrows or sci-fi rings)
    this.joystickBase = document.createElement("div");
    this.joystickBase.className = "th-joystick-base";
    this.joystickBase.innerHTML = "";
    this.joystickKnob = document.createElement("div");
    this.joystickKnob.className = "th-joystick-knob";
    this.joystickBase.appendChild(this.joystickKnob);
    this.container.appendChild(this.joystickBase);

    // 2. Action buttons cluster (Bottom-Right, minimal 2-row layout)
    const buttonCluster = document.createElement("div");
    buttonCluster.className = "th-btn-cluster";

    const rowSecondary = document.createElement("div");
    rowSecondary.className = "th-btn-row th-btn-row-secondary";

    const rowPrimary = document.createElement("div");
    rowPrimary.className = "th-btn-row th-btn-row-primary";

    // Money / Rates Button
    this.moneyBtn = document.createElement("button");
    this.moneyBtn.className = "th-m-btn th-m-btn-sm th-money-btn";
    this.moneyBtn.style.display = "none";
    this.moneyBtn.innerHTML = `<span>Rates</span>`;
    this.moneyBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.vibrate(15);
      this.onCheckMoney?.();
    }, { passive: false });

    // Camera Switch Button
    this.camBtn = document.createElement("button");
    this.camBtn.className = "th-m-btn th-m-btn-sm th-cam-btn";
    this.camBtn.innerHTML = `<span>Cam</span>`;
    this.camBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.vibrate(15);
      if (this.onToggleCamera) this.onToggleCamera();
      else this.chase.toggle();
    }, { passive: false });

    // Sprint Button
    this.sprintBtn = document.createElement("button");
    this.sprintBtn.className = "th-m-btn th-m-btn-sm th-sprint-btn";
    this.sprintBtn.innerHTML = `<span>Sprint</span>`;
    this.sprintBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.vibrate(15);
      this.sprintLocked = !this.sprintLocked;
      this.input.sprint = this.sprintLocked;
      this.sprintBtn.classList.toggle("active", this.sprintLocked);
    }, { passive: false });

    // Bell Button
    this.bellBtn = document.createElement("button");
    this.bellBtn.className = "th-m-btn th-m-btn-sm th-bell-btn";
    this.bellBtn.innerHTML = `<span>Bell</span>`;
    this.bellBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.vibrate(15);
      this.onRingBell();
    }, { passive: false });

    // Mount / Walk Button
    this.mountBtn = document.createElement("button");
    this.mountBtn.className = "th-m-btn th-mount-btn";
    this.mountBtn.innerHTML = `<span>Ride</span>`;
    this.mountBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.vibrate(15);
      this.explore.pressF();
      this.updateMountLabel();
    }, { passive: false });

    // Brake / Reverse Button
    this.brakeBtn = document.createElement("button");
    this.brakeBtn.className = "th-m-btn th-brake-btn";
    this.brakeBtn.innerHTML = `<span>Brake</span>`;
    const startBrake = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      this.vibrate(15);
      this.brakeHeld = true;
      this.brakeBtn.classList.add("active");
      this.input.down = true;
      this.input.analogBrake = 1.0;
    };
    const endBrake = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      this.brakeHeld = false;
      this.brakeBtn.classList.remove("active");
      this.input.down = false;
      this.input.analogBrake = 0.0;
    };
    this.brakeBtn.addEventListener("touchstart", startBrake, { passive: false });
    this.brakeBtn.addEventListener("touchend", endBrake, { passive: false });
    this.brakeBtn.addEventListener("touchcancel", endBrake, { passive: false });

    rowSecondary.appendChild(this.moneyBtn);
    rowSecondary.appendChild(this.camBtn);
    rowSecondary.appendChild(this.sprintBtn);
    rowSecondary.appendChild(this.bellBtn);

    rowPrimary.appendChild(this.mountBtn);
    rowPrimary.appendChild(this.brakeBtn);

    buttonCluster.appendChild(rowSecondary);
    buttonCluster.appendChild(rowPrimary);
    this.container.appendChild(buttonCluster);

    // 3. Top Controls Bar (Top-Right)
    const topBar = document.createElement("div");
    topBar.className = "th-top-touch-bar";

    this.settingsBtn = document.createElement("button");
    this.settingsBtn.className = "th-top-btn th-settings-touch-btn";
    this.settingsBtn.title = "Joystick Settings";
    this.settingsBtn.innerHTML = `<span>⚙</span>`;
    this.settingsBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.vibrate(15);
      this.toggleSettingsModal();
    }, { passive: false });

    this.fullscreenBtn = document.createElement("button");
    this.fullscreenBtn.className = "th-top-btn th-fullscreen-touch-btn";
    this.fullscreenBtn.title = "Fullscreen";
    this.fullscreenBtn.innerHTML = `<span>⛶</span>`;
    this.fullscreenBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.vibrate(20);
      this.toggleFullscreen();
    }, { passive: false });

    this.pauseBtn = document.createElement("button");
    this.pauseBtn.className = "th-top-btn th-pause-touch-btn";
    this.pauseBtn.title = "Pause";
    this.pauseBtn.innerHTML = `<span>❚❚</span>`;
    this.pauseBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.vibrate(15);
      this.pause.pause();
    }, { passive: false });

    topBar.appendChild(this.settingsBtn);
    topBar.appendChild(this.fullscreenBtn);
    topBar.appendChild(this.pauseBtn);
    this.container.appendChild(topBar);

    // 4. Joystick Options Dialog
    this.settingsModal = this.createSettingsModal();
    this.container.appendChild(this.settingsModal);

    document.body.appendChild(this.container);

    this.bindTouchZones();
    this.applyPrefs();
    this.updateVisibility();

    // Audio context unlock on first touch
    const unlockAudio = () => {
      this.onFirstTouch?.();
    };
    window.addEventListener("touchstart", unlockAudio, { once: true, passive: true });
    window.addEventListener("touchend", unlockAudio, { once: true, passive: true });
  }

  private loadPrefs(): MobilePrefs {
    try {
      const saved = localStorage.getItem(PREFS_KEY);
      if (saved) return { ...DEFAULT_PREFS, ...JSON.parse(saved) };
    } catch {}
    return { ...DEFAULT_PREFS };
  }

  private savePrefs(): void {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(this.prefs));
    } catch {}
  }

  private vibrate(ms = 15): void {
    if (this.prefs.vibrate && typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(ms);
      } catch {}
    }
  }

  private toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  private createSettingsModal(): HTMLDivElement {
    const modal = document.createElement("div");
    modal.className = "th-mobile-settings-modal";
    modal.innerHTML = `
      <div class="th-ms-card">
        <div class="th-ms-header">
          <div class="th-ms-title">🕹️ JOYSTICK & MOBILE OPTIONS</div>
          <button class="th-ms-close">✕</button>
        </div>
        
        <div class="th-ms-row">
          <label>Joystick Position</label>
          <div class="th-ms-group" data-key="mode">
            <button data-val="fixed" class="${this.prefs.mode === "fixed" ? "active" : ""}">Fixed Corner</button>
            <button data-val="floating" class="${this.prefs.mode === "floating" ? "active" : ""}">Dynamic Follow</button>
          </div>
        </div>

        <div class="th-ms-row">
          <label>Joystick Size</label>
          <div class="th-ms-group" data-key="size">
            <button data-val="compact" class="${this.prefs.size === "compact" ? "active" : ""}">Compact</button>
            <button data-val="normal" class="${this.prefs.size === "normal" ? "active" : ""}">Normal</button>
            <button data-val="large" class="${this.prefs.size === "large" ? "active" : ""}">Large</button>
          </div>
        </div>

        <div class="th-ms-row">
          <label>Camera Look Sensitivity</label>
          <div class="th-ms-group" data-key="sensitivity">
            <button data-val="low" class="${this.prefs.sensitivity === "low" ? "active" : ""}">Low</button>
            <button data-val="medium" class="${this.prefs.sensitivity === "medium" ? "active" : ""}">Medium</button>
            <button data-val="high" class="${this.prefs.sensitivity === "high" ? "active" : ""}">High</button>
          </div>
        </div>

        <div class="th-ms-row">
          <label>Auto-Sprint (Push Edge)</label>
          <div class="th-ms-group" data-key="autoSprint">
            <button data-val="true" class="${this.prefs.autoSprint ? "active" : ""}">ON</button>
            <button data-val="false" class="${!this.prefs.autoSprint ? "active" : ""}">OFF</button>
          </div>
        </div>

        <div class="th-ms-row">
          <label>Touch Controls Display</label>
          <div class="th-ms-group" data-key="visibility">
            <button data-val="auto" class="${this.prefs.visibility === "auto" ? "active" : ""}">Auto-Detect</button>
            <button data-val="always" class="${this.prefs.visibility === "always" ? "active" : ""}">Always ON</button>
          </div>
        </div>

        <div class="th-ms-row">
          <label>Haptic Feedback</label>
          <div class="th-ms-group" data-key="vibrate">
            <button data-val="true" class="${this.prefs.vibrate ? "active" : ""}">ON</button>
            <button data-val="false" class="${!this.prefs.vibrate ? "active" : ""}">OFF</button>
          </div>
        </div>

        <div class="th-ms-footer">
          <div class="th-ms-tip">💡 Swipe right screen to look · Double-tap to center camera</div>
          <button class="th-ms-done-btn">Save & Resume</button>
        </div>
      </div>
    `;

    // Hook up buttons
    modal.querySelectorAll(".th-ms-group button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const group = target.parentElement!;
        const key = group.dataset.key as keyof MobilePrefs;
        group.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
        target.classList.add("active");

        const val = target.dataset.val!;
        if (key === "autoSprint" || key === "vibrate") {
          this.prefs[key] = val === "true";
        } else {
          (this.prefs as unknown as Record<string, unknown>)[key] = val;
        }
        this.savePrefs();
        this.applyPrefs();
        this.vibrate(15);
      });
    });

    const close = () => {
      modal.classList.remove("open");
    };
    modal.querySelector(".th-ms-close")?.addEventListener("click", close);
    modal.querySelector(".th-ms-done-btn")?.addEventListener("click", close);

    return modal;
  }

  private toggleSettingsModal(): void {
    this.settingsModal.classList.toggle("open");
  }

  private applyPrefs(): void {
    this.joystickBase.classList.remove("compact", "normal", "large", "fixed", "floating");
    this.joystickBase.classList.add(this.prefs.size);
    this.joystickBase.classList.add(this.prefs.mode);

    if (this.prefs.mode === "fixed") {
      this.repositionFixedBase();
    } else {
      this.joystickBase.classList.remove("active");
    }

    this.updateVisibility();
  }

  private repositionFixedBase(): void {
    const size = this.getJoystickDimensions();
    const pad = 36;
    const x = pad + size.radius;
    const y = window.innerHeight - pad - size.radius;
    this.baseX = x;
    this.baseY = y;
    this.joystickBase.style.left = `${x}px`;
    this.joystickBase.style.top = `${y}px`;
    this.joystickBase.classList.add("active");
    this.setKnobOffset(0, 0);
  }

  private getJoystickDimensions(): { diameter: number; radius: number; maxRadius: number } {
    if (this.prefs.size === "compact") return { diameter: 96, radius: 48, maxRadius: 40 };
    if (this.prefs.size === "large") return { diameter: 144, radius: 72, maxRadius: 60 };
    return { diameter: 118, radius: 59, maxRadius: 48 };
  }

  private getSensitivityMultiplier(): number {
    if (this.prefs.sensitivity === "low") return 0.85;
    if (this.prefs.sensitivity === "high") return 2.1;
    return 1.35;
  }

  private updateVisibility(): void {
    if (this.prefs.visibility === "always") {
      this.container.classList.add("visible");
      return;
    }
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 1024;
    if (isTouch) {
      this.container.classList.add("visible");
    } else {
      this.container.classList.remove("visible");
    }
  }

  private bindTouchZones(): void {
    window.addEventListener(
      "touchstart",
      (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
          const touch = e.changedTouches[i];
          const x = touch.clientX;
          const y = touch.clientY;

          // Ignore touches on UI buttons & modals
          const target = touch.target as HTMLElement | null;
          if (target && target.closest(".th-btn-cluster, .th-top-touch-bar, .th-mobile-settings-modal, .th-modal, #pause")) {
            continue;
          }

          if (x < window.innerWidth * 0.46) {
            // Left Zone: Joystick control
            if (this.activeTouchId === null) {
              this.activeTouchId = touch.identifier;
              const dims = this.getJoystickDimensions();

              if (this.prefs.mode === "floating") {
                this.baseX = x;
                this.baseY = y;
                this.joystickBase.style.left = `${x}px`;
                this.joystickBase.style.top = `${y}px`;
                this.joystickBase.classList.add("active");
                this.setKnobOffset(0, 0);
              } else {
                // Fixed position: calculate initial offset from fixed center
                const dx = x - this.baseX;
                const dy = y - this.baseY;
                const dist = Math.hypot(dx, dy);
                if (dist <= dims.radius * 2.2) {
                  this.updateJoystickMotion(dx, dy, dims.maxRadius);
                } else {
                  // Touch was far from fixed base: clamp initial pull
                  this.updateJoystickMotion(dx * 0.5, dy * 0.5, dims.maxRadius);
                }
              }
            }
          } else {
            // Right Zone: Camera look / swipe pad
            if (this.lookTouchId === null) {
              this.lookTouchId = touch.identifier;
              this.lastLookX = x;
              this.lastLookY = y;
              this.lookMoved = 0;
              // Ensure camera look is enabled on mobile touch
              this.chase.mouseLook = true;
            }
          }
        }
      },
      { passive: false },
    );

    window.addEventListener(
      "touchmove",
      (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
          const touch = e.changedTouches[i];

          if (touch.identifier === this.activeTouchId) {
            const dx = touch.clientX - this.baseX;
            const dy = touch.clientY - this.baseY;
            const dims = this.getJoystickDimensions();
            this.updateJoystickMotion(dx, dy, dims.maxRadius);
          } else if (touch.identifier === this.lookTouchId) {
            const dx = touch.clientX - this.lastLookX;
            const dy = touch.clientY - this.lastLookY;
            this.lastLookX = touch.clientX;
            this.lastLookY = touch.clientY;
            this.lookMoved += Math.hypot(dx, dy);

            const mult = this.getSensitivityMultiplier();
            if (this.explore.onFoot) {
              this.explore.orbitBy(dx * mult, dy * mult);
            } else {
              this.chase.lookBy(dx * mult, dy * mult);
            }
          }
        }
      },
      { passive: false },
    );

    const onTouchEndOrCancel = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (touch.identifier === this.activeTouchId) {
          this.activeTouchId = null;
          if (this.prefs.mode === "floating") {
            this.joystickBase.classList.remove("active");
          }
          this.setKnobOffset(0, 0);

          // Reset digital inputs
          this.input.up = false;
          this.input.down = false;
          this.input.left = false;
          this.input.right = false;

          // Reset analog inputs
          this.input.analogSteer = 0;
          this.input.analogThrottle = 0;
          if (!this.brakeHeld) this.input.analogBrake = 0;
          this.input.analogFwd = 0;
          this.input.analogStrafe = 0;

          if (!this.sprintLocked) {
            this.input.sprint = false;
          }
        } else if (touch.identifier === this.lookTouchId) {
          this.lookTouchId = null;

          // Double tap to recenter camera behind player
          const now = performance.now();
          if (this.lookMoved < 10 && now - this.lastTapTime < 320) {
            this.recenterCamera();
          }
          this.lastTapTime = now;
        }
      }
    };

    window.addEventListener("touchend", onTouchEndOrCancel, { passive: true });
    window.addEventListener("touchcancel", onTouchEndOrCancel, { passive: true });
    window.addEventListener("resize", () => {
      if (this.prefs.mode === "fixed") this.repositionFixedBase();
    });
  }

  private updateJoystickMotion(dx: number, dy: number, maxRadius: number): void {
    const dist = Math.hypot(dx, dy);
    const clampedDist = Math.min(dist, maxRadius);
    const angle = Math.atan2(dy, dx);
    const kx = Math.cos(angle) * clampedDist;
    const ky = Math.sin(angle) * clampedDist;

    this.setKnobOffset(kx, ky);

    // Normalized components in [-1, 1]
    const normX = kx / maxRadius;
    const normY = ky / maxRadius;
    const mag = clampedDist / maxRadius;

    // Deadzone (0.10)
    if (mag < 0.10) {
      this.input.up = false;
      this.input.down = false;
      this.input.left = false;
      this.input.right = false;
      this.input.analogSteer = 0;
      this.input.analogThrottle = 0;
      if (!this.brakeHeld) this.input.analogBrake = 0;
      this.input.analogFwd = 0;
      this.input.analogStrafe = 0;
      return;
    }

    // Analog steering: positive = turn left, negative = turn right
    this.input.analogSteer = -normX;

    // Analog throttle & brake for bicycle
    if (normY < 0) {
      // Pushing forward accelerates
      this.input.analogThrottle = Math.min(1.0, -normY / 0.85);
      if (!this.brakeHeld) this.input.analogBrake = 0;
    } else {
      // Pulling backward brakes / reverses
      this.input.analogThrottle = 0;
      this.input.analogBrake = Math.min(1.0, normY / 0.85);
    }

    // Analog forward & strafe for on-foot exploration
    this.input.analogFwd = -normY;
    this.input.analogStrafe = normX;

    // Digital fallback triggers
    this.input.up = normY < -0.22;
    this.input.down = normY > 0.22;
    this.input.left = normX < -0.22;
    this.input.right = normX > 0.22;

    // Auto-sprint trigger when pushed toward perimeter
    if (this.prefs.autoSprint && mag > 0.88) {
      this.input.sprint = true;
    } else if (!this.sprintLocked) {
      this.input.sprint = false;
    }
  }

  private recenterCamera(): void {
    this.vibrate(25);
    this.chase.recenter();
    if (this.explore.onFoot) {
      this.explore.recenter();
    }
  }

  private setKnobOffset(x: number, y: number): void {
    this.joystickKnob.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  }

  updateMountLabel(): void {
    if (this.mountBtn) {
      this.mountBtn.innerHTML = `<span>${this.explore.onFoot ? "Ride" : "Walk"}</span>`;
    }
  }

  setMoneyButtonVisible(visible: boolean): void {
    if (this.moneyBtn) {
      this.moneyBtn.style.display = visible ? "flex" : "none";
    }
  }

  private injectStyles(): void {
    const style = document.createElement("style");
    style.id = "techyon-mobile-styles";
    style.textContent = `
      #techyon-mobile-controls {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 12;
        display: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: none;
      }
      #techyon-mobile-controls.visible {
        display: block;
      }
      @media (pointer: coarse), (max-width: 900px) {
        #hud { display: none !important; }
      }

      /* Minimal Clean Joystick Base */
      .th-joystick-base {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.18);
        pointer-events: none;
        opacity: 0;
        transform: translate(-50%, -50%);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        transition: opacity 0.2s ease, border-color 0.2s ease;
      }
      .th-joystick-base.fixed {
        opacity: 0.55;
      }
      .th-joystick-base.active {
        opacity: 0.9;
        border-color: rgba(255, 255, 255, 0.35);
      }

      /* Sizes */
      .th-joystick-base.compact {
        width: 96px;
        height: 96px;
      }
      .th-joystick-base.compact .th-joystick-knob {
        width: 40px;
        height: 40px;
      }
      .th-joystick-base.normal {
        width: 118px;
        height: 118px;
      }
      .th-joystick-base.normal .th-joystick-knob {
        width: 48px;
        height: 48px;
      }
      .th-joystick-base.large {
        width: 144px;
        height: 144px;
      }
      .th-joystick-base.large .th-joystick-knob {
        width: 58px;
        height: 58px;
      }

      /* Minimal Joystick Knob */
      .th-joystick-knob {
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.38);
        border: 1.5px solid rgba(255, 255, 255, 0.75);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        transform: translate(-50%, -50%);
        will-change: transform;
      }

      /* Action Buttons Cluster: Clean Minimal 2-Row Layout */
      .th-btn-cluster {
        position: absolute;
        right: max(16px, env(safe-area-inset-right));
        bottom: max(16px, env(safe-area-inset-bottom));
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 8px;
        pointer-events: auto;
      }
      .th-btn-row {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      /* Clean Frosted Minimal Buttons */
      .th-m-btn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: rgba(14, 18, 24, 0.45);
        color: rgba(255, 255, 255, 0.9);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.02em;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        touch-action: manipulation;
        transition: transform 0.1s ease, background 0.12s ease, opacity 0.12s ease;
      }
      .th-m-btn-sm {
        width: 40px;
        height: 40px;
        font-size: 10px;
        opacity: 0.8;
      }
      .th-m-btn:active, .th-m-btn.active {
        background: rgba(255, 255, 255, 0.24);
        border-color: rgba(255, 255, 255, 0.6);
        color: #ffffff;
        transform: scale(0.92);
      }
      .th-brake-btn {
        background: rgba(36, 16, 18, 0.45);
        border-color: rgba(240, 120, 130, 0.3);
        color: #ffd2d6;
      }
      .th-brake-btn:active, .th-brake-btn.active {
        background: rgba(160, 40, 50, 0.6);
        border-color: rgba(255, 140, 150, 0.7);
        color: #ffffff;
      }
      .th-sprint-btn.active {
        background: rgba(255, 255, 255, 0.28);
        border-color: rgba(255, 255, 255, 0.7);
      }
      .th-money-btn {
        background: rgba(20, 36, 48, 0.45);
        border-color: rgba(130, 200, 240, 0.35);
        color: #aee0f8;
      }

      /* Top Minimal Controls Bar */
      .th-top-touch-bar {
        position: absolute;
        top: max(14px, env(safe-area-inset-top));
        right: max(16px, env(safe-area-inset-right));
        display: flex;
        gap: 8px;
        pointer-events: auto;
      }
      .th-top-btn {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: rgba(14, 18, 24, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.18);
        color: rgba(255, 255, 255, 0.8);
        font-size: 13px;
        display: grid;
        place-items: center;
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        cursor: pointer;
        transition: transform 0.1s ease, background 0.12s ease;
      }
      .th-top-btn:active {
        transform: scale(0.92);
        background: rgba(255, 255, 255, 0.2);
      }

      /* Mobile Settings Modal */
      .th-mobile-settings-modal {
        position: fixed;
        inset: 0;
        z-index: 50;
        background: rgba(4, 6, 10, 0.75);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        display: none;
        place-items: center;
        pointer-events: auto;
        padding: 16px;
      }
      .th-mobile-settings-modal.open {
        display: grid;
      }
      .th-ms-card {
        background: rgba(18, 22, 28, 0.92);
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 12px;
        width: 100%;
        max-width: 440px;
        padding: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
        color: #f0f0f0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      .th-ms-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        padding-bottom: 10px;
        margin-bottom: 16px;
      }
      .th-ms-title {
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
      }
      .th-ms-close {
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.6);
        font-size: 16px;
        cursor: pointer;
        padding: 4px 8px;
      }
      .th-ms-row {
        margin-bottom: 14px;
      }
      .th-ms-row label {
        display: block;
        font-size: 11px;
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: 6px;
      }
      .th-ms-group {
        display: flex;
        gap: 6px;
      }
      .th-ms-group button {
        flex: 1;
        padding: 7px 10px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.8);
        font-size: 11px;
        font-family: inherit;
        cursor: pointer;
        transition: all 0.12s ease;
      }
      .th-ms-group button.active {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.45);
        color: #ffffff;
      }
      .th-ms-footer {
        margin-top: 16px;
        border-top: 1px solid rgba(255, 255, 255, 0.12);
        padding-top: 12px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .th-ms-tip {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.45);
        text-align: center;
      }
      .th-ms-done-btn {
        width: 100%;
        padding: 10px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.18);
        border: 1px solid rgba(255, 255, 255, 0.35);
        color: #ffffff;
        font-family: inherit;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
      }
      .th-ms-done-btn:active {
        background: rgba(255, 255, 255, 0.28);
      }
    `;
    document.head.appendChild(style);
  }
}
