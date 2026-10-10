import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * 3D Sevyn8 Ring, modelled from Sevyn8's own design render: champagne-gold shell with the
 * "sevyn8" engraving and accent lines, black inner liner, and the inner sensor layout
 * (gold contact pads + dark modules with green LEDs). Labelled on the page as a design model.
 * Replace with the production GLB from Sensio's CAD when it exists.
 *
 * Imperative three.js (no React renderer) keeps the lazy chunk small.
 * Drag (mouse / horizontal touch) or arrow keys rotate it.
 */

export type RingMode = "story" | "showcase";

export interface RingSceneApi {
  setProgress(p: number): void;
  setActive(active: boolean): void;
  /** Keyboard rotation, in radians */
  nudge(yaw: number, pitch: number): void;
  resize(): void;
  dispose(): void;
}

interface Key {
  tilt: number; // rotation.x of the ring axis toward the camera
  roll: number; // rotation.z
  spin: number; // rotation about the ring's own axis
  camZ: number;
  lookY: number;
  pulse: number; // green LED glow
  temp: number; // warm glow on the contact pads
  motion: number; // particle energy
  orbit: number; // orbit line brightness
}

// One key per story step (see content/home.ts ringStory.steps). Sensors sit at local -Z.
const STORY: Key[] = [
  { tilt: 1.02, roll: 0.42, spin: 2.6, camZ: 6.6, lookY: 0, pulse: 0.15, temp: 0, motion: 0.15, orbit: 0.45 },
  { tilt: 1.22, roll: 0.12, spin: 0.0, camZ: 5.9, lookY: 0.26, pulse: 1, temp: 0, motion: 0.1, orbit: 0.15 },
  { tilt: 1.18, roll: -0.16, spin: 0.35, camZ: 5.9, lookY: 0.26, pulse: 0.25, temp: 1, motion: 0.1, orbit: 0.15 },
  { tilt: 0.32, roll: 0.24, spin: 1.6, camZ: 6.6, lookY: 0, pulse: 0.1, temp: 0, motion: 1, orbit: 0.3 },
  { tilt: 0.98, roll: 0.36, spin: 2.9, camZ: 7.0, lookY: 0, pulse: 0.5, temp: 0.35, motion: 0.35, orbit: 1 },
];

// Showcase: 3/4 view similar to the product render, sensors visible on the inside.
const SHOWCASE: Key = { tilt: 0.95, roll: 0.5, spin: 0.9, camZ: 7.5, lookY: -0.06, pulse: 0.6, temp: 0.15, motion: 0, orbit: 0 };

const RI = 1.0; // inner radius
const RO = 1.16; // outer radius
const HH = 0.44; // half band width (render proportions: band ≈ 38% of outer diameter)

const GOLD = 0xd2ae86;
const LED = new THREE.Color(0x5dff8a);

function ringProfile() {
  const c = 0.055;
  const pts: THREE.Vector2[] = [];
  const arc = (cx: number, cy: number, a0: number, a1: number, n = 8) => {
    for (let i = 0; i <= n; i++) {
      const a = a0 + ((a1 - a0) * i) / n;
      pts.push(new THREE.Vector2(cx + Math.cos(a) * c, cy + Math.sin(a) * c));
    }
  };
  // counter-clockwise loop: flat outer face up, top, inner wall down, bottom
  arc(RO - c, -HH + c, -Math.PI / 2, 0);
  arc(RO - c, HH - c, 0, Math.PI / 2);
  arc(RI + c, HH - c, Math.PI / 2, Math.PI);
  arc(RI + c, -HH + c, Math.PI, Math.PI * 1.5);
  pts.push(pts[0].clone());
  return pts;
}

