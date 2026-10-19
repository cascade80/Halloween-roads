import * as THREE from "three";
import { G } from "../render/materials";
import { TOD_GRADE } from "../render/todUniforms";
import type { Post } from "../render/post";
import type { SunShadow } from "../render/lightpasses";

/**
 * Time of day: afternoon → golden hour → sunset → dusk (blue hour). Each preset is a flat table of
 * light/sky/grade values; the current state is interpolated between presets and written into the
 * existing shared uniforms (`G`, the grade pass, the bloom pass). The afternoon preset is read
 * back from those uniforms at start-up, so the default look is exactly the untouched scene.
 */
export const PRESETS = ["midnight", "witching", "bloodmoon", "dusk"] as const;
export type Preset = (typeof PRESETS)[number];

type RGB = [number, number, number];
interface Look {
  az: number; // sun/moon azimuth, degrees: atan2(x, z) (0 = behind the rider, ±180 = ahead, -90 = left)
  el: number; // true celestial elevation (sky, disk, clouds, shadows)
  shadeMin: number; // shading light never goes lower than this (keeps flat ground readable)
  sun: RGB; shadow: RGB; rim: RGB;
  zenith: RGB; mid: RGB; horizon: RGB; fog: RGB; fogD: number;
  glow: RGB; glowA: number; glowB: number;
  haze: RGB; hazeA: number;
  hgl: RGB; hglA: number; hglF: number;
  cTop: RGB; cMid: RGB; cLow: RGB; cRim: RGB; cRimK: number; cBack: number; cUnder: RGB; cUnderA: number;
  wisp: RGB; disk: RGB; stars: number; night: number;
  world: RGB; far: RGB; farHaze: number; glint: number;
  grade: RGB; sat: number;
  bloomS: number; bloomR: number; bloomT: number;
  evening: number;
  birds: number; // share of bird flocks aloft
}

/** sRGB hex → linear (what `new THREE.Color(hex)` stores), optionally scaled. */
const hx = (hex: string, k = 1): RGB => {
  const c = new THREE.Color(hex);
  return [c.r * k, c.g * k, c.b * k];
};
const cv = (c: THREE.Color): RGB => [c.r, c.g, c.b];

const DEG = Math.PI / 180;

