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

  removeAnswer(answer) {
    if (answer) {
      this.answers = this.answers.filter((a) => a !== answer);
    }
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
    this.previousQuestion.removeAnswer(this);
    delete this;
  }

  static create(answer, nextQuestion, previousQuestion) {
    return new Answer(answer, nextQuestion, previousQuestion);
  }
}
