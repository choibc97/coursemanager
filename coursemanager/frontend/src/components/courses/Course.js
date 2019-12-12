import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import { deleteCourse } from "../../actions/courses";

export class Course extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    instructorCourses: PropTypes.object.isRequired,
    taCourses: PropTypes.object.isRequired,
    studentCourses: PropTypes.object.isRequired,
    deleteCourse: PropTypes.func.isRequired
  };

  state = {
    deleted: null
  };

  onDelete = e => {
    e.preventDefault();

    const id = this.props.match.params.id;
    this.props.deleteCourse(id).then(res => this.setState({ deleted: res }));
  };

  render() {
    if (this.state.deleted) {
      return <Redirect to="/courses" />;
    }

    const id = this.props.match.params.id;
    const isStaff = this.props.user.is_staff;
    const isInstructor = this.props.instructorCourses.has(id);
    const isTa = this.props.taCourses.has(id);
    const isStudent = this.props.studentCourses.has(id);

    const noPermissions = !isInstructor && !isTa && !isStudent;
    if (noPermissions) {
      return (
        <Container>
          <p className="text-center">
            This course either does not exist or you do not have permission to
            access it. Please contact your professor if you believe this is a
            mistake.
          </p>
        </Container>
      );
    }

    const course = isInstructor
      ? this.props.instructorCourses.get(id)
      : isTa
      ? this.props.taCourses.get(id)
      : isStudent
      ? this.props.studentCourses.get(id)
      : null;

    return (
      <Container>
        <Row className="align-items-center mb-3">
          <Col className="col-auto mr-auto">
            <h2>{`${course.course_id}: ${course.title}`}</h2>
          </Col>
          {isStaff || isInstructor ? (
            <Col className="col-auto">
              <ButtonGroup aria-label="Edit or delete course">
                <Button
                  variant="outline-primary"
                  href={`/#/courses/edit/${id}`}
                >
                  Edit
                </Button>
                <Button variant="outline-danger" onClick={this.onDelete}>
                  Delete
                </Button>
              </ButtonGroup>
            </Col>
          ) : null}
        </Row>
        <Row className="align-items-center">
          <Col className="col-auto mr-auto">
            <h4>Instructors</h4>
          </Col>
          {isStaff || isInstructor ? (
            <Col className="col-auto">
              <Button variant="outline-primary">Edit</Button>
            </Col>
          ) : null}
        </Row>
        <Row className="align-items-center">
          <Col className="col-auto mr-auto">
            <h4>TAs</h4>
          </Col>
          {isStaff || isInstructor ? (
            <Col className="col-auto">
              <Button variant="outline-primary">Edit</Button>
            </Col>
          ) : null}
        </Row>
        <Row className="align-items-center">
          <Col className="col-auto mr-auto">
            <h4>Students</h4>
          </Col>
          {isStaff || isInstructor ? (
            <Col className="col-auto">
              <Button variant="outline-primary">Edit</Button>
            </Col>
          ) : null}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  instructorCourses: new Map(
    state.courses.instructorCourses.map(course => [`${course.id}`, course])
  ),
  taCourses: new Map(
    state.courses.taCourses.map(course => [`${course.id}`, course])
  ),
  studentCourses: new Map(
    state.courses.studentCourses.map(course => [`${course.id}`, course])
  )
});

const mapDispatchToProps = { deleteCourse };

export default connect(mapStateToProps, mapDispatchToProps)(Course);
