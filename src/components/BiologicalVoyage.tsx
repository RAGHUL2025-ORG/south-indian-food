'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

/* ───────────────────────────────────────────────────────
   GLSL Shaders
   ─────────────────────────────────────────────────────── */

const CHROMATIC_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const CHROMATIC_FRAGMENT = /* glsl */ `
  uniform sampler2D tDiffuse;
  uniform float uAberration;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    vec2 center = vec2(0.5);
    vec2 dir = vUv - center;
    float dist = length(dir);

    float aberr = uAberration * dist * 0.02;

    float r = texture2D(tDiffuse, vUv + dir * aberr).r;
    float g = texture2D(tDiffuse, vUv).g;
    float b = texture2D(tDiffuse, vUv - dir * aberr).b;

    // Vignette
    float vignette = 1.0 - dist * 1.2;
    vignette = clamp(vignette, 0.0, 1.0);
    vignette = pow(vignette, 1.5);

    // Scanline
    float scanline = 0.95 + 0.05 * sin(vUv.y * uResolution.y * 1.5 + uTime * 2.0);

    vec3 color = vec3(r, g, b) * vignette * scanline;

    // Medical-grade blue-tint grading
    color = color * vec3(0.85, 0.92, 1.0);

    gl_FragColor = vec4(color, 1.0);
  }
`;

/* ───────────────────────────────────────────────────────
   MRI Slice Texture Generator
   ─────────────────────────────────────────────────────── */

