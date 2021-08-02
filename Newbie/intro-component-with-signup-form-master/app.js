const form = document.getElementById('form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
    e.preventDefault();

    checkInputs();
})

function checkInputs() {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if(firstNameValue === '') {
        setErrorClass(firstName, 'First Name cannot be empty');
    }   else {
        setSuccessClass(firstName);
    }

    if(lastNameValue === '') {
        setErrorClass(lastName, 'Last Name cannot be empty');
    }   else {
        setSuccessClass(lastName);
    }

    if(emailValue === '') {
        setErrorClass(email, 'Email Address cannot be empty');
    }   else if (!isEmail(emailValue)) {
        setErrorClass(email, 'Looks like this is not an email');
    }   else {
        setSuccessClass(email);
    }

    if(passwordValue === '') {
        setErrorClass(password, 'Password cannot be empty');
    }   else {
        setSuccessClass(password);
    }
}

function setErrorClass(input, message) {
    const formItem = input.parentElement;
    const errorMsg = formItem.querySelector('span');
    formItem.className = 'form-item error';
    errorMsg.innerText = message;
}

function setSuccessClass(input) {
    const formItem = input.parentElement;
    formItem.className = 'form-item success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}