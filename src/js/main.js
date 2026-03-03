import '/src/css/style.css';

import { initPhoneMasks } from './module/phone-mask';
import { initStickyHeader } from './module/header-fixed';
import { initMobileMenu } from './module/mobile-menu';

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initPhoneMasks();
  initMobileMenu();
});
