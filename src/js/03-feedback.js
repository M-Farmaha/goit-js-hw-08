const throttle = require('lodash.throttle');

const formEl = document.querySelector('.feedback-form');
const inputEmailEl = formEl.querySelector('[name="email"]');
const inputMessageEl = formEl.querySelector('[name="message"]');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

fillInTheInputs();

const formObj = { email: inputEmailEl.value, message: inputMessageEl.value };

formEl.addEventListener('input', throttle(onFormElInput, 500));
formEl.addEventListener('submit', onFormElSubmit);

function onFormElInput(e) {
  formObj[e.target.name] = e.target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formObj));
}

function onFormElSubmit(e) {
  e.preventDefault();

  if (inputEmailEl.value && inputMessageEl.value) {
    console.log(formObj);
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    e.target.reset();
    formObj.email = inputEmailEl.value;
    formObj.message = inputMessageEl.value;
  }
}

function fillInTheInputs() {
  const savedInputs = localStorage.getItem(LOCAL_STORAGE_KEY);
  const savedInputsParsed = JSON.parse(savedInputs);

  if (savedInputsParsed) {
    inputEmailEl.value = savedInputsParsed.email;
    inputMessageEl.value = savedInputsParsed.message;
  }
}
