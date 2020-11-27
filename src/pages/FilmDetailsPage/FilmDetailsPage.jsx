import React, { Component } from 'react';

import * as filmsApi from '../../services/filmsApi';
import getIdFromProps from '../../heplers/getIdFromProps';

import Button from '../../components/Button/Button';
import AboutFilm from '../../components/AboutFilm/AboutFilm';
import ModalDelete from '../../components/ModalDelete/ModalDelete';

import styles from './FilmDetailsPage.module.css';
import buttonStyles from '../../components/Button/Button.module.css';

export default class FilmDetailsPage extends Component {
  state = {
    film: null,
    isModalDeleteOpen: false
  };

  // LIFECYCLE METHODS ============================

  componentDidMount() {
    const id = getIdFromProps(this.props);

    filmsApi
    .getFilmWithId(id)
    .then(({ data }) =>
      this.setState({
        film: { ...data },
      }),
    )
    .catch(err => console.log(err));
  };

  // HANDLE-EVENT METHODS ============================

  handleGoBack = () => {
    const { history } = this.props;
    return history.push('/');
  };

  handleOpenModalDelete = (e) => {
    e.preventDefault();
    this.toggleModalDelete();
  };

  handleDeleteFilm = () => {
    const {film} = this.state;

    filmsApi
    .deleteFilm(film._id)
    .then(
      this.toggleModalDelete(),
      this.handleGoBack()
    );
  };

  // HELP METHODS ============================

  toggleModalDelete = () => {
    const {isModalDeleteOpen} = this.state;
    this.setState ({
      isModalDeleteOpen: !isModalDeleteOpen,
    });
  };

  // RENDER ============================

  render() {
    const { film, isModalDeleteOpen } = this.state;
    return (
      <>
        {film && (
          <>
            <div className={styles.filmSection}>
              <AboutFilm film={film} />
            </div>
          </>
        )}
        <div className={styles.btnWrap}>
          <Button holderText={'Back to film list'} nameOfClass={buttonStyles.backToFilmListButton} typeOfButton={'button'} onClickFunc={this.handleGoBack}/>
          <Button holderText={'Delete'} nameOfClass={buttonStyles.deleteButton} typeOfButton={'button'} onClickFunc={this.toggleModalDelete}/>
        </div>
        {isModalDeleteOpen && <ModalDelete filmId={film._id} handleCloseModal={this.toggleModalDelete} onClickDeleteFilm={this.handleDeleteFilm}/>}
      </>
    );
  };
};
