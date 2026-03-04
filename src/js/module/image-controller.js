import { openModal } from './modal';

export const initImageZoom = (modal) => {
  if (!modal) return;

  const modalImg = modal.querySelector('.modal-content');

  document.addEventListener('click', (event) => {
    // Ищем ближайшую кнопку зума от места клика
    const btn = event.target.closest('.zoom-btn');

    if (btn) {
      // Находим родительский блок, чтобы забрать данные
      const imageContainer = btn.closest('.image-wrapper');
      const sourceImg = imageContainer.querySelector('.article-image');

      if (modalImg) modalImg.src = sourceImg.src;

      openModal(modal);
    }
  });
};
