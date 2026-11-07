# COS212 App — Software Engineering Document

**Module:** COS750 Educational Software Development · **Deliverable:** 2a (SE document)
**Group:** _group name_ · **Members:** _names & student numbers_ · **Date:** _dd Nov 2026_ · **Version:** 0.1 (draft)

> **Status of this draft.** Sections marked ⚠ need group input (names, decisions, screenshots, final diagrams). Everything else is a proposed baseline the project lead can edit.

---

## 1. Introduction

### 1.1 Purpose
This document describes the software engineering approach, requirements, architecture, design, implementation and testing of the *COS212 app*: a pre-lecture tutor that teaches first-year COS 212 students the **Binary Search Tree (BST)** data structure and the **insertion** algorithm (with search as the companion operation), before the topic is covered in a lecture.

The companion *Instructional Design (ID) document* covers the educational rationale (objectives, theories, motivation, assessment). This document covers *how the software was engineered*; the two are deliberately separated as the examination specification requires.

### 1.2 Scope
In scope: a browser-based prototype with (i) concept pages, (ii) an animated, step-controlled visualisation of BST insertion and search, (iii) an interactive "predict the path" exercise, (iv) a tiered self-assessment that triggers scaffolding content when a student is not yet confident, and (v) local progress tracking.

Out of scope (prototype): user accounts, server-side storage, lecturer dashboards, deletion and balancing operations, mobile-native packaging.

### 1.3 Stakeholders
| Stakeholder | Interest |
|---|---|
| COS 212 lecturer (client) | Students arrive at the BST lecture with a working mental model; weak students are identified to themselves early |
| COS 212 students (end users) | Low-friction, self-paced preparation that works on their own devices |
| COS750 examination panel & peer groups | Sound SE and ID practice, working demo |
| Development team (5) | Deliverable in ~9 days with limited risk |

### 1.4 Definitions
BST — binary search tree · SPA — single-page application · DOM — document object model · ADT — abstract data type · CS2023 — ACM/IEEE Computer Science Curricula 2023.

---

## 2. Software engineering approach

### 2.1 Chosen process: iterative and incremental (lightweight Scrum)
We use an **iterative-incremental** process organised as three short sprints (Sprint 0: 2 days, Sprint 1: 3 days, Sprint 2: 2 days, followed by a freeze/rehearsal phase). Rationale:

- **Fixed deadline, small team, evolving understanding.** The educational content and the software are being designed concurrently; a plan-driven (waterfall) approach would force content decisions before the ID work has matured.
- **Always-demo-able increments.** The examination is a live demo; every sprint ends with a runnable `main` branch, so the risk of "nothing to show" is retired early.
- **Alignment with the ID lifecycle.** ADDIE (chosen in the ID document) is itself iterative: its *Develop → Implement → Evaluate* loop maps onto our sprints (see §2.3).

Scrum elements kept: product backlog (GitHub Issues), sprint goal, daily 10-minute stand-up (WhatsApp voice note or call), sprint review (demo to the group), retrospective (one line each, feeds the self-reflection reports). Elements dropped: formal story points, burndown charts, Scrum Master role (the project lead facilitates).

### 2.2 Roles
⚠ Fill in names.

| Role | Member | Responsibilities |
|---|---|---|
| Project lead / SE author | | Backlog, repo, this document, submissions, presentation |
| Instructional designer / ID author | | ID document, objectives, acts as *product owner* for educational requirements |
| Content developer | | Lesson text, examples, quiz item bank, remedial content |
| Developer — visualisation | | Tree model, SVG rendering, animation engine |
| Developer — assessment & integration | | Quiz engine, scaffolding logic, routing, persistence, QA |

### 2.3 Sprint plan
| Sprint | Dates | Goal | Done when |
|---|---|---|---|
| 0 | 7–8 Nov | Decisions locked; skeleton app; requirements & objectives drafted | Skeleton renders a static tree; this doc §3 approved by group |
| 1 | 9–11 Nov | Working visualisation and working quiz, independently; content v1 | Insert animation complete; quiz scores and branches; docs at first draft |
| 2 | 12–13 Nov | Integration, scaffolding loop end-to-end, testing on 5 devices | All FRs in §3.2 pass acceptance tests in §7 |
| Freeze | 14–15 Nov | Bug fixes only; slides; rehearsals; docs finalised | Submitted Sunday 15 Nov evening |

### 2.4 Tooling
GitHub (repo, Issues, PR review), GitHub Pages (hosting), VS Code, browser dev-tools, plain HTML/CSS/JavaScript (ES2020), SVG for rendering. ⚠ Add the repository URL here: `https://github.com/…`

---

## 3. Requirements

### 3.1 User characteristics and constraints
- First-year CS students; comfortable with a programming language, comparisons and basic references/pointers; **no prior BST knowledge** (requirement from the examination specification).
- Devices: laptops and Android/iOS phones; variable connectivity → app must work offline after first load and have no server dependency.
- Usage window: 15–30 minutes, once or twice before the lecture.

