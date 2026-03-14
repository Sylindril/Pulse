# Pulse — The Story

## The Problem

Seven words. That's what the average patient says about their symptoms in a 15-minute doctor visit.

> "Pretty good, some dizziness sometimes."

Meanwhile, they've had 10 episodes in 14 days. Severity escalated from 3 to 9. Visual disturbances started on day 12. They forgot to mention any of it. The doctor scribbles "patient reports occasional dizziness" and moves on.

This isn't a technology problem. It's a human problem. And it plays out millions of times a day.

---

## Is This a Real Problem?

### The data says yes.

- **73% of patients** forget to mention symptoms during visits (Journal of General Internal Medicine).
- The average primary care visit is **15.7 minutes** — and shrinking. That's the entire window for history, exam, diagnosis, and treatment plan.
- Patient self-reported pain scores have **poor test-retest reliability** — the same patient rates the same pain differently on different days, depending on mood, context, and framing (PMID: 27198828).
- **Recency bias** is well-documented: patients overweight the last 24-48 hours and underweight the previous two weeks. Clinicians know this and partially discount what patients say — creating a trust gap.

### Three distinct problems hiding inside one:

**1. The Recall Gap**
Patients genuinely misremember symptom frequency, timing, and progression. A headache on Tuesday is forgotten by Friday's appointment. A good day before the visit erases the memory of a terrible week. Timestamped logs fix this — but a notes app could too. The edge is *structured data from unstructured input*: auto-detected body area, severity, comparison metric, and correlated vitals make it queryable, not just a wall of text.

**2. The Articulation Gap (the real killer)**
The patient has *lived* with 14 days of escalating headaches. They know something is wrong. But in the exam room, under time pressure, with a doctor asking rapid-fire questions, they collapse two weeks of suffering into "yeah, some headaches." They don't have the *language* to describe what happened.

Pulse gives them that language. A patient who reads their summary in the waiting room walks in and says: "I've had 10 episodes in 14 days, severity trending from 3 to 9, with new visual disturbances starting last week and heart rate spiking to 105 during episodes." That's a fundamentally different visit. That gets an MRI ordered.

**3. The Comparison Problem (the novel angle)**
Absolute pain scores are unreliable. A 6/10 means different things to different people. One person's 6 is another person's 3. But "worse than last time" is universally meaningful.

Pulse collects *anchored comparison* alongside severity: better, same, worse, worst ever. This gives trend data that's calibrated to the individual, not a universal scale. It sidesteps the reliability problem of absolute scores entirely. This isn't just a feature — it's a clinically meaningful methodological improvement in how patient-reported outcomes are captured.

---

## Why Now?

- **Voice AI is free and built into the browser.** The Web Speech API gives us real-time transcription with zero infrastructure cost. Five years ago, this required a paid API and a backend.
- **Wearables are ubiquitous.** 30% of US adults wear a smartwatch. Heart rate, SpO2, sleep, and activity data are available via HealthKit/Health Connect — but they're trapped in siloed apps with no clinical context. Pulse can be the bridge.
- **Patients are more health-literate than ever.** Post-COVID, patients Google symptoms, track vitals, and want to be active participants in their care. But the tools they have (notes apps, symptom trackers with checkboxes) don't produce output that's useful in a clinical conversation.
- **Value-based care incentivizes better data.** As healthcare shifts from fee-for-service to outcomes-based reimbursement, providers need richer patient-reported outcome measures (PROMs). Pulse generates PROMs passively.

---

## Is This Meaningful?

### The visit prep moment is the product.

Everything else — voice capture, timeline, wearable correlation — exists to feed one 30-second moment: the patient reading their summary on their phone in the waiting room.

That moment changes the visit. The patient arrives with clarity instead of confusion. The doctor gets signal instead of noise. The visit is more efficient, more accurate, and more likely to catch something early.

### The before/after contrast is devastating.

