import React from 'react';
import Loading from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.Loader}>
    <Loading
      type="Watch"
      color="#3f51b5"
      height={100}
      width={100}
      timeout={3000} //3 secs
    />
    ;
  </div>
);

export default Loader;
