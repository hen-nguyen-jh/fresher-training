import { generateRandomId } from './utils.js';

export class Tree {
  root = null;

  initTree(question) {
    this.root = question;
  }

  delete() {
    if (this.root) {
      this.root.delete();
      this.root = null;
    }
  }
}

export class Question {
  value = '';
  id = '';
  answers = [];
  previousAnswer = null;

  constructor(
    value = 'Default question',
    id = generateRandomId(),
    previousAnswer = null
  ) {
    this.value = value;
    this.id = id;
    this.previousAnswer = previousAnswer;
  }

  addAnswer(answer) {
    if (!answer) {
      throw new Error('Invalid answer');
    }
    this.answers.push(answer);
  }

  removeAnswer(answer) {
    if (!answer) {
      throw new Error('Invalid answer');
    }
    this.answers = this.answers.filter((a) => a.id !== answer.id);
  }

  delete() {
    if (this.answers) {
      console.log('deleting answers...');
      this.answers.forEach((a) => a.delete());
    }
    if (this.previousAnswer) {
      console.log('deleting question...');
      const previous = this.previousAnswer;
      previous.nextQuestion = null;
    }
  }
}

export class Answer {
  value = '';
  id = '';
  previousQuestion = null;
  nextQuestion = null;

  constructor(
    value = 'Default answer',
    id = generateRandomId(),
    previousQuestion = null
  ) {
    this.value = value;
    this.id = id;
    this.previousQuestion = previousQuestion;
  }

  addQuestion(question) {
    if (!question) {
      throw new Error('Invalid question');
    }
    this.nextQuestion = question;
  }

  removeQuestion() {
    if (this.nextQuestion) {
      this.nextQuestion.delete();
      this.nextQuestion = null;
    }
  }

  delete() {
    if (this.nextQuestion) {
      console.log('deleting next questions...');
      this.nextQuestion.delete();
      this.nextQuestion = null;
    }
    // console.log('previous question', this.previousQuestion);
    if (this.previousQuestion) {
      console.log('remove self from previous question...');
      this.previousQuestion.removeAnswer(this);
    }
  }
}
