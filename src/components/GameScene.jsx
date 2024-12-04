import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box as DreiBox } from '@react-three/drei';
import * as THREE from 'three';

function Box({ position }) {
  return (
    <DreiBox position={position} args={[1, 1, 1]}>
      <meshStandardMaterial color="#4CAF50" />
    </DreiBox>
  );
}

function GameScene({ crosshairPosition, onBoxDestroy }) {
  const [boxes, setBoxes] = useState([]);
  const raycaster = new THREE.Raycaster();

  const generateRandomPosition = () => {
    return [
      Math.random() * 6 - 3,
      Math.random() * 3 + 1,
      Math.random() * -6 + 3,
    ];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (boxes.length < 5) {
        setBoxes((prev) => [
          ...prev,
          { position: generateRandomPosition(), id: Date.now() },
        ]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [boxes]);

  const handleShoot = () => {
    const mouseVector = new THREE.Vector2(
      crosshairPosition.x,
      crosshairPosition.y
    );
    raycaster.setFromCamera(mouseVector, new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100));

    const intersects = raycaster.intersectObjects(
      boxes.map(({ position }) => {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));
        mesh.position.set(...position);
        return mesh;
      })
    );

    if (intersects.length > 0) {
      const hitBox = intersects[0];
      setBoxes((prev) =>
        prev.filter((box) => box.id !== hitBox.object.id)
      );
      onBoxDestroy();
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleShoot);
    return () => window.removeEventListener('click', handleShoot);
  }, [crosshairPosition, boxes]);

  return (
    <>
      {boxes.map(({ position, id }) => (
        <Box key={id} position={position} />
      ))}
    </>
  );
}

export default GameScene;
