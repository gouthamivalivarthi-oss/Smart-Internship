import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * HeroScene - Premium ThreeUI 3D Interactive Hero Centerpiece
 * Replaces the old tube knot with an exquisite, faceted Floating Diamond & Gyroscope Core.
 * Features:
 * - Faceted geometric crystal that catches light on sharp polished planes (flatShading)
 * - Luminous inner energy sphere and delicate gold wireframe cage
 * - Three razor-thin gyroscopic orbital rings with glowing satellite beacons
 * - Orbiting faceted gems in copper, gold, and sage green
 * - Dynamic mouse-tracking studio lighting with specular reflections
 * - Micro golden stardust particles reacting to parallax
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
    camera.position.set(0, 0, 13);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.appendChild(renderer.domElement);

    // Warm Ambient Light (Pristine Ivory)
    const ambientLight = new THREE.AmbientLight(0xfffdf7, 2.0);
    scene.add(ambientLight);

    // Dynamic Key Light (Warm Soft Gold) - tracks mouse
    const keyLight = new THREE.PointLight(0xf3d08a, 4.5, 30);
    keyLight.position.set(8, 10, 10);
    scene.add(keyLight);

    // Fill Light (Polished Copper)
    const fillLight = new THREE.PointLight(0xd48c4d, 3.5, 25);
    fillLight.position.set(-8, -6, 8);
    scene.add(fillLight);

    // Rim Light (Terracotta / Gold Specular Highlight)
    const rimLight = new THREE.DirectionalLight(0xffeedd, 2.5);
    rimLight.position.set(0, 8, -6);
    scene.add(rimLight);

    // Main Group containing all objects
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // -------------------------------------------------------------
    // 1. Central Faceted Crystal Core (Luxury Polished Copper & Gold)
    // -------------------------------------------------------------
    const crystalGeo = new THREE.IcosahedronGeometry(1.9, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xd48c4d, // Polished radiant copper
      emissive: 0x3d2010,
      roughness: 0.1,
      metalness: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      flatShading: true, // Creates stunning faceted jewel reflections
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    heroGroup.add(crystalMesh);

    // Inner Luminous Core (Glowing Ivory Energy Sphere)
    const innerCoreGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0xfffdf7,
      emissive: 0xd6a85f,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.1,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    crystalMesh.add(innerCore);

    // Outer Delicate Wireframe Geodesic Cage (Soft Gold)
    const cageGeo = new THREE.IcosahedronGeometry(2.35, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xd6a85f,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    heroGroup.add(cageMesh);

    // -------------------------------------------------------------
    // 2. Three Sleek Razor-Thin Gyroscopic Orbital Rings
    // -------------------------------------------------------------
    const ringsGroup = new THREE.Group();
    heroGroup.add(ringsGroup);

    // Ring 1: Primary Copper Torus (horizontal-angled)
    const ring1Geo = new THREE.TorusGeometry(3.3, 0.04, 16, 120);
    const ring1Mat = new THREE.MeshPhysicalMaterial({
      color: 0xb87333,
      metalness: 0.95,
      roughness: 0.1,
      clearcoat: 1.0,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI * 0.35;
    ring1.rotation.y = Math.PI * 0.1;
    ringsGroup.add(ring1);

    // Beacon on Ring 1
    const beacon1Geo = new THREE.SphereGeometry(0.16, 16, 16);
    const beacon1Mat = new THREE.MeshStandardMaterial({
      color: 0xfffdf7,
      emissive: 0xb87333,
      emissiveIntensity: 1.2,
    });
    const beacon1 = new THREE.Mesh(beacon1Geo, beacon1Mat);
    ring1.add(beacon1);

    // Ring 2: Secondary Soft Gold Torus (vertical-angled)
    const ring2Geo = new THREE.TorusGeometry(3.75, 0.035, 16, 120);
    const ring2Mat = new THREE.MeshPhysicalMaterial({
      color: 0xd6a85f,
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 1.0,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI * 0.25;
    ring2.rotation.z = Math.PI * 0.35;
    ringsGroup.add(ring2);

    // Beacon on Ring 2
    const beacon2Geo = new THREE.SphereGeometry(0.14, 16, 16);
    const beacon2Mat = new THREE.MeshStandardMaterial({
      color: 0xfffdf7,
      emissive: 0xd6a85f,
      emissiveIntensity: 1.2,
    });
    const beacon2 = new THREE.Mesh(beacon2Geo, beacon2Mat);
    ring2.add(beacon2);

    // Ring 3: Outer Accent Torus (opposing axis)
    const ring3Geo = new THREE.TorusGeometry(4.2, 0.03, 16, 120);
    const ring3Mat = new THREE.MeshPhysicalMaterial({
      color: 0xe9e0d2,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.75,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI * 0.45;
    ringsGroup.add(ring3);

    // -------------------------------------------------------------
    // 3. Orbiting Faceted Crystal Satellites
    // -------------------------------------------------------------
    // Satellite 1: Gold Octahedron Gem
    const sat1Geo = new THREE.OctahedronGeometry(0.48, 0);
    const sat1Mat = new THREE.MeshPhysicalMaterial({
      color: 0xd6a85f,
      metalness: 0.85,
      roughness: 0.12,
      flatShading: true,
    });
    const sat1 = new THREE.Mesh(sat1Geo, sat1Mat);
    heroGroup.add(sat1);

    // Satellite 2: Sage Green Octahedron Gem
    const sat2Geo = new THREE.OctahedronGeometry(0.42, 0);
    const sat2Mat = new THREE.MeshPhysicalMaterial({
      color: 0x7e9278,
      metalness: 0.75,
      roughness: 0.15,
      flatShading: true,
    });
    const sat2 = new THREE.Mesh(sat2Geo, sat2Mat);
    heroGroup.add(sat2);

    // Satellite 3: Terracotta Geometric Wafer
    const sat3Geo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const sat3Mat = new THREE.MeshPhysicalMaterial({
      color: 0xc96b4b,
      metalness: 0.8,
      roughness: 0.2,
      flatShading: true,
    });
    const sat3 = new THREE.Mesh(sat3Geo, sat3Mat);
    heroGroup.add(sat3);

    // -------------------------------------------------------------
    // 4. Sparkling Micro-Stardust Particles
    // -------------------------------------------------------------
    const particleCount = 55;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 4.2 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xd6a85f,
      size: 0.18,
      transparent: true,
      opacity: 0.85,
    });
    const stardust = new THREE.Points(particleGeo, particleMat);
    heroGroup.add(stardust);

    // -------------------------------------------------------------
    // 5. Interactive Mouse Tracking & Parallax
    // -------------------------------------------------------------
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
      targetRotationY = mouseX * 0.4;
      targetRotationX = -mouseY * 0.4;

      // Move keylight for dynamic reflection highlights across crystal facets
      keyLight.position.x = 8 + mouseX * 5;
      keyLight.position.y = 10 - mouseY * 5;
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

    // -------------------------------------------------------------
    // 6. Animation Loop
    // -------------------------------------------------------------
    let animId;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Crystal core smooth slow rotation
        crystalMesh.rotation.y = elapsed * 0.35;
        crystalMesh.rotation.x = elapsed * 0.2;

        // Outer cage counter-rotation
        cageMesh.rotation.y = -elapsed * 0.2;
        cageMesh.rotation.z = elapsed * 0.15;

        // Gyro ring rotations
        ring1.rotation.z = elapsed * 0.25;
        ring2.rotation.y = elapsed * 0.3;
        ring3.rotation.x = elapsed * 0.18;

        // Move beacons along rings
        beacon1.position.x = Math.cos(elapsed * 1.8) * 3.3;
        beacon1.position.y = Math.sin(elapsed * 1.8) * 3.3;

        beacon2.position.x = Math.cos(-elapsed * 1.5) * 3.75;
        beacon2.position.y = Math.sin(-elapsed * 1.5) * 3.75;

        // Orbiting satellites in distinct 3D trajectories
        sat1.position.x = Math.cos(elapsed * 0.9) * 4.6;
        sat1.position.y = Math.sin(elapsed * 0.9) * 1.8;
        sat1.position.z = Math.sin(elapsed * 0.9) * 3.2;
        sat1.rotation.x = elapsed * 1.2;
        sat1.rotation.y = elapsed * 0.8;

        sat2.position.x = Math.cos(-elapsed * 0.75 + 1.5) * 4.4;
        sat2.position.y = Math.sin(-elapsed * 0.75 + 1.5) * 2.2;
        sat2.position.z = Math.sin(-elapsed * 0.75 + 1.5) * 3.0;
        sat2.rotation.y = elapsed * 1.0;

        sat3.position.x = Math.sin(elapsed * 0.6) * 4.0;
        sat3.position.y = Math.cos(elapsed * 0.6) * 2.5;
        sat3.position.z = Math.cos(elapsed * 0.6) * 2.2;
        sat3.rotation.x = elapsed * 0.7;
        sat3.rotation.z = elapsed * 0.9;

        // Micro stardust subtle drift
        stardust.rotation.y = elapsed * 0.04;
      }

      // Smooth mouse parallax lerp
      heroGroup.rotation.y += (targetRotationY - heroGroup.rotation.y) * 0.05;
      heroGroup.rotation.x += (targetRotationX - heroGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    renderLoop();

    // Clean up all resources
    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      // Geometries
      crystalGeo.dispose();
      innerCoreGeo.dispose();
      cageGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      beacon1Geo.dispose();
      beacon2Geo.dispose();
      sat1Geo.dispose();
      sat2Geo.dispose();
      sat3Geo.dispose();
      particleGeo.dispose();

      // Materials
      crystalMat.dispose();
      innerCoreMat.dispose();
      cageMat.dispose();
      ring1Mat.dispose();
      ring2Mat.dispose();
      ring3Mat.dispose();
      beacon1Mat.dispose();
      beacon2Mat.dispose();
      sat1Mat.dispose();
      sat2Mat.dispose();
      sat3Mat.dispose();
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