/** "sevyn8" engraving + accent lines, wrapped around the outer face. Centre of texture = local +Z. */
export function engravingTexture(renderer: THREE.WebGLRenderer) {
  const W = 4096;
  const H = 512;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  g.clearRect(0, 0, W, H);
  g.fillStyle = "#fff";
  g.strokeStyle = "#fff";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = `300 ${Math.round(H * 0.42)}px "Helvetica Neue", "Segoe UI", Arial, sans-serif`;
  (g as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = "18px";
  g.fillText("sevyn8", W * 0.5, H * 0.52);
  g.lineCap = "round";
  g.lineWidth = 7;
  // short accent lines either side of the word, plus a long hairline on the far side
  for (const [u0, u1] of [
    [0.395, 0.425],
    [0.575, 0.605],
  ]) {
    g.beginPath();
    g.moveTo(W * u0, H * 0.5);
    g.lineTo(W * u1, H * 0.5);
    g.stroke();
  }
  g.lineWidth = 4;
  g.globalAlpha = 0.7;
  g.beginPath();
  g.moveTo(W * 0.66, H * 0.24);
  g.lineTo(W * 0.9, H * 0.24);
  g.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

export function glowTexture() {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.2, "rgba(255,255,255,0.5)");
  grd.addColorStop(0.55, "rgba(255,255,255,0.1)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (t: number) => t * t * (3 - 2 * t);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export function createRingScene(
  canvas: HTMLCanvasElement,
  opts: { mode: RingMode; reducedMotion: boolean; interactive?: boolean },
): RingSceneApi {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new RoomEnvironment();
  const env = pmrem.fromScene(envScene, 0.035).texture;
  scene.environment = env;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 6.6);

  const key = new THREE.DirectionalLight(0xfff1e0, 2.0);
  key.position.set(3, 4, 5);
  const rim = new THREE.DirectionalLight(0xd9efe8, 1.2);
  rim.position.set(-4, 1, -3);
  const fill = new THREE.DirectionalLight(0x1c7a60, 0.5);
  fill.position.set(0, -4, 2);
  scene.add(key, rim, fill);

  // ── Hierarchy: root (user drag yaw) → tilt (pose + drag pitch) → spinner (spin about axis)
  const root = new THREE.Group();
  const tilt = new THREE.Group();
  const spinner = new THREE.Group();
  root.add(tilt);
  tilt.add(spinner);
  scene.add(root);

  const disposables: { dispose(): void }[] = [];
  const track = <T extends { dispose(): void }>(x: T) => (disposables.push(x), x);

  // Outer shell: champagne gold, brushed-polished
  const shellMat = track(
    new THREE.MeshPhysicalMaterial({
      color: GOLD,
      metalness: 1,
      roughness: 0.24,
      clearcoat: 0.7,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.35,
    }),
  );
  spinner.add(new THREE.Mesh(track(new THREE.LatheGeometry(ringProfile(), 256)), shellMat));

  // Engraving on the outer face (bright polished metal)
  const engraveTex = track(engravingTexture(renderer));
  const engraveMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0xfff3e2,
      map: engraveTex,
      transparent: true,
      metalness: 0.7,
      roughness: 0.12,
      emissive: 0x3a2a16,
      emissiveIntensity: 0.6,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
    }),
  );
  const engrave = new THREE.Mesh(
    track(new THREE.CylinderGeometry(RO + 0.002, RO + 0.002, HH * 1.6, 256, 1, true, -Math.PI, Math.PI * 2)),
    engraveMat,
  );
  spinner.add(engrave);

  // Black inner liner (glossy resin)
  const linerMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x060706,
      metalness: 0,
      roughness: 0.6,
      clearcoat: 0.25,
      clearcoatRoughness: 0.35,
      specularIntensity: 0.25,
      side: THREE.BackSide,
      envMapIntensity: 0.12,
    }),
  );
  spinner.add(new THREE.Mesh(track(new THREE.CylinderGeometry(RI - 0.006, RI - 0.006, HH * 2 - 0.09, 256, 1, true)), linerMat));

  // ── Inner sensor layout (from the design render), centred on local -Z
  const RS = RI - 0.03; // module surface radius
  const padMat = track(new THREE.MeshPhysicalMaterial({ color: 0xcfa671, metalness: 1, roughness: 0.2, clearcoat: 0.5, emissive: 0xffb860, emissiveIntensity: 0 }));
  const moduleMat = track(new THREE.MeshPhysicalMaterial({ color: 0x121514, metalness: 0.3, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.05 }));
  const ledMat = track(new THREE.MeshBasicMaterial({ color: LED.clone() }));
  const dotMat = track(new THREE.MeshBasicMaterial({ color: 0x1b1e1c }));
  const ledGeo = track(new THREE.CircleGeometry(0.024, 24));
  const glowTex = track(glowTexture());
  const ledGlows: THREE.Sprite[] = [];
  const padGlows: THREE.Sprite[] = [];

  const place = (obj: THREE.Object3D, angle: number, y: number, r: number) => {
    obj.position.set(Math.sin(angle + Math.PI) * r, y, Math.cos(angle + Math.PI) * r);
    obj.lookAt(0, y, 0); // face the finger (ring axis)
  };

  const addModule = (angle: number, w: number, h: number, leds: [number, number][]) => {
    const m = new THREE.Mesh(track(new RoundedBoxGeometry(w, h, 0.05, 3, 0.02)), moduleMat);
    place(m, angle, 0, RS);
    spinner.add(m);
    for (const [lx, ly] of leds) {
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(lx, ly, 0.027);
      m.add(led);
      const glow = new THREE.Sprite(
        track(new THREE.SpriteMaterial({ map: glowTex, color: LED, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending })),
      );
      glow.position.set(lx, ly, 0.06);
      glow.scale.setScalar(0.2);
      m.add(glow);
      ledGlows.push(glow);
    }
  };

  const addPad = (angle: number) => {
    const p = new THREE.Mesh(track(new RoundedBoxGeometry(0.17, 0.15, 0.04, 3, 0.018)), padMat);
    place(p, angle, 0, RS + 0.005);
    const dot = new THREE.Mesh(track(new THREE.CircleGeometry(0.012, 16)), dotMat);
    dot.position.z = 0.021;
    p.add(dot);
    spinner.add(p);
    const glow = new THREE.Sprite(
      track(new THREE.SpriteMaterial({ map: glowTex, color: 0xffcf8a, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending })),
    );
    glow.position.set(0, 0, 0.08);
    glow.scale.setScalar(0.42);
    p.add(glow);
    padGlows.push(glow);
  };

  const d = 0.045;
  addPad(-0.46);
  addModule(-0.23, 0.17, 0.17, [
    [-d, d],
    [d, d * 0.2],
    [-d * 0.4, -d],
  ]);
  addModule(0, 0.22, 0.22, [
    [-d * 1.1, d * 1.1],
    [d * 1.1, d * 1.1],
    [-d * 1.1, -d * 1.1],
    [d * 1.1, -d * 1.1],
  ]);
  addModule(0.23, 0.17, 0.17, [
    [-d, -d * 0.6],
    [d, d],
    [d * 0.3, -d],
  ]);
  addPad(0.46);

  // ── Story-only ambience: motion particles + orbit lines
  const ambient = new THREE.Group();
  tilt.add(ambient);
  const P = 420;
  const pPos = new Float32Array(P * 3);
  const pSeed = new Float32Array(P);
  for (let i = 0; i < P; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 1.5 + Math.random() * 0.75;
    pSeed[i] = (Math.random() - 0.5) * 0.9;
    pPos[i * 3] = Math.cos(a) * r;
    pPos[i * 3 + 1] = pSeed[i];
    pPos[i * 3 + 2] = Math.sin(a) * r;
  }
  const pGeo = track(new THREE.BufferGeometry());
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  const pMat = track(
    new THREE.PointsMaterial({ color: 0xfbfaf6, size: 0.022, transparent: true, opacity: 0.2, depthWrite: false, blending: THREE.AdditiveBlending, map: glowTex }),
  );
  const particles = new THREE.Points(pGeo, pMat);
  ambient.add(particles);

  const orbitMats: THREE.LineBasicMaterial[] = [];
  const orbits = new THREE.Group();
  [
    [1.6, 0.25, 0.1],
    [1.85, -0.35, 0.6],
    [2.15, 0.5, -0.4],
  ].forEach(([r, rx, rz]) => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 256; i++) {
      const a = (i / 256) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
    }
    const mat = track(new THREE.LineBasicMaterial({ color: 0xfbfaf6, transparent: true, opacity: 0.1, depthWrite: false }));
    orbitMats.push(mat);
    const line = new THREE.LineLoop(track(new THREE.BufferGeometry().setFromPoints(pts)), mat);
    line.rotation.set(rx, 0, rz);
    orbits.add(line);
  });
  ambient.add(orbits);
  ambient.visible = opts.mode === "story";

  // ── State
  const cur: Key = { ...(opts.mode === "story" ? STORY[0] : SHOWCASE) };
  const target: Key = { ...cur };
  let progress = 0;
  let active = true;
  let raf = 0;
  let last = performance.now();
  let t = 0;

  // user rotation (drag / keys)
  let yaw = 0;
  let pitch = 0;
  let vYaw = 0;
  let vPitch = 0;
  let dragging = false;
  let lastInteraction = -10;

  function keyAt(p: number): Key {
    if (opts.mode === "showcase") return SHOWCASE;
    const s = clamp(p * (STORY.length - 1), 0, STORY.length - 1);
    const i = Math.floor(s);
    const j = Math.min(STORY.length - 1, i + 1);
    const f = smoothstep(clamp((s - i - 0.2) / 0.6, 0, 1));
    const a = STORY[i];
    const b = STORY[j];
    const out = {} as Key;
    (Object.keys(a) as (keyof Key)[]).forEach((k) => (out[k] = lerp(a[k], b[k], f)));
    return out;
  }

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const width = Math.max(1, parent.clientWidth);
    const height = Math.max(1, parent.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = camera.aspect < 0.8 ? 38 : 30;
    camera.updateProjectionMatrix();
  }

  // ── Pointer interaction
  let px = 0;
  let py = 0;
  let pid: number | null = null;
  const onDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    dragging = true;
    pid = e.pointerId;
    px = e.clientX;
    py = e.clientY;
    vYaw = vPitch = 0;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = "grabbing";
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging || e.pointerId !== pid) return;
    const dx = e.clientX - px;
    const dy = e.clientY - py;
    px = e.clientX;
    py = e.clientY;
    const ky = 0.0085;
    yaw += dx * ky;
    pitch = clamp(pitch + dy * ky * 0.75, -1.1, 1.1);
    vYaw = dx * ky * 60;
    vPitch = dy * ky * 0.75 * 60;
    lastInteraction = t;
  };
  const onUp = (e: PointerEvent) => {
    if (e.pointerId !== pid) return;
    dragging = false;
    pid = null;
    lastInteraction = t;
    canvas.style.cursor = "grab";
  };
  if (opts.interactive) {
    canvas.style.cursor = "grab";
    canvas.style.touchAction = "pan-y"; // vertical swipes still scroll the page
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
  }

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    if (!active) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    t += dt;
    const motionT = opts.reducedMotion ? 0 : t;

    Object.assign(target, keyAt(progress));
    const snap =
      opts.reducedMotion ||
      (process.env.NODE_ENV !== "production" && (window as unknown as { __ringSnap?: boolean }).__ringSnap);
    const k = snap ? 1 : 1 - Math.exp(-dt * 3.2);
    (Object.keys(cur) as (keyof Key)[]).forEach((key) => (cur[key] = lerp(cur[key], target[key], k)));

    // user rotation: inertia while released; story mode eases back to its pose after a pause
    if (!dragging) {
      yaw += vYaw * dt;
      pitch = clamp(pitch + vPitch * dt, -1.1, 1.1);
      const damp = Math.exp(-dt * 3.5);
      vYaw *= damp;
      vPitch *= damp;
      const idle = t - lastInteraction;
      if (opts.mode === "story" && idle > 2.5) {
        const back = 1 - Math.exp(-dt * 1.6);
        yaw = lerp(yaw, Math.round(yaw / (Math.PI * 2)) * Math.PI * 2, back);
        pitch = lerp(pitch, 0, back);
      }
      if (opts.mode === "showcase" && !opts.reducedMotion && idle > 1.5) {
        yaw += dt * 0.32; // slow turntable when untouched
        pitch = lerp(pitch, 0, 1 - Math.exp(-dt * 0.8));
      }
    }

    const sway = opts.reducedMotion || opts.mode === "showcase" ? 0 : Math.sin(motionT * 0.45) * 0.06;
    root.rotation.y = yaw;
    root.position.x = opts.mode === "showcase" ? 0.28 : 0;
    tilt.rotation.set(cur.tilt + sway * 0.5 + pitch, 0, cur.roll);
    spinner.rotation.y = cur.spin + sway;
    camera.position.set(0, cur.lookY * 0.4, cur.camZ);
    camera.lookAt(0, cur.lookY, 0);

    // Green LEDs pulse like a heartbeat
    const beat = (x: number) => Math.exp(-((x - 0.1) ** 2) / 0.003) + 0.45 * Math.exp(-((x - 0.32) ** 2) / 0.004);
    const pulse = cur.pulse * (0.45 + 0.55 * beat((motionT * 1.05) % 1));
    ledMat.color.copy(LED).multiplyScalar(0.6 + pulse * 0.8);
    for (const g of ledGlows) (g.material as THREE.SpriteMaterial).opacity = pulse * 0.85;

    const warm = cur.temp * (0.75 + 0.25 * Math.sin(motionT * 1.6));
    padMat.emissiveIntensity = warm * 0.5;
    for (const g of padGlows) (g.material as THREE.SpriteMaterial).opacity = warm * 0.7;

    if (ambient.visible) {
      const energy = cur.motion;
      pMat.opacity = 0.1 + energy * 0.55;
      particles.rotation.y += dt * (0.04 + energy * 0.9);
      if (energy > 0.2 && !opts.reducedMotion) {
        for (let i = 0; i < P; i++) pPos[i * 3 + 1] = pSeed[i] + Math.sin(t * 2 + i) * 0.05 * energy;
        pGeo.attributes.position.needsUpdate = true;
      }
      orbitMats.forEach((m, i) => (m.opacity = 0.05 + cur.orbit * (0.16 - i * 0.03)));
      orbits.rotation.y += dt * 0.06;
    }

    renderer.render(scene, camera);
  }

  resize();
  raf = requestAnimationFrame(frame);

  return {
    setProgress(p) {
      progress = clamp(p, 0, 1);
    },
    setActive(a) {
      active = a;
      if (a) last = performance.now();
    },
    nudge(dYaw, dPitch) {
      yaw += dYaw;
      pitch = clamp(pitch + dPitch, -1.1, 1.1);
      lastInteraction = t;
    },
    resize,
    dispose() {
      cancelAnimationFrame(raf);
      if (opts.interactive) {
        canvas.removeEventListener("pointerdown", onDown);
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerup", onUp);
        canvas.removeEventListener("pointercancel", onUp);
      }
      disposables.forEach((x) => x.dispose());
      env.dispose();
      pmrem.dispose();
      envScene.traverse((o) => (o as THREE.Mesh).geometry?.dispose?.());
      renderer.dispose();
    },
  };
}
