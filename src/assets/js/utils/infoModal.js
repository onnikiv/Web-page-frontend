const infoModal = (info) => {
  const modal = document.getElementById('info-modal');
  const closeButton = document.createElement('button');
  closeButton.textContent = 'X';
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.append(closeButton, info);
  modal.showModal();
};

export {infoModal};
