import axios from 'axios';

const BASE_URL = 'https://powerful-peak-59605.herokuapp.com/films/';

export const getAllFilms = () => axios.get(BASE_URL);

export const getFilmWithId = id => axios.get(BASE_URL + `${id}`);

export const addNewFilm = film => axios.post(BASE_URL, film);

export const deleteFilm = id => axios.delete(BASE_URL + `${id}`);
