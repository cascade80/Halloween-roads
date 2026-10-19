import type { BillboardPricing, BillboardSystem } from "../world/billboards";

export class HoardingModal {
  private promptEl: HTMLDivElement;
  private modalEl: HTMLDivElement;
  private currentBillboardIndex: number | null = null;
  private _isOpen = false;

  get isOpen(): boolean {
    return this._isOpen;
  }

  constructor(
    private billboards: BillboardSystem,
    private onStateChange?: (isOpen: boolean) => void,
  ) {
    this.injectStyles();

    // 1. Bottom-Center Proximity Prompt
    this.promptEl = document.createElement("div");
    this.promptEl.id = "hoarding-prompt";
    this.promptEl.className = "th-hoarding-prompt";
    this.promptEl.innerHTML = `
      <span class="prompt-key">E</span>
      <span class="prompt-label">Check Hoarding Value & Ad Rates</span>
      <span class="prompt-dist" id="hoarding-dist-text">--m</span>
    `;
    this.promptEl.addEventListener("click", () => this.toggle());
    document.body.appendChild(this.promptEl);

    // 2. Full Hoarding Valuation Card Modal
    this.modalEl = document.createElement("div");
    this.modalEl.id = "hoarding-modal";
    this.modalEl.className = "th-hoarding-modal";
    this.modalEl.setAttribute("role", "dialog");
    this.modalEl.setAttribute("aria-modal", "true");
    this.modalEl.addEventListener("click", (e) => {
      if (e.target === this.modalEl) this.close();
    });
    document.body.appendChild(this.modalEl);
  }

  /**
   * Called every frame from main loop to update proximity prompt.
   */
  update(playerX: number, playerZ: number): { near: boolean; dist: number; index: number } | null {
    const nearest = this.billboards.getNearestBillboard(playerX, playerZ, 22);

    if (nearest) {
      this.currentBillboardIndex = nearest.index;
      const distM = Math.round(nearest.dist);
      const distEl = document.getElementById("hoarding-dist-text");
      if (distEl) distEl.textContent = `${distM}m`;
      if (!this._isOpen) {
        this.promptEl.classList.add("visible");
      }
      return { near: true, dist: nearest.dist, index: nearest.index };
    } else {
      this.currentBillboardIndex = null;
      this.promptEl.classList.remove("visible");
      if (this._isOpen) this.close();
      return null;
    }
  }

  /**
   * Toggle modal open/close when user presses E or taps button.
   */
  toggle(playerX?: number, playerZ?: number): boolean {
    if (this._isOpen) {
      this.close();
      return true;
    } else {
      let idx = this.currentBillboardIndex;
      if (idx === null && typeof playerX === "number" && typeof playerZ === "number") {
        const nearest = this.billboards.getNearestBillboard(playerX, playerZ, 22);
        if (nearest) idx = nearest.index;
      }
      if (idx !== null) {
        this.open(idx);
        return true;
      }
      return false;
    }
  }

