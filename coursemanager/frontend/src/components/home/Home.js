import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

import Loader from "../common/Loader";

export class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, isLoading } = this.props.auth;

    if (isLoading) {
      return <Loader />;
    } else if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return <Redirect to="/courses" />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
