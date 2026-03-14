# Pulse — Symptom Capture App

**MIT GrandHacks 2025**

> *"73% of patients forget to mention symptoms during visits. 795,000 Americans suffer death or permanent disability from diagnostic errors every year. 56% of those errors trace to poor patient history. We built Pulse."*

Patients forget symptoms, suffer recency bias in 15-minute doctor visits, and pain scores are unreliable. **Pulse** lets patients capture symptoms *in the moment* — a quick gesture, a spoken description, logged with timestamp and wearable context — then generates a readable summary you can pull up on your phone in the waiting room.

The result: you walk into your doctor's office and say *"I've had 10 episodes in 14 days, severity trending from 3 to 9, with new visual disturbances starting last week"* instead of *"yeah, some headaches."*

Read the full story: [`STORY.md`](STORY.md)

---

## Quick Start

### Prerequisites
- [Miniconda](https://docs.conda.io/en/latest/miniconda.html) or [Anaconda](https://www.anaconda.com/)
- [Git](https://git-scm.com/)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/Sylindril/Pulse.git
cd Pulse/symptom-snap

# 2. Create and activate the conda environment
conda create -n pulse python=3.12 nodejs -y
conda activate pulse

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev -- --host
```

Open **http://localhost:5173** in Chrome or Edge (needed for voice capture).

> **WSL users:** `localhost` forwards automatically from Windows to WSL. Just open the URL in your Windows browser.

> **Voice capture note:** The Web Speech API works in Chrome and Edge. Firefox/Safari will automatically fall back to text input mode.

### Pages

| URL | Page | Description |
|-----|------|-------------|
| `/` | **Capture** | Log a symptom with voice or text — the hero interaction |
| `/doctor` | **My Timeline** | Your full symptom history, analytics, summary, and wearable data |
| `/shared/:token` | **Shared View** | Read-only link you can send to your doctor |

---

## How It Works

### 1. Capture a Symptom (5 seconds)
- **Long-press** the pulsing circle for 1.2 seconds (or just tap "or tap to record")
- **Speak** your symptom — words appear in real-time as you talk
- Or tap **"Type instead"** to type it out
- Tap **Done** → rate **severity** (1-10 slider, skippable)
- If you've logged a similar symptom recently: tap how it **compares** to last time (Better / Same / Worse / Worst ever)
- Green checkmark — done!

### 2. View Your Timeline (`/doctor`)
- Tap **"My timeline"** on the capture page, or navigate to `/doctor`
- **Summary** button (top right) → readable narrative of your symptom history, grouped by body area, with trends and worst episodes highlighted. Read this in the waiting room before your visit.
- **Stats panel** → entry count, avg severity, most common area, trend direction
- **Heart rate chart** → 14-day wearable data with symptom markers overlaid
- **Entry cards** → each shows transcription, severity badge, comparison indicator, body area, and vitals (HR + SpO2) frozen at recording time
- **Edit/delete** → hover over any entry card to reveal pencil/trash icons
- **Share** → generates a unique read-only link for your doctor
- **Reset** → circular arrow icon reloads the demo dataset

### 3. Share with Your Doctor
- Hit **Share** on the timeline → get a unique link
- Your doctor opens it → sees your full timeline (read-only, no account needed)

---

## Demo Data

The app comes preloaded with a 2-week patient story showing escalating headaches — the kind of pattern that gets missed in real visits but is obvious in the timeline view. Hit the **reset button** (circular arrow on the timeline page) to reload it anytime.

### Editing Demo Data

The dataset lives in **`src/data/demo-entries.ts`**. Each entry:

```typescript
{
  id: 'demo-1',
  userId: 'demo-user',
  transcription: 'Your symptom description here',
  severity: 6,                     // 1-10 scale
  comparison: 'worse',             // 'better' | 'same' | 'worse' | 'worst' (optional)
  bodyArea: 'head',                // head, stomach, chest, back, neck, legs, arms, throat, general
  vitals: { heartRate: 88, bloodOxygen: 97.1 },
  recordedAt: day(5, 14),          // day(daysAgo, hour) — 5 days ago at 2pm
  createdAt: day(5, 14),
}
```

The `day(daysAgo, hour)` helper generates relative timestamps so the demo always looks fresh.

After editing, reset in the browser: click the reset button on `/doctor`, or clear `pulse-symptom-entries` from localStorage.

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Vite 6 + React 19 + TypeScript | 60ms HMR, zero config |
| Styling | Tailwind CSS v4 | Utility-first, instant polish |
| Animation | Framer Motion (`motion/react`) | Staggered timelines, spring physics |
| Voice | Web Speech API | Free, client-side, real-time transcription |
| Icons | Lucide React | Clean, consistent, medical-friendly |
| Backend | Supabase (optional) | Works fully offline with localStorage |

## Project Structure

```
symptom-snap/
├── STORY.md                          # Why this matters (data, evidence, market)
├── CLAUDE_IDEAS.md                   # AI-generated feature ideas
├── HUMAN_IDEAS.md                    # Team ideas
├── FEATURES.md                       # MVP feature documentation
├── CLAUDE.md                         # Instructions for Claude Code
├── .env                              # Supabase keys (not committed)
└── src/
    ├── main.tsx                      # Entry point
    ├── App.tsx                       # Router
    ├── index.css                     # Tailwind + theme
    ├── lib/
    │   ├── speech.ts                 # Web Speech API wrapper
    │   ├── summary.ts                # Narrative summary generator
    │   ├── supabase.ts               # Supabase client (optional)
    │   └── mock-wearable.ts          # Wearable data utilities
    ├── hooks/
    │   ├── useGesture.ts             # Long-press detection + progress ring
    │   ├── useSpeechRecognition.ts   # Voice capture hook
    │   └── useSymptomEntries.ts      # Entry CRUD + localStorage
    ├── components/
    │   ├── capture/
    │   │   ├── CaptureOverlay.tsx    # Full-screen recording UI
    │   │   ├── VoiceVisualizer.tsx   # Pulsing waveform animation
    │   │   └── SeveritySlider.tsx    # Severity + comparison input
    │   └── timeline/
    │       ├── TimelineView.tsx      # Timeline container
    │       ├── TimelineEntry.tsx     # Individual symptom card
    │       ├── SummaryPanel.tsx      # Stats panel
    │       └── WearableStrip.tsx     # HR sparkline chart
    ├── pages/
    │   ├── PatientHome.tsx           # Capture page (/)
    │   ├── DoctorTimeline.tsx        # Timeline page (/doctor)
    │   └── SharedView.tsx            # Shared view (/shared/:token)
    └── data/
        ├── demo-entries.ts           # ← EDIT THIS for demo data
        └── demo-wearable.ts          # Auto-generated wearable trends
```

## Supabase (Optional)

The app works fully offline with localStorage — no backend needed for the demo. To enable cross-device sync:

1. Create a project at [supabase.com](https://supabase.com)
2. Create a `.env` file in the project root:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Deploying

```bash
conda activate pulse
npm run build    # outputs to dist/
```

Deploy `dist/` to Vercel, Netlify, or any static host. **HTTPS is required** for the microphone and motion APIs to work on mobile.

---

## Contributing

This was built at MIT GrandHacks 2025. If you're a teammate:

1. Clone the repo and follow Quick Start above
2. Edit demo data in `src/data/demo-entries.ts`
3. Add your ideas to `HUMAN_IDEAS.md`
4. Read `STORY.md` for the pitch narrative and clinical evidence

## License

MIT
