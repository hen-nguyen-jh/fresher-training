import { generateRandomId } from './utils.js';

export class Tree {
  root = null;

  initTree(question) {
    this.root = question;
  }

  delete() {
    if (this.root) {
      this.root = null;
    }
  }

  find(id) {
    if (!id) {
      throw new Error('Invalid id');
    }

    if (this.root && this.root.id === id) {
      return this.root;
    } else {
      return this.root.find(id);
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

  find(id) {
    if (this.id === id) {
      return this;
    }

    for (const answer of this.answers) {
      if (answer.id === id) {
        return answer;
      }

      const found = answer.find(id);
      if (found) {
        return found;
      }
    }
  }

  addAnswer(answer) {
    if (!answer) {
      throw new Error('Invalid answer');
    }
    answer.previousQuestion = this;
    this.answers.push(answer);
  }

  removeAnswer(answer) {
    if (!answer) {
      throw new Error('Invalid answer');
    }
    this.answers = this.answers.filter((a) => a.id !== answer.id);
  }

  delete() {
    if (this.previousAnswer) {
      this.previousAnswer.nextQuestion = null;
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

  find(id) {
    if (this.id === id) {
      return this;
    } else if (this.nextQuestion) {
      return this.nextQuestion.find(id);
    } else {
      return null;
    }
  }

  addQuestion(question) {
    if (!question) {
      throw new Error('Invalid question');
    }
    this.nextQuestion = question;
    question.previousAnswer = this;
  }

  removeQuestion() {
    this.nextQuestion = null;
  }

  delete() {
    if (this.previousQuestion) {
      this.previousQuestion.removeAnswer(this);
    }
  }
}
