import React, { Component } from "react";
import Like from "./common/like";

class MoviesTable extends Component {
  raisSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { movies, onDelete, onLike } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.raisSort("title")} scope="col">
              Title
            </th>
            <th onClick={() => this.raisSort("genre.name")} scope="col">
              Genre
            </th>
            <th onClick={() => this.raisSort("numberInStock")} scope="col">
              Stock
            </th>
            <th onClick={() => this.raisSort("dailyRentalRate")} scope="col">
              Rate
            </th>
            <th scope="col">Like</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like liked={movie.liked} onClick={() => onLike(movie)} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
