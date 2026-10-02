import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Sparkles, Award, ShieldCheck, Zap } from 'lucide-react';

/**
 * InteractiveAuthScene - Right-side split-screen 3D experience for Login and Register pages.
 * Displays dynamic Three.js interlocking copper and gold gyroscopic rings, warm lighting, and floating glass cards.
 */
const InteractiveAuthScene = ({ title = 'Next-Gen Internship Tracking', subtitle = 'Powered by Intelligent AI Automation' }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene setup
    const scene = new THREE.Scene();
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, 0, 11.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    mount.appendChild(renderer.domElement);

    // Warm Lighting
    const ambientLight = new THREE.AmbientLight(0xfffdf7, 1.8);
    scene.add(ambientLight);

    const copperLight = new THREE.PointLight(0xb87333, 3.2, 25);
    copperLight.position.set(6, 7, 8);
    scene.add(copperLight);

    const goldLight = new THREE.PointLight(0xd6a85f, 2.5, 25);
    goldLight.position.set(-6, -5, 6);
    scene.add(goldLight);

    // 3D Gyroscopic Ring System (Copper, Gold & Terracotta)
    const gyroGroup = new THREE.Group();
    // Offset slightly upward so it sits above bottom content and doesn't overlap text
    gyroGroup.position.set(0, 1.4, 0);
    scene.add(gyroGroup);

    // Outer Ring: Copper Torus
    const ring1Geo = new THREE.TorusGeometry(2.6, 0.18, 24, 64);
    const ring1Mat = new THREE.MeshPhysicalMaterial({
      color: 0xb87333,
      roughness: 0.15,
      metalness: 0.75,
      clearcoat: 0.9,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    gyroGroup.add(ring1);

    // Middle Ring: Soft Gold Torus
    const ring2Geo = new THREE.TorusGeometry(1.9, 0.15, 24, 64);
    const ring2Mat = new THREE.MeshPhysicalMaterial({
      color: 0xd6a85f,
      roughness: 0.2,
      metalness: 0.6,
      clearcoat: 0.85,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    gyroGroup.add(ring2);

    // Inner Core: Terracotta Floating Dodecahedron
    const coreGeo = new THREE.DodecahedronGeometry(0.95, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xc96b4b,
      roughness: 0.25,
      metalness: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    gyroGroup.add(coreMesh);

    // Sage Green Orbiting Gem
    const gemGeo = new THREE.OctahedronGeometry(0.42, 0);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0x7e9278,
      roughness: 0.1,
      metalness: 0.3,
      clearcoat: 1.0,
    });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    gem.position.set(3.2, 1.2, 0);
    gyroGroup.add(gem);

    // Mouse movement interaction
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
      targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 0.5;
    };

    mount.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!mount || !renderer || !camera) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        ring1.rotation.x = elapsed * 0.35;
        ring1.rotation.y = elapsed * 0.25;

        ring2.rotation.y = -elapsed * 0.45;
        ring2.rotation.z = elapsed * 0.3;

        coreMesh.rotation.x = elapsed * 0.3;
        coreMesh.rotation.y = elapsed * 0.4;

        gem.position.x = Math.cos(elapsed * 1.3) * 3.4;
        gem.position.y = Math.sin(elapsed * 1.3) * 1.6;
        gem.position.z = Math.sin(elapsed * 1.3) * 1.6;
        gem.rotation.y = elapsed * 0.8;
      }

      gyroGroup.rotation.y += (targetX - gyroGroup.rotation.y) * 0.05;
      gyroGroup.rotation.x += (targetY - gyroGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      ring1Geo.dispose();
      ring2Geo.dispose();
      coreGeo.dispose();
      gemGeo.dispose();

      ring1Mat.dispose();
      ring2Mat.dispose();
      coreMat.dispose();
      gemMat.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[540px] flex flex-col justify-between p-8 lg:p-10 overflow-hidden bg-gradient-to-br from-[#FFFDF7] via-[#F7F3EA] to-[#E9E0D2] dark:from-[#292722] dark:via-[#35312B] dark:to-[#423E37]">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 z-0 select-none cursor-grab active:cursor-grabbing pointer-events-auto" />

      {/* Top Header Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 dark:bg-[#292722]/85 backdrop-blur-md border border-[#D6A85F]/50 shadow-3d-sm text-xs font-semibold text-[#B87333] dark:text-[#D6A85F]">
          <Sparkles className="h-3.5 w-3.5 text-[#B87333]" />
          <span>ThreeUI 3D Interface</span>
        </div>
      </div>

      {/* Floating 3D Cards */}
      <div className="relative z-10 my-4 pointer-events-none flex flex-col gap-3 max-w-sm">
        <div className="card p-3.5 rounded-2xl bg-white/90 dark:bg-[#292722]/90 backdrop-blur-md border border-white/90 dark:border-[#423E37] shadow-3d transform -rotate-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#C96B4B] to-[#D6A85F] text-white shadow-3d-copper">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] text-[#292722]/70 dark:text-[#F7F3EA]/70 font-semibold">Smart AI Matching</p>
              <h4 className="text-xs sm:text-sm font-bold text-[#292722] dark:text-[#FFFDF7]">98% Candidate Accuracy</h4>
            </div>
          </div>
        </div>

        <div className="card p-3.5 rounded-2xl bg-white/90 dark:bg-[#292722]/90 backdrop-blur-md border border-white/90 dark:border-[#423E37] shadow-3d self-end transform rotate-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#B87333] to-[#E28A45] text-white shadow-3d-copper">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] text-[#292722]/70 dark:text-[#F7F3EA]/70 font-semibold">Interview Readiness</p>
              <h4 className="text-xs sm:text-sm font-bold text-[#292722] dark:text-[#FFFDF7]">Targeted Question Prep</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Information (Clear separation with backdrop for pristine readability) */}
      <div className="relative z-10 p-5 rounded-2xl bg-white/70 dark:bg-[#292722]/75 backdrop-blur-md border border-[#E9E0D2] dark:border-[#423E37] shadow-sm">
        <h3 className="text-xl sm:text-2xl font-black text-[#292722] dark:text-[#FFFDF7] leading-tight mb-1.5">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#292722]/80 dark:text-[#F7F3EA]/80 font-medium">
          {subtitle}
        </p>
        <div className="mt-3 flex items-center gap-4 text-xs text-[#B87333] dark:text-[#D6A85F] font-bold">
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> End-to-End Privacy</span>
          <span>•</span>
          <span>Zero Subscription Fees</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveAuthScene;
