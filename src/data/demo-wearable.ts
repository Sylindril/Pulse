import type { SymptomEntry } from './demo-entries'

export interface WearableSnapshot {
  timestamp: string
  heartRate: number
  bloodOxygen: number
  steps: number
  sleepQuality: 'good' | 'fair' | 'poor'
}

// Generate correlated wearable data based on symptom entries
export function generateWearableData(entries: SymptomEntry[]): WearableSnapshot[] {
  const snapshots: WearableSnapshot[] = []
  const now = new Date()
  const twoWeeksAgo = new Date(now)
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)

  // Create symptom time map for correlation
  const symptomTimes = entries.map(e => ({
    time: new Date(e.recordedAt).getTime(),
    severity: e.severity,
    bodyArea: e.bodyArea,
  }))

  // Generate hourly snapshots for 14 days
  const current = new Date(twoWeeksAgo)
  while (current <= now) {
    const t = current.getTime()

    // Find nearby symptoms (within 2 hours)
    const nearbySymptom = symptomTimes.find(
      s => Math.abs(s.time - t) < 2 * 60 * 60 * 1000
    )

    // Base values with natural variation
    let heartRate = 68 + Math.random() * 8 // 68-76 base
    let bloodOxygen = 97 + Math.random() * 2 // 97-99 base
    let steps = current.getHours() >= 8 && current.getHours() <= 22
      ? Math.floor(200 + Math.random() * 400)
      : Math.floor(Math.random() * 20)

    // Correlate with symptoms
    if (nearbySymptom) {
      const severityFactor = nearbySymptom.severity / 10
      heartRate += severityFactor * 30 // spike to 90-100+ near severe symptoms
      bloodOxygen -= severityFactor * 3 // dip to 94-97 near respiratory issues
      steps = Math.floor(steps * (1 - severityFactor * 0.6)) // fewer steps when symptomatic
    }

    // Day-level effects: on days with multiple symptoms, overall metrics worse
    const dayStart = new Date(current)
    dayStart.setHours(0, 0, 0, 0)
    const dayEnd = new Date(current)
    dayEnd.setHours(23, 59, 59, 999)
    const daySymptoms = symptomTimes.filter(
      s => s.time >= dayStart.getTime() && s.time <= dayEnd.getTime()
    )
    if (daySymptoms.length > 1) {
      heartRate += 5
      steps = Math.floor(steps * 0.7)
    }

    const sleepQuality: WearableSnapshot['sleepQuality'] =
      daySymptoms.some(s => s.severity >= 7) ? 'poor'
        : daySymptoms.length > 0 ? 'fair'
          : 'good'

    snapshots.push({
      timestamp: current.toISOString(),
      heartRate: Math.round(Math.min(heartRate, 120)),
      bloodOxygen: Math.round(Math.max(bloodOxygen, 93) * 10) / 10,
      steps: Math.max(0, steps),
      sleepQuality,
    })

    current.setHours(current.getHours() + 1)
  }

  return snapshots
}
