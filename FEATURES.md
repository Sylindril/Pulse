# Features — Pulse MVP

## Capture Flow (Patient View — `/`)

### Gesture Trigger
- **Long-press** central circle for 1.2 seconds to start recording
- Progress ring fills during hold, providing visual feedback
- Haptic feedback (`navigator.vibrate`) when triggered
- Fallback "tap to record" button for desktop/testing

### Voice Capture
- **Web Speech API** (`webkitSpeechRecognition`) with `interimResults: true`
- Words appear in real-time as spoken — key "wow" moment
- Automatic language detection (defaults to `en-US`)
- Pulsing mic icon + animated waveform bars during recording
- **Keyboard fallback** — switch icon lets users type instead (for unsupported browsers or noisy environments)

### Severity Rating
- 1-10 slider with color-coded scale (green → yellow → orange → red)
- Descriptive labels: "Barely noticeable" through "Worst possible"
- **Skippable** — defaults to 5 if skipped

### Comparative Assessment
- **Only shown if there's an entry within the last 7 days** — avoids recency bias for old entries
- Four options in a 2x2 grid: Better / Same / Worse / Worst ever
- Each option color-coded and icon'd for quick selection
- Also skippable
- Clinically valuable because it gives anchored trend data independent of absolute severity score

### Auto Body Area Detection
- Keyword-based regex guesser runs on the transcription
- Maps common terms: "headache" → head, "nauseous" → stomach, "dizzy" → head, etc.
- Falls back to "general" for unrecognized symptoms

### Completion
- Green checkmark animation on save
- Auto-dismisses after 1.2 seconds
- Entry saved to localStorage immediately

## Doctor Timeline (Clinician View — `/doctor`)

### Summary Panel
- 4 stat cards: entry count + time span, avg severity, most common body area, trend direction
- Trend detection: compares avg severity of recent 3 entries vs older entries
- "Escalating" / "Stable" with color coding

### Wearable Strip
- SVG sparkline showing heart rate over 14 days
- Gradient fill under the line
- Vertical dashed markers at symptom timestamps, color-coded by severity
- Legend for HR line and symptom markers

### Timeline Entries
- Vertical timeline with severity-colored dots
- Each card shows: relative + absolute timestamp, transcription in quotes, severity badge, comparison badge (if present), body area tag, wearable snapshot (HR + SpO2)
- Staggered entrance animation (50ms delay per card)
- **Edit** — hover reveals pencil icon, inline text editing with save/cancel
- **Delete** — hover reveals trash icon, removes entry from localStorage

### Share
- Generates a unique URL with random token
- Copy-to-clipboard with visual confirmation
- Links to read-only shared view

### Demo Reset
- Reset button reloads curated demo dataset
- Clears all user-added entries

## Shared View (`/shared/:token`)
- Read-only timeline — same TimelineView component, no edit/delete
- "Read-only view" shield badge
- No auth required (demo purposes)

## Demo Data
- **Sarah M.** — 10 entries over 14 days showing escalating headaches
- Medically coherent progression: mild headache → dizziness → light sensitivity → visual disturbances → multiple daily episodes
- Comparison values tell the trend story: mostly "worse" with two "worst ever" entries
- Wearable data auto-generated with symptom correlation: HR spikes near severe entries, SpO2 dips, reduced steps on symptomatic days

## Data Persistence
- **localStorage** — entries persist across browser sessions
- No server required for demo mode
- Supabase integration ready (client configured, just needs `.env` values)

## Design Details
- Patient view: light gradient background, indigo/violet accent
- Doctor view: dark mode (`bg-pulse-darker`) — pops on projectors
- Framer Motion animations: spring physics on circle, staggered card entrances, scale transitions on success
- Breathing animation on capture circle when idle (3s loop)
- Tailwind CSS v4 with custom theme tokens
