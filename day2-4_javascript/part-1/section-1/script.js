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
  // result = removeDuplicateWithLoop(numbers);
  // result = removeDuplicateWithSet(numbers);
  // result = removeDuplicateWithIndexOf(numbers);
  result = removeDuplicateWithObject(numbers);
}

// Run
process();
render();
