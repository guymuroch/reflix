import React, { Component } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Catalog from "./Catalog";
import LandingPage from "./LandingPage";
import RentedMovie from "./RentedMovie";
import Head from "./Head";
import Search from "./Search";
class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {},
      searchMovieText: "",
      users: [
        {
          name: "guy",
          background: "blue",
          logIn: false,
          money: 100,
          movies: []
        },
        {
          name: "niv",
          background: "green",
          logIn: false,
          money: 100,
          movies: []
        },
        {
          name: "alon",
          background: "yellow",
          logIn: false,
          money: 100,
          movies: []
        },
        {
          name: "tomer",
          background: "red",
          logIn: false,
          money: 100,
          movies: []
        }
      ],
      movies: [],
      genres: [
        { id: 28, name: "Action" },
        {
          id: 12,
          name: "Adventure"
        },
        {
          id: 35,
          name: "Comedy"
        },
        {
          id: 80,
          name: "Crime"
        },
        {
          id: 18,
          name: "Drama"
        },
        {
          id: 14,
          name: "Fantasy"
        },
        {
          id: 36,
          name: "History"
        },
        {
          id: 27,
          name: "Horror"
        },
        {
          id: 10749,
          name: "Romance"
        },
        {
          id: 878,
          name: "Science Fiction"
        },
        {
          id: 10752,
          name: "War"
        }
      ]
    };
  }

  async componentDidMount() {
    if (localStorage.getItem("users") === null) {
      localStorage.setItem("users", JSON.stringify(this.state.users));
      localStorage.setItem(
        "currentUser",
        JSON.stringify(this.state.currentUser)
      );
    } else {
      let users = JSON.parse(localStorage.getItem("users"));
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.setState({
        users: users,
        currentUser: currentUser
      });
    }
  }
  searchMovies = () => {
    this.state.genres.map(genre => {
      if (this.state.searchMovieText === genre.name) {
        axios
          .get(
            `https://api.themoviedb.org/3/discover/movie?api_key=90151099e3f4d8b9c01856f61fafbfd7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres= ${
              genre.id
            }`
          )
          .then(data => {
            let newMovies = [];
            data.data.results.map(result => {
              newMovies.push(result);
            });
            this.setState({
              movies: newMovies
            });
          });
      }
    });
  };

  userLogOut = () => {
    let users = this.state.users;
    users[this.state.currentUser.index].logIn = false;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({}));
    this.setState({
      users: users,
      currentUser: { index: -1, name: "" },
      movies: []
    });
  };
  userLogIn = index => {
    if (this.state.currentUser.index >= 0) {
      alert("cant sign in");
    } else {
      const users = this.state.users;
      users[index].logIn = true;
      const currentUser = {
        name: users[index].name,
        index: index,
        money: users[index].money
      };
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      this.setState({
        users: users,
        currentUser: currentUser
      });
    }
  };

  removeMovie = id => {
    let users = this.state.users;
    let price = 20;
    let Userindex = this.state.currentUser.index;
    users[Userindex].movies.map((movie, index) => {
      if (movie.id === id) {
        users[Userindex].movies.splice(index, 1);
        users[Userindex].money += price;
        let currentUser = {
          name: users[Userindex].name,
          index: Userindex,
          money: users[Userindex].money
        };
        this.setState({
          users: users,
          currentUser: currentUser
        });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      }
    });
  };
  rentMovie = (path, id) => {
    let exsit = false;
    let price = 20;
    let users = this.state.users;
    let index = this.state.currentUser.index;
    let rentMovie = { path: path, id: id };
    if (users[index].movies.length === 0) {
      users[index].movies.push(rentMovie);
      users[index].money -= price;
      let currentUser = {
        name: users[index].name,
        index: index,
        money: users[index].money
      };
      this.setState({
        users: users,
        currentUser: currentUser
      });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
    users[this.state.currentUser.index].movies.map(movie => {
      if (movie.id === rentMovie.id) {
        exsit = true;
      }
    });
    if (exsit) {
    } else {
      if (users[index].money < 20) {
        alert("you dont have money");
      } else {
        users[this.state.currentUser.index].movies.push(rentMovie);
        users[index].money -= price;
        let currentUser = {
          name: users[index].name,
          index: index,
          money: users[index].money
        };
        this.setState({
          users: users,
          currentUser: currentUser
        });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      }
    }
  };
  updateTestText = event => {
    this.setState({
      searchMovieText: event.target.value
    });
  };

  userExcited = () => {
    if (
      this.state.currentUser.index >= 0 &&
      window.location.href === "http://localhost:3000/"
    ) {
      return <Redirect to="/catalog" />;
    }
  };

  render() {
    console.log(this.state.users);
    return (
      <Router>
        <div className="container">
          {this.userExcited()}
          <Route
            path="/"
            render={() => (
              <Head
                userLogOut={this.userLogOut}
                data={this.state.currentUser}
              />
            )}
          />
          <Route
            path="/"
            exact
            render={() => (
              <div className="users">
                {this.state.users.map((user, index) => {
                  return (
                    <LandingPage
                      logIn={this.userLogIn}
                      index={index}
                      user={user}
                    />
                  );
                })}
              </div>
            )}
          />

          <Route
            path="/catalog"
            exact
            render={() => (
              <div className="area">
                <div className="flex-rented-movies">
                  {this.state.currentUser.index >= 0
                    ? this.state.users[this.state.currentUser.index].movies.map(
                        movie => {
                          return (
                            <RentedMovie
                              removeMovie={this.removeMovie}
                              data={movie}
                            />
                          );
                        }
                      )
                    : ""}
                </div>
                <Search
                  data={this.state.searchMovieText}
                  searchMovies={this.searchMovies}
                  updateTestText={this.updateTestText}
                />
                <div className="flex-movies">
                  {this.state.movies.map(movie => {
                    return <Catalog rentMovie={this.rentMovie} data={movie} />;
                  })}
                </div>
              </div>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
