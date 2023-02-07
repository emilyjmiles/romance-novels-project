const coverImage = document.querySelector('.cover-image');
const title = document.querySelector('.cover-title');
const tagline1 = document.querySelector('.tagline-1');
const tagline2 = document.querySelector('.tagline-2');

const randomCoverButton = document.querySelector('.random-cover-button');
const saveCoverButton = document.querySelector('.save-button');
const viewSavedButton = document.querySelector('.view-saved-button');
const createCoverButton = document.querySelector('.create-cover-button');
const editCoverButton = document.querySelector('.edit-cover-button');
const submitCoverButton = document.querySelector('.submit-cover-form');
const homeButton = document.querySelector('.home-button');

const homeView = document.querySelector('.home-view');
const formView = document.querySelector('.form-view');
const coverPreview = document.querySelector('.preview-cover-view');
const savedCoversView = document.querySelector('.saved-view');
const savedCoversCards = document.querySelector('.saved-covers-section');
const noSavedCovers = document.querySelector('.no-saved-message');

const imageInputError = document.querySelector('.image-input-error');
const titleInputError = document.querySelector('.title-input-error');
const desc1InputError = document.querySelector('.desc1-input-error');
const desc2InputError = document.querySelector('.desc2-input-error');

const imageInput = document.querySelector('.user-cover');
const titleInput = document.querySelector('.user-title');
const desc1Input = document.querySelector('.user-desc1');
const desc2Input = document.querySelector('.user-desc2');

const inputs = [imageInput, titleInput, desc1Input, desc2Input];
const errors = [imageInputError, titleInputError, desc1InputError, desc2InputError];
const formErrors = [];
const savedCovers = [];
let randomCover;
let myCover;

window.addEventListener('load', displayHomePage);
randomCoverButton.addEventListener('click', getRandomCover);
createCoverButton.addEventListener('click', displayCoverForm);
viewSavedButton.addEventListener('click', displaySavedView);
homeButton.addEventListener('click', displayHomePage);
submitCoverButton.addEventListener('click', submitCreatedCover);
editCoverButton.addEventListener('click', displayCoverForm);
saveCoverButton.addEventListener('click', addCoverToSaved);

function showElements(elements) {
  elements.forEach(element => element.classList.remove('hidden'));
};

function hideElements(elements) {
  elements.forEach(element => element.classList.add('hidden'));
};

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayHomePage() {
  showElements([homeView, randomCoverButton, saveCoverButton, viewSavedButton, createCoverButton]);
  hideElements([savedCoversView, formView, coverPreview, homeButton, editCoverButton, noSavedCovers]);
  getRandomCover();
}

function displaySavedView() {
  showElements([savedCoversView, homeButton, viewSavedButton, createCoverButton]);
  hideElements([formView, coverPreview, homeView, randomCoverButton, saveCoverButton, editCoverButton]);
  getSavedCovers();
}

function displayCoverForm() {
  showElements([formView, homeButton, viewSavedButton, createCoverButton]);
  hideElements([coverPreview, homeView, savedCoversView, randomCoverButton, saveCoverButton, editCoverButton]);
}

function displayCoverPreview() {
  showElements([coverPreview, homeButton, saveCoverButton, viewSavedButton, editCoverButton, createCoverButton]);
  hideElements([homeView, savedCoversView, formView, randomCoverButton, noSavedCovers]);
}

function getRandomCover() {
  myCover = '';
  randomCover = new Cover(
    covers[getRandomIndex(covers)],
    titles[getRandomIndex(titles)],
    descriptors[getRandomIndex(descriptors)],
    descriptors[getRandomIndex(descriptors)]
  );

  homeView.innerHTML =
    `<section class="cover main-cover">
      <img class="price-tag" src="./assets/price-tag.webp" alt="price tag">
      <img class="image cover-image" src="${randomCover.cover}" alt="${randomCover.title}" width="500px" height="750px">
      <div class="text-container cover-text">
        <h2 class="text cover-title">${randomCover.title}</h2>
        <h3 class="text cover-tagline">A tale of ${randomCover.tagline1} and ${randomCover.tagline2}</h3>
      </div>
    </section>`;
}

function validateForm() {
  errors.forEach((error, index) => {
    inputs.forEach((input, i) => {
      if (input.value === '' && index === i && !formErrors.includes(error)) {
        error.innerHTML = 'Please enter a valid input before submitting';
        formErrors.push(error);
      }
      if (input.value !== '' && formErrors.includes(error)) {
        const errorIndex = formErrors.indexOf(error);
        error.innerHTML = '';
        formErrors.splice(errorIndex, 1);
      }
    });
  });
}

function submitCreatedCover() {
  event.preventDefault();
  validateForm();

  if (!formErrors.length) {
    createCover();
    displayCoverPreview();
  }
}

function createCover() {
  randomCover = '';
  myCover = new Cover(imageInput.value, titleInput.value, desc1Input.value, desc2Input.value);
  coverPreview.innerHTML =
    `<section class="cover preview-cover">
      <img class="price-tag" src="./assets/price-tag.webp" alt="price tag">
      <img class="image my-cover-image" src="${myCover.cover}" alt="${myCover.title}" width="500px" height="750px">
      <div class="text-container cover-text">
        <h2 class="text cover-title">${myCover.title}</h2>
        <h3 class="text cover-tagline">A tale of ${myCover.tagline1} and ${myCover.tagline2}</h3>
      </div>
    </section>`;
}

function saveInputs() {
  covers.push(imageInput.value);
  titles.push(titleInput.value);
  descriptors.push(desc1Input.value);
  descriptors.push(desc2Input.value);
}

function clearFormInputs() {
  inputs.forEach(input => input.value = '');
  errors.forEach(error => error.innerHTML = '');
}

function saveCover(cover) {
  if (!savedCovers.includes(cover)) {
    savedCovers.push(cover);
  }
  if (savedCovers.length) {
    hideElements([noSavedCovers]);
  }
}

function addCoverToSaved() {
  saveInputs();
  clearFormInputs();

  if (myCover) {
    saveCover(myCover);
  }
  if (randomCover) {
    saveCover(randomCover);
  }
}

function getSavedCovers() {
  if (!savedCovers.length) {
    showElements([noSavedCovers]);
  }
  savedCoversCards.innerHTML = '';
  savedCovers.forEach((cover, index) => {
    savedCoversCards.innerHTML +=
      `<section class="mini-cover" id="${index}" ondblclick="deleteSavedCover(this)">
        <img class="price-tag" src="./assets/price-tag.webp" alt="price tag">
        <img class="image mini-image" src="${cover.cover}" alt="${cover.title}" width="500px" height="750px">
        <div class="text-container mini-text">
          <h2 class="text mini-title" >${cover.title}</h2>
          <h3 class="text mini-tagline">A tale of ${cover.tagline1} and ${cover.tagline2}</h3>
        <div>
      </section>`;
  });
}

function deleteSavedCover(div) {
  savedCovers.splice(div.id, 1);
  div.remove();
  getSavedCovers();

  if (!savedCovers.length) {
    showElements([noSavedCovers]);
  }
};