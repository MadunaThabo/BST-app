# COS212 App — Instructional Design Document

**Module:** COS750 Educational Software Development · **Deliverable:** 2b (ID document)
**Group:** _group name_ · **Members:** _names & student numbers_ · **Date:** _dd Nov 2026_ · **Version:** 0.1 (draft)

> **Status of this draft.** This is a proposed baseline. ⚠ marks places that need the group's decisions, evidence from usability testing, or citations to the exact lecture slides / textbook pages. Each section says which COS750 lecture it draws on so the panel can see the module being applied.

---

## 1. Purpose and context

The COS 212 lecturer has asked for an "app" that gives students a tutor-style, **pre-lecture** opportunity to meet a core data structure and algorithm. This document records the *instructional* design of our prototype, which teaches the **Binary Search Tree (BST)** and the **insertion** algorithm (with search as its companion). The software engineering design is documented separately in the SE document.

The instructional problem is specific: students will use the app *before* any lecture, so it must (a) assume no prior knowledge of BSTs, (b) build a correct mental model that the lecture can then deepen, and (c) tell the student—and only the student—whether they are ready, offering extra scaffolding if they are not (examination specification §2.1).

---

## 2. Instructional design approach

### 2.1 Overall lifecycle: ADDIE  *(L11 — Software and Instructional Design Lifecycles)*
We use **ADDIE** (Analyse, Design, Develop, Implement, Evaluate) as the overarching ID lifecycle. Rationale: it is the reference model against which the other ID models in L11 are explained; its phases map cleanly onto our SE sprints (Analyse/Design ↔ Sprint 0, Develop ↔ Sprint 1, Implement/Evaluate ↔ Sprint 2 and usability test); and its explicit *Evaluate* phase forces us to test with real learners rather than assume. ⚠ If the group prefers Dick & Carey or the Kemp model, §2–§10 still apply; only the phase headings change.

