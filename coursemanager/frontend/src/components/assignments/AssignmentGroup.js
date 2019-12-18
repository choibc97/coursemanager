import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Loader from "../common/Loader";

import { getAssignmentGroup } from "../../actions/assignments";

export class AssignmentGroup extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    instructorCourses: PropTypes.object.isRequired,
    taCourses: PropTypes.object.isRequired,
    studentCourses: PropTypes.object.isRequired,
    assignmentGroup: PropTypes.object,
    getAssignmentGroup: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { group } = this.props.match.params;

    this.props.getAssignmentGroup(group);
  }

  render() {
    const courseId = this.props.match.params.course;
    const isInstructor = this.props.instructorCourses.has(courseId);
    const isTa = this.props.taCourses.has(courseId);
    const isStudent = this.props.studentCourses.has(courseId);

    const noPermissions = !isInstructor && !isTa && !isStudent;
    if (noPermissions) {
      return (
        <Container>
          <p className="text-center">
            This assignment group either does not exist or you do not have
            permission to access it. Please contact your professor if you
            believe this is a mistake.
          </p>
        </Container>
      );
    }

    if (this.props.assignmentGroup === null) {
      return <Loader />;
    }

    const course = isInstructor
      ? this.props.instructorCourses.get(courseId)
      : isTa
      ? this.props.taCourses.get(courseId)
      : isStudent
      ? this.props.studentCourses.get(courseId)
      : null;

    return (
      <Container>
        <Row>
          <Col>
            <h2>{`${course.course_id}: ${this.props.assignmentGroup.title}`}</h2>
          </Col>
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
  ),
  assignmentGroup: state.assignments.assignmentGroup
});

const mapDispatchToProps = { getAssignmentGroup };

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentGroup);
