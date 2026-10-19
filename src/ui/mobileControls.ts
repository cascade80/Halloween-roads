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

    // 1. Joystick Elements
    this.joystickBase = document.createElement("div");
    this.joystickBase.className = "th-joystick-base";
    this.joystickBase.innerHTML = `
      <div class="th-joy-ring"></div>
      <div class="th-joy-arrow up">▲</div>
      <div class="th-joy-arrow left">◀</div>
      <div class="th-joy-arrow right">▶</div>
      <div class="th-joy-arrow down">▼</div>
    `;
    this.joystickKnob = document.createElement("div");
    this.joystickKnob.className = "th-joystick-knob";
    this.joystickBase.appendChild(this.joystickKnob);
    this.container.appendChild(this.joystickBase);

    // 2. Action buttons cluster (Bottom-Right)
    const buttonCluster = document.createElement("div");
    buttonCluster.className = "th-btn-cluster";

    // Money / Rates Button
    this.moneyBtn = document.createElement("button");
    this.moneyBtn.className = "th-m-btn th-money-btn";
    this.moneyBtn.style.display = "none";
    this.moneyBtn.innerHTML = `<span>$ RATES</span>`;
    this.moneyBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.vibrate(20);
      this.onCheckMoney?.();
    }, { passive: false });

    // Mount / Walk Button
    this.mountBtn = document.createElement("button");
    this.mountBtn.className = "th-m-btn th-mount-btn";
    this.mountBtn.innerHTML = `<span>RIDE / WALK</span>`;
    this.mountBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.vibrate(20);
      this.explore.pressF();
    }, { passive: false });

    // Brake / Reverse Button
    this.brakeBtn = document.createElement("button");
    this.brakeBtn.className = "th-m-btn th-brake-btn";
    this.brakeBtn.innerHTML = `<span>BRAKE</span>`;
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

    // Sprint Button
    this.sprintBtn = document.createElement("button");
    this.sprintBtn.className = "th-m-btn th-sprint-btn";
    this.sprintBtn.innerHTML = `<span>SPRINT</span>`;
    this.sprintBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.vibrate(18);
      this.sprintLocked = !this.sprintLocked;
      this.input.sprint = this.sprintLocked;
      this.sprintBtn.classList.toggle("active", this.sprintLocked);
    }, { passive: false });

    // Bell Button
    this.bellBtn = document.createElement("button");
    this.bellBtn.className = "th-m-btn th-bell-btn";
    this.bellBtn.innerHTML = `<span>BELL</span>`;
    this.bellBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.vibrate(15);
      this.onRingBell();
    }, { passive: false });

    // Camera Switch Button (V)
    this.camBtn = document.createElement("button");
    this.camBtn.className = "th-m-btn th-cam-btn";
    this.camBtn.innerHTML = `<span>CAM [V]</span>`;
    this.camBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.vibrate(15);
      if (this.onToggleCamera) this.onToggleCamera();
      else this.chase.toggle();
    }, { passive: false });

    buttonCluster.appendChild(this.moneyBtn);
    buttonCluster.appendChild(this.camBtn);
    buttonCluster.appendChild(this.mountBtn);
    buttonCluster.appendChild(this.brakeBtn);
    buttonCluster.appendChild(this.sprintBtn);
    buttonCluster.appendChild(this.bellBtn);
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
    if (this.prefs.size === "compact") return { diameter: 106, radius: 53, maxRadius: 44 };
    if (this.prefs.size === "large") return { diameter: 168, radius: 84, maxRadius: 70 };
    return { diameter: 136, radius: 68, maxRadius: 56 };
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

      /* Joystick Base */
      .th-joystick-base {
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(16, 26, 42, 0.65), rgba(8, 14, 22, 0.85));
        border: 2px solid rgba(80, 160, 220, 0.45);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.75), inset 0 0 16px rgba(50, 120, 180, 0.2);
        pointer-events: none;
        opacity: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.25s ease, border-color 0.2s ease;
      }
      .th-joystick-base.fixed {
        opacity: 0.82;
      }
      .th-joystick-base.active {
        opacity: 1;
        border-color: rgba(130, 215, 255, 0.85);
        box-shadow: 0 0 24px rgba(70, 160, 230, 0.4), inset 0 0 20px rgba(70, 160, 230, 0.3);
      }

      /* Sizes */
      .th-joystick-base.compact {
        width: 106px;
        height: 106px;
      }
      .th-joystick-base.compact .th-joystick-knob {
        width: 46px;
        height: 46px;
      }
      .th-joystick-base.normal {
        width: 136px;
        height: 136px;
      }
      .th-joystick-base.normal .th-joystick-knob {
        width: 56px;
        height: 56px;
      }
      .th-joystick-base.large {
        width: 168px;
        height: 168px;
      }
      .th-joystick-base.large .th-joystick-knob {
        width: 68px;
        height: 68px;
      }

      /* Inner Orbit Ring & Directional Arrows */
      .th-joy-ring {
        position: absolute;
        inset: 15%;
        border-radius: 50%;
        border: 1px dashed rgba(120, 180, 230, 0.25);
        pointer-events: none;
      }
      .th-joy-arrow {
        position: absolute;
        font-size: 11px;
        color: rgba(140, 195, 240, 0.4);
        pointer-events: none;
        transform: translate(-50%, -50%);
      }
      .th-joy-arrow.up { top: 12%; left: 50%; }
      .th-joy-arrow.down { bottom: 6%; left: 50%; }
      .th-joy-arrow.left { top: 50%; left: 12%; }
      .th-joy-arrow.right { top: 50%; right: 4%; }

      /* Joystick Knob */
      .th-joystick-knob {
        position: absolute;
        left: 50%;
        top: 50%;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 35%, #58a4d4, #183852 75%, #0e2030);
        border: 2.5px solid rgba(180, 230, 255, 0.9);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.85), 0 0 16px rgba(100, 190, 255, 0.55);
        transform: translate(-50%, -50%);
        will-change: transform;
      }

      /* Action Buttons Cluster */
      .th-btn-cluster {
        position: absolute;
        right: max(20px, env(safe-area-inset-right));
        bottom: max(20px, env(safe-area-inset-bottom));
        display: grid;
        grid-template-columns: repeat(3, auto);
        gap: 12px;
        pointer-events: auto;
      }
      .th-m-btn {
        width: 66px;
        height: 66px;
        border-radius: 50%;
        border: 1.5px solid rgba(100, 160, 215, 0.5);
        background: radial-gradient(circle, rgba(22, 36, 54, 0.9), rgba(10, 18, 28, 0.96));
        color: #d6e8f7;
        font-family: "Palatino Linotype", Palatino, serif;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.08em;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        box-shadow: 0 4px 18px rgba(0, 0, 0, 0.75), inset 0 0 8px rgba(80, 140, 200, 0.2);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        touch-action: manipulation;
        transition: transform 0.12s ease, border-color 0.15s ease, background 0.15s ease;
      }
      .th-m-btn:active, .th-m-btn.active {
        background: radial-gradient(circle, rgba(50, 100, 150, 0.96), rgba(20, 45, 70, 0.98));
        border-color: #82d2ff;
        box-shadow: 0 0 20px rgba(130, 210, 255, 0.7);
        transform: scale(0.92);
      }
      .th-brake-btn {
        border-color: rgba(220, 80, 90, 0.6);
        color: #ffb4b8;
        background: radial-gradient(circle, rgba(48, 16, 24, 0.9), rgba(24, 8, 14, 0.96));
      }
      .th-brake-btn:active, .th-brake-btn.active {
        border-color: #ff6874;
        background: radial-gradient(circle, rgba(140, 30, 45, 0.96), rgba(60, 12, 20, 0.98));
        box-shadow: 0 0 20px rgba(255, 100, 120, 0.7);
      }
      .th-money-btn {
        border-color: #48cae4;
        background: radial-gradient(circle, rgba(20, 60, 90, 0.92), rgba(8, 28, 45, 0.96));
        color: #72e0f8;
      }
      .th-sprint-btn.active {
        border-color: #f7a034;
        box-shadow: 0 0 18px rgba(247, 160, 52, 0.7);
        color: #ffdd99;
      }

      /* Top Controls Bar */
      .th-top-touch-bar {
        position: absolute;
        top: max(16px, env(safe-area-inset-top));
        right: max(20px, env(safe-area-inset-right));
        display: flex;
        gap: 10px;
        pointer-events: auto;
      }
      .th-top-btn {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        background: rgba(14, 24, 38, 0.85);
        border: 1px solid rgba(90, 150, 200, 0.45);
        color: #c4dcf2;
        font-size: 15px;
        display: grid;
        place-items: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        cursor: pointer;
        transition: transform 0.12s ease, border-color 0.15s ease;
      }
      .th-top-btn:active {
        transform: scale(0.9);
        border-color: #82d2ff;
      }

      /* Mobile Settings Modal */
      .th-mobile-settings-modal {
        position: fixed;
        inset: 0;
        z-index: 50;
        background: rgba(4, 8, 14, 0.88);
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
        background: linear-gradient(145deg, #0e1a29, #08101a);
        border: 1.5px solid rgba(80, 145, 205, 0.45);
        border-radius: 14px;
        width: 100%;
        max-width: 480px;
        padding: 24px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.9), 0 0 24px rgba(70, 140, 210, 0.2);
        color: #e2f2fc;
        font-family: "Palatino Linotype", Palatino, Georgia, serif;
      }
      .th-ms-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(80, 145, 205, 0.25);
        padding-bottom: 12px;
        margin-bottom: 18px;
      }
      .th-ms-title {
        font-size: 15px;
        letter-spacing: 0.16em;
        color: #82d2ff;
        font-weight: 700;
      }
      .th-ms-close {
        background: transparent;
        border: none;
        color: #8aa4ba;
        font-size: 18px;
        cursor: pointer;
        padding: 4px 8px;
      }
      .th-ms-row {
        margin-bottom: 14px;
      }
      .th-ms-row label {
        display: block;
        font-size: 12px;
        letter-spacing: 0.08em;
        color: #9cb8ce;
        margin-bottom: 6px;
      }
      .th-ms-group {
        display: flex;
        gap: 8px;
      }
      .th-ms-group button {
        flex: 1;
        padding: 8px 10px;
        border-radius: 6px;
        background: rgba(20, 36, 56, 0.6);
        border: 1px solid rgba(70, 130, 185, 0.35);
        color: #b8d2e8;
        font-size: 12px;
        letter-spacing: 0.04em;
        font-family: inherit;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .th-ms-group button.active {
        background: linear-gradient(135deg, #1c4b75, #103352);
        border-color: #82d2ff;
        color: #ffffff;
        box-shadow: 0 0 10px rgba(130, 210, 255, 0.45);
      }
      .th-ms-footer {
        margin-top: 20px;
        border-top: 1px solid rgba(80, 145, 205, 0.25);
        padding-top: 14px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .th-ms-tip {
        font-size: 11px;
        color: #6a8ea8;
        text-align: center;
        letter-spacing: 0.05em;
      }
      .th-ms-done-btn {
        width: 100%;
        padding: 11px;
        border-radius: 8px;
        background: linear-gradient(135deg, #245888, #14385a);
        border: 1.5px solid #82d2ff;
        color: #ffffff;
        font-family: inherit;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.12em;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
      }
      .th-ms-done-btn:active {
        transform: scale(0.98);
      }
    `;
    document.head.appendChild(style);
  }
}
