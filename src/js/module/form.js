import { closeModal } from './modal';

export const successAlert = () => {
  const successModal = document.getElementById('success-modal');
  const allModals = document.querySelectorAll('.modal');

  if (successModal) {
    allModals.forEach((modal) => {
      if (modal.classList.contains('active')) {
        closeModal(modal);
      }
    });
    successModal.classList.add('active');

    setTimeout(() => {
      if (successModal.classList.contains('active')) {
        closeModal(successModal);
      }
    }, 3000);
  }
};
export const errorAlert = () => {
  const errorModal = document.getElementById('error-modal');
  if (errorModal) {
    errorModal.classList.add('active');
    setTimeout(() => {
      if (errorModal.classList.contains('active')) {
        closeModal(errorModal);
      }
    }, 3000);
  }
};
const lang = document.documentElement.lang;
const validateField = (field) => {
  const value = field.value.trim();
  const type = field.dataset.type || field.type;
  const checked = field.checked;
  const errorMessage = field
    .closest('[data-input-wrapper]')
    ?.querySelector('[data-error]');
  let isValid = !0;
  let message = '';
  switch (type) {
    case 'no-name':
      if (value.length) {
        isValid = !1;
      }
      break;
    case 'name':
      const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
      if (!nameRegex.test(value)) {
        isValid = !1;
        message =
          lang === 'ru'
            ? 'Имя не должно содержать цифры и спецсимволы.'
            : 'The name must not contain numbers or special characters.';
      } else if (value.length < 2) {
        isValid = !1;
        message =
          lang === 'ru'
            ? 'Имя должно содержать не менее 2-х символов.'
            : 'The name must contain at least 2 characters.';
      }
      break;
    case 'tel':
      const phoneValue = value.replace(/\D/g, '');
      if (phoneValue.length <= 5) {
        isValid = !1;
        message =
          lang === 'ru'
            ? 'Введите корректный номер телефона.'
            : 'Enter the correct phone number.';
      }
      break;
    case 'email':
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        isValid = !1;
        message =
          lang === 'ru'
            ? 'Введите корректный email.'
            : 'Enter the correct email address.';
      }
      break;
    case 'checkbox':
      if (!checked) {
        isValid = !1;
      }
      break;
  }
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.style.display = isValid ? 'none' : 'block';
  }
  field.classList.toggle('error', !isValid);
  return isValid;
};
const validateForm = (form) => {
  let isValid = !0;
  const fields = form.querySelectorAll('[data-validate]');
  fields.forEach((field) => {
    const isFieldValid = validateField(field);
    field.classList.toggle('error', !isFieldValid);
    isValid = isValid && isFieldValid;
  });
  return isValid;
};
const collectFormData = (form) => {
  const data = {};
  const fields = form.querySelectorAll('[name]');

  fields.forEach((field) => {
    data[field.name] = field.value.trim();
  });

  // console.log('data:', data);
  return data;
};
const sendFormData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Ошибка отправки данных');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Ошибка отправки:', error);
    throw error;
  }
};
export const initForms = () => {
  const forms = document.querySelectorAll('.my-form');
  if (!forms.length) return;

  forms.forEach((form) => {
    const submitButton = form.querySelector('[type="submit"]');
    const successMessage = () => successAlert();
    const errorMessage = () => errorAlert();
    const url = form.dataset.action || '/submit';

    form.addEventListener('input', () => {
      const isValid = validateForm(form);
      submitButton.disabled = !isValid;
    });
    form.addEventListener('submit', async (e) => {
      // console.log('submit triggered');
      e.preventDefault();
      // console.log('preventDefault called');
      if (!validateForm(form)) {
        console.error('Форма не прошла валидацию.');
        return;
      }
      const formData = collectFormData(form);

      try {
        // const result = await sendFormData(url, formData);
        e.target.reset();

        // const goalName = form.dataset.goal;
        // if (goalName) {
        //   sendMetrikaGoal(goalName);
        // }

        successMessage();
      } catch (error) {
        console.error('Ошибка при отправке:', error);
        errorMessage();
      }
    });
    submitButton.disabled = !0;
  });
};
