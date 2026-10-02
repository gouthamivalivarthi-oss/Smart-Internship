import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Sparkles, Award, ShieldCheck, Zap } from 'lucide-react';

/**
 * InteractiveAuthScene - Right-side split-screen 3D experience for Login and Register pages.
 * Displays dynamic Three.js interlocking gyroscopic rings, warm lighting, and floating glass cards.
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

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Warm Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8ed, 1.5);
    scene.add(ambientLight);

    const coralLight = new THREE.PointLight(0xe9785b, 3, 20);
    coralLight.position.set(6, 6, 8);
    scene.add(coralLight);

    const lavenderLight = new THREE.PointLight(0xb9a7e8, 2.5, 20);
    lavenderLight.position.set(-6, -6, 6);
    scene.add(lavenderLight);

    // 3D Gyroscopic Ring System (Coral & Lavender)
    const gyroGroup = new THREE.Group();
    scene.add(gyroGroup);

    // Outer Ring: Coral Torus
    const ring1Geo = new THREE.TorusGeometry(3.2, 0.2, 24, 64);
    const ring1Mat = new THREE.MeshPhysicalMaterial({
      color: 0xe9785b,
      roughness: 0.15,
      metalness: 0.2,
      clearcoat: 0.9,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    gyroGroup.add(ring1);

    // Middle Ring: Lavender Torus
    const ring2Geo = new THREE.TorusGeometry(2.4, 0.18, 24, 64);
    const ring2Mat = new THREE.MeshPhysicalMaterial({
      color: 0xb9a7e8,
      roughness: 0.2,
      metalness: 0.15,
      clearcoat: 0.8,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    gyroGroup.add(ring2);

    // Inner Core: Soft Peach Floating Dodecahedron
    const coreGeo = new THREE.DodecahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf5b895,
      roughness: 0.25,
      metalness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    gyroGroup.add(coreMesh);

    // Sage Green Orbiting Gem
    const gemGeo = new THREE.OctahedronGeometry(0.5, 0);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0x9db79b,
      roughness: 0.1,
      metalness: 0.2,
      clearcoat: 1.0,
    });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    gem.position.set(3.8, 1.5, 0);
    gyroGroup.add(gem);

    // Mouse movement interaction
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
      targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 0.6;
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

        gem.position.x = Math.cos(elapsed * 1.4) * 4;
        gem.position.y = Math.sin(elapsed * 1.4) * 2;
        gem.position.z = Math.sin(elapsed * 1.4) * 2;
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
    <div className="relative w-full h-full min-h-[500px] flex flex-col justify-between p-8 lg:p-12 overflow-hidden bg-gradient-to-br from-[#FFF8ED] via-[#F6EBDD] to-[#F5B895]/40 dark:from-[#281B16] dark:via-[#35231C] dark:to-[#452E25]">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 z-0 select-none cursor-grab active:cursor-grabbing" />

      {/* Top Header Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-[#3D2B24]/80 backdrop-blur-md border border-[#F5B895]/50 shadow-sm text-xs font-semibold text-[#C85C45] dark:text-[#F5B895]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Interactive 3D Workspace</span>
        </div>
      </div>

      {/* Floating 3D Cards */}
      <div className="relative z-10 my-auto pointer-events-none flex flex-col gap-4 max-w-sm">
        <div className="glass-card p-4 rounded-2xl bg-white/85 dark:bg-[#30211B]/85 backdrop-blur-md border border-white/80 dark:border-[#553B30] shadow-[0_12px_30px_-8px_rgba(61,43,36,0.12)] transform -rotate-1 hover:rotate-0 transition-transform">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#E9785B] to-[#C85C45] text-white shadow-md">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium">Smart AI Matching</p>
              <h4 className="text-sm font-bold text-[#3D2B24] dark:text-[#FFF8ED]">98% Candidate Accuracy</h4>
            </div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white/85 dark:bg-[#30211B]/85 backdrop-blur-md border border-white/80 dark:border-[#553B30] shadow-[0_12px_30px_-8px_rgba(61,43,36,0.12)] self-end transform rotate-2 hover:rotate-0 transition-transform">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#B9A7E8] to-[#8F78C8] text-white shadow-md">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-[#3D2B24]/70 dark:text-[#FFF8ED]/70 font-medium">Interview Readiness</p>
              <h4 className="text-sm font-bold text-[#3D2B24] dark:text-[#FFF8ED]">Targeted Question Prep</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Information */}
      <div className="relative z-10">
        <h3 className="text-2xl font-extrabold text-[#3D2B24] dark:text-[#FFF8ED] leading-tight mb-2">
          {title}
        </h3>
        <p className="text-sm text-[#3D2B24]/80 dark:text-[#FFF8ED]/80 font-medium">
          {subtitle}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-[#C85C45] dark:text-[#F5B895] font-semibold">
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> End-to-End Privacy</span>
          <span>•</span>
          <span>Zero Subscription Fees</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveAuthScene;
