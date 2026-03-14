import { useMemo } from 'react'
import type { WearableSnapshot } from '../../data/demo-wearable'
import type { SymptomEntry } from '../../data/demo-entries'

interface Props {
  snapshots: WearableSnapshot[]
  entries: SymptomEntry[]
}

export function WearableStrip({ snapshots, entries }: Props) {
  // Downsample to ~100 points for the sparkline
  const chartData = useMemo(() => {
    const step = Math.max(1, Math.floor(snapshots.length / 100))
    return snapshots.filter((_, i) => i % step === 0)
  }, [snapshots])

  if (chartData.length < 2) return null

  const maxHR = Math.max(...chartData.map(d => d.heartRate))
  const minHR = Math.min(...chartData.map(d => d.heartRate))
  const range = maxHR - minHR || 1

  const width = 800
  const height = 60
  const points = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1)) * width
    const y = height - ((d.heartRate - minHR) / range) * (height - 10) - 5
    return `${x},${y}`
  }).join(' ')

  // Mark symptom times on the chart
  const startTime = new Date(chartData[0].timestamp).getTime()
  const endTime = new Date(chartData[chartData.length - 1].timestamp).getTime()
  const timeRange = endTime - startTime

  const markers = entries.map(e => {
    const t = new Date(e.recordedAt).getTime()
    const x = ((t - startTime) / timeRange) * width
    return { x, severity: e.severity }
  }).filter(m => m.x >= 0 && m.x <= width)

  return (
    <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-400 font-medium">Heart Rate — 14 Day Overview</span>
        <span className="text-xs text-slate-500">{minHR}–{maxHR} bpm</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none">
        {/* HR line */}
        <polyline
          points={points}
          fill="none"
          stroke="#6366f1"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Area fill */}
        <polyline
          points={`0,${height} ${points} ${width},${height}`}
          fill="url(#hrGrad)"
          stroke="none"
        />
        {/* Symptom markers */}
        {markers.map((m, i) => (
          <line
            key={i}
            x1={m.x} y1={0} x2={m.x} y2={height}
            stroke={m.severity >= 7 ? '#ef4444' : m.severity >= 5 ? '#f97316' : '#eab308'}
            strokeWidth="1"
            opacity="0.5"
            strokeDasharray="2,2"
          />
        ))}
        <defs>
          <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex items-center gap-4 mt-2">
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <span className="w-3 h-px bg-indigo-500 inline-block" /> Heart Rate
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <span className="w-3 h-px bg-orange-500 inline-block opacity-50" style={{ borderTop: '1px dashed' }} /> Symptom
        </span>
      </div>
    </div>
  )
}
