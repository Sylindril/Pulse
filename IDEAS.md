# Ideas — Pulse

Brain dump of features, integrations, and research directions beyond MVP. Nothing here is committed — it's a menu to pick from if we have time or for post-hackathon.

---

## Clinical Intelligence

- **NLP symptom clustering** — group transcriptions by topic (headache cluster, GI cluster, etc.) using embeddings. Show clusters on the doctor timeline with automatic grouping.
- **Severity prediction from language** — train a small model on the relationship between word choice and self-reported severity. "Dull ache" vs "can't see straight" predicts severity before the patient even rates it.
- **Escalation detection + alerts** — if severity trend is upward over N entries, surface a warning to the clinician. Could save lives for things like stroke prodrome.
- **AI visit summary** — use an LLM to generate a narrative summary from the timeline: "Patient reports escalating headaches over 14 days, progressing from mild (3/10) to severe (9/10), with new symptoms including visual disturbances and dizziness. Wearable data confirms elevated HR during episodes."
- **Differential diagnosis suggestions** — based on symptom pattern, body areas, and progression, surface potential diagnoses (with massive disclaimers). Not for patient-facing, but could help clinicians.
- **Comparative analysis across patients** — anonymized pattern matching: "Patients with similar symptom trajectories were most commonly diagnosed with X."

## Wearable Integrations

- **Apple HealthKit** via Swift bridge or Capacitor plugin — pull real HR, SpO2, sleep, steps
- **Google Health Connect** for Android — same data, different API
- **Fitbit Web API** — OAuth flow, pull historical HR data and correlate
- **Oura Ring** — excellent sleep data, could auto-tag "bad night" before a symptom day
- **Continuous monitoring mode** — stream HR in real-time during a symptom capture, show the spike live
- **Environmental data** — weather/barometric pressure (migraine trigger), air quality (asthma), pollen count (allergies). Pull from public APIs and correlate.

## Capture Enhancements

- **Audio recording + playback** — store the actual audio clip alongside transcription. Doctors hear the patient's tone of voice, which conveys urgency better than text.
- **Photo/video attachment** — rash, swelling, injury photos tagged to timeline entries
- **Body map** — tap on a body outline to mark exact pain location. More precise than "head" vs "neck". Could use a simple SVG overlay with touch regions.
- **Symptom templates** — quick-log buttons for recurring symptoms: "Headache again", "Nauseous", "Dizzy spell". One tap, auto-fills transcription and body area.
- **Medication logging** — "I just took 400mg ibuprofen". Track what was taken and when. Correlate with symptom improvement/worsening.
- **Trigger tagging** — food, stress, weather, sleep, exercise. Quick toggles alongside the symptom capture.
- **Duration tracking** — start/stop timer for ongoing symptoms. "Started at 2pm, ended at 4:30pm."

## Doctor/Clinician Features

- **Multi-patient dashboard** — clinician sees all their patients' recent activity at a glance. Triage by who's escalating.
- **Annotation mode** — doctor can add notes to patient entries: "Ordered MRI", "Referred to neuro"
- **FHIR/HL7 export** — generate a standards-compliant document for EHR import. Critical for real-world adoption.
- **Visit prep mode** — before an appointment, auto-generate a "since last visit" summary with all entries, trends, and wearable highlights.
- **Comparison view** — side-by-side: sparse doctor's note vs. rich Pulse timeline. The "aha" moment for the demo.

## UX / Polish

- **Calendar heatmap view** — GitHub-style grid where each day's color = severity. Patterns pop visually.
- **Mood tracking layer** — quick mood emoji after symptom capture. Mood and symptoms are deeply linked.
- **Onboarding flow** — 3-screen intro explaining the long-press gesture, voice capture, and doctor sharing
- **Notification reminders** — "You haven't logged today. How are you feeling?" Gentle nudge to maintain the habit.
- **Widget / watch complication** — fastest possible capture from wrist or home screen
- **Accessibility** — VoiceOver/TalkBack support, high contrast mode, large text option
- **Internationalization** — Web Speech API supports many languages. The UI could too.

## Technical

- **Offline-first with service worker** — full PWA with background sync. Capture works without internet, syncs when reconnected.
- **End-to-end encryption** — patient data is sensitive. Encrypt at the client, store ciphertext in Supabase. Doctor gets the key via the share link.
- **Real-time sync** — Supabase Realtime so the doctor dashboard updates live when the patient captures
- **Data export** — CSV/PDF export of the full timeline for patient records
- **Rate limiting + abuse prevention** — if this goes beyond demo, need auth and rate limits

## Research Questions

- Does comparative pain tracking ("worse than before") produce more clinically useful trend data than absolute scales?
- Do patients who use Pulse report higher satisfaction with doctor visits?
- Does the wearable correlation actually help clinicians make better diagnoses, or is it noise?
- What's the minimum capture frequency needed to be clinically useful? Daily? Per-episode?
- How does voice capture affect the richness of symptom description vs. typed entry vs. checkbox forms?
