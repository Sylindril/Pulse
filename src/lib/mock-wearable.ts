import type { SymptomEntry } from '../data/demo-entries'
import type { WearableSnapshot } from '../data/demo-wearable'

// Get the closest wearable snapshot to a symptom entry
export function getSnapshotForEntry(
  entry: SymptomEntry,
  snapshots: WearableSnapshot[]
): WearableSnapshot | null {
  const entryTime = new Date(entry.recordedAt).getTime()
  let closest: WearableSnapshot | null = null
  let minDiff = Infinity

  for (const snap of snapshots) {
    const diff = Math.abs(new Date(snap.timestamp).getTime() - entryTime)
    if (diff < minDiff) {
      minDiff = diff
      closest = snap
    }
  }

  return closest
}

// Get daily summary from snapshots
export function getDailySummary(snapshots: WearableSnapshot[], date: Date) {
  const dayStart = new Date(date)
  dayStart.setHours(0, 0, 0, 0)
  const dayEnd = new Date(date)
  dayEnd.setHours(23, 59, 59, 999)

  const daySnaps = snapshots.filter(s => {
    const t = new Date(s.timestamp).getTime()
    return t >= dayStart.getTime() && t <= dayEnd.getTime()
  })

  if (daySnaps.length === 0) return null

  return {
    avgHeartRate: Math.round(daySnaps.reduce((s, d) => s + d.heartRate, 0) / daySnaps.length),
    minBloodOxygen: Math.min(...daySnaps.map(d => d.bloodOxygen)),
    totalSteps: daySnaps.reduce((s, d) => s + d.steps, 0),
    sleepQuality: daySnaps[0].sleepQuality,
  }
}
