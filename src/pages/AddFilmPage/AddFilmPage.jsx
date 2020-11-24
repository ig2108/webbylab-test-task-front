import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import filmsMapper from '../../heplers/filmsMapper';
import * as filmsApi from '../../services/filmsApi';
import FilmsList from '../../components/FilmsList/FilmsList';
import Searchbar from '../../components/Searchbar/Searchbar';

// import styles from './MoviesPage.module.css';

// const queryString = require('query-string');
// const getQSFromLocation = location => {
//   return queryString.parse(location.search).query;
// };

export default class AddFilmPage extends Component {
  state = {
    searchedFilms: [],
    searchInput: '',
  };

  componentDidMount() {
    // const { location } = this.props;
    // const parsedQueryString = getQSFromLocation(location);
    // if (parsedQueryString) {
    //   this.getSearchFilms(parsedQueryString);
    // }
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchInput } = this.state;
    const { history, location } = this.props;

    if (prevState.searchInput !== searchInput) {
      this.getSearchFilms(searchInput);
      history.push({
        ...location,
        search: `query=${searchInput}`,
      });
    };
  };

  // getSearchFilms = queryString => {
  //   filmsApi
  //     .getFilmsByQuery(queryString)
  //     .then(({ data }) => {
  //       data.results.length === 0
  //         ? alert("Don't find films with this titles")
  //         : this.setState({
  //             searchedFilms: filmsMapper(data.results),
  //           });
  //     })
  //     .catch(err => console.log(err));
  // };

  handleSubmit = queryInput => {
    this.setState({
      searchInput: queryInput,
    });
  };

  render() {
    const { searchedFilms } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {searchedFilms.length > 0 && <FilmsList films={searchedFilms} />}
      </>
    );
  };
};
