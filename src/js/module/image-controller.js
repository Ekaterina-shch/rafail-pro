import { openModal } from './modal';

export const initImageZoom = (modal, btnSelector = '.zoom-btn') => {
  if (!modal) return;

  const modalImg = modal.querySelector('.modal-image--full');

  document.addEventListener('click', (event) => {
    const btn = event.target.closest(btnSelector);

    if (btn) {
      const imageContainer = btn.closest('.image-wrapper');
      const sourceImg = imageContainer
        ? imageContainer.querySelector('img')
        : btn.querySelector('img');

      if (modalImg && sourceImg) {
        modalImg.src = sourceImg.src;
      }

      openModal(modal);
    }
  });
};
