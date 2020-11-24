import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import Nav from '../Nav/Nav';
import Loader from '../Loader/Loader';

import styles from './App.module.css';

const HomePage = lazy(() =>
  import('../../pages/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);

const AddFilmPage = lazy(() =>
  import(
    '../../pages/AddFilmPage/AddFilmPage' /* webpackChunkName: "add-movies-page" */
  ),
);

const FilmDetailsPage = lazy(() =>
  import(
    '../../pages/FilmDetailsPage/FilmDetailsPage' /* webpackChunkName: "film-details-page" */
  ),
);

const App = () => {
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/films/:filmId" component={FilmDetailsPage} />
            <Route path="/films" component={AddFilmPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </div>
    </>
  );
};

export default App;