| ADDIE phase | What we did / will do | Where documented |
|---|---|---|
| **Analyse** | Learner analysis, task analysis of "insert into a BST", gap analysis against CS2023 outcomes | §3, §4 |
| **Design** | Learning objectives (Bloom's), sequencing (Gagné), motivation design (ARCS / Malone & Lepper), assessment and scaffolding design | §4–§9 |
| **Develop** | Content, visualisation, item bank, remedial activities; GenAI-assisted drafting | §7, §11 |
| **Implement** | Delivered as a client-side web app; pilot with 2–3 first-year students | SE doc; §10 |
| **Evaluate** | Formative: think-aloud pilot, item analysis. Summative (proposed): pre/post quiz in the real COS 212 cohort | §10 |

### 2.2 Lesson-level sequencing: Gagné's Nine Events of Instruction  *(L11)*
Within the app, every learning unit follows Gagné's events. The mapping below is the backbone of the app's navigation (see SE doc §5.2):

| Gagné event | App realisation |
|---|---|
| 1 Gain attention | Welcome screen: "Find a name in a 1 000-page phone book in 10 page-turns?" + a 10-second animation of a search that halves the tree each step |
| 2 Inform objectives | "In 20 minutes you will be able to…" (objectives O1–O5 in student language) |
| 3 Stimulate recall | One-screen recap of comparisons and references/nodes from COS 110/132 |
| 4 Present content | Learn pages: definition → ordering rule → terminology, each with a diagram |
| 5 Provide guidance | Watch: animated insertion with narration of *each* comparison (worked example) |
| 6 Elicit performance | Try: "predict the path" — student chooses left/right before each step |
| 7 Provide feedback | Immediate, specific feedback on every prediction and every quiz item |
| 8 Assess performance | Tiered quiz (Tier 1–3) with mastery thresholds |
| 9 Enhance retention & transfer | "Why order matters" demo (sorted input → degenerate tree); pointer to what the lecture will add (deletion, balancing) |

---

## 3. Learner analysis  *(L01, L04, L12)*

| Dimension | Finding | Design consequence |
|---|---|---|
| Prior knowledge | Completed first-year programming; know comparisons, loops, basic references; have **not** met trees | Recap screen (Gagné 3); no assumption of recursion fluency — insertion is narrated iteratively first |
| Cognitive load | New vocabulary (root, leaf, subtree) + new rule + new algorithm at once | Chunk into three Learn pages; introduce ≤ 3 new terms per page (cognitivism, §5) |
| Motivation | Mixed; pre-lecture work is often skipped | Short (≤ 20 min), visible progress, "ready for lecture" badge (§6) |
| Learning styles | Heterogeneous — see §8 | Every concept offered visually (tree), verbally (narration/text) and kinaesthetically (build/predict) |
| Access | Phones and laptops, intermittent data | Offline-capable, no login (SE NFR2) |
| Special needs | Some students use screen readers or have colour-vision deficiency *(L12)* | Keyboard operability, ARIA labels, shape + colour cues, adjustable animation speed |

---

## 4. Learning objectives  *(L07 — Bloom's revised taxonomy)*

After completing the app, a COS 212 student will be able to:

| ID | Objective | Bloom's level | Assessed by |
|---|---|---|---|
| O1 | **State** the BST ordering property (left < node < right) and **define** root, child, leaf, subtree, height | Remember | Tier 1 |
| O2 | Given a tree, **classify** it as a valid or invalid BST and **explain** which rule is broken | Understand | Tier 1 |
| O3 | **Trace** the insertion (and search) of a value into a given BST, naming the comparison made at each node | Apply | Try exercise; Tier 2 |
| O4 | **Construct** the BST that results from inserting a given sequence of values | Apply | Tier 2 |
| O5 | **Explain** why the insertion order affects the tree's shape and the cost of search, giving the best and worst case in words | Analyse | Tier 3 |

These are derived from CS2023 AL-Foundational learning outcomes 1(a), 1(b) and 2 (explain definition/properties; explain step-by-step how operations transform the structure; explain step-by-step how the algorithm operates). The lecture is expected to take students on to deletion, balancing and formal complexity, which we intentionally leave out (O5 only prepares the ground).

---

## 5. Learning theories applied  *(L01 — Learning Theories; Schunk, *Learning Theories: An Educational Perspective*)*

We do not adopt a single theory; each theory justifies specific features. ⚠ Add page/slide citations.

| Theory | Principle used | Feature in the app |
|---|---|---|
| **Behaviourism** (Skinner — reinforcement, immediate feedback, shaping) | Correct responses reinforced immediately; small steps | Every prediction and quiz item gives instant feedback; tiers "shape" from recall → apply → analyse |
| **Cognitivism** (information processing; cognitive load theory — Sweller; worked-example effect) | Limit intrinsic + extraneous load; worked examples before problem solving; dual coding | Chunked Learn pages; narrated animation *is* a worked example that precedes the Try exercise; diagram + text together |
| **Constructivism** (Piaget/Bruner — learners build models through active exploration; discovery with guidance) | Predict-then-verify creates cognitive conflict when a prediction is wrong | Try exercise asks for a prediction *before* revealing the step; sandbox lets students build their own trees |
| **Social cognitive theory** (Bandura — modelling, self-efficacy) | Observing a competent model; mastery experiences raise self-efficacy | Animated "tutor" models the procedure aloud; mastery badges per tier; failure is framed as "not yet" with a route forward |
| **Scaffolding / ZPD** (Vygotsky) | Support within the zone of proximal development, then faded | Guided predict (hints on) → unguided predict (hints off) → quiz; remedial loop re-adds support only where needed |

---

## 6. Motivation design  *(L05 — Motivation; Malone & Lepper's taxonomy; Keller's ARCS)*

### 6.1 Keller's ARCS
| ARCS | Strategy | Feature |
|---|---|---|
| **Attention** | Perceptual arousal; inquiry | Phone-book hook; "can you beat the tutor?" prediction challenge |
| **Relevance** | Goal orientation; familiarity | "This is on your next lecture and test"; examples use student numbers / marks as the values |
| **Confidence** | Clear objectives; success opportunities; learner control | Objectives up-front; tiers unlock progressively; student controls speed and can replay |
| **Satisfaction** | Natural consequences; positive feedback | Tree visibly grows from the student's own input; "Ready for the lecture" badge |

### 6.2 Malone & Lepper intrinsic motivations
- **Challenge** — tiers with adjustable difficulty; uncertain outcome in predict-the-path.
- **Curiosity** — sensory (animation) and cognitive ("what happens if I insert 1, 2, 3, 4, 5?" → degenerate tree surprise).
- **Control** — sandbox tree building; choose speed; choose to retry.
- **Fantasy** — light: the tree as a "sorting machine"; ⚠ group may add a theme if time allows (kept deliberately minimal to avoid extraneous load).
- Interpersonal (co-operation/competition/recognition) — not in the prototype; a future version could show anonymised cohort progress.

---

## 7. Content design and sequencing

Content is authored by the content developer following a **task analysis** of BST insertion:

1. Compare value with current node.
2. If smaller → go left; if larger → go right (equal: ⚠ group decision — we recommend "reject duplicates" and say so explicitly).
3. If that child is empty → place the new node there; else repeat from 1 at the child.

Each step becomes (a) a sentence in the narration, (b) a highlight in the animation, (c) a decision point in the Try exercise, and (d) a quiz item type. This one-to-one mapping is how we keep the content, visualisation and assessment aligned (constructive alignment, *L07*).

Worked examples: three, in increasing complexity (3 nodes, 5 nodes, 7 nodes with a duplicate attempt). Values are two-digit integers to keep comparisons fast.

Content units (≈ 18–22 minutes total):
| # | Unit | Minutes | Gagné |
|---|---|---|---|
| 0 | Welcome, objectives, recap | 2 | 1–3 |
| 1 | What is a BST? (shape, terms) | 3 | 4 |
| 2 | The ordering rule, valid vs invalid trees | 3 | 4 |
| 3 | Watch: insertion (3 worked examples) + search | 4 | 5 |
| 4 | Try: predict the path (guided, then unguided) | 4 | 6–7 |
| 5 | Quiz tiers 1–3 (with remediation loops as needed) | 5+ | 8 |
| 6 | Why order matters; what the lecture adds | 2 | 9 |

---

## 8. Learning styles catered for  *(L04 — Learning Styles; VAK; Honey & Mumford)*

We treat learning-styles as *preferences for representation* rather than fixed traits (⚠ note the research caveat from L04 — the "meshing hypothesis" lacks strong evidence; we therefore give **every** learner **every** modality rather than classifying them):

| Style | Provision |
|---|---|
| Visual | Live tree diagram; colour + shape highlighting of the path; progress bars |
| Auditory / verbal | Narration text for every step (⚠ optional speech via Web Speech API if time allows); explanations written as if spoken by a tutor |
| Read/write | Learn pages; downloadable one-page summary |
| Kinaesthetic | Build-your-own tree; click left/right predictions; drag speed slider |
| Honey & Mumford — Activist / Reflector / Theorist / Pragmatist | Try exercise (activist); replay & step control (reflector); rule statement + invalid-tree analysis (theorist); "where is this used" note — dictionaries, autocomplete, database indexes (pragmatist) |

---

## 9. Assessment and scaffolding design  *(L07 — Assessment & Evaluation)*

### 9.1 Principles
- **Formative, low-stakes, self-referenced.** The score is for the student; nothing is transmitted.
- **Aligned to objectives and Bloom's levels** (constructive alignment): each tier targets one level band; items are tagged.
- **Immediate, informative feedback**: every item has an explanation that re-teaches the rule, not just "wrong".
- **Mastery-based progression**: 80% threshold per tier (4/5). Rationale: high enough to signal readiness, low enough that one slip does not block.

### 9.2 Tiers
| Tier | Bloom's | Item types (examples) | Objectives | Remediation if < 80% |
|---|---|---|---|---|
| 1 | Remember / Understand | "Left subtree values are…"; "Which of these trees is NOT a BST?" | O1, O2 | Re-show Learn page 2 with three annotated invalid trees; retry with fresh items |
| 2 | Apply | "Insert 45 into this tree: which node becomes its parent?"; "Insert 50, 30, 70, 20 — pick the resulting tree" | O3, O4 | Guided predict-the-path (hints on) for two trees; retry |
| 3 | Analyse | "Which insertion order gives the tallest tree?"; "Searching 10 in this tree takes how many comparisons?" | O5 | "Why order matters" demo: insert 1..7 vs 4,2,6,1,3,5,7; retry |

Item bank: ≥ 10 items per tier so a retry draws 5 unseen items (⚠ content developer).

### 9.3 Scaffolding mechanism
The app implements **contingent scaffolding** — support is added only on evidence of difficulty and withdrawn on success:
1. Below threshold → the student is told *which objective* they missed ("You're not yet sure where smaller values go") and is routed to the remedial activity for that tier.
2. Remedial activities re-present the concept in a *different modality* than the first exposure (text → animation → hands-on), consistent with §8.
3. Retry uses new items. Passing unlocks the next tier. The "Ready for the lecture" badge requires all three tiers.
4. Students who pass first time see no remediation — fading by default.

### 9.4 Evaluation of the app itself (formative)
See §10.

---

## 10. Evaluation plan  *(L07; ADDIE — Evaluate)*
⚠ Fill in after the pilot (Thu 12 Nov).

| Method | Participants | Measures | Status |
|---|---|---|---|
| Think-aloud pilot | 2–3 students who have not done BSTs | Confusions, time per unit, where they get stuck | planned |
| Item analysis | Pilot quiz logs | Items with < 30% or > 95% correct flagged for rewrite | planned |
| Expert review | Group members cross-check against objectives | Alignment table complete | planned |
| Proposed summative (beyond prototype) | Real COS 212 cohort | Pre/post 5-item test; lecture-time questions asked | proposal only |

Findings and changes made: ⚠ _to be completed_.

---

## 11. Generative AI acknowledgement  *(required by the examination specification)*

We used generative AI as follows. Every entry lists the tool, the date, the person, the prompt (verbatim), and what was done with the output. ⚠ Keep this table current — add a row the same day you use a tool.

| Date | Member | Tool | Purpose | Prompt (verbatim) | How the output was used / edited |
|---|---|---|---|---|---|
| 7 Nov 2026 | _Thabo_ | Claude (Anthropic) | Drafting the skeleton of this ID document, the SE document and a first-cut prototype | "please read the spec in exam folder and summarise what is needed for this task" … "we will do the Binary Search Tree + Insertion, and do a draft of everything" | Used as a starting structure; all sections reviewed and rewritten by the group; ⚠ list specific edits |
| | | | | | |

All quiz items and explanations in the final item bank were ⚠ (written by / generated and then verified by) the content developer against the COS 212 textbook. No student data is sent to any AI service by the app.

---

## 12. Reflection on instructional choices
⚠ Written last, by the ID author with input from all members. Prompts:
- Which theory did the most work in practice, and which turned out to be decorative?
- Did the 80% threshold behave well in the pilot? Any student stuck in a loop?
- What did the pilot students misunderstand that we had not predicted?
- What would a second iteration change (e.g., adding deletion, speech, cohort features)?
- How did the ID lifecycle interact with the SE sprints — where did they pull against each other?

---

## References
⚠ Convert to the department's required style; add page numbers.
- Kumar, A. N. et al. (2024). *Computer Science Curricula 2023*. ACM. (AL-Foundational, pp. 88–89.)
- Schunk, D. H. *Learning Theories: An Educational Perspective* (edition ⚠).
- Anderson, L. W. & Krathwohl, D. R. (2001). *A Taxonomy for Learning, Teaching, and Assessing* (Bloom's revised). (L07 handout.)
- Gagné, R. M., Briggs, L. J. & Wager, W. W. *Principles of Instructional Design*.
- Keller, J. M. (1987). Development and use of the ARCS model of instructional design. *Journal of Instructional Development*, 10(3).
- Malone, T. W. & Lepper, M. R. (1987). Making learning fun: A taxonomy of intrinsic motivations for learning. (L05 reading.)
- Sweller, J. (1988). Cognitive load during problem solving. *Cognitive Science*, 12.
- Vygotsky, L. S. (1978). *Mind in Society*.
- Fleming, N. D. VARK; Honey, P. & Mumford, A. Learning Styles Questionnaire. (L04 readings.)
- COS750 lecture notes L01, L04, L05, L06, L07, L11, L12 (University of Pretoria, 2026).
