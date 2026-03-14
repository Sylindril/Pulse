# Pulse — The Story

## The Problem

Seven words. That's what the average patient says about their symptoms in a 15-minute doctor visit.

> "Pretty good, some dizziness sometimes."

Meanwhile, they've had 10 episodes in 14 days. Severity escalated from 3 to 9. Visual disturbances started on day 12. They forgot to mention any of it. The doctor scribbles "patient reports occasional dizziness" and moves on.

This isn't a technology problem. It's a human problem. And it plays out millions of times a day.

---

## Is This a Real Problem?

### The numbers are staggering.

- **12 million** US adults experience a diagnostic error in outpatient settings every year. Half of those — **6 million** — are potentially harmful. (Singh et al., *BMJ Quality & Safety*, 2014)
- **795,000 Americans per year** suffer serious harm from diagnostic errors: **371,000 deaths** and **424,000 permanent disabilities**. (Newman-Toker et al., *BMJ Quality & Safety*, 2023)
- The average diagnostic error rate across all diseases is **11.1%**, ranging from 1.5% (heart attack) to 62% (spinal abscess). (Johns Hopkins, *BMJ Quality & Safety*, 2023)
- **56.3%** of primary care diagnostic errors involve breakdowns in **data gathering related to medical history** — the exact problem Pulse addresses. (Singh et al., *JAMA Internal Medicine*, 2013)
- Most people will experience **at least one diagnostic error in their lifetime**. (National Academies, *Improving Diagnosis in Health Care*, 2015)
- Patients remember only **49%** of clinical decisions and recommendations without prompting. Nearly half of what they *do* remember is inaccurate. (*PLOS One*, 2018)

### The cost is enormous.

- Diagnostic errors cost the US healthcare system over **$100 billion per year** in direct costs. Including societal costs (lost productivity, premature death), the total reaches **$750 billion per year**. (AHRQ; National Academies, 2015)
- **18 million** unnecessary ER visits per year by privately insured patients, costing **$32 billion annually**. (UnitedHealth Group, 2019)
- **3.5 million** preventable hospital admissions per year, costing **$33.7 billion**. (AHRQ/CMS)
- Diagnostic errors are the **leading cause of medical malpractice claims** — 1 in 3 malpractice cases resulting in death or permanent disability stem from misdiagnosis. (AHRQ)

### Three distinct problems hiding inside one:

**1. The Recall Gap**
Patients genuinely misremember symptom frequency, timing, and progression. A headache on Tuesday is forgotten by Friday's appointment. A good day before the visit erases the memory of a terrible week. Patients forget **40-80%** of medical information immediately (*Health Expectations*) and remember only **49%** of decisions accurately (*PLOS One*, 2018). Timestamped logs fix this — but a notes app could too. The edge is *structured data from unstructured input*: auto-detected body area, severity, comparison metric, and correlated vitals make it queryable, not just a wall of text.

**2. The Articulation Gap (the real killer)**
The patient has *lived* with 14 days of escalating headaches. They know something is wrong. But in the exam room, under time pressure, with a doctor asking rapid-fire questions, they collapse two weeks of suffering into "yeah, some headaches." They don't have the *language* to describe what happened.

Pulse gives them that language. A patient who reads their summary in the waiting room walks in and says: "I've had 10 episodes in 14 days, severity trending from 3 to 9, with new visual disturbances starting last week and heart rate spiking to 105 during episodes." That's a fundamentally different visit. That gets an MRI ordered.

**3. The Comparison Problem (the novel angle)**
Absolute pain scores are unreliable — poor test-retest reliability, the same patient rates the same pain differently on different days (PMID: 27198828). A 6/10 means different things to different people.

Pulse collects *anchored comparison* alongside severity: better, same, worse, worst ever. This gives trend data that's calibrated to the individual, not a universal scale. It sidesteps the reliability problem of absolute scores entirely. This isn't just a feature — it's a clinically meaningful methodological improvement in how patient-reported outcomes are captured.

---

## Will This Lead to Measurable Outcomes?

### The evidence says yes.

**Patient-reported outcomes improve care.** A 2024 systematic review found that when PROMs (patient-reported outcome measures) were used to monitor disease symptoms, **68% of studies showed improved clinical outcomes** (17 of 25). When used for screening, **71% found a benefit** (10 of 14). (*Health and Quality of Life Outcomes*, 2024)

**Symptom logs accelerate diagnosis.** Patients with structured symptom logs received accurate diagnoses **2.3x faster** on average. AI symptom engines were **10-25% more accurate** when they had access to structured symptom patterns. In oncology, weekly symptom journaling caught relapses **weeks before scheduled appointments**. (*SyncSymptom*; *Symptomizer*, 2024)

**Visit preparation transforms visit quality.** A systematic review found **38 studies** confirming pre-visit planning improves patient-centered care. A study of 7,491 diabetic patients showed a **28.8 percentage-point improvement** in compliance with HbA1c testing among patients contacted before visits. (*PMC*, 2021; *PubMed*, 2015)

