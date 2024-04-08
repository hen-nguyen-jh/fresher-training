import { Answer, Question, Tree } from './lib.js';
import { generateRandomId } from './utils.js';

// demo program
const tree = new Tree();

const rootQuestionId = generateRandomId();
const rootQuestion = new Question('What do you do?', rootQuestionId);

tree.initTree(rootQuestion);

const rootAnswer1Id = generateRandomId();
const rootAnswer2Id = generateRandomId();
const rootAnswer3Id = generateRandomId();

const rootAnswer1 = new Answer('Root Answer 1', rootAnswer1Id, rootQuestion);
const rootAnswer2 = new Answer('Root Answer 2', rootAnswer2Id, rootQuestion);
const rootAnswer3 = new Answer('Root Answer 3', rootAnswer3Id, rootQuestion);

rootQuestion.addAnswer(rootAnswer1);
rootQuestion.addAnswer(rootAnswer2);
rootQuestion.addAnswer(rootAnswer3);

tree.delete();

console.log(tree);
