import React, { Component } from "react";
class Catalog extends Component {
  constructor() {
    super();
    this.state = {
      show: "none",
      current: false
    };
  }
  showText = () => {
    if (this.state.current) {
      this.setState({
        show: "none",
        current: !this.state.current
      });
    } else {
      this.setState({
        show: "inline",
        current: !this.state.current
      });
    }
  };
  rentMovie = () => {
    this.props.rentMovie(this.props.data.poster_path, this.props.data.id);
  };
  render() {
    let movie = this.props.data;
    return (
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${
            movie.poster_path
          })`
        }}
        className="movie"
      >
        <div onClick={this.rentMovie} className="add-movie">
          Add
        </div>
        <div onClick={this.showText} className="over-view">
          description
        </div>
        <div
          className="text-view"
          style={{ backgroundColor: "black", display: `${this.state.show}` }}
        >
          <p
            style={{
              backgroundColor: "black",
              color: "white"
            }}
          >
            {movie.overview}}
          </p>
        </div>
      </div>
    );
  }
}

export default Catalog;
