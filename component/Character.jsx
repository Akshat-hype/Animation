import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Character(props) {
  const group = useRef();
  const { scene, animations } = useGLTF("/character.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const walk = actions["walking"];
    const dip = actions["Action.010"];
    const wave = actions["waving.02"];

    if (walk) {
      walk.reset().play();
      walk.clampWhenFinished = true;

      walk.addEventListener("finished", () => {
        if (dip) {
          dip.reset().play();
          dip.clampWhenFinished = true;
        }
      });

      if (dip) {
        dip.addEventListener("finished", () => {
          if (wave) {
            wave.reset().play();
            wave.clampWhenFinished = true;
          }
        });
      }
    }
  }, [actions]);

  // Move forward while walking
  useFrame(() => {
    const walk = actions["walking"];
    const dip = actions["Action.010"];

    if (walk && walk.isRunning()) {
      group.current.position.x += 0.02;
      if (group.current.position.x >= 0) {
        walk.stop();
        if (dip && !dip.isRunning()) dip.play();
      }
    }
  });

  return <primitive ref={group} object={scene} {...props} />;
}
