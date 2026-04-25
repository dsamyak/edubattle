export const questionBank = [
  // --- Data Structures & Algorithms ---
  {
    id: "q1", subject: "Computer Science", topic: "Data Structures & Algorithms", difficulty: "Medium",
    body: "What is the worst-case time complexity of QuickSort?",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"], correct_idx: 1,
    explanation: "QuickSort's worst-case is O(n²), occurring when the pivot is consistently the smallest or largest element."
  },
  {
    id: "q2", subject: "Computer Science", topic: "Data Structures & Algorithms", difficulty: "Easy",
    body: "Which data structure follows the Last-In-First-Out (LIFO) principle?",
    options: ["Queue", "Linked List", "Stack", "Tree"], correct_idx: 2,
    explanation: "A Stack follows LIFO — the last element added is the first one removed."
  },
  {
    id: "q3", subject: "Computer Science", topic: "Data Structures & Algorithms", difficulty: "Hard",
    body: "In a Red-Black Tree, what is the maximum height with n internal nodes?",
    options: ["2 log(n + 1)", "log(n)", "n/2", "n log(n)"], correct_idx: 0,
    explanation: "A Red-Black tree with n internal nodes has height at most 2 log(n + 1)."
  },
  {
    id: "q4", subject: "Computer Science", topic: "Data Structures & Algorithms", difficulty: "Medium",
    body: "Which algorithm finds the shortest path with non-negative edge weights?",
    options: ["Depth First Search", "Kruskal's Algorithm", "Dijkstra's Algorithm", "Bellman-Ford"], correct_idx: 2,
    explanation: "Dijkstra's algorithm finds the shortest path from a source to all other nodes with non-negative weights."
  },
  // --- Programming ---
  {
    id: "q5", subject: "Computer Science", topic: "Programming", difficulty: "Easy",
    body: "What does OOP stand for?",
    options: ["Object-Oriented Programming", "Only Output Process", "Operational Open Protocol", "Overloaded Operator Pattern"], correct_idx: 0,
    explanation: "OOP stands for Object-Oriented Programming."
  },
  {
    id: "q6", subject: "Computer Science", topic: "Programming", difficulty: "Medium",
    body: "Which is NOT a pillar of Object-Oriented Programming?",
    options: ["Inheritance", "Polymorphism", "Encapsulation", "Compilation"], correct_idx: 3,
    explanation: "The 4 pillars are Abstraction, Encapsulation, Inheritance, and Polymorphism."
  },
  // --- Networking ---
  {
    id: "q7", subject: "Computer Science", topic: "Networking", difficulty: "Easy",
    body: "What does HTTP stand for?",
    options: ["HyperText Transfer Protocol", "Hyperlink Transfer Technology", "HyperText Transmission Process", "HyperText Test Protocol"], correct_idx: 0,
    explanation: "HTTP stands for HyperText Transfer Protocol."
  },
  {
    id: "q8", subject: "Computer Science", topic: "Networking", difficulty: "Medium",
    body: "Which OSI layer is responsible for routing packets across networks?",
    options: ["Transport Layer", "Network Layer", "Data Link Layer", "Application Layer"], correct_idx: 1,
    explanation: "The Network Layer (Layer 3) handles routing and logical addressing."
  },
  // --- Science ---
  {
    id: "q9", subject: "Science", topic: "Physics", difficulty: "Easy",
    body: "What is the SI unit of force?",
    options: ["Joule", "Watt", "Newton", "Pascal"], correct_idx: 2,
    explanation: "The Newton (N) is the SI unit of force, defined as kg·m/s²."
  },
  {
    id: "q10", subject: "Science", topic: "Physics", difficulty: "Medium",
    body: "What is the speed of light in a vacuum (approx)?",
    options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"], correct_idx: 1,
    explanation: "The speed of light in a vacuum is approximately 3 × 10⁸ meters per second."
  },
  {
    id: "q11", subject: "Science", topic: "Chemistry", difficulty: "Easy",
    body: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"], correct_idx: 2,
    explanation: "Gold's chemical symbol Au comes from the Latin word 'Aurum'."
  },
  {
    id: "q12", subject: "Science", topic: "Chemistry", difficulty: "Medium",
    body: "What is the pH of a neutral solution?",
    options: ["0", "7", "14", "1"], correct_idx: 1,
    explanation: "A neutral solution has a pH of 7. Below 7 is acidic, above 7 is basic."
  },
  {
    id: "q13", subject: "Science", topic: "Biology", difficulty: "Easy",
    body: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"], correct_idx: 2,
    explanation: "Mitochondria generate most of the cell's ATP (energy currency)."
  },
  // --- Geography ---
  {
    id: "q14", subject: "Geography", topic: "World", difficulty: "Easy",
    body: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct_idx: 3,
    explanation: "The Pacific Ocean covers about 63 million square miles."
  },
  {
    id: "q15", subject: "Geography", topic: "World", difficulty: "Medium",
    body: "Which country has the most time zones?",
    options: ["Russia", "USA", "China", "France"], correct_idx: 3,
    explanation: "France has 12 time zones due to its overseas territories."
  },
  // --- English ---
  {
    id: "q16", subject: "English", topic: "Vocabulary", difficulty: "Medium",
    body: "What does 'ephemeral' mean?",
    options: ["Eternal", "Lasting a very short time", "Extremely large", "Very old"], correct_idx: 1,
    explanation: "Ephemeral means lasting for a very short time."
  },
  {
    id: "q17", subject: "English", topic: "Grammar", difficulty: "Easy",
    body: "Which is the correct spelling?",
    options: ["Accomodate", "Accommodate", "Acommodate", "Acomodate"], correct_idx: 1,
    explanation: "Accommodate has two c's and two m's."
  },
];

