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

const inputLocation = document.getElementsByClassName('input-location');

const inputFirst = document.getElementById("first");
const inputLast = document.getElementById("last");
const inputEmail = document.getElementById("email");
const inputQuantity = document.getElementById("quantity");
const inputConditionGenerales = document.getElementById("checkbox1");

// launch modal event
for (let btn of modalBtn) {
  btn.addEventListener("click", launchModal);
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeBtn.addEventListener("click", closeModal);

//close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// validate form
function validate () {

  let isValid = true;

  const firstValid = validateText(inputFirst.value);
  checkIfValid(firstValid, inputFirst.parentElement);
  isValid = isValid && firstValid;

  const lastValid = validateText(inputLast.value);
  checkIfValid(lastValid, inputLast.parentElement);
  isValid = isValid && lastValid;

  const emailValid = validateEmail(inputEmail.value);
  checkIfValid(emailValid, inputEmail.parentElement);
  isValid = isValid && emailValid;

  const quantityValid = validateNumber(inputQuantity.value);
  checkIfValid(quantityValid, inputQuantity.parentElement);
  isValid = isValid && quantityValid;

  if (quantityValid) {
    const locationValid = checkedLocation();
    checkIfValid(locationValid, inputLocation.item(0).parentElement);
    isValid = isValid && locationValid;
  }
  
  const checkbox1Valid = inputConditionGenerales.checked;
  checkIfValid(checkbox1Valid, inputConditionGenerales.parentElement);
  isValid = isValid && checkbox1Valid;

  return isValid;
}


// validate text format
function validateText (text) {
  
  return text.trim().length >= 2;

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

// check if any location is checked depending on quantity
function checkedLocation () {
  if (inputQuantity.value > 0){
    for (let location of inputLocation){
      if (location.checked){
        return true;
      }
    }
    return false;
  } else {
    for (let location of inputLocation){
      location.checked = false;
    }
    return true;
  }
}

// add class 'invalid' depending of validity
function checkIfValid (isValid, element) {
  if (isValid === true) {
    element.classList.remove("invalid");
  } else {
    element.classList.add("invalid");
  }
}

// fonction calcul âge

function getAge(date) { 
  var diff = Date.now() - date.getTime();
  var age = new Date(diff); 
  return Math.abs(age.getUTCFullYear() - 1970);
}
alert(getAge(new Date(1995, 12, 6))); //Date(année, mois, jour) 

