import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * HeroScene - Premium ThreeUI-Style 3D Interactive Hero Canvas
 * Features a central ceramic coral/peach geometric sculpture, orbiting lavender satellites,
 * warm lighting, and mouse-directed interactive tilt.
 */
const HeroScene = ({ className = '' }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // Warm Ambient Light
    const ambientLight = new THREE.AmbientLight(0xfff8ed, 1.4);
    scene.add(ambientLight);

    // Directional Key Light (Coral / Peach warmth)
    const keyLight = new THREE.DirectionalLight(0xf5b895, 2.5);
    keyLight.position.set(12, 16, 14);
    scene.add(keyLight);

    // Fill Light (Lavender softness from below-left)
    const fillLight = new THREE.DirectionalLight(0xb9a7e8, 1.8);
    fillLight.position.set(-14, -8, 10);
    scene.add(fillLight);

    // Soft Rim Light
    const rimLight = new THREE.PointLight(0xe9785b, 3, 25);
    rimLight.position.set(0, 10, -5);
    scene.add(rimLight);

    // Group for all rotating 3D objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Central 3D Sculpture: Glossy Ceramic Coral Torus Knot
    const knotGeometry = new THREE.TorusKnotGeometry(2.3, 0.65, 128, 32, 2, 3);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe9785b, // Coral
      roughness: 0.18,
      metalness: 0.08,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });
    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    mainGroup.add(knotMesh);

    // Inner Accent Core: Peach Icosahedron
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 0);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5b895, // Peach
      roughness: 0.25,
      metalness: 0.2,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    knotMesh.add(coreMesh);

    // Orbiting Satellite 1: Lavender Glass Sphere
    const sat1Geometry = new THREE.SphereGeometry(0.8, 32, 32);
    const sat1Material = new THREE.MeshPhysicalMaterial({
      color: 0xb9a7e8, // Lavender
      roughness: 0.1,
      metalness: 0.05,
      transmission: 0.55,
      ior: 1.4,
      transparent: true,
      opacity: 0.85,
    });
    const sat1 = new THREE.Mesh(sat1Geometry, sat1Material);
    sat1.position.set(4.8, 2.2, 1);
    mainGroup.add(sat1);

    // Orbiting Satellite 2: Sage Green Smooth Torus Ring
    const sat2Geometry = new THREE.TorusGeometry(1.2, 0.22, 16, 40);
    const sat2Material = new THREE.MeshStandardMaterial({
      color: 0x9db79b, // Sage Green
      roughness: 0.3,
      metalness: 0.1,
    });
    const sat2 = new THREE.Mesh(sat2Geometry, sat2Material);
    sat2.position.set(-4.5, -2, 2);
    sat2.rotation.x = Math.PI / 3;
    mainGroup.add(sat2);

    // Orbiting Satellite 3: Warm Peach Floating Gem
    const sat3Geometry = new THREE.OctahedronGeometry(0.7, 0);
    const sat3Material = new THREE.MeshPhysicalMaterial({
      color: 0xf5b895,
      roughness: 0.2,
      metalness: 0.3,
      clearcoat: 0.9,
    });
    const sat3 = new THREE.Mesh(sat3Geometry, sat3Material);
    sat3.position.set(3, -3.8, -1);
    mainGroup.add(sat3);

    // Micro Particle Cloud around the sculpture
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xf5b895,
      size: 0.28,
      transparent: true,
      opacity: 0.7,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleCloud);

    // Interactive Mouse Tracking with smooth lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (event) => {
      const rect = mount.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / rect.width - 0.5) * 2;
      mouseY = (y / rect.height - 0.5) * 2;
      targetRotationY = mouseX * 0.45;
      targetRotationX = -mouseY * 0.45;
    };

    mount.addEventListener('mousemove', onMouseMove, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!mount || !renderer || !camera) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // Render loop
    let animId;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Continuous smooth rotation
        knotMesh.rotation.x = elapsed * 0.22;
        knotMesh.rotation.y = elapsed * 0.28;
        coreMesh.rotation.y = -elapsed * 0.4;

        // Satellite orbital oscillation
        sat1.position.y = 2.2 + Math.sin(elapsed * 1.5) * 0.5;
        sat1.rotation.y = elapsed * 0.5;

        sat2.position.y = -2 + Math.cos(elapsed * 1.2) * 0.4;
        sat2.rotation.z = elapsed * 0.4;

        sat3.position.y = -3.8 + Math.sin(elapsed * 1.8) * 0.35;
        sat3.rotation.x = elapsed * 0.6;

        particleCloud.rotation.y = elapsed * 0.05;
      }

      // Smooth mouse lerp for the entire group
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.06;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.06;

      renderer.render(scene, camera);
    };

    renderLoop();

    // Clean up all resources
    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      knotGeometry.dispose();
      coreGeometry.dispose();
      sat1Geometry.dispose();
      sat2Geometry.dispose();
      sat3Geometry.dispose();
      particleGeo.dispose();

      knotMaterial.dispose();
      coreMaterial.dispose();
      sat1Material.dispose();
      sat2Material.dispose();
      sat3Material.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-[480px] md:h-[560px] flex items-center justify-center select-none ${className}`}
    >
      {/* Three.js canvas mounts here */}
    </div>
  );
};

export default HeroScene;
