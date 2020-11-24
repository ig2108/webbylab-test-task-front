import React, { Component } from 'react';
import shortid from 'shortid';

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
  };

  titleInputId = shortid.generate();
  releaseYearInputId = shortid.generate();
  starsInputId = shortid.generate();
  formatInputId = shortid.generate();

  addNewFilmInDb = (film) => {
    filmsApi
    .addNewFilm(film)
    .catch(err => console.log(err));
  };

  componentDidUpdate() {
    if (this.state.filmToAdd !== null) {
      this.addNewFilmInDb(this.state.filmToAdd);
      this.resetState();
    };
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {title, releaseYear, format, stars} = this.state;
    const formatStars = stars.split(', ');
    this.setState({
      filmToAdd: {
        title,
        releaseYear,
        format,
        stars: formatStars,
      },
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    if (name === "releaseYear" && value < 0) {
      e.target.value = 0;
      return;
    }
    this.setState({
      [name]: value,
    });
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

  render() {
    const { title, releaseYear, format, stars } = this.state;
    return (
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
      </form>
    );
  };
};