// --- Dynamic Question Generators ---

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeOptions(answer, generateWrong) {
  const wrongs = generateWrong(answer);
  let opts = [answer, ...wrongs.slice(0, 3)];
  opts = shuffle(opts);
  return { options: opts.map(String), correct_idx: opts.indexOf(answer) };
}

function generateMathQuestion() {
  const templates = [
    () => {
      const a = Math.floor(Math.random() * 80) + 20;
      const b = Math.floor(Math.random() * 80) + 20;
      return { body: `What is ${a} + ${b}?`, answer: a + b, topic: "Arithmetic", diff: "Easy" };
    },
    () => {
      const a = Math.floor(Math.random() * 80) + 50;
      const b = Math.floor(Math.random() * 40) + 10;
      return { body: `What is ${a} − ${b}?`, answer: a - b, topic: "Arithmetic", diff: "Easy" };
    },
    () => {
      const a = Math.floor(Math.random() * 12) + 2;
      const b = Math.floor(Math.random() * 12) + 2;
      return { body: `What is ${a} × ${b}?`, answer: a * b, topic: "Multiplication", diff: "Medium" };
    },
    () => {
      const b = Math.floor(Math.random() * 10) + 2;
      const answer = Math.floor(Math.random() * 15) + 2;
      const a = b * answer;
      return { body: `What is ${a} ÷ ${b}?`, answer, topic: "Division", diff: "Medium" };
    },
    () => {
      const base = Math.floor(Math.random() * 10) + 2;
      return { body: `What is ${base}² ?`, answer: base * base, topic: "Powers", diff: "Medium" };
    },
    () => {
      const n = Math.floor(Math.random() * 8) + 2;
      const pct = [10, 20, 25, 50][Math.floor(Math.random() * 4)];
      const val = n * (100 / pct);
      return { body: `What is ${pct}% of ${val}?`, answer: n * (pct === 10 ? 10 : pct === 20 ? 5 : pct === 25 ? 4 : 2), topic: "Percentages", diff: "Hard" };
    },
  ];
  const t = templates[Math.floor(Math.random() * templates.length)]();
  const { options, correct_idx } = makeOptions(t.answer, (ans) => [ans + Math.floor(Math.random() * 8) + 1, ans - Math.floor(Math.random() * 8) - 1, ans + (Math.random() > 0.5 ? 12 : -12)]);
  return {
    id: `dyn_math_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    subject: "Mathematics", topic: t.topic, difficulty: t.diff,
    body: t.body, options, correct_idx,
    explanation: `The correct answer is ${t.answer}.`
  };
}

function generateScienceQuestion() {
  const pool = [
    { body: "What planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], ci: 1, topic: "Astronomy", diff: "Easy", exp: "Mars appears red due to iron oxide on its surface." },
    { body: "How many bones are in the adult human body?", options: ["196", "206", "216", "186"], ci: 1, topic: "Biology", diff: "Medium", exp: "An adult human has 206 bones." },
    { body: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], ci: 2, topic: "Biology", diff: "Easy", exp: "Plants absorb CO₂ for photosynthesis." },
    { body: "What is the hardest natural substance?", options: ["Quartz", "Topaz", "Diamond", "Sapphire"], ci: 2, topic: "Chemistry", diff: "Easy", exp: "Diamond is the hardest natural substance (10 on Mohs scale)." },
    { body: "What is the chemical formula for water?", options: ["HO₂", "H₂O", "OH", "H₃O"], ci: 1, topic: "Chemistry", diff: "Easy", exp: "Water is H₂O — two hydrogen atoms and one oxygen atom." },
    { body: "Which element has the atomic number 1?", options: ["Helium", "Lithium", "Hydrogen", "Carbon"], ci: 2, topic: "Chemistry", diff: "Easy", exp: "Hydrogen has atomic number 1." },
    { body: "What force keeps us on the ground?", options: ["Magnetism", "Friction", "Gravity", "Inertia"], ci: 2, topic: "Physics", diff: "Easy", exp: "Gravity is the force that attracts objects toward Earth." },
    { body: "What is absolute zero in Celsius?", options: ["-273.15°C", "-100°C", "0°C", "-459.67°C"], ci: 0, topic: "Physics", diff: "Hard", exp: "Absolute zero is -273.15°C (0 Kelvin)." },
  ];
  const q = pool[Math.floor(Math.random() * pool.length)];
  return {
    id: `dyn_sci_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    subject: "Science", topic: q.topic, difficulty: q.diff,
    body: q.body, options: q.options, correct_idx: q.ci, explanation: q.exp
  };
}