### 3.2 Functional requirements
| ID | Requirement | Priority | Source |
|---|---|---|---|
| FR1 | Present the BST concept in short pages (definition, the ordering property, terminology: root, child, leaf, subtree) | Must | ID objectives O1–O2 |
| FR2 | Animate insertion of a value into a BST, highlighting the comparison at each node and the final placement, with *Step / Play / Reset* controls | Must | O3 |
| FR3 | Animate search for a value, showing the comparison path and found/not-found outcome | Must | O3 |
| FR4 | Let the student build a tree by typing values (and by a "random tree" button) | Must | O3 |
| FR5 | "Predict the path" exercise: before each step the student chooses *left* or *right*; the app confirms or corrects with a one-line explanation | Must | O3–O4, scaffolding |
| FR6 | Tiered quiz (Tier 1 Remember/Understand, Tier 2 Apply, Tier 3 Analyse) with immediate feedback per item | Must | O1–O5 |
| FR7 | **Scaffolding rule:** if the student scores below the mastery threshold for a tier, the app routes them to the matching remedial activity and re-offers that tier before unlocking the next | Must | Exam spec §2.1 |
| FR8 | Persist progress (tiers unlocked, best scores, trees built) locally so a refresh or a second visit continues where the student left off | Should | Usability |
| FR9 | Show a progress panel (tiers unlocked, mastery status, a "ready for the lecture" indicator) | Should | ARCS—Confidence |
| FR10 | Provide a short "why does order matter?" demonstration (insert sorted input → degenerate tree) | Could | O5 |
| FR11 | Keyboard operability and screen-reader labels for all controls | Should | L12 accessibility |

### 3.3 Non-functional requirements
| ID | Requirement | Measure |
|---|---|---|
| NFR1 | Runs in current Chrome, Edge, Firefox, Safari on desktop and mobile | Manual test matrix §7 |
| NFR2 | Works offline / from `file://` — no network calls, no build step | Open from USB stick in demo |
| NFR3 | Page load < 1 s on a mid-range phone | Single file < 150 kB |
| NFR4 | Animation step interval adjustable (0.3–2 s) | Slider |
| NFR5 | Colour-independent cues (shape/label as well as colour) and WCAG AA contrast | Checked with a contrast tool |
| NFR6 | Code readable by a first-year student (part of the educational mission: the repo is public) | Modules < 300 lines, commented |

---

## 4. Architecture

### 4.1 Architectural style
**Client-only single-page application** organised as **Model–View–Controller**, in one HTML file for the prototype (split into modules in the repo if time allows).

Justification: the app has no identity, no shared state and no multi-user features; a backend would add deployment and demo risk without serving any requirement. Locality of the data (localStorage) also avoids any POPIA considerations for student data.

### 4.2 Component view
```
┌───────────────────────────────────────────────────────────┐
│  View layer (DOM / SVG)                                   │
│  ┌──────────┐ ┌──────────────┐ ┌───────────┐ ┌──────────┐ │
│  │ Learn    │ │ Visualiser   │ │ Quiz      │ │ Progress │ │
│  │ pages    │ │ (SVG canvas) │ │ view      │ │ panel    │ │
│  └────┬─────┘ └──────┬───────┘ └─────┬─────┘ └────┬─────┘ │
├───────┴──────────────┴───────────────┴─────────────┴───────┤
│  Controller layer                                         │
│  Router · AnimationController · QuizController ·          │
│  ScaffoldingPolicy                                        │
├───────────────────────────────────────────────────────────┤
│  Model layer                                              │
│  BST (insert/search producing step traces) · ItemBank ·   │
│  ProgressStore (localStorage)                             │
└───────────────────────────────────────────────────────────┘
```

Key design idea: **BST operations return a *trace*** (an array of steps such as `compare(node, value, goLeft)` and `place(parent, side)`) instead of mutating and drawing at once. The AnimationController replays a trace at a chosen speed; the Predict-the-path exercise consumes the *same* trace, pausing before each `compare` to ask the student. One model, two pedagogical uses.

### 4.3 Deployment view
Static files served by GitHub Pages (or opened locally). No runtime dependencies.

---

## 5. Detailed design

### 5.1 Class diagram (textual UML — ⚠ replace with a drawn diagram, e.g. PlantUML or draw.io)
```
class Node { value:int; left:Node; right:Node }
class BST {
  root:Node
  insert(value):Step[]        // trace, mutates tree
  search(value):Step[]        // trace, no mutation
  toLayout():NodePos[]        // x,y per node for SVG
  static fromValues(int[]):BST
}
class Step { kind:'compare'|'place'|'found'|'notfound'; nodeId; value; direction:'L'|'R' }
class AnimationController { load(trace); play(); pause(); step(); reset(); speed }
class ItemBank { tiers: Tier[] }        // loaded from JSON embedded in page
class Tier { id; name; bloomLevel; threshold; items: Item[]; remedial: Activity }
class Item { stem; options[]; answerIndex; explanation; bloomLevel }
class QuizController { start(tier); answer(i); score(); }
class ScaffoldingPolicy { next(progress, tierResult) → 'advance'|'remediate' }
class ProgressStore { load(); save(); unlocked[]; best{}; trees[] }
```

