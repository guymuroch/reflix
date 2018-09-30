import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
class Head extends Component {
  Catalog = () => {
    const isLoggedIn = this.props.data.index;
    if (isLoggedIn >= 0) {
      return <Link to="/catalog">{<li>Catalog</li>}</Link>;
    }
    return <li>Catalog</li>;
  };
  logout = () => {
    this.props.userLogOut();
  };

  render() {
    let currentUser = this.props.data;
    return (
      <div className="head">
        <ul className="nav-bar">
          <Link to="/">
            <li onClick={this.logout} className="log-out">
              Log Out
            </li>
          </Link>
          <Link to="/">{<li>Home</li>}</Link>
          <this.Catalog />
          <li className="li-3">REFLIX</li>
        </ul>
        <h1>who's watching</h1>
        <div className="current-user">
          <h1>{currentUser.name}</h1>
          <p>{currentUser.money}</p>
        </div>
      </div>
    );
  }
}
export default Head;
