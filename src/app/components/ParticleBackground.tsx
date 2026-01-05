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
        prevParticles.map(particle => {
          // まず普通に移動させる
          const nextX = particle.x + particle.speedX;
          const nextY = particle.y + particle.speedY;

          // 画面外（-10% ～ 110% の範囲外）に出たらリセットする
          const isOutside = nextX < -10 || nextX > 110 || nextY < -10 || nextY > 110;

          if (isOutside) {
            return {
              ...particle,
              // 画面内のランダムな位置に再配置
              // (完全にランダムだとパッと現れるので、気になる場合は opacity を操作するか、
              //  画面外から入ってくるように座標計算を工夫しますが、まずはこれで十分自然です)
              x: Math.random() * 100,
              y: Math.random() * 100,
            };
          }

          // 範囲内ならそのまま移動
          return {
            ...particle,
            x: nextX,
            y: nextY,
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      style={{
        // 画面の端に行くほど透明になるマスクを適用
        maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)',
      }}
    >
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