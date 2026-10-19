import * as THREE from "three";
import { G } from "../render/materials";
import { L, groundH, roadX, roadYaw } from "./road";

export interface BillboardDef {
  index: number;
  canonZ: number;
  u: number;
  yawOffset: number;
  defaultTitle: string;
}

// 8 Equidistant billboards along the 640m loop (every 80m).
// Placed along the open left verge (u = -7.0) so they NEVER intersect or get stuck in any building (all houses/shops are on the right).
// Player rides on the left, giving direct, unobstructed sightlines.
export const BILLBOARD_SLOTS: BillboardDef[] = [
  { index: 0, canonZ: -80,  u: -7.0, yawOffset: 0.22, defaultTitle: "TECHYON MAIN POSTER" },
  { index: 1, canonZ: -160, u: -7.0, yawOffset: 0.22, defaultTitle: "HIGHWAY 14 WARNING" },
  { index: 2, canonZ: -240, u: -7.0, yawOffset: 0.22, defaultTitle: "JUET TECHFEST ARENA" },
  { index: 3, canonZ: -320, u: -7.0, yawOffset: 0.22, defaultTitle: "SECTOR RESTRICTION" },
  { index: 4, canonZ: -400, u: -7.0, yawOffset: 0.22, defaultTitle: "ESPORTS CHAMPIONSHIP" },
  { index: 5, canonZ: -480, u: -7.0, yawOffset: 0.22, defaultTitle: "EMERGENCY BROADCAST" },
  { index: 6, canonZ: -560, u: -7.0, yawOffset: 0.22, defaultTitle: "THE BLACK FOREST" },
  { index: 7, canonZ: -640, u: -7.0, yawOffset: 0.22, defaultTitle: "TECHYON SURVIVORS" },
];

export interface BillboardPricing {
  locationName: string;
  dailyRate: string;
  weeklyRate: string;
  monthlyRate: string;
  dailyImpressions: string;
  tier: string;
  advertiser: string;
}

export const BILLBOARD_PRICING: BillboardPricing[] = [
  {
    locationName: "Highway 14 — Techyon North Approach (Km 0.8)",
    dailyRate: "₹4,000 ($48)",
    weeklyRate: "₹25,000 ($300)",
    monthlyRate: "₹85,000 ($1,020)",
    dailyImpressions: "24,500 commuters / day",
    tier: "Tier 1 — Prime Highway Frontage",
    advertiser: "BOTNET — The Greatest Clan To Ever Exist",
  },
  {
    locationName: "Highway 14 — Junction Overlook (Km 1.6)",
    dailyRate: "₹3,500 ($42)",
    weeklyRate: "₹22,000 ($265)",
    monthlyRate: "₹75,000 ($900)",
    dailyImpressions: "19,800 commuters / day",
    tier: "Tier 1 — High Visibility Bend",
    advertiser: "BOTNET — The Greatest Clan To Ever Exist",
  },
  {
    locationName: "JUET Arena Crossroads (Km 2.4)",
    dailyRate: "₹5,000 ($60)",
    weeklyRate: "₹32,000 ($385)",
    monthlyRate: "₹110,000 ($1,320)",
    dailyImpressions: "31,200 commuters / day",
    tier: "Platinum Tier — Techfest Central Arena",
    advertiser: "BOTNET — The Greatest Clan To Ever Exist",
  },
  {
    locationName: "Highway 14 — Midway Curve (Km 3.2)",
    dailyRate: "₹3,000 ($36)",
    weeklyRate: "₹18,000 ($215)",
    monthlyRate: "₹62,000 ($745)",
    dailyImpressions: "16,400 commuters / day",
    tier: "Tier 2 — Settlement Arterial",
    advertiser: "BOTNET — The Greatest Clan To Ever Exist",
  },
  {
    locationName: "Cemetery Straight (Km 4.0)",
    dailyRate: "₹2,800 ($34)",
    weeklyRate: "₹17,000 ($205)",
    monthlyRate: "₹58,000 ($700)",
    dailyImpressions: "14,800 commuters / day",
    tier: "Tier 2 — Meadow Corridor",
    advertiser: "BOTNET — The Greatest Clan To Ever Exist",
  },
  {
    locationName: "Black Forest Gateway (Km 4.8)",
    dailyRate: "₹3,200 ($38)",
    weeklyRate: "₹20,000 ($240)",
    monthlyRate: "₹68,000 ($815)",
    dailyImpressions: "17,500 commuters / day",
    tier: "Tier 2 — Forest Threshold",
    advertiser: "BOTNET — The Greatest Clan To Ever Exist",
  },
  {
    locationName: "Deep Woods Sector 7 (Km 5.6)",
    dailyRate: "₹3,600 ($43)",
    weeklyRate: "₹23,000 ($275)",
    monthlyRate: "₹78,000 ($935)",
    dailyImpressions: "18,900 commuters / day",
    tier: "Tier 1 — South Highway Link",
    advertiser: "BOTNET — The Greatest Clan To Ever Exist",
  },
  {
    locationName: "Techyon South Perimeter Gate (Km 6.4)",
    dailyRate: "₹4,500 ($54)",
    weeklyRate: "₹28,000 ($335)",
    monthlyRate: "₹95,000 ($1,140)",
    dailyImpressions: "28,000 commuters / day",
    tier: "Tier 1 — Terminal Entrance",
    advertiser: "BOTNET — The Greatest Clan To Ever Exist",
  },
];

