import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { QUIZ_LEN, THRESHOLD, TIERS } from "./data";

type View = "welcome" | "learn1" | "learn2" | "watch" | "try" | "quiz" | "why" | "progress";
type Side = "L" | "R";
type TraceStep =
  | { kind: "compare"; node: TreeNode; value: number; side: Side }
  | { kind: "place"; node: TreeNode; parent: TreeNode | null; side: Side | null }
  | { kind: "dup" | "found"; node: TreeNode; value: number }
  | { kind: "notfound"; value: number };

let nodeId = 1;

class TreeNode {
  value: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  id = nodeId++;

  constructor(value: number) {
    this.value = value;
  }
}

class BST {
  root: TreeNode | null = null;

  static from(values: number[]) {
    const tree = new BST();
    values.forEach((value) => tree.insert(value));
    return tree;
  }

  insert(value: number): TraceStep[] {
    if (!this.root) {
      this.root = new TreeNode(value);
      return [{ kind: "place", node: this.root, parent: null, side: null }];
    }

    const trace: TraceStep[] = [];
    let node = this.root;
    while (node) {
      if (node.value === value) return [...trace, { kind: "dup", node, value }];
      const side: Side = value < node.value ? "L" : "R";
      trace.push({ kind: "compare", node, value, side });
      const child = side === "L" ? node.left : node.right;
      if (!child) {
        const next = new TreeNode(value);
        if (side === "L") node.left = next;
        else node.right = next;
        return [...trace, { kind: "place", node: next, parent: node, side }];
      }
      node = child;
    }
    return trace;
  }

  search(value: number): TraceStep[] {
    const trace: TraceStep[] = [];
    let node = this.root;
    while (node) {
      if (value === node.value) return [...trace, { kind: "found", node, value }];
      const side: Side = value < node.value ? "L" : "R";
      trace.push({ kind: "compare", node, value, side });
      node = side === "L" ? node.left : node.right;
    }
    return [...trace, { kind: "notfound", value }];
  }

  height(node: TreeNode | null = this.root): number {
    return node ? 1 + Math.max(this.height(node.left), this.height(node.right)) : 0;
  }

  layout() {
    const positions: { node: TreeNode; order: number; depth: number }[] = [];
    let order = 0;
    const walk = (node: TreeNode | null, depth: number) => {
      if (!node) return;
      walk(node.left, depth + 1);
      positions.push({ node, order: order++, depth });
      walk(node.right, depth + 1);
    };
    walk(this.root, 0);
    return positions;
  }
}

type IconName =
  | "tree"
  | "book"
  | "eye"
  | "cursor"
  | "check"
  | "chart"
  | "arrow"
  | "chevron"
  | "play"
  | "step"
  | "search"
  | "refresh"
  | "trash"
  | "lock"
  | "spark";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    tree: (
      <>
        <path d="M12 22v-7" />
        <path d="M9 18h6" />
        <circle cx="12" cy="6" r="4" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="12" r="3" />
      </>
    ),
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M4 4v15.5" />
        <path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 0 4 19.5V4A2 2 0 0 1 6 2Z" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    cursor: (
      <>
        <path d="m5 3 14 9-6 2-3 6Z" />
        <path d="m13 14 4 4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chart: (
      <>
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-7" />
        <path d="M22 19H2" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m15 8 4 4-4 4" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    play: <path d="m8 5 11 7-11 7Z" />,
    step: (
      <>
        <path d="m6 5 9 7-9 7Z" />
        <path d="M18 5v14" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 7h-5V2" />
        <path d="M20 7a8 8 0 1 0 1 7" />
      </>
    ),
    trash: (
      <>
        <path d="M4 7h16" />
        <path d="m9 7 1-3h4l1 3" />
        <path d="m6 7 1 14h10l1-14" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5Z" />
        <path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7Z" />
      </>
    ),
  };
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const NAV: { id: View; label: string; short: string; icon: IconName }[] = [
  { id: "welcome", label: "Overview", short: "Start", icon: "book" },
  { id: "learn1", label: "Tree anatomy", short: "1", icon: "tree" },
  { id: "learn2", label: "Ordering rule", short: "2", icon: "chevron" },
  { id: "watch", label: "Watch it work", short: "3", icon: "eye" },
  { id: "try", label: "Guided practice", short: "4", icon: "cursor" },
  { id: "quiz", label: "Knowledge check", short: "5", icon: "check" },
  { id: "why", label: "Why order matters", short: "6", icon: "chart" },
];

interface ProgressData {
  version: number;
  unlocked: number[];
  best: Record<number, number>;
  attempts: Record<number, string[]>;
  tryCorrect: number;
  tryTotal: number;
  visited: View[];
}

const INITIAL_PROGRESS: ProgressData = {
  version: 1,
  unlocked: [1],
  best: {},
  attempts: {},
  tryCorrect: 0,
  tryTotal: 0,
  visited: [],
};

const STORAGE_KEY = "cos212bst";

