import React, { useState, useEffect } from 'react';
import './Game.css';

function Game({ onGameOver }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [targets, setTargets] = useState([]);
  const [crosshairPosition, setCrosshairPosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
    const handleMouseMove = (e) => {
      setCrosshairPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (targets.length < 5) {
        const newTarget = {
          id: Date.now(),
          x: Math.random() * window.innerWidth * 0.8 + 50, 
          y: Math.random() * window.innerHeight * 0.6 + 50,
        };
        setTargets((prev) => [...prev, newTarget]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targets]);


  const handleShoot = (e) => {
    const hitTargets = targets.filter(
      (target) =>
        Math.abs(target.x - e.clientX) < 25 && Math.abs(target.y - e.clientY) < 25
    );

    if (hitTargets.length > 0) {
      setScore((prev) => prev + hitTargets.length * 100);
      setTargets((prev) =>
        prev.filter((target) => !hitTargets.some((hit) => hit.id === target.id))
      );
    }
  };

  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      onGameOver(score);
    }
  }, [timeLeft, score, onGameOver]);

  return (
    <div className="game-container" onClick={handleShoot}>
      <div
        className="crosshair"
        style={{
          left: crosshairPosition.x - 15,
          top: crosshairPosition.y - 15,
        }}
      ></div>
      <div className="game-hud">
        <div className="score">PUNTAJE: {score}</div>
        <div className="timer">TIEMPO: {timeLeft}s</div>
      </div>
      {targets.map((target) => (
        <div
          key={target.id}
          className="target"
          style={{
            left: target.x - 15,
            top: target.y - 15,
          }}
        ></div>
      ))}
    </div>
  );
}

export default Game;
