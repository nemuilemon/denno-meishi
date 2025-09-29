'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleCount = 30;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.4 + 0.3,
      });
    }

    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.speedX < 0 || particle.x + particle.speedX > 100
            ? particle.x - particle.speedX
            : particle.x + particle.speedX,
          y: particle.y + particle.speedY < 0 || particle.y + particle.speedY > 100
            ? particle.y - particle.speedY
            : particle.y + particle.speedY,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transition: 'all 0.1s linear',
            boxShadow: '0 0 6px rgba(96, 165, 250, 0.4)',
            background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.8), rgba(147, 197, 253, 0.6))',
          }}
        />
      ))}
    </div>
  );
}