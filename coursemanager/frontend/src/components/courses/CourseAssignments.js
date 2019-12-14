import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";

export class CourseAssignments extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  render() {
    return (
      <Container>
        <h4>Assignment Groups</h4>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CourseAssignments);
