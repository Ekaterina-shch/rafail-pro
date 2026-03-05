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

  const setupModalClose = (modal) => {
    modal.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('modal') ||
        e.target.closest('.modal-close')
      ) {
        closeModal(modal);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal(modal);
      }
    });
  };

  //  Модалка для статей
  const imageModal = document.querySelector('#image-modal');
  if (imageModal) {
    initImageZoom(imageModal, '.zoom-btn');
    setupModalClose(imageModal);
  }

  //  Модалка для отзывов
  const reviewModal = document.querySelector('#review-modal');
  if (reviewModal) {
    initImageZoom(reviewModal, '.client-review__zoom-image');
    setupModalClose(reviewModal);
  }
});