const BILLBOARD_VS = /* glsl */ `
out vec2 vUv;
out vec3 vWPos;
out vec3 vNormal;

void main() {
  vUv = uv;
  vec4 wPos = modelMatrix * vec4(position, 1.0);
  vWPos = wPos.xyz;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * viewMatrix * wPos;
}
`;

const BILLBOARD_FS = /* glsl */ `
precision highp float;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec3 uFogColor;
uniform float uFogDensity;
uniform float uEmissive;

in vec2 vUv;
in vec3 vWPos;
in vec3 vNormal;

layout(location = 0) out vec4 gColor;
layout(location = 1) out vec4 gNormal;

void main() {
  vec4 tex = texture(uTexture, vUv);
  
  // Overhead floodlight sheen from top lamps
  float floodlight = 1.0 + 0.35 * smoothstep(0.0, 1.0, vUv.y);
  
  // High-contrast readable illumination for night/fog
  vec3 col = tex.rgb * floodlight * uEmissive;
  
  // Atmospheric distance fog integration (gentler fog so billboards stay crisp further away)
  float dist = length(vWPos - cameraPosition);
  float f = 1.0 - exp(-max(dist - 35.0, 0.0) * (uFogDensity * 0.6));
  col = mix(col, uFogColor, f * 0.82);
  
  vec3 vn = normalize((viewMatrix * vec4(vNormal, 0.0)).xyz);
  if (!gl_FrontFacing) vn = -vn;
  gColor = vec4(col, 1.0);
  gNormal = vec4(vn.xy * 0.5 + 0.5, 0.2, 1.0);
}
`;

const FRAME_FS = /* glsl */ `
precision highp float;

uniform vec3 uColor;
uniform vec3 uFogColor;
uniform float uFogDensity;

in vec2 vUv;
in vec3 vWPos;
in vec3 vNormal;

layout(location = 0) out vec4 gColor;
layout(location = 1) out vec4 gNormal;

void main() {
  vec3 col = uColor;
  float dist = length(vWPos - cameraPosition);
  float f = 1.0 - exp(-max(dist - 30.0, 0.0) * uFogDensity);
  col = mix(col, uFogColor, f * 0.9);

  vec3 vn = normalize((viewMatrix * vec4(vNormal, 0.0)).xyz);
  if (!gl_FrontFacing) vn = -vn;
  gColor = vec4(col, 1.0);
  gNormal = vec4(vn.xy * 0.5 + 0.5, 0.1, 1.0);
}
`;

const LAMP_FS = /* glsl */ `
precision highp float;

uniform vec3 uColor;
uniform vec3 uFogColor;
uniform float uFogDensity;

in vec2 vUv;
in vec3 vWPos;
in vec3 vNormal;

layout(location = 0) out vec4 gColor;
layout(location = 1) out vec4 gNormal;

void main() {
  float dist = length(vWPos - cameraPosition);
  float f = 1.0 - exp(-max(dist - 30.0, 0.0) * (uFogDensity * 0.5));
  vec3 col = mix(uColor * 1.6, uFogColor, f * 0.75);
  gColor = vec4(col, 1.0);
  gNormal = vec4(0.5, 0.5, 1.0, 1.0);
}
`;

