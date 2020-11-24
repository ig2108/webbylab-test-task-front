const filmsMapper = films => {
  return films.map(({ id, name, title }) => ({
    id,
    name,
    title,
  }));
};

export default filmsMapper;
