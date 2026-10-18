# CONTEXT.md — Techyon (JUET Halloween TechFest)

> **Project Name:** Techyon  
> **Original Base:** Summer Cycle (Three.js Open-World Procedural Cycling Engine)  
> **Target Event:** JUET Halloween TechFest  
> **Repository:** [https://github.com/cascade80/Halloween-roads](https://github.com/cascade80/Halloween-roads)  
> **Stack:** TypeScript 5+, Three.js (WebGL 2), Vite 8+, Web Audio API (100% procedural assets, zero external 3D/audio files)  

---

## 1. Project Overview & Creative Direction

**Techyon** transforms a third-person procedural cycling engine into an atmospheric, cinematic midnight horror experience. 

### The Creative Brief
The experience places the player on a lonely, midnight bicycle journey through an abandoned Indian countryside shrouded in mist. As the player peddles forward along an ancient road, subtle environmental storytelling unfolds into escalating supernatural dread:

- **Restrained Horror Palette:** Deep moonlit blues, desaturated teal, charcoal, dark decayed wood, muted mossy forest greens, and rare dying warm ambers from distant abandoned lanterns or neglected shrines.
- **Atmospheric Depth:** Layered procedural ground fog, distant silhouettes disappearing into mist, a luminous full moon casting cold directional light, and natural tunnels formed by dead overhanging tree boughs.
- **100% Procedural Generation:** All 3D meshes, textures, leaf atlases, character facial anatomy, and audio stems are generated mathematically at runtime via WebGL shaders and the Web Audio API without downloaded 3D models or audio samples.

---

## 2. Character Model: Undead Zombie Boy

The original riding girl model has been completely re-engineered into an **undead zombie boy** with a custom articulated 3D anatomy, horror locomotion, and specific wardrobe:

### Visual Design
- **Top:** Sky blue button-down shirt (`#4f8eb8`) with a folded shirt collar, triangular collar leaves framing the neck, front center button placket, and torn fabric stained with dark coagulated gore and grime.
- **Bottom:** Dark navy blue trousers (`#141c2c`) with a dark leather belt and tarnished metal buckle at the waistline, falling smoothly into dark loafers (`#0e1012`). The original skirt geometry is disabled.
- **Hair:** Messy, choppy, disheveled dark zombie boy cut (`#101210`) with unkempt spiky tufts across the crown, temples, and nape (ponytail and feminine locks completely removed).
- **Face & Anatomy:**
  - Sunken black eye sockets with clouded white cataract irises, bloodshot vessels, and pinpoint unblinking pupils.
  - Collapsed necrotic nasal cavities (two dark sunken skull cavities).
  - Open snarling zombie jaw with two exposed rows of jagged rotting teeth and sharp fangs (`#bbb290`).
  - Ripped cheek flesh exposing pale bone underneath, with dark coagulated blood dripping down the chin.
  - Broadened boy shoulder frame (`0.168` half-width) with a flat masculine chest profile (`bust = 0`).
  - Emaciated zombie claws (`walkHands`): 4 crooked skeletal fingers per hand tipped with blackened talons (`#0c100d`) dipped in dried gore, plus a hooked thumb.

### Locomotion & Animation
- **Hunched Spine:** Fractured, hunched posture pitching forward as he moves.
- **Asymmetric Reaching Claws:** Left arm reaches higher and forward in a predatory grasp, while the right arm drags lower and crooked.
- **Spasmodic Head Jerks:** Sub-periodic sudden nerve twitches and high-frequency tremors applied to head orientation.
- **Dragging Limp:** Asymmetric walking gait where the trailing leg drags inward and hitches unevenly.
- **Bicycle Basket:** Fresh picnic flowers replaced with dead, withered, blackened thorny branches and dry twigs.

---

## 3. World Generation & Escalating Dread

The world is generated dynamically through a chunk recycling system (`src/world/chunks.ts`) operating along a smooth procedural road ribbon (`src/world/road.ts`):

```
[Spawn]  ──>  [Zone A: Last Normal Road]  ──>  [Zone B: Forgotten Settlement]
                                                       │
[Zone D: The Black Forest]  <──  [Zone C: Haunted Cemetery] <──┘
```

### The 4 Horror Zones
1. **Zone A — The Last Normal Road:**
   - Lonely countryside with subtle signs of abandonment.
   - Cool moonlight, light ground mist, and distant tree silhouettes.
2. **Zone B — The Forgotten Settlement:**
   - Weathered, dark wooden houses with closed or broken doors.
   - Isolated dying lanterns flickering faintly on porches.
   - Thicker fog banks and neglected roadside signboards.
3. **Zone C — The Haunted Cemetery & Shrines:**
   - Weathered gravestones with varied irregular silhouettes.
   - Neglected stone shrines with faint unnatural light sources.
   - Overgrown weeds, moss-covered boundary stones, and silence.
4. **Zone D — The Black Forest:**
   - Dense corridors of dead and twisted trees forming natural overhead arches.
   - Heavy oppressive fog with limited forward visibility.
   - Supernatural phantom wisps (`fireflies.ts`) floating over ditches and roots.

---

## 4. Key Systems & Codebase Architecture

```
summer-cycle/
├── index.html               # Entry point: Techyon branding, meta tags, 2D SVG zombie loader
├── package.json             # Project metadata ("techyon"), scripts, dependencies
├── vite.config.ts           # Vite build pipeline with Three.js manual chunking
├── tsconfig.json            # Strict TypeScript configuration
├── src/
│   ├── main.ts              # Game loop, WebGL 2 check, event wiring, render coordinator
│   ├── loader.ts            # Loading overlay, compile pipeline, SVG undead boy illustration
│   ├── pause.ts             # Pause menu (Esc), Techyon overlay, input suppressor
│   ├── audio.ts             # Web Audio master bus, ducking, ambient volume controls
│   ├── core/
│   │   ├── input.ts         # Keyboard (WASD, Arrows, Shift, F, V, C, T, M, Esc) & Mouse
│   │   └── rng.ts           # Seeded deterministic pseudo-random number generator
│   ├── rider/
│   │   ├── rider.ts         # Character model geometry, zombie sculpt, textures, IK & gait
│   │   ├── bike.ts          # Bicycle frame, wheels, chains, basket with dead branches
│   │   ├── camera.ts        # Third-person chase, first-person (FPP), cinematic cameras
│   │   ├── onfoot.ts        # On-foot explore controller (toggled via 'F')
│   │   └── controller.ts    # Cycling physics, pedaling resistance, braking, leaning
│   ├── world/
│   │   ├── chunks.ts        # Chunk recycling, horror zone distribution, prop spawning
│   │   ├── road.ts          # Road spline geometry, banking, cracks, dark patches, leaf litter
│   │   ├── sky.ts           # Moonlit night sky dome, layered storm clouds, full moon
│   │   ├── timeofday.ts     # Midnight lighting, cold moon directional light, lantern colors
│   │   ├── props.ts         # Houses, gravestones, roadside shrines, utility poles, fences
│   │   ├── vegetation.ts    # Twisted dead trees, instanced undergrowth, leaf atlas
│   │   ├── fireflies.ts     # Eerie green/blue supernatural phantom wisps
│   │   ├── lights.ts        # Point light manager for flickering lanterns and shrines
│   │   ├── street.ts        # Roadside furniture, curbs, guardrails
│   │   └── geo.ts           # Procedural terrain heights, riverbeds, and berms
│   ├── render/
│   │   ├── materials.ts     # Uber-shader cel-shading material factory, fog depth, ink passes
│   │   ├── post.ts          # Silhouette outlines, horror color grading, vignette
│   │   ├── lightpasses.ts   # Multi-pass forward rendering passes
│   │   ├── todUniforms.ts   # Uniform bridges connecting timeofday to GLSL shaders
│   │   └── profiler.ts      # Real-time GPU & draw call performance telemetry
│   └── sound/
│       ├── nature.ts        # Ambient night insects, wind, dead leaves, silent cicadas
│       ├── air.ts           # Wind gusts, atmospheric whistles, distant crows
│       ├── bike.ts          # Mechanical chain ticks, wheel hum, brake creak
│       ├── steps.ts         # Footstep audio on asphalt, grass, and gravel
│       ├── kit.ts           # Web Audio node builder, filters, noise loops
│       └── dsp.ts           # Digital signal processing utilities and synthesis math
└── scripts/
    ├── shoot.mjs            # Automated headless screenshot generator for visual verification
    └── test-shot.mjs        # Automated Playwright test harness for runtime validation
```

---

## 5. Controls Reference

| Input | Mode | Action |
|---|---|---|
| **Click** | Menu / Start | Locks pointer, launches game fullscreen, starts audio |
| **Mouse Move** | Any | Orbits camera (chase) or turns head (first-person) |
| **W / Up Arrow** | Riding | Pedal harder (cruises automatically) |
| **W / Up Arrow** | On-foot | Walk forward with zombie limp |
| **S / Down Arrow** | Riding | Apply brakes; hold at standstill to walk bike backward |
| **S / Down Arrow** | On-foot | Walk backward |
| **A / D / Left / Right** | Any | Steer / Turn |
| **Shift** | Riding | Sprint pedaling (boosts speed to 13.5 m/s) |
| **Shift** | On-foot | Shuffling zombie jog |
| **F** | Any | **Dismount / Mount**: Toggle between riding bike and walking on foot |
| **V** | Riding | Toggle First-Person (FPP) / Third-Person (TPP) camera |
| **C** | Riding | Cycle Cinematic Cameras (Chase, Tracking, Front view) |
| **T** | Any | Cycle environmental lighting palette |
| **B** | Riding | Ring bicycle bell |
| **M** | Any | Mute / Unmute audio |
| **Esc** | Any | Tap to Pause (washi overlay); hold to release mouse pointer |

---

## 6. URL Query Parameters

The game supports URL parameters for automation, presentation, and event demos:

- `?skipintro=1` — Bypasses the initial click-to-start screen and begins immediately.
- `?autoplay=1` — Hands-off demonstration mode where the bike navigates and steers autonomously.
- `?time=0.9` — Sets time-of-day directly (0.85+ activates the midnight horror lighting and audio layers).
- `?msaa=0|2|4` — Overrides hardware anti-aliasing level.
- `?fs=0` — Disables automatic fullscreen request.

---

## 7. Development & Build Commands

```bash
# 1. Install dependencies (Node.js 18+ required)
npm install   # or pnpm install

# 2. Run local development server (Vite hot-reloading)
npm run dev

# 3. Type-check and production build
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 8. Git & Repository Management Notes

- **Clean Branch Strategy:** The primary production branch is `main`. The heavy test screenshot directory (`shots/` ~474 MB) has been removed from git tracking on `main` and added to `.gitignore`. This keeps git clone and push sizes under **~12 MB**.
- **Historical Backups:** The legacy git history containing all prior iteration screenshots is preserved locally in the branch `main-history`.
- **Target Remote:** `origin` points to `https://github.com/cascade80/Halloween-roads.git`.
