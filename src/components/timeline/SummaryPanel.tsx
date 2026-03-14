import { motion } from 'motion/react'
import { TrendingUp, AlertTriangle, Heart, Calendar } from 'lucide-react'
import type { SymptomEntry } from '../../data/demo-entries'

interface Props {
  entries: SymptomEntry[]
}

export function SummaryPanel({ entries }: Props) {
  if (entries.length === 0) return null

  const avgSeverity = Math.round(
    entries.reduce((s, e) => s + e.severity, 0) / entries.length * 10
  ) / 10

  // Most common body area
  const areaCounts: Record<string, number> = {}
  entries.forEach(e => {
    areaCounts[e.bodyArea] = (areaCounts[e.bodyArea] || 0) + 1
  })
  const topArea = Object.entries(areaCounts).sort((a, b) => b[1] - a[1])[0]

  // Trend detection
  const recent = entries.slice(0, 3)
  const older = entries.slice(3)
  const recentAvg = recent.length > 0
    ? recent.reduce((s, e) => s + e.severity, 0) / recent.length
    : 0
  const olderAvg = older.length > 0
    ? older.reduce((s, e) => s + e.severity, 0) / older.length
    : 0
  const isEscalating = recentAvg > olderAvg + 1

  // Days span
  const firstDate = new Date(entries[entries.length - 1].recordedAt)
  const lastDate = new Date(entries[0].recordedAt)
  const daySpan = Math.ceil((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
    >
      <StatCard
        icon={<Calendar size={18} />}
        label="Entries"
        value={`${entries.length} in ${daySpan}d`}
        color="text-blue-400"
      />
      <StatCard
        icon={<Heart size={18} />}
        label="Avg Severity"
        value={`${avgSeverity}/10`}
        color={avgSeverity > 6 ? 'text-red-400' : avgSeverity > 4 ? 'text-yellow-400' : 'text-green-400'}
      />
      <StatCard
        icon={<TrendingUp size={18} />}
        label="Most Common"
        value={topArea ? `${topArea[0]} (${topArea[1]}x)` : '—'}
        color="text-purple-400"
      />
      <StatCard
        icon={<AlertTriangle size={18} />}
        label="Trend"
        value={isEscalating ? 'Escalating' : 'Stable'}
        color={isEscalating ? 'text-red-400' : 'text-green-400'}
      />
    </motion.div>
  )
}

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
}) {
  return (
    <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
      <div className={`flex items-center gap-1.5 mb-1 ${color}`}>
        {icon}
        <span className="text-xs text-slate-400">{label}</span>
      </div>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  )
}
