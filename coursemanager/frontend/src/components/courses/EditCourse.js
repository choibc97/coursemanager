import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { editCourse } from "../../actions/courses";

export class EditCourse extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    instructorCourses: PropTypes.object.isRequired,
    editCourse: PropTypes.func.isRequired
  };

  state = {
    edited: false
  };

  render() {
    const isStaff = this.props.user.is_staff;

    return <div>Edit</div>;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  instructorCourses: new Map(
    state.courses.instructorCourses.map(course => [course.id, course])
  )
});

const mapDispatchToProps = { editCourse };

export default connect(mapStateToProps, mapDispatchToProps)(EditCourse);
