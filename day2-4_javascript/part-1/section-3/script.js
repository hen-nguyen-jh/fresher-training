import { Answer, Question } from './lib.js';

const initButton = document.getElementById('init-button');

let decisionTree;

initButton.addEventListener('click', function () {
  const input = document.getElementById('input-first-question');
  const firstQuestion = input.value;
  if (!firstQuestion) {
    render();
    return;
  }

  const rootQuestion = Question.create(firstQuestion);
  input.value = '';
  decisionTree = rootQuestion;

  render();
});

let currentQuestion;

const currentQuestionPreviousButton = document.getElementById(
  'current-question-previous-button'
);
currentQuestionPreviousButton.addEventListener('click', function () {
  if (currentQuestion?.previousQuestion) {
    currentQuestion = currentQuestion?.previousQuestion;
  } else {
    alert('This is the start of the tree');
  }

  render();
});

const currentQuestionValueDisplayer = document.getElementById(
  'current-question-value-displayer'
);
currentQuestionValueDisplayer.classList.add('tree-question');
const currentAnswersContainer = document.getElementById(
  'current-answers-container'
);
const answerTitle = document.getElementById('answer-title');

function render() {
  console.log('tree', decisionTree);
  const treeDisplayer = document.getElementById('tree-displayer');
  const treeElement = getRootNodeElement(decisionTree);

  currentQuestionValueDisplayer.textContent =
    currentQuestion?.value || 'Waiting';

  if (currentQuestion && currentQuestion.answers.length > 0) {
    answerTitle.style.display = 'block';
    currentAnswersContainer.innerHTML = '';
    currentQuestion.answers.forEach((answer) => {
      const li = document.createElement('li');
      li.textContent = answer.value;
      li.classList.add('tree-answer');
      li.addEventListener('click', function () {
        if (answer.nextQuestion) {
          currentQuestion = answer.nextQuestion;
        } else {
          alert('Empty tree reach its end');
        }
        render();
      });
      currentAnswersContainer.append(li);
    });
  } else {
    answerTitle.style.display = 'none';
  }

  treeDisplayer.innerHTML = '';
  treeDisplayer.append(treeElement);
}

function createQuestionElement(tree) {
  const questionElement = document.createElement('span');
  questionElement.classList.add('tree-question');
  questionElement.textContent = tree.value;

  return questionElement;
}

function createUpdateQuestionForm(tree) {
  const updateQuestionInput = document.createElement('input');
  updateQuestionInput.type = 'text';
  updateQuestionInput.placeholder = 'Enter new question';

  const updateQuestionButton = document.createElement('button');
  updateQuestionButton.textContent = 'Update';
  updateQuestionButton.addEventListener('click', () => {
    tree.value = updateQuestionInput.value;
    render();
    updateQuestionInput.value = '';
  });

  const cancelUpdateButton = document.createElement('button');
  cancelUpdateButton.textContent = 'Cancel';
  cancelUpdateButton.addEventListener('click', render);

  const updateQuestionForm = document.createElement('span');
  updateQuestionForm.style.display = 'none';
  updateQuestionForm.append(
    updateQuestionInput,
    updateQuestionButton,
    cancelUpdateButton
  );

  return updateQuestionForm;
}

function createDeleteButton(tree) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Remove';
  deleteButton.addEventListener('click', () => {
    decisionTree = null;
    render();
  });

  return deleteButton;
}

function createAddAnswerForm(tree) {
  const addAnswerInput = document.createElement('input');
  addAnswerInput.type = 'text';
  addAnswerInput.placeholder = 'Enter answer';

  const addAnswerButton = document.createElement('button');
  addAnswerButton.textContent = 'Add Answer';
  addAnswerButton.addEventListener('click', () => {
    const answerValue = addAnswerInput.value;
    if (!answerValue) {
      render();
      return;
    }

    tree.addAnswer(Answer.create(answerValue));
    render();
    addAnswerInput.value = '';
  });

  const addAnswerForm = document.createElement('span');
  addAnswerForm.append(addAnswerInput, addAnswerButton);

  return addAnswerForm;
}

function getRootNodeElement(tree) {
  if (!tree) {
    return '';
  }

  const listElement = document.createElement('ul');
  const itemElement = document.createElement('li');

  const questionElement = createQuestionElement(tree);
  const updateQuestionForm = createUpdateQuestionForm(tree);
  const deleteButton = createDeleteButton(tree);
  const addAnswerForm = createAddAnswerForm(tree);

  itemElement.append(
    questionElement,
    updateQuestionForm,
    deleteButton,
    addAnswerForm
  );

  listElement.append(itemElement, getAnswers(tree.answers));

  return listElement;
}

function getAnswers(answers) {
  const ulEl = document.createElement('ul');

  answers.forEach((answer) => {
    const answerEls = getAnswerElements(answer);
    const questionEls = getQuestionElements(answer);

    const seperator = document.createElement('span');
    seperator.textContent = ' -> ';

    const liEl = document.createElement('li');
    liEl.append(...answerEls);

    if (questionEls) {
      liEl.append(seperator, ...questionEls);
    }

    if (answer.nextQuestion) {
      const nextAnswers = getAnswers(answer.nextQuestion.answers);
      ulEl.append(liEl, nextAnswers);
    } else {
      ulEl.append(liEl);
    }
  });

  return ulEl;
}

