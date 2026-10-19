import{$t as e,B as t,C as n,Cn as r,Dn as i,F as a,H as o,I as s,J as c,K as l,M as u,N as d,O as f,On as p,P as m,R as h,T as g,V as _,Y as v,_ as y,a as b,at as x,c as S,cn as C,ct as w,d as T,dn as E,et as ee,hn as te,i as D,in as ne,it as re,jn as ie,k as ae,kn as oe,l as se,ln as ce,lt as le,on as ue,ot as de,p as fe,pn as pe,r as me,rt as he,s as ge,sn as _e,st as ve,u as ye,w as be,yn as xe}from"./three-core-BLOpvGEt.js";import{a as Se,i as Ce,n as we,o as Te,r as Ee,s as De,t as Oe}from"./three-DNbqDb1G.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var ke=(e,t,n)=>new T(e,t,n),Ae={uSkySun:{value:new p(-.55,.42,.72).normalize()},uSunGlow:{value:ke(1,.8,.5)},uSunGlowAmt:{value:new i(.16,.3)},uHaze:{value:ke(.86,.84,.72)},uHazeAmt:{value:.45},uHorizGlow:{value:ke(1,.6,.4)},uHorizGlowK:{value:new i(0,6)},uCloudTop:{value:ke(1,.955,.871)},uCloudMid:{value:ke(.791,.799,.863)},uCloudLow:{value:ke(.392,.423,.597)},uCloudRim:{value:ke(1,.96,.86)},uCloudK:{value:new p(.5,0,0)},uCloudUnder:{value:ke(1,.6,.4)},uWisp:{value:ke(.95,.96,.98)},uSunDisk:{value:ke(0,0,0)},uStars:{value:0},uNight:{value:0},uWorldTint:{value:ke(1,1,1)},uFarTint:{value:ke(1,1,1)},uFarHaze:{value:0},uGlint:{value:0}},je=`
uniform vec3 uSkySun;
uniform vec3 uSunGlow;
uniform vec2 uSunGlowAmt;
uniform vec3 uHaze;
uniform float uHazeAmt;
uniform vec3 uHorizGlow;
uniform vec2 uHorizGlowK;
uniform vec3 uCloudTop;
uniform vec3 uCloudMid;
uniform vec3 uCloudLow;
uniform vec3 uCloudRim;
uniform vec3 uCloudK;
uniform vec3 uCloudUnder;
uniform vec3 uWisp;
uniform vec3 uSunDisk;
uniform float uStars;
uniform float uNight;
uniform vec3 uWorldTint;
uniform vec3 uFarTint;
uniform float uFarHaze;
uniform float uGlint;
// Emission added after lighting (not tinted by uWorldTint), set by lamp/window/lantern surfaces.
vec3 gEmit = vec3(0.0);
`,Me={uGradeMul:{value:ke(1,1,1)},uSat:{value:1.05}},Ne=e=>new T(e),O={uTime:{value:0},uSunDir:{value:new p(-.45,.44,.77).normalize()},uSunColor:{value:Ne(`#a4c6dc`)},uShadowTint:{value:Ne(`#0e1520`)},uSkyZenith:{value:Ne(`#04070e`)},uSkyMid:{value:Ne(`#0b1622`)},uSkyHorizon:{value:Ne(`#162530`)},uFogColor:{value:Ne(`#132028`)},uFogDensity:{value:.0016},uRimColor:{value:Ne(`#72a4c2`)},uWindDir:{value:new i(.8,-.6).normalize()},uShadowMap:{value:null},uShadowMat:{value:new c},uShadowOn:{value:0},uShadowTexel:{value:new i(1/2048,1/2048)},uShadowRange:{value:300},uShadowCenter:{value:new p},uShadowHalf:{value:55},uNoFringe:{value:0},uLeafTex:{value:null},uSignTex:{value:null},uDither:{value:0},uPush:{value:new oe(0,0,.8,0)},uBikePos:{value:new p(0,0,0)},...Ae},Pe=`
uniform float uTime;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform vec3 uShadowTint;
uniform vec3 uSkyZenith;
uniform vec3 uSkyMid;
uniform vec3 uSkyHorizon;
uniform vec3 uFogColor;
uniform float uFogDensity;
uniform vec3 uRimColor;
uniform vec2 uWindDir;
uniform float uNoFringe;
uniform sampler2D uLeafTex;
uniform sampler2D uSignTex;
uniform float uDither;
uniform vec4 uPush;
uniform vec3 uBikePos;
uniform sampler2D uShadowMap;
uniform mat4 uShadowMat;
uniform float uShadowOn;
uniform vec2 uShadowTexel;
uniform float uShadowRange;
uniform vec3 uShadowCenter;
uniform float uShadowHalf;
${je}

float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float hash13(vec3 p3){ p3 = fract(p3 * 0.1031); p3 += dot(p3, p3.zyx + 31.32); return fract((p3.x + p3.y) * p3.z); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1.0, 0.0)), u.x), mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x), u.y);
}
float vnoise3(vec3 p){
  vec3 i = floor(p), f = fract(p); vec3 u = f * f * (3.0 - 2.0 * f);
  float a = mix(mix(hash13(i), hash13(i + vec3(1,0,0)), u.x), mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), u.x), u.y);
  float b = mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), u.x), mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), u.x), u.y);
  return mix(a, b, u.z);
}
float fbm2(vec2 p){ float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++){ s += a * vnoise(p); p = p * 2.03 + 17.1; a *= 0.5; } return s; }

vec3 skyColor(vec3 dir){
  float h = clamp(dir.y, 0.0, 1.0);
  vec3 col = mix(uSkyHorizon, uSkyMid, smoothstep(0.0, 0.2, h));
  col = mix(col, uSkyZenith, smoothstep(0.14, 0.7, h));
  float sd = max(dot(dir, uSkySun), 0.0);
  col += uSunGlow * (pow(sd, 5.0) * uSunGlowAmt.x + pow(sd, 48.0) * uSunGlowAmt.y);
  if (uHorizGlowK.x > 0.0) {
    // Low sun: the horizon glows warm toward it (sunset band), fading around the sky.
    float az = dot(normalize(dir.xz + 1e-5), normalize(uSkySun.xz + 1e-5)) * 0.5 + 0.5;
    col = mix(col, uHorizGlow, clamp(exp(-h * uHorizGlowK.y) * az * az * uHorizGlowK.x, 0.0, 1.0));
  }
  // Warm aerial haze hugging the horizon.
  col = mix(col, uHaze, exp(-h * 26.0) * uHazeAmt);
  return col;
}

vec3 applyFog(vec3 col, vec3 wpos){
  col = col * uWorldTint + gEmit;
  vec3 d = wpos - cameraPosition;
  float dist = length(d);
  float f = 1.0 - exp(-max(dist - 35.0, 0.0) * uFogDensity);
  vec3 dir = d / max(dist, 0.001);
  vec3 fc = mix(uFogColor, skyColor(normalize(vec3(dir.x, 0.03, dir.z))), 0.45);
  fc *= vec3(0.96, 1.0, 1.04);
  return mix(col, fc, f * 0.95);
}

// Directional brush strokes that stick to the surface (world space, planar by dominant normal).
float brush(vec3 wp, vec3 n){
  vec3 an = abs(n);
  vec2 p = an.y > max(an.x, an.z) ? wp.xz : (an.x > an.z ? wp.zy : wp.xy);
  float ang = vnoise(p * 0.12) * 3.14159;
  float c = cos(ang), s = sin(ang);
  vec2 q = mat2(c, -s, s, c) * p;
  // Band-limited by pixel footprint: stroke octaves fade to their mean before they can alias.
  float fp = length(wp - cameraPosition) * 0.0011;
  float k1 = 1.0 - smoothstep(0.25, 0.6, fp * 6.0), k2 = 1.0 - smoothstep(0.25, 0.6, fp * 13.0);
  return 0.5 + (vnoise(q * vec2(1.1, 6.0)) - 0.5) * 0.6 * k1 + (vnoise(q * vec2(2.3, 13.0)) - 0.5) * 0.4 * k2;
}

// Toon-thresholded shadow map: 1 = sunlit, 0 = in shadow. Canopy shadows get sun flecks.
bool gFastShadow = false;
float shadowVis(vec3 wpos, vec3 N){
  if (uShadowOn < 0.5) return 1.0;
  vec2 rel = abs(wpos.xz - uShadowCenter.xz);
  float edge = smoothstep(uShadowHalf * 0.82, uShadowHalf * 0.98, max(rel.x, rel.y));
  if (edge >= 1.0) return 1.0;
  vec3 p = wpos + N * 0.05 + uSunDir * 0.04;
  vec4 sc = uShadowMat * vec4(p, 1.0);
  vec3 s = sc.xyz / sc.w;
  if (s.x <= 0.0 || s.x >= 1.0 || s.y <= 0.0 || s.y >= 1.0 || s.z >= 1.0) return 1.0;
  vec2 tc = s.xy / uShadowTexel - 0.5;
  vec2 f = fract(tc);
  vec2 b0 = (floor(tc) + 0.5) * uShadowTexel;
  if (gFastShadow) {
    // Foliage: one bilinear 2x2 tap is plenty under the leaf texture (and far cheaper on canopies).
    float l00 = step(s.z - 0.0008, texture(uShadowMap, b0).r);
    float l10 = step(s.z - 0.0008, texture(uShadowMap, b0 + vec2(uShadowTexel.x, 0.0)).r);
    float l01 = step(s.z - 0.0008, texture(uShadowMap, b0 + vec2(0.0, uShadowTexel.y)).r);
    float l11 = step(s.z - 0.0008, texture(uShadowMap, b0 + uShadowTexel).r);
    return mix(mix(mix(l00, l10, f.x), mix(l01, l11, f.x), f.y), 1.0, edge);
  }
  // 3x3 bilinear PCF from a 4x4 texel footprint: smooth, stair-free edges.
  float L[16];
  float gap = 0.0, n = 0.0;
  for (int j = 0; j < 4; j++) for (int i = 0; i < 4; i++) {
    float d = texture(uShadowMap, b0 + vec2(float(i - 1), float(j - 1)) * uShadowTexel).r;
    float lit = step(s.z - 0.0008, d);
    L[j * 4 + i] = lit;
    gap += (1.0 - lit) * (s.z - d);
    n += 1.0 - lit;
  }
  float vis = 0.0;
  for (int j = 0; j < 3; j++) for (int i = 0; i < 3; i++) {
    float a = mix(L[j * 4 + i], L[j * 4 + i + 1], f.x);
    float c = mix(L[(j + 1) * 4 + i], L[(j + 1) * 4 + i + 1], f.x);
    vis += mix(a, c, f.y);
  }
  vis /= 9.0;
  float g = n > 0.0 ? gap / n * uShadowRange : 0.0;
  // Dappled sunlight through leaves: only when the occluder is high above (canopy).
  float fl = vnoise(wpos.xz * 1.1 + vec2(uTime * 0.12, 0.0)) * 0.65 + vnoise(wpos.xz * 2.7) * 0.35;
  float fleck = smoothstep(0.62, 0.7, fl) * smoothstep(3.0, 5.0, g);
  vis = max(smoothstep(0.35, 0.65, vis), fleck);
  return mix(vis, 1.0, edge);
}

// Three-step cel lighting (lit / shadow / dark shadow), painterly terminator, rim light.
// Set by the skin branch: one crisp cel step on the form, but cast shadows (hair) stay soft.
float gSoftCast = 0.0;
// Rider cloth: gentle form shade where the blouse turns away from the camera.
float gForm = 0.0;
vec3 toonT(vec3 base, vec3 N, vec3 wpos, float jitter, float paint, float rimAmt, float soft, vec3 shTint){
  float br = brush(wpos, N);
  float t = dot(N, uSunDir) + (br - 0.5) * 0.32 * paint + jitter;
  float sv = shadowVis(wpos, N);
  // Skin (the only very soft material): cast shadows from hair/cap fall softly, no hard seams.
  if (soft > 0.12 || gSoftCast > 0.5) sv = mix(sv, 1.0, 0.45);
  float lit = smoothstep(0.02 - soft, 0.06 + soft, t) * sv;
  float mid = smoothstep(-0.5 - soft, -0.44 + soft, t);
  vec3 cLit = base * uSunColor;
  // High-albedo surfaces (blouse, plaster, socks) shade to a light, less saturated blue-grey so
  // they read as white-in-shade, never as holes or sky.
  float al = dot(base, vec3(0.2126, 0.7152, 0.0722));
  float chroma = max(base.r, max(base.g, base.b)) - min(base.r, min(base.g, base.b));
  float whiteK = smoothstep(0.35, 0.75, al) * (1.0 - smoothstep(0.12, 0.3, chroma));
  vec3 cSh = base * mix(shTint, vec3(0.37, 0.4, 0.52), whiteK);
  vec3 cDk = cSh * vec3(0.7, 0.72, 0.84);
  vec3 col = mix(cDk, cSh, max(mid, 1.0 - sv));
  col = mix(col, cLit, lit);
  col += base * uSkyMid * 0.1 * (N.y * 0.5 + 0.5);
  // Warm bounce light from the sunlit ground (the golden-hour warmth, without yellowing whites).
  col += base * vec3(0.07, 0.045, 0.02) * (0.5 - N.y * 0.5) * (1.0 - lit);
  vec3 V = normalize(cameraPosition - wpos);
  float fr = 1.0 - max(dot(N, V), 0.0);
  float rim = smoothstep(0.58, 0.72, fr) * rimAmt;
  float sunSide = smoothstep(-0.3, 0.3, dot(N, uSunDir) + 0.2) * (0.3 + 0.7 * sv);
  col += uRimColor * base * rim * (0.2 + 0.8 * sunSide) * 0.8;
  // Skin turning away from the camera takes one soft cel shade (far cheek in 3/4, jaw edges).
  if (gSoftCast > 0.5) col = mix(col, cSh, smoothstep(0.46, 0.6, fr) * 0.75);
  if (gForm > 0.0) col = mix(col, cSh, smoothstep(0.42, 0.62, fr) * gForm);
  col *= 1.0 + (br - 0.5) * 0.14 * paint;
  return min(col, vec3(0.97));
}
vec3 toon(vec3 base, vec3 N, vec3 wpos, float jitter, float paint, float rimAmt, float soft){
  return toonT(base, N, wpos, jitter, paint, rimAmt, soft, uShadowTint);
}
`,Fe=`
layout(location = 0) out vec4 gColor;
layout(location = 1) out vec4 gNormal;
uniform float uId;
uniform float uMask;
// Coverage for alpha-cut cards: with MSAA + alphaToCoverage this becomes a per-sample mask, so
// blade and leaf edges resolve smoothly instead of crawling as the camera moves.
float gAlpha = 1.0;
// Without MSAA, alpha-to-coverage has a single sample and turns partial alpha fully opaque
// (spoke blur disc, near leaf cards). Then a screen-fixed 4x4 ordered dither stands in for it.
const float BAYER4[16] = float[16](0.0, 8.0, 2.0, 10.0, 12.0, 4.0, 14.0, 6.0, 3.0, 11.0, 1.0, 9.0, 15.0, 7.0, 13.0, 5.0);
void writeOut(vec3 col, vec3 wN, float mask){
  if (uDither > 0.5 && gAlpha < 0.999) {
    ivec2 q = ivec2(gl_FragCoord.xy) & 3;
    if (gAlpha * 16.0 <= BAYER4[q.y * 4 + q.x] + 0.5) discard;
    gAlpha = 1.0;
  }
  vec3 vn = normalize((viewMatrix * vec4(wN, 0.0)).xyz);
  gColor = vec4(col, gAlpha);
  gNormal = vec4(vn.xy * 0.5 + 0.5, uId / 32.0, mask);
}
`,Ie=`
float leafShape(vec2 uv){
  vec2 q = uv - 0.5;
  if (dot(q, q) < 0.15 * 0.15) return 1.0;
  // Seven pointed leaves (vesica outlines) of uneven length radiating from a small core: the
  // card edge reads as a serrated leaf cluster even when a near canopy fills the screen.
  for (int i = 0; i < 7; i++) {
    float fi = float(i);
    float ang = fi * 0.8976 + 0.3 + 0.25 * sin(fi * 2.7);
    vec2 dv = vec2(cos(ang), sin(ang));
    float L = 0.12 + 0.075 * fract(sin(fi * 12.9898) * 43758.5453);
    vec2 d = q - dv * (0.08 + L);
    float along = dot(d, dv), across = dot(d, vec2(-dv.y, dv.x));
    float k = 1.0 - along * along / (L * L);
    if (k > 0.0 && abs(across) < 0.062 * k) return 1.0;
  }
  return 0.0;
}
`,Le=`
${Pe}
in float aMat;
in float aWind;
out vec3 vWPos;
out vec3 vN;
out vec3 vCol;
out vec2 vUv;
out vec3 vObj;
flat out int vMat;

vec3 windOffset(vec3 wp, float w){
  // Coherent wind: every blade leans the same way, and gust bands travel downwind.
  vec2 d = uWindDir;
  float along = dot(wp.xz, d);
  float wave = sin(along * 0.22 - uTime * 2.1) * 0.5 + 0.5;
  wave = wave * wave;
  float flutter = sin(uTime * 3.3 + dot(wp.xz, vec2(1.7, 2.3))) * 0.12;
  float gust = vnoise(wp.xz * 0.03 - d * uTime * 0.35);
  float k = 0.22 + wave * 0.55 + gust * 0.35 + flutter;
  vec3 o = vec3(d.x, 0.0, d.y) * k * w * 0.34;
  o.y = -w * k * k * 0.08;
  return o;
}

void main(){
  vec3 pos = position;
  mat4 m = modelMatrix;
#ifdef USE_INSTANCING
  m = modelMatrix * instanceMatrix;
#endif
  int mt = int(aMat + 0.5);
  vec3 ipos = m[3].xyz;
  float ph = hash12(floor(ipos.xz * 3.0)) * 6.2831;
  if (mt == 12) {
    float flap = sin(uTime * 16.0 + ph * 3.0) * 1.1;
    float ax = abs(pos.x);
    pos = vec3(sign(pos.x) * ax * cos(flap), pos.y + ax * sin(flap), pos.z);
  }
  vec4 wp = m * vec4(pos, 1.0);
  if (mt == 12) {
    float t = uTime * 0.8;
    wp.xyz += vec3(sin(t * 0.7 + ph) * 1.4 + sin(t * 1.9 + ph * 2.0) * 0.35,
                   sin(t * 1.3 + ph) * 0.3 + sin(t * 3.7 + ph) * 0.08,
                   cos(t * 0.5 + ph) * 1.4);
  }
  if (mt == 18) {
    // Drifting light motes / seed fluff in a box that wraps around the camera.
    vec3 base = ipos;
    base.xz += uWindDir * uTime * 0.6;
    base.y += sin(uTime * 0.4 + ph) * 0.6;
    vec3 rel = base - cameraPosition;
    rel.xz = mod(rel.xz + 18.0, 36.0) - 18.0;
    rel.y = mod(rel.y + 1.0, 7.0) - 1.0;
    vec3 c = cameraPosition + rel + vec3(0.0, 0.2, 0.0);
    // Camera-facing billboard; motes closer than ~5 m collapse (never big blobs on the lens).
    float near = smoothstep(4.0, 8.0, length(rel)) * (0.55 + 0.9 * hash12(ipos.xz * 7.1));
    vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
    vec3 up = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
    wp = vec4(c + (right * position.x + up * position.y) * near, 1.0);
  }
  if (aWind > 0.0) wp.xyz += windOffset(wp.xyz, aWind);
  if (aWind > 0.0 && uPush.w > 0.0) {
    vec2 pd = wp.xz - uPush.xy;
    float pl = length(pd);
    float pf = (1.0 - smoothstep(uPush.z * 0.35, uPush.z, pl)) * uPush.w;
    wp.xz += pd / max(pl, 1e-3) * pf * min(aWind, 1.0) * 0.45;
    wp.y -= pf * min(aWind, 1.0) * 0.12;
  }
  vWPos = wp.xyz;
  vN = normalize(mat3(m) * normal);
  vCol = color;
#ifdef USE_INSTANCING_COLOR
  vCol *= instanceColor;
#endif
  vUv = uv;
  vObj = position;
  vMat = mt;
  gl_Position = projectionMatrix * viewMatrix * wp;
  if (mt == 21 && uNoFringe > 0.5) gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
}
`,Re=`
// Compile-time material set: branches for ids the mesh never carries fold away (smaller program,
// fewer registers, better occupancy). Default: every branch.
#ifndef MT_MASK_V
#define MT_MASK_V 0xFFFFFFFFu
#endif
const uint MT_MASK = MT_MASK_V;
#define HAS(x) ((MT_MASK & (1u << uint(x))) != 0u)
${Pe}
${Fe}
${Ie}
in vec3 vWPos;
in vec3 vN;
in vec3 vCol;
in vec2 vUv;
in vec3 vObj;
flat in int vMat;
// Per-material extras (see uberWith): bike lamp glow, spoke motion blur.
uniform float uLamp;
uniform float uBlur;

vec2 cellular(vec2 p){
  vec2 i = floor(p), f = fract(p); float d = 8.0; vec2 best = vec2(0.0);
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
    vec2 g = vec2(float(x), float(y));
    vec2 o = vec2(hash12(i + g), hash12(i + g + 17.3));
    vec2 r = g + o - f; float dd = dot(r, r);
    if (dd < d) { d = dd; best = g; }
  }
  return vec2(sqrt(d), hash12(i + best + 41.7));
}

// Anti-aliased periodic line of half-width hw (cell units) on every integer of x. Once cells shrink
// below a few pixels it fades to its average coverage instead of crawling (moiré / shimmer).
float aaLine(float x, float hw){
  float w = fwidth(x);
  float d = abs(fract(x + 0.5) - 0.5);
  float l = 1.0 - smoothstep(hw - w, hw + w, d);
  return mix(l, 2.0 * hw, smoothstep(0.2, 0.5, w));
}
float aaStep(float e, float x){ float w = fwidth(x) * 0.7 + 1e-5; return smoothstep(e - w, e + w, x); }
// Fine-detail fade: 1 while the pattern of frequency x is resolvable, 0 when it would alias.
float aaKeep(float x){ return 1.0 - smoothstep(0.15, 0.45, fwidth(x)); }

void main(){
  vec3 N = normalize(vN);
  if (!gl_FrontFacing && vMat != 17 && vMat != 21) N = -N;
  vec3 base = vCol;
  float paint = 1.0, rim = 0.55, soft = 0.03, jit = 0.0, leafHi = 0.0;
  bool card = false;
  vec3 emis = vec3(0.0);
  float mask = uMask;
  int mt = vMat;

  if ((HAS(20) && mt == 20)) {           // flower card: five rounded petals + a golden eye, alpha-cut
    vec2 d = vUv - 0.5;
    float r = length(d), th = atan(d.y, d.x);
    float petal = 0.3 + 0.16 * cos(th * 5.0);
    float edge = petal - r;
    float fa = clamp(edge / max(fwidth(edge), 1e-4) + 0.5, 0.0, 1.0);
    if (fa < 0.02) discard;
    gAlpha = fa;
    base = mix(vec3(0.95, 0.62, 0.08), base, smoothstep(0.08, 0.11, r)) * (0.85 + 0.3 * r / petal);
    N = normalize(mix(N, vec3(0.0, 1.0, 0.0), 0.5));
    mask = -1.0; paint = 0.3; rim = 0.3;
  }
  float leafTone = -1.0, leafVar = 0.5;
  if ((HAS(17) && mt == 17) || (HAS(21) && mt == 21)) { // leaf card: painted leaf cluster from the atlas (uv already in the atlas)
    vec4 lt = texture(uLeafTex, vUv);
    // Sharpen the mipmapped coverage to ~1 px, then hand it to alpha-to-coverage.
    float a = clamp((lt.a - 0.5) / max(fwidth(lt.a), 1e-3) + 0.5, 0.0, 1.0);
    if (a < 0.02) discard;
    gAlpha = a;
    leafTone = lt.r; leafVar = lt.g;
    mt = 1;
    mask = -1.0;
    card = true;
  }
  if ((HAS(1) && mt == 1)) {            // foliage: painted leaf clumps
    gFastShadow = true;
    vec3 an = abs(N);
    // Close to the camera the leaf cells get smaller and softer so they read as foliage, not facets.
    float nearK = 1.0 - smoothstep(5.0, 16.0, distance(vWPos, cameraPosition));
    vec2 p = (an.y > 0.55 ? vWPos.xz : (an.x > an.z ? vWPos.zy : vWPos.xy)) * mix(1.9, 4.2, nearK);
    // Second octave from cheap value noise (a second cellular lookup cost ~10% fps under canopies).
    float n2 = vnoise(p * 2.6 + 5.0);
    if (card) {
      // Cards already carry a leaf silhouette: value noise alone is enough (and cheap: they overlap).
      float n1 = vnoise(p * 1.1);
      jit = ((n1 - 0.5) * 0.8 + (n2 - 0.5) * 0.3) * mix(1.0, 0.6, nearK);
      leafHi = smoothstep(0.62, 0.9, n2) * 0.6;
    } else {
      vec2 c = cellular(p);
      jit = ((c.y - 0.5) * 0.7 + (n2 - 0.5) * 0.3 - smoothstep(0.5, 0.95, c.x) * 0.3) * mix(1.0, 0.6, nearK);
      leafHi = smoothstep(0.62, 0.9, n2) * (1.0 - smoothstep(0.3, 0.8, c.x));
      // Canopy surface painted with atlas leaves in two overlapping world-space layers (textureGrad
      // keeps the mip choice continuous across the fract() wrap: no seam lines).
      vec2 wp = (an.y > 0.55 ? vWPos.xz : (an.x > an.z ? vWPos.zy : vWPos.xy)) * 1.35;
      vec2 wq = mat2(0.8, -0.6, 0.6, 0.8) * wp * 1.6 + 3.7;
      vec2 cA = vec2(0.0, 0.5), cB = vec2(0.5, 0.0); // ovate + small-leaf cells
      vec4 la = textureGrad(uLeafTex, cA + fract(wp) * 0.5, dFdx(wp) * 0.5, dFdy(wp) * 0.5);
      vec4 lb = textureGrad(uLeafTex, cB + fract(wq) * 0.5, dFdx(wq) * 0.5, dFdy(wq) * 0.5);
      float ka = smoothstep(0.35, 0.65, la.a), kb = smoothstep(0.35, 0.65, lb.a);
      leafTone = mix(mix(0.1, lb.r * 0.85, kb), la.r, ka);
      leafVar = mix(lb.g, la.g, ka);
    }
    // Grey light probe: the canopy palette is applied to the toon light response below.
    base = vec3(0.25);
    // Low paint/jitter: thresholding smooth noise draws its isolines, which read as concentric
    // contour rings on a near bush. The painted leaves carry the texture instead.
    if (!card) jit *= 0.55;
    paint = card ? 0.25 : 0.4; rim = 0.5;
    // Cards brushing past the lens fade out through coverage instead of popping at the near plane.
    if (card) gAlpha *= smoothstep(0.25, 0.9, distance(vWPos, cameraPosition));
  } else if ((HAS(2) && mt == 2)) {     // dark stained vertical wall boards
    vec2 tg = normalize(vec2(-N.z, N.x) + 1e-4);
    float s = dot(vWPos.xz, tg);
    float bx = s / 0.21;
    float board = floor(bx);
    // Per-board tone, seams, fine vertical grain and the odd knot (all fade before they alias).
    float tone = 0.88 + 0.2 * hash12(vec2(board, 3.7));
    float grain = (vnoise(vec2(s * 55.0, vWPos.y * 1.6 + board * 7.0)) - 0.5) * 0.22 * aaKeep(s * 55.0);
    vec2 kp = vec2(fract(bx) - 0.5, fract(vWPos.y * 0.6 + hash12(vec2(board, 9.1))) - 0.5) * vec2(0.21, 1.66);
    float knot = (1.0 - smoothstep(0.012, 0.03, length(kp))) * step(0.7, hash12(vec2(board, floor(vWPos.y * 0.6))));
    base *= tone * (1.0 + grain) * (1.0 - 0.45 * aaLine(bx, 0.045)) * (1.0 - knot * 0.35 * aaKeep(bx * 8.0));
    // Weathering: darker and mossier toward the stone footing.
    base = mix(base, base * vec3(0.8, 0.9, 0.7), (1.0 - smoothstep(0.3, 1.0, vWPos.y)) * 0.6);
    paint = 0.5;
  } else if ((HAS(3) && mt == 3)) {     // kawara roof tiles (uv in metres): ribs down the slope, course lines
    vec2 t = vec2(vUv.x / 0.25, vUv.y / 0.28);
    vec2 id = floor(t);
    float cu = fract(t.x);
    float rib = 0.5 + 0.5 * sin(cu * 6.2831);
    float var = 0.85 + 0.3 * hash12(id);
    base = mix(vec3(0.0144, 0.0185, 0.0203), vec3(0.0409, 0.0529, 0.0612), rib) * (vCol.r > 0.5 ? 1.0 : 0.9) * var;
    // Each course's lower lip: dark gap then a lit rounded edge, anti-aliased.
    float lip = aaLine(t.y, 0.06);
    float edge = aaLine(t.y - 0.1, 0.05);
    base *= (1.0 - 0.55 * lip) * (1.0 + 0.7 * edge * rib);
    // Lichen / weathering blooms, stronger toward the eaves (low uv.y is the gutter edge).
    float lich = smoothstep(0.62, 0.8, vnoise(vUv * 3.1 + 11.0)) * (1.0 - smoothstep(0.0, 2.2, vUv.y) * 0.6);
    base = mix(base, vec3(0.12, 0.13, 0.07), lich * 0.5);
    paint = 0.4; rim = 1.2;
  } else if ((HAS(4) && mt == 4)) {     // shoji: matte paper in wooden lattice
    float frame = max(aaLine(vUv.x * 5.0, 0.045), aaLine(vUv.y * 4.0, 0.04));
    frame = max(frame, 1.0 - aaStep(0.03, vUv.x) * aaStep(0.03, vUv.y) * (1.0 - aaStep(0.97, vUv.x)) * (1.0 - aaStep(0.97, vUv.y)));
    float fib = (vnoise(vUv * vec2(40.0, 90.0)) - 0.5) * 0.08 * aaKeep(vUv.y * 90.0);
    base = mix(vec3(0.55, 0.52, 0.44) * (1.0 + fib), vec3(0.05, 0.04, 0.03), frame);
    paint = 0.3;
    if (uNight > 0.0) {
      base *= 0.28;
      // Abandoned village: only a single solitary window on house -67 and house -228 has a faint uncanny candle glow
      bool eerie = (abs(vWPos.z - (-67.0)) < 2.5 && vWPos.y > 3.0) || (abs(vWPos.z - (-228.0)) < 2.8 && vWPos.y > 3.2);
      if (eerie) {
        float flk = 0.75 + 0.25 * sin(uTime * 6.5 + vWPos.x * 7.0) + 0.1 * sin(uTime * 17.0);
        gEmit = vec3(1.0, 0.55, 0.18) * (1.0 - frame) * flk * uNight * 1.5;
      }
    }
  } else if ((HAS(5) && mt == 5)) {     // glass: dark abandoned interior, cold sheen
    float frame = max(aaLine(vUv.x * 3.0, 0.03), aaLine(vUv.y * 2.0, 0.025));
    frame = max(frame, 1.0 - aaStep(0.04, vUv.x) * (1.0 - aaStep(0.96, vUv.x)));
    float streak = 1.0 - smoothstep(0.0, 0.35, abs(vUv.x * 0.8 + vUv.y * 0.6 - 0.75));
    vec3 glass = vec3(0.015, 0.022, 0.028) + uSkyMid * 0.12 * streak;
    base = mix(glass, vec3(0.03, 0.025, 0.02), frame);
    paint = 0.2; rim = 0.0;
    // Dark abandoned interiors, no cheerful daytime lights
  } else if ((HAS(6) && mt == 6)) {     // grass blades: soft up-facing normals, no ink
    N = normalize(mix(N, vec3(0.0, 1.0, 0.0), 0.7));
    // Cool dense grass: offset the warm sun so lit tips land near the authored #6f9a3e.
    base *= vec3(1.0, 1.22, 1.75);
    // Wind-sway bands: tips brighten where the travelling gust wave (same as windOffset) leans them.
    float wv = sin(dot(vWPos.xz, uWindDir) * 0.22 - uTime * 2.1) * 0.5 + 0.5;
    base *= 1.0 + smoothstep(0.5, 1.0, wv) * clamp(vObj.y * 1.3 - 0.25, 0.0, 1.0) * 0.28;
    paint = 0.8; rim = 0.7; soft = 0.06;
    mask = -1.0;
  } else if ((HAS(7) && mt == 7)) {     // skin: a single clean cel step, soft cast shadows
    paint = 0.0; soft = 0.065; rim = 0.5; gSoftCast = 1.0;
  } else if ((HAS(22) && mt == 22)) {    // glasses acetate: flat, clean, no brush strokes
    paint = 0.0; soft = 0.02; rim = 0.0;
  } else if ((HAS(8) && mt == 8)) {     // cloth
    paint = 0.6; rim = 0.7;
    if (uId == 13.0) gForm = 0.45;
  } else if ((HAS(9) && mt == 9)) {     // bark / weathered wood
    base *= 0.85 + 0.25 * vnoise(vec2(atan(vObj.x, vObj.z) * 3.0, vWPos.y * 0.7) * 2.0);
    paint = 1.2;
  } else if ((HAS(10) && mt == 10)) {    // painted metal / signs
    paint = 0.3; rim = 0.5;
  } else if ((HAS(26) && mt == 26) || (HAS(29) && mt == 29)) { // chrome / glossy enamel: finished after the toon pass
    paint = (HAS(26) && mt == 26) ? 0.0 : 0.2; rim = 0.3; soft = 0.02;
  } else if ((HAS(27) && mt == 27)) {    // lamp lens: glassy by day, glows with uLamp
    float fr = 1.0 - max(dot(N, normalize(cameraPosition - vWPos)), 0.0);
    base = mix(base, vec3(0.92, 0.93, 0.9), 0.25 + 0.5 * fr * fr);
    emis = vec3(1.0, 0.84, 0.55) * uLamp * 2.6;
    paint = 0.0; rim = 0.0;
  } else if ((HAS(28) && mt == 28)) {    // spokes (uv.y 0) giving way to a soft motion-blur disc (uv.y 1) with speed
    if (vUv.y > 0.5) {
      float r = length(vObj.yz);
      gAlpha = uBlur * (0.24 + 0.05 * smoothstep(0.08, 0.26, r));
      N = normalize(mix(N, vec3(0.0, 1.0, 0.0), 0.5));
      mask = -1.0;
    } else gAlpha = 1.0 - uBlur;
    if (gAlpha < 0.03) discard;
    paint = 0.0; rim = 0.4; soft = 0.02;
  } else if ((HAS(11) && mt == 11)) {    // ground: grass meadow paint
    float n = fbm2(vWPos.xz * 0.11);
    float fl = hash12(floor(vWPos.xz * 2.3));
    base *= 0.82 + 0.36 * n;
    base = mix(base, base * vec3(1.2, 1.2, 0.8), step(0.93, fl) * 0.5);
    paint = 1.6; rim = 0.0;
  } else if ((HAS(12) && mt == 12)) {    // butterfly (bright, unshaded)
    gColor = vec4(applyFog(base * 0.92, vWPos), 1.0);
    gNormal = vec4(0.5, 0.5, uId / 32.0, -1.0);
    return;
  } else if ((HAS(13) && mt == 13)) {    // stone
    base *= 0.8 + 0.35 * vnoise(vWPos.xz * 4.0 + vWPos.y * 3.0);
    paint = 1.4;
  } else if ((HAS(23) && mt == 23) || (HAS(24) && mt == 24)) { // painted signage from the atlas; 24 = lit (vending, phone)
    vec4 sg = texture(uSignTex, vUv);
    if (sg.a < 0.5) discard;
    base = sg.rgb * vCol;
    paint = 0.12; rim = 0.3; soft = 0.05;
    if ((HAS(24) && mt == 24)) emis = base * 0.28;
    // Dusk: lit panels (vending, phone) glow; painted shop signs catch a little lamplight.
    gEmit = base * uNight * ((HAS(24) && mt == 24) ? 0.7 : 0.18);
  } else if ((HAS(25) && mt == 25)) {    // plaster: rain streaks under the eaves, grime toward the ground
    vec2 tg = normalize(vec2(-N.z, N.x) + 1e-4);
    float sx = dot(vWPos.xz, tg);
    float st = vnoise(vec2(sx * 7.0, vWPos.y * 0.35)) * vnoise(vec2(sx * 2.3 + 4.0, 1.0));
    base *= 1.0 - 0.16 * smoothstep(0.3, 0.6, st) * aaKeep(sx * 7.0);
    base *= mix(0.84, 1.0, smoothstep(0.2, 1.4, vObj.y));
    paint = 0.7;
  } else if ((HAS(14) && mt == 14)) {    // paper lantern (soft, never a lamp in daylight)
    emis = base * 0.18;
    // Albedo-driven: paper lanterns bloom, dark shop interiors stay a warm dim glow.
    gEmit = (base * 2.2 + vec3(0.26, 0.14, 0.05)) * uNight;
    paint = 0.3;
  } else if ((HAS(15) && mt == 15)) {    // hair: strand highlights
    float s = vnoise(vec2(atan(vObj.x, vObj.z) * 9.0, vObj.y * 3.0));
    base *= 0.85 + 0.3 * s;
    paint = 0.3; rim = 1.4; soft = 0.02;
  } else if ((HAS(16) && mt == 16)) {    // yellow/black pole guard
    float st = aaStep(0.5, fract(vWPos.y * 2.2 + atan(vObj.x, vObj.z) * 0.16));
    base = mix(vec3(0.02, 0.02, 0.02), vec3(0.9, 0.62, 0.04), st);
    paint = 0.3;
  } else if ((HAS(18) && mt == 18)) {    // light mote
    vec2 d = vUv - 0.5;
    float a = 1.0 - smoothstep(0.2, 0.5, length(d));
    if (a < 0.5) discard;
    // Only float in the shade under canopies and eaves, low down: sunbeam dust, never sky specks.
    float shade = 1.0 - shadowVis(vec3(vWPos.x, 0.0, vWPos.z), vec3(0.0, 1.0, 0.0));
    if (shade < 0.5 || vWPos.y > 5.0) discard;
    // ~60% coverage (the Kuwahara pass melts the dither into a soft glow).
    if (hash12(floor(gl_FragCoord.xy)) > 0.6) discard;
    gColor = vec4(vec3(1.0, 0.9, 0.62) * 1.02 * uWorldTint, 1.0);
    gNormal = vec4(0.5, 0.5, uId / 32.0, -1.0);
    return;
  } else if ((HAS(31) && mt == 31)) {    // stone-lantern fire / jack-o'-lantern flame / supernatural spectral lights
    gEmit = (base * 2.6 + vec3(0.2, 0.12, 0.05)) * uNight * 2.2;
  } else if ((HAS(30) && mt == 30)) {    // lamp / vending / sign panel: plain paint by day, lit at night
    paint = 0.3; rim = 0.5;
    gEmit = mix(base, vec3(1.0, 0.93, 0.8), 0.35) * uNight * 1.5;
  } else if ((HAS(19) && mt == 19)) {    // painted distant mountains: authored colour, soft top-lit gradient
    float h = clamp(vObj.y / 160.0, 0.0, 1.0);
    vec3 c = base * (0.9 + 0.18 * h) * (0.94 + 0.12 * brush(vWPos * 0.05, N));
    vec3 V = normalize(vWPos - cameraPosition);
    c = mix(c * uFarTint, skyColor(normalize(vec3(V.x, 0.02, V.z))), 0.25 * (1.0 - h) + uFarHaze * (1.0 - 0.5 * h));
    gColor = vec4(c, 1.0);
    gNormal = vec4(0.5, 0.5, uId / 32.0, uMask);
    return;
  }

  // Skin shades warm (peach/rose) instead of the cool environment shadow.
  // Skin shades to a soft pink-lavender instead of the cool environment shadow.
  vec3 shT = (HAS(7) && mt == 7) ? vec3(0.9, 0.75, 0.7) : (HAS(15) && mt == 15) ? vec3(0.42, 0.4, 0.38) : uShadowTint;
  if ((HAS(7) && mt == 7)) jit += 0.34;
  vec3 col = toonT(base, N, vWPos, jit, paint, rim, soft, shT) + emis;
  if ((HAS(26) && mt == 26) || (HAS(29) && mt == 29)) {
    // Faked reflections: no env map, just the sky gradient over a dark ground with a crisp horizon
    // (chrome), or a sun-and-sky highlight streak (enamel). Bands thinner than a pixel fade out
    // instead of sparkling along thin tubes.
    vec3 V = normalize(cameraPosition - vWPos);
    vec3 R = reflect(-V, N);
    float lumB = dot(base * uSunColor, vec3(0.2126, 0.7152, 0.0722));
    float L = clamp(dot(col, vec3(0.2126, 0.7152, 0.0722)) / max(lumB, 1e-4), 0.0, 1.0);
    float fw = max(fwidth(R.y), 1e-4);
    float keep = clamp(0.05 / fw, 0.0, 1.0);
    if ((HAS(26) && mt == 26)) {
      vec3 sky = mix(uSkyHorizon, uSkyMid, smoothstep(0.08, 0.6, R.y));
      sky = mix(sky, uSkyZenith, smoothstep(0.6, 1.0, R.y));
      // Silver, not teal: the sky only tints the reflection.
      sky = mix(vec3(dot(sky, vec3(0.2126, 0.7152, 0.0722))), sky, 0.45) * 1.08;
      vec3 env = mix(vec3(0.2, 0.175, 0.15) * (0.75 + 0.25 * smoothstep(-0.8, 0.0, R.y)), sky, smoothstep(-fw, fw, R.y + 0.02));
      float band = 1.0 - smoothstep(0.045, 0.045 + fw * 1.5, abs(R.y - 0.09));
      env += vec3(1.0, 0.97, 0.9) * band * keep * 0.7;
      col = env * base * mix(0.5, 1.0, L);
      float sd = dot(R, uSunDir);
      float sfw = max(fwidth(sd), 1e-4);
      col += vec3(1.0, 0.95, 0.85) * smoothstep(0.975 - sfw, 0.975 + sfw, sd) * L * keep * 0.8;
    } else {
      vec3 S = normalize(uSunDir + vec3(0.0, 0.7, 0.0));
      float sd = dot(R, S);
      float sfw = max(fwidth(sd), 1e-4);
      float hi = smoothstep(0.93 - sfw, 0.93 + sfw, sd) * clamp(0.04 / sfw, 0.0, 1.0);
      col += base * uSkyMid * 0.35 * smoothstep(0.1, 0.9, R.y);
      col = mix(col, vec3(0.97, 0.93, 0.88), hi * mix(0.35, 0.8, L));
    }
  }
  if ((HAS(1) && mt == 1)) {
    // Canopy palette over the probe's light response: deep blue-green core (#1b3a2a), near-black
    // band on the far side (#10211d), sunlit clusters (#4f7d3a) only on the sun-facing upper shell.
    vec3 Lr = col * 4.0;
    float sunLit = smoothstep(0.35, 0.8, (Lr.r - uShadowTint.r) / max(uSunColor.r - uShadowTint.r, 0.05));
    float ndl = dot(N, uSunDir);
    vec3 cCore = vec3(0.0103, 0.0423, 0.0232);
    vec3 tintK = mix(vec3(1.0), clamp(vCol / cCore, 0.5, 1.8), 0.6);
    float v = 0.86 + jit * 0.3;
    vec3 core = cCore * tintK * v;
    vec3 band = vec3(0.0056, 0.0152, 0.0122) * tintK;
    vec3 sunC = vec3(0.078, 0.205, 0.042) * tintK * (1.02 + jit * 0.25);
    float farSide = max(smoothstep(-0.2, -0.55, ndl + jit * 0.35), smoothstep(-0.3, -0.8, N.y + jit * 0.25) * 0.2);
    float upper = smoothstep(0.05, 0.5, N.y + ndl * 0.3 + jit * 0.35);
    float clump = smoothstep(0.42, 0.62, vnoise(vWPos.xz * 0.55 + vWPos.y * 0.45) * 0.7 + (jit + 0.5) * 0.3);
    float litC = sunLit * upper * clump;
    vec3 c = mix(core, band, farSide);
    c += core * uSkyMid * 0.5 * max(N.y, 0.0) * (1.0 - litC);
    // Undersides seen from the road: clumpy variation + faint warm ground bounce, never a flat void.
    float under = smoothstep(-0.1, -0.7, N.y);
    c *= 1.0 + under * (clump * 0.6 - 0.1);
    c += vec3(0.012, 0.02, 0.008) * under * (0.5 + jit);
    c = mix(c, sunC, litC);
    c = mix(c, vec3(0.12, 0.25, 0.055), leafHi * litC * 0.45);
    if (leafTone >= 0.0) {
      // Painted leaves: 3-4 tones per leaf (dark core, shaded half, lit half, sunlit edge), with a
      // little hue drift per leaf. Shade + sun response stays from the canopy model above.
      c *= mix(0.5, 1.45, leafTone) * (0.9 + 0.22 * leafVar);
      c = mix(c, sunC * vec3(1.18, 1.12, 0.9), litC * smoothstep(0.62, 0.92, leafTone) * 0.55);
      c = mix(c, c * vec3(1.05, 1.1, 0.72), (leafVar - 0.5) * 0.35);
    }
    col = c;
  }
  col = applyFog(col, vWPos);
  writeOut(col, N, mask);
}
`,ze=new Map;function Be(e,t,n){return new _e({glslVersion:u,uniforms:{...O,uId:{value:e},uMask:{value:t},...n},vertexShader:Le,fragmentShader:Re,vertexColors:!0,alphaToCoverage:!0})}function k(e,t=1,n=0,r=0){let i=`${e}|${t}|${n}|${r>>>0}`,a=ze.get(i);return a||(a=new _e({glslVersion:u,uniforms:{...O,uId:{value:e},uMask:{value:t}},vertexShader:Le,fragmentShader:Re,defines:r?{MT_MASK_V:`0x${(r>>>0).toString(16)}u`}:{},vertexColors:!0,side:n,alphaToCoverage:!0}),a.userData.uber={id:e,mask:t,side:n},ze.set(i,a)),a}function Ve(e){let t=e.attributes.aMat;if(!t)return 4294967295;let n=0;for(let e=0;e<t.count;e++)n|=1<<Math.round(t.getX(e));return n>>>0}function He(e,t){let n=new Map;e.traverse(e=>{let r=e;if(!r.isMesh)return;let i=r.material;if(!i?.userData?.uber||i.defines?.MT_MASK_V)return;let a=n.get(i)??{bits:0,meshes:[]};a.bits|=Ve(r.geometry);for(let e of t?.(r)??[])a.bits|=Ve(e);a.meshes.push(r),n.set(i,a)});for(let[e,t]of n){let{id:n,mask:r,side:i}=e.userData.uber;t.bits&2228224&&(t.bits|=2);let a=k(n,r,i,t.bits|1);for(let e of t.meshes)e.material=a}return n.size}function Ue(){return new _e({glslVersion:u,side:2,uniforms:{uLeafTex:O.uLeafTex},vertexShader:`
      in float aMat;
      out vec2 vUv; flat out int vMat;
      void main(){
        mat4 m = modelMatrix;
      #ifdef USE_INSTANCING
        m = modelMatrix * instanceMatrix;
      #endif
        vUv = uv; vMat = int(aMat + 0.5);
        gl_Position = projectionMatrix * viewMatrix * m * vec4(position, 1.0);
        if (vMat == 21) gl_Position = vec4(2.0, 2.0, 2.0, 1.0); // fringe cards: no shadow, clipped
      }`,fragmentShader:`
      uniform sampler2D uLeafTex;
      in vec2 vUv; flat in int vMat;
      layout(location = 0) out vec4 o;
      void main(){
        if (vMat == 17 && texture(uLeafTex, vUv).a < 0.5) discard;
        if (vMat == 28 && vUv.y > 0.5) discard; // spoke motion-blur disc casts no shadow
        o = vec4(1.0);
      }`})}function We(){return new _e({glslVersion:u,uniforms:{...O,uId:{value:0},uMask:{value:0}},side:1,depthWrite:!1,vertexShader:`
      out vec3 vWPos;
      void main(){ vec4 wp = modelMatrix * vec4(position, 1.0); vWPos = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }`,fragmentShader:`
      ${Pe}
      ${Fe}
      in vec3 vWPos;
      void main(){
        vec3 dir = normalize(vWPos - cameraPosition);
        vec3 col = skyColor(dir);
        // Thin cirrus wisps high up.
        float h = max(dir.y, 0.02);
        vec2 p = dir.xz / h * 0.6;
        float w = fbm2(p * vec2(0.5, 2.6) + vec2(uTime * 0.004, 0.0));
        float wisp = smoothstep(0.6, 0.8, w) * smoothstep(0.12, 0.3, dir.y) * (1.0 - smoothstep(0.55, 0.95, dir.y));
        col = mix(col, uWisp, wisp * 0.5);
        float cd = dot(dir, uSkySun);
        if (cd > 0.85) {
          if (uNight > 0.5) {
            // Large cinematic full moon!
            // Detailed lunar crater/maria texture
            float lunarNoise = 0.82 + 0.24 * vnoise(dir.xy * 85.0 + dir.z * 55.0) - 0.16 * vnoise(dir.xy * 28.0);
            float moonDisc = smoothstep(0.9962, 0.9967, cd);
            float moonHalo = pow(max(cd, 0.0), 450.0) * 0.65 + pow(max(cd, 0.0), 40.0) * 0.16 + pow(max(cd, 0.0), 8.0) * 0.03;
            col += uSunDisk * (moonDisc * lunarNoise * 1.1 + moonHalo);
          } else {
            // Sun disk with soft halo
            float disk = smoothstep(0.99972, 0.99982, cd);
            col += uSunDisk * (disk + pow(cd, 1400.0) * 0.45 + pow(cd, 160.0) * 0.1);
          }
        }
        if (uStars > 0.0 && dir.y > 0.02) {
          // Soft painted stars (twinkling slowly across the night sky)
          vec2 sp = dir.xz / (1.0 + dir.y) * 85.0;
          vec2 ci = floor(sp);
          float hs = hash12(ci);
          vec2 off = vec2(hash12(ci + 3.1), hash12(ci + 7.7)) * 0.6 + 0.2;
          float d = length(fract(sp) - off);
          float tw = 0.65 + 0.35 * sin(uTime * (0.8 + hs * 2.5) + hs * 40.0);
          float star = step(0.92, hs) * (1.0 - smoothstep(0.02, 0.12 + 0.06 * fract(hs * 17.0), d)) * tw;
          col += vec3(0.88, 0.94, 1.0) * star * uStars * smoothstep(0.03, 0.25, dir.y) * (1.0 - wisp * 0.7);
        }
        gColor = vec4(col, 1.0);
        gNormal = vec4(0.5, 0.5, 0.0, 0.0);
      }`})}function Ge(){return new _e({glslVersion:u,uniforms:{...O,uId:{value:0},uMask:{value:0}},vertexShader:`
      in float aH;
      in vec3 aLobe;
      out vec3 vWPos; out vec3 vN; out vec3 vL; out float vH;
      void main(){
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWPos = wp.xyz; vN = normalize(mat3(modelMatrix) * normal); vH = aH;
        vL = mat3(modelMatrix) * (position - aLobe);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,fragmentShader:`
      ${Pe}
      ${Fe}
      in vec3 vWPos; in vec3 vN; in vec3 vL; in float vH;
      void main(){
        // Per-lobe shading: each puff is lit like its own ball, blended with the merged normal.
        vec3 N = normalize(mix(normalize(vN), normalize(vL), 0.55));
        float n = vnoise3(vWPos * 0.02) * 0.6 + vnoise3(vWPos * 0.06) * 0.4;
        float t = dot(N, uSkySun) * 0.5 + 0.5 + (n - 0.5) * 0.3 + (vH - 0.4) * 0.25;
        float lit = smoothstep(0.5, 0.54, t);
        float mid = smoothstep(0.3, 0.34, t);
        vec3 cTop = uCloudTop, cMid = uCloudMid, cLow = uCloudLow;
        // Underside (facing down or low in the cloud) always sits in the cool tone.
        float under = smoothstep(0.15, -0.35, N.y) * (1.0 - smoothstep(0.1, 0.35, vH));
        vec3 col = mix(cLow, cMid, mid);
        col = mix(col, cTop, lit);
        col = mix(col, cLow, under * 0.85);
        vec3 V = normalize(cameraPosition - vWPos);
        if (uCloudK.z > 0.0) {
          // Low sun: undersides and low flanks catch warm light, strongest on the sunward side.
          float sAz = dot(normalize(-V.xz + 1e-5), normalize(uSkySun.xz + 1e-5)) * 0.5 + 0.5;
          float low = clamp(under + (1.0 - smoothstep(0.0, 0.55, vH)) * 0.6, 0.0, 1.0);
          col = mix(col, uCloudUnder, uCloudK.z * low * (0.3 + 0.7 * sAz));
        }
        float fr = pow(1.0 - abs(dot(N, V)), 3.0);
        float sunSide = smoothstep(-0.2, 0.4, dot(N, uSkySun));
        col = mix(col, uCloudRim, fr * uCloudK.x * sunSide);   // #fff6e0 rim
        // Backlit silver lining toward a low sun.
        col += uCloudRim * fr * uCloudK.y * pow(max(dot(-V, uSkySun), 0.0), 3.0);
        vec3 dir = -V;
        col = mix(col, skyColor(dir), smoothstep(0.1, 0.0, dir.y) * 0.7 + 0.05);
        gColor = vec4(col, 1.0);
        gNormal = vec4(0.5, 0.5, 0.0, 0.0);
      }`})}var Ke={uRefl:{value:null},uReflMat:{value:new c},uReflOn:{value:0},uReflY:{value:-.25}};function qe(){return new _e({glslVersion:u,uniforms:{...O,...Ke,uId:{value:2},uMask:{value:0}},vertexShader:`
      in float aP;
      out vec3 vWPos; out vec2 vUv; out float vP;
      void main(){
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWPos = wp.xyz; vUv = uv; vP = aP;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,fragmentShader:`
      ${Pe}
      ${Fe}
      uniform sampler2D uRefl; uniform mat4 uReflMat; uniform float uReflOn; uniform float uReflY;
      in vec3 vWPos; in vec2 vUv; in float vP;
      // Young rice tuft in its vertical sheet: three tapering blades from one root, the centre
      // upright and two leaning out (V). x = lateral metres from the root, y = height above water.
      float riceBlades(float x, float y, float H, vec2 rnd, float aa){
        float cov = 0.0;
        for (int k = 0; k < 3; k++){
          float fk = float(k) - 1.0;
          float bh = H * (k == 1 ? 1.0 : 0.72 + 0.2 * rnd.x);
          float t = y / bh;
          if (t > 1.0) continue;
          float lean = fk * (0.36 + 0.24 * rnd.y) + (rnd.x - 0.5) * 0.14;
          float xc = lean * bh * t * (0.5 + 0.5 * t);
          float w = 0.013 * (1.0 - t * 0.88) + 0.0012;
          float we = max(w, aa);
          cov = max(cov, clamp((we - abs(x - xc)) / aa + 0.5, 0.0, 1.0) * (w / we));
        }
        return cov;
      }
      // Walk one family of vertical tuft sheets (planes a = (k+.5)*pa, tufts every pb along b) from
      // the camera side of the view ray down to the water. Returns (coverage, mean height fraction).
      vec2 riceSheet(float a0, float b0, float Da, float Db, float vy, float tmax, float H, float pa, float pb, bool swap, float aa){
        if (abs(Da) < 1e-4) return vec2(0.0);
        float s = sign(Da);
        float a1 = a0 + Da * tmax;
        float k = s > 0.0 ? floor(a1 / pa - 0.5) : ceil(a1 / pa - 0.5);
        float acc = 0.0, yf = 0.0;
        for (int n = 0; n < 8; n++){
          float t = ((k + 0.5) * pa - a0) / Da;
          if (t < 0.0) break;
          float y = t * vy;
          float b = b0 + Db * t;
          float i = floor(b / pb);
          vec2 cell = swap ? vec2(k, i) : vec2(i, k);
          vec2 rnd = vec2(hash12(cell + 7.3), hash12(cell + 19.1));
          float h = H * (0.85 + 0.3 * rnd.y);
          float cov = hash12(cell + 3.7) < 0.1 ? 0.0 : riceBlades(b - (i + 0.5) * pb, y, h, rnd, aa);
          float w = (1.0 - acc) * cov;
          yf += w * min(y / h, 1.0);
          acc += w;
          if (acc > 0.97) break;
          k -= s;
        }
        return vec2(acc, acc > 0.0 ? yf / acc : 0.0);
      }
      void main(){
        vec3 V = normalize(vWPos - cameraPosition);
        vec2 q = vWPos.xz;
        float r1 = vnoise(q * 1.1 + vec2(uTime * 0.3, uTime * 0.2));
        float r2 = vnoise(q * 2.7 - vec2(uTime * 0.25, -uTime * 0.33));
        vec2 rip = vec2(r1 - 0.5, r2 - 0.5);
        vec3 Nw = normalize(vec3(rip.x * 0.07, 1.0, rip.y * 0.07));
        vec3 R = reflect(V, Nw);
        R.y = max(R.y, 0.015);
        vec3 refl = skyColor(normalize(R));
        if (uReflOn > 0.5) {
          // Planar mirror of the real scene (sky, clouds, trees, poles, fences), ripple-distorted.
          vec4 pc = uReflMat * vec4(vWPos.x, uReflY, vWPos.z, 1.0);
          vec2 uv = pc.xy / pc.w + rip * 0.012;
          refl = texture(uRefl, clamp(uv, 0.001, 0.999)).rgb;
        }
        float cosT = max(-V.y, 0.0);
        float fres = 0.3 + 0.7 * pow(1.0 - cosT, 5.0);
        vec3 mud = vec3(0.05, 0.065, 0.04);
        vec3 col = mix(mud, refl * 0.9, fres);
        // Sparkle on ripple crests.
        float sp = smoothstep(0.86, 0.95, vnoise(q * 6.0 + uTime * 0.8)) * fres;
        col += vec3(1.0, 0.95, 0.8) * sp * 0.25;
        if (uGlint > 0.0) {
          // Low sun on the water: a bright streak toward the sun, broken up by the ripples.
          float g = max(dot(R, uSkySun), 0.0);
          float br = 0.3 + 1.7 * smoothstep(0.5, 0.85, vnoise(q * vec2(2.2, 7.0) + vec2(uTime * 0.7, 0.0)));
          col += uSunDisk * (pow(g, 90.0) * br + pow(g, 12.0) * 0.04) * uGlint;
        }

        // Young rice on a 0.6 x 0.45 m grid: V-shaped three-blade tufts drawn as crossed vertical
        // sheets intersected along the view ray (real parallax, no geometry). The rows nearest the
        // road (u > -10.8) are 3D instanced rice; far away the tufts resolve into an average carpet.
        float growth = vP;
        float dist = length(vWPos - cameraPosition);
        float sv = shadowVis(vWPos, vec3(0.0, 1.0, 0.0));
        float H = 0.2 + 0.24 * growth;
        float farK = smoothstep(32.0, 70.0, dist);
        float drawn = step(vUv.x, -10.8);
        // uv.x = u = x - roadX(z): slope of that shear, so world ray offsets map into paddy uv.
        float e = vUv.x - vWPos.x;
        vec2 dzs = vec2(dFdx(vWPos.z), dFdy(vWPos.z));
        float sl = dot(vec2(dFdx(e), dFdy(e)), dzs) / max(dot(dzs, dzs), 1e-6);
        vec2 riceR = vec2(0.0);
        if (drawn > 0.5 && farK < 1.0) {
          vec2 D = vec2(-V.x - sl * V.z, -V.z);
          vec2 Dn = normalize(D + 1e-5);
          float vy = max(-V.y, 0.02);
          float tmax = H * 1.15 / vy;
          float aa = max(dist * 0.0011, 0.002);
          vec2 ra = riceSheet(vUv.y, vUv.x, D.y, D.x, vy, tmax, H, 0.45, 0.6, false, aa);
          vec2 rb = riceSheet(vUv.x, vUv.y, D.x, D.y, vy, tmax, H, 0.6, 0.45, true, aa);
          float cA = ra.x * smoothstep(0.2, 0.5, abs(Dn.y));
          float cB = rb.x * smoothstep(0.2, 0.5, abs(Dn.x));
          riceR = vec2(1.0 - (1.0 - cA) * (1.0 - cB), (cA * ra.y + cB * rb.y) / max(cA + cB, 1e-4));
        }
        float cov = mix(riceR.x, (0.32 + 0.3 * growth) * drawn, farK);
        float yf = mix(riceR.y, 0.55, farK);
        vec3 riceCol = mix(vec3(0.028, 0.072, 0.016), vec3(0.05, 0.147, 0.023), smoothstep(0.0, 0.4, yf));
        riceCol = mix(riceCol, vec3(0.2, 0.34, 0.075), smoothstep(0.55, 1.0, yf));
        riceCol *= (0.9 + 0.2 * vnoise(vWPos.xz * 0.9)) * mix(uShadowTint * 1.1, vec3(1.0, 0.97, 0.9), sv);
        col = mix(col * mix(0.75, 1.0, sv), riceCol, clamp(cov, 0.0, 0.95));
        col = applyFog(col, vWPos);
        writeOut(col, vec3(0.0, 1.0, 0.0), 0.0);
      }`})}function Je(){return new _e({glslVersion:u,uniforms:{...O,uId:{value:1},uMask:{value:.3}},vertexShader:`
      out vec3 vWPos; out vec2 vUv;
      void main(){
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWPos = wp.xyz; vUv = uv;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,fragmentShader:`
      ${Pe}
      ${Fe}
      in vec3 vWPos; in vec2 vUv;
      vec2 cell(vec2 p){
        vec2 i = floor(p), f = fract(p); float d = 8.0, d2 = 8.0; float h = 0.0;
        for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
          vec2 g = vec2(float(x), float(y));
          vec2 o = vec2(hash12(i + g), hash12(i + g + 17.3));
          float dd = length(g + o - f);
          if (dd < d) { d2 = d; d = dd; h = hash12(i + g + 41.7); } else if (dd < d2) d2 = dd;
        }
        return vec2(d2 - d, h);
      }
      void main(){
        float u = vUv.x, v = vUv.y;
        float n = fbm2(vec2(u * 0.9, v * 0.3));
        float jag = (vnoise(vec2(v * 0.55, 3.0 + sign(u) * 9.0)) - 0.5) * 0.55 + (vnoise(vec2(v * 2.6, 7.0 + sign(u) * 5.0)) - 0.5) * 0.22;
        float au = abs(u) + jag;
        // Weathered midnight damp asphalt: dark charcoal with cold sheen
        float lf = fbm2(vec2(u * 0.18, v * 0.045) + 3.7);
        vec3 asph = mix(vec3(0.048, 0.054, 0.062), vec3(0.075, 0.082, 0.088), smoothstep(0.3, 0.7, lf));
        asph *= 0.88 + 0.24 * n;
        float sp = vnoise(vec2(u, v) * 6.0) * 0.6 + vnoise(vec2(u, v) * 17.0) * 0.4;
        asph *= 0.92 + 0.12 * sp;
        // Worn tyre tracks (faded, wavering)
        float tw = (vnoise(vec2(v * 0.08, 1.0)) - 0.5) * 0.3;
        float track = smoothstep(0.22, 0.0, abs(abs(u + tw) - 0.95)) * (0.6 + 0.4 * vnoise(vec2(u * 3.0, v * 0.5)));
        asph *= 1.0 + 0.07 * track;
        // Repair patches: dark damp tar seams
        vec2 pc = cell(vec2(u * 0.7, v * 0.2) + vec2(vnoise(vec2(v * 0.3, u)) * 0.6, 0.0));
        float patchy = step(0.8, pc.y) * step(abs(u), 2.2) * smoothstep(0.02, 0.12, pc.x);
        asph *= mix(1.0, pc.y > 0.9 ? 0.85 : 1.08, patchy);
        float seam = (1.0 - smoothstep(0.0, 0.025, pc.x)) * step(0.8, pc.y) * step(abs(u), 2.2);
        asph *= 1.0 - seam * 0.25;
        // Cracks: prominent weathered cracks with damp dark moss in the fissures
        float cr = abs(vnoise(vec2(u * 2.4, v * 0.8) * 2.2) - 0.5);
        float edgeK = smoothstep(1.0, 2.3, abs(u));
        float crack = (1.0 - smoothstep(0.0, 0.012 + 0.012 * edgeK, cr)) * step(0.58 - 0.32 * edgeK, vnoise(vec2(u, v) * 0.35 + 4.0));
        asph *= 1.0 - crack * 0.6;
        // Fallen damp leaves / dark debris scattered near edges
        float debris = step(0.82, vnoise(vec2(u * 8.0, v * 3.5))) * smoothstep(1.4, 2.3, abs(u));
        asph = mix(asph, vec3(0.03, 0.025, 0.018), debris * 0.7);
        // Broken edge line remnant
        float line = (1.0 - smoothstep(0.05, 0.08, abs(abs(u) - 2.05))) * step(0.55, vnoise(vec2(v * 0.25, sign(u) * 3.0)));
        line *= 0.12 * (0.4 + 0.6 * vnoise(vec2(u * 20.0, v * 3.0))) * step(0.55, vnoise(vec2(v * 1.7, u)));
        asph = mix(asph, vec3(0.42, 0.44, 0.42), line);
        // Damp verge margins
        vec3 dirt = mix(vec3(0.08, 0.07, 0.05), vec3(0.12, 0.11, 0.08), vnoise(vec2(u, v) * 1.8));
        vec3 grass = mix(vec3(0.02, 0.045, 0.02), vec3(0.035, 0.065, 0.03), fbm2(vWPos.xz * 0.11));
        vec3 base = asph;
        base = mix(base, dirt, smoothstep(2.3, 2.45, au));
        base = mix(base, grass, smoothstep(2.6, 2.95, au + (n - 0.5) * 0.4));
        vec3 N = vec3(0.0, 1.0, 0.0);
        vec3 col = toon(base, N, vWPos, 0.0, 1.0, 0.0, 0.03);
        if (uNight > 0.0) {
          // Roadside pole lamps: sporadic, broken, dying, flickering amber with pockets of darkness!
          float poleIndex = floor((vWPos.z + 52.0) / 40.0);
          float lampHash = fract(sin(poleIndex * 127.1) * 43758.5453);
          float dz = mod(vWPos.z + 32.0, 40.0) - 20.0, du = u - 2.8;
          // ~35% lamps are burned out entirely (pockets of darkness!)
          // ~25% flicker erratically like failing sodium bulbs
          // remainder give weak dying warm amber pools
          float flick = (lampHash > 0.35 && lampHash < 0.62) ?
            (0.5 + 0.5 * sin(uTime * 28.0 + poleIndex * 13.0) * step(0.2, fract(sin(uTime * 41.0 + poleIndex) * 53.0))) : 1.0;
          float lampActive = step(0.35, lampHash) * flick;
          vec3 lampCol = lampHash > 0.75 ? vec3(1.0, 0.65, 0.28) : vec3(0.9, 0.48, 0.18);
          gEmit = base * lampCol * exp(-(du * du * 0.45 + dz * dz * 0.14)) * uNight * 2.8 * lampActive;

          // Bike headlight beam projected onto the asphalt ahead:
          vec2 toSurf = vWPos.xz - uBikePos.xz;
          float bikeYaw = uBikePos.y;
          vec2 dirFwd = vec2(-sin(bikeYaw), -cos(bikeYaw));
          vec2 dirSide = vec2(dirFwd.y, -dirFwd.x);
          float distAhead = dot(toSurf, dirFwd);
          float distSide = dot(toSurf, dirSide);
          if (distAhead > 0.4 && distAhead < 24.0) {
            float coneW = 0.5 + distAhead * 0.26;
            float beam = smoothstep(coneW, 0.0, abs(distSide)) * smoothstep(24.0, 3.5, distAhead) * smoothstep(0.3, 1.2, distAhead);
            gEmit += base * vec3(1.15, 1.1, 1.0) * beam * 1.8;
          }
        }
        col = applyFog(col, vWPos);
        writeOut(col, N, uMask * smoothstep(2.6, 3.2, au));
      }`})}var Ye=`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Xe=class{renderer;mrt;composer;ink;grade;smaa;sharpen;bloom;prof=null;wrapped=!1;sceneCalls=0;sceneTris=0;get msaa(){return this.mrt.samples}setMsaa(e){this.mrt.samples!==e&&(this.mrt.samples=e,this.mrt.dispose(),this.smaa.enabled=e===0)}constructor(e,t,a,o){this.renderer=e;let s=e.getPixelRatio(),c=Math.floor(t*s),l=Math.floor(a*s);this.mrt=new ie(c,l,{count:2,type:m,depthTexture:new n(c,l,r),samples:o.msaa??4}),this.mrt.textures[0].name=`color`,this.mrt.textures[1].name=`normal`,this.composer=new Se(e),this.composer.setPixelRatio(s),this.composer.setSize(t,a),this.ink=new Te({uniforms:{tDiffuse:{value:null},tColor:{value:null},tNormal:{value:null},tDepth:{value:null},uRes:{value:new i(c,l)},uNear:{value:.15},uFar:{value:4200},uWidth:{value:Math.max(1,l/1080)*1.35},uKuwa:{value:+!!o.kuwahara},uInk:{value:new T(`#1c1418`)}},vertexShader:Ye,fragmentShader:`
        uniform sampler2D tColor, tNormal, tDepth;
        uniform vec2 uRes; uniform float uNear, uFar, uWidth, uKuwa; uniform vec3 uInk;
        varying vec2 vUv;
        float linz(float d){ float z = d * 2.0 - 1.0; return 2.0 * uNear * uFar / (uFar + uNear - z * (uFar - uNear)); }
        float lum(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }

        // 4-sector Kuwahara (radius 2): flattens texture into gouache-like patches, keeps edges.
        vec4 kuwahara(vec2 uv){
          vec2 px = 1.0 / uRes;
          vec3 m[4]; float s[4];
          for (int k = 0; k < 4; k++){
            vec2 dir = vec2(k == 1 || k == 2 ? -1.0 : 1.0, k >= 2 ? -1.0 : 1.0);
            vec3 sum = vec3(0.0); float sq = 0.0;
            for (int j = 0; j <= 2; j++) for (int i = 0; i <= 2; i++){
              vec3 c = texture2D(tColor, uv + vec2(float(i), float(j)) * dir * px).rgb;
              sum += c; float l = lum(c); sq += l * l;
            }
            vec3 mean = sum / 9.0; float lm = lum(mean);
            m[k] = mean; s[k] = sq / 9.0 - lm * lm;
          }
          vec3 best = m[0]; float bs = s[0];
          for (int k = 1; k < 4; k++) if (s[k] < bs) { bs = s[k]; best = m[k]; }
          // Even the calmest sector is busy: this is real detail (lattice, leaves, tiles), keep it.
          return vec4(best, bs);
        }

        void main(){
          vec2 px = uWidth / uRes;
          vec3 col = texture2D(tColor, vUv).rgb;
          // Eye features (irises, catch-lights, lashes, brows, glasses) stay crisp: no paint filter.
          bool crisp = abs(texture2D(tNormal, vUv).z * 32.0 - 19.0) < 0.5;
          float dC = linz(texture2D(tDepth, vUv).r);
          float iC = 1.0 / dC;
          vec4 nC = texture2D(tNormal, vUv);
          float eD = 0.0, eN = 0.0, eI = 0.0, mask = max(nC.a, 0.0);
          vec2 offs[4];
          offs[0] = vec2(1.0, 0.0); offs[1] = vec2(0.0, 1.0); offs[2] = vec2(0.7071, 0.7071); offs[3] = vec2(0.7071, -0.7071);
          for (int i = 0; i < 4; i++){
            vec2 o = offs[i] * px;
            vec4 n1 = texture2D(tNormal, vUv + o), n2 = texture2D(tNormal, vUv - o);
            // Excluded surfaces (mask < 0: grass, leaf cards, motes) never ink or induce ink.
            if (n1.a < 0.0 || n2.a < 0.0) continue;
            float i1 = 1.0 / linz(texture2D(tDepth, vUv + o).r);
            float i2 = 1.0 / linz(texture2D(tDepth, vUv - o).r);
            // Laplacian of 1/z is zero on planes: only creases and silhouettes light up.
            eD = max(eD, abs(i1 + i2 - 2.0 * iC) / iC);
            eN = max(eN, length(n1.xy - nC.xy) + length(n2.xy - nC.xy));
            eI = max(eI, step(0.01, abs(n1.z - nC.z)) + step(0.01, abs(n2.z - nC.z)));
            mask = max(mask, max(n1.a, n2.a));
          }
          if (nC.a < 0.0) mask = 0.0;
          float e = max(smoothstep(0.05, 0.16, eD), smoothstep(0.55, 1.0, eN));
          e = max(e, min(eI, 1.0));
          // Paint filter: a light gouache flattening on calm mid/far surfaces only. It stays off
          // near the camera, on ink edges and on fine detail (it boils frame to frame there).
          if (uKuwa > 0.5 && !crisp) {
            float wK = 0.5 * smoothstep(6.0, 40.0, dC) * (1.0 - clamp(max(e, min(eI, 1.0)) * 1.5, 0.0, 1.0));
            if (wK > 0.02) {
              vec4 k = kuwahara(vUv);
              wK *= 1.0 - smoothstep(0.0015, 0.012, k.a);
              col = mix(col, k.rgb, wK);
            }
          }
          float fade = 1.0 - smoothstep(60.0, 420.0, dC) * 0.75;
          e *= clamp(mask, 0.0, 1.0) * fade;
          // The rider (body 13, hair 14, skin 18, eye 19) is inked in warm dark brown.
          float idC = floor(nC.z * 32.0 + 0.5);
          float chr = (idC == 13.0 || idC == 14.0 || idC == 18.0 || idC == 19.0) ? 1.0 : 0.0;
          vec3 inkCol = mix(mix(col * 0.22, uInk, 0.55), vec3(0.042, 0.023, 0.016), chr * 0.85);
          col = mix(col, inkCol, clamp(e, 0.0, 1.0) * 0.92);
          gl_FragColor = vec4(col, 1.0);
        }`}),this.ink.uniforms.tColor.value=this.mrt.textures[0],this.ink.uniforms.tNormal.value=this.mrt.textures[1],this.ink.uniforms.tDepth.value=this.mrt.depthTexture,this.composer.addPass(this.ink),this.bloom=new Ce(new i(t/2,a/2),.28,.5,1),this.composer.addPass(this.bloom),this.grade=new Te({uniforms:{tDiffuse:{value:null},uRes:{value:new i(c,l)},uTime:{value:0}},vertexShader:Ye,fragmentShader:`
        uniform sampler2D tDiffuse; uniform vec2 uRes; uniform float uTime;
        uniform vec3 uGradeMul; uniform float uSat;
        varying vec2 vUv;
        float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
        float vn(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(h12(i), h12(i + vec2(1, 0)), u.x), mix(h12(i + vec2(0, 1)), h12(i + vec2(1, 1)), u.x), u.y); }
        vec3 toSRGB(vec3 c){ c = max(c, 0.0); return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c)); }
        void main(){
          vec3 c = texture2D(tDiffuse, vUv).rgb * uGradeMul;
          float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
          c = mix(vec3(l), c, uSat);
          // Split tone: cool teal shadows, warm (#fff1d8) highlight lift.
          c *= mix(vec3(0.96, 1.0, 1.04), vec3(1.0, 0.945, 0.85) * 1.04, smoothstep(0.08, 0.75, l));
          // Soft shoulder.
          c = c / (1.0 + max(c - 0.85, 0.0) * 0.8);
          vec3 s = toSRGB(c);
          // Vignette.
          vec2 q = vUv - 0.5; q.x *= uRes.x / uRes.y;
          s *= mix(1.0, 0.8, smoothstep(0.45, 1.05, length(q)));
          // Paper / brush grain (screen space, very subtle).
          vec2 fc = gl_FragCoord.xy;
          float paper = vn(fc * 0.35) * 0.5 + vn(fc * 0.09 + 7.0) * 0.5;
          float fib = vn(vec2(fc.x * 0.02, fc.y * 0.6));
          s *= 0.975 + paper * 0.04 + fib * 0.012;
          s += (h12(fc) - 0.5) * 0.01;
          gl_FragColor = vec4(clamp(s, 0.0, 1.0), 1.0);
        }`}),Object.assign(this.grade.uniforms,Me),this.composer.addPass(this.grade),this.smaa=new Ee,this.smaa.enabled=!(o.msaa??4),this.composer.addPass(this.smaa),this.sharpen=new Te({uniforms:{tDiffuse:{value:null},uTexel:{value:new i(1/c,1/l)},uAmount:{value:.45}},vertexShader:Ye,fragmentShader:`
        uniform sampler2D tDiffuse; uniform vec2 uTexel; uniform float uAmount;
        varying vec2 vUv;
        void main(){
          vec3 c = texture2D(tDiffuse, vUv).rgb;
          vec3 n = texture2D(tDiffuse, vUv + vec2(0.0, uTexel.y)).rgb;
          vec3 s = texture2D(tDiffuse, vUv - vec2(0.0, uTexel.y)).rgb;
          vec3 e = texture2D(tDiffuse, vUv + vec2(uTexel.x, 0.0)).rgb;
          vec3 w = texture2D(tDiffuse, vUv - vec2(uTexel.x, 0.0)).rgb;
          vec3 mn = min(c, min(min(n, s), min(e, w))), mx = max(c, max(max(n, s), max(e, w)));
          // Less sharpening where local contrast is already high (edges), more on soft texture.
          vec3 amp = sqrt(clamp(min(mn, 1.0 - mx) / max(mx, 1e-4), 0.0, 1.0));
          vec3 wgt = -amp * mix(0.125, 0.2, uAmount);
          vec3 o = (c + (n + s + e + w) * wgt) / (1.0 + 4.0 * wgt);
          gl_FragColor = vec4(clamp(o, 0.0, 1.0), 1.0);
        }`}),this.composer.addPass(this.sharpen)}warmSmaa(){let e=this.smaa.enabled;this.smaa.enabled=!0,this.composer.render(),this.smaa.enabled=e}setNear(e){this.ink.uniforms.uNear.value=e}setSize(e,t){let n=this.renderer.getPixelRatio(),r=Math.floor(e*n),i=Math.floor(t*n);this.mrt.setSize(r,i),this.composer.setSize(e,t),this.ink.uniforms.uRes.value.set(r,i),this.ink.uniforms.uWidth.value=Math.max(1,i/1080)*1.35,this.grade.uniforms.uRes.value.set(r,i),this.sharpen.uniforms.uTexel.value.set(1/r,1/i)}render(e,t,n){let r=this.renderer.info.render.calls,i=this.renderer.info.render.triangles,a=this.prof?.on?this.prof:null;if(a&&!this.wrapped){this.wrapped=!0;let e=[`ink+kuwahara`,`bloom`,`grade`,`smaa`,`sharpen`];this.composer.passes.forEach((t,n)=>{let r=t.render.bind(t);t.render=(...t)=>{a.begin(e[n]??`pass${n}`,this.renderer),r(...t),a.end(e[n]??`pass${n}`,this.renderer)}})}a?.begin(`scene`,this.renderer);let o=this.renderer;o.setRenderTarget(this.mrt),o.clear(),O.uDither.value=+(this.mrt.samples===0),o.render(e,t),O.uDither.value=0,a?.end(`scene`,this.renderer),this.sceneCalls=this.renderer.info.render.calls-r,this.sceneTris=this.renderer.info.render.triangles-i,this.renderer.setRenderTarget(null),this.grade.uniforms.uTime.value=n,this.composer.render()}};function Ze(e,...t){e.traverse(e=>{for(let n of t)e.layers.enable(n)})}var Qe=class{rt;cam;mat=Ue();size;half;dir=null;bias=new c().set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1);constructor(e=2048,t=55){this.size=e,this.half=t,this.rt=new ie(e,e,{depthTexture:new n(e,e,r),type:xe}),this.rt.depthTexture.minFilter=ee,this.rt.depthTexture.magFilter=ee,this.cam=new re(-t,t,t,-t,1,320),this.cam.layers.set(1),O.uShadowMap.value=this.rt.depthTexture,O.uShadowTexel.value.set(1/e,1/e),O.uShadowRange.value=319,O.uShadowHalf.value=t}update(e,t,n){let r=this.dir??O.uSunDir.value,i=this.half*2/this.size,a=new c().lookAt(r,new p,new p(0,1,0)),o=a.clone().invert(),s=n.clone().applyMatrix4(o);s.x=Math.round(s.x/i)*i,s.y=Math.round(s.y/i)*i,s.applyMatrix4(a),this.cam.position.copy(s).addScaledVector(r,160),this.cam.up.set(0,1,0),this.cam.lookAt(s),this.cam.updateMatrixWorld(),this.cam.updateProjectionMatrix(),O.uShadowMat.value.copy(this.bias).multiply(this.cam.projectionMatrix).multiply(this.cam.matrixWorldInverse),O.uShadowCenter.value.copy(n),O.uShadowOn.value=1;let l=t.overrideMaterial;t.overrideMaterial=this.mat,e.setRenderTarget(this.rt),e.clear(),e.render(t,this.cam),t.overrideMaterial=l,e.setRenderTarget(null)}},$e=class{rt;cam=new de;tex=new c;normal=new p(0,1,0);constructor(e,t){this.rt=new ie(e,t,{type:m,count:2}),this.cam.layers.set(2),Ke.uRefl.value=this.rt.textures[0],Ke.uReflOn.value=1}setSize(e,t){this.rt.setSize(e,t)}every=2;tick=0;update(e,t,n,r){if(this.tick++%this.every!==0)return!1;let i=this.normal,a=new p(0,r,0);a.x=n.position.x,a.z=n.position.z;let o=new p().setFromMatrixPosition(n.matrixWorld),s=new p().subVectors(a,o);if(s.dot(i)>0)return!1;s.reflect(i).negate().add(a);let l=new c().extractRotation(n.matrixWorld),u=new p(0,0,-1).applyMatrix4(l).add(o),d=new p().subVectors(a,u).reflect(i).negate().add(a),f=this.cam;f.position.copy(s),f.up.set(0,1,0).applyMatrix4(l).reflect(i),f.lookAt(d),f.far=n.far,f.near=n.near,f.updateMatrixWorld(),f.projectionMatrix.copy(n.projectionMatrix),this.tex.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.tex.multiply(f.projectionMatrix).multiply(f.matrixWorldInverse),Ke.uReflMat.value.copy(this.tex),Ke.uReflY.value=r;let m=new ve().setFromNormalAndCoplanarPoint(i,a);m.applyMatrix4(f.matrixWorldInverse);let h=new oe(m.normal.x,m.normal.y,m.normal.z,m.constant),g=f.projectionMatrix.elements,_=new oe((Math.sign(h.x)+g[8])/g[0],(Math.sign(h.y)+g[9])/g[5],-1,(1+g[10])/g[14]);return h.multiplyScalar(2/h.dot(_)),g[2]=h.x,g[6]=h.y,g[10]=h.z+1-.003,g[14]=h.w,f.projectionMatrixInverse.copy(f.projectionMatrix).invert(),e.setRenderTarget(this.rt),e.clear(),O.uNoFringe.value=1,e.render(t,f),O.uNoFringe.value=0,e.setRenderTarget(null),!0}},et=3.6,tt=2.75,nt=Math.PI*2/640;function A(e){let t=nt*e;return 7*Math.sin(t)+3*Math.sin(3*t+1.3)+1.2*Math.sin(5*t+.4)}function rt(e){let t=nt*e;return nt*(7*Math.cos(t)+9*Math.cos(3*t+1.3)+6*Math.cos(5*t+.4))}function it(e){return Math.atan(rt(e))}function at(e){return Math.atan2(-1,-rt(e))}function ot(e){return Math.atan2(1,rt(e))}function j(e,t){if(e<3.4&&e>-4.6)return-.04;if(e<=-4.6)return-.3;let n=nt*t,r=(Math.sin(e*.23+n*13)+Math.sin(e*.08-n*21+1.7))*.12,i=Math.sin(n*3+e*.021)*.5+Math.sin(n*7-e*.034+2.1)*.35+Math.sin(n*17+e*.05+.6)*.2,a=ct(34,150,e)*(9+7*i);return r*ct(3.4,8,e)+a}function st(e,t,n=0){let r=nt*t;return(Math.sin(r*11+e*.3+n*1.7)*.5+Math.sin(r*29-e*.51+n*3.1)*.3+Math.sin(r*53+e*.9+n)*.2)*.5+.5}function ct(e,t,n){let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)}var M={plain:0,foliage:1,planks:2,roof:3,shoji:4,glass:5,grass:6,skin:7,cloth:8,bark:9,metal:10,ground:11,butterfly:12,stone:13,lantern:14,hair:15,guard:16,leafCard:17,mote:18,distant:19,flower:20,fringeCard:21,lacquer:22,sign:23,signGlow:24,plaster:25,glow:30,fire:31},N={sky:0,ground:1,water:2,berm:3,grass:4,rice:5,tree:6,house:7,pole:8,wire:9,fence:10,sign:11,bike:12,rider:13,hair:14,hills:15,flower:16,butterfly:17,skin:18,eye:19},lt=new T;function P(e,t,n=0,r=0){let i=e.attributes.position.count;if(!e.index){let t=new Uint32Array(i);for(let e=0;e<i;e++)t[e]=e;e.setIndex(new D(t,1))}for(let n of Object.keys(e.attributes))n!==`position`&&n!==`normal`&&n!==`uv`&&(n!==`color`||t!==null)&&e.deleteAttribute(n);if(e.attributes.normal||e.computeVertexNormals(),e.attributes.uv||e.setAttribute(`uv`,new D(new Float32Array(i*2),2)),t!==null){lt.set(t);let n=new Float32Array(i*3);for(let e=0;e<i;e++)n[e*3]=lt.r,n[e*3+1]=lt.g,n[e*3+2]=lt.b;e.setAttribute(`color`,new D(n,3))}return e.setAttribute(`aMat`,new D(new Float32Array(i).fill(n),1)),e.setAttribute(`aWind`,new D(new Float32Array(i).fill(r),1)),e.clearGroups(),e.morphAttributes={},e}function ut(e,t,n,r,i=2){let a=e.attributes.position,o=e.attributes.aWind;for(let e=0;e<a.count;e++){let s=Math.min(1,Math.max(0,(a.getY(e)-t)/(n-t)));o.setX(e,s**+i*r)}return e}var dt=new c,ft=new le,pt=new g,mt=new p,ht=new p;function F(e,t,n,r,i=0,a=0,o=0,s=1,c=s,l=s){return pt.set(i,a,o,`YXZ`),ft.setFromEuler(pt),dt.compose(mt.set(t,n,r),ft,ht.set(s,c,l)),e.applyMatrix4(dt),e}function I(e,t,n,r,i=0){return P(new me(e,t,n),r,i)}function gt(e,t,n,r,i=0){let a=new me(e,t,n),o=a.attributes.uv,s=a.attributes.normal;for(let r=0;r<o.count;r++){let i=Math.abs(s.getX(r)),a=Math.abs(s.getY(r)),c=i>.5?n:e,l=a>.5?n:t;o.setXY(r,o.getX(r)*c,o.getY(r)*l)}return P(a,r,i)}function L(e,t,n,r,i=0,a=8){return P(new y(e,t,n,a,1),r,i)}function _t(e,t,n=0,r=12,i=8){return P(new E(e,r,i),t,n)}var vt=new p(0,1,0),yt=new p;function R(e,t,n,r,i=0,a=6,o=n){yt.subVectors(t,e);let s=yt.length(),c=new y(o,n,s,a,1);return c.translate(0,s/2,0),ft.setFromUnitVectors(vt,yt.normalize()),dt.compose(e,ft,ht.set(1,1,1)),c.applyMatrix4(dt),P(c,r,i)}function bt(e,t,n,r,i,a=12){let o=[],s=new p,c=new p;for(let l=0;l<a;l++){let u=l/a,d=(l+1)/a;s.lerpVectors(e,t,u).y-=n*4*u*(1-u),c.lerpVectors(e,t,d).y-=n*4*d*(1-d),o.push(R(s.clone(),c.clone(),r,i,M.metal,4))}return o}function z(e){let t=Oe(e,!1);if(!t)throw Error(`mergeGeometries failed (attribute mismatch)`);for(let t of e)t.dispose();return t}function xt(e){let t=e.attributes.position;for(let e=0;e<t.count;e++)t.setX(e,t.getX(e)+A(t.getZ(e)));return e.computeVertexNormals(),e}function St(e,t,n,r){let i=new a(e,t);i.deleteAttribute(`uv`),i.deleteAttribute(`normal`),i=we(i);let o=i.attributes.position,s=new p;for(let t=0;t<o.count;t++){s.fromBufferAttribute(o,t);let i=Math.sin(s.x*1.7/e+r)*Math.sin(s.y*2.3/e+r*1.3)*Math.sin(s.z*1.9/e+r*.7),a=Math.sin(s.x*4.1/e+r*2.1)*Math.sin(s.z*3.7/e-r);s.multiplyScalar(1+n*(i*.7+a*.3)),o.setXYZ(t,s.x,s.y,s.z)}return i.computeVertexNormals(),i}function Ct(e,t,n,r=1){let i=e.attributes.position,a=e.attributes.normal,o=new p,s=new p;for(let e=0;e<i.count;e++)o.fromBufferAttribute(i,e).sub(t),o.y*=r,o.normalize(),s.fromBufferAttribute(a,e).lerp(o,n).normalize(),a.setXYZ(e,s.x,s.y,s.z);return e}var wt=2048,Tt=1024,Et=`"Yu Gothic UI", "Yu Gothic", "Meiryo", "Hiragino Sans", "Noto Sans CJK JP", "Noto Sans JP", sans-serif`,Dt=`"Yu Mincho", "Hiragino Mincho ProN", "MS Mincho", "Noto Serif CJK JP", serif`;function Ot(e,t,n,r,i,a,o=Et,s=700){e.font=`${s} ${i}px ${o}`,e.fillStyle=a,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(t,n,r)}function kt(e,t,n,r,i,a,o,s=Et){[...t].forEach((t,c)=>Ot(e,t,n,r+c*i,a,o,s))}function At(e,t,n,r=1){let i=e.createLinearGradient(0,0,0,n);i.addColorStop(0,`rgba(60,45,30,${.1*r})`),i.addColorStop(.2,`rgba(60,45,30,0)`),i.addColorStop(.85,`rgba(60,45,30,0)`),i.addColorStop(1,`rgba(60,45,30,${.18*r})`),e.fillStyle=i,e.fillRect(0,0,t,n);let a=7,o=()=>(a=a*16807%2147483647)/2147483647;for(let i=0;i<6*r;i++){let i=o()*t,a=n*(.2+o()*.5),s=e.createLinearGradient(0,0,0,a);s.addColorStop(0,`rgba(70,55,40,${.18*r})`),s.addColorStop(1,`rgba(70,55,40,0)`),e.fillStyle=s,e.fillRect(i,0,2+o()*5,a)}}var jt={dagashi:[0,0,512,160,(e,t,n)=>{e.fillStyle=`#f4ede0`,e.fillRect(0,0,t,n),e.strokeStyle=`#b8302c`,e.lineWidth=10,e.strokeRect(8,8,t-16,n-16),Ot(e,`だがし`,t*.42,n*.52,96,`#c0302a`),Ot(e,`やまだ屋`,t*.84,n*.52,34,`#3a3230`,Dt),At(e,t,n)}],ramen:[512,0,512,160,(e,t,n)=>{e.fillStyle=`#b82a26`,e.fillRect(0,0,t,n),Ot(e,`ラーメン`,t*.5,n*.5,100,`#fff6e6`),At(e,t,n,.7)}],closed:[1024,0,512,160,(e,t,n)=>{e.fillStyle=`#8fa3ad`,e.fillRect(0,0,t,n),Ot(e,`たなか商店`,t*.5,n*.5,88,`rgba(240,236,226,0.8)`,Dt),e.fillStyle=`rgba(150,110,70,0.35)`,e.fillRect(0,0,t,n),At(e,t,n,2)}],tabako:[1536,0,256,160,(e,t,n)=>{e.fillStyle=`#c83a32`,e.fillRect(0,0,t,n),Ot(e,`たばこ`,t*.5,n*.5,64,`#ffffff`)}],kori:[1792,0,256,256,(e,t,n)=>{e.fillStyle=`#fbfaf4`,e.fillRect(0,0,t,n),e.fillStyle=`#3a6fc0`,e.beginPath(),e.moveTo(0,n*.78);for(let r=0;r<=t;r+=8)e.lineTo(r,n*.78+Math.sin(r/18)*10);e.lineTo(t,n),e.lineTo(0,n),e.fill(),Ot(e,`氷`,t*.5,n*.42,150,`#d4302c`,Dt,900)}],noren:[0,160,512,256,(e,t,n)=>{e.fillStyle=`#2a3558`,e.fillRect(0,0,t,n),e.fillStyle=`#1f2846`;for(let r=1;r<4;r++)e.fillRect(t*r/4-3,n*.25,6,n);Ot(e,`そば`,t*.5,n*.55,150,`#f4efe4`,Dt,900)}],tomare:[512,160,256,256,(e,t,n)=>{e.fillStyle=`rgba(0,0,0,0)`,e.clearRect(0,0,t,n),e.fillStyle=`#f4f2ee`,e.beginPath(),e.moveTo(8,10),e.lineTo(t-8,10),e.lineTo(t/2,n-10),e.closePath(),e.fill(),e.fillStyle=`#c8262a`,e.beginPath(),e.moveTo(26,22),e.lineTo(t-26,22),e.lineTo(t/2,n-36),e.closePath(),e.fill(),Ot(e,`止まれ`,t/2,n*.3,50,`#ffffff`)}],bus:[768,160,256,256,(e,t,n)=>{e.fillStyle=`#e8e6e0`,e.fillRect(0,0,t,n),e.fillStyle=`#ffffff`,e.beginPath(),e.arc(t/2,n/2,t*.47,0,7),e.fill(),e.strokeStyle=`#2a5aa8`,e.lineWidth=16,e.beginPath(),e.arc(t/2,n/2,t*.42,0,7),e.stroke(),Ot(e,`バス停`,t/2,n*.4,50,`#2a5aa8`),Ot(e,`田中口`,t/2,n*.63,40,`#303030`)}],phone:[1024,160,512,96,(e,t,n)=>{e.fillStyle=`#3c8a52`,e.fillRect(0,0,t,n),Ot(e,`公衆電話`,t*.5,n*.52,64,`#ffffff`)}],yasai:[1024,256,512,160,(e,t,n)=>{e.fillStyle=`#c9a776`,e.fillRect(0,0,t,n),Ot(e,`やさい`,t*.36,n*.5,84,`#2d5a2a`,Et,800),Ot(e,`100円`,t*.78,n*.5,58,`#b3302a`,Et,800),At(e,t,n,1.2)}],sake:[1536,160,128,512,(e,t,n)=>{e.fillStyle=`#f2ece0`,e.fillRect(0,0,t,n),kt(e,`酒たばこ`,t/2,70,118,96,`#2a2624`,Dt),At(e,t,n)}],shrine:[1664,256,128,384,(e,t,n)=>{e.fillStyle=`#2c2a26`,e.fillRect(0,0,t,n),e.strokeStyle=`#c8a64a`,e.lineWidth=6,e.strokeRect(8,8,t-16,n-16),kt(e,`稲荷社`,t/2,80,110,88,`#e9d59a`,Dt)}],shutter:[0,416,512,384,(e,t,n)=>{e.fillStyle=`#a9adae`,e.fillRect(0,0,t,n);for(let r=0;r<n;r+=16)e.fillStyle=`#8d9294`,e.fillRect(0,r,t,3),e.fillStyle=`#c4c7c6`,e.fillRect(0,r+4,t,2);e.fillStyle=`rgba(140,80,40,0.25)`,e.fillRect(0,n*.8,t,n*.2),Ot(e,`準備中`,t*.5,n*.4,64,`rgba(60,60,64,0.55)`),At(e,t,n,2)}],vendDrink:[512,416,256,512,(e,t,n)=>{e.fillStyle=`#f2f4f6`,e.fillRect(0,0,t,n);let r=[`#d8342c`,`#2a64c0`,`#f0b02a`,`#2c9a5a`,`#8a3aa8`,`#e8e2d0`,`#e05a2a`,`#20a0c0`];for(let n=0;n<3;n++){e.fillStyle=`#e0e8ef`,e.fillRect(12,20+n*100,t-24,88);for(let t=0;t<6;t++)e.fillStyle=r[(n*3+t)%r.length],e.fillRect(22+t*37,30+n*100,26,56),e.fillStyle=`rgba(255,255,255,0.6)`,e.fillRect(24+t*37,34+n*100,5,46),e.fillStyle=n===2?`#d8342c`:`#2a64c0`,e.fillRect(22+t*37,92+n*100,26,8)}Ot(e,`つめたい`,t*.5,332,30,`#2a64c0`),e.fillStyle=`#2a2e34`,e.fillRect(40,380,t-80,70),e.fillStyle=`#c8ccd0`,e.fillRect(t-70,350,30,20)}],vendIce:[768,416,256,512,(e,t,n)=>{e.fillStyle=`#f7f0f4`,e.fillRect(0,0,t,n),e.fillStyle=`#e8508a`,e.fillRect(0,0,t,90),Ot(e,`アイス`,t*.5,46,60,`#ffffff`);let r=[`#f7d2e0`,`#c8e6f6`,`#fbe7a8`,`#d6f0c8`,`#f4c0a8`];for(let t=0;t<3;t++)for(let n=0;n<4;n++)e.fillStyle=r[(t+n)%r.length],e.fillRect(20+n*56,110+t*88,44,70),e.fillStyle=`#b03a6a`,e.fillRect(20+n*56,170+t*88,44,8);e.fillStyle=`#2a2e34`,e.fillRect(40,400,t-80,60)}],jizoBib:[1024,416,128,128,(e,t,n)=>{e.fillStyle=`#d2322c`,e.fillRect(0,0,t,n),e.fillStyle=`rgba(255,255,255,0.12)`;for(let r=0;r<n;r+=10)e.fillRect(0,r,t,3)}],awning:[1152,416,256,128,(e,t,n)=>{for(let r=0;r<8;r++)e.fillStyle=r%2?`#f4ede2`:`#c8302a`,e.fillRect(r*t/8,0,t/8,n);e.fillStyle=`rgba(60,40,30,0.18)`,e.fillRect(0,n*.8,t,n*.2)}],plate:[1408,416,128,128,(e,t,n)=>{e.fillStyle=`#f2f0e8`,e.fillRect(0,0,t,n),e.strokeStyle=`#306a3a`,e.lineWidth=6,e.strokeRect(6,6,t-12,n-12),Ot(e,`軽`,t/2,n/2,70,`#306a3a`)}]},Mt=null;function Nt(e){if(Mt)return Mt;let t=document.createElement(`canvas`);t.width=wt,t.height=Tt;let n=t.getContext(`2d`);n.fillStyle=`#808080`,n.fillRect(0,0,wt,Tt);for(let[e,t,r,i,a]of Object.values(jt))n.save(),n.translate(e,t),n.beginPath(),n.rect(0,0,r,i),n.clip(),a(n,r,i),n.restore();return Mt=new ge(t),Mt.colorSpace=ne,Mt.generateMipmaps=!0,Mt.minFilter=o,Mt.anisotropy=e.capabilities.getMaxAnisotropy(),Mt.needsUpdate=!0,Mt}function Pt(e,t,n){let[r,i,a,o]=jt[e],s=(r+1.5)/wt,c=(r+a-1.5)/wt,l=1-(i+o-1.5)/Tt,u=1-(i+1.5)/Tt;return[s+(c-s)*t,l+(u-l)*n]}function B(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var V=(e,t,n)=>t+(n-t)*e(),Ft=(e,t)=>t[Math.floor(e()*t.length)%t.length],It=(e,t,n)=>e<t?t:e>n?n:e,H=(e,t,n,r)=>t+(e-t)*Math.exp(-n*r),Lt=(e,t,n)=>new p(e,t,n),Rt=`#5c4230`,zt=`#33241a`,Bt=`#9a948a`,Vt=`#a8a49a`;function Ht(e,t,n,r=!1,i=1){let a=new w(t,n,1,i),o=a.attributes.uv;for(let t=0;t<o.count;t++)o.setXY(t,...Pt(e,o.getX(t),o.getY(t)));return P(a,`#ffffff`,r?M.signGlow:M.sign)}function Ut(e,t,n){let r=Ht(e,t,n),i=Ht(e,t,n);return i.rotateY(Math.PI),i.translate(0,0,-.012),[r,i]}function Wt(e){let t=[],n=e===`vendDrink`?`#e8e8e4`:`#f2e6ec`;t.push(F(I(.95,1.83,.72,n,M.metal),0,.915,0)),t.push(F(I(.99,.08,.76,`#5a5e62`,M.metal),0,.04,0)),t.push(F(I(.97,.06,.74,n,M.metal),0,1.86,0));let r=Ht(e,.82,1.64,!0);return r.translate(0,.98,.362),t.push(r),t.push(F(I(.52,.12,.08,`#2a2e34`,M.metal),0,.3,.38)),z(t)}function Gt(){let e=[];e.push(F(I(.95,.12,.95,Vt,M.stone),0,.06,0));for(let[t,n]of[[-.42,-.42],[.42,-.42],[-.42,.42],[.42,.42]])e.push(F(I(.06,2.05,.06,`#e8e4d8`,M.metal),t,1.1,n));for(let[t,n,r]of[[0,.42,0],[0,-.42,0],[.42,0,Math.PI/2],[-.42,0,Math.PI/2]]){let i=P(new me(.8,1.7,.02),`#ffffff`,M.glass);i.rotateY(r),i.translate(t,1.05,n),e.push(i)}e.push(F(I(1,.22,1,`#3c8a52`,M.metal),0,2.2,0));for(let t of[1,-1]){let n=Ht(`phone`,.84,.16,!0);t<0&&n.rotateY(Math.PI),n.translate(0,2.2,t*.505),e.push(n)}return e.push(F(I(.34,.42,.22,`#58a86a`,M.metal),0,1.3,-.28)),e.push(F(I(.5,.04,.3,`#d8d2c4`),0,1.06,-.26)),z(e)}function Kt(){let e=[],t=2.4,n=1.1,r=2.2;for(let i of[-2.4/2,t/2])for(let t of[-1.1/2,n/2])e.push(F(I(.1,r,.1,Rt,M.bark),i,r/2,t));e.push(F(I(t,r*.8,.05,Rt,M.planks),0,r*.45,-1.1/2));for(let i of[-2.4/2,t/2])e.push(F(I(.05,r*.8,n,Rt,M.planks),i,r*.45,0));let i=I(2.9,.08,1.7000000000000002,`#6a5a4a`,M.metal);i.rotateX(-.14),i.translate(0,2.3200000000000003,.05),e.push(i),e.push(F(I(2.1999999999999997,.06,.36,`#9a7650`),0,.45,-1.1/2+.25));for(let t of[-.9,.9])e.push(F(I(.06,.42,.3,zt),t,.22,-1.1/2+.25));e.push(F(I(.5,.6,.02,`#f2f0e8`),.7,1.4,-.51));let a=-2.4/2-.6,o=1.05;e.push(F(L(.3,.32,.18,Vt,M.stone,12),a,.09,o)),e.push(F(L(.035,.035,2.2,`#dcdcd4`,M.metal,8),a,1.2,o));for(let t of Ut(`bus`,.56,.56))e.push(t.translate(a,2.1,1.1));return z(e)}function qt(e){let t=B(e),n=[],r=1.5,i=.7;for(let e of[-1.5/2,r/2])for(let t of[-.7/2,i/2])n.push(F(I(.07,t<0?1.95:1.75,.07,Rt,M.bark),e,(t<0?1.95:1.75)/2,t));let a=I(1.85,.05,1.15,`#5a6a74`,M.metal);a.rotateX(.26),a.translate(0,1.9,.02),n.push(a);for(let[e,t]of[[.55,.05],[.95,-.12]])n.push(F(I(r,.04,i*.62,`#9a7650`,M.planks),0,e,t));n.push(F(I(r,.5,.03,Rt,M.planks),0,.28,i/2));let o=(t,r,i,a)=>{if(a===0){let a=P(St(.1,1,.2,e+t*9),`#8cc05a`,M.plain);a.translate(t,r+.09,i),n.push(a)}else a===1?n.push(F(_t(.055,`#d2402a`,M.plain,8,6),t,r+.05,i)):n.push(F(L(.025,.025,.2,`#3f7a30`,M.plain,6),t,r+.03,i,0,0,Math.PI/2))};for(let e=0;e<4;e++){let r=-.55+e*.37;n.push(F(L(.15,.12,.08,`#b8935a`,M.plain,10),r,.61,.05));let i=e%3;for(let e=0;e<(i===0?2:4);e++)o(r+V(t,-.06,.06),.62,.05+V(t,-.06,.06),i);n.push(F(L(.13,.11,.07,`#b8935a`,M.plain,10),r,1,-.12));for(let e=0;e<3;e++)o(r+V(t,-.05,.05),1.01,-.12+V(t,-.05,.05),(i+1)%3)}n.push(F(I(.14,.18,.12,`#6a4a30`,M.planks),r/2-.12,1.25,i/2-.08)),n.push(F(I(.08,.01,.01,`#1a1410`),r/2-.12,1.33,i/2-.015));let s=Ht(`yasai`,.8,.25);return s.translate(0,1.58,.37),n.push(s),z(n)}function Jt(){let e=[],t=`#c8402c`,n=3.6,r=2.6;for(let i of[-2.6/2,r/2])e.push(F(L(.15,.17,n,t,M.plain,12),i,n/2,0)),e.push(F(L(.21,.21,.35,`#2a2624`,M.plain,12),i,.17,0));e.push(F(I(3.1,.18,.24,t),0,3.05,0));let i=I(3.9000000000000004,.22,.34,`#2a2624`);i.translate(0,3.65,0),e.push(i),e.push(F(I(3.7,.16,.3,t),0,3.46,0));let a=Ht(`shrine`,.28,.8);a.translate(0,3.4,.13),e.push(a);let o=.19,s=.42;for(let t=0;t<9;t++)e.push(F(I(1.7,o,.45999999999999996,t%2?`#a19b90`:Bt,M.stone),0,o*(t+.5),-.9-t*s));let c=o*9,l=-.9-9*s-1.3;e.push(F(I(3.2,c,2.8,`#7f7c6c`,M.stone),0,c/2,l)),e.push(F(I(3.3,.06,2.9,`#4f6a38`,M.ground),0,1.73,l));let u=-6.38;e.push(F(I(.9,.3,.8,Bt,M.stone),0,1.8599999999999999,u)),e.push(F(I(.7,.8,.6,`#6a4a30`,M.planks),0,2.41,u));for(let t of[-1,1]){let n=I(1.1,.06,.62,`#4f8a7a`,M.metal);n.rotateX(t*.55),n.translate(0,2.99,u+t*.26),e.push(n)}e.push(F(I(.36,.5,.02,`#e8dcc0`,M.shoji),0,2.4299999999999997,-6.07)),e.push(F(L(.035,.035,r,`#d8c890`,M.cloth,6),0,2.7,.05,0,0,Math.PI/2));for(let t of[-.6,0,.6])e.push(F(I(.08,.26,.01,`#f6f4ee`,M.cloth),t,2.52,.08));return{geo:z(e),steps:9,depth:7.379999999999999}}function Yt(e){let t=V(B(e),.85,1.05),n=[];n.push(F(I(.42,.18,.36,`#8d877c`,M.stone),0,.09,0));let r=P(new y(.13*t,.17*t,.46*t,12,1),`#a8a298`,M.stone);r.translate(0,.18+.23*t,0),n.push(r),n.push(F(_t(.12*t,`#aaa49a`,M.stone,12,8),0,.18+.56*t,0));let i=Ht(`jizoBib`,.3*t,.22*t);i.rotateX(-.25),i.translate(0,.18+.36*t,.155*t),n.push(i);let a=P(new E(.125*t,12,6,0,Math.PI*2,0,Math.PI/2),`#c8302a`,M.cloth);return a.translate(0,.18+.58*t,0),n.push(a),z(n)}function Xt(){let e=[];e.push(F(I(.5,.14,.5,Bt,M.stone),0,.07,0)),e.push(F(L(.09,.11,.7,Bt,M.stone,8),0,.49,0)),e.push(F(I(.42,.1,.42,Bt,M.stone),0,.89,0)),e.push(F(I(.3,.3,.3,`#8d877c`,M.stone),0,1.09,0)),e.push(F(I(.14,.14,.32,`#2a2622`,M.fire),0,1.09,0));let t=P(new fe(.36,.26,6),Bt,M.stone);return t.translate(0,1.37,0),e.push(t),e.push(F(_t(.06,Bt,M.stone,8,6),0,1.52,0)),z(e)}function Zt(){let e=[];e.push(F(L(.045,.05,3,`#e8762a`,M.metal,8),0,1.5,0)),e.push(R(Lt(0,2.9,0),Lt(0,3,.3),.03,`#e8762a`,M.metal,6));let t=P(new te(.4,.05,6,20),`#e8762a`,M.metal);t.translate(0,3.05,.34),e.push(t);let n=P(new E(.83,18,6,0,Math.PI*2,0,.5),`#c8d8e0`,M.glass);return n.rotateX(Math.PI/2),n.translate(0,3.05,.34-.83*Math.cos(.5)),e.push(n),z(e)}function Qt(){let e=[F(L(.035,.035,2.3,`#d8d8d0`,M.metal,8),0,1.15,0)],t=Ht(`tomare`,.8,.8);return t.translate(0,2.05,.05),e.push(t),e.push(F(I(.7,.62,.02,`#b8bab6`,M.metal),0,2.15,.03)),z(e)}function $t(){let e=[],t=`#eeece6`;e.push(F(I(1.4,.3,3.3,`#3a3c40`,M.metal),0,.42,0)),e.push(F(I(1.42,1,1.15,t,M.metal),0,1.02,1.05));let n=I(1.38,.5,.95,t,M.metal);n.translate(0,1.75,.95),e.push(n);let r=P(new me(1.25,.5,.02),`#ffffff`,M.glass);r.rotateX(-.2),r.translate(0,1.72,1.45),e.push(r);for(let t of[-1,1])e.push(F(P(new me(.02,.42,.7),`#ffffff`,M.glass),t*.7,1.72,.95));e.push(F(I(1.44,.14,.06,`#c8c6c0`,M.metal),0,.65,1.64));for(let t of[-1,1])e.push(F(I(.22,.1,.03,`#f4e6a0`,M.lantern),t*.5,.88,1.64));let i=Ht(`plate`,.3,.16);i.translate(0,.62,1.68),e.push(i),e.push(F(I(1.4,.06,1.95,`#9a9c98`,M.metal),0,.62,-.62));for(let n of[-1,1])e.push(F(I(.04,.34,1.95,t,M.metal),n*.69,.82,-.62));e.push(F(I(1.4,.34,.04,t,M.metal),0,.82,-1.6)),e.push(F(I(1.4,.34,.04,t,M.metal),0,.82,.36));for(let t=0;t<3;t++)e.push(F(I(.45,.28,.35,t===1?`#3a6a9a`:`#c8a060`,M.planks),-.35+t*.35,.8,-.9+t%2*.4));for(let t of[1.05,-1])for(let n of[-1,1]){let r=P(new y(.26,.26,.18,14,1),`#1e1f22`,M.plain);r.rotateZ(Math.PI/2),r.translate(n*.64,.26,t),e.push(r);let i=P(new y(.12,.12,.19,10,1),`#b8bab6`,M.metal);i.rotateZ(Math.PI/2),i.translate(n*.65,.26,t),e.push(i)}return z(e)}function en(e){let t=[];for(let e of[.52,-.52]){let n=P(new te(.31,.022,5,18),`#222226`,M.plain);n.rotateY(Math.PI/2),n.translate(0,.33,e),t.push(n)}return t.push(R(Lt(0,.33,-.52),Lt(0,.8,-.1),.02,e,M.metal,5)),t.push(R(Lt(0,.33,-.52),Lt(0,.4,.05),.02,e,M.metal,5)),t.push(R(Lt(0,.4,.05),Lt(0,.95,.42),.022,e,M.metal,5)),t.push(R(Lt(0,.33,.52),Lt(0,.95,.42),.02,e,M.metal,5)),t.push(F(I(.12,.05,.24,`#2a2222`),0,.84,-.12)),t.push(R(Lt(-.28,1,.38),Lt(.28,1,.38),.015,`#9a9c9e`,M.metal,5)),t.push(F(I(.34,.24,.28,`#9a9c9e`,M.metal),0,.88,.62)),z(t)}function tn(e){let t=B(e),n=[],r=2.6;for(let e of[-2.6/2,r/2])n.push(F(L(.03,.03,1.9,`#c8ccd0`,M.metal,6),e,.95,0)),n.push(F(I(.5,.04,.04,`#c8ccd0`,M.metal),e,.02,0));n.push(F(L(.025,.025,2.9,`#8ac0d8`,M.metal,6),0,1.85,0,0,0,Math.PI/2));let i=[`#f4f2ec`,`#8fb4d8`,`#e8a0a0`,`#f4f2ec`,`#d8d0a8`,`#6a8ab8`],a=-1;for(;a<r/2-.3;){let e=V(t,.35,.6),r=V(t,.45,.75),o=P(new me(e,r,.015,1,3,1),i[Math.floor(t()*i.length)],M.cloth),s=o.attributes.position,c=o.attributes.aWind;for(let e=0;e<s.count;e++)c.setX(e,((r/2-s.getY(e))/r)**2*.25);o.translate(a+e/2,1.83-r/2,0),n.push(o),a+=e+V(t,.08,.2)}return z(n)}function nn(e,t){let n=B(e),r=[];for(let i=0;i<t;i++){let t=V(n,.1,.18),a=i*.36;r.push(F(L(t,t*.75,t*1.4,[`#8f5236`,`#6a6e72`,`#b86a3a`][i%3],M.plain,10),a,t*.7,0));let o=P(St(t*1.25,1,.3,e+i),`#264a2c`,M.foliage);if(Ct(o,Lt(0,0,0),.6),o.translate(a,t*1.4+t*.8,0),r.push(o),n()>.4)for(let e=0;e<4;e++)r.push(F(_t(.035,[`#e8506a`,`#f4d040`,`#f4f0f8`,`#b070d0`][i%4],M.plain,6,4),a+V(n,-t,t),t*2.3+V(n,0,.1),V(n,-t,t)*.7))}return z(r)}function rn(e){let t=B(e),n=[];n.push(F(I(1.6,.06,.6,`#9a7650`,M.planks),0,.78,0));for(let e of[-.72,.72])for(let t of[-.25,.25])n.push(F(I(.06,.76,.06,zt),e,.38,t));n.push(F(I(1.5,.04,.5,`#9a7650`,M.planks),0,.35,0));let r=[`#e8506a`,`#f4d040`,`#6ab0e8`,`#f0a040`,`#8ad070`,`#f4f0f8`,`#c060c0`];for(let e=0;e<6;e++){let t=-.62+e*.25,i=e%2?-.1:.12,a=P(new y(.09,.09,.24,12,1),`#ffffff`,M.glass);a.translate(t,.93,i),n.push(a),n.push(F(L(.085,.085,.1,r[e%r.length],M.plain,10),t,.87,i)),n.push(F(L(.07,.095,.04,e%2?`#d8342c`:`#e8c040`,M.metal,12),t,1.07,i))}for(let e=0;e<10;e++)n.push(F(I(.12,.03,.08,r[Math.floor(t()*r.length)],M.plain),V(t,-.7,.7),.4,V(t,-.2,.2)));return z(n)}function an(){let e=[];for(let t=0;t<2;t++){let n=t*.46;e.push(F(I(.4,.62,.36,t?`#3a7ac8`:`#d8342c`,M.metal),n,.31,0)),e.push(F(I(.4,.4,.36,`#ffffff`,M.glass),n,.82,0));for(let t=0;t<5;t++)e.push(F(_t(.05,[`#f4d040`,`#e8506a`,`#6ab0e8`,`#8ad070`,`#f4f0f8`][t],M.plain,6,4),n-.1+t%3*.1,.7+Math.floor(t/3)*.1,.02));e.push(F(I(.42,.06,.38,t?`#3a7ac8`:`#d8342c`,M.metal),n,1.05,0))}return z(e)}function on(){let e=[F(L(.02,.02,1.8,`#c8ccd0`,M.metal,6),0,.9,0)];for(let t of Ut(`kori`,.5,.5))e.push(t.translate(.27,1.45,0));return e.push(F(L(.012,.012,.56,`#c8ccd0`,M.metal,4),.27,1.72,0,0,0,Math.PI/2)),z(e)}var sn={ovate:0,broad:1,lance:2,small:3},cn=1024,ln=cn/2,un=[{count:11,len:[150,215],ratio:.44,fan:[-1.5,1.5],base:[.5,.62],spread:40,tipCurl:.15},{count:7,len:[170,230],ratio:.66,fan:[-1.35,1.35],base:[.5,.66],spread:30,tipCurl:.1},{count:7,len:[300,440],ratio:.16,fan:[-.55,.55],base:[.5,.97],spread:22,tipCurl:.35},{count:22,len:[80,120],ratio:.5,fan:[-3.1,3.1],base:[.5,.5],spread:95,tipCurl:.1}];function dn(e,t,n,r,i){let a=r*t*.25;e.beginPath(),e.moveTo(0,0),i<=0?e.bezierCurveTo(-n*.62,-t*.18,-n*.52,-t*.72,a,-t):e.bezierCurveTo(0,-t*.3,a*.5,-t*.7,a,-t),i>=0?e.bezierCurveTo(n*.52,-t*.72,n*.62,-t*.18,0,0):e.bezierCurveTo(a*.5,-t*.7,0,-t*.3,0,0),e.closePath()}function fn(e,t,n,r,i){let a=B(i),o=Array.from({length:r.count},()=>{let e=V(a,r.fan[0],r.fan[1]);return{a:e,L:V(a,r.len[0],r.len[1])*(1-Math.abs(e)*.12),ox:V(a,-r.spread,r.spread),oy:V(a,-r.spread,r.spread)*.6,v:a(),curl:V(a,-r.tipCurl,r.tipCurl),depth:a()}});o.sort((e,t)=>e.depth-t.depth),e.save(),e.beginPath(),e.rect(t,n,ln,ln),e.clip();for(let i of o){let a=i.L*r.ratio,o=.72+.28*i.depth,s=Math.round(i.v*255);e.save(),e.translate(t+ln*r.base[0]+i.ox,n+ln*r.base[1]+i.oy),e.rotate(i.a);for(let t of[-1,1]){let n=t<0,r=e.createLinearGradient(0,0,0,-i.L),c=(n?.5:.24)*o,l=(n?.98:.56)*o;r.addColorStop(0,`rgb(${Math.round(c*255)},${s},0)`),r.addColorStop(.75,`rgb(${Math.round(l*255)},${s},0)`),r.addColorStop(1,`rgb(${Math.round(l*.9*255)},${s},0)`),e.fillStyle=r,dn(e,i.L,a,i.curl,t),e.fill()}e.lineJoin=`round`,e.strokeStyle=`rgb(36,${s},0)`,e.lineWidth=Math.max(2,a*.035),dn(e,i.L,a,i.curl,0),e.stroke(),e.strokeStyle=`rgb(${Math.round(.2*o*255)},${s},0)`,e.lineWidth=Math.max(1.5,a*.03),e.beginPath(),e.moveTo(0,0),e.quadraticCurveTo(i.curl*i.L*.25*.4,-i.L*.6,i.curl*i.L*.25,-i.L*.96),e.stroke(),e.lineWidth=Math.max(2,a*.05),e.beginPath(),e.moveTo(0,0),e.lineTo(0,a*.22),e.stroke(),e.restore()}e.restore()}var pn=null;function mn(e){if(pn)return pn;let t=document.createElement(`canvas`);t.width=t.height=cn;let n=t.getContext(`2d`);return n.clearRect(0,0,cn,cn),un.forEach((e,t)=>fn(n,t%2*ln,Math.floor(t/2)*ln,e,101+t*17)),pn=new ge(t),pn.colorSpace=``,pn.generateMipmaps=!0,pn.minFilter=o,pn.magFilter=_,pn.anisotropy=e.capabilities.getMaxAnisotropy(),pn.wrapS=pn.wrapT=ye,pn.needsUpdate=!0,pn}function hn(e,t,n){let r=e%2,i=Math.floor(e/2);return[(t+r)/2,(n+(1-i))/2]}var U=(e,t,n)=>new p(e,t,n),gn=`#4a3526`,_n=`#33241a`,vn=`#5c4230`,yn=`#9a7650`,bn=`#e6ddc8`,xn=`#2a3134`,Sn=`#1f2629`,Cn=`#9a948a`;function wn(e,t,n,r,i){let a=new C;a.moveTo(-e/2,0),a.lineTo(e/2,0),a.lineTo(0,t),a.lineTo(-e/2,0);let o=new f(a,{depth:n,bevelEnabled:!1});return o.translate(0,0,-n/2),P(o,r,i)}function Tn(e,t,n,r,i){let a=[],o=t/2+i,s=o/Math.cos(r),c=t/2*Math.tan(r);for(let t of[-1,1]){let l=gt(e+i*2,.16,s,xn,M.roof);l.rotateX(t*r),l.translate(0,n+c-o*Math.tan(r)/2+.08,t*o/2),a.push(l);let u=I(e+i*2+.02,.12,.2,Sn,M.plain);F(u,0,n+c-o*Math.tan(r)+.06,t*(o-.08)),a.push(u);let d=Math.round((e+i*2)/.3),f=Math.cos(t*r),p=Math.sin(t*r);for(let l=0;l<=d;l++){let u=I(.08,.07,s-.1,l%2?xn:Sn,M.plain);u.rotateX(t*r),u.translate(-e/2-i+l*((e+i*2)/d),n+c-o*Math.tan(r)/2+.08+f*.11,t*o/2+p*.11),a.push(u)}let m=L(.075,.075,e+i*2,`#6b6f70`,M.metal,8);m.rotateZ(Math.PI/2),m.translate(0,n+c-o*Math.tan(r)-.05,t*(o+.02)),a.push(m)}let l=I(e+i*2+.1,.26,.36,Sn,M.plain);F(l,0,n+c+.14,0),a.push(l);for(let t of[-1,1]){let l=I(.26,.46,.46,Sn,M.plain);F(l,t*(e/2+i+.05),n+c+.22,0),a.push(l);for(let l of[-1,1]){let u=I(.1,.16,s,_n);u.rotateX(l*r),u.translate(t*(e/2+i),n+c-o*Math.tan(r)/2,l*o/2),a.push(u)}}for(let r of[-1,1]){let i=wn(t,c,.1,bn,M.plaster);i.rotateY(Math.PI/2),i.translate(r*e/2-r*.05,n,0),a.push(i),a.push(F(I(.12,.14,t+.2,_n),r*e/2+r*.02,n+c*.4,0)),a.push(F(I(.12,c*.9,.12,_n),r*e/2+r*.02,n+c*.45,0))}return a}function En(e,t,n,r){let i=gt(e,.12,t,xn,M.roof);i.rotateX(.36),i.translate(0,n,r+t/2-.05);let a=I(e+.02,.1,.16,Sn,M.plain);F(a,0,n-Math.sin(.36)*t*.5,r+t*Math.cos(.36)-.06);let o=[i,a],s=Math.max(2,Math.round(e/1.4));for(let i=0;i<=s;i++)o.push(F(I(.08,.08,t*.8,_n),-e/2+.2+i*(e-.4)/s,n-.28,r+t*.4,-.5));return o}var Dn=(e,t,n)=>P(new me(e,t,.05),`#ffffff`,n);function On(e,t,n=[1,1]){let r=[],i=.07;r.push(F(I(e+i*2,i,.09,_n),0,t/2+i/2,.03)),r.push(F(I(e+i*2+.1,.06,.16,_n),0,-t/2-.03,.06));for(let n of[-1,1])r.push(F(I(i,t,.09,_n),n*(e/2+i/2),0,.03));for(let i=1;i<=n[0];i++)r.push(F(I(.025,t,.04,_n),-e/2+i*e/(n[0]+1),0,.035));for(let i=1;i<=n[1];i++)r.push(F(I(e,.025,.04,_n),0,-t/2+i*t/(n[1]+1),.035));return r}function kn(e,t){let n=[];n.push(F(I(e+.08,.07,.07,_n),0,t/2,0)),n.push(F(I(e+.08,.07,.07,_n),0,-t/2,0));for(let r=-e/2;r<=e/2+.001;r+=.06)n.push(F(I(.024,t,.035,`#3b2a1e`),r,0,.02));return n.push(F(I(e,.03,.03,`#3b2a1e`),0,t*.18,.04)),n}function An(e,t){let n=[];for(let r of[-1,1]){n.push(F(Dn(e/2-.02,t,M.glass),r*e/4,0,0));for(let i of[-.17,.17])n.push(F(I(e/2-.04,.03,.05,_n),r*e/4,i*t,.03));n.push(F(I(.03,t*.66,.05,_n),r*e/4,.17*t,.03)),n.push(F(I(e/2-.04,t*.18,.04,vn,M.planks),r*e/4,-t*.41,.025)),n.push(F(I(.04,.14,.03,`#1a1410`),r*e/4-r*(e/4-.08),.02,.05))}n.push(F(I(e+.1,.1,.08,_n),0,t/2+.05,.02)),n.push(F(I(e+.1,.06,.08,_n),0,-t/2,.02));for(let r of[-e/2,0,e/2])n.push(F(I(.06,t,.07,_n),r,0,.02));return n}function jn(e,t){let n=[];n.push(F(I(e,.07,.08,_n),0,t,0)),n.push(F(I(e,.05,.06,_n),0,.08,0));for(let r=-e/2+.06;r<=e/2;r+=.11)n.push(F(I(.035,t,.035,vn),r,t/2,0));return n}function Mn(){let e=[];e.push(I(.8,.56,.28,`#d6d4ca`,M.metal));let t=L(.19,.19,.03,`#4c4e52`,M.metal,16);t.rotateX(Math.PI/2),t.translate(.12,0,.145),e.push(t);for(let t=-2;t<=2;t++)e.push(F(I(.36,.012,.01,`#9a9c9e`),.12,t*.06,.165));return e.push(F(I(.06,.9,.06,`#e0ddd0`),-.32,.6,-.08)),e}function Nn(e,t){let n=L(e*.8,e*.6,e*1.2,`#8f5236`,M.plain,10);n.translate(0,e*.6,0);let r=P(St(e*1.2,1,.25,t),`#22442b`,M.foliage);return Ct(r,U(0,0,0),.6),r.translate(0,e*1.9,0),[n,r]}function Pn(e,t,n,r,i,a,o=M.leafCard,s=sn.ovate){let c=new w(n,n),l=c.attributes.uv;for(let e=0;e<l.count;e++)l.setXY(e,...hn(s,l.getX(e),l.getY(e)));c.rotateZ(a);let u=new le().setFromUnitVectors(U(0,0,1),t.clone().normalize());c.applyQuaternion(u),c.translate(e.x,e.y,e.z);let d=c.attributes.normal;for(let e=0;e<d.count;e++)d.setXYZ(e,i.x,i.y,i.z);return P(c,r,o)}function Fn(e,t,n){let r=B(n),i=[];for(let n=0;n<Math.round(e*t*14);n++){let n=r()**.7*e,a=V(r,-t/2,t/2)*(1-n/e*.5),o=U(V(r,-.4,.4),V(r,-.2,.5),1).normalize();i.push(Pn(U(a,n,.04),o,V(r,.22,.36),r()>.5?`#1c3b28`:`#24462b`,U(0,.3,1).normalize(),r()*6.28))}return i}function In(e){let t=B(e.seed),{w:n,d:r}=e,i=[],a=2.45,o=.35;i.push(F(I(n+.15,o,r+.15,Cn,M.stone),0,o/2,0)),i.push(F(I(n,2.35,r,gn,M.planks),0,1.525,0)),i.push(F(I(n+.02,.4,r+.02,bn,M.plaster),0,2.9,0));for(let e of[-1,1])for(let t of[-1,1])i.push(F(I(.14,2.75,.14,_n),e*n/2,1.725,t*r/2));let s=r/2+.03;if(e.kind)i.push(...Ln(e.kind,n,r,o,s,e.seed));else if(e.shop){for(let e of An(n*.5,2))i.push(F(e,-n*.15,1.35,s));i.push(F(P(new me(n*.48,1.9,.02),`#6a4a2a`,M.lantern),-n*.15,1.33,s-.03));let e=n*.5/4;for(let t=0;t<4;t++){let r=P(new me(e-.03,.72,.025,1,4,1),`#253566`,M.cloth),a=r.attributes.position,o=r.attributes.aWind;for(let e=0;e<a.count;e++)o.setX(e,((.36-a.getY(e))/.72)**2*.1);if(F(r,-n*.4+e*(t+.5),2.07,s+.14),i.push(r),t===1||t===2){let r=L(.11,.11,.03,`#f2eee4`,M.cloth,12);r.rotateX(Math.PI/2),r.translate(-n*.4+e*(t+.5)+(t===1?e/2-.05:-e/2+.05),2.13,s+.16),i.push(r)}}i.push(F(I(n*.52,.05,.05,_n),-n*.15,2.45,s+.14));for(let e of kn(n*.32,1.5))i.push(F(e,n*.28,1.6,s+.02));let t=n/2-.3;i.push(F(I(.42,1.7,.08,`#d24e76`,M.metal),t,3.65,s+.5)),i.push(F(Ht(`sake`,.34,1.5),t,3.65,s+.545)),i.push(F(I(.9,1.8,.7,`#e2e0da`,M.metal),-n/2-.6,.9,r/2-.5)),i.push(F(I(.72,.8,.06,`#c43a36`,M.glow),-n/2-.6,1.25,r/2-.13));for(let e=0;e<3;e++)i.push(F(I(.16,.26,.06,[`#e7c44a`,`#4a86c4`,`#e25c4a`][e],M.glow),-n/2-.85+e*.25,1.35,r/2-.09));i.push(F(I(1.6,.08,.4,yn),n*.2,.45,r/2+.9));for(let e of[-.65,.65])i.push(F(I(.07,.42,.34,_n),n*.2+e,.21,r/2+.9));i.push(F(I(.5,.3,.35,`#3a6a9a`,M.metal),n*.2+1.2,.15,r/2+.7))}else{for(let e of An(n*.34,1.95))i.push(F(e,-n*.25,1.33,s));for(let e of kn(n*.4,1.3))i.push(F(e,n*.2,1.7000000000000002,s+.02));i.push(F(Dn(n*.4,1.3,M.shoji),n*.2,1.7000000000000002,s-.01)),i.push(F(I(n*.5,.12,.6,yn),-n*.18,.44999999999999996,r/2+.3))}for(let r of e.shop?[-n*.45,n*.08]:[-n*.45]){let e=P(new E(.2,12,8),t()>.5?`#f2ede0`:`#d8453a`,M.lantern);e.scale(1,1.3,1),e.translate(r,2.65,s+.75),i.push(e),i.push(F(I(.22,.05,.22,`#2a2220`),r,2.92,s+.75))}{let e=[];for(let t of kn(1.6,1))e.push(F(t,-r*.18,1.9,.02));e.push(F(Dn(1.6,1,M.shoji),-r*.18,1.9,-.01)),e.push(F(Dn(.9,1.6,M.glass),r*.28,1.4500000000000002,0));for(let t of On(.9,1.6,[1,2]))e.push(F(t,r*.28,1.4500000000000002,0));e.push(F(I(.3,.4,.12,`#c8cac4`,M.metal),-r*.42,1.7000000000000002,.06)),e.push(F(L(.07,.07,.02,`#f2f0e8`,M.plain,12),-r*.42,1.77,.13,Math.PI/2)),e.push(F(I(.05,1.2,.05,`#5e5a52`,M.metal),-r*.42,2.5,.04));for(let t of e)t.rotateY(-Math.PI/2),t.translate(-n/2-.03,0,0),i.push(t)}{let e=V(t,-r*.2,r*.2);for(let t of[Dn(1.2,.9,M.shoji),...On(1.2,.9,[0,0])])t.rotateY(Math.PI/2),t.translate(n/2+.03,1.9500000000000002,e),i.push(t)}let c=3.1;i.push(...En(n+.6,1.2,c+.25,r/2));for(let e of En(r*.7,.9,c+.2,n/2-.05))e.rotateY(-Math.PI/2),i.push(e);if(e.floors===2){let o=n-.3,s=r-.6,l=-.1;i.push(F(I(o,2,s,gn,M.planks),0,c+1,l)),i.push(F(I(o+.02,.45,s+.02,bn,M.plaster),0,c+a-.225,l));let u=l+s/2+.03;for(let e of kn(o*.3,.95))i.push(F(e,-o*.25,c+1.3,u+.02));i.push(F(Dn(o*.3,.95,M.shoji),-o*.25,c+1.3,u-.01)),i.push(F(Dn(o*.28,1.1,M.shoji),o*.22,c+1.25,u));for(let e of On(o*.28,1.1,[1,0]))i.push(F(e,o*.22,c+1.25,u));for(let e of[-o/2+.05,o/2-.05])i.push(F(I(.12,a,.12,_n),e,c+a/2,u));i.push(F(I(o,.1,.06,_n),0,c+a-.45,u+.01));{let e=Dn(1.4,.9,M.shoji);e.rotateY(-Math.PI/2),e.translate(-o/2-.03,c+1.3,l),i.push(e);for(let e of kn(1.4,.9))e.rotateY(-Math.PI/2),e.translate(-o/2-.06,c+1.3,l),i.push(e)}if(e.balcony!==!1){let e=o*.5,n=o*.2;i.push(F(I(e,.1,.85,_n),n,c+.62,u+.42));for(let t of jn(e,.85))i.push(F(t,n,c+.67,u+.82));for(let t of[-1,1])i.push(F(I(.08,.7,.08,_n),n+t*e/2,c+.3,u+.8));i.push(F(I(e*.4,.55,.04,t()>.5?`#e8e2d4`:`#d9a3a0`,M.cloth),n-e*.15,c+1.3,u+.86))}c+=a;for(let e of Tn(o,s,c,.5,.95))i.push(e.translate(0,0,l))}else i.push(...Tn(n,r,c,.5,.95));if(e.ac){for(let e of Mn())i.push(F(e,-n/2-.16,.77,r*.3,0,-Math.PI/2));if(e.floors===2)for(let e of Mn())i.push(F(e,n*.3,3.72,r/2+.1))}for(let a=0;a<3;a++)for(let o of Nn(V(t,.14,.22),e.seed+a))i.push(F(o,-n/2+.3+a*.45,0,r/2+.35));for(let a of Fn(V(t,2.2,3.4),1,e.seed*3))a.rotateY(-Math.PI/2),a.translate(-n/2-.02,0,r/2-.7),i.push(a);i.push(F(L(.04,.04,c,`#5e5a52`,M.metal,6),-n/2-.08,c/2,r/2-.1));{let e=n/2+.75,t=r/2+.9,a=c-.25;i.push(R(U(e,a,t),U(n/2+.08,a-.6,r/2+.08),.04,`#5e5a52`,M.metal,6)),i.push(F(L(.04,.04,a-.6,`#5e5a52`,M.metal,6),n/2+.08,(a-.6)/2,r/2+.08))}return z(i)}function Ln(e,t,n,r,i,a){let o=[],s=r;if(e===`dagashi`){o.push(F(P(new me(t*.7,2,.02),`#5a3e24`,M.lantern),-t*.08,s+1,i-.03));for(let e of An(t*.3,2))o.push(F(e,t*.3,s+1,i+.01));for(let e=0;e<3;e++)o.push(F(I(t*.55,.04,.3,`#9a7650`),-t*.12,s+.5+e*.5,i-.2));for(let e=0;e<18;e++)o.push(F(I(.14,.16,.1,[`#e8506a`,`#f4d040`,`#6ab0e8`,`#f0a040`,`#8ad070`][e%5],M.plain),-t*.37+e%6*(t*.1),s+.6+Math.floor(e/6)*.5,i-.2));let e=Ht(`awning`,t*.92,1.25);e.rotateX(-Math.PI/2+.42),e.translate(0,s+2.45,i+.55),o.push(e);let n=Ht(`awning`,t*.92,.22);n.translate(0,s+2.12,i+1.13),o.push(n);for(let e of[-1,1])o.push(R(U(e*t*.44,s+2.2,i+1.1),U(e*t*.44,s+2.7,i+.02),.02,`#5a5e62`,M.metal,4));let r=[I(2.7,.82,.08,`#e8e0d0`),Ht(`dagashi`,2.6,.72).translate(0,0,.045)];for(let e of[-1.1,1.1])r.push(I(.06,.9,.06,_n).translate(e,-.6,-.06));for(let e of r)o.push(F(e,0,s+3.95,i+.75,-.12));o.push(F(rn(a),-t*.18,0,i+.75)),o.push(F(an(),-t/2+.25,0,i+.55)),o.push(F(on(),t*.38,0,i+1.35)),o.push(F(I(.7,.5,.45,`#f4f4f0`,M.metal),t*.3,.25,i+.5)),o.push(F(I(.72,.06,.47,`#3a7ac8`,M.metal),t*.3,.52,i+.5)),o.push(F(Ht(`tabako`,.5,.3),-t/2+.3,s+2,i+.02))}else if(e===`ramen`){for(let e of An(t*.42,2))o.push(F(e,-t*.12,s+1,i));o.push(F(P(new me(t*.4,1.9,.02),`#6a4a2a`,M.lantern),-t*.12,s+.98,i-.03));let e=Ht(`noren`,t*.46,.85,!1,4),n=e.attributes.position,r=e.attributes.aWind;for(let e=0;e<n.count;e++)r.setX(e,((.425-n.getY(e))/.85)**2*.12);e.translate(-t*.12,s+1.7,i+.16),o.push(e),o.push(F(I(t*.5,.05,.05,_n),-t*.12,s+2.14,i+.16));let a=P(new E(.26,14,10),`#d23a2e`,M.lantern);a.scale(1,1.45,1),a.translate(t*.2,s+1.75,i+.35),o.push(a);for(let e=-2;e<=2;e++){let n=.268*Math.sqrt(1-(e/3)**2);o.push(F(L(n,n,.012,`#9a2a22`,M.plain,14),t*.2,s+1.75+e*.12,i+.35))}for(let e of[-.4,.4])o.push(F(L(.16,.16,.06,`#2a2220`,M.plain,12),t*.2,s+1.75+e,i+.35));o.push(F(I(.03,.3,.03,`#2a2220`),t*.2,s+2.3,i+.35)),o.push(F(I(2.4,.74,.08,`#8a2a22`),0,s+2.62,i+.06)),o.push(F(Ht(`ramen`,2.3,.68),0,s+2.62,i+.105));for(let e of kn(t*.25,1.2))o.push(F(e,t*.34,s+1.3,i+.02));o.push(F(Dn(t*.25,1.2,M.shoji),t*.34,s+1.3,i-.01)),o.push(F(I(1.4,.07,.35,`#9a7650`),t*.28,.44,i+.7));for(let e of[-.55,.55])o.push(F(I(.06,.42,.3,_n),t*.28+e,.21,i+.7))}else{o.push(F(Ht(`shutter`,t*.78,2.15),-t*.04,s+1.08,i+.02)),o.push(F(I(t*.82,.3,.3,`#9a9ea0`,M.metal),-t*.04,s+2.3,i+.12));for(let e of[-1,1])o.push(F(I(.06,2.15,.08,`#8a8e90`,M.metal),-t*.04+e*t*.39,s+1.08,i+.03));o.push(F(I(2.8,.78,.08,`#7a8a92`),0,s+2.85,i+.06)),o.push(F(Ht(`closed`,2.7,.7),0,s+2.85,i+.105)),o.push(F(Ht(`tabako`,.45,.28),t*.42,s+1.7,i+.02))}return o.push(F(nn(a+5,3),-t/2+.2,0,i+.3)),o}var Rn=[`#1b3a2a`,`#1e3f2a`,`#183628`,`#21422b`,`#1c3c2e`];function zn(e,t,n=0){let r=B(t),i=[],a=n?1:2,o=(e,n,i=a)=>{let o=P(St(n,i,.16,t+e.x*3+e.y*7),Rn[Math.floor(r()*Rn.length)],M.foliage,0);return o.translate(e.x,e.y,e.z),o};if(e===`round`||e===`tall`){let t=e===`round`?V(r,3.2,4.2):V(r,5.5,6.5),s=U(V(r,-.3,.3),t,V(r,-.3,.3));i.push(R(U(0,-.3,0),s,.34,`#5b4331`,M.bark,7,.2));let c=e===`round`?V(r,3.6,4.4):V(r,3,3.6),l=U(s.x,t+c*.55,s.z),u=e===`tall`?1.15:.82;for(let e=0;e<4;e++){let n=e/4*Math.PI*2+r();i.push(R(U(s.x*.6,t*.7,s.z*.6),U(Math.cos(n)*c*.6,t+V(r,.4,1.4),Math.sin(n)*c*.6),.12,`#5b4331`,M.bark,5,.06))}let d=[],f=[],p=e=>{let t=1/0;for(let n of f)t=Math.min(t,e.distanceTo(n.c)-n.rad*.92);return t},m=n?11:13,h=Array.from({length:3+Math.floor(r()*3)},(t,n)=>{let i=r()*Math.PI*2,a=n===0?0:c*V(r,.45,.8);return U(l.x+Math.cos(i)*a,l.y+V(r,-.45,.35)*c*(e===`tall`?1.4:1),l.z+Math.sin(i)*a*.8)});for(let t=0;t<m;t++){let i=r()*Math.PI*2,s=V(r,-.35,1),u,p;if(n){let e=h[t%h.length],n=c*V(r,.15,.4);u=U(e.x+Math.cos(i)*n*Math.cos(s),e.y+Math.sin(s)*n*.7,e.z+Math.sin(i)*n*Math.cos(s)),p=c*V(r,.3,.46)}else{let t=c*V(r,.45,.8);u=U(l.x+Math.cos(i)*t*Math.cos(s),l.y+Math.sin(s)*t*(e===`tall`?1.2:.75),l.z+Math.sin(i)*t*Math.cos(s)),p=c*V(r,.42,.62)}d.push(o(u,p,n||p<c*.52?a:3)),f.push({c:u,rad:p})}if(!n)d.push(o(l,c*.75,3)),f.push({c:l,rad:c*.75});else for(let e of h)i.push(R(U(s.x*.7,t*.8,s.z*.7),e.clone().multiplyScalar(.9).setY(e.y-c*.2),.1,`#5b4331`,M.bark,4,.05));for(let t of d)Ct(t,l,n?.45:.72,e===`tall`?.8:1.2),i.push(t);if(n){let t=e===`tall`?sn.small:sn.ovate;for(let e=0;e<44;e++){let e=f[Math.floor(r()*f.length)],n=Bn(r);if(n.y<-.3)continue;let a=e.c.clone().addScaledVector(n,e.rad*.95);p(a)>.2||i.push(Pn(a,n,c*V(r,.26,.38),Rn[Math.floor(r()*Rn.length)],n,r()*6.28,M.fringeCard,t))}}if(!n){for(let e=0;e<16;e++){let e=Bn(r),t=c*V(r,.88,1),n=l.clone().add(U(e.x*t,e.y*t*u,e.z*t));for(let r=0;r<24&&p(n)>0;r++)t*=.95,n.copy(l).add(U(e.x*t,e.y*t*u,e.z*t));let a=o(n,c*V(r,.16,.24));Ct(a,l,.7,1.2),i.push(a)}let t=e===`tall`?sn.small:sn.ovate;for(let e=0;e<105;e++){let e=Bn(r),n=c*V(r,.98,1.16),a=l.clone().add(U(e.x*n,e.y*n*u,e.z*n));for(let t=0;t<24&&p(a)>.12;t++)n*=.95,a.copy(l).add(U(e.x*n,e.y*n*u,e.z*n));if(p(a)>.3)continue;let o=e.clone().normalize(),s=e.clone().add(U(V(r,-.5,.5),V(r,-.3,.5),V(r,-.5,.5))).normalize();i.push(Pn(a,s,c*V(r,.16,.24),Rn[Math.floor(r()*Rn.length)],o,r()*6.28,M.leafCard,r()<.8?t:sn.small))}for(let e=0;e<70;e++){let e=r()*Math.PI*2,n=V(r,-.9,.3),a=U(Math.cos(e)*Math.sqrt(1-n*n),n,Math.sin(e)*Math.sqrt(1-n*n)),o=c*1.6,s=l.clone().add(U(a.x*o,a.y*o*u,a.z*o)),d=V(r,.45,.75);for(let e=0;e<40&&p(s)>d;e++)o*=.96,s.copy(l).add(U(a.x*o,a.y*o*u,a.z*o));if(p(s)>d+.2)continue;let f=a.clone().add(U(V(r,-.6,.6),V(r,-.6,.2),V(r,-.6,.6))).normalize();i.push(Pn(s,f,c*V(r,.2,.3),Rn[Math.floor(r()*Rn.length)],a,r()*6.28,M.fringeCard,t))}}}else if(e===`bush`){let e=U(0,.7,0);for(let n=0;n<5;n++){let a=r()*Math.PI*2,o=U(Math.cos(a)*.5,V(r,.45,.85),Math.sin(a)*.5),s=P(St(V(r,.42,.6),1,.16,t+n*5),`#10241a`,M.foliage,0);s.translate(o.x,o.y,o.z),Ct(s,e,.6),i.push(s)}for(let e=0;e<6;e++){let e=r()*Math.PI*2;i.push(R(U(0,0,0),U(Math.cos(e)*1,V(r,.7,1.3),Math.sin(e)*1),.025,`#4a3a2a`,M.bark,4,.01))}let a=n?50:100;for(let t=0;t<a;t++){let t=Bn(r);if(t.y<-.35)continue;let a=V(r,.85,1.4),o=e.clone().add(U(t.x*a,t.y*.75*a+.15,t.z*a)),s=t.clone().add(U(V(r,-.5,.5),V(r,-.2,.5),V(r,-.5,.5))).normalize(),c=r()<.7?sn.broad:sn.ovate;i.push(Pn(o,s,V(r,.45,.7)*(n?1.3:1),Rn[Math.floor(r()*Rn.length)],t,r()*6.28,M.leafCard,c))}}else{let e=V(r,9,12);i.push(R(U(0,-.3,0),U(0,e*.9,0),.3,`#4e3a2a`,M.bark,6,.08));let a=e*.3,o=e*1.02,s=e=>2.1*(1-(e-a)/(o-a))+.35,c=n?4:5;for(let e=0;e<c;e++){let n=e/(c-1),l=a+.4+n*(o-a-1),u=P(St(s(l)*.95+.25,1,.2,t+e*11),Rn[e%Rn.length],M.foliage);u.scale(1,1.25,1),u.translate(V(r,-.12,.12),l,V(r,-.12,.12)),Ct(u,U(0,l-.6,0),.6,.7),i.push(u)}for(let e=0;e<(n?3:8);e++){let n=a+.3+r()*(o-a-1.4),c=r()*Math.PI*2,l=s(n)*.85,u=P(St(l*V(r,.4,.6)+.2,1,.2,t+100+e),Rn[Math.floor(r()*Rn.length)],M.foliage);u.scale(1,1.1,1),u.translate(Math.cos(c)*l,n,Math.sin(c)*l),Ct(u,U(0,n-.6,0),.6,.7),i.push(u)}for(let e=0;e<(n?40:90);e++){let e=a+.2+r()**.8*(o-a-.2),t=r()*Math.PI*2,n=s(e)*V(r,.95,1.2),c=U(Math.cos(t),V(r,-.3,.4),Math.sin(t)).normalize();i.push(Pn(U(Math.cos(t)*n,e,Math.sin(t)*n),c,V(r,.9,1.4),Rn[Math.floor(r()*Rn.length)],c,r()*6.28,M.fringeCard,sn.small))}}return z(i)}function Bn(e){let t=e()*2-1,n=e()*Math.PI*2,r=Math.sqrt(1-t*t);return U(r*Math.cos(n),t*.85+.12,r*Math.sin(n)).normalize()}function Vn(e,t){let n=[];n.push(R(U(0,-.3,0),U(0,e,0),.15,`#6e5d49`,M.bark,8,.12));let r=L(.17,.17,1.8,`#ffffff`,M.guard,10);r.translate(0,.9,0),n.push(r),n.push(F(I(1.7,.12,.12,`#4a3d30`),0,e-.5,0)),n.push(F(I(1.1,.1,.1,`#4a3d30`),0,e-1.3,0));let i=[];for(let t of[-.7,0,.7])n.push(F(L(.05,.06,.16,`#dcdcd4`,M.metal,6),t,e-.36,0)),i.push(U(t,e-.28,0));for(let t of[-.45,.45])n.push(F(L(.04,.05,.12,`#dcdcd4`,M.metal,6),t,e-1.18,0)),i.push(U(t,e-1.12,0));n.push(R(U(-.6,e-.55,0),U(0,e-1.1,0),.03,`#4a4a4a`,M.metal,4)),n.push(R(U(.6,e-.55,0),U(0,e-1.1,0),.03,`#4a4a4a`,M.metal,4)),t&&(n.push(F(L(.28,.28,.8,`#8f959a`,M.metal,12),.38,e-2.6,0)),n.push(F(L(.3,.3,.06,`#747a7e`,M.metal,12),.38,e-2.18,0)));for(let t=2.2;t<e-1.5;t+=.45)n.push(F(I(.22,.03,.03,`#555`),0,t,0,0,t*2));return{geo:z(n),tips:i}}function Hn(e){let t=[];t.push(F(L(.035,.035,2.4,`#b8bcc0`,M.metal,6),0,1.2,-.03));let n=I(.62,.62,.03,`#eeb622`,M.metal);F(n,0,2.25,.02,0,0,Math.PI/4),t.push(n);let r=I(.7,.7,.02,`#1e1a16`,M.metal);F(r,0,2.25,-.005,0,0,Math.PI/4),t.push(r);let i=`#1b1814`;if(e===0)t.push(F(I(.07,.3,.02,i),-.02,2.13,.045)),t.push(F(I(.07,.22,.02,i),.06,2.34,.045,0,0,-.6)),t.push(F(I(.16,.05,.02,i),.12,2.43,.045,0,0,-.6));else if(e===1)for(let e of[-.09,.09])t.push(F(L(.035,.035,.02,i,M.metal,10),e,2.4,.045,Math.PI/2)),t.push(F(I(.06,.2,.02,i),e,2.24,.045)),t.push(F(I(.04,.14,.02,i),e-.03,2.09,.045,0,0,.3)),t.push(F(I(.04,.14,.02,i),e+.03,2.09,.045,0,0,-.3));else t.push(F(I(.07,.26,.02,i),0,2.12,.045)),t.push(F(I(.06,.2,.02,i),-.07,2.32,.045,0,0,.55)),t.push(F(I(.06,.2,.02,i),.07,2.32,.045,0,0,-.55));return z(t)}var Un=[`#8a8578`,`#7e7b70`,`#938d82`,`#827d72`],Wn=[`#3a4a30`,`#2e3e28`,`#44543a`],Gn=`#4a4640`;function Kn(e){let t=B(e),n=[],r=V(t,.38,.6),i=V(t,.65,1.15),a=V(t,.12,.18),o=Un[Math.floor(t()*Un.length)],s=Wn[Math.floor(t()*Wn.length)],c=t(),l=I(r,i,a,o,M.stone);if(F(l,0,i/2,0),n.push(l),c>.45&&c<=.75){let e=L(r/2,r/2,a,o,M.stone,10);e.rotateX(Math.PI/2),e.scale(1,.5,1),e.translate(0,i+r*.14,0),n.push(e)}else if(c>.75){let e=r*.5,s=V(t,.12,.22),c=new C;c.moveTo(-e,0),c.lineTo(e,0),c.lineTo(0,s),c.closePath();let l=new f(c,{depth:a,bevelEnabled:!1});l.translate(0,0,-a/2);let u=P(l,o,M.stone);F(u,0,i,0),n.push(u)}let u=V(t,-.06,.06);if(t()<.4){let e=r*.08,t=i*.28,o=i*.68,s=a/2+.006;n.push(F(I(e,t,.012,Gn,M.stone),0,o,s)),n.push(F(I(t*.55,e,.012,Gn,M.stone),0,o+t*.18,s))}let d=r+V(t,.06,.14),p=V(t,.08,.14);n.push(F(I(d,p,a+.04,s,M.stone),0,p/2-.01,0));let m=i*V(t,.12,.3);n.push(F(I(r-.02,m,a+.008,s,M.stone),0,m/2,0));let h=z(n);return Math.abs(u)>.01&&(h.rotateX(u),h.rotateZ(u*.5)),h}var qn=[`#cf520e`,`#bd4606`,`#dc6316`,`#c24c08`,`#a83e04`],Jn=[`#ffaa18`,`#ff9300`,`#ffba30`];function Yn(e){let t=B(e),n=[],r=qn[Math.floor(t()*qn.length)],i=Jn[Math.floor(t()*Jn.length)],a=V(t,.22,.32),o=V(t,.72,.82);for(let e=0;e<3;e++){let t=_t(a,r,M.plain,12,10);t.scale(1.08,o,.94),t.rotateY(e*Math.PI/3),t.translate(0,a*o,0),n.push(t)}let s=a*.45,c=L(a/.25*.035,a/.25*.05,s,`#2e3b1c`,M.bark,6);c.rotateZ(V(t,.15,.35)),c.rotateY(t()*6.28),c.translate(V(t,-.02,.02),a*o*1.95+s*.4,0),n.push(c);let l=a*.95,u=a*o*1.15,d=a*.36,f=a*.22,p=I(f,f*.8,.04,i,M.fire);p.rotateZ(.3),F(p,-d,u,l),n.push(p);let m=I(f,f*.8,.04,i,M.fire);m.rotateZ(-.3),F(m,d,u,l),n.push(m);let h=I(f*.55,f*.55,.04,i,M.fire);F(h,0,u-a*.2,l+.02),n.push(h);let g=a*o*.65,_=a*.85,v=a*.2;n.push(F(I(_*.65,v*.7,.04,i,M.fire),0,g,l+.02));let y=I(_*.35,v*.6,.04,i,M.fire);y.rotateZ(.35),F(y,-_*.38,g+v*.35,l),n.push(y);let b=I(_*.35,v*.6,.04,i,M.fire);b.rotateZ(-.35),F(b,_*.38,g+v*.35,l),n.push(b);let x=a*.12;n.push(F(I(x,x*.9,.05,r,M.plain),-a*.16,g+v*.25,l+.03)),n.push(F(I(x,x*.9,.05,r,M.plain),a*.16,g+v*.25,l+.03)),n.push(F(I(x*.9,x*.85,.05,r,M.plain),0,g-v*.25,l+.03));let S=z(n),C=V(t,-.08,.08);return Math.abs(C)>.01&&(S.rotateZ(C),S.rotateX(C*.4)),S}function Xn(e){let t=B(e),n=[],r=Un[Math.floor(t()*Un.length)],i=Wn[Math.floor(t()*Wn.length)],a=V(t,.65,.85),o=V(t,.12,.18),s=a*.75,c=V(t,.12,.16);n.push(F(I(a,o,a,i,M.stone),0,o/2,0)),n.push(F(I(s,c,s,r,M.stone),0,o+c/2,0));let l=V(t,1.4,2),u=V(t,.18,.24),d=V(t,.14,.18),f=V(t,.7,.95),p=o+c+l*.72;n.push(F(I(u,l,d,r,M.stone),0,o+c+l/2,0)),n.push(F(I(f,u,d+.01,r,M.stone),0,p,0));let m=f*.32,h=P(new te(m,d*.22,6,16),r,M.stone);h.translate(0,p,0),n.push(h);let g=l*V(t,.15,.3);n.push(F(I(u+.01,g,d+.01,i,M.stone),0,o+c+g/2,0));let _=z(n),v=V(t,-.07,.07),y=V(t,-.06,.06);return _.rotateX(v),_.rotateZ(y),_}function Zn(e){let t=B(e),n=[],r=Un[Math.floor(t()*Un.length)],i=Wn[Math.floor(t()*Wn.length)],a=V(t,1.8,2.2),o=V(t,.85,1.05),s=V(t,.55,.72);n.push(F(I(a+.14,.12,o+.14,i,M.stone),0,.06,0)),n.push(F(I(a,s,o,r,M.stone),0,.12+s/2,0));for(let e of[-1,1])for(let t of[-1,1])n.push(F(I(.12,s+.04,.12,Gn,M.stone),e*(a/2-.04),.12+s/2,t*(o/2-.04)));let c=.14,l=.12+s+c/2,u=I(a+.12,c,o+.12,r,M.stone),d=t()<.35;if(d?(u.rotateY(V(t,.08,.18)),u.translate(V(t,.06,.12),l,V(t,.04,.08)),n.push(F(I(a-.1,.02,o-.1,`#0b0c10`,M.plain),0,.12+s,0))):u.translate(0,l,0),n.push(u),!d&&t()<.6&&(n.push(F(I(a*.55,.02,.12,Gn,M.stone),0,l+c/2+.01,0)),n.push(F(I(.12,.02,o*.45,Gn,M.stone),-a*.08,l+c/2+.01,0))),t()<.25){let e=Yn(Math.floor(t()*1e5));e.scale(.85,.85,.85),e.translate(V(t,-a*.25,a*.25),l+c/2,V(t,-o*.2,o*.2)),n.push(e)}let f=z(n),p=V(t,-.04,.04);return f.rotateZ(p),f}var Qn=[`#c42028`,`#e66214`,`#d89814`,`#661226`,`#986814`,`#ee781c`,`#8c1622`];function $n(e){let t=B(e),n=[],r=V(t,8,14);for(let e=0;e<r;e++){let e=Qn[Math.floor(t()*Qn.length)],r=I(V(t,.08,.16),.005,V(t,.07,.14),e,M.plain);r.rotateY(t()*Math.PI*2),r.rotateX(V(t,-.15,.15)),r.rotateZ(V(t,-.15,.15));let i=Math.sqrt(t())*.45,a=t()*Math.PI*2;r.translate(Math.cos(a)*i,.004,Math.sin(a)*i),n.push(r)}return z(n)}function er(){let e=[],t=`#0b0d12`;return e.push(F(L(.18,.32,1.6,t,M.plain,8),0,.8,0)),e.push(F(_t(.15,t,M.plain,8,6),0,1.68,0)),z(e)}function tr(e){let t=B(e),n=[],r=V(t,6,10),i=V(t,5,7),a=t()>.6?V(t,4.6,5.4):V(t,2.6,3.2),o=t()>.45?bn:gn,s=t()>.7,c=s?t()>.5?`#8a4a34`:`#4f6878`:xn,l=(e,t,r,i,a,l)=>{n.push(F(I(e,r,t,o,M.plain),i,r/2,a)),n.push(F(I(e+.1,.5,t+.05,_n),i,.25,a));let u=t/2+.7,d=u/Math.cos(l);for(let o of[-1,1]){let f=I(e+1.2,.2,d,c,s?M.metal:M.roof);f.rotateX(o*l),f.translate(i,r+t/2*Math.tan(l)-u*Math.tan(l)/2+.1,a+o*u/2),n.push(f)}for(let s of[-1,1]){let c=wn(t,t/2*Math.tan(l),.1,o,M.plain);c.rotateY(Math.PI/2),c.translate(i+s*e/2-s*.05,r,a),n.push(c)}for(let o of[-1,1])n.push(F(I(e*.7,.9,.06,`#e8dcc0`,M.plain),i,r*.55,a+o*(t/2+.02)))};return l(r,i,a,0,0,V(t,.45,.6)),t()>.45&&l(r*V(t,.4,.6),i*.8,a>4?a*.55:a*.9,r*.5+1.5,V(t,-1,1),.5),z(n)}function nr(){let t=[],n=10.5;t.push(F(I(34,n,9,`#e9e4d6`,M.plain),0,n/2,0)),t.push(F(I(34.4,.5,9.4,`#b9b4a8`,M.plain),0,10.75,0));for(let e=0;e<3;e++){t.push(F(I(32,1.5,.08,`#5f7488`,M.plain),0,1.6+e*3.3,4.54)),t.push(F(I(33,.18,.5,`#cfc9ba`,M.plain),0,.7+e*3.3,4.75));for(let n=0;n<=12;n++)t.push(F(I(.14,1.5,.12,`#e9e4d6`,M.plain),-16+n*32/12,1.6+e*3.3,4.58))}t.push(F(I(5,13.5,5,`#e3ddcd`,M.plain),13,13.5/2,.8));let r=P(new se(1.25,20),`#f6f2e6`,M.plain);r.translate(13,11.5,3.33),t.push(r);let i=P(new e(1.25,1.45,20),`#2a2622`,M.plain);i.translate(13,11.5,3.34),t.push(i),t.push(F(I(.14,.95,.05,`#2a2622`),13,11.9,3.37)),t.push(F(I(.7,.14,.05,`#2a2622`),13.32,11.5,3.37));let a=P(new y(9,9,20,16,1,!1,0,Math.PI),`#6f8494`,M.metal);return a.rotateZ(Math.PI/2),a.rotateY(Math.PI/2),a.scale(1,.32,1),a.translate(-29,6,0),t.push(a),t.push(F(I(18,6,20,`#e2dccb`,M.plain),-29,3,0)),z(t)}function rr(){let e=[];for(let[t,n]of[[-2,-2],[2,-2],[-2,2],[2,2]])e.push(R(U(t*1.3,0,n*1.3),U(t*.8,16,n*.8),.18,`#8c9290`,M.metal,5));for(let t=4;t<16;t+=4)e.push(F(I(4.2,.15,4.2,`#8c9290`,M.metal),0,t,0));return e.push(F(L(3,3,4.2,`#c4c8c2`,M.metal,16),0,18.1,0)),e.push(F(L(.2,3.1,1.2,`#aeb3ad`,M.metal,16),0,20.8,0)),z(e)}function ir(e){let t=B(e),n=V(t,2.4,3.6),r=V(t,2,2.8),i=V(t,2,2.5),a=[F(I(n,i,r,t()>.5?vn:`#6a5a48`,M.planks),0,i/2,0)],o=I(n+.5,.08,r+.7,t()>.5?`#8a553a`:`#6f7f86`,M.metal);return o.rotateX(.2),o.translate(0,i+.25,0),a.push(o),a.push(F(I(.9,1.7,.05,_n),n*.2,.85,r/2+.03)),z(a)}function ar(e){let t=B(e),n=[`#5f7ea0`,`#a8584a`,`#c8b890`][Math.floor(t()*3)],r=[R(U(0,-.3,0),U(0,1.9,0),.04,`#6e5d49`,M.bark,5),R(U(-.75,1.35,0),U(.75,1.4,0),.03,`#6e5d49`,M.bark,5),F(I(.5,.6,.22,n,M.cloth),0,1.2,0),F(I(1.3,.16,.18,n,M.cloth),0,1.38,0),F(_t(.16,`#e8e0c8`),0,1.72,0)],i=P(new fe(.36,.2,10),`#d8c078`,M.plain);return i.translate(0,1.9,0),r.push(i),z(r)}function or(e){let t=B(e),n=[];for(let e=0;e<26;e++){let r=t()*Math.PI*2,i=Math.sqrt(t())*3.2,a=U(Math.cos(r)*i,-.2,Math.sin(r)*i),o=V(t,9,14),s=U(Math.cos(r)*V(t,.6,2.2),o,Math.sin(r)*V(t,.6,2.2)),c=a.clone().add(s);n.push(R(a,c,.07,e%3?`#7e9a50`:`#93a860`,M.plain,5,.035));for(let e=0;e<7;e++){let r=V(t,.45,1),i=a.clone().lerp(c,r),o=U(V(t,-1,1),V(t,-.2,.5),V(t,-1,1)).normalize();n.push(Pn(i.addScaledVector(o,.5),o,V(t,1.4,2.1),[`#3f6a34`,`#4f7a3a`,`#35602e`][e%3],o,t()*6.28,M.fringeCard,sn.lance))}}return z(n)}var sr=new T,cr=new T,lr=new T,ur=new T(`#4a583c`);function dr(e,t,n,r,i,a,o,s,c,l=3){let u=B(o),d=[],f=[],p=[];sr.set(i),cr.set(a);let m=new T;for(let i=0;i<e;i++){let e=u()*Math.PI*2,i=t*V(u,.65,1.1),o=n*V(u,.7,1.2),h=Math.cos(e)*s*u(),g=Math.sin(e)*s*u(),_=Math.cos(e+V(u,-.6,.6)),v=Math.sin(e+V(u,-.6,.6)),y=r*V(u,.5,1.3),b=-v,x=_,S=d.length/3,C=u();cr.set(a),C>.72?cr.lerp(ur,.55):C<.25&&cr.multiplyScalar(.72);for(let e=0;e<=l;e++){let t=e/l,n=i*t,r=y*t*t*i,a=o*(1-t*.92)*.5,s=h+_*r,u=g+v*r;d.push(s-b*a,n,u-x*a,s+b*a,n,u+x*a),c?(lr.set(c),t<.5?m.copy(sr).lerp(lr,t*2):m.copy(lr).lerp(cr,((t-.5)*2)**.9)):m.copy(sr).lerp(cr,t**.8),f.push(m.r,m.g,m.b,m.r,m.g,m.b)}for(let e=0;e<l;e++){let t=S+e*2;p.push(t,t+1,t+2,t+1,t+3,t+2)}}let h=new b;return h.setAttribute(`position`,new ae(d,3)),h.setAttribute(`color`,new ae(f,3)),h.setIndex(p),h.computeVertexNormals(),P(h,null,M.grass),ut(h,0,t,1,1.6),h}var fr=e=>dr(10,.85,.036,.12,`#101a12`,`#324424`,e,.14,`#1d2e18`,2),pr=e=>dr(13,1,.038,.17,`#101a12`,`#324424`,e,.18,`#1c2b16`,2),mr=e=>dr(7,.4,.034,.2,`#121d14`,`#324424`,e,.1,`#20301a`),hr=e=>dr(5,.32,.036,.3,`#142016`,`#384a28`,e,.1,`#22301c`,2);function gr(e){let t=B(e),n=[],r=[],i=[],a=new T(`#121c12`),o=new T(`#1a2818`),s=new T(`#364826`),c=new T;for(let e=0;e<3;e++){let l=e-1,u=.42*(l===0?V(t,.95,1.05):V(t,.72,.88)),d=l*V(t,.34,.5)+V(t,-.06,.06),f=Math.cos(d)*.7,p=V(t,.022,.03),m=n.length/3;for(let e=0;e<=3;e++){let t=e/3,i=u*t*(1-Math.abs(d)*.25*t),l=Math.sin(d)*u*t*(.55+.45*t),m=p*(1-t*.9)*.5;n.push(l-f*m,i,-.7*m,l+f*m,i,.7*m),t<.45?c.copy(a).lerp(o,t/.45):c.copy(o).lerp(s,((t-.45)/.55)**1.3),r.push(c.r,c.g,c.b,c.r,c.g,c.b)}for(let e=0;e<3;e++){let t=m+e*2;i.push(t,t+1,t+2,t+1,t+3,t+2)}}let l=new b;return l.setAttribute(`position`,new ae(n,3)),l.setAttribute(`color`,new ae(r,3)),l.setIndex(i),l.computeVertexNormals(),P(l,null,M.grass),ut(l,0,.42,.6,1.6),l}function _r(){let e=new w(.13,.13);e.rotateX(-Math.PI/2+.55);let t=new y(.005,.008,.7,3,1);t.translate(0,-.35,0);let n=dr(5,.26,.035,.35,`#24452a`,`#5f8a3a`,71,.05,`#35602c`,2);return n.translate(0,-.64,0),z([P(e,`#ffffff`,M.flower),P(t,`#3f6a2a`,M.plain,.6),n])}function vr(e,t){let n=B(e),r=[],i=[`#1e3f2a`,`#244a2c`,`#2a5230`,`#1b3a28`];if(t===`lance`)for(let e=0;e<4;e++){let e=n()*Math.PI*2,t=V(n,.7,1.15),a=new p(Math.cos(e)*t*.18,t,Math.sin(e)*t*.18);r.push(R(new p(Math.cos(e)*.04,0,Math.sin(e)*.04),a,.009,`#3f6a2c`,M.plain,3,.004));for(let t=0;t<5;t++){let o=.25+t*.16,s=a.clone().multiplyScalar(o),c=new p(Math.cos(e+t*2.2),.55,Math.sin(e+t*2.2)).normalize();r.push(Pn(s.clone().addScaledVector(c,.14),c,V(n,.36,.5),i[t%4],new p(c.x,.8,c.z).normalize(),V(n,-.5,.5),M.leafCard,sn.lance))}}else for(let e=0;e<9;e++){let t=e/9*Math.PI*2+n()*.5,a=new p(Math.cos(t),V(n,.6,1.1),Math.sin(t)).normalize(),o=new p(Math.cos(t)*.18,V(n,.18,.36),Math.sin(t)*.18);r.push(Pn(o,a,V(n,.42,.6),i[e%4],new p(a.x*.4,1,a.z*.4).normalize(),V(n,-.4,.4),M.leafCard,sn.broad))}let a=z(r);return ut(a,0,1.1,.6,1.5),a}function yr(e,t,n,r){let i=B(e),a=[dr(7,n*.45,.04,.3,`#22412a`,`#5f8a3a`,e+3,.08,`#35602c`,2)];for(let e=0;e<5;e++){let o=e/5*Math.PI*2+i(),s=new p(Math.cos(o)*V(i,.05,.16),n*V(i,.75,1),Math.sin(o)*V(i,.05,.16));a.push(R(new p(0,0,0),s,.006,`#3e6a2c`,M.plain,3,.003));for(let e=0;e<t/5;e++){let t=s.clone().add(new p(V(i,-1,1),V(i,-.8,.5),V(i,-1,1)).multiplyScalar(n*.14)),o=new w(r,r);o.rotateX(-Math.PI/2+V(i,.3,.9)),o.rotateY(i()*Math.PI*2),o.translate(t.x,t.y,t.z),a.push(P(o,e%7==0?`#e8e0f0`:`#ffffff`,M.flower))}}let o=z(a);return ut(o,0,n,.7,1.4),o}function br(){return P(new w(.06,.06),`#ffffff`,M.mote)}function xr(e){let t=B(e),n=[],r=new y(.007,.011,.8,4,1);r.translate(0,.4,0),n.push(P(r,`#4d7a2c`,M.plain)),n.push(dr(8,.3,.05,.45,`#22412a`,`#5f8a3a`,e+5,.06,`#35602c`,2));for(let e=0;e<26;e++){let r=e/25,i=.42+r*.38,a=e*2.4+t(),o=.035*(1-r*.6),s=new w(.045*(1-r*.4),.045*(1-r*.4));s.rotateX(-.4),s.rotateY(a),s.translate(Math.cos(a)*o,i,Math.sin(a)*o),n.push(P(s,e%5==0?`#f0eaf6`:`#ffffff`,M.flower))}let i=z(n);return ut(i,0,.8,.5,1.5),i}function Sr(e){let t=new a(1,2);t.deleteAttribute(`uv`),t.deleteAttribute(`normal`),t=we(t);let n=t.attributes.position,r=new p;for(let t=0;t<n.count;t++){r.fromBufferAttribute(n,t);let i=Math.sin(r.x*2.1+e)*Math.sin(r.y*2.7+e*1.3)*Math.sin(r.z*2.3+e*.7);r.multiplyScalar(1+.22*i),r.y=r.y>0?r.y*.62:r.y*.3,n.setXYZ(t,r.x*1.2,r.y,r.z)}t.computeVertexNormals();let i=new Float32Array(n.count*3),o=new T(`#5f5b62`),s=new T(`#3e3a42`),c=new T(`#3f6a30`),l=new T(`#5a8438`),u=new T,d=t.attributes.normal;for(let t=0;t<n.count;t++){let r=d.getY(t),a=n.getX(t),f=n.getY(t),p=n.getZ(t),m=.5+.5*Math.sin(a*5.3+e)*Math.sin(p*4.7-e)*Math.sin(f*6.1+1.3);u.copy(o).lerp(s,.4+.6*(1-m)*(r<0?1:.5));let h=Math.max(0,Math.min(1,(r-.1+(m-.5)*.7)*2.2));u.lerp(c.clone().lerp(l,m*Math.max(0,r)),h),i[t*3]=u.r,i[t*3+1]=u.g,i[t*3+2]=u.b}return t.setAttribute(`color`,new D(i,3)),P(t,null,M.stone)}function Cr(){let e=[],t=[];for(let n of[1,-1])for(let[r,i,a,o]of[[-.012,.062,.042,7],[.022,.042,.03,6]]){let s=e.length/3;e.push(0,0,r);for(let t=0;t<=o;t++){let s=-Math.PI/2+t/o*Math.PI;e.push(n*Math.cos(s)*i,0,r+Math.sin(s)*a*(r<0?1.1:1))}for(let e=0;e<o;e++)t.push(s,s+1+e,s+2+e)}let n=new b;return n.setAttribute(`position`,new ae(e,3)),n.setIndex(t),n.computeVertexNormals(),P(n,`#ffffff`,M.butterfly)}function wr(e=5.4){let t=(e,t)=>new p(e,t,0);return z([F(I(.2,.16,.2,`#4a4a46`,M.metal),-.12,e,0),R(t(-.15,e),t(-.7,e+.28),.025,`#4a4a46`,M.metal,5),R(t(-.7,e+.28),t(-1.12,e+.22),.025,`#4a4a46`,M.metal,5),F(I(.44,.08,.24,`#5a5c58`,M.metal),-1.2,e+.17,0),F(I(.38,.04,.18,`#fff4dc`,M.glow),-1.2,e+.115,0)])}var Tr=130,Er=14.6,Dr=20,Or=6,kr=-4.9,Ar=40,jr=3.95,Mr=[{z:-40,w:7.2,d:6.2,floors:2,u:7.6,ac:!0,seed:11,tilt:-.22},{z:-53,w:6.6,d:6,floors:2,shop:!0,u:6.4,ac:!0,balcony:!1,seed:23,tilt:-.45},{z:-67,w:7.6,d:6.6,floors:2,u:8.2,seed:37,tilt:-.15},{z:-82,w:6.8,d:6,floors:1,u:7.4,ac:!0,seed:41,tilt:-.3},{z:-104,w:5.6,d:5.2,floors:1,u:6.3,seed:83,tilt:-.35,kind:`dagashi`},{z:-113,w:5.2,d:5,floors:2,u:6.5,seed:89,tilt:-.3,kind:`closed`,balcony:!1,ac:!0},{z:-122.5,w:6,d:5.6,floors:1,u:6.4,seed:97,tilt:-.3,kind:`ramen`,ac:!0},{z:-228,w:8.2,d:7,floors:2,u:8.6,ac:!0,seed:53,tilt:-.2},{z:-244,w:6,d:5.4,floors:1,u:7.8,seed:67,tilt:-.35},{z:-505,w:7.4,d:6.6,floors:2,u:8.4,seed:79,ac:!0,tilt:-.25}],Nr=[{z:-28,kind:2},{z:-150,kind:0},{z:-262,kind:1},{z:-420,kind:0},{z:-560,kind:2}],Pr=[],Fr=[],Ir=e=>Mr.some(t=>e<t.z+t.d/2+5&&e>t.z-t.d/2-2.5),Lr=e=>Mr.some(t=>e-t.z<42&&e-t.z>-t.d),Rr=e=>e<-46&&e>-55,zr=(e,t)=>{for(let n of Mr)if(t<n.z+n.d/2+4.5&&t>n.z-n.d/2-1&&e>3.5&&e<n.u+n.w+1)return!0;return!1},Br=[{z0:-96,z1:-140,u0:3,u1:6.2},{z0:-184,z1:-209,u0:3,u1:14.5},{z0:-230,z1:-253,u0:3,u1:6.4}],Vr=(e,t,n=.8)=>{for(let r of Mr)if(Math.abs(t-r.z)<r.d/2+n+1.4&&e>r.u-n-.8&&e<r.u+r.w+n)return!0;for(let r of Br)if(t<r.z0&&t>r.z1&&e>r.u0&&e<r.u1+n*.5)return!0;return!1};function Hr(e,t){return-.42+e*.19+.09*Math.sin(t*1.7+e*2.3)}var Ur=null,Wr=new Map,Gr=(e,t)=>()=>{let n=Wr.get(e);return n||Wr.set(e,n=t()),n},Kr=(e,t,n)=>Gr(`${e}${t}:${n??0}`,()=>zn(e,t,n)),qr={trees:{round:[Kr(`round`,1),Kr(`round`,2),Kr(`round`,3)],tall:[Kr(`tall`,4),Kr(`tall`,5)],bush:[Kr(`bush`,6),Kr(`bush`,7)],cedar:[Kr(`cedar`,8),Kr(`cedar`,9)]},far:{round:[Kr(`round`,11,1),Kr(`round`,12,1),Kr(`round`,13,1)],tall:[Kr(`tall`,14,1),Kr(`tall`,15,1)],bush:[Kr(`bush`,16,1)],cedar:[Kr(`cedar`,18,1),Kr(`cedar`,19,1)]},grass:[Gr(`g1`,()=>fr(1)),Gr(`g2`,()=>fr(2)),Gr(`g3`,()=>fr(3))],verge:[Gr(`v21`,()=>pr(21)),Gr(`v22`,()=>pr(22)),Gr(`v23`,()=>pr(23))],short:Gr(`short`,()=>mr(4)),fringe:Gr(`fringe`,()=>hr(6)),rice:Gr(`rice`,()=>gr(5)),flower:Gr(`flower`,()=>_r()),fly:Gr(`fly`,()=>Cr()),spike:Gr(`spike`,()=>xr(9)),rocks:[Gr(`r1`,()=>Sr(1)),Gr(`r2`,()=>Sr(2.7))],lance:[Gr(`l1`,()=>vr(31,`lance`)),Gr(`l2`,()=>vr(32,`lance`))],broad:[Gr(`b1`,()=>vr(41,`broad`)),Gr(`b2`,()=>vr(42,`broad`))],florets:[Gr(`f1`,()=>yr(51,44,.75,.034)),Gr(`f2`,()=>yr(52,30,.55,.03)),Gr(`f3`,()=>yr(53,24,.5,.04)),Gr(`f4`,()=>yr(54,36,.95,.03))],hydrangea:Gr(`hy`,()=>yr(61,90,.95,.075)),bamboo:Gr(`bam`,()=>or(71))};function Jr(){let e=[],t=n=>{if(typeof n==`function`)e.push(n);else if(n&&typeof n==`object`)for(let e of Object.values(n))t(e)};return t(qr),e}function Yr(){if(!Ur){let e=e=>Object.fromEntries(Object.entries(e).map(([e,t])=>[e,t.map(e=>e())]));Ur={trees:e(qr.trees),far:e(qr.far),grass:qr.grass.map(e=>e()),verge:qr.verge.map(e=>e()),short:qr.short(),fringe:qr.fringe(),rice:qr.rice(),flower:qr.flower(),fly:qr.fly(),spike:qr.spike(),rocks:qr.rocks.map(e=>e()),lance:qr.lance.map(e=>e()),broad:qr.broad.map(e=>e()),florets:qr.florets.map(e=>e()),hydrangea:qr.hydrangea(),bamboo:qr.bamboo()}}return Ur}var Xr=new c,Zr=new le,Qr=new g,$r=new p,ei=new p,ti=()=>({m:[],c:[]});function ni(e,t,n,r,i,a,o=a,s,l=0,u=0){Qr.set(l,i,u,`YXZ`),Zr.setFromEuler(Qr),e.m.push(new c().compose($r.set(t,n,r),Zr,ei.set(a,o,a))),e.c.push(s??new T(1,1,1))}function ri(e,t,n){if(!n.m.length)return null;let r=new s(e,t,n.m.length);for(let e=0;e<n.m.length;e++)r.setMatrixAt(e,n.m[e]),r.setColorAt(e,n.c[e]);return r.instanceMatrix.needsUpdate=!0,r.instanceColor&&(r.instanceColor.needsUpdate=!0),r.computeBoundingSphere(),r.computeBoundingBox(),r}function ii(e,t){let n=new v(e,t);return n.matrixAutoUpdate=!1,n.updateMatrix(),n}function ai(e,t,n,r,i=0){return Qr.set(0,r,0,`YXZ`),Zr.setFromEuler(Qr),Xr.compose($r.set(A(n)+t,i,n),Zr,ei.set(1,1,1)),e.applyMatrix4(Xr)}var W=e=>new T(e),oi=(e,t,n,r,i)=>{let a=e.clone();return a.offsetHSL(V(t,-n,n),V(t,-r,r),V(t,-i,i)),a},si=[-5.4,-4.6,-4,-3.4,-2.6,0,2.6,3.4,4.2,5.2,6.4,8,10,12.5,15.5,19,23,28,34,41,49,58,68,80,94,110,130,155,185,220,260];function ci(e,t,n,r){let i=Math.round(640/n),a=e/n,o=-t/640*i,s=Math.floor(a),c=Math.floor(o),l=a-s,u=o-c,d=(e,t)=>{let n=Math.sin(e*127.1+(t%i+i)%i*311.7+r*74.7)*43758.5453;return n-Math.floor(n)},f=l*l*(3-2*l),p=u*u*(3-2*u),m=d(s,c),h=d(s+1,c),g=d(s,c+1),_=d(s+1,c+1);return m+(h-m)*f+(g-m)*p+(m-h-g+_)*f*p}var li=(e,t)=>ct(.25,.5,ci(e,t,3.2,1)*.72+ci(e,t,1.1,2)*.28),ui=W(`#1a1714`),di=W(`#2a241b`),fi=W(`#142216`);function pi(e,t,n){let r=st(e,t,3);if(e<-3.2)return n.set(`#1a2b1e`).offsetHSL(0,0,(r-.5)*.04);if(e<3.3)return n.set(`#1c2d1e`);if(e<7.5){n.copy(ui).lerp(di,ci(e,t,1.7,5)*.7).lerp(fi,ct(.15,.7,li(e,t)));let r=W(`#253820`).lerp(W(`#1a2b1c`),.35);return zr(e,t)?n.lerp(W(`#322e28`),.85):n.lerp(r,ct(5.8,7.5,e))}n.set(`#253820`);let i=st(e*.5,t,7);return n.lerp(W(`#364828`),ct(.62,.85,i)*.45),n.lerp(W(`#1e2e1c`),ct(40,90,e)),n.lerp(W(`#162418`),ct(110,200,e)*.8),zr(e,t)&&n.lerp(W(`#322e28`),.85),n}function mi(e,t){let n=Math.round((e-t)/2)+1,r=si.length,i=new Float32Array(n*r*3),a=new Float32Array(n*r*3),o=new T;for(let s=0;s<n;s++){let c=e-s/(n-1)*(e-t);for(let e=0;e<r;e++){let t=si[e],n=(s*r+e)*3;i[n]=A(c)+t,i[n+1]=j(t,c),i[n+2]=c,pi(t,c,o),a[n]=o.r,a[n+1]=o.g,a[n+2]=o.b}}let s=[];for(let e=0;e<n-1;e++)for(let t=0;t<r-1;t++){let n=e*r+t,i=n+1,a=n+r,o=a+1;s.push(n,i,a,i,o,a)}let c=new b;return c.setAttribute(`position`,new D(i,3)),c.setAttribute(`color`,new D(a,3)),c.setIndex(s),c.computeVertexNormals(),P(c,null,M.ground)}function hi(e,t){let n=[-et,-3,-2.4,-1.2,0,1.2,2.4,3,et],r=Math.round(e-t)+1,i=[],a=[];for(let t=0;t<r;t++){let r=e-t;for(let e of n)i.push(A(r)+e,.02,r),a.push(e,-r)}let o=[],s=n.length;for(let e=0;e<r-1;e++)for(let t=0;t<s-1;t++){let n=e*s+t,r=n+1,i=n+s,a=i+1;o.push(n,r,i,r,a,i)}let c=new b;return c.setAttribute(`position`,new ae(i,3)),c.setAttribute(`uv`,new ae(a,2)),c.setIndex(o),c}function gi(e,t,n,r,i,a){let o=Math.max(1,Math.round(Math.abs(n-r)/2.5)),s=new w(Math.abs(t-e),Math.abs(n-r),1,o);s.rotateX(-Math.PI/2),s.translate((e+t)/2,i,(n+r)/2);let c=s.attributes.position,l=s.attributes.uv;for(let e=0;e<c.count;e++)l.setXY(e,c.getX(e),c.getZ(e));return xt(s),s.deleteAttribute(`normal`),s.setAttribute(`aP`,new D(new Float32Array(c.count).fill(a),1)),s}var _i=W(`#223020`),vi=W(`#1a2618`);function yi(e){let t=e.attributes.normal,n=e.attributes.color;for(let e=0;e<t.count;e++){let r=t.getY(e)>.5?vi:_i;n.setXYZ(e,r.r,r.g,r.b)}return e}function bi(e,t,n,r,i=.75){let a=Math.abs(t-n),o=yi(P(new me(i,r+.9,a,1,1,Math.max(1,Math.round(a/2.5))),`#ffffff`,M.ground));return o.translate(e,(r-.9)/2,(t+n)/2),xt(o)}function xi(e,t,n,r){let i=yi(P(new me(Math.abs(t-n),r+.9,.6,3,1,1),`#ffffff`,M.ground));return i.translate((t+n)/2,(r-.9)/2,e),xt(i)}function Si(e){let t=Yr(),n=B(1e3+e*7919),r=-e*80,i=-(e+1)*80,a=e=>e<=r&&e>i,o=new d;o.name=`chunk${e}`;let s=[],c=[],l=[],u=[],f=[],m=[],h=[];o.add(ii(mi(r,i),k(N.ground,.45))),o.add(ii(hi(r,i),Je()));let g=ti(),_=ti(),v=Math.round(-r/Dr),y=Math.round(-i/Dr);for(let e=v;e<y;e++){let t=-e*Dr,r=-(e+1)*Dr;for(let i=0;i<Or;i++){let a=kr-i*Er,o=a-Er,s=Hr(i,e),c=.45+.55*((Math.sin(e*2.1+i*1.3)*.5+.5)*.7+.3*n());h.push(gi(a,o,t,r,s,c));let l=i===0?0:Math.max(Hr(i-1,e),s)+.24;m.push(bi(a,t+.3,r-.3,l,i===0?.8:.7));let u=Math.max(Hr(i,e-1),s)+.2;if(m.push(xi(t,a-.3,o+.3,u)),i===0)for(let e=-5.7;e>-10.8;e-=.6)for(let i=t-.55;i>r+.5;i-=.45){if(n()<.12)continue;let t=(.55+c*.4)*V(n,.85,1.15);ni(g,A(i)+e+V(n,-.04,.04),s-.02,i+V(n,-.04,.04),V(n,-.5,.5)+(n()>.5?0:Math.PI/2),t,t*V(n,.9,1.2),oi(W(`#ffffff`),n,.02,0,.06))}if(i<=1){let e=(i===0?.8:.7)/2-.08;for(let i=t;i>r;i-=.45)for(let t of[-e,e])n()<.7&&ni(_,A(i)+a+t+V(n,-.06,.06),l,i,n()*6.28,V(n,.7,1.25),void 0,oi(W(`#ffffff`),n,.02,.05,.08))}if(i<=1)for(let e=a-.4;e>o+.4;e-=.5)for(let r of[-.22,.22]){if(n()>.6)continue;let i=t+r;ni(_,A(i)+e,u,i,n()*6.28,V(n,.7,1.2),void 0,oi(W(`#ffffff`),n,.02,.05,.08))}}}let b=kr-Or*Er,x=[];m.push(bi(b,r,i,.95,1));{let e=B(Math.round(r)*7+3),t=r;for(;t>i+1;){let n=Math.max(i,t-V(e,16,48)),r=b;for(;r>-422.5;){let i=Math.max(-422.5,r-V(e,16,58)),a=.66+e()*.16;h.push(gi(r,i,t,n,a,V(e,.35,1))),i>-422.5&&m.push(bi(i,t,n,.95,e()>.85?2.4:V(e,.6,1)));let o=(r+i)/2,s=(t+n)/2;e()>.93&&x.push(ai(ar(Math.floor(e()*1e4)),o+V(e,-4,4),s,e()*6.28,a-.2)),e()>.94&&x.push(ai(ir(Math.floor(e()*1e4)),i+2,n+2,it(s)+V(e,-.3,.3),.9)),r=i}n>i&&m.push(xi(n,b,-422.5,.95)),t=n}}for(let e of Mr){if(!a(e.z))continue;let t=In({w:e.w,d:e.d,floors:e.floors,shop:e.shop,seed:e.seed,ac:e.ac,balcony:e.balcony,kind:e.kind}),n=it(e.z)+(e.tilt??-.25),r=j(e.u+1,e.z)+.02;c.push(ai(t,e.u+e.w/2,e.z,n,r)),s.push({x:A(e.z)+e.u+e.w/2,z:e.z,r:Math.max(e.w,e.d)*.55});let i=$n(e.seed+77);i.translate(0,.01,e.d*.52+.3),l.push(ai(i,e.u+e.w/2,e.z,n,r))}let S=[],C=(e,t,n,r,i=[])=>{if(!a(n))return;l.push(ai(e,t,n,r,j(t,n)));let o=Math.cos(r),c=Math.sin(r);for(let[e,r,a]of i)s.push({x:A(n)+t+e*o+r*c,z:n-e*c+r*o,r:a})},w=at;C(en(`#3a7ac8`),4.35,-102.3,w(-102.3),[[0,.3,.3],[0,-.3,.3]]),C(en(`#d8d4c8`),4.45,-103.2,w(-103.2)+.15,[[0,.3,.3],[0,-.3,.3]]),C(Wt(`vendDrink`),4.6,-108.4,w(-108.4),[[0,0,.55]]),C(Wt(`vendIce`),4.6,-109.45,w(-109.45),[[0,0,.55]]),C(Gt(),4.55,-117.2,w(-117.2),[[0,0,.6]]),C(nn(301,4),4.2,-121.8,w(-121.8)),C(Kt(),4.95,-137.6,w(-137.6),[[-.8,-.1,.6],[.4,-.1,.6],[1.1,-.1,.5],[-1.8,1.05,.3]]),C(Qt(),3.35,-186,it(-186)-.2,[[0,0,.2]]),C(Zt(),3.3,-191,it(-191)+.5,[[0,0,.2]]);for(let e=0;e<3;e++)C(Yt(400+e),4.25,-193.6-e*.62,w(-194),[[0,0,.3]]);for(let e of[-197.3,-202.7])C(Xt(),4.9,e,w(e),[[0,0,.32]]);{let e=Jt(),t=[[-1.3,0,.27],[1.3,0,.27]];for(let n=1.2;n<e.depth;n+=.8)for(let e of[-.55,.55])t.push([e,-n,.55]);if(C(e.geo,5.6,-200,w(-200),t),a(-200)){let e=B(777);for(let[t,n,r]of[[9.5,-195.5,`cedar`],[10.5,-204.8,`cedar`],[13.8,-196.8,`round`],[14.5,-203.5,`tall`],[16.5,-200.5,`cedar`],[12,-208,`round`]])S.push([r,t,n,V(e,.9,1.2)]);let t=w(-200),n=j(5.6,-200),r=Yn(701);r.translate(-.85,.38,-1.5),l.push(ai(r,5.6,-200,t,n));let i=Yn(702);i.translate(.85,.8,-2.6),l.push(ai(i,5.6,-200,t,n));let a=Yn(703);a.translate(-.85,1.76,-5.2),l.push(ai(a,5.6,-200,t,n))}}C(qt(501),4.8,-235.5,w(-235.5),[[-.45,0,.45],[.45,0,.45]]),C(Wt(`vendDrink`),4.6,-231.4,w(-231.4),[[0,0,.55]]),C($t(),5.35,-250.6,it(-250.6),[[0,1.1,.75],[0,0,.75],[0,-1.1,.75]]),C(tn(503),11.5,-222.3,it(-222.3)-.3,[[-1.3,0,.2],[1.3,0,.2]]),C(en(`#c84a3a`),7.2,-240.4,it(-240.4)+1.2,[[0,.3,.3],[0,-.3,.3]]),C(nn(505,5),5.4,-242.2,w(-242.2)),C(Zt(),3.3,-246.6,it(-246.6)+.5,[[0,0,.2]]),C(tn(507),13.5,-62.6,it(-62.6)-.4,[[-1.3,0,.2],[1.3,0,.2]]),C(en(`#e8e0cc`),5.25,-50.9,w(-50.9)+.35,[[0,.3,.3],[0,-.3,.3]]);let T=[];{let t=B(1337+e*97),n=-18-e*80;for(let e=r-2;e>i+2;e-=V(t,3.2,5.2)){let n=t()<.35?1:t()<.8?2:3;for(let r=0;r<n;r++){let n=4.8+r*V(t,3,4.8)+V(t,-.5,.5);if(n>20||Vr(n,e,1))continue;let i=w(e)+V(t,-.35,.35),a=Math.floor(t()*1e6),o=t();if(o<.6){let t=Kn(a);l.push(ai(t,n,e,i,j(n,e)+.02)),s.push({x:A(e)+n,z:e,r:.35}),T.push({u:n,z:e})}else if(o<.82){let t=Xn(a);l.push(ai(t,n,e,i,j(n,e)+.02)),s.push({x:A(e)+n,z:e,r:.45}),T.push({u:n,z:e})}else{let r=Zn(a);l.push(ai(r,n,e,i+Math.PI/2+V(t,-.2,.2),j(n,e)+.02)),s.push({x:A(e)+n,z:e,r:.75}),T.push({u:n,z:e})}if(t()<.22&&l.push(ai($n(a+33),n+V(t,-.3,.3),e+V(t,-.3,.3),i,j(n,e)+.01)),t()<.28){let r=n+V(t,-.55,.55),a=e+V(t,-.55,.55),o=Yn(Math.floor(t()*1e5));l.push(ai(o,r,a,i+V(t,-.8,.8),j(r,a)+.01))}}}for(let e=r-3;e>i+3;e-=V(t,3.8,6.2)){let r=Math.abs(e-n)<6.8,i=t()<.5?1:2;for(let n=0;n<i;n++){let i=-4.8-n*V(t,3.2,5)-V(t,0,.6);if(i<-18||r&&i>-9.2&&i<-5)continue;let a=ot(e)+V(t,-.35,.35),o=Math.floor(t()*1e6),c=t();if(c<.65){let t=Kn(o);l.push(ai(t,i,e,a,j(i,e)+.02)),s.push({x:A(e)+i,z:e,r:.35}),T.push({u:i,z:e})}else if(c<.85){let t=Xn(o);l.push(ai(t,i,e,a,j(i,e)+.02)),s.push({x:A(e)+i,z:e,r:.45}),T.push({u:i,z:e})}else{let t=Zn(o);l.push(ai(t,i,e,a+Math.PI/2,j(i,e)+.02)),s.push({x:A(e)+i,z:e,r:.75}),T.push({u:i,z:e})}if(t()<.22&&l.push(ai($n(o+33),i+V(t,-.3,.3),e+V(t,-.3,.3),a,j(i,e)+.01)),t()<.25){let n=i+V(t,-.5,.5),r=e+V(t,-.5,.5),o=Yn(Math.floor(t()*1e5));l.push(ai(o,n,r,a+V(t,-.6,.6),j(n,r)+.01))}}}for(let e=r-4;e>i+4;e-=V(t,9,15)){let n=(t()<.5?1:-1)*V(t,2.55,3.2);l.push(ai($n(Math.floor(t()*1e5)),n,e,it(e)+V(t,-.5,.5),j(n,e)+.005))}let a=t()<.4?1:2;for(let e=0;e<a;e++){let e=V(t,i+5,r-5),n=t()<.5?V(t,18,32):V(t,-30,-18);l.push(ai(er(),n,e,(n>0?w(e):ot(e))+V(t,-.2,.2),j(n,e)+.02))}}C(en(`#4a3628`),4.2,-292,w(-292)+.6,[[0,.3,.3],[0,-.3,.3]]),a(-465)&&l.push(ai(er(),14.5,-465,w(-465),j(14.5,-465)+.02)),C(en(`#382820`),-3.8,-535,ot(-535)-.4,[[0,.3,.3],[0,-.3,.3]]);let E=640/Ar;for(let e=0;e<E;e++){let t=-12-e*Ar;if(!a(t))continue;let n=Vn(8.6,e%4==2),r=it(t),i=(e,t,n,r)=>e.clone().applyAxisAngle(new p(0,1,0),r).add(new p(A(t)+n,0,t));l.push(ai(n.geo,jr,t,r)),l.push(ai(wr(),jr,t,r)),s.push({x:A(t)+jr,z:t,r:.3});let o=t-Ar,c=it(o);for(let e=0;e<5;e++){let a=i(n.tips[e],t,jr,r),s=i(n.tips[e],o,jr,c);u.push(...bt(a,s,e<3?.55:.75,e<3?.022:.03,`#2a2622`,14))}if(e%3==1){let e=t-13,a=Vn(7.6,!1),o=it(e);l.push(ai(a.geo,-4.35,e,o)),s.push({x:A(e)-4.35,z:e,r:.3});for(let s of[3,4]){let c=i(n.tips[s],t,jr,r),l=i(a.tips[s-3==0?0:2],e,-4.35,o);u.push(...bt(c,l,.7,.024,`#2a2622`,14))}let c=new p(A(e-30)-60,6.5,e-30);u.push(...bt(i(a.tips[1],e,-4.35,o),c,1.4,.024,`#2a2622`,14))}}for(let e of Nr)a(e.z)&&(l.push(ai(Hn(e.kind),3.3,e.z,it(e.z))),s.push({x:A(e.z)+3.3,z:e.z,r:.15}));let ee={},te={},D=(e,r,i,a,o=!1,c=n)=>{if(Math.abs(r)<14)return;let l=o?t.far[e]:t.trees[e],u=`${e}${Math.floor(c()*l.length)}`,d=o?te:ee;d[u]??=ti(),ni(d[u],A(i)+r,j(r,i)-.1,i,c()*6.28,a,a*V(c,.9,1.1),oi(W(`#ffffff`),c,.015,.05,.05)),Math.abs(r)<46&&s.push({x:A(i)+r,z:i,r:.5*a})};for(let[e,t,n,r]of S)D(e,t,n,r);for(let e of Mr)a(e.z)&&(D(Ft(n,[`round`,`round`,`tall`]),e.u+e.w+V(n,3,7),e.z+V(n,-4,2),V(n,1.35,1.7)),D(`round`,e.u+e.w+V(n,9,14),e.z+V(n,-6,6),V(n,1.3,1.8)),n()>.3&&D(`bush`,e.u-.2,e.z+e.d/2+2.6,V(n,.7,1)));for(let e of[-.5,-26,-118,-170,-262,-330,-445,-520,-600]){if(!a(e))continue;let t=e===-.5?`round`:Ft(n,[`round`,`tall`]),r=V(n,1,1.25);D(t,e===-.5?-6.6:-5.3,e,e===-.5?1:r)}let ne=B(9001);for(let[e,t]of[[-43,1.2],[-48.5,1.1]])a(e)&&D(`tall`,-5.6,e,t,!1,ne);for(let e=-425;e>=-610;e-=15)if(a(e)){let t=B(Math.abs(e)*31+17);D(Ft(t,[`round`,`tall`,`cedar`]),-5.1+V(t,-.4,.4),e,V(t,1.4,1.7)),D(Ft(t,[`round`,`cedar`,`tall`]),5.2+V(t,-.3,.5),e+V(t,-3,3),V(t,1.45,1.8))}for(let e=r-V(n,2,10);e>i;e-=V(n,9,22)){if(!Ir(e)&&!Lr(e)){let t=V(n,7,12);!Vr(t,e)&&n()>.4&&D(n()>.35?`round`:`tall`,t,e,V(n,.7,1.05)),n()>.5&&D(`bush`,V(n,4.8,6.2),e+V(n,-3,3),V(n,.6,1))}let t=V(n,Lr(e)?26:16,44);Vr(t,e)||D(Ft(n,[`round`,`tall`,`round`,`bush`]),t,e+V(n,-5,5),V(n,.9,1.5))}for(let e=0;e<70;e++){let e=V(n,i,r),t=V(n,46,250);D(n()>.45?`cedar`:`round`,t,e,V(n,1.1,1.9),t>70)}for(let e=0;e<4;e++){let e=V(n,i,r),t=kr-Math.floor(V(n,2,Or))*Er;D(Ft(n,[`round`,`tall`,`bush`]),t,e,V(n,.8,1.3))}let re=ti(),ie=(e,t,r)=>{let i=it(t)+V(n,-.5,.5);for(let a=0;a<r;a++){let r=e+V(n,-16,16),a=t+V(n,-14,14);x.push(ai(tr(Math.floor(n()*1e5)),r,a,i+(n()>.5?Math.PI/2:0)+V(n,-.15,.15),.75))}for(let r=0;r<10;r++)D(Ft(n,[`round`,`round`,`tall`]),e+V(n,-22,22),t+V(n,-18,18),V(n,.9,1.6),!0);let a=n()>.5?1:-1;for(let r=0;r<9;r++)D(`cedar`,e+a*22+V(n,-1.5,1.5),t-20+r*5+V(n,-1,1),V(n,1,1.4),!0);for(let r=0;r<2;r++){let r=t+V(n,-16,16);ni(re,A(r)+e-a*V(n,16,26),.6,r,n()*6.28,V(n,.9,1.3),void 0,oi(W(`#ffffff`),n,.02,.05,.06))}};ie(V(n,-162.5,-242.5),V(n,i+30,r-30),4+Math.floor(n()*3)),n()>.4&&ie(V(n,-262.5,-372.5),V(n,i+30,r-30),3+Math.floor(n()*3));for(let e=0;e<2;e++){let e=V(n,-132.5,-392.5),t=V(n,i,r),a=V(n,40,90);for(let r=t;r>t-a&&r>i;r-=V(n,4,7))D(n()>.3?`round`:`tall`,e+V(n,-1.5,1.5),r,V(n,.7,1.1),!0)}if(a(-260)){x.push(ai(nr(),-292.5,-260,it(-260)+Math.PI/2+.3,.75)),x.push(ai(rr(),-242.5,-300,0,.75));for(let e=0;e<8;e++)D(`round`,-292.5+V(n,-30,30),-260+V(n,-35,35),V(n,1,1.6),!0)}if(a(-150))for(let e=0;e<7;e++){let t=-102.5-e*42,n=-150-e*9,r=Vn(8.5,!1);if(x.push(ai(r.geo,t,n,it(n)+.2,.7)),e>0){let e=t+42,r=n+9,i=new p(A(r)+e,8.5,r),a=new p(A(n)+t,8.5,n);for(let e of[-.7,.7])u.push(...bt(i.clone().setX(i.x+e*.2),a.clone().setX(a.x+e*.2),1.2,.03,`#2a2622`,10))}}let ae=[ti(),ti(),ti()],oe=ti(),se=ti(),ce=W(`#ffffff`),le=(e,t,r)=>{Vr(e,t,.3)||ni(ae[Math.floor(n()*3)],A(t)+e,j(e,t)-.03,t,n()*6.28,r,r*V(n,.8,1.25),oi(ce,n,.02,.08,.07))},ue=[ti(),ti(),ti()];for(let e=0;e<1380;e++){let e=V(n,i,r),t=V(n,2.75,6.2);if(Ir(e)&&(t>4.2||Rr(e))||Vr(t,e,.3))continue;let a=li(t,e),o=ct(2.75,3.25,t);if(n()>a*(.2+.8*o))continue;let s=(.4+.9*Math.min(1,n()**.85*(.5+.65*a)))*(.55+.45*o),c=V(n,.8,1.2);ni(ue[Math.floor(n()*3)],A(e)+t,j(t,e)-.03,e,n()*6.28,c,s,oi(ce,n,.015,.06,.06))}for(let e=0;e<816;e++){let e=V(n,i,r),t=-2.8-n()*1.75;le(t,e,V(n,.3,.5)*ct(-2.7,-3.4,t)+.12)}for(let e=0;e<806.4;e++){let e=V(n,i,r),t=V(n,5.8,30);Ir(e)&&t<20||le(t,e,V(n,.7,1.3))}let de=ti();for(let e=r;e>i;e-=V(n,.6,2.2)){let t=(n()>.5?1:-1)*V(n,2.15,2.5);ni(de,A(e)+t,0,e,n()*6.28,V(n,.35,.7),void 0,oi(ce,n,.02,.05,.06))}let fe=[`#f7f3ea`,`#f7f3ea`,`#f3d23c`,`#f3d23c`,`#ec8fb6`,`#b09ae0`,`#f39a3c`].map(W),pe=(e,t)=>{if(Vr(e,t,.2))return;let r=V(n,.6,1.3);ni(oe,A(t)+e,j(e,t)+.62*r-.03,t,n()*6.28,r,void 0,Ft(n,fe))},me=[ti(),ti()],he=[ti(),ti()],ge=[ti(),ti(),ti(),ti()],_e=[[`#b7a4ec`,`#c9b8f4`,`#a893e4`],[`#f6f3ea`,`#fbf6e6`],[`#e8503e`,`#f07a4a`,`#e0443a`],[`#f2c93a`,`#f6d860`]].map(e=>e.map(W)),ve=(e,t)=>{if(Vr(e,t,.3)||Ir(t)&&e>3.4&&e<7&&Rr(t))return;let r=j(e,t)-.02,i=A(t)+e,a=n();if(a<.3)ni(me[Math.floor(n()*2)],i,r,t,n()*6.28,V(n,.7,1.2),void 0,oi(ce,n,.02,.06,.06));else if(a<.55)ni(he[Math.floor(n()*2)],i,r,t,n()*6.28,V(n,.7,1.1),void 0,oi(ce,n,.02,.06,.06));else{let e=Math.floor(n()*4);ni(ge[e],i,r,t,n()*6.28,V(n,.75,1.25),void 0,Ft(n,_e[e]))}};for(let e=0;e<190;e++)ve(V(n,2.95,6.4),V(n,i,r));for(let e=0;e<70;e++)ve(V(n,-4.5,-2.95),V(n,i,r));for(let e=0;e<40;e++)ve(V(n,6.4,22),V(n,i,r));for(let e=0;e<260;e++)pe(V(n,2.9,5.8),V(n,i,r));for(let e=0;e<130;e++)pe(V(n,-4.5,-2.9),V(n,i,r));for(let e=0;e<120;e++)pe(V(n,6,26),V(n,i,r));let ye=ti(),be=[ti(),ti()],xe=[`#a898e2`,`#a898e2`,`#b9a8ee`,`#e06a6a`,`#f09ab8`].map(W),Se=[W(`#f2d04a`),W(`#f2d04a`),W(`#f6dc5a`),W(`#fff4c0`),W(`#fff4c0`),W(`#f7f7ef`),W(`#f39a3c`)],Ce=[];for(let e=0;e<9;e++){let e=n()<.35;Ce.push({u:e?V(n,-4.3,-3.2):V(n,3.4,6.5),z:V(n,i+4,r-4)})}for(let e of Ce){if(Vr(e.u,e.z,.5)||Rr(e.z))continue;let t=Ft(n,xe);for(let r=0;r<16;r++){let r=e.u+V(n,-1.1,1.1)*(e.u<0?.6:1),i=e.z+V(n,-2.2,2.2);ni(ye,A(i)+r,j(r,i)-.05,i,n()*6.28,V(n,.8,1.35),void 0,n()>.25?t:Ft(n,xe))}for(let t=0;t<12;t++){let t=e.z+V(n,-2.5,2.5);ni(se,A(t)+e.u+V(n,-1.4,1.4),V(n,.5,1.5),t,n()*6.28,V(n,.3,.5),void 0,Ft(n,Se))}for(let t=0;t<10;t++){let t=Math.floor(n()*4),r=e.z+V(n,-2.4,2.4),i=e.u+V(n,-1.2,1.2)*(e.u<0?.6:1);Vr(i,r,.3)||ni(ge[t],A(r)+i,j(i,r)-.02,r,n()*6.28,V(n,.8,1.3),void 0,Ft(n,_e[t]))}if(n()>.35){let t=e.u+(e.u>0?V(n,.8,2):-.6);ni(be[Math.floor(n()*2)],A(e.z)+t,j(t,e.z)-.1,e.z+V(n,-1,1),n()*6.28,V(n,.45,.9))}}for(let e=0;e<46;e++){let e=n()>.35?V(n,3,12):V(n,-4.6,-2.9),t=V(n,i,r);ni(se,A(t)+e,V(n,.4,1.4),t,n()*6.28,V(n,.28,.45),void 0,Ft(n,Se))}let we=ti(),Te=[`#6f8ee6`,`#8f84e0`,`#a79ae8`,`#7aa6e8`].map(W);for(let e of Mr)if(a(e.z))for(let t=0;t<4;t++){let t=e.u-V(n,.2,1),r=e.z+e.d/2+V(n,.6,3.6);ni(we,A(r)+t,j(t,r)-.05,r,n()*6.28,V(n,.8,1.1),void 0,Ft(n,Te)),D(`bush`,t+V(n,-.3,.3),r+V(n,-.4,.4),V(n,.45,.6))}for(let e=0;e<6;e++){let e=V(n,6,30),t=V(n,i,r);if(Vr(e,t,1))continue;let a=V(n,.5,1.2);ni(be[Math.floor(n()*2)],A(t)+e,j(e,t)-.25*a,t,n()*6.28,a)}if(T.length>0){let t=B(6662+e*83);for(let e of T){let n=e.u+V(t,-.4,.4),r=e.z+V(t,-.4,.4);ni(ae[Math.floor(t()*3)],A(r)+n,j(n,r)-.03,r,t()*6.28,V(t,.85,1.35),V(t,.85,1.45),oi(W(`#c8c4b8`),t,.02,.06,-.08))}for(let e=0;e<24;e++){let e=t()<.65?V(t,5,16):V(t,-16,-5),n=V(t,i,r),a=j(e,n)-.02,o=A(n)+e;t()<.5?ni(me[Math.floor(t()*2)],o,a,n,t()*6.28,V(t,.8,1.3),void 0,oi(W(`#bab4a8`),t,.02,.05,-.06)):ni(he[Math.floor(t()*2)],o,a,n,t()*6.28,V(t,.8,1.2),void 0,oi(W(`#bab4a8`),t,.02,.05,-.06))}for(let e=0;e<4;e++){let e=t()<.6?V(t,6,15):V(t,-15,-6),n=V(t,i,r);ni(be[Math.floor(t()*2)],A(n)+e,j(e,n)-.15,n,t()*6.28,V(t,.4,.75))}}let Ee=(e,...t)=>{e&&(Ze(e,...t),o.add(e))};c.length&&Ee(ii(z(c),k(N.house,1)),1,2),x.length&&Ee(ii(z(x),k(N.house,1))),Ee(ri(t.bamboo,k(N.tree,-1,2),re)),l.length&&Ee(ii(z(l),k(N.pole,1)),1,2),u.length&&Ee(ii(z(u),k(N.wire,.8)),1,2),f.length&&Ee(ii(z(f),k(N.fence,1,2)),1,2),m.length&&Ee(ii(z(m),k(N.berm,.6)),2),h.length&&Ee(ii(z(h),qe()));let De=(e,t,...n)=>{e&&(e.userData.cull=t),Ee(e,...n)};De(ri(t.rice,k(N.rice,-1,2),g),170),De(ri(t.fringe,k(N.grass,-1,2),_),170),De(ri(t.short,k(N.grass,-1,2),de),130);for(let e=0;e<3;e++)De(ri(t.grass[e],k(N.grass,-1,2),ae[e]),170);for(let e=0;e<3;e++)De(ri(t.verge[e],k(N.grass,-1,2),ue[e]),170);De(ri(t.flower,k(N.flower,-1,2),oe),120),De(ri(t.fly,k(N.butterfly,-1,2),se),120),De(ri(t.spike,k(N.flower,-1,2),ye),120);let Oe=k(N.tree,-1,2);for(let e=0;e<2;e++)De(ri(t.lance[e],Oe,me[e]),150,1);for(let e=0;e<2;e++)De(ri(t.broad[e],Oe,he[e]),150,1);for(let e=0;e<4;e++)De(ri(t.florets[e],k(N.flower,-1,2),ge[e]),120);De(ri(t.hydrangea,k(N.flower,-1,2),we),150);for(let e=0;e<2;e++)Ee(ri(t.rocks[e],k(N.fence,1),be[e]),1);let ke=k(N.tree,.8,2);for(let[e,n]of Object.entries(ee)){let r=e.slice(0,-1),i=Number(e.slice(-1)),a=ri(t.trees[r][i],ke,n);a&&(a.userData.near=a.geometry,a.userData.far=t.far[r][i%t.far[r].length]),Ee(a,1,2)}for(let[e,n]of Object.entries(te)){let r=e.slice(0,-1),i=Number(e.slice(-1));Ee(ri(t.far[r][i],ke,n),2)}return{k:e,group:o,colliders:s}}var Ci=class{chunks=[];root=new d;static CHUNKS=8;constructor(e=!0){if(e)for(let e=0;e<8;e++)this.addChunk(e)}addChunk(e){let t=Si(e);this.chunks.push(t),this.root.add(t.group)}update(e,t=110){let n=e+t;for(let t of this.chunks){let r=-(t.k+.5)*80,i=Math.ceil((r-n)/640);t.group.position.z=-i*640;let a=-t.k*80-i*640,o=a-80,s=e<o?o-e:e>a?e-a:0;if(s!==t.lodD){t.lodD=s;for(let e of t.group.children){let t=e.userData;t.cull===void 0?t.far&&(e.geometry=s>Tr?t.far:t.near):e.visible=s<t.cull}}}}specialize(){return He(this.root,e=>e.userData.far?[e.userData.far]:[])}setTreeFar(e){Tr=e;for(let e of this.chunks)e.lodD=void 0}reflectLod(e){for(let t of this.chunks)for(let n of t.group.children){let r=n.userData;r.far&&(n.geometry=e||(t.lodD??0)>Tr?r.far:r.near)}}hit(e,t,n){return this.contact(e,t,n).pen}contact(e,t,n){let r={pen:0,nx:0,nz:0};for(let i of this.chunks){let a=i.group.position.z;for(let o of i.colliders){let i=e-o.x,s=t-(o.z+a),c=n+o.r,l=i*i+s*s;if(l<c*c){let e=Math.sqrt(l);c-e>r.pen&&(r.pen=c-e,r.nx=e>1e-5?i/e:1,r.nz=e>1e-5?s/e:0)}}}return r}closeness(e,t){let n=1/0,r=1/0;for(let i of this.chunks){let a=i.group.position.z;for(let o of i.colliders){let i=e-o.x,s=t-(o.z+a),c=Math.sqrt(i*i+s*s)-o.r;o.r>1.2?r=Math.min(r,c):o.r>=.35&&(n=Math.min(n,c))}}return{trees:Math.max(0,Math.min(1,1-(n-2)/16)),houses:Math.max(0,Math.min(1,1-(r-3)/30))}}obstacles(){let e=[];for(let t of this.chunks)for(let n of t.colliders)Math.abs(n.x-A(n.z))<2.8&&e.push({x:n.x,z:n.z+t.group.position.z,r:n.r});return e}},wi={ROW_P:Er,COL_P:Dr,NROWS:Or,BERM0:kr,HOUSES:Mr,FENCES_LEFT:Pr,GUARDRAIL_RIGHT:Fr,paddyLevel:Hr},Ti=class{group=new d;constructor(){let e=new v(new E(2600,48,24),We());e.frustumCulled=!1,e.renderOrder=-10,this.group.add(e);let t=Ge(),n=B(77);for(let[e,r,i,a]of[[.28,2300,560,2.3],[-.42,1450,290,1.1],[.75,1350,280,1.2],[-1.15,1300,220,.9],[1.25,1400,260,1.1],[-.12,2e3,170,.6],[1.9,1500,180,.9],[-1.9,1500,170,.85],[2.7,1400,200,1],[-2.6,1500,190,.9],[3.14,1600,170,.8]]){let o=Ei(i,a,Math.floor(n()*1e6)),s=new v(o,t);s.position.set(Math.sin(e)*r,V(n,110,150),-Math.cos(e)*r),s.rotation.y=n()*6.28,s.frustumCulled=!1,this.group.add(s)}[[430,46,1,`#101c18`,M.foliage],[640,88,4,`#142220`,M.foliage],[950,150,2,`#16242c`,M.distant],[1350,235,3,`#1b2933`,M.distant],[1900,390,6,`#22323c`,M.distant]].forEach(([e,t,n,r,i],a)=>{let o=Di(e,t,n*13+5,r,i,a<2,a===4),s=new v(o,k(N.hills,a<2?.5:0,2));s.frustumCulled=!1,this.group.add(s)});let r=new v(P(new se(2400,48).rotateX(-Math.PI/2),`#101815`,M.ground),k(N.ground,0));r.position.y=-.7,r.frustumCulled=!1,this.group.add(r),Ze(this.group,2);let i=new s(br(),k(N.sky,-1,2),160),a=new c;for(let e=0;e<160;e++){let t=V(n,.6,1.4);a.makeScale(t,t,t).setPosition(V(n,-18,18),V(n,.3,5),V(n,-18,18)),i.setMatrixAt(e,a)}i.frustumCulled=!1,this.motes=i}motes;follow(e){this.group.position.set(e.x,0,e.z)}};function Ei(e,t,n){let r=B(n),i=[],a=24+Math.round(t*6),o=e*(.5+t*.55),s=[],c=(e,t,n,r)=>{let i=new Float32Array(e.attributes.position.count*3);for(let e=0;e<i.length;e+=3)i[e]=t,i[e+1]=n,i[e+2]=r;e.setAttribute(`aLobe`,new D(i,3))};for(let t=0;t<a;t++){let l=t/a,u=r()*Math.PI*2,d=e*(1-l*.72)*V(r,.3,.95)*(.7+.3*Math.min(1,l*4)),f=l*o*V(r,.72,1),p=e*V(r,.22,.36)*(1-l*.35),m=Math.cos(u)*d,h=Math.sin(u)*d*.55,g=St(p,2,.12,n+t*3.7),_=f+p*.5;g.translate(m,_,h),c(g,m,_,h),i.push(g),s.push({x:m,y:_,z:h,rad:p})}for(let e=0;e<34;e++){let t=s[Math.floor(r()*s.length)],a=V(r,.15,1),o=r()*Math.PI*2,l=Math.sqrt(1-a*a),u=St(t.rad*V(r,.22,.38),1,.15,n+100+e),d=t.x+Math.cos(o)*l*t.rad*.92,f=t.y+a*t.rad*.92,p=t.z+Math.sin(o)*l*t.rad*.92;u.translate(d,f,p),c(u,d,f,p),i.push(u)}for(let e=0;e<22;e++){let t=s[Math.floor(r()*s.length)];for(let e=0;e<2;e++){let e=s[Math.floor(r()*s.length)];Math.hypot(e.x,e.z)>Math.hypot(t.x,t.z)&&(t=e)}let a=Math.atan2(t.z,t.x)+V(r,-.9,.9),o=V(r,-.25,.4),l=Math.sqrt(1-o*o),u=St(t.rad*V(r,.2,.34),1,.15,n+300+e),d=t.x+Math.cos(a)*l*t.rad*.9,f=t.y+o*t.rad*.9,p=t.z+Math.sin(a)*l*t.rad*.9;u.translate(d,f,p),c(u,d,f,p),i.push(u)}let l=Oe(i,!1),u=l.attributes.position,d=1/0,f=-1/0,m=e*.14;for(let t=0;t<u.count;t++){let n=u.getY(t);if(n<m+e*.04){let t=m+e*.04-n;n=m+e*.04-e*.04*(1-Math.exp(-t/(e*.04)))}u.setY(t,n),d=Math.min(d,n),f=Math.max(f,n)}l.computeVertexNormals(),Ct(l,new p(0,o*.35,0),.3,.8);let h=new Float32Array(u.count);for(let e=0;e<u.count;e++)h[e]=(u.getY(e)-d)/(f-d);return l.setAttribute(`aH`,new D(h,1)),l}function Di(e,t,n,r,i,a,o){let s=a?360:200,c=a?10:5,l=[],u=[],d=n,f=e=>{if(o){let n=Math.abs(Math.sin(e*2.5+d))**2.2*.55+Math.abs(Math.sin(e*5+d*1.3))**3*.3+Math.sin(e*17+d)*.03;return t*Math.max(.1,.12+n)}let n=Math.sin(e*3+d)*.35+Math.sin(e*7+d*1.7)*.25+Math.sin(e*13+d*.3)*.15+Math.sin(e*29+d)*.06;return t*Math.max(.12,.5+n)},p=(e,t)=>Math.sin(e*61+d+t*2)*.5+Math.sin(e*23+d*2.3-t)*.5;for(let t=0;t<=s;t++){let n=t/s*Math.PI*2,r=f(n);for(let t=0;t<=c;t++){let i=t/c,o=-6+(r+6)*Math.sin(i*Math.PI/2),s=e+(1-i)*e*.08+(a?p(n,i)*e*.012*Math.sin(i*Math.PI):0);l.push(Math.sin(n)*s,o,-Math.cos(n)*s)}}for(let e=0;e<s;e++)for(let t=0;t<c;t++){let n=e*(c+1)+t,r=n+1,i=n+c+1,a=i+1;u.push(n,r,i,r,a,i)}let m=new b;m.setAttribute(`position`,new ae(l,3)),m.setIndex(u),m.computeVertexNormals();let h=P(m.toNonIndexed(),r,i);if(h.computeVertexNormals(),!a)return h;let g=new T(r),_=g.clone().lerp(new T(`#6f9a48`),.45),v=g.clone().multiplyScalar(.72),y=h.attributes.color,x=h.attributes.position,S=new T,C=B(n),w=[C()*6.28,C()*6.28];for(let e=0;e<x.count;e++){let n=x.getX(e),r=x.getY(e),i=x.getZ(e),a=Math.atan2(n,-i),o=Math.sin(a*37+d)*Math.sin(a*11-d+r*.05)*.5+.5;S.copy(g).lerp(o>.6?_:v,Math.abs(o-.5)*1.4);for(let e of w)Math.abs(Math.atan2(Math.sin(a-e),Math.cos(a-e)))<.05&&r>2&&r<t*.45&&Math.floor(r/3.2)%2==0&&S.lerp(new T(`#8fb060`),.55);y.setXYZ(e,S.r,S.g,S.b)}y.needsUpdate=!0;let E=[h],ee=e/430*5.5,te=Math.PI*2*e,D=Math.floor(te/ee);for(let t=0;t<D;t++){let n=t/D*Math.PI*2+C()*.004,r=f(n);for(let a of[0,1]){if(a===1&&C()>.55)continue;let o=(a===0?V(C,5,10):V(C,4,7))*(e/430),s=a===0?r-o*.25:r*V(C,.45,.8),c=e-o*.2+(a===0?0:-e*.004),l=St(o,1,.2,t*7+a);l.scale(1,V(C,.7,1),1),l.translate(Math.sin(n)*c,s,-Math.cos(n)*c);let u=a===0?V(C,.8,1.05):V(C,.7,.95);E.push(P(l.index?l.toNonIndexed():l,g.clone().multiplyScalar(u),i))}}if(e<500)for(let n of w)for(let r=0;r<3;r++){let r=n+V(C,-.03,.03),i=V(C,t*.12,t*.3),a=e*.985,o=P(new me(9,5,7).toNonIndexed(),`#e6ddc8`,M.distant),s=P(new fe(7.5,4,4,1).toNonIndexed(),`#2a3134`,M.distant);s.rotateY(Math.PI/4),s.scale(1.25,1,1),s.translate(0,4.5,0);for(let e of[o,s])e.rotateY(-r),e.translate(Math.sin(r)*a,i,-Math.cos(r)*a),E.push(e)}return Oe(E.map(e=>(e.deleteAttribute(`uv`),e)),!1)}var Oi=40,ki=3.95,Ai=8.32,ji=.55,Mi=[-.7,0,.7];function Ni(){let e=new E(.05,8,6);e.scale(1,.85,2.6);let t=new E(.036,8,6);t.translate(0,.02,.12);let n=new fe(.012,.04,4);n.rotateX(Math.PI/2),n.translate(0,.015,.165);let r=new b;return r.setAttribute(`position`,new ae([-.05,0,-.2,.05,0,-.2,0,.01,-.1,-.05,0,-.2,0,.01,-.1,.05,0,-.2],3)),r.setAttribute(`uv`,new ae(Array(12).fill(0),2)),r.computeVertexNormals(),z([P(e,`#ffffff`,M.plain),P(t,`#ffffff`,M.plain),P(n,`#6a5a3a`,M.plain),P(r,`#ffffff`,M.plain)])}function Pi(){let e=new C;e.moveTo(0,.05),e.lineTo(.14,.035),e.lineTo(.3,-.05),e.lineTo(.26,-.085),e.lineTo(.12,-.07),e.lineTo(0,-.06),e.closePath();let t=new ce(e);return t.rotateX(Math.PI/2),P(t,`#ffffff`,M.plain)}var Fi=class{group=new d;birds=[];flocks=[];activity=1;body;wings;r=B(4242);kiteC=new p;perchSpans=[];m4=new c;w4=new c;q=new le;e=new g;s=new p;tmp=new p;constructor(){let e=this.r,t=(t,n,r,i,a)=>{for(let o=0;o<n;o++)this.birds.push({kind:t,pos:new p,vel:new p(0,0,-1),scale:V(e,i[0],i[1]),ph:e()*20,g:r,off:new p,mode:2,timer:0,face:e()>.5?1:-1,_c:a})};this.flocks.push({c:new p,dir:new p,speed:11,alt:40,kind:`flock`}),this.flocks.push({c:new p,dir:new p,speed:12,alt:28,kind:`flock`}),this.flocks.push({c:new p,dir:new p,speed:7.5,alt:34,kind:`egret`}),this.flocks.push({c:new p,dir:new p,speed:10,alt:55,kind:`flock`}),t(`flock`,11,0,[1.7,2.3],`#2b2d36`),t(`flock`,8,1,[1.5,2],`#33313a`),t(`egret`,7,2,[3.2,3.8],`#f4f2ea`),t(`flock`,14,3,[1.8,2.4],`#2b2d36`),t(`swallow`,2,0,[1.05,1.15],`#1c2438`),t(`kite`,1,0,[4.2,4.2],`#5a463a`),t(`perch`,12,0,[.95,1.1],`#5a4a3e`);let n=this.birds.length,r=k(N.wire,.8,2);this.body=new s(Ni(),r,n),this.wings=new s(Pi(),r,n*2);let i=new T;this.birds.forEach((e,t)=>{i.set(e._c),this.body.setColorAt(t,i),this.wings.setColorAt(t*2,i),this.wings.setColorAt(t*2+1,i)});for(let e of[this.body,this.wings])e.frustumCulled=!1,e.instanceMatrix.setUsage(be),e.layers.enable(2),this.group.add(e);this.flocks.forEach((e,t)=>(e.c.set(1e6,0,0),e.alt=[40,26,32,58][t]));for(let t of this.birds)if(t.kind===`egret`){let n=Math.ceil(t.ph%7);t.off.set((n%2?1:-1)*Math.ceil(n/2)*2.4,V(e,-.3,.3),Math.ceil(n/2)*2.1)}else t.kind===`flock`&&t.off.set(V(e,-9,9),V(e,-2.5,2.5),V(e,-7,7))}info(){return{flocks:this.flocks.map(e=>[e.c.x,e.c.y,e.c.z]),kite:[this.kiteC.x,78,this.kiteC.z],perched:this.birds.filter(e=>e.kind===`perch`&&e.mode===0).map(e=>[e.pos.x,e.pos.y,e.pos.z]),flying:this.birds.filter(e=>e.kind===`perch`&&e.mode===1).length}}shift(e){for(let t of this.birds)t.pos.z+=e;for(let t of this.flocks)t.c.z+=e;this.kiteC.z+=e;for(let t of this.perchSpans)t.z+=e;for(let t of this.birds)t.kind===`perch`&&(t.off.x+=e)}update(e,t,n,r){let i=this.r,a=n.position,o=this.tmp.set(0,0,-1).applyQuaternion(n.quaternion);o.y=0,o.lengthSq()<1e-4&&o.set(0,0,-1),o.normalize();let s=o.x,c=o.z,l=new p(-c,0,s),u=Math.round(this.activity*this.flocks.length);for(let[t,n]of this.flocks.entries())if(t>=u)n.c.set(1e6,0,0);else{if(n.c.distanceTo(a)>280){let e=i()>.5?1:-1,t=V(i,70,170);n.c.set(a.x+s*t+l.x*e*150,n.alt+V(i,-6,6),a.z+c*t+l.z*e*150),n.dir.set(-l.x*e+s*V(i,-.3,.5),0,-l.z*e+c*V(i,-.3,.5)).normalize()}n.c.addScaledVector(n.dir,n.speed*e)}let d=new p(a.x+s*150+l.x*-45,0,a.z+c*150+l.z*-45);this.kiteC.distanceTo(d)>200&&this.kiteC.copy(d),this.kiteC.lerp(d,1-Math.exp(-e*.08)),this.updatePerches(r);let f=0;for(let n of this.birds){let i=0,a=1,o=1,s=0,c=this.s.copy(n.pos);if(n.kind===`flock`||n.kind===`egret`){let e=this.flocks[n.g],r=t*.3+n.ph,a=n.off.x+Math.sin(r)*1.2,o=n.off.y+Math.sin(r*1.7)*.6,s=n.off.z+Math.cos(r*.8)*1.2,c=e.dir.x,l=e.dir.z;n.pos.set(e.c.x-l*a-c*s,e.c.y+o,e.c.z+c*a-l*s),i=n.kind===`egret`?Math.sin(t*2.6*Math.PI*2*.45+n.ph)*.75:(t*.9+n.ph)%1.6<1?Math.sin(t*58+n.ph*5)*.9:.12}else if(n.kind===`swallow`){let e=n.ph,a=t*.55+e,s=r.x-12+Math.sin(a*.4)*3,c=r.z-10;n.pos.set(s+Math.sin(a)*9+Math.sin(a*2.3)*2.5,1.3+Math.sin(a*1.9+e)*.9+Math.sin(a*.7)*.5,c+Math.cos(a*.83)*16);let l=Math.sin(t*1.4+e*3)>.35;i=l?Math.sin(t*60+e)*.85:-.15,o=l?1:1.2}else if(n.kind===`kite`){let e=t*.17;n.pos.set(this.kiteC.x+Math.cos(e)*42,78+Math.sin(e*.5)*4,this.kiteC.z+Math.sin(e)*42),this.activity<.5&&(n.pos.x+=1e6),i=.1+Math.sin(t*.9)*.05,s=-.38}else this.perchStep(n,e,t,r),n.mode===0?(i=-1.25,a=.55):n.mode===1?i=Math.sin(t*70+n.ph*7)*1:a=0;(n.kind!==`perch`||n.mode===1)&&e>0&&n.vel.subVectors(n.pos,c).divideScalar(Math.max(e,.001)),this.write(f++,n,i,a,o,s)}this.body.instanceMatrix.needsUpdate=!0,this.wings.instanceMatrix.needsUpdate=!0}write(e,t,n,r,i,a){let o=t.scale*+(r>0),s,l=0;if(t.kind===`perch`&&t.mode===0)s=it(t.pos.z)+(t.face>0?Math.PI/2:-Math.PI/2)+Math.sin(t.ph)*.4;else{let e=t.vel;s=Math.atan2(e.x,e.z),l=-Math.atan2(e.y,Math.hypot(e.x,e.z))*.6}this.e.set(l,s,a,`YXZ`),this.q.setFromEuler(this.e),this.m4.compose(t.pos,this.q,this.s.set(o,o,o)),this.body.setMatrixAt(e,this.m4);let u=t.kind===`perch`&&t.mode===0?.5:1;for(let t of[1,-1])this.w4.makeRotationZ(t*n),this.w4.premultiply(new c().makeTranslation(t*.035,.02,.02)),this.w4.multiply(new c().makeScale(t*u*i,u,u)),this.w4.premultiply(this.m4),this.wings.setMatrixAt(e*2+(t>0?0:1),this.w4)}wirePoint(e,t,n,r){let i=e,a=e-Oi,o=A(i)+ki+Mi[t]*Math.cos(it(i)),s=i-Mi[t]*Math.sin(it(i)),c=A(a)+ki+Mi[t]*Math.cos(it(a)),l=a-Mi[t]*Math.sin(it(a));return r.set(o+(c-o)*n,Ai-ji*4*n*(1-n)+.07,s+(l-s)*n)}updatePerches(e){let t=this.r;for(let t=this.perchSpans.length-1;t>=0;t--){let n=this.perchSpans[t];if(n.z-Oi>e.z+15){this.perchSpans.splice(t,1);for(let e of this.birds)e.kind===`perch`&&e.off.x===n.z&&e.mode===0&&(e.mode=2)}}let n=this.birds.filter(e=>e.kind===`perch`&&e.mode===2&&e.timer<=0);for(;this.perchSpans.length<3&&n.length>=3;){let r=this.perchSpans.length?Math.min(...this.perchSpans.map(e=>e.z)):e.z-20,i=Math.floor((r-25+12)/Oi)*Oi-12;i>e.z-25&&(i-=Oi);let a={z:i,tip:Math.floor(t()*3)};this.perchSpans.push(a);let o=3+Math.floor(t()*2),s=V(t,.2,.45);for(let e=0;e<o&&n.length;e++){let e=n.shift();e.mode=0,e.off.set(a.z,a.tip,0),e.face=t()>.35?1:-1,e.timer=s,this.wirePoint(a.z,a.tip,s,e.pos),e.vel.set(0,0,0),s+=V(t,.03,.09)}}}perchStep(e,t,n,r){if(e.mode===0){if(Math.hypot(e.pos.x-r.x,e.pos.z-r.z)<13+e.ph%1*4){e.mode=1,e.timer=0;let t=e.pos.x-r.x,n=e.pos.z-r.z,i=Math.max(.1,Math.hypot(t,n)),a=V(this.r,4,7);e.vel.set(t/i*a+V(this.r,-2,2),V(this.r,2.5,4),n/i*a+V(this.r,-3,1))}e.ph+=t*(Math.sin(n*.7+e.timer*30)>.97?3:0)}else e.mode===1?(e.timer+=t,e.vel.y+=t*(1.5-e.timer*.3),e.vel.x+=Math.sin(n*1.3+e.ph)*t*2,e.pos.addScaledVector(e.vel,t),(e.timer>9||e.pos.distanceTo(r)>120)&&(e.mode=2,e.timer=4)):e.timer-=t}},Ii=.34,Li=new p(0,Ii,.52),Ri=new p(0,Ii,-.53),zi=new p(0,.3,.06),Bi=.165,Vi=new p(0,.98,-.4),Hi=new p(0,.74,-.46),Ui=new p(0,.9,.27),Wi=new p(-.05,.31,.32),Gi=new p(-.06,-.06,1).normalize(),Ki=new p(-.4,-.9,.15).normalize(),qi=.12,Ji=.32,Yi={WHEEL_R:Ii,WHEELBASE:Ri.distanceTo(Li)},Xi={chrome:26,lens:27,spoke:28,gloss:29},Zi=`#482620`,G=`#5c666c`,Qi=`#454d52`,$i=`#18191c`,ea=`#2a2522`,ta=`#121010`,na=`#4a423b`,ra=`#4d3327`,ia=`#40271f`,aa=Zi,oa=`#efe8d8`,sa=`#34373d`,ca=`#1c1c1f`,la=`#d9232b`,ua=`#f39a1c`,da=`#fff3d2`,fa=`#d9b057`,pa=new p(0,.84,.25),ma={hx:.182,z0:-.835,z1:-.525,y:1.01,r:.035},ha={hx:.16,z0:-.815,z1:-.548,y:.768,r:.03},ga=new p(0,.77,-.55),K=(e,t,n)=>new p(e,t,n),_a=Math.PI*2,va=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function ya(e,t,n,r,i){let a=new b;return a.setAttribute(`position`,new ae(e,3)),a.setAttribute(`normal`,new ae(t,3)),a.setIndex(n),Array.isArray(r)?(a.setAttribute(`color`,new ae(r,3)),P(a,null,i)):P(a,r,i)}function q(e,n,r,i,a=8,o=0,s=1,c=!0){let l=e.length>2?new S(e,!1,`centripetal`):new t(e[0],e[1]);o||=e.length>2?Math.max(6,Math.round(l.getLength()/.02)):1;let u=l.computeFrenetFrames(o,!1),d=typeof n==`number`?()=>n:n,f=[],m=[],h=[],g=new p,_=new p;for(let e=0;e<=o;e++){let t=e/o;l.getPointAt(t,g);let n=d(t);for(let t=0;t<=a;t++){let r=t/a*_a;_.copy(u.normals[e]).multiplyScalar(Math.cos(r)*s).addScaledVector(u.binormals[e],Math.sin(r)),f.push(g.x+_.x*n,g.y+_.y*n,g.z+_.z*n),_.normalize(),m.push(_.x,_.y,_.z)}}let v=a+1;for(let e=0;e<o;e++)for(let t=0;t<a;t++){let n=e*v+t,r=n+1,i=n+v,a=i+1;h.push(n,r,i,r,a,i)}if(c)for(let e of[0,1]){let t=e*o,n=u.tangents[t].clone().multiplyScalar(e?1:-1);l.getPointAt(e,g);let r=f.length/3;f.push(g.x,g.y,g.z),m.push(n.x,n.y,n.z);for(let e=0;e<=a;e++){let r=(t*v+e)*3;f.push(f[r],f[r+1],f[r+2]),m.push(n.x,n.y,n.z)}for(let t=0;t<a;t++)e?h.push(r,r+1+t,r+2+t):h.push(r,r+2+t,r+1+t)}return ya(f,m,h,r,i)}function ba(e,t,n,r,i=48,a=0,o=_a,s=!1){let c=e.length,l=t?c:c-1,u=0;for(let t=0;t<c;t++){let[n,r]=e[t],[i,a]=e[(t+1)%c];u+=n*a-i*r}let d=t&&u>0?1:-1,f=[];for(let t=0;t<l;t++){let[n,r]=e[t],[i,a]=e[(t+1)%c],o=i-n,s=a-r,l=Math.hypot(o,s)||1;f.push([s/l*d,-o/l*d])}let p=e=>{let n=(e%c+c)%c,r=f[(n-1+l)%l],i=f[Math.min(n,l-1)];if(!t&&n===0)return f[0];if(!t&&n===c-1)return f[l-1];let a=r[0]+i[0],o=r[1]+i[1],s=Math.hypot(a,o)||1;return[a/s,o/s]},m=[],h=[],g=[],_=[],v=new T,y=typeof n==`function`?n:()=>n,b=i+1,x=(e,t,n,r,s)=>{v.set(y(s));for(let s=0;s<=i;s++){let c=a+(o-a)*s/i,l=Math.sin(c),u=Math.cos(c);m.push(e,t*l,-t*u),h.push(n,r*l,-r*u),g.push(v.r,v.g,v.b)}};for(let t=0;t<l;t++){let n=(t+1)%c,r=s?p(t):f[t],a=s?p(n):f[t],o=m.length/3;x(e[t][0],e[t][1],r[0],r[1],t),x(e[n][0],e[n][1],a[0],a[1],n);for(let e=0;e<i;e++){let t=o+e,n=t+1,r=t+b,i=r+1;_.push(t,r,n,n,r,i)}}let S=K(m[_[0]*3],m[_[0]*3+1],m[_[0]*3+2]),C=K(m[_[1]*3],m[_[1]*3+1],m[_[1]*3+2]),w=K(m[_[2]*3],m[_[2]*3+1],m[_[2]*3+2]),E=C.sub(S).cross(w.sub(S)),ee=K(h[_[0]*3],h[_[0]*3+1],h[_[0]*3+2]);if(E.dot(ee)<0)for(let e=0;e<_.length;e+=3)[_[e+1],_[e+2]]=[_[e+2],_[e+1]];return ya(m,h,_,g,r)}function xa(e,t,n){return e.applyQuaternion(new le().setFromUnitVectors(K(1,0,0),t.clone().normalize())),e.translate(n.x,n.y,n.z)}function Sa(e,t,n,r,i,a,o){let s=t.clone().sub(e),c=s.length();s.normalize();let l=Math.abs(s.y)<.9?K(0,1,0).cross(s).normalize():K(1,0,0).cross(s).normalize(),u=s.clone().cross(l),d=[],f=Math.round(r*12);for(let t=0;t<=f;t++){let i=t/f,a=i*r*_a;d.push(e.clone().addScaledVector(s,i*c).addScaledVector(l,Math.cos(a)*n).addScaledVector(u,Math.sin(a)*n))}return q(d,i,a,o,5,f*2)}function Ca(e,t){let n=e.hx*2-2*e.r,r=e.z1-e.z0-2*e.r,i=Math.PI/2*e.r,a=2*n+2*r+4*i,o=(t%1+1)%1*a,s=[[n/2,t=>[t,e.z0,0,-1]],[i,t=>{let r=-Math.PI/2+t/i*(Math.PI/2);return[n/2+Math.cos(r)*e.r,e.z0+e.r+Math.sin(r)*e.r,Math.cos(r),Math.sin(r)]}],[r,t=>[e.hx,e.z0+e.r+t,1,0]],[i,t=>{let r=t/i*(Math.PI/2);return[n/2+Math.cos(r)*e.r,e.z1-e.r+Math.sin(r)*e.r,Math.cos(r),Math.sin(r)]}],[n,t=>[n/2-t,e.z1,0,1]],[i,t=>{let r=Math.PI/2+t/i*(Math.PI/2);return[-n/2+Math.cos(r)*e.r,e.z1-e.r+Math.sin(r)*e.r,Math.cos(r),Math.sin(r)]}],[r,t=>[-e.hx,e.z1-e.r-t,-1,0]],[i,t=>{let r=Math.PI+t/i*(Math.PI/2);return[-n/2+Math.cos(r)*e.r,e.z0+e.r+Math.sin(r)*e.r,Math.cos(r),Math.sin(r)]}],[n/2,t=>[-n/2+t,e.z0,0,-1]]];for(let[e,t]of s){if(o<=e)return t(o);o-=e}return s[s.length-1][1](s[s.length-1][0])}function wa(e,t,n=0){let[r,i,a,o]=Ca(ha,e),[s,c]=Ca(ma,e);return K(r+(s-r)*t+a*n,ha.y+(ma.y-ha.y)*t,i+(c-i)*t+o*n)}var Ta=class{list=[];push(...e){return this.list.push(...e),this}},Ea=class{group=new d;steer=new d;basket=new d;basketContents=new d;basketFloor=new he;kick=new d;frontWheel=new d;rearWheel=new d;crankHold=null;crank=new d;pedals=[];bell=new d;bellLever=new d;cables=new d;frontFender=new d;rearFender=new d;steerAxis=new p().subVectors(Vi,Hi).normalize();lampMat=Be(N.bike,.5,{uLamp:{value:0}});spokeMats=[];lastWheel=NaN;blur=0;bellT=-1;bumpIn=0;rat={b:0,vb:0,bz:0,vbz:0,f:0,vf:0,r:0,vr:0,c:0,vc:0,cz:0,vcz:0};lastSteer=0;lastSpeed=0;frameF=new Ta;frameT=new Ta;constructor(){this.buildFrame(),this.buildRear(),this.buildSteer(),this.buildBasket(),this.buildCrank(),this.group.add(this.rearWheel,this.crank,this.kick),this.rearWheel.position.copy(Li),this.buildWheel(this.rearWheel,!0),this.buildWheel(this.frontWheel,!1),this.setKick(0)}setLamp(e){this.lampMat.uniforms.uLamp.value=Math.min(1,Math.max(0,e))}ringBell(){this.bellT=0}bump(e){this.bumpIn=Math.max(this.bumpIn,e)}mesh(e,t,n=1,r){let i=e instanceof Ta?e.list:e,a=new v(z(i),r??k(N.bike,n));return a.userData.bike=!0,t.add(a),a}setKick(e){let t=Gi.clone().lerp(Ki,e*e*(3-2*e)).normalize();this.kick.quaternion.setFromUnitVectors(K(0,-1,0),t)}update(e,t){this.steer.setRotationFromAxisAngle(this.steerAxis,t.steer),this.frontWheel.rotation.x=-t.wheel,this.rearWheel.rotation.x=-t.wheel,this.crank.rotation.x=-t.crank;for(let e of this.pedals)e.rotation.x=t.crank;this.setKick(t.kick??0);let n=Math.min(Math.max(e,0),1/30),r=Number.isNaN(this.lastWheel)||n<=0?0:Math.abs(t.wheel-this.lastWheel)/n;this.lastWheel=t.wheel,n>0&&(this.blur+=(va(2.5,7,r)-this.blur)*Math.min(1,n*12));for(let e of this.spokeMats)e.uniforms.uBlur.value=this.blur;if(n>0){let e=Math.abs(t.speed??0),r=t.time??0,i=Math.min(1,e/6),a=this.rat,o=this.bumpIn*9;Math.random()<e*n*.35&&(o+=(.6+Math.random())*i*2.2),this.bumpIn=0;let s=(Math.sin(r*31.7)*Math.sin(r*12.3+1.3)+.5*Math.sin(r*47.1+.4))*i,c=(e-this.lastSpeed)/n,l=(t.steer-this.lastSteer)/n;this.lastSpeed=e,this.lastSteer=t.steer;let u=(e,t,r,i,a)=>(t+=(-r*e-i*t+a)*n,[e+t*n,t]);[a.b,a.vb]=u(a.b,a.vb,900,16,s*40+o*60*(Math.random()-.3)),[a.bz,a.vbz]=u(a.bz,a.vbz,700,14,o*30*(Math.random()-.5)-l*3),[a.f,a.vf]=u(a.f,a.vf,1600,20,s*60+o*90*(Math.random()-.5)),[a.r,a.vr]=u(a.r,a.vr,1400,20,s*50+o*90*(Math.random()-.5)),[a.c,a.vc]=u(a.c,a.vc,60,5,-c*2.5+s*6+o*25*(Math.random()-.5)),[a.cz,a.vcz]=u(a.cz,a.vcz,50,4,-l*4);let d=(e,t)=>Math.max(-t,Math.min(t,e));this.basket.rotation.set(d(a.b*.006,.03),0,d(a.bz*.006,.03)),this.frontFender.rotation.x=d(a.f*.004,.02),this.rearFender.rotation.x=d(a.r*.004,.02),this.cables.rotation.set(d(a.c*.01,.07),0,d(a.cz*.01,.05))}if(this.bellT>=0){this.bellT+=n;let e=this.bellT,t=e<.28?Math.sin(e/.28*Math.PI):0;this.bellLever.rotation.y=-t*.7;let r=Math.exp(-e*7)*Math.sin(e*95);this.bell.rotation.set(r*.06,0,r*.05),e>.9&&(this.bellT=-1,this.bell.rotation.set(0,0,0),this.bellLever.rotation.y=0)}}buildFrame(){let e=new Ta,t=new Ta,n=Xi.gloss,r=Xi.chrome,a=(t,r,i,a,o=Zi,s=n)=>e.push(xa(ba([[-a/2,i*.9],[-a/2+.004,i],[a/2-.004,i],[a/2,i*.9]],!1,o,s,20,0,_a,!0),r,t)),o=Vi.clone().sub(Hi).normalize();e.push(q([Hi,Vi],.025,Zi,n,16)),a(Hi.clone().addScaledVector(o,.02),o,.029,.04),a(Vi.clone().addScaledVector(o,-.018),o,.029,.036);let s=K(0,-o.z,o.y).multiplyScalar(-1);s.z>0&&s.negate();let c=Hi.clone().lerp(Vi,.52),l=P(new y(.014,.014,.004,16),fa,r);l.scale(1,1,1.35),l.applyQuaternion(new le().setFromUnitVectors(K(0,1,0),s)),l.translate(c.x+s.x*.025,c.y+s.y*.025,c.z+s.z*.025),e.push(l);let u=P(new y(.008,.008,.004,12),Zi,n);u.scale(1,1,1.35),u.applyQuaternion(new le().setFromUnitVectors(K(0,1,0),s)),u.translate(c.x+s.x*.0268,c.y+s.y*.0268,c.z+s.z*.0268),e.push(u);let d=[K(0,.8,-.442),K(0,.7,-.365),K(0,.57,-.235),K(0,.43,-.115),K(0,.335,-.01),K(0,zi.y,zi.z)];e.push(q(d,e=>.027-.003*e,Zi,n,14));let p=[K(0,.885,-.418),K(0,.8,-.3),K(0,.7,-.1),K(0,.635,.07),K(0,.605,.162)];e.push(q(p,e=>.019-.002*e,Zi,n,12));let m=pa.clone().sub(zi).normalize();e.push(q([zi,pa],e=>.021-.002*e,Zi,n,14)),a(pa.clone().addScaledVector(m,-.022),m,.024,.045),e.push(xa(ba([[-.024,.029],[-.04,.026],[.04,.026],[.024,.029]],!1,G,r,18,0,_a,!0),m,pa.clone().addScaledVector(m,-.004))),e.push(xa(ba([[0,0],[0,.006],[.018,.006],[.018,0]],!1,G,r,8),K(1,0,0),pa.clone().add(K(.02,-.006,.012)))),e.push(xa(ba([[-.042,.022],[-.04,.026],[.04,.026],[.042,.022]],!1,Zi,n,18,0,_a,!0),K(1,0,0),zi));for(let t of[-1,1])e.push(q([K(t*.052,.342,.515),K(t*.04,.33,.3),K(t*.03,.308,.09)],e=>.0105+.003*e,Zi,n,10)),e.push(q([K(t*.05,.352,.505),K(t*.038,.58,.37),K(t*.022,.8,.238)],e=>.0092+.002*e,Zi,n,10)),e.push(F(I(.006,.04,.05,Zi,n),t*.054,.345,.515,-.3)),e.push(xa(ba([[0,0],[0,.009],[.007,.009],[.007,0]],!1,G,r,6),K(t,0,0),K(t*.06,Li.y,Li.z)));e.push(q([K(-.036,.66,.325),K(.036,.66,.325)],.006,Zi,n,8));let h=(t,n,r,i,a,o)=>{let s=P(new y(t,t,n,12,1,!0,a,o),i,M.plain);s.translate(0,r,0),s.applyQuaternion(new le().setFromUnitVectors(K(0,1,0),m));let c=zi.clone().addScaledVector(m,.34);e.push(s.translate(c.x,c.y,c.z))};h(.0212,.052,0,`#f4f3ee`,Math.PI/2-.75,1.5),h(.0215,.012,.019,`#2f5da6`,Math.PI/2-.75,1.5),h(.0215,.009,-.004,`#262a33`,Math.PI/2-.45,.9),h(.0215,.004,-.017,`#c23a3a`,Math.PI/2-.45,.35);let g=e=>{let t=[];for(let n=0;n<40;n++){let r=n/40*_a;t.push([-zi.z+Math.cos(r)*(.108+e),zi.y+Math.sin(r)*(.108+e)]),t.push([-Li.z+Math.cos(r)*(.062+e),Li.y+Math.sin(r)*(.062+e)])}t.sort((e,t)=>e[0]-t[0]||e[1]-t[1]);let n=(e,t,n)=>(t[0]-e[0])*(n[1]-e[1])-(t[1]-e[1])*(n[0]-e[0]),r=[],a=[];for(let e of t){for(;r.length>=2&&n(r[r.length-2],r[r.length-1],e)<=0;)r.pop();r.push(e)}for(let e=t.length-1;e>=0;e--){let r=t[e];for(;a.length>=2&&n(a[a.length-2],a[a.length-1],r)<=0;)a.pop();a.push(r)}let o=r.slice(0,-1).concat(a.slice(0,-1));return new C(o.map(([e,t])=>new i(e,t)))},_=P(new f(g(0),{depth:.012,bevelEnabled:!0,bevelThickness:.004,bevelSize:.005,bevelSegments:2,curveSegments:4}),aa,n);_.rotateY(Math.PI/2),e.push(_.translate(.074,0,0));let v=P(new f(g(-.012),{depth:5e-4,bevelEnabled:!1,curveSegments:4}),oa,n),b=P(new f(g(-.016),{depth:8e-4,bevelEnabled:!1,curveSegments:4}),aa,n);v.rotateY(Math.PI/2),b.rotateY(Math.PI/2),e.push(v.translate(.0905,0,0),b.translate(.0908,0,0)),e.push(F(I(.002,.022,.1,G,r),.0918,.322,.27));for(let t=0;t<4;t++)e.push(F(I(.002,.008,.012,`#1f3f7a`,M.plain),.0925,.322,.235+t*.022));e.push(xa(ba([[-.006,.02],[-.006,.048],[.006,.052],[.008,.02]],!1,Qi,M.metal,28,0,_a,!1),K(-1,0,0),K(-.06,Li.y,Li.z))),e.push(F(I(.006,.012,.09,Qi,M.metal),-.066,Li.y-.01,Li.z-.05,.25));let x=ba([[-.04,.352],[-.04,.384],[-.034,.39],[.034,.39],[.04,.384],[.04,.352],[.032,.352],[.032,.38],[-.032,.38],[-.032,.352]],!0,G,r,14,.24*Math.PI,.41*Math.PI);e.push(x.translate(0,Li.y,Li.z));let S=(e,t)=>{let n=ba([[0,.382],[0,.356]],!1,t,M.metal,10,.255*Math.PI,.395*Math.PI);return e<0&&Da(n),n.translate(e*.0412,Li.y,Li.z)};e.push(S(1,Qi)),e.push(S(-1,Qi));let w=.33*Math.PI,T=.369,E=K(.042,Li.y+T*Math.sin(w),Li.z-T*Math.cos(w));e.push(xa(ba([[0,.0085],[.003,.0085],[.003,.004],[.0035,0]],!1,G,r,14),K(1,0,0),E)),e.push(F(I(.004,.016,.012,fa,r),E.x+.008,E.y-.004,E.z,0,0,.2)),t.push(F(I(.002,.03,.016,`#e04848`,M.plain),E.x+.011,E.y-.03,E.z+.004,0,0,.12)),this.frameF=e,this.frameT=t,this.kick.position.copy(Wi);let ee=new Ta;ee.push(q([K(0,.01,0),K(0,-.16,.004),K(0,-.312,0)],e=>.012-.004*e,G,r,8)),ee.push(xa(ba([[-.014,.013],[.014,.013]],!1,Qi,M.metal,10),K(1,0,0),K(0,0,0))),ee.push(F(I(.03,.01,.05,$i,M.metal),0,-.32,.004)),this.mesh(ee,this.kick,1)}buildRear(){let e=this.frameF,t=this.frameT,n=Xi.chrome,r=.785,i=.37,a=.075,o=[K(-.075,r,i),K(-.075,r,.69),K(-.0525,r,.716),K(0,r,.724),K(a*.7,r,.716),K(a,r,.69),K(a,r,i)];e.push(q(o,.0058,G,n,8));for(let t of[.39,.48,.57,.66])e.push(q([K(-.075,r,t),K(a,r,t)],.0042,G,n,6));for(let t of[-.026,.026])e.push(q([K(t,.786,i),K(t,.786,.716)],.0042,G,n,6));for(let t of[-1,1])e.push(q([K(t*a,r,.66),K(t*.072,.56,.6),K(t*.06,.352,.522)],.0055,G,n,6)),e.push(q([K(t*a,r,.5),K(t*.06,.352,.518)],.005,G,n,6)),e.push(q([K(t*a,r,i),K(t*.035,.755,.285)],.0045,G,n,6));let s=.798;e.push(q([K(-.05,s,.41),K(-.05,s,.68),K(-.035,s,.7),K(.035,s,.7),K(.05,s,.68),K(.05,s,.41)],.004,G,n,6));for(let e of[-1,1])t.push(Sa(K(e*.03,.794,.405),K(e*.062,.794,.405),.0075,4.5,.0017,G,n));t.push(q([K(-.07,.794,.405),K(.07,.794,.405)],.0022,G,n,6)),e.push(F(I(.075,.034,.012,la,M.lantern),0,.755,.724)),e.push(F(I(.08,.04,.008,$i,M.metal),0,.755,.716)),e.push(q([K(0,r,.716),K(0,.773,.716)],.004,G,n,6));let c=new E(1,28,14),l=c.attributes.position;for(let e=0;e<l.count;e++){let t=l.getX(e),n=l.getY(e),r=l.getZ(e),i=.045+.063*va(-.75,.55,r),a=n>0?.04*(1-.3*va(.45,1,Math.abs(t)))+.008*va(.5,1,r):.034-.012*va(-.2,-1,r),o=1+.06*Math.max(0,1-Math.abs(n)*2);l.setXYZ(e,t*i*o,n*a+.012*r*r,r*.135)}c.deleteAttribute(`normal`),c.computeVertexNormals(),e.push(P(c,ia,Xi.gloss).translate(Ui.x,Ui.y-.004,Ui.z-.03));let u=[];for(let e=0;e<=40;e++){let t=e/40*_a,n=Math.cos(t),r=Math.sin(t),i=.045+.063*va(-.75,.55,n);u.push(K(r*i*1.06,Ui.y-.004+.012*n*n,Ui.z-.03+n*.135))}t.push(q(u,.0035,`#2a1914`,M.plain,5,80,1,!1));let d=pa.clone().sub(zi).normalize(),f=pa.clone().addScaledVector(d,.03);e.push(q([pa.clone().addScaledVector(d,-.02),f],.0135,G,n,12)),e.push(F(I(.03,.018,.03,G,n),f.x,f.y+.004,f.z));for(let r of[-1,1])e.push(q([K(0,Ui.y-.012,Ui.z-.14),K(r*.026,Ui.y-.02,Ui.z-.06),K(r*.055,Ui.y-.018,Ui.z+.045)],.0035,G,n,6)),e.push(q([K(r*.058,f.y+.002,Ui.z+.05),K(r*.02,f.y+.004,f.z-.005),K(0,f.y+.006,f.z-.03)],.0038,G,n,6)),t.push(Sa(K(r*.058,f.y+.002,Ui.z+.05),K(r*.056,Ui.y-.018,Ui.z+.048),.0105,4.5,.0024,G,n));this.mesh(e,this.group,1),this.mesh(t,this.group,.4);let p=K(0,.66,.325);this.rearFender.position.copy(p),this.group.add(this.rearFender);let m=new Ta;m.push(ba([[-.041,.355],[-.034,.37],[-.018,.3765],[0,.378],[.018,.3765],[.034,.37],[.041,.355],[.037,.3545],[.031,.367],[.016,.3725],[0,.374],[-.016,.3725],[-.031,.367],[-.037,.3545]],!0,G,n,40,.445*Math.PI,1.12*Math.PI,!0).translate(0,Li.y,Li.z));let h=1.08*Math.PI,g=K(0,Li.y+.382*Math.sin(h),Li.z-.382*Math.cos(h));m.push(F(_t(1,la,M.lantern,14,8),g.x,g.y,g.z,0,0,0,.022,.022,.009));for(let e of[-1,1]){let t=1.02*Math.PI;m.push(q([K(e*.04,Li.y+.36*Math.sin(t),Li.z-.36*Math.cos(t)),K(e*.06,Li.y+.008,Li.z+.012)],.0032,G,n,5))}for(let e of m.list)e.translate(-p.x,-p.y,-p.z);this.mesh(m,this.rearFender,1)}buildSteer(){this.steer.position.copy(Hi),this.group.add(this.steer);let e=new Ta,t=new Ta,n=Xi.gloss,r=Xi.chrome,i=Vi.clone().sub(Hi).normalize();e.push(xa(ba([[0,.027],[.012,.029],[.016,.022]],!1,G,r,20,0,_a,!0),i.clone().negate(),Hi)),e.push(xa(ba([[0,.027],[.01,.029],[.02,.03],[.026,.024],[.03,.016]],!1,G,r,20,0,_a,!0),i,Vi));let a=K(0,1.066,-.382);e.push(q([Vi,K(0,1.03,-.39),a],.0142,G,r,12)),e.push(xa(ba([[-.022,.012],[-.02,.018],[.02,.018],[.022,.012]],!1,G,r,16,0,_a,!0),K(1,0,0),a));let o=K(0,.722,-.466);e.push(F(I(.118,.026,.042,G,r),o.x,o.y,o.z,Math.atan2(i.z,i.y)));for(let t of[-1,1])e.push(q([K(t*.047,.72,-.466),K(t*.047,.6,-.49),K(t*.046,.46,-.522),K(t*.045,.345,-.532)],e=>.0135-.005*e,Zi,n,10)),e.push(F(I(.006,.035,.03,Zi,n),t*.046,Ri.y,Ri.z)),e.push(xa(ba([[0,0],[0,.009],[.007,.009],[.007,0]],!1,G,r,6),K(t,0,0),K(t*.052,Ri.y,Ri.z)));e.push(q([K(-.03,.735,-.49),K(-.035,.705,-.5),K(-.024,.66,-.497)],.004,G,r,6)),e.push(q([K(.03,.735,-.49),K(.035,.705,-.5),K(.024,.66,-.497)],.004,G,r,6)),e.push(F(I(.03,.012,.014,G,r),0,.738,-.492));let s=[],c=[K(.345,1.05,-.17),K(.24,1.05,-.17),K(.2,1.055,-.215),K(.15,1.064,-.305),K(.075,1.067,-.372),K(0,1.067,-.384)];for(let e of c)s.push(e.clone().setX(-e.x));for(let e=c.length-2;e>=0;e--)s.push(c[e].clone());e.push(q(s,.011,G,r,10));let l=[[-.056,0],[-.056,.019],[-.052,.021]];for(let e=0;e<=8;e++)l.push([-.048+e*.011,e%2?.0195:.0182]);l.push([.051,.022],[.056,.024],[.059,.02],[.059,0]);for(let t of[-1,1]){let n=ba(l,!1,ra,M.plain,16,0,_a,!0);t<0&&Da(n),e.push(n.translate(t*.29,1.05,-.17)),e.push(xa(ba([[-.009,.013],[-.007,.016],[.007,.016],[.009,.013]],!1,G,r,12,0,_a,!0),K(1,0,0),K(t*.226,1.051,-.186))),e.push(q([K(t*.228,1.046,-.2),K(t*.245,1.04,-.222),K(t*.3,1.036,-.228),K(t*.335,1.037,-.222)],e=>.0055-.0015*e,G,r,6,0,.55)),e.push(F(_t(.006,G,r,8,6),t*.337,1.037,-.221))}let u=K(-.082,.63,-.505);e.push(xa(ba([[-.035,0],[-.035,.012],[-.03,.022],[-.012,.028],[.018,.03],[.024,.033],[.028,.032],[.028,.026]],!1,G,r,22,0,_a,!0),K(0,0,-1),u)),e.push(F(I(.034,.012,.018,G,r),-.064,.63,-.5)),e.push(q([K(-.064,.618,-.488),K(-.036,.63,-.47),K(-.024,.636,-.44)],.004,Qi,M.metal,6)),e.push(xa(ba([[-.006,0],[-.006,.008],[.006,.008],[.006,0]],!1,$i,M.plain,12),K(0,0,1),K(-.022,.638,-.435)));let d=xa(ba([[0,0],[0,.027],[.004,.02],[.006,0]],!1,da,Xi.lens,22,0,_a,!0),K(0,0,-1),u.clone().add(K(0,0,-.028)));this.mesh([Oa(d)],this.steer,1,this.lampMat);for(let t of[-1,1])e.push(q([K(t*.13,.768,-.8),K(t*.09,.56,-.66),K(t*.056,Ri.y+.01,Ri.z)],.0048,G,r,6));e.push(q([K(0,.77,-.56),K(0,.742,-.5)],.006,G,r,6,0,.4)),this.mesh(e.list.map(Oa),this.steer,1);let f=K(0,1.045,-.2);this.cables.position.copy(f.clone().sub(Hi)),this.steer.add(this.cables);let p=[q([K(.226,1.043,-.2),K(.222,1.03,-.26),K(.16,.99,-.42),K(.07,.905,-.505),K(.02,.8,-.505),K(.004,.745,-.494)],.0033,ca,M.plain,5),q([K(-.226,1.043,-.2),K(-.222,1.03,-.26),K(-.15,.985,-.41),K(-.06,.89,-.48),K(-.034,.8,-.462),K(-.03,.782,-.452)],.0033,ca,M.plain,5)];t.push(...p),this.mesh(t.list.map(e=>e.translate(-f.x,-f.y,-f.z)),this.cables,.45);let m=K(-.19,1.078,-.228);this.bell.position.copy(m.clone().sub(Hi)),this.steer.add(this.bell);let h=new Ta,g=ba([[0,0],[.002,.031],[.009,.03],[.017,.025],[.023,.015],[.026,.005],[.0265,0]],!1,G,r,28,0,_a,!0);g.rotateZ(Math.PI/2),h.push(g.translate(0,-.012,0)),h.push(F(_t(.0055,G,r,8,6),0,.0155,0)),h.push(xa(ba([[-.008,.0125],[.008,.0125]],!1,$i,M.metal,12),K(.05,.009,-.09),K(0,-.024,0))),this.mesh(h,this.bell,1),this.bellLever.position.set(.012,-.008,.012),this.bell.add(this.bellLever);let _=[q([K(0,0,0),K(-.018,0,.018),K(-.034,.002,.028)],.0028,G,r,6,0,.5),F(_t(.006,G,r,10,6),-.035,.002,.029)];this.mesh(_,this.bellLever,1);let v=K(0,.71,-.47);this.frontFender.position.copy(v.clone().sub(Hi)),this.steer.add(this.frontFender);let y=new Ta;y.push(ba([[-.039,.352],[-.032,.365],[-.017,.3715],[0,.373],[.017,.3715],[.032,.365],[.039,.352],[.035,.3515],[.029,.362],[.015,.3675],[0,.369],[-.015,.3675],[-.029,.362],[-.035,.3515]],!0,G,r,34,.08*Math.PI,.64*Math.PI,!0).translate(0,Ri.y,Ri.z));let b=.08*Math.PI,x=K(0,Ri.y+.36*Math.sin(b),Ri.z-.36*Math.cos(b));y.push(F(I(.06,.07,.003,`#f1efe8`,M.plain),x.x,x.y-.03,x.z-.004,.2));for(let e of[-1,1]){let t=.2*Math.PI;y.push(q([K(e*.038,Ri.y+.355*Math.sin(t),Ri.z-.355*Math.cos(t)),K(e*.052,Ri.y+.006,Ri.z-.01)],.003,G,r,5))}for(let e of y.list)e.translate(-v.x,-v.y,-v.z);this.mesh(y,this.frontFender,1),this.frontWheel.position.copy(Ri.clone().sub(Hi)),this.steer.add(this.frontWheel)}buildBasket(){let e=ga.clone().sub(Hi);this.basket.position.copy(e),this.steer.add(this.basket),this.basketContents.position.copy(e).negate(),this.basket.add(this.basketContents),this.basketFloor.position.set(0,ha.y+.006,(ha.z0+ha.z1)/2).sub(Hi),this.basketContents.add(this.basketFloor);let t=Xi.chrome,n=[],r=[],i=[];for(let e=0;e<=96;e++)n.push(wa(e/96,1,.002)),r.push(wa(e/96,.52,.002)),i.push(wa(e/96,0,.001));let a=[q(n,.0068,sa,t,8,192,1,!1),q(i,.0048,sa,t,6,192,1,!1)],o=[q(r,.0032,sa,t,5,192,1,!1)];for(let e of[-1,1])for(let n=0;n<34;n++){let r=[];for(let t=0;t<=10;t++){let i=t/10;r.push(wa(n/34+e*.12*i,.02+i*.96,e*.0012))}o.push(q(r,.0021,sa,t,4,10,1,!1))}let s=ha.y-.002;for(let e=-.12;e<=.121;e+=.04)o.push(q([K(e,s,ha.z0+.012),K(e,s,ha.z1-.012)],.0026,sa,t,4));for(let e=ha.z0+.045;e<ha.z1-.02;e+=.045)o.push(q([K(-ha.hx+.01,s,e),K(ha.hx-.01,s,e)],.0026,sa,t,4));this.mesh(a.map(Oa),this.basketContents,1),this.mesh(o.map(Oa),this.basketContents,.3)}buildCrank(){this.crank.position.copy(zi);let e=Xi.chrome,t=new Ta,n=new C;for(let e=0;e<152;e++){let t=e/152*_a,r=[.1,.1,.094,.094][e%4],i=Math.cos(t)*r,a=Math.sin(t)*r;e===0?n.moveTo(i,a):n.lineTo(i,a)}n.closePath();for(let e=0;e<5;e++){let t=new x,r=e/5*_a+.18,i=r+_a/5-.36;t.absarc(0,0,.078,r,i,!1),t.absarc(0,0,.04,i,r,!0),t.closePath(),n.holes.push(t)}let r=P(new f(n,{depth:.004,bevelEnabled:!1,curveSegments:6}),G,e);r.rotateY(Math.PI/2),t.push(r.translate(.094,0,0)),t.push(xa(ba([[-.1,.012],[.1,.012]],!1,Qi,M.metal,12),K(1,0,0),K(0,0,0)));for(let n of[1,-1]){let r=new C;r.moveTo(-.017,0),r.lineTo(-.011,-.165),r.absarc(0,-.165,.011,Math.PI,0,!1),r.lineTo(.017,0),r.absarc(0,0,.017,0,Math.PI,!1);let i=P(new f(r,{depth:.01,bevelEnabled:!0,bevelThickness:.002,bevelSize:.002,bevelSegments:1,curveSegments:8}),`#d5d9de`,M.metal);i.rotateY(Math.PI/2),n<0&&i.rotateX(Math.PI),t.push(i.translate(n*.104-.005,0,0)),t.push(xa(ba([[0,.009],[.004,.007]],!1,G,e,10),K(n,0,0),K(n*.112,0,0)));let a=new d;a.position.set(n*.14,-n*Bi,0),this.crank.add(a);let o=new Ta;o.push(xa(ba([[-.032,.006],[.05,.006]],!1,G,e,8),K(n,0,0),K(0,0,0))),o.push(F(I(.09,.02,.012,$i,M.metal),n*.008,0,-.03)),o.push(F(I(.09,.02,.012,$i,M.metal),n*.008,0,.03));for(let e of[-1,1])o.push(F(I(.006,.022,.07,Qi,M.metal),n*.008+e*.045,0,0));o.push(F(I(.08,.012,.05,`#141414`,M.plain),n*.008,.004,0));for(let e of[-.037,.037])o.push(F(I(.05,.012,.004,ua,M.lantern),n*.008,0,e));this.mesh(o,a,1),this.pedals.push(a)}this.mesh(t,this.crank,1)}buildWheel(t,n){let r=Xi.chrome,i=new Ta,a=[];for(let e=0;e<20;e++){let t=e/20*_a;a.push([Math.cos(t)*.0195,.318+Math.sin(t)*.022])}i.push(ba(a,!0,e=>e===5?ta:e===0||e===10?na:ea,M.plain,72,0,_a,!0)),i.push(ba([[-.0115,.28200000000000003],[.0115,.28200000000000003],[.0125,.29000000000000004],[.0122,.30400000000000005],[.0095,.30900000000000005],[-.0095,.30900000000000005],[-.0122,.30400000000000005],[-.0125,.29000000000000004]],!0,G,r,72)),i.push(ba([[-.075,.005],[-.075,.009],[-.042,.009],[-.04,.014],[-.037,.031],[-.032,.031],[-.029,.017],[.029,.017],[.032,.031],[.037,.031],[.04,.014],[.042,.009],[.075,.009],[.075,.005]],!0,G,r,20)),n&&i.push(ba([[.04,.01],[.04,.034],[.05,.03],[.05,.01]],!0,Qi,M.metal,16));let o=_a/36*.5,s=K(0,Math.sin(o),-Math.cos(o));i.push(xa(ba([[0,.0032],[.022,.0032]],!1,G,r,6),s.clone().negate(),s.clone().multiplyScalar(.28400000000000003))),i.push(xa(ba([[0,.0048],[.012,.0048],[.014,.003]],!1,$i,M.plain,8),s.clone().negate(),s.clone().multiplyScalar(.262))),this.mesh(i,t,1);let c=[],l=.28200000000000003;for(let e=0;e<36;e++){let t=e%2?1:-1,n=Math.floor(e/2),r=e/36*_a,i=r+(n%2?1:-1)*.95,a=K(t*.034,Math.sin(i)*.026,-Math.cos(i)*.026),o=K(t*.004,Math.sin(r)*l,-Math.cos(r)*l);c.push(q([a,o],.0016,`#d9dce0`,Xi.spoke,4,1,1,!1));let s=o.clone().lerp(a,.035);c.push(q([o,s],.0028,`#e8eaed`,Xi.spoke,5,1,1,!1))}for(let t of[-1,1]){let n=P(new e(.032,.278,48,2),`#c7ccd2`,Xi.spoke);n.rotateY(t*Math.PI/2),n.translate(t*.02,0,0);let r=n.attributes.uv;for(let e=0;e<r.count;e++)r.setXY(e,0,1);c.push(n)}let u=Be(N.bike,0,{uBlur:{value:0}});this.spokeMats.push(u),this.mesh(c,t,0,u)}};function Da(e){e.scale(-1,1,1);let t=e.index;for(let e=0;e<t.count;e+=3){let n=t.getX(e+1);t.setX(e+1,t.getX(e+2)),t.setX(e+2,n)}return e}function Oa(e){return e.translate(-Hi.x,-Hi.y,-Hi.z)}var ka=`#506054`,Aa=`#180f24`,ja=`#16131c`,Ma=`#5c1b3e`,Na=`#ff7a12`,Pa=`#121016`,Fa=ja,Ia=Fa,La=`#1a1422`,Ra=`#0c0a10`,J=(e,t,n)=>new p(e,t,n);function za(e,t){return new v(e,k(t,1))}function Ba(e,t,n,r,i,a){let o=new p().subVectors(t,e),s=o.length();s=Math.min(Math.max(s,Math.abs(n-r)+.001),n+r-.001),o.normalize();let c=(n*n+s*s-r*r)/(2*n*s),l=Math.sqrt(Math.max(0,1-c*c)),u=i.clone().sub(o.clone().multiplyScalar(i.dot(o))).normalize();a.copy(e).addScaledVector(o,n*c).addScaledVector(u,n*l)}var Va=class{mesh;constructor(e,t,n,r,i){let a=t.length,o=new y(1,1,1,12,(a-1)*2,!0);o.translate(0,.5,0);let s=o.attributes.position;for(let e=0;e<s.count;e++){let n=s.getY(e)*(a-1),r=Math.min(a-2,Math.floor(n)),i=n-r,o=t[r]+(t[r+1]-t[r])*(i*i*(3-2*i));s.setXYZ(e,s.getX(e)*o,s.getY(e),s.getZ(e)*o)}this.mesh=za(P(Ha(o),n,r),i),e.add(this.mesh)}set(e,t){let n=new p().subVectors(t,e),r=n.length();this.mesh.position.copy(e),this.mesh.quaternion.setFromUnitVectors(J(0,1,0),n.normalize()),this.mesh.scale.set(1,r,1)}};function Ha(e){e.deleteAttribute(`uv`),e.deleteAttribute(`normal`);let t=we(e,1e-5);return t.computeVertexNormals(),t}var Ua=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Wa=1,Ga=(e,t)=>J(Math.sin(e)*Math.cos(t),Math.sin(t),-Math.cos(e)*Math.cos(t)),Ka=.03,qa=.132,Ja=-.106,Ya=[[.03,.088,.099,.112],[.01,.087,.1,.11],[-.012,.085,.099,.103],[-.028,.0825,.099,.093],[-.042,.0795,.098,.079],[-.053,.075,.096,.061],[-.062,.0695,.0945,.036],[-.071,.0625,.0935,.013],[-.08,.054,.093,-.01],[-.088,.045,.092,-.031],[-.095,.0355,.0905,-.049],[-.1,.026,.0875,-.061],[-.1035,.016,.084,-.068],[Ja,0,.079,-.072]],Xa=1024,Za=(()=>{let e=new Float32Array(3075),t=Ya.length;for(let n=0;n<=Xa;n++){let r=Ka+-.136*n/Xa,i=0;for(;i<t-2&&r<Ya[i+1][0];)i++;let a=Ya[i][0],o=Ya[i+1][0],s=(r-a)/(o-a);for(let r=1;r<=3;r++){let c=Ya[i][r],l=Ya[i+1][r],u=i>0?(l-Ya[i-1][r])/(o-Ya[i-1][0])*(o-a):r===3?0:(l-c)*.3,d=i<t-2?(Ya[i+2][r]-c)/(Ya[i+2][0]-a)*(o-a):l-c,f=s*s,p=f*s;e[n*3+r-1]=(2*p-3*f+1)*c+(p-2*f+s)*u+(-2*p+3*f)*l+(p-f)*d}}return e})(),Qa=[0,0,0];function $a(e){if(e>=Ka){let t=Math.min(1,(e-Ka)/.10200000000000001),n=Math.sqrt(Math.max(0,1-t*t));return Qa[0]=Za[0]*n,Qa[1]=Za[1]*Math.sqrt(Math.max(0,1-t**1.7)),Qa[2]=Za[2]*n,Qa}let t=(e-Ka)/-.136*Xa,n=Math.min(1023,Math.max(0,Math.floor(t))),r=Math.min(1,Math.max(0,t-n));for(let e=0;e<3;e++)Qa[e]=Za[n*3+e]*(1-r)+Za[n*3+3+e]*r;return Qa}function eo(e,t,n){if(t>qa||t<Ja)return!1;let[r,i,a]=$a(t),o=(i+a)/2;if(r<=1e-5||o<=1e-5)return!1;let s=(n-(a-i)/2)/o;return(Math.abs(e)/r)**+(s<0?2+.55*Ua(.06,0,t)*Ua(-.098,-.066,t):2)+s*s<1}var to=Math.atan2(-.0435,.1),no=Math.atan2(-.061,.096);function ro(e){let t=Math.atan2(e.x,-e.z),n=Math.asin(Math.max(-1,Math.min(1,e.y)));if(Math.abs(t)>1.2)return 0;let r=n-to,i=.0072*Math.exp(-((t/(.062+.05*Math.max(0,-r)))**2)-(r/(r>0?.13:.04))**2);i+=.0026*Math.exp(-((t/.055)**2))*Ua(-.02,.08,r)*Ua(.4,.22,r),i-=.0022*Math.exp(-((t/.25)**2)-((n-no-.075)/.05)**2),i+=.0014*Math.exp(-((t/.16)**2)-((n-no-.028)/.026)**2),i+=.001*Math.exp(-((t/.14)**2)-((n-no+.035)/.03)**2),i-=.0012*Math.exp(-((t/.3)**2)-((n-no+.085)/.035)**2),i+=.0016*Math.exp(-((t/.28)**2)-((n-no+.17)/.07)**2);for(let e of[-1,1])i+=.0026*Math.exp(-(((t-e*.72)/.22)**2)-((n+.2)/.16)**2);return i}function io(e){let t=0,n=.2;for(let r=0;r<19;r++){let r=(t+n)/2;eo(e.x*r,e.y*r,e.z*r)?t=r:n=r}return(t+n)/2+ro(e)}function ao(e,t){t<-.012&&(t=-.012+(t+.012)*.9);let n=Math.asin(Math.max(-.99,Math.min(.99,e/.1))),r=Math.atan2(t,.1);for(let i=0;i<8;i++){let i=Ga(n,r),a=io(i);n+=(e-i.x*a)/(a*Math.cos(r)*Math.cos(n)+1e-4),r+=(t-i.y*a)/a}return[n,r]}var oo=new p,so=new p,co=new p,lo=new p;function uo(e,t){oo.set(0,1,0).cross(e),oo.lengthSq()<1e-6&&oo.set(1,0,0),oo.normalize(),so.crossVectors(e,oo).normalize();let n=.01,r=(n,r,i)=>{let a=e.clone().addScaledVector(oo,n).addScaledVector(so,r).normalize();return i.copy(a).multiplyScalar(t(a))},i=r(n,0,co).sub(r(-.01,0,new p)),a=r(0,n,lo).sub(r(0,-.01,new p)),o=new p().crossVectors(i,a).normalize();return o.dot(e)<0?o.negate():o}var fo=[[0,.72],[.7,.64],[1.05,.3],[1.3,.14],[1.55,.08],[1.8,.06],[2.05,-.2],[2.4,-.5],[Math.PI,-.6]];function po(e){let t=Math.abs(e);for(let e=1;e<fo.length;e++){let[n,r]=fo[e-1],[i,a]=fo[e];if(t<=i){let e=(t-n)/(i-n);return r+(a-r)*(.5-.5*Math.cos(e*Math.PI))}}return fo[fo.length-1][1]}function mo(e,t,n,r){let i=Ga(t,n),a=uo(i,io),o=i.clone().multiplyScalar(io(i)),s=new c().lookAt(o.clone().add(a),o,J(0,1,0));s.setPosition(o),e.applyMatrix4(s);let l=e.attributes.position,u=new p,d=new p;for(let e=0;e<l.count;e++){u.fromBufferAttribute(l,e);let t=u.clone().sub(o).dot(a);d.copy(u).addScaledVector(a,-t).normalize();let n=uo(d,io);u.copy(d).multiplyScalar(io(d)).addScaledVector(n,r+t),l.setXYZ(e,u.x,u.y,u.z)}return e.computeVertexNormals(),e}var ho=e=>.014+.042*Math.max(0,e.y)**1.1+.022*Math.max(0,e.z)*(.6+.4*Math.max(0,e.y+.3))+.008*Math.abs(e.x)*Ua(-.1,.5,e.y);function go(e){let t=Math.atan2(e.x,-e.z),n=Math.asin(Math.max(-1,Math.min(1,e.y)));return-.005+(ho(e)+.005)*Ua(0,.32,n-po(t))}function _o(e,t,n,r,i,a,o=.35,s=0){let c=e.length,l=[],u=[],d=[];for(let i=0;i<c;i++){let a=new p().subVectors(e[Math.min(i+1,c-1)],e[Math.max(i-1,0)]).normalize(),s=new p().crossVectors(a,t[i]).normalize(),u=new p().crossVectors(s,a).normalize(),f=e[i];for(let e of[f.clone().addScaledVector(s,n[i]),f.clone().addScaledVector(u,r[i]),f.clone().addScaledVector(s,-n[i]),f.clone().addScaledVector(u,-r[i]*o)])l.push(e.x,e.y,e.z);d.push(a)}let f=e=>new p(l[e*3],l[e*3+1],l[e*3+2]),m=(e,t,n,r)=>{let i=f(e),a=f(t),o=f(n);new p().crossVectors(a.clone().sub(i),o.clone().sub(i)).dot(r)<0?u.push(e,n,t):u.push(e,t,n)};for(let t=0;t<c-1;t++){let n=e[t].clone().add(e[t+1]).multiplyScalar(.5);for(let e=0;e<4;e++){let r=t*4+e,i=t*4+(e+1)%4,a=r+4,o=i+4,s=f(r).add(f(i)).add(f(a)).add(f(o)).multiplyScalar(.25).sub(n);m(r,i,a,s),m(i,o,a,s)}}let h=d[0].clone().negate(),g=d[c-1];m(0,1,2,h),m(0,2,3,h);let _=(c-1)*4;m(_,_+1,_+2,g),m(_,_+2,_+3,g);let v=new b;if(v.setAttribute(`position`,new ae(l,3)),v.setIndex(u),v.computeVertexNormals(),s>0){let e=v.attributes.normal,t=v.attributes.position,n=new p,r=new p;for(let i=0;i<e.count;i++)n.fromBufferAttribute(e,i),r.fromBufferAttribute(t,i).normalize(),n.lerp(r,s).normalize(),e.setXYZ(i,n.x,n.y,n.z)}return P(v,i,a)}function vo(e,t,n,r,i,a,o,s=0,c=!1,l=11){let u=[],d=[],f=[],p=[];for(let m=0;m<l;m++){let h=m/(l-1),g=e+(n-e)*h**1.25+o*Math.sin(Math.PI*h),_=t+(r-t)*h,v=Ga(g,_),y=c?1:Ua(po(g)-.3,po(g)+.02,_),b=(c?.0022+Math.max(.004,go(v)):.006+(ho(v)-.01)*y)+s*h*h;u.push(v.clone().multiplyScalar(io(v)+b)),d.push(uo(v,io));let x=i*(.12+.88*(1-h**1.6))*(1-.6*h**8);f.push(x),p.push(a*(.4+.6*x/i))}return _o(u,d,f,p,Aa,M.hair,.5,.8)}function yo(e,t){let n=e.clone().normalize(),r=io(n)+t;return e.length()<r?n.multiplyScalar(r):e}function bo(e,t,n,r,i,a,o,s=0){let c=[],l=[],u=[],d=[];for(let i=0;i<8;i++){let a=i/7,o=e+(n-e)*a**1.2,s=t+(r-t)*a,u=Ga(o,s),d=Ua(po(o)-.3,po(o)+.02,s);c.push(u.clone().multiplyScalar(io(u)+.006+(ho(u)-.009)*d)),l.push(uo(u,io))}let f=c[7].clone(),p=Math.sign(f.x);for(let e=1;e<=7;e++){let t=e/7,n=J(f.x-p*(.005+s)*t*t,f.y+(i-f.y)*t,f.z+o*t);c.push(yo(n,.0045)),l.push(J(n.x,0,n.z*.5).normalize())}for(let e=0;e<15;e++){let t=e/14,n=a*(.1+.9*(1-t**1.5))*(.8+.2*Ua(0,.15,t));u.push(n),d.push(.004*(.4+.6*n/a))}return _o(c,l,u,d,Aa,M.hair,.5,.8)}function xo(){let e=[],t=_t(1,Ra,M.plain,18,12),n=t.attributes.position;for(let e=0;e<n.count;e++){let t=n.getX(e),r=n.getY(e),i=n.getZ(e)*.118-.07,a=.041*(1+.1*Ua(.02,-.12,i)-.12*Ua(-.14,-.19,i)),o=.03-.018*Ua(-.06,-.18,i);n.setXYZ(e,t*a,r>0?r*o:Math.max(r*.05,-.03),i)}t.computeVertexNormals(),e.push(t);let r=_t(1,`#2c1b13`,M.plain,18,6),i=r.attributes.position;for(let e=0;e<i.count;e++)i.setXYZ(e,i.getX(e)*.044,-.034+i.getY(e)*.0055,i.getZ(e)*.121-.07);r.computeVertexNormals(),e.push(r);let a=I(.07,.006,.014,`#4a2a1a`,M.plain);return a.rotateX(-.28),e.push(a.translate(0,.024,-.075)),z(e)}var So=[[-.03,.144,.096,.1],[.04,.14,.093,.095],[.125,.136,.088,.09],[.2,.14,.09,.092],[.26,.146,.093,.094],[.32,.154,.096,.096],[.37,.16,.096,.096],[.415,.168,.09,.092],[.448,.168,.08,.082],[.472,.138,.066,.07],[.481,.092,.054,.058],[.488,.06,.045,.05],[.492,.035,.038,.042]],Co=.492,wo=-.03,To=[0,0,0];function Eo(e){let t=So,n=t.length;e=Math.min(Co,Math.max(wo,e));let r=0;for(;r<n-2&&e>t[r+1][0];)r++;let i=t[r][0],a=t[r+1][0],o=(e-i)/(a-i),s=o*o,c=s*o;for(let e=1;e<=3;e++){let l=t[r][e],u=t[r+1][e],d=r>0?(u-t[r-1][e])/(a-t[r-1][0])*(a-i):u-l,f=r<n-2?(t[r+2][e]-l)/(t[r+2][0]-i)*(a-i):u-l;To[e-1]=(2*c-3*s+1)*l+(c-2*s+o)*d+(-2*c+3*s)*u+(c-s)*f}return To}function Do(e,t){return 0}var Oo=2.4;function ko(e,t,n=1){let[r,i,a]=Eo(t),o=1-Math.min(1,Math.abs(e)/r)**+Oo;return o<=0?0:n>0?a*Math.sqrt(o):i*Math.sqrt(o)+Do(e,t)*o}function Ao(e,t,n){let[r]=Eo(e),i=Math.sin(t),a=Math.cos(t),o=r*Math.sign(i)*Math.abs(i)**(2/Oo),s=a>=0?1:-1;return J(o*n,e,s*ko(o,e,s)*n)}function jo(e,t,n,r){let i=.004,a=n*ko(e,t,n),o=(n*ko(e+i,t,n)-n*ko(e-i,t,n))/(2*i),s=(n*ko(e,t+i,n)-n*ko(e,t-i,n))/(2*i),c=J(-o,-s,1).multiplyScalar(n).normalize();return J(e,t,a).addScaledVector(c,r)}function Mo(e,t,n,r,i,a,o=.003){let s=[],c=[],l=[],u=[];return e.forEach(([a,d],f)=>{let p=f/(e.length-1),m=jo(a,d,t,n),h=jo(a,d,t,n+.01);s.push(m),c.push(h.sub(m).normalize()),l.push(r+(i-r)*p),u.push(o)}),_o(s,c,l,u,a,M.cloth,1)}var No=11,Po=[0,0,0,0,.04,.08,.1,-.12,.05,.08,.1],Fo=[0,0,0,0,.08,-.1,.12,.32,-.12,.1,-.12],Io=()=>({torsoP:new p,torsoQ:new le,head:new p,ponyX:Array(No).fill(0),ponyZ:Array(No).fill(0),hip:[new p,new p],ankle:[new p,new p],kneePole:[new p,new p],legL:[.43,.42],footQ:[new le,new le],wrist:[new p,new p],elbowPole:[new p,new p],armL:[[.27,.26],[.27,.26]]}),Lo=e=>J(e*.168,.43,-.006),Ro=[.43,.42],zo=e=>.55-.17*e,Bo=e=>.3+.08*e,Vo=e=>2*Bo(e)/zo(e),Ho=new g,Uo=e=>e-Math.floor(e);function Wo(e,t){let n=new v(new w(e,t).rotateX(-Math.PI/2),new _e({glslVersion:u,transparent:!0,depthWrite:!1,uniforms:{},vertexShader:`out vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`in vec2 vUv; layout(location=0) out vec4 gColor; layout(location=1) out vec4 gNormal;
        void main(){ vec2 d = (vUv - 0.5) * 2.0; float a = 1.0 - smoothstep(0.35, 1.0, length(d));
          gColor = vec4(0.035, 0.035, 0.05, a * 0.42); gNormal = vec4(0.5, 1.0, 1.0/32.0, 0.0) * a; }`}));return n.position.y=.035,n.renderOrder=1,n}var Go=new Map,Ko=new T(`#8a90b0`).lerp(new T(`#fff1dc`),.75),qo=`uniform vec3 uSunColor; uniform vec3 uShadowTint;
  vec3 todLight(){ return clamp(mix(uShadowTint, uSunColor, 0.75) / vec3(${Ko.r.toFixed(4)}, ${Ko.g.toFixed(4)}, ${Ko.b.toFixed(4)}), 0.0, 1.2); }`;function Jo(e,t,n){let r=e.join()+`|`+t+`|`+n,i=Go.get(r);return i||(i=new _e({glslVersion:u,transparent:!0,depthWrite:!1,uniforms:{uCol:{value:new p(...e)},uA:{value:t},uMode:{value:n},uSunColor:O.uSunColor,uShadowTint:O.uShadowTint},vertexShader:`out vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`${qo}
        uniform vec3 uCol; uniform float uA; uniform int uMode; in vec2 vUv;
        layout(location=0) out vec4 gColor; layout(location=1) out vec4 gNormal;
        void main(){
          float a;
          float side = 1.0 - smoothstep(0.6, 1.0, abs(vUv.x - 0.5) * 2.0);
          if (uMode == 0) a = 1.0 - smoothstep(0.15, 1.0, length((vUv - 0.5) * 2.0));
          else if (uMode == 1) a = pow(clamp(vUv.y, 0.0, 1.0), 1.6) * side;
          else if (uMode == 2) a = smoothstep(0.35, 0.62, vUv.y) * side;
          else if (uMode == 5) a = 1.0;
          else a = pow(clamp(vUv.y, 0.0, 1.0), 1.6);
          gColor = vec4(uCol * todLight(), a * uA); gNormal = vec4(0.0);
        }`}),Go.set(r,i)),i}var Yo=null;function Xo(){return Yo??=new _e({glslVersion:u,transparent:!0,depthWrite:!1,side:2,uniforms:{uSunColor:O.uSunColor,uShadowTint:O.uShadowTint},vertexShader:`out vec2 vUv; out vec3 vN; out vec3 vV;
      void main(){ vUv = uv; vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv; }`,fragmentShader:`${qo}
      in vec2 vUv; in vec3 vN; in vec3 vV; layout(location=0) out vec4 gColor; layout(location=1) out vec4 gNormal;
      void main(){
        vec2 p = (vUv - 0.5) * 2.0;
        float r = length(p);
        float fres = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.0);
        // Two parallel diagonal glint strokes in the upper-left, clipped to the lens.
        vec2 q = mat2(0.7071, -0.7071, 0.7071, 0.7071) * (p - vec2(-0.3, 0.32));
        float s1 = (1.0 - smoothstep(0.07, 0.11, abs(q.x))) * (1.0 - smoothstep(0.22, 0.3, abs(q.y)));
        vec2 q2 = q - vec2(0.2, 0.0);
        float s2 = (1.0 - smoothstep(0.025, 0.05, abs(q2.x))) * (1.0 - smoothstep(0.1, 0.16, abs(q2.y)));
        float glint = max(s1, s2 * 0.85) * (1.0 - smoothstep(0.8, 0.92, r));
        float a = 0.02 + 0.04 * fres;
        vec3 tint = vec3(0.82, 0.92, 1.0);
        vec3 col = mix(tint, vec3(1.0), glint);
        gColor = vec4(col * todLight(), clamp(a + glint * 0.35, 0.0, 0.6));
        gNormal = vec4(0.0);
      }`}),Yo}var Zo=class{root=new d;lean=new d;walker=new d;gripHands=[];walkHands=[];lenses=[];eyes=[];blinkT=2.5;blinkK=-1;skirtCap;pelvis;shortLegs=[];fringe=[];sway={a:0,va:0,l:0,vl:0,yaw:0,pitch:0};bouquet=new d;bq={x:0,vx:0,z:0,vz:0};walkShadow;onFoot=!1;poseA=Io();poseB=Io();standK=0;bike=new Ea;steer=this.bike.steer;body=new d;torso=new d;head=new d;pony=[];ponyLen=[];ponyS=null;skirt;skirtGeo;thighA=[];thighB=[];thigh=[];shin=[];socks=[];shinA=[];shinB=[];upperArm=[];foreArm=[];knees=[];elbows=[];feet=[];wrists=[];constructor(){this.root.add(this.lean),this.lean.add(this.bike.group),this.buildBasketLoad(.77,-.68),this.buildHands(),this.buildBody(),this.root.add(Wo(.9,1.9)),this.walkShadow=Wo(.75,.75),this.walkShadow.visible=!1,this.walker.add(this.walkShadow)}add(e,t=this.lean,n=N.bike){let r=za(e,n);return t.add(r),r}buildBasketLoad(e,t){let n=[],r=`#553622`,i=`#2e1f16`,a=t+.05,o=.235,s=e+o,c=new d;c.position.set(.01,e,a),c.rotation.set(-.06,.1,0);let l=[];l.push([F(I(.28,o,.1,`#6a4630`,M.cloth),0,o/2,0),N.bike]),l.push([F(I(.286,.014,.108,r,M.cloth),0,.239,0),N.rider]);let u=new C,p=.143;u.moveTo(-.143,0),u.lineTo(p,0),u.lineTo(p,-.095),u.quadraticCurveTo(p,-.13,.10799999999999998,-.13),u.lineTo(-.10799999999999998,-.13),u.quadraticCurveTo(-.143,-.13,-.143,-.095),u.closePath();let m=P(new f(u,{depth:.01,bevelEnabled:!1,curveSegments:3}),r,M.cloth);l.push([F(m,0,.245,.05),N.rider]),l.push([F(I(.036,.03,.01,`#c9a45a`,M.metal),0,.145,.063),N.bike]),l.push([F(I(.012,.05,.006,i,M.cloth),0,.175,.063),N.bike]);let h=P(new te(.045,.008,5,10,Math.PI),i,M.cloth);l.push([F(h,0,.245,0),N.bike]);for(let[e,t]of l)this.add(e,c,t);c.position.sub(Hi),this.bike.basketContents.add(c);for(let e of[-1,1]){let t=J(e*.135,s-.03,a),r=J(e*.172,s+.075,a+.01),o=J(e*.2,s-.02,a+.03);n.push([R(t,r,.007,i,M.cloth,5),N.rider],[R(r,o,.007,i,M.cloth,5),N.rider])}[[.125,-.085,.36,-.7]].forEach(([r,i,a,o],s)=>{let c=J(r,e+.02,t+i),l=J(a,1,o).normalize(),u=c.clone().addScaledVector(l,.28-s*.015),d=u.clone().addScaledVector(l,.035);n.push([R(c,u,.011,`#26221c`,M.plain,6,.009),N.rider]),n.push([R(u,d,.009,`#1c1814`,M.plain,6,.007),N.flower]);for(let e=0;e<3;e++){let t=(e-1)*.35+s*.1,r=l.clone().applyAxisAngle(J(0,0,1),t).applyAxisAngle(J(1,0,0),-.2-.12*e).normalize(),i=d.clone().addScaledVector(r,.12+.03*((e+s)%2));n.push([R(d,i,.006,`#141210`,M.plain,4,.001),N.flower])}});for(let[e,t]of n)this.add(e.translate(-Hi.x,-Hi.y,-Hi.z),this.bike.basketContents,t);this.buildBouquet(J(-.075,e+.01,t-.075))}buildBouquet(e){let t=this.bouquet;t.position.copy(e).sub(Hi),this.bike.basketContents.add(t);let n=[],r=P(new y(.058,.022,.2,10,1,!0),`#322b22`,M.cloth);r.translate(0,.12,0),r.rotateX(-.12),n.push([r,N.bike]),n.push([F(L(.033,.033,.018,`#201816`,M.cloth,10),0,.075,-.004),N.rider]);let i=e=>{n.push([R(J(0,.02,0),e,.0035,`#181412`,M.plain,4),N.flower]);let t=e.clone().normalize(),r=new le().setFromUnitVectors(J(0,1,0),t.clone().lerp(J(0,0,1),.35).normalize()),i=F(_t(.008,`#26221c`,M.plain,5,3),0,.004,0);i.applyQuaternion(r),i.translate(e.x,e.y,e.z),n.push([i,N.flower])};i(J(.004,.26,.02)),i(J(-.04,.22,.035)),i(J(.045,.24,.01)),i(J(-.022,.25,-.03)),i(J(.03,.2,.05));for(let[e,t,n]of[[-.06,.24,0],[.06,.24,.035],[.015,.27,-.045],[-.03,.22,.06],[.055,.21,-.02]])i(J(e,t,n));for(let[e,r]of n)this.add(e.scale(1.35,1.35,1.35),t,r)}buildHands(){for(let e of[1,-1]){let t=J(e*.29,1.05,-.17),n=[],r=_t(1,ka,M.skin,14,10);r.scale(.05,.035,.037),n.push(r.translate(t.x,t.y+.01,t.z+.003));let i=_t(1,ka,M.skin,12,8);i.scale(.047,.025,.023),n.push(i.translate(t.x+e*.002,t.y-.004,t.z-.024));let a=_t(1,ka,M.skin,10,6);a.scale(.014,.013,.027),a.rotateY(e*.45),a.rotateX(.35),n.push(a.translate(t.x-e*.04,t.y+.016,t.z-.015));let o=J(e*.012,.026,.034).add(t);n.push(F(_t(.025,ka,M.skin,10,6),o.x,o.y,o.z));for(let e of n)this.gripHands.push(this.add(e.translate(-Hi.x,-Hi.y,-Hi.z),this.steer,N.skin));this.wrists.push(o.sub(Hi))}}onHead(e,t,n,r,i,a=this.head,o=1){let s=new v(mo(e,t,n,r),k(i,o));return a.add(s),s}disc(e,t,n,r=M.plain){let i=P(new y(1,1,.003,20,1),n,r);return i.rotateX(Math.PI/2),i.scale(e,t,1),i}buildBody(){let e=this.body;this.lean.add(e);let t=N.rider,n=J(0,Ui.y+.1,Ui.z-.02);this.torso.position.copy(n),this.torso.rotation.x=-.28,e.add(this.torso);let r=this.torso,a=Qo*2,o=new b,s=new Float32Array((a+1)*$o*3),c=new Float32Array((a+1)*$o*3),l=new Float32Array((a+1)*$o*2),u=new T(La);for(let e=0;e<$o;e++)for(let t=0;t<=a;t++){let n=e*(a+1)+t,r=(t%2?.8:1)*(e<2?1:1-e/$o*.04);c[n*3]=u.r*r,c[n*3+1]=u.g*r,c[n*3+2]=u.b*r,l[n*2]=t/a,l[n*2+1]=e/($o-1)}let f=[];for(let e=0;e<$o-1;e++)for(let t=0;t<a;t++){let n=e*(a+1)+t,r=n+1,i=n+a+1,o=i+1;f.push(n,i,r,r,i,o)}o.setAttribute(`position`,new D(s,3)),o.setAttribute(`color`,new D(c,3)),o.setAttribute(`uv`,new D(l,2)),o.setIndex(f),P(o,null,M.cloth),this.skirtGeo=o,this.skirt=new v(o,k(t,1,2)),this.skirt.frustumCulled=!1,this.skirt.visible=!1,e.add(this.skirt);{let e=new se(1,32).rotateX(Math.PI/2),n=e.attributes.position;for(let e=0;e<n.count;e++){let t=n.getX(e),r=n.getZ(e),i=Math.hypot(t,r);if(i<1e-4)continue;let a=Ao(ts,Math.atan2(t,r),1.08);n.setXYZ(e,a.x*i,ts,a.z*i)}this.skirtCap=new v(P(e,Pa,M.cloth),k(t,1,2)),this.skirtCap.visible=!1,r.add(this.skirtCap)}let p=_t(1,Pa,M.cloth,16,10);p.scale(.148,.11,.125),this.pelvis=this.add(p,e,t);for(let n=0;n<2;n++)this.shortLegs.push(new Va(e,[.096,.094,.092],Pa,M.cloth,t));let m=_t(.15,Pa,M.cloth,16,10);m.scale(1.05,.55,1),m.translate(n.x,n.y-.06,n.z+.03),this.seatCover=this.add(m,e,t),this.seatCover.visible=!1;{let e=[];for(let t=0;t<=40;t++){let n=wo+.522*t/40;for(let t=0;t<48;t++){let r=Ao(n,t/48*Math.PI*2,1);e.push(r.x,n,r.z)}}e.push(0,-.04,0,0,.498,0);let n=[];for(let e=0;e<40;e++)for(let t=0;t<48;t++){let r=(t+1)%48,i=e*48+t,a=e*48+r,o=i+48,s=a+48;n.push(i,a,o,a,s,o)}for(let e=0;e<48;e++){let t=(e+1)%48;n.push(1968,t,e,1969,1920+e,1920+t)}let i=new b;if(i.setAttribute(`position`,new ae(e,3)),i.setIndex(n),i.computeVertexNormals(),i.attributes.normal.getZ(960)<0){for(let e=0;e<n.length;e+=3)[n[e+1],n[e+2]]=[n[e+2],n[e+1]];i.setIndex(n),i.computeVertexNormals()}this.add(P(i,Ia,M.cloth),r,t)}{let e=[],n=[],i=[],a=[];for(let t=0;t<=48;t++){let r=t/48*Math.PI*2+.001,o=Ao(es+.012,r,1.035);e.push(o),n.push(J(o.x,0,o.z).normalize()),i.push(.015),a.push(.004)}this.add(_o(e,n,i,a,`#0c0d10`,M.plain,1),r,t);let o=new me(.024,.018,.005);o.translate(0,es+.012,-.106),r.add(new v(P(o,`#424850`,M.plain),k(t,.6)))}{let e=[],n=[],i=[],a=[],o=[];for(let e=0;e<=24;e++){let t=Ao(.472,-Math.PI*.75+e/24*Math.PI*1.5,1.04);n.push(t),i.push(J(0,1,0)),a.push(.014),o.push(.0035)}e.push(_o(n,i,a,o,`#3a6a8c`,M.cloth,1));let s=new b,c=jo(-.012,.468,-1,.0035),l=jo(-.055,.462,-1,.0035),u=jo(-.046,.405,-1,.004),d=jo(-.006,.442,-1,.0035);s.setAttribute(`position`,new ae([c.x,c.y,c.z,l.x,l.y,l.z,u.x,u.y,u.z,c.x,c.y,c.z,u.x,u.y,u.z,d.x,d.y,d.z],3)),s.computeVertexNormals(),e.push(P(s,Ma,M.cloth));let f=new b,p=jo(.012,.468,-1,.0035),m=jo(.055,.462,-1,.0035),h=jo(.046,.405,-1,.004),g=jo(.006,.442,-1,.0035);f.setAttribute(`position`,new ae([p.x,p.y,p.z,h.x,h.y,h.z,m.x,m.y,m.z,p.x,p.y,p.z,g.x,g.y,g.z,h.x,h.y,h.z],3)),f.computeVertexNormals(),e.push(P(f,Ma,M.cloth)),r.add(new v(z(e),k(t,1,2)))}this.add(Mo([[0,.44],[0,.36],[0,.28],[0,.2],[0,es+.015]],-1,.002,.014,.014,Ma,.0012),r,t);{let e=[],n=jo(-.045,.35,-1,.004);e.push(I(.028,.024,.008,Na,M.fire));let i=I(.005,.005,.01,`#160602`,M.plain);i.rotateZ(.3),i.translate(-.006,.004,.002);let a=I(.005,.005,.01,`#160602`,M.plain);a.rotateZ(-.3),a.translate(.006,.004,.002);let o=I(.014,.005,.01,`#160602`,M.plain);o.translate(0,-.005,.002),e.push(i,a,o);let s=z(e);F(s,n.x,n.y,n.z),r.add(new v(s,k(t,1)))}for(let n of[-1,1]){let a=Lo(n),o=_t(.056,Fa,M.cloth,14,10);o.scale(1,.9,.92),this.fppKeep.push(this.add(o.translate(a.x-n*.004,a.y+.002,a.z),r,t));let s=new d;e.add(s),this.sleeves.push(s);let c=[new i(.052,-.01),new i(.053,.03),new i(.053,.07),new i(.052,.12),new i(.051,.13)],l=new h(c,16);l.computeVertexNormals();let u=new v(P(l,Fa,M.cloth),k(t,1,2));s.add(u);let f=P(new y(.0525,.0515,.012,16,1,!0),Ma,M.cloth);f.translate(0,.124,0);let p=new v(f,k(t,1));s.add(p),this.fppKeep.push(u,p)}{let e=new Va(r,[.038,.033,.03,.029],ja,M.cloth,t);e.mesh.geometry.scale(1,1,.92),e.set(J(0,.44,.012),J(0,.62,.006))}this.head.position.set(0,.646,-.01),this.head.scale.setScalar(Wa),this.head.name=`riderHead`,r.add(this.head),this.buildPumpkinHead(),this.buildLimbs(),this.drapeSkirt(0,0)}swayFringe(e,t,n){let r=this.sway,i=e>0?Math.min(e,.05):0;if(i===0)return;let a=this.head.rotation.y,o=this.head.rotation.x,s=(a-r.yaw)/i,c=(o-r.pitch)/i;r.yaw=a,r.pitch=o;let l=Math.sin(t*1.7)*.6+Math.sin(t*3.1+1.3)*.4,u=_s(-s*.05,-.12,.12)+l*(.02+.004*n),d=_s(.006*n+c*.03,0,.1)+(.5+.5*l)*.01;r.va+=(60*(u-r.a)-7*r.va)*i,r.a+=r.va*i,r.vl+=(60*(d-r.l)-7*r.vl)*i,r.l=Math.max(0,r.l+r.vl*i);for(let e of this.fringe){let i=Math.sin(t*4.3+e.ph)*.012*(.3+.1*n);vs.setFromAxisAngle(e.radial,(r.a+i)*e.gain*(e.long?1.4:1)),ys.setFromAxisAngle(e.side,-r.l*e.gain),e.g.quaternion.copy(vs).multiply(ys)}}buildPumpkinHead(){let e=`#ea6416`,t=`#ffaa14`,n=[];for(let t=0;t<8;t++){let r=t/8*Math.PI*2,i=_t(.056,t%2==0?e:`#bd4808`,M.plain,12,10);i.scale(1,1.62,1);let a=.072;i.translate(Math.sin(r)*a,.015,-Math.cos(r)*a),n.push(i)}let r=_t(.108,e,M.plain,20,16);r.scale(1.12,.88,1.08),r.translate(0,.015,0),n.push(r);let i=J(0,.105,0),a=J(.014,.155,.008),o=J(.032,.185,-.016);n.push(R(i,a,.02,`#2e3b1c`,M.bark,6,.014)),n.push(R(a,o,.014,`#1d2810`,M.bark,6,.008));let s=-.114;this.eyes.length=0;for(let e of[1,-1]){let n=new d;n.position.set(e*.036,.032,s),this.head.add(n),this.eyes.push(n);let r=I(.026,.022,.035,t,M.fire);r.rotateZ(e*-.35),n.add(new v(r,k(N.rider,0)))}let c=I(.016,.016,.035,t,M.fire);F(c,0,.010000000000000002,-.11800000000000001),n.push(c);let l=I(.072,.022,.035,t,M.fire);F(l,0,-.034,s),n.push(l);let u=I(.026,.016,.035,t,M.fire);u.rotateZ(-.4),F(u,.042,-.024,-.109),n.push(u);let f=I(.026,.016,.035,t,M.fire);f.rotateZ(.4),F(f,-.042,-.024,-.109),n.push(f);let p=I(.01,.01,.04,e,M.plain);F(p,-.016,-.026000000000000002,-.112),n.push(p);let m=I(.01,.01,.04,e,M.plain);F(m,.016,-.026000000000000002,-.112),n.push(m);let h=I(.009,.009,.04,e,M.plain);F(h,0,-.042,-.112),n.push(h);let g=_t(.065,`#ff7700`,M.fire,8,6);g.translate(0,.01,-.015),n.push(g);let _=P(new y(.055,.085,.025,12,1,!0),`#ff8812`,M.fire);_.translate(0,-.075,-.015),n.push(_);let b=P(new te(.072,.022,8,16),Ma,M.cloth);b.rotateX(Math.PI/2),b.translate(0,-.072,.004),n.push(b);let x=new v(z(n),k(N.rider,1));this.head.add(x);for(let e of[-1,1]){let t=new d;t.position.set(e*.038,-.075,.06),this.head.add(t);let n=I(.024,.006,.16,Ma,M.cloth);n.translate(0,0,.08),t.add(new v(n,k(N.rider,1))),this.fringe.push({g:t,radial:J(e*.3,0,1).normalize(),side:J(1,0,0),gain:1.2,ph:e*1.5,long:1})}}buildFace(){let[e,t]=ao(.043,-.012),n=(e,t,n,r,i)=>{let a=[],o=[],s=[];for(let n=0;n<e.length;n++){let i=Ga(e[n],t[n]),c=uo(i,io);a.push(i.clone().multiplyScalar(io(i)).addScaledVector(c,r)),o.push(c),s.push(5e-4)}return _o(a,o,n,s,i,M.plain,1)},r=(e,t,r,i)=>{let a=[],o=[];for(let[t,n]of e){let[e,r]=ao(t,n);a.push(e),o.push(r)}return n(a,o,t,r,i)},i=(e,t,n,r,i=this.head)=>{let a=new v(e,Jo(t,n,r));return a.renderOrder=2,i.add(a),this.lenses.push(a),a},a=(e,t,n,r,a,o,s=0)=>{let[c,l]=ao(t,n);return i(mo(e,c,l,r),a,o,s)};for(let o of[-1,1]){let s=o*e,c=new d,l=Ga(s,t),u=io(l),f=l.clone().multiplyScalar(u);c.position.copy(f),this.head.add(c),this.eyes.push(c);let p=e=>e.translate(-f.x,-f.y,-f.z),m=.0185/u,h=.0138/u,g=.02*h,_=e=>h*Math.max(0,1-(e/m)**2)**.52+e/m*g-.04*h*(e/m)**3,y=e=>-.86*h*Math.max(0,1-(e/m)**2)**.62+e/m*g,x=(e,n,r)=>{let i=Ga(s+o*e,t+n);return i.clone().multiplyScalar(io(i)).addScaledVector(uo(i,io),r).sub(f)},S=(e,t,n,r,i,a,o)=>{let s=[x(e,t,i)];for(let a=0;a<=28;a++){let c=a/28*Math.PI*2,l=e+Math.cos(c)*n,u=t+Math.sin(c)*r;o&&(l=Math.max(-m*.985,Math.min(m*.985,l)),u=Math.min(_(l),Math.max(y(l),u))),s.push(x(l,u,i))}let c=new b().setFromPoints(s),u=[];for(let e=1;e<=28;e++)u.push(0,e,e+1);c.setIndex(u),c.computeVertexNormals();let d=c.attributes.normal;if(J(d.getX(0),d.getY(0),d.getZ(0)).dot(l)<0){for(let e=0;e<u.length;e+=3)[u[e+1],u[e+2]]=[u[e+2],u[e+1]];c.setIndex(u),c.computeVertexNormals()}return P(c,a,M.plain)},C=3,w=e=>{let t=e.attributes.color,n=new v(e,Jo([t.getX(0),t.getY(0),t.getZ(0)],1,5));return n.renderOrder=C++,c.add(n),this.lenses.push(n),n};i(p(mo(new se(1,24).scale(.026,.022,1),s+o*.05*m,t+.5*h,6e-4)),[.03,.04,.03],.95,0,c),w(S(0,0,m,h*1.6,8e-4,o>0?`#141815`:`#1a1618`,!0));let T=-.02*m,E=.01*h,ee=.62*m,te=1.15*h;w(S(T,E,ee,te,.0018,o>0?`#829688`:`#9db2a4`,!0)),w(S(T,E-.25*h,ee*.75,te*.55,.0022,`#405246`,!0)),w(S(T,E,ee*.28,te*.32,.0028,`#0e1410`,!0)),w(S(T-.15*m,E+.25*h,.08*m,.1*h,.0035,`#d8f0dc`,!1));let D=n([s+o*m*.4,s+o*m*.15],[t+h*.5,t+h*.1],[6e-4,3e-4],.0026,`#2e0e12`);c.add(new v(p(D),k(N.eye,-1)));let ne=n([s-o*m*.5,s-o*m*.2],[t-h*.4,t-h*.05],[5e-4,2e-4],.0026,`#2e0e12`);c.add(new v(p(ne),k(N.eye,-1))),i(p(mo(new se(1,24).scale(.032,.018,1),s+o*.1*m,t-1.2*h,.0012)),[.1,.14,.11],.75,0,c);let re=[],ie=[];for(let e=0;e<=10;e++){let t=e/10;re.push([o*(.018+.052*t),.016+.006*Math.sin(Math.PI*(.2+.75*t))-.005*t*t]),ie.push(.0015*(1-.6*t**1.4))}this.head.add(new v(r(re,ie,.0028,`#0f1410`),k(N.eye,-1))),a(new se(1,24).scale(.02,.012,1),o*.052,-.04,.0012,[.08,.12,.09],.75);for(let e=0;e<4;e++){let t=o*(.042+.006*e);this.head.add(new v(r([[t-o*.002,-.044],[t+o*.002,-.036000000000000004]],[5e-4,4e-4],.0016,`#141c16`),k(N.eye,-1)))}}a(new se(1,16).scale(.004,.0075,1),-.004,-.044,.0016,[.03,.04,.03],.95),a(new se(1,16).scale(.004,.0075,1),.004,-.044,.0016,[.03,.04,.03],.95);let o=r([[-.007,-.036],[0,-.033],[.007,-.036]],[.001,.0014,.001],.0018,`#1a221c`);this.head.add(new v(o,k(N.eye,-1))),a(new se(1,20).scale(.016,.022,1),.045,-.052,.0014,[.22,.06,.06],.85),a(new se(1,16).scale(.009,.013,1),.046,-.051,.0018,[.65,.62,.52],.9);{a(new se(1,24).scale(.026,.015,1),0,-.076,.0016,[.02,.03,.02],.98),a(new w(.044,.022,6,4),0,-.076,.0018,[.01,.02,.01],.95);let e=[];for(let t=-4;t<=4;t++){let n=t*.0044+(t%2==0?6e-4:-6e-4),r=.006+(4-Math.abs(t))*.0012+(t===2||t===-2?.003:0),i=L(.0013,3e-4,r,Math.abs(t)===2?`#d8d0a8`:`#bbb290`,M.plain,5);i.translate(n,-.068-r/2,0),e.push(i)}for(let t=-4;t<=4;t++){let n=t*.0041+.0018,r=.005+(4-Math.abs(t))*.001+(t===1||t===-1?.0025:0),i=L(3e-4,.0012,r,`#a8a082`,M.plain,5);i.translate(n,-.084+r/2,0),e.push(i)}let t=new v(mo(z(e),0,-.74,.0025),k(N.bike,0));this.head.add(t);let n=`#260608`;this.head.add(new v(r([[-.019,-.074],[-.017,-.09],[-.015,-.106]],[.002,.0015,8e-4],.002,n),k(N.eye,-1))),this.head.add(new v(r([[.01,-.078],[.012,-.095],[.008,-.11]],[.0024,.0018,.001],.002,n),k(N.eye,-1))),this.head.add(new v(r([[-.003,-.083],[-.002,-.101]],[.0015,8e-4],.002,n),k(N.eye,-1)));let i=[],o=[];for(let e=0;e<=14;e++){let t=-1+e/14*2;i.push([t*.026,-.066+.0028*Math.sin(e*2.3)-.002*t*t]),o.push(.0018+e%2*8e-4)}this.head.add(new v(r(i,o,.0022,`#180a0c`),k(N.eye,-1)));let s=[],c=[];for(let e=0;e<=14;e++){let t=-1+e/14*2;s.push([t*.024,-.086-.0025*Math.sin(e*1.9)+.0015*t*t]),c.push(.0016+e%3*7e-4)}this.head.add(new v(r(s,c,.0022,`#14080a`),k(N.eye,-1)))}this.buildEars()}buildEars(){for(let e of[-1,1]){let t=-.021,n=.012,[r,i,a]=$a(t),o=(i+a)/2,s=(n-(a-i)/2)/o,c=e*r*Math.sqrt(Math.max(0,1-s*s))*.965,l=_t(1,ka,M.skin,14,10),u=l.attributes.position;for(let t=0;t<u.count;t++){let n=u.getX(t),r=u.getY(t),i=u.getZ(t),a=.75+.25*Ua(-1,.4,r);n*e>0&&(n*=.35+.65*n*n),u.setXYZ(t,n*.0075,r*.025,i*.0155*a)}l.computeVertexNormals(),l.rotateX(.2),l.rotateY(e*-.35),l.translate(c+e*.0035,t,n),this.add(l,this.head,N.skin);let d=_t(1,`#4e5a52`,M.skin,10,8);d.scale(.0022,.014,.008),d.rotateX(.2),d.rotateY(e*-.35),d.translate(c+e*.0085,-.022000000000000002,.011),this.head.add(new v(d,k(N.skin,0)))}}buildGlasses(e,t){let n=`#111111`,r=.048,i=.031,a=.0076,o=.0016,s=.0021,l=.0056,u=(e,t,n,r,i,a)=>(e.moveTo(t+a,n),e.lineTo(r-a,n),e.quadraticCurveTo(r,n,r,n+a),e.lineTo(r,i-a),e.quadraticCurveTo(r,i,r-a,i),e.lineTo(t+a,i),e.quadraticCurveTo(t,i,t,i-a),e.lineTo(t,n+a),e.quadraticCurveTo(t,n,t+a,n),e),d=[],p=e=>e.length()-io(e.clone().normalize()),m=(e,t)=>{let n=e.clone().normalize(),r=io(n)+t;return e.length()<r?n.multiplyScalar(r):e},h=[];for(let g of[-1,1]){let[_,y]=ao(g*(e+.001),t+.001),b=Ga(_,y),S=Ga(g*.44,-.04),w=J(0,1,0).cross(S).normalize(),T=S.clone().cross(w).normalize(),E=b.clone().multiplyScalar(io(b)),ee=[];for(let e=0;e<=8;e++)for(let t=0;t<=4;t++)ee.push([(-.5+e/8)*.0512,-.031/2-o+t/4*.034699999999999995]);for(let e=0;e<12;e++){let e=1/0;for(let[t,n]of ee)e=Math.min(e,p(E.clone().addScaledVector(w,t).addScaledVector(T,n).addScaledVector(S,-.0021/2)));if(Math.abs(e-l)<2e-4)break;E.addScaledVector(S,l-e)}let te=new c().makeBasis(w,T,S).setPosition(E),D=u(new C,-.048/2-.0016,-.031/2-o,.0256,.0176,.0092);D.holes.push(u(new x,-.048/2,-.031/2,r/2,i/2,a));let ne=new f(D,{depth:s,bevelEnabled:!1,curveSegments:6});ne.translate(0,0,-.0021/2),d.push(P(ne,n,M.lacquer).applyMatrix4(te));let re=-g*r*.18,ie=new f(u(new C,re-r*.14,.016235,re+r*.14,.01697,5e-4),{depth:4e-4,bevelEnabled:!1,curveSegments:2});ie.translate(0,0,s/2),d.push(P(ie,`#56606c`,M.lacquer).applyMatrix4(te));let ae=new ce(u(new C,-.048/2,-.031/2,r/2,i/2,a),6),oe=ae.attributes.position,se=ae.attributes.uv;for(let e=0;e<oe.count;e++)se.setXY(e,oe.getX(e)/r+.5,oe.getY(e)/i+.5);let le=new v(ae.applyMatrix4(te),Xo());le.renderOrder=12,this.head.add(le),this.lenses.push(le),h.push(J(g*.024640000000000002,i/2-.004,0).applyMatrix4(te));let ue=J(-g*.0248,i/2-.002,-.0021/2).applyMatrix4(te),[de,fe,pe]=$a(t+.006),me=m(J(g*(de+.002),t+.004,.006),.0022),he=m(J(g*(de-.008),t-.016,.022),5e-4),ge=ue,_e=[];for(let e=1;e<=8;e++)_e.push(m(ue.clone().lerp(me,e/8),.0022));_e.push(me.clone().lerp(he,.5).add(J(g*.001,.001,0)),he);for(let e of _e)d.push(R(ge,e,.0011,n,M.lacquer,6)),ge=e}let[g,_]=h,[y,b]=ao(0,t+.001),S=Ga(y,b),w=S.clone().multiplyScalar(io(S)+.0016),T=g.clone().lerp(w,.5).add(J(0,.0012,0)),E=_.clone().lerp(w,.5).add(J(0,.0012,0));d.push(R(g,T,9e-4,n,M.lacquer,6),R(T,w,9e-4,n,M.lacquer,6),R(w,E,9e-4,n,M.lacquer,6),R(E,_,9e-4,n,M.lacquer,6));let ee=new v(z(d),k(N.eye,-1));this.head.add(ee),this.lenses.push(ee)}buildHair(){let e=[];for(let t=0;t<44;t++){let n=-Math.PI+t/44*Math.PI*2,r=po(n);for(let t=0;t<14;t++){let i=Ga(n,t===0?r:r+.05+(Math.PI/2-.03-r-.05)*((t-1)/13)),a=i.clone().multiplyScalar(io(i)+(t===0?-.005:go(i)));e.push(a.x,a.y,a.z)}}let t=J(0,1,0),n=t.clone().multiplyScalar(io(t)+ho(t));e.push(n.x,n.y,n.z);let r=[];for(let e=0;e<44;e++){let t=(e+1)%44;for(let n=0;n<13;n++){let i=e*14+n,a=t*14+n,o=i+1,s=a+1;r.push(i,o,a,a,o,s)}r.push(e*14+14-1,616,t*14+14-1)}let i=new b;i.setAttribute(`position`,new ae(e,3)),i.setIndex(r),i.computeVertexNormals(),this.add(P(i,Aa,M.hair),this.head,N.hair);let a=.1,o=e=>{let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)},s=[];for(let e=0;e<27;e++){let t=-1+2*e/26,n=t*.084+(o(e)-.5)*.004,r=Ua(.55,1,Math.abs(t)),i=.012-.048*o(e+7)-(e%3==0?.038:0)-.04*r,a=.0035+.003*o(e+3)+.0015*(1-r),c=(o(e+11)-.5)*.08+(e%2==0?.03:-.03);s.push([n,i,a,c,.001+.004*r])}for(let[e,t]of[[a*.4,.05],[-.07,.045],[.07,.045],[-.035,.052],[.035,.052],[0,.056]])s.push([e,t,.018,.02*Math.sign(e),0]);s.forEach(([e,t,n,r,i],o)=>{let[s,c]=ao(e,t),l=a+(s-a)*.55,u=1.2-.12*Math.abs(s-a),f=vo(l,u,s,c,n,.0042,r,i,!1,14),p=Ga(l,u),m=p.clone().multiplyScalar(io(p)+ho(p)),h=new d;h.position.copy(m),this.head.add(h),h.add(new v(f.translate(-m.x,-m.y,-m.z),k(N.hair,.3))),this.fringe.push({g:h,radial:p,side:J(0,1,0).cross(p).normalize(),gain:.75+.5*Math.abs(Math.sin(o*2.7)),ph:o*1.37,long:+(i>.003)})});{let e=[];for(let t=0;t<12;t++){let n=(t-5.5)*.22,r=Math.PI+n,i=1.15-.05*Math.abs(n),a=po(r)+.02+t%3*.04;e.push(vo(r,i,r+.04*Math.sin(t*2.3),a,.026,.006,.02*Math.sin(t*1.7),.003,!0,8))}for(let t=0;t<10;t++){let n=Math.PI+(t-4.5)*.26,r=.6+t%4*.08;e.push(vo(n,r+.2,n+(t%2==0?.08:-.08),r-.05,.016,.005,.04*(t%2==0?1:-1),.008,!0,6))}for(let t of[-1,1])for(let n=0;n<6;n++){let r=t*(1.2+n*.16),i=.9-.08*n,a=po(r)+.03;e.push(vo(r,i,r+t*.05,a,.02,.005,t*.02,.004,!0,8))}for(let t=0;t<12;t++){let n=-2.5+t*.45,r=.95+.3*Math.sin(t*2.1);e.push(vo(n,r,n+.1*Math.sin(t*3.7),r-.12,.014,.004,.03*Math.cos(t*2.5),.012,!0,5))}this.head.add(new v(z(e),k(N.hair,.3)))}for(let e of[-1,1])[[1.02,.95,1.16,.45,.01,.012,-.004,0],[1.18,.88,1.28,.38,-.01,.011,.002,.002],[1.32,.82,1.4,.3,-.02,.009,.005,-.002]].forEach(([t,n,r,i,a,o,s,c],l)=>{let u=Ga(e*t,n),f=u.clone().multiplyScalar(io(u)+ho(u)),p=new d;p.position.copy(f),this.head.add(p),p.add(new v(bo(e*t,n,e*r,i,a,o*1.4,s*.4,c).translate(-f.x,-f.y,-f.z),k(N.hair,.3))),this.fringe.push({g:p,radial:u,side:J(0,1,0).cross(u).normalize(),gain:.4+.2*l,ph:2.1+l*1.9+e,long:0})})}buildLimbs(){let e=this.body,t=N.rider;for(let n=0;n<2;n++){this.thigh.push(new Va(e,[.092,.088,.082,.074,.066],Pa,M.cloth,t)),this.shin.push(new Va(e,[.062,.065,.062,.056,.048,.042,.038],Pa,M.cloth,t)),this.socks.push(new Va(e,[.04,.041,.042,.043],Pa,M.cloth,t)),this.upperArm.push(new Va(e,[.05,.048,.044,.039,.036],ka,M.skin,N.skin)),this.foreArm.push(new Va(e,[.035,.038,.036,.031,.026,.024],ka,M.skin,N.skin));let n=za(_t(.066,Pa,M.cloth,14,10),t),r=za(_t(.036,ka,M.skin,12,8),N.skin),i=za(xo(),t);e.add(n,r,i),this.knees.push(n),this.elbows.push(r),this.feet.push(i)}let n=`#0c100d`,r=`#320c10`;for(let t=0;t<2;t++){let i=t===0?1:-1,a=new d,o=[];o.push(F(_t(.024,ka,M.skin,10,6),0,0,0));let s=_t(1,ka,M.skin,12,8);s.scale(.019,.046,.038),o.push(s.translate(0,-.044,0));for(let e=0;e<4;e++){let t=(e-1.5)*.012,i=.044-Math.abs(e-1.5)*.005,a=R(J(t,-.07,.002),J(t*1.3,-.07-i*.6,-.018),.0065,ka,M.skin,5);o.push(a);let s=J(t*1.45,-.07-i,-.042),c=R(J(t*1.3,-.07-i*.6,-.018),s,.005,r,M.plain,5);o.push(c);let l=R(s,s.clone().add(J(0,-.018,-.016)),.004,n,M.plain,4,5e-4);o.push(l)}let c=J(-i*.016,-.048,-.015),l=J(-i*.032,-.065,-.036),u=J(-i*.036,-.078,-.052);o.push(R(c,l,.0065,ka,M.skin,5)),o.push(R(l,u,.005,r,M.plain,5)),o.push(R(u,u.clone().add(J(-i*.004,-.015,-.015)),.0038,n,M.plain,4,5e-4));for(let e of o)this.add(e,a,N.skin);a.visible=!1,e.add(a),this.walkHands.push(a)}}drapeSkirt(e,t,n=0,r=[0,0,0]){if(!this.skirt.visible)return;let i=this.skirtGeo,a=i.attributes.position,o=Qo*2,[s,c,l]=r,u=n>0?Math.min(1.3,(.25*s+.55*l)*n+Math.min(e/8,1.3)*(1-n)):Math.min(e/8,1.3),d=this.torso.quaternion,f=this.torso.position,m=as.set(0,-.3,-1).normalize(),h=os.set(0,-1,.32).normalize(),g=new p,_=new p,v=new p,y=$o-2;for(let e=0;e<=o;e++){let r=e/o*Math.PI*2,i=Math.cos(r),p=(1-i)/2,b=e%2?.94:1;for(let t=0;t<2;t++){let n=Ao(t===0?es:ts,r,t===0?1.035:1.1*(.97+.03*b));n.applyQuaternion(d).add(f),a.setXYZ(t*(o+1)+e,n.x,n.y,n.z),t===1&&v.copy(n)}_.set(Math.sin(r),0,i).applyQuaternion(d),_.y=0,_.normalize(),g.copy(h).lerp(m,Ua(.25,.85,p)).normalize().lerp(ss.set(0,-1,0),n).normalize();let x=Math.abs(Math.sin(r)),S=(.34+.12*p+.06*x)*(1-n)+.5*n,C=(.35+.35*p)*(1-n),w=(.1+.02*(1-p))*b*(1-.1*n)+.015*u;for(let m=2;m<$o;m++){let h=(m-1)/y,x=Math.sin(t*8+r*3+m*.7)*.01*u*h*h,T=.05*u*h*h*(1-p)*(1-n)+(.04*s+.06*l)*h*h*n,E=(Math.sin(c-h*.8)*.02*s+Math.sin(t*2.1+r)*.004)*h*h*n,ee=S*(h-C*h*h/2),te=S*C*h*h/2;if(ns.copy(v).addScaledVector(_,w*h**.8).addScaledVector(g,ee),ns.y-=te,ns.x+=Math.sin(r)*x+E,ns.y+=x*.6,ns.z+=i*x+T,n>.5)for(let e=0;e<this.thighA.length*2;e++){let t=e<2?this.thighA[e]:this.shinA[e-2],n=e<2?this.thighB[e]:this.shinB[e-2];if(!t||!n)continue;rs.subVectors(n,t);let r=Math.min(1,Math.max(0,is.subVectors(ns,t).dot(rs)/(rs.lengthSq()+1e-6)));rs.multiplyScalar(r).add(t),is.subVectors(ns,rs),is.y=0;let i=is.length(),a=e<2?.112:.075;i<a&&i>1e-5&&ns.addScaledVector(is,(a-i)/i)}if(n<1&&this.thighA.length===2){let e=Ua(.28,.7,p)*(1-n);if(e>0){let t=Math.sin(r);cs.set(1,0,0).applyQuaternion(d);let n=(this.thighA[0].x-f.x)*cs.x+(this.thighA[0].z-f.z)*cs.z>0==t>0?0:1,a=this.thighA[n],o=this.thighB[n];ls.subVectors(o,a);let s=ls.length();ls.divideScalar(s),us.set(0,1,0).addScaledVector(ls,-ls.y).normalize(),ds.crossVectors(ls,us).normalize(),ds.dot(cs)*t<0&&ds.negate();let c=-1.15+2.55*Math.min(1,Math.abs(t)/.92),l=.56,u=Math.min(h/l,1),p=.088-.03*u+.017+.005*b;if(fs.copy(a).addScaledVector(ls,u*1.03*s).addScaledVector(us,Math.cos(c)*p).addScaledVector(ds,Math.sin(c)*p),h>l){let e=(h-l)/.43999999999999995;fs.y-=.27*e,fs.addScaledVector(ls,.035*e*(1-e*.5)),fs.addScaledVector(ds,Math.max(0,Math.sin(c))*.03*e)}fs.lerp(v,1-Ua(0,.3,h)),fs.x+=Math.sin(r)*x,fs.y+=x*.5,fs.z+=i*x,ns.lerp(fs,e)}for(let e=0;e<2;e++)for(let e=0;e<4;e++){let t=e<2?this.thighA[e]:this.shinA[e-2],r=e<2?this.thighB[e]:this.shinB[e-2];if(!t||!r)continue;rs.subVectors(r,t);let i=Math.min(1,Math.max(0,is.subVectors(ns,t).dot(rs)/(rs.lengthSq()+1e-6))),a=(e<2?.088-.03*i+.016:.062-.02*i+.012)*(1-n);rs.multiplyScalar(i).add(t),is.subVectors(ns,rs);let o=is.length();o<a&&o>1e-5&&ns.addScaledVector(is,(a-o)/o)}}a.setXYZ(m*(o+1)+e,ns.x,ns.y,ns.z)}}a.needsUpdate=!0,i.computeVertexNormals()}setFirstPerson(e,t=e){if(t&&=e,e===this.fppOn&&t===this.fppArms)return;this.fppOn=e,this.fppArms=t;let n=t=>t.traverse(t=>{t.layers.enable(1),e?t.layers.disable(0):t.layers.enable(0)});n(this.torso);for(let e of[...this.thigh,...this.shin,...this.socks,...this.shortLegs])n(e.mesh);for(let e of[...this.knees,...this.feet])n(e);for(let e of this.upperArm)n(e.mesh);for(let e of this.elbows)n(e);if(t)for(let e of[...this.fppKeep,...this.elbows,...this.upperArm.map(e=>e.mesh)])e.traverse(e=>e.layers.enable(0))}fppOn=!1;fppArms=!1;fppKeep=[];sleeves=[];setSkirtHidden(e){for(let t of[this.skirt,this.seatCover,this.skirtCap,this.pelvis])e?t.layers.disable(0):t.layers.enable(0)}seatCover;eyeWorld(e){return this.head.updateWorldMatrix(!0,!1),e.set(0,.032,-.114).applyMatrix4(this.head.matrixWorld)}headWorld(e){return this.head.updateWorldMatrix(!0,!1),e.set(0,.015,0).applyMatrix4(this.head.matrixWorld)}update(e,t,n){this.bike.crankHold!==null&&(t={...t,crank:this.bike.crankHold}),this.lean.rotation.z=t.lean,this.bike.update(e,t);let r=n?Math.min(1,Math.max(0,n.blend)):0;this.setOnFoot(r>0),this.root.updateMatrixWorld(!0);let i=this.poseA;this.ridePose(t,i);let a=0,o=[0,0,0];if(n&&r>0){this.walker.updateMatrixWorld(!0);let e=gs.copy(this.walker.matrixWorld).invert().multiply(this.lean.matrixWorld);vs.setFromRotationMatrix(e),i.torsoP.applyMatrix4(e),i.torsoQ.premultiply(vs);for(let t=0;t<2;t++)i.hip[t].applyMatrix4(e),i.ankle[t].applyMatrix4(e),i.wrist[t].applyMatrix4(e),i.kneePole[t].transformDirection(e),i.elbowPole[t].transformDirection(e),i.footQ[t].premultiply(vs);let t=this.poseB;this.walkPose(n,t);let s=+(n.side>0),c=Ua(0,.45,r),l=Ua(.35,1,r),u=Ua(.12,.82,r),d=Ua(.05,.62,r);i.torsoP.lerp(t.torsoP,u),i.torsoQ.slerp(t.torsoQ,u),i.head.lerp(t.head,u);for(let e=0;e<i.ponyX.length;e++)i.ponyX[e]+=(t.ponyX[e]-i.ponyX[e])*u,i.ponyZ[e]+=(t.ponyZ[e]-i.ponyZ[e])*u;for(let e=0;e<2;e++)i.legL[e]+=(t.legL[e]-i.legL[e])*u;for(let e=0;e<2;e++){let n=e===s?c:l;i.hip[e].lerp(t.hip[e],u),e===s||n<=0||n>=1?(i.ankle[e].lerp(t.ankle[e],n),e===s&&(i.ankle[e].y+=Math.sin(Math.PI*n)*.05)):(ps.copy(i.ankle[e]).add(t.ankle[e]).multiplyScalar(.5),ps.y+=.62,ps.z-=.12,ms.copy(i.ankle[e]),i.ankle[e].copy(ms.multiplyScalar((1-n)*(1-n))).addScaledVector(ps,2*n*(1-n)).addScaledVector(t.ankle[e],n*n)),i.kneePole[e].lerp(t.kneePole[e],n).normalize(),i.footQ[e].slerp(t.footQ[e],n),i.wrist[e].lerp(t.wrist[e],d),i.elbowPole[e].lerp(t.elbowPole[e],d).normalize();for(let n=0;n<2;n++)i.armL[e][n]+=(t.armL[e][n]-i.armL[e][n])*d}a=u,o=[Math.min(1,n.speed/1.1),n.phase,n.run]}this.standK=a,this.springPony(i,e),this.applyPose(i),this.ponyOffBack(),this.seatCover.visible=r===0&&!this.fppArms;for(let e of this.lenses)e.layers.mask=+!this.fppOn;this.drapeSkirt(n&&r>0?n.speed:t.speed,t.time,a,o),this.pelvis.position.copy(i.torsoP).add(ps.set(0,-.07,.005));for(let e=0;e<2;e++)this.shortLegs[e].set(this.thighA[e].clone().add(ps.set(0,.02,0)),ms.copy(this.thighA[e]).lerp(this.thighB[e],.16));this.blinkT-=e,this.blinkT<=0&&this.blinkK<0&&(this.blinkK=0,this.blinkT=2.4+Math.random()*3.2);let s=0;this.blinkK>=0&&(this.blinkK+=e/.15,s=Math.sin(Math.PI*Math.min(1,this.blinkK)),this.blinkK>=1&&(this.blinkK=-1));for(let e of this.eyes)e.scale.y=1-.9*s;this.swayFringe(e,t.time,n&&r>0?n.speed:t.speed);{let n=this.bq,r=Math.abs(t.speed),i=-.05-Math.min(r,8)*.018+Math.sin(t.time*2.1)*.03*Math.min(1,r/3),a=-t.steer*.25+Math.sin(t.time*3.3+1)*.025*Math.min(1,r/3),o=Math.min(e,1/30);n.vx+=((i-n.x)*90-n.vx*7)*o,n.vz+=((a-n.z)*90-n.vz*7)*o,n.x+=n.vx*o,n.z+=n.vz*o,this.bouquet.rotation.set(n.x,0,n.z)}}get standing(){return this.standK}setOnFoot(e){if(e!==this.onFoot){this.onFoot=e,(e?this.walker:this.lean).add(this.body);for(let t of this.gripHands)t.visible=!e;for(let t of this.walkHands)t.visible=e;this.walkShadow.visible=e}}ridePose(e,t){let n=Math.sin(e.crank*2)*.008*e.pedaling;t.torsoP.set(0,Ui.y+.1+n,Ui.z-.02),t.torsoQ.setFromEuler(Ho.set(-.35-Math.min(e.speed/12,1)*.08,0,Math.sin(e.crank)*.03*e.pedaling,`XYZ`)),t.head.set(.24+Math.sin(e.time*.25)*.04,Math.sin(e.time*.37)*.1,-e.lean*.5+.16);let r=Math.min(e.speed/8,1.2);for(let n=0;n<t.ponyX.length;n++){let i=Math.sin(e.time*3.6-n*.9)*.07*(.4+r);t.ponyX[n]=(n===0?-t.head.x-.22-r*.22:-.05-r*.08)+i,t.ponyZ[n]=Math.sin(e.time*2.4-n*1.1)*.09*(.4+r)+(n===0?e.steer*.3+e.lean*.35:0)}let i=ms.set(0,Ui.y+.035,Ui.z-.03);t.legL[0]=.43,t.legL[1]=.42;for(let n=0;n<2;n++){let r=n===0?1:-1,a=e.crank+(n===0?0:Math.PI);t.ankle[n].set(r*.14,zi.y-Math.cos(a)*Bi+.06,zi.z+Math.sin(a)*Bi+.03),t.hip[n].copy(i).add(ps.set(r*.085,0,0)),t.kneePole[n].set(r*.12,.4,-1).normalize(),t.footQ[n].setFromEuler(Ho.set(-.15+Math.sin(a)*.25,0,0,`XYZ`));let o=Lo(r).applyQuaternion(t.torsoQ).add(t.torsoP);t.wrist[n].copy(this.wrists[n]).applyMatrix4(this.steer.matrix);let s=o.distanceTo(t.wrist[n])/(2*Math.cos(9*Math.PI/180));t.armL[n][0]=s*1.04,t.armL[n][1]=s*.96,t.elbowPole[n].set(r*.45,-.8,.45).normalize()}}walkPose(e,t){let n=Math.min(1,e.speed/1.1),r=e.run,i=e.phase,a=e.time,o=zo(r),s=Bo(r)*n,c=(.07+.1*r)*n,l=Ro[0]+Ro[1],u=l*(.99-.05*r),d=.07+l*.99,f=[0,0];for(let e=0;e<2;e++){let a=e===0?1:-1,l=Uo(i/(Math.PI*2)+(e===0?0:.5));f[e]=l;let p,m,h;if(l<o){let e=l/o;p=-s+2*s*e,m=.035*Ua(.72,1,e)*n,h=(.22*(1-Ua(0,.18,e))-.5*Ua(.7,1,e))*n}else{let e=(l-o)/(1-o),t=e*e*(3-2*e);p=s-2*s*t+.13*r*n*Math.sin(Math.PI*e),m=c*Math.sin(Math.PI*e)+.035*(1-Ua(0,.3,e))*n,h=(-.5+.72*t)*n}e===1&&(p-=.045*n,h+=.18*n),p+=(e===0?-.06:.03)*(1-n),t.ankle[e].set(a*(.095-.015*r),.07+m,p),t.footQ[e].setFromEuler(Ho.set(h,a*(e===1?-.22:.12)*(1-n),0,`YXZ`));let g=t.ankle[e].x-a*.085;d=Math.min(d,t.ankle[e].y+Math.sqrt(Math.max(0,u*u-p*p-g*g)))}let p=Math.sin(a*1.6)*.007*(1-n),m=-(.24+.06*n+.22*r),h=-.14*n*Math.cos(i)*(1-.3*r),g=-.07*n*Math.cos(i-1.9)+.06*Math.sin(a*1.1);t.torsoP.set(.02*n*Math.cos(i-1.9),d+.04+p+.015*r*n,0),t.torsoQ.setFromEuler(Ho.set(m,h,g,`YXZ`));let _=Math.sin(a*5.3)>.93?Math.sin(a*31)*.14:0,v=Math.sin(a*19.3)*.015;t.head.set(-m*.7+.14+e.lookUp+_*.6,e.look-h*.6+.09*Math.sin(a*.9)+_,.28+.06*Math.sin(a*.6)+v);for(let e=0;e<t.ponyX.length;e++){let o=Math.sin(2*i-e*.9)*.05*n+Math.sin(a*1.4-e*.8)*.025;t.ponyX[e]=(e===0?-(m+t.head.x)-.14-.08*n-.12*r:-.03-.05*r)+o,t.ponyZ[e]=Math.sin(i-e*.8)*.06*n+Math.sin(a*1.9-e*1.1)*.03}t.legL[0]=Ro[0],t.legL[1]=Ro[1];for(let e=0;e<2;e++){let i=e===0?1:-1;t.hip[e].copy(t.torsoP).add(ps.set(i*.085,-.065,0)),t.kneePole[e].set(i*.08,.05,-1).normalize();let o=Lo(i).applyQuaternion(t.torsoQ).add(t.torsoP),s=n*(.06+.02*r)*Math.cos(2*Math.PI*f[e]),c=(e===0?.44:.38)+.04*Math.sin(a*1.5+e*2)*n,l=(e===0?-.05:-.16)+.03*Math.sin(a*1.1+e),u=ps.set(i*(.05+.02*Math.sin(a*.8+e)),l,-c),d=ms.set(i*.04,-.14,-.46-.04*s);t.wrist[e].copy(u).lerp(d,r).add(o),t.elbowPole[e].set(i*(e===0?.22:.14),-.28,-.95).normalize(),t.armL[e][0]=.27,t.armL[e][1]=.255}}springPony(e,t){if(!this.pony.length)return;let n=Math.min(Math.max(t,0),.05);if(this.ponyS||=e.ponyX.map((t,n)=>({x:t,vx:0,z:e.ponyZ[n],vz:0})),n!==0)for(let t=0;t<e.ponyX.length;t++){let r=this.ponyS[t],i=140/(1+.45*(t<7?t:t-4)),a=2*Math.sqrt(i)*.42;for(let o=0;o<2;o++){let o=n/2;r.vx+=(i*(e.ponyX[t]-r.x)-a*r.vx)*o,r.x+=r.vx*o,r.vz+=(i*(e.ponyZ[t]-r.z)-a*r.vz)*o,r.z+=r.vz*o}e.ponyX[t]=r.x,e.ponyZ[t]=r.z}}ponyOffBack(){if(!this.pony.length)return;this.torso.updateWorldMatrix(!0,!0);let e=ps,t=ms,n=n=>(e.set(0,-this.ponyLen[n],0).applyMatrix4(this.pony[n].matrixWorld),t.copy(e),this.torso.worldToLocal(t),t.y<-.05||t.y>.56||Math.abs(t.x)>.16?1:t.z-(ko(t.x,Math.min(Math.max(t.y,.04),.5))+.04));for(let e=1;e<this.pony.length;e++){let t=this.pony[e],r=n(e);if(r>=0)continue;t.rotation.x+=.07,t.updateMatrixWorld(!0);let i=1;n(e)<r&&(i=-1,t.rotation.x-=.14,t.updateMatrixWorld(!0)),r=n(e);for(let a=0;a<10&&r<0;a++)t.rotation.x+=i*.07,t.updateMatrixWorld(!0),r=n(e)}}applyPose(e){this.torso.position.copy(e.torsoP),this.torso.quaternion.copy(e.torsoQ),this.head.rotation.set(e.head.x,e.head.y,e.head.z);for(let t=0;t<this.pony.length;t++)this.pony[t].rotation.x=e.ponyX[t]+Po[t],this.pony[t].rotation.z=e.ponyZ[t]+Fo[t];let t=hs;for(let n=0;n<2;n++){let r=n===0?1:-1,i=e.hip[n],a=e.ankle[n];Ba(i,a,e.legL[0],e.legL[1],e.kneePole[n],t),this.thigh[n].set(i,t),(this.thighA[n]??=new p).copy(i),(this.thighB[n]??=new p).copy(t),this.shin[n].set(t,a),(this.shinA[n]??=new p).copy(t),(this.shinB[n]??=new p).copy(a),this.socks[n].set(a,ms.copy(a).lerp(t,.17)),this.knees[n].position.copy(t),this.feet[n].position.copy(a).add(ps.set(0,-.03,0)),this.feet[n].quaternion.copy(e.footQ[n]);let o=Lo(r).applyQuaternion(e.torsoQ).add(e.torsoP),s=e.wrist[n];Ba(o,s,e.armL[n][0],e.armL[n][1],e.elbowPole[n],t),this.upperArm[n].set(o,t),this.sleeves[n].position.copy(o),this.sleeves[n].quaternion.copy(this.upperArm[n].mesh.quaternion),this.foreArm[n].set(t,s),this.elbows[n].position.copy(t);let c=this.walkHands[n];c.visible&&(c.position.copy(s),c.quaternion.setFromUnitVectors(ps.set(0,-1,0),ms.subVectors(s,t).normalize()))}}},Qo=20,$o=15,es=.118,ts=-.005,ns=new p,rs=new p,is=new p,as=new p,os=new p,ss=new p,cs=new p,ls=new p,us=new p,ds=new p,fs=new p,ps=new p,ms=new p,hs=new p,gs=new c,_s=(e,t,n)=>Math.min(n,Math.max(t,e)),vs=new le,ys=new le,bs=6,xs=10.5,Ss=13.5,Cs=2.3,ws=-54,Ts=class{autoplay;x=A(ws)-.9;z=ws;yaw=it(ws);bumped=!1;speed=bs;steer=0;lean=0;yawRate=0;wheel=0;crank=0;pedaling=1;sprint=0;time=0;braking=!1;brakePressure=0;bumpImpulse=0;hold=!1;coastT=0;constructor(e,t=ws){this.autoplay=e,this.z=t,this.x=A(t)-.9,this.yaw=it(t)}update(e,t,n){this.time+=e;let r=0,i=0,a=0;if(this.hold)this.speed=Math.max(0,this.speed-9*e),i=0;else if(this.autoplay){let e=bs+.6*Math.sin(this.time*.17)+.3*Math.sin(this.time*.41);this.coastT=+(this.time%17>13.5),r=this.coastT?0:It((e-this.speed)*1.5,-1,1);let t=7+this.speed*.6,n=this.z-t*Math.cos(this.yaw),i=-.85+.25*Math.sin(this.time*.11),o=A(n)+i,s=Math.atan2(this.x-o,this.z-n)-this.yaw;s=Math.atan2(Math.sin(s),Math.cos(s)),a=It(Math.atan(2*Yi.WHEELBASE*Math.sin(s)/t)/.3,-1,1)}else r=Math.max(t.analogThrottle,+!!t.up),i=Math.max(t.analogBrake,+!!t.down),a=Math.abs(t.analogSteer)>.04?t.analogSteer:+!!t.left-!!t.right;let o=t.sprint&&!this.hold&&!i&&this.speed>=0;this.sprint=H(this.sprint,+!!o,o?2.5:.9,e);let s=xs+3*this.sprint,c=bs;this.hold||(i?this.speed=this.speed>.05?Math.max(0,this.speed-4.2*e):H(this.speed,-.8,4,e):this.speed<0?this.speed=Math.min(0,this.speed+3*e):o?this.speed+=3.4*It((Ss-this.speed)/3,.12,1)*e:this.speed>xs?this.speed=Math.max(xs,Math.min(this.speed,s)-.6*e):r>0?this.speed+=(this.autoplay?1:1.7)*r*e*(1-this.speed/11.5):this.autoplay&&this.coastT?this.speed-=.25*e:this.speed<c?this.speed+=.9*e:this.speed-=.35*e),this.speed=It(this.speed,-.8,Math.max(s,xs)),this.braking=(!!i||this.hold)&&this.speed>.05,this.brakePressure=H(this.brakePressure,+!!this.braking,10,e);let l=!i&&!this.hold&&this.speed>=0&&(r>0||o||!this.coastT&&this.speed<=6.05)?1:0;this.pedaling=H(this.pedaling,l,5,e);let u=.3/(1+this.speed*.06);this.steer=H(this.steer,a*u,this.autoplay?4:6,e);let d=a!==0&&Math.abs(this.speed)<1.2?this.speed<0?-1.2:1.2:this.speed;this.yawRate=d*Math.tan(this.steer)/Yi.WHEELBASE,this.yaw+=this.yawRate*e;let f=this.x-Math.sin(this.yaw)*this.speed*e,p=this.z-Math.cos(this.yaw)*this.speed*e,m=f-A(p);if(Math.abs(m)>2.75){f=A(p)+Math.sign(m)*tt;let t=it(p);this.yaw=H(this.yaw,t,6,e)}this.bumped=!1,this.bumpImpulse=0;let h=n(f,p);if(h.pen>0){let t=f-this.x,r=p-this.z,i=t*h.nx+r*h.nz,a=Math.hypot(t,r);if(i<0&&a>1e-6){let n=-i/a;n>Math.cos(30*Math.PI/180)?(Math.abs(this.speed)>.5&&(this.bumpImpulse=Math.min(1,Math.abs(this.speed)/6)),this.speed=0,t=0,r=0):(t-=h.nx*i,r-=h.nz*i,this.speed*=1-(1-Math.sqrt(1-n*n))*Math.min(1,e*8),n>.2&&(this.bumpImpulse=Math.min(.5,n*Math.abs(this.speed)/8))),this.bumped=!0}f=this.x+t;let o=this.z+r,s=n(f,o);s.pen>0&&(f+=s.nx*s.pen,o+=s.nz*s.pen),this.x=f,this.z=o}else this.x=f,this.z=p;let g=1.4*(1+.25*this.sprint),_=.4+.06*this.sprint;this.lean=H(this.lean,It(Math.atan(this.speed*this.yawRate/9.81)*g,-_,_),5,e);let v=this.speed*e;this.wheel+=v/Yi.WHEEL_R,this.crank+=v/Yi.WHEEL_R/this.gear*this.pedaling}get gear(){return Cs*(1-.13*this.sprint)}get cadence(){return this.speed/(2*Math.PI*Yi.WHEEL_R)/this.gear}get wheelRate(){return this.speed/(2*Math.PI*Yi.WHEEL_R)}},Es=45,Ds=70,Os=.15,ks=[`chase`,`front`,`flank`],As={front:{az:-2.84,r:2.05,y:1.47,look:[.02,.04,1.52],fov:35},flank:{az:-Math.PI*1.5+.12,r:2.75,y:1.34,look:[.3,0,1.18],fov:40}},js=1.8,Ms=150*Math.PI/180,Ns=-.17,Ps=.96,Fs=100*Math.PI/180,Is=Math.PI/4,Ls=1.5,Rs=(e,t,n)=>Math.min(n,Math.max(t,e)),zs=new p(0,1,0),Bs=new p(1,0,0),Vs=new p,Hs=new p,Us=class{clear=null;capD=1e9;fast=0;cam;mode=`chase`;fpp=0;customPos=new p;customLook=new p;blend=0;pos=new p;look=new p;yaw=0;init=!1;qT=new le;qF=new le;eye=new p;m4=new c;tr=null;pending=null;fov=Es;mouseLook=!0;lYaw=0;lPitch=0;lYawS=0;lPitchS=0;fYaw=0;fPitch=0;fYawS=0;fPitchS=0;lookIdle=1e9;constructor(e){this.cam=new de(Es,e,Os,4200)}toggle(){this.mode!==`chase`||this.tr?(this.pos.copy(this.cam.position),this.look.copy(this.cam.position).add(new p(0,0,-4).applyQuaternion(this.cam.quaternion)),this.mode=`chase`,this.tr=null,this.pending=null,this.fpp=1):this.fpp=this.fpp>.5?0:1}cycle(){if(this.fpp>.5||this.blend>.05){this.fpp=0,this.pending=`front`;return}let e=ks.indexOf(this.mode);this.swingTo(ks[(e<0?0:e+1)%ks.length])}handoff(e=this.mode){this.fpp=0,this.blend=0,this.pending=null,this.swingTo(e===`front`||e===`flank`?e:`chase`)}forceThirdPerson(e){this.fpp=0,this.blend=0,this.pending=null,e.setFirstPerson(!1),e.setSkirtHidden(!1)}lookBy(e,t){this.mouseLook&&this.mode===`chase`&&!this.tr&&(this.lookIdle=0,this.fpp>.5?(this.fYaw=Rs(this.fYaw-e*.0035,-Fs,Fs),this.fPitch=Rs(this.fPitch-t*.003,-Is,Is)):(this.lYaw=Rs(this.lYaw-e*.0045,-Ms,Ms),this.lPitch=Rs(this.lPitch+t*.0035,-.24000000000000002,.8899999999999999)))}recenter(){this.lYaw=0,this.lPitch=0,this.fYaw=0,this.fPitch=0}get lookState(){return{yaw:this.lYawS,pitch:this.lPitchS,fppYaw:this.fYawS,fppPitch:this.fPitchS}}swingTo(e){this.mode=e,this.tr={from:{az:0,r:0,y:0,lf:0,lr:0,ly:0,fov:this.fov},k:-1}}get fppBlend(){return this.blend}get cinematic(){return this.mode===`front`||this.mode===`flank`||this.tr!==null}shift(e){this.pos.z+=e,this.look.z+=e}update(e,t,n,r){let i=-Math.sin(t.yaw),a=-Math.cos(t.yaw),o=Math.cos(t.yaw),s=-Math.sin(t.yaw);this.init||(this.yaw=t.yaw),this.yaw=H(this.yaw,t.yaw,2.2,e);let c=Math.sin(this.yaw),l=Math.cos(this.yaw),u=Math.cos(this.yaw),d=-Math.sin(this.yaw),f=Math.sin(n*.7)*.05+Math.sin(n*1.9)*.015;this.fast=H(this.fast,Rs((Math.abs(t.speed)-9.5)/4,0,1),2,e);let m=this.fast*this.fast*(3-2*this.fast),h=(Math.sin(n*23.1)+Math.sin(n*31.7+1.3))*.006*m*m,g=Math.sin(n*1.1)*.025+h,_=4.2+.4*m;if(this.pending&&this.blend<.02){let e=this.pending;this.pending=null,this.pos.copy(this.cam.position),this.swingTo(e)}let v,y,b=this.mode!==`chase`,x=r.eyeWorld(new p),S=Es+5.5*m,C=S,w=()=>new p(t.x+c*_+u*(f+.35),1.5+g,t.z+l*_+d*(f+.35)),T=()=>new p(t.x+i*7+u*1.9,1.25,t.z+a*7+d*1.9),E=-c,ee=-l,te=(e,n,r)=>{let i=e.x-t.x,a=e.z-t.z,o=i*E+a*ee,s=i*u+a*d,c=n.x-t.x,l=n.z-t.z;return{az:Math.atan2(s,-o),r:Math.hypot(o,s),y:e.y,lf:c*E+l*ee,lr:c*u+l*d,ly:n.y,fov:r}},D=(e,n,r)=>{let i=Math.cos(e.az),a=Math.sin(e.az);n.set(t.x+(c*i+u*a)*e.r,e.y,t.z+(l*i+d*a)*e.r),r.set(t.x+E*e.lf+u*e.lr,e.ly,t.z+ee*e.lf+d*e.lr)},ne=e=>{let t=As[e],r=e===`front`?Math.sin(n*.43)*.05:Math.sin(n*.37)*.06;return{az:t.az+r*.3,r:t.r+Math.sin(n*.29)*.04,y:t.y+g*.6,lf:t.look[0],lr:t.look[1],ly:t.look[2]+Math.sin(n*.8)*.01,fov:t.fov}};switch(this.mode){case`front`:case`flank`:{b=!0;let e=ne(this.mode);v=new p,y=new p,D(e,v,y),C=e.fov;break}case`face`:v=new p(x.x+i*.85+o*.45,x.y+.02,x.z+a*.85+s*.45),y=x.clone().setY(x.y-.06);break;case`faceside`:v=new p(x.x+o*.95+i*.05,x.y+0,x.z+s*.95+a*.05),y=x.clone().setY(x.y-.06);break;case`back`:v=new p(x.x-i*1.3+o*.2,x.y+.1,x.z-a*1.3+s*.2),y=x.clone().setY(x.y-.25);break;case`overhead`:{let e=2.4,n=.96;v=new p(t.x-i*e*Math.cos(n),1.25+e*Math.sin(n),t.z-a*e*Math.cos(n)),y=new p(t.x,1.25,t.z);break}case`closeup`:v=new p(t.x+o*2.1+i*1.5,1.2,t.z+s*2.1+a*1.5),y=new p(t.x+i*.05,.95,t.z+a*.05);break;case`side`:v=new p(t.x-o*3+i*.6,1.25,t.z-s*3+a*.6),y=new p(t.x,.9,t.z);break;case`paddy`:{let e=t.z-6;v=new p(A(e)-3.2,.9,e),y=new p(A(e-26)-30,-.4,e-26);break}case`custom`:v=this.customPos.clone().add(new p(t.x,0,t.z)),y=this.customLook.clone().add(new p(t.x,0,t.z));break;case`houses`:{let e=t.z;v=new p(A(e)-1,1.6,e),y=new p(A(e-22)+10,2.6,e-22);break}default:b=!1,v=w(),y=T()}if(this.tr){let n=this.tr;if(n.k<0){let e=this.cam.position.clone().add(new p(0,0,-4).applyQuaternion(this.cam.quaternion));n.from=te(this.cam.position,e,this.fov),n.k=0}n.k=Math.min(1,n.k+e/js);let r;if(this.mode===`front`||this.mode===`flank`)r=ne(this.mode);else{let e=Math.max(0,t.speed),n=w(),o=T();n.x-=i*e/4.5,n.z-=a*e/4.5,o.x-=i*e/6,o.z-=a*e/6,r=te(n,o,S)}let o=r.az;for(;o>n.from.az;)o-=Math.PI*2;for(;o<n.from.az-Math.PI*2;)o+=Math.PI*2;let s=n.k,c=s*s*s*(s*(s*6-15)+10),l={az:n.from.az+(o-n.from.az)*c,r:n.from.r+(r.r-n.from.r)*c,y:n.from.y+(r.y-n.from.y)*c+Math.sin(Math.PI*c)*.18,lf:n.from.lf+(r.lf-n.from.lf)*c,lr:n.from.lr+(r.lr-n.from.lr)*c,ly:n.from.ly+(r.ly-n.from.ly)*c,fov:n.from.fov+(r.fov-n.from.fov)*c};l.r=Math.max(l.r,Math.min(n.from.r,r.r,1.6)+Math.sin(Math.PI*c)*.4),D(l,this.pos,this.look),C=l.fov,n.k>=1&&(this.tr=null),this.init=!0}else if(!this.init||b){if(this.pos.copy(v),this.look.copy(y),!this.init&&!b){let e=Math.max(0,t.speed);this.pos.x-=i*e/4.5,this.pos.z-=a*e/4.5,this.look.x-=i*e/6,this.look.z-=a*e/6}this.init=!0}else this.pos.x=H(this.pos.x,v.x,4.5,e),this.pos.y=H(this.pos.y,v.y,3,e),this.pos.z=H(this.pos.z,v.z,4.5,e),this.look.x=H(this.look.x,y.x,6,e),this.look.y=H(this.look.y,y.y,6,e),this.look.z=H(this.look.z,y.z,6,e);this.fov=C,this.lookIdle+=e;let re=this.mode===`chase`&&!this.tr;(!re||this.lookIdle>Ls&&Math.abs(t.speed)>.5)&&(this.lYaw=H(this.lYaw,0,1.4,e),this.lPitch=H(this.lPitch,0,1.4,e)),(!re||this.lookIdle>Ls||this.fpp<.5)&&(this.fYaw=H(this.fYaw,0,2.2,e),this.fPitch=H(this.fPitch,0,2.2,e)),this.lYawS=H(this.lYawS,this.lYaw,14,e),this.lPitchS=H(this.lPitchS,this.lPitch,14,e),this.fYawS=H(this.fYawS,this.fYaw,14,e),this.fPitchS=H(this.fPitchS,this.fPitch,14,e);let ie=this.pos.clone(),ae=this.look.clone();if(Math.abs(this.lYawS)>1e-4||Math.abs(this.lPitchS)>1e-4){let e=new p(t.x,1.2,t.z),n=ie.clone().sub(e),r=n.length(),i=Math.max(Math.hypot(n.x,n.z),.001),a=Rs(Math.atan2(n.y,i)+this.lPitchS,Ns,Ps);n.set(n.x/i*Math.cos(a)*r,Math.sin(a)*r,n.z/i*Math.cos(a)*r).applyAxisAngle(zs,this.lYawS),ie.copy(e).add(n),ae.sub(e).applyAxisAngle(zs,this.lYawS).add(e),ae.lerp(e,Rs(Math.abs(this.lPitchS)/.6,0,1)*.85)}if(this.clear&&(Math.abs(this.lYawS)>.001||Math.abs(this.lPitchS)>.001)){let n=Vs.set(t.x,1.2,t.z),r=Rs((Math.abs(this.lYawS)-1.2)/.8,0,1);ie.y=Math.max(ie.y,this.clear.camFloor(ie.x,ie.z),1.2+.2*r*r*(3-2*r));let i=Hs.subVectors(ie,n),a=i.length();i.divideScalar(Math.max(a,1e-4));let o=this.clear.obstruct(n,i,a);this.capD=o<this.capD?o:H(this.capD,o,2.5,e),ie.copy(n).addScaledVector(i,Math.min(a,this.capD)),ae.y=Math.max(ae.y,.8)}else this.capD=1e9;this.m4.lookAt(ie,ae,new p(0,1,0)),this.qT.setFromRotationMatrix(this.m4),this.mode===`chase`&&this.qT.multiply(new le().setFromAxisAngle(new p(0,0,1),-t.lean*.12));let oe=this.mode===`chase`&&!this.tr?this.fpp:0,se=1-Math.exp(-e/.14);this.blend+=(oe-this.blend)*se,Math.abs(oe-this.blend)<.002&&(this.blend=oe);let ce=this.blend*this.blend*(3-2*this.blend);r.eyeWorld(this.eye),this.eye.x-=i*.22,this.eye.z-=a*.22,this.eye.y=1.52+Math.sin(t.crank*2)*.02*t.pedaling;let ue=Math.sin(t.crank)*.012*t.pedaling;this.eye.x+=a*ue,this.eye.z-=i*ue;let de=new p(this.eye.x+i*10,this.eye.y-4.2,this.eye.z+a*10);this.m4.lookAt(this.eye,de,new p(0,1,0)),this.qF.setFromRotationMatrix(this.m4),this.qF.multiply(new le().setFromAxisAngle(new p(0,0,1),t.lean*.8+Math.sin(t.crank)*.008*t.pedaling)),(this.fYawS||this.fPitchS)&&(this.qF.premultiply(new le().setFromAxisAngle(zs,this.fYawS)),this.qF.multiply(new le().setFromAxisAngle(Bs,this.fPitchS))),this.cam.position.lerpVectors(ie,this.eye,ce),this.cam.position.y+=Math.sin(Math.PI*ce)*.45,this.cam.quaternion.slerpQuaternions(this.qT,this.qF,ce),this.cam.fov=C+(Ds-C)*ce,this.cam.near=Os+-.12*ce,this.cam.updateProjectionMatrix(),this.cam.updateMatrixWorld(),r.setFirstPerson(ce>.12,ce>.93),r.setSkirtHidden(ce>.3&&ce<.97)}},Ws=1.3,Gs=3,Ks=.24,qs=2.2,Js=1,Ys=.9,Xs=.6,Zs=.12,Qs=42,$s=.1,ec=-.17,tc=.96,{ROW_P:nc,COL_P:rc,NROWS:ic,BERM0:ac,HOUSES:oc,FENCES_LEFT:sc,GUARDRAIL_RIGHT:cc,paddyLevel:lc}=wi,uc=ac-ic*nc,dc=Math.round(640/rc),fc=e=>e-640*Math.ceil(e/640),pc=e=>Math.atan2(Math.sin(e),Math.cos(e));function mc(e,t){if(e>Qs||e<uc-.45)return null;let n=fc(t);if(e>=-4.55){let t=Math.abs(e),r=t<3.6?.02:j(e,n),i=t<2.4?`asphalt`:t<3?`dirt`:`grass`;return i===`grass`&&e>0&&hc(e,n)&&(i=`dirt`),{h:r,kind:i}}let r=It(Math.floor(-n/rc),0,dc-1);for(let t=0;t<ic;t++){let i=ac-t*nc;if(Math.abs(e-i)<(t===0?.8:.7)/2-.05){if(t===1){let e=-r*rc;if(st(0,e,11)>.6&&n<e-.85&&n>e-1-(rc-2)-.15)return null}return{h:t===0?0:Math.max(lc(t-1,r),lc(t,r))+.24,kind:`dirt`}}}if(Math.abs(e-uc)<.45)return{h:.95,kind:`grass`};let i=Math.floor((ac-e)/nc);if(i>=0&&i<ic){let e=Math.round(-n/rc);if(Math.abs(n+e*rc)<.26){let t=e%dc;return{h:Math.max(lc(i,t-1),lc(i,t))+.2,kind:`dirt`}}}return null}function hc(e,t){for(let n of oc)if(Math.abs(t-n.z)<n.d/2+4&&e>n.u-3&&e<n.u+n.w+3)return!0;return!1}function gc(e,t,n){for(let r of oc){let i=r.z+640*Math.round((t-r.z)/640),a=A(r.z)+r.u+r.w/2,o=it(r.z)+(r.tilt??-.25),s=e-a,c=t-i,l=Math.cos(o),u=Math.sin(o),d=s*l-c*u,f=s*u+c*l;if(Math.abs(d)<r.w/2+.2+n&&Math.abs(f)<r.d/2+.2+n)return r.floors===2?7.6:5.2}return 0}var _c=class{world;rider;ctl;chase;audio;canvas;mode=`walk`;x=0;z=0;y=0;yaw=0;speed=0;run=0;phase=0;turn=0;k=0;side=1;shiftKey=!1;look=0;lookUp=0;lookT=0;lookTarget=0;idleT=0;approachT=0;prevCam=`chase`;stepCount=0;surface=`asphalt`;kick=0;oYaw=0;oPitch=.16;oDist=3.4;dCur=3.4;pivot=new p;touched=0;dragging=!1;dragMoved=0;dragT=0;lastX=0;lastY=0;hint;hintOn=!1;foot={blend:0,side:1,speed:0,phase:0,run:0,turn:0,look:0,lookUp:0,time:0};autoWalk=null;enabled=!1;lookAround=!0;constructor(e,t,n,r,i,a,o){this.world=e,this.rider=t,this.ctl=n,this.chase=r,this.audio=i,this.canvas=a,this.hint=document.createElement(`div`),this.hint.textContent=`F — ride`,Object.assign(this.hint.style,{position:`fixed`,left:`50%`,bottom:`7%`,transform:`translateX(-50%)`,font:`400 13px/1 "Georgia", "Times New Roman", serif`,letterSpacing:`0.22em`,color:`rgba(255, 252, 240, 0.82)`,textShadow:`0 1px 3px rgba(40, 30, 20, 0.45)`,pointerEvents:`none`,userSelect:`none`,opacity:`0`,transition:`opacity 0.6s ease`,display:o?`block`:`none`}),document.body.appendChild(this.hint),addEventListener(`keydown`,e=>{e.ctrlKey||e.metaKey||e.altKey||((e.code===`ShiftLeft`||e.code===`ShiftRight`)&&(this.shiftKey=!0),!e.repeat&&this.enabled&&(e.code===`KeyF`?this.pressF():e.code===`KeyC`&&this.mode===`ride`&&this.chase.cycle()))}),addEventListener(`keyup`,e=>{(e.code===`ShiftLeft`||e.code===`ShiftRight`)&&(this.shiftKey=!1)}),addEventListener(`blur`,()=>{this.shiftKey=!1,this.dragging=!1}),a.addEventListener(`pointerdown`,e=>{e.button===0&&(this.dragging=!0,this.dragMoved=0,this.dragT=performance.now(),this.lastX=e.clientX,this.lastY=e.clientY)}),addEventListener(`pointermove`,e=>{let t=document.pointerLockElement===a,n=0,r=0;t?(n=e.movementX,r=e.movementY):this.dragging&&(n=e.clientX-this.lastX,r=e.clientY-this.lastY,this.lastX=e.clientX,this.lastY=e.clientY,this.dragMoved+=Math.abs(n)+Math.abs(r)),(n||r)&&this.onFoot&&this.orbitBy(n,r)}),addEventListener(`pointerup`,()=>{if(this.dragging&&this.dragMoved<5&&performance.now()-this.dragT<350&&(this.onFoot||this.lockRiding)&&document.pointerLockElement!==a)try{a.requestPointerLock()?.catch?.(()=>{})}catch{}this.dragging=!1}),a.addEventListener(`wheel`,e=>{this.onFoot&&(this.oDist=It(this.oDist*Math.exp(e.deltaY*.0011),1.4,7),this.touched=3)},{passive:!0}),this.initAsWalker()}initAsWalker(){let e=this.ctl;e.hold=!0,e.speed=0,e.steer=0,e.lean=0,this.mode=`walk`,this.kick=1,this.side=1,this.k=1,e.x=A(e.z)+.85,e.yaw=it(e.z),this.yaw=e.yaw,this.x=A(e.z)-.25,this.z=e.z-1.5,this.y=mc(this.x-A(this.z),this.z)?.h??.02,this.speed=0,this.rider.walker.position.set(this.x,this.y,this.z),this.rider.walker.rotation.y=this.yaw,this.pivot.set(this.x,this.y+1.25,this.z),this.oYaw=this.yaw,this.oPitch=.22,this.oDist=3.2,this.dCur=3.2,this.touched=0}lockRiding=!1;get onFoot(){return this.mode===`dismount`||this.mode===`walk`||this.mode===`approach`||this.mode===`mount`}get bikeActive(){return this.mode===`ride`||this.mode===`braking`}get playerZ(){return this.onFoot?this.z:this.ctl.z}get playerX(){return this.onFoot?this.x:this.ctl.x}get bikeDistance(){return Math.hypot(this.x-this.ctl.x,this.z-this.ctl.z)}shift(e){this.z+=e,this.pivot.z+=e,this.rider.walker.position.z+=e}pressF(){switch(this.mode){case`ride`:Math.abs(this.ctl.speed)>.3?(this.mode=`braking`,this.ctl.hold=!0):this.startDismount();return;case`walk`:this.bikeDistance>qs&&this.summon(),this.bikeDistance<qs&&this.startApproach();return;default:return}}standSpot(e,t=new p){let n=this.ctl,r=Math.cos(n.yaw),i=Math.sin(n.yaw),a=-.6*e,o=Zs;return t.set(n.x+a*r+o*i,0,n.z-a*i+o*r)}startDismount(){let e=this.ctl;e.hold=!0,e.speed=0,this.prevCam=this.chase.mode===`front`||this.chase.mode===`flank`?this.chase.mode:`chase`,this.chase.forceThirdPerson(this.rider);let t=this.standSpot(1);this.side=this.free(t.x,t.z)?1:-1;let n=this.standSpot(this.side);this.x=n.x,this.z=n.z,this.yaw=e.yaw,this.speed=0,this.y=mc(this.x-A(this.z),this.z)?.h??.02,this.mode=`dismount`,this.k=0;let r=this.chase.cam.position;this.rider.headWorld(this.pivot),this.pivot.y-=$s;let i=r.x-this.pivot.x,a=r.y-this.pivot.y,o=r.z-this.pivot.z,s=Math.max(.5,Math.hypot(i,a,o));this.oYaw=Math.atan2(i,o),this.oPitch=It(Math.asin(It(a/s,-1,1)),ec,tc),this.oDist=It(s,1.4,7),this.dCur=this.oDist,this.touched=0}startApproach(){let e=this.ctl,t=this.x-e.x,n=this.z-e.z,r=t*Math.cos(e.yaw)-n*Math.sin(e.yaw);this.side=r<=0?1:-1,this.mode=`approach`,this.approachT=0}summon(){let e=this.ctl,t=this.x-A(this.z);for(let n=0;n<6;n++){let r=this.z-n*1.6,i=it(r),a=It(t+Xs,-2.3,2.3),o=A(r)+a,s=-Math.sin(i),c=-Math.cos(i),l=this.world.contact(o,r,.4).pen<=0;for(let e of[.75,-.45])l&&=this.world.contact(o+s*e,r+c*e,.3).pen<=0;if(l||n===5){e.x=o,e.z=r,e.yaw=i,e.speed=0,e.steer=0,e.lean=0;return}}}finishMount(){let e=this.ctl;this.mode=`ride`,this.k=0,this.kick=0,e.hold=!1,e.speed=0,e.steer=0,e.lean=0,this.speed=0,!this.lockRiding&&document.pointerLockElement===this.canvas&&document.exitPointerLock(),this.chase.handoff(this.prevCam)}circles(e,t,n){let r={pen:0,nx:0,nz:0},i=(n,i,a)=>{let o=e-n,s=t-i,c=a+Ks,l=o*o+s*s;if(l<c*c){let e=Math.sqrt(l);c-e>r.pen&&(r.pen=c-e,r.nx=e>1e-5?o/e:1,r.nz=e>1e-5?s/e:0)}};for(let n of this.world.chunks){let r=n.group.position.z;for(let a of n.colliders)a.r<=1.2&&Math.abs(a.z+r-t)<3&&Math.abs(a.x-e)<3&&i(a.x,a.z+r,a.r)}if(n){let e=this.ctl,t=-Math.sin(e.yaw),n=-Math.cos(e.yaw);for(let r of[.55,0,-.5])i(e.x+t*r,e.z+n*r,.2)}return r}obstruct(e,t,n){let r=this._p;for(let i=1;i<=14;i++){let a=i/14*n;r.copy(e).addScaledVector(t,a);let o=r.x-A(r.z),s=gc(r.x,r.z,.3),c=o>=-4.6?j(o,fc(r.z)):-.1,l=s>0&&r.y<s||r.y<c+.25;if(!l&&r.y<3.2)for(let e of this.world.chunks){let t=e.group.position.z;for(let n of e.colliders)if(n.r>=.35&&n.r<=1.2&&Math.hypot(r.x-n.x,r.z-n.z-t)<n.r*.7+.2){l=!0;break}if(l)break}if(l)return Math.max(1,a-.35)}return n}_p=new p;camFloor(e,t){let n=e-A(t);return(n>=-4.6?j(n,fc(t)):-.1)+vc(n)+.3}free(e,t){return mc(e-A(t),t)!==null&&gc(e,t,Ks)===0}move(e,t){let n=this.x+e,r=this.z+t;for(let e=0;e<2;e++){let e=this.circles(n,r,!0);if(e.pen<=0)break;n+=e.nx*e.pen,r+=e.nz*e.pen}if(this.free(n,r)||!this.free(this.x,this.z)){this.x=n,this.z=r;return}let i=this.x-A(this.z),a=[[A(this.z+t)+i,this.z+t],[this.x+e,this.z],[this.x,this.z+t]];for(let[e,t]of a)if(this.free(e,t)&&this.circles(e,t,!0).pen<.002){this.x=e,this.z=t;return}this.speed*=.6}update(e,t,n){let r=this.ctl;switch(this.mode){case`braking`:Math.abs(r.speed)<=.25&&this.startDismount();break;case`dismount`:this.k=Math.min(1,this.k+e/Js),this.k>=1&&(this.mode=`walk`);break;case`walk`:this.locomotion(e,t);break;case`approach`:{this.approachT+=e;let t=this.standSpot(this.side),n=t.x-this.x,i=t.z-this.z,a=Math.hypot(n,i);if(a>.05&&this.approachT<4){this.steerToward(Math.atan2(-n,-i),e,9),this.speed=H(this.speed,Math.min(1.1,a*2.2+.25),6,e);let t=Math.min(a,this.speed*e);this.x+=n/a*t,this.z+=i/a*t}else{this.speed=H(this.speed,0,10,e);let n=this.steerToward(r.yaw,e,7);(Math.abs(n)<.06&&this.speed<.15||this.approachT>5)&&(this.x=t.x,this.z=t.z,this.mode=`mount`,this.k=1,this.speed=0)}this.advancePhase(e);break}case`mount`:this.speed=0,this.yaw=H(this.yaw,r.yaw,12,e),this.k=Math.max(0,this.k-e/Ys),this.k<=0&&this.finishMount()}let i=this.onFoot,a=this.mode===`dismount`?yc(this.k/.55):this.mode===`mount`?yc((this.k-.35)/.5):+!!i;if(this.kick=a,i){let t=mc(this.x-A(this.z),this.z);t&&(this.y=H(this.y,t.h,12,e),this.surface=t.kind),this.rider.walker.position.set(this.x,this.y,this.z),this.rider.walker.rotation.y=this.yaw,this.idleLook(e)}let o=this.foot;o.blend=this.mode===`dismount`||this.mode===`mount`?this.k:+!!i,o.side=this.side,o.speed=this.speed,o.phase=this.phase,o.run=this.run,o.turn=this.turn,o.look=this.look,o.lookUp=this.lookUp,o.time=n,O.uPush.value.set(this.x,this.z,.85,+!!i);let s=r.z-this.playerZ;this.rider.root.visible=!i||s<105&&s>-480;let c=this.mode===`walk`&&this.bikeDistance<qs;c!==this.hintOn&&(this.hintOn=c,this.hint.style.opacity=c?`1`:`0`)}get parkLean(){return qi*this.kick}get parkSteer(){return Ji*this.kick*this.side}steerToward(e,t,n){let r=pc(e-this.yaw),i=r*(1-Math.exp(-n*t));return this.yaw=pc(this.yaw+i),this.turn=H(this.turn,t>0?i/t:0,8,t),r}advancePhase(e){this.run=It((this.speed-Ws)/1.7,0,1),this.phase+=this.speed*e/Vo(this.run)*Math.PI*2;let t=Math.floor(this.phase/Math.PI);t!==this.stepCount&&(this.speed>.35&&this.audio.footstep(this.surface,.5+.55*this.run+.15*Math.min(1,this.speed/Ws)),this.stepCount=t)}locomotion(e,t){let n=Math.abs(t.analogFwd)>.04?t.analogFwd:+!!t.up-!!t.down,r=Math.abs(t.analogStrafe)>.04?t.analogStrafe:+!!t.right-!!t.left,i=Math.sin(this.oYaw),a=Math.cos(this.oYaw),o=-i*n+a*r,s=-a*n-i*r,c=this.shiftKey||t.sprint;this.autoWalk&&(o=this.autoWalk.dx,s=this.autoWalk.dz,c=this.autoWalk.run,n=1,r=0);let l=Math.hypot(o,s),u=0;if(l>.01){o/=l,s/=l,u=c?Gs:Ws;let t=this.steerToward(Math.atan2(-o,-s),e,u>Ws?7:9);u*=It(Math.cos(t)*1.2,.1,1)}else this.turn=H(this.turn,0,6,e);let d=u>this.speed?u>Ws?3.2:3.6:6.5;if(this.speed=Math.max(0,this.speed+It(u-this.speed,-d*e,d*e)),this.speed>.001&&this.move(-Math.sin(this.yaw)*this.speed*e,-Math.cos(this.yaw)*this.speed*e),this.advancePhase(e),this.touched=Math.max(0,this.touched-e),n>0&&this.touched<=0&&this.speed>.2){let t=this.yaw;this.oYaw=pc(this.oYaw+pc(t-this.oYaw)*(1-Math.exp(-.35*e*(this.speed/Ws))))}}idleLook(e){if(this.mode===`walk`&&this.speed<.08&&this.lookAround?this.idleT+=e:(this.idleT=0,this.lookTarget=0),this.idleT>2.2&&(this.lookT-=e,this.lookT<=0)){let e=Math.random();this.lookTarget=this.lookTarget!==0&&e<.55?0:(e<.5?-1:1)*(.35+Math.random()*.35),this.lookT=1.6+Math.random()*2.6}this.look=H(this.look,this.lookTarget,2.4,e),this.lookUp=H(this.lookUp,this.lookTarget===0?0:-.08+.05*Math.sin(this.idleT*.7),1.5,e)}orbitBy(e,t){this.oYaw=pc(this.oYaw-e*.0055),this.oPitch=It(this.oPitch+t*.004,ec,tc),this.touched=3}recenter(){this.oYaw=this.yaw,this.oPitch=.14,this.touched=0}setOrbit(e,t,n){this.oYaw=pc(this.yaw+e),this.oPitch=It(t,ec,tc),this.oDist=It(n,1.4,7),this.dCur=this.oDist,this.touched=1e9}teleport(e,t,n=it(t)){this.x=A(t)+e,this.z=t,this.yaw=n,this.y=mc(e,t)?.h??0,this.speed=0,this.rider.headWorld(this.pivot)}updateCamera(e,t){let n=this.rider.headWorld(new p);n.y-=$s,this.pivot.x=H(this.pivot.x,n.x,9,e),this.pivot.z=H(this.pivot.z,n.z,9,e),this.pivot.y=H(this.pivot.y,n.y,5,e),this.mode===`dismount`&&this.touched<=0&&(this.oDist=H(this.oDist,3.4,1.6,e),this.oPitch=H(this.oPitch,.16,1.6,e));let r=Math.cos(this.oPitch),i=new p(Math.sin(this.oYaw)*r,Math.sin(this.oPitch),Math.cos(this.oYaw)*r),a=this.obstruct(this.pivot,i,this.oDist);this.dCur=a<this.dCur?a:H(this.dCur,a,2.5,e),t.position.copy(this.pivot).addScaledVector(i,this.dCur),t.fov=45,t.near=.1,t.updateProjectionMatrix(),t.lookAt(this.pivot.x,this.pivot.y+.05,this.pivot.z),t.updateMatrixWorld()}};function vc(e){return Math.abs(e)<2.6?0:e<-4.9?.55:e<7?1.1:.8}var yc=e=>{let t=It(e,0,1);return t*t*(3-2*t)},bc=class{up=!1;down=!1;left=!1;right=!1;sprint=!1;analogSteer=0;analogThrottle=0;analogBrake=0;analogFwd=0;analogStrafe=0;resetAnalog(){this.analogSteer=0,this.analogThrottle=0,this.analogBrake=0,this.analogFwd=0,this.analogStrafe=0}constructor(e,t=()=>{}){let n=(e,t)=>{switch(e){case`KeyW`:case`ArrowUp`:return this.up=t,!0;case`KeyS`:case`ArrowDown`:return this.down=t,!0;case`KeyA`:case`ArrowLeft`:return this.left=t,!0;case`KeyD`:case`ArrowRight`:return this.right=t,!0;case`ShiftLeft`:case`ShiftRight`:return this.sprint=t,!1}return!1};addEventListener(`keydown`,r=>{e(),r.code===`KeyV`&&!r.repeat&&t(),n(r.code,!0)&&r.preventDefault()}),addEventListener(`keyup`,e=>{n(e.code,!1)}),addEventListener(`pointerdown`,e),addEventListener(`blur`,()=>{this.up=this.down=this.left=this.right=this.sprint=!1,this.resetAnalog()})}},xc=Math.PI*2;function Sc(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var Y=(e,t,n)=>t+(n-t)*e(),Cc=(e,t)=>t[Math.floor(e()*t.length)%t.length],wc=(e,t)=>-Math.log(1-e()*.999999)*t,Tc=(e,t,n)=>e<t?t:e>n?n:e,Ec=(e,t,n)=>e+(t-e)*n,Dc=e=>{let t=Tc(e,0,1);return t*t*(3-2*t)},Oc=(e,t,n)=>Dc((n-e)/(t-e)),kc=4096,Ac=new Float32Array(4097);for(let e=0;e<=kc;e++)Ac[e]=Math.sin(xc*e/kc);function jc(e){let t=(e-Math.floor(e))*kc,n=t|0;return Ac[n]+(Ac[n+1]-Ac[n])*(t-n)}function Mc(e,t){let n=Math.imul((e|0)^Math.imul(t|0,2654435761),668265261);return n^=n>>>15,n=Math.imul(n,2246822507),n^=n>>>13,(n>>>0)/4294967296}function Nc(e,t=0){let n=Math.floor(e),r=e-n;return Ec(Mc(n,t),Mc(n+1,t),r*r*(3-2*r))}var Pc=class{b0=1;b1=0;b2=0;a1=0;a2=0;z1=0;z2=0;constructor(e,t,n,r=.707){let i=xc*Math.min(n,t*.49)/t,a=Math.cos(i),o=Math.sin(i)/(2*r),s=1+o,c,l,u;e===`lp`?(c=(1-a)/2,l=1-a,u=c):e===`hp`?(c=(1+a)/2,l=-(1+a),u=c):(c=o,l=0,u=-o),this.b0=c/s,this.b1=l/s,this.b2=u/s,this.a1=-2*a/s,this.a2=(1-o)/s}run(e){let t=this.b0*e+this.z1;return this.z1=this.b1*e-this.a1*t+this.z2,this.z2=this.b2*e-this.a2*t,t}};function Fc(e,t,n=!1){if(n)for(let n=Math.max(0,e.length-6e3);n<e.length;n++)t.run(e[n]);for(let n=0;n<e.length;n++)e[n]=t.run(e[n]);return e}function Ic(e,t){let n=new Float32Array(e);for(let r=0;r<e;r++)n[r]=t()*2-1;return n}function Lc(e,t){let n=new Float32Array(e),r=0,i=0,a=0,o=0,s=0,c=0,l=0;for(let u=0;u<e;u++){let e=t()*2-1;r=.99886*r+e*.0555179,i=.99332*i+e*.0750759,a=.969*a+e*.153852,o=.8665*o+e*.3104856,s=.55*s+e*.5329522,c=-.7616*c-e*.016898,n[u]=r+i+a+o+s+c+l+e*.5362,l=e*.115926}return n}function Rc(e,t){let n=new Float32Array(e),r=0;for(let i=0;i<e;i++)r=(r+.02*(t()*2-1))/1.02,n[i]=r;return Fc(n,new Pc(`hp`,48e3,12,.7))}function zc(e){let t=0;for(let n=0;n<e.length;n++)t+=e[n]*e[n];return Math.sqrt(t/Math.max(1,e.length))}function Bc(e,t){for(let n=0;n<e.length;n++)e[n]*=t;return e}function Vc(e,t){let n=zc(e);return n>0?Bc(e,t/n):e}function Hc(e,t=.9){let n=0;for(let t of e)for(let e=0;e<t.length;e++)n=Math.max(n,Math.abs(t[e]));if(n>0)for(let r of e)Bc(r,t/n);return e}function Uc(e,t){let n=e.length-t,r=e.slice(0,n);for(let i=0;i<t;i++){let a=i/t*(Math.PI/2);r[i]=e[i]*Math.sin(a)+e[n+i]*Math.cos(a)}return r}function Wc(e,t){let n=e.length-1;for(;n>0&&Math.abs(e[n])<1e-4;)n--;let r=e.slice(0,Math.min(e.length,n+Math.floor(t*.02))),i=Math.min(64,r.length);for(let e=0;e<i;e++)r[r.length-1-e]*=e/i;return r}function Gc(e,t,n,r,i,a,o=[1]){let s=Math.round(n*t),c=Math.max(1,Math.round(r*t)),l=t*.45,u=0;for(let n=0;n<c;n++){let r=s+n;if(r>=e.length)break;let d=n/c,f=i(d);u+=f/t,u>=1&&(u-=Math.floor(u));let p=0;for(let e=0;e<o.length&&!(f*(e+1)>l);e++)p+=o[e]*jc(u*(e+1));e[r]+=a(d)*p}}var Kc=(e,t=1.5)=>n=>n<e?n/e:Math.max(0,(1-n)/(1-e))**+t,qc=(e,t)=>n=>n<e?Dc(n/e):n>1-t?Dc((1-n)/t):1;function Jc(e,t,n,r,i,a,o=0,s=8e-4){if(r>=t*.47)return;let c=Math.round(n*t),l=Math.min(e.length-c,Math.ceil(a*7*t)),u=Math.exp(-1/(a*t)),d=Math.max(1,s*t),f=i,p=r/t,m=o;for(let t=0;t<l;t++)e[c+t]+=f*(t<d?t/d:1)*jc(m),m+=p,f*=u}function Yc(e,t,n=3.2,r=2.4){let i=Math.floor(e*n),a=Math.floor(.014*e),o=[];for(let n=0;n<2;n++){let n=new Float32Array(i);for(let r=0;r<9;r++){let r=Y(t,.004,.11),o=a+Math.floor(r*e);o<i&&(n[o]+=Y(t,.05,.22)*Math.exp(-r*14)*(t()<.5?-1:1))}let s=0;for(let o=a;o<i;o+=64){let c=(o-a)/e,l=Math.exp(-6.9*c/r)*(1-Math.exp(-c/.045)),u=1-Math.exp(-xc*(6500*Math.exp(-c*1.3)+700)/e),d=Math.min(i,o+64);for(let e=o;e<d;e++)s+=u*((t()*2-1)*l-s),n[e]+=s}let c=Math.floor(e*.2);for(let e=0;e<c;e++)n[i-1-e]*=e/c;let l=0;for(let e=0;e<i;e++)l+=n[e]*n[e];Bc(n,1/Math.sqrt(l)),o.push(n)}return o}var Xc=32e3,Zc=class{ctx;rng;white;pink;pinkSt;brown;nodes=0;timings={};banks=new Map;jobs=[];constructor(e,t){this.ctx=e;let n=performance.now();this.rng=Sc(t);let r=e.sampleRate,i=this.rng,a=Math.floor(r*.1),o=e=>Vc(Uc(e,a),.25);this.white=this.buffer([o(Ic(r*3+a,i))],r),this.pink=this.buffer([o(Lc(r*4+a,i))],r),this.pinkSt=this.buffer([o(Lc(r*6+a,i)),o(Lc(r*6+a,i))],r),this.brown=this.buffer([o(Rc(r*5+a,i))],r),this.timings.noise=performance.now()-n}buffer(e,t){let n=this.ctx.createBuffer(e.length,e[0].length,t);return e.forEach((e,t)=>n.copyToChannel(e,t)),n}bank(e,t,n,r,i=!1){for(let a=0;a<t;a++){let t=()=>{let t=performance.now(),i=this.banks.get(e)??[];i.push(this.buffer(r(this.rng,n),n)),this.banks.set(e,i),this.timings[e]=(this.timings[e]??0)+performance.now()-t};i?t():this.jobs.push(t)}}defer(e,t){this.jobs.push(()=>{let n=performance.now();t(),this.timings[e]=(this.timings[e]??0)+performance.now()-n})}loopBank(e,t,n,r){let i=[];for(let a=0;a<t;a++)this.jobs.push(()=>{let a=performance.now();i.push(r(this.rng,n)[0]),i.length===t&&this.banks.set(e,[this.buffer(i,n)]),this.timings[e]=(this.timings[e]??0)+performance.now()-a})}pump(e){let t=performance.now();for(;this.jobs.length&&(this.jobs.shift()(),!(performance.now()-t>e)););return this.jobs.length===0}get pending(){return this.jobs.length}has(e){return(this.banks.get(e)?.length??0)>0}get(e){return this.banks.get(e)??[]}pick(e){let t=this.banks.get(e);return t&&t.length?t[Math.floor(this.rng()*t.length)%t.length]:null}loop(e,t=1){let n=this.ctx.createBufferSource();return n.buffer=e,n.loop=!0,n.playbackRate.value=t,n.start(this.ctx.currentTime,this.rng()*e.duration),n}fire(e,t,n,r=1){let i=this.ctx.createBufferSource();i.buffer=e,r!==1&&(i.playbackRate.value=r),i.connect(n),i.onended=()=>i.disconnect(),i.start(t),this.nodes++}play(e,t,n){let r=this.ctx,i=r.createBufferSource();i.buffer=e;let a=Math.max(.25,n.rate??1);i.playbackRate.value=a;let o=r.createGain();o.gain.value=n.gain??1;let s=r.createStereoPanner(),c=Qc(n.pan??0);s.pan.setValueAtTime(c,t),n.panTo!==void 0&&s.pan.linearRampToValueAtTime(Qc(n.panTo),t+e.duration/a),i.connect(o).connect(s).connect(n.dest);let l=null;n.wet&&n.wetDest&&(l=r.createGain(),l.gain.value=n.wet,s.connect(l).connect(n.wetDest)),i.onended=()=>{i.disconnect(),o.disconnect(),s.disconnect(),l?.disconnect()},i.start(t),this.nodes+=l?4:3}},Qc=e=>e<-1?-1:e>1?1:Number.isFinite(e)?e:0;function $c(e,t,n,r){Number.isFinite(t)&&e.setTargetAtTime(t,n,r)}var el=class{g;dest;on=!0;quietSince=-1;constructor(e,t){this.g=e,this.dest=t,e.gain.value=0,e.connect(t)}set(e,t,n){Number.isFinite(e)&&(e>1e-5?(this.on||=(this.g.gain.cancelScheduledValues(t),this.g.gain.setValueAtTime(0,t),this.g.connect(this.dest),!0),this.quietSince=-1,this.g.gain.setTargetAtTime(e,t,n)):this.on&&(this.g.gain.setTargetAtTime(0,t,n),this.quietSince<0?this.quietSince=t:t-this.quietSince>n*8+.25&&(this.g.disconnect(),this.on=!1)))}},tl=new WeakMap;function nl(e,t,n,r){if(!Number.isFinite(t))return;let i=tl.get(e),a=i===void 0?t:i+(t-i)*(1-Math.exp(-1/30/r));tl.set(e,a),(i===void 0||Math.abs(a-i)>Math.abs(i)*.002)&&e.setValueAtTime(a,n)}var rl=class{kit;out;wet;ctx;constructor(e){this.kit=e,this.ctx=e.ctx,this.out=e.ctx.createGain(),this.wet=e.ctx.createGain()}filter(e,t,n=.707){let r=this.ctx.createBiquadFilter();return r.type=e,r.frequency.value=t,r.Q.value=n,r}gain(e=0){let t=this.ctx.createGain();return t.gain.value=e,t}osc(e,t=`sine`){let n=this.ctx.createOscillator();return n.type=t,n.frequency.value=e,n.start(),n}},il=(e,t)=>Hc([Wc(e,t)]),al=(e,t)=>{let n=new Float32Array(Math.floor(t*.012)),r=Y(e,.55,1);Jc(n,t,0,Y(e,2900,3500),r,Y(e,7e-4,.0012),e()),Jc(n,t,0,Y(e,5e3,6100),r*.7,Y(e,5e-4,9e-4),e()),Jc(n,t,0,Y(e,7600,8800),r*.35,4e-4,e());for(let i=0;i<t*4e-4;i++)n[i]+=(e()*2-1)*r*.3*(1-i/(t*4e-4));return[n]},ol=e=>(t,n)=>{let r=new Float32Array(Math.floor(n*.03)),i=e?Y(t,.85,1):Y(t,.35,.6);return Jc(r,n,0,Y(t,1150,1550),i*.6,Y(t,.002,.0035),t(),.0015),Jc(r,n,0,Y(t,2500,3200),i*.45,Y(t,.0015,.0025),t(),.0012),Jc(r,n,0,Y(t,4100,5e3),i*.2,.0012,t(),.001),Jc(r,n,0,Y(t,150,210),i*(e?.55:.25),.009,0,.002),[r]},sl=(e,t)=>{let n=new Float32Array(Math.floor(t*.35));Gc(n,t,0,.09,e=>Ec(115,55,e),Kc(.05,2.5),[1,.2]);let r=4+Math.floor(e()*7);for(let i=0;i<r;i++){let r=Math.min(.22,.004+wc(e,.035)),i=Y(e,1700,4200),a=Y(e,.08,.35);Jc(n,t,r,i,a,Y(e,.002,.007),e()),Jc(n,t,r,i*Y(e,1.4,2.3),a*.5,.002,e())}return il(n,t)},cl=[[1,1,.55],[1.0048,.75,.6],[2.09,.33,.28],[2.104,.22,.25],[3.15,.12,.14],[4.47,.06,.08]],ll=e=>(t,n)=>{let r=Y(t,1580,1720),i=e?[[.002,.5]]:[[.002,.65],[.047,1],[.3,.6],[.346,.9]],a=new Float32Array(Math.floor(n*(i[i.length-1][0]+1.8)));for(let[e,o]of i){for(let[i,s,c]of cl)Jc(a,n,e,r*i,o*s,c,t(),6e-4);let i=Math.floor(n*.0015),s=Math.floor(e*n);for(let e=0;e<i;e++)a[s+e]+=(t()*2-1)*.2*o*(1-e/i)}return Fc(a,new Pc(`lp`,n,7500,.6)),il(a,n)},ul=(e,t)=>{let n=new Float32Array(t*2),r=2+Math.floor(e()*5),i=Y(e,3e3,5200),a=Math.floor(e()*3),o=.01;for(let s=0;s<r;s++){let r=Y(e,.035,.075),s=i*Y(e,.94,1.06),c=a===0?e=>s*Ec(1.25,.8,e):a===1?e=>s*Ec(.85,1.3,e):e=>s*(1+.3*Math.sin(Math.PI*e)),l=Y(e,.6,1),u=Kc(.18,1.8);Gc(n,t,o,r,c,e=>u(e)*l,[1,.1,.03]),o+=r+Y(e,.04,.13)}return il(n,t)},dl=(e,t)=>{let n=new Float32Array(t*2),r=8+Math.floor(e()*15),i=Y(e,12,22),a=Y(e,3400,6e3),o=Y(e,.75,1.25),s=Y(e,-.25,.3),c=Kc(.2,1.3),l=.01;for(let e=0;e<r;e++){let u=e/Math.max(1,r-1),d=a*Ec(1,o,u),f=.45+.55*Math.sin(Math.PI*(.1+.8*u));Gc(n,t,l,.62/i,e=>d*(1+s*(e-.5)),e=>c(e)*f,[1,.08]),l+=1/i}return il(n,t)},fl=(e,t)=>{let n=new Float32Array(t*3),r=Y(e,1.1,2.3),i=Y(e,3e3,5e3),a=.01;for(;a<r;){let o=Y(e,.045,.13),s=i,c=Math.min(6800,Math.max(2400,i*Y(e,.78,1.28))),l=Y(e,18,40),u=Y(e,.02,.07),d=Y(e,.45,1)*(a/r<.1?.6:1),f=qc(.15,.25);Gc(n,t,a,o,e=>Ec(s,c,e)*(1+u*jc(l*e*o)),e=>f(e)*d,[1,.08]),i=c,a+=o+(e()<.3?Y(e,.02,.08):Y(e,.004,.015))}return il(n,t)},pl=(e,t)=>{let n=new Float32Array(t*2),r=Y(e,2700,3300),i=.01,a=Y(e,.25,.38);Gc(n,t,i,a,e=>r*(1+.09*Dc(e)),qc(.12,.2),[1,.06]),i+=a+Y(e,.03,.07);let o=Y(e,.2,.3);return Gc(n,t,i,o,e=>r*Ec(1.05,.72,e**.7),qc(.08,.35),[1,.06]),e()<.4&&(i+=o+Y(e,.12,.2),Gc(n,t,i,a*.8,e=>r*(1+.07*Dc(e)),e=>qc(.12,.25)(e)*.7,[1,.06])),il(n,t)},ml=(e,t)=>{let n=new Float32Array(t*3),r=Y(e,980,1150),i=Y(e,.95,1.25);Gc(n,t,.02,i,e=>r*(1+.06*e+.004*jc(4.5*e*i)),e=>(e<.85?.35+.65*Dc(e/.85):Dc((1-e)/.15))*Dc(e/.03),[1,.12,.04]);let a=.02+i+Y(e,.18,.28);return Gc(n,t,a,.11,e=>r*1.75*(1+.08*e),qc(.2,.3),[1,.1]),a+=.135,Gc(n,t,a,.065,e=>r*2.7*(1+.05*e),Kc(.2,1.2),[1,.1]),a+=.095,Gc(n,t,a,.36,e=>r*Ec(2.55,1.6,1-(1-e)**2.2),Kc(.06,1.1),[1,.15,.05]),il(n,t)},hl=(e,t)=>{let n=new Float32Array(Math.floor(t*3.5)),r=Y(e,2900,3300),i=Y(e,.7,.95);Gc(n,t,.02,i,e=>r*(.93+.1*Dc(e*4)-.04*e),qc(.12,.08),[1,.07]);let a=.02+i+.015;Gc(n,t,a,.2,e=>r*Ec(.99,.78,e),qc(.05,.2),[1,.06]),a+=.23;let o=Y(e,1.1,1.5),s=Y(e,7.5,9.5),c=qc(.05,.4);return Gc(n,t,a,o,e=>r*Ec(.86,.66,e)*(1+.11*jc(s*e*o)),e=>(.55+.45*jc(s*e*o))*c(e)*(1-.5*e),[1,.06]),il(n,t)},gl=(e,t)=>{let n=new Float32Array(t*3),r=2+Math.floor(e()*3),i=Y(e,460,600),a=[];for(let e=1;e<=14;e++)a.push(1/e**.7);let o=.02;for(let s=0;s<r;s++){let r=Y(e,.26,.4),s=qc(.1,.35);Gc(n,t,o,r,e=>i*(.88+.22*Math.sin(Math.PI*Math.min(1,e*1.4))),s,a);let c=Math.round(o*t),l=Math.round(r*t);for(let t=0;t<l;t++)n[c+t]+=(e()*2-1)*.35*s(t/l);o+=r+Y(e,.22,.4)}let s=Fc(n.slice(),new Pc(`bp`,t,1250,2.5)),c=Fc(n.slice(),new Pc(`bp`,t,2300,3));for(let e=0;e<n.length;e++)n[e]=s[e]+.6*c[e]+.12*n[e];return il(n,t)},_l=(e,t)=>{let n=Y(e,4.5,7.5),r=Math.floor(n*t),i=new Float32Array(r),a=Y(e,6.5,8.5),o=a*Y(e,.55,.7),s=Y(e,4300,4900),c=s*Y(e,.88,.95),l=Y(e,330,440),u=0,d=0,f=0,p=a;for(let e=0;e<r;e++){let r=e/t,m=r/n;e&63||(p=Ec(a,o,m**.8)),u+=p/t;let h=Math.floor(u),g=u-h,_=Math.max(0,1-(g-.08)/.75),v=g<.08?g/.08:_*Math.sqrt(_),y=Ec(s,c,m)*(1+.045*jc(g*.5))*(h&1?.962:1);d+=y/t,d>=1&&--d,f+=l/t;let b=.6+.4*jc(f),x=Dc(r/.35)*Ec(1,.28,m)*Dc((n-r)/.35);i[e]=x*v*b*(jc(d)+.28*jc(2*d)+.08*jc(3*d))}return il(i,t)},vl=(e,t)=>{let n=.9,r=10+Math.floor(e()*9),i=Y(e,2.6,3.4),a=1.2,o=n+r/i+a,s=Math.floor(o*t),c=new Float32Array(s),l=Y(e,3200,3700),u=Y(e,200,260),d=0,f=0;for(let e=0;e<s;e++){let o=e/t,s,p;if(o<n)s=l*Ec(.88,1.02,o/n),p=Dc(o/n);else if(o<n+r/i){let e=(o-n)*i%1;p=e<.55?.35+.65*Dc(e/.55):.35+.65*Math.max(0,1-(e-.55)/.35)**1.5,s=l*(.9+.14*Math.min(1,e/.55))}else{let e=(o-n-r/i)/a;s=l*Ec(1.02,.85,e),p=(1-e)**1.6}d+=s/t,d>=1&&--d,f+=u/t,c[e]=p*(.55+.45*jc(f))*(jc(d)+.3*jc(2*d)+.1*jc(3*d))}return il(c,t)},yl=e=>(t,n)=>{let r=Math.round(e*n),i=Ic(r,t),a=new Float32Array(r),o=t=>Math.round(t*e)/e;for(let s=0;s<6;s++){let s=o(Y(t,3800,6200)),c=o(Y(t,90,170)),l=o(Y(t,.3,1.2)),u=t(),d=1+Math.floor(t()*3),f=t(),p=Y(t,.4,1),m=t()<.5,h=s*.01/(xc*l);for(let t=0;t<r;t+=64){let o=.3+.7*(.5-.5*jc(t/n*d/e+f+.25)),g=p*o*Math.sqrt(o),_=Math.min(r,t+64);for(let e=t;e<_;e++){let t=e/n,r=.5+.5*jc(c*t),o=r*r,d=m?o*o:o*r,f=s*t-h*jc(l*t+u+.25);a[e]+=g*d*(jc(f)+.35*i[e])}}}return Fc(a,new Pc(`bp`,n,4800,.8),!0),Fc(a,new Pc(`lp`,n,7500,.7),!0),[a]},bl=(e,t)=>{let n=new Float32Array(Math.floor(t*2.2)),r=4+Math.floor(e()*6),i=Y(e,5,7),a=Y(e,150,230),o=Y(e,1300,1800),s=.02;for(let o=0;o<r;o++){let c=.55/i,l=.5+.5*Math.sin(Math.PI*(o+.5)/r),u=Math.floor(c*a);for(let r=0;r<u;r++){let i=r/u,o=Math.round((s+r/a)*t);n[o]+=l*Math.sin(Math.PI*i)*(1+.2*(e()-.5))}s+=1/i}let c=Fc(n.slice(),new Pc(`bp`,t,o,6)),l=Fc(n.slice(),new Pc(`bp`,t,o*Y(e,1.7,1.9),6)),u=Fc(n.slice(),new Pc(`bp`,t,420,2));for(let e=0;e<n.length;e++)n[e]=c[e]+.6*l[e]+.3*u[e];return il(n,t)};function xl(e,t){let n=Array.from({length:4},()=>({m:2+Math.floor(e()*8),p:e(),a:Y(e,.5,1)})),r=n.reduce((e,t)=>e+t.a,0),i=Math.round(t*200),a=new Float32Array(i+1);for(let e=0;e<=i;e++){let t=0;for(let r of n)t+=r.a*(.5+.5*jc(r.m*e/i+r.p));a[e]=(t/r)**2.2}return e=>{let n=(e/t%1+1)%1*i,r=n|0;return a[r]+(a[r+1]-a[r])*(n-r)}}var Sl=e=>(t,n)=>{let r=Math.round(e*n),i=new Float32Array(r),a=xl(t,e),o=Math.floor(70*e);for(let s=0;s<o;s++){let o=t()*e;if(t()>a(o)*1.6)continue;let s=Math.floor(Y(t,.004,.03)*n),c=s/3,l=t()**2,u=Math.floor(o*n),d=Math.exp(-1/c),f=l;for(let e=0;e<s;e++)i[(u+e)%r]+=f*(t()*2-1)*(e<20?e/20:1),f*=d}for(let e=0;e<r;e++)i[e]+=.1*(t()*2-1)*a(e/n);return Fc(i,new Pc(`hp`,n,1500,.7),!0),Fc(i,new Pc(`lp`,n,9e3,.7),!0),[i]},Cl=e=>(t,n)=>{let r=Math.round(e*n),i=Ic(r,t);Fc(i,new Pc(`lp`,n,550,.9),!0),Fc(i,new Pc(`lp`,n,900,.7),!0);let a=xl(t,e),o=new Float32Array(r);for(let e=0;e<r;e++)o[e]=i[e]*2.2*(.35+.65*a(e/n));let s=(e,i,a,s)=>{let c=.043*e+.0014*e**1.5,l=Math.floor(Math.min(.15,5/c)*n),u=Math.floor(s*n),d=t(),f=i,p=Math.exp(-c/n),m=5e-4*n;for(let t=0;t<l;t++)d+=e*(1+a*c*t/n)/n,o[(u+t)%r]+=f*(t<m?t/m:1)*jc(d),f*=p},c=Math.floor(24*e);for(let n=0;n<c;n++){let n=t()*e,r=Math.exp(Y(t,Math.log(350),Math.log(2200)));s(r,Y(t,.1,1)**2*Math.sqrt(700/r)*(.4+.8*a(n))*.5,Y(t,.05,.25),n)}for(let n=0;n<3*e;n++)s(Y(t,2e3,3800),Y(t,.05,.18),Y(t,.1,.3),t()*e);return Fc(o,new Pc(`hp`,n,120,.7),!0),Fc(o,new Pc(`lp`,n,6e3,.7),!0),[o]},wl=(e,t)=>{let n=Y(e,2300,3e3),r=[[1,1,1.4],[1.0027*Y(e,.9995,1.0005),.6,1.5],[2.41*Y(e,.995,1.005),.32,.8],[2.425*Y(e,.995,1.005),.2,.75],[4.08*Y(e,.99,1.01),.16,.4],[5.95*Y(e,.99,1.01),.08,.22],[8.1*Y(e,.99,1.01),.04,.12]],i=1+Math.floor(e()*3.2),a=[],o=.01;for(let t=0;t<i;t++)a.push([o,t===0?Y(e,.7,1):Y(e,.3,.9)]),o+=Y(e,.25,.8);let s=a[a.length-1][0]+3.2,c=new Float32Array(Math.floor(s*t));for(let[i,o]of a){for(let[a,s,l]of r)Jc(c,t,i,n*a,o*s,l,e(),4e-4);let a=Math.floor(i*t),s=Math.floor(.002*t);for(let n=0;n<s;n++)c[a+n]+=(e()*2-1)*.12*o*Math.exp(-n/(4e-4*t))}let l=Math.floor(.6*t);for(let e=0;e<l;e++)c[c.length-1-e]*=e/l;return Hc([c])},Tl=(e,t)=>{let n=Y(e,118,136),r=[[.5,.55,7.5],[.503,.35,7],[1,.8,5],[1.012,.5,5],[1.63,.4,3.2],[2.34,.3,2.2],[2.97,.22,1.5],[3.9,.15,.9],[5.1,.1,.5],[6.4,.06,.3]],i=new Float32Array(Math.floor(12*t));for(let[a,o,s]of r)Jc(i,t,.02,n*a,o,s,e(),.006);let a=new Pc(`lp`,t,300,.7),o=Math.floor(.12*t),s=Math.floor(.02*t);for(let n=0;n<o;n++)i[s+n]+=a.run((e()*2-1)*.6*Math.exp(-n/(.03*t)));let c=Math.floor(1.5*t);for(let e=0;e<c;e++)i[i.length-1-e]*=e/c;return Hc([i])},El=e=>(t,n)=>{let r=new Float32Array(Math.floor(.7*n));for(let[i,a,o]of[[1,1,.25],[2,.5,.18],[2.76,.45,.14],[4.1,.2,.08],[5.4,.12,.05]])Jc(r,n,.002,e*i,a,o,t(),.001);return il(r,n)},Dl=(e,t)=>{let n=new Float32Array(Math.floor(.3*t));return Gc(n,t,0,.12,e=>Ec(75,45,e),Kc(.04,2),[1,.3]),Jc(n,t,.002,Y(e,900,1300),.25,.02,e()),il(n,t)},Ol=.09,kl=0,Al=.05,jl=.16,Ml=class extends rl{gL;gR;bpL;bpR;buffet;grass;rustle;rustleSrc=null;constructor(e){super(e),e.loopBank(`rustle`,2,Xc,Sl(9));let t=e.loop(e.pinkSt),n=this.ctx.createChannelSplitter(2),r=this.ctx.createChannelMerger(2);t.connect(this.filter(`highpass`,1500,.7)).connect(this.filter(`highpass`,1500,.7)).connect(n),this.bpL=this.filter(`bandpass`,500,.7),this.bpR=this.filter(`bandpass`,520,.7),this.gL=this.gain(),this.gR=this.gain(),n.connect(this.bpL,0).connect(this.gL).connect(r,0,0),n.connect(this.bpR,1).connect(this.gR).connect(r,0,1),r.connect(this.out),this.buffet=new el(this.gain(),this.out),e.loop(e.brown).connect(this.filter(`lowpass`,160,.7)).connect(this.buffet.g),this.grass=this.gain(),e.loop(e.pinkSt,.93).connect(this.filter(`bandpass`,2600,.6)).connect(this.grass).connect(this.out);let i=this.gain(1);i.connect(this.out),this.rustle=new el(this.gain(),i),this.wet.gain.value=.08,this.grass.connect(this.wet),i.connect(this.wet)}events(){!this.rustleSrc&&this.kit.has(`rustle`)&&(this.rustleSrc=this.kit.loop(this.kit.get(`rustle`)[0]),this.rustleSrc.connect(this.rustle.g))}params(e,t,n){let r=Tc(t.speed/10,0,1.4),i=.2+.8*n.gust,a=Math.min(r,.7)/.7,o=.35*a,s=Tc(t.steer*.35+(Nc(e/13,5)-.5)*.6,-.6,.6),c=Ol*(.55*i+o);$c(this.gL.gain,c*(1-s*.5),e,.15),$c(this.gR.gain,c*(1+s*.5),e,.15),nl(this.bpL.frequency,2400+600*i+500*o+300*(Nc(e/3.1,7)-.5),e,.2),nl(this.bpR.frequency,2500+600*i+500*o+300*(Nc(e/2.7,8)-.5),e,.2),this.buffet.set(kl*n.turb*Oc(.25,.4,r),e,.06),$c(this.grass.gain,Al*(.25+.75*n.gust)*(1-.4*t.trees)*(.7+.3*a),e,.3),this.rustle.set(jl*t.trees*(.18+.82*n.gust**1.3)*(.85+.2*a),e,.35),this.rustleSrc&&$c(this.rustleSrc.playbackRate,.96+.08*Nc(e/11,9),e,.5)}},Nl=.025,Pl=0,Fl=.12,Il=.1,Ll=.06,Rl=.05,zl=class extends rl{bed;valley;far;nextFurin=0;nextTemple=0;nextCross=0;constructor(e){super(e),e.bank(`furin`,4,Xc,wl),e.bank(`temple`,1,16e3,Tl),e.bank(`crossA`,1,Xc,El(735)),e.bank(`crossB`,1,Xc,El(702)),e.bank(`clack`,3,Xc,Dl),this.bed=this.gain(),e.loop(e.brown).connect(this.filter(`highpass`,55,.7)).connect(this.filter(`lowpass`,260,.6)).connect(this.bed).connect(this.out),this.valley=this.gain(),e.loop(e.pinkSt,.9).connect(this.filter(`bandpass`,150,.8)).connect(this.valley).connect(this.out),this.far=this.filter(`lowpass`,1800,.6),this.far.connect(this.out)}events(e,t,n,r){let i=this.kit.rng;this.nextFurin||(this.nextFurin=e+Y(i,12,28),this.nextTemple=e+(n.evening>=.85?Y(i,40,80):Y(i,80,140)),this.nextCross=e+Y(i,170,280)),e>=this.nextFurin&&(r.gust<.2&&i()<.6?this.nextFurin=e+Y(i,2,6):(this.furin(e+.02,n),this.nextFurin=e+Math.max(8,wc(i,38/(.35+1.3*n.houses))))),e>=this.nextTemple&&(this.temple(e+.02),this.nextTemple=e+(n.evening>=.85?Y(i,80,160):Y(i,200,420))),e>=this.nextCross&&(this.crossing(e+.05),this.nextCross=e+Y(i,280,520))}params(e,t,n){let r=t.evening>=.85?1.45:1;$c(this.bed.gain,Nl*r*(.8+.2*Nc(e/17,31)),e,.5),$c(this.valley.gain,Pl*(.4+.6*n.gust),e,.6)}furin(e,t){let n=this.kit,r=n.pick(`furin`);if(!r)return;let i=Y(n.rng,.2,.55),a=n.rng()<.5?-1:1,o=a*Y(n.rng,.3,.8);n.play(r,e,{gain:Fl*(1-.6*i)*(.7+.3*t.houses),pan:o,panTo:o+a*Tc(t.speed/10,0,1)*.25,rate:Y(n.rng,.97,1.03),dest:this.out,wet:.25+.4*i,wetDest:this.wet})}temple(e){let t=this.kit.pick(`temple`);t&&this.kit.play(t,e,{gain:Il,pan:Y(this.kit.rng,-.6,.6),dest:this.far,wet:.8,wetDest:this.wet})}crossing(e){let t=this.kit,n=t.pick(`crossA`),r=t.pick(`crossB`);if(!n||!r)return;let i=Y(t.rng,-.7,.7),a=Math.floor(Y(t.rng,18,26));for(let o=0;o<a;o++){let s=Math.sin(Math.PI*(o+.5)/a)**.7;t.play(o%2?r:n,e+o*.52,{gain:Ll*s,pan:i,dest:this.far,wet:.5,wetDest:this.wet})}let o=e+a*.52*.3,s=Y(t.rng,7,10),c=this.ctx,l=t.loop(t.brown),u=this.filter(`lowpass`,380,.7),d=this.gain(),f=c.createStereoPanner();f.pan.setValueAtTime(Tc(i-.3,-1,1),o),f.pan.linearRampToValueAtTime(Tc(i+.3,-1,1),o+s),d.gain.setValueAtTime(0,o),d.gain.linearRampToValueAtTime(Rl,o+s*.45),d.gain.linearRampToValueAtTime(0,o+s),l.connect(u).connect(d).connect(f).connect(this.far),l.stop(o+s+.1),l.onended=()=>{l.disconnect(),u.disconnect(),d.disconnect(),f.disconnect()};let p=Y(t.rng,.75,.95);for(let e=o+.5;e<o+s-.5;e+=p){let n=Math.sin(Math.PI*(e-o)/s);for(let r of[0,.13]){let a=t.pick(`clack`);a&&t.play(a,e+r,{gain:Rl*.8*n,pan:Tc(i+.6*(e-o)/s-.3,-1,1),dest:this.far,wet:.4,wetDest:this.wet})}}}},Bl=0,Vl=.006,Hl=.012,Ul=.06,Wl=.05,Gl=.06,Kl=.012,ql=.1,Jl=.4,Yl=33,Xl=16,Zl=6,Ql=.1,$l=class extends rl{tyre;tyreLP;hiss;hissBP;tread;whirr;mesh;rub;rubBP;squeal;sq;freeBus;chainBus;fw={phase:0,t:0};ch={phase:.5,t:0};chainN=0;brakeWas=0;squealAmt=0;squealF=2e3;nextBump=-1;lastBump=-1;lastBell=-1;dist=0;constructor(e){super(e);let t=e.ctx.sampleRate;e.bank(`fw`,8,t,al,!0),e.bank(`chain`,6,t,ol(!1),!0),e.bank(`chainAcc`,3,t,ol(!0),!0),e.bank(`rattle`,5,Xc,sl),e.bank(`bell`,2,Xc,ll(!1)),e.bank(`tink`,2,Xc,ll(!0)),this.tread=this.osc(1);let n=this.gain(.16);this.tread.connect(n);let r=this.gain(1);n.connect(r.gain),this.tyreLP=this.filter(`lowpass`,300,.6);let i=e.loop(e.pink),a=e.loop(e.white);this.tyre=new el(this.gain(),this.out),i.connect(r).connect(this.filter(`highpass`,90,.7)).connect(this.tyreLP).connect(this.tyre.g),this.hissBP=this.filter(`bandpass`,3e3,.7),this.hiss=new el(this.gain(),this.out),a.connect(this.hissBP).connect(this.hiss.g),this.mesh=this.osc(30);let o=this.gain(.6);this.mesh.connect(o);let s=this.gain(.6);o.connect(s.gain),this.whirr=new el(this.gain(),this.out),a.connect(this.filter(`bandpass`,3200,1.2)).connect(s).connect(this.whirr.g),this.rubBP=this.filter(`bandpass`,2e3,1.1);let c=this.gain(1);n.connect(c.gain),this.rub=new el(this.gain(),this.out),i.connect(this.rubBP).connect(c).connect(this.rub.g),this.sq=this.osc(2e3);let l=this.osc(5.3),u=this.gain(9);l.connect(u).connect(this.sq.frequency),this.squeal=new el(this.gain(),this.out),this.sq.connect(this.filter(`lowpass`,3500,.5)).connect(this.squeal.g),this.freeBus=this.gain(),this.freeBus.connect(this.filter(`highpass`,1500,.6)).connect(this.out),this.chainBus=this.gain(),this.chainBus.connect(this.filter(`highpass`,1200,.6)).connect(this.filter(`lowpass`,5e3,.6)).connect(this.out),this.wet.gain.value=.04,this.out.connect(this.wet)}events(e,t,n){this.dist+=n.speed*t;let r=e+Ql,i=this.kit;this.clicks(this.fw,n.wheel*Xl*+(n.speed>.25),e,r,e=>{let t=i.pick(`fw`);t&&i.fire(t,e,this.freeBus,Y(i.rng,.97,1.03))}),this.clicks(this.ch,n.crank*Zl*+(n.pedal>.05),e,r,e=>{let t=i.pick(this.chainN++%3==0?`chainAcc`:`chain`);t&&i.fire(t,e+Y(i.rng,0,.004),this.chainBus)}),n.bump>.05&&this.bump(e+.01,n.bump,n);let a=Tc(n.speed/10,0,1.2);this.nextBump<0&&(this.nextBump=e+Y(i.rng,4,9)),e>=this.nextBump&&(n.speed>1.5&&this.bump(e+.02,Y(i.rng,.2,.55)*(.6+n.roughness),n),this.nextBump=e+Math.min(40,2+wc(i.rng,1/Math.max(.025,(.05+.25*n.roughness)*a)))),n.brake>.3&&this.brakeWas<=.3&&(this.squealAmt=i.rng()<.5?Y(i.rng,.35,1):0,this.squealF=Y(i.rng,1750,2350)),this.brakeWas=n.brake}params(e,t){let n=Tc(t.speed/10,0,1.4),r=.85+.3*Nc(this.dist/7,3);this.tyre.set(Bl*n**1.2*r*(1+.4*t.roughness),e,.08),nl(this.tyreLP.frequency,220+900*n,e,.1),this.hiss.set(Vl*Math.min(n,.7)/.7,e,.15),nl(this.hissBP.frequency,5500,e,.1),nl(this.tread.frequency,Math.max(.05,t.wheel),e,.05);let i=Tc(t.crank/1.2,0,1);this.whirr.set(Hl*t.pedal*i,e,.08),nl(this.mesh.frequency,Math.max(1,t.crank*Yl),e,.05),$c(this.chainBus.gain,Ul*t.pedal*Tc(t.crank/.5,0,1),e,.05);let a=1-t.pedal;$c(this.freeBus.gain,Wl*a*a*Oc(.2,1.5,t.speed)*(1-.7*t.brake),e,.05);let o=Oc(.2,3,t.speed);this.rub.set(Gl*t.brake*o*(.6+.4*n),e,t.brake>0?.05:.03),nl(this.rubBP.frequency,1300+1500*n,e,.1),this.squeal.set(Kl*this.squealAmt*t.brake*Oc(1,3.5,t.speed),e,t.brake>.3?.15:.04),$c(this.sq.frequency,this.squealF*(.9+.1*n),e,.2)}bump(e,t,n){if(e-this.lastBump<.15)return;this.lastBump=e;let r=this.kit,i=r.pick(`rattle`),a=Tc(n.speed/10,0,1.2);i&&r.play(i,e,{gain:ql*Tc(t,0,1.5)*(.35+.65*a),pan:Y(r.rng,-.12,.12),rate:Y(r.rng,.93,1.07),dest:this.out});let o=r.pick(`tink`);o&&r.rng()<.25&&r.play(o,e+.012,{gain:.02*t,pan:.05,dest:this.out})}ringBell(e){if(e-this.lastBell<.35)return;this.lastBell=e;let t=this.kit.pick(`bell`);t&&this.kit.play(t,e,{gain:Jl,pan:.06,rate:Y(this.kit.rng,.985,1.015),dest:this.out,wet:1.5,wetDest:this.wet})}clicks(e,t,n,r,i){if(e.t<n&&(e.t=n),t<.2)e.t=r;else for(let n=0;n<64;n++){let n=e.t+(1-e.phase)/t;if(n>r){e.phase=Math.min(.999,e.phase+(r-e.t)*t),e.t=r;return}i(n),e.phase=0,e.t=n}}};function eu(e,t,n){return{gain:n*Ec(1,.3,t),dest:t>.5?e.far:e.out,wet:Ec(.15,.7,t),wetDest:e.wet}}var tu=.04,nu=.055,ru=.04,iu=class extends rl{far;sheets=[];nextCall=0;nextMin=0;answers=[];slots=[{pan:-.8,d:.8},{pan:-.3,d:.95},{pan:.35,d:.7},{pan:.85,d:.85},{pan:.05,d:1}];constructor(e){super(e),e.loopBank(`chorus`,2,24e3,yl(9)),e.bank(`higurashi`,5,Xc,_l),e.bank(`minmin`,2,Xc,vl),this.far=this.filter(`lowpass`,5200,.6),this.far.connect(this.out)}events(e,t,n){let r=this.kit,i=r.rng;if(!this.sheets.length&&r.has(`chorus`)){let e=r.get(`chorus`)[0];for(let[t,n,i]of[[1,-.35,41],[.987,.35,42]]){let a=this.gain(),o=this.ctx.createStereoPanner();o.pan.value=n,r.loop(e,t).connect(a).connect(o).connect(this.out),o.connect(this.gain(.45)).connect(this.wet),this.sheets.push({g:a,seed:i})}}if(this.nextCall||(this.nextCall=e+Y(i,3,6),this.nextMin=e+Y(i,30,70)),n.evening>=.85)this.answers.length=0,this.nextCall=e+10,this.nextMin=e+100;else{e>=this.nextCall&&(this.nextCall=this.call(e+.02,Math.floor(i()*this.slots.length))?e+wc(i,Ec(26,10,n.evening))+2:e+1);for(let t=this.answers.length-1;t>=0;t--){let n=this.answers[t];e>=n.t&&(this.answers.splice(t,1),this.call(e+.02,n.slot,n.left))}e>=this.nextMin&&(this.minmin(e+.02),this.nextMin=e+Y(i,40,90)/(1.2-.6*n.evening))}}minmin(e){let t=this.kit,n=t.pick(`minmin`);n&&t.play(n,e,{...eu(this,Y(t.rng,.5,.9),ru),pan:Y(t.rng,-.8,.8),rate:Y(t.rng,.97,1.03)})}call(e,t,n=2){let r=this.kit,i=r.pick(`higurashi`);if(!i)return!1;let a=this.slots[t%this.slots.length];if(r.play(i,e,{...eu(this,a.d,nu),pan:a.pan+Y(r.rng,-.1,.1),rate:Y(r.rng,.97,1.03)}),n>0&&r.rng()<.65){let i=Math.floor(r.rng()*this.slots.length);i===t&&(i=(i+1)%this.slots.length),this.answers.push({t:e+Y(r.rng,1.5,4.5),slot:i,left:n-1})}return!0}params(e,t){let n=t.evening>=.85?0:1-.3*t.evening;for(let t of this.sheets){let r=.3+.7*Nc(e/19,t.seed)**1.3;$c(t.g.gain,tu*r*n,e,1.2)}}},au=.1,ou=[`chirp`,`chirp`,`warble`,`warble`,`trill`,`trill`,`whistle`],su=class extends rl{far;birds=[];nextUguisu=0;uguisuLeft=0;nextKite=0;nextCrow=0;constructor(e){super(e),e.bank(`chirp`,5,Xc,ul),e.bank(`warble`,5,Xc,fl),e.bank(`trill`,4,Xc,dl),e.bank(`whistle`,3,Xc,pl),e.bank(`uguisu`,2,Xc,ml),e.bank(`kite`,2,Xc,hl),e.bank(`crow`,2,Xc,gl),this.far=this.filter(`lowpass`,3200,.6),this.far.connect(this.out),this.wet.gain.value=1}spawn(e,t){let n=this.kit.rng,r=Cc(n,ou);return{kind:r,pan:Y(n,-.9,.9),d:r===`whistle`?Y(n,.5,1):Y(n,.2,1),rate:Y(n,.92,1.08),next:e+(t?Y(n,.8,6):Y(n,3,10)),left:2+Math.floor(n()*5),buf:null}}events(e,t,n){let r=this.kit,i=r.rng;if(!this.birds.length){for(let t=0;t<5;t++)this.birds.push(this.spawn(e,!0));this.nextUguisu=e+Y(i,20,50),this.nextKite=e+Y(i,40,90),this.nextCrow=e+Y(i,30,80)}let a=n.evening>=.85;if(!a){let t=.55+.9*Nc(e/40,51),a=Tc(n.speed/10,0,1.2);for(let n=0;n<this.birds.length;n++){let o=this.birds[n];if(e<o.next)continue;if(o.buf??=r.pick(o.kind),!o.buf){o.next=e+1;continue}let s=eu(this,o.d,au*(o.kind===`whistle`?.8:1)),c=o.pan+Math.sign(o.pan||1)*Math.min(.3,a*.25);r.play(o.buf,e+.02,{...s,pan:o.pan,panTo:c,rate:o.rate*Y(i,.985,1.015)}),o.pan=Tc(c,-1,1),o.d=Tc(o.d+a*.08,0,1),--o.left<=0?this.birds[n]=this.spawn(e,!1):o.next=e+(o.buf.duration+Y(i,1.5,6))/t,i()<.25&&(o.buf=null)}if(e>=this.nextUguisu){let t=r.pick(`uguisu`);if(t){let n=this.uguisuLeft>0?.55:Y(i,-.8,.8);r.play(t,e+.02,{...eu(this,Y(i,.35,.6),au*.8),pan:n,rate:Y(i,.98,1.02)}),this.uguisuLeft>0?this.uguisuLeft--:this.uguisuLeft=Math.floor(i()*3),this.nextUguisu=e+(this.uguisuLeft>0?Y(i,7,12):Y(i,45,110))}else this.nextUguisu=e+2}if(e>=this.nextKite){let t=r.pick(`kite`);if(t){let n=Y(i,-.7,.7);r.play(t,e+.02,{...eu(this,Y(i,.75,.95),au*1.05),pan:n,panTo:n+Y(i,-.3,.3),rate:Y(i,.97,1.03)}),this.nextKite=e+Y(i,70,160)}else this.nextKite=e+2}}if(e>=this.nextCrow){let t=r.pick(`crow`);t?(r.play(t,e+.02,{...eu(this,Y(i,.7,.95),au*.85),pan:Y(i,-.9,.9),rate:Y(i,.92,1.03)}),this.nextCrow=e+(a?Y(i,40,95):Y(i,50,130))):this.nextCrow=e+2}}params(){}trigger(e){e===`uguisu`?this.nextUguisu=0:e===`kite`?this.nextKite=0:this.nextCrow=0}},cu=.22,lu=.3,uu=class extends rl{far;g;lp;pan;src=null;nextFrog=0;constructor(e){super(e),e.loopBank(`water`,2,Xc,Cl(10)),e.bank(`frog`,3,Xc,bl),this.lp=this.filter(`lowpass`,3e3,.6),this.pan=this.ctx.createStereoPanner(),this.g=new el(this.gain(),this.lp),this.lp.connect(this.pan).connect(this.out),this.pan.connect(this.gain(.3)).connect(this.wet),this.far=this.filter(`lowpass`,2400,.6),this.far.connect(this.out)}events(e,t,n){let r=this.kit;!this.src&&r.has(`water`)&&(this.src=r.loop(r.get(`water`)[0]),this.src.connect(this.g.g)),this.nextFrog||=e+Y(r.rng,8,20),e>=this.nextFrog&&(this.frog(e+.02,n),this.nextFrog=e+Math.max(6,wc(r.rng,40/(.25+n.water))))}frog(e,t){let n=this.kit,r=n.pick(`frog`);r&&n.play(r,e,{...eu(this,Y(n.rng,.55,.95),lu*(.5+.5*t.water)),pan:Y(n.rng,-.9,.9),rate:Y(n.rng,.92,1.08)})}params(e,t){let n=t.water;this.g.set(cu*n**1.4,e,.6),nl(this.lp.frequency,900+4500*n,e,.6),$c(this.pan.pan,Tc((Nc(e/23,61)-.5)*1.6,-.8,.8),e,1),this.src&&$c(this.src.playbackRate,.95+.1*Nc(e/9,62),e,.8)}},du=.32;function fu(e,t){let n=Math.floor(t*.16),r=new Float32Array(n),i=new Pc(`bp`,t,Y(e,1500,2100),1.1),a=new Pc(`lp`,t,2600,.7),o=Y(e,80,105),s=Y(e,.022,.034);for(let c=0;c<n;c++){let n=c/t,l=Math.exp(-n/.009),u=n>s?Math.exp(-(n-s)/.03)*.35:0,d=e()*2-1;r[c]=i.run(d)*l*.9+a.run(d)*u*.5+Math.sin(2*Math.PI*o*n)*Math.exp(-n/.025)*.5}return Hc([r],.8)}function pu(e,t){let n=Math.floor(t*.32),r=new Float32Array(n),i=new Pc(`hp`,t,1400,.7),a=new Pc(`bp`,t,Y(e,3e3,4200),.8),o=Y(e,60,80),s=Y(e,.1,.16);for(let c=0;c<n;c++){let n=c/t,l=Math.min(1,n/.015)*Math.exp(-n/s),u=e()*2-1,d=e()<.004*l?(e()*2-1)*2.2:0;r[c]=a.run(i.run(u))*l*.9+d*l+Math.sin(2*Math.PI*o*n)*Math.exp(-n/.03)*.35}return Hc([r],.7)}function mu(e,t){let n=Math.floor(t*.22),r=new Float32Array(n),i=new Pc(`bp`,t,Y(e,1100,1600),.9),a=Y(e,70,90),o=0,s=0;for(let c=0;c<n;c++){let n=c/t,l=Math.min(1,n/.004)*Math.exp(-n/.055);o--<=0&&(o=Math.floor(t*Y(e,8e-4,.004)),s=e()<.6?Y(e,.3,1):.1);let u=(e()*2-1)*s;r[c]=i.run(u)*l+Math.sin(2*Math.PI*a*n)*Math.exp(-n/.028)*.45}return Hc([r],.8)}var hu=class{kit;dest;wet;lastPan=.06;constructor(e,t,n){this.kit=e,this.dest=t,this.wet=n,e.bank(`step-asphalt`,6,Xc,fu),e.bank(`step-grass`,6,Xc,pu),e.bank(`step-dirt`,6,Xc,mu)}play(e,t,n){let r=this.kit.pick(`step-${t}`);if(!r)return;this.lastPan=-this.lastPan;let i=Math.max(0,Math.min(1.5,n));this.kit.play(r,e,{gain:du*i,pan:this.lastPan,rate:Y(this.kit.rng,.93,1.07),dest:this.dest,wet:.35,wetDest:this.wet})}},gu=[`bike`,`wind`,`cicadas`,`birds`,`water`,`ambience`],_u=1/30,vu=class{ctx;kit;layers;output;bike;birds;cicadas;water;amb;steps;volume;mix;verbIn;routed=new Set;lazy;lastParams=-1;dist=0;state={speed:0,crank:0,wheel:0,pedal:0,brake:0,steer:0,bump:0,roughness:.25,water:.5,trees:.5,houses:.3,evening:.65};constructor(e,t,n={}){this.ctx=e,this.lazy=n.lazy??!1;let r=this.kit=new Zc(e,n.seed??Math.random()*2**31|0),i=this.mix=e.createGain(),a=e.createBiquadFilter();a.type=`highpass`,a.frequency.value=35,a.Q.value=.6;let o=e.createBiquadFilter();o.type=`lowshelf`,o.frequency.value=180,o.gain.value=1.5;let s=e.createBiquadFilter();s.type=`highshelf`,s.frequency.value=8500,s.gain.value=-2;let c=e.createDynamicsCompressor();c.threshold.value=-20,c.knee.value=10,c.ratio.value=2.5,c.attack.value=.03,c.release.value=.3,this.volume=e.createGain(),this.volume.gain.value=1;let l=e.createDynamicsCompressor();l.threshold.value=-4,l.knee.value=0,l.ratio.value=20,l.attack.value=.001,l.release.value=.1;let u=e.createWaveShaper();u.curve=yu(),i.connect(a).connect(o).connect(s).connect(c).connect(this.volume).connect(l).connect(u).connect(t),this.output=u;let d=e.createBiquadFilter();d.type=`highpass`,d.frequency.value=220;let f=e.createConvolver();f.normalize=!1,r.defer(`reverb`,()=>f.buffer=r.buffer(Yc(e.sampleRate,r.rng,2.2,1.9),e.sampleRate));let p=e.createGain();p.gain.value=.9,d.connect(f).connect(p).connect(i),this.verbIn=d,this.bike=new $l(r),this.cicadas=new iu(r),this.birds=new su(r),this.water=new uu(r),this.amb=new zl(r),this.layers={bike:this.bike,wind:new Ml(r),cicadas:this.cicadas,birds:this.birds,water:this.water,ambience:this.amb},this.steps=new hu(r,i,d),this.solo(null),this.lazy||r.pump(1/0)}tick(e,t,n){this.lazy&&this.kit.pending&&this.kit.pump(4),t=Tc(Number.isFinite(t)?t:0,0,.1);let r=this.state,i=(e,t,n=0,r=1)=>e===void 0||!Number.isFinite(e)?t:Tc(e,n,r);r.speed=i(n.speed,0,0,40),r.crank=i(n.crank,0,0,10),r.wheel=i(n.wheel,r.speed/(2*Math.PI*.34),0,20),r.pedal=i(n.pedal,0),r.brake=i(n.brake,0),r.steer=i(n.steer,0,-1,1),r.bump=i(n.bump,0,0,2),r.roughness=i(n.roughness,.25),this.dist+=r.speed*t;let a=this.dist;r.water=i(n.water,Tc(.15+1.1*(Nc(a/55,11)-.3),0,1)),r.trees=i(n.trees,Tc(.2+.9*Nc(a/70,12),0,1)),r.houses=i(n.houses,Tc(-.1+1.2*Nc(a/90,13),0,1)),r.evening=i(n.evening,.65);let o={gust:Oc(.3,.85,.55*Nc(e/9,21)+.45*Nc(e/23,22)),turb:Nc(e*3.3,23)};for(let n of gu)this.layers[n].events(e,t,r,o);if(this.lastParams<0||e-this.lastParams>=_u||e<this.lastParams){this.lastParams=e;for(let t of gu)this.layers[t].params(e,r,o)}}setVolume(e,t,n=.08){this.volume.gain.cancelScheduledValues(t),this.volume.gain.setTargetAtTime(Tc(e,0,2),t,n)}solo(e){for(let t of gu){let n=this.layers[t],r=e===null||t===e;r!==this.routed.has(t)&&(r?(n.out.connect(this.mix),n.wet.connect(this.verbIn),this.routed.add(t)):(n.out.disconnect(this.mix),n.wet.disconnect(this.verbIn),this.routed.delete(t)))}}ringBell(e){this.bike.ringBell(e)}bump(e,t){this.bike.bump(e,t,this.state)}footstep(e,t,n){this.steps.play(e,t,n)}trigger(e,t){let n=this.state;switch(e){case`bell`:return this.bike.ringBell(t);case`bump`:return this.bike.bump(t,.8,n);case`furin`:return this.amb.furin(t,n);case`temple`:return this.amb.temple(t);case`crossing`:return this.amb.crossing(t);case`uguisu`:case`kite`:case`crow`:return this.birds.trigger(e);case`frog`:return this.water.frog(t,n);case`higurashi`:this.cicadas.call(t,0);return;case`minmin`:return this.cicadas.minmin(t)}}};function yu(){let e=2048,t=new Float32Array(e);for(let n=0;n<e;n++){let e=n/2047*2-1,r=Math.abs(e);t[n]=r<.8?e:Math.sign(e)*(.8+.18*Math.tanh((r-.8)/.18))}return t}var bu=`ghibli-ride:audio`,xu=2.5,Su=class{ctx=null;engine=null;vol=.8;mute=!1;hideTimer=0;onVis=()=>this.visibility();constructor(){try{let e=JSON.parse(localStorage.getItem(bu)??`{}`);typeof e.volume==`number`&&Number.isFinite(e.volume)&&(this.vol=Math.min(1,Math.max(0,e.volume))),typeof e.muted==`boolean`&&(this.mute=e.muted)}catch{}}get state(){return this.ctx?this.ctx.state:`off`}get muted(){return this.mute}get volume(){return this.vol}get context(){return this.ctx}start(){if(this.ctx){this.ctx.state===`suspended`&&!document.hidden&&this.ctx.resume();return}let e=window.AudioContext??window.webkitAudioContext;if(!e)return;let t=new e({latencyHint:`interactive`});this.ctx=t,this.engine=new vu(t,t.destination,{lazy:!0}),this.engine.setVolume(0,t.currentTime,.01),this.applyVolume(xu/3),document.addEventListener(`visibilitychange`,this.onVis),t.state===`suspended`&&t.resume()}update(e,t,n,r,i,a,o){let s=this.ctx;s&&this.engine&&s.state===`running`&&this.engine.tick(s.currentTime,e,{speed:t,crank:n,wheel:r,pedal:i,brake:typeof a==`number`?a:+!!a,...o})}ringBell(){this.start(),this.ctx&&this.engine&&this.engine.ringBell(this.ctx.currentTime+.01)}bump(e=.6){this.ctx&&this.engine&&this.engine.bump(this.ctx.currentTime+.01,e)}footstep(e,t=.8){this.ctx&&this.engine&&this.engine.footstep(this.ctx.currentTime+.005,e,t)}trigger(e){this.ctx&&this.engine&&this.engine.trigger(e,this.ctx.currentTime+.02)}setMasterVolume(e){this.vol=Math.min(1,Math.max(0,Number.isFinite(e)?e:this.vol)),this.applyVolume(),this.save()}setMuted(e){this.mute=e,this.applyVolume(),this.save()}setPaused(e){this.ducked=e,this.applyVolume(.13)}toggleMute(){return this.setMuted(!this.mute),this.mute}bindKeys(e=window){let t=e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey)return;let t=e.target;(!t||t.tagName!==`INPUT`&&t.tagName!==`TEXTAREA`&&!t.isContentEditable)&&(e.code===`KeyB`?this.ringBell():e.code===`KeyM`&&(this.start(),this.toggleMute()))};return e.addEventListener(`keydown`,t),()=>e.removeEventListener(`keydown`,t)}dispose(){document.removeEventListener(`visibilitychange`,this.onVis),clearTimeout(this.hideTimer),this.ctx?.close(),this.ctx=null,this.engine=null}ducked=!1;applyVolume(e=.08){this.ctx&&this.engine&&this.engine.setVolume(this.mute?0:this.ducked?this.vol*.03:this.vol,this.ctx.currentTime,e)}save(){try{localStorage.setItem(bu,JSON.stringify({volume:this.vol,muted:this.mute}))}catch{}}visibility(){let e=this.ctx;e&&this.engine&&(clearTimeout(this.hideTimer),document.hidden?(this.engine.setVolume(0,e.currentTime,.04),this.hideTimer=window.setTimeout(()=>void e.suspend(),250)):e.resume().then(()=>this.applyVolume(.3)))}},Cu={sky:`summoning the midnight mist…`,trees:`shadowing the twisted cedars…`,grass:`withering the roadside weeds…`,rice:`deepening the silent paddies…`,houses:`shuttering the abandoned houses…`,poles:`cutting the power lines…`,road:`weathering the lonely road…`,rider:`lighting the bicycle headlamp…`,paint:`mixing charcoal and moonlight…`,cicadas:`listening to the darkness…`},wu=1.15,Tu=class{progress=0;el;spans;cur=0;stage=null;lastSwap=0;pendingText=null;go=null;reduced=matchMedia(`(prefers-reduced-motion: reduce)`).matches;constructor(e){this.el=document.getElementById(`loader`),this.spans=this.el?[...this.el.querySelectorAll(`.lines span`)]:[],this.el&&(this.lastSwap=performance.now(),addEventListener(`keydown`,this.onKey,!0),addEventListener(`keyup`,this.swallow,!0),addEventListener(`pointerdown`,this.onPointer,!0),addEventListener(`resize`,this.onResize),e&&(this.el.style.cursor=`progress`))}advance(e,t){this.progress=Math.min(1,this.progress+e),this.el?.style.setProperty(`--p`,this.progress.toFixed(4)),t===this.stage?this.flush():(this.stage=t,this.say(Cu[t]))}ready(e){if(this.progress=1,!this.el)return e(!1);this.el.style.setProperty(`--p`,`1`),this.go=e,this.el.classList.add(`go`),this.pendingText=null,this.show(`tap or click to enter the darkness`,!0);let t=this.el.querySelector(`.hint`),n=new URLSearchParams(location.search).has(`autoplay`);t&&!n&&(t.innerHTML=`ontouchstart`in window||navigator.maxTouchPoints>0||window.innerWidth<=1024?`<b>Left Joystick</b> steer & pedal &nbsp;·&nbsp; <b>Right Swipe</b> look &nbsp;·&nbsp; <b>Touch Buttons</b> ride, brake & sprint`:`<b>WASD</b> walk &nbsp;·&nbsp; <b>Shift</b> lurch/sprint &nbsp;·&nbsp; <b>Mouse</b> look &nbsp;·&nbsp; <b>F</b> mount bike &nbsp;·&nbsp; <b>Esc</b> pause`)}dissolve(){let e=this.el;if(!e)return;this.detach(),e.style.pointerEvents=`none`,e.style.background=`transparent`;let t=e.querySelector(`#stage`),n=e.querySelector(`#grain`);for(let t of e.querySelectorAll(`.mote,.petal,.fly`))t.style.transition=`opacity 0.5s`,t.style.opacity=`0`;t.style.transition=`opacity 0.5s ease, transform 0.9s ease`,t.style.opacity=`0`,t.style.transform=`translateY(-10px)`;let r=e.querySelector(`#wash`),i=r.getContext(`2d`);if(this.reduced||!i){e.style.transition=`opacity 0.7s ease`,e.style.opacity=`0`,setTimeout(()=>this.remove(),750);return}let a=r.width,o=r.height,s=i.getImageData(0,0,a,o),c=i.createImageData(a,o),l=new Float32Array(a*o),u=a*.5,d=o*.56,f=Math.hypot(a*.5,o*.56),p=384/a;for(let e=0;e<o;e++)for(let t=0;t<a;t++){let n=Ou(t*p/34,e*p/34)*.6+Ou(t*p/9+40,e*p/9)*.18;l[e*a+t]=Math.hypot(t-u,(e-d)*1.25)/f*.72+n*.5}let m=performance.now(),h=s.data,g=c.data,_=()=>{let e=Math.min(1,(performance.now()-m)/1e3/wu),t=e*e*(3-2*e),r=-.1+1.4*t;for(let e=0,t=0;e<l.length;e++,t+=4){let n=(l[e]-r)/.022,i=n<=0?0:n>=1?1:n*n*(3-2*n),a=(l[e]-r)/.05,o=a>0&&a<1?(1-a)*(1-a):0;g[t]=h[t]*(1-o*.1),g[t+1]=h[t+1]*(1-o*.15),g[t+2]=h[t+2]*(1-o*.26),g[t+3]=255*i}i.putImageData(c,0,0),n.style.opacity=String(.55*(1-t)*(1-t)),e<1?requestAnimationFrame(_):this.remove()};requestAnimationFrame(_)}remove(){this.detach(),this.el?.remove()}detach(){removeEventListener(`keydown`,this.onKey,!0),removeEventListener(`keyup`,this.swallow,!0),removeEventListener(`pointerdown`,this.onPointer,!0),removeEventListener(`resize`,this.onResize)}say(e){performance.now()-this.lastSwap<1100?this.pendingText=e:this.show(e)}flush(){if(this.pendingText&&performance.now()-this.lastSwap>=1100){let e=this.pendingText;this.pendingText=null,this.show(e)}}show(e,t=!1){if(this.spans.length<2)return;this.spans[this.cur].classList.remove(`on`),this.cur^=1;let n=this.spans[this.cur];n.style.transition=`none`,n.style.transform=`translateY(5px)`,n.textContent=e,n.classList.toggle(`prompt`,t),n.offsetWidth,n.style.transition=``,n.style.transform=``,n.classList.add(`on`),this.lastSwap=performance.now()}trigger(e){let t=this.go;t&&(this.go=null,t(e))}swallow=e=>e.stopImmediatePropagation();onKey=e=>{e.stopImmediatePropagation(),!(e.ctrlKey||e.metaKey||e.altKey||e.key===`Tab`||e.key===`F5`||e.key===`F11`||e.key===`F12`)&&(e.preventDefault(),e.repeat||this.trigger(!1))};onPointer=e=>{e.stopImmediatePropagation(),e.button===0&&this.trigger(!0)};onResize=()=>{window.__paintWash?.()}};function Eu(e,t){let n=Math.sin(e*127.1+t*311.7)*43758.5453;return n-Math.floor(n)}function Du(e,t){let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r,o=i*i*(3-2*i),s=a*a*(3-2*a),c=Eu(n,r),l=Eu(n+1,r),u=Eu(n,r+1),d=Eu(n+1,r+1);return c+(l-c)*o+(u-c)*s+(c-l-u+d)*o*s}function Ou(e,t){return Du(e,t)*.55+Du(e*2.1+5.2,t*2.1+1.3)*.3+Du(e*4.3+9.1,t*4.3+7.7)*.15}function ku(e,t){if(document.getElementById(`fatal`))return;let n=document.createElement(`div`);n.id=`fatal`,n.setAttribute(`role`,`alert`),n.style.cssText=`position:fixed;inset:0;z-index:100;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:radial-gradient(ellipse at 50% 40%,#f6efdd 0%,#efe3c8 70%,#e6d6b6 100%);color:#2f3944;text-align:center;padding:24px;font-family:"Palatino Linotype",Palatino,Georgia,serif;`;let r=document.createElement(`h2`);r.textContent=e,r.style.cssText=`margin:0;font-weight:400;font-size:28px;letter-spacing:0.08em;`;let i=document.createElement(`p`);i.textContent=t,i.style.cssText=`margin:0;max-width:520px;font-size:16px;line-height:1.6;color:#6d675d;font-style:italic;`;let a=document.createElement(`button`);a.textContent=`Reload`,a.style.cssText=`margin-top:8px;padding:8px 26px;border:1px solid #9a8f7d;border-radius:18px;background:#f8f1e2;color:#2f3944;font:inherit;font-size:15px;letter-spacing:0.12em;cursor:pointer;`,a.addEventListener(`click`,()=>location.reload()),n.append(r,i,a),document.body.appendChild(n),document.pointerLockElement&&document.exitPointerLock()}var Au=.4,ju=.5,Mu=[[`W  S`,`pedal / walk · brake / retreat`],[`A  D`,`steer / turn`],[`Shift`,`sprint`],[`Mouse`,`look around`],[`E`,`check hoarding value & ad rates`],[`F`,`mount · dismount bicycle`],[`C`,`cinematic cameras`],[`V`,`first person`],[`T`,`time of day`],[`B`,`bicycle bell`],[`M`,`mute ambience`]],Nu=class{canvas;hooks;paused=!1;enabled=!1;keyLock=!1;el;escDown=-1;unlockedAt=-1;holdTimer=0;constructor(e,t){this.canvas=e,this.hooks=t,this.el=document.createElement(`div`),this.el.id=`pause`,this.el.setAttribute(`role`,`dialog`),this.el.setAttribute(`aria-label`,`Paused`),this.el.innerHTML=`<div class="pgrain"></div><div class="pcard">
      <div class="ptitle">Techyon</div>
      <div class="phead">Paused</div>
      <div class="prule"></div>
      <dl class="pkeys">${Mu.map(([e,t])=>`<dt>${e}</dt><dd>${t}</dd>`).join(``)}</dl>
      <div class="pgo">tap or click to resume</div>
      <div class="pnote"><b>Esc</b> · <b>Enter</b> · <b>Space</b> also resume &nbsp;—&nbsp; hold <b>Esc</b> to free the mouse</div>
    </div>`,document.body.appendChild(this.el),this.el.addEventListener(`pointerdown`,e=>{e.stopPropagation(),e.button===0&&this.paused&&this.resume(!0)}),addEventListener(`keydown`,this.onKeyDown,!0),addEventListener(`keyup`,this.onKeyUp,!0),addEventListener(`blur`,()=>this.pause()),document.addEventListener(`visibilitychange`,()=>{document.hidden&&this.pause()}),document.addEventListener(`pointerlockchange`,()=>{document.pointerLockElement!==e&&(this.unlockedAt=performance.now())}),document.addEventListener(`fullscreenchange`,()=>{document.fullscreenElement||(this.keyLock=!1)})}async enterFullscreen(){let e=document.documentElement;try{!document.fullscreenElement&&e.requestFullscreen&&await e.requestFullscreen({navigationUI:`hide`});let t=navigator.keyboard;document.fullscreenElement&&t?.lock&&(await t.lock([`Escape`]),this.keyLock=!0)}catch{}}pause(){this.enabled&&!this.paused&&(this.paused=!0,clearTimeout(this.holdTimer),this.el.classList.add(`on`),document.pointerLockElement===this.canvas&&document.exitPointerLock(),document.hasFocus()&&dispatchEvent(new Event(`blur`)),this.hooks.onPause())}resume(e){this.paused&&(this.paused=!1,this.el.classList.remove(`on`),this.hooks.onResume(e))}onKeyDown=e=>{if(this.enabled){if(e.code===`Escape`){if(e.preventDefault(),e.stopImmediatePropagation(),e.repeat||this.escDown>=0)return;this.escDown=performance.now(),this.keyLock&&!this.paused&&(this.holdTimer=window.setTimeout(()=>{this.escDown>=0&&document.pointerLockElement===this.canvas&&document.exitPointerLock()},ju*1e3))}else this.paused&&(e.preventDefault(),e.stopImmediatePropagation(),!e.repeat&&(e.code===`Enter`||e.code===`NumpadEnter`||e.code===`Space`)&&this.resume(!0))}};onKeyUp=e=>{if(!this.enabled||e.code!==`Escape`)return;e.preventDefault(),e.stopImmediatePropagation(),clearTimeout(this.holdTimer);let t=performance.now(),n=this.escDown;n<0&&this.unlockedAt>=0&&t-this.unlockedAt<3e3&&(n=this.unlockedAt),this.escDown=-1,(n>=0?(t-n)/1e3:0)>=Au?this.paused||(document.pointerLockElement===this.canvas&&document.exitPointerLock(),this.hooks.lookHint()):this.paused?this.resume(!1):this.pause()}};async function Pu(e,t,n,r,i,a,o){let s=e.getRenderTarget();e.setRenderTarget(r.mrt),e.compile(t,n),await o();let c=[];t.traverse(e=>{let t=e;t.isMesh&&t.layers.test(i.cam.layers)&&(c.push([t,t.material]),t.material=i.mat)}),e.setRenderTarget(i.rt),e.compile(t,i.cam);for(let[e,t]of c)e.material=t;await o();let u=new ue,d=new w(2,2),f=new Set,p=e=>{e instanceof l&&!f.has(e)&&(f.add(e),u.add(new v(d,e)))};for(let e of r.composer.passes)for(let t of Object.values(e))Array.isArray(t)?t.forEach(p):p(t),p(t?.material);let m=new re(-1,1,1,-1,0,1);e.setRenderTarget(r.composer.renderTarget1),e.compile(u,m),e.setRenderTarget(null),e.compile(u,m),e.setRenderTarget(s),d.dispose();let h=e.info.programs??[],g=()=>h.filter(e=>!e.isReady()).length,_=Math.max(1,h.length);for(let e=g();e>0;e=g())a(1-e/_),await new Promise(e=>setTimeout(e,40));a(1)}async function Fu(e,t,n,r,i,a,o,s){let c=[];t.traverse(e=>{e.frustumCulled&&(e.frustumCulled=!1,c.push(e))});let l=a.map(e=>e.visible),u=e.getRenderTarget();for(let c=0;c<a.length;c++){a.forEach((e,t)=>e.visible=t===c),e.setRenderTarget(r.mrt),e.render(t,n);let l=t.overrideMaterial;t.overrideMaterial=i.mat,e.setRenderTarget(i.rt),e.render(t,i.cam),t.overrideMaterial=l,e.setRenderTarget(u),o(c),await s()}a.forEach((e,t)=>e.visible=l[t]);for(let e of c)e.frustumCulled=!0}var Iu=[`midnight`,`witching`,`bloodmoon`,`dusk`],Lu=(e,t=1)=>{let n=new T(e);return[n.r*t,n.g*t,n.b*t]},Ru=Math.PI/180,zu={midnight:{az:-130,el:26,shadeMin:22,sun:Lu(`#b6dbf8`,.96),shadow:Lu(`#1c2842`,1.45),rim:Lu(`#8eccf4`,2.2),zenith:Lu(`#050816`),mid:Lu(`#0f1b2e`),horizon:Lu(`#1d2b40`),fog:Lu(`#152032`),fogD:.0014,glow:[.45,.6,.75],glowA:.4,glowB:.5,haze:[.16,.24,.32],hazeA:.45,hgl:Lu(`#22384a`),hglA:.4,hglF:8,cTop:[.42,.5,.62],cMid:[.22,.28,.36],cLow:[.12,.16,.22],cRim:[.55,.68,.85],cRimK:.65,cBack:.45,cUnder:[.08,.1,.14],cUnderA:.25,wisp:[.35,.45,.58],disk:[4.2,4.6,5.2],stars:1,night:1,world:[.75,.82,.9],far:[.42,.52,.62],farHaze:.35,glint:.35,grade:[.98,1.02,1.08],sat:1.08,bloomS:.54,bloomR:.68,bloomT:.78,evening:1,birds:0},witching:{az:-155,el:18,shadeMin:18,sun:Lu(`#82a2be`,.55),shadow:Lu(`#090d14`),rim:Lu(`#5a8ca8`,1.45),zenith:Lu(`#020408`),mid:Lu(`#080f16`),horizon:Lu(`#101c24`),fog:Lu(`#0e1820`),fogD:.0022,glow:[.28,.42,.56],glowA:.3,glowB:.4,haze:[.1,.14,.2],hazeA:.48,hgl:Lu(`#14222c`),hglA:.4,hglF:10,cTop:[.16,.22,.28],cMid:[.07,.1,.13],cLow:[.03,.05,.07],cRim:[.36,.48,.62],cRimK:.5,cBack:.35,cUnder:[.04,.05,.08],cUnderA:.2,wisp:[.18,.24,.32],disk:[3.2,3.6,4.2],stars:.85,night:1,world:[.46,.54,.64],far:[.26,.34,.42],farHaze:.45,glint:.2,grade:[.82,.94,1.04],sat:.72,bloomS:.52,bloomR:.65,bloomT:.82,evening:1,birds:0},bloodmoon:{az:-140,el:22,shadeMin:18,sun:Lu(`#c25845`,.65),shadow:Lu(`#140b12`),rim:Lu(`#c84c36`,1.6),zenith:Lu(`#080308`),mid:Lu(`#1a0a14`),horizon:Lu(`#2c1018`),fog:Lu(`#200d14`),fogD:.0018,glow:[.85,.32,.22],glowA:.45,glowB:.55,haze:[.32,.14,.16],hazeA:.45,hgl:Lu(`#3a1218`),hglA:.5,hglF:8,cTop:[.32,.18,.2],cMid:[.15,.08,.11],cLow:[.07,.04,.06],cRim:[.65,.28,.24],cRimK:.6,cBack:.45,cUnder:[.12,.05,.07],cUnderA:.35,wisp:[.45,.22,.24],disk:[4.6,1.8,1.2],stars:.6,night:1,world:[.58,.48,.52],far:[.38,.28,.34],farHaze:.35,glint:.4,grade:[1.08,.88,.92],sat:.84,bloomS:.58,bloomR:.65,bloomT:.8,evening:1,birds:0},dusk:{az:-154,el:-2,shadeMin:18,sun:Lu(`#455282`,.6),shadow:Lu(`#0d1220`),rim:Lu(`#6d84b2`,.9),zenith:Lu(`#0c1228`),mid:Lu(`#182442`),horizon:Lu(`#2a3854`),fog:Lu(`#1c2538`),fogD:.0019,glow:[.4,.45,.6],glowA:.2,glowB:.15,haze:[.22,.26,.38],hazeA:.35,hgl:Lu(`#2a354c`),hglA:.4,hglF:12,cTop:[.22,.22,.32],cMid:[.14,.14,.22],cLow:[.08,.08,.14],cRim:[.45,.45,.6],cRimK:.3,cBack:.3,cUnder:[.12,.12,.18],cUnderA:.3,wisp:[.35,.38,.48],disk:[0,0,0],stars:1,night:1,world:[.42,.46,.66],far:[.3,.35,.52],farHaze:.4,glint:0,grade:[.92,.95,1.06],sat:.8,bloomS:.55,bloomR:.6,bloomT:.82,evening:1,birds:0}};function Bu(e,t,n,r){let i=r;for(let r of Object.keys(e)){let a=e[r],o=t[r];if(Array.isArray(a)){let e=i[r],t=o;for(let r=0;r<3;r++)e[r]=a[r]+(t[r]-a[r])*n}else i[r]=a+(o-a)*n}return r}var Vu=e=>{let t={...e};for(let e in t)Array.isArray(t[e])&&(t[e]=[...t[e]]);return t},Hu=(e,t,n)=>{let r=t*Ru,i=n*Ru;return e.set(Math.sin(r)*Math.cos(i),Math.sin(i),Math.cos(r)*Math.cos(i))},Uu=3.6,Wu=class{post;shadow;looks;from;to;k=1;idx=0;cur;lapse;lapseT=0;blend;lapseDone=!1;dirty=!0;shadowDir=new p;constructor(e,t,n){this.post=e,this.shadow=t,this.looks=[zu.midnight,zu.witching,zu.bloodmoon,zu.dusk];let r=Iu.indexOf(n.get(`time`)??`midnight`);this.idx=r<0?0:r,this.cur=this.from=this.to=this.looks[this.idx],this.blend=Vu(this.looks[0]),this.lapse=n.has(`timelapse`)&&n.get(`timelapse`)!==`0`,this.lapse&&(this.idx=0),this.apply(this.lapse?this.looks[0]:this.cur),addEventListener(`keydown`,e=>{e.code===`KeyT`&&!e.repeat&&this.cycle()})}get preset(){return Iu[this.idx]}get evening(){return this.cur.evening}get birds(){return this.cur.birds}get night(){return this.cur.night}cycle(){this.set(Iu[(this.idx+1)%Iu.length])}set(e,t=!1){this.lapse=!1,this.idx=Iu.indexOf(e),this.from=Vu(this.cur),this.to=this.looks[this.idx],this.k=+!!t,t&&(this.cur=this.to),this.dirty=!0}along(e){let t=Math.min(2,Math.floor(e)),n=e-t;return Bu(this.looks[t],this.looks[t+1],n*n*(3-2*n)*.35+n*.65,this.blend)}update(e){if(this.lapse&&!this.lapseDone){this.lapseT+=e;let t=Math.min(1,Math.max(0,(this.lapseT-2)/36)),n=t<.7?t/.7*2.1:2.1+(t-.7)/.3*.9;this.cur=this.along(Math.min(3,n)),this.idx=Math.min(3,Math.round(n)),t>=1&&(this.lapseDone=!0,this.cur=this.looks[3]),this.dirty=!0}else if(this.k<1){this.k=Math.min(1,this.k+e/Uu);let t=this.k*this.k*(3-2*this.k);this.cur=this.k>=1?this.to:Bu(this.from,this.to,t,this.blend),this.dirty=!0}this.dirty&&=(this.apply(this.cur),!1)}apply(e){Hu(O.uSkySun.value,e.az,e.el),Hu(O.uSunDir.value,e.az,Math.max(e.el,e.shadeMin)),this.shadow.dir=Hu(this.shadowDir,e.az,Math.max(e.el,3)),O.uSunColor.value.setRGB(...e.sun),O.uShadowTint.value.setRGB(...e.shadow),O.uRimColor.value.setRGB(...e.rim),O.uSkyZenith.value.setRGB(...e.zenith),O.uSkyMid.value.setRGB(...e.mid),O.uSkyHorizon.value.setRGB(...e.horizon),O.uFogColor.value.setRGB(...e.fog),O.uFogDensity.value=e.fogD,O.uSunGlow.value.setRGB(...e.glow),O.uSunGlowAmt.value.set(e.glowA,e.glowB),O.uHaze.value.setRGB(...e.haze),O.uHazeAmt.value=e.hazeA,O.uHorizGlow.value.setRGB(...e.hgl),O.uHorizGlowK.value.set(e.hglA,e.hglF),O.uCloudTop.value.setRGB(...e.cTop),O.uCloudMid.value.setRGB(...e.cMid),O.uCloudLow.value.setRGB(...e.cLow),O.uCloudRim.value.setRGB(...e.cRim),O.uCloudK.value.set(e.cRimK,e.cBack,e.cUnderA),O.uCloudUnder.value.setRGB(...e.cUnder),O.uWisp.value.setRGB(...e.wisp),O.uSunDisk.value.setRGB(...e.disk),O.uStars.value=e.stars,O.uNight.value=e.night,O.uWorldTint.value.setRGB(...e.world),O.uFarTint.value.setRGB(...e.far),O.uFarHaze.value=e.farHaze,O.uGlint.value=e.glint,Me.uGradeMul.value.setRGB(...e.grade),Me.uSat.value=e.sat,this.post.bloom.strength=e.bloomS,this.post.bloom.radius=e.bloomR,this.post.bloom.threshold=e.bloomT}},Gu=class{on;gl=null;ext=null;pending=[];free=[];open=null;gpu=new Map;cpu=new Map;calls=new Map;tris=new Map;cpuT=0;cpuName=``;info0={calls:0,tris:0};constructor(e,t){if(this.on=t,!t)return;let n=e.getContext();this.ext=n.getExtension(`EXT_disjoint_timer_query_webgl2`),this.gl=this.ext?n:null}add(e,t,n){let r=e.get(t)??{sum:0,n:0};r.sum+=n,r.n++,e.set(t,r)}begin(e,t){if(!this.on||(t&&(this.info0={calls:t.info.render.calls,tris:t.info.render.triangles}),!this.gl||!this.ext||this.open))return;let n=this.free.pop()??this.gl.createQuery();this.gl.beginQuery(this.ext.TIME_ELAPSED_EXT,n),this.open={name:e,q:n}}end(e,t){this.on&&(t&&(this.add(this.calls,e,t.info.render.calls-this.info0.calls),this.add(this.tris,e,t.info.render.triangles-this.info0.tris)),this.gl&&this.ext&&this.open&&(this.gl.endQuery(this.ext.TIME_ELAPSED_EXT),this.pending.push(this.open),this.open=null))}cpuBegin(e){this.on&&(this.cpuName=e,this.cpuT=performance.now())}cpuEnd(){this.on&&this.add(this.cpu,this.cpuName,performance.now()-this.cpuT)}cpuMark(e,t){this.on&&this.add(this.cpu,e,t)}poll(){if(!this.gl||!this.ext)return;let e=this.gl,t=e.getParameter(this.ext.GPU_DISJOINT_EXT);for(;this.pending.length;){let n=this.pending[0];if(!e.getQueryParameter(n.q,e.QUERY_RESULT_AVAILABLE))break;let r=e.getQueryParameter(n.q,e.QUERY_RESULT);t||this.add(this.gpu,n.name,r/1e6),this.free.push(n.q),this.pending.shift()}}reset(){this.gpu.clear(),this.cpu.clear(),this.calls.clear(),this.tris.clear()}report(){let e=e=>Object.fromEntries([...e].map(([e,t])=>[e,+(t.sum/Math.max(1,t.n)).toFixed(3)]));return{gpuMs:e(this.gpu),cpuMs:e(this.cpu),calls:e(this.calls),tris:e(this.tris)}}},Ku=[{index:0,canonZ:-80,u:-7,yawOffset:.22,defaultTitle:`TECHYON MAIN POSTER`},{index:1,canonZ:-160,u:-7,yawOffset:.22,defaultTitle:`HIGHWAY 14 WARNING`},{index:2,canonZ:-240,u:-7,yawOffset:.22,defaultTitle:`JUET TECHFEST ARENA`},{index:3,canonZ:-320,u:-7,yawOffset:.22,defaultTitle:`SECTOR RESTRICTION`},{index:4,canonZ:-400,u:-7,yawOffset:.22,defaultTitle:`ESPORTS CHAMPIONSHIP`},{index:5,canonZ:-480,u:-7,yawOffset:.22,defaultTitle:`EMERGENCY BROADCAST`},{index:6,canonZ:-560,u:-7,yawOffset:.22,defaultTitle:`THE BLACK FOREST`},{index:7,canonZ:-640,u:-7,yawOffset:.22,defaultTitle:`TECHYON SURVIVORS`}],qu=[{locationName:`Highway 14 — Techyon North Approach (Km 0.8)`,dailyRate:`₹4,000 ($48)`,weeklyRate:`₹25,000 ($300)`,monthlyRate:`₹85,000 ($1,020)`,dailyImpressions:`24,500 commuters / day`,tier:`Tier 1 — Prime Highway Frontage`,advertiser:`BOTNET — The Greatest Clan To Ever Exist`},{locationName:`Highway 14 — Junction Overlook (Km 1.6)`,dailyRate:`₹3,500 ($42)`,weeklyRate:`₹22,000 ($265)`,monthlyRate:`₹75,000 ($900)`,dailyImpressions:`19,800 commuters / day`,tier:`Tier 1 — High Visibility Bend`,advertiser:`BOTNET — The Greatest Clan To Ever Exist`},{locationName:`JUET Arena Crossroads (Km 2.4)`,dailyRate:`₹5,000 ($60)`,weeklyRate:`₹32,000 ($385)`,monthlyRate:`₹110,000 ($1,320)`,dailyImpressions:`31,200 commuters / day`,tier:`Platinum Tier — Techfest Central Arena`,advertiser:`BOTNET — The Greatest Clan To Ever Exist`},{locationName:`Highway 14 — Midway Curve (Km 3.2)`,dailyRate:`₹3,000 ($36)`,weeklyRate:`₹18,000 ($215)`,monthlyRate:`₹62,000 ($745)`,dailyImpressions:`16,400 commuters / day`,tier:`Tier 2 — Settlement Arterial`,advertiser:`BOTNET — The Greatest Clan To Ever Exist`},{locationName:`Cemetery Straight (Km 4.0)`,dailyRate:`₹2,800 ($34)`,weeklyRate:`₹17,000 ($205)`,monthlyRate:`₹58,000 ($700)`,dailyImpressions:`14,800 commuters / day`,tier:`Tier 2 — Meadow Corridor`,advertiser:`BOTNET — The Greatest Clan To Ever Exist`},{locationName:`Black Forest Gateway (Km 4.8)`,dailyRate:`₹3,200 ($38)`,weeklyRate:`₹20,000 ($240)`,monthlyRate:`₹68,000 ($815)`,dailyImpressions:`17,500 commuters / day`,tier:`Tier 2 — Forest Threshold`,advertiser:`BOTNET — The Greatest Clan To Ever Exist`},{locationName:`Deep Woods Sector 7 (Km 5.6)`,dailyRate:`₹3,600 ($43)`,weeklyRate:`₹23,000 ($275)`,monthlyRate:`₹78,000 ($935)`,dailyImpressions:`18,900 commuters / day`,tier:`Tier 1 — South Highway Link`,advertiser:`BOTNET — The Greatest Clan To Ever Exist`},{locationName:`Techyon South Perimeter Gate (Km 6.4)`,dailyRate:`₹4,500 ($54)`,weeklyRate:`₹28,000 ($335)`,monthlyRate:`₹95,000 ($1,140)`,dailyImpressions:`28,000 commuters / day`,tier:`Tier 1 — Terminal Entrance`,advertiser:`BOTNET — The Greatest Clan To Ever Exist`}],Ju=`
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
`,Yu=`
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
`,Xu=`
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
`,Zu=`
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
`,Qu=class{root=new d;boardMeshes=[];materials=[];defaultCanvases=[];textures=[];frameMaterial;lampMaterial;bannerTexture=null;textureLoader=new pe;constructor(){this.root.name=`highway_billboards`,this.frameMaterial=new _e({glslVersion:u,side:2,uniforms:{uColor:{value:new T(1712680)},uFogColor:O.uFogColor,uFogDensity:O.uFogDensity},vertexShader:Ju,fragmentShader:Xu}),this.lampMaterial=new _e({glslVersion:u,uniforms:{uColor:{value:new T(16773808)},uFogColor:O.uFogColor,uFogDensity:O.uFogDensity},vertexShader:Ju,fragmentShader:Zu}),this.createBillboards(),this.update(-54)}createBillboards(){let e=4.7,t=new w(8,4.5),n=new me(8.3,4.8,.22),r=new y(.18,.18,5.6,12),i=new me(.08,.08,1.1),a=new fe(.24,.42,10);a.rotateX(Math.PI/2);let s=new E(.14,8,8);this.bannerTexture=this.textureLoader.load(`./wide_cinematic_cyberpunk_hacker_themed_banner_co.png`,e=>{e.colorSpace=ne,e.minFilter=o,e.magFilter=_,e.generateMipmaps=!0,e.anisotropy=8,e.needsUpdate=!0,this.materials.forEach(t=>{t.uniforms.uTexture.value=e})},void 0,e=>{console.warn(`[BillboardSystem] Could not load banner image, falling back to procedural posters:`,e)}),this.bannerTexture.colorSpace=ne,this.bannerTexture.minFilter=o,this.bannerTexture.magFilter=_,this.bannerTexture.generateMipmaps=!0,this.bannerTexture.anisotropy=8,Ku.forEach((o,c)=>{let l=new d;l.name=`billboard_${c}`;let f=this.generateDefaultPoster(c);this.defaultCanvases.push(f);let p=this.bannerTexture??new ge(f);this.textures.push(p);let m=new _e({glslVersion:u,side:2,uniforms:{uTexture:{value:p},uTime:O.uTime,uFogColor:O.uFogColor,uFogDensity:O.uFogDensity,uEmissive:{value:1.25}},vertexShader:Ju,fragmentShader:Yu});this.materials.push(m);let h=new v(t,m);h.position.set(0,e,.12),l.add(h),this.boardMeshes.push(h);let g=new v(n,this.frameMaterial);g.position.set(0,e,0),l.add(g);let _=new v(r,this.frameMaterial);_.position.set(-2.8,2.8,-.25),l.add(_);let y=new v(r,this.frameMaterial);y.position.set(2.8,2.8,-.25),l.add(y),[-2.8,0,2.8].forEach(e=>{let t=new v(i,this.frameMaterial);t.position.set(e,7.13,.55),l.add(t);let n=new v(a,this.frameMaterial);n.position.set(e,7.13,1.05),n.rotation.x=.55,l.add(n);let r=new v(s,this.lampMaterial);r.position.set(e,7.07,1.15),l.add(r)}),this.root.add(l)})}update(e){let t=e+35;Ku.forEach((e,n)=>{let r=this.root.children[n];if(!r)return;let i=Math.ceil((e.canonZ-t)/640),a=e.canonZ-i*640,o=A(a)+e.u,s=it(a)+e.yawOffset,c=j(e.u,a);r.position.set(o,c,a),r.rotation.y=s})}getNearestBillboard(e,t,n=22){let r=null,i=n;return this.root.children.forEach((n,a)=>{let o=Ku[a],s=e-n.position.x,c=t-n.position.z,l=Math.hypot(s,c);l<i&&(i=l,r={index:a,dist:l,slot:o,pricing:qu[a]??qu[0],group:n})}),r}async setImage(e,t){return e<0||e>=this.materials.length?(console.warn(`[BillboardSystem] Invalid billboard index: ${e}`),!1):new Promise(n=>{this.textureLoader.load(t,r=>{r.colorSpace=ne,r.minFilter=o,r.magFilter=_,r.generateMipmaps=!0,r.anisotropy=4,this.materials[e].uniforms.uTexture.value=r,this.textures[e]=r,console.log(`[BillboardSystem] Successfully updated billboard #${e} with image: ${t}`),n(!0)},void 0,r=>{console.error(`[BillboardSystem] Failed to load image for billboard #${e}:`,r),this.drawFallbackImage(e,`Image Load Error\n${t}`),n(!1)})})}async setImages(e){return Promise.all(e.map((e,t)=>t<this.materials.length?this.setImage(t,e):Promise.resolve(!1)))}reset(e){let t=e=>{if(e>=0&&e<this.materials.length){let t=this.bannerTexture??(this.defaultCanvases[e]?new ge(this.defaultCanvases[e]):null);t&&(this.materials[e].uniforms.uTexture.value=t,this.textures[e]=t)}};if(typeof e==`number`)t(e);else for(let e=0;e<this.materials.length;e++)t(e)}drawFallbackImage(e,t){let n=document.createElement(`canvas`);n.width=1280,n.height=720;let r=n.getContext(`2d`);r.fillStyle=`#0c1520`,r.fillRect(0,0,1280,720),r.strokeStyle=`#c8443b`,r.lineWidth=14,r.strokeRect(20,20,1240,680),r.font=`bold 44px "Arial", sans-serif`,r.fillStyle=`#ff6a5c`,r.textAlign=`center`,r.fillText(`TECHYON DISPLAY // OFFLINE`,640,310),r.font=`24px "Arial", sans-serif`,r.fillStyle=`#8ba5b8`,r.fillText(t,640,420);let i=new ge(n);i.colorSpace=ne,this.materials[e].uniforms.uTexture.value=i}generateDefaultPoster(e){let t=document.createElement(`canvas`);t.width=1280,t.height=720;let n=t.getContext(`2d`),r=n.createLinearGradient(0,0,1280,720);r.addColorStop(0,`#080414`),r.addColorStop(.5,`#140924`),r.addColorStop(1,`#06030e`),n.fillStyle=r,n.fillRect(0,0,1280,720),n.strokeStyle=`rgba(140, 72, 210, 0.14)`,n.lineWidth=1;for(let e=0;e<1280;e+=64)n.beginPath(),n.moveTo(e,0),n.lineTo(e,720),n.stroke();for(let e=0;e<720;e+=64)n.beginPath(),n.moveTo(0,e),n.lineTo(1280,e),n.stroke();switch(e){case 0:this.drawBorder(n,`#4896be`),this.drawGlowCircle(n,640,360,260,`rgba(72, 150, 210, 0.15)`),n.textAlign=`center`,n.font=`700 24px "Georgia", serif`,n.fillStyle=`#7fb5d8`,n.letterSpacing=`0.4em`,n.fillText(`JAYPEE UNIVERSITY OF ENGINEERING & TECHNOLOGY`,640,150),n.font=`900 112px "Impact", "Arial Black", sans-serif`,n.fillStyle=`#e2f2fc`,n.shadowColor=`#82d2ff`,n.shadowBlur=32,n.fillText(`TECHYON`,640,280),n.shadowBlur=0,n.font=`italic 700 36px "Georgia", serif`,n.fillStyle=`#ff5544`,n.fillText(`HALLOWEEN TECHFEST — 2026`,640,360),n.font=`600 28px "Arial", sans-serif`,n.fillStyle=`#b4d5eb`,n.fillText(`48-HR HACKATHON  •  ROBOTICS  •  ESPORTS  •  GAME DEV`,640,460),n.font=`400 20px "Courier New", monospace`,n.fillStyle=`#5c84a0`,n.fillText(`OCTOBER 31 – NOVEMBER 02  |  HIGHWAY 14 CAMPUS ARENA`,640,560);break;case 1:this.drawBorder(n,`#d49b28`),this.drawHazardStripes(n,0,0,1280,50),this.drawHazardStripes(n,0,670,1280,50),n.textAlign=`center`,n.font=`900 48px "Arial Black", sans-serif`,n.fillStyle=`#f5b838`,n.fillText(`⚠  EMERGENCY NIGHT CURFEW  ⚠`,640,160),n.font=`900 84px "Impact", sans-serif`,n.fillStyle=`#ffffff`,n.fillText(`ROAD CLOSED TO CIVILIANS`,640,275),n.font=`600 32px "Georgia", serif`,n.fillStyle=`#f4d08a`,n.fillText(`SUNSET TO SUNRISE // HIGHWAY 14 CORRIDOR`,640,365),n.font=`400 24px "Arial", sans-serif`,n.fillStyle=`#d0dce5`,n.fillText(`Extreme fog and unexplained apparitions reported past Milestone 14.`,640,460),n.fillText(`If you spot the cyclist boy in the sky-blue shirt, DO NOT ENGAGE.`,640,505),n.font=`bold 22px "Courier New", monospace`,n.fillStyle=`#e05544`,n.fillText(`BY ORDER OF DISTRICT HIGHWAY POLICE & FORESTRY DIVISION`,640,595);break;case 2:this.drawBorder(n,`#58b29c`),n.textAlign=`center`,n.font=`800 32px "Arial", sans-serif`,n.fillStyle=`#7ad4bf`,n.fillText(`TECHYON COMPETITIVE ARENA`,640,140),n.font=`900 96px "Impact", sans-serif`,n.fillStyle=`#f0faf6`,n.fillText(`CODE • BUILD • CONQUER`,640,260),this.drawSubBox(n,160,320,290,180,`DEV HACK`,`₹50,000`,`AI & Web3 Sprint`),this.drawSubBox(n,495,320,290,180,`ROBO WARS`,`₹40,000`,`Combat Heavyweight`),this.drawSubBox(n,830,320,290,180,`LAN BATTLES`,`₹60,000`,`Valorant & BGMI`),n.font=`500 22px "Georgia", serif`,n.fillStyle=`#8ec4b5`,n.fillText(`REGISTRATION OPEN AT TECHYON.JUET.AC.IN`,640,575);break;case 3:this.drawBorder(n,`#c44238`),n.textAlign=`center`,n.font=`900 44px "Courier New", monospace`,n.fillStyle=`#ff6a5c`,n.fillText(`[CLASSIFIED PROTOCOL: EXHUMATION ZERO]`,640,140),n.font=`900 88px "Impact", sans-serif`,n.fillStyle=`#fbeeed`,n.shadowColor=`#ff2211`,n.shadowBlur=28,n.fillText(`DO NOT DISTURB THE GRAVES`,640,260),n.shadowBlur=0,n.font=`italic 30px "Georgia", serif`,n.fillStyle=`#e8b8b4`,n.fillText(`The Cinnabar Talismans must remain affixed to the roadside Jizo.`,640,360),n.font=`22px "Arial", sans-serif`,n.fillStyle=`#d4b0ac`,n.fillText(`Nine missing souls remain bound to the soil beneath the cedar trees.`,640,440),n.fillText(`Any tampering will trigger immediate containment retaliation.`,640,480),n.font=`bold 20px "Courier New", monospace`,n.fillStyle=`#8a3a34`,n.fillText(`DISTRICT EXHUMATION ARCHIVE // FILE REF #94-H14`,640,570);break;case 4:this.drawBorder(n,`#9d65d4`),n.textAlign=`center`,n.font=`800 30px "Arial", sans-serif`,n.fillStyle=`#be95ea`,n.fillText(`MIDNIGHT LAN WARS`,640,140),n.font=`900 100px "Impact", sans-serif`,n.fillStyle=`#f8f2fd`,n.shadowColor=`#b870fc`,n.shadowBlur=30,n.fillText(`BATTLEGROUND 2026`,640,265),n.shadowBlur=0,n.font=`700 36px "Arial Black", sans-serif`,n.fillStyle=`#ffd257`,n.fillText(`VALORANT  •  BGMI  •  TEKKEN  •  FIFA`,640,370),n.font=`600 28px "Georgia", serif`,n.fillStyle=`#e0caf5`,n.fillText(`HIGH-REFRESH ESPORTS ARENA // LIVE STREAMED`,640,470),n.font=`400 22px "Courier New", monospace`,n.fillStyle=`#957cb0`,n.fillText(`ORGANIZED BY COMPUTER SOCIETY OF INDIA — JUET CHAPTER`,640,570);break;case 5:this.drawBorder(n,`#3b8fc2`),n.textAlign=`center`,n.font=`800 32px "Courier New", monospace`,n.fillStyle=`#6ec1f5`,n.fillText(`EMERGENCY RADIO FREQUENCY`,640,140),n.font=`900 110px "Impact", sans-serif`,n.fillStyle=`#ffffff`,n.fillText(`94.2 MHz SHORTWAVE`,640,270),n.font=`600 30px "Georgia", serif`,n.fillStyle=`#9ecded`,n.fillText(`Automated repeating broadcast from the abandoned Dagashi sweet shop.`,640,370),n.font=`italic 26px "Georgia", serif`,n.fillStyle=`#ff7766`,n.fillText(`"If the bicycle bell rings behind you, keep looking straight ahead."`,640,460),n.font=`bold 22px "Courier New", monospace`,n.fillStyle=`#5286a8`,n.fillText(`TRANSMITTER REPEATER STATION #3 // POWERED BY BACKUP GENERATOR`,640,560);break;case 6:this.drawBorder(n,`#446e50`),n.textAlign=`center`,n.font=`800 30px "Georgia", serif`,n.fillStyle=`#7cb88d`,n.fillText(`STATE FORESTRY & WILDLIFE PRESERVE`,640,140),n.font=`900 96px "Impact", sans-serif`,n.fillStyle=`#eaf8ed`,n.fillText(`THE BLACK FOREST`,640,260),n.font=`700 34px "Arial", sans-serif`,n.fillStyle=`#f59a38`,n.fillText(`NO ARTIFICIAL LIGHT BEYOND THIS POINT`,640,365),n.font=`400 24px "Georgia", serif`,n.fillStyle=`#b4d8be`,n.fillText(`Dense canopy blocks moonlight. Deep mud and supernatural distortions.`,640,460),n.fillText(`Cyclists must carry repair kits and never leave the asphalt.`,640,505),n.font=`400 20px "Courier New", monospace`,n.fillStyle=`#557d60`,n.fillText(`DEPARTMENT OF ENVIRONMENT & FORESTS — GUNA REGION`,640,580);break;case 7:this.drawBorder(n,`#4896be`),n.textAlign=`center`,n.font=`800 28px "Georgia", serif`,n.fillStyle=`#72a9cc`,n.fillText(`JUET ANNUAL TECHFEST`,640,140),n.font=`900 100px "Impact", sans-serif`,n.fillStyle=`#e2f2fc`,n.shadowColor=`#82d2ff`,n.shadowBlur=32,n.fillText(`TECHYON 2026`,640,265),n.shadowBlur=0,n.font=`italic 700 36px "Georgia", serif`,n.fillStyle=`#82d2ff`,n.fillText(`WHERE CODE MEETS THE SUPERNATURAL`,640,360),n.font=`500 26px "Arial", sans-serif`,n.fillStyle=`#c5e1f5`,n.fillText(`You have navigated the midnight roads of Techyon.`,640,460),n.fillText(`Created with Three.js, WebGL 2, & Web Audio.`,640,505),n.font=`bold 20px "Courier New", monospace`,n.fillStyle=`#5c84a0`,n.fillText(`JAYPEE UNIVERSITY OF ENGINEERING & TECHNOLOGY  •  HALLOWEEN EDITION`,640,580)}return t}drawBorder(e,t){e.strokeStyle=t,e.lineWidth=8,e.strokeRect(30,30,1220,660),e.strokeStyle=`rgba(255, 255, 255, 0.25)`,e.lineWidth=2,e.strokeRect(42,42,1196,636),e.fillStyle=t,e.fillRect(26,26,40,12),e.fillRect(26,26,12,40),e.fillRect(1214,26,40,12),e.fillRect(1242,26,12,40),e.fillRect(26,682,40,12),e.fillRect(26,654,12,40),e.fillRect(1214,682,40,12),e.fillRect(1242,654,12,40)}drawHazardStripes(e,t,n,r,i){e.save(),e.beginPath(),e.rect(t,n,r,i),e.clip(),e.fillStyle=`#e0a020`,e.fillRect(t,n,r,i),e.fillStyle=`#161616`;for(let t=-i;t<r+i;t+=80)e.beginPath(),e.moveTo(t,n+i),e.lineTo(t+i,n),e.lineTo(t+i+40,n),e.lineTo(t+40,n+i),e.closePath(),e.fill();e.restore()}drawGlowCircle(e,t,n,r,i){let a=e.createRadialGradient(t,n,10,t,n,r);a.addColorStop(0,i),a.addColorStop(1,`transparent`),e.fillStyle=a,e.beginPath(),e.arc(t,n,r,0,Math.PI*2),e.fill()}drawSubBox(e,t,n,r,i,a,o,s){e.fillStyle=`rgba(10, 24, 34, 0.85)`,e.fillRect(t,n,r,i),e.strokeStyle=`rgba(88, 178, 156, 0.4)`,e.lineWidth=2,e.strokeRect(t,n,r,i),e.font=`800 24px "Arial Black", sans-serif`,e.fillStyle=`#7ad4bf`,e.textAlign=`center`,e.fillText(a,t+r/2,n+42),e.font=`900 38px "Impact", sans-serif`,e.fillStyle=`#ffd257`,e.fillText(o,t+r/2,n+98),e.font=`500 18px "Georgia", serif`,e.fillStyle=`#b4d8ce`,e.fillText(s,t+r/2,n+144)}},$u={mode:`fixed`,size:`normal`,sensitivity:`medium`,autoSprint:!0,visibility:`auto`,vibrate:!0},ed=`techyon_mobile_joystick_prefs`,td=class{input;explore;chase;pause;onRingBell;onCheckMoney;onToggleCamera;onFirstTouch;container;joystickBase;joystickKnob;mountBtn;brakeBtn;sprintBtn;bellBtn;camBtn;moneyBtn;pauseBtn;fullscreenBtn;settingsBtn;settingsModal;activeTouchId=null;lookTouchId=null;baseX=0;baseY=0;lastLookX=0;lastLookY=0;lookMoved=0;lastTapTime=0;sprintLocked=!1;brakeHeld=!1;prefs;constructor(e,t,n,r,i,a,o,s){this.input=e,this.explore=t,this.chase=n,this.pause=r,this.onRingBell=i,this.onCheckMoney=a,this.onToggleCamera=o,this.onFirstTouch=s,this.prefs=this.loadPrefs(),this.injectStyles(),this.container=document.createElement(`div`),this.container.id=`techyon-mobile-controls`,this.joystickBase=document.createElement(`div`),this.joystickBase.className=`th-joystick-base`,this.joystickBase.innerHTML=``,this.joystickKnob=document.createElement(`div`),this.joystickKnob.className=`th-joystick-knob`,this.joystickBase.appendChild(this.joystickKnob),this.container.appendChild(this.joystickBase);let c=document.createElement(`div`);c.className=`th-btn-cluster`;let l=document.createElement(`div`);l.className=`th-btn-row th-btn-row-secondary`;let u=document.createElement(`div`);u.className=`th-btn-row th-btn-row-primary`,this.moneyBtn=document.createElement(`button`),this.moneyBtn.className=`th-m-btn th-m-btn-sm th-money-btn`,this.moneyBtn.style.display=`none`,this.moneyBtn.innerHTML=`<span>Rates</span>`,this.moneyBtn.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),this.vibrate(15),this.onCheckMoney?.()},{passive:!1}),this.camBtn=document.createElement(`button`),this.camBtn.className=`th-m-btn th-m-btn-sm th-cam-btn`,this.camBtn.innerHTML=`<span>Cam</span>`,this.camBtn.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),this.vibrate(15),this.onToggleCamera?this.onToggleCamera():this.chase.toggle()},{passive:!1}),this.sprintBtn=document.createElement(`button`),this.sprintBtn.className=`th-m-btn th-m-btn-sm th-sprint-btn`,this.sprintBtn.innerHTML=`<span>Sprint</span>`,this.sprintBtn.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),this.vibrate(15),this.sprintLocked=!this.sprintLocked,this.input.sprint=this.sprintLocked,this.sprintBtn.classList.toggle(`active`,this.sprintLocked)},{passive:!1}),this.bellBtn=document.createElement(`button`),this.bellBtn.className=`th-m-btn th-m-btn-sm th-bell-btn`,this.bellBtn.innerHTML=`<span>Bell</span>`,this.bellBtn.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),this.vibrate(15),this.onRingBell()},{passive:!1}),this.mountBtn=document.createElement(`button`),this.mountBtn.className=`th-m-btn th-mount-btn`,this.mountBtn.innerHTML=`<span>Ride</span>`,this.mountBtn.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),this.vibrate(15),this.explore.pressF(),this.updateMountLabel()},{passive:!1}),this.brakeBtn=document.createElement(`button`),this.brakeBtn.className=`th-m-btn th-brake-btn`,this.brakeBtn.innerHTML=`<span>Brake</span>`;let d=e=>{e.preventDefault(),e.stopPropagation(),this.vibrate(15),this.brakeHeld=!0,this.brakeBtn.classList.add(`active`),this.input.down=!0,this.input.analogBrake=1},f=e=>{e.preventDefault(),e.stopPropagation(),this.brakeHeld=!1,this.brakeBtn.classList.remove(`active`),this.input.down=!1,this.input.analogBrake=0};this.brakeBtn.addEventListener(`touchstart`,d,{passive:!1}),this.brakeBtn.addEventListener(`touchend`,f,{passive:!1}),this.brakeBtn.addEventListener(`touchcancel`,f,{passive:!1}),l.appendChild(this.moneyBtn),l.appendChild(this.camBtn),l.appendChild(this.sprintBtn),l.appendChild(this.bellBtn),u.appendChild(this.mountBtn),u.appendChild(this.brakeBtn),c.appendChild(l),c.appendChild(u),this.container.appendChild(c);let p=document.createElement(`div`);p.className=`th-top-touch-bar`,this.settingsBtn=document.createElement(`button`),this.settingsBtn.className=`th-top-btn th-settings-touch-btn`,this.settingsBtn.title=`Joystick Settings`,this.settingsBtn.innerHTML=`<span>⚙</span>`,this.settingsBtn.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),this.vibrate(15),this.toggleSettingsModal()},{passive:!1}),this.fullscreenBtn=document.createElement(`button`),this.fullscreenBtn.className=`th-top-btn th-fullscreen-touch-btn`,this.fullscreenBtn.title=`Fullscreen`,this.fullscreenBtn.innerHTML=`<span>⛶</span>`,this.fullscreenBtn.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),this.vibrate(20),this.toggleFullscreen()},{passive:!1}),this.pauseBtn=document.createElement(`button`),this.pauseBtn.className=`th-top-btn th-pause-touch-btn`,this.pauseBtn.title=`Pause`,this.pauseBtn.innerHTML=`<span>❚❚</span>`,this.pauseBtn.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),this.vibrate(15),this.pause.pause()},{passive:!1}),p.appendChild(this.settingsBtn),p.appendChild(this.fullscreenBtn),p.appendChild(this.pauseBtn),this.container.appendChild(p),this.settingsModal=this.createSettingsModal(),this.container.appendChild(this.settingsModal),document.body.appendChild(this.container),this.bindTouchZones(),this.applyPrefs(),this.updateVisibility();let m=()=>{this.onFirstTouch?.()};window.addEventListener(`touchstart`,m,{once:!0,passive:!0}),window.addEventListener(`touchend`,m,{once:!0,passive:!0})}loadPrefs(){try{let e=localStorage.getItem(ed);if(e)return{...$u,...JSON.parse(e)}}catch{}return{...$u}}savePrefs(){try{localStorage.setItem(ed,JSON.stringify(this.prefs))}catch{}}vibrate(e=15){if(this.prefs.vibrate&&typeof navigator<`u`&&`vibrate`in navigator)try{navigator.vibrate(e)}catch{}}toggleFullscreen(){document.fullscreenElement?document.exitFullscreen?.().catch(()=>{}):document.documentElement.requestFullscreen?.().catch(()=>{})}createSettingsModal(){let e=document.createElement(`div`);e.className=`th-mobile-settings-modal`,e.innerHTML=`
      <div class="th-ms-card">
        <div class="th-ms-header">
          <div class="th-ms-title">🕹️ JOYSTICK & MOBILE OPTIONS</div>
          <button class="th-ms-close">✕</button>
        </div>
        
        <div class="th-ms-row">
          <label>Joystick Position</label>
          <div class="th-ms-group" data-key="mode">
            <button data-val="fixed" class="${this.prefs.mode===`fixed`?`active`:``}">Fixed Corner</button>
            <button data-val="floating" class="${this.prefs.mode===`floating`?`active`:``}">Dynamic Follow</button>
          </div>
        </div>

        <div class="th-ms-row">
          <label>Joystick Size</label>
          <div class="th-ms-group" data-key="size">
            <button data-val="compact" class="${this.prefs.size===`compact`?`active`:``}">Compact</button>
            <button data-val="normal" class="${this.prefs.size===`normal`?`active`:``}">Normal</button>
            <button data-val="large" class="${this.prefs.size===`large`?`active`:``}">Large</button>
          </div>
        </div>

        <div class="th-ms-row">
          <label>Camera Look Sensitivity</label>
          <div class="th-ms-group" data-key="sensitivity">
            <button data-val="low" class="${this.prefs.sensitivity===`low`?`active`:``}">Low</button>
            <button data-val="medium" class="${this.prefs.sensitivity===`medium`?`active`:``}">Medium</button>
            <button data-val="high" class="${this.prefs.sensitivity===`high`?`active`:``}">High</button>
          </div>
        </div>

        <div class="th-ms-row">
          <label>Auto-Sprint (Push Edge)</label>
          <div class="th-ms-group" data-key="autoSprint">
            <button data-val="true" class="${this.prefs.autoSprint?`active`:``}">ON</button>
            <button data-val="false" class="${this.prefs.autoSprint?``:`active`}">OFF</button>
          </div>
        </div>

        <div class="th-ms-row">
          <label>Touch Controls Display</label>
          <div class="th-ms-group" data-key="visibility">
            <button data-val="auto" class="${this.prefs.visibility===`auto`?`active`:``}">Auto-Detect</button>
            <button data-val="always" class="${this.prefs.visibility===`always`?`active`:``}">Always ON</button>
          </div>
        </div>

        <div class="th-ms-row">
          <label>Haptic Feedback</label>
          <div class="th-ms-group" data-key="vibrate">
            <button data-val="true" class="${this.prefs.vibrate?`active`:``}">ON</button>
            <button data-val="false" class="${this.prefs.vibrate?``:`active`}">OFF</button>
          </div>
        </div>

        <div class="th-ms-footer">
          <div class="th-ms-tip">💡 Swipe right screen to look · Double-tap to center camera</div>
          <button class="th-ms-done-btn">Save & Resume</button>
        </div>
      </div>
    `,e.querySelectorAll(`.th-ms-group button`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget,n=t.parentElement,r=n.dataset.key;n.querySelectorAll(`button`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let i=t.dataset.val;r===`autoSprint`||r===`vibrate`?this.prefs[r]=i===`true`:this.prefs[r]=i,this.savePrefs(),this.applyPrefs(),this.vibrate(15)})});let t=()=>{e.classList.remove(`open`)};return e.querySelector(`.th-ms-close`)?.addEventListener(`click`,t),e.querySelector(`.th-ms-done-btn`)?.addEventListener(`click`,t),e}toggleSettingsModal(){this.settingsModal.classList.toggle(`open`)}applyPrefs(){this.joystickBase.classList.remove(`compact`,`normal`,`large`,`fixed`,`floating`),this.joystickBase.classList.add(this.prefs.size),this.joystickBase.classList.add(this.prefs.mode),this.prefs.mode===`fixed`?this.repositionFixedBase():this.joystickBase.classList.remove(`active`),this.updateVisibility()}repositionFixedBase(){let e=this.getJoystickDimensions(),t=36+e.radius,n=window.innerHeight-36-e.radius;this.baseX=t,this.baseY=n,this.joystickBase.style.left=`${t}px`,this.joystickBase.style.top=`${n}px`,this.joystickBase.classList.add(`active`),this.setKnobOffset(0,0)}getJoystickDimensions(){return this.prefs.size===`compact`?{diameter:96,radius:48,maxRadius:40}:this.prefs.size===`large`?{diameter:144,radius:72,maxRadius:60}:{diameter:118,radius:59,maxRadius:48}}getSensitivityMultiplier(){return this.prefs.sensitivity===`low`?.85:this.prefs.sensitivity===`high`?2.1:1.35}updateVisibility(){this.prefs.visibility===`always`||`ontouchstart`in window||navigator.maxTouchPoints>0||window.innerWidth<=1024?this.container.classList.add(`visible`):this.container.classList.remove(`visible`)}bindTouchZones(){window.addEventListener(`touchstart`,e=>{for(let t=0;t<e.changedTouches.length;t++){let n=e.changedTouches[t],r=n.clientX,i=n.clientY,a=n.target;if(!(a&&a.closest(`.th-btn-cluster, .th-top-touch-bar, .th-mobile-settings-modal, .th-modal, #pause`))){if(r<window.innerWidth*.46){if(this.activeTouchId===null){this.activeTouchId=n.identifier;let e=this.getJoystickDimensions();if(this.prefs.mode===`floating`)this.baseX=r,this.baseY=i,this.joystickBase.style.left=`${r}px`,this.joystickBase.style.top=`${i}px`,this.joystickBase.classList.add(`active`),this.setKnobOffset(0,0);else{let t=r-this.baseX,n=i-this.baseY;Math.hypot(t,n)<=e.radius*2.2?this.updateJoystickMotion(t,n,e.maxRadius):this.updateJoystickMotion(t*.5,n*.5,e.maxRadius)}}}else this.lookTouchId===null&&(this.lookTouchId=n.identifier,this.lastLookX=r,this.lastLookY=i,this.lookMoved=0,this.chase.mouseLook=!0)}}},{passive:!1}),window.addEventListener(`touchmove`,e=>{for(let t=0;t<e.changedTouches.length;t++){let n=e.changedTouches[t];if(n.identifier===this.activeTouchId){let e=n.clientX-this.baseX,t=n.clientY-this.baseY,r=this.getJoystickDimensions();this.updateJoystickMotion(e,t,r.maxRadius)}else if(n.identifier===this.lookTouchId){let e=n.clientX-this.lastLookX,t=n.clientY-this.lastLookY;this.lastLookX=n.clientX,this.lastLookY=n.clientY,this.lookMoved+=Math.hypot(e,t);let r=this.getSensitivityMultiplier();this.explore.onFoot?this.explore.orbitBy(e*r,t*r):this.chase.lookBy(e*r,t*r)}}},{passive:!1});let e=e=>{for(let t=0;t<e.changedTouches.length;t++){let n=e.changedTouches[t];if(n.identifier===this.activeTouchId)this.activeTouchId=null,this.prefs.mode===`floating`&&this.joystickBase.classList.remove(`active`),this.setKnobOffset(0,0),this.input.up=!1,this.input.down=!1,this.input.left=!1,this.input.right=!1,this.input.analogSteer=0,this.input.analogThrottle=0,this.brakeHeld||(this.input.analogBrake=0),this.input.analogFwd=0,this.input.analogStrafe=0,this.sprintLocked||(this.input.sprint=!1);else if(n.identifier===this.lookTouchId){this.lookTouchId=null;let e=performance.now();this.lookMoved<10&&e-this.lastTapTime<320&&this.recenterCamera(),this.lastTapTime=e}}};window.addEventListener(`touchend`,e,{passive:!0}),window.addEventListener(`touchcancel`,e,{passive:!0}),window.addEventListener(`resize`,()=>{this.prefs.mode===`fixed`&&this.repositionFixedBase()})}updateJoystickMotion(e,t,n){let r=Math.min(Math.hypot(e,t),n),i=Math.atan2(t,e),a=Math.cos(i)*r,o=Math.sin(i)*r;this.setKnobOffset(a,o);let s=a/n,c=o/n,l=r/n;l<.1?(this.input.up=!1,this.input.down=!1,this.input.left=!1,this.input.right=!1,this.input.analogSteer=0,this.input.analogThrottle=0,this.brakeHeld||(this.input.analogBrake=0),this.input.analogFwd=0,this.input.analogStrafe=0):(this.input.analogSteer=-s,c<0?(this.input.analogThrottle=Math.min(1,-c/.85),this.brakeHeld||(this.input.analogBrake=0)):(this.input.analogThrottle=0,this.input.analogBrake=Math.min(1,c/.85)),this.input.analogFwd=-c,this.input.analogStrafe=s,this.input.up=c<-.22,this.input.down=c>.22,this.input.left=s<-.22,this.input.right=s>.22,this.prefs.autoSprint&&l>.88?this.input.sprint=!0:this.sprintLocked||(this.input.sprint=!1))}recenterCamera(){this.vibrate(25),this.chase.recenter(),this.explore.onFoot&&this.explore.recenter()}setKnobOffset(e,t){this.joystickKnob.style.transform=`translate(calc(-50% + ${e}px), calc(-50% + ${t}px))`}updateMountLabel(){this.mountBtn&&(this.mountBtn.innerHTML=`<span>${this.explore.onFoot?`Ride`:`Walk`}</span>`)}setMoneyButtonVisible(e){this.moneyBtn&&(this.moneyBtn.style.display=e?`flex`:`none`)}injectStyles(){let e=document.createElement(`style`);e.id=`techyon-mobile-styles`,e.textContent=`
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
    `,document.head.appendChild(e)}},nd=class{el;constructor(){this.el=document.createElement(`div`),this.el.id=`techyon-orientation-overlay`,this.el.innerHTML=`
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
    `;let e=document.createElement(`style`);e.id=`techyon-orientation-styles`,e.textContent=`
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
    `,document.head.appendChild(e),document.body.appendChild(this.el),this.el.querySelector(`.th-rot-dismiss-btn`)?.addEventListener(`click`,()=>{this.dismissed=!0,this.check()}),this.check(),window.addEventListener(`resize`,()=>this.check()),window.addEventListener(`orientationchange`,()=>this.check())}dismissed=!1;check(){if(this.dismissed){this.el.classList.remove(`visible`);return}let e=window.innerHeight>window.innerWidth,t=Math.min(window.innerWidth,window.innerHeight)<=600;e&&t?this.el.classList.add(`visible`):this.el.classList.remove(`visible`)}},rd=class{billboards;onStateChange;promptEl;modalEl;currentBillboardIndex=null;_isOpen=!1;get isOpen(){return this._isOpen}constructor(e,t){this.billboards=e,this.onStateChange=t,this.injectStyles(),this.promptEl=document.createElement(`div`),this.promptEl.id=`hoarding-prompt`,this.promptEl.className=`th-hoarding-prompt`,this.promptEl.innerHTML=`
      <span class="prompt-key">E</span>
      <span class="prompt-label">Check Hoarding Value & Ad Rates</span>
      <span class="prompt-dist" id="hoarding-dist-text">--m</span>
    `,this.promptEl.addEventListener(`click`,()=>this.toggle()),document.body.appendChild(this.promptEl),this.modalEl=document.createElement(`div`),this.modalEl.id=`hoarding-modal`,this.modalEl.className=`th-hoarding-modal`,this.modalEl.setAttribute(`role`,`dialog`),this.modalEl.setAttribute(`aria-modal`,`true`),this.modalEl.addEventListener(`click`,e=>{e.target===this.modalEl&&this.close()}),document.body.appendChild(this.modalEl)}update(e,t){let n=this.billboards.getNearestBillboard(e,t,22);if(n){this.currentBillboardIndex=n.index;let e=Math.round(n.dist),t=document.getElementById(`hoarding-dist-text`);return t&&(t.textContent=`${e}m`),this._isOpen||this.promptEl.classList.add(`visible`),{near:!0,dist:n.dist,index:n.index}}return this.currentBillboardIndex=null,this.promptEl.classList.remove(`visible`),this._isOpen&&this.close(),null}toggle(e,t){if(this._isOpen)return this.close(),!0;{let n=this.currentBillboardIndex;if(n===null&&typeof e==`number`&&typeof t==`number`){let r=this.billboards.getNearestBillboard(e,t,22);r&&(n=r.index)}return n!==null&&(this.open(n),!0)}}open(e){this._isOpen=!0,this.promptEl.classList.remove(`visible`);let t=this.billboards.getNearestBillboard(0,-((e+1)*80),9999)?.pricing??{locationName:`Highway 14 — Hoarding #${e}`,dailyRate:`₹3,500 ($45)`,weeklyRate:`₹22,000 ($270)`,monthlyRate:`₹75,000 ($920)`,dailyImpressions:`18,500 views / day`,tier:`Prime Highway Frontage`,advertiser:`BOTNET — The Greatest Clan To Ever Exist`};this.modalEl.innerHTML=`
      <div class="hoarding-card">
        <div class="card-header">
          <div class="badge-tag">HIGHWAY 14 // COMMERCIAL AD SPACE</div>
          <button class="card-close" id="hoarding-close-btn">&times;</button>
        </div>
        
        <div class="card-title-group">
          <h2 class="card-title">HOARDING #${e}</h2>
          <div class="card-subtitle">${t.locationName}</div>
          <div class="card-tier">${t.tier}</div>
        </div>

        <div class="rate-grid">
          <div class="rate-box">
            <div class="rate-label">DAILY AD RATE</div>
            <div class="rate-amount">${t.dailyRate}</div>
            <div class="rate-sub">Single 24h Placement</div>
          </div>
          <div class="rate-box highlighted">
            <div class="best-value-pill">MOST POPULAR</div>
            <div class="rate-label">WEEKLY RENTAL</div>
            <div class="rate-amount gold">${t.weeklyRate}</div>
            <div class="rate-sub">7 Days Continuous Run</div>
          </div>
          <div class="rate-box">
            <div class="rate-label">MONTHLY SPONSORSHIP</div>
            <div class="rate-amount">${t.monthlyRate}</div>
            <div class="rate-sub">30 Days Primary Feature</div>
          </div>
          <div class="rate-box">
            <div class="rate-label">MEASURED TRAFFIC</div>
            <div class="rate-amount cyan">${t.dailyImpressions}</div>
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
            <span class="spec-val active-ad">${t.advertiser}</span>
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
    `,this.modalEl.classList.add(`visible`),this.onStateChange?.(!0),document.getElementById(`hoarding-close-btn`)?.addEventListener(`click`,()=>this.close()),document.getElementById(`hoarding-dismiss-btn`)?.addEventListener(`click`,()=>this.close())}close(){this._isOpen&&(this._isOpen=!1,this.modalEl.classList.remove(`visible`),this.onStateChange?.(!1))}injectStyles(){let e=document.createElement(`style`);e.textContent=`
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
    `,document.head.appendChild(e)}},id=new URLSearchParams(location.search),ad=id.has(`autoplay`)&&id.get(`autoplay`)!==`0`,od=id.get(`kuwahara`)!==`0`,sd=id.has(`skipintro`)&&id.get(`skipintro`)!==`0`,cd=.03,ld=.04,ud=.05,dd=.06,fd=.01,pd=.15,md=.6,hd=.06;if(!document.createElement(`canvas`).getContext(`webgl2`))throw ku(`This browser can't draw the ride`,`Techyon needs WebGL 2. Try an up-to-date Chrome, Edge, Firefox or Safari, and check that hardware acceleration is turned on.`),Error(`WebGL2 unavailable`);var gd;try{gd=new De({antialias:!1,powerPreference:`high-performance`,stencil:!1})}catch(e){throw ku(`The graphics couldn't start`,`Your browser refused to create a WebGL 2 context. Closing other 3D tabs or restarting the browser usually helps.`),e}gd.domElement.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),ku(`The graphics took a break`,`The GPU reset or the browser reclaimed the 3D context. Reload to keep riding.`)}),gd.domElement.addEventListener(`webglcontextrestored`,()=>location.reload()),gd.setPixelRatio(Math.min(devicePixelRatio,1.5)),gd.setSize(innerWidth,innerHeight),gd.autoClear=!0,gd.info.autoReset=!1,gd.outputColorSpace=ne,document.body.appendChild(gd.domElement),O.uLeafTex.value=mn(gd),O.uSignTex.value=Nt(gd);var _d=new Tu(sd);window.__loader=_d,_d.advance(cd,`trees`);var vd=[],yd=performance.now(),bd=()=>new Promise(e=>{let t=setTimeout(e,120);requestAnimationFrame(()=>setTimeout(()=>(clearTimeout(t),e()),0))});async function xd(e,t,n,r){let i=performance.now(),a=r();return vd.push([e,Math.round(performance.now()-i)]),_d.advance(n,t),await bd(),a}await bd();var Sd=new ue,Cd=Jr();for(let e=0;e<Cd.length;e++)await xd(`proto${e}`,e<Cd.length*.55?`trees`:`grass`,ud/Cd.length,Cd[e]);var wd=new Ci(!1),Td=[`rice`,`houses`,`poles`,`road`];for(let e=0;e<Ci.CHUNKS;e++)await xd(`chunk${e}`,Td[Math.floor(e/Ci.CHUNKS*Td.length)],dd/Ci.CHUNKS,()=>wd.addChunk(e));id.has(`nospec`)||wd.specialize(),Sd.add(wd.root);var Ed=await xd(`sky`,`sky`,ld,()=>new Ti);Sd.add(Ed.group),Sd.add(Ed.motes);var Dd=await xd(`rider`,`rider`,fd,()=>new Zo);Ze(Dd.lean,1,2),Sd.add(Dd.root),Sd.add(Dd.walker);var Od=new Fi;Sd.add(Od.group);var kd=new Qe(2048,55),Ad=new $e(Math.floor(innerWidth*.5),Math.floor(innerHeight*.5)),jd=id.get(`start`),X=new Ts(ad,jd!==null&&Number.isFinite(Number(jd))?Number(jd):void 0),Z=new Us(innerWidth/innerHeight),Md=id.get(`cam`);if(Md===`fpp`?Z.fpp=1:Md&&(Z.mode=Md),!id.has(`nospec`))for(let e of[Dd.root,Dd.walker,Od.group])He(e);var Nd=new Xe(gd,innerWidth,innerHeight,{kuwahara:od,msaa:Number(id.get(`msaa`)??4)}),Pd=new Gu(gd,id.has(`prof`));Nd.prof=Pd;var Fd=id.has(`msaa`),Q={run:0,calib:[],refresh:0,win:[],winSum:0,check:0,bad:0,cooldown:0,log:[]},Id=[240,165,144,120,100,90,75,60,50];function Ld(e){if(Fd||Nd.msaa===0||!hf||pf||document.hidden||e>250||(Q.run+=e,Q.run<1e3))return;if(!Q.refresh){if(Q.calib.push(e),Q.run<3e3)return;let t=[...Q.calib].sort((e,t)=>e-t),n=t[Math.floor(t.length/2)],r=t[Math.floor(t.length*.1)],i=(n-r)/n<.1,a=Id.find(e=>Math.abs(1e3/e-n)/(1e3/e)<.08),o=n<12?a??1e3/n:i&&a||60;Q.refresh=1e3/o,Q.log.push(`refresh ${Math.round(o)} Hz (median ${n.toFixed(2)} ms, p10 ${r.toFixed(2)}${n>=12&&!i?`, loose -> 60`:``})`);return}for(Q.win.push(e),Q.winSum+=e;Q.winSum>3e3;)Q.winSum-=Q.win.shift();if(Q.cooldown-=e,Q.check+=e,Q.check<1e3)return;if(Q.check=0,Q.win.length>30){let e=[...Q.win].sort((e,t)=>e-t),t=e[Math.floor(e.length/2)],n=e[Math.floor(e.length*.1)],r=Id.find(e=>Math.abs(1e3/e-t)/(1e3/e)<.08);r&&(t-n)/t<.1&&1e3/r<Q.refresh*.9&&(Q.refresh=1e3/r,Q.log.push(`refresh -> ${r} Hz`))}if(Q.cooldown>0)return;let t=Math.max(Q.refresh,1e3/75)*1.25,n=Q.win.filter(e=>e>t).length/Q.win.length;if(Q.bad=n>.2?Q.bad+1:0,Q.bad>=2){let e=Nd.msaa>2?2:0;Q.log.push(`t=${rf.toFixed(1)}s: ${Math.round(n*100)}% frames > ${t.toFixed(1)} ms -> msaa ${e}`),Nd.setMsaa(e),Q.bad=0,Q.cooldown=6e3,Q.win.length=0,Q.winSum=0}}var Rd=new Wu(Nd,kd,id);{let e=performance.now(),t=0;await Pu(gd,Sd,Z.cam,Nd,kd,e=>{_d.advance((e-t)*pd,`paint`),t=e},bd),vd.push([`compile`,Math.round(performance.now()-e)]);let[n,...r]=wd.root.children,i=[...n.children,...r,Ed.group,Ed.motes,Dd.root,Od.group],a=performance.now();await Fu(gd,Sd,Z.cam,Nd,kd,i,e=>{let t=performance.now();vd.push([`draw${e}`,Math.round(t-a)]),a=t,_d.advance(md/i.length,e<i.length-3?`paint`:`cicadas`)},bd)}var zd=new Su,Bd=new bc(()=>{zd.start()},()=>{$.onFoot||Z.toggle()});zd.bindKeys(),addEventListener(`keydown`,e=>{e.code===`KeyB`&&!e.repeat&&Dd.bike.ringBell()});var Vd=document.getElementById(`hud`);(ad||id.has(`nohud`))&&(Vd.style.display=`none`);var $=new _c(wd,Dd,X,Z,zd,gd.domElement,!(ad||id.has(`nohud`)));Z.clear=$,$.initAsWalker(),Z.mouseLook=!ad,$.lockRiding=!ad;var Hd=gd.domElement,Ud=()=>{try{Hd.requestPointerLock()?.catch?.(()=>{})}catch{}};addEventListener(`pointermove`,e=>{document.pointerLockElement===Hd&&!$.onFoot&&Z.lookBy(e.movementX,e.movementY)});var Wd=document.createElement(`div`);Wd.textContent=`click / drag to look around`,Object.assign(Wd.style,{position:`fixed`,left:`50%`,bottom:`3.5%`,transform:`translateX(-50%)`,font:`400 12px/1 "Georgia", "Times New Roman", serif`,letterSpacing:`0.2em`,color:`rgba(255, 252, 240, 0.7)`,textShadow:`0 1px 3px rgba(40, 30, 20, 0.45)`,pointerEvents:`none`,userSelect:`none`,opacity:`0`,transition:`opacity 0.8s ease`,display:ad||id.has(`nohud`)?`none`:`block`}),document.body.appendChild(Wd);var Gd=0,Kd=()=>{ad||$.onFoot||Jd.paused||(Wd.style.opacity=`1`,clearTimeout(Gd),Gd=window.setTimeout(()=>Wd.style.opacity=`0`,2e3))};document.addEventListener(`pointerlockchange`,()=>{document.pointerLockElement===Hd?Wd.style.opacity=`0`:Kd()});var qd=id.get(`fs`)!==`0`,Jd=new Nu(Hd,{onPause:()=>{zd.setPaused(!0),Wd.style.opacity=`0`},onResume:e=>{zd.setPaused(!1),nf=performance.now(),e&&!ad&&Ud()},lookHint:()=>Kd()}),Yd=new Qu;if(Sd.add(Yd.root),id.has(`billboards`)){let e=id.get(`billboards`).split(`,`).map(e=>e.trim());Yd.setImages(e)}for(let e=0;e<8;e++)id.has(`billboard${e}`)&&Yd.setImage(e,id.get(`billboard${e}`));new nd;var Xd=new rd(Yd,e=>{e&&document.pointerLockElement===Hd&&document.exitPointerLock()}),Zd=new td(Bd,$,Z,Jd,()=>Dd.bike.ringBell(),()=>Xd.toggle($.playerX,$.playerZ),()=>Z.toggle(),()=>zd.start());addEventListener(`keydown`,e=>{e.code===`KeyE`&&!e.repeat&&!Jd.paused?Xd.toggle($.playerX,$.playerZ)&&e.preventDefault():e.code===`Escape`&&Xd.isOpen&&(Xd.close(),e.preventDefault())}),addEventListener(`resize`,()=>{gd.setSize(innerWidth,innerHeight),Z.cam.aspect=innerWidth/innerHeight,Z.cam.updateProjectionMatrix(),Nd.setSize(innerWidth,innerHeight),Ad.setSize(Math.floor(innerWidth*.5),Math.floor(innerHeight*.5)),Jd.paused&&Nd.render(Sd,Z.cam,rf)});var Qd=0,$d=0,ef=0,tf=[],nf=performance.now(),rf=0,af=new p,of=new p,sf={trees:0,houses:0};function cf(e,t){let n=-Math.sin(X.yaw),r=-Math.cos(X.yaw),i=wd.contact(e,t,.35);for(let[a,o]of[[.75,.28],[-.45,.25]]){let s=wd.contact(e+n*a,t+r*a,o);s.pen>i.pen&&(i=s)}return i}var lf=8,uf=.45,df=document.getElementById(`fade`),ff=0,pf=!1;function mf(e){if(Jd.paused){nf=e,requestAnimationFrame(mf);return}let t=e-nf,n=t/1e3;if(nf=e,n>.1&&(n=.1),ff<lf)ff++,n=0,_d.advance(hd/lf,`cicadas`);else if(sd){let e=Math.min(1,rf/uf);df.style.opacity=String(1-e*e*(3-2*e)),e>=1&&df.style.display!==`none`&&(df.style.display=`none`)}if(rf+=n,O.uTime.value=rf,O.uBikePos.value.set(X.x,X.yaw,X.z),$.enabled=hf&&!pf,Jd.enabled=hf&&!pf,$.bikeActive){let e=Math.max(1,Math.ceil(Math.abs(X.speed)*n/.1)),t=0;for(let r=0;r<e;r++)X.update(n/e,Bd,cf),t=Math.max(t,X.bumpImpulse);X.bumpImpulse=t}else X.bumpImpulse=0;$.update(n,Bd,rf),$.playerZ<-640&&(X.z+=640,$.shift(640),Z.shift(640),Od.shift(640));let r=$.playerX,i=$.playerZ;Pd.cpuBegin(`world`),wd.update(i),Yd.update(i),Pd.cpuEnd(),Pd.cpuBegin(`rider`),Dd.root.position.set(X.x,.02,X.z),Dd.root.rotation.y=X.yaw;let a=$.onFoot;if(Dd.update(n,{speed:X.speed,steer:a?X.steer*1.6*(1-$.kick)+$.parkSteer:X.steer*1.6,lean:a?X.lean*(1-$.kick)+$.parkLean:X.lean,crank:X.crank,wheel:X.wheel,pedaling:a?0:X.pedaling,time:rf,kick:$.kick,sprint:a?0:X.sprint},a?$.foot:void 0),Dd.bike.bump(X.bumpImpulse),Pd.cpuEnd(),Pd.cpuBegin(`camera+tod`),a&&Z.mode!==`custom`?$.updateCamera(n,Z.cam):Z.update(n,X,rf,Dd),Ed.follow(Z.cam.position),Rd.update(n),Pd.cpuEnd(),Pd.cpuBegin(`birds`),Od.activity=Rd.birds,Od.update(n,rf,Z.cam,of.set(r,0,i)),Pd.cpuEnd(),Dd.bike.setLamp(Rd.night),Pd.cpuBegin(`audio`),zd.state===`running`){sf=wd.closeness(r,i);let e=r-A(i),t=Math.max(0,Math.min(1,1-(e+4.9)/12))*(1-sf.houses*.5),a=.2+.2*(.5+.5*Math.sin(i*.037)*Math.sin(i*.011));zd.update(n,Math.abs(X.speed),Math.abs(X.cadence),Math.abs(X.wheelRate),X.pedaling,X.brakePressure,{steer:Math.max(-1,Math.min(1,X.steer/.3)),bump:X.bumpImpulse,roughness:a,water:t,trees:sf.trees,houses:sf.houses,evening:Rd.evening})}if(Pd.cpuEnd(),a){Z.cam.getWorldDirection(af);let e=Math.hypot(af.x,af.z)||1;af.set(r+af.x/e*22,0,i+af.z/e*22)}else af.set(X.x-Math.sin(X.yaw)*30,0,X.z-Math.cos(X.yaw)*30);gd.info.reset();let o=performance.now();Pd.begin(`shadow`,gd),kd.update(gd,Sd,af),Pd.end(`shadow`,gd),Pd.begin(`reflection`,gd),wd.reflectLod(!0),Ad.update(gd,Sd,Z.cam,-.22),wd.reflectLod(!1),Pd.end(`reflection`,gd),Nd.setNear(Z.cam.near),Nd.render(Sd,Z.cam,rf),Pd.cpuMark(`render submit`,performance.now()-o),Pd.cpuMark(`frame total`,performance.now()-e),Pd.poll(),Vd.textContent=a?`WASD · Walk  |  Shift · Lurch  |  F · Ride`:`${Math.round(X.speed*3.6)} km/h`;let s=Xd.update(r,i);if(Zd.setMoneyButtonVisible(!!s),Zd.updateMountLabel(),Qd++,$d+=n,$d>=1&&(ef=Qd/$d,tf.push(Math.round(ef)),tf.length>3600&&tf.splice(0,tf.length-3600),Qd=0,$d=0),Ld(t),hf||vd.push([`warm${ff}`,Math.round(performance.now()-e)]),ff===lf&&!hf){if(hf=!0,$.initAsWalker(),Nd.warmSmaa(),vd.push([`total`,Math.round(performance.now()-yd)]),sd)_d.remove();else{df.style.display=`none`,pf=!0,_d.ready(e=>{$.initAsWalker(),zd.start(),e&&qd&&Jd.enterFullscreen(),ad||(e?Ud():Kd()),pf=!1,nf=performance.now(),_d.dissolve(),requestAnimationFrame(mf)});return}}requestAnimationFrame(mf)}var hf=!1;requestAnimationFrame(mf),window.__ride={scene:Sd,bike:Dd.bike,post:Nd,birds:Od,prof:Pd,world:wd,billboards:Yd,setBillboardImage:(e,t)=>Yd.setImage(e,t),setBillboardImages:e=>Yd.setImages(e),resetBillboard:e=>Yd.reset(e),get aaLog(){return Q.log},get sprint(){return{held:Bd.sprint,k:X.sprint,speed:X.speed}},setSprint(e){Bd.sprint=e},get msaa(){return Nd.msaa},get ready(){return ff>=lf},get fps(){return ef},get waiting(){return pf},get loadProgress(){return _d.progress},bootLog:vd,fpsLog:tf,pause:Jd,get time(){return rf},get audio(){return zd.state},setCam(e){e===`fpp`?(Z.mode=`chase`,Z.fpp=1):e===`tpp`?(Z.mode=`chase`,Z.fpp=0):(Z.fpp=0,Z.mode=e)},toggleView(){Z.toggle()},mouseLook(e,t){Z.mouseLook=!0,Z.lookBy(e,t)},get look(){return{enabled:Z.mouseLook,...Z.lookState,locked:document.pointerLockElement===Hd}},view(e,t,n,r,i,a){Z.fpp=0,Z.mode=`custom`,Z.customPos.set(e,t,n),Z.customLook.set(r,i,a)},roadX(e){return A(e)},cycleCam(){Z.cycle()},get camMode(){return Z.mode},headScreen(){let e=Dd.headWorld(new p).project(Z.cam);return{x:(e.x+1)/2*innerWidth,y:(1-e.y)/2*innerHeight,z:e.z}},explore:{get state(){return{mode:$.mode,x:$.x,z:$.z,u:$.x-A($.z),y:$.y,yaw:$.yaw,speed:$.speed,bikeDist:$.bikeDistance,bikeVisible:Dd.root.visible,inHouse:gc($.x,$.z,0)>0}},pressF(){$.pressF()},teleport(e,t,n){$.teleport(e,t,n)},orbit(e,t,n){$.setOrbit(e,t,n)},walk(e,t,n=!1){$.autoWalk=e||t?{dx:e,dz:t,run:n}:null},faceYaw(e){$.yaw=e},lookAround(e){$.lookAround=e}},get timeOfDay(){return Rd.preset},setTime(e,t=!1){Rd.set(e,t)},get fppBlend(){return Z.fppBlend},place(e,t,n,r=0){X.x=A(t)+e,X.z=t,X.yaw=it(t)+r,X.speed=n},setAutoplay(e){X.autoplay=e},obstacles(){return wd.obstacles().map(e=>({u:e.x-A(e.z),z:e.z,r:e.r}))},get ctl(){return{x:X.x,z:X.z,u:X.x-A(X.z),yaw:X.yaw,speed:X.speed,bumped:X.bumped}},stats(){let e=gd.getContext(),t=e.getExtension(`WEBGL_debug_renderer_info`);return{renderer:t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):`unknown`,calls:gd.info.render.calls,triangles:gd.info.render.triangles,sceneCalls:Nd.sceneCalls,sceneTris:Nd.sceneTris,geometries:gd.info.memory.geometries,fps:Math.round(ef),speed:X.speed,z:X.z}}},window.techyon={setBillboardImage:(e,t)=>Yd.setImage(e,t),setBillboardImages:e=>Yd.setImages(e),resetBillboard:e=>Yd.reset(e),teleportToBillboard:e=>{e<0||e>=8||(X.z=-(e+1)*80+20,X.x=A(X.z),X.yaw=it(X.z),$.onFoot&&($.z=X.z,$.x=X.x,Dd.walker.position.set(X.x,0,X.z)))},billboards:Yd};