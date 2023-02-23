import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form  input[name="email"]'),
  message: document.querySelector('.feedback-form  textarea[name="message"]'),
};
const FEEDBACK_STORAGE_KEY = 'feedback-form-state';

const saveData = function (dataObject) {
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(dataObject));
}

const getData = function () {
  const savedData = localStorage.getItem(FEEDBACK_STORAGE_KEY);
  try {
    return JSON.parse(savedData);
  } catch (error) {
    console.log(`${error.name}:  ${error.message}`);
    return null;
  }
}

const onDocumentLoad = function () {
  const userData = getData();
  if (userData) {
    refs.email.value = userData.email;
    refs.message.value = userData.message;
  }
}

const onFormInput = function () {
  const userData = {};
  userData.email = refs.email.value;
  userData.message = refs.message.value;
  saveData(userData);
}

const onFormSubmit = function (event) {
  event.preventDefault();
  const userData = getData();
  localStorage.removeItem(FEEDBACK_STORAGE_KEY);
  console.log(userData);
  event.currentTarget.reset();
}

document.addEventListener("DOMContentLoaded", onDocumentLoad);
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));