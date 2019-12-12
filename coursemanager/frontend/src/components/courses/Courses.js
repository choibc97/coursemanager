import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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

    const noCourses =
      instructorCourses.length === 0 &&
      taCourses.length === 0 &&
      studentCourses.length === 0;

    return (
      <Container>
        <Row className="align-items-center mb-3">
          <Col className="col-auto mr-auto">
            <h2>Courses</h2>
          </Col>
          {isStaff ? (
            <Col className="col-auto">
              <Button href="/#/courses/create" variant="outline-success">
                Create Course
              </Button>
            </Col>
          ) : null}
        </Row>
        {noCourses ? (
          <Row className="mb-3">
            <Col>
              <p>There are no courses to show</p>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col className="col-auto mr-auto">
              <h4>Course</h4>
            </Col>
            <Col className="col-auto">
              <h4>Role</h4>
            </Col>
          </Row>
        )}
        {instructorCourses.map(course => (
          <Row key={course.id}>
            <Col className="col-auto mr-auto">
              <Link
                to={`/courses/view/${course.id}`}
              >{`${course.course_id}: ${course.title}`}</Link>
            </Col>
            <Col className="col-auto">Instructor</Col>
          </Row>
        ))}
        {taCourses.map(course => (
          <Row key={course.id}>
            <Col className="col-auto mr-auto">
              <Link
                to={`/courses/view/${course.id}`}
              >{`${course.course_id}: ${course.title}`}</Link>
            </Col>
            <Col>TA</Col>
          </Row>
        ))}
        {studentCourses.map(course => (
          <Row key={course.id}>
            <Col className="col-auto mr-auto">
              <Link
                to={`/courses/view/${course.id}`}
              >{`${course.course_id}: ${course.title}`}</Link>
            </Col>
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
