# COS212 App — Binary Search Tree Tutor

Pre-lecture tutor app for COS 212 (Data Structures and Algorithms, University of Pretoria), built as the COS750 examination project.

| Item | Decision |
|---|---|
| Data structure | Binary Search Tree (CS2023 AL-Foundational §9a/9b — Trees: binary and search trees) |
| Algorithm | BST **Insertion**, with **Search** as the companion operation (CS2023 §11b/11c — O(log n) search; learning outcome 1b: "explain step-by-step how the ADT operations transform the data structure") |
| Target user | A COS 212 student who has **not yet attended** the BST lecture; knows basic Java/C++, comparison operators and what a node/reference is |
| Platform | Client-only single-page web app (HTML/CSS/JavaScript, no backend) — runs from a file or GitHub Pages |
| SE approach | Iterative & incremental (three short sprints) with lightweight UML — see `docs/SE_Document.md` |
| ID approach | ADDIE as the overall lifecycle, Gagné's Nine Events for lesson sequencing, ARCS + Malone & Lepper for motivation, Bloom's revised taxonomy for objectives and assessment — see `docs/ID_Document.md` |

## Folder layout

```
cos212-bst-app/
├── README.md                      ← this file
├── app/
│   └── index.html                 ← the prototype (single self-contained file)
└── docs/
    ├── SE_Document.md             ← Deliverable 2a (software engineering)
    ├── ID_Document.md             ← Deliverable 2b (instructional design)
    ├── Presentation_Outline.md    ← Deliverable 3 (slides + demo script)
    ├── SelfReflection_Template.md ← Deliverable 4 (individual, one per member)
    └── GroupRegistration.md       ← Deliverable 1 (fill in and upload)
```

## Running the prototype

Open `app/index.html` in any modern browser. No build step, no server, no dependencies.
To publish: push to GitHub → Settings → Pages → serve from `/app` (or copy `index.html` to the repo root).

## Team roles (group of 5)

| # | Role | Owner | Owns |
|---|---|---|---|
| 1 | Project lead · SE author · presentation | _name_ | SE doc, GitHub repo, ClickUP uploads, slides, demo script, rehearsals |
| 2 | Instructional designer · ID author | _name_ | ID doc, learning objectives, theory/styles/motivation justification, GenAI acknowledgement, "educational design" slides |
| 3 | Content developer | _name_ | Lesson text, worked examples, quiz items, remedial (scaffolding) content |
| 4 | Developer — visualisation | _name_ | Tree rendering, insertion/search animation, predict-the-path exercise |
| 5 | Developer — assessment, flow & QA | _name_ | Quiz engine, mastery/scaffolding logic, navigation, progress (localStorage), integration, bug triage |

## Deadlines

| When | What |
|---|---|
| ~~Fri 23 Oct, 20:00~~ | Group registration on ClickUP (done) |
| Sat 7 – Sun 8 Nov | Sprint 0: decisions locked (this README), repo + skeleton, objectives drafted, requirements drafted |
| Mon 9 – Wed 11 Nov | Sprint 1: content written; visualisation + quiz working separately; both docs at first draft |
| Thu 12 – Fri 13 Nov | Sprint 2: integration, testing on all five members' devices, cross-review of docs (SE author reviews ID doc and vice versa) |
| Sat 14 Nov | **Feature freeze.** Slides + demo script; rehearsal 1 (timed ≤ 10 + 10 min) |
| Sun 15 Nov | Rehearsal 2; docs finalised and **submitted Sunday evening** |
| **Mon 16 Nov, 08:00** | SE + ID documents due on ClickUP |
| Mon 16 / Tue 17 Nov | Presentation + demo (30-min slot; all members present; slides uploaded before the slot; repo link provided) |
| **Wed 18 Nov, 20:00** | Individual self-reflection reports due on ClickUP |

## Assessment weighting

SE + ID documentation 50% · Presentation + demo 20% · Self-reflection 30%.

## Working agreements

- Everyone keeps a short daily log (3 lines: did / blocked / learned) — it becomes your self-reflection report.
- `main` is always demo-able. Feature branches, PRs reviewed by one other member.
- Any GenAI use (content, code, images) is logged in `docs/ID_Document.md` §11 with the tool and the prompt, the same day.