// Art direction (Cinematic Indie Horror for JUET Halloween TechFest):
// Controlled cool moonlit illumination, long raking silhouettes, deep desaturated teal/charcoal shadows,
// eerie fog layer that reveals the road and shrounds distance, pale silver moon, glowing amber dying lamps.
const LOOKS: Record<Preset, Look> = {
  midnight: {
    az: -130, el: 26, shadeMin: 22,
    sun: hx("#b6dbf8", 0.96), shadow: hx("#1c2842", 1.45), rim: hx("#8eccf4", 2.2),
    zenith: hx("#050816"), mid: hx("#0f1b2e"), horizon: hx("#1d2b40"), fog: hx("#152032"), fogD: 0.0014,
    glow: [0.45, 0.60, 0.75], glowA: 0.4, glowB: 0.5,
    haze: [0.16, 0.24, 0.32], hazeA: 0.45,
    hgl: hx("#22384a"), hglA: 0.4, hglF: 8,
    cTop: [0.42, 0.50, 0.62], cMid: [0.22, 0.28, 0.36], cLow: [0.12, 0.16, 0.22], cRim: [0.55, 0.68, 0.85], cRimK: 0.65, cBack: 0.45,
    cUnder: [0.08, 0.10, 0.14], cUnderA: 0.25,
    wisp: [0.35, 0.45, 0.58], disk: [4.2, 4.6, 5.2], stars: 1.0, night: 1.0,
    world: [0.75, 0.82, 0.90], far: [0.42, 0.52, 0.62], farHaze: 0.35, glint: 0.35,
    grade: [0.98, 1.02, 1.08], sat: 1.08,
    bloomS: 0.54, bloomR: 0.68, bloomT: 0.78,
    evening: 1.0,
    birds: 0,
  },
  witching: {
    az: -155, el: 18, shadeMin: 18,
    sun: hx("#82a2be", 0.55), shadow: hx("#090d14"), rim: hx("#5a8ca8", 1.45),
    zenith: hx("#020408"), mid: hx("#080f16"), horizon: hx("#101c24"), fog: hx("#0e1820"), fogD: 0.0022,
    glow: [0.28, 0.42, 0.56], glowA: 0.3, glowB: 0.4,
    haze: [0.10, 0.14, 0.20], hazeA: 0.48,
    hgl: hx("#14222c"), hglA: 0.4, hglF: 10,
    cTop: [0.16, 0.22, 0.28], cMid: [0.07, 0.10, 0.13], cLow: [0.03, 0.05, 0.07], cRim: [0.36, 0.48, 0.62], cRimK: 0.5, cBack: 0.35,
    cUnder: [0.04, 0.05, 0.08], cUnderA: 0.2,
    wisp: [0.18, 0.24, 0.32], disk: [3.2, 3.6, 4.2], stars: 0.85, night: 1.0,
    world: [0.46, 0.54, 0.64], far: [0.26, 0.34, 0.42], farHaze: 0.45, glint: 0.2,
    grade: [0.82, 0.94, 1.04], sat: 0.72,
    bloomS: 0.52, bloomR: 0.65, bloomT: 0.82,
    evening: 1.0,
    birds: 0,
  },
  bloodmoon: {
    az: -140, el: 22, shadeMin: 18,
    sun: hx("#c25845", 0.65), shadow: hx("#140b12"), rim: hx("#c84c36", 1.6),
    zenith: hx("#080308"), mid: hx("#1a0a14"), horizon: hx("#2c1018"), fog: hx("#200d14"), fogD: 0.0018,
    glow: [0.85, 0.32, 0.22], glowA: 0.45, glowB: 0.55,
    haze: [0.32, 0.14, 0.16], hazeA: 0.45,
    hgl: hx("#3a1218"), hglA: 0.5, hglF: 8,
    cTop: [0.32, 0.18, 0.20], cMid: [0.15, 0.08, 0.11], cLow: [0.07, 0.04, 0.06], cRim: [0.65, 0.28, 0.24], cRimK: 0.6, cBack: 0.45,
    cUnder: [0.12, 0.05, 0.07], cUnderA: 0.35,
    wisp: [0.45, 0.22, 0.24], disk: [4.6, 1.8, 1.2], stars: 0.6, night: 1.0,
    world: [0.58, 0.48, 0.52], far: [0.38, 0.28, 0.34], farHaze: 0.35, glint: 0.4,
    grade: [1.08, 0.88, 0.92], sat: 0.84,
    bloomS: 0.58, bloomR: 0.65, bloomT: 0.8,
    evening: 1.0,
    birds: 0,
  },
  dusk: {
    az: -154, el: -2, shadeMin: 18,
    sun: hx("#455282", 0.6), shadow: hx("#0d1220"), rim: hx("#6d84b2", 0.9),
    zenith: hx("#0c1228"), mid: hx("#182442"), horizon: hx("#2a3854"), fog: hx("#1c2538"), fogD: 0.0019,
    glow: [0.4, 0.45, 0.6], glowA: 0.2, glowB: 0.15,
    haze: [0.22, 0.26, 0.38], hazeA: 0.35,
    hgl: hx("#2a354c"), hglA: 0.4, hglF: 12,
    cTop: [0.22, 0.22, 0.32], cMid: [0.14, 0.14, 0.22], cLow: [0.08, 0.08, 0.14], cRim: [0.45, 0.45, 0.6], cRimK: 0.3, cBack: 0.3,
    cUnder: [0.12, 0.12, 0.18], cUnderA: 0.3,
    wisp: [0.35, 0.38, 0.48], disk: [0, 0, 0], stars: 1, night: 1,
    world: [0.42, 0.46, 0.66], far: [0.3, 0.35, 0.52], farHaze: 0.4, glint: 0,
    grade: [0.92, 0.95, 1.06], sat: 0.8,
    bloomS: 0.55, bloomR: 0.6, bloomT: 0.82,
    evening: 1.0,
    birds: 0,
  },
};


/** a→b by k, written into `out` (reused every frame: no per-frame allocation). */
function mix(a: Look, b: Look, k: number, out: Look): Look {
  const o = out as unknown as Record<string, number | RGB>;
  for (const key of Object.keys(a) as (keyof Look)[]) {
    const x = a[key], y = b[key];
    if (Array.isArray(x)) {
      const r = o[key] as RGB, yy = y as RGB;
      for (let i = 0; i < 3; i++) r[i] = x[i] + (yy[i] - x[i]) * k;
    } else o[key] = (x as number) + ((y as number) - (x as number)) * k;
  }
  return out;
}

const cloneLook = (l: Look): Look => {
  const o = { ...l } as unknown as Record<string, number | RGB>;
  for (const k in o) if (Array.isArray(o[k])) o[k] = [...(o[k] as RGB)] as RGB;
  return o as unknown as Look;
};

const dirFrom = (v: THREE.Vector3, azDeg: number, elDeg: number) => {
  const a = azDeg * DEG, e = elDeg * DEG;
  return v.set(Math.sin(a) * Math.cos(e), Math.sin(e), Math.cos(a) * Math.cos(e));
};

/** Seconds for a T-key transition, and for the full timelapse (afternoon → dusk). */
const TRANSITION = 3.6;
const TIMELAPSE = 40;

export class TimeOfDay {
  private readonly looks: Look[];
  private from: Look;
  private to: Look;
  private k = 1;
  private idx = 0;
  private cur: Look;
  private lapse: boolean;
  private lapseT = 0;
  /** Scratch look the transitions/timelapse blend into. */
  private readonly blend: Look;
  private lapseDone = false;
  private dirty = true;
  private readonly shadowDir = new THREE.Vector3();

