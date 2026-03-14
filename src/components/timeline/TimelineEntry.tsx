import { useState } from 'react'
import { motion } from 'motion/react'
import { Clock, MapPin, Heart, TrendingDown, ArrowRight, TrendingUp, AlertTriangle, Trash2, Pencil, Check, X } from 'lucide-react'
import type { SymptomEntry, Comparison } from '../../data/demo-entries'

interface Props {
  entry: SymptomEntry
  index: number
  onDelete?: (id: string) => void
  onEdit?: (id: string, updates: Partial<SymptomEntry>) => void
}

export function TimelineEntry({ entry, index, onDelete, onEdit }: Props) {
  const date = new Date(entry.recordedAt)
  const severityColor = getSeverityColor(entry.severity)
  const comparisonInfo = entry.comparison ? getComparisonInfo(entry.comparison) : null
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(entry.transcription)

  const handleSave = () => {
    onEdit?.(entry.id, { transcription: editText })
    setIsEditing(false)
  }

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
        {/* Header: time + severity + actions */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock size={12} />
            <span>{formatDate(date)}</span>
            <span className="text-slate-600">|</span>
            <span>{formatTime(date)}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Edit/Delete — visible on hover */}
            {(onEdit || onDelete) && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {onEdit && !isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 rounded text-slate-500 hover:text-slate-300 transition"
                  >
                    <Pencil size={12} />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(entry.id)}
                    className="p-1 rounded text-slate-500 hover:text-red-400 transition"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            )}
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
        </div>

        {/* Transcription — editable */}
        {isEditing ? (
          <div className="mb-3">
            <textarea
              value={editText}
              onChange={e => setEditText(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-700/50 text-white text-sm border border-slate-600 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500"
              rows={2}
              autoFocus
            />
            <div className="flex gap-2 mt-1">
              <button onClick={handleSave} className="text-green-400 hover:text-green-300 p-1"><Check size={14} /></button>
              <button onClick={() => { setIsEditing(false); setEditText(entry.transcription) }} className="text-slate-400 hover:text-slate-300 p-1"><X size={14} /></button>
            </div>
          </div>
        ) : (
          <p className="text-white text-sm leading-relaxed mb-3">
            "{entry.transcription}"
          </p>
        )}

        {/* Footer: body area + comparison + wearable data */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded-full">
            <MapPin size={10} />
            {entry.bodyArea}
          </span>

          {comparisonInfo && (
            <span
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
              style={{
                backgroundColor: comparisonInfo.color + '20',
                color: comparisonInfo.color,
              }}
            >
              <comparisonInfo.icon size={10} />
              {comparisonInfo.label}
            </span>
          )}

          {entry.vitals && (
            <>
              <span className="flex items-center gap-1 text-xs text-red-400/80 bg-red-900/20 px-2 py-1 rounded-full">
                <Heart size={10} />
                {entry.vitals.heartRate} bpm
              </span>
              <span className="text-xs text-blue-400/80 bg-blue-900/20 px-2 py-1 rounded-full">
                SpO2 {entry.vitals.bloodOxygen}%
              </span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function getComparisonInfo(comparison: Comparison) {
  switch (comparison) {
    case 'better': return { label: 'Better', icon: TrendingDown, color: '#22c55e' }
    case 'same': return { label: 'Same', icon: ArrowRight, color: '#eab308' }
    case 'worse': return { label: 'Worse', icon: TrendingUp, color: '#f97316' }
    case 'worst': return { label: 'Worst ever', icon: AlertTriangle, color: '#ef4444' }
  }
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
