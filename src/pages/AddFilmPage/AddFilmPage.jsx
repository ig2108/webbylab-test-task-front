import React, { Component } from 'react';
import shortid from 'shortid';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import * as filmsApi from '../../services/filmsApi';
import Button from '../../components/Button/Button';

import styles from './AddFilmPage.module.css';
import buttonStyles from '../../components/Button/Button.module.css';

export default class AddFilmPage extends Component {
  state = {
    title: '',
    releaseYear: '',
    format: 'DVD',
    stars: '',
    filmToAdd: null,
    filmsList: null,
  };

  // GENERATE INPUTS ID ============================

  titleInputId = shortid.generate();
  releaseYearInputId = shortid.generate();
  starsInputId = shortid.generate();
  formatInputId = shortid.generate();

  // LIFECYCLE METHODS ============================

  componentDidMount() {
    this.setFilmsFromDbToState();
  };

  componentDidUpdate() {
    if (this.state.filmToAdd !== null) {
      this.addNewFilmInDb(this.state.filmToAdd);
      this.resetState();
    };

    if (this.state.filmToAdd === null) {
      this.setFilmsFromDbToState();
    };
  };

  // HANDLE-EVENT METHODS ============================

  handleSubmit = (e) => {
    e.preventDefault();
    const {title, releaseYear, format, stars} = this.state;
    if (title === '' || releaseYear === '' || stars === '') {
      NotificationManager.error('Please, fill empty inputs!', 'Some of inputs are empty...', 5000);
      return;
    };

    const formatStars = stars.split(', ');

    const isValid = this.validateForm(title, + releaseYear, formatStars);

    if (!isValid) {
      return;
    };

    this.setState({
      filmToAdd: {
        title,
        releaseYear: + releaseYear,
        format,
        stars: formatStars,
      },
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    if (name === "releaseYear" && value < 0) {
      e.target.value = 0;
      NotificationManager.error('Please, enter a year from 1850 to 2020', 'Release year can not be less, then 0!', 5000);
      return;
    };
    this.setState({
      [name]: value,
    });
  };

  // VALIDATION METHODS ============================

  validateForm (title, releaseYear, starsArray) {
    const validationResultYear = this.validateReleaseYear(releaseYear, 1850, 2020);
    const validationResultActors = this.validateStarsList(starsArray);
    const validationResultDuplicates = this.validateOnDuplicates(title, releaseYear, starsArray);

    if (!validationResultYear || !validationResultActors || !validationResultDuplicates) {
      return false;
    };
    return true;
  };

  validateReleaseYear (year, min, max) {
    if (year < min || year > max) {
      NotificationManager.error(`Please, enter year from ${min} to ${max}`, 'Release year is not correct!', 5000);
      return false;
    };
    return true;
  };

  validateStarsList (stars) {
    const isUnique = this.checkArrayConsistOfUniqueElements(stars);

    if (!isUnique) {
      NotificationManager.error('Please, enter a unique (not repeat) actors data', 'Duplicate Actors Data!', 5000);
      return false;
    };
    return true;
  };

  validateOnDuplicates (title, releaseYear, stars) {
    const {filmsList} = this.state;

    const filteredByTitleFilms = filmsList.filter(film => film.title === title);
    let isFilmDuplicated;

    if (filteredByTitleFilms.length > 0) {
      isFilmDuplicated = this.isFilmDuplicateByYearOrActors(filteredByTitleFilms, releaseYear, stars);
    };

    if (isFilmDuplicated) {
      NotificationManager.error('Film with similar title and release year/actors already has added .Please, enter other release year/actors data', 'Duplicate Films!', 5000);
      return false;
    } else {
      return true;
    };
  };

  // API METHODS ============================

  addNewFilmInDb = (film) => {
    filmsApi
    .addNewFilm(film)
    .catch(err => console.log(err));
  };

  setFilmsFromDbToState = () => {
    filmsApi
    .getAllFilms()
    .then(({ data }) => {
      this.setFilmsToState(data);
    })
    .catch(err => console.log(err));
  };

  // HELP METHODS ============================

  setFilmsToState = (filmsList) => {
    this.setState({
      filmsList,
    });
  };

  isFilmDuplicateByYearOrActors = (filmsArray, year, actorsArray) => {
    const matchedFilmObjByReleaseYear = this.findFilmByReleaseYear(year, filmsArray);
    const matchedFilmsByActors = this.findFilmsByActors(actorsArray, filmsArray);

    if ( matchedFilmObjByReleaseYear || matchedFilmsByActors.length > 0) {
      return true;
    };
    return false;
  };

  findFilmByReleaseYear = (year, filmsArray) => {
    return filmsArray.find(film => film.releaseYear === year);
  };

  findFilmsByActors = (actorsArray, filmsArray) => {
    let matchedFilms = [];
    actorsArray.find(actor => {
      return filmsArray.find(film => {
        if (film.stars.includes(actor)) {
          matchedFilms.push(film);
        };
      });
    });

    return matchedFilms;
  };

  resetState = () => {
    this.setState({
      title: '',
      releaseYear: '',
      format: 'DVD',
      stars: '',
      filmToAdd: null,
    });
  };

  checkArrayConsistOfUniqueElements = (arr) => {
    const uniqueArray = [...new Set(arr)];

    if (arr.length !== uniqueArray.length) {
      return false;
    };

    return true;
  };

  // RENDER ============================

  render() {
    const { title, releaseYear, format, stars } = this.state;
    return (
      <>
        <form className={styles.addFilmForm} onSubmit={this.handleSubmit}>
          <label className={styles.labelItem} htmlFor={this.titleInputId}>
            <p className={styles.textOfLabelTitle}>Film title</p>
            <input
              className={styles.inputName}
              type="text"
              name="title"
              value={title}
              onChange={this.handleChange}
              id={this.titleInputId}
            />
          </label>
          <label className={styles.labelItem} htmlFor={this.releaseYearInputId}>
            <p className={styles.textOfLabelTitle}>Release year</p>
            <input
              className={styles.inputName}
              type="number"
              name="releaseYear"
              value={releaseYear}
              onChange={this.handleChange}
              id={this.releaseYearInputId}
            />
          </label>
          <label className={styles.labelItem} htmlFor={this.starsInputId}>
            <p className={styles.textOfLabelTitle}>Actors (separate by commas and space)</p>
            <input
              className={styles.inputName}
              type="text"
              name="stars"
              value={stars}
              onChange={this.handleChange}
              id={this.starsInputId}
            />
          </label>
          <label className={styles.labelItem} htmlFor={this.formatInputId}>
            <p className={styles.textOfLabelTitle}>Format</p>
            <select
              className={styles.inputName}
              name="format"
              value={format}
              onChange={this.handleChange}
              id={this.formatInputId}
            >
              <option value={"DVD"}>DVD</option>
              <option value={"VHS"}>VHS</option>
              <option value={"Blu-Ray"}>Blu-Ray</option>
            </select>
          </label>
          <Button nameOfClass={buttonStyles.addFilmFormButton} typeOfButton={'submit'} holderText={'Add film'}  />
          <NotificationContainer/>
        </form>
      </>
    )
  };
};
