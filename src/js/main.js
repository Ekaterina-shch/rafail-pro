import '/src/css/style.css';

import { initPhoneMasks } from './module/phone-mask';
import { initStickyHeader } from './module/header-fixed';
import { initMobileMenu } from './module/mobile-menu';
import { initAuthorCardClose } from './module/authorCard';
import { initBackToTop } from './module/scrollUtils';

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initPhoneMasks();
  initMobileMenu();
  initAuthorCardClose();
  initBackToTop();
});
