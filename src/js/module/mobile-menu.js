// mobile-menu.js
import { debounce } from '../utils/debounce';
import { closeModal, openModal } from './modal';

export function initMobileMenu() {
  const burgerBtn = document.querySelector('.header__burger');
  const mobileMenu = document.querySelector('#mobile-menu');
  const headerTop = document.querySelector('.header-top');

  if (!burgerBtn) return;

  function toggleMenu(isOpen) {
    const isOpening =
      isOpen !== undefined ? isOpen : !burgerBtn.classList.contains('active');

    [burgerBtn, headerTop].forEach((el) =>
      el?.classList.toggle('active', isOpening),
    );

    isOpening ? openModal(mobileMenu) : closeModal(mobileMenu);

    burgerBtn.setAttribute(
      'aria-label',
      isOpening ? 'Закрыть меню' : 'Открыть меню',
    );
    document.body.style.overflow = isOpening ? 'hidden' : '';
  }

  burgerBtn?.addEventListener('click', () => toggleMenu());

  const handleResize = debounce(() => {
    if (window.innerWidth >= 1024 && burgerBtn.classList.contains('active')) {
      toggleMenu(false);
    }
  }, 100);

  window.addEventListener('resize', handleResize);
}