export class BillboardSystem {
  readonly root = new THREE.Group();
  private boardMeshes: THREE.Mesh[] = [];
  private materials: THREE.ShaderMaterial[] = [];
  private defaultCanvases: HTMLCanvasElement[] = [];
  private textures: THREE.Texture[] = [];
  private frameMaterial: THREE.ShaderMaterial;
  private lampMaterial: THREE.ShaderMaterial;
  private bannerTexture: THREE.Texture | null = null;
  private textureLoader = new THREE.TextureLoader();

  constructor() {
    this.root.name = "highway_billboards";

    // Frame material for steel posts and border
    this.frameMaterial = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      side: THREE.DoubleSide,
      uniforms: {
        uColor: { value: new THREE.Color(0x1a2228) },
        uFogColor: G.uFogColor,
        uFogDensity: G.uFogDensity,
      },
      vertexShader: BILLBOARD_VS,
      fragmentShader: FRAME_FS,
    });

    // Emissive glowing floodlight lens material
    this.lampMaterial = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      uniforms: {
        uColor: { value: new THREE.Color(0xfff2b0) },
        uFogColor: G.uFogColor,
        uFogDensity: G.uFogDensity,
      },
      vertexShader: BILLBOARD_VS,
      fragmentShader: LAMP_FS,
    });

    this.createBillboards();
    // Initialize positions immediately for starting player Z
    this.update(-54);
  }

  private createBillboards(): void {
    // Massive 16:9 Hoarding Face: 8.0m wide x 4.5m tall
    const boardWidth = 8.0;
    const boardHeight = 4.5;
    const boardY = 4.7; // Centre height: bottom at ~2.45m, top at ~6.95m

    const boardGeo = new THREE.PlaneGeometry(boardWidth, boardHeight);

    // Frame components
    const borderGeo = new THREE.BoxGeometry(boardWidth + 0.3, boardHeight + 0.3, 0.22);
    const postGeo = new THREE.CylinderGeometry(0.18, 0.18, 5.6, 12);
    const lampArmGeo = new THREE.BoxGeometry(0.08, 0.08, 1.1);
    const lampHeadGeo = new THREE.ConeGeometry(0.24, 0.42, 10);
    lampHeadGeo.rotateX(Math.PI / 2);
    const bulbGeo = new THREE.SphereGeometry(0.14, 8, 8);

    // Load custom uploaded banner for all hoardings
    const baseUrl = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? "./";
    const bannerUrl = `${baseUrl}wide_cinematic_cyberpunk_hacker_themed_banner_co.png`;
    this.bannerTexture = this.textureLoader.load(
      bannerUrl,
      (loaded) => {
        loaded.colorSpace = THREE.SRGBColorSpace;
        loaded.minFilter = THREE.LinearMipmapLinearFilter;
        loaded.magFilter = THREE.LinearFilter;
        loaded.generateMipmaps = true;
        loaded.anisotropy = 8;
        loaded.needsUpdate = true;
        this.materials.forEach((mat) => {
          mat.uniforms.uTexture.value = loaded;
        });
      },
      undefined,
      (err) => {
        console.warn("[BillboardSystem] Could not load banner image, falling back to procedural posters:", err);
      }
    );
    this.bannerTexture.colorSpace = THREE.SRGBColorSpace;
    this.bannerTexture.minFilter = THREE.LinearMipmapLinearFilter;
    this.bannerTexture.magFilter = THREE.LinearFilter;
    this.bannerTexture.generateMipmaps = true;
    this.bannerTexture.anisotropy = 8;

    BILLBOARD_SLOTS.forEach((slot, i) => {
      const group = new THREE.Group();
      group.name = `billboard_${i}`;

      // Procedural canvas poster as fallback
      const canvas = this.generateDefaultPoster(i);
      this.defaultCanvases.push(canvas);

      const texture = this.bannerTexture ?? new THREE.CanvasTexture(canvas);
      this.textures.push(texture);

      // 2. Board Shader Material (Double-sided with high emissive clarity)
      const mat = new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL3,
        side: THREE.DoubleSide,
        uniforms: {
          uTexture: { value: texture },
          uTime: G.uTime,
          uFogColor: G.uFogColor,
          uFogDensity: G.uFogDensity,
          uEmissive: { value: 1.25 }, // Vivid, bright, illuminated display
        },
        vertexShader: BILLBOARD_VS,
        fragmentShader: BILLBOARD_FS,
      });
      this.materials.push(mat);

      // Display Quad (faces +Z, toward oncoming traffic)
      const boardMesh = new THREE.Mesh(boardGeo, mat);
      boardMesh.position.set(0, boardY, 0.12);
      group.add(boardMesh);
      this.boardMeshes.push(boardMesh);

      // Border Bezel
      const borderMesh = new THREE.Mesh(borderGeo, this.frameMaterial);
      borderMesh.position.set(0, boardY, 0);
      group.add(borderMesh);

      // Steel Support Pillars (Left & Right) — placed BEHIND the billboard frame (z = -0.25)
      // so they never intersect, penetrate, or coincide with the front poster face (z = 0.12).
      const postLeft = new THREE.Mesh(postGeo, this.frameMaterial);
      postLeft.position.set(-2.8, 2.8, -0.25);
      group.add(postLeft);

      const postRight = new THREE.Mesh(postGeo, this.frameMaterial);
      postRight.position.set(2.8, 2.8, -0.25);
      group.add(postRight);

      // Top Floodlight Brackets (3 spots along top edge)
      [-2.8, 0, 2.8].forEach((lx) => {
        const arm = new THREE.Mesh(lampArmGeo, this.frameMaterial);
        arm.position.set(lx, boardY + boardHeight * 0.5 + 0.18, 0.55);
        group.add(arm);

        const head = new THREE.Mesh(lampHeadGeo, this.frameMaterial);
        head.position.set(lx, boardY + boardHeight * 0.5 + 0.18, 1.05);
        head.rotation.x = 0.55;
        group.add(head);

        const bulb = new THREE.Mesh(bulbGeo, this.lampMaterial);
        bulb.position.set(lx, boardY + boardHeight * 0.5 + 0.12, 1.15);
        group.add(bulb);
      });

      this.root.add(group);
    });
  }

  /**
   * Updates billboard positions relative to player Z for continuous 640m wrap streaming.
   * Uses chunk recycling window [pz - L + 35, pz + 35] so all 8 hoardings stay continuously ahead.
   */
  update(pz: number): void {
    const top = pz + 35;
    BILLBOARD_SLOTS.forEach((slot, i) => {
      const group = this.root.children[i] as THREE.Group | undefined;
      if (!group) return;

      // Wrap coordinate along road loop
      const n = Math.ceil((slot.canonZ - top) / L);
      const wrappedZ = slot.canonZ - n * L;
      const targetX = roadX(wrappedZ) + slot.u;
      const targetYaw = roadYaw(wrappedZ) + slot.yawOffset;
      const groundY = groundH(slot.u, wrappedZ);

      group.position.set(targetX, groundY, wrappedZ);
      group.rotation.y = targetYaw;
    });
  }

  /**
   * Finds the nearest billboard within maxDist (meters), returning its slot, distance, and ad pricing.
   */
  getNearestBillboard(px: number, pz: number, maxDist = 22): {
    index: number;
    dist: number;
    slot: BillboardDef;
    pricing: BillboardPricing;
    group: THREE.Group;
  } | null {
    let nearest: { index: number; dist: number; slot: BillboardDef; pricing: BillboardPricing; group: THREE.Group } | null = null;
    let minDist = maxDist;

    this.root.children.forEach((group, i) => {
      const slot = BILLBOARD_SLOTS[i];
      const dx = px - group.position.x;
      const dz = pz - group.position.z;
      const dist = Math.hypot(dx, dz);
      if (dist < minDist) {
        minDist = dist;
        nearest = {
          index: i,
          dist,
          slot,
          pricing: BILLBOARD_PRICING[i] ?? BILLBOARD_PRICING[0],
          group: group as THREE.Group,
        };
      }
    });

    return nearest;
  }

  /**
   * Set custom image on a specific billboard from URL or data URI.
   */
  async setImage(index: number, url: string): Promise<boolean> {
    if (index < 0 || index >= this.materials.length) {
      console.warn(`[BillboardSystem] Invalid billboard index: ${index}`);
      return false;
    }

    return new Promise((resolve) => {
      this.textureLoader.load(
        url,
        (loadedTex) => {
          loadedTex.colorSpace = THREE.SRGBColorSpace;
          loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
          loadedTex.magFilter = THREE.LinearFilter;
          loadedTex.generateMipmaps = true;
          loadedTex.anisotropy = 4;

          this.materials[index].uniforms.uTexture.value = loadedTex;
          this.textures[index] = loadedTex;
          console.log(`[BillboardSystem] Successfully updated billboard #${index} with image: ${url}`);
          resolve(true);
        },
        undefined,
        (err) => {
          console.error(`[BillboardSystem] Failed to load image for billboard #${index}:`, err);
          // Fallback to error graphic on canvas
          this.drawFallbackImage(index, `Image Load Error\n${url}`);
          resolve(false);
        },
      );
    });
  }

  /**
   * Set multiple billboard images from an array of URLs.
   */
  async setImages(urls: string[]): Promise<boolean[]> {
    return Promise.all(urls.map((url, i) => (i < this.materials.length ? this.setImage(i, url) : Promise.resolve(false))));
  }

  /**
   * Reset a billboard (or all billboards) to default high-res artistic posters.
   */
  reset(index?: number): void {
    const resetOne = (idx: number) => {
      if (idx >= 0 && idx < this.materials.length) {
        const tex = this.bannerTexture ?? (this.defaultCanvases[idx] ? new THREE.CanvasTexture(this.defaultCanvases[idx]) : null);
        if (tex) {
          this.materials[idx].uniforms.uTexture.value = tex;
          this.textures[idx] = tex;
        }
      }
    };

    if (typeof index === "number") {
      resetOne(index);
    } else {
      for (let i = 0; i < this.materials.length; i++) resetOne(i);
    }
  }

  private drawFallbackImage(index: number, label: string): void {
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#0c1520";
    ctx.fillRect(0, 0, 1280, 720);
    ctx.strokeStyle = "#c8443b";
    ctx.lineWidth = 14;
    ctx.strokeRect(20, 20, 1240, 680);

    ctx.font = 'bold 44px "Arial", sans-serif';
    ctx.fillStyle = "#ff6a5c";
    ctx.textAlign = "center";
    ctx.fillText("TECHYON DISPLAY // OFFLINE", 640, 310);

    ctx.font = '24px "Arial", sans-serif';
    ctx.fillStyle = "#8ba5b8";
    ctx.fillText(label, 640, 420);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    this.materials[index].uniforms.uTexture.value = tex;
  }

  /**
   * Generates atmospheric, high-contrast, professional default billboard graphics.
   */
  private generateDefaultPoster(index: number): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext("2d")!;

    // Midnight Halloween gradient
    const grad = ctx.createLinearGradient(0, 0, 1280, 720);
    grad.addColorStop(0, "#080414");
    grad.addColorStop(0.5, "#140924");
    grad.addColorStop(1, "#06030e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1280, 720);

    // Weathered grid lines with subtle violet tint
    ctx.strokeStyle = "rgba(140, 72, 210, 0.14)";
    ctx.lineWidth = 1;
    for (let x = 0; x < 1280; x += 64) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 720); ctx.stroke();
    }
    for (let y = 0; y < 720; y += 64) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1280, y); ctx.stroke();
    }

    switch (index) {
      case 0:
        // Main Techyon Techfest Poster
        this.drawBorder(ctx, "#4896be");
        this.drawGlowCircle(ctx, 640, 360, 260, "rgba(72, 150, 210, 0.15)");
        ctx.textAlign = "center";

        ctx.font = '700 24px "Georgia", serif';
        ctx.fillStyle = "#7fb5d8";
        ctx.letterSpacing = "0.4em";
        ctx.fillText("JAYPEE UNIVERSITY OF ENGINEERING & TECHNOLOGY", 640, 150);

        ctx.font = '900 112px "Impact", "Arial Black", sans-serif';
        ctx.fillStyle = "#e2f2fc";
        ctx.shadowColor = "#82d2ff";
        ctx.shadowBlur = 32;
        ctx.fillText("TECHYON", 640, 280);
        ctx.shadowBlur = 0;

        ctx.font = 'italic 700 36px "Georgia", serif';
        ctx.fillStyle = "#ff5544";
        ctx.fillText("HALLOWEEN TECHFEST — 2026", 640, 360);

        ctx.font = '600 28px "Arial", sans-serif';
        ctx.fillStyle = "#b4d5eb";
        ctx.fillText("48-HR HACKATHON  •  ROBOTICS  •  ESPORTS  •  GAME DEV", 640, 460);

        ctx.font = '400 20px "Courier New", monospace';
        ctx.fillStyle = "#5c84a0";
        ctx.fillText("OCTOBER 31 – NOVEMBER 02  |  HIGHWAY 14 CAMPUS ARENA", 640, 560);
        break;

      case 1:
        // Roadside Curfew Warning Poster
        this.drawBorder(ctx, "#d49b28");
        this.drawHazardStripes(ctx, 0, 0, 1280, 50);
        this.drawHazardStripes(ctx, 0, 670, 1280, 50);
        ctx.textAlign = "center";

        ctx.font = '900 48px "Arial Black", sans-serif';
        ctx.fillStyle = "#f5b838";
        ctx.fillText("⚠  EMERGENCY NIGHT CURFEW  ⚠", 640, 160);

        ctx.font = '900 84px "Impact", sans-serif';
        ctx.fillStyle = "#ffffff";
        ctx.fillText("ROAD CLOSED TO CIVILIANS", 640, 275);

        ctx.font = '600 32px "Georgia", serif';
        ctx.fillStyle = "#f4d08a";
        ctx.fillText("SUNSET TO SUNRISE // HIGHWAY 14 CORRIDOR", 640, 365);

        ctx.font = '400 24px "Arial", sans-serif';
        ctx.fillStyle = "#d0dce5";
        ctx.fillText("Extreme fog and unexplained apparitions reported past Milestone 14.", 640, 460);
        ctx.fillText("If you spot the cyclist boy in the sky-blue shirt, DO NOT ENGAGE.", 640, 505);

        ctx.font = 'bold 22px "Courier New", monospace';
        ctx.fillStyle = "#e05544";
        ctx.fillText("BY ORDER OF DISTRICT HIGHWAY POLICE & FORESTRY DIVISION", 640, 595);
        break;

      case 2:
        // JUET Techfest Events
        this.drawBorder(ctx, "#58b29c");
        ctx.textAlign = "center";

        ctx.font = '800 32px "Arial", sans-serif';
        ctx.fillStyle = "#7ad4bf";
        ctx.fillText("TECHYON COMPETITIVE ARENA", 640, 140);

        ctx.font = '900 96px "Impact", sans-serif';
        ctx.fillStyle = "#f0faf6";
        ctx.fillText("CODE • BUILD • CONQUER", 640, 260);

        // Event boxes
        this.drawSubBox(ctx, 160, 320, 290, 180, "DEV HACK", "₹50,000", "AI & Web3 Sprint");
        this.drawSubBox(ctx, 495, 320, 290, 180, "ROBO WARS", "₹40,000", "Combat Heavyweight");
        this.drawSubBox(ctx, 830, 320, 290, 180, "LAN BATTLES", "₹60,000", "Valorant & BGMI");

        ctx.font = '500 22px "Georgia", serif';
        ctx.fillStyle = "#8ec4b5";
        ctx.fillText("REGISTRATION OPEN AT TECHYON.JUET.AC.IN", 640, 575);
        break;

      case 3:
        // Occult Containment Bulletin
        this.drawBorder(ctx, "#c44238");
        ctx.textAlign = "center";

        ctx.font = '900 44px "Courier New", monospace';
        ctx.fillStyle = "#ff6a5c";
        ctx.fillText("[CLASSIFIED PROTOCOL: EXHUMATION ZERO]", 640, 140);

        ctx.font = '900 88px "Impact", sans-serif';
        ctx.fillStyle = "#fbeeed";
        ctx.shadowColor = "#ff2211";
        ctx.shadowBlur = 28;
        ctx.fillText("DO NOT DISTURB THE GRAVES", 640, 260);
        ctx.shadowBlur = 0;

        ctx.font = 'italic 30px "Georgia", serif';
        ctx.fillStyle = "#e8b8b4";
        ctx.fillText("The Cinnabar Talismans must remain affixed to the roadside Jizo.", 640, 360);

        ctx.font = '22px "Arial", sans-serif';
        ctx.fillStyle = "#d4b0ac";
        ctx.fillText("Nine missing souls remain bound to the soil beneath the cedar trees.", 640, 440);
        ctx.fillText("Any tampering will trigger immediate containment retaliation.", 640, 480);

        ctx.font = 'bold 20px "Courier New", monospace';
        ctx.fillStyle = "#8a3a34";
        ctx.fillText("DISTRICT EXHUMATION ARCHIVE // FILE REF #94-H14", 640, 570);
        break;

      case 4:
        // Esports Championship
        this.drawBorder(ctx, "#9d65d4");
        ctx.textAlign = "center";

        ctx.font = '800 30px "Arial", sans-serif';
        ctx.fillStyle = "#be95ea";
        ctx.fillText("MIDNIGHT LAN WARS", 640, 140);

        ctx.font = '900 100px "Impact", sans-serif';
        ctx.fillStyle = "#f8f2fd";
        ctx.shadowColor = "#b870fc";
        ctx.shadowBlur = 30;
        ctx.fillText("BATTLEGROUND 2026", 640, 265);
        ctx.shadowBlur = 0;

        ctx.font = '700 36px "Arial Black", sans-serif';
        ctx.fillStyle = "#ffd257";
        ctx.fillText("VALORANT  •  BGMI  •  TEKKEN  •  FIFA", 640, 370);

        ctx.font = '600 28px "Georgia", serif';
        ctx.fillStyle = "#e0caf5";
        ctx.fillText("HIGH-REFRESH ESPORTS ARENA // LIVE STREAMED", 640, 470);

        ctx.font = '400 22px "Courier New", monospace';
        ctx.fillStyle = "#957cb0";
        ctx.fillText("ORGANIZED BY COMPUTER SOCIETY OF INDIA — JUET CHAPTER", 640, 570);
        break;

      case 5:
        // Shortwave Radio Loop
        this.drawBorder(ctx, "#3b8fc2");
        ctx.textAlign = "center";

        ctx.font = '800 32px "Courier New", monospace';
        ctx.fillStyle = "#6ec1f5";
        ctx.fillText("EMERGENCY RADIO FREQUENCY", 640, 140);

        ctx.font = '900 110px "Impact", sans-serif';
        ctx.fillStyle = "#ffffff";
        ctx.fillText("94.2 MHz SHORTWAVE", 640, 270);

        ctx.font = '600 30px "Georgia", serif';
        ctx.fillStyle = "#9ecded";
        ctx.fillText("Automated repeating broadcast from the abandoned Dagashi sweet shop.", 640, 370);

        ctx.font = 'italic 26px "Georgia", serif';
        ctx.fillStyle = "#ff7766";
        ctx.fillText('"If the bicycle bell rings behind you, keep looking straight ahead."', 640, 460);

        ctx.font = 'bold 22px "Courier New", monospace';
        ctx.fillStyle = "#5286a8";
        ctx.fillText("TRANSMITTER REPEATER STATION #3 // POWERED BY BACKUP GENERATOR", 640, 560);
        break;

      case 6:
        // Black Forest Horror Notice
        this.drawBorder(ctx, "#446e50");
        ctx.textAlign = "center";

        ctx.font = '800 30px "Georgia", serif';
        ctx.fillStyle = "#7cb88d";
        ctx.fillText("STATE FORESTRY & WILDLIFE PRESERVE", 640, 140);

        ctx.font = '900 96px "Impact", sans-serif';
        ctx.fillStyle = "#eaf8ed";
        ctx.fillText("THE BLACK FOREST", 640, 260);

        ctx.font = '700 34px "Arial", sans-serif';
        ctx.fillStyle = "#f59a38";
        ctx.fillText("NO ARTIFICIAL LIGHT BEYOND THIS POINT", 640, 365);

        ctx.font = '400 24px "Georgia", serif';
        ctx.fillStyle = "#b4d8be";
        ctx.fillText("Dense canopy blocks moonlight. Deep mud and supernatural distortions.", 640, 460);
        ctx.fillText("Cyclists must carry repair kits and never leave the asphalt.", 640, 505);

        ctx.font = '400 20px "Courier New", monospace';
        ctx.fillStyle = "#557d60";
        ctx.fillText("DEPARTMENT OF ENVIRONMENT & FORESTS — GUNA REGION", 640, 580);
        break;

      case 7:
        // Final Techyon Victory / Lore Landmark
        this.drawBorder(ctx, "#4896be");
        ctx.textAlign = "center";

        ctx.font = '800 28px "Georgia", serif';
        ctx.fillStyle = "#72a9cc";
        ctx.fillText("JUET ANNUAL TECHFEST", 640, 140);

        ctx.font = '900 100px "Impact", sans-serif';
        ctx.fillStyle = "#e2f2fc";
        ctx.shadowColor = "#82d2ff";
        ctx.shadowBlur = 32;
        ctx.fillText("TECHYON 2026", 640, 265);
        ctx.shadowBlur = 0;

        ctx.font = 'italic 700 36px "Georgia", serif';
        ctx.fillStyle = "#82d2ff";
        ctx.fillText("WHERE CODE MEETS THE SUPERNATURAL", 640, 360);

        ctx.font = '500 26px "Arial", sans-serif';
        ctx.fillStyle = "#c5e1f5";
        ctx.fillText("You have navigated the midnight roads of Techyon.", 640, 460);
        ctx.fillText("Created with Three.js, WebGL 2, & Web Audio.", 640, 505);

        ctx.font = 'bold 20px "Courier New", monospace';
        ctx.fillStyle = "#5c84a0";
        ctx.fillText("JAYPEE UNIVERSITY OF ENGINEERING & TECHNOLOGY  •  HALLOWEEN EDITION", 640, 580);
        break;
    }

    return canvas;
  }

  private drawBorder(ctx: CanvasRenderingContext2D, color: string): void {
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.strokeRect(30, 30, 1220, 660);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 2;
    ctx.strokeRect(42, 42, 1196, 636);

    // Corner brackets
    const cLen = 40;
    ctx.fillStyle = color;
    ctx.fillRect(26, 26, cLen, 12);
    ctx.fillRect(26, 26, 12, cLen);
    ctx.fillRect(1254 - cLen, 26, cLen, 12);
    ctx.fillRect(1242, 26, 12, cLen);
    ctx.fillRect(26, 682, cLen, 12);
    ctx.fillRect(26, 694 - cLen, 12, cLen);
    ctx.fillRect(1254 - cLen, 682, cLen, 12);
    ctx.fillRect(1242, 694 - cLen, 12, cLen);
  }

  private drawHazardStripes(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void {
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    ctx.fillStyle = "#e0a020";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#161616";
    const stripeW = 40;
    for (let sx = -h; sx < w + h; sx += stripeW * 2) {
      ctx.beginPath();
      ctx.moveTo(sx, y + h);
      ctx.lineTo(sx + h, y);
      ctx.lineTo(sx + h + stripeW, y);
      ctx.lineTo(sx + stripeW, y + h);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  private drawGlowCircle(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string): void {
    const radGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    radGrad.addColorStop(0, color);
    radGrad.addColorStop(1, "transparent");
    ctx.fillStyle = radGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawSubBox(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, title: string, prize: string, desc: string): void {
    ctx.fillStyle = "rgba(10, 24, 34, 0.85)";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "rgba(88, 178, 156, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    ctx.font = '800 24px "Arial Black", sans-serif';
    ctx.fillStyle = "#7ad4bf";
    ctx.textAlign = "center";
    ctx.fillText(title, x + w / 2, y + 42);

    ctx.font = '900 38px "Impact", sans-serif';
    ctx.fillStyle = "#ffd257";
    ctx.fillText(prize, x + w / 2, y + 98);

    ctx.font = '500 18px "Georgia", serif';
    ctx.fillStyle = "#b4d8ce";
    ctx.fillText(desc, x + w / 2, y + 144);
  }
}