function generateMRITexture(index: number, size: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const cx = size / 2;
  const cy = size / 2;

  // Dark background
  ctx.fillStyle = '#000508';
  ctx.fillRect(0, 0, size, size);

  const seed = index * 137.5;

  // Organic brain-like cross-section structures
  const layers = 4 + Math.floor(pseudoRandom(seed) * 4);
  for (let l = 0; l < layers; l++) {
    const phase = seed + l * 47.3;
    const baseRadius = (size * 0.15) + pseudoRandom(phase) * size * 0.25;
    const offsetX = (pseudoRandom(phase + 1) - 0.5) * size * 0.2;
    const offsetY = (pseudoRandom(phase + 2) - 0.5) * size * 0.2;
    const intensity = 30 + Math.floor(pseudoRandom(phase + 3) * 60);

    // Organic blob via overlapping radial gradients
    const grad = ctx.createRadialGradient(
      cx + offsetX, cy + offsetY, 0,
      cx + offsetX, cy + offsetY, baseRadius
    );
    grad.addColorStop(0, `rgba(${intensity + 40}, ${intensity + 60}, ${intensity + 80}, 0.6)`);
    grad.addColorStop(0.5, `rgba(${intensity + 20}, ${intensity + 30}, ${intensity + 50}, 0.3)`);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();

    // Deformed circle for organic appearance
    const points = 64;
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const noise = 1.0 + 0.3 * Math.sin(angle * 3 + phase) + 0.15 * Math.cos(angle * 7 + phase * 2);
      const r = baseRadius * noise;
      const x = cx + offsetX + Math.cos(angle) * r;
      const y = cy + offsetY + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }

  // Cellular structures - small dots
  const cellCount = 20 + Math.floor(pseudoRandom(seed + 100) * 40);
  for (let c = 0; c < cellCount; c++) {
    const cp = seed + 200 + c * 31.7;
    const cellX = pseudoRandom(cp) * size;
    const cellY = pseudoRandom(cp + 1) * size;
    const cellR = 1 + pseudoRandom(cp + 2) * 4;
    const brightness = 40 + Math.floor(pseudoRandom(cp + 3) * 80);

    // Only draw cells within the "body" region
    const dx = cellX - cx;
    const dy = cellY - cy;
    if (Math.sqrt(dx * dx + dy * dy) < size * 0.42) {
      ctx.fillStyle = `rgba(${brightness}, ${brightness + 20}, ${brightness + 40}, 0.7)`;
      ctx.beginPath();
      ctx.arc(cellX, cellY, cellR, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Vascular/neural pathways
  const pathCount = 2 + Math.floor(pseudoRandom(seed + 300) * 3);
  for (let p = 0; p < pathCount; p++) {
    const pp = seed + 400 + p * 53.1;
    ctx.strokeStyle = `rgba(60, 90, 140, ${0.2 + pseudoRandom(pp) * 0.3})`;
    ctx.lineWidth = 0.5 + pseudoRandom(pp + 1) * 1.5;
    ctx.beginPath();
    let px = cx + (pseudoRandom(pp + 2) - 0.5) * size * 0.3;
    let py = cy + (pseudoRandom(pp + 3) - 0.5) * size * 0.3;
    ctx.moveTo(px, py);
    const segments = 8 + Math.floor(pseudoRandom(pp + 4) * 12);
    for (let s = 0; s < segments; s++) {
      px += (pseudoRandom(pp + 5 + s) - 0.5) * 40;
      py += (pseudoRandom(pp + 6 + s) - 0.5) * 40;
      ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  // Outer body boundary ring
  ctx.strokeStyle = 'rgba(40, 70, 110, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  const bPoints = 80;
  for (let i = 0; i <= bPoints; i++) {
    const angle = (i / bPoints) * Math.PI * 2;
    const noise = 1.0 + 0.08 * Math.sin(angle * 5 + seed) + 0.04 * Math.cos(angle * 11 + seed * 2);
    const r = size * 0.42 * noise;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/* ───────────────────────────────────────────────────────
   Cellular Particle System
   ─────────────────────────────────────────────────────── */

function createCellParticles(count: number, tunnelDepth: number): THREE.Points {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const opacities = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 1.5 + Math.random() * 3.5;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius;
    positions[i * 3 + 2] = -Math.random() * tunnelDepth;
    sizes[i] = 2 + Math.random() * 6;
    opacities[i] = 0.2 + Math.random() * 0.6;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    },
    vertexShader: /* glsl */ `
      attribute float aSize;
      attribute float aOpacity;
      uniform float uTime;
      uniform float uPixelRatio;
      varying float vOpacity;
      void main() {
        vOpacity = aOpacity;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uPixelRatio * (80.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vOpacity;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float alpha = vOpacity * (1.0 - d * 2.0);
        alpha *= smoothstep(0.5, 0.2, d);
        gl_FragColor = vec4(0.3, 0.55, 0.8, alpha * 0.5);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}

/* ───────────────────────────────────────────────────────
   Main Component
   ─────────────────────────────────────────────────────── */

const TUNNEL_DEPTH = 500;
const SLICE_COUNT = 60;
const SLICE_SPACING = TUNNEL_DEPTH / SLICE_COUNT;
const TEXTURE_SIZE = 512;

export default function BiologicalVoyage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef({
    position: 0,
    velocity: 0,
    targetVelocity: 0,
    lastTime: 0,
  });
  const hudRef = useRef({
    depth: 0,
    velocity: 0,
  });

  const initScene = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000810);
    renderer.autoClear = false;
    container.appendChild(renderer.domElement);

    /* ── Main Scene ── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000810, 0.008);

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    /* ── Post-processing Scene ── */
    const postScene = new THREE.Scene();
    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth * Math.min(window.devicePixelRatio, 2),
      window.innerHeight * Math.min(window.devicePixelRatio, 2)
    );

    const postMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: renderTarget.texture },
        uAberration: { value: 0 },
        uTime: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      vertexShader: CHROMATIC_VERTEX,
      fragmentShader: CHROMATIC_FRAGMENT,
    });

    const postQuad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      postMaterial
    );
    postScene.add(postQuad);

    /* ── Lighting ── */
    const ambientLight = new THREE.AmbientLight(0x1a2a4a, 0.5);
    scene.add(ambientLight);

    const headLight = new THREE.PointLight(0x4488cc, 2, 50);
    headLight.position.set(0, 0, 5);
    scene.add(headLight);

    const rimLight1 = new THREE.PointLight(0x2244aa, 1, 30);
    rimLight1.position.set(3, 2, 0);
    scene.add(rimLight1);

    const rimLight2 = new THREE.PointLight(0x113366, 0.8, 30);
    rimLight2.position.set(-3, -2, 0);
    scene.add(rimLight2);

    /* ── MRI Tunnel Slices ── */
    const slices: THREE.Mesh[] = [];
    const textures: THREE.CanvasTexture[] = [];

    for (let i = 0; i < SLICE_COUNT; i++) {
      const texture = generateMRITexture(i, TEXTURE_SIZE);
      textures.push(texture);

      const geometry = new THREE.RingGeometry(1.8, 5.5, 64, 1);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
        emissive: new THREE.Color(0x0a1428),
        emissiveIntensity: 0.3,
        roughness: 0.8,
        metalness: 0.1,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = -i * SLICE_SPACING;
      mesh.rotation.z = i * 0.05;
      scene.add(mesh);
      slices.push(mesh);
    }

    /* ── Inner Tunnel Geometry ── */
    const tunnelGeometry = new THREE.CylinderGeometry(1.8, 1.8, TUNNEL_DEPTH, 32, 1, true);
    const tunnelMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a1428,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.15,
      roughness: 1,
      metalness: 0,
    });
    const tunnel = new THREE.Mesh(tunnelGeometry, tunnelMaterial);
    tunnel.rotation.x = Math.PI / 2;
    tunnel.position.z = -TUNNEL_DEPTH / 2;
    scene.add(tunnel);

    /* ── Outer Shell ── */
    const outerGeometry = new THREE.CylinderGeometry(5.5, 5.5, TUNNEL_DEPTH, 32, 1, true);
    const outerMaterial = new THREE.MeshStandardMaterial({
      color: 0x050d1a,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.3,
      roughness: 1,
      metalness: 0.2,
    });
    const outerTunnel = new THREE.Mesh(outerGeometry, outerMaterial);
    outerTunnel.rotation.x = Math.PI / 2;
    outerTunnel.position.z = -TUNNEL_DEPTH / 2;
    scene.add(outerTunnel);

    /* ── Cellular Particles ── */
    const particles = createCellParticles(800, TUNNEL_DEPTH);
    scene.add(particles);

    /* ── Axonal Filaments ── */
    for (let f = 0; f < 12; f++) {
      const curve = new THREE.CatmullRomCurve3(
        Array.from({ length: 20 }, (_, j) => {
          const angle = f * (Math.PI * 2 / 12) + j * 0.1;
          const radius = 2.5 + Math.sin(j * 0.5 + f) * 1.5;
          return new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            -j * (TUNNEL_DEPTH / 20)
          );
        })
      );
      const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.02, 4, false);
      const tubeMaterial = new THREE.MeshBasicMaterial({
        color: 0x1a3a6a,
        transparent: true,
        opacity: 0.25,
      });
      scene.add(new THREE.Mesh(tubeGeometry, tubeMaterial));
    }

    /* ── Scroll & Inertia System ── */
    const scroll = scrollRef.current;
    scroll.lastTime = performance.now();

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scroll.targetVelocity += e.deltaY * 0.003;
    };

    const handleTouch = (() => {
      let lastTouchY = 0;
      return {
        start: (e: TouchEvent) => {
          lastTouchY = e.touches[0].clientY;
        },
        move: (e: TouchEvent) => {
          e.preventDefault();
          const deltaY = lastTouchY - e.touches[0].clientY;
          lastTouchY = e.touches[0].clientY;
          scroll.targetVelocity += deltaY * 0.005;
        },
      };
    })();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        scroll.targetVelocity += 0.5;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        scroll.targetVelocity -= 0.5;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouch.start, { passive: true });
    container.addEventListener('touchmove', handleTouch.move, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    /* ── Animation Loop ── */
    let animationId: number;
    let textureSwapCounter = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - scroll.lastTime) / 1000, 0.05);
      scroll.lastTime = now;
      const elapsed = clock.getElapsedTime();

      // Inertial momentum
      const friction = 0.92;
      const smoothing = 0.15;
      scroll.velocity += (scroll.targetVelocity - scroll.velocity) * smoothing;
      scroll.targetVelocity *= friction;
      scroll.position += scroll.velocity * dt * 60;

      // Auto-drift for ambient motion
      scroll.position += dt * 1.2;

      const absVelocity = Math.abs(scroll.velocity);

      // Update HUD data
      hudRef.current.depth = scroll.position;
      hudRef.current.velocity = absVelocity;

      // Move slices for infinite tunnel effect
      for (let i = 0; i < slices.length; i++) {
        const slice = slices[i];
        let z = -i * SLICE_SPACING + (scroll.position % TUNNEL_DEPTH);
        if (z > 10) z -= TUNNEL_DEPTH;
        if (z < -(TUNNEL_DEPTH - 10)) z += TUNNEL_DEPTH;
        slice.position.z = z;

        // Subtle rotation based on depth
        slice.rotation.z = i * 0.05 + elapsed * 0.05;

        // Opacity based on distance
        const dist = Math.abs(z);
        const mat = slice.material as THREE.MeshStandardMaterial;
        mat.opacity = Math.max(0, 0.6 - dist * 0.0012);

        // Emissive pulse based on velocity
        const pulseIntensity = 0.3 + absVelocity * 0.15;
        mat.emissiveIntensity = pulseIntensity;
      }

      // Swap textures periodically for variety
      textureSwapCounter++;
      if (textureSwapCounter % 120 === 0) {
        const idx = Math.floor(Math.random() * slices.length);
        const oldMat = slices[idx].material as THREE.MeshStandardMaterial;
        if (oldMat.map) oldMat.map.dispose();
        const newTex = generateMRITexture(
          Math.floor(Math.random() * 10000),
          TEXTURE_SIZE
        );
        oldMat.map = newTex;
        oldMat.needsUpdate = true;
      }

      // Camera subtle sway
      camera.position.x = Math.sin(elapsed * 0.3) * 0.15;
      camera.position.y = Math.cos(elapsed * 0.4) * 0.1;

      // Headlight follows camera
      headLight.position.copy(camera.position);
      headLight.position.z = camera.position.z + 2;

      // Update particle time uniform
      const particleMat = particles.material as THREE.ShaderMaterial;
      particleMat.uniforms.uTime.value = elapsed;

      // Particle recycling for infinite depth
      const positions = particles.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        let pz = positions.getZ(i) + scroll.velocity * dt * 60 * 0.5;
        pz += dt * 1.2;
        if (pz > 10) pz -= TUNNEL_DEPTH;
        if (pz < -(TUNNEL_DEPTH - 10)) pz += TUNNEL_DEPTH;
        positions.setZ(i, pz);
      }
      positions.needsUpdate = true;

      // Chromatic aberration proportional to velocity
      postMaterial.uniforms.uAberration.value =
        Math.min(absVelocity * 3, 15);
      postMaterial.uniforms.uTime.value = elapsed;

      // Render to target, then post-process
      renderer.setRenderTarget(renderTarget);
      renderer.clear();
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(postScene, postCamera);
    };

    animate();

    /* ── HUD Updater ── */
    const hudDepthEl = document.getElementById('hud-depth');
    const hudVelocityEl = document.getElementById('hud-velocity');
    const hudBarEl = document.getElementById('hud-velocity-bar');

    const hudInterval = setInterval(() => {
      const depth = hudRef.current.depth;
      const vel = hudRef.current.velocity;
      if (hudDepthEl)
        hudDepthEl.textContent = `${(depth * 0.1).toFixed(1)} mm`;
      if (hudVelocityEl)
        hudVelocityEl.textContent = `${(vel * 100).toFixed(0)} um/s`;
      if (hudBarEl) {
        const barWidth = Math.min(vel * 20, 100);
        hudBarEl.style.width = `${barWidth}%`;
        if (vel > 3) hudBarEl.style.backgroundColor = '#ff4444';
        else if (vel > 1.5) hudBarEl.style.backgroundColor = '#44aaff';
        else hudBarEl.style.backgroundColor = '#22ff88';
      }
    }, 50);

    /* ── Resize Handler ── */
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderTarget.setSize(w * dpr, h * dpr);
      postMaterial.uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener('resize', handleResize);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(hudInterval);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouch.start);
      container.removeEventListener('touchmove', handleTouch.move);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      renderTarget.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const cleanup = initScene();
    return () => {
      if (cleanup) cleanup();
    };
  }, [initScene]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full"
      style={{ background: '#000810', cursor: 'none', overflow: 'hidden' }}
    >
      {/* HUD Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Top-left: Title & Depth */}
        <div className="absolute top-6 left-6">
          <div
            className="text-[10px] tracking-[0.35em] uppercase"
            style={{ color: 'rgba(68, 136, 204, 0.6)', fontFamily: 'var(--font-geist-mono)' }}
          >
            Biological Voyage
          </div>
          <div
            className="text-[28px] font-light mt-1"
            style={{ color: 'rgba(180, 210, 240, 0.9)', fontFamily: 'var(--font-geist-mono)' }}
          >
            <span className="text-[12px] block" style={{ color: 'rgba(68, 136, 204, 0.5)' }}>
              Depth
            </span>
            <span id="hud-depth">0.0 mm</span>
          </div>
        </div>

        {/* Top-right: Velocity */}
        <div className="absolute top-6 right-6 text-right">
          <div
            className="text-[10px] tracking-[0.35em] uppercase"
            style={{ color: 'rgba(68, 136, 204, 0.6)', fontFamily: 'var(--font-geist-mono)' }}
          >
            Traverse Velocity
          </div>
          <div
            className="text-[22px] font-light mt-1"
            id="hud-velocity"
            style={{ color: 'rgba(180, 210, 240, 0.9)', fontFamily: 'var(--font-geist-mono)' }}
          >
            0 um/s
          </div>
          <div
            className="mt-2 h-[2px] rounded-full"
            style={{
              background: 'rgba(68, 136, 204, 0.15)',
              width: '120px',
              marginLeft: 'auto',
            }}
          >
            <div
              id="hud-velocity-bar"
              className="h-full rounded-full transition-all duration-150"
              style={{ width: '0%', backgroundColor: '#22ff88' }}
            />
          </div>
        </div>

        {/* Bottom-left: Metadata */}
        <div className="absolute bottom-6 left-6">
          <div
            className="text-[9px] tracking-[0.2em] uppercase leading-relaxed"
            style={{ color: 'rgba(68, 136, 204, 0.35)', fontFamily: 'var(--font-geist-mono)' }}
          >
            Volumetric MRI &middot; Axial Plane
            <br />
            512 x 512 &middot; T2-Weighted
            <br />
            Chromatic Aberration &middot; Active
          </div>
        </div>

        {/* Bottom-right: Controls hint */}
        <div className="absolute bottom-6 right-6 text-right">
          <div
            className="text-[9px] tracking-[0.2em] uppercase leading-relaxed"
            style={{ color: 'rgba(68, 136, 204, 0.35)', fontFamily: 'var(--font-geist-mono)' }}
          >
            Scroll / Arrow Keys to Navigate
            <br />
            Velocity Modulates Aberration
          </div>
        </div>

        {/* Center crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="6" stroke="rgba(68,136,204,0.2)" strokeWidth="0.5" />
            <line x1="12" y1="4" x2="12" y2="8" stroke="rgba(68,136,204,0.15)" strokeWidth="0.5" />
            <line x1="12" y1="16" x2="12" y2="20" stroke="rgba(68,136,204,0.15)" strokeWidth="0.5" />
            <line x1="4" y1="12" x2="8" y2="12" stroke="rgba(68,136,204,0.15)" strokeWidth="0.5" />
            <line x1="16" y1="12" x2="20" y2="12" stroke="rgba(68,136,204,0.15)" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
