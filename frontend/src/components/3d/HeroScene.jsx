import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * HeroScene - Premium ThreeUI 3D Interactive Hero Canvas
 * Features a floating translucent glass & copper sculpture, surrounded by reactive particles,
 * dynamic mouse-reactive lighting, and subtle parallax.
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
    camera.position.set(0, 0, 13.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    // Warm Ambient Light (Ivory)
    const ambientLight = new THREE.AmbientLight(0xfffdf7, 1.8);
    scene.add(ambientLight);

    // Dynamic Mouse-Reactive Key Light (Copper Warmth)
    const copperLight = new THREE.PointLight(0xb87333, 4, 30);
    copperLight.position.set(10, 12, 12);
    scene.add(copperLight);

    // Dynamic Fill Light (Soft Gold)
    const goldLight = new THREE.PointLight(0xd6a85f, 3, 25);
    goldLight.position.set(-10, -8, 8);
    scene.add(goldLight);

    // Subtle Sage Green Rim Light
    const rimLight = new THREE.PointLight(0x7e9278, 2, 20);
    rimLight.position.set(0, -10, -5);
    scene.add(rimLight);

    // Group for all rotating 3D objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Central 3D Sculpture: Translucent Glass & Copper Torus Knot
    const knotGeometry = new THREE.TorusKnotGeometry(2.2, 0.62, 128, 32, 2, 3);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xb87333, // Copper
      roughness: 0.12,
      metalness: 0.65,
      clearcoat: 0.95,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
    });
    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    mainGroup.add(knotMesh);

    // Floating Translucent Glass Outer Sphere
    const sphereGeometry = new THREE.SphereGeometry(3.1, 32, 32);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfffdf7, // Ivory
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.68,
      ior: 1.35,
      transparent: true,
      opacity: 0.45,
      clearcoat: 1.0,
    });
    const glassSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    mainGroup.add(glassSphere);

    // Inner Terracotta / Gold Geometric Core
    const coreGeometry = new THREE.IcosahedronGeometry(1.3, 0);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xc96b4b, // Terracotta
      roughness: 0.25,
      metalness: 0.45,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    knotMesh.add(coreMesh);

    // Orbiting Satellite 1: Soft Gold Torus Ring
    const sat1Geometry = new THREE.TorusGeometry(1.1, 0.18, 16, 48);
    const sat1Material = new THREE.MeshPhysicalMaterial({
      color: 0xd6a85f, // Soft Gold
      roughness: 0.15,
      metalness: 0.8,
      clearcoat: 0.9,
    });
    const sat1 = new THREE.Mesh(sat1Geometry, sat1Material);
    sat1.position.set(4.6, 2.2, 1);
    mainGroup.add(sat1);

    // Orbiting Satellite 2: Sage Green Smooth Gem
    const sat2Geometry = new THREE.OctahedronGeometry(0.7, 0);
    const sat2Material = new THREE.MeshPhysicalMaterial({
      color: 0x7e9278, // Sage Green
      roughness: 0.2,
      metalness: 0.3,
      clearcoat: 0.8,
    });
    const sat2 = new THREE.Mesh(sat2Geometry, sat2Material);
    sat2.position.set(-4.4, -2.2, 1.5);
    mainGroup.add(sat2);

    // Particle Swarm around the sculpture
    const particleCount = 55;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 4.5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xd6a85f, // Gold sparkles
      size: 0.26,
      transparent: true,
      opacity: 0.75,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleCloud);

    // Interactive Mouse Tracking
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

      // Dynamically move lighting slightly with cursor for specular shimmer
      copperLight.position.x = 10 + mouseX * 4;
      copperLight.position.y = 12 - mouseY * 4;
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
        knotMesh.rotation.x = elapsed * 0.22;
        knotMesh.rotation.y = elapsed * 0.28;
        coreMesh.rotation.y = -elapsed * 0.35;
        glassSphere.rotation.y = elapsed * 0.1;

        sat1.position.y = 2.2 + Math.sin(elapsed * 1.5) * 0.45;
        sat1.rotation.y = elapsed * 0.6;

        sat2.position.y = -2.2 + Math.cos(elapsed * 1.2) * 0.4;
        sat2.rotation.z = elapsed * 0.5;

        particleCloud.rotation.y = elapsed * 0.06;
      }

      // Smooth mouse parallax lerp
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    renderLoop();

    // Clean up
    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      knotGeometry.dispose();
      sphereGeometry.dispose();
      coreGeometry.dispose();
      sat1Geometry.dispose();
      sat2Geometry.dispose();
      particleGeo.dispose();

      knotMaterial.dispose();
      sphereMaterial.dispose();
      coreMaterial.dispose();
      sat1Material.dispose();
      sat2Material.dispose();
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
    />
  );
};

export default HeroScene;
