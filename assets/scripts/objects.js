const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");
const movies = [];
const renderMovies = (filter = "") => {
  const movieList = document.getElementById("movie-list");
  if (movies.length === 0) {
    movieList.classList.remove("visible");
  } else {
    movieList.classList.add("visible");
  }
  movieList.innerHTML = "";
  const filterMovie = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));

  filterMovie.forEach((movie) => {
    const movieEl = document.createElement("li");
    let { getFormattedTitle } = movie;
    let text = getFormattedTitle.call(movie) + "-";

    for (const key in movie.info) {
      if (key !== "title") {
        text = text + `${key} : ${movie.info[key]}`;
      }
    }
    movieEl.textContent = text;

    movieList.append(movieEl);
  });
};
const addMovieHeader = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraVlaue = document.getElementById("extra-value").value;
  if (
    title.trim() === "" ||
    extraName.trim() === "" ||
    extraVlaue.trim() === ""
  ) {
    return;
  }

  const newMovie = {
    info: {
      title,
      [extraName]: extraVlaue,
    },
    id: Math.random(),
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    },
  };

  document.getElementById("title").value = "";
  document.getElementById("extra-name").value = "";
  document.getElementById("extra-value").value = "";
  movies.push(newMovie);
  renderMovies();
};
const searcMovieHandler = () => {
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener("click", addMovieHeader);
searchBtn.addEventListener("click", searcMovieHandler);
