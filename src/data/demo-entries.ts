export interface SymptomEntry {
  id: string
  userId: string
  transcription: string
  severity: number
  bodyArea: string
  recordedAt: string // ISO date string
  createdAt: string
}

const now = new Date()
const day = (daysAgo: number, hour = 12) => {
  const d = new Date(now)
  d.setDate(d.getDate() - daysAgo)
  d.setHours(hour, Math.floor(Math.random() * 60), 0, 0)
  return d.toISOString()
}

export const demoEntries: SymptomEntry[] = [
  {
    id: 'demo-1',
    userId: 'demo-user',
    transcription: 'Mild headache after lunch, kind of like a dull pressure behind my eyes',
    severity: 3,
    bodyArea: 'head',
    recordedAt: day(14, 13),
    createdAt: day(14, 13),
  },
  {
    id: 'demo-2',
    userId: 'demo-user',
    transcription: 'Woke up feeling dizzy, lasted about twenty minutes then went away',
    severity: 4,
    bodyArea: 'head',
    recordedAt: day(12, 7),
    createdAt: day(12, 7),
  },
  {
    id: 'demo-3',
    userId: 'demo-user',
    transcription: 'Headache is back again, took ibuprofen but it didn\'t really help this time',
    severity: 6,
    bodyArea: 'head',
    recordedAt: day(10, 16),
    createdAt: day(10, 16),
  },
  {
    id: 'demo-4',
    userId: 'demo-user',
    transcription: 'Feeling a bit nauseous with the headache today, had to skip lunch',
    severity: 5,
    bodyArea: 'stomach',
    recordedAt: day(9, 12),
    createdAt: day(9, 12),
  },
  {
    id: 'demo-5',
    userId: 'demo-user',
    transcription: 'Sharp headache with light sensitivity, had to lie down in a dark room for an hour',
    severity: 8,
    bodyArea: 'head',
    recordedAt: day(7, 14),
    createdAt: day(7, 14),
  },
  {
    id: 'demo-6',
    userId: 'demo-user',
    transcription: 'Dizzy spell at work, almost fell getting up from my desk. Coworker noticed I looked pale',
    severity: 7,
    bodyArea: 'head',
    recordedAt: day(5, 10),
    createdAt: day(5, 10),
  },
  {
    id: 'demo-7',
    userId: 'demo-user',
    transcription: 'Neck is really stiff and sore, might be related to the headaches',
    severity: 5,
    bodyArea: 'neck',
    recordedAt: day(4, 8),
    createdAt: day(4, 8),
  },
  {
    id: 'demo-8',
    userId: 'demo-user',
    transcription: 'Vision got blurry during headache, saw some weird spots. Scared me honestly',
    severity: 7,
    bodyArea: 'head',
    recordedAt: day(2, 15),
    createdAt: day(2, 15),
  },
  {
    id: 'demo-9',
    userId: 'demo-user',
    transcription: 'Three headaches today, the worst one lasted two hours. Nothing helps anymore',
    severity: 9,
    bodyArea: 'head',
    recordedAt: day(1, 18),
    createdAt: day(1, 18),
  },
  {
    id: 'demo-10',
    userId: 'demo-user',
    transcription: 'Woke up with another headache, feel exhausted even though I slept eight hours',
    severity: 6,
    bodyArea: 'head',
    recordedAt: day(0, 8),
    createdAt: day(0, 8),
  },
]
