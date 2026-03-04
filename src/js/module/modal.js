// modal.js
export const openModal = (modal) => {
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

export const closeModal = (modal) => {
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
};
