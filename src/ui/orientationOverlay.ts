export class OrientationOverlay {
  private el: HTMLDivElement;

  constructor() {
    this.el = document.createElement("div");
    this.el.id = "techyon-orientation-overlay";
    this.el.innerHTML = `
      <div class="th-rot-backdrop"></div>
      <div class="th-rot-card">
        <svg class="th-rot-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="14" y="6" width="20" height="36" rx="4" />
          <path d="M24 38h.01" />
          <path d="M6 18a16 16 0 0 1 6-7" />
          <path d="M6 11v7h7" />
        </svg>
        <div class="th-rot-title">ROTATE DEVICE</div>
        <div class="th-rot-desc">Techyon is best played in landscape mode for full visibility and dual touch controls.</div>
        <button class="th-rot-dismiss-btn">Continue in portrait anyway</button>
      </div>
    `;

    const style = document.createElement("style");
    style.id = "techyon-orientation-styles";
    style.textContent = `
      #techyon-orientation-overlay {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: none;
        place-items: center;
        background: #060a10;
        color: #dbeaf6;
        font-family: "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif;
        user-select: none;
        -webkit-user-select: none;
      }
      #techyon-orientation-overlay.visible {
        display: grid;
      }
      .th-rot-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 32px 24px;
        max-width: 320px;
      }
      .th-rot-icon {
        width: 64px;
        height: 64px;
        color: #68aadb;
        margin-bottom: 24px;
        animation: th-rotate-phone 2.4s ease-in-out infinite;
      }
      @keyframes th-rotate-phone {
        0%, 20% { transform: rotate(0deg); }
        50%, 70% { transform: rotate(90deg); }
        90%, 100% { transform: rotate(0deg); }
      }
      .th-rot-title {
        font-size: 20px;
        letter-spacing: 0.22em;
        margin-bottom: 12px;
        color: #d4e8f7;
        text-shadow: 0 0 12px rgba(104, 170, 219, 0.4);
      }
      .th-rot-desc {
        font-size: 13.5px;
        line-height: 1.5;
        letter-spacing: 0.05em;
        color: #7a9cb5;
        margin-bottom: 20px;
      }
      .th-rot-dismiss-btn {
        background: transparent;
        border: 1px solid rgba(104, 170, 219, 0.35);
        color: #8bbdd8;
        font-family: inherit;
        font-size: 12px;
        letter-spacing: 0.1em;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .th-rot-dismiss-btn:hover, .th-rot-dismiss-btn:active {
        background: rgba(104, 170, 219, 0.15);
        border-color: #8bbdd8;
        color: #e2f2fc;
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(this.el);

    const dismissBtn = this.el.querySelector(".th-rot-dismiss-btn");
    dismissBtn?.addEventListener("click", () => {
      this.dismissed = true;
      this.check();
    });

    this.check();
    window.addEventListener("resize", () => this.check());
    window.addEventListener("orientationchange", () => this.check());
  }

  private dismissed = false;

  private check(): void {
    if (this.dismissed) {
      this.el.classList.remove("visible");
      return;
    }
    const isPortrait = window.innerHeight > window.innerWidth;
    const isSmallScreen = Math.min(window.innerWidth, window.innerHeight) <= 600;
    if (isPortrait && isSmallScreen) {
      this.el.classList.add("visible");
    } else {
      this.el.classList.remove("visible");
    }
  }
}
