(function (window, document) {
  // body
  const mainPhotos = document.querySelectorAll('.main-photo');
  const smallPhotos = document.querySelectorAll('.small-photo');

  let currentPhoto = 0;

  mainPhotos[currentPhoto].classList.add('selected');
  smallPhotos[currentPhoto].classList.add('selected');

  const nextBtn = document.querySelector('.navigate.next');
  const prevBtn = document.querySelector('.navigate.prev');

  nextBtn.addEventListener('click', nextPhoto);
  prevBtn.addEventListener('click', prevPhoto);

  smallPhotos.forEach((photo, index) => {
    photo.addEventListener('click', () => selectPhoto(index));
  });

  function selectPhoto(index) {
    selectMainPhoto(index);
    selectSmallPhoto(index);
    currentPhoto = index;
  }
  function selectMainPhoto(index) {
    mainPhotos[currentPhoto].classList.remove('fade-out');
    mainPhotos[currentPhoto].classList.remove('selected');
    mainPhotos[index].classList.add('selected');
  }
  function selectSmallPhoto(index) {
    smallPhotos[currentPhoto].classList.remove('selected');
    smallPhotos[index].classList.add('selected');
  }
  function nextPhoto() {
    selectPhoto((currentPhoto + 1) % mainPhotos.length);
  }
  function prevPhoto() {
    selectPhoto((currentPhoto - 1 + mainPhotos.length) % mainPhotos.length);
  }
})(window, document);
