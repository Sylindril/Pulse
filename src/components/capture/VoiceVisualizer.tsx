import { motion } from 'motion/react'

export function VoiceVisualizer({ isActive }: { isActive: boolean }) {
  const bars = 5
  return (
    <div className="flex items-center justify-center gap-1 h-8">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-white rounded-full"
          animate={isActive ? {
            height: [8, 24 + Math.random() * 8, 8],
          } : { height: 8 }}
          transition={isActive ? {
            duration: 0.4 + Math.random() * 0.3,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: i * 0.1,
          } : {}}
        />
      ))}
    </div>
  )
}
