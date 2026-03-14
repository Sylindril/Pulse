import { useState, useCallback, useEffect } from 'react'
import type { SymptomEntry } from '../data/demo-entries'
import { demoEntries } from '../data/demo-entries'

const STORAGE_KEY = 'pulse-symptom-entries'

function loadEntries(): SymptomEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return [...demoEntries]
}

function saveEntries(entries: SymptomEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function useSymptomEntries() {
  const [entries, setEntries] = useState<SymptomEntry[]>(loadEntries)

  useEffect(() => {
    saveEntries(entries)
  }, [entries])

  const addEntry = useCallback((entry: Omit<SymptomEntry, 'id' | 'userId' | 'createdAt'>) => {
    // Generate mock vitals snapshot frozen at recording time
    const severityFactor = (entry.severity || 5) / 10
    const vitals = entry.vitals ?? {
      heartRate: Math.round(72 + severityFactor * 30 + (Math.random() * 6 - 3)),
      bloodOxygen: Math.round((98 - severityFactor * 3 + (Math.random() * 0.6 - 0.3)) * 10) / 10,
    }

    const newEntry: SymptomEntry = {
      ...entry,
      vitals,
      id: crypto.randomUUID(),
      userId: 'demo-user',
      createdAt: new Date().toISOString(),
    }
    setEntries(prev => [newEntry, ...prev])
    return newEntry
  }, [])

  const deleteEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id))
  }, [])

  const editEntry = useCallback((id: string, updates: Partial<SymptomEntry>) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e))
  }, [])

  const resetToDemo = useCallback(() => {
    const fresh = [...demoEntries]
    setEntries(fresh)
    saveEntries(fresh)
  }, [])

  // Sort newest first
  const sorted = [...entries].sort(
    (a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime()
  )

  return { entries: sorted, addEntry, deleteEntry, editEntry, resetToDemo }
}
