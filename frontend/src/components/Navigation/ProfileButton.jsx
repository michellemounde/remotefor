import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

import { logout } from '../../store/session';

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    if (showMenu) {
      const closeMenu = (e) => {
        if (!dropdownRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener('click', closeMenu);
    }
  }, [showMenu]);

  const openMenu = (e) => {
    e.stopPropagation();
    if (!showMenu) setShowMenu(true);
  };

  const closeMenu = () => setShowMenu(false);

  const logoutUser = () => {
    dispatch(logout());
    closeMenu();
  };

  const profileMenu = (user &&
    <>
      <li>{user.username}</li>
      <li>{user.firstName} {user.lastName}</li>
      <li>{user.email}</li>
      <li><button onClick={logoutUser}>Log Out</button></li>
    </>
  );

  const registrations = (
    <>
      <OpenModalMenuItem itemText='Log In' onItemClick={closeMenu} modalComponent={<LoginFormModal />}/>
      <OpenModalMenuItem itemText='Sign Up' onItemClick={closeMenu} modalComponent={<SignupFormModal />}/>
    </>
  );

  return (
    <>
      <button onClick={openMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22.4" height="25.6" viewBox="0 0 448 512">
          {/*
            Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com
            License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.
          */}
          <path
            d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3
              464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3
              304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
          />
        </svg>
      </button>
      <ul style={{ listStyle: 'none' }} ref={dropdownRef}>
        {user ? showMenu && profileMenu : showMenu && registrations}
      </ul>
    </>
  );
};

export default ProfileButton;
