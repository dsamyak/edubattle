export const questionBank = [
  // --- Data Structures & Algorithms ---
  {
    id: "q1",
    subject: "Computer Science",
    topic: "Data Structures & Algorithms",
    difficulty: "Medium",
    body: "What is the worst-case time complexity of QuickSort?",
    options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
    correct_idx: 1,
    explanation: "QuickSort's worst-case time complexity is O(n^2), which occurs when the pivot chosen is consistently the smallest or largest element."
  },
  {
    id: "q2",
    subject: "Computer Science",
    topic: "Data Structures & Algorithms",
    difficulty: "Easy",
    body: "Which data structure follows the Last-In-First-Out (LIFO) principle?",
    options: ["Queue", "Linked List", "Stack", "Tree"],
    correct_idx: 2,
    explanation: "A Stack follows LIFO, meaning the last element added is the first one to be removed."
  },
  {
    id: "q3",
    subject: "Computer Science",
    topic: "Data Structures & Algorithms",
    difficulty: "Hard",
    body: "In a Red-Black Tree, what is the maximum height of the tree with n internal nodes?",
    options: ["2 log(n + 1)", "log(n)", "n/2", "n log(n)"],
    correct_idx: 0,
    explanation: "A Red-Black tree with n internal nodes has height at most 2 log(n + 1)."
  },
  {
    id: "q4",
    subject: "Computer Science",
    topic: "Data Structures & Algorithms",
    difficulty: "Medium",
    body: "Which algorithm is used to find the shortest path in a graph with non-negative edge weights?",
    options: ["Depth First Search", "Kruskal's Algorithm", "Dijkstra's Algorithm", "Bellman-Ford Algorithm"],
    correct_idx: 2,
    explanation: "Dijkstra's algorithm finds the shortest path from a source node to all other nodes in a graph with non-negative weights."
  },

  // --- Programming Fundamentals ---
  {
    id: "q5",
    subject: "Computer Science",
    topic: "Programming Fundamentals",
    difficulty: "Easy",
    body: "What does OOP stand for?",
    options: ["Object-Oriented Programming", "Only Output Process", "Operational Open Protocol", "Overloaded Operator Pattern"],
    correct_idx: 0,
    explanation: "OOP stands for Object-Oriented Programming, a paradigm based on the concept of 'objects'."
  },
  {
    id: "q6",
    subject: "Computer Science",
    topic: "Programming Fundamentals",
    difficulty: "Medium",
    body: "Which of the following is NOT a pillar of Object-Oriented Programming?",
    options: ["Inheritance", "Polymorphism", "Encapsulation", "Compilation"],
    correct_idx: 3,
    explanation: "Compilation is a step in translating code to machine language, not an OOP concept. The 4 pillars are Abstraction, Encapsulation, Inheritance, and Polymorphism."
  },
  {
    id: "q7",
    subject: "Computer Science",
    topic: "Programming Fundamentals",
    difficulty: "Hard",
    body: "In languages like C++ or Java, what is the purpose of the 'volatile' keyword?",
    options: ["To prevent the variable from being modified", "To indicate the variable may be modified by an external thread/hardware unexpectedly", "To optimize the variable for faster CPU cache access", "To automatically garbage collect the variable"],
    correct_idx: 1,
    explanation: "'volatile' tells the compiler that the variable's value can change at any time without any action being taken by the code the compiler finds nearby, preventing certain optimizations."
  },

  // --- Networking ---
  {
    id: "q8",
    subject: "Computer Science",
    topic: "Networking",
    difficulty: "Easy",
    body: "What does HTTP stand for?",
    options: ["HyperText Transfer Protocol", "Hyperlink Transfer Technology", "HyperText Transmission Process", "HyperText Test Protocol"],
    correct_idx: 0,
    explanation: "HTTP stands for HyperText Transfer Protocol."
  },
  {
    id: "q9",
    subject: "Computer Science",
    topic: "Networking",
    difficulty: "Medium",
    body: "Which layer of the OSI model is responsible for routing packets across networks?",
    options: ["Transport Layer", "Network Layer", "Data Link Layer", "Application Layer"],
    correct_idx: 1,
    explanation: "The Network Layer (Layer 3) handles routing and logical addressing (e.g., IP)."
  },
  {
    id: "q10",
    subject: "Computer Science",
    topic: "Networking",
    difficulty: "Hard",
    body: "In the TCP 3-way handshake, what is the sequence of flags exchanged?",
    options: ["SYN, ACK, SYN-ACK", "SYN, SYN-ACK, ACK", "ACK, SYN-ACK, SYN", "SYN, FIN, ACK"],
    correct_idx: 1,
    explanation: "The initiator sends SYN, the receiver replies with SYN-ACK, and the initiator acknowledges with ACK."
  },

  // --- Operating Systems ---
  {
    id: "q11",
    subject: "Computer Science",
    topic: "Operating Systems",
    difficulty: "Medium",
    body: "What is a 'race condition'?",
    options: ["When two threads are waiting for each other indefinitely", "When a process consumes all CPU resources", "When the output depends on the unpredictable sequence of execution of threads/processes", "When a process terminates unexpectedly"],
    correct_idx: 2,
    explanation: "A race condition occurs when concurrent threads access shared data and the final outcome depends on the timing of their execution."
  },
  {
    id: "q12",
    subject: "Computer Science",
    topic: "Operating Systems",
    difficulty: "Easy",
    body: "Which OS component is responsible for managing hardware resources?",
    options: ["The Shell", "The Kernel", "The Compiler", "The GUI"],
    correct_idx: 1,
    explanation: "The Kernel is the core component of an OS that manages CPU, memory, and peripheral devices."
  },
  {
    id: "q13",
    subject: "Computer Science",
    topic: "Operating Systems",
    difficulty: "Hard",
    body: "Which of the following is a condition required for a deadlock to occur (Coffman conditions)?",
    options: ["Preemption", "Circular Wait", "Sharable Resources", "Multithreading"],
    correct_idx: 1,
    explanation: "The 4 Coffman conditions for deadlock are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait."
  },

  // --- Databases ---
  {
    id: "q14",
    subject: "Computer Science",
    topic: "Databases",
    difficulty: "Easy",
    body: "What does SQL stand for?",
    options: ["Simple Query Language", "Structured Question Language", "Structured Query Language", "System Query Logic"],
    correct_idx: 2,
    explanation: "SQL stands for Structured Query Language."
  },
  {
    id: "q15",
    subject: "Computer Science",
    topic: "Databases",
    difficulty: "Medium",
    body: "In database transactions, what does the 'I' in ACID stand for?",
    options: ["Integrity", "Isolation", "Index", "Idempotence"],
    correct_idx: 1,
    explanation: "ACID stands for Atomicity, Consistency, Isolation, and Durability."
  },

  // --- Web Development ---
  {
    id: "q16",
    subject: "Computer Science",
    topic: "Web Development",
    difficulty: "Medium",
    body: "What is the purpose of Cross-Origin Resource Sharing (CORS)?",
    options: ["To prevent SQL injection", "To allow restricted resources on a web page to be requested from another domain", "To encrypt HTTP traffic", "To speed up page loading via CDN"],
    correct_idx: 1,
    explanation: "CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served."
  },
  {
    id: "q17",
    subject: "Computer Science",
    topic: "Web Development",
    difficulty: "Easy",
    body: "Which HTML tag is used to reference an external JavaScript file?",
    options: ["<script>", "<link>", "<js>", "<javascript>"],
    correct_idx: 0,
    explanation: "The <script> tag, typically with the 'src' attribute, is used to include external JavaScript."
  },
  {
    id: "q18",
    subject: "Computer Science",
    topic: "Web Development",
    difficulty: "Hard",
    body: "What is 'event delegation' in JavaScript?",
    options: ["A way to assign multiple events to one element", "Passing events from server to client via WebSockets", "Attaching a single event listener to a parent element to manage events for its children", "Preventing the default action of an event"],
    correct_idx: 2,
    explanation: "Event delegation leverages event bubbling to handle events on multiple child elements via a single listener attached to their common ancestor."
  }
];