function loadProgress(): ProgressData {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return saved?.version === 1 ? { ...INITIAL_PROGRESS, ...saved } : INITIAL_PROGRESS;
  } catch {
    return INITIAL_PROGRESS;
  }
}

function TreeVisual({
  tree,
  active,
  visited = [],
  fresh,
  invalid,
  compact = false,
}: {
  tree: BST;
  active?: number;
  visited?: number[];
  fresh?: number;
  invalid?: number;
  compact?: boolean;
}) {
  const positions = tree.layout();
  const count = positions.length;
  const width = Math.max(compact ? 340 : 620, count * (compact ? 50 : 68) + 48);
  const levelHeight = compact ? 65 : 78;
  const height = Math.max(compact ? 176 : 250, tree.height() * levelHeight + 44);
  const coordinates = new Map<number, { x: number; y: number }>();
  positions.forEach(({ node, order, depth }) => {
    coordinates.set(node.id, {
      x: 28 + (order + 0.5) * ((width - 56) / Math.max(count, 1)),
      y: 38 + depth * levelHeight,
    });
  });

  return (
    <div className="tree-canvas">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Binary search tree with ${count} nodes`}
      >
        {positions.flatMap(({ node }) =>
          ([node.left, node.right] as (TreeNode | null)[]).filter(Boolean).map((child) => {
            const a = coordinates.get(node.id)!;
            const b = coordinates.get(child!.id)!;
            return (
              <line
                className="tree-edge"
                key={`${node.id}-${child!.id}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
              />
            );
          }),
        )}
        {positions.map(({ node }) => {
          const p = coordinates.get(node.id)!;
          const state =
            node.id === invalid
              ? " invalid"
              : node.id === fresh
                ? " fresh"
                : node.id === active
                  ? " active"
                  : visited.includes(node.id)
                    ? " visited"
                    : "";
          return (
            <g className={`tree-node${state}`} key={node.id} transform={`translate(${p.x} ${p.y})`}>
              <circle r={compact ? 20 : 23} />
              <text>{node.value}</text>
            </g>
          );
        })}
        {!count && (
          <text className="empty-label" x={width / 2} y={height / 2}>
            Your tree is empty. Insert a value to begin.
          </text>
        )}
      </svg>
    </div>
  );
}

function Button({
  children,
  variant = "primary",
  icon,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  icon?: IconName;
}) {
  return (
    <button className={`button ${variant}`} {...props}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
}

function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <header className="page-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </header>
  );
}

function Pager({
  back,
  next,
  nextLabel,
  onGo,
}: {
  back?: View;
  next?: View;
  nextLabel?: string;
  onGo: (view: View) => void;
}) {
  return (
    <div className="pager">
      {back ? (
        <Button variant="ghost" onClick={() => onGo(back)}>
          Back
        </Button>
      ) : (
        <span />
      )}
      {next && (
        <Button onClick={() => onGo(next)}>
          {nextLabel || "Continue"}
          <Icon name="arrow" />
        </Button>
      )}
    </div>
  );
}

