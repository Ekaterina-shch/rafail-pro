export const openModal = (modal) => {
  if (!modal) return;
  modal.classList.add('active');
};

export const closeModal = (modal) => {
  if (!modal) return;
  modal.classList.remove('active');
};
