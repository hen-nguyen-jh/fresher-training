const DEFAULT_NUMBERS = [
  7, 9, 3, 6, 2, 11, 18, 6, 9, 1, 11, 6, 18, 0, 17, 17, 17, 11, 15, 6, 19, 10,
  17, 18, 12, 13, 15, 9, 6, 12, 2, 7, 17, 13, 16, 8, 14, 15, 2, 3, 3, 13, 19,
  16, 0, 0, 0, 18, 8, 19, 1, 2, 16, 8, 3, 2, 10, 5, 17, 15, 1, 4, 8, 11, 18, 9,
  1, 15, 12, 10, 17, 11, 2, 13, 16, 13, 5, 2, 15, 18, 18, 0, 13, 11, 14, 1, 17,
  3, 3, 15, 16, 5, 1, 14, 14, 11, 18, 8, 5, 17,
];

const button = document.getElementById('submit');
button.addEventListener('click', () => {
  const input = document.getElementById('numbersInput');

  if (!input.value) {
    input.value = DEFAULT_NUMBERS.join(',');
  }

  let numbers = input.value.split(',').map((num) => parseInt(num));

  const { highestCount, allHighest, countObj } = findHighest(numbers);

  // Render
  const displayContainer = document.getElementById('displays-container');
  displayContainer.innerHTML = '';

  const equalCount = document.createElement('div');
  equalCount.style.gridColumn = '1 / 3';
  equalCount.classList.add('cell');
  equalCount.textContent = `Highest: ${allHighest.join(', ')}`;
  displayContainer.append(equalCount);

  const highestCell = document.createElement('div');
  highestCell.style.gridColumn = '1 / 3';
  highestCell.classList.add('cell');
  highestCell.textContent = `Highest count: ${highestCount}`;
  displayContainer.append(highestCell);
});

function findHighest(numbers) {
  let highest;
  let highestCount;
  const countObj = {};

  highest = numbers[0];
  highestCount = 1;
  countObj[numbers[0]] = 1;

  for (let i = 1; i < numbers.length; i++) {
    countObj[numbers[i]] = (countObj[numbers[i]] || 0) + 1;
    if (countObj[numbers[i]] > highestCount) {
      highest = numbers[i];
      highestCount = countObj[numbers[i]];
    }
  }
  // loop to find equal values
  const allHighest = [];
  for (const num in countObj) {
    if (countObj[num] === highestCount) {
      allHighest.push(num);
    }
  }

  return {
    highestCount,
    allHighest,
    countObj,
  };
}