function Welcome({ onGo }: { onGo: (view: View) => void }) {
  const demo = useMemo(() => BST.from([50, 25, 75, 12, 37, 62, 87]), []);
  return (
    <div className="page welcome-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="live-dot" /> Interactive pre-lecture · 20 min
          </span>
          <h1>
            Find one name in 1 000 pages — in about <em>10 page-turns?</em>
          </h1>
          <p>
            A phone book is sorted, so you never read it from the front. You open the middle, decide{" "}
            <strong>left or right</strong>, and throw away half the book each time. A{" "}
            <strong>Binary Search Tree</strong> does exactly this.
          </p>
          <div className="hero-actions">
            <Button onClick={() => onGo("learn1")}>
              Start learning <Icon name="arrow" />
            </Button>
            <span>Build one yourself before the lecture starts.</span>
          </div>
        </div>
        <div className="hero-demo">
          <div className="demo-top">
            <span>SEARCHING FOR</span>
            <strong>62</strong>
          </div>
          <TreeVisual
            tree={demo}
            active={demo.root?.right?.left?.id}
            visited={[demo.root!.id, demo.root!.right!.id]}
            compact
          />
          <div className="demo-result">
            <Icon name="check" />
            <span>
              <strong>Found in 3 comparisons</strong>
              <small>4 branches skipped entirely</small>
            </span>
          </div>
        </div>
      </section>

      <section className="learning-card">
        <div className="section-title">
          <span className="section-number">01</span>
          <div>
            <h2>What you’ll be able to do</h2>
            <p>Five focused outcomes, from vocabulary to analysis.</p>
          </div>
        </div>
        <div className="outcomes">
          {[
            ["Remember", "O1", "State the BST ordering rule and name the parts of a tree."],
            [
              "Understand",
              "O2",
              "Tell a valid BST from an invalid one, and say which rule is broken.",
            ],
            [
              "Apply",
              "O3",
              "Trace how a value is inserted into (or searched for in) a tree, step by step.",
            ],
            ["Apply", "O4", "Build the tree that results from inserting a list of values."],
            [
              "Analyse",
              "O5",
              "Explain why the order you insert values in changes the tree’s shape and speed.",
            ],
          ].map(([level, id, text]) => (
            <div className="outcome" key={id}>
              <span className="outcome-level">{level}</span>
              <span className="outcome-id">{id}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="recap">
        <div>
          <span className="eyebrow">Quick recap</span>
          <h2>Things you already know</h2>
        </div>
        <div className="recap-items">
          <span>
            <code>a &lt; b</code>
            <small>Compare two numbers</small>
          </span>
          <span>
            <code>node</code>
            <small>An object holding a value and references</small>
          </span>
          <span>
            <code>null</code>
            <small>An empty reference</small>
          </span>
        </div>
      </section>
    </div>
  );
}

function LearnOne({ onGo }: { onGo: (view: View) => void }) {
  const tree = useMemo(() => BST.from([50, 30, 70, 20, 40, 80]), []);
  return (
    <div className="page">
      <PageHeader
        eyebrow="Lesson 1 · Tree anatomy"
        title="What does a tree look like?"
        text="A binary tree is made of nodes. Each node holds one value and has up to two children: a left child and a right child."
      />
      <div className="lesson-grid">
        <section className="learning-card prose">
          <h2>Three words you need</h2>
          <div className="definition">
            <span>01</span>
            <div>
              <h3>Root</h3>
              <p>The single node at the top; the entry point.</p>
            </div>
          </div>
          <div className="definition">
            <span>02</span>
            <div>
              <h3>Leaf</h3>
              <p>A node with no children.</p>
            </div>
          </div>
          <div className="definition">
            <span>03</span>
            <div>
              <h3>Subtree</h3>
              <p>
                A node together with everything below it. The left child of the root, plus all of
                its descendants, is the root’s <em>left subtree</em>.
              </p>
            </div>
          </div>
          <div className="callout">
            <Icon name="spark" />
            <p>
              That’s it: a linked list where each node can point to two next nodes instead of one.
            </p>
          </div>
        </section>
        <section className="learning-card visual-card">
          <div className="visual-labels">
            <span>Root</span>
            <span>Parent / child</span>
            <span>Leaves</span>
          </div>
          <TreeVisual tree={tree} />
          <p className="figure-note">
            Every connection represents a reference from one node to another.
          </p>
        </section>
      </div>
      <Pager back="welcome" next="learn2" nextLabel="The ordering rule" onGo={onGo} />
    </div>
  );
}

function LearnTwo({ onGo }: { onGo: (view: View) => void }) {
  const valid = useMemo(() => BST.from([50, 30, 70, 40]), []);
  const invalid = useMemo(() => {
    const tree = new BST();
    tree.root = new TreeNode(50);
    tree.root.left = new TreeNode(30);
    tree.root.left.right = new TreeNode(60);
    tree.root.right = new TreeNode(70);
    return tree;
  }, []);
  return (
    <div className="page">
      <PageHeader
        eyebrow="Lesson 2 · The ordering rule"
        title="The one rule that makes it a search tree"
        text="The ordering rule lets you ignore entire branches after a single comparison."
      />
      <div className="rule-banner">
        <span className="rule-left">
          LEFT <b>&lt;</b>
        </span>
        <strong>NODE</strong>
        <span className="rule-right">
          <b>&lt;</b> RIGHT
        </span>
        <p>
          Everything in a node’s <b>left subtree is smaller</b> than the node. Everything in its{" "}
          <b>right subtree is larger</b>. This holds for every node, not just the root.
        </p>
      </div>
      <p className="lead-text">
        So if you’re looking for 20 and you’re standing at 50, you only ever need to look left. The
        entire right half of the tree is ignored — that’s the phone-book trick.
      </p>
      <div className="compare-grid">
        <section className="learning-card example good">
          <div className="example-heading">
            <span>
              <Icon name="check" />
            </span>
            <div>
              <h2>Valid BST</h2>
              <p>Every relationship follows the rule.</p>
            </div>
          </div>
          <TreeVisual tree={valid} compact />
          <p>
            Check 30’s right child: <b>40 &gt; 30</b> and <b>40 &lt; 50</b> because it’s in 50’s
            left subtree.
          </p>
        </section>
        <section className="learning-card example bad">
          <div className="example-heading">
            <span>!</span>
            <div>
              <h2>Not a BST</h2>
              <p>A global rule has been broken.</p>
            </div>
          </div>
          <TreeVisual tree={invalid} invalid={invalid.root!.left!.right!.id} compact />
          <p>
            <b>60</b> is in 50’s left subtree but 60 &gt; 50. The rule is broken even though 60 &gt;
            30 looks fine locally.
          </p>
        </section>
      </div>
      <div className="note">
        <b>What about duplicates?</b>
        <span>
          In this app we don’t allow them — inserting a value that’s already there does nothing.
          Your lecturer may choose a different convention.
        </span>
      </div>
      <Pager back="learn1" next="watch" nextLabel="Watch an insertion" onGo={onGo} />
    </div>
  );
}

function traceMessage(step: TraceStep, index: number) {
  if (step.kind === "compare")
    return `Compare ${step.value} with ${step.node.value}: ${step.value} ${step.side === "L" ? "<" : ">"} ${step.node.value}, so go ${step.side === "L" ? "LEFT" : "RIGHT"}.`;
  if (step.kind === "place")
    return step.parent
      ? `The ${step.side === "L" ? "left" : "right"} child of ${step.parent.value} is empty — place ${step.node.value} there. Done.`
      : `The tree was empty, so ${step.node.value} becomes the root.`;
  if (step.kind === "dup")
    return `${step.value} is already in the tree. Nothing is inserted — this course does not allow duplicates.`;
  if (step.kind === "found")
    return `${step.value} equals ${step.node.value} — found after ${index + 1} comparison${index ? "s" : ""}.`;
  return `Reached an empty spot — ${step.value} is not in the tree.`;
}

function Watch({ onGo }: { onGo: (view: View) => void }) {
  const [tree, setTree] = useState(() => BST.from([50, 30, 70, 20, 60, 80]));
  const [value, setValue] = useState(40);
  const [trace, setTrace] = useState<TraceStep[]>([]);
  const [step, setStep] = useState(-1);
  const [speed, setSpeed] = useState(900);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number | null>(null);
  const current = trace[step];
  const visited = trace
    .slice(0, Math.max(step, 0))
    .flatMap((item) => ("node" in item ? [item.node.id] : []));

  const stop = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
    setPlaying(false);
  }, []);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );
  useEffect(() => {
    if (!playing) return;
    if (step >= trace.length - 1) return stop();
    timer.current = window.setTimeout(() => setStep((s) => s + 1), 2200 - speed);
  }, [playing, step, speed, stop, trace.length]);

  const run = (operation: "insert" | "search") => {
    stop();
    const nextTrace = operation === "insert" ? tree.insert(value) : tree.search(value);
    setTree(tree);
    setTrace(nextTrace);
    setStep(-1);
  };

  const nextStep = () => {
    stop();
    setStep((s) => Math.min(s + 1, trace.length - 1));
  };

  const loadExample = () => {
    stop();
    setTree(BST.from([50, 30, 70, 20, 60, 80]));
    setTrace([]);
    setStep(-1);
    setValue(40);
  };

  const clear = () => {
    stop();
    setTree(new BST());
    setTrace([]);
    setStep(-1);
  };

  return (
    <div className="page">
      <PageHeader
        eyebrow="Lesson 3 · Interactive demo"
        title="Watch an insertion, one decision at a time"
        text="Start at the root; compare; go left if smaller, right if larger; when you reach an empty spot, put the new node there."
      />
      <section className="workbench">
        <div className="workbench-toolbar">
          <label className="value-field">
            <span>VALUE</span>
            <input
              type="number"
              min="0"
              max="99"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
          </label>
          <div className="button-group">
            <Button onClick={() => run("insert")}>Insert value</Button>
            <Button variant="secondary" icon="search" onClick={() => run("search")}>
              Search
            </Button>
          </div>
          <div className="toolbar-separator" />
          <div className="button-group">
            <Button
              variant="secondary"
              icon="step"
              disabled={!trace.length || step >= trace.length - 1}
              onClick={nextStep}
            >
              Step
            </Button>
            <Button
              variant="secondary"
              icon="play"
              disabled={!trace.length || step >= trace.length - 1}
              onClick={() => setPlaying(true)}
            >
              {playing ? "Playing" : "Play"}
            </Button>
          </div>
          <label className="speed-field">
            <span>Speed</span>
            <input
              type="range"
              min="300"
              max="2000"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </label>
          <div className="toolbar-spacer" />
          <Button variant="ghost" icon="refresh" onClick={loadExample}>
            Example
          </Button>
          <Button variant="ghost" icon="trash" onClick={clear}>
            Clear
          </Button>
        </div>
        <div
          className={`narration ${current && ["place", "found"].includes(current.kind) ? "success" : current && ["dup", "notfound"].includes(current.kind) ? "warning" : ""}`}
        >
          <span className="narration-step">
            {step < 0
              ? "READY"
              : `${String(step + 1).padStart(2, "0")} / ${String(trace.length).padStart(2, "0")}`}
          </span>
          <p>
            {step < 0
              ? trace.length
                ? `Ready to trace ${value}. Press Step or Play.`
                : "The example tree is loaded. Insert a value and watch each comparison."
              : traceMessage(current, step)}
          </p>
        </div>
        <div className="canvas-wrap">
          <TreeVisual
            tree={tree}
            active={"node" in (current || {}) ? (current as { node: TreeNode }).node.id : undefined}
            visited={visited}
            fresh={current?.kind === "place" ? current.node.id : undefined}
          />
        </div>
        <div className="workbench-tip">
          <span>TIP</span> Use <b>Step</b> to go one comparison at a time. Try inserting a value
          that is already in the tree.
        </div>
      </section>
      <Pager back="learn2" next="try" nextLabel="Your turn to predict" onGo={onGo} />
    </div>
  );
}

