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
      answer.question = this;
      this.answers.push(answer);
    }
  }
  removeAnswer(answer) {
    if (answer) {
      this.answers.splice(this.answers.indexOf(answer), 1);
    }
  }
  selfRemove() {
    this.answer.removeNext();
  }
  get previousQuestion() {
    return this.answer?.question || null;
  }
  static create(question, answers, previousAnswer) {
    return new Question(question, answers, previousAnswer);
  }
}

export class Answer {
  constructor(value, nextQuestion, parentQuestion) {
    this.value = value;
    this.nextQuestion = nextQuestion || null;
    this.question = parentQuestion || null;
  }

  addNext(question) {
    question.answer = this;
    this.nextQuestion = question || null;
  }
  removeNext() {
    this.nextQuestion = null;
  }
  selfRemove() {
    this.question.removeAnswer(this);
  }
  static create(answer, nextQuestion, parentQuestion) {
    return new Answer(answer, nextQuestion, parentQuestion);
  }
}
