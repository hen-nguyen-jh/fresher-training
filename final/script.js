// hamburger button
const nav = document.querySelector('nav.mobile');
const hamburgerButton = document.querySelector('#hamburger-button');
hamburgerButton.addEventListener('click', () => {
  if (nav.style.display === 'none') {
    nav.style.display = 'block';
    nav.classList.add('show');
  } else {
    nav.style.display = 'none';
    nav.classList.remove('show');
  }
});

document.addEventListener('click', (event) => {
  if (!nav.contains(event.target) && !hamburgerButton.contains(event.target)) {
    nav.classList.remove('show');
    setTimeout(() => {
      nav.style.display = 'none';
    }, 300);
  }
});

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

const mobileLiElements = document.querySelectorAll('nav.mobile > ul > li');
mobileLiElements.forEach((element) => {
  element.addEventListener('click', () => {
    nav.classList.remove('show');
    setTimeout(() => {
      nav.style.display = 'none';
    }, 300);
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

io.observe(document.getElementById('services'));
io.observe(document.getElementById('about-me__content'));

const projectItems = document.querySelectorAll('#project-list > li');

projectItems.forEach((projectItem) => io.observe(projectItem));
