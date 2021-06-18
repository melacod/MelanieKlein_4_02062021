function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// ---------------------------------------------------------------------------------------------------------
// DOM elements
// ---------------------------------------------------------------------------------------------------------

// DOM Elements
const modalbg = document.getElementsByClassName('bground').item(0);
const modalForm = modalbg.querySelector('form');
const modalThanks = modalbg.querySelector('.modal-thanks');
const modalOpenButtons = document.getElementsByClassName('modal-open');
const modalCloseButtons = document.getElementsByClassName('modal-close');

// DOM inputs elements
const inputFirst = document.getElementById("first");
const inputLast = document.getElementById("last");
const inputEmail = document.getElementById("email");
const inputBirthdate = document.getElementById("birthdate");
const inputQuantity = document.getElementById("quantity");
const inputLocations = document.getElementsByClassName('input-location');
const inputTermsConditions = document.getElementById("checkbox1");

// DOM location elements
const locations = document.getElementById('locations');
const locationsGroup = document.getElementById('locationsGroup');

// ---------------------------------------------------------------------------------------------------------
// add listeners to DOM elements
// ---------------------------------------------------------------------------------------------------------

// add listener events for input validation
addListenerMulti(inputFirst, "change keyup", validateFirst);
addListenerMulti(inputLast, "change keyup", validateLast);
addListenerMulti(inputEmail, "change keyup", validateEmail);
addListenerMulti(inputBirthdate, "change keyup", validateBirthdate);
addListenerMulti(inputQuantity, "change keyup", validateQuantity);
addListenerMulti(inputTermsConditions, "change keyup", validateTermsAndConditions);
for (let inputLocation of inputLocations) {
  addListenerMulti(inputLocation, "click", validateLocations);
}

// add listener events to modal
for (let btn of modalOpenButtons) {
  addListenerMulti(btn, "click", openModalDialog);
}
for (let btn of modalCloseButtons) {
  addListenerMulti(btn, "click", closeModalDialog);
}

// ---------------------------------------------------------------------------------------------------------
// modal open, close, navigation
// ---------------------------------------------------------------------------------------------------------

// open modal dialog
function openModalDialog() {
  modalbg.style.display = "block";
  modalForm.style.visibility = "initial";
  modalThanks.style.display = "none";
}

// close modal dialog
function closeModalDialog() {
  modalbg.style.display = "none";
}

// display modal dialog success message
function displaySucessModalDialog() {
  modalForm.style.visibility = "hidden";
  modalThanks.style.display = "initial";
  resetFields();
}

// reset all fields to blanks
function resetFields () {
  inputFirst.value = '';
  inputLast.value = '';
  inputEmail.value = '';
  inputBirthdate.value = '';
  inputQuantity.value = '';
  uncheckAllLocations();
}

// ---------------------------------------------------------------------------------------------------------
// validate when submit form
// ---------------------------------------------------------------------------------------------------------

// validate form
function validate () {
  const isValid = validateAll();
  if (isValid) {
    displaySucessModalDialog();
  }
  return false;
}

// validate all fields
function validateAll () {
  let isValidFirst = validateFirst();
  let isValidLast = validateLast();
  let isValidEmail = validateEmail();
  let isValidBirthdate = validateBirthdate();
  let isValidQuantity = validateQuantity();
  let isValidTermsConditions = validateTermsAndConditions();
  return isValidFirst && isValidLast && isValidEmail && isValidBirthdate && isValidQuantity && isValidTermsConditions;
}

// ---------------------------------------------------------------------------------------------------------
// validate first, last, email, birthdate, terms and conditions
// ---------------------------------------------------------------------------------------------------------

// validate first name: at least 2 characters
function validateFirst () {
  removeValidationClasses(inputFirst.parentElement);
  const isValid = validateTextFormat(inputFirst.value);
  if (!isValid) {
    addInvalidClass(inputFirst.parentElement);
  }
  return isValid;
}

// validate last name: at least 2 characters
function validateLast () {
  removeValidationClasses(inputLast.parentElement);
  const isValid = validateTextFormat(inputLast.value);
  if (!isValid) {
    addInvalidClass(inputLast.parentElement);
  }
  return isValid;
}

// validate text format: at least 2 characters
function validateTextFormat (text) {
  return text.trim().length >= 2;
}