interface TryChallenge {
  tree: BST;
  value: number;
  current: TreeNode;
  visited: number[];
  done: boolean;
}

function TryIt({
  onGo,
  progress,
  setProgress,
}: {
  onGo: (view: View) => void;
  progress: ProgressData;
  setProgress: React.Dispatch<React.SetStateAction<ProgressData>>;
}) {
  const [hints, setHints] = useState(true);
  const [challenge, setChallenge] = useState<TryChallenge | null>(null);
  const [feedback, setFeedback] = useState("Select “New challenge” when you’re ready.");
  const [mood, setMood] = useState("");

  const start = () => {
    const size = 4 + Math.floor(Math.random() * 3);
    const values = new Set<number>();
    while (values.size < size) values.add(5 + Math.floor(Math.random() * 90));
    let value = 0;
    do value = 5 + Math.floor(Math.random() * 90);
    while (values.has(value));
    const tree = BST.from([...values]);
    setChallenge({ tree, value, current: tree.root!, visited: [], done: false });
    setFeedback(`Insert ${value}. You’re at the root ${tree.root!.value}.`);
    setMood("");
  };

  const choose = (choice: Side | "P") => {
    if (!challenge || challenge.done) return;
    const { current, value } = challenge;
    const side: Side = value < current.value ? "L" : "R";
    const child = side === "L" ? current.left : current.right;
    const expected = child ? side : "P";
    const correct = choice === expected;
    setProgress((old) => ({
      ...old,
      tryTotal: old.tryTotal + 1,
      tryCorrect: old.tryCorrect + (correct ? 1 : 0),
    }));

    if (!correct) {
      setMood("bad");
      setFeedback(
        expected === "P"
          ? `There is nothing on the ${side === "L" ? "left" : "right"} side. This empty spot is exactly where ${value} belongs.`
          : `${value} is ${side === "L" ? "smaller" : "larger"} than ${current.value}, so move ${side === "L" ? "left" : "right"}. Try again.`,
      );
      return;
    }

    if (choice === "P") {
      challenge.tree.insert(value);
      setChallenge({ ...challenge, done: true, visited: [...challenge.visited, current.id] });
      setMood("good");
      setFeedback(
        `Placed ${value} as the ${side === "L" ? "left" : "right"} child of ${current.value}. You just ran the insertion algorithm yourself.`,
      );
      return;
    }

    setChallenge({ ...challenge, current: child!, visited: [...challenge.visited, current.id] });
    setMood("good");
    setFeedback(
      `Right — ${value} ${side === "L" ? "<" : ">"} ${current.value}. Now you’re at ${child!.value}.`,
    );
  };

  const expectedSide = challenge ? (challenge.value < challenge.current.value ? "L" : "R") : "L";
  const expectedChild = challenge
    ? expectedSide === "L"
      ? challenge.current.left
      : challenge.current.right
    : null;

  return (
    <div className="page">
      <PageHeader
        eyebrow="Lesson 4 · Guided practice"
        title="Now you are the algorithm"
        text="Before each step, choose where the value goes. The tutor confirms your reasoning or helps you correct it."
      />
      <section className="workbench try-workbench">
        <div className="practice-header">
          <Button onClick={start} icon="refresh">
            New challenge
          </Button>
          <label className="toggle">
            <input type="checkbox" checked={hints} onChange={(e) => setHints(e.target.checked)} />
            <span /> Show hints
          </label>
          <div className="score-chip">
            <small>PREDICTION SCORE</small>
            <b>
              {progress.tryCorrect} / {progress.tryTotal}
            </b>{" "}
            correct
          </div>
        </div>
        <div className={`narration practice ${mood}`}>
          <span className="narration-step">
            {challenge ? `INSERT ${challenge.value}` : "READY"}
          </span>
          <div>
            <p>{feedback}</p>
            {hints && challenge && !challenge.done && (
              <small>
                Hint: is {challenge.value} smaller or larger than {challenge.current.value}? Smaller
                goes left; larger goes right. If that side is empty, place it.
              </small>
            )}
          </div>
        </div>
        <div className="choice-row">
          <Button
            variant="secondary"
            disabled={!challenge || challenge.done}
            onClick={() => choose("L")}
          >
            Go left
          </Button>
          <Button
            variant="secondary"
            disabled={!challenge || challenge.done}
            onClick={() => choose("R")}
          >
            Go right
          </Button>
          <Button
            disabled={!challenge || challenge.done || Boolean(expectedChild)}
            onClick={() => choose("P")}
          >
            Place it here
          </Button>
        </div>
        <div className="canvas-wrap">
          {challenge ? (
            <TreeVisual
              tree={challenge.tree}
              active={challenge.done ? undefined : challenge.current.id}
              visited={challenge.visited}
              fresh={
                challenge.done
                  ? challenge.tree.layout().find((p) => p.node.value === challenge.value)?.node.id
                  : undefined
              }
            />
          ) : (
            <div className="empty-state">
              <Icon name="cursor" size={28} />
              <h3>Your challenge will appear here</h3>
              <p>You’ll get a fresh tree and a value to insert.</p>
            </div>
          )}
        </div>
      </section>
      <Pager back="watch" next="quiz" nextLabel="Check yourself" onGo={onGo} />
    </div>
  );
}

