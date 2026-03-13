import '/src/css/style.css';

import { initPhoneMasks } from './module/phone-mask';
import { initStickyHeader } from './module/header-fixed';
import { initMobileMenu } from './module/mobile-menu';
import { initAuthorCardClose } from './module/authorCard';
import { initBackToTop } from './module/scrollUtils';
import { initPromoBanner } from './module/promo-banner';
import { initModalLogic } from './module/modal-controller';
import { initForms } from './module/form';
import { initReviewToggler } from './module/reviewToggler';
import { debounce } from './utils/debounce';

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initPhoneMasks();
  initMobileMenu();
  initAuthorCardClose();
  initBackToTop();
  initPromoBanner();
  initModalLogic();
  initForms();

  const reviewsSection = document.querySelector('.client-review');
  if (reviewsSection) {
    initReviewToggler();

    const handleResize = debounce(() => {
      initReviewToggler();
    }, 150);

    window.addEventListener('resize', handleResize);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
});
