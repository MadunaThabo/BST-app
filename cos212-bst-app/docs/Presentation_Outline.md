# Presentation & Demonstration — Outline and Script

**Slot:** 30 min → 10 min presentation · 10 min demo · 5 min Q&A · 5 min setup/vacate
**Upload slides to ClickUP before the slot. Have the GitHub link on the final slide and in the chat/email.**

## Slides (10 minutes — aim for 9, leave slack)

| # | Slide | Speaker | Time | Content |
|---|---|---|---|---|
| 1 | Title | Lead | 0:15 | Group name, members, "COS212 App: a pre-lecture BST tutor", GitHub link |
| 2 | The brief | Lead | 0:45 | Lecturer's request; CS2023 constraint; our choice: BST + insertion/search and why (visual, buildable, natural Bloom gradient) |
| 3 | Who is the learner? | ID author | 0:45 | No prior BST knowledge, phone + laptop, 20-minute window, mixed motivation |
| 4 | Learning objectives | ID author | 0:45 | O1–O5 with Bloom's levels (one line each) |
| 5 | ID approach | ID author | 1:15 | ADDIE lifecycle + Gagné's nine events mapped onto the app's screens (one diagram) |
| 6 | Learning theories → features | ID author | 1:15 | Four-row table: behaviourism / cognitivism / constructivism / social-cognitive → concrete feature |
| 7 | Motivation & learning styles | Content dev | 1:00 | ARCS in one line each; every concept in 3 modalities; accessibility choices |
| 8 | Assessment & scaffolding | Dev-assessment | 1:15 | Three tiers, 80% mastery, remediation loop diagram (the state machine) |
| 9 | SE approach & architecture | Lead | 1:15 | Iterative sprints; client-only MVC; trace-based design (one model → animation + exercise); testing |
| 10 | Evaluation & what we learned | Lead / ID | 0:45 | Pilot findings (⚠ fill in), what a v2 would add |
| 11 | Demo hand-off | Dev-vis | 0:15 | "Let's show you" |

Design rules for the deck: ≤ 25 words per slide, one diagram per slide where possible, the state machine and the theory→feature table are the two slides the panel will remember.

## Demo script (10 minutes) — driven by the visualisation dev, narrated by the assessment dev

| Min | Action | What to say |
|---|---|---|
| 0:00 | Open `index.html` from local disk (no network) | "Runs offline, nothing to install — a student opens it on the bus." |
| 0:30 | Welcome → objectives → recap | "Gagné events 1–3: attention hook, objectives in student language, recall of comparisons." |
| 1:30 | Learn page 2 (ordering rule), show one invalid tree | "Chunked to ≤ 3 new terms a page — cognitive load." |
| 2:30 | Watch: insert 50, 30, 70, 20, 40 at normal speed; then Step through inserting 60 | "Worked example. Every comparison is narrated; the same trace drives the next exercise." |
| 4:30 | Try: predict the path for 65; deliberately choose *wrong* once | "Constructivist predict-then-verify; immediate corrective feedback." |
| 6:00 | Quiz Tier 1; deliberately score 3/5 | "Below mastery → contingent scaffolding: it tells me *which objective* I missed and re-teaches in a different modality." |
| 7:30 | Retry Tier 1 (new items), pass; show Tier 2 unlocked; show progress panel | "Fresh items on retry; progress persists if I refresh." *(refresh the page)* |
| 8:30 | Insert 1,2,3,4,5 in sandbox → degenerate tree | "Tier 3 hook: why order matters — sets up the lecture's balancing discussion." |
| 9:30 | Show GitHub repo + README | "Public, readable code — part of the educational mission." |

**Backups:** app on two laptops + USB; a 3-minute screen recording of the demo in case of hardware failure.

## Q&A preparation (5 minutes) — likely questions
- Why no backend / no lecturer dashboard? → Not required by the brief; avoids POPIA and demo risk; v2 could add anonymised cohort analytics.
- Why 80%? → 4/5; one slip allowed; threshold configurable; pilot evidence ⚠.
- Why not include deletion? → Pre-lecture scope; O5 deliberately hands over to the lecture.
- How do you know it works? → Pilot think-aloud (⚠ results); item analysis; alignment table.
- Learning styles are contested — why cater for them? → We offer all modalities to everyone, not classification (say this proactively on slide 7).
- Where did GenAI help and how did you verify it? → ID doc §11 table; every quiz item checked against the textbook.
- What was hardest in the team? → Honest, specific answer; everyone should have one ready (feeds self-reflection).

## Rehearsal checklist
- [ ] Rehearsal 1 — Sat 14 Nov, timed; cut anything over 9 + 9 minutes
- [ ] Rehearsal 2 — Sun 15 Nov, with someone playing a hostile panel
- [ ] Slides uploaded to ClickUP
- [ ] GitHub link tested in an incognito window
- [ ] All 5 members present; each knows which question they take