type Tier = (typeof TIERS)[number];
type Item = Tier["items"][number];

function Quiz({
  onGo,
  progress,
  setProgress,
}: {
  onGo: (view: View) => void;
  progress: ProgressData;
  setProgress: React.Dispatch<React.SetStateAction<ProgressData>>;
}) {
  const [tier, setTier] = useState<Tier | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  const startTier = (nextTier: Tier) => {
    const seen = progress.attempts[nextTier.id] || [];
    const available = nextTier.items.filter((item) => !seen.includes(item.stem));
    const source = available.length >= QUIZ_LEN ? available : nextTier.items;
    setTier(nextTier);
    setItems([...source].sort(() => Math.random() - 0.5).slice(0, QUIZ_LEN));
    setIndex(0);
    setSelected(null);
    setCorrect(0);
    setFinished(false);
  };

  const finish = (finalCorrect: number) => {
    if (!tier) return;
    const score = finalCorrect / items.length;
    setProgress((old) => {
      const unlocked = [...old.unlocked];
      if (score >= THRESHOLD && tier.id < 3 && !unlocked.includes(tier.id + 1))
        unlocked.push(tier.id + 1);
      return {
        ...old,
        unlocked,
        best: { ...old.best, [tier.id]: Math.max(old.best[tier.id] || 0, score) },
        attempts: {
          ...old.attempts,
          [tier.id]: [...(old.attempts[tier.id] || []), ...items.map((item) => item.stem)].slice(
            -10,
          ),
        },
      };
    });
    setFinished(true);
  };

  const answer = (choice: number) => {
    if (selected !== null) return;
    setSelected(choice);
    if (choice === items[index].answer) setCorrect((value) => value + 1);
  };

  const next = () => {
    const nextCorrect = correct;
    if (index === items.length - 1) finish(nextCorrect);
    else {
      setIndex((value) => value + 1);
      setSelected(null);
    }
  };

  const passed = tier ? (progress.best[tier.id] || 0) >= THRESHOLD : false;
  const current = items[index];

  return (
    <div className="page">
      <PageHeader
        eyebrow="Lesson 5 · Knowledge check"
        title="Check your understanding"
        text="Three tiers build from remembering the rule to analysing performance. Score 4/5 or better to unlock the next."
      />
      <div className="tier-tabs">
        {TIERS.map((item) => {
          const unlocked = progress.unlocked.includes(item.id);
          const best = progress.best[item.id];
          return (
            <button
              key={item.id}
              disabled={!unlocked}
              className={tier?.id === item.id ? "active" : ""}
              onClick={() => startTier(item)}
            >
              <span>
                {unlocked ? String(item.id).padStart(2, "0") : <Icon name="lock" size={15} />}
              </span>
              <div>
                <b>{item.name.split("·")[1]}</b>
                <small>{item.bloom}</small>
              </div>
              {best !== undefined && (
                <em className={best >= THRESHOLD ? "mastered" : ""}>
                  {Math.round(best * QUIZ_LEN)}/{QUIZ_LEN}
                </em>
              )}
            </button>
          );
        })}
      </div>

      {!tier && (
        <section className="quiz-empty learning-card">
          <div className="quiz-symbol">
            <Icon name="check" size={34} />
          </div>
          <h2>Choose a tier to begin</h2>
          <p>Tier 1 is open. The others unlock as you master each one.</p>
          <Button onClick={() => startTier(TIERS[0])}>
            Start Tier 1 <Icon name="arrow" />
          </Button>
        </section>
      )}

      {tier && !finished && current && (
        <section className="quiz-card">
          <div className="quiz-meta">
            <span>{tier.name}</span>
            <span>
              QUESTION {index + 1} OF {items.length}
            </span>
          </div>
          <div className="progress-track">
            <span
              style={{ width: `${((index + (selected !== null ? 1 : 0)) / items.length) * 100}%` }}
            />
          </div>
          <h2>{current.stem}</h2>
          <div className="options">
            {current.options.map((option, optionIndex) => {
              const state =
                selected === null
                  ? ""
                  : optionIndex === current.answer
                    ? "correct"
                    : optionIndex === selected
                      ? "wrong"
                      : "dim";
              return (
                <button
                  key={option}
                  className={state}
                  disabled={selected !== null}
                  onClick={() => answer(optionIndex)}
                >
                  <span>{String.fromCharCode(65 + optionIndex)}</span>
                  {option}
                  {state === "correct" && <Icon name="check" />}
                </button>
              );
            })}
          </div>
          {selected !== null && (
            <div className={`answer-feedback ${selected === current.answer ? "good" : "bad"}`}>
              <b>{selected === current.answer ? "Correct." : "Not quite."}</b> {current.why}
            </div>
          )}
          {selected !== null && (
            <div className="quiz-next">
              <Button onClick={next}>
                {index + 1 < items.length ? "Next question" : "See result"} <Icon name="arrow" />
              </Button>
            </div>
          )}
        </section>
      )}

      {tier && finished && (
        <section className={`result-card ${passed ? "passed" : ""}`}>
          <span className="result-score">
            {correct}
            <small>/ {items.length}</small>
          </span>
          <div>
            <span className="eyebrow">{passed ? "Tier mastered" : "Not yet"}</span>
            <h2>
              {passed
                ? `${tier.name.split("·")[0].trim()} complete`
                : "One more pass through the ideas"}
            </h2>
            <p>
              {passed
                ? tier.id < 3
                  ? `Tier ${tier.id + 1} is now unlocked.`
                  : "You have mastered all three tiers and are ready for the lecture."
                : `You need 4/5. This tier checks objectives ${tier.objectives}. ${tier.remedialText}`}
            </p>
            <div className="result-actions">
              {passed && tier.id < 3 ? (
                <Button onClick={() => startTier(TIERS[tier.id])}>
                  Start Tier {tier.id + 1} <Icon name="arrow" />
                </Button>
              ) : passed ? (
                <Button onClick={() => onGo("why")}>
                  Why order matters <Icon name="arrow" />
                </Button>
              ) : (
                <Button onClick={() => onGo(tier.remedialView as View)}>
                  Open the re-teach activity
                </Button>
              )}
              <Button variant="secondary" onClick={() => startTier(tier)}>
                Try new questions
              </Button>
            </div>
          </div>
        </section>
      )}
      <Pager back="try" onGo={onGo} />
    </div>
  );
}

