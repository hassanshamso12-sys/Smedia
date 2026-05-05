'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Camera, 
  Film, 
  Mic, 
  Music, 
  Share2, 
  Video, 
  Monitor,
  Smartphone,
  Globe
} from 'lucide-react';

const icons = [
  Instagram, Twitter, Youtube, Camera, Film, Mic, 
  Music, Share2, Video, Monitor, Smartphone, Globe
];

const FloatingIcons = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {[...Array(24)].map((_, i) => {
        const Icon = icons[i % icons.length];
        const size = Math.random() * 30 + 20;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * -20;

        return (
          <motion.div
            key={i}
            className="absolute text-white/20"
            initial={{ x: `${x}%`, y: `${y}%` }}
            animate={{
              y: [`${y}%`, `${y - 10}%`, `${y}%`],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
            style={{ left: 0, top: 0 }}
          >
            <Icon size={size} strokeWidth={1} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingIcons;