**Structured data fixes the #1 source of diagnostic error.** Adding information from structured record review resulted in a **25% improvement in diagnostic accuracy**. This matters because **56.3%** of primary care diagnostic errors come from data-gathering failures. Better structured patient data directly addresses the largest single cause of misdiagnosis. (Singh et al., *JAMA Internal Medicine*, 2013)

### What Pulse specifically enables:

| Metric | Without Pulse | With Pulse (projected) |
|--------|--------------|----------------------|
| Symptom recall at visit | ~49% accurate | ~95%+ (timestamped log) |
| Time to accurate diagnosis | Baseline | **2.3x faster** (structured logs) |
| Diagnostic accuracy | 88.9% (11.1% error rate) | +25% improvement (structured data) |
| Patient-provider communication | Unstructured, recency-biased | Anchored, longitudinal, data-rich |
| Pattern detection | None (patient self-report) | Automated escalation + trend detection |
| Visit prep | Rare (~15% of patients) | Default (summary on phone) |

### The conditions most affected:

The time-to-diagnosis problem is worst for conditions that escalate slowly:

- **Migraine**: Average diagnostic delay of **10.7 years**. 53.5% of patients wait **more than 5 years**. Only 16.5% diagnosed within 1 year. (*Cephalalgia*, 2010; *PMC*, 2019)
- **Autoimmune diseases**: Average **4.5 years** and **4+ doctors** before diagnosis. (AARDA)
- **Cancer**: A 4-week delay to surgery increases mortality risk by **6-8%**. Nearly half of UK cancer patients miss the 28-day diagnostic target. (Cancer Research UK, 2025)
- **Stroke prodrome**: Missed in **17.5%** of cases. Escalating headaches with visual disturbances — exactly our demo scenario — is a classic presentation. (Newman-Toker et al., 2023)

These are conditions where a structured symptom timeline with trend data would have caught the pattern weeks or months earlier.

---

## Will Insurance Companies Pay for This?

### They already pay for less.

Insurers are actively subsidizing health apps and wearables:

- **UnitedHealthcare**: Free Fitbit for Medicare Advantage members. Free Apple Fitness+ memberships.
- **Aetna**: "Attain by Aetna" — members earn a free Apple Watch by hitting health goals.
- **Cigna**: Created a "formulary" of digital health apps (Omada Health, Livongo, Propeller Health, Welldoc) covered for members with chronic conditions. Cigna Ventures invested in Omada.
- **Humana**: Go365 program rewards members with cash and gift cards for healthy behaviors.
- **Blue Cross Blue Shield**: Blue 365 program offers free Fitbit Premium subscriptions.

Why? Because **engaged, well-monitored patients cost less downstream**.

### The ROI math is overwhelming.

- **One prevented hospitalization** saves $9,600-$30,000. A health app subscription costs $120-$360/year. That's an **80x-250x return** on a single prevented event.
- Remote monitoring for congestive heart failure cut per-patient costs from **$136,020 to $43,703** over 6 months — a **$92,317 savings per patient**. (Teladoc/Livongo)
- Disease prevention apps lower costs by up to **$136 per member per month** — a **4.5x-13.6x return** vs. the cost of the app. (RAND Corporation)
- For every **$10 billion of payer revenue**, digital health solutions save **$530M-$1.27B** in combined admin costs, medical costs, and revenue improvement. (McKinsey)

### Pulse fits the insurer value proposition perfectly.

1. **Low cost to subsidize**: Near-zero infrastructure cost. Text + JSON storage. Client-side voice processing. The per-user cost is pennies.
2. **High cost of inaction**: A single missed diagnosis that leads to an ER visit ($3,130/day) or hospitalization ($30,000) dwarfs years of app cost.
3. **Data insurers want**: Structured PROMs, symptom trends, wearable correlation. This is the data that value-based care contracts need.
4. **Proven model**: Cigna already has a digital therapeutics formulary. Pulse is a natural addition for any condition where symptom monitoring matters (chronic pain, migraine, autoimmune, mental health, oncology follow-up).

### The pitch to insurers (post-clinical-validation):

> "Your members with chronic conditions average 4.2 ER visits per year. 27% of those are preventable with better outpatient monitoring. Pulse gives members structured symptom tracking that makes every primary care visit more productive, reducing escalations to ER and hospital. Cost per member: $3/month. Cost of one prevented ER visit: $3,130. You do the math."

---

## Why Now?

- **Voice AI is free and built into the browser.** The Web Speech API gives us real-time transcription with zero infrastructure cost. Five years ago, this required a paid API and a backend.
- **Wearables are ubiquitous.** 30% of US adults wear a smartwatch. Heart rate, SpO2, sleep, and activity data are available via HealthKit/Health Connect — but they're trapped in siloed apps with no clinical context. Pulse can be the bridge.
- **Patients are more health-literate than ever.** Post-COVID, patients Google symptoms, track vitals, and want to be active participants in their care. But the tools they have (notes apps, symptom trackers with checkboxes) don't produce output that's useful in a clinical conversation.
- **Value-based care incentivizes better data.** As healthcare shifts from fee-for-service to outcomes-based reimbursement, providers need richer patient-reported outcome measures (PROMs). Pulse generates PROMs passively.
- **Digital health investment is surging.** The sector grew 3x from 2017-2020 and is projected to grow at 9% annually through 2029. (McKinsey)

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