function WhyOrder({ onGo }: { onGo: (view: View) => void }) {
  const balanced = useMemo(() => BST.from([4, 2, 6, 1, 3, 5, 7]), []);
  const chain = useMemo(() => BST.from([1, 2, 3, 4, 5, 6, 7]), []);
  return (
    <div className="page">
      <PageHeader
        eyebrow="Lesson 6 · Analysis"
        title="Why does insertion order matter?"
        text="Insert the same seven numbers in two different orders and compare the trees."
      />
      <div className="order-grid">
        <section className="order-card good">
          <div className="order-top">
            <span>BALANCED</span>
            <b>Height 3</b>
          </div>
          <h2>4, 2, 6, 1, 3, 5, 7</h2>
          <TreeVisual tree={balanced} compact />
          <div className="metric">
            <strong>≤ 3</strong>
            <span>comparisons to find any value</span>
          </div>
        </section>
        <section className="order-card bad">
          <div className="order-top">
            <span>DEGENERATE</span>
            <b>Height 7</b>
          </div>
          <h2>1, 2, 3, 4, 5, 6, 7</h2>
          <TreeVisual tree={chain} compact />
          <div className="metric">
            <strong>7</strong>
            <span>comparisons to find the value 7</span>
          </div>
        </section>
      </div>
      <section className="learning-card conclusion">
        <div className="conclusion-icon">
          <Icon name="chart" size={28} />
        </div>
        <div>
          <span className="eyebrow">The key insight</span>
          <h2>Shape determines speed</h2>
          <p>
            A tree whose height stays small is called <strong>balanced</strong>. The chain is just a
            linked list in disguise: the phone-book trick is gone.
          </p>
          <p>
            Your lecture will show how trees like <strong>AVL</strong> and{" "}
            <strong>Red-Black trees</strong> keep themselves balanced no matter what order the
            values arrive in — and how to <strong>delete</strong> values, which this app skipped.
          </p>
        </div>
      </section>
      <Pager back="quiz" next="progress" nextLabel="View my progress" onGo={onGo} />
    </div>
  );
}

