import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';

import Button from '../Button/Button';

import styles from './FilmsList.module.css';
import buttonStyles from '../Button/Button.module.css'

const FilmsList = ({ films = [], location, onDeleteFunc }) => {
  return (
    <ul className={styles.filmsList}>
      {films.map(({ _id, title }) => (
        <li key={_id} className={styles.filmsListItem}>
          <Link className={styles.filmListItem__Link} to={{ pathname: `/films/${_id}`, state: { from: location } }}>
            <p className={styles.filmsListItemTitle}>{title}</p>
          </Link>
          <Button onClickFunc={onDeleteFunc} holderText={'Delete'} typeOfButton={'button'} nameOfClass={buttonStyles.deleteButton} dataId={_id}/>
        </li>
      ))}
    </ul>
  );
};

// FilmsList.propTypes = {
//   films: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string,
//       title: PropTypes.string,
//     }),
//   ).isRequired,
//   location: PropTypes.object.isRequired,
// };

export default withRouter(FilmsList);
