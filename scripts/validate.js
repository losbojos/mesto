
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

	form.addEventListener('reset', () => {

		// `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
		setTimeout(() => {
			allInputs.forEach((input) => {
				const errorElement = findErrorElementByInputElement(input, options);
				hideError(input, errorElement, options);
			});
			toggleButtonState(allInputs, buttonSave, options.disabledButtonClass);
		});

	}, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
}

function findErrorElementByInputElement(inputElement, options) {
	return inputElement.closest(options.inputSectionSelector).querySelector(options.errorSelector);
}

function toogleInputState(input, options) {
	const errorElement = findErrorElementByInputElement(input, options);

	if (input.validity.valid) {
		hideError(input, errorElement, options);
	}
	else {
		showError(input, errorElement, options);
	}
}

function showError(inputElement, errorElement, options) {
	inputElement.classList.add(options.inputInvalidClass);
	errorElement.classList.add(options.inputErrorClass);
	errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, options) {
	inputElement.classList.remove(options.inputInvalidClass);
	errorElement.classList.remove(options.inputErrorClass);
	errorElement.textContent = '';
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
