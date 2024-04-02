let currentSlide = 0;

const slides = document.getElementById('slides');
const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');

nextButton.addEventListener('click', () => {
  if (currentSlide < 2) {
    currentSlide += 1;
  } else {
    currentSlide = 0;
  }
  console.log('next', currentSlide);
  slides.style.transform = `translateX(calc(${currentSlide} * (-1 * (100%) / 3)))`;
});
prevButton.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide -= 1;
  } else {
    currentSlide = 2;
  }
  console.log('prev', currentSlide);
  slides.style.transform = `translateX(calc(${currentSlide} * (-1 * (100%) / 3)))`;
});
