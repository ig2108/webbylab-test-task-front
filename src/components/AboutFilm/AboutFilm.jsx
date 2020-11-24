import React from 'react';
// import PropTypes from 'prop-types';
import styles from './AboutFilm.module.css';

const AboutFilm = ({ film }) => {
  const { title, releaseYear, format = "DVD", stars = [] } = film;

  return (
    <>
      <div className={styles.filmInfo}>
        <h2 className={styles.filmName}> {title}</h2>
        <p className={styles.chapterInfo}>Release Year: {releaseYear}</p>
        <h3 className={styles.chapterTitle}>Format</h3>
        <p className={styles.chapterInfo}>{format}</p>
        <h3 className={styles.chapterTitle}>Stars:</h3>
        <div className={styles.genresList}>
          {stars.map(star => (
            <span key={stars.indexOf(star)} className={styles.genresItem}>
              { `${star}; `}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

// AboutFilm.propTypes = {
//   film: PropTypes.shape({
//     poster_path: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     vote_average: PropTypes.number.isRequired,
//     overview: PropTypes.string.isRequired,
//     genres: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         name: PropTypes.string.isRequired,
//       }).isRequired,
//     ),
//   }),
// };

export default AboutFilm;
