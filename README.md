# Pulse — Symptom Capture App

**MIT GrandHacks 2025**

Patients forget symptoms, suffer recency bias in 15-minute doctor visits, and pain scores are unreliable. Pulse lets patients capture symptoms *in the moment* — a quick gesture, a spoken description, logged with timestamp and wearable context. The result: a rich narrative timeline doctors can actually use.

## Quick Start

### Prerequisites
- [Miniconda](https://docs.conda.io/en/latest/miniconda.html) or Anaconda
- Git

### Setup

```bash
# 1. Clone the repo
git clone <repo-url>
cd symptom-snap

# 2. Create and activate the conda environment
conda create -n pulse python=3.12 nodejs -y
conda activate pulse

# 3. Install dependencies
npm install

# 4. Start dev server (--host needed for WSL)
npm run dev -- --host
```

Open **http://localhost:5173** in your browser.

> **WSL users:** `localhost` forwards automatically from Windows to WSL. Just open the URL in your Windows browser.

### Routes

| Route | What it is |
|-------|-----------|
| `/` | **Patient view** — capture symptoms with voice or text |
| `/doctor` | **Doctor timeline** — dark-mode clinician dashboard with wearable data |
| `/shared/:token` | **Shared view** — read-only timeline link for sharing |

## How to Use

### Capturing a Symptom (Patient View)
1. **Long-press** the central circle for 1.2 seconds (or tap "or tap to record")
2. **Speak** your symptom — words appear in real-time
3. Tap **Done** when finished
4. Rate **severity** (1-10 slider) — optional, tap Skip to default to 5
5. Tap how it **compares** to before: Better / Same / Worse / Worst ever
6. Green checkmark — logged!

### Viewing the Timeline (Doctor View)
- Navigate to `/doctor` to see the full patient timeline
- Summary panel shows entry count, avg severity, most common area, trend
- Heart rate sparkline shows 14-day wearable data with symptom markers
- Each entry shows transcription, severity, comparison, body area, and wearable snapshot
- **Share** button generates a read-only link
- **Reset** button (circular arrow icon) reloads the demo dataset

## Editing Demo Data

The demo dataset lives in **`src/data/demo-entries.ts`**. It's a simple array of symptom entries for "Sarah M." showing escalating headaches over 2 weeks.

### Adding/editing entries

Each entry looks like this:

```typescript
{
  id: 'demo-1',                    // unique string ID
  userId: 'demo-user',             // keep as 'demo-user'
  transcription: 'Your symptom description here',
  severity: 6,                     // 1-10 scale
  comparison: 'worse',             // 'better' | 'same' | 'worse' | 'worst'
  bodyArea: 'head',                // head, stomach, chest, back, neck, legs, arms, throat, general
  recordedAt: day(5, 14),          // day(daysAgo, hour) — e.g., day(5, 14) = 5 days ago at 2pm
  createdAt: day(5, 14),           // same as recordedAt
}
```

### The `day()` helper

```typescript
day(daysAgo, hour)
// day(0, 8)   → today at 8am
// day(3, 16)  → 3 days ago at 4pm
// day(14, 7)  → 2 weeks ago at 7am
```

### Wearable data

Wearable data is **auto-generated** from symptom entries in `src/data/demo-wearable.ts`. It correlates heart rate, SpO2, and steps with symptom severity — no need to edit this manually. Higher severity = higher HR spike, lower SpO2, fewer steps.

### Resetting demo data in the browser

The app caches entries in localStorage. After editing `demo-entries.ts`:
1. Click the reset button (circular arrow) on the `/doctor` page, OR
2. Open DevTools → Application → Local Storage → delete `pulse-symptom-entries`

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Vite 6 + React 19 + TypeScript |
| UI | Tailwind CSS v4 |
| Animation | Framer Motion (motion/react) |
| Voice | Web Speech API (Chrome/Edge) |
| Icons | Lucide React |
| Backend | Supabase (optional — works offline with localStorage) |

## Project Structure

```
src/
├── main.tsx                          # App entry
├── App.tsx                           # Router (/, /doctor, /shared/:token)
├── index.css                         # Tailwind + custom theme
├── lib/
│   ├── supabase.ts                   # Supabase client (optional)
│   ├── speech.ts                     # Web Speech API wrapper
│   └── mock-wearable.ts             # Wearable data utilities
├── hooks/
│   ├── useGesture.ts                 # Long-press detection + progress ring
│   ├── useSpeechRecognition.ts       # Voice capture hook
│   └── useSymptomEntries.ts          # Entry CRUD + localStorage persistence
├── components/
│   ├── capture/
│   │   ├── CaptureOverlay.tsx        # Full-screen recording UI
│   │   ├── VoiceVisualizer.tsx       # Pulsing waveform bars
│   │   └── SeveritySlider.tsx        # Severity slider + comparison buttons
│   └── timeline/
│       ├── TimelineView.tsx          # Timeline container
│       ├── TimelineEntry.tsx         # Individual symptom card
│       ├── SummaryPanel.tsx          # Stats at top
│       └── WearableStrip.tsx         # HR sparkline chart
├── pages/
│   ├── PatientHome.tsx               # Patient capture page
│   ├── DoctorTimeline.tsx            # Clinician dashboard
│   └── SharedView.tsx                # Read-only shared view
└── data/
    ├── demo-entries.ts               # ← EDIT THIS for demo data
    └── demo-wearable.ts              # Auto-generated wearable data
```

## Supabase (Optional)

The app works fully offline with localStorage. To connect Supabase:

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL schema (see plan doc)
3. Copy your URL and anon key to `.env`:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Deploying

```bash
npm run build    # outputs to dist/
```

Deploy `dist/` to Vercel, Netlify, or any static host. HTTPS is required for the mic and motion APIs to work on mobile.
