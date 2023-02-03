const coverImage = document.querySelector('.cover-image');
const title = document.querySelector('.cover-title');
const tagline1 = document.querySelector('.tagline-1');
const tagline2 = document.querySelector('.tagline-2');

const randomCoverButton = document.querySelector('.random-cover-button');
const saveButton = document.querySelector('.save-cover-button');
const viewSavedButton = document.querySelector('.view-saved-button');
const makeCoverButton = document.querySelector('.make-new-button');
const homeButton = document.querySelector('.home-button');
const editCoverButton = document.querySelector('.edit-cover-button');
const submitNewBookButton = document.querySelector('.create-new-book-button');

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
let currentCover;
let myCover;

window.addEventListener('load', displayRandomCover);

randomCoverButton.addEventListener('click', displayRandomCover);
makeCoverButton.addEventListener('click', displayCoverForm);
viewSavedButton.addEventListener('click', displaySavedCovers);
homeButton.addEventListener('click', displayHomePage);
submitNewBookButton.addEventListener('click', createNewBook);
saveButton.addEventListener('click', saveCover);

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
  showElements([homeView, randomCoverButton, saveButton, viewSavedButton, makeCoverButton]);
  hideElements([savedView, formView, coverPreviewView, homeButton, editCoverButton]);
}

function displayRandomCover() {
  const coverImage = covers[getRandomIndex(covers)];
  const title = titles[getRandomIndex(titles)];
  const tagline1 = descriptors[getRandomIndex(descriptors)];
  const tagline2 = descriptors[getRandomIndex(descriptors)];
  currentCover = new Cover(coverImage, title, tagline1, tagline2);
  showCurrentCover();
}

function showSavedCoversSection() {
  saveCoverView.innerHTML = '';
  savedCovers.forEach(cover => {
    saveCoverView.innerHTML +=
      `<div class="mini-cover" id="${cover}" ondblclick="deleteSavedCovers(this)">
    <img class="mini-cover" src="${cover.cover}">
    <h2 class="cover-title" >${cover.title}</h2>
    <h3 class="tagline">A tale of <span class="tagline-1">${cover.tagline1}</span> and <span class="tagline-2">${cover.tagline2}</span></h3>
    <img class="price-tag" src="./assets/price.png">
    <img class="overlay" src="./assets/overlay.png">
    </div>`;
  });
}

function displaySavedCovers() {
  showElements([savedView, homeButton, viewSavedButton, makeCoverButton]);
  hideElements([formView, coverPreviewView, homeView, randomCoverButton, saveButton, editCoverButton]);
  showSavedCoversSection();
}

function displayCoverForm() {
  showElements([formView, homeButton, viewSavedButton, makeCoverButton]);
  hideElements([coverPreviewView, homeView, savedView, randomCoverButton, saveButton, editCoverButton]);
}

function displayCoverPreview() {
  showElements([coverPreviewView, editCoverButton, saveButton, viewSavedButton, makeCoverButton]);
  hideElements([homeView, savedView, formView, randomCoverButton, homeButton]);
}

function showCurrentCover() {
  coverImage.src = currentCover.cover;
  title.innerText = currentCover.title;
  tagline1.innerText = currentCover.tagline1;
  tagline2.innerText = currentCover.tagline2;
}

function saveInputs() {
  covers.push(imageInput.value);
  titles.push(titleInput.value);
  descriptors.push(descriptor1Input.value);
  descriptors.push(descriptor2Input.value);
  inputValues.forEach(value => value = '');
  errors.forEach(error => error.innerHTML = '');
}

function saveCover() {
  currentCover.cover = coverImage.src;
  currentCover.title = title.innerText;
  currentCover.tagline1 = tagline1.innerText;
  currentCover.tagline2 = tagline2.innerText;

  if (savedCovers.includes(myCover)) {
    savedCovers.push(myCover);
  }
  if (!myCover && !savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover);
  }
  if (savedCovers.length) {
    hideElements([noSavedCovers]);
  }
}

function deleteSavedCovers(div) {
  savedCovers.splice(div.id, 1);
  div.remove();
  if (!savedCovers.length) {
    showElements([noSavedCovers]);
  }
}

function makeMyBook() {
  coverPreviewView.innerHTML =
    `<section class="preview-cover-view">
      <section class="preview-cover">
        <img class="cover-image" src="${imageInput.value}">
        <h2 class="cover-title">${titleInput.value}</h2>
        <h3 class="tagline">A tale of <span class="tagline-1">${descriptor1Input.value}</span> and <span class="tagline-2">${descriptor2Input.value}</span></h3>
        <img class="price-tag" src="./assets/price.png">
        <img class="overlay" src="./assets/overlay.png">
      </section>
    </section>`;
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
  myCover = new Cover(imageInput.value, titleInput.value, descriptor1Input.value, descriptor2Input.value);
  validateForm();

  if (!showFormErrors.length) {
    saveInputs();
    makeMyBook();
    displayCoverPreview();
  }
}
