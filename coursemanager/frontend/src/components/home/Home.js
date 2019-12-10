import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";

export class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, isLoading } = this.props.auth;

    if (isLoading) {
      return (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    }

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return <div>Hello</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
