import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Character({ url }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions, mixer } = useAnimations(animations, group);

  const [currentAction, setCurrentAction] = useState(null);

  // Log available animations
  useEffect(() => {
    const animationKeys = Object.keys(actions);
    console.log("Available animations:", animationKeys);

    // Play the first animation as default
    if (animationKeys.length > 0) {
      setCurrentAction(animationKeys[0]);
      actions[animationKeys[0]].reset().fadeIn(0.5).play();
    } else {
      console.warn("No animations found in the GLTF file");
    }
  }, [actions]);

  // Movement logic
  useFrame((state, delta) => {
    if (group.current && currentAction) {
      if (currentAction === "mixamo.com" && group.current.position.z < 0) {
        group.current.position.z += 1 * delta; // Move forward
      } else if (currentAction === "mixamo.com") {
        setCurrentAction("mixamo.com|Waving");
        if (actions["mixamo.com"]) actions["mixamo.com"].fadeOut(0.5);
        if (actions["mixamo.com|Waving"]) {
          actions["mixamo.com|Waving"].reset().fadeIn(0.5).play();
        } else {
          console.warn("mixamo.com|Waving animation not found");
        }
      }
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={0.1} // Adjust scale
      position={[5, 0, 0]} // Adjust position
    />
  );
}