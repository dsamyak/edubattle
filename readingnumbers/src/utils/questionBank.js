import { numberToWord, generateDistractors, shuffle, sgNames, sgObjects } from './numberWords';

// Dynamically generate the full 100-question bank
function getRangeForDifficulty(difficulty) {
  if (difficulty === 1) return { min: 0, max: 10 };
  if (difficulty === 2) return { min: 11, max: 40 };
  return { min: 41, max: 100 };
}

function randInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Generate questions for each type
function genCountChoose(id, difficulty) {
  const r = getRangeForDifficulty(difficulty);
  const correct = randInRange(r.min, r.max);
  const obj = pickRandom(sgObjects);
  const distractors = generateDistractors(correct, 3, r.min, r.max);
  return {
    id, type: 'count_choose_numeral', difficulty,
    questionText: `Count the ${obj}. How many are there?`,
    visual: 'objects', visualCount: correct, visualObject: obj,
    options: shuffle([correct, ...distractors].map(String)),
    correctAnswer: String(correct),
    hint1: `Try counting each ${obj.slice(0, -1)} one by one!`,
    hint2: `Start from 1 and count to the last ${obj.slice(0, -1)}.`,
    explanation: `There are ${correct} ${obj}. The number is ${correct} (${numberToWord(correct)}).`,
  };
}

function genNumeralToWord(id, difficulty) {
  const r = getRangeForDifficulty(difficulty);
  const num = randInRange(r.min, r.max);
  const correct = numberToWord(num);
  const dNums = generateDistractors(num, 3, r.min, r.max);
  return {
    id, type: 'numeral_to_word', difficulty,
    questionText: `What is the number word for "${num}"?`,
    options: shuffle([correct, ...dNums.map(n => numberToWord(n))]),
    correctAnswer: correct,
    hint1: 'Say the number out loud — how does it sound?',
    hint2: `This number has ${Math.floor(num / 10)} tens and ${num % 10} ones.`,
    explanation: `${num} is written as "${correct}".`,
  };
}

function genMatchNumeralWord(id, difficulty) {
  const r = getRangeForDifficulty(difficulty);
  const pairs = [];
  const used = new Set();
  while (pairs.length < 4) {
    const n = randInRange(r.min, r.max);
    if (!used.has(n)) { used.add(n); pairs.push({ numeral: String(n), word: numberToWord(n) }); }
  }
  return {
    id, type: 'match_numeral_word', difficulty,
    questionText: 'Match each numeral to its number word!',
    matchPairs: pairs,
    correctAnswer: pairs,
    hint1: 'Read each number aloud and find the matching word.',
    hint2: 'Look at the tens digit first to narrow it down.',
    explanation: pairs.map(p => `${p.numeral} = ${p.word}`).join(', '),
  };
}

function genTensOnesFill(id, difficulty) {
  const r = getRangeForDifficulty(difficulty);
  const num = randInRange(Math.max(r.min, 10), r.max);
  const t = Math.floor(num / 10);
  const o = num % 10;
  return {
    id, type: 'tens_ones_fill', difficulty,
    questionText: `___ tens and ${o} ones = ?`,
    visual: 'blocks', visualTens: t, visualOnes: o,
    options: shuffle([String(num), ...generateDistractors(num, 3, r.min, r.max).map(String)]),
    correctAnswer: String(num),
    hint1: `Count the tens sticks. Each one equals 10!`,
    hint2: `${t} tens = ${t * 10}. Now add ${o} ones.`,
    explanation: `${t} tens and ${o} ones = ${t * 10} + ${o} = ${num}.`,
  };
}

function genBase10Read(id, difficulty) {
  const r = getRangeForDifficulty(difficulty);
  const num = randInRange(Math.max(r.min, 10), r.max);
  const t = Math.floor(num / 10);
  const o = num % 10;
  return {
    id, type: 'base10_read', difficulty,
    questionText: 'What number do these base-10 blocks show?',
    visual: 'blocks', visualTens: t, visualOnes: o,
    options: shuffle([String(num), ...generateDistractors(num, 3, r.min, r.max).map(String)]),
    correctAnswer: String(num),
    hint1: 'Each long stick = 10, each small cube = 1.',
    hint2: `Count: ${t} sticks and ${o} cubes.`,
    explanation: `${t} tens + ${o} ones = ${num}.`,
  };
}

