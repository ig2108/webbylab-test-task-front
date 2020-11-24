import React from 'react';
import PropTypes from 'prop-types';

import styles from './AboutFilm.module.css';

const AboutFilm = ({ film }) => {
  const { title, releaseYear, format = "DVD", stars = [] } = film;

  return (
    <>
      <div className={styles.filmInfo}>
        <h2 className={styles.filmTitle}> {title}</h2>
        <div className={styles.chapterWrap}>
          <h3 className={styles.chapterTitle}>Release Year:</h3>
          <p className={styles.chapterInfo}>{releaseYear};</p>
        </div>
        <div className={styles.chapterWrap}>
          <h3 className={styles.chapterTitle}>Stars:</h3>
          <div className={styles.starsList}>
            {stars.map(star => (
              <span key={stars.indexOf(star)} className={styles.starsItem}>
                { `${star}; `}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.chapterWrap}>
          <h3 className={styles.chapterTitle}>Format:</h3>
          <p className={styles.chapterInfo}>{format};</p>
        </div>
      </div>
    </>
  );
};

AboutFilm.propTypes = {
  film: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    stars: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

export default AboutFilm;
