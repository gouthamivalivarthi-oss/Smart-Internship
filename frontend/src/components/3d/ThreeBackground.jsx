import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeBackground - High-performance, lightweight Three.js ambient background
 * Features warm floating particles, subtle geometric spheres, warm lighting, and mouse parallax.
 * Strictly disposes of WebGL resources on unmount.
 */
const ThreeBackground = ({ className = '', density = 'medium' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Warm Ambient and Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8ed, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xf5b895, 1.5);
    dirLight1.position.set(20, 20, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xb9a7e8, 1.2);
    dirLight2.position.set(-20, -10, 15);
    scene.add(dirLight2);

    // Particle Field (Warm Coral, Peach, Lavender Glow)
    const particleCount = density === 'high' ? 90 : 50;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const warmPalette = [
      new THREE.Color(0xe9785b), // Coral
      new THREE.Color(0xf5b895), // Peach
      new THREE.Color(0xb9a7e8), // Lavender
      new THREE.Color(0x9db79b), // Sage Green
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const color = warmPalette[Math.floor(Math.random() * warmPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.65,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.NormalBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Soft Floating Geometric Meshes (Warm Peach & Lavender spheres/icosahedrons)
    const floatingObjects = [];
    const sphereGeo = new THREE.SphereGeometry(1.4, 24, 24);
    const icosaGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const torusGeo = new THREE.TorusGeometry(2, 0.4, 16, 32);

    const warmMaterials = [
      new THREE.MeshStandardMaterial({
        color: 0xf5b895,
        roughness: 0.35,
        metalness: 0.1,
        transparent: true,
        opacity: 0.45,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xb9a7e8,
        roughness: 0.4,
        metalness: 0.15,
        transparent: true,
        opacity: 0.4,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x9db79b,
        roughness: 0.5,
        metalness: 0.05,
        transparent: true,
        opacity: 0.35,
      }),
    ];

    const geometries = [sphereGeo, icosaGeo, torusGeo];

    for (let i = 0; i < 4; i++) {
      const geo = geometries[i % geometries.length];
      const mat = warmMaterials[i % warmMaterials.length];
      const mesh = new THREE.Mesh(geo, mat);

      mesh.position.set(
        (Math.random() - 0.5) * 36,
        (Math.random() - 0.5) * 26,
        (Math.random() - 0.5) * 15 - 5
      );

      mesh.userData = {
        speedX: (Math.random() - 0.5) * 0.003,
        speedY: (Math.random() - 0.5) * 0.003,
        rotX: (Math.random() - 0.5) * 0.008,
        rotY: (Math.random() - 0.5) * 0.008,
      };

      scene.add(mesh);
      floatingObjects.push(mesh);
    }

    // Mouse Tracking for Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with requestAnimationFrame
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      camera.position.x = currentMouseX * 3;
      camera.position.y = -currentMouseY * 3;
      camera.lookAt(0, 0, 0);

      if (!prefersReducedMotion) {
        // Slow gentle rotation for particles
        particles.rotation.y = elapsedTime * 0.02;
        particles.rotation.x = elapsedTime * 0.01;

        // Floating objects oscillation
        floatingObjects.forEach((obj, idx) => {
          obj.rotation.x += obj.userData.rotX;
          obj.rotation.y += obj.userData.rotY;
          obj.position.y += Math.sin(elapsedTime + idx * 2) * 0.006;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resources strictly
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Geometries
      particleGeometry.dispose();
      geometries.forEach((g) => g.dispose());

      // Dispose Materials
      particleMaterial.dispose();
      warmMaterials.forEach((m) => m.dispose());

      // Dispose Renderer
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [density]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    />
  );
};

export default ThreeBackground;
