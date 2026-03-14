import { useState } from 'react'
import { motion } from 'motion/react'
import { Activity, Clock, ArrowRight } from 'lucide-react'
import { useGesture } from '../hooks/useGesture'
import { useSymptomEntries } from '../hooks/useSymptomEntries'
import { CaptureOverlay } from '../components/capture/CaptureOverlay'
import { Link } from 'react-router-dom'

export function PatientHome() {
  const [captureOpen, setCaptureOpen] = useState(false)
  const { entries, addEntry } = useSymptomEntries()

  const { progress, isHolding, gestureHandlers } = useGesture({
    holdDuration: 1200,
    onTrigger: () => setCaptureOpen(true),
  })

  const recentEntries = entries.slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Activity className="text-indigo-500" size={28} />
          <h1 className="text-3xl font-bold text-slate-900">Pulse</h1>
        </div>
        <p className="text-slate-500 text-sm">Capture symptoms in the moment</p>
      </motion.div>

      {/* Central capture circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative mb-12"
      >
        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80" cy="80" r="74"
            fill="none"
            stroke={isHolding ? '#6366f1' : 'transparent'}
            strokeWidth="4"
            strokeDasharray={`${progress * 465} 465`}
            strokeLinecap="round"
            className="transition-colors"
          />
        </svg>

        {/* Breathing animation circle */}
        <motion.div
          animate={!isHolding ? {
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 0 0 0 rgba(99,102,241,0.4)',
              '0 0 0 20px rgba(99,102,241,0)',
              '0 0 0 0 rgba(99,102,241,0)',
            ],
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
          {...gestureHandlers}
          className="w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center cursor-pointer select-none touch-none"
        >
          <div className="text-center text-white">
            <Activity size={36} className="mx-auto mb-1" />
            <span className="text-xs font-medium opacity-80">
              {isHolding ? 'Keep holding...' : 'Hold to record'}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick tap fallback for desktop */}
      <button
        onClick={() => setCaptureOpen(true)}
        className="mb-8 px-6 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium hover:bg-indigo-200 transition"
      >
        or tap to record
      </button>

      {/* Recent entries preview */}
      {recentEntries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-600">Recent</h2>
            <Link
              to="/doctor"
              className="text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1"
            >
              View timeline <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-2">
            {recentEntries.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="bg-white rounded-xl p-3 shadow-sm border border-slate-100"
              >
                <p className="text-sm text-slate-700 line-clamp-1">{entry.transcription}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock size={12} className="text-slate-400" />
                  <span className="text-xs text-slate-400">
                    {formatRelativeTime(entry.recordedAt)}
                  </span>
                  <span
                    className="text-xs font-medium px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: getSeverityColor(entry.severity) + '20',
                      color: getSeverityColor(entry.severity),
                    }}
                  >
                    {entry.severity}/10
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Capture overlay */}
      <CaptureOverlay
        isOpen={captureOpen}
        onClose={() => setCaptureOpen(false)}
        entries={entries}
        onSave={(data) => {
          addEntry({
            ...data,
            recordedAt: new Date().toISOString(),
          })
        }}
      />
    </div>
  )
}

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString()
}

function getSeverityColor(severity: number): string {
  if (severity <= 3) return '#22c55e'
  if (severity <= 5) return '#eab308'
  if (severity <= 7) return '#f97316'
  return '#ef4444'
}