### 5.2 Lesson-flow state machine
```
[Welcome] → [Learn 1: what is a BST] → [Learn 2: the ordering rule]
   → [Watch: insertion animation] → [Try: predict the path]
   → [Quiz T1] ─pass→ [Quiz T2] ─pass→ [Quiz T3] ─pass→ [Ready for lecture]
        │fail              │fail              │fail
        ▼                  ▼                  ▼
   [Remedial: Learn 2   [Remedial: guided   [Remedial: "why order
    + 3 worked examples] predict-the-path]   matters" demo + 2 items]
        └──────── retry ───┘ (same tier, new items from bank)
```
Mastery threshold: 80% per tier (configurable). A tier can be retried any number of times; items are drawn randomly from a bank ≥ 2× the quiz length so retries are not memorised.

### 5.3 Visualisation algorithm
Node positions use an in-order index for *x* (guarantees no horizontal overlap) and depth for *y*. Edges are SVG lines; nodes are circles with text. A highlight class is toggled per trace step. Transition timing uses CSS transitions so the JS stays simple.

### 5.4 Data design
- Item bank: embedded JSON array (see Appendix A for the schema and sample items; the full bank is authored by the content developer in `docs/`-adjacent JSON and pasted in).
- Progress record: `{version, unlocked:[1], best:{1:0.8}, lastTree:[50,30,70], visits:n}` in `localStorage['cos212bst']`.

---

## 6. Implementation

⚠ Update at freeze.

- Language/stack: HTML5, CSS3, JavaScript (ES2020), SVG. No frameworks (reduces cognitive load for a public educational repo and removes the build step).
- Coding conventions: `camelCase`, one responsibility per function, JSDoc comment on every exported function, no global mutable state outside `ProgressStore`.
- Branching: `main` (always demo-able) ← feature branches via PR; one reviewer per PR.
- GenAI use in code (if any) is logged in ID document §11 and acknowledged in the repo README.

---

## 7. Testing and quality assurance

### 7.1 Strategy
| Level | What | How |
|---|---|---|
| Unit | `BST.insert/search` traces, layout, `ScaffoldingPolicy` | Small in-page test harness (`?test=1`) asserting traces for known inputs, e.g. inserting [50,30,70,20] yields the expected compare/place sequence |
| Integration | Trace → animation → predict exercise | Manual script: insert 5 values, step through, verify highlights |
| Acceptance | One test per FR in §3.2 | Checklist executed on Thu 12 Nov by a member who did **not** build the feature |
| Usability | 2–3 students who have not done BSTs yet (⚠ recruit from a first-year group) | Think-aloud, 15 min, note confusions; feeds ID document §10 |
| Compatibility | NFR1 matrix | Each member tests on their own phone + laptop |
| Accessibility | NFR5, FR11 | Keyboard-only run-through; contrast checker |

### 7.2 Acceptance test examples
| FR | Test | Expected |
|---|---|---|
| FR2 | Insert 40 into [50,30,70] | Highlights 50 (go left), 30 (go right), places 40 as right child of 30 |
| FR7 | Score 2/5 on Tier 1 | Remedial "ordering rule" page shown; Tier 2 stays locked; retry offers different items |
| FR8 | Pass Tier 1, refresh page | Tier 2 remains unlocked |

---

## 8. Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Animation engine takes longer than planned | Med | High | Trace-based design lets the quiz be built in parallel; fallback is step-only (no auto-play) |
| Content arrives late | Med | High | Devs work with placeholder items from Appendix A; content dev delivers in two drops (Mon, Wed) |
| Demo machine/network failure | Low | High | App runs from `file://`; carry it on two laptops + a USB stick; screen-recorded backup of the demo |
| Scope creep (deletion, AVL…) | High | Med | Backlog "Could" items only after FR1–FR9 pass |
| Doc inconsistency between SE and ID | Med | Med | Cross-review Thu 12 Nov; shared glossary |

---

## 9. Traceability
| Objective (ID doc) | FR | Component | Test |
|---|---|---|---|
| O1 Define a BST and its ordering property | FR1, FR6-T1 | Learn pages, Quiz | T1 items |
| O2 Identify root/leaf/subtree | FR1 | Learn pages | T1 items |
| O3 Trace an insertion/search step by step | FR2–FR5 | Visualiser, Predict | FR2 test, T2 items |
| O4 Construct the tree for a given input sequence | FR4, FR5, FR6-T2 | Visualiser, Quiz | T2 items |
| O5 Explain why insertion order affects shape/performance | FR10, FR6-T3 | Demo page, Quiz | T3 items |

---

## Appendix A — Quiz item schema and samples
```json
{
  "tier": 1, "bloom": "Understand", "threshold": 0.8,
  "items": [
    {"stem": "In a BST, every value in the LEFT subtree of a node is…",
     "options": ["greater than the node", "less than the node", "equal to the node", "unordered"],
     "answer": 1,
     "explanation": "The BST rule: left subtree < node < right subtree."}
  ]
}
```

## Appendix B — Change log
| Version | Date | Change |
|---|---|---|
| 0.1 | 7 Nov 2026 | Initial draft (structure, approach, requirements, architecture) |
