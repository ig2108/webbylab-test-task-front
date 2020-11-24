import React, { Component } from 'react';

import * as filmsApi from '../../services/filmsApi';
import getIdFromProps from '../../heplers/getIdFromProps';

import Button from '../../components/Button/Button';
import AboutFilm from '../../components/AboutFilm/AboutFilm';

import styles from './FilmDetailsPage.module.css';
import buttonStyles from '../../components/Button/Button.module.css';

export default class FilmDetailsPage extends Component {
  state = {
    film: null,
  };

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

  handleGoBack = () => {
    const { history } = this.props;
    return history.push('/');
  };

  handleDeleteFilm = () => {
    const {film} = this.state;

    filmsApi
    .deleteFilm(film._id)
    .then(this.handleGoBack);
  };

  render() {
    const { film } = this.state;
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
          <Button holderText={'Delete'} nameOfClass={buttonStyles.deleteButton} typeOfButton={'button'} onClickFunc={this.handleDeleteFilm}/>
        </div>
      </>
    );
  };
};
