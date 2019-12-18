import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import ConfirmModal from "../common/ConfirmModal";
import CourseAssignments from "./CourseAssignments";
import CourseInstructors from "./CourseInstructors";
import CourseTAs from "./CourseTAs";
import CourseStudents from "./CourseStudents";
import Breadcrumbs from "../layout/Breadcrumbs";

import { deleteCourse } from "../../actions/courses";

export class Course extends Component {
  static propTypes = {
    instructorCourses: PropTypes.object.isRequired,
    taCourses: PropTypes.object.isRequired,
    studentCourses: PropTypes.object.isRequired,
    deleteCourse: PropTypes.func.isRequired
  };

  state = {
    deleted: null,
    showConfirmModal: false
  };

  onShow = e => {
    e.preventDefault();

    this.setState({ showConfirmModal: true });
  };

  onHide = e => {
    this.setState({ showConfirmModal: false });
  };

  onDelete = e => {
    e.preventDefault();

    const id = this.props.match.params.course;
    this.props.deleteCourse(id).then(res => this.setState({ deleted: res }));
  };

  render() {
    if (this.state.deleted) {
      return <Redirect to="/courses" />;
    }

    const id = this.props.match.params.course;
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
        <Breadcrumbs path={this.props.location.pathname} />
        <ConfirmModal
          show={this.state.showConfirmModal}
          msg="Are you sure you want to delete this course?"
          onHide={this.onHide}
          confirm={this.onDelete}
        />
        <Row className="align-items-center mb-3">
          <Col className="col-auto mr-auto">
            <h2>{`${course.course_id}: ${course.title}`}</h2>
          </Col>
          {isInstructor ? (
            <Col className="col-auto">
              <ButtonGroup aria-label="Edit or delete course">
                <Button
                  variant="outline-primary"
                  href={`/#/courses/${id}/edit`}
                >
                  Edit
                </Button>
                <Button variant="outline-danger" onClick={this.onShow}>
                  Delete
                </Button>
              </ButtonGroup>
            </Col>
          ) : null}
        </Row>

        <Tabs defaultActiveKey="assignments" id="tabs">
          <Tab eventKey="assignments" title="Assignments">
            <CourseAssignments course={course} />
          </Tab>
          <Tab eventKey="instructors" title="Instructors">
            <CourseInstructors course={course} />
          </Tab>
          <Tab eventKey="tas" title="TAs">
            <CourseTAs course={course} />
          </Tab>
          {isInstructor || isTa ? (
            <Tab eventKey="students" title="Students">
              <CourseStudents course={course} />
            </Tab>
          ) : null}
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
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
