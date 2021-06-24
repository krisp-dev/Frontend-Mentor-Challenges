const emailForm = document.getElementById('email__form');
const emailInput = document.getElementById('email__input');

emailForm.addEventListener('submit', e => {
    e.preventDefault();

    checkInput();
});

function checkInput() {
    // get value from email input and use trim to remove the whitespace
    const emailValue = emailInput.value;

    if(emailValue === '') {
        setError(emailInput, 'Email cannot be blank');

    }   else if (!isEmail(emailValue)) {
            setError(emailInput, 'Please provide a valid email address');

    }   else {
            setSuccess(emailInput, 'Email successfully submitted');
    }
}

function setError(input, message) {
    const emailControl = input.parentElement;
    const errorMsg = emailControl.querySelector('p');

    emailControl.className = 'email__control error';
    errorMsg.innerText = message;
}

function setSuccess(input, message) {
    const emailControl = input.parentElement;
    const errorMsg = emailControl.querySelector('p');

    emailControl.className = 'email__control success';
    errorMsg.innerText = message;
}

function isEmail(emailInput) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput);
}