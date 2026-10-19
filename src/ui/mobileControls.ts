import type { Input } from "../core/input";
import type { Explore } from "../rider/onfoot";
import type { ChaseCam } from "../rider/camera";
import type { Pause } from "../pause";

export class MobileControls {
  private container: HTMLDivElement;
  private joystickBase: HTMLDivElement;
  private joystickKnob: HTMLDivElement;
  private mountBtn: HTMLButtonElement;
  private sprintBtn: HTMLButtonElement;
  private bellBtn: HTMLButtonElement;
  private moneyBtn: HTMLButtonElement;
  private pauseBtn: HTMLButtonElement;

  private activeTouchId: number | null = null;
  private lookTouchId: number | null = null;
  private baseX = 0;
  private baseY = 0;
  private lastLookX = 0;
  private lastLookY = 0;
  private sprintLocked = false;

  constructor(
    private input: Input,
    private explore: Explore,
    private chase: ChaseCam,
    private pause: Pause,
    private onRingBell: () => void,
    private onCheckMoney?: () => void,
  ) {
    this.injectStyles();

    this.container = document.createElement("div");
    this.container.id = "techyon-mobile-controls";

    // 1. Joystick
    this.joystickBase = document.createElement("div");
    this.joystickBase.className = "th-joystick-base";
    this.joystickKnob = document.createElement("div");
    this.joystickKnob.className = "th-joystick-knob";
    this.joystickBase.appendChild(this.joystickKnob);
    this.container.appendChild(this.joystickBase);

    // 2. Action buttons cluster
    const buttonCluster = document.createElement("div");
    buttonCluster.className = "th-btn-cluster";

    this.mountBtn = document.createElement("button");
    this.mountBtn.className = "th-m-btn th-mount-btn";
    this.mountBtn.innerHTML = `<span>RIDE / WALK</span>`;
    this.mountBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.explore.pressF();
    });

    this.sprintBtn = document.createElement("button");
    this.sprintBtn.className = "th-m-btn th-sprint-btn";
    this.sprintBtn.innerHTML = `<span>SPRINT</span>`;
    this.sprintBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.sprintLocked = !this.sprintLocked;
      this.input.sprint = this.sprintLocked;
      this.sprintBtn.classList.toggle("active", this.sprintLocked);
    });

    this.bellBtn = document.createElement("button");
    this.bellBtn.className = "th-m-btn th-bell-btn";
    this.bellBtn.innerHTML = `<span>BELL</span>`;
    this.bellBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.onRingBell();
    });

    this.moneyBtn = document.createElement("button");
    this.moneyBtn.className = "th-m-btn th-money-btn";
    this.moneyBtn.style.display = "none";
    this.moneyBtn.style.background = "linear-gradient(135deg, #1e3a5f, #0d5c75)";
    this.moneyBtn.style.borderColor = "#48cae4";
    this.moneyBtn.innerHTML = `<span>$ RATES</span>`;
    this.moneyBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.onCheckMoney?.();
    });

    buttonCluster.appendChild(this.moneyBtn);
    buttonCluster.appendChild(this.mountBtn);
    buttonCluster.appendChild(this.sprintBtn);
    buttonCluster.appendChild(this.bellBtn);
    this.container.appendChild(buttonCluster);

    // 3. Pause button
    this.pauseBtn = document.createElement("button");
    this.pauseBtn.className = "th-pause-touch-btn";
    this.pauseBtn.innerHTML = `<span>❚❚</span>`;
    this.pauseBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.pause.pause();
    });
    this.container.appendChild(this.pauseBtn);

    document.body.appendChild(this.container);

    this.bindTouchZones();
    this.updateVisibility();
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

      .th-joystick-base {
        position: absolute;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(20, 36, 54, 0.45), rgba(10, 18, 28, 0.65));
        border: 2px solid rgba(80, 140, 190, 0.4);
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.6);
        pointer-events: none;
        opacity: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.2s ease;
      }
      .th-joystick-base.active {
        opacity: 1;
      }
      .th-joystick-knob {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 35%, #5698c4, #1b3852);
        border: 2px solid rgba(160, 215, 255, 0.8);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8), 0 0 12px rgba(90, 160, 215, 0.45);
        transform: translate(-50%, -50%);
        will-change: transform;
      }

      .th-btn-cluster {
        position: absolute;
        right: 24px;
        bottom: 24px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        pointer-events: auto;
      }
      .th-m-btn {
        width: 68px;
        height: 68px;
        border-radius: 50%;
        border: 1.5px solid rgba(90, 150, 200, 0.45);
        background: radial-gradient(circle, rgba(20, 34, 50, 0.85), rgba(10, 18, 28, 0.95));
        color: #d6e8f7;
        font-family: "Palatino Linotype", Palatino, serif;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.1em;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.65);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        touch-action: manipulation;
      }
      .th-m-btn:active, .th-m-btn.active {
        background: radial-gradient(circle, rgba(40, 80, 120, 0.95), rgba(20, 40, 60, 0.98));
        border-color: #82d2ff;
        box-shadow: 0 0 16px rgba(130, 210, 255, 0.6);
        transform: scale(0.94);
      }
      .th-interact-btn {
        border-color: rgba(130, 210, 255, 0.6);
        color: #82d2ff;
      }
      .th-pause-touch-btn {
        position: absolute;
        top: 24px;
        right: 120px;
        width: 38px;
        height: 38px;
        border-radius: 6px;
        background: rgba(12, 22, 34, 0.8);
        border: 1px solid rgba(80, 130, 170, 0.45);
        color: #b0cee4;
        font-size: 13px;
        display: grid;
        place-items: center;
        pointer-events: auto;
      }
    `;
    document.head.appendChild(style);
  }

  private updateVisibility(): void {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      this.container.classList.add("visible");
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

          if (x < window.innerWidth * 0.45 && this.activeTouchId === null) {
            this.activeTouchId = touch.identifier;
            this.baseX = x;
            this.baseY = y;
            this.joystickBase.style.left = `${x}px`;
            this.joystickBase.style.top = `${y}px`;
            this.joystickBase.classList.add("active");
            this.setKnobOffset(0, 0);
          } else if (x >= window.innerWidth * 0.45 && this.lookTouchId === null) {
            const target = touch.target as HTMLElement | null;
            if (target && target.closest(".th-btn-cluster, .th-journal-btn, .th-modal, #pause")) {
              continue;
            }
            this.lookTouchId = touch.identifier;
            this.lastLookX = x;
            this.lastLookY = y;
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
            const dist = Math.hypot(dx, dy);
            const maxRadius = 50;

            const clampedDist = Math.min(dist, maxRadius);
            const angle = Math.atan2(dy, dx);
            const kx = Math.cos(angle) * clampedDist;
            const ky = Math.sin(angle) * clampedDist;

            this.setKnobOffset(kx, ky);

            const normX = kx / maxRadius;
            const normY = ky / maxRadius;

            this.input.up = normY < -0.28;
            this.input.down = normY > 0.28;
            this.input.left = normX < -0.28;
            this.input.right = normX > 0.28;

            if (dist > maxRadius * 0.95) {
              this.input.sprint = true;
            } else if (!this.sprintLocked) {
              this.input.sprint = false;
            }
          } else if (touch.identifier === this.lookTouchId) {
            const dx = touch.clientX - this.lastLookX;
            const dy = touch.clientY - this.lastLookY;
            this.lastLookX = touch.clientX;
            this.lastLookY = touch.clientY;

            if (this.explore.onFoot) {
              this.explore.orbitBy(dx * 1.5, dy * 1.5);
            } else {
              this.chase.lookBy(dx * 1.5, dy * 1.5);
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
          this.joystickBase.classList.remove("active");
          this.setKnobOffset(0, 0);
          this.input.up = false;
          this.input.down = false;
          this.input.left = false;
          this.input.right = false;
          if (!this.sprintLocked) {
            this.input.sprint = false;
          }
        } else if (touch.identifier === this.lookTouchId) {
          this.lookTouchId = null;
        }
      }
    };

    window.addEventListener("touchend", onTouchEndOrCancel, { passive: true });
    window.addEventListener("touchcancel", onTouchEndOrCancel, { passive: true });
  }

  private setKnobOffset(x: number, y: number): void {
    this.joystickKnob.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  }

  setMoneyButtonVisible(visible: boolean): void {
    if (this.moneyBtn) {
      this.moneyBtn.style.display = visible ? "flex" : "none";
    }
  }
}
