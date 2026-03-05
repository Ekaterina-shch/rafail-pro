export function initBackToTop() {
  const anchor = document.getElementById('top-anchor');

  const btn = document.getElementById('js-to-top');

  if (!anchor || !btn) return;

  btn.addEventListener('click', () => {
    const elementPosition = anchor.getBoundingClientRect().top;
    const offsetY = Number(anchor.dataset.offsetY) || 0;

    const offsetPosition = elementPosition + window.pageYOffset - offsetY;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  });

  const observerOptions = {
    root: null,
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const isBelowAnchor =
        !entry.isIntersecting && entry.boundingClientRect.top < 0;

      if (isBelowAnchor) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    });
  }, observerOptions);

  observer.observe(anchor);
}
