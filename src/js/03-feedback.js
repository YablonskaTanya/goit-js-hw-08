import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[name="email"]'),
  message: document.querySelector('textarea[name="message"]'),
};

const LOCAL_STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

let formData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};

function onFormInput(e) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  formData[e.target.name] = e.target.value;
}

function onFormSubmit(e) {
  e.preventDefault();
  e.target.reset();
  formData = {};
  console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

function getValueFromLocalStorage() {
  const { email, message } = refs;
  email.value = formData.email || '';
  message.value = formData.message || '';
}
getValueFromLocalStorage();