function Progress({
  progress,
  reset,
  onGo,
}: {
  progress: ProgressData;
  reset: () => void;
  onGo: (view: View) => void;
}) {
  const mastered = TIERS.filter((tier) => (progress.best[tier.id] || 0) >= THRESHOLD).length;
  const ready = mastered === 3;
  return (
    <div className="page">
      <PageHeader
        eyebrow="Your learning record"
        title="My progress"
        text="A private summary stored only in this browser."
      />
      <div className="progress-layout">
        <section className="progress-summary">
          <div
            className="ring"
            style={{ "--progress": `${(mastered / 3) * 360}deg` } as React.CSSProperties}
          >
            <span>
              <b>{mastered}</b>
              <small>of 3 tiers</small>
            </span>
          </div>
          <h2>{ready ? "Ready for the lecture" : "Keep going — you’re building the model"}</h2>
          <p>
            {progress.visited.length} of 8 pages visited · {progress.tryCorrect}/{progress.tryTotal}{" "}
            path predictions correct
          </p>
          <Button onClick={() => onGo(ready ? "why" : "quiz")}>
            {ready ? "Review order & speed" : "Continue learning"} <Icon name="arrow" />
          </Button>
        </section>
        <section className="learning-card tier-progress">
          <h2>Knowledge tiers</h2>
          {TIERS.map((tier) => {
            const best = progress.best[tier.id];
            const passed = (best || 0) >= THRESHOLD;
            return (
              <div className="tier-row" key={tier.id}>
                <span className={passed ? "complete" : ""}>
                  {passed ? <Icon name="check" /> : tier.id}
                </span>
                <div>
                  <b>{tier.name}</b>
                  <small>
                    {tier.bloom} · objectives {tier.objectives}
                  </small>
                </div>
                <em className={passed ? "complete" : ""}>
                  {best === undefined
                    ? "Not attempted"
                    : `Best ${Math.round(best * QUIZ_LEN)}/${QUIZ_LEN}${passed ? " · Mastered" : ""}`}
                </em>
              </div>
            );
          })}
        </section>
      </div>
      <section className="next-lecture">
        <span className="eyebrow">What the lecture will add</span>
        <p>
          Deleting a value (the tricky case: a node with two children), traversals (in-order gives
          sorted output), and self-balancing trees. You now have the vocabulary and the mental model
          to follow all of it.
        </p>
      </section>
      <Button variant="danger" icon="trash" onClick={reset}>
        Reset my progress
      </Button>
    </div>
  );
}

