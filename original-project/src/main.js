// Create variables targetting the relevant DOM elements here 👇
var coverImage = document.querySelector('.cover-image');
var title = document.querySelector('.cover-title');
var tagline1 = document.querySelector('.tagline-1');
var tagline2 = document.querySelector('.tagline-2');

var randomCoverButton = document.querySelector('.random-cover-button');
var saveButton = document.querySelector('.save-cover-button');
var viewButton = document.querySelector('.view-saved-button');
var makeButton = document.querySelector('.make-new-button');
var homeButton = document.querySelector('.home-button');
var newBookButton = document.querySelector('.create-new-book-button');

var homeView = document.querySelector('.home-view');
var formView = document.querySelector('.form-view');
var savedView = document.querySelector('.saved-view');
var saveCoverView = document.querySelector('.saved-covers-section');

var coverInput = document.querySelector('#cover');
var titleInput = document.querySelector('#title');
var descriptor1Input = document.querySelector('#descriptor1');
var descriptor2Input = document.querySelector('#descriptor2');

// We've provided a few variables below
var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];

var currentCover = new Cover();

// Add your event listeners here 👇
window.addEventListener('load', displayRandomCover);

randomCoverButton.addEventListener('click', displayRandomCover);
makeButton.addEventListener('click', viewForm);
viewButton.addEventListener('click', displaySaved);
homeButton.addEventListener('click', displayHomePage);
newBookButton.addEventListener('click', createNewBook);
saveButton.addEventListener('click', saveCover);

// Create your event handlers and other functions here 👇
function displayRandomCover() {
  var coverImage = covers[getRandomIndex(covers)];
  var title = titles[getRandomIndex(titles)];
  var tagline1 = descriptors[getRandomIndex(descriptors)];
  var tagline2 = descriptors[getRandomIndex(descriptors)];
  currentCover = new Cover(coverImage, title, tagline1, tagline2);
  showCurrentCover();
}

function showCurrentCover() {
  coverImage.src = currentCover.cover;
  title.innerText = currentCover.title;
  tagline1.innerText = currentCover.tagline1;
  tagline2.innerText = currentCover.tagline2;
}

function showElements(elements) {
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains('hidden')) {
      elements[i].classList.remove('hidden');
    }
  }
}

function hideElements(elements) {
  for (var i = 0; i < elements.length; i++) {
    if (!elements[i].classList.contains('hidden')) {
      elements[i].classList.add('hidden');
    }
  }
}

function viewForm() {
  showElements([formView]);
  showElements([homeButton]);
  hideElements([homeView]);
  hideElements([savedView]);
  hideElements([randomCoverButton]);
  hideElements([saveButton]);
}

function displaySaved() {
  showElements([savedView]);
  showElements([homeButton]);
  hideElements([formView]);
  hideElements([homeView]);
  hideElements([randomCoverButton]);
  hideElements([saveButton]);
  showCoversSection();
}

function displayHomePage() {
  hideElements([savedView]);
  hideElements([formView]);
  showElements([homeView]);
  showElements([randomCoverButton]);
  showElements([saveButton]);
  hideElements([homeButton]);
}


function showCoversSection() {
  saveCoverView.innerHTML = '';
  for (var i = 0; i < savedCovers.length; i++) {
    saveCoverView.innerHTML +=
      `<div class="mini-cover" id="${i}" ondblclick="deleteSavedCovers(this)">
          <img class="mini-cover" src="${savedCovers[i].cover}">
          <h2 class="cover-title" >${savedCovers[i].title}</h2>
          <h3 class="tagline">A tale of <span class="tagline-1">${savedCovers[i].tagline1}</span> and <span class="tagline-2">${savedCovers[i].tagline2}</span></h3>
          <img class="price-tag" src="./assets/price.png">
          <img class="overlay" src="./assets/overlay.png">
      </div>`;
  }
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

// We've provided one function to get you started
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}