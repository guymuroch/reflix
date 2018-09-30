import React, { Component } from "react";

class Search extends Component {
  searchMovies = () => {
    this.props.searchMovies();
  };
  updateTestText = e => {
    this.props.updateTestText(e);
  };
  render() {
    let searchMovieText = this.props.data;
    return (
      <div className="search-div">
        <a onClick={this.searchMovies} className="search-geners-btn" href="#">
          search
        </a>
        <input
          className="search-geners-input"
          placeholder="search for movie"
          type="text"
          value={searchMovieText}
          onChange={e => this.updateTestText(e)}
        />
      </div>
    );
  }
}
export default Search;
