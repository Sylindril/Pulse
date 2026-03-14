import { motion } from 'motion/react'
import { Activity, Shield } from 'lucide-react'
import { useSymptomEntries } from '../hooks/useSymptomEntries'
import { TimelineView } from '../components/timeline/TimelineView'

export function SharedView() {
  const { entries } = useSymptomEntries()

  return (
    <div className="min-h-screen bg-pulse-darker text-white">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Activity className="text-indigo-400" size={24} />
            <h1 className="text-xl font-bold">Pulse</h1>
          </div>
          <p className="text-slate-400 text-sm">Shared Patient Timeline</p>
          <div className="flex items-center justify-center gap-1 mt-2 text-xs text-slate-500">
            <Shield size={12} />
            <span>Read-only view</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <TimelineView entries={entries} />
      </div>
    </div>
  )
}
