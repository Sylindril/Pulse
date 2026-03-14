import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowDown, ArrowRight, ArrowUp, AlertTriangle } from 'lucide-react'
import type { Comparison } from '../../data/demo-entries'

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

const comparisonOptions: { value: Comparison; label: string; icon: typeof ArrowDown; color: string }[] = [
  { value: 'better', label: 'Better', icon: ArrowDown, color: '#22c55e' },
  { value: 'same', label: 'Same', icon: ArrowRight, color: '#eab308' },
  { value: 'worse', label: 'Worse', icon: ArrowUp, color: '#f97316' },
  { value: 'worst', label: 'Worst ever', icon: AlertTriangle, color: '#ef4444' },
]

interface Props {
  onSelect: (severity: number, comparison?: Comparison) => void
  onSkip: () => void
  hasRecentEntry?: boolean // only show comparison if there's a recent entry (within 7 days)
}

export function SeveritySlider({ onSelect, onSkip, hasRecentEntry = false }: Props) {
  const [value, setValue] = useState(5)
  const [step, setStep] = useState<'severity' | 'comparison'>('severity')
  const color = severityColors[value]

  const handleSeverityDone = () => {
    if (hasRecentEntry) {
      setStep('comparison')
    } else {
      // No recent entry to compare against — skip comparison to avoid recency bias
      onSelect(value)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto"
    >
      {step === 'severity' ? (
        <>
          <p className="text-white/70 text-sm">How severe?</p>

          <div className="text-5xl font-bold tabular-nums" style={{ color }}>
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
              onClick={handleSeverityDone}
              className="flex-1 py-2 rounded-lg text-white font-medium transition"
              style={{ backgroundColor: color }}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 w-full"
        >
          <p className="text-white/70 text-sm">Compared to before?</p>

          <div className="grid grid-cols-2 gap-2 w-full">
            {comparisonOptions.map(opt => {
              const Icon = opt.icon
              return (
                <button
                  key={opt.value}
                  onClick={() => onSelect(value, opt.value)}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:border-white/30 transition text-sm font-medium text-white"
                  style={{ backgroundColor: opt.color + '20' }}
                >
                  <Icon size={16} style={{ color: opt.color }} />
                  {opt.label}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => onSelect(value)}
            className="text-white/40 hover:text-white/60 text-xs transition"
          >
            Skip comparison
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