  open(index: number): void {
    this._isOpen = true;
    this.promptEl.classList.remove("visible");

    // Dynamic pricing data from slot
    const nearest = this.billboards.getNearestBillboard(0, -((index + 1) * 80), 9999);
    const pricing: BillboardPricing = nearest?.pricing ?? {
      locationName: `Highway 14 — Hoarding #${index}`,
      dailyRate: "₹3,500 ($45)",
      weeklyRate: "₹22,000 ($270)",
      monthlyRate: "₹75,000 ($920)",
      dailyImpressions: "18,500 views / day",
      tier: "Prime Highway Frontage",
      advertiser: "BOTNET — The Greatest Clan To Ever Exist",
    };

    this.modalEl.innerHTML = `
      <div class="hoarding-card">
        <div class="card-header">
          <div class="badge-tag">HIGHWAY 14 // COMMERCIAL AD SPACE</div>
          <button class="card-close" id="hoarding-close-btn">&times;</button>
        </div>
        
        <div class="card-title-group">
          <h2 class="card-title">HOARDING #${index}</h2>
          <div class="card-subtitle">${pricing.locationName}</div>
          <div class="card-tier">${pricing.tier}</div>
        </div>

        <div class="rate-grid">
          <div class="rate-box">
            <div class="rate-label">DAILY AD RATE</div>
            <div class="rate-amount">${pricing.dailyRate}</div>
            <div class="rate-sub">Single 24h Placement</div>
          </div>
          <div class="rate-box highlighted">
            <div class="best-value-pill">MOST POPULAR</div>
            <div class="rate-label">WEEKLY RENTAL</div>
            <div class="rate-amount gold">${pricing.weeklyRate}</div>
            <div class="rate-sub">7 Days Continuous Run</div>
          </div>
          <div class="rate-box">
            <div class="rate-label">MONTHLY SPONSORSHIP</div>
            <div class="rate-amount">${pricing.monthlyRate}</div>
            <div class="rate-sub">30 Days Primary Feature</div>
          </div>
          <div class="rate-box">
            <div class="rate-label">MEASURED TRAFFIC</div>
            <div class="rate-amount cyan">${pricing.dailyImpressions}</div>
            <div class="rate-sub">Dual-Direction Commuters</div>
          </div>
        </div>

        <div class="specs-panel">
          <div class="spec-row">
            <span class="spec-key">Billboard Dimensions:</span>
            <span class="spec-val">8.0m wide &times; 4.5m tall (16:9 Cinema Wide)</span>
          </div>
          <div class="spec-row">
            <span class="spec-key">Night Lighting:</span>
            <span class="spec-val">Triple Solar Floodlights (High-Lux 24/7 Illumination)</span>
          </div>
          <div class="spec-row">
            <span class="spec-key">Current Campaign:</span>
            <span class="spec-val active-ad">${pricing.advertiser}</span>
          </div>
          <div class="spec-row">
            <span class="spec-key">Ad Bookings & Media Kit:</span>
            <span class="spec-val contact">ads@techyon.juet.ac.in</span>
          </div>
        </div>

        <div class="card-footer">
          <button class="dismiss-btn" id="hoarding-dismiss-btn">Dismiss &nbsp;[E] / [Esc]</button>
        </div>
      </div>
    `;

    this.modalEl.classList.add("visible");
    this.onStateChange?.(true);

    document.getElementById("hoarding-close-btn")?.addEventListener("click", () => this.close());
    document.getElementById("hoarding-dismiss-btn")?.addEventListener("click", () => this.close());
  }

  close(): void {
    if (!this._isOpen) return;
    this._isOpen = false;
    this.modalEl.classList.remove("visible");
    this.onStateChange?.(false);
  }

