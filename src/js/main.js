import '/src/css/style.css';

import { initPhoneMasks } from './module/phone-mask';
import { initStickyHeader } from './module/header-fixed';
import { initMobileMenu } from './module/mobile-menu';
import { initAuthorCardClose } from './module/authorCard';
import { initBackToTop } from './module/scrollUtils';
import { initPromoBanner } from './module/promo-banner';
import { initImageZoom } from './module/image-controller';
import { closeModal } from './module/modal';

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initPhoneMasks();
  initMobileMenu();
  initAuthorCardClose();
  initBackToTop();
  initPromoBanner();

  const imageModal = document.querySelector('#image-modal');
  if (imageModal) {
    initImageZoom(imageModal);

    imageModal?.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('modal') ||
        e.target.closest('.modal-close')
      ) {
        closeModal(imageModal);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageModal.classList.contains('active')) {
        closeModal(imageModal);
      }
    });
  }
});
