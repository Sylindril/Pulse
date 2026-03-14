import { useState } from 'react'
import { motion } from 'motion/react'

const severityColors = [
  '', // 0 unused
  '#22c55e', '#22c55e', '#22c55e', // 1-3 green
  '#eab308', '#eab308',             // 4-5 yellow
  '#f97316', '#f97316',             // 6-7 orange
  '#ef4444', '#ef4444', '#ef4444',  // 8-10 red
]

const severityLabels = [
  '', 'Barely noticeable', 'Mild', 'Mild',
  'Moderate', 'Moderate', 'Significant', 'Significant',
  'Severe', 'Very severe', 'Worst possible',
]

interface Props {
  onSelect: (severity: number) => void
  onSkip: () => void
}

export function SeveritySlider({ onSelect, onSkip }: Props) {
  const [value, setValue] = useState(5)
  const color = severityColors[value]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto"
    >
      <p className="text-white/70 text-sm">How severe? (optional)</p>

      <div
        className="text-5xl font-bold tabular-nums"
        style={{ color }}
      >
        {value}
      </div>

      <p className="text-white/50 text-sm h-5">
        {severityLabels[value]}
      </p>

      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={e => setValue(Number(e.target.value))}
        className="w-full accent-white"
      />

      <div className="flex gap-3 w-full">
        <button
          onClick={onSkip}
          className="flex-1 py-2 rounded-lg text-white/60 hover:text-white/80 transition"
        >
          Skip
        </button>
        <button
          onClick={() => onSelect(value)}
          className="flex-1 py-2 rounded-lg text-white font-medium transition"
          style={{ backgroundColor: color }}
        >
          Done
        </button>
      </div>
    </motion.div>
  )
}
