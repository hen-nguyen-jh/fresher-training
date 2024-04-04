// liElements
const liElements = document.querySelectorAll('nav > ul > li');

console.log(liElements);

liElements.forEach((liElement) => {
  liElement.addEventListener('click', () => {
    for (const li of liElements) {
      console.log('removing active...');
      li.classList.remove('active');
    }
    liElement.classList.add('active');
  });
});

// portfolios
const portfolioButtons = document.querySelectorAll('#portfolio-list > li');

portfolioButtons.forEach((button) => {
  button.addEventListener('click', () => {
    for (const button of portfolioButtons) {
      button.classList.remove('active');
    }
    button.classList.add('active');
  });
});

// animation on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});
const progressItems = document.querySelectorAll('.progress-segment');
console.log(progressItems);
progressItems.forEach((scoreItem) => io.observe(scoreItem));

io.observe(document.getElementById('section-2'));
io.observe(document.getElementById('section-3__content'));

const projectItems = document.querySelectorAll('#project-list > li');

let delay = 0;
projectItems.forEach((projectItem) => {
  io.observe(projectItem);
  projectItem.style.transitionDelay = `${delay}s`;
  delay += 0.1;
});
