import { Answer, Question, Tree } from './lib.js';
import { generateRandomId } from './utils.js';

// demo program
const tree = new Tree();

const rootQuestionId = generateRandomId();
const rootQuestion = new Question('What do you do?', rootQuestionId);

tree.initTree(rootQuestion);

const rootAnswer1Id = generateRandomId();
const rootAnswer1 = new Answer('Software Engineer', rootAnswer1Id);
const rootAnswer1QuestionId = generateRandomId();
const rootAnswer1Question = new Question(
  'Which tech stack do you use?',
  rootAnswer1QuestionId
);
rootAnswer1.addQuestion(rootAnswer1Question);

const rootAnswer1QuestionAnswer1Id = generateRandomId();
const rootAnswer1QuestionAnswer1 = new Answer(
  'React',
  rootAnswer1QuestionAnswer1Id
);
rootAnswer1Question.addAnswer(rootAnswer1QuestionAnswer1);

const rootAnswer1QuestionAnswer2Id = generateRandomId();
const rootAnswer1QuestionAnswer2 = new Answer(
  'Vue',
  rootAnswer1QuestionAnswer2Id
);
rootAnswer1Question.addAnswer(rootAnswer1QuestionAnswer2);

const rootAnswer2Id = generateRandomId();
const rootAnswer2 = new Answer('Doctor', rootAnswer2Id, rootQuestion);
const rootAnswer2QuestionId = generateRandomId();
const rootAnswer2Question = new Question(
  'Do you love your patient?',
  rootAnswer2QuestionId
);
rootAnswer2.addQuestion(rootAnswer2Question);

const rootAnswer2QuestionAnswer1Id = generateRandomId();
const rootAnswer2QuestionAnswer1 = new Answer(
  'Yes',
  rootAnswer2QuestionAnswer1Id
);
rootAnswer2Question.addAnswer(rootAnswer2QuestionAnswer1);

const rootAnswer2QuestionAnswer2Id = generateRandomId();
const rootAnswer2QuestionAnswer2 = new Answer(
  'No',
  rootAnswer2QuestionAnswer2Id
);
rootAnswer2Question.addAnswer(rootAnswer2QuestionAnswer2);

const rootAnswer3Id = generateRandomId();
const rootAnswer3 = new Answer('Teacher', rootAnswer3Id, rootQuestion);
const rootAnswer3QuestionId = generateRandomId();
const rootAnswer3Question = new Question(
  'Which subject?',
  rootAnswer3QuestionId
);
rootAnswer3.addQuestion(rootAnswer3Question);

const rootAnswer3QuestionAnswer1Id = generateRandomId();
const rootAnswer3QuestionAnswer1 = new Answer(
  'Math',
  rootAnswer3QuestionAnswer1Id
);
rootAnswer3Question.addAnswer(rootAnswer3QuestionAnswer1);

const rootAnswer3QuestionAnswer2Id = generateRandomId();
const rootAnswer3QuestionAnswer2 = new Answer(
  'Biology',
  rootAnswer3QuestionAnswer2Id
);
rootAnswer3Question.addAnswer(rootAnswer3QuestionAnswer2);

rootQuestion.addAnswer(rootAnswer1);
rootQuestion.addAnswer(rootAnswer2);
rootQuestion.addAnswer(rootAnswer3);

console.log('tree', tree);

// demoFinding();

// demoTreeDelete();
// demoDeleteLevel1Answer();
// demoDeleteLevel1Question();
// demoDeleteLevel2Answer();

function demoFinding() {
  let found;

  // find root question
  found = tree.find(rootQuestionId);
  console.log('found', found);

  // find root question's answers
  found = tree.find(rootAnswer1Id);
  console.log('found', found);

  found = tree.find(rootAnswer2Id);
  console.log('found', found);

  found = tree.find(rootAnswer3Id);
  console.log('found', found);

  // find answer 1 question and its answers
  found = tree.find(rootAnswer1QuestionId);
  console.log('found', found);

  found = tree.find(rootAnswer1QuestionAnswer1Id);
  console.log('found', found);

  found = tree.find(rootAnswer1QuestionAnswer2Id);
  console.log('found', found);

  // find answer 2 question and its answers
  found = tree.find(rootAnswer2QuestionId);
  console.log('found', found);

  found = tree.find(rootAnswer2QuestionAnswer1Id);
  console.log('found', found);

  found = tree.find(rootAnswer2QuestionAnswer2Id);
  console.log('found', found);

  // find answer 3 question and its answers
  found = tree.find(rootAnswer3QuestionId);
  console.log('found', found);

  found = tree.find(rootAnswer3QuestionAnswer1Id);
  console.log('found', found);

  found = tree.find(rootAnswer3QuestionAnswer2Id);
  console.log('found', found);
}

function demoTreeDelete() {
  tree.delete();
  console.log(tree);
}

function demoDeleteLevel1Answer() {
  const answer = tree.find(rootAnswer1Id);
  answer.delete();
  console.log(tree);
}

function demoDeleteLevel1Question() {
  const question = tree.find(rootAnswer1QuestionId);
  question.delete();
  console.log(tree);
}

function demoDeleteLevel2Answer() {
  const answer = tree.find(rootAnswer1QuestionAnswer1Id);
  answer.delete();
  console.log(tree);
}
