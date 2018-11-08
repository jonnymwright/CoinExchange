import React from 'react';
import UserSelectorController from './UserSelector/UserSelectorController';

const NavBarView = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
    <div className="container">
      <a className="navbar-brand text-light">
        Bitcoin Exchange
      </a>

      <ul className="navbar-nav mr-auto" />

      <UserSelectorController />
    </div>
  </nav>
);

export default NavBarView;