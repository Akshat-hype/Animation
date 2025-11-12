// Glove.jsx
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import anime from "animejs/lib/anime.es.js";

const Glove = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Create glove-like particles
    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < particleCount; i++) {
      // Random positions forming a rough glove shape
      positions.push(
        (Math.random() - 0.5) * 2, // x
        Math.random() * 3 - 1.5,   // y
        (Math.random() - 0.5) * 2  // z
      );
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({ color: 0x00ffdd, size: 0.05 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Animate using Anime.js
    anime({
      targets: geometry.attributes.position.array,
      // shift all positions slightly
      x: function (val, i) {
        return val + (Math.random() - 0.5) * 0.5;
      },
      y: function (val, i) {
        return val + (Math.random() - 0.5) * 0.5;
      },
      z: function (val, i) {
        return val + (Math.random() - 0.5) * 0.5;
      },
      duration: 2000,
      easing: "easeInOutSine",
      loop: true,
      direction: "alternate",
      update: () => {
        geometry.attributes.position.needsUpdate = true;
      },
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Glove;
