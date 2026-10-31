/**
 * DHARUN P — Cinematic 3D WebGL Hero Experience
 * Built with Three.js
 * Features:
 * - Interactive Neon Red Polyhedral Energy Core
 * - Gyroscopic Dual Orbit Rings
 * - 800+ Particle Cinematic Dust Constellation
 * - Responsive Mouse & Touch Inertia Rotation
 * - Optimized 60 FPS Render Loop
 */

(function initThreeScene() {
  const container = document.getElementById('three-canvas-wrap');
  const canvas = document.getElementById('three-canvas');
  if (!container || !canvas || typeof THREE === 'undefined') return;

  // Check reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.035);

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 18;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 3D Master Group
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // Position master group slightly to the right on larger screens for composition
  function updateComposition() {
    if (window.innerWidth > 1024) {
      masterGroup.position.x = 4.2;
      camera.position.z = 16;
    } else {
      masterGroup.position.x = 0;
      masterGroup.position.y = -1.2;
      camera.position.z = 19;
    }
  }
  updateComposition();

  // 1. Core Polyhedron (Icosahedron)
  const coreGeom = new THREE.IcosahedronGeometry(2.4, 1);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x830000,
    wireframe: true,
    transparent: true,
    opacity: 0.85
  });
  const coreMesh = new THREE.Mesh(coreGeom, coreMat);
  masterGroup.add(coreMesh);

  // 1b. Inner Glowing Nucleus
  const nucleusGeom = new THREE.OctahedronGeometry(1.2, 0);
  const nucleusMat = new THREE.MeshBasicMaterial({
    color: 0xFF0000,
    wireframe: false,
    transparent: true,
    opacity: 0.75
  });
  const nucleusMesh = new THREE.Mesh(nucleusGeom, nucleusMat);
  masterGroup.add(nucleusMesh);

  // 1c. Vertices Glowing Points
  const verticesMat = new THREE.PointsMaterial({
    color: 0xFF0000,
    size: 0.22,
    transparent: true,
    opacity: 0.95
  });
  const corePoints = new THREE.Points(coreGeom, verticesMat);
  masterGroup.add(corePoints);

  // 2. Outer Geodesic Sphere
  const outerGeom = new THREE.IcosahedronGeometry(3.6, 2);
  const outerMat = new THREE.MeshBasicMaterial({
    color: 0xBC0202,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const outerMesh = new THREE.Mesh(outerGeom, outerMat);
  masterGroup.add(outerMesh);

  // 3. Gyroscopic Orbital Rings
  const ringGeom1 = new THREE.TorusGeometry(4.8, 0.025, 16, 100);
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: 0xFF0000,
    transparent: true,
    opacity: 0.65
  });
  const ring1 = new THREE.Mesh(ringGeom1, ringMat1);
  ring1.rotation.x = Math.PI / 3;
  masterGroup.add(ring1);

  const ringGeom2 = new THREE.TorusGeometry(5.4, 0.02, 16, 100);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0x830000,
    transparent: true,
    opacity: 0.5
  });
  const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
  ring2.rotation.y = Math.PI / 4;
  ring2.rotation.x = Math.PI / 6;
  masterGroup.add(ring2);

  // 4. Particle Constellation (850 particles)
  const particleCount = 850;
  const particleGeom = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);

  const colorPalette = [
    new THREE.Color(0xFF0000), // bright red
    new THREE.Color(0xBC0202), // mid red
    new THREE.Color(0x830000), // dark red
    new THREE.Color(0xFFFFFF), // white
    new THREE.Color(0xB9A9A9)  // muted secondary
  ];

  for (let i = 0; i < particleCount; i++) {
    const radius = 3.5 + Math.random() * 16;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i * 3 + 2] = radius * Math.cos(phi);

    const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    particleColors[i * 3] = c.r;
    particleColors[i * 3 + 1] = c.g;
    particleColors[i * 3 + 2] = c.b;
  }

  particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particleField = new THREE.Points(particleGeom, particleMat);
  scene.add(particleField);

  // 5. Lighting
  const ambientLight = new THREE.AmbientLight(0x830000, 1.2);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xFF0000, 3.5, 50);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const pointLightSub = new THREE.PointLight(0xBC0202, 2.5, 40);
  pointLightSub.position.set(-5, -5, -2);
  scene.add(pointLightSub);

  // 6. Mouse / Touch Interaction with Inertia
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouseX = x;
    mouseY = y;
  }, { passive: true });

  // Touch and drag rotation
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    targetRotationY += deltaX * 0.006;
    targetRotationX += deltaY * 0.006;

    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;

    targetRotationY += deltaX * 0.008;
    targetRotationX += deltaY * 0.008;

    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });

  // 7. Responsive Resize
  function onWindowResize() {
    if (!container || !renderer || !camera) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    updateComposition();
  }
  window.addEventListener('resize', onWindowResize, { passive: true });

  // 8. Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    if (!prefersReduced) {
      // Natural idle rotation
      coreMesh.rotation.y += delta * 0.35;
      coreMesh.rotation.x += delta * 0.2;

      nucleusMesh.rotation.y -= delta * 0.55;
      nucleusMesh.rotation.z += delta * 0.3;

      outerMesh.rotation.y -= delta * 0.15;
      outerMesh.rotation.z += delta * 0.1;

      ring1.rotation.z += delta * 0.4;
      ring2.rotation.z -= delta * 0.3;

      particleField.rotation.y = elapsedTime * 0.035;
      particleField.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;

      // Pulse nucleus breathing
      const scale = 1 + Math.sin(elapsedTime * 2.5) * 0.12;
      nucleusMesh.scale.set(scale, scale, scale);

      // Inertia mouse follow
      targetRotationY += (mouseX * 0.6 - targetRotationY) * 0.04;
      targetRotationX += (-mouseY * 0.6 - targetRotationX) * 0.04;

      masterGroup.rotation.y = targetRotationY;
      masterGroup.rotation.x = targetRotationX;
    }

    renderer.render(scene, camera);
  }

  animate();
})();

