import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    queryInput: '',
  };

  handleChangeInputSearch = e => {
    const { value } = e.target;
    this.setState({
      queryInput: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { queryInput } = this.state;
    const { onSubmit } = this.props;
    if (queryInput) {
      onSubmit(queryInput);
      this.setState({
        queryInput: '',
      });
    };
  };

  render() {
    const {placeholderInput} = this.props;
    const { queryInput } = this.state;
    return (
      <div className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            value={queryInput}
            onChange={this.handleChangeInputSearch}
            autoComplete="off"
            autoFocus
            placeholder={placeholderInput}
          />
        </form>
      </div>
    );
  };
};

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   placeholderInput
// };
