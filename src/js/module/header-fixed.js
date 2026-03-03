export const initStickyHeader = () => {
  const header = document.querySelector('.header-top');
  const fixedClass = 'header-top--fixed';

  if (!header) return;

  const handleHeaderState = () => {
    const isMobileOrTablet = window.innerWidth < 1024;
    const isScrolled = window.scrollY > 0;

    if (isMobileOrTablet && isScrolled) {
      header.classList.add(fixedClass);
    } else {
      header.classList.remove(fixedClass);
    }
  };

  window.addEventListener('scroll', handleHeaderState, { passive: true });

  window.addEventListener('resize', handleHeaderState);

  handleHeaderState();
};
