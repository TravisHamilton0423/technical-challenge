import React from 'react';

const ModalContext = React.createContext({
  showModal: false,
  currentId: null,
  closeModal: () => {},
});

export default ModalContext;
