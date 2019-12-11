import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Loader from "../common/Loader";

export class Courses extends Component {
  static propTypes = {
    courses: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  render() {
    const {
      isLoading,
      instructorCourses,
      taCourses,
      studentCourses
    } = this.props.courses;
    const isStaff = this.props.user.is_staff;

    if (isLoading) {
      return <Loader />;
    }

    return (
      <Container>
        {instructorCourses.map(course => (
          <Row>
            <Col>{course.id}</Col>
            <Col>{course.title}</Col>
            <Col>Instructor</Col>
          </Row>
        ))}
        {taCourses.map(course => (
          <Row>
            <Col>{course.id}</Col>
            <Col>{course.title}</Col>
            <Col>TA</Col>
          </Row>
        ))}
        {studentCourses.map(course => (
          <Row>
            <Col>{course.id}</Col>
            <Col>{course.title}</Col>
            <Col>Student</Col>
          </Row>
        ))}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.courses,
  user: state.auth.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