// validate email format
function validateEmail () {
  removeValidationClasses(inputEmail.parentElement);
  const isValid = validateEmailFormat(inputEmail.value);
  if (!isValid) {
    addInvalidClass(inputEmail.parentElement);
  }
  return isValid;
}

// validate email format with regular expression
function validateEmailFormat (email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// validate birthdate
function validateBirthdate () {
  removeValidationClasses(inputBirthdate.parentElement);
  let isValid = validateDateFormat(inputBirthdate.value);
  if (!isValid) {
    addInvalidClass(inputBirthdate.parentElement);
  } else {
    isValid = getAge(inputBirthdate.value) >= 13;
    if (!isValid) {
      addInvalid2Class(inputBirthdate.parentElement); 
    }
  }
  return isValid;
}

// validate date format
// Date.parse(xxx) return NaN when xxx is not a valid date
function validateDateFormat (date) {
  return isNaN(Date.parse(date)) == false;
}

// Compute age from date
// Date.now() => nombre de millisseconds entre le 01/01/1970 et maintenant
// Date.parse(date).getTime()  => nombre de millisseconds entre le 01/01/1970 et la date
function getAge (date) { 
  let diff = Date.now() - new Date(Date.parse(date)).getTime();
  let age = Math.abs(new Date(diff).getUTCFullYear() - 1970);
  return age;
}

// validate terms and conditions
function validateTermsAndConditions () {
  removeValidationClasses(inputTermsConditions.parentElement);
  const isValid = inputTermsConditions.checked;
  if (!isValid) {
    addInvalidClass(inputTermsConditions.parentElement);
  }
  return isValid;
}

// ---------------------------------------------------------------------------------------------------------
// validate quantity and locations
// ---------------------------------------------------------------------------------------------------------

// validate quantity and locations
function validateQuantity () {

  disableLocations();
  removeValidationClasses(inputQuantity.parentElement);
  removeValidationClasses(locationsGroup);
  
  let isValid = isNaN(inputQuantity.value) === false && inputQuantity.value !== '';
  if (!isValid) {

    // invalid quantity (NaN) : invalid message on quantity + locations disabled
    addInvalidClass(inputQuantity.parentElement); 

  } else if (parseInt(inputQuantity.value) === 0){

    // valid quantity = 0 : uncheck all locations + locations disabled
    uncheckAllLocations();

  } else {

    // valid quantity > 0 : enable locations + validate if one location checked
    enableLocations();
    isValid = validateLocations();
    
  }
  return isValid;
}

// disable locations: no location can be choosen
function disableLocations () {
  locations.classList.add("disabledLocations");
}

// enable locations: location can be choosen
function enableLocations () {
  locations.classList.remove("disabledLocations");
}

// uncheck all locations: to use when quantity is 0
function uncheckAllLocations () {
  for (let location of inputLocations){
    location.checked = false;
  }
}

// validation locations: number of locations checked must be
function validateLocations () {
  removeValidationClasses(locationsGroup);
  
  let numberOfLocationsChecked = 0;
  for (let location of inputLocations){
    if (location.checked){
      numberOfLocationsChecked++;
    }
  }

  let isValid = numberOfLocationsChecked >= 1;
  if (!isValid) {
    // at least 1 : several events in same town
    addInvalidClass(locationsGroup);

  } else {
    
    let quantity = parseInt(inputQuantity.value);
    isValid = numberOfLocationsChecked <= quantity;
    if (!isValid) {
      // no more than quantity : event in only one town
      addInvalid2Class(locationsGroup);
    }

  }
  return isValid;
}

// ---------------------------------------------------------------------------------------------------------
// validation classes
// ---------------------------------------------------------------------------------------------------------

// remove all validation classes from element
function removeValidationClasses (element) {
  element.classList.remove('invalid', 'invalid2');
}

// add invalid class to element
function addInvalidClass (element) {
  element.classList.add('invalid');
}

// add invalid2 class to element
function addInvalid2Class (element) {
  element.classList.add('invalid2');
}

// ---------------------------------------------------------------------------------------------------------
// listener utility method
// ---------------------------------------------------------------------------------------------------------

// add multiple event listener to element
function addListenerMulti(element, eventNames, listener) {
  const events = eventNames.split(' ');
  for (let i=0, iLen=events.length; i<iLen; i++) {
    element.addEventListener(events[i], listener, false);
  }
}
