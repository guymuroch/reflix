import { Link } from "react-router-dom";
import React, { Component } from "react";
class LandingPage extends Component {
  loggingIn = () => {
    this.props.logIn(this.props.index);
  };
  render() {
    let user = this.props.user;
    return (
      <Link to="/catalog">
        <div
          onClick={this.loggingIn}
          style={{ backgroundColor: user.background }}
          className="user"
        >
          {user.name}
        </div>
      </Link>
    );
  }
}
// COMEDY,HORROR,ROMANCE,ACTION,DRAMA,CRIME,FANTASY,ADVENTURE
export default LandingPage;
