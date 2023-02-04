const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const popupEditProfile = document.querySelector(".popup-edit-profile");
const closeButton = popupEditProfile.querySelector(".form-edit-profile__button-close");
const inputName = document.getElementById("form-edit-profile__input-name-id");
const inputAbout = document.getElementById("form-edit-profile__input-about-id");
const formElement = popupEditProfile.querySelector(".form-edit-profile");

const toggleOpenPopup = () => {
  let isOpened = popupEditProfile.classList.toggle("popup-edit-profile_opened");
  if (isOpened) {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
  }
};

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  

  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  toggleOpenPopup();
}

editButton.addEventListener("click", toggleOpenPopup);
closeButton.addEventListener("click", toggleOpenPopup);
formElement.addEventListener("submit", handleFormSubmit);

