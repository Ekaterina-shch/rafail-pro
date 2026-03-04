export function initAuthorCardClose() {
  const card = document.querySelector('.author-card--fixed');
  const closeBtn = card?.querySelector('.author-card__btn-close');

  // Проверяем, существуют ли элементы на странице
  if (card && closeBtn) {
    closeBtn.addEventListener('click', () => {
      card.style.display = 'none';
    });
  }
}
