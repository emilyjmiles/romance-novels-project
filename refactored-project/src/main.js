const coverImage = document.querySelector('.cover-image');
const title = document.querySelector('.cover-title');
const tagline1 = document.querySelector('.tagline-1');
const tagline2 = document.querySelector('.tagline-2');

const randomCoverButton = document.querySelector('.random-cover-button');
const saveButton = document.querySelector('.save-cover-button');
const viewButton = document.querySelector('.view-saved-button');
const makeButton = document.querySelector('.make-new-button');
const homeButton = document.querySelector('.home-button');
const newBookButton = document.querySelector('.create-new-book-button');

const homeView = document.querySelector('.home-view');
const formView = document.querySelector('.form-view');
const savedView = document.querySelector('.saved-view');
const saveCoverView = document.querySelector('.saved-covers-section');

const coverInput = document.querySelector('#cover');
const titleInput = document.querySelector('#title');
const descriptor1Input = document.querySelector('#descriptor1');
const descriptor2Input = document.querySelector('#descriptor2');

const savedCovers = [
  new Cover(
    "http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];

let currentCover;

window.addEventListener('load', displayRandomCover);

randomCoverButton.addEventListener('click', displayRandomCover);
makeButton.addEventListener('click', viewForm);
viewButton.addEventListener('click', displaySaved);
homeButton.addEventListener('click', displayHomePage);
newBookButton.addEventListener('click', createNewBook);
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

function displayRandomCover() {
  const coverImage = covers[getRandomIndex(covers)];
  const title = titles[getRandomIndex(titles)];
  const tagline1 = descriptors[getRandomIndex(descriptors)];
  const tagline2 = descriptors[getRandomIndex(descriptors)];
  currentCover = new Cover(coverImage, title, tagline1, tagline2);
  showCurrentCover();
}

function showCurrentCover() {
  coverImage.src = currentCover.cover;
  title.innerText = currentCover.title;
  tagline1.innerText = currentCover.tagline1;
  tagline2.innerText = currentCover.tagline2;
}

function viewForm() {
  showElements([formView, homeButton]);
  hideElements([homeView, savedView, randomCoverButton, saveButton]);
}

function displaySaved() {
  showElements([savedView, homeButton]);
  hideElements([formView, homeView, randomCoverButton, saveButton]);
  showCoversSection();
}

function displayHomePage() {
  showElements([homeView, randomCoverButton, saveButton]);
  hideElements([savedView, formView, homeButton]);
}

function showCoversSection() {
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

function makeMyBook(book) {
  newBookButton.type = 'button';
  book.cover = coverInput.value;
  book.title = titleInput.value;
  book.tagline1 = descriptor1Input.value;
  book.tagline2 = descriptor2Input.value;
}

function saveInput() {
  covers.push(coverInput.value);
  titles.push(titleInput.value);
  descriptors.push(descriptor1Input.value);
  descriptors.push(descriptor2Input.value);
}

function saveCover() {
  currentCover.cover = coverImage.src;
  currentCover.title = title.innerText;
  currentCover.tagline1 = tagline1.innerText;
  currentCover.tagline2 = tagline2.innerText;
  if (!savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover);
  }
}

function createNewBook() {
  saveInput();
  makeMyBook(currentCover);
  showCurrentCover();
  displayHomePage();
}

function deleteSavedCovers(div) {
  savedCovers.splice(div.id, 1);
  div.remove();
}
