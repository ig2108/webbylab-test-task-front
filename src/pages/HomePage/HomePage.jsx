import React, { Component } from 'react';

import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import * as filmsApi from '../../services/filmsApi';

import Button from '../../components/Button/Button';
import FilmsList from '../../components/FilmsList/FilmsList';
import Searchbar from '../../components/Searchbar/Searchbar';
import ModalDelete from '../../components/ModalDelete/ModalDelete';

import styles from './HomePage.module.css';
import buttonStyles from '../../components/Button/Button.module.css';

const filterFilmsByTitle = (films, filter) => {
  return films.filter(film =>
    film.title.toLowerCase().includes(filter.toLowerCase())
  );
};

const filterFilmsByActor = (films, filter) => {
  let filteredFilmsBySearch = [];
  films.map(film => {
    if (film.stars.join().toLowerCase().includes(filter.toLowerCase())) {
      filteredFilmsBySearch.push(film);
    };
  });
  return filteredFilmsBySearch;
};

export default class HomePage extends Component {
  state = {
    films: [],
    sortByTitle: false,
    filterTitle: '',
    filterActor: '',
    isModalDeleteOpen: false,
    idToDelete: null,
  };

  // LIFECYCLE METHODS ============================

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

  // HANDLE-EVENT METHODS ============================

  handleOpenModalDelete = (e) => {
    e.preventDefault();
    this.toggleModalDelete();
    const id = e.target.dataset.id;
    this.setState({
      idToDelete: id,
    });
  };

  handleDelete = (id) => {
    filmsApi
    .deleteFilm(id)
    .then(({data}) => {
      if (this.state.sortByTitle === false) {
        this.setFilmsToState(data);
      } else {
        this.sortFilms(data);
        this.setFilmsToState(data);
      };
      NotificationManager.success('Your film successfully deleted!', 'Deleted!', 5000);
      this.toggleModalDelete();
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

  // API METHODS ============================

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

  // HELP METHODS ============================

  setFilmsToState = (films) => {
    this.setState({
      films,
    });
  };

  sortFilms = (films) => {
    let collator = new Intl.Collator(["en-US", "uk-UA"], {caseFirst: "upper"});

    return films.sort((a, b) => {
      return collator.compare(a.title, b.title)
    });
  };

  isStartedFromCapitalLetter (string) {
    return (string[0] === string[0].toUpperCase()) ? true : false;
  };

  toggleModalDelete = () => {
    const {isModalDeleteOpen} = this.state;
    this.setState ({
      isModalDeleteOpen: !isModalDeleteOpen,
    });
  };

  // RENDER ============================

  render() {
    const { films, filterTitle, filterActor, isModalDeleteOpen, idToDelete } = this.state;
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
        {filteredFilms.length === 0 && (filterTitle !== '' || filterActor !== '') && <h3>No movies found with the specified search parameters!</h3>}
        <FilmsList films={filteredFilms} onDeleteFunc={this.handleOpenModalDelete} />
        <NotificationContainer/>
        {isModalDeleteOpen && <ModalDelete filmId={idToDelete} handleCloseModal={this.toggleModalDelete} onClickDeleteFilm={this.handleDelete}/>}
      </div>
    );
  };
};
