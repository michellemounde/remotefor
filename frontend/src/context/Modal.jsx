import React, { useRef, useState, useContext } from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null);

    // If callback function is truthy, call the callback function and reset it to null
    if (typeof onModalClose === 'function') {
      onModalClose();
      setOnModalClose(null);
    }
  };

  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function to be called when modal is closing
    closeModal, // function to close the modal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef}></div>
    </>
  );
};

export const Modal = () => {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);

  if (!modalRef || !modalRef.current || !modalContent) return null;

  return ReactDOM.createPortal(
    <div id='modal'>
      <div id='modal-background' onClick={closeModal}></div>
      <div id='modal-content'>{modalContent}</div>
    </div>,
    modalRef.current,
  );
};

export const useModal = () => useContext(ModalContext);
