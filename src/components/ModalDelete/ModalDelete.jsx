import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import Button from '../Button/Button';

import styles from './ModalDelete.module.css';
import buttonStyles from '../Button/Button.module.css';

export default class ModalDelete extends Component {
  state = {

  };

  targetElement = null;

  // LIFECYCLE METHODS ============================

  componentWillMount() {
    window.addEventListener('keydown', this.onEscapePress);
    this.targetElement = document.querySelector('#ModalDelete');
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapePress);
    clearAllBodyScrollLocks();
  };

  // HANDLE-EVENT METHODS ============================

  handleDeleteFilm = (e) => {
    e.preventDefault();
    const {onClickDeleteFilm} = this.props;
    const id = e.target.dataset.id;
    onClickDeleteFilm(id);
  };

  // HELP METHODS ============================

  onEscapePress = event => {
    if (event.key !== 'Escape') {
      return;
    };
    this.props.handleCloseModal();
  };

  // RENDER ============================

  render() {
    const {filmId ,handleCloseModal} = this.props;
    return (
      <div className={styles.Overlay} id={'ModalDelete'}>
        <div className={styles.Modal}>
          <h3 className={styles.modalTitle}>Are you sure ?</h3>
          <div className={styles.modal__button_wrap}>
            <Button holderText={'Back to films list'} typeOfButton={'button'} nameOfClass={buttonStyles.backToFilmListButton} onClickFunc={handleCloseModal}/>
            <Button holderText={'Yes, delete!'} typeOfButton={'button'} nameOfClass={buttonStyles.deleteButton} onClickFunc={this.handleDeleteFilm} dataId={filmId}/>
          </div>
        </div>
      </div>
    );
  };
};

ModalDelete.propTypes = {
  filmId: PropTypes.string.isRequired,
  onClickDeleteFilm: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};


