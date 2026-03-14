import { useMemo } from 'react'
import type { SymptomEntry } from '../../data/demo-entries'
import { generateWearableData } from '../../data/demo-wearable'
import { getSnapshotForEntry } from '../../lib/mock-wearable'
import { TimelineEntry } from './TimelineEntry'
import { SummaryPanel } from './SummaryPanel'
import { WearableStrip } from './WearableStrip'

interface Props {
  entries: SymptomEntry[]
  onDelete?: (id: string) => void
  onEdit?: (id: string, updates: Partial<SymptomEntry>) => void
}

export function TimelineView({ entries, onDelete, onEdit }: Props) {
  const wearableData = useMemo(() => generateWearableData(entries), [entries])

  return (
    <div>
      <SummaryPanel entries={entries} />
      <WearableStrip snapshots={wearableData} entries={entries} />

      <div className="relative">
        {entries.length === 0 ? (
          <p className="text-slate-500 text-center py-12">
            No symptom entries yet. Use the patient view to capture symptoms.
          </p>
        ) : (
          entries.map((entry, i) => (
            <TimelineEntry
              key={entry.id}
              entry={entry}
              snapshot={getSnapshotForEntry(entry, wearableData)}
              index={i}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  )
}