  constructor(private post: Post, private shadow: SunShadow, params: URLSearchParams) {
    this.looks = [LOOKS.midnight, LOOKS.witching, LOOKS.bloodmoon, LOOKS.dusk];
    const start = PRESETS.indexOf((params.get("time") ?? "midnight") as Preset);
    this.idx = start < 0 ? 0 : start;
    this.cur = this.from = this.to = this.looks[this.idx];
    this.blend = cloneLook(this.looks[0]);
    this.lapse = params.has("timelapse") && params.get("timelapse") !== "0";
    if (this.lapse) this.idx = 0;
    this.apply(this.lapse ? this.looks[0] : this.cur);
    addEventListener("keydown", (e) => {
      if (e.code === "KeyT" && !e.repeat) this.cycle();
    });
  }

  get preset(): Preset {
    return PRESETS[this.idx];
  }
  get evening(): number {
    return this.cur.evening;
  }
  get birds(): number {
    return this.cur.birds;
  }
  get night(): number {
    return this.cur.night;
  }

  /** Next preset (wraps dusk → afternoon), with a smooth transition from wherever we are now. */
  cycle(): void {
    this.set(PRESETS[(this.idx + 1) % PRESETS.length]);
  }

  set(p: Preset, instant = false): void {
    this.lapse = false;
    this.idx = PRESETS.indexOf(p);
    // `cur` may be the scratch blend: freeze a copy as the start of the new transition.
    this.from = cloneLook(this.cur);
    this.to = this.looks[this.idx];
    this.k = instant ? 1 : 0;
    if (instant) this.cur = this.to;
    this.dirty = true;
  }

  /** Continuous 0…3 position along afternoon → golden → sunset → dusk. */
  private along(s: number): Look {
    const i = Math.min(2, Math.floor(s));
    const f = s - i;
    return mix(this.looks[i], this.looks[i + 1], f * f * (3 - 2 * f) * 0.35 + f * 0.65, this.blend);
  }

  update(dt: number): void {
    if (this.lapse && !this.lapseDone) {
      // Hold the afternoon a moment, then the sun sets steadily; linger on the sunset glow.
      this.lapseT += dt;
      const x = Math.min(1, Math.max(0, (this.lapseT - 2) / (TIMELAPSE - 4)));
      const s = x < 0.7 ? (x / 0.7) * 2.1 : 2.1 + ((x - 0.7) / 0.3) * 0.9;
      this.cur = this.along(Math.min(3, s));
      this.idx = Math.min(3, Math.round(s));
      if (x >= 1) {
        // Settled on dusk: nothing more to blend (the scratch look stops changing).
        this.lapseDone = true;
        this.cur = this.looks[3];
      }
      this.dirty = true;
    } else if (this.k < 1) {
      this.k = Math.min(1, this.k + dt / TRANSITION);
      const e = this.k * this.k * (3 - 2 * this.k);
      this.cur = this.k >= 1 ? this.to : mix(this.from, this.to, e, this.blend);
      this.dirty = true;
    }
    if (this.dirty) {
      this.apply(this.cur);
      this.dirty = false;
    }
  }

  private apply(l: Look): void {
    dirFrom(G.uSkySun.value, l.az, l.el);
    dirFrom(G.uSunDir.value, l.az, Math.max(l.el, l.shadeMin));
    // Shadows follow the true sun but never from below the horizon.
    this.shadow.dir = dirFrom(this.shadowDir, l.az, Math.max(l.el, 3));
    G.uSunColor.value.setRGB(...l.sun);
    G.uShadowTint.value.setRGB(...l.shadow);
    G.uRimColor.value.setRGB(...l.rim);
    G.uSkyZenith.value.setRGB(...l.zenith);
    G.uSkyMid.value.setRGB(...l.mid);
    G.uSkyHorizon.value.setRGB(...l.horizon);
    G.uFogColor.value.setRGB(...l.fog);
    G.uFogDensity.value = l.fogD;
    G.uSunGlow.value.setRGB(...l.glow);
    G.uSunGlowAmt.value.set(l.glowA, l.glowB);
    G.uHaze.value.setRGB(...l.haze);
    G.uHazeAmt.value = l.hazeA;
    G.uHorizGlow.value.setRGB(...l.hgl);
    G.uHorizGlowK.value.set(l.hglA, l.hglF);
    G.uCloudTop.value.setRGB(...l.cTop);
    G.uCloudMid.value.setRGB(...l.cMid);
    G.uCloudLow.value.setRGB(...l.cLow);
    G.uCloudRim.value.setRGB(...l.cRim);
    G.uCloudK.value.set(l.cRimK, l.cBack, l.cUnderA);
    G.uCloudUnder.value.setRGB(...l.cUnder);
    G.uWisp.value.setRGB(...l.wisp);
    G.uSunDisk.value.setRGB(...l.disk);
    G.uStars.value = l.stars;
    G.uNight.value = l.night;
    G.uWorldTint.value.setRGB(...l.world);
    G.uFarTint.value.setRGB(...l.far);
    G.uFarHaze.value = l.farHaze;
    G.uGlint.value = l.glint;
    TOD_GRADE.uGradeMul.value.setRGB(...l.grade);
    TOD_GRADE.uSat.value = l.sat;
    this.post.bloom.strength = l.bloomS;
    this.post.bloom.radius = l.bloomR;
    this.post.bloom.threshold = l.bloomT;
  }
}