**Without Pulse (typical doctor's note):**
> Patient reports headaches x2 weeks. Denies visual changes. Denies nausea. Assessment: tension-type headache. Plan: continue OTC analgesics, return if worsening.

**With Pulse (patient's timeline summary):**
> 10 symptom entries over 14 days. Head: 8 entries, severity 3-9/10 (avg 6.6), trending worse. HR peaked at 105 bpm. Worst: "Three headaches today, the worst one lasted two hours. Nothing helps anymore" (yesterday, 9/10). Visual disturbances reported starting day 12. Patient self-reports "worst ever" twice in last week. Pattern: symptoms escalating — average severity increased from 4.3 to 7.3 over the period.

That second patient is getting an MRI. The first patient is being told to take more ibuprofen.

### This isn't hypothetical harm.

Missed escalation patterns lead to delayed diagnoses. Stroke prodrome presents as escalating headaches with visual disturbances — exactly what our demo dataset shows. The difference between "patient reports headaches" and "patient reports escalating headaches with new visual disturbances, self-rated as worst-ever twice this week" can be the difference between a timely diagnosis and a catastrophic one.

---

## Is This Scalable?

### Distribution wedge: the patient.

Most health apps try to sell to hospitals or insurers — a 12-18 month sales cycle with procurement committees. Pulse starts with the patient. No prescription needed. No IT integration. Download, capture, share.

The viral loop is the share link. Patient captures symptoms → shares timeline with doctor → doctor sees the value → recommends to other patients. This is bottom-up adoption, not top-down sales.

### Network effects compound.

- **Patient to doctor:** One patient sharing a Pulse timeline changes one visit.
- **Doctor to patients:** A doctor who sees value recommends it to their panel. Now every visit with every patient is better.
- **Clinic-wide adoption:** When enough doctors at a practice use it, the practice standardizes on it. Now it's in the workflow.
- **EHR integration (later):** Once there's clinical demand, the FHIR/HL7 integration is technically straightforward. The hard part is proving value — not writing the API connector.

### The data moat.

Every symptom captured, every severity rated, every comparison logged builds a dataset that enables:
- **Pattern detection:** alerting patients to escalations they don't notice.
- **Population-level insights:** "Patients who report X pattern are Y% more likely to be diagnosed with Z."
- **Better NLP models:** training symptom extraction on real patient language, not clinical notes.

This data is proprietary, grows with usage, and becomes more valuable over time.

### Unit economics favor the model.

- **Cost to serve:** Near-zero. Voice transcription is client-side (Web Speech API). Storage is text + small JSON payloads. No expensive ML inference in the hot path.
- **Revenue paths:** Freemium consumer app → premium features (AI summaries, advanced pattern detection, family accounts) → B2B clinic/provider licensing → data insights (anonymized, compliant).
- **CAC advantage:** The share link is a zero-cost acquisition channel. Every shared timeline is a product demo delivered by a trusted source (the patient) to a high-value audience (the doctor).

---

## Is This Feasible?

### What exists today (MVP):

- Voice capture with real-time transcription (Web Speech API, client-side)
- Severity + anchored comparison metric (better/same/worse/worst ever)
- Auto-detected body area from natural language
- Wearable vitals snapshot frozen at recording time
- Patient-readable narrative summary
- Shareable read-only timeline link
- 14-day demo dataset with medically coherent escalation story
- Works offline, no account required, data in localStorage

### What's technically straightforward but not yet built:

- Real wearable integration (HealthKit/Health Connect — well-documented APIs)
- Supabase backend for cross-device sync (client already configured)
- LLM-powered summaries (richer than rule-based, but rule-based works for MVP)
- FHIR export for EHR import (standard, well-specified)
- Push notification reminders for capture habit formation

### What's hard (and worth being honest about):

- **Habit formation.** The app is only useful if patients actually capture symptoms when they happen. This is a behavior change problem, not a technology problem. Solutions: notifications, watch complications, minimal-friction capture (which we've optimized for).
- **Clinical validation.** Does Pulse actually improve visit quality? Diagnosis accuracy? Patient satisfaction? This requires a clinical study. The hackathon MVP can't prove this — but it can demonstrate the *plausibility* of the mechanism.
- **Privacy and trust.** Health data is sensitive. Patients need to trust that their symptom descriptions aren't being sold or leaked. End-to-end encryption, transparent data policies, and HIPAA compliance (for the US market) are table stakes, not differentiators.
- **Regulatory pathway.** If Pulse ever claims to detect or diagnose conditions, it enters FDA SaMD (Software as a Medical Device) territory. The MVP carefully avoids this — it's a logging tool, not a diagnostic. But the pattern detection features we want to build will push toward this boundary.

---

## Is This Investible?

### The pitch in 30 seconds:

Patients forget symptoms, can't articulate their experience in 15-minute visits, and pain scores are unreliable. Pulse captures symptoms in the moment — voice, severity, and anchored comparison — and generates a readable summary that transforms the doctor visit. Zero infrastructure cost, viral distribution through the share link, and a data moat that deepens with every capture.

### Why this team, right now:

Built in a weekend at MIT GrandHacks. Functional MVP with voice capture, analytics timeline, narrative summary, and a clinically coherent demo story. The speed of execution demonstrates that the core product is simple — which means it's defensible through user adoption and data, not through technical complexity.

### The ask:

Validate the core thesis: does a Pulse summary change the doctor visit? Run a small clinical pilot — 50 patients, 4 weeks, compare visit outcomes with and without Pulse. If the answer is yes, everything else follows.

---

## The One-Liner

**Pulse: capture the moment, change the visit.**
