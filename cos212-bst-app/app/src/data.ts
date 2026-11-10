export const THRESHOLD = 0.8;
export const QUIZ_LEN = 5;

export const TIERS = [
  {
    id: 1,
    name: "Tier 1 · Remember & understand",
    bloom: "Remember / Understand",
    objectives: "O1, O2",
    remedialView: "learn2",
    remedialText:
      "Re-read the ordering rule and the valid/invalid examples, then come back and try new questions.",
    items: [
      {
        stem: "In a BST, every value in the LEFT subtree of a node is…",
        options: [
          "greater than the node",
          "smaller than the node",
          "equal to the node",
          "in no particular order",
        ],
        answer: 1,
        why: "The BST rule: left subtree < node < right subtree.",
      },
      {
        stem: "The node at the top of a tree, where every search starts, is called the…",
        options: ["leaf", "branch", "root", "parent"],
        answer: 2,
        why: "The root is the single entry point; leaves are the nodes with no children.",
      },
      {
        stem: "A node with no children is called a…",
        options: ["root", "leaf", "subtree", "null"],
        answer: 1,
        why: "Leaf = no children. Null is an empty reference, not a node.",
      },
      {
        stem: "How many children can a node in a BINARY tree have at most?",
        options: ["1", "2", "3", "any number"],
        answer: 1,
        why: '"Binary" means at most two: a left child and a right child.',
      },
      {
        stem: "Root 50 has left child 30. 30 has right child 60. Is this a valid BST?",
        options: [
          "Yes — 60 > 30 so it is fine",
          "No — 60 is in 50's left subtree but 60 > 50",
          "Yes — only the root's direct children matter",
          "No — a left child cannot have a right child",
        ],
        answer: 1,
        why: "The rule applies to whole subtrees, not just direct children. Everything under 50's left child must be < 50.",
      },
      {
        stem: "Which statement about a BST is TRUE?",
        options: [
          "Values must be inserted in sorted order",
          "The left child is always a leaf",
          "The rule (left < node < right) must hold at every node",
          "The root is always the smallest value",
        ],
        answer: 2,
        why: "The ordering rule holds for every node. Nothing requires sorted input or any particular root value.",
      },
      {
        stem: "Searching for 20 starting at root 50, which part of the tree can you ignore completely?",
        options: [
          "The left subtree",
          "The right subtree",
          "The root",
          "Nothing — you must check all nodes",
        ],
        answer: 1,
        why: "20 < 50, so 20 can only be in the left subtree. The whole right subtree is skipped.",
      },
      {
        stem: 'A "subtree" is…',
        options: [
          "any single node",
          "a node together with all its descendants",
          "only the leaves of a tree",
          "the path from root to a leaf",
        ],
        answer: 1,
        why: "A subtree is a node plus everything below it — it is itself a tree.",
      },
      {
        stem: "Root 40, right child 60, 60's left child 50. Valid BST?",
        options: [
          "Yes",
          "No — 50 < 60 but 50 should be on the right",
          "No — 50 < 40",
          "Only if 50 is a leaf",
        ],
        answer: 0,
        why: "50 > 40 (right subtree ✓) and 50 < 60 (left of 60 ✓). Valid.",
      },
      {
        stem: "Why is it called a binary SEARCH tree rather than just a binary tree?",
        options: [
          "It can only store numbers",
          "Its nodes are arranged by the ordering rule, which makes searching fast",
          "It always has an even number of nodes",
          "It is searched with a loop",
        ],
        answer: 1,
        why: "The ordering rule is what lets a search discard half the remaining tree at each step.",
      },
    ],
  },
  {
    id: 2,
    name: "Tier 2 · Apply",
    bloom: "Apply",
    objectives: "O3, O4",
    remedialView: "try",
    remedialText:
      'Do a few guided "predict the path" challenges with hints ON, then come back for new questions.',
    items: [
      {
        stem: "Tree: 50 (left 30, right 70); 30 has left 20 and right 40. Insert 45. Which node becomes its parent?",
        options: ["50", "30", "40", "70"],
        answer: 2,
        why: "45 < 50 → left to 30; 45 > 30 → right to 40; 45 > 40 → 40's right is empty → place there. Parent = 40.",
      },
      {
        stem: "Same tree (50; 30, 70; 20, 40). Insert 65. Where does it go?",
        options: ["Left child of 70", "Right child of 70", "Right child of 50", "Left child of 50"],
        answer: 0,
        why: "65 > 50 → right to 70; 65 < 70 → 70's left is empty → place there.",
      },
      {
        stem: "Insert 50, 30, 70, 20 (in that order) into an empty tree. What is 20's parent?",
        options: ["50", "30", "70", "20 becomes the root"],
        answer: 1,
        why: "50 is root; 30 goes left of 50; 70 right of 50; 20 < 50 → left to 30; 20 < 30 → left of 30.",
      },
      {
        stem: "Insert 10, 20, 30 (in that order) into an empty tree. What is the shape?",
        options: [
          "10 at root with 20 and 30 as its two children",
          "A straight line going right: 10 → 20 → 30",
          "30 at root with 10 and 20 below",
          "A straight line going left",
        ],
        answer: 1,
        why: "Each value is larger than everything before it, so each goes right of the previous one.",
      },
      {
        stem: "Tree: 50 (left 30, right 70). Search for 60. How many comparisons before you know it is NOT there?",
        options: ["1", "2", "3", "You must check every node"],
        answer: 1,
        why: "60 vs 50 → right; 60 vs 70 → left; 70's left is empty → not found. Two comparisons.",
      },
      {
        stem: "Tree: 50 (left 30, right 70). Insert 50 again. What happens?",
        options: [
          "A second 50 is placed to the left",
          "A second 50 is placed to the right",
          "Nothing — duplicates are not inserted (our convention)",
          "The tree is rebuilt",
        ],
        answer: 2,
        why: "In this app duplicates are rejected: the comparison finds an equal value and stops.",
      },
      {
        stem: "Insert 40, 20, 60, 10, 30, 50, 70 in that order. What is the height (number of levels)?",
        options: ["2", "3", "4", "7"],
        answer: 1,
        why: "40 root; 20 and 60 on level 2; 10, 30, 50, 70 on level 3. A perfectly balanced tree of 7 nodes.",
      },
      {
        stem: "Tree: 50 (left 30, right 70); 70 has right child 90. Insert 80. Which comparisons are made, in order?",
        options: ["50, 70, 90", "50, 30", "50, 70", "50, 90"],
        answer: 0,
        why: "80 > 50 → right; 80 > 70 → right; 80 < 90 → left; 90's left is empty → place.",
      },
      {
        stem: "Insert 8, 3, 10, 1, 6 into an empty tree. Which values are leaves?",
        options: ["8 and 10", "1, 6 and 10", "3 and 10", "1 and 6"],
        answer: 1,
        why: "8 root; 3 left, 10 right; 1 left of 3; 6 right of 3. Nodes without children: 1, 6, 10.",
      },
      {
        stem: "Starting at root 50, you are searching for 35 and reach node 30. What do you do next?",
        options: ["Go left of 30", "Go right of 30", "Stop — 35 is not there", "Go back to 50"],
        answer: 1,
        why: "35 > 30, so go right. Only an EMPTY reference ends an unsuccessful search.",
      },
    ],
  },
  {
    id: 3,
    name: "Tier 3 · Analyse",
    bloom: "Analyse",
    objectives: "O5",
    remedialView: "why",
    remedialText:
      "Look at the two trees built from the same values in different orders, then come back for new questions.",
    items: [
      {
        stem: "Which insertion order of the values 1–7 produces the TALLEST tree?",
        options: [
          "4, 2, 6, 1, 3, 5, 7",
          "1, 2, 3, 4, 5, 6, 7",
          "4, 1, 7, 2, 6, 3, 5",
          "7, 4, 1, 6, 2, 5, 3",
        ],
        answer: 1,
        why: "Sorted input makes every value go right of the previous one: a chain of height 7.",
      },
      {
        stem: "Why is a tall, chain-like BST slow to search?",
        options: [
          "Because it uses more memory",
          "Because each comparison only removes one node instead of about half the tree",
          "Because the root is wrong",
          "Because leaves are far apart",
        ],
        answer: 1,
        why: "The speed of BST search comes from discarding a subtree at each step. In a chain, each step discards just one node — like a linked list.",
      },
      {
        stem: "A BST of 1 000 values is perfectly balanced. Roughly how many comparisons does a search need at most?",
        options: ["About 10", "About 100", "About 500", "About 1 000"],
        answer: 0,
        why: "Halving 1 000 repeatedly: 1000 → 500 → 250 → … → 1 takes about 10 steps (2¹⁰ = 1024).",
      },
      {
        stem: "Which value would make the BEST root for a tree that will hold the values 10, 20, 30, 40, 50?",
        options: ["10", "30", "50", "It makes no difference"],
        answer: 1,
        why: "The middle value splits the rest evenly: two go left, two go right, giving the smallest height.",
      },
      {
        stem: "Two BSTs hold exactly the same values. Which of these MUST be the same for both?",
        options: [
          "Their shape",
          "Their height",
          "Their root",
          "The sorted sequence you get reading left-to-right (in-order)",
        ],
        answer: 3,
        why: "Shape depends on insertion order, but the in-order reading of any BST is always the sorted values.",
      },
      {
        stem: "You insert values in RANDOM order into a BST. What shape do you most likely get?",
        options: [
          "A perfect chain",
          "A reasonably balanced tree",
          "A tree with only left children",
          "A tree with the smallest value at the root",
        ],
        answer: 1,
        why: 'Random order tends to put a "middling" value near the top, so subtrees stay fairly even.',
      },
      {
        stem: "What does a lecture on AVL or Red-Black trees mainly fix?",
        options: [
          "Duplicates",
          "The tree becoming unbalanced (tall) after insertions",
          "Searching for values that are not there",
          "The need for a root",
        ],
        answer: 1,
        why: "Self-balancing trees re-arrange nodes after insertion so the height stays small regardless of input order.",
      },
      {
        stem: "Searching for 5 in the chain 1 → 2 → 3 → 4 → 5 (each the right child of the previous) takes how many comparisons?",
        options: ["1", "3", "5", "It cannot be found"],
        answer: 2,
        why: "You visit every node: 1, 2, 3, 4, 5. Five comparisons — no better than a list.",
      },
      {
        stem: "Which best describes why insertion order matters?",
        options: [
          "Insertion order changes which values are stored",
          "Insertion order determines the shape, and shape determines search cost",
          "Insertion order affects the ordering rule",
          "It does not matter",
        ],
        answer: 1,
        why: "Same values, different order → different shape → different height → different number of comparisons.",
      },
      {
        stem: "A BST has height 4. What is the MAXIMUM number of comparisons a successful search can need?",
        options: ["2", "4", "8", "16"],
        answer: 1,
        why: "A search walks one path from the root downward; the longest such path has as many nodes as the height.",
      },
    ],
  },
];
