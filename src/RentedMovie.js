import React, { Component } from "react";
class RentedMovie extends Component {
  removeMovie = () => {
    this.props.removeMovie(this.props.data.id);
  };
  render() {
    let movie = this.props.data;
    return (
      <div
        onClick={this.removeMovie}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.path})`
        }}
        className="rented-movie"
      />
    );
  }
}
export default RentedMovie;
