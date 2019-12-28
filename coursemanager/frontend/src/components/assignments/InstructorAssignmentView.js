import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import Loader from "../common/Loader";
import ConfirmModal from "../common/ConfirmModal";
import Breadcrumbs from "../layout/Breadcrumbs";

import { getAssignment, deleteAssignment } from "../../actions/assignments";
import { formatTimeString } from "../../actions/utility";

export class InstructorAssignmentView extends Component {
  static propTypes = {
    instructorCourses: PropTypes.object.isRequired,
    taCourses: PropTypes.object.isRequired,
    assignment: PropTypes.object,
    studentAssignments: PropTypes.array.isRequired,
    getAssignment: PropTypes.func.isRequired,
    deleteAssignment: PropTypes.func.isRequired
  };

  state = {
    deleted: null,
    showConfirmModal: false
  };

  componentDidMount() {
    const { assignment } = this.props.match.params;

    this.props.getAssignment(assignment);
  }

  onShow = e => {
    e.preventDefault();

    this.setState({ showConfirmModal: true });
  };

  onHide = e => {
    this.setState({ showConfirmModal: false });
  };

  onDelete = e => {
    e.preventDefault();

    const id = this.props.match.params.assignment;
    this.props
      .deleteAssignment(id)
      .then(res => this.setState({ deleted: res }));
  };

  render() {
    const courseId = this.props.match.params.course;
    const groupId = this.props.match.params.group;
    const assignmentId = this.props.match.params.assignment;

    if (this.state.deleted) {
      return (
        <Redirect to={`/courses/${courseId}/assignments/${groupId}/view`} />
      );
    }

    const isInstructor = this.props.instructorCourses.has(courseId);
    const isTa = this.props.taCourses.has(courseId);

    if (!isInstructor && !isTa) {
      return (
        <Container>
          <p className="text-center">
            This assignment either does not exist or you do not have permission
            to access it. Please contact the sys admin if you believe this is a
            mistake.
          </p>
        </Container>
      );
    }

    if (this.props.assignment === null) {
      return <Loader />;
    }

    const course = isInstructor
      ? this.props.instructorCourses.get(courseId)
      : isTa
      ? this.props.taCourses.get(courseId)
      : null;

    return (
      <Container>
        <Breadcrumbs path={this.props.location.pathname} />
        <ConfirmModal
          show={this.state.showConfirmModal}
          msg="Are you sure you want to delete this assignment and all of its corresponding student assignments?"
          onHide={this.onHide}
          confirm={this.onDelete}
        />
        <Row className="align-items-center mb-3">
          <Col className="col-auto mr-auto">
            <h2>{`${course.course_id}: ${this.props.assignment.title}`}</h2>
          </Col>
          {isInstructor ? (
            <Col className="col-auto">
              <ButtonGroup aria-label="Edit or delete assignment">
                <Button
                  variant="outline-primary"
                  href={`/#/courses/${courseId}/assignments/${groupId}/assignment/${assignmentId}/edit`}
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
        <Row>
          <Col>
            <h4 className="text-warning">
              Points: {this.props.assignment.points}
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="text-danger">
              Due: {formatTimeString(this.props.assignment.due_date)}
            </h4>
          </Col>
        </Row>
        {this.props.studentAssignments.length === 0 ? (
          <Row>
            <Col>
              <p className="text-center">Assignments will appear here.</p>
            </Col>
          </Row>
        ) : (
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col className="col-3">
                  <p className="text-info">Student</p>
                </Col>
                <Col className="col-3">
                  <p className="text-info">Grader</p>
                </Col>
                <Col className="col-2">
                  <p className="text-info">Completed</p>
                </Col>
                <Col className="col-2">
                  <p className="text-info">Late</p>
                </Col>
                <Col className="col-2">
                  <p className="text-info">Points Earned</p>
                </Col>
              </Row>
            </ListGroup.Item>
            {this.props.studentAssignments.map(studentAssignment => (
              <ListGroup.Item key={studentAssignment.id}>
                <Row>
                  <Col className="col-3">
                    <p>{studentAssignment.student}</p>
                  </Col>
                  <Col className="col-3">
                    <p>
                      {studentAssignment.grader
                        ? studentAssignment.grader
                        : "N/A"}
                    </p>
                  </Col>
                  <Col className="col-2">
                    <p>{studentAssignment.completed ? "Yes" : "No"}</p>
                  </Col>
                  <Col className="col-2">
                    <p>{studentAssignment.is_late ? "Yes" : "No"}</p>
                  </Col>
                  <Col className="col-2">
                    <p>{studentAssignment.points_earned}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
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
  assignment: state.assignments.assignment,
  studentAssignments: state.assignments.studentAssignments
});

const mapDispatchToProps = { getAssignment, deleteAssignment };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstructorAssignmentView);
