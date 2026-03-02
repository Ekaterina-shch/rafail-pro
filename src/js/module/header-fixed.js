export const initStickyHeader = (
  headerSelector = '.header__top',
  fixedClass = 'header__top--fixed',
) => {
  const header = document.querySelector(headerSelector);

  if (!header) {
    console.warn(`Элемент с селектором "${headerSelector}" не найден.`);
    return;
  }

  const handleScroll = () => {
    if (window.scrollY > 0) {
      header.classList.add(fixedClass);
    } else {
      header.classList.remove(fixedClass);
    }
  };

  handleScroll();

  window.addEventListener('scroll', handleScroll);
};
