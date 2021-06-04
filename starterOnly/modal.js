function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.getElementsByClassName('bground').item(0);
const modalBtn = document.getElementsByClassName('modal-btn');
const formData = document.getElementsByClassName('formData');
const closeBtn = document.getElementsByClassName('close').item(0);

const inputFirst = document.getElementById("first");
const inputLast = document.getElementById("last");
const inputEmail = document.getElementById("email");
const inputQuantity = document.getElementById("quantity");
const inputConditionGenerales = document.getElementById("checkbox1");

// launch modal event
for (let btn of modalBtn) {
  btn.addEventListener("click", launchModal);
}

// close modal event
closeBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// validate form
function validate () {

  const firstValid = validateText(inputFirst.value);
  checkIfValid(firstValid, inputFirst);

  const lastValid = validateText(inputLast.value);
  checkIfValid(lastValid, inputLast);
  
  const emailValid = validateEmail(inputEmail.value);
  checkIfValid(emailValid, inputEmail);

  const quantityValid = validateNumber(inputQuantity.value);
  checkIfValid(quantityValid, inputQuantity);

  const checkbox1Valid = validateCheckbox(inputConditionGenerales.checked);
  checkIfValid(checkbox1Valid, inputConditionGenerales);
  
  return firstValid && lastValid && emailValid && quantityValid && checkbox1Valid;
}

// validate email format
function validateEmail (email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// validate number format
function validateNumber (num) {
  if (num === '') {
    return false;
  }
  if (isNaN(num) === true) {
    return false;
  }
  return true;
}

// validate text format
function validateText (text) {
  if (text.trim().length >= 2) {
    return true;
  }
  return false;
}

//check checkbox1 validate
function validateCheckbox (check) {
  if (check) {
    return true;
  }
  return false;
}

// add class 'invalid' depending of validity
function checkIfValid (isValid, input) {
  if (isValid === true) {
    input.classList.remove("invalid");
  } else {
    input.classList.add("invalid");
  }
}

