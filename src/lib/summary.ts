import type { SymptomEntry } from '../data/demo-entries'

interface Summary {
  periodLabel: string
  text: string
}

export function generateSummary(entries: SymptomEntry[]): Summary | null {
  if (entries.length === 0) return null

  // Sort oldest first for narrative flow
  const sorted = [...entries].sort(
    (a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
  )

  const first = new Date(sorted[0].recordedAt)
  const last = new Date(sorted[sorted.length - 1].recordedAt)
  const daySpan = Math.ceil((last.getTime() - first.getTime()) / (1000 * 60 * 60 * 24))

  const periodLabel = first.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  // Group by body area
  const byArea: Record<string, SymptomEntry[]> = {}
  sorted.forEach(e => {
    byArea[e.bodyArea] = byArea[e.bodyArea] || []
    byArea[e.bodyArea].push(e)
  })

  // Build narrative
  const lines: string[] = []

  lines.push(`${entries.length} symptom entries over ${daySpan} days.`)

  // Per-area summaries
  for (const [area, areaEntries] of Object.entries(byArea).sort((a, b) => b[1].length - a[1].length)) {
    const severities = areaEntries.map(e => e.severity)
    const minSev = Math.min(...severities)
    const maxSev = Math.max(...severities)
    const avgSev = Math.round(severities.reduce((s, v) => s + v, 0) / severities.length * 10) / 10

    // Trend from comparisons
    const comparisons = areaEntries.filter(e => e.comparison).map(e => e.comparison!)
    const worseCount = comparisons.filter(c => c === 'worse' || c === 'worst').length
    const betterCount = comparisons.filter(c => c === 'better').length

    let trend = ''
    if (worseCount > betterCount + 1) trend = ', trending worse'
    else if (betterCount > worseCount + 1) trend = ', trending better'

    // Vitals range
    const vitals = areaEntries.filter(e => e.vitals).map(e => e.vitals!)
    let vitalsNote = ''
    if (vitals.length > 0) {
      const maxHR = Math.max(...vitals.map(v => v.heartRate))
      if (maxHR > 90) vitalsNote = ` HR peaked at ${maxHR} bpm.`
    }

    const sevRange = minSev === maxSev ? `${minSev}/10` : `${minSev}-${maxSev}/10`
    lines.push(`\n${capitalize(area)}: ${areaEntries.length} entries, severity ${sevRange} (avg ${avgSev})${trend}.${vitalsNote}`)

    // Highlight most severe entry
    const worst = areaEntries.reduce((a, b) => a.severity > b.severity ? a : b)
    const worstDate = new Date(worst.recordedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    lines.push(`  Worst: "${truncate(worst.transcription, 80)}" (${worstDate}, ${worst.severity}/10)`)
  }

  // Overall pattern note
  const allSeverities = sorted.map(e => e.severity)
  const firstHalf = allSeverities.slice(0, Math.ceil(allSeverities.length / 2))
  const secondHalf = allSeverities.slice(Math.ceil(allSeverities.length / 2))
  const firstAvg = firstHalf.reduce((s, v) => s + v, 0) / firstHalf.length
  const secondAvg = secondHalf.reduce((s, v) => s + v, 0) / secondHalf.length

  if (secondAvg > firstAvg + 1.5) {
    lines.push(`\nPattern: Symptoms are escalating — average severity increased from ${firstAvg.toFixed(1)} to ${secondAvg.toFixed(1)} over the period.`)
  } else if (firstAvg > secondAvg + 1.5) {
    lines.push(`\nPattern: Symptoms are improving — average severity decreased from ${firstAvg.toFixed(1)} to ${secondAvg.toFixed(1)}.`)
  }

  return { periodLabel, text: lines.join('\n') }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function truncate(s: string, len: number): string {
  return s.length > len ? s.slice(0, len) + '...' : s
}
