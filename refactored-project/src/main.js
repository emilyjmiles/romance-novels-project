const coverImage = document.querySelector('.cover-image');
const title = document.querySelector('.cover-title');
const tagline1 = document.querySelector('.tagline-1');
const tagline2 = document.querySelector('.tagline-2');

const randomCoverButton = document.querySelector('.random-cover-button');
const saveRandomButton = document.querySelector('.save-random-button');
const saveMyButton = document.querySelector('.save-my-button');
const viewSavedButton = document.querySelector('.view-saved-button');
const makeCoverButton = document.querySelector('.make-new-button');
const editCoverButton = document.querySelector('.edit-cover-button');
const submitNewBookButton = document.querySelector('.create-new-book-button');
const homeButton = document.querySelector('.home-button');

const homeView = document.querySelector('.home-view');
const formView = document.querySelector('.form-view');
const coverPreviewView = document.querySelector('.preview-cover-view');
const savedView = document.querySelector('.saved-view');
const saveCoverView = document.querySelector('.saved-covers-section');

const noSavedCovers = document.querySelector('.no-saved-message');
const imageInputError = document.querySelector('.image-input-error');
const titleInputError = document.querySelector('.title-input-error');
const desc1InputError = document.querySelector('.desc1-input-error');
const desc2InputError = document.querySelector('.desc2-input-error');

const imageInput = document.querySelector('.user-cover');
const titleInput = document.querySelector('.user-title');
const descriptor1Input = document.querySelector('.user-desc1');
const descriptor2Input = document.querySelector('.user-desc2');

const inputValues = [imageInput, titleInput, descriptor1Input, descriptor2Input];
const errors = [imageInputError, titleInputError, desc1InputError, desc2InputError];
const showFormErrors = [];
const hideFormErrors = [];
const savedCovers = [];
let randomCover;
let myCover;

window.addEventListener('load', displayHomePage);
randomCoverButton.addEventListener('click', displayRandomCover);
makeCoverButton.addEventListener('click', displayCoverForm);
viewSavedButton.addEventListener('click', displaySavedCovers);
homeButton.addEventListener('click', displayHomePage);
submitNewBookButton.addEventListener('click', createNewBook);
editCoverButton.addEventListener('click', displayCoverForm);
saveRandomButton.addEventListener('click', saveRandomCover);
saveMyButton.addEventListener('click', saveMyCover);

function hideElements(elements) {
  elements.forEach(element => element.classList.add('hidden'));
};

function showElements(elements) {
  elements.forEach(element => element.classList.remove('hidden'));
};

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayHomePage() {
  showElements([homeView, randomCoverButton, saveRandomButton, viewSavedButton, makeCoverButton]);
  hideElements([savedView, formView, coverPreviewView, homeButton, saveMyButton, editCoverButton, noSavedCovers]);
  displayRandomCover();
}

function displaySavedCovers() {
  showElements([savedView, homeButton, viewSavedButton, makeCoverButton]);
  hideElements([formView, coverPreviewView, homeView, randomCoverButton, saveRandomButton, saveMyButton, editCoverButton]);
  showSavedCoversSection();
}

function displayCoverForm() {
  showElements([formView, homeButton, viewSavedButton, makeCoverButton]);
  hideElements([coverPreviewView, homeView, savedView, randomCoverButton, saveRandomButton, saveMyButton, editCoverButton]);
}

function displayCoverPreview() {
  showElements([coverPreviewView, editCoverButton, saveMyButton, viewSavedButton, makeCoverButton]);
  hideElements([homeView, savedView, formView, randomCoverButton, homeButton, saveRandomButton, noSavedCovers]);
}

function displayRandomCover() {
  const coverImage = covers[getRandomIndex(covers)];
  const title = titles[getRandomIndex(titles)];
  const tagline1 = descriptors[getRandomIndex(descriptors)];
  const tagline2 = descriptors[getRandomIndex(descriptors)];
  randomCover = new Cover(coverImage, title, tagline1, tagline2);
  showCurrentCover(randomCover);
}

function showCurrentCover(cover) {
  coverImage.src = cover.cover;
  title.innerText = cover.title;
  tagline1.innerText = cover.tagline1;
  tagline2.innerText = cover.tagline2;
}

function validateForm() {
  errors.forEach((error, index) => {
    inputValues.forEach((input, i) => {
      if (input.value !== '' && index === i && !hideFormErrors.includes(error)) {
        error.innerHTML = '';
        hideFormErrors.push(error);
      }
      if (input.value === '' && index === i && !showFormErrors.includes(error)) {
        error.innerHTML = 'Please enter a valid input before submitting';
        showFormErrors.push(error);
      }
    });
  });

  showFormErrors.forEach((error, index) => {
    hideFormErrors.forEach(element => {
      if (error === element) {
        error.innerHTML = '';
        showFormErrors.splice(index, 1);
      }
    });
  });
}

function createNewBook(event) {
  event.preventDefault();
  validateForm();

  if (!showFormErrors.length) {
    makeMyBook();
    displayCoverPreview();
  }
}

function makeMyBook() {
  myCover = new Cover(imageInput.value, titleInput.value, descriptor1Input.value, descriptor2Input.value);
  showCurrentCover(myCover);
  coverPreviewView.innerHTML =
    `<section class="cover preview-cover">
      <img class="price-tag" src="./assets/price-tag.webp" alt="price tag">
      <img class="my-cover cover-image" src="${myCover.cover}" alt="${myCover.title}" width="500px" height="750px">
      <div class="cover-text">
        <h2 class="cover-title">${myCover.title}</h2>
        <h3 class="tag-desc tagline">A tale of <span class="tag-desc tagline-1">${myCover.tagline1}</span> and <span class="tag-desc tagline-2">${myCover.tagline2}</span></h3>
      </div>
    </section>`;
}

function saveInputs() {
  covers.push(imageInput.value);
  titles.push(titleInput.value);
  descriptors.push(descriptor1Input.value);
  descriptors.push(descriptor2Input.value);
}

function clearFormInputs() {
  inputValues.forEach(input => input.value = '');
  errors.forEach(error => error.innerHTML = '');
}

function saveRandomCover() {
  saveInputs();
  if (!savedCovers.includes(randomCover)) {
    savedCovers.push(randomCover);
  }
  if (savedCovers.length) {
    hideElements([noSavedCovers]);
  }
}

function saveMyCover() {
  saveInputs();
  clearFormInputs();
  if (!savedCovers.includes(myCover)) {
    savedCovers.push(myCover);
  }
  if (savedCovers.length) {
    hideElements([noSavedCovers]);
  }
}

function showSavedCoversSection() {
  saveCoverView.innerHTML = '';
  savedCovers.forEach(cover => {
    saveCoverView.innerHTML +=
      `<section class="mini-cover" id="${cover}" ondblclick="deleteSavedCovers(this)">
        <img class="price-tag" src="./assets/price-tag.webp" alt="price tag">
        <img class="mini-image" src="${cover.cover}" alt="${cover.title}">
        <div class="mini-text">
          <h2 class="mini-title" >${cover.title}</h2>
          <h3 class="mini-desc tagline">A tale of <span class="mini-desc tagline-1">${cover.tagline1}</span> and <span class="mini-desc tagline-2">${cover.tagline2}</span></h3>
        <div>
      </section>`;
  });
}

function deleteSavedCovers(div) {
  savedCovers.splice(div.id, 1);
  div.remove();
  if (!savedCovers.length) {
    showElements([noSavedCovers]);
  }
}