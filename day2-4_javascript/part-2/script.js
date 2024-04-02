import { isEmailMatch, isPasswordMatch } from './validator.js';

const emailInput = document.getElementById('emailInput');
emailInput.addEventListener('input', (event) => {
  const value = event.target.value;
  console.log('email: ', value);
  const valid = isEmailMatch(value);

  const statusEl = document.getElementById('emailValidIndicator');
  if (valid) {
    statusEl.textContent = 'Valid';
    statusEl.style.background = 'forestgreen';
  } else {
    statusEl.textContent = 'Invalid';
    statusEl.style.background = 'crimson';
  }
});

const passwordInput = document.getElementById('passwordInput');
passwordInput.addEventListener('input', (event) => {
  const value = event.target.value;
  console.log('password: ', value);
  const valid = isPasswordMatch(value);

  const statusEl = document.getElementById('passwordValidIndicator');
  if (valid) {
    statusEl.textContent = 'Valid';
    statusEl.style.background = 'forestgreen';
  } else {
    statusEl.textContent = 'Invalid';
    statusEl.style.background = 'crimson';
  }
});