  private injectStyles(): void {
    const style = document.createElement("style");
    style.textContent = `
      /* Proximity Prompt */
      .th-hoarding-prompt {
        position: fixed;
        bottom: 75px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        display: flex;
        align-items: center;
        gap: 12px;
        background: rgba(10, 16, 24, 0.88);
        border: 1px solid rgba(80, 190, 255, 0.45);
        border-radius: 999px;
        padding: 9px 18px 9px 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 0 0 15px rgba(60, 170, 240, 0.25);
        color: #f0f6fc;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 13px;
        letter-spacing: 0.05em;
        pointer-events: auto;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease;
        z-index: 1000;
        user-select: none;
      }
      .th-hoarding-prompt.visible {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
      }
      .th-hoarding-prompt:hover {
        background: rgba(14, 24, 36, 0.95);
        border-color: rgba(90, 210, 255, 0.8);
      }
      .prompt-key {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 26px;
        height: 26px;
        background: #1e3a5f;
        border: 1px solid #4895ef;
        border-radius: 6px;
        color: #ffffff;
        font-weight: 700;
        font-size: 13px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
      }
      .prompt-label {
        font-weight: 500;
        color: #e2ecf5;
      }
      .prompt-dist {
        background: rgba(255, 255, 255, 0.1);
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 11px;
        color: #70d6ff;
        font-weight: 600;
      }

      /* Modal Overlay */
      .th-hoarding-modal {
        position: fixed;
        inset: 0;
        background: rgba(5, 10, 18, 0.85);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 2000;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      .th-hoarding-modal.visible {
        opacity: 1;
        visibility: visible;
      }

      /* Valuation Card */
      .hoarding-card {
        background: linear-gradient(145deg, #0d1724 0%, #070d14 100%);
        border: 1px solid rgba(80, 170, 230, 0.35);
        border-radius: 16px;
        max-width: 680px;
        width: 100%;
        padding: 28px;
        box-shadow: 0 24px 64px rgba(0, 0, 0, 0.8), 0 0 40px rgba(50, 140, 220, 0.2);
        color: #f0f6fc;
        transform: scale(0.95);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .th-hoarding-modal.visible .hoarding-card {
        transform: scale(1);
      }
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }
      .badge-tag {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.15em;
        color: #48cae4;
        background: rgba(72, 202, 228, 0.12);
        padding: 4px 10px;
        border-radius: 6px;
        border: 1px solid rgba(72, 202, 228, 0.3);
      }
      .card-close {
        background: transparent;
        border: none;
        color: #8b9bb0;
        font-size: 26px;
        line-height: 1;
        cursor: pointer;
        padding: 0 6px;
        transition: color 0.2s;
      }
      .card-close:hover {
        color: #ff6b6b;
      }
      .card-title {
        font-size: 26px;
        font-weight: 800;
        margin: 0;
        letter-spacing: 0.05em;
        color: #ffffff;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      }
      .card-subtitle {
        font-size: 14px;
        color: #90a4be;
        margin-top: 4px;
      }
      .card-tier {
        font-size: 12px;
        font-weight: 600;
        color: #ffb703;
        margin-top: 2px;
        letter-spacing: 0.08em;
      }

      /* Rates Grid */
      .rate-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
        margin: 20px 0;
      }
      @media (max-width: 520px) {
        .rate-grid { grid-template-columns: 1fr; }
      }
      .rate-box {
        background: rgba(18, 30, 46, 0.6);
        border: 1px solid rgba(70, 110, 160, 0.25);
        border-radius: 10px;
        padding: 14px 16px;
        position: relative;
      }
      .rate-box.highlighted {
        background: rgba(24, 42, 68, 0.8);
        border-color: rgba(255, 183, 3, 0.5);
        box-shadow: 0 4px 20px rgba(255, 183, 3, 0.12);
      }
      .best-value-pill {
        position: absolute;
        top: -8px;
        right: 12px;
        background: #ffb703;
        color: #0b1420;
        font-size: 9px;
        font-weight: 800;
        padding: 2px 6px;
        border-radius: 4px;
        letter-spacing: 0.06em;
      }
      .rate-label {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.08em;
        color: #8da4be;
      }
      .rate-amount {
        font-size: 22px;
        font-weight: 800;
        color: #ffffff;
        margin: 4px 0 2px;
      }
      .rate-amount.gold {
        color: #ffd166;
      }
      .rate-amount.cyan {
        color: #48cae4;
      }
      .rate-sub {
        font-size: 11px;
        color: #6c7f96;
      }

      /* Specs */
      .specs-panel {
        background: rgba(14, 24, 38, 0.7);
        border: 1px solid rgba(60, 100, 140, 0.2);
        border-radius: 8px;
        padding: 14px;
        font-size: 13px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .spec-row {
        display: flex;
        justify-content: space-between;
        gap: 12px;
      }
      .spec-key {
        color: #7e94ac;
      }
      .spec-val {
        color: #e2ecf5;
        font-weight: 500;
        text-align: right;
      }
      .spec-val.active-ad {
        color: #ff5e7e;
        font-weight: 700;
      }
      .spec-val.contact {
        color: #70d6ff;
        text-decoration: underline;
      }

      /* Footer */
      .card-footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
      }
      .dismiss-btn {
        background: #1b3858;
        border: 1px solid #4895ef;
        color: #ffffff;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.06em;
        padding: 10px 22px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s, transform 0.1s;
      }
      .dismiss-btn:hover {
        background: #2b5488;
        transform: translateY(-1px);
      }
    `;
    document.head.appendChild(style);
  }
}

