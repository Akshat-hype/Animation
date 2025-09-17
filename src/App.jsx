// src/App.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Character from "../component/Character";
import file from "../component/models/Waving.glb";

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />

      {/* 3D Environment */}
      <Environment preset="sunset" />

      {/* Character */}
      <Character url={file} />

      {/* Controls */}
      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
}

export default App;
