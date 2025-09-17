// src/Character.jsx
import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Character({ url }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions, mixer } = useAnimations(animations, group);

  const [currentAction, setCurrentAction] = useState("Walking");

  // Initial animation
  useEffect(() => {
    if (actions["Walking"]) {
      actions["Walking"].reset().fadeIn(0.5).play();
    }
  }, [actions]);

  // Movement logic
  useFrame((state, delta) => {
    if (group.current) {
      if (currentAction === "Walking" && group.current.position.z < 0) {
        group.current.position.z += 1 * delta; // Move forward
      } else if (currentAction === "Walking") {
        // Switch to wave when reaching center
        setCurrentAction("Waving");
        if (actions["Walking"]) actions["Walking"].fadeOut(0.5);
        if (actions["Waving"]) {
          actions["Waving"].reset().fadeIn(0.5).play();
        }
      }
    }
  });

  return <primitive ref={group} object={scene} scale={2} position={[0, -1, -5]} />;
}
