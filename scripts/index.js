const cardTemplate = document.getElementById("card-template");
const cards = document.querySelector(".cards");

/***********************************************************************************************************************/

function createCard(aName, aLink) {
  const newArticle = cardTemplate.content.cloneNode(true);

  const img = newArticle.querySelector('.cards__foto');
  img.src = aLink;
  img.alt = `фотография ${aName}`;

  img.addEventListener("click", (evt) => {
    displayImagePopup(aLink, aName);
  });

  const caption = newArticle.querySelector('.cards__caption');
  caption.textContent = aName;

  const buttonLike = newArticle.querySelector('.cards__like');
  buttonLike.addEventListener("click", (evt) => {
    buttonLike.classList.toggle('cards__like_liked');
  });

  const buttonDelete = newArticle.querySelector('.cards__delete');
  buttonDelete.addEventListener("click", (evt) => {
    const card = buttonDelete.closest('.cards__card');
    card.remove();
  });

  return newArticle;
}

function addCard(newCard, atTheTop) {
  if (atTheTop)
    cards.prepend(newCard);
  else
    cards.append(newCard);
}

/***********************************************************************************************************************/

function initCards() {
  initialCards.forEach((value) => {
    addCard(createCard(value.name, value.link), false);
  });
}

/***********************************************************************************************************************/

function initEditProfilePopup() {

  const currentProfileName = document.querySelector(".profile__name");
  const currentProfileAbout = document.querySelector(".profile__about");

  const profilePopup = document.querySelector("#popup-profile");

  const profileInputName = profilePopup.querySelector("#profile-name-id");
  const profileInputAbout = profilePopup.querySelector("#profile-about-id");
  const profileCloseButton = profilePopup.querySelector(".button-close");
  const profileForm = profilePopup.querySelector(".form-edit");

  const openEditProfilePopup = () => {
    profileInputName.value = currentProfileName.textContent;
    profileInputAbout.value = currentProfileAbout.textContent;
    openPopup(profilePopup);
  };

  const handleProfileFormSubmit = (evt) => {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  

    currentProfileName.textContent = profileInputName.value;
    currentProfileAbout.textContent = profileInputAbout.value;
    closePopup(profilePopup);
  }

  document.querySelector(".profile__edit-button").addEventListener("click", openEditProfilePopup);
  profileCloseButton.addEventListener("click", () => { closePopup(profilePopup); });
  profileForm.addEventListener("submit", handleProfileFormSubmit);
  profilePopup.addEventListener("click", (evt) => { closeOnOverlayClick(evt); });
}

/***********************************************************************************************************************/

function initAddCardPopup() {

  const addCardPopup = document.querySelector("#popup-add-card"); // by id

  const addCardInputImageCaption = addCardPopup.querySelector("#image-caption-id");
  const addCardInputImageLink = addCardPopup.querySelector("#image-link-id");
  const addCardCloseButton = addCardPopup.querySelector(".button-close");
  const addCardForm = addCardPopup.querySelector(".form-edit");

  const handleFormSubmit = (evt) => {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  

    const newImageName = addCardInputImageCaption.value;
    const newImageLink = addCardInputImageLink.value;
    addCard(createCard(newImageName, newImageLink), true);

    addCardInputImageCaption.value = "";
    addCardInputImageLink.value = "";

    closePopup(addCardPopup);
  }

  document.querySelector(".profile__add-button").addEventListener("click", () => { openPopup(addCardPopup); });
  addCardCloseButton.addEventListener("click", () => { closePopup(addCardPopup); });
  addCardForm.addEventListener("submit", handleFormSubmit);
  addCardPopup.addEventListener("click", (evt) => { closeOnOverlayClick(evt); });
}

/***********************************************************************************************************************/
function displayImagePopup(src, caption) {
  const displayImagePopup = document.querySelector("#popup-display-image"); // by id

  const imageElement = displayImagePopup.querySelector('.fullimage__image');
  imageElement.src = src;
  imageElement.alt = `фотография ${caption}`;

  const captionElement = displayImagePopup.querySelector('.fullimage__caption');
  captionElement.textContent = caption;

  openPopup(displayImagePopup);
}

/***********************************************************************************************************************/

function initDisplayImagePopup() {
  const displayImagePopup = document.querySelector("#popup-display-image"); // by id
  const displayImageCloseButton = displayImagePopup.querySelector('.button-close');
  displayImageCloseButton.addEventListener("click", () => {
    closePopup(displayImagePopup);
  });
  displayImagePopup.addEventListener("click", (evt) => { closeOnOverlayClick(evt); });
}

/***********************************************************************************************************************/

function openPopup(popupWindow) {
  popupWindow.classList.add("popup_opened");
  const form = popupWindow.querySelector('.form-edit');
  if (form) // не в каждом попапе есть форма
    validate(form, validationOptions); // Начальная валидация необходима на открытии формы, когда события изменения текста инпутов еще не сработали
}

function closePopup(popupWindow) {
  popupWindow.classList.remove("popup_opened");
}

function closeOnOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
}

/***********************************************************************************************************************/

function initDocument() {
  document.addEventListener('keydown', (evt) => {

    if (evt.key === 'Escape') {
      const allPopups = document.querySelectorAll('.popup');
      for (let i = 0; i < allPopups.length; i++) {
        if (allPopups[i].classList.contains('popup_opened')) {
          closePopup(allPopups[i]);
          break;
        }
      }
    }
  });
}

/***********************************************************************************************************************/
/* Main script */

initCards();
initEditProfilePopup();
initAddCardPopup();
initDisplayImagePopup();
enableValidation(validationOptions);
initDocument();
