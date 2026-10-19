export class Input {
  up = false;
  down = false;
  left = false;
  right = false;
  /** Shift held (sprint on the bike; the on-foot explorer reads Shift itself for running). */
  sprint = false;

  /** Analog joystick inputs for smooth mobile/controller steering and throttle (-1..1 or 0..1). */
  analogSteer = 0; // -1 (full right) to +1 (full left)
  analogThrottle = 0; // 0 to 1
  analogBrake = 0; // 0 to 1
  analogFwd = 0; // -1 (backward) to +1 (forward)
  analogStrafe = 0; // -1 (left) to +1 (right)

  resetAnalog(): void {
    this.analogSteer = 0;
    this.analogThrottle = 0;
    this.analogBrake = 0;
    this.analogFwd = 0;
    this.analogStrafe = 0;
  }

  constructor(onFirst: () => void, onToggleView: () => void = () => {}) {
    const set = (code: string, v: boolean) => {
      switch (code) {
        case "KeyW":
        case "ArrowUp":
          this.up = v;
          return true;
        case "KeyS":
        case "ArrowDown":
          this.down = v;
          return true;
        case "KeyA":
        case "ArrowLeft":
          this.left = v;
          return true;
        case "KeyD":
        case "ArrowRight":
          this.right = v;
          return true;
        case "ShiftLeft":
        case "ShiftRight":
          this.sprint = v;
          return false;
      }
      return false;
    };
    addEventListener("keydown", (e) => {
      onFirst();
      if (e.code === "KeyV" && !e.repeat) onToggleView();
      if (set(e.code, true)) e.preventDefault();
    });
    addEventListener("keyup", (e) => {
      set(e.code, false);
    });
    addEventListener("pointerdown", onFirst);
    addEventListener("blur", () => {
      this.up = this.down = this.left = this.right = this.sprint = false;
      this.resetAnalog();
    });
  }
}
