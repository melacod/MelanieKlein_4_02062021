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
const inputBirthdate = document.getElementById("birthdate");
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
  addOrRemoveInvalid(firstValid, inputFirst.parentElement);
  isValid = isValid && firstValid;

  const lastValid = validateText(inputLast.value);
  addOrRemoveInvalid(lastValid, inputLast.parentElement);
  isValid = isValid && lastValid;

  const emailValid = validateEmail(inputEmail.value);
  addOrRemoveInvalid(emailValid, inputEmail.parentElement);
  isValid = isValid && emailValid;

  const birthdatelValid = validateDate(inputBirthdate.value);
  addOrRemoveInvalid(birthdatelValid, inputBirthdate.parentElement);
  isValid = isValid && birthdatelValid;
  
  if (birthdatelValid) {
    const ageValid = validateAge(inputBirthdate.value);
    addOrRemoveInvalid2(ageValid, inputBirthdate.parentElement);
    isValid = isValid && ageValid;
  }
  
  const quantityValid = isNaN(inputQuantity.value) === false;
  addOrRemoveInvalid(quantityValid, inputQuantity.parentElement);
  isValid = isValid && quantityValid;

  if (quantityValid) {
    const locationValid = validateLocation();
    addOrRemoveInvalid(locationValid, inputLocation.item(0).parentElement);
    isValid = isValid && locationValid;
  }
  
  const checkbox1Valid = inputConditionGenerales.checked;
  addOrRemoveInvalid(checkbox1Valid, inputConditionGenerales.parentElement);
  isValid = isValid && checkbox1Valid;

  return isValid;
}

// validate text format
function validateText (text) {
  return text.trim().length >= 2;
}

// validate email format with regular expression
function validateEmail (email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// check if any location is checked depending on quantity
function validateLocation () {
  if (inputQuantity.value > 0){
    for (let location of inputLocation){
      if (location.checked){
        return true;
      }
    }
    return false;
  } else {
    for (let location of inputLocation){

      //1 élement checké = tout le monde checké et réciproquement
      location.checked = false;
    }
    return true;
  }
}

// validate date format
// Date.parse(xxx) return NaN when xxx is not a valid date
function validateDate (date) {
  return isNaN(Date.parse(date)) == false;
}

// validate age
function validateAge (date) {
  //let diff = Date.now() - new Date(Date.parse(date)).getTime();
  //let age = Math.abs(new Date(diff).getUTCFullYear() - 1970);
  return getAge(date) >= 13;
}

// Compute age from date
// Date.now() => nombre de millisseconds entre le 01/01/1970 et maintenant
// Date.parse(date).getTime()  => nombre de millisseconds entre le 01/01/1970 et la date
function getAge (date) { 
  let diff = Date.now() - new Date(Date.parse(date)).getTime();
  let age = Math.abs(new Date(diff).getUTCFullYear() - 1970);
  // console.log('date =  '+date+ ' => age = '+age);
  return age;
}

// add class 'invalid' depending of validity
function addOrRemoveInvalid (isValid, element) {
  addOrRemoveClass(isValid, element, "invalid");
}

// add class 'invalid2' depending of validity
function addOrRemoveInvalid2 (isValid, element) {
  addOrRemoveClass(isValid, element, "invalid2");
}

// add className to element if isValid is true
// else remove className from element
function addOrRemoveClass (isValid, element, className) {
  if (isValid) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }

 // isValid ? element.classList.remove(className) : element.classList.add(className);
}


