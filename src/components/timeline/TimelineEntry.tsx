import { motion } from 'motion/react'
import { Clock, MapPin, Heart } from 'lucide-react'
import type { SymptomEntry } from '../../data/demo-entries'
import type { WearableSnapshot } from '../../data/demo-wearable'

interface Props {
  entry: SymptomEntry
  snapshot: WearableSnapshot | null
  index: number
}

export function TimelineEntry({ entry, snapshot, index }: Props) {
  const date = new Date(entry.recordedAt)
  const severityColor = getSeverityColor(entry.severity)

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="relative pl-8 pb-6 group"
    >
      {/* Timeline line */}
      <div className="absolute left-3 top-3 bottom-0 w-px bg-slate-700/50" />

      {/* Timeline dot */}
      <div
        className="absolute left-1.5 top-3 w-3.5 h-3.5 rounded-full border-2 border-slate-800"
        style={{ backgroundColor: severityColor }}
      />

      {/* Card */}
      <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors">
        {/* Header: time + severity */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock size={12} />
            <span>{formatDate(date)}</span>
            <span className="text-slate-600">|</span>
            <span>{formatTime(date)}</span>
          </div>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: severityColor + '25',
              color: severityColor,
            }}
          >
            {entry.severity}/10
          </span>
        </div>

        {/* Transcription */}
        <p className="text-white text-sm leading-relaxed mb-3">
          "{entry.transcription}"
        </p>

        {/* Footer: body area + wearable data */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded-full">
            <MapPin size={10} />
            {entry.bodyArea}
          </span>

          {snapshot && (
            <>
              <span className="flex items-center gap-1 text-xs text-red-400/80 bg-red-900/20 px-2 py-1 rounded-full">
                <Heart size={10} />
                {snapshot.heartRate} bpm
              </span>
              <span className="text-xs text-blue-400/80 bg-blue-900/20 px-2 py-1 rounded-full">
                SpO2 {snapshot.bloodOxygen}%
              </span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function formatDate(d: Date): string {
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function getSeverityColor(severity: number): string {
  if (severity <= 3) return '#22c55e'
  if (severity <= 5) return '#eab308'
  if (severity <= 7) return '#f97316'
  return '#ef4444'
}
