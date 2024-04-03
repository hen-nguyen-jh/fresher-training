let selectedMethod = 'loop';

let methodUsed = 'None';
let numbersInput = '';
let numbers = [1, 2, 2, 3, 4, 4, 4, 5, 6];
let result = [];

const input = document.getElementById('numbersInput');
input.addEventListener('input', onNumbersChange);
const submit = document.getElementById('submit');
submit.addEventListener('click', onSubmit);

function removeDuplicateWithLoop(numbers) {
  methodUsed = 'With Loop';
  const result = [];
  numbers.forEach((number) => {
    if (!result.includes(number)) {
      result.push(number);
    }
  });
  return result;
}

function removeDuplicateWithSet(numbers) {
  methodUsed = 'With Set';
  const result = [...new Set(numbers)];
  return result;
}

function removeDuplicateWithIndexOf(numbers) {
  methodUsed = 'With indexOf';
  const result = numbers.filter(
    (item, index) => numbers.indexOf(item) === index
  );
  return result;
}

function removeDuplicateWithObject(numbers) {
  methodUsed = 'With Object';
  const obj = {};
  numbers.forEach((number) => {
    obj[number] = true;
  });
  return Object.keys(obj);
}

function render() {
  const method = document.getElementById('method');
  const originalDisplay = document.getElementById('original-numbers-container');
  const resultDisplay = document.getElementById('remove-duplicate-container');

  const originalText = numbers.join(', ');
  const resultText = result.join(', ');

  originalDisplay.textContent = originalText;
  resultDisplay.textContent = resultText;
  method.textContent = methodUsed;
}

function onNumbersChange(event) {
  numbersInput = event.target.value;
  numbers = [];

  numbersInput.split(',').forEach((number) => {
    numbers.push(parseInt(number));
  });
}

function onSubmit() {
  process();
  render();
}

function process() {
  result = removeDuplicate(numbers, selectedMethod);
}

const REMOVE_DUPLICATE_METHOD = {
  LOOP: 'loop',
  SET: 'set',
  INDEX_OF: 'indexOf',
  OBJECT: 'object',
};
// make the object immutable
Object.freeze(REMOVE_DUPLICATE_METHOD);
function removeDuplicate(numbers, method) {
  switch (method) {
    case REMOVE_DUPLICATE_METHOD.LOOP:
      return removeDuplicateWithLoop(numbers);
    case REMOVE_DUPLICATE_METHOD.SET:
      return removeDuplicateWithSet(numbers);
    case REMOVE_DUPLICATE_METHOD.INDEX_OF:
      return removeDuplicateWithIndexOf(numbers);
    case REMOVE_DUPLICATE_METHOD.OBJECT:
      return removeDuplicateWithObject(numbers);
    default:
      throw new Error('Invalid method');
  }
}

const methodSelects = document.querySelectorAll('.method-item');
methodSelects.forEach((methodSelect) => {
  methodSelect.addEventListener('click', () => {
    selectedMethod = methodSelect.getAttribute('data-method');
    methodSelects.forEach((methodSelect) => {
      methodSelect.classList.remove('active');
    });
    methodSelect.classList.add('active');
    process();
    render();
  });
});

// Run
process();
render();