export const generateDynamicMathQuestion = () => {
  const operations = ['+', '-', '*'];
  const op = operations[Math.floor(Math.random() * operations.length)];
  let num1, num2, answer;
  let difficulty = "Easy";
  
  if (op === '+') {
    num1 = Math.floor(Math.random() * 100) + 20;
    num2 = Math.floor(Math.random() * 100) + 20;
    answer = num1 + num2;
  } else if (op === '-') {
    num1 = Math.floor(Math.random() * 100) + 50;
    num2 = Math.floor(Math.random() * num1);
    answer = num1 - num2;
  } else {
    num1 = Math.floor(Math.random() * 12) + 2;
    num2 = Math.floor(Math.random() * 12) + 2;
    answer = num1 * num2;
    difficulty = "Medium";
  }

  // Generate 3 wrong options
  const wrong1 = answer + Math.floor(Math.random() * 10) + 1;
  const wrong2 = answer - Math.floor(Math.random() * 10) - 1;
  const wrong3 = answer + (Math.random() > 0.5 ? 10 : -10);
  
  let options = [answer, wrong1, wrong2, wrong3];
  
  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  const correct_idx = options.indexOf(answer);

  return {
    id: `dyn_${Date.now()}_${Math.floor(Math.random()*1000)}`,
    subject: "Mathematics",
    topic: "Mental Arithmetic",
    difficulty,
    body: `What is the result of: ${num1} ${op} ${num2}?`,
    options: options.map(String),
    correct_idx,
    explanation: `The correct calculation is ${num1} ${op} ${num2} = ${answer}.`
  };
};

export const getRandomQuestions = (count) => {
  const questions = [];
  
  // Mix static and dynamic questions
  const shuffledStatic = [...questionBank].sort(() => 0.5 - Math.random());
  
  for (let i = 0; i < count; i++) {
    // 50% chance of dynamic math question, or if we run out of static questions
    if (Math.random() > 0.5 || shuffledStatic.length === 0) {
      questions.push(generateDynamicMathQuestion());
    } else {
      questions.push(shuffledStatic.pop());
    }
  }
  
  return questions;
};
