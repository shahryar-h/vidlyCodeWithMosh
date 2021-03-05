import React, { Component } from "react";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import Listgroup from "./common/listgroup";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "All Genre",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genre" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    console.log(movie._id);
    let movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handleNew = () => {
    // this.state.movies.push()
    console.log(this.state.movies[0]);
    const newel = {
      _id: "5b21ca3easdasdzf6fbccd47181b",
      title: "banana",
      genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
      numberInStock: 4,
      dailyRentalRate: 5,
    };

    let moviesq = [...this.state.movies];
    let my = moviesq[0];
    console.log("my id:", my);
    // console.log(my);
    moviesq.push("hello");
    console.log(moviesq);
    // movies = movies.push();
    // this.setState((prevState) => ({
    //   movies: [...prevState.movies, newel],
    // }));
    // this.setState({ movies: moviesq });
  };
  handleDisplay = () => {
    // names = this.state.movies.map((t) => t )

    return this.state.movies[0];
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreselect = (genre) => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };
  filterMovies = (allmovies, currentGenre) => {
    if (currentGenre !== "All Genre") {
      const filteredMovies = allmovies.filter(
        (movie) => movie.genre.name == currentGenre
      );
      return filteredMovies;
    }
    return allmovies;
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      currentPage,
      pageSize,
      movies: allmovies,
      genres,
      sortColumn,
      currentGenre,
    } = this.state;
    const filteredMovies = this.filterMovies(allmovies, currentGenre);
    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };
  render() {
    {
      this.handleNew();
    }
    const { length: count } = this.state.movies;
    const {
      currentPage,
      pageSize,
      movies: allmovies,
      genres,
      sortColumn,
      currentGenre,
    } = this.state;
    if (count === 0) return <h2>There are no available movies!</h2>;
    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-2">
          <Listgroup
            genres={genres}
            selectedItem={currentGenre}
            onItemSelect={this.handleGenreselect}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBotton: 20 }}
          >
            New Movie
          </Link>

          <h2>There are {totalCount} available movies!</h2>

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
