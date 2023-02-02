// Button querySelectors variables:
var homeButton = document.querySelector('.home-button');
var randomCoverButton = document.querySelector('.random-cover-button');
var saveCoverButton = document.querySelector('.save-cover-button');
var viewSavedButton = document.querySelector('.view-saved-button');
var makeNewButton = document.querySelector('.make-new-button');
var createNewBookButton = document.querySelector('.create-new-book-button');

// Cover querySelectors variables:
var coverImage = document.querySelector('.cover-image');
var coverTitle = document.querySelector('.cover-title');
var coverTagline1 = document.querySelector('.tagline-1');
var coverTagline2 = document.querySelector('.tagline-2');

// View querySelectors variables:
var savedView = document.querySelector('.saved-view');
var formView = document.querySelector('.form-view');
var homeView = document.querySelector('.home-view');
var savedCoversSection = document.querySelector('.saved-covers-section');

// Input querySelector variables:
var userCover = document.querySelector('.user-cover');
var userTitle = document.querySelector('.user-title');
var userDesc1 = document.querySelector('.user-desc1');
var userDesc2 = document.querySelector('.user-desc2');

// Cover class variables:
var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;

// Event listeners:
window.addEventListener('load', displayRandomCover);

randomCoverButton.addEventListener('click', displayRandomCover);
makeNewButton.addEventListener('click', displayCoverForm);
viewSavedButton.addEventListener('click', viewSavedCovers);
homeButton.addEventListener('click', displayHomePage);
createNewBookButton.addEventListener('click', makeMyBookCover);
saveCoverButton.addEventListener('click', saveCurrentCover);

// Event handlers and other functions:

//Helper Functions:
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function showElements(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('hidden');
  }
}

function hideElements(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add('hidden');
  }
}

// Display and Button Functions:
function displayRandomCover() {
  currentCover = new Cover(covers[getRandomIndex(covers)], titles[getRandomIndex(titles)],
  descriptors[getRandomIndex(descriptors)], descriptors[getRandomIndex(descriptors)]);
  displayCurrentCover();
}

function displayCoverForm() {
  showElements([formView, viewSavedButton, homeButton]);
  hideElements([homeView, savedView, saveCoverButton, randomCoverButton]);
}

function viewSavedCovers() {
  showElements([savedView, homeButton, viewSavedButton, makeNewButton]);
  hideElements([homeView, formView, randomCoverButton, saveCoverButton]);
  displaySavedCovers()
}

function displayHomePage() {
  showElements([homeView, randomCoverButton, saveCoverButton, viewSavedButton, makeNewButton]);
  hideElements([formView, savedView, homeButton]);
}

function makeMyBookCover() {
  event.preventDefault();
  currentCover = new Cover(userCover.value, userTitle.value, userDesc1.value, userDesc2.value);
  covers.push(userCover.value);
  titles.push(userTitle.value);
  descriptors.push(userDesc1.value);
  descriptors.push(userDesc2.value);
  displayHomePage();
  displayCurrentCover();
}

function displayCurrentCover() {
  coverImage.src = currentCover.cover;
  coverTitle.innerText = currentCover.title;
  coverTagline1.innerText = currentCover.tagline1;
  coverTagline2.innerText = currentCover.tagline2;
}

function saveCurrentCover() {
  if (!savedCovers.includes(currentCover)) {
  savedCovers.push(currentCover);
  }
}

function displaySavedCovers() {
  savedCoversSection.innerHTML = '';
  for (var i = 0; i < savedCovers.length; i++) {
    savedCoversSection.innerHTML +=
    `<section class="mini-cover">
      <img class="cover-image" src="${savedCovers[i].cover}">
      <h2 class="cover-title">${savedCovers[i].title}</h2>
      <h3 class="tagline">A tale of <span class="tagline-1">${savedCovers[i].tagline1}</span> and <span class="tagline-2">${savedCovers[i].tagline2}</span></h3>
      <img class="price-tag" src="./assets/price.png">
      <img class="overlay" src="./assets/overlay.png">
    </section>`
  }
}