export default function App() {
  const initialHash = window.location.hash.replace("#", "") as View;
  const [view, setView] = useState<View>(
    [...NAV.map((item) => item.id), "progress"].includes(initialHash) ? initialHash : "welcome",
  );
  const [progress, setProgress] = useState<ProgressData>(loadProgress);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const go = (next: View) => {
    setView(next);
    setMobileNav(false);
    window.location.hash = next;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setProgress((old) =>
      old.visited.includes(next) ? old : { ...old, visited: [...old.visited, next] },
    );
  };

  const reset = () => {
    if (!window.confirm("Clear your saved progress?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setProgress({ ...INITIAL_PROGRESS });
    go("welcome");
  };

  const currentIndex = NAV.findIndex((item) => item.id === view);
  const completion = Math.round((progress.visited.length / 8) * 100);

  return (
    <div className="app-shell">
      <aside className={mobileNav ? "sidebar open" : "sidebar"}>
        <div className="brand">
          <span className="brand-mark">
            <Icon name="tree" size={24} />
          </span>
          <div>
            <b>COS212</b>
            <small>Binary Search Trees</small>
          </div>
        </div>
        <button
          className="mobile-close"
          onClick={() => setMobileNav(false)}
          aria-label="Close navigation"
        >
          ×
        </button>
        <div className="course-label">COURSE PATH</div>
        <nav>
          {NAV.map((item, index) => (
            <button
              key={item.id}
              className={view === item.id ? "active" : ""}
              onClick={() => go(item.id)}
            >
              <span className="nav-index">
                {index === 0 ? <Icon name={item.icon} size={17} /> : String(index).padStart(2, "0")}
              </span>
              <span>{item.label}</span>
              {progress.visited.includes(item.id) && view !== item.id && (
                <Icon name="check" size={15} />
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-progress">
          <div>
            <span>Your progress</span>
            <b>{completion}%</b>
          </div>
          <div className="progress-track">
            <span style={{ width: `${completion}%` }} />
          </div>
          <button onClick={() => go("progress")} className={view === "progress" ? "active" : ""}>
            <Icon name="chart" />
            <span>View learning record</span>
            <Icon name="chevron" size={15} />
          </button>
        </div>
        <div className="privacy-note">
          <span>
            <Icon name="lock" size={14} />
          </span>
          <p>
            <b>Private by design</b>Your progress stays in this browser.
          </p>
        </div>
      </aside>

      <div className="main-shell">
        <header className="topbar">
          <button
            className="menu-button"
            aria-label="Open navigation"
            onClick={() => setMobileNav(true)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className="breadcrumb">
            <span>COS212 APP</span>
            <Icon name="chevron" size={14} />
            <b>{view === "progress" ? "My progress" : NAV[Math.max(currentIndex, 0)]?.label}</b>
          </div>
          <div className="topbar-right">
            <span>2026 · PRE-LECTURE</span>
            <button onClick={() => go("progress")} aria-label="Open progress">
              <Icon name="chart" />
            </button>
          </div>
        </header>
        <main>
          {view === "welcome" && <Welcome onGo={go} />}
          {view === "learn1" && <LearnOne onGo={go} />}
          {view === "learn2" && <LearnTwo onGo={go} />}
          {view === "watch" && <Watch onGo={go} />}
          {view === "try" && <TryIt onGo={go} progress={progress} setProgress={setProgress} />}
          {view === "quiz" && <Quiz onGo={go} progress={progress} setProgress={setProgress} />}
          {view === "why" && <WhyOrder onGo={go} />}
          {view === "progress" && <Progress progress={progress} reset={reset} onGo={go} />}
        </main>
        <footer>
          COS212 App · COS750 2026 · Runs entirely in your browser; nothing is sent anywhere.
        </footer>
      </div>
      {mobileNav && (
        <button
          className="scrim"
          aria-label="Close navigation"
          onClick={() => setMobileNav(false)}
        />
      )}
    </div>
  );
}
