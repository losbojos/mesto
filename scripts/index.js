const cardTemplate = document.getElementById("card-template");
const cards = document.querySelector(".cards");

// Сохраним в константах popup-окна, найдя их по #id
const profilePopup = document.querySelector("#popup-profile");
const addCardPopup = document.querySelector("#popup-add-card");
const fullImagePopup = document.querySelector("#popup-full-image");

// Сохраним элементы попапа раскрытия изображения карточки
const fullImagePopupImageElement = fullImagePopup.querySelector('.fullimage__image');
const fullImagePopupCaptionElement = fullImagePopup.querySelector('.fullimage__caption');

/***********************************************************************************************************************/

function createCard(aName, aLink) {
  const newArticle = cardTemplate.content.cloneNode(true);

  const img = newArticle.querySelector('.cards__foto');
  img.src = aLink;
  img.alt = `фотография ${aName}`;

  img.addEventListener("click", (evt) => {
    openFullImagePopup(aLink, aName);
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

function initPopup(popup) {

  popup.addEventListener('mousedown', (evt) => {

    if (evt.target.classList.contains('button-close')) // Клик на кнопке закрытия
    {
      closePopup(popup);
    }
    else if (evt.target.classList.contains('popup_opened')) // Клик в произвольном месте попапа
    {
      closeOnOverlayClick(evt);
    }
  });
}

/***********************************************************************************************************************/

function initProfilePopup() {

  const currentProfileName = document.querySelector(".profile__name");
  const currentProfileAbout = document.querySelector(".profile__about");

  const profileInputName = profilePopup.querySelector("#profile-name-id");
  const profileInputAbout = profilePopup.querySelector("#profile-about-id");
  const profileForm = profilePopup.querySelector(".form-edit");

  const openProfilePopup = () => {

    profileForm.reset();
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

  document.querySelector(".profile__edit-button").addEventListener("click", openProfilePopup);
  profileForm.addEventListener("submit", handleProfileFormSubmit);
  initPopup(profilePopup);
}

/***********************************************************************************************************************/

function initAddCardPopup() {
  const addCardInputImageCaption = addCardPopup.querySelector("#image-caption-id");
  const addCardInputImageLink = addCardPopup.querySelector("#image-link-id");
  const addCardForm = addCardPopup.querySelector(".form-edit");

  const openAddCardPopup = () => {
    addCardForm.reset();
    openPopup(addCardPopup);
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  

    const newImageName = addCardInputImageCaption.value;
    const newImageLink = addCardInputImageLink.value;
    addCard(createCard(newImageName, newImageLink), true);

    closePopup(addCardPopup);
  }

  document.querySelector(".profile__add-button").addEventListener("click", openAddCardPopup);
  addCardForm.addEventListener("submit", handleFormSubmit);
  initPopup(addCardPopup);
}

/***********************************************************************************************************************/
function openFullImagePopup(src, caption) {
  fullImagePopupImageElement.src = src;
  fullImagePopupImageElement.alt = `фотография ${caption}`;

  fullImagePopupCaptionElement.textContent = caption;

  openPopup(fullImagePopup);
}

/***********************************************************************************************************************/

function openPopup(popupWindow) {
  popupWindow.classList.add("popup_opened");
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

initProfilePopup();
initAddCardPopup();
initPopup(fullImagePopup);

enableValidation(validationOptions);
initDocument();