Missed escalation patterns lead to delayed diagnoses. Stroke prodrome presents as escalating headaches with visual disturbances — exactly what our demo dataset shows. Stroke is missed in **17.5%** of cases. The difference between "patient reports headaches" and "patient reports escalating headaches with new visual disturbances, self-rated as worst-ever twice this week" can be the difference between a timely diagnosis and a catastrophic one.

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
- **Revenue paths:** Freemium consumer app → premium features (AI summaries, advanced pattern detection, family accounts) → B2B insurer/clinic licensing → data insights (anonymized, compliant).
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
- **Clinical validation.** Does Pulse actually improve visit quality? Diagnosis accuracy? Patient satisfaction? This requires a clinical study. The hackathon MVP can't prove this — but it can demonstrate the *plausibility* of the mechanism, and the research base strongly supports it.
- **Privacy and trust.** Health data is sensitive. Patients need to trust that their symptom descriptions aren't being sold or leaked. End-to-end encryption, transparent data policies, and HIPAA compliance (for the US market) are table stakes, not differentiators.
- **Regulatory pathway.** If Pulse ever claims to detect or diagnose conditions, it enters FDA SaMD (Software as a Medical Device) territory. The MVP carefully avoids this — it's a logging tool, not a diagnostic. But the pattern detection features we want to build will push toward this boundary.

---

## Is This Investible?

### The pitch in 30 seconds:

12 million Americans are misdiagnosed every year. 795,000 suffer death or permanent disability. The #1 cause? Poor symptom data — 56% of diagnostic errors trace back to inadequate history-gathering. Pulse captures symptoms in the moment — voice, severity, anchored comparison — and generates a readable summary that transforms the doctor visit. Zero infrastructure cost, viral distribution through the share link, and a data moat that deepens with every capture. Insurers already subsidize less impactful tools. The ROI is 80-250x per prevented hospitalization.

### The market:

| Segment | Size | Why they care |
|---------|------|--------------|
| Chronic condition patients | 133M Americans (6 in 10 adults) | Need ongoing symptom tracking. Current tools are checkbox forms. |
| Migraine sufferers | 39M Americans | Average 10.7 years to diagnosis. Symptom diaries are already standard of care. |
| Autoimmune patients | 24M Americans | Average 4.5 years, 4+ doctors to diagnosis. Pattern data is critical. |
| Oncology follow-up | 18M cancer survivors | Relapse detection relies on patient self-report between scans. |
| Mental health | 57M Americans | Mood + symptom tracking shown to improve therapeutic outcomes. |
| Insurance companies | $1.3T market | Already paying for Fitbits. Structured PROMs are more valuable. |

### Why this team, right now:

Built in a weekend at MIT GrandHacks. Functional MVP with voice capture, analytics timeline, narrative summary, and a clinically coherent demo story. The speed of execution demonstrates that the core product is simple — which means it's defensible through user adoption and data, not through technical complexity.

### The ask:

Validate the core thesis: does a Pulse summary change the doctor visit? Run a small clinical pilot — 50 patients, 4 weeks, compare visit outcomes with and without Pulse. If the answer is yes, everything else follows.

---

## Key Sources

| Finding | Source |
|---------|--------|
| 12M diagnostic errors/year in US outpatient care | Singh et al., *BMJ Quality & Safety*, 2014 |
| 795,000 deaths + permanent disabilities from diagnostic error | Newman-Toker et al., *BMJ Quality & Safety*, 2023 |
| 11.1% average diagnostic error rate | Newman-Toker et al., Johns Hopkins, 2023 |
| 56.3% of diagnostic errors from data-gathering failures | Singh et al., *JAMA Internal Medicine*, 2013 |
| 25% improvement in diagnostic accuracy from structured data | Singh et al., *JAMA Internal Medicine*, 2013 |
| 68% of PROM studies show improved outcomes | *Health and Quality of Life Outcomes*, 2024 |
| 2.3x faster diagnosis with symptom logs | *SyncSymptom/Symptomizer*, 2024 |
| 49% of clinical decisions remembered accurately | *PLOS One*, 2018 |
| 10.7 years average migraine diagnostic delay | *Cephalalgia*, 2010 |
| 4.5 years average autoimmune diagnostic delay | AARDA |
| $100B+ direct cost of diagnostic errors | AHRQ; National Academies, 2015 |
| $32B/year in preventable ER visits | UnitedHealth Group, 2019 |
| 80-250x ROI per prevented hospitalization vs. app cost | Derived from AHRQ/CMS data |
| Insurers subsidize Fitbit, Apple Watch, digital health apps | UHC, Aetna, Cigna, Humana, BCBS |
| $136/member/month savings from prevention apps | RAND Corporation |

---

## The One-Liner

**Pulse: capture the moment, change the visit.**
