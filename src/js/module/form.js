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

const validateField = (field, showError = false) => {
  const value = field.value.trim();
  const type = field.dataset.type || field.type;
  const checked = field.checked;
  const wrapper = field.closest('[data-input-wrapper]');
  const errorMessage = wrapper?.querySelector('[data-error]');

  let isValid = true;
  let message = '';

  switch (type) {
    case 'no-name':
      if (value.length > 0) {
        isValid = false;
      }
      break;

    case 'name':
      if (value.length === 0) {
        isValid = false;
        message = 'Введите имя.';
      } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)) {
        isValid = false;
        message = 'Имя не должно содержать цифры и спецсимволы.';
      } else if (value.length < 2) {
        isValid = false;
        message = 'Имя должно содержать не менее 2-х символов.';
      }
      break;
    case 'tel':
      const digits = value.replace(/\D/g, '');

      const localDigits = digits.startsWith('7') ? digits.slice(1) : digits;
      if (localDigits.length < 10) {
        isValid = false;
        message = 'Введите корректный номер телефона.';
      }
      break;
    case 'email':
      if (value.length === 0) {
        isValid = false;
        message = 'Введите email.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        isValid = false;
        message = 'Введите корректный email.';
      }
      break;
    case 'checkbox':
      if (!checked) {
        isValid = false;
        message = 'Необходимо ваше согласие.';
      }
      break;
  }
  if (errorMessage) {
    if (showError) {
      errorMessage.textContent = message;
      errorMessage.style.display = isValid ? 'none' : 'block';
    } else {
      errorMessage.style.display = 'none';
    }
  }

  // Для чекбокса вешаем error на label, а не на wrapper
  const errorTarget =
    (type === 'checkbox' ? field.closest('label') : null) ||
    field.closest('[data-input-wrapper]') ||
    field;

  errorTarget?.classList.toggle('error', showError && !isValid);
  return isValid;
};
const validateForm = (form, showErrors = false) => {
  let isValid = true;
  const fields = form.querySelectorAll('[data-validate]');
  fields.forEach((field) => {
    const shouldShow = showErrors || field.dataset.touched === 'true';
    const isFieldValid = validateField(field, shouldShow);
    isValid = isValid && isFieldValid;
  });
  return isValid;
};

export const initForms = () => {
  const forms = document.querySelectorAll('.my-form');
  if (!forms.length) return;

  forms.forEach((form) => {
    const submitButton = form.querySelector('[type="submit"]');
    const url = form.dataset.action || '/send.php';

    form.addEventListener('input', (e) => {
      const field = e.target.closest('[data-validate]');
      if (field) {
        field.dataset.touched = 'true';
        validateField(field, true);
      }
    });

    form.addEventListener('change', (e) => {
      const field = e.target.closest('[data-validate]');
      if (
        field &&
        (field.type === 'checkbox' || field.dataset.type === 'checkbox')
      ) {
        field.dataset.touched = 'true';
        validateField(field, true);
      }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const isValid = validateForm(form, true);

      if (!isValid) return;

      const formData = new FormData(form);
      formData.append('action', 'cta_form_submit');

      try {
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
          credentials: 'same-origin',
        });

        if (!response.ok) throw new Error('Ошибка сети');

        const result = await response.json();

        if (result && result.success) {
          const goal = form.dataset.metricTarget;
          if (goal && typeof ym !== 'undefined') {
            ym(108518563, 'reachGoal', goal);
            console.log(`Цель ${goal} отправлена`);
          }

          form.reset();
          successAlert();
        } else {
          console.error('Сервер вернул ошибку:', result.message);
          errorAlert();
        }
      } catch (error) {
        console.error('Ошибка при отправке:', error);
        errorAlert();
      }
    });
  });
};
