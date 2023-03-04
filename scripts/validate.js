
function enableValidation(options) {
	const allForms = Array.from(document.querySelectorAll(options.formSelector));
	allForms.forEach((form) => {
		setEventListeners(form, options);
	});
}

function setEventListeners(form, options) {
	const allInputs = Array.from(form.querySelectorAll(options.inputSelector));
	const buttonSave = form.querySelector(options.submitSelector);

	allInputs.forEach((input) => {
		input.addEventListener('input', (evt) => {
			toogleInputState(evt.target, options);
			toggleButtonState(allInputs, buttonSave, options.disabledButtonClass);
		});
	});
}

function toogleInputState(input, options) {
	const errorElement = input.closest(options.inputSectionSelector).querySelector(options.errorSelector);

	if (input.validity.valid) {
		input.classList.remove(options.inputInvalidClass);
		errorElement.classList.remove(options.inputErrorClass);
		errorElement.textContent = '';
	}
	else {
		input.classList.add(options.inputInvalidClass);
		errorElement.classList.add(options.inputErrorClass);
		errorElement.textContent = input.validationMessage;
	}
}

function toggleButtonState(inputs, button, disabledButtonClass) {
	const formIsValid = inputs.every(input => input.validity.valid);

	if (formIsValid) {
		button.classList.remove(disabledButtonClass);
		button.removeAttribute('disabled');
	}
	else {
		button.classList.add(disabledButtonClass);
		button.setAttribute('disabled', true);
	}
}

function validate(form, options) {
	const allInputs = Array.from(form.querySelectorAll(options.inputSelector));
	const buttonSave = form.querySelector(options.submitSelector);

	allInputs.forEach((input) => {
		toogleInputState(input, options);
	});

	toggleButtonState(allInputs, buttonSave, options.disabledButtonClass);
}