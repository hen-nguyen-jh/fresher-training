// random id generator
const CHARS = '0123456789abcdef';

export function generateRandomId() {
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return Date.now().toString(36) + id;
}
