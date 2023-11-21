import React from 'react';
import { useModal } from '../../context/Modal';

const OpenModalMenuItem = ({
  modalComponent,
  // text of the menu item that opens the modal
  itemText,
  // optional: callback function that will be called once the menu item that opens the modal is clicked
  onItemClick,
  onModalClose,
}) => {
  const { setModalContent, setOnModalClose } = useModal();

  const handleClick = () => {
    if (typeof onItemClick === 'function') onItemClick();
    if (typeof onModalClose === 'function') setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  return <li onClick={handleClick}>{itemText}</li>;
};

export default OpenModalMenuItem;
