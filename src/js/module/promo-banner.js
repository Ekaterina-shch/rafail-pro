// promo-banner.js

import { debounce } from '../utils/debounce';

export function initPromoBanner(
  bannerSelector = '.promo-banner--fixed',
  triggerSelector = '#trigger-banner',
  maxWidth = 1400,
) {
  const banner = document.querySelector(bannerSelector);
  const triggerElement = document.querySelector(triggerSelector);

  if (!banner || !triggerElement) return;

  const handleScroll = () => {
    const isCorrectWidth = window.innerWidth <= maxWidth;

    // Получаем расстояние от верхней границы окна до начала статьи
    const triggerPosition = triggerElement.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    const isVisible = triggerPosition < screenHeight;

    const isBelowStart = triggerPosition < screenHeight;

    if (isCorrectWidth && isBelowStart) {
      banner.classList.add('active');
    } else {
      banner.classList.remove('active');
    }
  };

  const debouncedResize = debounce(handleScroll, 150);

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', debouncedResize);

  handleScroll();
}
