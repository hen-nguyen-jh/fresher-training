export class Question {
  constructor(value, answers, previousAnswer) {
    this.value = value;
    this.answers =
      answers?.map((answer) => {
        answer.question = this;
        return answer;
      }) || [];
    this.previousAnswer = previousAnswer || null;
  }

  addAnswer(answer) {
    if (answer) {
      answer.previousQuestion = this;
      this.answers.push(answer);
    }
  }

  getAnswer(index) {
    if (index < 0 || index >= this.answers.length) {
      throw new Error('Invalid index');
    }

    return this.answers[index] || null;
  }

  removeAnswerFromListByIndex(index) {
    const answer = this.getAnswer(index);
    this.answers = this.answers.filter((a) => a !== answer);
    return answer;
  }

  removeAnswerFromList(answer) {
    if (!answer) {
      throw new Error('Invalid answer');
    }

    this.answers = this.answers.filter((a) => a !== answer);
    return answer;
  }

  removeAnswerByIndex(index) {
    const answer = this.removeAnswerFromListByIndex(index);
    answer.selfRemove();
  }

  removeAnswer(answer) {
    this.removeAnswerFromList(answer);
    answer.selfRemove();
  }

  selfRemove() {
    this.answers.forEach((answer) => {
      answer.selfRemove();
    });
    this.previousAnswer.nextQuestion = null;
    delete this;
  }

  get previousQuestion() {
    return this.previousAnswer?.previousQuestion || null;
  }

  static create(question, answers, previousAnswer) {
    return new Question(question, answers, previousAnswer);
  }
}

export class Answer {
  constructor(value, nextQuestion, previousQuestion) {
    this.value = value;
    this.nextQuestion = nextQuestion || null;
    this.previousQuestion = previousQuestion || null;
  }

  addNextQuestion(question) {
    question.previousAnswer = this;
    this.nextQuestion = question || null;
  }

  removeNextQuestion() {
    this.nextQuestion.selfRemove();
    this.nextQuestion = null;
  }

  selfRemove() {
    if (this.nextQuestion) {
      this.nextQuestion.selfRemove();
    }
    if (this.previousQuestion) {
      this.previousQuestion.removeAnswerFromList(this);
    }
    delete this;
  }

  static create(answer, nextQuestion, previousQuestion) {
    return new Answer(answer, nextQuestion, previousQuestion);
  }
}
