// modal-controller.js
import { openModal, closeModal } from './modal';

export const initModalLogic = () => {
  document.addEventListener('click', (e) => {
    // --- ОТКРЫТИЕ ---
    const trigger = e.target.closest('[data-modal-open]');

    if (trigger) {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal-open');
      const targetModal = document.querySelector(modalId);

      if (!targetModal) return;

      // 1. Логика для передачи текста/услуги
      const serviceName = trigger.dataset.service;
      const serviceInput = targetModal.querySelector(
        'input[name="service_name"]',
      );
      if (serviceInput) {
        serviceInput.value = serviceName || 'Общий запрос';
      }

      // 2. Логика для ЗУМА изображений
      // Если у кнопки есть data-modal-image или это кнопка зума
      const modalImg = targetModal.querySelector('.modal-image--full');
      if (modalImg) {
        // Ищем картинку: либо по селектору из data, либо просто ближайшую img
        const sourceImg =
          trigger.querySelector('img') ||
          trigger.closest('.image-wrapper')?.querySelector('img');
        if (sourceImg) {
          modalImg.src = sourceImg.src;
        }
      }

      openModal(targetModal);
    }

    // --- ЗАКРЫТИЕ ---
    if (
      e.target.closest('[data-modal-close]') ||
      e.target.classList.contains('modal')
    ) {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) closeModal(activeModal);
    }
  });

  // Закрытие по Escape (один раз на весь документ)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) closeModal(activeModal);
    }
  });
};
