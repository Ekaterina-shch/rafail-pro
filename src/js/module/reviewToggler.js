export const initReviewToggler = () => {
  const reviewItems = document.querySelectorAll('.client-review__item');

  if (!reviewItems.length) return;

  reviewItems.forEach((item) => {
    const wrapper = item.querySelector('.client-review__item-wrapper');
    const body = item.querySelector('.client-review__body');
    const text = body?.querySelector('p');

    if (!text || !wrapper) return;

    const existingBtn = wrapper.querySelector('.review-toggle-btn');
    if (existingBtn) {
      existingBtn.remove();
    }
    // Сбрасываем состояние развернутости, чтобы замерить реальную высоту текста
    body.classList.remove('is-expanded');

    if (text.scrollHeight > text.offsetHeight) {
      const btn = document.createElement('button');
      btn.className = 'review-toggle-btn';
      btn.type = 'button';
      btn.innerHTML = `
        <span class="review-toggle-btn__text">Читать отзыв полностью</span>
        <svg
          class="review-toggle-btn__arrow"
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      `;

      wrapper.appendChild(btn);

      btn.addEventListener('click', () => {
        const isExpanded = body.classList.toggle('is-expanded');
        const btnText = btn.querySelector('.review-toggle-btn__text');

        if (isExpanded) {
          btnText.textContent = 'Свернуть отзыв';
          btn.classList.add('is-active');
        } else {
          btnText.textContent = 'Читать отзыв полностью';
          btn.classList.remove('is-active');
        }
      });
    }
  });
};