function genBeforeAfter(id, difficulty) {
  const r = getRangeForDifficulty(difficulty);
  const num = randInRange(Math.max(r.min, 1), r.max - 1);
  const isBefore = Math.random() > 0.5;
  const correct = isBefore ? num - 1 : num + 1;
  return {
    id, type: 'before_after', difficulty,
    questionText: `What number comes ${isBefore ? 'before' : 'after'} ${num}?`,
    options: shuffle([String(correct), ...generateDistractors(correct, 3, r.min, r.max).map(String)]),
    correctAnswer: String(correct),
    hint1: `Think: ${num} ${isBefore ? 'minus' : 'plus'} 1.`,
    hint2: `Count: ... ${isBefore ? `?, ${num}` : `${num}, ?`} ...`,
    explanation: `The number ${isBefore ? 'before' : 'after'} ${num} is ${correct}.`,
  };
}

function genWordToNumeral(id, difficulty) {
  const r = getRangeForDifficulty(difficulty);
  const num = randInRange(r.min, r.max);
  const word = numberToWord(num);
  return {
    id, type: 'word_to_numeral', difficulty,
    questionText: `Write the numeral for "${word}".`,
    options: shuffle([String(num), ...generateDistractors(num, 3, r.min, r.max).map(String)]),
    correctAnswer: String(num),
    hint1: 'Break the word into parts — tens and ones.',
    hint2: `"${word}" — think about what each part means.`,
    explanation: `"${word}" = ${num}.`,
  };
}

function genOrdering(id, difficulty) {
  const r = getRangeForDifficulty(difficulty);
  const nums = [];
  while (nums.length < 4) {
    const n = randInRange(r.min, r.max);
    if (!nums.includes(n)) nums.push(n);
  }
  const sorted = [...nums].sort((a, b) => a - b);
  return {
    id, type: 'ordering', difficulty,
    questionText: `Arrange from smallest to largest: ${nums.join(', ')}`,
    orderNumbers: nums,
    correctAnswer: sorted.join(','),
    hint1: 'Find the smallest number first!',
    hint2: `Which is smaller: ${nums[0]} or ${nums[1]}?`,
    explanation: `Correct order: ${sorted.join(', ')}.`,
  };
}

function genTenframeRead(id, difficulty) {
  const num = randInRange(1, 10);
  return {
    id, type: 'tenframe_read', difficulty,
    questionText: 'How many counters are in the ten-frame?',
    visual: 'tenframe', visualCount: num,
    options: shuffle([String(num), ...generateDistractors(num, 3, 0, 10).map(String)]),
    correctAnswer: String(num),
    hint1: 'Count each filled circle in the frame.',
    hint2: 'The top row has 5 spots, the bottom row has 5 spots.',
    explanation: `There are ${num} counters in the ten-frame.`,
  };
}

function genWordProblem(id, difficulty) {
  const r = getRangeForDifficulty(difficulty);
  const num = randInRange(r.min, r.max);
  const name = pickRandom(sgNames);
  const obj = pickRandom(sgObjects);
  const word = numberToWord(num);
  const variant = Math.random();
  let questionText;
  if (variant < 0.5) {
    questionText = `${name} has ${word} ${obj}. Write this as a numeral.`;
  } else {
    questionText = `There are ${num} ${obj} on the table. Write this number in words.`;
  }
  const isWordAnswer = variant >= 0.5;
  const correct = isWordAnswer ? word : String(num);
  const distractors = isWordAnswer
    ? generateDistractors(num, 3, r.min, r.max).map(n => numberToWord(n))
    : generateDistractors(num, 3, r.min, r.max).map(String);
  return {
    id, type: 'word_problem', difficulty,
    questionText,
    options: shuffle([correct, ...distractors]),
    correctAnswer: correct,
    hint1: 'Read the question carefully — what is being asked?',
    hint2: `The key number in this problem is ${isWordAnswer ? num : word}.`,
    explanation: `${name} has ${num} (${word}) ${obj}.`,
  };
}

const generators = [
  genCountChoose, genNumeralToWord, genMatchNumeralWord, genTensOnesFill,
  genBase10Read, genBeforeAfter, genWordToNumeral, genOrdering, genTenframeRead, genWordProblem,
];

// Distribution: 10 questions per type, mixed difficulties
// 4 easy, 4 medium, 2 hard per type (total 35e, 38m, 27h approximated)
const diffDist = [1,1,1,1,2,2,2,2,3,3];

export function generateQuestionBank() {
  const bank = [];
  let qid = 1;
  generators.forEach((gen, gi) => {
    diffDist.forEach(diff => {
      bank.push(gen(`Q${gi + 1}_${String(qid).padStart(3, '0')}`, diff));
      qid++;
    });
  });
  return shuffle(bank);
}

// Generate a smaller practice set (10 questions, easier)
export function generatePracticeSet() {
  const practice = [];
  let qid = 1;
  // 1 question per type, easy difficulty
  generators.forEach((gen, gi) => {
    practice.push(gen(`P${gi + 1}_${String(qid).padStart(3, '0')}`, 1));
    qid++;
  });
  return shuffle(practice);
}
