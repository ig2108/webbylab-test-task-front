import React, { Component } from 'react';

import * as filmsApi from '../../services/filmsApi';

import Button from '../../components/Button/Button';
import FilmsList from '../../components/FilmsList/FilmsList';
import Searchbar from '../../components/Searchbar/Searchbar';

import styles from './HomePage.module.css';
import buttonStyles from '../../components/Button/Button.module.css';

const filterFilmsByTitle = (films, filter) => {
  return films.filter(film =>
    film.title.toLowerCase().includes(filter.toLowerCase()),
  );
};
const filterFilmsByActor = (films, filter) => {
  return films.filter(film =>
    film.stars.map(star => star.toLowerCase()).includes(filter.toLowerCase())
  );
};

export default class HomePage extends Component {
  state = {
    films: [],
    sortByTitle: false,
    filterTitle: '',
    filterActor: '',
  };

  componentDidMount() {
      this.setFilmsFromDbToState();
      this.setState({
        filterTitle: '',
        filterActor: '',
      })
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.films !== this.state.films) {
      console.log("Updated state!");
    };

    if (prevState.filterTitle !== this.state.filterTitle || prevState.filterActor !== this.state.filterActor) {
      console.log('Updated search!');
    };
  };

  setFilmsFromDbToState () {
    filmsApi
    .getAllFilms()
    .then(({ data }) => {
      this.setFilmsToState(data);
    })
    .catch(err => console.log(err));
  };

  setSortedFilmsFromDbToState () {
    filmsApi
    .getAllFilms()
    .then(({ data }) => {
      this.sortFilms(data);
      this.setFilmsToState(data);
    })
    .catch(err => console.log(err));
  };

  setFilmsToState = (films) => {
    this.setState({
      films,
    });
  };

  sortFilms(films) {
    return films.sort((a, b) => (a.title > b.title) ? 1 : -1);
  };

  handleDelete = (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;

    filmsApi
    .deleteFilm(id)
    .then(({data}) => {
      if (this.state.sortByTitle === false) {
        this.setFilmsToState(data);
      } else {
        this.sortFilms(data);
        this.setFilmsToState(data);
      };
    })
    .catch(err => console.log(err));
  };

  handleSortByTitle = () => {
    this.setState({
      sortByTitle: true,
    });
    this.setSortedFilmsFromDbToState();
  };

  handleSortDefault = () => {
    this.setState({
      sortByTitle: false,
    });
    this.setFilmsFromDbToState();
  };

  handleSubmitSearchTitle = (queryString) => {
    this.setState({
      filterTitle: queryString,
    });
  };

  handleSubmitSearchActor = (queryString) => {
    this.setState({
      filterActor: queryString,
    });
  };

  render() {
    const { films, filterTitle, filterActor } = this.state;
    let filteredFilms;
    if (filterTitle) {
      filteredFilms = filterFilmsByTitle(films, filterTitle);
    } else if (filterActor) {
      filteredFilms = filterFilmsByActor(films, filterActor);
    } else {
      filteredFilms = films;
    }
    return (
      <div className={styles.homePage}>
        <div className={styles.sortButtonWrap}>
          <Button holderText={'Sort by Title'} nameOfClass={buttonStyles.sortButton} onClickFunc={this.handleSortByTitle} />
          <Button holderText={'Default sort'} nameOfClass={buttonStyles.sortButton} onClickFunc={this.handleSortDefault} />
        </div>
        <div className={styles.searchbarWrap}>
          <h3 className={styles.searchbarTitle}>Search film by title:</h3>
          <Searchbar onSubmit={this.handleSubmitSearchTitle} placeholderInput={'Please, type title'} />
          <h3 className={styles.searchbarTitle}>Search film by actor:</h3>
          <Searchbar onSubmit={this.handleSubmitSearchActor} placeholderInput={'Please, type actor'} />
        </div>
        <h2 className={styles.filmListTitle}>Films</h2>
        <FilmsList films={filteredFilms} onDeleteFunc={this.handleDelete} />
      </div>
    );
  };
};
