import React from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';

import styles from './Nav.module.css';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink
            className={styles.navItem__Link}
            activeClassName={styles.activeLink}
            exact
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            className={styles.navItem__Link}
            activeClassName={styles.activeLink}
            to="/films"
          >
            Add Film
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
