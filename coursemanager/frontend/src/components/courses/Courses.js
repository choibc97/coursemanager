import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import Loader from "../common/Loader";
import Breadcrumbs from "../layout/Breadcrumbs";

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
        <Breadcrumbs path={this.props.location.pathname} />
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
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col className="col-auto mr-auto">
                  <h4 className="text-info">Course</h4>
                </Col>
                <Col className="col-auto">
                  <h4 className="text-info">Role</h4>
                </Col>
              </Row>
            </ListGroup.Item>
            {instructorCourses.map(course => (
              <ListGroup.Item key={course.id}>
                <Row>
                  <Col className="col-auto mr-auto">
                    <Link to={`/courses/${course.id}/view`}>
                      <p>{`${course.course_id}: ${course.title}`}</p>
                    </Link>
                  </Col>
                  <Col className="col-auto">
                    <p>Instructor</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            {taCourses.map(course => (
              <Row key={course.id}>
                <Col className="col-auto mr-auto">
                  <Link to={`/courses/${course.id}/view`}>
                    <p>{`${course.course_id}: ${course.title}`}</p>
                  </Link>
                </Col>
                <Col className="col-auto">
                  <p>TA</p>
                </Col>
              </Row>
            ))}
            {studentCourses.map(course => (
              <Row key={course.id}>
                <Col className="col-auto mr-auto">
                  <Link to={`/courses/${course.id}/view`}>
                    <p>{`${course.course_id}: ${course.title}`}</p>
                  </Link>
                </Col>
                <Col className="col-auto">
                  <p>Student</p>
                </Col>
              </Row>
            ))}
          </ListGroup>
        )}
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