function generateGeoQuestion() {
  const pool = [
    { body: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], ci: 2, exp: "Tokyo is the capital of Japan." },
    { body: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], ci: 1, exp: "The Nile is approximately 6,650 km long." },
    { body: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], ci: 1, exp: "Vatican City is the smallest country at 0.44 km²." },
    { body: "On which continent is the Sahara Desert?", options: ["Asia", "South America", "Africa", "Australia"], ci: 2, exp: "The Sahara Desert is in northern Africa." },
    { body: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], ci: 2, exp: "Canberra is the capital of Australia, not Sydney." },
    { body: "Which mountain is the tallest in the world?", options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"], ci: 2, exp: "Mount Everest stands at 8,849 meters." },
  ];
  const q = pool[Math.floor(Math.random() * pool.length)];
  return {
    id: `dyn_geo_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    subject: "Geography", topic: "World", difficulty: "Medium",
    body: q.body, options: q.options, correct_idx: q.ci, explanation: q.exp
  };
}

function generateCSQuestion() {
  const pool = [
    { body: "What does HTML stand for?", options: ["Hyper Trainer Marking Language", "HyperText Markup Language", "HyperText Marketing Language", "HyperTool Multi Language"], ci: 1, topic: "Web", diff: "Easy", exp: "HTML = HyperText Markup Language." },
    { body: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], ci: 1, topic: "Data Structures", diff: "Easy", exp: "Queue uses First-In-First-Out ordering." },
    { body: "What does CPU stand for?", options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Processor Utility"], ci: 1, topic: "Hardware", diff: "Easy", exp: "CPU = Central Processing Unit." },
    { body: "What is Big O of binary search?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], ci: 2, topic: "Algorithms", diff: "Medium", exp: "Binary search halves the search space each step → O(log n)." },
    { body: "Which protocol is used for secure web browsing?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], ci: 2, topic: "Networking", diff: "Easy", exp: "HTTPS adds TLS/SSL encryption to HTTP." },
    { body: "What is a 'segmentation fault'?", options: ["Syntax error", "Memory access violation", "Network timeout", "Type mismatch"], ci: 1, topic: "Systems", diff: "Hard", exp: "A segfault occurs when a program accesses memory it's not allowed to." },
  ];
  const q = pool[Math.floor(Math.random() * pool.length)];
  return {
    id: `dyn_cs_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    subject: "Computer Science", topic: q.topic, difficulty: q.diff,
    body: q.body, options: q.options, correct_idx: q.ci, explanation: q.exp
  };
}

const dynamicGenerators = [generateMathQuestion, generateScienceQuestion, generateGeoQuestion, generateCSQuestion];

export const getRandomQuestions = (count) => {
  const questions = [];
  const shuffledStatic = shuffle(questionBank);

  for (let i = 0; i < count; i++) {
    if (Math.random() > 0.4 || shuffledStatic.length === 0) {
      const gen = dynamicGenerators[Math.floor(Math.random() * dynamicGenerators.length)];
      questions.push(gen());
    } else {
      questions.push(shuffledStatic.pop());
    }
  }
  return questions;
};