function getAnswerElements(answer) {
  const answerSpan = document.createElement('span');
  answerSpan.classList.add('tree-answer');
  answerSpan.textContent = answer.value;

  const answerUpdateSpan = getAnswerUpdateSpanElement(answer, answerSpan);

  const removeSpan = document.createElement('span');
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', function () {
    answer.selfRemove();
    render();
  });
  removeSpan.append(removeButton);

  return [answerSpan, answerUpdateSpan, removeSpan];
}

function getAnswerUpdateSpanElement(answer, answerEl) {
  const answerUpdateSpan = document.createElement('span');
  answerUpdateSpan.style.display = 'none';
  answerEl.addEventListener('click', function () {
    answerUpdateSpan.style.display = 'inline';
    answerEl.style.display = 'none';
  });

  const answerUpdateInputSpan = document.createElement('input');
  answerUpdateInputSpan.type = 'text';
  answerUpdateInputSpan.value = answer.value;

  const answerUpdateButton = document.createElement('button');
  answerUpdateButton.textContent = 'Update';
  answerUpdateButton.addEventListener('click', function () {
    answer.value = answerUpdateInputSpan.value;
    answerEl.textContent = answer.value;

    answerUpdateSpan.style.display = 'none';
    answerEl.style.display = 'inline';

    render();
  });
  const cancelSpan = document.createElement('span');
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', function () {
    render();
  });
  cancelSpan.append(cancelButton);
  answerUpdateSpan.append(
    answerUpdateInputSpan,
    answerUpdateButton,
    cancelSpan
  );

  return answerUpdateSpan;
}

function getQuestionElements(answer) {
  const question = answer.nextQuestion;

  if (question) {
    const questionSpan = document.createElement('span');
    questionSpan.classList.add('tree-question');
    questionSpan.textContent = question.value;

    const questionUpdateSpan = getQuestionUpdateElement(question, questionSpan);

    // TODO: cleanup
    const removeButtonSpan = document.createElement('span');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function () {
      question.selfRemove();
      render();
    });
    removeButtonSpan.append(removeButton);

    const newAnswerSpan = getNewAnswerSpanElement(question, questionSpan);

    return [questionSpan, questionUpdateSpan, removeButton, newAnswerSpan];
  } else {
    const newQuestionSpan = document.createElement('span');

    const newQuestionInput = document.createElement('input');
    newQuestionInput.type = 'text';
    newQuestionInput.placeholder = 'Enter new question';

    const newQuestionButton = document.createElement('button');
    newQuestionButton.textContent = 'Add Question';
    newQuestionButton.addEventListener('click', function () {
      if (!newQuestionInput.value) {
        render();
        return;
      }

      const question = Question.create(newQuestionInput.value);
      answer.addNext(question);

      render();
    });

    newQuestionSpan.append(newQuestionInput, newQuestionButton);

    return [newQuestionSpan];
  }
}

function getQuestionUpdateElement(question, questionEl) {
  const questionUpdateSpan = document.createElement('span');
  questionUpdateSpan.style.display = 'none';
  questionEl.addEventListener('click', function () {
    questionUpdateSpan.style.display = 'inline';
    questionEl.style.display = 'none';
  });

  const questionUpdateInputSpan = document.createElement('input');
  questionUpdateInputSpan.type = 'text';
  questionUpdateInputSpan.value = question.value;

  const questionUpdateButton = document.createElement('button');
  questionUpdateButton.textContent = 'Update';
  questionUpdateButton.addEventListener('click', function () {
    question.value = questionUpdateInputSpan.value;
    questionEl.textContent = question.value;

    questionUpdateSpan.style.display = 'none';
    questionEl.style.display = 'inline';

    render();
  });
  questionUpdateSpan.append(questionUpdateInputSpan, questionUpdateButton);

  return questionUpdateSpan;
}

function getNewAnswerSpanElement(question, questionEl) {
  const frag = document.createDocumentFragment();

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter new answer';

  const button = document.createElement('button');
  button.textContent = 'Add Answer';
  button.onclick = function () {
    const answerValue = input.value;
    if (!answerValue) {
      render();
      return;
    }

    const answer = Answer.create(answerValue);
    question.addAnswer(answer);
    render();
  };

  const cancel = document.createElement('button');
  cancel.textContent = 'Cancel';
  cancel.onclick = render;

  frag.appendChild(input);
  frag.appendChild(button);
  frag.appendChild(cancel);

  return frag;
}

const startButton = document.getElementById('start-button');

startButton.addEventListener('click', function () {
  currentQuestion = decisionTree;
  render();
});

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', function () {
  decisionTree = null;
  render();
});

function createElementFromHtmlString(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.firstElementChild;
}
