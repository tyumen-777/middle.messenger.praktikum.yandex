class ModalToggle {
  openModal(modalName: string, closeClass?: string) {
    const modal = document.getElementById(modalName);
    modal?.classList.remove(closeClass || 'modal__closed');
  }

  closeModal(modalName: string, closeClass?: string) {
    const modal = document.getElementById(modalName);
    modal?.classList.add(closeClass || 'modal__closed');
  }
}

export const toggleModal = new ModalToggle();
